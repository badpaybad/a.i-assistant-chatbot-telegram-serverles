import os
import sys
import re
import time
import serial
import asyncio
import logging
import subprocess
import json
from typing import Dict, List, Set, Optional, Tuple
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException, File, UploadFile, Form
from fastapi.responses import HTMLResponse, JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

# Configure logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("cnc_controller")

app = FastAPI(title="GRBL CNC Web Controller")

if getattr(sys, 'frozen', False):
    EXEC_DIR = os.path.dirname(os.path.abspath(sys.executable))
    BASE_DIR = getattr(sys, '_MEIPASS', EXEC_DIR)
else:
    EXEC_DIR = os.path.dirname(os.path.abspath(__file__))
    BASE_DIR = EXEC_DIR

STATIC_DIR = os.path.join(BASE_DIR, "static")
SETTINGS_FILE = os.path.join(EXEC_DIR, "calibration_settings.json")

def get_default_port_for_os() -> str:
    if sys.platform.startswith('win'):
        return "COM3"
    elif sys.platform.startswith('darwin'):
        return "/dev/tty.usbmodem1"
    else:
        return "/dev/ttyACM0"

def load_settings() -> dict:
    default_settings = {
        "port": get_default_port_for_os(),
        "baudrate": 115200,
        "step_distance": 10.0,
        "jog_feedrate": 4000.0,
        "swipe_feedrate": 10000.0,
        "gesture_distance": 40.0,
        "gesture_tap_dwell": 0.05,
        "gesture_long_press_dwell": 1.5,
        "pen_mode": "spindle-pwm",
        "pen_up_z": 0.0,
        "pen_down_z": 45.0,
        "pen_up_pwm": 0.0,
        "pen_down_pwm": 45.0,
        "pen_dwell": 0.25,
        "axis_dir_x": 1,
        "axis_dir_y": 1,
        "mm_per_px": 0.5,
        "home_set": True,
        "workpiece_origin": {"x": 0.0, "y": 0.0, "z": 0.0},
        "work_origin": {"x": 0.0, "y": 0.0, "z": 0.0},
        "parking_point": {"x": 0.0, "y": 0.0, "z": 10.0},
        "cnc_tl": None,
        "cnc_tr": None,
        "cnc_bl": None,
        "cnc_br": None,
    }
    if os.path.exists(SETTINGS_FILE):
        try:
            with open(SETTINGS_FILE, "r", encoding="utf-8") as f:
                saved = json.load(f)
                default_settings.update(saved)
        except Exception as e:
            logger.error(f"Error loading settings file: {e}")
    return default_settings

def save_settings(settings_dict: dict):
    current = load_settings()
    current.update(settings_dict)
    try:
        with open(SETTINGS_FILE, "w", encoding="utf-8") as f:
            json.dump(current, f, indent=2, ensure_ascii=False)
    except Exception as e:
        logger.error(f"Error saving settings file: {e}")

class ControllerState:
    def __init__(self):
        settings = load_settings()
        self.connected = False
        self.port_name = ""
        self.baudrate = 115200
        self.serial_port = None
        self.machine_state = "NGOẠI TUYẾN"
        self.mpos = [0.0, 0.0, 0.0]
        self.wpos = [0.0, 0.0, 0.0]
        self.wco = [0.0, 0.0, 0.0]
        
        # Origin and parking coordinates
        self.workpiece_origin = settings.get("workpiece_origin", {"x": 0.0, "y": 0.0, "z": 0.0})
        self.work_origin = settings.get("work_origin", {"x": 0.0, "y": 0.0, "z": 0.0})
        self.parking_point = settings.get("parking_point", {"x": 0.0, "y": 0.0, "z": 10.0})
        self.cnc_tl = settings.get("cnc_tl")
        self.cnc_tr = settings.get("cnc_tr")
        self.cnc_bl = settings.get("cnc_bl")
        self.cnc_br = settings.get("cnc_br")
        self.home_set = settings.get("home_set", False)
        
        self.feedrate = 0.0
        self.spindle_speed = 0.0
        self.buffer_rx = 127
        self.buffer_blocks = 15
        
        # Pen settings
        self.pen_mode = settings.get("pen_mode", "z-axis")
        self.pen_up_z = float(settings.get("pen_up_z", 3.0))
        self.pen_down_z = float(settings.get("pen_down_z", 0.0))
        self.pen_up_pwm = float(settings.get("pen_up_pwm", 30.0))
        self.pen_down_pwm = float(settings.get("pen_down_pwm", 90.0))
        self.pen_dwell = float(settings.get("pen_dwell", 0.25))
        self.pen_state = None
        
        self.gesture_tap_dwell = float(settings.get("gesture_tap_dwell", 0.05))
        self.gesture_long_press_dwell = float(settings.get("gesture_long_press_dwell", 1.5))
        
        # Motion parameters
        self.step_distance = float(settings.get("step_distance", 10.0))
        self.jog_feedrate = float(settings.get("jog_feedrate", 4000.0))
        self.swipe_feedrate = float(settings.get("swipe_feedrate", 10000.0))
        self.axis_dir_x = int(settings.get("axis_dir_x", 1))
        self.axis_dir_y = int(settings.get("axis_dir_y", 1))
        self.mm_per_px = float(settings.get("mm_per_px", 0.05))
        
        # WebSockets & Locks
        self.websocket_connections: Set[WebSocket] = set()
        self.grbl_ack_event = asyncio.Event()
        self.serial_lock = asyncio.Lock()
        
        # Tasks
        self.reader_task = None
        self.polling_task = None
        self.stream_task = None
        
        # Streaming state
        self.is_streaming = False
        self.is_paused = False
        self.stream_gcode_lines = []
        self.gcode_index = 0
        self.sent_buffer_lengths = []

        # Scenario Session state
        self.scenario_name = "kich_ban_1"
        self.scenario_actions = []
        self.scenario_insert_index = -1
        self.scenario_is_looping = False

state = ControllerState()

async def safe_write_serial(data: bytes):
    if not state.connected or not state.serial_port:
        return
    async with state.serial_lock:
        try:
            loop = asyncio.get_running_loop()
            if isinstance(state.serial_port, DummySerial):
                state.serial_port.write(data)
            else:
                def _do_write():
                    state.serial_port.write(data)
                await loop.run_in_executor(None, _do_write)
        except Exception as e:
            logger.error(f"Lỗi safe_write_serial: {e}")

# Mock Serial Class
class DummySerial:
    def __init__(self):
        self.in_waiting = 0
        self.relative_mode = False

    def write(self, data: bytes):
        text = data.decode('utf-8', errors='ignore')
        lines = [l.strip() for l in text.splitlines() if l.strip()]
        for cmd in lines:
            logger.info(f"[DUMMY SERIAL WRITE] {cmd}")
            try:
                upper = cmd.upper()
                if "G91" in upper:
                    self.relative_mode = True
                if "G90" in upper:
                    self.relative_mode = False

                if "G10" in upper and "L20" in upper:
                    for idx, axis in enumerate(["X", "Y", "Z"]):
                        match = re.search(rf"{axis}([-+]?[0-9]*\.?[0-9]+)", cmd, re.IGNORECASE)
                        if match:
                            val = float(match.group(1))
                            state.wpos[idx] = val
                            state.mpos[idx] = val + state.wco[idx]
                elif "G92" in upper:
                    for idx, axis in enumerate(["X", "Y", "Z"]):
                        match = re.search(rf"{axis}([-+]?[0-9]*\.?[0-9]+)", cmd, re.IGNORECASE)
                        if match:
                            val = float(match.group(1))
                            state.wpos[idx] = val
                            state.mpos[idx] = val + state.wco[idx]
                elif any(g in upper for g in ["G0", "G1", "G00", "G01"]):
                    for idx, axis in enumerate(["X", "Y", "Z"]):
                        match = re.search(rf"{axis}([-+]?[0-9]*\.?[0-9]+)", cmd, re.IGNORECASE)
                        if match:
                            val = float(match.group(1))
                            if self.relative_mode:
                                state.wpos[idx] += val
                            else:
                                state.wpos[idx] = val
                            state.mpos[idx] = state.wpos[idx] + state.wco[idx]

                asyncio.create_task(send_telemetry())
            except Exception as e:
                logger.error(f"[Dummy Serial] Simulation error: {e}")

    def read(self, size: int) -> bytes:
        return b""
    def flush(self):
        pass
    def close(self):
        pass

def get_port_owner(port: str) -> str:
    try:
        out = subprocess.check_output(["lsof", port], text=True, stderr=subprocess.DEVNULL)
        for line in out.splitlines()[1:]:
            parts = line.split()
            if len(parts) >= 3:
                return f"{parts[0]} (PID {parts[1]}, User {parts[2]})"
    except Exception:
        pass
    return ""

async def broadcast(message: dict):
    if not state.websocket_connections:
        return
    disconnected = set()
    for ws in list(state.websocket_connections):
        try:
            await ws.send_json(message)
        except Exception:
            disconnected.add(ws)
    for ws in disconnected:
        state.websocket_connections.discard(ws)

def translate_command(command: str) -> List[str]:
    if state.pen_mode != "spindle-pwm":
        return [command]
        
    stripped = command.strip()
    if not stripped or stripped.startswith("(") or stripped.startswith(";"):
        return [command]
        
    z_match = re.search(r'\b[zZ]([-+]?[0-9]*\.?[0-9]+)\b', stripped)
    if not z_match:
        return [command]
        
    z_val = float(z_match.group(1))
    
    try:
        midpoint = (state.pen_up_z + state.pen_down_z) / 2.0
        if state.pen_up_z >= state.pen_down_z:
            target_state = "up" if z_val >= midpoint else "down"
        else:
            target_state = "up" if z_val <= midpoint else "down"
            
        clean_cmd = re.sub(r'\b[zZ][-+]?[0-9]*\.?[0-9]+\b', '', stripped).strip()
        clean_cmd = re.sub(r'\s+', ' ', clean_cmd)
        
        cmds = []
        if state.pen_state is None or target_state != state.pen_state:
            state.pen_state = target_state
            pwm_val = state.pen_up_pwm if target_state == "up" else state.pen_down_pwm
            cmds.append(f"M3 S{pwm_val}")
            cmds.append(f"G4 P{state.pen_dwell}")
            
        if clean_cmd and not re.match(r'^[gG][0-3]$', clean_cmd):
            cmds.append(clean_cmd)
                
        return cmds
    except Exception as e:
        logger.error(f"Error translating command '{command}': {e}")
        return [command]

def parse_grbl_status(status_str: str):
    try:
        clean = status_str.strip("<> \r\n")
        state_match = re.match(r"^([a-zA-Z]+)", clean)
        if state_match:
            state.machine_state = state_match.group(1)
            
        matches = re.findall(r"([a-zA-Z]+):([-+0-9.,]*)", clean)
        for key, val in matches:
            val = val.strip(",")
            if key == "WPos":
                parts = [float(x) for x in val.split(",")]
                state.wpos = parts
                state.mpos = [w + o for w, o in zip(state.wpos, state.wco)]
            elif key == "MPos":
                parts = [float(x) for x in val.split(",")]
                state.mpos = parts
                state.wpos = [m - o for m, o in zip(state.mpos, state.wco)]
            elif key == "WCO":
                parts = [float(x) for x in val.split(",")]
                state.wco = parts
            elif key == "Bf":
                bf_parts = val.split(",")
                if len(bf_parts) == 2:
                    state.buffer_blocks = int(bf_parts[0])
                    state.buffer_rx = int(bf_parts[1])
            elif key == "FS":
                fs_parts = val.split(",")
                if len(fs_parts) == 2:
                    state.feedrate = float(fs_parts[0])
                    state.spindle_speed = float(fs_parts[1])
    except Exception as e:
        logger.error(f"Error parsing GRBL status: {e}")

