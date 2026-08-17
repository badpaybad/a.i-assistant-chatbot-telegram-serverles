import os
import sys
import re
import time
import serial
import asyncio
import logging
import subprocess
import json
import math
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
        "pen_mode": "z-axis",
        "pen_up_z": 3.0,
        "pen_down_z": 0.0,
        "pen_up_pwm": 30.0,
        "pen_down_pwm": 90.0,
        "pen_dwell": 0.25,
        "axis_dir_x": 1,
        "axis_dir_y": 1,
        "mm_per_px": 0.5,
        "home_set": False,
        "workpiece_origin": {"x": 0.0, "y": 0.0, "z": 0.0},
        "work_origin": {"x": 0.0, "y": 0.0, "z": 0.0},
        "parking_point": {"x": 0.0, "y": 0.0, "z": 10.0},
        "cnc_tl": None,
        "cnc_tr": None,
        "cnc_bl": None,
        "cnc_br": None,
        "font_settings": {
            "font_name": "arial.ttf",
            "font_size_pt": 72.0,
            "line_spacing": 1.2,
            "line_spacing_mm": 0.0,
            "feed_rate": 4000.0,
            "stroke_mode": "single_line",
            "z_safe": 10.0,
            "z_draw": 28.0,
            "pen_mode": "spindle-pwm",
            "axis_dir_y": 1,
            "epsilon": 0.3,
            "margin_mm": 0.0,
            "rotation_angle": -90.0,
            "flip_x": False,
            "flip_y": False,
            "binary_threshold": 128,
            "render_dpi": 300
        },
        "image_settings": {
            "scale_factor": 0.1,
            "feed_rate": 2000,
            "mode": "servo",
            "algorithm": "sketch",
            "rotation_angle": 0.0,
            "flip_x": False,
            "flip_y": False,
            "clahe_clip_limit": 1.5,
            "blur_size": 3,
            "min_contour_len": 5
        },
        "background_settings": {
            "image_data": "",
            "image_filename": "",
            "visible": True,
            "width_mm": 210.0,
            "height_mm": 297.0,
            "width_px": 0,
            "height_px": 0,
            "pos_x": 0.0,
            "pos_y": 0.0,
            "rotation_angle": 0.0,
            "flip_x": False,
            "flip_y": False,
            "treat_as_drawable": False,
            "grayscale": False,
            "threshold": 128,
            "keep_lines": False,
            "sketch_mode": False
        }
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

def get_homing_direction_details(mask: int):
    invert_x = bool(mask & 1)
    invert_y = bool(mask & 2)
    invert_z = bool(mask & 4)
    x_dir = "-" if invert_x else "+"
    y_dir = "-" if invert_y else "+"
    z_dir = "-" if invert_z else "+"
    
    if not invert_x and not invert_y:
        label = "Góc Trên-Phải (Top-Right - X+ Y+)"
    elif invert_x and not invert_y:
        label = "Góc Trên-Trái (Top-Left - X- Y+)"
    elif not invert_x and invert_y:
        label = "Góc Dưới-Phải (Bottom-Right - X+ Y-)"
    else:
        label = "Góc Dưới-Trái (Bottom-Left - X- Y- Phổ biến)"
        
    return {
        "mask": mask,
        "invert_x": invert_x,
        "invert_y": invert_y,
        "invert_z": invert_z,
        "x_dir": x_dir,
        "y_dir": y_dir,
        "z_dir": z_dir,
        "label": label
    }

class ControllerState:
    def __init__(self):
        settings = load_settings()
        self.connected = False
        self.port_name = ""
        self.baudrate = 115200
        self.serial_port = None
        self.device_id = ""
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
        self.font_settings = settings.get("font_settings", {})
        self.image_settings = settings.get("image_settings", {})
        self.background_settings = settings.get("background_settings", {
            "image_data": "",
            "image_filename": "",
            "visible": True,
            "width_mm": 210.0,
            "height_mm": 297.0,
            "width_px": 0,
            "height_px": 0,
            "pos_x": 0.0,
            "pos_y": 0.0,
            "rotation_angle": 0.0,
            "flip_x": False,
            "flip_y": False,
            "treat_as_drawable": False,
            "grayscale": False,
            "threshold": 128,
            "keep_lines": False,
            "sketch_mode": False
        })
        # Cập nhật 38: Khởi động lại web backend luôn đặt home_set = False (yêu cầu Homing)
        self.home_set = False
        self.is_homing = False
        save_settings({"home_set": False})
        
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

        # GRBL Physical Settings ($0 - $132)
        self.grbl_settings = {
            "$0": "10",
            "$1": "25",
            "$2": "0",
            "$3": "0",
            "$4": "0",
            "$5": "0",
            "$6": "0",
            "$10": "1",
            "$11": "0.010",
            "$12": "0.002",
            "$13": "0",
            "$20": "0",
            "$21": "0",
            "$22": "1",
            "$23": "3",
            "$24": "25.000",
            "$25": "500.000",
            "$26": "250",
            "$27": "1.000",
            "$30": "1000",
            "$31": "0",
            "$32": "0",
            "$100": "250.000",
            "$101": "250.000",
            "$102": "250.000",
            "$110": "4000.000",
            "$111": "4000.000",
            "$112": "4000.000",
            "$120": "500.000",
            "$121": "500.000",
            "$122": "500.000",
            "$130": "200.000",
            "$131": "200.000",
            "$132": "200.000"
        }
        loaded_physical = settings.get("cnc_physical")
        if isinstance(loaded_physical, dict):
            self.grbl_settings.update(loaded_physical)
        
        # WebSockets & Locks
        self.websocket_connections: Set[WebSocket] = set()
        self.grbl_ack_event = asyncio.Event()
        self.last_grbl_response: str = ""
        self.grbl_version: str = "0.9i"
        self.serial_lock = asyncio.Lock()
        
        # Auto-reconnect state (Cập nhật 55)
        self.is_reconnecting = False
        self.reconnect_task = None
        self.last_connected_port = settings.get("last_connected_port", "")

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
            if state.connected and not isinstance(state.serial_port, DummySerial):
                asyncio.create_task(handle_serial_disconnection(f"Lỗi ghi dữ liệu Serial ({e})"))

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
                elif any(g in upper for g in ["G0", "G1", "G00", "G01", "$J="]):
                    is_rel = self.relative_mode or "G91" in upper
                    for idx, axis in enumerate(["X", "Y", "Z"]):
                        match = re.search(rf"{axis}([-+]?[0-9]*\.?[0-9]+)", cmd, re.IGNORECASE)
                        if match:
                            val = float(match.group(1))
                            if is_rel:
                                state.wpos[idx] += val
                            else:
                                state.wpos[idx] = val
                            state.mpos[idx] = state.wpos[idx] + state.wco[idx]

                elif cmd.startswith("$") and "=" in cmd:
                    parts = cmd.split("=", 1)
                    k = parts[0].strip()
                    v = parts[1].strip()
                    state.grbl_settings[k] = v
                    save_settings({"cnc_physical": state.grbl_settings})
                    asyncio.create_task(broadcast({"type": "log", "direction": "in", "content": "ok"}))
                elif cmd == "$GETID":
                    state.device_id = "GRBL-328P-1E950F-DUMMY"
                    asyncio.create_task(broadcast({"type": "log", "direction": "in", "content": "[ID:GRBL-328P-1E950F-DUMMY, MAC:]"}))
                    asyncio.create_task(broadcast({"type": "log", "direction": "in", "content": "ok"}))
                elif cmd == "$$":
                    asyncio.create_task(broadcast({"type": "log", "direction": "in", "content": "ok"}))
                    for k, v in state.grbl_settings.items():
                        asyncio.create_task(broadcast({"type": "log", "direction": "in", "content": f"{k}={v}"}))
                elif "$H" in upper:
                    state.mpos = [0.0, 0.0, 0.0]
                    state.wpos = [0.0, 0.0, 0.0]
                    state.wco = [0.0, 0.0, 0.0]
                    state.work_origin = {"x": 0.0, "y": 0.0, "z": 0.0}
                    state.workpiece_origin = {"x": 0.0, "y": 0.0, "z": 0.0}
                    state.home_set = True
                    save_settings({"work_origin": state.work_origin, "workpiece_origin": state.workpiece_origin, "home_set": True})
                    asyncio.create_task(broadcast({"type": "log", "direction": "in", "content": "ok"}))
                    asyncio.create_task(broadcast({"type": "log", "direction": "in", "content": "[MSG:Homing cycle complete (Dummy Mode - Machine Zero & Work Zero Set)]"}))

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

def check_motion_bounds(target_x: float, target_y: float) -> Optional[str]:
    """
    Theo yêu cầu: Chỉ kiểm tra tọa độ khi click trực tiếp trên Tool Path View (Frontend app.js).
    Không chặn di chuyển trực tiếp từ API Jog, nút điều khiển thủ công hoặc lệnh curl.
    """
    return None

