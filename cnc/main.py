import os
import re
import time
import serial
import asyncio
import logging
import subprocess
import json
from typing import Dict, List, Set, Optional
from fastapi import FastAPI, UploadFile, File, Form, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

# Configure logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("cnc_controller")

app = FastAPI(title="GRBL CNC Web Controller")

# Pen / Servo settings persistence
SETTINGS_FILE = "pen_settings.json"

class PenSettings(BaseModel):
    mode: str
    pen_up_z: float
    pen_down_z: float
    pen_up_pwm: float
    pen_down_pwm: float
    pen_dwell: float

def load_pen_settings() -> dict:
    default_settings = {
        "mode": "z-axis",
        "pen_up_z": 3.0,
        "pen_down_z": 0.0,
        "pen_up_pwm": 30.0,
        "pen_down_pwm": 90.0,
        "pen_dwell": 0.25
    }
    if os.path.exists(SETTINGS_FILE):
        try:
            with open(SETTINGS_FILE, "r") as f:
                return {**default_settings, **json.load(f)}
        except Exception as e:
            logger.error(f"Error loading pen settings: {e}")
    return default_settings

def save_pen_settings(settings: dict):
    try:
        with open(SETTINGS_FILE, "w") as f:
            json.dump(settings, f, indent=4)
    except Exception as e:
        logger.error(f"Error saving pen settings: {e}")

# Global Controller State
class ControllerState:
    def __init__(self):
        self.serial_port: Optional[serial.Serial] = None
        self.port_name = "/dev/ttyACM0"
        self.baudrate = 115200
        self.connected = False
        
        # Telemetry
        self.machine_state = "Disconnected"
        self.mpos = [0.0, 0.0, 0.0]
        self.wpos = [0.0, 0.0, 0.0]
        self.wco = [0.0, 0.0, 0.0]
        self.feedrate = 0.0
        self.spindle_speed = 0.0
        self.buffer_rx = 127
        self.buffer_blocks = 15
        
        # Pen/Servo configuration
        settings = load_pen_settings()
        self.pen_mode = settings["mode"]
        self.pen_up_z = settings["pen_up_z"]
        self.pen_down_z = settings["pen_down_z"]
        self.pen_up_pwm = settings["pen_up_pwm"]
        self.pen_down_pwm = settings["pen_down_pwm"]
        self.pen_dwell = settings["pen_dwell"]
        self.pen_state = None # "up" or "down" or None
        
        # G-Code streaming variables
        self.is_streaming = False
        self.is_paused = False
        self.gcode_lines: List[str] = []
        self.stream_gcode_lines: List[str] = []
        self.gcode_index = 0
        self.sent_buffer_lengths = [] # Track length of lines in GRBL rx buffer
        self.stream_task: Optional[asyncio.Task] = None
        self.websocket_connections: Set[WebSocket] = set()

state = ControllerState()

# Helpers
def get_port_owner(port: str) -> str:
    """Check which process is currently holding the serial port."""
    try:
        out = subprocess.check_output(["lsof", port], text=True, stderr=subprocess.DEVNULL)
        for line in out.splitlines()[1:]:
            parts = line.split()
            if len(parts) >= 3:
                return f"{parts[0]} (PID {parts[1]}, User {parts[2]})"
    except Exception:
        pass
    try:
        out = subprocess.check_output(["fuser", port], text=True, stderr=subprocess.DEVNULL)
        pids = out.strip().split()
        if pids:
            # Get process names
            names = []
            for pid in pids:
                cmd = subprocess.check_output(["ps", "-p", pid, "-o", "comm="], text=True).strip()
                names.append(f"{cmd} (PID {pid})")
            return ", ".join(names)
    except Exception:
        pass
    return "Unknown process"

async def broadcast(message: dict):
    """Send JSON message to all connected WebSockets."""
    if not state.websocket_connections:
        return
    disconnected = set()
    for ws in state.websocket_connections:
        try:
            await ws.send_json(message)
        except Exception:
            disconnected.add(ws)
    for ws in disconnected:
        state.websocket_connections.discard(ws)