async def serial_reader_loop():
    loop = asyncio.get_running_loop()
    buffer = ""
    
    while state.connected and state.serial_port:
        try:
            if isinstance(state.serial_port, DummySerial):
                await asyncio.sleep(0.1)
                continue
                
            if state.serial_port.in_waiting > 0:
                data = await loop.run_in_executor(None, state.serial_port.read, state.serial_port.in_waiting)
                buffer += data.decode('utf-8', errors='ignore')
                
                while "\n" in buffer:
                    line, buffer = buffer.split("\n", 1)
                    line = line.strip()
                    if not line:
                        continue
                    
                    await broadcast({"type": "log", "direction": "in", "content": line})
                    
                    if line.startswith("<") and line.endswith(">"):
                        parse_grbl_status(line)
                        await send_telemetry()
                    elif line == "ok" or "error" in line:
                        if state.sent_buffer_lengths:
                            state.sent_buffer_lengths.pop(0)
                        state.grbl_ack_event.set()
            else:
                await asyncio.sleep(0.01)
        except Exception as e:
            logger.error(f"Error in serial reader: {e}")
            state.connected = False
            await broadcast({"type": "connection", "connected": False, "message": f"Mất kết nối: {e}"})
            break

async def wait_for_ok(timeout=1.0):
    state.grbl_ack_event.clear()
    try:
        await asyncio.wait_for(state.grbl_ack_event.wait(), timeout=timeout)
        return True
    except asyncio.TimeoutError:
        return False

async def status_polling_loop():
    while state.connected and state.serial_port:
        try:
            if not isinstance(state.serial_port, DummySerial):
                await safe_write_serial(b"?")
        except Exception as e:
            logger.error(f"Error polling status: {e}")
        await asyncio.sleep(0.2)

async def send_telemetry():
    pen_rel_workpiece = {
        "x": state.wpos[0] - state.workpiece_origin.get("x", 0.0),
        "y": state.wpos[1] - state.workpiece_origin.get("y", 0.0),
        "z": state.wpos[2] - state.workpiece_origin.get("z", 0.0)
    }
    pen_rel_work = {
        "x": state.wpos[0] - state.work_origin.get("x", 0.0),
        "y": state.wpos[1] - state.work_origin.get("y", 0.0),
        "z": state.wpos[2] - state.work_origin.get("z", 0.0)
    }
    
    await broadcast({
        "type": "telemetry",
        "state": state.machine_state,
        "mpos": state.mpos,
        "wpos": state.wpos,
        "workpiece_origin": state.workpiece_origin,
        "work_origin": state.work_origin,
        "parking_point": state.parking_point,
        "cnc_tl": state.cnc_tl,
        "cnc_tr": state.cnc_tr,
        "cnc_bl": state.cnc_bl,
        "cnc_br": state.cnc_br,
        "cnc_bounds": {"tl": state.cnc_tl, "tr": state.cnc_tr, "bl": state.cnc_bl, "br": state.cnc_br},
        "pen_rel_workpiece": pen_rel_workpiece,
        "pen_rel_work": pen_rel_work,
        "feedrate": state.feedrate,
        "spindle_speed": state.spindle_speed,
        "buffer_rx": state.buffer_rx,
        "buffer_blocks": state.buffer_blocks,
        "streaming": state.is_streaming,
        "streaming_progress": (state.gcode_index / len(state.stream_gcode_lines)) if state.stream_gcode_lines else 0.0,
        "gcode_index": state.gcode_index,
        "gcode_total": len(state.stream_gcode_lines),
        "home_set": state.home_set,
        "scenario_name": state.scenario_name,
        "scenario_actions": state.scenario_actions,
        "scenario_insert_index": state.scenario_insert_index,
        "scenario_is_looping": state.scenario_is_looping
    })

def generate_scenario_gcode(actions: list) -> str:
    feed = state.jog_feedrate
    swipe_feed = getattr(state, 'swipe_feedrate', 10000.0)
    tap_dwell = getattr(state, 'gesture_tap_dwell', 0.05)
    long_press_dwell = getattr(state, 'gesture_long_press_dwell', 1.5)
    swipe_dist = getattr(state, 'gesture_distance', 40.0)

    gcode = ["G90 G54"]
    is_spindle = state.pen_mode == "spindle-pwm"
    p_down = f"M3 S{state.pen_down_pwm}" if is_spindle else f"G0 Z{state.pen_down_z}"
    p_up = f"M3 S{state.pen_up_pwm}" if is_spindle else f"G0 Z{state.pen_up_z}"

    for act in actions:
        act_type = act.get("type", "")
        x = float(act.get("x", 0.0))
        y = float(act.get("y", 0.0))

        if act_type in ["set_begin", "set_end", "go_to_here"]:
            gcode.append(p_up)
            gcode.append(f"G0 X{x:.2f} Y{y:.2f} F{feed}")
            gcode.append("G4 P0.25")
        elif act_type == "go_to_keep_state":
            gcode.append(f"G1 X{x:.2f} Y{y:.2f} F{feed}")
        elif act_type == "pen_down":
            gcode.append(p_down)
            gcode.append(f"G4 P{state.pen_dwell}")
        elif act_type == "pen_up":
            gcode.append(p_up)
            gcode.append(f"G4 P{state.pen_dwell}")
        elif act_type == "tap":
            gcode.append(f"G0 X{x:.2f} Y{y:.2f} F{feed}")
            gcode.append(p_down)
            gcode.append(f"G4 P{tap_dwell}")
            gcode.append(p_up)
        elif act_type == "double_tap":
            gcode.append(f"G0 X{x:.2f} Y{y:.2f} F{feed}")
            gcode.append(p_down)
            gcode.append(f"G4 P{tap_dwell}")
            gcode.append(p_up)
            gcode.append(f"G4 P{tap_dwell}")
            gcode.append(p_down)
            gcode.append(f"G4 P{tap_dwell}")
            gcode.append(p_up)
        elif act_type == "long_press":
            dur = float(act.get("duration", long_press_dwell))
            gcode.append(f"G0 X{x:.2f} Y{y:.2f} F{feed}")
            gcode.append(p_down)
            gcode.append(f"G4 P{dur}")
            gcode.append(p_up)
        elif act_type == "swipe_down":
            gcode.append(f"G0 X{x:.2f} Y{y:.2f} F{feed}")
            gcode.append(p_down)
            gcode.append("G4 P0.02")
            gcode.append(f"G1 Y{(y - swipe_dist):.2f} F{swipe_feed}")
            gcode.append(p_up)
        elif act_type == "swipe_up":
            gcode.append(f"G0 X{x:.2f} Y{y:.2f} F{feed}")
            gcode.append(p_down)
            gcode.append("G4 P0.02")
            gcode.append(f"G1 Y{(y + swipe_dist):.2f} F{swipe_feed}")
            gcode.append(p_up)
        elif act_type == "swipe_left":
            gcode.append(f"G0 X{x:.2f} Y{y:.2f} F{feed}")
            gcode.append(p_down)
            gcode.append("G4 P0.02")
            gcode.append(f"G1 X{(x - swipe_dist):.2f} F{swipe_feed}")
            gcode.append(p_up)
        elif act_type == "swipe_right":
            gcode.append(f"G0 X{x:.2f} Y{y:.2f} F{feed}")
            gcode.append(p_down)
            gcode.append("G4 P0.02")
            gcode.append(f"G1 X{(x + swipe_dist):.2f} F{swipe_feed}")
            gcode.append(p_up)
        elif act_type.startswith("dwell-"):
            duration = act_type.split("-")[1]
            gcode.append(f"G4 P{duration}")
        elif act_type == "dwell":
            dur = act.get("duration", 0.25)
            gcode.append(f"G4 P{dur:.2f}")
        else:
            gcode.append(f"G0 X{x:.2f} Y{y:.2f} F{feed}")

    gcode.append(p_up)
    return "\n".join(gcode)

def compute_scenario_segments(actions: list) -> list:
    swipe_dist = getattr(state, 'gesture_distance', 40.0)
    segments = []
    cur_x, cur_y = 0.0, 0.0
    pen_down = False

    for idx, act in enumerate(actions):
        step_label = idx + 1
        act_type = act.get("type", "")
        ax = float(act.get("x", 0.0))
        ay = float(act.get("y", 0.0))

        if act_type in ["set_begin", "set_end", "go_to_here"]:
            segments.append({
                "type": "rapid",
                "pts": [{"x": cur_x, "y": cur_y}, {"x": ax, "y": ay}],
                "penDown": False,
                "stepIndex": step_label,
                "actionType": act_type
            })
            cur_x, cur_y = ax, ay
            pen_down = False
        elif act_type == "go_to_keep_state":
            segments.append({
                "type": "cut" if pen_down else "rapid",
                "pts": [{"x": cur_x, "y": cur_y}, {"x": ax, "y": ay}],
                "penDown": pen_down,
                "stepIndex": step_label,
                "actionType": act_type
            })
            cur_x, cur_y = ax, ay
        elif act_type == "pen_down":
            pen_down = True
            segments.append({
                "type": "pendown",
                "pts": [{"x": cur_x, "y": cur_y}],
                "penDown": True,
                "stepIndex": step_label,
                "actionType": act_type
            })
        elif act_type == "pen_up":
            pen_down = False
            segments.append({
                "type": "penup",
                "pts": [{"x": cur_x, "y": cur_y}],
                "penDown": False,
                "stepIndex": step_label,
                "actionType": act_type
            })
        elif act_type == "tap":
            segments.append({"type": "rapid", "pts": [{"x": cur_x, "y": cur_y}, {"x": ax, "y": ay}], "penDown": False, "stepIndex": step_label, "actionType": act_type})
            segments.append({"type": "tap", "pts": [{"x": ax, "y": ay}], "penDown": True, "stepIndex": step_label, "actionType": act_type})
            cur_x, cur_y = ax, ay
            pen_down = False
        elif act_type == "double_tap":
            segments.append({"type": "rapid", "pts": [{"x": cur_x, "y": cur_y}, {"x": ax, "y": ay}], "penDown": False, "stepIndex": step_label, "actionType": act_type})
            segments.append({"type": "doubletap", "pts": [{"x": ax, "y": ay}], "penDown": True, "stepIndex": step_label, "actionType": act_type})
            cur_x, cur_y = ax, ay
            pen_down = False
        elif act_type == "long_press":
            segments.append({"type": "rapid", "pts": [{"x": cur_x, "y": cur_y}, {"x": ax, "y": ay}], "penDown": False, "stepIndex": step_label, "actionType": act_type})
            segments.append({"type": "longpress", "pts": [{"x": ax, "y": ay}], "penDown": True, "stepIndex": step_label, "actionType": act_type})
            cur_x, cur_y = ax, ay
            pen_down = False
        elif act_type == "swipe_down":
            end_y = ay - swipe_dist
            segments.append({"type": "rapid", "pts": [{"x": cur_x, "y": cur_y}, {"x": ax, "y": ay}], "penDown": False, "stepIndex": step_label, "actionType": act_type})
            segments.append({"type": "swipe", "pts": [{"x": ax, "y": ay}, {"x": ax, "y": end_y}], "penDown": True, "stepIndex": step_label, "actionType": act_type})
            cur_x, cur_y = ax, end_y
            pen_down = False
        elif act_type == "swipe_up":
            end_y = ay + swipe_dist
            segments.append({"type": "rapid", "pts": [{"x": cur_x, "y": cur_y}, {"x": ax, "y": ay}], "penDown": False, "stepIndex": step_label, "actionType": act_type})
            segments.append({"type": "swipe", "pts": [{"x": ax, "y": ay}, {"x": ax, "y": end_y}], "penDown": True, "stepIndex": step_label, "actionType": act_type})
            cur_x, cur_y = ax, end_y
            pen_down = False
        elif act_type == "swipe_left":
            end_x = ax - swipe_dist
            segments.append({"type": "rapid", "pts": [{"x": cur_x, "y": cur_y}, {"x": ax, "y": ay}], "penDown": False, "stepIndex": step_label, "actionType": act_type})
            segments.append({"type": "swipe", "pts": [{"x": ax, "y": ay}, {"x": end_x, "y": ay}], "penDown": True, "stepIndex": step_label, "actionType": act_type})
            cur_x, cur_y = end_x, ay
            pen_down = False
        elif act_type == "swipe_right":
            end_x = ax + swipe_dist
            segments.append({"type": "rapid", "pts": [{"x": cur_x, "y": cur_y}, {"x": ax, "y": ay}], "penDown": False, "stepIndex": step_label, "actionType": act_type})
            segments.append({"type": "swipe", "pts": [{"x": ax, "y": ay}, {"x": end_x, "y": ay}], "penDown": True, "stepIndex": step_label, "actionType": act_type})
            cur_x, cur_y = end_x, ay
            pen_down = False
        elif act_type.startswith("dwell-") or act_type == "dwell":
            segments.append({"type": "dwell", "pts": [{"x": cur_x, "y": cur_y}], "penDown": pen_down, "stepIndex": step_label, "actionType": act_type})

    return segments