def check_gcode_line_bounds(clean_cmd: str, is_relative: bool = False) -> Optional[str]:
    """
    Cập nhật 39: Trích xuất tọa độ X/Y từ câu lệnh GCode di chuyển và kiểm tra giới hạn 4 góc.
    """
    if not state.home_set:
        return None

    cmd_upper = clean_cmd.upper().strip()
    if cmd_upper.startswith("$") or cmd_upper.startswith("G10") or cmd_upper.startswith("M"):
        return None

    x_match = re.search(r'\b[xX]([-+]?[0-9]*\.?[0-9]+)\b', clean_cmd)
    y_match = re.search(r'\b[yY]([-+]?[0-9]*\.?[0-9]+)\b', clean_cmd)

    if not x_match and not y_match:
        return None

    if is_relative:
        target_x = state.wpos[0] + (float(x_match.group(1)) if x_match else 0.0)
        target_y = state.wpos[1] + (float(y_match.group(1)) if y_match else 0.0)
    else:
        target_x = float(x_match.group(1)) if x_match else state.wpos[0]
        target_y = float(y_match.group(1)) if y_match else state.wpos[1]

    return check_motion_bounds(target_x, target_y)

def parse_grbl_status(status_str: str):
    try:
        clean = status_str.strip("<> \r\n")
        state_match = re.match(r"^([a-zA-Z]+)", clean)
        if state_match:
            state.machine_state = state_match.group(1)
            
        status_dict = {}
        matches = re.findall(r"([a-zA-Z]+):([-+0-9.,]*)", clean)
        for key, val in matches:
            status_dict[key] = val.strip(",")

        # Parse WCO first so MPos -> WPos calculation uses the latest offset
        if "WCO" in status_dict:
            parts = [float(x) for x in status_dict["WCO"].split(",") if x.strip()]
            if len(parts) >= 3:
                state.wco = parts[:3]

        if "WPos" in status_dict:
            parts = [float(x) for x in status_dict["WPos"].split(",") if x.strip()]
            if len(parts) >= 3:
                state.wpos = parts[:3]
                state.mpos = [w + o for w, o in zip(state.wpos, state.wco)]
        elif "MPos" in status_dict:
            parts = [float(x) for x in status_dict["MPos"].split(",") if x.strip()]
            if len(parts) >= 3:
                state.mpos = parts[:3]
                state.wpos = [m - o for m, o in zip(state.mpos, state.wco)]

        if "Bf" in status_dict:
            bf_parts = [int(x) for x in status_dict["Bf"].split(",") if x.strip()]
            if len(bf_parts) == 2:
                state.buffer_blocks = bf_parts[0]
                state.buffer_rx = bf_parts[1]

        if "FS" in status_dict:
            fs_parts = [float(x) for x in status_dict["FS"].split(",") if x.strip()]
            if len(fs_parts) >= 1:
                state.feedrate = fs_parts[0]
            if len(fs_parts) >= 2:
                state.spindle_speed = fs_parts[1]
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
                    elif "[ID:" in line or "[id:" in line.lower() or line.startswith("ID:"):
                        match = re.search(r"\[?ID:\s*([^,\]]+)", line, re.IGNORECASE)
                        if match:
                            state.device_id = match.group(1).strip()
                        else:
                            state.device_id = line.strip("[] \r\n")
                        logger.info(f"Đã nhận diện Device ID: {state.device_id}")
                        await send_telemetry()
                    elif line.startswith("$") and "=" in line:
                        parts = line.split("=", 1)
                        k = parts[0].strip()
                        v = parts[1].strip()
                        state.grbl_settings[k] = v
                        save_settings({"cnc_physical": state.grbl_settings})
                    elif line == "ok" or "error" in line:
                        state.last_grbl_response = line
                        if "error:5" in line:
                            await broadcast({
                                "type": "log", 
                                "direction": "in", 
                                "content": "⚠️ [Lỗi GRBL error:5] Lệnh Home ($H) thất bại vì chưa bật Homing ($22=1) trong GRBL hoặc chưa kết nối công tắc hành trình!"
                            })
                        if state.sent_buffer_lengths:
                            state.sent_buffer_lengths.pop(0)
                        state.grbl_ack_event.set()
                    elif line.startswith("ALARM:") or "to unlock" in line.lower() or ("grbl" in line.lower() and not "[id:" in line.lower()):
                        state.last_grbl_response = line
                        match_ver = re.search(r"grbl\s+([0-9]+\.[0-9]+[a-z]?)", line, re.IGNORECASE)
                        if match_ver:
                            state.grbl_version = match_ver.group(1)
                        if not state.is_homing and ("alarm:" in line.lower() or "to unlock" in line.lower()):
                            await broadcast({
                                "type": "log", 
                                "direction": "in", 
                                "content": f"⚠️ [{line}] Tự động gửi lệnh Unlock ($X) để sẵn sàng làm việc..."
                            })
                            try:
                                await safe_write_serial(b"$X\n")
                                await broadcast({"type": "log", "direction": "out", "content": "$X"})
                            except Exception as ex:
                                logger.error(f"Lỗi khi gửi $X tự động: {ex}")
                        if state.is_homing:
                            state.grbl_ack_event.set()
            else:
                await asyncio.sleep(0.01)
        except Exception as e:
            logger.error(f"Error in serial reader: {e}")
            await handle_serial_disconnection(f"Lỗi đọc cổng nối tiếp ({e})")
            break

async def handle_serial_disconnection(reason: str = ""):
    """Xử lý dọn dẹp khi mất kết nối Serial bất ngờ và kích hoạt chu trình tự động quét / kết nối lại khi cắm lại USB hoặc có điện."""
    if not state.connected and state.is_reconnecting:
        return
        
    target_port = state.port_name or getattr(state, 'last_connected_port', '')
    is_dummy = isinstance(state.serial_port, DummySerial) or target_port == "dummy"
    
    state.connected = False
    state.device_id = ""
    state.machine_state = "NGOẠI TUYẾN (ĐANG TỰ DÒ CỔNG...)" if not is_dummy else "NGOẠI TUYẾN"
    
    if state.polling_task:
        state.polling_task.cancel()
        state.polling_task = None
    if state.stream_task:
        state.stream_task.cancel()
        state.stream_task = None
        
    if state.serial_port and not is_dummy:
        try:
            state.serial_port.close()
        except Exception:
            pass
    state.serial_port = None
    
    if is_dummy:
        await broadcast({"type": "connection", "connected": False, "reconnecting": False, "message": f"Mất kết nối: {reason}"})
        return

    state.is_reconnecting = True
    await broadcast({
        "type": "connection", 
        "connected": False, 
        "reconnecting": True,
        "message": f"⚠️ Mất kết nối cổng USB ({reason}). Hệ thống đang tự động quét và kết nối lại ngay khi cắm lại USB hoặc bật nguồn..."
    })
    await broadcast({
        "type": "log", 
        "direction": "in", 
        "content": f"⚠️ [Mất kết nối USB: {reason}] Đang chạy chế độ tự động dò tìm và kết nối lại máy CNC..."
    })

    if state.reconnect_task and not state.reconnect_task.done():
        state.reconnect_task.cancel()
    state.reconnect_task = asyncio.create_task(auto_reconnect_loop(target_port))

