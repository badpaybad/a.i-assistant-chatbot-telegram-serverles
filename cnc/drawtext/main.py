import os
import sys
import time
import math
import re
import json
import base64
import logging
import threading
import asyncio
from typing import List, Dict, Tuple, Optional
import cv2
import numpy as np
import potrace
from svgpathtools import svg2paths
from shapely.geometry import Polygon, MultiPolygon
from shapely.ops import unary_union
import serial
import serial.tools.list_ports

from fastapi import FastAPI, UploadFile, File, Form, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse, JSONResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Setup logger
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("cnc_drawtext")

# Paths & Directories
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")
SETTINGS_FILE = os.path.join(BASE_DIR, "drawtext_settings.json")
CAPTURED_IMAGE_PATH = os.path.join(STATIC_DIR, "captured.png")

# Make static dir if it doesn't exist
os.makedirs(STATIC_DIR, exist_ok=True)

app = FastAPI(title="CNC Draw Text Controller")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock GRBL Serial Simulator
class MockSerial:
    def __init__(self):
        self.in_buffer = bytearray()
        self.out_buffer = bytearray()
        self.x = 0.0
        self.y = 0.0
        self.z = 2.0  # Pen up Z by default
        self.state = "Idle"
        self.target_x = 0.0
        self.target_y = 0.0
        self.target_z = 2.0
        self.feedrate = 2000.0
        self.last_update = time.time()
        self.lock = threading.Lock()
        self.running = True
        
        # Start simulation thread
        self.sim_thread = threading.Thread(target=self._simulate, daemon=True)
        self.sim_thread.start()

    def _simulate(self):
        while self.running:
            time.sleep(0.05)
            now = time.time()
            dt = now - self.last_update
            self.last_update = now
            
            with self.lock:
                # Interpolate coordinate updates based on target and speed
                dx = self.target_x - self.x
                dy = self.target_y - self.y
                dz = self.target_z - self.z
                dist = math.sqrt(dx*dx + dy*dy + dz*dz)
                
                if dist > 0.005:
                    self.state = "Run"
                    speed = self.feedrate / 60.0  # mm/min to mm/s
                    step = speed * dt
                    if step >= dist:
                        self.x = self.target_x
                        self.y = self.target_y
                        self.z = self.target_z
                        self.state = "Idle"
                    else:
                        ratio = step / dist
                        self.x += dx * ratio
                        self.y += dy * ratio
                        self.z += dz * ratio
                else:
                    self.state = "Idle"

    def write(self, data: bytes):
        # Handle write
        text = data.decode('utf-8', errors='ignore')
        # Split on newline or handle real-time commands
        for char in text:
            if char == "?":
                # Real-time status query
                with self.lock:
                    status = f"<{self.state}|WPos:{self.x:.3f},{self.y:.3f},{self.z:.3f}|Bf:15,127>\r\n"
                self.out_buffer.extend(status.encode('utf-8'))
            elif char == "\x18": # Ctrl-X reset
                with self.lock:
                    self.state = "Idle"
                    self.target_x = self.x
                    self.target_y = self.y
                    self.target_z = self.z
                self.out_buffer.extend(b"Grbl 1.1h ['$' for help]\r\n")
            
        # Process lines for standard commands
        lines = text.replace("?", "").replace("\x18", "").split("\n")
        for line in lines:
            line = line.strip()
            if not line:
                continue
            
            # Simple command parser
            if line.startswith("$"):
                self.out_buffer.extend(b"ok\r\n")
            elif "G10 L20" in line:
                # Set coordinate home
                with self.lock:
                    # G10 L20 P1 X0 Y0 Z0 -> Reset offsets to current position
                    self.x = 0.0
                    self.y = 0.0
                    self.z = 0.0
                    self.target_x = 0.0
                    self.target_y = 0.0
                    self.target_z = 0.0
                self.out_buffer.extend(b"ok\r\n")
            elif "M3" in line or "M5" in line:
                # Handle spindle/servo spindle modes
                # Just mock and reply ok
                self.out_buffer.extend(b"ok\r\n")
            elif line.startswith("G0") or line.startswith("G1") or "X" in line or "Y" in line or "Z" in line:
                with self.lock:
                    # Parse target coordinates
                    x_match = re.search(r'[xX]\s*([-+]?[0-9]*\.?[0-9]+)', line)
                    if x_match:
                        self.target_x = float(x_match.group(1))
                    y_match = re.search(r'[yY]\s*([-+]?[0-9]*\.?[0-9]+)', line)
                    if y_match:
                        self.target_y = float(y_match.group(1))
                    z_match = re.search(r'[zZ]\s*([-+]?[0-9]*\.?[0-9]+)', line)
                    if z_match:
                        self.target_z = float(z_match.group(1))
                    f_match = re.search(r'[fF]\s*([-+]?[0-9]*\.?[0-9]+)', line)
                    if f_match:
                        self.feedrate = max(100.0, float(f_match.group(1)))
                self.out_buffer.extend(b"ok\r\n")
            else:
                self.out_buffer.extend(b"ok\r\n")

    def read(self, size: int = 1) -> bytes:
        res = bytes(self.out_buffer[:size])
        del self.out_buffer[:size]
        return res

    @property
    def in_waiting(self) -> int:
        return len(self.out_buffer)

    def flush(self):
        pass

    def close(self):
        self.running = False