async def gcode_streamer_task():
    logger.info("Task nạp G-code bắt đầu")
    state.sent_buffer_lengths = []
    
    while state.is_streaming and state.connected:
        if state.is_paused:
            await asyncio.sleep(0.1)
            continue
            
        if state.gcode_index >= len(state.stream_gcode_lines):
            while state.sent_buffer_lengths:
                await asyncio.sleep(0.1)
            
            if state.scenario_is_looping and state.is_streaming:
                state.gcode_index = 0
                await broadcast({"type": "stream_status", "status": "looping"})
                await asyncio.sleep(0.5)
                continue

            state.is_streaming = False
            
            if state.connected and state.serial_port and not isinstance(state.serial_port, DummySerial):
                try:
                    await safe_write_serial(b"\x18")
                    await asyncio.sleep(1.0)
                    await safe_write_serial(b"$X\n")
                except Exception as e:
                    logger.error(f"Lỗi reset GRBL sau khi hoàn thành: {e}")
                    
            await broadcast({"type": "stream_status", "status": "completed"})
            await send_telemetry()
            break
            
        line = state.stream_gcode_lines[state.gcode_index].strip()
        clean_line = re.sub(r'\(.*?\)', '', line).strip()
        clean_line = re.sub(r';.*', '', clean_line).strip()
        
        if not clean_line:
            state.gcode_index += 1
            continue
            
        line_len = len(clean_line) + 1
        current_buffer_sum = sum(state.sent_buffer_lengths)
        if current_buffer_sum + line_len > 127:
            await asyncio.sleep(0.01)
            continue
            
        try:
            state.sent_buffer_lengths.append(line_len)
            await safe_write_serial((clean_line + "\n").encode())
            await broadcast({"type": "log", "direction": "out", "content": clean_line})
            
            state.gcode_index += 1
            if state.gcode_index % 5 == 0:
                await send_telemetry()
        except Exception as e:
            logger.error(f"Lỗi khi truyền dòng G-code: {e}")
            state.is_streaming = False
            await broadcast({"type": "stream_status", "status": "failed", "message": str(e)})
            break

# Data Models
class ConnectionConfig(BaseModel):
    port: str = "/dev/ttyACM0"
    baudrate: int = 115200

class CommandRequest(BaseModel):
    command: str

class Point2D(BaseModel):
    x: float
    y: float

class Point3D(BaseModel):
    x: float
    y: float
    z: float

class SystemSettingsRequest(BaseModel):
    port: Optional[str] = None
    baudrate: Optional[int] = None
    feedrate: Optional[float] = None
    swipe_feedrate: Optional[float] = None
    step_distance: Optional[float] = None
    tap_dwell: Optional[float] = None
    long_press_dwell: Optional[float] = None
    swipe_distance: Optional[float] = None
    pen_mode: Optional[str] = None
    pen_up_z: Optional[float] = None
    pen_down_z: Optional[float] = None
    pen_up_pwm: Optional[float] = None
    pen_down_pwm: Optional[float] = None
    pen_dwell: Optional[float] = None
    axis_dir_x: Optional[int] = None
    axis_dir_y: Optional[int] = None
    mm_per_px: Optional[float] = None
    work_origin: Optional[Point3D] = None
    cnc_tl: Optional[Point2D] = None
    cnc_tr: Optional[Point2D] = None
    cnc_bl: Optional[Point2D] = None
    cnc_br: Optional[Point2D] = None

PenSettingsRequest = SystemSettingsRequest

class StreamRequest(BaseModel):
    gcode: str

# API Routes
@app.get("/api/devices/ports")
async def get_serial_ports():
    ports_info = []
    seen = set()

    try:
        import serial.tools.list_ports
        for p in serial.tools.list_ports.comports():
            dev = p.device
            desc = p.description or dev
            hwid = p.hwid or ""
            
            # Identify OS-specific CNC compatible serial ports
            is_cnc = False
            if sys.platform.startswith('linux'):
                if 'ttyUSB' in dev or 'ttyACM' in dev:
                    is_cnc = True
            elif sys.platform.startswith('darwin'):
                if any(x in dev for x in ['tty.usb', 'cu.usb', 'tty.usbmodem', 'cu.usbmodem']):
                    is_cnc = True
            elif sys.platform.startswith('win'):
                if dev.upper().startswith('COM'):
                    is_cnc = True

            ports_info.append({
                "device": dev,
                "description": desc,
                "hwid": hwid,
                "recommended": is_cnc
            })
            seen.add(dev)
    except Exception as e:
        logger.error(f"Error enumerating serial ports via pyserial: {e}")

    # Fallback scanning if pyserial comports returned nothing or missed candidates
    if sys.platform.startswith('linux'):
        import glob
        linux_candidates = glob.glob('/dev/ttyACM*') + glob.glob('/dev/ttyUSB*')
        for dev in sorted(linux_candidates):
            if dev not in seen:
                seen.add(dev)
                ports_info.append({
                    "device": dev,
                    "description": f"USB Serial ({os.path.basename(dev)})",
                    "hwid": "",
                    "recommended": True
                })
    elif sys.platform.startswith('darwin'):
        import glob
        mac_candidates = glob.glob('/dev/tty.usb*') + glob.glob('/dev/cu.usb*')
        for dev in sorted(mac_candidates):
            if dev not in seen:
                seen.add(dev)
                ports_info.append({
                    "device": dev,
                    "description": f"USB Serial ({os.path.basename(dev)})",
                    "hwid": "",
                    "recommended": True
                })

    # Sort candidate ports first, then alphabetically by device name
    ports_info.sort(key=lambda x: (not x["recommended"], x["device"]))
    port_list = [p["device"] for p in ports_info]

    return {
        "ports": port_list,
        "details": ports_info,
        "platform": sys.platform
    }

@app.post("/api/connect")
async def connect_cnc(config: ConnectionConfig):
    if state.connected:
        if state.port_name == config.port:
            await broadcast({"type": "connection", "connected": True, "message": f"Đã kết nối {config.port}"})
            await send_telemetry()
            return {"status": "success", "message": f"Đã kết nối {config.port}"}
        else:
            return {"status": "error", "message": f"Máy CNC đang kết nối ở cổng {state.port_name}. Vui lòng ngắt kết nối trước."}
        
    state.port_name = config.port
    state.baudrate = config.baudrate
    
    if config.port == "dummy":
        state.serial_port = DummySerial()
        state.connected = True
        state.machine_state = "Chế Độ Giả Lập"
        state.reader_task = asyncio.create_task(serial_reader_loop())
        state.polling_task = asyncio.create_task(status_polling_loop())
        await broadcast({"type": "connection", "connected": True, "message": "Đã kết nối chế độ giả lập"})
        await send_telemetry()
        return {"status": "success", "message": "Đã kết nối dummy mode"}
        
    try:
        state.serial_port = serial.Serial(config.port, config.baudrate, timeout=0.1)
        state.connected = True
        state.machine_state = "Đang Khởi Tạo"
        state.reader_task = asyncio.create_task(serial_reader_loop())
        state.polling_task = asyncio.create_task(status_polling_loop())
        
        # Wake up GRBL
        await safe_write_serial(b"\r\n\r\n")
        await asyncio.sleep(1.0)
        
        await broadcast({"type": "connection", "connected": True, "message": f"Đã kết nối {config.port}"})
        await send_telemetry()
        return {"status": "success", "message": f"Đã kết nối {config.port}"}
    except Exception as e:
        state.connected = False
        owner = get_port_owner(config.port)
        msg = f"Không thể mở cổng {config.port}: {e}"
        if owner:
            msg += f" (Đang bị dùng bởi: {owner})"
        return {"status": "error", "message": msg}

@app.post("/api/disconnect")
async def disconnect_cnc():
    if not state.connected:
        return {"status": "success", "message": "Chưa kết nối"}
        
    state.connected = False
    if state.reader_task:
        state.reader_task.cancel()
    if state.polling_task:
        state.polling_task.cancel()
    if state.stream_task:
        state.stream_task.cancel()
        
    if state.serial_port:
        try:
            state.serial_port.close()
        except Exception:
            pass
    state.serial_port = None
    state.machine_state = "NGOẠI TUYẾN"
    
    await broadcast({"type": "connection", "connected": False, "message": "Đã ngắt kết nối"})
    return {"status": "success", "message": "Đã ngắt kết nối"}