async def auto_reconnect_loop(target_port: str):
    logger.info(f"Bắt đầu chu trình tự động kết nối lại CNC (cổng mong muốn: '{target_port}')...")
    retry_count = 0
    while state.is_reconnecting and not state.connected:
        retry_count += 1
        try:
            available_ports = []
            try:
                import serial.tools.list_ports
                for p in serial.tools.list_ports.comports():
                    available_ports.append(p.device)
            except Exception:
                pass

            if sys.platform.startswith('linux'):
                import glob
                for dev in sorted(glob.glob('/dev/ttyACM*') + glob.glob('/dev/ttyUSB*')):
                    if dev not in available_ports:
                        available_ports.append(dev)

            candidate_port = None
            if target_port and target_port in available_ports:
                candidate_port = target_port
            elif available_ports:
                for p in available_ports:
                    if 'ttyACM' in p or 'ttyUSB' in p or 'COM' in p.upper() or 'usb' in p.lower():
                        candidate_port = p
                        break
                if not candidate_port:
                    candidate_port = available_ports[0]

            if candidate_port:
                logger.info(f"[Auto-Reconnect #{retry_count}] Phát hiện cổng {candidate_port}, thử kết nối...")
                try:
                    new_serial = serial.Serial(candidate_port, state.baudrate, timeout=0.1)
                    state.serial_port = new_serial
                    state.connected = True
                    state.port_name = candidate_port
                    state.last_connected_port = candidate_port
                    save_settings({"last_connected_port": candidate_port, "home_set": False})
                    state.machine_state = "Đang Khởi Tạo"
                    state.home_set = False
                    state.is_reconnecting = False

                    state.reader_task = asyncio.create_task(serial_reader_loop())
                    state.polling_task = asyncio.create_task(status_polling_loop())

                    # Chờ 1.8s cho Arduino DTR Reset
                    await asyncio.sleep(1.8)
                    if hasattr(state.serial_port, 'reset_input_buffer'):
                        try:
                            state.serial_port.reset_input_buffer()
                        except Exception:
                            pass

                    await safe_write_serial(b"\x18\r\n$X\r\n")
                    await broadcast({"type": "log", "direction": "out", "content": "\x18 $X (Auto-Reconnect)"})
                    await asyncio.sleep(0.5)
                    await safe_write_serial(b"$GETID\n")
                    await broadcast({"type": "log", "direction": "out", "content": "$GETID (Auto-Reconnect)"})

                    async def fallback_query_getid():
                        for _ in range(4):
                            if state.device_id or not state.connected:
                                break
                            await asyncio.sleep(1.0)
                            if not state.device_id and state.connected:
                                await safe_write_serial(b"$GETID\n")
                    asyncio.create_task(fallback_query_getid())

                    logger.info(f"✅ Tự động kết nối lại máy CNC thành công cổng {candidate_port}!")
                    await broadcast({
                        "type": "connection",
                        "connected": True,
                        "reconnecting": False,
                        "message": f"Đã tự động kết nối lại máy CNC thành công cổng {candidate_port}!"
                    })
                    await broadcast({
                        "type": "log",
                        "direction": "in",
                        "content": f"🔌 [Tự Động Kết Nối Lại] Đã kết nối lại thành công cổng {candidate_port} và Unlock ($X)"
                    })
                    await send_telemetry()
                    return
                except Exception as open_err:
                    logger.debug(f"[Auto-Reconnect #{retry_count}] Cổng {candidate_port} chưa sẵn sàng: {open_err}")
                    if state.serial_port:
                        try:
                            state.serial_port.close()
                        except Exception:
                            pass
                        state.serial_port = None
                    state.connected = False
        except Exception as err:
            logger.error(f"[Auto-Reconnect Loop Error]: {err}")

        await asyncio.sleep(1.5)

async def wait_for_ok(timeout=1.0):
    state.grbl_ack_event.clear()
    try:
        await asyncio.wait_for(state.grbl_ack_event.wait(), timeout=timeout)
        return True
    except asyncio.TimeoutError:
        return False

async def wait_for_idle(timeout=5.0):
    """Hủy các chuyển động Jog đang xếp hàng (0x85) và chờ máy CNC thực sự trở về trạng thái Idle"""
    if isinstance(state.serial_port, DummySerial) or not state.connected:
        return True
    
    loop = asyncio.get_running_loop()
    start = loop.time()
    
    # Nếu máy đang Jogging, phát ngay lệnh Jog Cancel (\x85) để ngắt sạch các lệnh Jog dở dang trong buffer
    if "jog" in state.machine_state.lower():
        await safe_write_serial(b"\x85\n")
        await broadcast({"type": "log", "direction": "out", "content": "\x85 (Jog Cancel)"})
        await asyncio.sleep(0.1)

    while loop.time() - start < timeout:
        mstate = state.machine_state.lower()
        if mstate in ["idle", "chờ"]:
            return True
        if "jog" in mstate:
            await safe_write_serial(b"\x85\n")
        await safe_write_serial(b"?")
        await asyncio.sleep(0.15)
        
    return state.machine_state.lower() in ["idle", "chờ"]

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
    
    try:
        mask = int(state.grbl_settings.get("$23", "3"))
    except ValueError:
        mask = 3
    dir_info = get_homing_direction_details(mask)

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
        "homing_enabled": state.grbl_settings.get("$22") == "1",
        "homing_mask": mask,
        "homing_dir_info": dir_info,
        "scenario_name": state.scenario_name,
        "scenario_actions": state.scenario_actions,
        "scenario_insert_index": state.scenario_insert_index,
        "scenario_is_looping": state.scenario_is_looping,
        "device_id": state.device_id
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
        elif act_type == "swipe_up":            
            gcode.append(f"G0 X{x:.2f} Y{y:.2f} F{feed}")
            gcode.append(p_down)
            gcode.append("G4 P0.02")
            gcode.append(f"G1 Y{(y + swipe_dist):.2f} F{swipe_feed}")
            gcode.append(p_up)
        elif act_type == "swipe_down":
            gcode.append(f"G0 X{x:.2f} Y{y:.2f} F{feed}")
            gcode.append(p_down)
            gcode.append("G4 P0.02")
            gcode.append(f"G1 Y{(y - swipe_dist):.2f} F{swipe_feed}")
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
        elif act_type == "swipe_up":
            end_y = ay + swipe_dist
            segments.append({"type": "rapid", "pts": [{"x": cur_x, "y": cur_y}, {"x": ax, "y": ay}], "penDown": False, "stepIndex": step_label, "actionType": act_type})
            segments.append({"type": "swipe", "pts": [{"x": ax, "y": ay}, {"x": ax, "y": end_y}], "penDown": True, "stepIndex": step_label, "actionType": act_type})
            cur_x, cur_y = ax, end_y
            pen_down = False
        elif act_type == "swipe_down":
            end_y = ay - swipe_dist
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
            
            # Cập nhật 57: Tối ưu băng thông WebSocket khi stream file G-code lớn (tránh nghẽn hàng đợi)
            total_lines = len(state.stream_gcode_lines)
            if total_lines <= 200 or state.gcode_index % 10 == 0 or any(kw in clean_line for kw in ["M3", "M5", "G0", "G10", "G28", "G90", "G91"]):
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
    font_settings: Optional[dict] = None
    image_settings: Optional[dict] = None
    background_settings: Optional[dict] = None

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

async def run_auto_home():
    if state.is_homing:
        logger.info("Đang trong quá trình Homing, bỏ qua yêu cầu Homing tự động trùng lặp.")
        return
    grbl_22 = state.grbl_settings.get("$22", "0")
    if grbl_22 == "0" and not isinstance(state.serial_port, DummySerial):
        logger.info("Tính năng Homing ($22=0) chưa được bật trong GRBL. Bỏ qua tự động Homing.")
        await broadcast({
            "type": "log",
            "direction": "in",
            "content": "ℹ️ [Tự động Homing] $22=0 (Chưa bật Homing). Bỏ qua tự động Homing khi kết nối."
        })
        return
    try:
        await broadcast({"type": "log", "direction": "in", "content": "🔄 [Tự động Homing] Bắt đầu tự động Homing về gốc máy ($H)..."})
        await send_command(CommandRequest(command="$H"))
        await broadcast({"type": "log", "direction": "in", "content": "✅ [Tự động Homing] Homing thành công và gốc tọa độ đã được đồng bộ!"})
    except Exception as e:
        logger.error(f"Lỗi khi tự động Homing: {e}")
        await broadcast({"type": "log", "direction": "in", "content": f"⚠️ [Tự động Homing] Không thể tự động Homing ({e})."})

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
    state.device_id = ""
    
    if config.port == "dummy":
        state.serial_port = DummySerial()
        state.connected = True
        state.machine_state = "Chế Độ Giả Lập"
        state.home_set = False
        save_settings({"home_set": False})
        state.reader_task = asyncio.create_task(serial_reader_loop())
        state.polling_task = asyncio.create_task(status_polling_loop())
        # Cập nhật 37: Tự động unlock khi kết nối thành công để sẵn sàng làm việc
        await safe_write_serial(b"$X\n")
        await broadcast({"type": "log", "direction": "out", "content": "$X"})
        # Cập nhật 46: Tự động gửi $GETID để lấy device_id
        await safe_write_serial(b"$GETID\n")
        await broadcast({"type": "log", "direction": "out", "content": "$GETID"})
        await broadcast({"type": "connection", "connected": True, "message": "Đã kết nối chế độ giả lập"})
        await send_telemetry()
        return {"status": "success", "message": "Đã kết nối dummy mode"}
        
    try:
        state.serial_port = serial.Serial(config.port, config.baudrate, timeout=0.1)
        state.connected = True
        state.port_name = config.port
        state.last_connected_port = config.port
        save_settings({"last_connected_port": config.port, "home_set": False})
        state.is_reconnecting = False
        if state.reconnect_task and not state.reconnect_task.done():
            state.reconnect_task.cancel()
            state.reconnect_task = None

        state.machine_state = "Đang Khởi Tạo"
        state.home_set = False
        save_settings({"home_set": False})
        state.reader_task = asyncio.create_task(serial_reader_loop())
        state.polling_task = asyncio.create_task(status_polling_loop())
        
        # Cập nhật 37: Chờ Arduino DTR Hardware Reset (1.8s) -> Xóa buffer -> Unlock ($X) tự động
        await asyncio.sleep(1.8)
        if hasattr(state.serial_port, 'reset_input_buffer'):
            try:
                state.serial_port.reset_input_buffer()
            except Exception:
                pass
        
        await safe_write_serial(b"\x18\r\n$X\r\n")
        await broadcast({"type": "log", "direction": "out", "content": "\x18 $X"})
        await asyncio.sleep(0.5)
        # Cập nhật 46: Tự động gửi $GETID để lấy device_id
        await safe_write_serial(b"$GETID\n")
        await broadcast({"type": "log", "direction": "out", "content": "$GETID"})
        
        async def fallback_query_getid():
            for _ in range(4):
                if state.device_id or not state.connected:
                    break
                await asyncio.sleep(1.0)
                if not state.device_id and state.connected:
                    await safe_write_serial(b"$GETID\n")
        asyncio.create_task(fallback_query_getid())

        await broadcast({"type": "connection", "connected": True, "reconnecting": False, "message": f"Đã kết nối {config.port} và Tự Động Mở Khóa ($X)"})
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
    state.is_reconnecting = False
    if state.reconnect_task and not state.reconnect_task.done():
        state.reconnect_task.cancel()
        state.reconnect_task = None

    if not state.connected:
        await broadcast({"type": "connection", "connected": False, "reconnecting": False, "message": "Đã ngắt kết nối"})
        return {"status": "success", "message": "Chưa kết nối"}
        
    state.connected = False
    state.device_id = ""
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
    
    await broadcast({"type": "connection", "connected": False, "reconnecting": False, "message": "Đã ngắt kết nối"})
    return {"status": "success", "message": "Đã ngắt kết nối"}