# USB Camera Manager
class CameraManager:
    def __init__(self):
        self.cap = None
        self.lock = threading.Lock()
        self.current_index = -1
        self.latest_frame = None
        self.running = False
        self.thread = None

    def start_camera(self, index: int):
        with self.lock:
            if self.current_index == index and self.running:
                return True
            self.stop_camera()
            self.cap = cv2.VideoCapture(index)
            if not self.cap.isOpened():
                self.cap = None
                return False
            self.current_index = index
            self.running = True
            self.thread = threading.Thread(target=self._capture_loop, daemon=True)
            self.thread.start()
            return True

    def _capture_loop(self):
        while self.running:
            ret, frame = self.cap.read()
            if ret:
                with self.lock:
                    self.latest_frame = frame
            time.sleep(0.03)

    def get_frame(self) -> Optional[np.ndarray]:
        with self.lock:
            if self.latest_frame is not None:
                return self.latest_frame.copy()
            return None

    def stop_camera(self):
        self.running = False
        if self.thread:
            self.thread.join(timeout=1.0)
            self.thread = None
        if self.cap:
            self.cap.release()
            self.cap = None
        self.current_index = -1
        self.latest_frame = None

# Settings Configuration
DEFAULT_SETTINGS = {
    "cnc_width": 200.0,
    "cnc_height": 200.0,
    "feedrate": 2000.0,
    "step_size": 10.0,
    "serial_port": "/dev/ttyACM0",
    "thresh_mode": "otsu",
    "thresh_val": 127,
    "invert_img": True,
    "morph_kernel": 3,
    "skeleton_method": "thin",
    "min_line_len": 5,
    "epsilon": 1.0,
    "pen_mode": "servo",
    "pen_up_cmd": "M3 S10",
    "pen_down_cmd": "M3 S90",
    "pen_dwell": 0.2,
    "mirror_x": False,
    "mirror_y": False
}

def load_settings() -> dict:
    if os.path.exists(SETTINGS_FILE):
        try:
            with open(SETTINGS_FILE, "r") as f:
                data = json.load(f)
                # Merge defaults to keep compatibility
                return {**DEFAULT_SETTINGS, **data}
        except Exception as e:
            logger.error(f"Error loading settings: {e}")
    return DEFAULT_SETTINGS.copy()

def save_settings(data: dict):
    try:
        with open(SETTINGS_FILE, "w") as f:
            json.dump(data, f, indent=4)
    except Exception as e:
        logger.error(f"Error saving settings: {e}")

# Global App State
class AppState:
    def __init__(self):
        self.connected = False
        self.serial_port = None
        self.port_name = ""
        self.baudrate = 115200
        
        # Coordinates and status
        self.wpos = [0.0, 0.0, 0.0]
        self.machine_state = "Idle"
        
        # Streaming state
        self.is_streaming = False
        self.is_paused = False
        self.stream_gcode_lines = []
        self.gcode_index = 0
        self.sent_buffer_lengths = []
        self.stream_task = None
        self.grbl_ack_event = asyncio.Event()
        
        # Tracking starting draw position
        self.draw_start_pos = [0.0, 0.0, 0.0]
        
        # Processed contours / paths
        self.latest_paths = []  # List of List of [x, y] tuples
        
        # Active websocket clients
        self.ws_clients: List[WebSocket] = []
        
        # Camera manager
        self.camera_manager = CameraManager()

state = AppState()

# WebSocket Broadcast helper
async def broadcast(message: dict):
    # Remove dead connections
    alive_clients = []
    for ws in state.ws_clients:
        try:
            await ws.send_json(message)
            alive_clients.append(ws)
        except Exception:
            pass
    state.ws_clients = alive_clients

serial_lock = threading.Lock()

def send_serial_bytes(b_data: bytes) -> bool:
    if state.connected and state.serial_port:
        with serial_lock:
            try:
                if state.serial_port and state.serial_port.is_open:
                    state.serial_port.write(b_data)
                    state.serial_port.flush()
                    return True
            except Exception as e:
                logger.error(f"Serial write error: {e}")
                return False
    return False