def translate_command(command: str) -> List[str]:
    """Translate Z coordinate to spindle PWM commands if in spindle-pwm mode."""
    if state.pen_mode != "spindle-pwm":
        return [command]
        
    stripped = command.strip()
    if not stripped or stripped.startswith("(") or stripped.startswith(";"):
        return [command]
        
    # Check if there is a Z coordinate
    z_match = re.search(r'\b[zZ]([-+]?[0-9]*\.?[0-9]+)\b', stripped)
    if not z_match:
        # No Z coordinate, let the command pass through unmodified
        return [command]
        
    z_val = float(z_match.group(1))
    
    try:
        # Determine target state based on Z compared to midpoint
        midpoint = (state.pen_up_z + state.pen_down_z) / 2.0
        if state.pen_up_z >= state.pen_down_z:
            target_state = "up" if z_val >= midpoint else "down"
        else:
            target_state = "up" if z_val <= midpoint else "down"
            
        # Clean the command by removing the Z coordinate
        clean_cmd = re.sub(r'\b[zZ][-+]?[0-9]*\.?[0-9]+\b', '', stripped).strip()
        clean_cmd = re.sub(r'\s+', ' ', clean_cmd)
        
        cmds = []
        if state.pen_state is None or target_state != state.pen_state:
            state.pen_state = target_state
            pwm_val = state.pen_up_pwm if target_state == "up" else state.pen_down_pwm
            cmds.append(f"M3 S{pwm_val}")
            cmds.append(f"G4 P{state.pen_dwell}")
            
        if clean_cmd:
            is_only_motion_code = re.match(r'^[gG][0-3]$', clean_cmd)
            if not is_only_motion_code:
                cmds.append(clean_cmd)
                
        return cmds
    except Exception as e:
        logger.error(f"Error translating command '{command}': {e}")
        return [command]


def parse_grbl_status(status_str: str):
    """Parse GRBL realtime status feedback e.g.,
    <Idle|WPos:0.000,0.000,0.000|Bf:15,127|FS:0,0|WCO:0.000,0.000,0.000>
    or older GRBL v0.9 comma-separated status format:
    <Idle,MPos:0.000,0.000,0.000,WPos:0.000,0.000,0.000>
    """
    try:
        # Strip outer angle brackets
        clean = status_str.strip("<> \r\n")
        
        # Extact state (first word)
        state_match = re.match(r"^([a-zA-Z]+)", clean)
        if state_match:
            state.machine_state = state_match.group(1)
            
        # Find all key-value patterns (e.g. MPos:0.000,0.000,0.000)
        matches = re.findall(r"([a-zA-Z]+):([-+0-9.,]*)", clean)
        for key, val in matches:
            val = val.strip(",")
            if key == "WPos":
                state.wpos = [float(x) for x in val.split(",")]
                # Calculate MPos if we have WCO
                state.mpos = [w + o for w, o in zip(state.wpos, state.wco)]
            elif key == "MPos":
                state.mpos = [float(x) for x in val.split(",")]
                # Calculate WPos if we have WCO
                state.wpos = [m - o for m, o in zip(state.mpos, state.wco)]
            elif key == "WCO":
                state.wco = [float(x) for x in val.split(",")]
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

# Serial Reader Background Loop
async def serial_reader_loop():
    loop = asyncio.get_running_loop()
    buffer = ""
    
    while state.connected and state.serial_port:
        try:
            # Read non-blocking from serial
            if state.serial_port.in_waiting > 0:
                # Read bytes and decode
                data = await loop.run_in_executor(None, state.serial_port.read, state.serial_port.in_waiting)
                buffer += data.decode('utf-8', errors='ignore')
                
                while "\n" in buffer:
                    line, buffer = buffer.split("\n", 1)
                    line = line.strip()
                    if not line:
                        continue
                    
                    # Print line to log & WS console
                    await broadcast({"type": "log", "direction": "in", "content": line})
                    
                    # Parse status query output
                    if line.startswith("<") and line.endswith(">"):
                        parse_grbl_status(line)
                        await send_telemetry()
                    
                    # Check streaming acknowledgment
                    elif line == "ok" or "error" in line:
                        if state.is_streaming:
                            if state.sent_buffer_lengths:
                                # Acknowledge line
                                state.sent_buffer_lengths.pop(0)
                            # Notify streaming task to send more lines
                            # We can trigger checking queue
                            if state.stream_task:
                                # We wake up stream_task or it checks dynamically
                                pass
            else:
                await asyncio.sleep(0.01)
        except Exception as e:
            logger.error(f"Error in serial reader: {e}")
            state.connected = False
            await broadcast({"type": "connection", "connected": False, "message": f"Connection lost: {e}"})
            break