@app.post("/api/command")
@app.post("/cncapi/v1/motion/command")
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
                if clean_cmd.upper() in ["$H", "$HX", "$HY", "$HZ", "$HXY"]:
                    if state.is_homing:
                        raise HTTPException(status_code=400, detail="Máy CNC đang trong quá trình Homing. Vui lòng chờ hoàn tất!")
                    state.is_homing = True
                    try:
                        homing_cmd = clean_cmd.upper()
                        # Cập nhật 35: Nhấc dao trước khi Homing (áp dụng cho cả spindle-pwm và z-axis)
                        pen_up_cmds = []
                        if state.pen_mode == "spindle-pwm":
                            pen_up_cmds.append(f"M3 S{state.pen_up_pwm}")
                        elif state.pen_mode == "z-axis" and homing_cmd in ["$H", "$HXY", "$HZ"]:
                            step = state.step_distance or 1.0
                            feed = int(state.jog_feedrate or 1000)
                            pen_up_cmds.extend(["G91", f"G0 Z{step:.2f} F{feed}", "G90"])

                        for pcmd in pen_up_cmds:
                            await safe_write_serial((pcmd + "\n").encode())
                            await broadcast({"type": "log", "direction": "out", "content": pcmd})
                        if pen_up_cmds:
                            await asyncio.sleep(state.pen_dwell or 0.25)

                        # Chờ máy CNC kết thúc các chuyển động trước đó và trở về trạng thái Idle (Phát \x85 hủy Jog nếu đang Jog)
                        is_idle = await wait_for_idle(timeout=5.0)
                        if not is_idle:
                            raise HTTPException(
                                status_code=400,
                                detail=f"Máy CNC đang bận ({state.machine_state}). Vui lòng chờ di chuyển xong trước khi Homing!"
                            )

                        state.grbl_ack_event.clear()
                        state.last_grbl_response = ""
                        await safe_write_serial(f"{homing_cmd}\n".encode())
                        await broadcast({"type": "log", "direction": "out", "content": homing_cmd})

                        # Chờ Homing hoàn thành thực sự (GRBL phản hồi 'ok' hoặc ALARM/error)
                        if isinstance(state.serial_port, DummySerial):
                            await asyncio.sleep(0.5)
                        else:
                            try:
                                await asyncio.wait_for(state.grbl_ack_event.wait(), timeout=35.0)
                            except asyncio.TimeoutError:
                                logger.warning(f"Homing {homing_cmd} timeout waiting for GRBL ack 'ok'")
                                raise HTTPException(status_code=400, detail="Homing bị quá thời gian (Timeout)")
                            await asyncio.sleep(0.5)
                            
                            if "error" in state.last_grbl_response or "ALARM" in state.last_grbl_response:
                                err_msg = state.last_grbl_response or 'Lỗi không xác định'
                                if "error:5" in err_msg:
                                    detail_msg = "Homing thất bại (error:5): Chưa bật Homing ($22=1) trong GRBL hoặc chưa kết nối công tắc hành trình!"
                                elif "error:2" in err_msg or "error:3" in err_msg:
                                    detail_msg = (
                                        f"Lỗi {homing_cmd} ({err_msg}): Firmware GRBL chưa bật tính năng Homing từng trục lẻ!\n"
                                        "👉 Hướng dẫn khắc phục:\n"
                                        "1) Dùng lệnh Home tổng ($H) hoặc bấm nút Home trên Web UI.\n"
                                        "2) Hoặc mở file config.h trong nguồn GRBL, bỏ comment dòng '#define HOMING_SINGLE_AXIS_COMMANDS' rồi nạp lại firmware."
                                    )
                                elif "ALARM:8" in err_msg or "alarm:8" in err_msg.lower():
                                    detail_msg = (
                                        "Lỗi Homing (ALARM:8): Công tắc không nhả sau khi nhích lùi ($27), động cơ chạy ngược hướng ($23), hoặc Trục Z chưa có công tắc!\n"
                                        "👉 Hướng dẫn khắc phục:\n"
                                        "1) Tăng độ nảy nhích lùi ($27=3.0mm hoặc 5.0mm) trong Cấu Hình GRBL.\n"
                                        "2) Kiểm tra Chiều Homing ($23) xem động cơ có chạy về phía công tắc không.\n"
                                        "3) Nếu máy vẽ/laser không có công tắc Z, dùng nút 'Đặt gốc tọa độ làm việc (G54)' thay cho $H."
                                    )
                                elif "ALARM:1" in err_msg or "alarm:1" in err_msg.lower():
                                    detail_msg = (
                                        "Lỗi Homing (ALARM:1): Công tắc hành trình bị nhiễu điện từ động cơ hoặc bị chạm/đè sẵn!\n"
                                        "👉 Hướng dẫn khắc phục:\n"
                                        "1) Nhấn nút Tắt Hard Limits ($21=0) trong Cấu Hình GRBL.\n"
                                        "2) Kiểm tra dây nối và tiếp xúc công tắc hành trình."
                                    )
                                elif "ALARM:9" in err_msg or "alarm:9" in err_msg.lower():
                                    detail_msg = "Lỗi Homing (ALARM:9): Máy CNC đang ở trạng thái Khóa. Vui lòng nhấn Mở Khóa ($X) trước khi thử lại."
                                else:
                                    detail_msg = f"Homing thất bại: {err_msg}"

                                await safe_write_serial(b"\x18\r\n$X\r\n")
                                await broadcast({"type": "log", "direction": "out", "content": "\x18 $X"})
                                state.machine_state = "Idle"
                                await send_telemetry()
                                raise HTTPException(
                                    status_code=400,
                                    detail=detail_msg
                                )

                        # Mở khóa Unlock ($X) sau khi Homing hoàn thành
                        state.grbl_ack_event.clear()
                        await safe_write_serial(b"$X\n")
                        await broadcast({"type": "log", "direction": "out", "content": "$X"})
                        await asyncio.sleep(0.3)

                        # Cập nhật 36 & 38: Reset WCO = (0,0,0) giúp Gốc tọa độ làm việc (WPos) đồng bộ trùng tuyệt đối Gốc máy (MPos)
                        if homing_cmd in ["$H", "$HXY"]:
                            cmd_set_wco = "G10 L20 P1 X0 Y0 Z0"
                            state.mpos = [0.0, 0.0, 0.0]
                            state.wpos = [0.0, 0.0, 0.0]
                            state.wco = [0.0, 0.0, 0.0]
                            state.work_origin = {"x": 0.0, "y": 0.0, "z": 0.0}
                            state.workpiece_origin = {"x": 0.0, "y": 0.0, "z": 0.0}
                            state.home_set = True
                        elif homing_cmd == "$HX":
                            cmd_set_wco = "G10 L20 P1 X0"
                            state.mpos[0] = 0.0
                            state.wpos[0] = 0.0
                        elif homing_cmd == "$HY":
                            cmd_set_wco = "G10 L20 P1 Y0"
                            state.mpos[1] = 0.0
                            state.wpos[1] = 0.0
                        elif homing_cmd == "$HZ":
                            cmd_set_wco = "G10 L20 P1 Z0"
                            state.mpos[2] = 0.0
                            state.wpos[2] = 0.0
                        else:
                            cmd_set_wco = "G10 L20 P1 X0 Y0 Z0"
                            state.mpos = [0.0, 0.0, 0.0]
                            state.wpos = [0.0, 0.0, 0.0]
                            state.wco = [0.0, 0.0, 0.0]
                            state.work_origin = {"x": 0.0, "y": 0.0, "z": 0.0}
                            state.workpiece_origin = {"x": 0.0, "y": 0.0, "z": 0.0}
                            state.home_set = True

                        await safe_write_serial((cmd_set_wco + "\n").encode())
                        await broadcast({"type": "log", "direction": "out", "content": cmd_set_wco})
                        await asyncio.sleep(0.1)

                        # Tái kích hoạt trạng thái nhấc bút ngay sau khi hoàn tất chu kỳ Homing
                        post_pen_cmds = []
                        if state.pen_mode == "spindle-pwm":
                            post_pen_cmds.append(f"M3 S{state.pen_up_pwm}")
                        elif state.pen_mode == "z-axis":
                            post_pen_cmds.append(f"G0 Z{state.pen_up_z:.2f}")

                        for pcmd in post_pen_cmds:
                            await safe_write_serial((pcmd + "\n").encode())
                            await broadcast({"type": "log", "direction": "out", "content": pcmd})

                        save_settings({"work_origin": state.work_origin, "workpiece_origin": state.workpiece_origin, "home_set": state.home_set})
                        await send_telemetry()

                        results.extend([cmd for cmd in pen_up_cmds + [homing_cmd, "$X", cmd_set_wco] + post_pen_cmds if cmd])
                    finally:
                        state.is_homing = False
                    continue

                # Cập nhật 39: Kiểm tra giới hạn vùng làm việc 4 góc khi di chuyển bằng GCode
                err_bounds = check_gcode_line_bounds(clean_cmd)
                if err_bounds:
                    raise HTTPException(status_code=400, detail=err_bounds)

                await safe_write_serial((clean_cmd + "\n").encode())
                await broadcast({"type": "log", "direction": "out", "content": clean_cmd})
                results.append(clean_cmd)
            except HTTPException:
                raise
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
        "font_settings": getattr(state, 'font_settings', {}),
        "image_settings": getattr(state, 'image_settings', {}),
        "background_settings": getattr(state, 'background_settings', {}),
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
    if req.font_settings is not None: state.font_settings = req.font_settings
    if req.image_settings is not None: state.image_settings = req.image_settings
    if req.background_settings is not None: state.background_settings = req.background_settings
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
        "font_settings": getattr(state, 'font_settings', {}),
        "image_settings": getattr(state, 'image_settings', {}),
        "background_settings": getattr(state, 'background_settings', {}),
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
        "home_set": state.home_set,
        "device_id": state.device_id,
        "is_reconnecting": state.is_reconnecting
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