@app.post("/api/command")
async def send_command(req: CommandRequest):
    if not state.connected or not state.serial_port:
        raise HTTPException(status_code=400, detail="Chưa kết nối CNC")
        
    raw_lines = [l.strip() for l in req.command.splitlines() if l.strip()]
    results = []
    
    for raw_line in raw_lines:
        translated_cmds = translate_command(raw_line)
        for cmd in translated_cmds:
            clean_cmd = cmd.strip()
            if not clean_cmd:
                continue
            try:
                await safe_write_serial((clean_cmd + "\n").encode())
                await broadcast({"type": "log", "direction": "out", "content": clean_cmd})
                results.append(clean_cmd)
            except Exception as e:
                logger.error(f"Lỗi gửi lệnh '{clean_cmd}': {e}")
                raise HTTPException(status_code=500, detail=str(e))
            
    return {"status": "success", "sent": results}

@app.get("/api/settings")
async def get_system_settings():
    return {
        "port": state.port_name,
        "baudrate": state.baudrate,
        "feedrate": state.jog_feedrate,
        "swipe_feedrate": getattr(state, 'swipe_feedrate', 10000.0),
        "step_distance": state.step_distance,
        "tap_dwell": getattr(state, 'gesture_tap_dwell', 0.05),
        "long_press_dwell": getattr(state, 'gesture_long_press_dwell', 1.5),
        "swipe_distance": getattr(state, 'gesture_distance', 40.0),
        "pen_mode": state.pen_mode,
        "pen_up_z": state.pen_up_z,
        "pen_down_z": state.pen_down_z,
        "pen_up_pwm": state.pen_up_pwm,
        "pen_down_pwm": state.pen_down_pwm,
        "pen_dwell": state.pen_dwell,
        "axis_dir_x": getattr(state, 'axis_dir_x', 1),
        "axis_dir_y": getattr(state, 'axis_dir_y', 1),
        "mm_per_px": getattr(state, 'mm_per_px', 0.05),
        "workpiece_origin": state.workpiece_origin,
        "work_origin": state.work_origin,
        "parking_point": state.parking_point,
        "cnc_tl": state.cnc_tl,
        "cnc_tr": state.cnc_tr,
        "cnc_bl": state.cnc_bl,
        "cnc_br": state.cnc_br,
        "cnc_bounds": {"tl": state.cnc_tl, "tr": state.cnc_tr, "bl": state.cnc_bl, "br": state.cnc_br},
    }

@app.post("/api/settings")
async def update_system_settings(req: SystemSettingsRequest):
    if req.port is not None: state.port_name = req.port
    if req.baudrate is not None: state.baudrate = req.baudrate
    if req.feedrate is not None: state.jog_feedrate = req.feedrate
    if req.swipe_feedrate is not None: state.swipe_feedrate = req.swipe_feedrate
    if req.step_distance is not None: state.step_distance = req.step_distance
    if req.tap_dwell is not None: state.gesture_tap_dwell = req.tap_dwell
    if req.long_press_dwell is not None: state.gesture_long_press_dwell = req.long_press_dwell
    if req.swipe_distance is not None: state.gesture_distance = req.swipe_distance
    if req.pen_mode is not None: state.pen_mode = req.pen_mode
    if req.pen_up_z is not None: state.pen_up_z = req.pen_up_z
    if req.pen_down_z is not None: state.pen_down_z = req.pen_down_z
    if req.pen_up_pwm is not None: state.pen_up_pwm = req.pen_up_pwm
    if req.pen_down_pwm is not None: state.pen_down_pwm = req.pen_down_pwm
    if req.pen_dwell is not None: state.pen_dwell = req.pen_dwell
    if req.axis_dir_x is not None: state.axis_dir_x = req.axis_dir_x
    if req.axis_dir_y is not None: state.axis_dir_y = req.axis_dir_y
    if req.mm_per_px is not None: state.mm_per_px = req.mm_per_px
    if req.work_origin is not None:
        state.work_origin = {"x": req.work_origin.x, "y": req.work_origin.y, "z": req.work_origin.z}
        state.home_set = True
    if req.cnc_tl is not None: state.cnc_tl = {"x": req.cnc_tl.x, "y": req.cnc_tl.y}
    if req.cnc_tr is not None: state.cnc_tr = {"x": req.cnc_tr.x, "y": req.cnc_tr.y}
    if req.cnc_bl is not None: state.cnc_bl = {"x": req.cnc_bl.x, "y": req.cnc_bl.y}
    if req.cnc_br is not None: state.cnc_br = {"x": req.cnc_br.x, "y": req.cnc_br.y}

    to_save = {
        "port": state.port_name,
        "baudrate": state.baudrate,
        "jog_feedrate": state.jog_feedrate,
        "swipe_feedrate": getattr(state, 'swipe_feedrate', 10000.0),
        "step_distance": state.step_distance,
        "gesture_tap_dwell": getattr(state, 'gesture_tap_dwell', 0.05),
        "gesture_long_press_dwell": getattr(state, 'gesture_long_press_dwell', 1.5),
        "gesture_distance": getattr(state, 'gesture_distance', 40.0),
        "pen_mode": state.pen_mode,
        "pen_up_z": state.pen_up_z,
        "pen_down_z": state.pen_down_z,
        "pen_up_pwm": state.pen_up_pwm,
        "pen_down_pwm": state.pen_down_pwm,
        "pen_dwell": state.pen_dwell,
        "axis_dir_x": getattr(state, 'axis_dir_x', 1),
        "axis_dir_y": getattr(state, 'axis_dir_y', 1),
        "mm_per_px": getattr(state, 'mm_per_px', 0.05),
        "work_origin": state.work_origin,
        "cnc_tl": state.cnc_tl,
        "cnc_tr": state.cnc_tr,
        "cnc_bl": state.cnc_bl,
        "cnc_br": state.cnc_br,
        "home_set": state.home_set
    }
    save_settings(to_save)
    await send_telemetry()
    return {"status": "success", "settings": await get_system_settings()}

@app.get("/api/pen_settings")
async def get_pen_settings():
    return await get_system_settings()

@app.post("/api/pen_settings")
async def update_pen_settings(req: PenSettingsRequest):
    if req.pen_mode is not None: state.pen_mode = req.pen_mode
    if req.pen_up_z is not None: state.pen_up_z = req.pen_up_z
    if req.pen_down_z is not None: state.pen_down_z = req.pen_down_z
    if req.pen_up_pwm is not None: state.pen_up_pwm = req.pen_up_pwm
    if req.pen_down_pwm is not None: state.pen_down_pwm = req.pen_down_pwm
    if req.pen_dwell is not None: state.pen_dwell = req.pen_dwell
    
    save_settings({
        "pen_mode": state.pen_mode,
        "pen_up_z": state.pen_up_z,
        "pen_down_z": state.pen_down_z,
        "pen_up_pwm": state.pen_up_pwm,
        "pen_down_pwm": state.pen_down_pwm,
        "pen_dwell": state.pen_dwell,
    })
    return {"status": "success", "settings": await get_pen_settings()}

@app.post("/api/origins/workpiece")
async def set_workpiece_origin(pt: Point3D):
    state.workpiece_origin = {"x": pt.x, "y": pt.y, "z": pt.z}
    save_settings({"workpiece_origin": state.workpiece_origin})
    await send_telemetry()
    return {"status": "success", "workpiece_origin": state.workpiece_origin}

@app.post("/api/origins/work")
async def set_work_origin(pt: Point3D):
    state.work_origin = {"x": pt.x, "y": pt.y, "z": pt.z}
    state.home_set = True
    save_settings({"work_origin": state.work_origin, "home_set": True})
    
    # Send G10 L20 P1 coordinate definition to CNC
    cmd = f"G10 L20 P1 X{pt.x:.3f} Y{pt.y:.3f} Z{pt.z:.3f}"
    if state.connected and state.serial_port:
        try:
            await safe_write_serial((cmd + "\n").encode())
            await broadcast({"type": "log", "direction": "out", "content": cmd})
        except Exception as e:
            logger.error(f"Error setting G10 work origin: {e}")
            
    await send_telemetry()
    return {"status": "success", "work_origin": state.work_origin}

@app.post("/api/origins/parking")
async def set_parking_point(pt: Point3D):
    state.parking_point = {"x": pt.x, "y": pt.y, "z": pt.z}
    save_settings({"parking_point": state.parking_point})
    await send_telemetry()
    return {"status": "success", "parking_point": state.parking_point}

@app.post("/api/origins/goto_parking")
async def goto_parking():
    if not state.connected or not state.serial_port:
        raise HTTPException(status_code=400, detail="Chưa kết nối CNC")
    
    px = state.parking_point.get("x", 0.0)
    py = state.parking_point.get("y", 0.0)
    pz = state.parking_point.get("z", 10.0)
    
    cmds = [f"G0 Z{pz:.3f}", f"G0 X{px:.3f} Y{py:.3f}"]
    for cmd in cmds:
        await safe_write_serial((cmd + "\n").encode())
        await broadcast({"type": "log", "direction": "out", "content": cmd})
        await asyncio.sleep(0.1)
        
    return {"status": "success", "message": "Đang di chuyển về điểm đỗ"}

@app.post("/api/start")
async def start_stream(req: StreamRequest):
    if not state.connected or not state.serial_port:
        raise HTTPException(status_code=400, detail="Chưa kết nối CNC")
        
    state.stream_gcode_lines = req.gcode.splitlines()
    state.gcode_index = 0
    state.is_streaming = True
    state.is_paused = False
    
    if state.stream_task and not state.stream_task.done():
        state.stream_task.cancel()
        
    state.stream_task = asyncio.create_task(gcode_streamer_task())
    await broadcast({"type": "stream_status", "status": "started"})
    return {"status": "success", "lines": len(state.stream_gcode_lines)}

@app.post("/api/stop")
async def stop_stream():
    state.is_streaming = False
    state.is_paused = False
    if state.stream_task and not state.stream_task.done():
        state.stream_task.cancel()
        
    if state.connected and state.serial_port:
        try:
            await safe_write_serial(b"\x18")# Chờ 0.5 - 1 giây để board hoàn tất Reset
            await asyncio.sleep(0.5) 
            # Gửi lệnh Unlock Alarm
            await safe_write_serial(b"$X\n")
            # nhấc dao 
            await safe_write_serial(f"G0 Z{state.pen_up_z}\n".encode())
            await broadcast({"type": "log", "direction": "out", "content": "<CTRL-X Reset>"})
        except Exception as e:
            logger.error(f"Lỗi khi gửi dừng khẩn cấp: {e}")
            
    await broadcast({"type": "stream_status", "status": "stopped"})
    return {"status": "success", "message": "Đã dừng khẩn cấp"}

@app.get("/api/state")
async def get_state():
    return {
        "connected": state.connected,
        "port": state.port_name,
        "baudrate": state.baudrate,
        "machine_state": state.machine_state,
        "mpos": state.mpos,
        "wpos": state.wpos,
        "workpiece_origin": state.workpiece_origin,
        "work_origin": state.work_origin,
        "parking_point": state.parking_point,
        "feedrate": state.feedrate,
        "spindle_speed": state.spindle_speed,
        "buffer_rx": state.buffer_rx,
        "streaming": state.is_streaming,
        "home_set": state.home_set
    }

# ----------------------------------------------------
# CNC API V1 - RESTful Endpoints (/cncapi/v1/...)
# ----------------------------------------------------

class V1JogRequest(BaseModel):
    direction: str  # "X+", "X-", "Y+", "Y-", "Z+", "Z-", "XY+", "X+Y+", "X-Y-", etc.
    step_distance: Optional[float] = None
    feedrate: Optional[float] = None