# Auto Query Loop
async def status_polling_loop():
    while state.connected and state.serial_port:
        try:
            # Send '?' to poll GRBL status
            state.serial_port.write(b"?")
            state.serial_port.flush()
        except Exception as e:
            logger.error(f"Error writing status poll: {e}")
        await asyncio.sleep(0.2) # Poll every 200ms

async def send_telemetry():
    """Send current machine state & coordinates to clients."""
    await broadcast({
        "type": "telemetry",
        "state": state.machine_state,
        "mpos": state.mpos,
        "wpos": state.wpos,
        "feedrate": state.feedrate,
        "spindle_speed": state.spindle_speed,
        "buffer_rx": state.buffer_rx,
        "buffer_blocks": state.buffer_blocks,
        "streaming": state.is_streaming,
        "streaming_progress": (state.gcode_index / len(state.stream_gcode_lines)) if state.stream_gcode_lines else 0.0,
        "gcode_index": state.gcode_index,
        "gcode_total": len(state.stream_gcode_lines)
    })

# Serial Writer with character counting protocol
async def gcode_streamer_task():
    logger.info("G-code streamer task started")
    state.sent_buffer_lengths = []
    
    while state.is_streaming and state.connected:
        if state.is_paused:
            await asyncio.sleep(0.1)
            continue
            
        if state.gcode_index >= len(state.stream_gcode_lines):
            # Finished streaming G-code. Wait until GRBL buffer finishes execution
            while state.sent_buffer_lengths:
                await asyncio.sleep(0.1)
            state.is_streaming = False
            await broadcast({"type": "stream_status", "status": "completed"})
            await send_telemetry()
            break
            
        # Get next line
        line = state.stream_gcode_lines[state.gcode_index].strip()
        
        # Remove comments and whitespace
        clean_line = re.sub(r'\(.*?\)', '', line).strip()
        clean_line = re.sub(r';.*', '', clean_line).strip()
        
        if not clean_line:
            # Skip empty lines but keep progress
            state.gcode_index += 1
            continue
            
        # Character counting protocol check
        # GRBL rx buffer is 127 bytes
        line_len = len(clean_line) + 1 # Include newline character
        
        # Wait if rx buffer is full
        current_buffer_sum = sum(state.sent_buffer_lengths)
        if current_buffer_sum + line_len > 127:
            # Sleep briefly and try again
            await asyncio.sleep(0.01)
            continue
            
        # Write to serial
        try:
            state.sent_buffer_lengths.append(line_len)
            state.serial_port.write((clean_line + "\n").encode())
            state.serial_port.flush()
            await broadcast({"type": "log", "direction": "out", "content": clean_line})
            
            state.gcode_index += 1
            if state.gcode_index % 5 == 0:
                await send_telemetry()
        except Exception as e:
            logger.error(f"Error streaming G-code line: {e}")
            state.is_streaming = False
            await broadcast({"type": "stream_status", "status": "failed", "message": str(e)})
            break

# REST Endpoints
class ConnectionConfig(BaseModel):
    port: str
    baudrate: int

@app.post("/api/connect")
async def connect(config: ConnectionConfig):
    if state.connected:
        return JSONResponse({"status": "ok", "message": "Already connected"})
        
    state.port_name = config.port
    state.baudrate = config.baudrate
    
    logger.info(f"Connecting to serial port {state.port_name} at {state.baudrate}")
    
    try:
        # Open serial port
        state.serial_port = serial.Serial(state.port_name, state.baudrate, timeout=0.1)
        state.connected = True
        state.machine_state = "Connecting"
        
        # GRBL resets on serial connect. Wait a moment for boot.
        await asyncio.sleep(1.5)
        
        # Write carriage returns to wake up GRBL
        state.serial_port.write(b"\r\n\r\n")
        state.serial_port.flush()
        
        # Run background loops
        asyncio.create_task(serial_reader_loop())
        asyncio.create_task(status_polling_loop())
        
        await broadcast({"type": "connection", "connected": True, "message": "Connected to GRBL"})
        return {"status": "ok", "message": "Connected successfully"}
        
    except serial.SerialException as e:
        logger.error(f"Serial exception: {e}")
        owner = get_port_owner(state.port_name)
        msg = f"Cannot open port {state.port_name}."
        if "Device or resource busy" in str(e):
            msg += f" The port is currently occupied by: {owner}."
        else:
            msg += f" Reason: {e}"
        return JSONResponse({"status": "error", "message": msg}, status_code=400)
    except Exception as e:
        logger.error(f"Unknown connection error: {e}")
        return JSONResponse({"status": "error", "message": str(e)}, status_code=500)