class V1HomingDirectionRequest(BaseModel):
    invert_x: bool = False
    invert_y: bool = False
    invert_z: bool = False

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
        raise HTTPException(status_code=400, detail="Chưa kết nối CNC. Vui lòng nhấn Kết Nối (Connect) trước.")

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
    move_cmd += f" F{int(feed)}"
    lines.append(move_cmd)
    lines.append("G90")

    results = []
    for line in lines:
        await safe_write_serial((line + "\n").encode())
        await broadcast({"type": "log", "direction": "out", "content": line})
        results.append(line)

    return {"status": "success", "sent": results}

@app.post("/cncapi/v1/motion/move_to")
async def v1_move_to(req: V1MoveToRequest):
    if not state.connected or not state.serial_port:
        raise HTTPException(status_code=400, detail="Chưa kết nối CNC")

    # Cập nhật 39: Kiểm tra giới hạn 4 góc cho di chuyển tuyệt đối Move To
    err_bounds = check_motion_bounds(req.x, req.y)
    if err_bounds:
        raise HTTPException(status_code=400, detail=err_bounds)

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
    z_safe: Optional[float] = None
    pen_mode: Optional[str] = None

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
            
            # 3. Luôn đọc cấu hình Nhấc Bút chuẩn từ Cấu Hình Cấu Trúc & Gốc Làm Việc (state)
            effective_pen_mode = getattr(state, 'pen_mode', 'spindle-pwm') if not req.pen_mode else req.pen_mode
            pen_dwell_sec = getattr(state, 'pen_dwell', 0.25)
            
            if effective_pen_mode == "spindle-pwm":
                pen_up_val = req.z_safe if (req.z_safe is not None and req.z_safe >= 0) else getattr(state, 'pen_up_pwm', 10.0)
                lift_cmd = f"M3 S{pen_up_val:.2f}\nG4 P{pen_dwell_sec:.2f}\n"
            else:
                pen_up_val = req.z_safe if (req.z_safe is not None and req.z_safe > 0) else getattr(state, 'pen_up_z', 3.0)
                lift_cmd = f"G90\nG0 Z{pen_up_val:.2f}\n"
                
            # Phát lệnh nhấc bút lên an toàn trước
            await safe_write_serial(lift_cmd.encode())
            # Chờ đúng thời gian trễ nhấc bút (pen_dwell) để đảm bảo đầu bút đã nhấc hoàn toàn lên khỏi mặt phẳng
            await asyncio.sleep(max(pen_dwell_sec + 0.15, 0.4))
            
            # 4. Di chuyển tới vị trí mục tiêu quy định (Gốc ban đầu hoặc Gốc WPos 0,0)
            move_cmd = f"G21\nG90\nG0 X{req.target_x:.2f} Y{req.target_y:.2f}\n"
            await safe_write_serial(move_cmd.encode())
            await asyncio.sleep(0.3)
            
            # 5. Nếu dùng Spindle PWM, tắt xung Servo M5 sau khi đã về gốc an toàn
            if effective_pen_mode == "spindle-pwm":
                await safe_write_serial(b"M5\n")
                
            # 6. Unlock lần nữa để các thao tác khác thực hiện được ngay
            await safe_write_serial(b"$X\n")
            await broadcast({"type": "log", "direction": "out", "content": f"<CTRL-X Reset, Lift Pen & Return to X{req.target_x:.2f} Y{req.target_y:.2f}>"})
        except Exception as e:
            logger.error(f"Lỗi khi dừng và về gốc quy định: {e}")
            
    await broadcast({"type": "stream_status", "status": "stopped"})
    return {"status": "success", "message": f"Đã dừng khẩn cấp, nhấc bút an toàn và di chuyển về X={req.target_x}, Y={req.target_y}"}

@app.post("/cncapi/v1/motion/pen")
async def v1_motion_pen(req: V1PenRequest):
    if not state.connected or not state.serial_port:
        raise HTTPException(status_code=400, detail="Chưa kết nối CNC")

    state_type = req.state.lower().strip()
    if state.pen_mode == "spindle-pwm":
        cmd = f"M3 S{state.pen_up_pwm}" if state_type == "up" else f"M3 S{state.pen_down_pwm}"
        await safe_write_serial((cmd + "\n").encode())
        await broadcast({"type": "log", "direction": "out", "content": cmd})
        return {"status": "success", "command": cmd}
    else:
        step = state.step_distance
        feed = state.jog_feedrate
        move_z = step if state_type == "up" else -step
        lines = ["G91", f"G0 Z{move_z:.2f} F{int(feed)}", "G90"]
        for line in lines:
            await safe_write_serial((line + "\n").encode())
            await broadcast({"type": "log", "direction": "out", "content": line})
        return {"status": "success", "command": f"G91 G0 Z{move_z:.2f} F{feed} G90"}

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

    # Cập nhật 39: Kiểm tra giới hạn 4 góc cho cử chỉ Gestures
    gtype = req.type.lower()
    if gtype == "swipe_custom":
        err1 = check_motion_bounds(req.start_x, req.start_y)
        err2 = check_motion_bounds(req.end_x, req.end_y)
        if err1: raise HTTPException(status_code=400, detail=err1)
        if err2: raise HTTPException(status_code=400, detail=err2)
    elif gtype == "swipe_left":
        err = check_motion_bounds(state.wpos[0] - swipe_dist, state.wpos[1])
        if err: raise HTTPException(status_code=400, detail=err)
    elif gtype == "swipe_right":
        err = check_motion_bounds(state.wpos[0] + swipe_dist, state.wpos[1])
        if err: raise HTTPException(status_code=400, detail=err)
    elif gtype == "swipe_down":        
        err = check_motion_bounds(state.wpos[0], state.wpos[1] - swipe_dist)
        if err: raise HTTPException(status_code=400, detail=err)
    elif gtype == "swipe_up":        
        err = check_motion_bounds(state.wpos[0], state.wpos[1] + swipe_dist)
        if err: raise HTTPException(status_code=400, detail=err)

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
    # Cách B (tạm thời): Homing 2 trục X và Y (bỏ qua trục Z)
    # Code cũ Homing tất cả các trục:
    return await send_command(CommandRequest(command="$H"))
    # return await send_command(CommandRequest(command="$HX\n$HY"))