class V1MoveToRequest(BaseModel):
    x: float
    y: float
    z: Optional[float] = None
    feedrate: Optional[float] = None

class V1PenRequest(BaseModel):
    state: str  # "up" | "down"

class V1GestureRequest(BaseModel):
    type: str  # tap, double_tap, long_press, swipe_custom, swipe_left, swipe_right, swipe_up, swipe_down
    start_x: Optional[float] = 0.0
    start_y: Optional[float] = 0.0
    end_x: Optional[float] = 0.0
    end_y: Optional[float] = 0.0
    distance: Optional[float] = None
    feedrate: Optional[float] = None
    swipe_feedrate: Optional[float] = None
    tap_dwell: Optional[float] = None
    long_press_dwell: Optional[float] = None

class V1SetBoundPointRequest(BaseModel):
    corner: str  # "tl", "tr", "bl", "br"
    x: Optional[float] = None
    y: Optional[float] = None

class V1ScenarioCreateRequest(BaseModel):
    name: str

class V1ScenarioAddStepRequest(BaseModel):
    type: str
    x: Optional[float] = None
    y: Optional[float] = None
    z: Optional[float] = None
    duration: Optional[float] = None

class V1ScenarioReorderRequest(BaseModel):
    from_index: int
    to_index: int

class V1ScenarioPinRequest(BaseModel):
    index: int

class V1ScenarioRunRequest(BaseModel):
    loop: Optional[bool] = False

class V1ScenarioImportRequest(BaseModel):
    name: Optional[str] = "kich_ban_1"
    actions: List[dict] = []

# V1 Connection & Settings Endpoints
@app.get("/cncapi/v1/connection/ports")
async def v1_get_ports():
    return await get_serial_ports()

@app.post("/cncapi/v1/connection/connect")
async def v1_connect(config: ConnectionConfig):
    return await connect_cnc(config)

@app.post("/cncapi/v1/connection/disconnect")
async def v1_disconnect():
    return await disconnect_cnc()

@app.get("/cncapi/v1/settings")
async def v1_get_settings():
    return await get_system_settings()

@app.post("/cncapi/v1/settings")
async def v1_update_settings(req: SystemSettingsRequest):
    return await update_system_settings(req)

# V1 Motion Endpoints
@app.post("/cncapi/v1/motion/jog")
async def v1_jog(req: V1JogRequest):
    if not state.connected or not state.serial_port:
        raise HTTPException(status_code=400, detail="Chưa kết nối CNC")

    step = req.step_distance if req.step_distance is not None else state.step_distance
    feed = req.feedrate if req.feedrate is not None else state.jog_feedrate

    dir_upper = req.direction.upper().strip()
    dx, dy, dz = 0.0, 0.0, 0.0

    if "X+" in dir_upper: dx += 1.0
    elif "X-" in dir_upper: dx -= 1.0

    if "Y+" in dir_upper: dy += 1.0
    elif "Y-" in dir_upper: dy -= 1.0

    if "Z+" in dir_upper: dz += 1.0
    elif "Z-" in dir_upper: dz -= 1.0

    move_x = dx * step
    move_y = dy * step
    move_z = dz * step

    lines = ["G91"]
    move_cmd = "G0"
    if dx != 0: move_cmd += f" X{move_x:.2f}"
    if dy != 0: move_cmd += f" Y{move_y:.2f}"
    if dz != 0: move_cmd += f" Z{move_z:.2f}"
    move_cmd += f" F{feed}"
    lines.append(move_cmd)
    lines.append("G90")

    gcode = "\n".join(lines)
    translated_cmds = translate_command(gcode)
    results = []
    for cmd in translated_cmds:
        clean_cmd = cmd.strip()
        if not clean_cmd: continue
        await safe_write_serial((clean_cmd + "\n").encode())
        await broadcast({"type": "log", "direction": "out", "content": clean_cmd})
        results.append(clean_cmd)

    return {"status": "success", "sent": results}

@app.post("/cncapi/v1/motion/move_to")
async def v1_move_to(req: V1MoveToRequest):
    if not state.connected or not state.serial_port:
        raise HTTPException(status_code=400, detail="Chưa kết nối CNC")

    feed = req.feedrate if req.feedrate is not None else state.jog_feedrate
    cmd = f"G90\nG0 X{req.x:.2f} Y{req.y:.2f}"
    if req.z is not None:
        cmd += f" Z{req.z:.2f}"
    cmd += f" F{feed}"

    for raw in cmd.splitlines():
        clean = raw.strip()
        if clean:
            await safe_write_serial((clean + "\n").encode())
            await broadcast({"type": "log", "direction": "out", "content": clean})

    return {"status": "success", "message": f"Đang di chuyển đến X:{req.x}, Y:{req.y}"}

class StopAndReturnRequest(BaseModel):
    target_x: float = 0.0
    target_y: float = 0.0
    z_safe: float = 0.0
    pen_mode: str = "spindle-pwm"

@app.post("/cncapi/v1/motion/stop")
async def v1_motion_stop():
    return await stop_stream()

@app.post("/cncapi/v1/motion/stop-and-return")
async def v1_motion_stop_and_return(req: StopAndReturnRequest):
    state.is_streaming = False
    state.is_paused = False
    if state.stream_task and not state.stream_task.done():
        state.stream_task.cancel()
        
    if state.connected and state.serial_port:
        try:
            # 1. Gửi b"\x18" Soft Reset để clear các lệnh đã nạp trong bộ đệm GRBL
            await safe_write_serial(b"\x18")
            await asyncio.sleep(0.5)
            # 2. Unlock GRBL sau reset
            await safe_write_serial(b"$X\n")
            await asyncio.sleep(0.1)
            # 3. Nhấc dao lên trước khi di chuyển
            if req.pen_mode == "spindle-pwm":
                lift_cmd = f"M3 S{int(req.z_safe if req.z_safe > 0 else 10)}\n"
            else:
                lift_cmd = f"G0 Z{req.z_safe:.2f}\n"
            await safe_write_serial(lift_cmd.encode())
            await asyncio.sleep(0.1)
            # 4. Di chuyển tới vị trí mục tiêu quy định
            move_cmd = f"G21\nG90\nG0 X{req.target_x:.2f} Y{req.target_y:.2f}\n"
            await safe_write_serial(move_cmd.encode())
            await asyncio.sleep(0.3)
            # 5. Unlock lần nữa để các thao tác khác thực hiện được ngay
            await safe_write_serial(b"$X\n")
            await broadcast({"type": "log", "direction": "out", "content": f"<CTRL-X Reset & Return to X{req.target_x:.2f} Y{req.target_y:.2f}>"})
        except Exception as e:
            logger.error(f"Lỗi khi dừng và về gốc quy định: {e}")
            
    await broadcast({"type": "stream_status", "status": "stopped"})
    return {"status": "success", "message": f"Đã dừng khẩn cấp và di chuyển về X={req.target_x}, Y={req.target_y}"}

@app.post("/cncapi/v1/motion/pen")
async def v1_motion_pen(req: V1PenRequest):
    if not state.connected or not state.serial_port:
        raise HTTPException(status_code=400, detail="Chưa kết nối CNC")

    state_type = req.state.lower().strip()
    if state_type == "up":
        cmd = f"M3 S{state.pen_up_pwm}" if state.pen_mode == "spindle-pwm" else f"G0 Z{state.pen_up_z}"
    else:
        cmd = f"M3 S{state.pen_down_pwm}" if state.pen_mode == "spindle-pwm" else f"G0 Z{state.pen_down_z}"

    await safe_write_serial((cmd + "\n").encode())
    await broadcast({"type": "log", "direction": "out", "content": cmd})
    return {"status": "success", "command": cmd}

# V1 Gestures Endpoints
@app.post("/cncapi/v1/gestures/execute")
async def v1_execute_gesture(req: V1GestureRequest):
    if not state.connected or not state.serial_port:
        raise HTTPException(status_code=400, detail="Chưa kết nối CNC")
    if not state.home_set:
        raise HTTPException(status_code=400, detail="Cần đặt gốc tọa độ làm việc trước!")

    feed = req.feedrate if req.feedrate is not None else state.jog_feedrate
    swipe_feed = req.swipe_feedrate if req.swipe_feedrate is not None else getattr(state, 'swipe_feedrate', 10000.0)
    tap_dwell = req.tap_dwell if req.tap_dwell is not None else getattr(state, 'gesture_tap_dwell', 0.05)
    long_press_dwell = req.long_press_dwell if req.long_press_dwell is not None else getattr(state, 'gesture_long_press_dwell', 1.5)
    swipe_dist = req.distance if req.distance is not None else getattr(state, 'gesture_distance', 40.0)

    is_spindle = state.pen_mode == "spindle-pwm"
    p_down = f"M3 S{state.pen_down_pwm}" if is_spindle else f"G0 Z{state.pen_down_z}"
    p_up = f"M3 S{state.pen_up_pwm}" if is_spindle else f"G0 Z{state.pen_up_z}"

    gcode = []
    gtype = req.type.lower()

    if gtype == "tap":
        gcode.extend([p_down, f"G4 P{tap_dwell}", p_up])
    elif gtype == "double_tap":
        gcode.extend([p_down, f"G4 P{tap_dwell}", p_up, f"G4 P{tap_dwell}", p_down, f"G4 P{tap_dwell}", p_up])
    elif gtype == "long_press":
        gcode.extend([p_down, f"G4 P{long_press_dwell}", p_up])
    elif gtype == "swipe_custom":
        gcode.extend(["G90", p_up, f"G0 X{req.start_x:.2f} Y{req.start_y:.2f} F{feed}", p_down, "G4 P0.02", f"G1 X{req.end_x:.2f} Y{req.end_y:.2f} F{swipe_feed}", p_up])
    elif gtype == "swipe_left":
        gcode.extend([p_down, "G4 P0.02", "G91", f"G1 X-{swipe_dist} F{swipe_feed}", "G90", p_up])
    elif gtype == "swipe_right":
        gcode.extend([p_down, "G4 P0.02", "G91", f"G1 X{swipe_dist} F{swipe_feed}", "G90", p_up])
    elif gtype == "swipe_up":
        gcode.extend([p_down, "G4 P0.02", "G91", f"G1 Y{swipe_dist} F{swipe_feed}", "G90", p_up])
    elif gtype == "swipe_down":
        gcode.extend([p_down, "G4 P0.02", "G91", f"G1 Y-{swipe_dist} F{swipe_feed}", "G90", p_up])
    else:
        raise HTTPException(status_code=400, detail=f"Loại cử chỉ không hợp lệ: {req.type}")

    for line in gcode:
        await safe_write_serial((line + "\n").encode())
        await broadcast({"type": "log", "direction": "out", "content": line})

    return {"status": "success", "type": req.type, "gcode": gcode}

# V1 Origins Endpoints
@app.post("/cncapi/v1/origin/set_work")
async def v1_set_work_origin(pt: Optional[Point3D] = None):
    if pt is None:
        pt = Point3D(x=0.0, y=0.0, z=0.0)
    return await set_work_origin(pt)

