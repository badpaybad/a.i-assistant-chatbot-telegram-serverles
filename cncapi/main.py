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
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.responses import HTMLResponse, JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

# Configure logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("cnc_controller")

app = FastAPI(title="GRBL CNC Web Controller")

SETTINGS_FILE = "calibration_settings.json"

def load_settings() -> dict:
    default_settings = {
        "step_distance": 10.0,
        "jog_feedrate": 1000.0,
        "gesture_feedrate": 4000.0,
        "gesture_distance": 40.0,
        "gesture_dwell": 0.15,
        "gesture_tap_dwell": 0.05,
        "pen_mode": "z-axis",
        "pen_up_z": 3.0,
        "pen_down_z": 0.0,
        "pen_up_pwm": 30.0,
        "pen_down_pwm": 90.0,
        "pen_dwell": 0.25,
        "workpiece_origin": {"x": 0.0, "y": 0.0, "z": 0.0},
        "work_origin": {"x": 0.0, "y": 0.0, "z": 0.0},
        "parking_point": {"x": 0.0, "y": 0.0, "z": 10.0},
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
        
        # Motion parameters
        self.step_distance = float(settings.get("step_distance", 10.0))
        self.jog_feedrate = float(settings.get("jog_feedrate", 1000.0))
        
        # WebSockets
        self.websocket_connections: Set[WebSocket] = set()
        self.grbl_ack_event = asyncio.Event()
        
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

state = ControllerState()

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
                state.serial_port.write(b"?")
                state.serial_port.flush()
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
        "home_set": state.home_set
    })

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
            state.is_streaming = False
            
            if state.connected and state.serial_port and not isinstance(state.serial_port, DummySerial):
                try:
                    state.serial_port.write(b"\x18")
                    state.serial_port.flush()
                    await asyncio.sleep(1.0)
                    state.serial_port.write(b"$X\n")
                    state.serial_port.flush()
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
            if not isinstance(state.serial_port, DummySerial):
                state.serial_port.write((clean_line + "\n").encode())
                state.serial_port.flush()
            else:
                state.serial_port.write((clean_line + "\n").encode())
                
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

class PenSettingsRequest(BaseModel):
    pen_mode: Optional[str] = None
    pen_up_z: Optional[float] = None
    pen_down_z: Optional[float] = None
    pen_up_pwm: Optional[float] = None
    pen_down_pwm: Optional[float] = None
    pen_dwell: Optional[float] = None

class Point3D(BaseModel):
    x: float
    y: float
    z: float

class StreamRequest(BaseModel):
    gcode: str

# API Routes
@app.get("/api/devices/ports")
async def get_serial_ports():
    ports = []
    if sys.platform.startswith('linux'):
        import glob
        ports = glob.glob('/dev/tty[A-Za-z]*')
    elif sys.platform.startswith('darwin'):
        import glob
        ports = glob.glob('/dev/tty.*')
    elif sys.platform.startswith('win'):
        import serial.tools.list_ports
        ports = [p.device for p in serial.tools.list_ports.comports()]
    return {"ports": sorted(ports)}

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
        state.serial_port.write(b"\r\n\r\n")
        state.serial_port.flush()
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
                if isinstance(state.serial_port, DummySerial):
                    state.serial_port.write((clean_cmd + "\n").encode())
                else:
                    state.serial_port.write((clean_cmd + "\n").encode())
                    state.serial_port.flush()
                await broadcast({"type": "log", "direction": "out", "content": clean_cmd})
                results.append(clean_cmd)
            except Exception as e:
                logger.error(f"Lỗi gửi lệnh '{clean_cmd}': {e}")
                raise HTTPException(status_code=500, detail=str(e))
            
    return {"status": "success", "sent": results}

@app.get("/api/pen_settings")
async def get_pen_settings():
    return {
        "pen_mode": state.pen_mode,
        "pen_up_z": state.pen_up_z,
        "pen_down_z": state.pen_down_z,
        "pen_up_pwm": state.pen_up_pwm,
        "pen_down_pwm": state.pen_down_pwm,
        "pen_dwell": state.pen_dwell,
        "step_distance": state.step_distance,
        "jog_feedrate": state.jog_feedrate,
        "workpiece_origin": state.workpiece_origin,
        "work_origin": state.work_origin,
        "parking_point": state.parking_point,
    }

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
            state.serial_port.write((cmd + "\n").encode())
            if not isinstance(state.serial_port, DummySerial):
                state.serial_port.flush()
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
        if isinstance(state.serial_port, DummySerial):
            state.serial_port.write((cmd + "\n").encode())
        else:
            state.serial_port.write((cmd + "\n").encode())
            state.serial_port.flush()
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
            if not isinstance(state.serial_port, DummySerial):
                state.serial_port.write(b"\x18")
                state.serial_port.flush()
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
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def read_index():
    return FileResponse("static/index.html")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8099)