@app.post("/cncapi/v1/origin/unlock")
async def v1_origin_unlock():
    """Tự động gửi Soft Reset (Ctrl+X) & Mở khóa ($X) để xóa ALARM và giải phóng cờ Homing"""
    state.home_set = True
    save_settings({"home_set": True})
    await safe_write_serial(b"\x18\r\n$X\r\n")
    await broadcast({"type": "log", "direction": "out", "content": "\x18 $X"})
    state.machine_state = "Idle"
    await send_telemetry()
    return {"status": "success", "message": "Đã gửi Soft Reset/Unlock ($X) và đặt cờ Homing = True thành công"}

@app.post("/cncapi/v1/origin/enable_homing")
async def v1_enable_homing():
    """Bật tính năng Homing cycle ($22=1) trong GRBL (Yêu cầu có công tắc hành trình)"""
    state.grbl_settings["$22"] = "1"
    res = await send_command(CommandRequest(command="$22=1"))
    await send_telemetry()
    return res

@app.post("/cncapi/v1/origin/disable_homing")
async def v1_disable_homing():
    """Tắt tính năng Homing cycle ($22=0) trong GRBL"""
    state.grbl_settings["$22"] = "0"
    res = await send_command(CommandRequest(command="$22=0"))
    await send_telemetry()
    return res

class V1HomingPulloffRequest(BaseModel):
    pulloff: float = 3.0

@app.post("/cncapi/v1/origin/homing_pulloff")
async def v1_set_homing_pulloff(req: V1HomingPulloffRequest):
    """Cài đặt độ nảy nhích lùi sau khi chạm công tắc ($27=val, khuyên dùng 3.0 hoặc 5.0mm để sửa lỗi ALARM:8)"""
    val_str = f"{req.pulloff:.3f}"
    state.grbl_settings["$27"] = val_str
    res = await send_command(CommandRequest(command=f"$27={req.pulloff:.1f}"))
    await send_telemetry()
    return res

class V1HardLimitsRequest(BaseModel):
    enabled: bool = False

@app.post("/cncapi/v1/origin/hard_limits")
async def v1_set_hard_limits(req: V1HardLimitsRequest):
    """Bật/tắt cờ Hard Limits ($21=0/1) chống nhiễu điện công tắc"""
    val = "1" if req.enabled else "0"
    state.grbl_settings["$21"] = val
    res = await send_command(CommandRequest(command=f"$21={val}"))
    await send_telemetry()
    return res

@app.get("/cncapi/v1/origin/homing_direction")
async def v1_get_homing_direction_info():
    """Trả về bảng tra cứu mask cấu hình chiều Homing ($23)"""
    try:
        mask = int(state.grbl_settings.get("$23", "3"))
    except ValueError:
        mask = 3
    dir_info = get_homing_direction_details(mask)
    return {
        "status": "success",
        "current_mask": mask,
        "current_direction": dir_info,
        "description": "Cấu hình đảo chiều động cơ khi Về Home ($23 - Homing Direction Invert Mask)",
        "masks": {
            "0": "X+ Y+ Z+ (Mặc định: cả 3 trục về phía DƯƠNG)",
            "1": "X- Y+ Z+ (Đảo chiều trục X sang ÂM)",
            "2": "X+ Y- Z+ (Đảo chiều trục Y sang ÂM)",
            "3": "X- Y- Z+ (Đảo chiều trục X và Y sang ÂM - Phổ biến)",
            "4": "X+ Y+ Z- (Đảo chiều trục Z sang ÂM)",
            "5": "X- Y+ Z- (Đảo chiều trục X và Z)",
            "6": "X+ Y- Z- (Đảo chiều trục Y và Z)",
            "7": "X- Y- Z- (Đảo chiều cả 3 trục X, Y, Z sang ÂM)"
        }
    }

@app.post("/cncapi/v1/origin/homing_direction")
async def v1_set_homing_direction(req: V1HomingDirectionRequest):
    """Cấu hình đảo chiều Homing các trục X, Y, Z (Phát lệnh $23=mask đến GRBL)"""
    mask = (1 if req.invert_x else 0) | (2 if req.invert_y else 0) | (4 if req.invert_z else 0)
    cmd = f"$23={mask}"
    state.grbl_settings["$23"] = str(mask)
    res = await send_command(CommandRequest(command=cmd))
    await send_telemetry()
    return {
        "status": "success",
        "mask": mask,
        "command_sent": cmd,
        "invert_x": req.invert_x,
        "invert_y": req.invert_y,
        "invert_z": req.invert_z,
        "homing_dir_info": get_homing_direction_details(mask),
        "grbl_result": res
    }

def safe_parse_float(val, default: float = 0.0) -> float:
    if val is None:
        return default
    if isinstance(val, (int, float)):
        return float(val)
    try:
        s = str(val).strip()
        import re
        match = re.search(r"[-+]?\d*\.?\d+", s)
        if match:
            return float(match.group(0))
    except Exception:
        pass
    return default

def safe_parse_int(val, default: int = 0) -> int:
    if val is None:
        return default
    if isinstance(val, int):
        return val
    try:
        s = str(val).strip()
        import re
        match = re.search(r"[-+]?\d+", s)
        if match:
            return int(match.group(0))
    except Exception:
        pass
    return default

@app.get("/cncapi/v1/system/grbl_info")
async def v1_get_grbl_system_info():
    """Trả về toàn bộ thông tin cấu hình GRBL, chiều Homing X/Y/Z, $22, $23 và thông số động cơ CNC"""
    homing_enabled = str(state.grbl_settings.get("$22", "0")).strip().startswith("1")
    mask = safe_parse_int(state.grbl_settings.get("$23", 3), 3)
    dir_info = get_homing_direction_details(mask)
    
    return {
        "status": "success",
        "homing": {
            "enabled": homing_enabled,
            "mask": mask,
            "invert_x": dir_info["invert_x"],
            "invert_y": dir_info["invert_y"],
            "invert_z": dir_info["invert_z"],
            "x_dir": dir_info["x_dir"],
            "y_dir": dir_info["y_dir"],
            "z_dir": dir_info["z_dir"],
            "label": dir_info["label"],
            "feed_rate": safe_parse_float(state.grbl_settings.get("$24"), 25.0),
            "seek_rate": safe_parse_float(state.grbl_settings.get("$25"), 500.0),
            "pulloff": safe_parse_float(state.grbl_settings.get("$27"), 1.0)
        },
        "limits": {
            "hard_limits": str(state.grbl_settings.get("$21", "0")).strip().startswith("1"),
            "soft_limits": str(state.grbl_settings.get("$20", "0")).strip().startswith("1")
        },
        "motion": {
            "dir_invert_mask": safe_parse_int(state.grbl_settings.get("$3"), 0),
            "steps_per_mm": {
                "x": safe_parse_float(state.grbl_settings.get("$100"), 250.0),
                "y": safe_parse_float(state.grbl_settings.get("$101"), 250.0),
                "z": safe_parse_float(state.grbl_settings.get("$102"), 250.0)
            },
            "max_rate": {
                "x": safe_parse_float(state.grbl_settings.get("$110"), 4000.0),
                "y": safe_parse_float(state.grbl_settings.get("$111"), 4000.0),
                "z": safe_parse_float(state.grbl_settings.get("$112"), 4000.0)
            },
            "accel": {
                "x": safe_parse_float(state.grbl_settings.get("$120"), 500.0),
                "y": safe_parse_float(state.grbl_settings.get("$121"), 500.0),
                "z": safe_parse_float(state.grbl_settings.get("$122"), 500.0)
            },
            "max_travel": {
                "x": safe_parse_float(state.grbl_settings.get("$130"), 200.0),
                "y": safe_parse_float(state.grbl_settings.get("$131"), 200.0),
                "z": safe_parse_float(state.grbl_settings.get("$132"), 200.0)
            }
        },
        "raw_settings": state.grbl_settings
    }