@app.post("/cncapi/v1/origin/goto_work")
async def v1_goto_work_origin():
    if not state.connected or not state.serial_port:
        raise HTTPException(status_code=400, detail="Chưa kết nối CNC")

    feed = state.jog_feedrate
    cmds = ["G90", f"G0 X0 Y0 F{feed}"]
    for cmd in cmds:
        await safe_write_serial((cmd + "\n").encode())
        await broadcast({"type": "log", "direction": "out", "content": cmd})

    return {"status": "success", "message": "Đang di chuyển về gốc làm việc (0,0)"}

@app.post("/cncapi/v1/origin/set_parking")
async def v1_set_parking(pt: Point3D):
    return await set_parking_point(pt)

@app.post("/cncapi/v1/origin/goto_parking")
async def v1_goto_parking():
    return await goto_parking()

@app.post("/cncapi/v1/origin/home")
async def v1_origin_home():
    return await send_command(CommandRequest(command="$H"))

@app.post("/cncapi/v1/origin/unlock")
async def v1_origin_unlock():
    return await send_command(CommandRequest(command="$X"))

@app.get("/cncapi/v1/origin/bounds")
async def v1_get_origin_bounds():
    return {
        "status": "success",
        "bounds": {
            "tl": state.cnc_tl,
            "tr": state.cnc_tr,
            "bl": state.cnc_bl,
            "br": state.cnc_br
        }
    }

@app.post("/cncapi/v1/origin/set_bound_point")
async def v1_set_bound_point(req: V1SetBoundPointRequest):
    corner = req.corner.lower().strip()
    if corner not in ["tl", "tr", "bl", "br"]:
        raise HTTPException(status_code=400, detail="Góc không hợp lệ! Phải là 'tl', 'tr', 'bl', hoặc 'br'")

    if req.x is not None and req.y is not None:
        px = round(req.x, 2)
        py = round(req.y, 2)
    else:
        # Defaults to current relative work position
        rel_x = state.wpos[0] - state.work_origin.get("x", 0.0)
        rel_y = state.wpos[1] - state.work_origin.get("y", 0.0)
        px = round(rel_x, 2)
        py = round(rel_y, 2)

    point = {"x": px, "y": py}
    if corner == "tl": state.cnc_tl = point
    elif corner == "tr": state.cnc_tr = point
    elif corner == "bl": state.cnc_bl = point
    elif corner == "br": state.cnc_br = point

    to_save = {
        "cnc_tl": state.cnc_tl,
        "cnc_tr": state.cnc_tr,
        "cnc_bl": state.cnc_bl,
        "cnc_br": state.cnc_br
    }
    save_settings(to_save)
    await send_telemetry()
    return {
        "status": "success",
        "corner": corner,
        "point": point,
        "bounds": {
            "tl": state.cnc_tl,
            "tr": state.cnc_tr,
            "bl": state.cnc_bl,
            "br": state.cnc_br
        }
    }

@app.delete("/cncapi/v1/origin/bounds")
async def v1_clear_origin_bounds():
    state.cnc_tl = None
    state.cnc_tr = None
    state.cnc_bl = None
    state.cnc_br = None
    save_settings({"cnc_tl": None, "cnc_tr": None, "cnc_bl": None, "cnc_br": None})
    await send_telemetry()
    return {"status": "success", "message": "Đã xóa 4 góc định vị"}

# V1 Scenario Session Endpoints
@app.get("/cncapi/v1/scenario/session")
async def v1_get_scenario_session():
    return {
        "name": state.scenario_name,
        "actions": state.scenario_actions,
        "insert_index": state.scenario_insert_index,
        "is_looping": state.scenario_is_looping,
        "count": len(state.scenario_actions)
    }

@app.post("/cncapi/v1/scenario/session/create")
async def v1_create_scenario_session(req: V1ScenarioCreateRequest):
    if not req.name.strip():
        raise HTTPException(status_code=400, detail="Cần nhập tên kịch bản!")
    state.scenario_name = req.name.strip()
    state.scenario_actions = []
    state.scenario_insert_index = -1
    state.scenario_is_looping = False
    await send_telemetry()
    return {"status": "success", "name": state.scenario_name}

@app.post("/cncapi/v1/scenario/session/add_step")
async def v1_add_scenario_step(req: V1ScenarioAddStepRequest):
    if not state.home_set:
        raise HTTPException(status_code=400, detail="Cần đặt gốc tọa độ làm việc trước!")

    # Calculate relative work position if missing
    rel_x = req.x if req.x is not None else (state.wpos[0] - state.work_origin.get("x", 0.0))
    rel_y = req.y if req.y is not None else (state.wpos[1] - state.work_origin.get("y", 0.0))
    rel_z = req.z if req.z is not None else state.wpos[2]

    action = {
        "type": req.type,
        "x": round(float(rel_x), 2),
        "y": round(float(rel_y), 2),
        "z": round(float(rel_z), 2)
    }
    if req.duration is not None:
        action["duration"] = float(req.duration)

    if state.scenario_insert_index != -1 and state.scenario_insert_index < len(state.scenario_actions):
        state.scenario_actions.insert(state.scenario_insert_index + 1, action)
        state.scenario_insert_index += 1
    else:
        state.scenario_actions.append(action)

    await send_telemetry()
    return {
        "status": "success",
        "action": action,
        "insert_index": state.scenario_insert_index,
        "count": len(state.scenario_actions)
    }

@app.get("/cncapi/v1/scenario/session/steps")
async def v1_get_scenario_steps():
    return {
        "actions": state.scenario_actions,
        "insert_index": state.scenario_insert_index,
        "count": len(state.scenario_actions)
    }

@app.delete("/cncapi/v1/scenario/session/steps/{step_index}")
async def v1_delete_scenario_step(step_index: int):
    if step_index < 0 or step_index >= len(state.scenario_actions):
        raise HTTPException(status_code=404, detail="Chỉ số bước không hợp lệ")

    deleted = state.scenario_actions.pop(step_index)
    if state.scenario_insert_index == step_index:
        state.scenario_insert_index = -1
    elif state.scenario_insert_index > step_index:
        state.scenario_insert_index -= 1

    await send_telemetry()
    return {"status": "success", "deleted": deleted, "count": len(state.scenario_actions)}

@app.delete("/cncapi/v1/scenario/session/steps")
async def v1_clear_scenario_steps():
    state.scenario_actions = []
    state.scenario_insert_index = -1
    await send_telemetry()
    return {"status": "success", "message": "Đã xóa toàn bộ bước kịch bản"}

@app.post("/cncapi/v1/scenario/session/reorder")
async def v1_reorder_scenario_step(req: V1ScenarioReorderRequest):
    total = len(state.scenario_actions)
    if req.from_index < 0 or req.from_index >= total or req.to_index < 0 or req.to_index >= total:
        raise HTTPException(status_code=400, detail="Chỉ số sắp xếp không hợp lệ")

    item = state.scenario_actions.pop(req.from_index)
    state.scenario_actions.insert(req.to_index, item)

    if state.scenario_insert_index == req.from_index:
        state.scenario_insert_index = req.to_index
    elif req.from_index < state.scenario_insert_index <= req.to_index:
        state.scenario_insert_index -= 1
    elif req.to_index <= state.scenario_insert_index < req.from_index:
        state.scenario_insert_index += 1

    await send_telemetry()
    return {"status": "success", "actions": state.scenario_actions}

@app.post("/cncapi/v1/scenario/session/pin")
async def v1_pin_scenario_step(req: V1ScenarioPinRequest):
    if req.index < -1 or req.index >= len(state.scenario_actions):
        raise HTTPException(status_code=400, detail="Vị trí ghim không hợp lệ")

    if state.scenario_insert_index == req.index:
        state.scenario_insert_index = -1
    else:
        state.scenario_insert_index = req.index

    await send_telemetry()
    return {"status": "success", "insert_index": state.scenario_insert_index}

@app.get("/cncapi/v1/scenario/session/gcode")
async def v1_get_scenario_gcode():
    gcode = generate_scenario_gcode(state.scenario_actions)
    return {"status": "success", "gcode": gcode}

@app.post("/cncapi/v1/scenario/session/run")
async def v1_run_scenario_session(req: Optional[V1ScenarioRunRequest] = None):
    if not state.home_set:
        raise HTTPException(status_code=400, detail="Cần đặt gốc tọa độ làm việc trước!")
    if not state.scenario_actions:
        raise HTTPException(status_code=400, detail="Kịch bản trống! Vui lòng thêm các bước trước.")

    loop = req.loop if req is not None and req.loop is not None else False
    state.scenario_is_looping = loop

    gcode_str = generate_scenario_gcode(state.scenario_actions)
    res = await start_stream(StreamRequest(gcode=gcode_str))
    await send_telemetry()
    return {"status": "success", "looping": state.scenario_is_looping, "stream": res}

@app.post("/cncapi/v1/scenario/session/stop")
async def v1_stop_scenario_session():
    state.scenario_is_looping = False
    res = await stop_stream()
    await send_telemetry()
    return {"status": "success", "message": "Đã dừng chạy kịch bản", "stream": res}

@app.get("/cncapi/v1/scenario/session/export")
async def v1_export_scenario_session():
    data = {
        "name": state.scenario_name,
        "actions": state.scenario_actions
    }
    return JSONResponse(
        content=data,
        headers={"Content-Disposition": f'attachment; filename="{state.scenario_name}.json"'}
    )

@app.post("/cncapi/v1/scenario/session/import")
async def v1_import_scenario_session(req: V1ScenarioImportRequest):
    state.scenario_name = req.name if req.name else "kich_ban_1"
    state.scenario_actions = req.actions
    state.scenario_insert_index = -1
    await send_telemetry()
    return {"status": "success", "name": state.scenario_name, "count": len(state.scenario_actions)}

# Font & Gcode APIs
class FontGcodeRequest(BaseModel):
    font_name: str
    text: str
    font_size_pt: float = 72.0
    line_spacing: float = 1.2
    line_spacing_mm: float = 0.0
    z_safe: float = 0.0
    z_draw: float = 45.0
    feed_rate: float = 4000.0
    margin_mm: float = 5.0
    epsilon: float = 1.2
    binary_threshold: int = 128
    render_dpi: int = 600
    min_path_len_mm: float = 0.5
    sort_row_height_mm: float = 10.0
    stroke_mode: str = "single_line"
    pen_mode: Optional[str] = None
    axis_dir_y: Optional[int] = None

class RunGcodeRequest(BaseModel):
    gcode: str

@app.get("/cncapi/v1/fonts")
@app.get("/api/fonts")
def list_available_fonts():
    fonts_dir = os.path.join(os.path.dirname(__file__), "fonts")
    if not os.path.exists(fonts_dir):
        os.makedirs(fonts_dir, exist_ok=True)
    font_files = []
    valid_exts = (".ttf", ".otf", ".woff", ".woff2")
    for f in os.listdir(fonts_dir):
        if f.lower().endswith(valid_exts) and f not in font_files:
            font_files.append(f)
            
    root_dir = os.path.dirname(__file__)
    for f in os.listdir(root_dir):
        if f.lower().endswith(valid_exts) and f not in font_files:
            font_files.append(f)
            
    font_files.sort()
    return {"fonts": font_files}