# Serial Background Reading Loop
async def serial_reader_loop():
    loop = asyncio.get_running_loop()
    buffer = ""
    error_count = 0
    while state.connected and state.serial_port:
        try:
            def _read_data():
                with serial_lock:
                    if state.serial_port and state.serial_port.is_open and state.serial_port.in_waiting > 0:
                        return state.serial_port.read(state.serial_port.in_waiting)
                return b""

            data = await loop.run_in_executor(None, _read_data)
            error_count = 0
            
            if data:
                buffer += data.decode('utf-8', errors='ignore')
                while "\n" in buffer:
                    line, buffer = buffer.split("\n", 1)
                    line = line.strip()
                    if not line:
                        continue
                    
                    # Log incoming
                    await broadcast({"type": "log", "direction": "in", "content": line})
                    
                    # Parse status response
                    if line.startswith("<") and line.endswith(">"):
                        parse_grbl_status(line)
                        await broadcast({"type": "telemetry", "wpos": state.wpos, "state": state.machine_state})
                    
                    # Acknowledge commands
                    elif line == "ok" or "error" in line:
                        if state.sent_buffer_lengths:
                            state.sent_buffer_lengths.pop(0)
                        state.grbl_ack_event.set()
            else:
                await asyncio.sleep(0.02)
        except Exception as e:
            error_count += 1
            logger.warning(f"Warning in serial reader loop ({error_count}/5): {e}")
            if error_count >= 5:
                logger.error(f"Serial reader lost connection: {e}")
                state.connected = False
                await broadcast({"type": "connection", "connected": False, "message": f"Connection lost: {e}"})
                break
            await asyncio.sleep(0.1)

# Parse GRBL Status (WPos, Machine State)
def parse_grbl_status(line: str):
    try:
        clean = line.strip("<> \r\n")
        # Extract state
        state_match = re.match(r"^([a-zA-Z]+)", clean)
        if state_match:
            state.machine_state = state_match.group(1)
            
        # Extract WPos or MPos
        matches = re.findall(r"([a-zA-Z]+):([-+0-9.,]*)", clean)
        found_wpos = False
        for key, val in matches:
            val = val.strip(",")
            if key == "WPos":
                parts = [float(x) for x in val.split(",") if x.strip()]
                if len(parts) >= 2:
                    state.wpos = parts
                    found_wpos = True
            elif key == "MPos" and not found_wpos:
                parts = [float(x) for x in val.split(",") if x.strip()]
                if len(parts) >= 2:
                    state.wpos = parts
    except Exception as e:
        logger.error(f"Error parsing status: {e}")

# Status Polling Loop (sends '?' command periodically)
async def status_polling_loop():
    while state.connected and state.serial_port:
        send_serial_bytes(b"?")
        await asyncio.sleep(0.2)

# G-code streaming background task
async def gcode_streamer_task():
    logger.info("G-code streaming started")
    state.sent_buffer_lengths = []
    
    while state.is_streaming and state.connected:
        if state.is_paused:
            await asyncio.sleep(0.1)
            continue
            
        if state.gcode_index >= len(state.stream_gcode_lines):
            # Finished sending all lines. Wait until buffer empties
            while state.sent_buffer_lengths:
                await asyncio.sleep(0.1)
            state.is_streaming = False
            
            # Draw finished. Return to initial position (draw_start_pos)
            await broadcast({"type": "log", "direction": "system", "content": "Drawing completed. Returning to start position."})
            settings = load_settings()
            
            # Pen up
            pen_up = settings["pen_up_cmd"]
            try:
                send_serial_bytes(f"{pen_up}\n".encode())
                await broadcast({"type": "log", "direction": "out", "content": pen_up})
                await asyncio.sleep(settings["pen_dwell"])
                
                # Move home to draw start
                move_home = f"G0 X{state.draw_start_pos[0]:.3f} Y{state.draw_start_pos[1]:.3f}"
                send_serial_bytes(f"{move_home}\n".encode())
                await broadcast({"type": "log", "direction": "out", "content": move_home})
            except Exception as e:
                logger.error(f"Error sending return-to-start coordinates: {e}")
                
            await broadcast({"type": "stream_status", "status": "completed"})
            break
            
        # Send next line
        line = state.stream_gcode_lines[state.gcode_index].strip()
        clean_line = re.sub(r'\(.*?\)', '', line).strip()
        clean_line = re.sub(r';.*', '', clean_line).strip()
        
        if not clean_line:
            state.gcode_index += 1
            continue
            
        # Character counting protocol
        line_len = len(clean_line) + 1
        current_buffer_sum = sum(state.sent_buffer_lengths)
        if current_buffer_sum + line_len > 127:
            await asyncio.sleep(0.01)
            continue
            
        try:
            state.sent_buffer_lengths.append(line_len)
            state.grbl_ack_event.clear()
            send_serial_bytes((clean_line + "\n").encode())
            
            await broadcast({"type": "log", "direction": "out", "content": clean_line})
            state.gcode_index += 1
            
            await broadcast({
                "type": "progress",
                "index": state.gcode_index,
                "total": len(state.stream_gcode_lines)
            })
        except Exception as e:
            logger.error(f"Error writing streaming line: {e}")
            state.is_streaming = False
            await broadcast({"type": "stream_status", "status": "failed", "message": str(e)})
            break

# Ramer-Douglas-Peucker (RDP) algorithm for vector path simplification
def distance_point_to_line(point, line_start, line_end):
    px, py = point
    sx, sy = line_start
    ex, ey = line_end
    dx = ex - sx
    dy = ey - sy
    line_len = dx*dx + dy*dy
    if line_len == 0:
        return math.sqrt((px - sx)**2 + (py - sy)**2)
    t = max(0.0, min(1.0, ((px - sx) * dx + (py - sy) * dy) / line_len))
    proj_x = sx + t * dx
    proj_y = sy + t * dy
    return math.sqrt((px - proj_x)**2 + (py - proj_y)**2)