GRBL_PARAM_DEFS = {
    "$0": {"code": 0, "name": "Step pulse duration", "unit": "microseconds", "desc": "Thời gian xung phát bước phát tín hiệu", "group": "stepper"},
    "$1": {"code": 1, "name": "Step idle delay", "unit": "milliseconds", "desc": "Độ trễ giữ lực động cơ khi đứng rảnh", "group": "stepper"},
    "$2": {"code": 2, "name": "Step pulse invert", "unit": "mask", "desc": "Mask đảo chiều xung phát bước (Step pin invert mask)", "group": "stepper"},
    "$3": {"code": 3, "name": "Direction port invert", "unit": "mask", "desc": "Mask đảo chiều quay động cơ Jogging/GCode", "group": "stepper"},
    "$4": {"code": 4, "name": "Step enable invert", "unit": "boolean", "desc": "Đảo mức logic kích hoạt chân Enable", "group": "stepper"},
    "$5": {"code": 5, "name": "Limit pins invert", "unit": "boolean", "desc": "Đảo mức logic công tắc hành trình (0=NC/High, 1=NO/Low)", "group": "stepper"},
    "$6": {"code": 6, "name": "Probe pin invert", "unit": "boolean", "desc": "Đảo mức logic chân cảm biến Probe", "group": "stepper"},
    "$10": {"code": 10, "name": "Status report options", "unit": "mask", "desc": "Tùy chọn thông tin báo cáo trạng thái (?)", "group": "system"},
    "$11": {"code": 11, "name": "Junction deviation", "unit": "mm", "desc": "Độ lệch góc chuyển hướng (Junction deviation)", "group": "system"},
    "$12": {"code": 12, "name": "Arc tolerance", "unit": "mm", "desc": "Dung sai độ mịn đường cung tròn (G2/G3 Arc tolerance)", "group": "system"},
    "$13": {"code": 13, "name": "Report inches", "unit": "boolean", "desc": "Báo cáo theo đơn vị Inches (0=mm, 1=inch)", "group": "system"},
    "$20": {"code": 20, "name": "Soft limits enable", "unit": "boolean", "desc": "Bật/Tắt giới hạn mềm bằng phần mềm (Soft Limits)", "group": "limits"},
    "$21": {"code": 21, "name": "Hard limits enable", "unit": "boolean", "desc": "Bật/Tắt giới hạn cứng công tắc hành trình (Hard Limits)", "group": "limits"},
    "$22": {"code": 22, "name": "Homing cycle enable", "unit": "boolean", "desc": "Bật/Tắt chu kỳ về gốc máy (Homing cycle $H)", "group": "limits"},
    "$23": {"code": 23, "name": "Homing dir invert", "unit": "mask", "desc": "Mask đảo chiều di chuyển khi Homing (Homing Dir Mask)", "group": "limits"},
    "$24": {"code": 24, "name": "Homing locate feed", "unit": "mm/min", "desc": "Tốc độ dò công tắc nhích chốt vị trí (Homing locate feed)", "group": "limits"},
    "$25": {"code": 25, "name": "Homing search seek", "unit": "mm/min", "desc": "Tốc độ di chuyển tìm công tắc hành trình (Homing search seek)", "group": "limits"},
    "$26": {"code": 26, "name": "Homing debounce delay", "unit": "ms", "desc": "Thời gian lọc nhiễu công tắc Homing (Debounce delay)", "group": "limits"},
    "$27": {"code": 27, "name": "Homing pull-off distance", "unit": "mm", "desc": "Khoảng cách nhích lùi nhả công tắc Homing (Pull-off)", "group": "limits"},
    "$30": {"code": 30, "name": "Max spindle speed", "unit": "RPM/PWM", "desc": "Tốc độ quay Trục chính / Tín hiệu PWM tối đa", "group": "spindle"},
    "$31": {"code": 31, "name": "Min spindle speed", "unit": "RPM/PWM", "desc": "Tốc độ quay Trục chính / Tín hiệu PWM tối thiểu", "group": "spindle"},
    "$32": {"code": 32, "name": "Laser mode enable", "unit": "boolean", "desc": "Bật/Tắt chế độ điều khiển Laser (Laser mode)", "group": "spindle"},
    "$100": {"code": 100, "name": "X-axis steps/mm", "unit": "step/mm", "desc": "Số xung/bước trên 1 milimet Trục X", "group": "motion"},
    "$101": {"code": 101, "name": "Y-axis steps/mm", "unit": "step/mm", "desc": "Số xung/bước trên 1 milimet Trục Y", "group": "motion"},
    "$102": {"code": 102, "name": "Z-axis steps/mm", "unit": "step/mm", "desc": "Số xung/bước trên 1 milimet Trục Z", "group": "motion"},
    "$110": {"code": 110, "name": "X-axis max rate", "unit": "mm/min", "desc": "Tốc độ di chuyển tối đa Trục X", "group": "motion"},
    "$111": {"code": 111, "name": "Y-axis max rate", "unit": "mm/min", "desc": "Tốc độ di chuyển tối đa Trục Y", "group": "motion"},
    "$112": {"code": 112, "name": "Z-axis max rate", "unit": "mm/min", "desc": "Tốc độ di chuyển tối đa Trục Z", "group": "motion"},
    "$120": {"code": 120, "name": "X-axis accel", "unit": "mm/sec²", "desc": "Gia tốc tăng tốc Trục X", "group": "motion"},
    "$121": {"code": 121, "name": "Y-axis accel", "unit": "mm/sec²", "desc": "Gia tốc tăng tốc Trục Y", "group": "motion"},
    "$122": {"code": 122, "name": "Z-axis accel", "unit": "mm/sec²", "desc": "Gia tốc tăng tốc Trục Z", "group": "motion"},
    "$130": {"code": 130, "name": "X-axis max travel", "unit": "mm", "desc": "Hành trình di chuyển tối đa Trục X", "group": "motion"},
    "$131": {"code": 131, "name": "Y-axis max travel", "unit": "mm", "desc": "Hành trình di chuyển tối đa Trục Y", "group": "motion"},
    "$132": {"code": 132, "name": "Z-axis max travel", "unit": "mm", "desc": "Hành trình di chuyển tối đa Trục Z", "group": "motion"},
}

class GrblPhysicalSettingsPayload(BaseModel):
    settings: Optional[Dict[str, str]] = None
    param: Optional[str] = None
    value: Optional[str] = None

@app.get("/cncapi/v1/system/grbl_settings")
async def v1_get_grbl_physical_settings():
    """Lấy danh sách tất cả các thông số cấu hình phần cứng GRBL ($$) kèm metadata và giá trị hiện tại"""
    # Đồng bộ lưu cnc_physical vào calibration_settings.json
    save_settings({"cnc_physical": state.grbl_settings})
    
    items = []
    # Ưu tiên các tham số có trong GRBL_PARAM_DEFS
    all_keys = list(GRBL_PARAM_DEFS.keys())
    for k in state.grbl_settings.keys():
        if k not in all_keys:
            all_keys.append(k)
            
    for k in all_keys:
        meta = GRBL_PARAM_DEFS.get(k, {
            "code": int(k.replace("$", "")) if k.replace("$", "").isdigit() else 999,
            "name": f"GRBL Setting {k}",
            "unit": "",
            "desc": f"Thông số GRBL {k}",
            "group": "other"
        })
        val = state.grbl_settings.get(k, "")
        items.append({
            "key": k,
            "code": meta["code"],
            "name": meta["name"],
            "unit": meta["unit"],
            "desc": meta["desc"],
            "group": meta["group"],
            "value": val
        })
        
    return {
        "status": "success",
        "cnc_physical": state.grbl_settings,
        "parameters": items
    }