@app.post("/api/disconnect")
async def disconnect():
    if not state.connected:
        return {"status": "ok", "message": "Already disconnected"}
        
    state.connected = False
    state.is_streaming = False
    
    if state.serial_port:
        try:
            state.serial_port.close()
        except Exception:
            pass
        state.serial_port = None
        
    state.machine_state = "Disconnected"
    await broadcast({"type": "connection", "connected": False, "message": "Disconnected by user"})
    return {"status": "ok", "message": "Disconnected successfully"}

@app.post("/api/command")
async def send_command(command: str = Form(...)):
    """Send immediate G-code or real-time GRBL command."""
    if not state.connected or not state.serial_port:
        return JSONResponse({"status": "error", "message": "Not connected"}, status_code=400)
        
    try:
        # Real-time commands bypass the stream buffer and are written immediately
        # Examples: '!' (feed hold), '~' (resume), '?' (status), Ctrl-X (0x18 - soft reset)
        is_rt = False
        rt_byte = b""
        
        if command == "!":
            is_rt = True
            rt_byte = b"!"
            state.is_paused = True
        elif command == "~":
            is_rt = True
            rt_byte = b"~"
            state.is_paused = False
        elif command == "?":
            is_rt = True
            rt_byte = b"?"
        elif command.lower() == "ctrl-x":
            is_rt = True
            rt_byte = b"\x18"
            state.is_streaming = False
            state.is_paused = False
            state.gcode_lines = []
            state.stream_gcode_lines = []
            state.gcode_index = 0
            
        if is_rt:
            state.serial_port.write(rt_byte)
            state.serial_port.flush()
            await broadcast({"type": "log", "direction": "out", "content": f"[Immediate: {command}]"})
            return {"status": "ok", "message": f"Real-time command '{command}' sent"}
            
        # Standard G-code command
        clean_cmd = command.strip()
        if clean_cmd:
            lines = [line.strip() for line in clean_cmd.splitlines() if line.strip()]
            for line in lines:
                translated_cmds = translate_command(line)
                for cmd in translated_cmds:
                    state.serial_port.write((cmd + "\n").encode())
                    state.serial_port.flush()
                    await broadcast({"type": "log", "direction": "out", "content": cmd})
                    if len(translated_cmds) > 1 or len(lines) > 1:
                        await asyncio.sleep(0.02)
            
        return {"status": "ok", "message": "Command sent"}
    except Exception as e:
        logger.error(f"Error sending command: {e}")
        return JSONResponse({"status": "error", "message": str(e)}, status_code=500)

@app.post("/api/upload")
async def upload_gcode(file: UploadFile = File(...)):
    """Upload a G-code file for execution."""
    try:
        contents = await file.read()
        lines = contents.decode('utf-8', errors='ignore').splitlines()
        
        # Clean lines
        valid_lines = []
        for line in lines:
            line_stripped = line.strip()
            if line_stripped:
                valid_lines.append(line_stripped)
                
        state.gcode_lines = valid_lines
        state.gcode_index = 0
        state.is_streaming = False
        state.is_paused = False
        
        logger.info(f"Uploaded G-code file: {file.filename} ({len(valid_lines)} lines)")
        return {
            "status": "ok",
            "filename": file.filename,
            "lines_count": len(valid_lines)
        }
    except Exception as e:
        logger.error(f"Error uploading file: {e}")
        return JSONResponse({"status": "error", "message": str(e)}, status_code=500)