@app.post("/cncapi/v1/generate-font-gcode")
@app.post("/api/generate-font-gcode")
def generate_font_gcode(req: FontGcodeRequest):
    try:
        import unicodedata
        import numpy as np
        from PIL import Image, ImageDraw, ImageFont
        try:
            import cv2
        except ImportError:
            cv2 = None
        try:
            from skimage.morphology import skeletonize
        except ImportError:
            skeletonize = None

        fonts_dir = os.path.join(os.path.dirname(__file__), "fonts")
        font_path = os.path.join(fonts_dir, req.font_name)
        if not os.path.exists(font_path):
            font_path = os.path.join(os.path.dirname(__file__), req.font_name)
            
        if not os.path.exists(font_path):
            return JSONResponse({"status": "error", "message": f"File font '{req.font_name}' không tồn tại"}, status_code=404)

        normalized_text = unicodedata.normalize('NFC', req.text)
        if not normalized_text.strip():
            return {
                "status": "ok",
                "gcode": "",
                "preview_paths": [],
                "actual_w_mm": 0.0,
                "actual_h_mm": 0.0,
                "total_paths": 0,
                "lines_count": 0
            }

        MM_PER_PT = 25.4 / 72.0
        RENDER_DPI = req.render_dpi if req.render_dpi and req.render_dpi >= 72 else 600
        font_size_px = int(req.font_size_pt * (RENDER_DPI / 72.0))
        if font_size_px < 8:
            font_size_px = 8

        font = ImageFont.truetype(font_path, size=font_size_px)

        scale_mm_per_px = (req.font_size_pt * MM_PER_PT) / font_size_px
        extra_spacing_px = max(0, int(req.line_spacing_mm / scale_mm_per_px))
        spacing_px = max(0, int(font_size_px * (req.line_spacing - 1.0))) + extra_spacing_px

        dummy_img = Image.new("L", (1, 1))
        draw_dummy = ImageDraw.Draw(dummy_img)
        bbox = draw_dummy.multiline_textbbox((0, 0), normalized_text, font=font, spacing=spacing_px)

        pad_px = int(40 * (RENDER_DPI / 72.0) / 4)
        raw_w_px = max(1, bbox[2] - bbox[0])
        raw_h_px = max(1, bbox[3] - bbox[1])

        canvas_w_px = raw_w_px + pad_px * 2
        canvas_h_px = raw_h_px + pad_px * 2

        img = Image.new("L", (canvas_w_px, canvas_h_px), color=255)
        draw = ImageDraw.Draw(img)
        draw.multiline_text((pad_px - bbox[0], pad_px - bbox[1]), normalized_text, fill=0, font=font, spacing=spacing_px)

        img_np = np.array(img)
        thresh_val = req.binary_threshold if req.binary_threshold and 1 <= req.binary_threshold <= 254 else 128
        binary_img = img_np < thresh_val

        if req.stroke_mode == "single_line" and skeletonize is not None:
            skeleton = skeletonize(binary_img)
            contour_img = (skeleton * 255).astype(np.uint8)
        else:
            contour_img = (binary_img * 255).astype(np.uint8)

        if cv2 is not None:
            contours, _ = cv2.findContours(contour_img, cv2.RETR_LIST, cv2.CHAIN_APPROX_NONE)
        else:
            contours = []

        if not contours:
            return {
                "status": "ok",
                "gcode": "",
                "preview_paths": [],
                "actual_w_mm": 0.0,
                "actual_h_mm": 0.0,
                "total_paths": 0,
                "lines_count": 0
            }

        scale_mm_per_px = (req.font_size_pt * MM_PER_PT) / font_size_px
        actual_w_mm = raw_w_px * scale_mm_per_px
        actual_h_mm = raw_h_px * scale_mm_per_px

        effective_axis_dir_y = req.axis_dir_y if req.axis_dir_y is not None else getattr(state, 'axis_dir_y', 1)

        raw_paths = []
        min_path_len_mm = req.min_path_len_mm if req.min_path_len_mm is not None else 0.5
        for contour in contours:
            if len(contour) < 2:
                continue
            if cv2 is not None:
                approx = cv2.approxPolyDP(contour, epsilon=req.epsilon, closed=False)
                pts = approx.reshape(-1, 2)
            else:
                pts = contour.reshape(-1, 2)

            path_mm = []
            for pt in pts:
                x_mm = round((pt[0] - pad_px) * scale_mm_per_px + req.margin_mm, 2)
                if effective_axis_dir_y == -1:
                    y_mm = round((raw_h_px - (pt[1] - pad_px)) * scale_mm_per_px + req.margin_mm, 2)
                else:
                    y_mm = round((pt[1] - pad_px) * scale_mm_per_px + req.margin_mm, 2)
                path_mm.append((x_mm, y_mm))

            if len(path_mm) >= 2:
                # Calculate path length in mm
                path_len = sum(np.hypot(path_mm[i][0] - path_mm[i-1][0], path_mm[i][1] - path_mm[i-1][1]) for i in range(1, len(path_mm)))
                if path_len >= min_path_len_mm:
                    raw_paths.append(path_mm)

        # Calculate line height in mm to group text lines accurately
        line_height_mm = (font_size_px + spacing_px) * scale_mm_per_px
        if line_height_mm <= 0:
            line_height_mm = actual_h_mm + 1.0

        # Step 1: Re-orient each stroke to flow strictly Left-to-Right and Top-to-Bottom
        oriented_paths = []
        for path in raw_paths:
            p_start = path[0]
            p_end = path[-1]
            
            should_reverse = False
            # If stroke moves Right-to-Left (p_end[0] < p_start[0]), reverse it to flow Left-to-Right
            if p_end[0] < p_start[0] - 0.1:
                should_reverse = True
            elif abs(p_end[0] - p_start[0]) <= 0.1:
                # Vertical stroke: flow Top-to-Bottom
                if effective_axis_dir_y == 1 and p_end[1] < p_start[1] - 0.1:
                    should_reverse = True
                elif effective_axis_dir_y == -1 and p_end[1] > p_start[1] + 0.1:
                    should_reverse = True

            if should_reverse:
                oriented_paths.append(list(reversed(path)))
            else:
                oriented_paths.append(path)

        # Step 2: Sort strokes strictly Left-to-Right within each text line (Row)
        def get_stroke_sort_key(path):
            xs = [pt[0] for pt in path]
            ys = [pt[1] for pt in path]
            min_x = min(xs)
            mid_y = (min(ys) + max(ys)) / 2.0
            
            # Determine line index from stroke center Y
            if effective_axis_dir_y == 1:
                line_idx = int(mid_y / line_height_mm)
            else:
                line_idx = int((actual_h_mm - mid_y) / line_height_mm)
                
            # Sort strictly: 1. Text Line Index (Top to Bottom), 2. Left-to-Right (min_x), 3. start_x
            return (line_idx, min_x, path[0][0])

        sorted_paths = sorted(oriented_paths, key=get_stroke_sort_key)

        effective_pen_mode = req.pen_mode if req.pen_mode else getattr(state, 'pen_mode', 'spindle-pwm')
        pen_up_cmd = f"G0 Z{req.z_safe:.2f}"
        pen_down_cmd = f"G1 Z{req.z_draw:.2f} F{req.feed_rate:.0f}"

        first_line = req.text.splitlines()[0] if req.text else ""
        gcode = [
            f"; --- G-CODE CNC FONT ---",
            f"; Chuoi: {first_line[:40]}",
            f"; Font: {req.font_name}",
            f"; Font Size: {req.font_size_pt} pt",
            f"; Kich thuoc thuc te: {actual_w_mm:.2f} x {actual_h_mm:.2f} mm",
            f"; Pen Mode: {effective_pen_mode}",
            "G21 ; Don vi: mm",
            "G90 ; Toa do tuyet doi",
            f"{pen_up_cmd} ; Lift Pen\n"
        ]

        preview_paths = []
        for path in sorted_paths:
            start_pt = path[0]
            gcode.append(f"G0 X{start_pt[0]:.2f} Y{start_pt[1]:.2f}")
            gcode.append(pen_down_cmd)

            preview_path = [[start_pt[0], start_pt[1]]]
            for pt in path[1:]:
                gcode.append(f"G1 X{pt[0]:.2f} Y{pt[1]:.2f}")
                preview_path.append([pt[0], pt[1]])

            gcode.append(pen_up_cmd)
            gcode.append("")
            preview_paths.append(preview_path)

        gcode.extend(["G0 X0 Y0 ; Tra ve goc", "M30 ; Ket thuc"])
        gcode_str = "\n".join(gcode)

        return {
            "status": "ok",
            "gcode": gcode_str,
            "preview_paths": preview_paths,
            "actual_w_mm": round(actual_w_mm, 2),
            "actual_h_mm": round(actual_h_mm, 2),
            "total_paths": len(sorted_paths),
            "lines_count": len(gcode)
        }
    except Exception as e:
        logger.error(f"Lỗi generate font gcode: {e}")
        return JSONResponse({"status": "error", "message": str(e)}, status_code=500)

def sort_gcode_paths_left_to_right(gcode_text: str, feed_rate: int = 2000, mode: str = "servo", sort_row_height_mm: float = 10.0) -> Tuple[str, List[dict]]:
    paths = []
    current_path = []
    current_x = 0.0
    current_y = 0.0

    x_pattern = re.compile(r'X([\d\.-]+)', re.IGNORECASE)
    y_pattern = re.compile(r'Y([\d\.-]+)', re.IGNORECASE)

    for line in gcode_text.splitlines():
        line_str = line.strip()
        if not line_str or line_str.startswith(';') or line_str.startswith('('):
            continue

        cmd_upper = line_str.upper()
        if cmd_upper.startswith('G0') or cmd_upper.startswith('G00'):
            x_match = x_pattern.search(line_str)
            y_match = y_pattern.search(line_str)
            if x_match: current_x = float(x_match.group(1))
            if y_match: current_y = float(y_match.group(1))
            if current_path:
                if len(current_path) > 1:
                    paths.append(current_path)
                current_path = []
            current_path.append((current_x, current_y))
        elif cmd_upper.startswith('G1') or ('X' in cmd_upper or 'Y' in cmd_upper):
            x_match = x_pattern.search(line_str)
            y_match = y_pattern.search(line_str)
            if x_match: current_x = float(x_match.group(1))
            if y_match: current_y = float(y_match.group(1))
            if not current_path:
                current_path.append((current_x, current_y))
            else:
                current_path.append((current_x, current_y))

    if current_path and len(current_path) > 1:
        paths.append(current_path)

    if not paths:
        return gcode_text, []

    # Bước 1: Đảo hướng nét vẽ giống thứ tự của Gcode with font (Left-to-Right, Top-to-Bottom)
    oriented_paths = []
    for path in paths:
        if not path or len(path) <= 1:
            oriented_paths.append(path)
            continue

        p_start = path[0]
        p_end = path[-1]

        should_reverse = False
        # Nếu nét vẽ di chuyển từ Phải sang Trái (p_end[0] < p_start[0] - 0.1), đảo ngược lại để vẽ từ Trái sang Phải
        if p_end[0] < p_start[0] - 0.1:
            should_reverse = True
        elif abs(p_end[0] - p_start[0]) <= 0.1:
            # Nét dọc đứng: ưu tiên vẽ từ Trên xuống Dưới
            if p_end[1] < p_start[1] - 0.1:
                should_reverse = True

        if should_reverse:
            oriented_paths.append(list(reversed(path)))
        else:
            oriented_paths.append(path)

    # Bước 2: Sắp xếp các đường nét ưu tiên tuyệt đối từ Trái sang Phải (min_x) trong cùng hàng (Row) giống Gcode with font
    def get_stroke_sort_key(path):
        xs = [pt[0] for pt in path]
        ys = [pt[1] for pt in path]
        min_x = min(xs)
        mid_y = (min(ys) + max(ys)) / 2.0
        line_idx = int(mid_y / sort_row_height_mm)
        # Sắp xếp tuyệt đối: 1. Chỉ số hàng (Top to Bottom), 2. Left-to-Right (min_x), 3. start_x
        return (line_idx, min_x, path[0][0])

    sorted_paths = sorted(oriented_paths, key=get_stroke_sort_key)

    if mode == "servo":
        pen_down = "M3 S90"
        pen_up = "M3 S10"
    else:
        pen_down = "G1 Z-1.0 F500"
        pen_up = "G0 Z2.0"

    new_gcode = [
        "; --- G-CODE IMAGE (Strict Left-to-Right Order - Identical to Gcode Font) ---",
        "G21 ; Don vi: mm",
        "G90 ; Toa do tuyet doi",
        f"G0 Z2.0",
        f"F{feed_rate}"
    ]

    segments = []
    for i, path in enumerate(sorted_paths):
        new_gcode.append(f"; --- Net ve thu {i+1} ---")
        start_pt = path[0]
        new_gcode.append(f"G0 X{start_pt[0]:.2f} Y{start_pt[1]:.2f}")
        new_gcode.append(pen_down)

        curr_x, curr_y = start_pt
        for pt in path[1:]:
            new_gcode.append(f"G1 X{pt[0]:.2f} Y{pt[1]:.2f}")
            segments.append({
                "x1": curr_x, "y1": curr_y,
                "x2": pt[0], "y2": pt[1]
            })
            curr_x, curr_y = pt[0], pt[1]

        new_gcode.append(pen_up)

    new_gcode.append("G0 X0 Y0")
    new_gcode.append("M30")

    return "\n".join(new_gcode), segments