def rdp_simplify(points: List[Tuple[float, float]], epsilon: float) -> List[Tuple[float, float]]:
    if len(points) < 3:
        return points
    dmax = 0.0
    index = 0
    end = len(points) - 1
    for i in range(1, end):
        d = distance_point_to_line(points[i], points[0], points[end])
        if d > dmax:
            index = i
            dmax = d
    if dmax > epsilon:
        results1 = rdp_simplify(points[:index+1], epsilon)
        results2 = rdp_simplify(points[index:], epsilon)
        return results1[:-1] + results2
    else:
        return [points[0], points[end]]

def weld_paths(paths: List[List[Tuple[float, float]]], threshold: float) -> List[List[Tuple[float, float]]]:
    if not paths:
        return []
    
    welded = [list(paths[0])]
    for path in paths[1:]:
        prev_end = np.array(welded[-1][-1])
        curr_start = np.array(path[0])
        
        dist = np.linalg.norm(prev_end - curr_start)
        if dist <= threshold:
            welded[-1].extend(path[1:])
        else:
            welded.append(list(path))
    return welded

def clean_junction_loops(skeleton_img, max_area=120):
    contours, hierarchy = cv2.findContours(skeleton_img, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE)
    if hierarchy is None:
        return skeleton_img
    filled_skeleton = skeleton_img.copy()
    hierarchy = hierarchy[0]
    for i, contour in enumerate(contours):
        # If hierarchy[i][3] != -1 (this contour is inside another, representing a loop hole)
        if hierarchy[i][3] != -1:
            area = cv2.contourArea(contour)
            if area < max_area:
                cv2.drawContours(filled_skeleton, [contour], -1, 255, -1)
    return filled_skeleton

def generate_concentric_infill_from_svg(svg_path: str, step_mm: float = 0.4) -> List[List[Tuple[float, float]]]:
    """
    Phương pháp B: Thu nhỏ đường viền đồng dạng vào trong (Concentric Infill)
    Tạo các đường vòng kín lấp kín ruột chữ.
    """
    paths, _ = svg2paths(svg_path)
    if not paths:
        return []

    subpaths = paths[0].continuous_subpaths()
    polys = []

    for sp in subpaths:
        pts = []
        for seg in sp:
            for t in np.linspace(0, 1, 10, endpoint=False):
                pt = seg.point(t)
                pts.append((pt.real, pt.imag))
        if len(pts) >= 3:
            poly = Polygon(pts)
            if not poly.is_valid:
                poly = poly.buffer(0)
            if poly.area > 0.05:
                polys.append(poly)

    if not polys:
        return []

    polys.sort(key=lambda p: p.area, reverse=True)
    outer_polys = []
    hole_polys = []

    for i, p1 in enumerate(polys):
        contains_count = 0
        for j, p2 in enumerate(polys):
            if i != j and p2.contains(p1):
                contains_count += 1
        if contains_count % 2 == 0:
            outer_polys.append(p1)
        else:
            hole_polys.append(p1)

    composite = unary_union(outer_polys)
    for hp in hole_polys:
        composite = composite.difference(hp)

    curr = composite
    level = 0
    all_rings = []

    def extract_rings(geom):
        rings = []
        if geom.is_empty:
            return rings
        if isinstance(geom, Polygon):
            rings.append([(float(x), float(y)) for x, y in geom.exterior.coords])
            for hole in geom.interiors:
                rings.append([(float(x), float(y)) for x, y in hole.coords])
        elif isinstance(geom, MultiPolygon):
            for poly in geom.geoms:
                rings.append([(float(x), float(y)) for x, y in poly.exterior.coords])
                for hole in poly.interiors:
                    rings.append([(float(x), float(y)) for x, y in hole.coords])
        return rings

    while not curr.is_empty and curr.area > 0.1:
        rings = extract_rings(curr)
        if rings:
            all_rings.extend(rings)
            level += 1
        curr = curr.buffer(-step_mm)

    return all_rings