@app.get("/api/pen_settings")
async def get_pen_settings():
    return {
        "mode": state.pen_mode,
        "pen_up_z": state.pen_up_z,
        "pen_down_z": state.pen_down_z,
        "pen_up_pwm": state.pen_up_pwm,
        "pen_down_pwm": state.pen_down_pwm,
        "pen_dwell": state.pen_dwell
    }

@app.post("/api/pen_settings")
async def update_pen_settings(settings: PenSettings):
    state.pen_mode = settings.mode
    state.pen_up_z = settings.pen_up_z
    state.pen_down_z = settings.pen_down_z
    state.pen_up_pwm = settings.pen_up_pwm
    state.pen_down_pwm = settings.pen_down_pwm
    state.pen_dwell = settings.pen_dwell
    
    save_pen_settings({
        "mode": state.pen_mode,
        "pen_up_z": state.pen_up_z,
        "pen_down_z": state.pen_down_z,
        "pen_up_pwm": state.pen_up_pwm,
        "pen_down_pwm": state.pen_down_pwm,
        "pen_dwell": state.pen_dwell
    })
    return {"status": "ok", "message": "Pen settings updated successfully"}

@app.post("/api/start")
async def start_streaming():
    """Start streaming the loaded G-code file."""
    if not state.connected or not state.serial_port:
        return JSONResponse({"status": "error", "message": "Not connected"}, status_code=400)
    if not state.gcode_lines:
        return JSONResponse({"status": "error", "message": "No G-code loaded"}, status_code=400)
    if state.is_streaming:
        return JSONResponse({"status": "error", "message": "Already streaming"}, status_code=400)
        
    # Preprocess G-code lines for Z translation
    state.pen_state = None  # Reset state so the first Z change is forced to write a spindle speed
    processed_lines = []
    for line in state.gcode_lines:
        processed_lines.extend(translate_command(line))
        
    state.stream_gcode_lines = processed_lines
    state.gcode_index = 0
    state.is_streaming = True
    state.is_paused = False
    state.sent_buffer_lengths = []
    state.stream_task = asyncio.create_task(gcode_streamer_task())
    
    await broadcast({"type": "stream_status", "status": "started"})
    return {"status": "ok", "message": "Streaming started"}

@app.post("/api/stop")
async def stop_streaming():
    """Stop/abort G-code streaming."""
    state.is_streaming = False
    state.is_paused = False
    
    # Send hard stop / reset to GRBL
    if state.connected and state.serial_port:
        try:
            # Soft reset byte (0x18 = Ctrl-X)
            state.serial_port.write(b"\x18")
            state.serial_port.flush()
        except Exception:
            pass
            
    await broadcast({"type": "stream_status", "status": "stopped"})
    return {"status": "ok", "message": "Streaming stopped and reset sent"}

@app.get("/api/state")
async def get_state():
    """Get current snapshot of the controller state."""
    owner = get_port_owner(state.port_name) if not state.connected else ""
    return {
        "connected": state.connected,
        "port": state.port_name,
        "baudrate": state.baudrate,
        "machine_state": state.machine_state,
        "mpos": state.mpos,
        "wpos": state.wpos,
        "feedrate": state.feedrate,
        "spindle_speed": state.spindle_speed,
        "is_streaming": state.is_streaming,
        "is_paused": state.is_paused,
        "gcode_index": state.gcode_index,
        "gcode_total": len(state.stream_gcode_lines) if state.is_streaming else len(state.gcode_lines),
        "port_owner": owner
    }

# WebSockets Endpoint
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    state.websocket_connections.add(websocket)
    
    # Send initial configuration
    await websocket.send_json({
        "type": "init",
        "connected": state.connected,
        "port": state.port_name,
        "baudrate": state.baudrate
    })
    
    if state.connected:
        await send_telemetry()
        
    try:
        while True:
            # We don't expect messages from client via WebSocket,
            # but we keep it open to receive pings/disconnects
            data = await websocket.receive_text()
            # Echo or process if needed in future
    except WebSocketDisconnect:
        state.websocket_connections.discard(websocket)
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
        state.websocket_connections.discard(websocket)

# Serve Frontend
# Ensure directories exist
os.makedirs("static", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def root():
    with open(os.path.join("static", "index.html"), "r") as f:
        return HTMLResponse(content=f.read())

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8088)