@app.post("/cncapi/v1/system/grbl_settings")
async def v1_update_grbl_physical_settings(payload: GrblPhysicalSettingsPayload):
    """Cập nhật một hoặc nhiều thông số cấu hình GRBL ($$), phát lệnh xuống CNC và lưu cnc_physical vào calibration_settings.json"""
    to_update: Dict[str, str] = {}
    if payload.settings:
        for k, v in payload.settings.items():
            key = k if k.startswith("$") else f"${k}"
            to_update[key] = str(v).strip()
    if payload.param is not None and payload.value is not None:
        key = payload.param if payload.param.startswith("$") else f"${payload.param}"
        to_update[key] = str(payload.value).strip()
        
    if not to_update:
        raise HTTPException(status_code=400, detail="Không có thông số GRBL nào được truyền để cập nhật")
        
    results = {}
    for key, val_str in to_update.items():
        cmd = f"{key}={val_str}"
        state.grbl_settings[key] = val_str
        await safe_write_serial(f"{cmd}\n".encode())
        await broadcast({"type": "log", "direction": "out", "content": cmd})
        results[key] = val_str
        
    save_settings({"cnc_physical": state.grbl_settings})
    await send_telemetry()
    
    return {
        "status": "success",
        "message": f"Đã cập nhật {len(results)} thông số GRBL physical và lưu vào calibration_settings.json thành công!",
        "updated": results,
        "cnc_physical": state.grbl_settings
    }

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
    font_name: str = "arial.ttf"
    text: str
    font_size_pt: float = 72.0
    line_spacing: float = 1.2
    line_spacing_mm: float = 0.0
    z_safe: Optional[float] = None
    z_draw: Optional[float] = None
    feed_rate: Optional[float] = 4000.0
    margin_mm: float = 0.0
    epsilon: float = 0.3
    binary_threshold: int = 128
    render_dpi: int = 300
    min_path_len_mm: float = 0.05
    sort_row_height_mm: float = 10.0
    stroke_mode: str = "single_line"
    pen_mode: Optional[str] = None
    axis_dir_y: Optional[int] = None
    rotation_angle: float = -90.0
    flip_x: bool = False
    flip_y: bool = False
    mm_per_px: Optional[float] = None

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
        # Adaptive binarization for small fonts (8pt - 14pt)
        is_small_font = (req.font_size_pt <= 14.0)
        default_thresh = 180 if is_small_font else 128
        thresh_val = req.binary_threshold if req.binary_threshold and 1 <= req.binary_threshold <= 254 else default_thresh
        binary_img = img_np < thresh_val

        # Morphological dilation for small fonts or single_line_bold mode to prevent stroke breaking
        if is_small_font or req.stroke_mode == "single_line_bold":
            if cv2 is not None:
                kernel = np.ones((2, 2), np.uint8)
                binary_img = cv2.dilate(binary_img.astype(np.uint8), kernel, iterations=1) > 0

        if (req.stroke_mode in ("single_line", "single_line_bold")) and skeletonize is not None:
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

        import math
        sys_mm_per_px = req.mm_per_px if req.mm_per_px is not None and req.mm_per_px > 0 else getattr(state, 'mm_per_px', None)
        if sys_mm_per_px is not None and sys_mm_per_px > 0:
            scale_mm_per_px = sys_mm_per_px
        else:
            scale_mm_per_px = (req.font_size_pt * MM_PER_PT) / font_size_px

        actual_w_mm = raw_w_px * scale_mm_per_px
        actual_h_mm = raw_h_px * scale_mm_per_px

        effective_axis_dir_y = req.axis_dir_y if req.axis_dir_y is not None else getattr(state, 'axis_dir_y', 1)

        rot_deg = req.rotation_angle if req.rotation_angle is not None else -90.0
        rad = math.radians(rot_deg)
        cos_a = math.cos(rad)
        sin_a = math.sin(rad)

        raw_paths = []
        effective_epsilon = min(req.epsilon, 0.3) if is_small_font else req.epsilon
        min_path_len_mm = min(req.min_path_len_mm, 0.02) if is_small_font else (req.min_path_len_mm if req.min_path_len_mm is not None else 0.05)

        for contour in contours:
            if len(contour) < 1:
                continue
            if cv2 is not None and len(contour) >= 2:
                approx = cv2.approxPolyDP(contour, epsilon=effective_epsilon, closed=False)
                pts = approx.reshape(-1, 2)
            else:
                pts = contour.reshape(-1, 2)

            path_mm = []
            for pt in pts:
                px_x = pt[0] - pad_px
                px_y = pt[1] - pad_px
                if req.flip_x:
                    px_x = raw_w_px - px_x
                if req.flip_y:
                    px_y = raw_h_px - px_y

                x_unrot = px_x * scale_mm_per_px + req.margin_mm
                if effective_axis_dir_y == -1:
                    y_unrot = (raw_h_px - px_y) * scale_mm_per_px + req.margin_mm
                else:
                    y_unrot = px_y * scale_mm_per_px + req.margin_mm

                if rot_deg != 0.0:
                    x_mm = round(x_unrot * cos_a - y_unrot * sin_a, 2)
                    y_mm = round(x_unrot * sin_a + y_unrot * cos_a, 2)
                else:
                    x_mm = round(x_unrot, 2)
                    y_mm = round(y_unrot, 2)

                path_mm.append((x_mm, y_mm))

            # Preserve single point dots by creating a micro-dip stroke
            if len(path_mm) == 1:
                pt_dot = path_mm[0]
                path_mm = [pt_dot, (round(pt_dot[0] + 0.05, 2), round(pt_dot[1] + 0.05, 2))]

            if len(path_mm) >= 2:
                # Calculate path length in mm
                path_len = sum(np.hypot(path_mm[i][0] - path_mm[i-1][0], path_mm[i][1] - path_mm[i-1][1]) for i in range(1, len(path_mm)))
                if path_len >= min_path_len_mm or is_small_font:
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

        # Luôn đọc trực tiếp cấu hình Bút từ "Cấu Hình Cấu Trúc & Gốc Làm Việc" (state)
        effective_pen_mode = req.pen_mode if req.pen_mode else getattr(state, 'pen_mode', 'spindle-pwm')
        pen_dwell_sec = getattr(state, 'pen_dwell', 0.25)
        
        if effective_pen_mode == "spindle-pwm":
            pen_up_val = req.z_safe if req.z_safe is not None else getattr(state, 'pen_up_pwm', 10.0)
            pen_down_val = req.z_draw if req.z_draw is not None else getattr(state, 'pen_down_pwm', 28.0)
            pen_up_cmd = f"M3 S{pen_up_val:.2f}\nG4 P{pen_dwell_sec:.2f}"
            pen_down_cmd = f"M3 S{pen_down_val:.2f}\nG4 P{pen_dwell_sec:.2f}"
        else:
            pen_up_val = req.z_safe if req.z_safe is not None else getattr(state, 'pen_up_z', 3.0)
            pen_down_val = req.z_draw if req.z_draw is not None else getattr(state, 'pen_down_z', 0.0)
            feed_rate_val = req.feed_rate if req.feed_rate is not None else getattr(state, 'jog_feedrate', 4000.0)
            pen_up_cmd = f"G0 Z{pen_up_val:.2f}"
            pen_down_cmd = f"G1 Z{pen_down_val:.2f} F{feed_rate_val:.0f}"

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

        if effective_pen_mode == "spindle-pwm":
            gcode.extend(["G0 X0 Y0 ; Tra ve goc", "M5 ; Tat Spindle/Servo", "M30 ; Ket thuc"])
        else:
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

def sort_gcode_paths_left_to_right(
    gcode_text: str,
    feed_rate: int = 2000,
    mode: str = "servo",
    sort_row_height_mm: float = 10.0,
    rotation_angle: float = 0.0,
    flip_x: bool = False,
    flip_y: bool = False
) -> Tuple[str, List[dict]]:
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

    # Bước 0: Áp dụng Lật Ngang, Lật Dọc & Góc Xoay nếu có yêu cầu
    if flip_x or flip_y or (rotation_angle is not None and rotation_angle != 0.0):
        all_xs = [pt[0] for path in paths for pt in path]
        all_ys = [pt[1] for path in paths for pt in path]
        if all_xs and all_ys:
            min_x, max_x = min(all_xs), max(all_xs)
            min_y, max_y = min(all_ys), max(all_ys)
            center_x = (min_x + max_x) / 2.0
            center_y = (min_y + max_y) / 2.0
            
            rad = math.radians(rotation_angle) if rotation_angle else 0.0
            cos_a = math.cos(rad)
            sin_a = math.sin(rad)
            
            transformed_paths = []
            for path in paths:
                new_path = []
                for pt in path:
                    x, y = pt[0], pt[1]
                    if flip_x:
                        x = max_x - (x - min_x)
                    if flip_y:
                        y = max_y - (y - min_y)
                    if rotation_angle != 0.0:
                        dx = x - center_x
                        dy = y - center_y
                        rx = dx * cos_a - dy * sin_a
                        ry = dx * sin_a + dy * cos_a
                        x = center_x + rx
                        y = center_y + ry
                    new_path.append((round(x, 3), round(y, 3)))
                transformed_paths.append(new_path)
            paths = transformed_paths

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

    effective_pen_mode = getattr(state, 'pen_mode', 'spindle-pwm')
    pen_dwell_sec = getattr(state, 'pen_dwell', 0.25)
    
    if effective_pen_mode == "spindle-pwm" or mode == "servo":
        pen_up_val = getattr(state, 'pen_up_pwm', 10.0)
        pen_down_val = getattr(state, 'pen_down_pwm', 28.0)
        pen_down = f"M3 S{pen_down_val:.2f}\nG4 P{pen_dwell_sec:.2f}"
        pen_up = f"M3 S{pen_up_val:.2f}\nG4 P{pen_dwell_sec:.2f}"
        init_pen = f"M3 S{pen_up_val:.2f}\nG4 P{pen_dwell_sec:.2f} ; Lift Pen"
        end_cmd = "M5 ; Tat Spindle/Servo\nM30"
    else:
        pen_up_val = getattr(state, 'pen_up_z', 2.0)
        pen_down_val = getattr(state, 'pen_down_z', -1.0)
        pen_down = f"G1 Z{pen_down_val:.2f} F{feed_rate}"
        pen_up = f"G0 Z{pen_up_val:.2f}"
        init_pen = f"G0 Z{pen_up_val:.2f} ; Lift Pen"
        end_cmd = "M30"

    new_gcode = [
        "; --- G-CODE IMAGE (Strict Left-to-Right Order - Identical to Gcode Font) ---",
        "G21 ; Don vi: mm",
        "G90 ; Toa do tuyet doi",
        f"{init_pen}",
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

    new_gcode.append("G0 X0 Y0 ; Tra ve goc")
    new_gcode.append(end_cmd)

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
    handwriting_offset_step: int = Form(2),
    rotation_angle: float = Form(0.0),
    flip_x: bool = Form(False),
    flip_y: bool = Form(False)
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
            
        gcode_content, segments = sort_gcode_paths_left_to_right(
            raw_gcode_content,
            feed_rate=feed_rate,
            mode=mode,
            rotation_angle=rotation_angle,
            flip_x=flip_x,
            flip_y=flip_y
        )
                
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
        if state.connected and not state.device_id:
            try:
                await safe_write_serial(b"$GETID\n")
            except Exception:
                pass
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
    uvicorn.run("main:app", host="0.0.0.0", port=8099, reload=False)