def process_text_concentric(image_path: str, params: dict) -> Tuple[List[List[Tuple[float, float]]], str]:
    """
    Cập nhật 5:
    1. Thu nhỏ ảnh phù hợp khung hoạt động CNC (tối đa 299px mỗi chiều).
    2. Dùng Potrace chuyển thành SVG vector (pypotrace_img2vector.py).
    3. Tạo Concentric Infill (Phương pháp B - pypo_ket_qua_vector_co_lo.svg.py).
    """
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    if img is None:
        raise ValueError(f"Không thể đọc ảnh: {image_path}")

    h, w = img.shape
    cnc_w = float(params.get("cnc_width", 200.0))
    cnc_h = float(params.get("cnc_height", 200.0))

    # Resize để vừa khung CNC và tối đa 299px giữ tỉ lệ khung hình
    max_dim = min(299, int(min(cnc_w, cnc_h)))
    if max_dim < 50:
        max_dim = 299

    scale = max_dim / max(h, w)
    new_w = max(10, int(w * scale))
    new_h = max(10, int(h * scale))

    resized_img = cv2.resize(img, (new_w, new_h), interpolation=cv2.INTER_AREA)
    _, thresh = cv2.threshold(resized_img, 127, 255, cv2.THRESH_BINARY_INV)

    bitmap = potrace.Bitmap(thresh.astype(bool))
    path = bitmap.trace()

    output_svg_path = os.path.join(STATIC_DIR, "pypo_ket_qua_vector_co_lo.small.svg")
    all_paths = []
    for curve in path:
        svg_path_data = []
        start = curve.start_point
        svg_path_data.append(f"M {start[0]:.2f},{start[1]:.2f}")
        for segment in curve.segments:
            if segment.is_corner:
                c = segment.c
                end = segment.end_point
                svg_path_data.append(f"L {c[0]:.2f},{c[1]:.2f} L {end[0]:.2f},{end[1]:.2f}")
            else:
                c1 = segment.c1
                c2 = segment.c2
                end = segment.end_point
                svg_path_data.append(f"C {c1[0]:.2f},{c1[1]:.2f} {c2[0]:.2f},{c2[1]:.2f} {end[0]:.2f},{end[1]:.2f}")
        svg_path_data.append("Z")
        all_paths.append(" ".join(svg_path_data))

    full_d = " ".join(all_paths)
    with open(output_svg_path, "w", encoding="utf-8") as f:
        f.write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {new_w} {new_h}" width="{new_w}" height="{new_h}">\n')
        f.write(f'  <path d="{full_d}" fill="black" stroke="none" fill-rule="evenodd" />\n')
        f.write('</svg>\n')

    step_mm = float(params.get("step_mm", 0.4))
    all_rings = generate_concentric_infill_from_svg(output_svg_path, step_mm=step_mm)

    return all_rings, "/static/pypo_ket_qua_vector_co_lo.small.svg"

def generate_gcode_lines_concentric(all_rings: List[List[Tuple[float, float]]], settings: dict) -> List[str]:
    """Biên dịch các vòng Concentric Infill thành G-code chuẩn GRBL đúng chiều không bị soi gương"""
    if not all_rings:
        return []

    # Tính toán bounding box chuẩn của toàn bộ nét vẽ
    all_pts = [pt for ring in all_rings for pt in ring]
    if not all_pts:
        return []

    min_x = min(pt[0] for pt in all_pts)
    min_y = min(pt[1] for pt in all_pts)
    max_y = max(pt[1] for pt in all_pts)

    pen_up = settings.get("pen_up_cmd", "M3 S10")
    pen_down = settings.get("pen_down_cmd", "M3 S90")
    pen_dwell = float(settings.get("pen_dwell", 0.2))

    safe_z = float(settings.get("safe_z", 5.0))
    cut_z = float(settings.get("cut_z", -1.0))
    feed_rate = float(settings.get("feedrate", 1000.0))
    mirror_x = settings.get("mirror_x", False)
    mirror_y = settings.get("mirror_y", False)

    gcode = []
    gcode.append("; --- GRBL G-CODE: CONCENTRIC INFILL METHOD B ---")
    gcode.append("G21 ; Units in mm")
    gcode.append("G90 ; Absolute coordinates")
    gcode.append("G92 X0 Y0 Z0 ; Set current CNC head position as origin (0,0,0)")

    def add_pen_up():
        gcode.append(pen_up)
        if pen_dwell > 0:
            gcode.append(f"G4 P{pen_dwell:.2f}")
        gcode.append(f"G0 Z{safe_z:.2f}")

    def add_pen_down():
        gcode.append(pen_down)
        if pen_dwell > 0:
            gcode.append(f"G4 P{pen_dwell:.2f}")
        gcode.append(f"G1 Z{cut_z:.3f} F{feed_rate:.0f}")

    # 1. Nhấc bút trước khi di chuyển
    add_pen_up()

    # 2. Hạ bút tại vị trí gốc (0,0) hiện tại
    gcode.append("G0 X0.000 Y0.000")
    add_pen_down()

    # 3. Nhấc bút để di chuyển đến nét đầu tiên
    add_pen_up()

    for ring in all_rings:
        if len(ring) < 2:
            continue
            
        dx = ring[0][0] - min_x
        dy = max_y - ring[0][1]
        if mirror_x: dx = -dx
        if mirror_y: dy = -dy
        start_x = dx
        start_y = dy

        # Di chuyển không tải tới đầu vòng
        gcode.append(f"G0 X{start_x:.3f} Y{start_y:.3f}")
        # Hạ bút
        add_pen_down()

        for pt in ring[1:]:
            dx_pt = pt[0] - min_x
            dy_pt = max_y - pt[1]
            if mirror_x: dx_pt = -dx_pt
            if mirror_y: dy_pt = -dy_pt
            x_val = dx_pt
            y_val = dy_pt
            gcode.append(f"G1 X{x_val:.3f} Y{y_val:.3f} F{feed_rate:.0f}")

        # Nhấc bút kết thúc vòng
        add_pen_up()

    gcode.append("; --- END CNC G-CODE ---")
    add_pen_up()
    gcode.append("G0 X0 Y0")
    gcode.append("M5")
    gcode.append("M30")

    return gcode