@app.post("/cncapi/v1/convert-image-gcode")
@app.post("/api/gcode-editor/convert")
async def convert_image_gcode(
    file: UploadFile = File(...),
    scale_factor: float = Form(0.1),
    feed_rate: int = Form(2000),
    mode: str = Form("servo"),
    algorithm: str = Form("sketch"),
    active_tab: str = Form("sketch"),
    clahe_clip_limit: float = Form(1.5),
    blur_size: int = Form(3),
    canny_ultra_low: int = Form(5),
    canny_ultra_high: int = Form(25),
    canny_medium_low: int = Form(20),
    canny_medium_high: int = Form(60),
    canny_strong_low: int = Form(50),
    canny_strong_high: int = Form(120),
    min_contour_len: int = Form(5),
    use_clahe: bool = Form(True),
    use_blur: bool = Form(True),
    use_connect: bool = Form(True),
    use_thin: bool = Form(True),
    use_len_filter: bool = Form(True),
    handwriting_auto_invert: bool = Form(True),
    handwriting_use_otsu: bool = Form(True),
    handwriting_thresh_val: int = Form(127),
    handwriting_use_thinning: bool = Form(True),
    handwriting_use_smooth: bool = Form(True),
    handwriting_morph_kernel: int = Form(3),
    handwriting_min_len: int = Form(5),
    handwriting_mode: str = Form("centerline"),
    handwriting_raster_step: int = Form(2),
    handwriting_offset_step: int = Form(2)
):
    try:
        temp_dir = os.path.join(STATIC_DIR, "temp")
        os.makedirs(temp_dir, exist_ok=True)
        
        file_ext = os.path.splitext(file.filename)[1].lower()
        temp_input_path = os.path.join(temp_dir, f"input_{int(time.time())}{file_ext}")
        temp_gcode_path = os.path.join(temp_dir, f"output_{int(time.time())}.gcode")
        
        with open(temp_input_path, "wb") as f:
            f.write(await file.read())
            
        success = False
        
        if file_ext == ".svg":
            from svg2gcode import svg_to_exact_gcode
            success = svg_to_exact_gcode(
                svg_path=temp_input_path,
                gcode_path=temp_gcode_path,
                scale_factor=scale_factor,
                feed_rate=feed_rate,
                mode=mode
            )
        elif file_ext in [".png", ".jpg", ".jpeg", ".webp"]:
            if algorithm == "handwriting" or active_tab == "handwriting":
                from image2gcode import handwriting_text_to_gcode
                try:
                    success = handwriting_text_to_gcode(
                        image_path=temp_input_path,
                        gcode_path=temp_gcode_path,
                        scale_factor=scale_factor,
                        feed_rate=feed_rate,
                        mode=mode,
                        auto_invert=handwriting_auto_invert,
                        use_otsu=handwriting_use_otsu,
                        thresh_val=handwriting_thresh_val,
                        use_thinning=handwriting_use_thinning,
                        use_smooth=handwriting_use_smooth,
                        morph_kernel=handwriting_morph_kernel,
                        min_len=handwriting_min_len,
                        handwriting_mode=handwriting_mode,
                        raster_step=handwriting_raster_step,
                        offset_step=handwriting_offset_step
                    )
                except Exception as ex:
                    logger.error(f"Error in handwriting conversion: {ex}")
                    success = False
            elif algorithm == "centerline":
                from image2gcode import image_to_perfect_single_line_gcode
                success = image_to_perfect_single_line_gcode(
                    image_path=temp_input_path,
                    gcode_path=temp_gcode_path,
                    scale_factor=scale_factor,
                    feed_rate=feed_rate,
                    mode=mode
                )
            elif algorithm in ["sketch", "sketch_portrait"]:
                from image2gcodesketch import maximum_detail_sketch
                try:
                    success = maximum_detail_sketch(
                        image_path=temp_input_path,
                        gcode_path=temp_gcode_path,
                        contours_path=os.path.join(temp_dir, f"contours_{int(time.time())}.png"),
                        scale_mm_per_pixel=scale_factor,
                        speed=feed_rate,
                        clahe_clip_limit=clahe_clip_limit,
                        blur_size=blur_size,
                        canny_ultra_low=canny_ultra_low,
                        canny_ultra_high=canny_ultra_high,
                        canny_medium_low=canny_medium_low,
                        canny_medium_high=canny_medium_high,
                        canny_strong_low=canny_strong_low,
                        canny_strong_high=canny_strong_high,
                        min_contour_len=min_contour_len,
                        use_clahe=use_clahe,
                        use_blur=use_blur,
                        use_connect=use_connect,
                        use_thin=use_thin,
                        use_len_filter=use_len_filter
                    )
                except Exception as ex:
                    logger.error(f"Error in sketch conversion: {ex}")
                    success = False
            else: # contour
                from image2gcode import image_to_gcode
                success = image_to_gcode(
                    image_path=temp_input_path,
                    gcode_path=temp_gcode_path,
                    scale_factor=scale_factor,
                    feed_rate=feed_rate,
                    mode=mode
                )
        elif file_ext in [".gcode", ".nc", ".cnc", ".txt"]:
            import shutil
            shutil.copyfile(temp_input_path, temp_gcode_path)
            success = True
        else:
            return JSONResponse({"status": "error", "message": f"Unsupported file type: {file_ext}"}, status_code=400)
            
        if not success or not os.path.exists(temp_gcode_path):
            return JSONResponse({"status": "error", "message": "Conversion failed"}, status_code=500)
            
        with open(temp_gcode_path, "r", encoding="utf-8", errors="ignore") as f:
            raw_gcode_content = f.read()
            
        gcode_content, segments = sort_gcode_paths_left_to_right(raw_gcode_content, feed_rate=feed_rate, mode=mode)
                
        try:
            if os.path.exists(temp_input_path):
                os.remove(temp_input_path)
            if os.path.exists(temp_gcode_path):
                os.remove(temp_gcode_path)
        except Exception as e:
            logger.error(f"Error removing temp files: {e}")
            
        return {
            "status": "ok",
            "gcode": gcode_content,
            "segments": segments
        }
    except Exception as e:
        logger.error(f"Error converting in gcode editor: {e}")
        return JSONResponse({"status": "error", "message": str(e)}, status_code=500)

@app.post("/cncapi/v1/run-gcode")
@app.post("/api/run-gcode")
async def run_gcode(req: RunGcodeRequest):
    if not state.connected or not state.serial_port:
        raise HTTPException(status_code=400, detail="Chưa kết nối máy CNC")
    lines = [line.strip() for line in req.gcode.splitlines() if line.strip() and not line.strip().startswith(";")]
    state.pen_state = None  # Reset pen_state so first Z change forces spindle PWM translation
    processed_lines = []
    for line in lines:
        processed_lines.extend(translate_command(line))
        
    if state.stream_task and not state.stream_task.done():
        state.stream_task.cancel()

    state.stream_gcode_lines = processed_lines
    state.gcode_index = 0
    state.scenario_is_looping = False
    state.is_streaming = True
    state.is_paused = False
    state.stream_task = asyncio.create_task(gcode_streamer_task())
    await broadcast({"type": "stream_status", "status": "started"})
    return {"status": "success", "lines_sent": len(processed_lines)}

# V1 State & Visualizer Endpoints
@app.get("/cncapi/v1/state")
async def v1_get_full_state():
    base_state = await get_state()
    base_state.update({
        "scenario": {
            "name": state.scenario_name,
            "actions": state.scenario_actions,
            "insert_index": state.scenario_insert_index,
            "is_looping": state.scenario_is_looping,
            "count": len(state.scenario_actions)
        }
    })
    return base_state

@app.get("/cncapi/v1/visualizer/segments")
async def v1_get_visualizer_segments():
    segments = compute_scenario_segments(state.scenario_actions)
    return {
        "status": "success",
        "segments": segments,
        "wpos": state.wpos,
        "mpos": state.mpos,
        "mm_per_px": state.mm_per_px,
        "axis_dir_x": state.axis_dir_x,
        "axis_dir_y": state.axis_dir_y
    }

@app.websocket("/ws")
async def websocket_endpoint(ws: WebSocket):
    await ws.accept()
    state.websocket_connections.add(ws)
    try:
        await ws.send_json({
            "type": "connection",
            "connected": state.connected,
            "message": f"Đã kết nối {state.port_name}" if state.connected else "Chưa kết nối"
        })
        await send_telemetry()
        while True:
            await ws.receive_text()
    except WebSocketDisconnect:
        state.websocket_connections.discard(ws)
    except Exception:
        state.websocket_connections.discard(ws)

# Static Files
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

@app.get("/")
async def read_index():
    return FileResponse(os.path.join(STATIC_DIR, "index.html"))

@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    favicon_path = os.path.join(STATIC_DIR, "favicon.ico")
    if os.path.exists(favicon_path):
        return FileResponse(favicon_path)
    return JSONResponse({"status": "error", "message": "Favicon not found"}, status_code=404)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8099, reload=True)