# FastAPI endpoints

@app.get("/api/ports")
async def get_serial_ports():
    ports = [{"port": "dummy", "description": "GRBL Virtual Simulator (Mock Mode)"}]
    for p in serial.tools.list_ports.comports():
        desc = p.description if p.description != 'n/a' else p.device
        ports.append({
            "port": p.device,
            "description": f"{p.device} ({desc})"
        })
    return ports

@app.get("/api/cameras")
async def get_all_cameras():
    cameras = []
    # v4l2 command listing
    try:
        proc = await asyncio.create_subprocess_exec(
            'v4l2-ctl', '--list-devices',
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        stdout, _ = await proc.communicate()
        output = stdout.decode('utf-8')
        chunks = output.strip().split("\n\n")
        for chunk in chunks:
            lines = chunk.split("\n")
            if not lines:
                continue
            device_info = lines[0]
            video_paths = [line.strip() for line in lines[1:] if "/dev/video" in line]
            if not video_paths:
                continue
            match = re.search(r"video(\d+)", video_paths[0])
            if match:
                idx = int(match.group(1))
                cameras.append({
                    "index": idx,
                    "name": f"{device_info.split('(')[0].strip()} (Cam {idx})"
                })
    except Exception as e:
        logger.warning(f"Error checking v4l2: {e}. Fallback to probing index 0-3.")
        # Fallback probe
        for i in range(4):
            cap = cv2.VideoCapture(i)
            if cap.isOpened():
                cameras.append({"index": i, "name": f"Camera {i}"})
                cap.release()
    return cameras

@app.post("/api/connect")
async def connect_device(port: str = Form(...), baudrate: int = Form(115200)):
    if state.connected:
        return {"status": "ok", "message": "Already connected"}
        
    state.port_name = port
    state.baudrate = baudrate
    
    try:
        if port.lower() in ["dummy", "mock"]:
            state.serial_port = MockSerial()
            state.connected = True
            state.machine_state = "Idle"
            await broadcast({"type": "connection", "connected": True, "port": port, "message": "Connected to GRBL Mock Simulator"})
        else:
            state.serial_port = serial.Serial(port, baudrate, timeout=0.1)
            state.connected = True
            state.machine_state = "Connecting"
            # GRBL boot time sleep
            await asyncio.sleep(1.5)
            send_serial_bytes(b"\r\n\r\n")
            
            # Start threads/tasks
            asyncio.create_task(serial_reader_loop())
            asyncio.create_task(status_polling_loop())
            await broadcast({"type": "connection", "connected": True, "port": port, "message": "Connected to GRBL Hardware Device"})
            
        return {"status": "ok", "message": f"Connected to {port} successfully"}
    except Exception as e:
        logger.error(f"Error connecting: {e}")
        state.connected = False
        return JSONResponse({"status": "error", "message": f"Failed to connect: {str(e)}"}, status_code=400)

@app.post("/api/disconnect")
async def disconnect_device():
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
        
    await broadcast({"type": "connection", "connected": False, "message": "Disconnected"})
    return {"status": "ok", "message": "Disconnected successfully"}

@app.get("/api/settings")
async def get_settings_route():
    return load_settings()

@app.post("/api/settings")
async def save_settings_route(settings: dict):
    save_settings(settings)
    return {"status": "ok", "message": "Settings saved successfully"}

@app.post("/api/upload")
async def upload_image(file: UploadFile = File(...)):
    target_path = os.path.join(STATIC_DIR, "working_image.png")
    try:
        content = await file.read()
        with open(target_path, "wb") as f:
            f.write(content)
        return {"status": "ok", "filename": file.filename, "path": target_path}
    except Exception as e:
        return JSONResponse({"status": "error", "message": str(e)}, status_code=500)

@app.post("/api/camera/start")
async def start_camera_feed(index: int = Form(...)):
    success = state.camera_manager.start_camera(index)
    if success:
        return {"status": "ok", "message": f"Camera {index} started"}
    else:
        return JSONResponse({"status": "error", "message": f"Could not start Camera {index}"}, status_code=400)

@app.post("/api/camera/stop")
async def stop_camera_feed():
    state.camera_manager.stop_camera()
    return {"status": "ok", "message": "Camera stopped"}

@app.get("/api/camera/feed")
async def camera_video_feed():
    async def frame_generator():
        while True:
            frame = state.camera_manager.get_frame()
            if frame is not None:
                _, jpeg = cv2.imencode('.jpg', frame)
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n')
            else:
                # Sleep briefly
                await asyncio.sleep(0.05)
                continue
            await asyncio.sleep(0.04)
            
    return StreamingResponse(frame_generator(), media_type="multipart/x-mixed-replace; boundary=frame")

@app.post("/api/camera/capture")
async def capture_frame():
    frame = state.camera_manager.get_frame()
    if frame is None:
        return JSONResponse({"status": "error", "message": "No active camera frame available"}, status_code=400)
    try:
        cv2.imwrite(CAPTURED_IMAGE_PATH, frame)
        # Copy to working image as well
        working_path = os.path.join(STATIC_DIR, "working_image.png")
        cv2.imwrite(working_path, frame)
        return {"status": "ok", "message": "Snapshot captured and saved"}
    except Exception as e:
        return JSONResponse({"status": "error", "message": f"Failed to save capture: {e}"}, status_code=500)

@app.post("/api/process")
async def process_image_route(params: dict):
    working_path = os.path.join(STATIC_DIR, "working_image.png")
    if not os.path.exists(working_path):
        return JSONResponse({"status": "error", "message": "No image loaded yet. Please upload or capture first."}, status_code=400)
        
    try:
        paths, svg_url = process_text_concentric(working_path, params)
        state.latest_paths = paths
        
        # Save standard G-code relative to (0,0) with Concentric Infill
        if paths:
            settings = load_settings()
            gcode_settings = {
                "pen_up_cmd": params.get("pen_up_cmd", settings.get("pen_up_cmd", "M3 S10")),
                "pen_down_cmd": params.get("pen_down_cmd", settings.get("pen_down_cmd", "M3 S90")),
                "pen_dwell": params.get("pen_dwell", settings.get("pen_dwell", 0.2)),
                "feedrate": params.get("feedrate", settings.get("feedrate", 1000.0)),
                "travel_rate": params.get("travel_rate", 1500.0),
                "safe_z": params.get("safe_z", 5.0),
                "cut_z": params.get("cut_z", -1.0),
                "mirror_x": params.get("mirror_x", settings.get("mirror_x", False)),
                "mirror_y": params.get("mirror_y", settings.get("mirror_y", False))
            }
            gcode_lines = generate_gcode_lines_concentric(paths, gcode_settings)
            gcode_file_path = os.path.join(STATIC_DIR, "cnc_output.nc")
            with open(gcode_file_path, "w", encoding="utf-8") as f:
                f.write("\n".join(gcode_lines))
        
        # Generate paths visualization
        img = cv2.imread(working_path)
        h, w = img.shape[:2]
        preview_img = np.zeros((h, w, 4), dtype=np.uint8)
        
        for idx, path in enumerate(paths):
            color_ratio = idx / len(paths) if len(paths) > 1 else 0.0
            color = (0, int(255 * (1 - color_ratio)), int(255 * color_ratio), 255)
            pts_array = np.array(path, dtype=np.int32).reshape((-1, 1, 2))
            cv2.polylines(preview_img, [pts_array], isClosed=True, color=color, thickness=1)
                
        _, buffer = cv2.imencode('.png', preview_img)
        b64_str = base64.b64encode(buffer).decode('utf-8')
        aspect = w / h if h > 0 else 1.0
        
        resp = {
            "status": "ok",
            "paths": paths,
            "preview_image": f"data:image/png;base64,{b64_str}",
            "dimensions": {"width": w, "height": h, "aspect": aspect},
            "svg_url": svg_url
        }
        return resp
    except Exception as e:
        logger.error(f"Error processing image: {e}")
        return JSONResponse({"status": "error", "message": str(e)}, status_code=500)

@app.post("/api/command")
async def send_direct_command(command: str = Form(...)):
    if not state.connected or not state.serial_port:
        return JSONResponse({"status": "error", "message": "Not connected"}, status_code=400)
    try:
        clean_cmd = command.strip()
        if clean_cmd:
            send_serial_bytes((clean_cmd + "\n").encode())
            await broadcast({"type": "log", "direction": "out", "content": clean_cmd})
        return {"status": "ok"}
    except Exception as e:
        return JSONResponse({"status": "error", "message": str(e)}, status_code=500)

@app.post("/api/jog")
async def jog_movement(direction: str = Form(...), step: float = Form(...), feedrate: float = Form(...)):
    if not state.connected or not state.serial_port:
        return JSONResponse({"status": "error", "message": "Not connected"}, status_code=400)
        
    dx, dy, dz = 0.0, 0.0, 0.0
    if direction == "up": dy = step
    elif direction == "down": dy = -step
    elif direction == "left": dx = -step
    elif direction == "right": dx = step
    elif direction == "upleft": dx, dy = -step, step
    elif direction == "upright": dx, dy = step, step
    elif direction == "downleft": dx, dy = -step, -step
    elif direction == "downright": dx, dy = step, -step
    elif direction == "zup": dz = step
    elif direction == "zdown": dz = -step
    
    parts = []
    if dx != 0: parts.append(f"X{dx:.3f}")
    if dy != 0: parts.append(f"Y{dy:.3f}")
    if dz != 0: parts.append(f"Z{dz:.3f}")
    
    if not parts:
        return {"status": "ok"}
        
    cmd = f"G91 G0 {' '.join(parts)}"
    
    try:
        send_serial_bytes((cmd + "\n").encode())
        send_serial_bytes(b"G90\n")
        await broadcast({"type": "log", "direction": "out", "content": cmd})
        return {"status": "ok"}
    except Exception as e:
        return JSONResponse({"status": "error", "message": str(e)}, status_code=500)

@app.post("/api/set_home")
async def set_home_coords():
    if not state.connected or not state.serial_port:
        return JSONResponse({"status": "error", "message": "Not connected"}, status_code=400)
    try:
        cmd = "G10 L20 P1 X0 Y0 Z0"
        send_serial_bytes((cmd + "\n").encode())
        await broadcast({"type": "log", "direction": "out", "content": cmd})
        
        settings = load_settings()
        pen_up = settings["pen_up_cmd"]
        send_serial_bytes(f"{pen_up}\n".encode())
        await broadcast({"type": "log", "direction": "out", "content": pen_up})
        
        state.wpos = [0.0, 0.0, 0.0]
        await broadcast({"type": "telemetry", "wpos": state.wpos, "state": state.machine_state})
        
        return {"status": "ok", "message": "Home set and pen raised"}
    except Exception as e:
        return JSONResponse({"status": "error", "message": str(e)}, status_code=500)

@app.post("/api/pen")
async def control_pen(action: str = Form(...)):
    if not state.connected or not state.serial_port:
        return JSONResponse({"status": "error", "message": "Not connected"}, status_code=400)
    settings = load_settings()
    cmd = settings["pen_down_cmd"] if action == "down" else settings["pen_up_cmd"]
    try:
        send_serial_bytes((cmd + "\n").encode())
        await broadcast({"type": "log", "direction": "out", "content": cmd})
        return {"status": "ok"}
    except Exception as e:
        return JSONResponse({"status": "error", "message": str(e)}, status_code=500)

@app.post("/api/draw/start")
async def start_drawing_paths(scale_factor: float = Form(1.0)):
    if not state.connected or not state.serial_port:
        return JSONResponse({"status": "error", "message": "Not connected"}, status_code=400)
    if not state.latest_paths:
        return JSONResponse({"status": "error", "message": "No processed text vectors available"}, status_code=400)
    if state.is_streaming:
        return JSONResponse({"status": "error", "message": "Drawing stream already running"}, status_code=400)
        
    settings = load_settings()
    state.draw_start_pos = list(state.wpos)
    
    gcode_lines = generate_gcode_lines_concentric(state.latest_paths, settings)
    gcode_file_path = os.path.join(STATIC_DIR, "cnc_output.nc")
    with open(gcode_file_path, "w", encoding="utf-8") as f:
        f.write("\n".join(gcode_lines))
        
    state.stream_gcode_lines = gcode_lines
    state.gcode_index = 0
    state.is_streaming = True
    state.is_paused = False
    
    state.stream_task = asyncio.create_task(gcode_streamer_task())
    await broadcast({"type": "stream_status", "status": "started"})
    
    return {"status": "ok", "message": "Drawing stream started"}

@app.post("/api/draw/stop")
async def stop_drawing_paths():
    if not state.is_streaming:
        return {"status": "ok", "message": "Not streaming"}
        
    state.is_streaming = False
    state.is_paused = False
    
    if state.connected and state.serial_port:
        try:
            # Soft reset (Ctrl-X)
            state.serial_port.write(b"\x18")
            state.serial_port.flush()
            
            # Wait for clear buffer and unlock ($X)
            await asyncio.sleep(1.2)
            state.serial_port.write(b"$X\n")
            state.serial_port.flush()
            
            # Pen up and go home
            settings = load_settings()
            pen_up = settings["pen_up_cmd"]
            state.serial_port.write(f"{pen_up}\n".encode())
            state.serial_port.flush()
            
            # Return to home
            go_home = "G0 X0 Y0"
            state.serial_port.write(f"{go_home}\n".encode())
            state.serial_port.flush()
            
            await broadcast({"type": "log", "direction": "system", "content": "Drawing aborted. Pen raised. CNC returned to home."})
        except Exception as e:
            logger.error(f"Error resetting on stop: {e}")
            
    await broadcast({"type": "stream_status", "status": "stopped"})
    return {"status": "ok", "message": "Drawing stream stopped and reset sent"}

# WebSocket Coordination Handler
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    state.ws_clients.append(websocket)
    
    # Initial status packet
    try:
        await websocket.send_json({
            "type": "connection",
            "connected": state.connected,
            "port": state.port_name,
            "message": "Connected to drawtext server websocket"
        })
        if state.connected:
            await websocket.send_json({
                "type": "telemetry",
                "wpos": state.wpos,
                "state": state.machine_state
            })
    except Exception:
        pass
        
    try:
        while True:
            # Keep socket alive
            data = await websocket.receive_text()
            # Handle client heartbeats if any
    except WebSocketDisconnect:
        if websocket in state.ws_clients:
            state.ws_clients.remove(websocket)

# Serve the static UI root page
@app.get("/")
async def root_index():
    index_file = os.path.join(STATIC_DIR, "index.html")
    if os.path.exists(index_file):
        with open(index_file, "r") as f:
            return HTMLResponse(content=f.read())
    return HTMLResponse(content="<h3>index.html not created yet. Please wait.</h3>")

# Mount Static assets directory
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8089)
