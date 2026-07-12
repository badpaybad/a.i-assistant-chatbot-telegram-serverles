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
from skimage.morphology import thin, skeletonize
import networkx as nx
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
    "serial_port": "dummy",
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
    "pen_dwell": 0.2
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

# Serial Background Reading Loop
async def serial_reader_loop():
    loop = asyncio.get_running_loop()
    buffer = ""
    while state.connected and state.serial_port:
        try:
            if state.serial_port.in_waiting > 0:
                data = await loop.run_in_executor(None, state.serial_port.read, state.serial_port.in_waiting)
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
                await asyncio.sleep(0.01)
        except Exception as e:
            logger.error(f"Error in serial reader: {e}")
            state.connected = False
            await broadcast({"type": "connection", "connected": False, "message": f"Connection lost: {e}"})
            break

# Parse GRBL Status (WPos, Machine State)
def parse_grbl_status(line: str):
    try:
        clean = line.strip("<> \r\n")
        # Extract state
        state_match = re.match(r"^([a-zA-Z]+)", clean)
        if state_match:
            state.machine_state = state_match.group(1)
            
        # Extract WPos
        matches = re.findall(r"([a-zA-Z]+):([-+0-9.,]*)", clean)
        for key, val in matches:
            val = val.strip(",")
            if key == "WPos":
                parts = [float(x) for x in val.split(",")]
                state.wpos = parts
    except Exception as e:
        logger.error(f"Error parsing status: {e}")

# Status Polling Loop (sends '?' command periodically)
async def status_polling_loop():
    while state.connected and state.serial_port:
        try:
            state.serial_port.write(b"?")
            state.serial_port.flush()
        except Exception as e:
            logger.error(f"Error writing status poll: {e}")
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
                state.serial_port.write(f"{pen_up}\n".encode())
                await broadcast({"type": "log", "direction": "out", "content": pen_up})
                await asyncio.sleep(settings["pen_dwell"])
                
                # Move home to draw start
                move_home = f"G0 X{state.draw_start_pos[0]:.3f} Y{state.draw_start_pos[1]:.3f}"
                state.serial_port.write(f"{move_home}\n".encode())
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
            state.serial_port.write((clean_line + "\n").encode())
            state.serial_port.flush()
            
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

# Image Processing Pipeline to extract text contours as single stroke curves
def process_text_image(image_path: str, params: dict) -> List[List[Tuple[float, float]]]:
    # 1. Read grayscale
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    if img is None:
        raise ValueError(f"Could not load image at {image_path}")
        
    # Optional Gaussian Blur to smooth raw lines
    if params.get("use_text_blur", False):
        bsize = params.get("text_blur_size", 3)
        if bsize % 2 == 0:
            bsize = max(1, bsize - 1)
        img = cv2.GaussianBlur(img, (bsize, bsize), 0)
        
    # 2. Resizing threshold logic
    if params.get("thresh_mode", "otsu") == "otsu":
        _, thresh = cv2.threshold(img, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    else:
        thresh_val = params.get("thresh_val", 127)
        _, thresh = cv2.threshold(img, thresh_val, 255, cv2.THRESH_BINARY)
        
    height, width = img.shape
    
    # Invert image if required (thinning expects white text on black background)
    if params.get("invert_img", True):
        # If text is dark on light background, invert
        if cv2.countNonZero(thresh) > (height * width / 2):
            thresh = cv2.bitwise_not(thresh)
    else:
        # Keep as is, but ensure white text/black bg
        pass
        
    # 3. Morphological close to clean up gaps
    if params.get("use_text_morph", True):
        ksize = params.get("morph_kernel", 3)
        if ksize > 1:
            if ksize % 2 == 0:
                ksize += 1
            kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (ksize, ksize))
            thresh = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel)
            
    # 3b. Morphological dilation to thicken strokes before thinning (helps bridge pixel gaps)
    if params.get("use_text_dilate", False):
        dsize = params.get("text_dilate_size", 1)
        if dsize > 0:
            kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (dsize, dsize))
            thresh = cv2.dilate(thresh, kernel, iterations=1)
        
    # 4. Thinning / Skeletonization
    bool_thresh = thresh > 0
    if params.get("skeleton_method", "thin") == "thin":
        skeleton_bool = thin(bool_thresh)
    else:
        skeleton_bool = skeletonize(bool_thresh)
        
    skeleton = np.zeros(thresh.shape, dtype=np.uint8)
    skeleton[skeleton_bool] = 255
    
    # 5. Extract paths using NetworkX Graph representation for precise single line
    y_indices, x_indices = np.where(skeleton > 0)
    points = set(zip(x_indices, y_indices))
    
    G = nx.Graph()
    for (x, y) in points:
        G.add_node((x, y))
        # Add edges to 8-neighbors
        for dx in [-1, 0, 1]:
            for dy in [-1, 0, 1]:
                if dx == 0 and dy == 0:
                    continue
                neighbor = (x + dx, y + dy)
                if neighbor in points:
                    G.add_edge((x, y), neighbor)
                    
    raw_paths = []
    
    # Split graph at junctions (degree > 2) to prevent jump lines
    junctions = [node for node, deg in G.degree() if deg > 2]
    G_simple = G.copy()
    G_simple.remove_nodes_from(junctions)
    
    for c in nx.connected_components(G_simple):
        subgraph = G_simple.subgraph(c).copy()
        nodes = list(subgraph.nodes())
        if not nodes:
            continue
            
        endpoints = [node for node, deg in subgraph.degree() if deg <= 1]
        start_node = endpoints[0] if endpoints else nodes[0]
        
        # Walk simple path segment
        path = []
        curr = start_node
        visited = {curr}
        path.append(curr)
        
        while True:
            neighbors = [n for n in subgraph.neighbors(curr) if n not in visited]
            if not neighbors:
                break
            curr = neighbors[0]
            visited.add(curr)
            path.append(curr)
            
        # Reconnect endpoints back to nearby junctions
        if path:
            start_neighbors = list(G.neighbors(path[0]))
            for n in start_neighbors:
                if n in junctions:
                    path.insert(0, n)
                    break
            end_neighbors = list(G.neighbors(path[-1]))
            for n in end_neighbors:
                if n in junctions:
                    path.append(n)
                    break
                    
        # Filter noise paths
        if len(path) >= params.get("min_line_len", 5):
            epsilon = params.get("epsilon", 1.0)
            if epsilon > 0:
                simplified = rdp_simplify(path, epsilon)
                raw_paths.append([(float(px), float(py)) for px, py in simplified])
            else:
                raw_paths.append([(float(px), float(py)) for px, py in path])
                
    if not raw_paths:
        return []
        
    # 6. Sắp xếp thứ tự vẽ tối ưu (Greedy Nearest Neighbor)
    sorted_paths = []
    current_pos = np.array([0.0, 0.0])
    
    while raw_paths:
        closest_idx = -1
        min_dist = float('inf')
        reverse_path = False
        
        for idx, path in enumerate(raw_paths):
            start_pt = np.array(path[0])
            end_pt = np.array(path[-1])
            
            dist_start = np.linalg.norm(current_pos - start_pt)
            dist_end = np.linalg.norm(current_pos - end_pt)
            
            if dist_start < min_dist:
                min_dist = dist_start
                closest_idx = idx
                reverse_path = False
            if dist_end < min_dist:
                min_dist = dist_end
                closest_idx = idx
                reverse_path = True
                
        chosen = raw_paths.pop(closest_idx)
        if reverse_path:
            chosen.reverse()
        sorted_paths.append(chosen)
        current_pos = np.array(chosen[-1])
        
    # Path welding post-processing
    if params.get("use_path_connect", True):
        weld_dist = params.get("path_connect_dist", 5.0)
        sorted_paths = weld_paths(sorted_paths, weld_dist)
        
    return sorted_paths

def process_sketch_image(image_path: str, params: dict) -> List[List[Tuple[float, float]]]:
    img = cv2.imread(image_path)
    if img is None:
        raise ValueError(f"Could not load image at {image_path}")
        
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # 1. CLAHE Contrast Equalization
    if params.get("use_clahe", True):
        clip_limit = params.get("clahe_clip_limit", 1.5)
        tile_size = params.get("clahe_tile_grid_size", 8)
        clahe = cv2.createCLAHE(clipLimit=clip_limit, tileGridSize=(tile_size, tile_size))
        gray = clahe.apply(gray)
        
    # 2. Gaussian Blur
    if params.get("use_blur", True):
        bsize = params.get("blur_size", 3)
        if bsize % 2 == 0:
            bsize = max(1, bsize - 1)
        gray = cv2.GaussianBlur(gray, (bsize, bsize), 0)
        
    # 3. Multi-threshold Canny Detector
    edges_ultra = cv2.Canny(gray, params.get("canny_ultra_low", 5), params.get("canny_ultra_high", 25))
    edges_medium = cv2.Canny(gray, params.get("canny_medium_low", 20), params.get("canny_medium_high", 60))
    edges_strong = cv2.Canny(gray, params.get("canny_strong_low", 50), params.get("canny_strong_high", 120))
    
    combined = cv2.bitwise_or(edges_ultra, edges_medium)
    combined = cv2.bitwise_or(combined, edges_strong)
    
    # 4. Connect dots and contours (morphological close)
    if params.get("use_connect", True):
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
        combined = cv2.morphologyEx(combined, cv2.MORPH_CLOSE, kernel)
        
    # 5. Thinning to single pixel width
    if params.get("use_thin", True):
        kernel_thin = np.ones((2, 2), np.uint8)
        combined = cv2.morphologyEx(combined, cv2.MORPH_ERODE, kernel_thin)
        
    # 6. Find contours
    contours, _ = cv2.findContours(combined, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
    
    raw_paths = []
    min_len = params.get("min_line_len", 5)
    epsilon = params.get("epsilon", 1.0)
    
    for contour in contours:
        pts = [tuple(pt[0]) for pt in contour]
        if params.get("use_len_filter", True) and len(pts) < min_len:
            continue
            
        float_pts = [(float(px), float(py)) for px, py in pts]
        if epsilon > 0:
            simplified = rdp_simplify(float_pts, epsilon)
            raw_paths.append(simplified)
        else:
            raw_paths.append(float_pts)
            
    if not raw_paths:
        return []
        
    # 7. Sắp xếp thứ tự vẽ tối ưu (Greedy Nearest Neighbor)
    sorted_paths = []
    current_pos = np.array([0.0, 0.0])
    
    while raw_paths:
        closest_idx = -1
        min_dist = float('inf')
        reverse_path = False
        
        for idx, path in enumerate(raw_paths):
            start_pt = np.array(path[0])
            end_pt = np.array(path[-1])
            dist_start = np.linalg.norm(current_pos - start_pt)
            dist_end = np.linalg.norm(current_pos - end_pt)
            
            if dist_start < min_dist:
                min_dist = dist_start
                closest_idx = idx
                reverse_path = False
            if dist_end < min_dist:
                min_dist = dist_end
                closest_idx = idx
                reverse_path = True
                
        chosen = raw_paths.pop(closest_idx)
        if reverse_path:
            chosen.reverse()
        sorted_paths.append(chosen)
        current_pos = np.array(chosen[-1])
        
    # Path welding post-processing
    if params.get("use_path_connect", True):
        weld_dist = params.get("path_connect_dist", 5.0)
        sorted_paths = weld_paths(sorted_paths, weld_dist)
        
    return sorted_paths

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
            await broadcast({"type": "connection", "connected": True, "message": "Connected to GRBL Mock Simulator"})
        else:
            state.serial_port = serial.Serial(port, baudrate, timeout=0.1)
            state.connected = True
            state.machine_state = "Connecting"
            # GRBL boot time sleep
            await asyncio.sleep(1.5)
            state.serial_port.write(b"\r\n\r\n")
            state.serial_port.flush()
            
            # Start threads/tasks
            asyncio.create_task(serial_reader_loop())
            asyncio.create_task(status_polling_loop())
            await broadcast({"type": "connection", "connected": True, "message": "Connected to GRBL Hardware Device"})
            
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
        mode = params.get("mode", "text")
        if mode == "sketch":
            paths = process_sketch_image(working_path, params)
        else:
            paths = process_text_image(working_path, params)
        state.latest_paths = paths
        
        # Generate paths visualization colored with order gradient
        img = cv2.imread(working_path)
        h, w = img.shape[:2]
        preview_img = np.zeros((h, w, 4), dtype=np.uint8)
        
        for idx, path in enumerate(paths):
            color_ratio = idx / len(paths) if len(paths) > 1 else 0.0
            # Green to red transition (B, G, R, A)
            color = (0, int(255 * (1 - color_ratio)), int(255 * color_ratio), 255)
            
            pts_array = np.array(path, dtype=np.int32).reshape((-1, 1, 2))
            cv2.polylines(preview_img, [pts_array], isClosed=False, color=color, thickness=2)
            
            # Draw path index at first coordinate
            if len(path) > 0:
                first = path[0]
                cv2.putText(preview_img, str(idx+1), (int(first[0]), int(first[1]) - 4), 
                            cv2.FONT_HERSHEY_SIMPLEX, 0.4, (255, 255, 255, 255), 1, cv2.LINE_AA)
                
        # Encode preview image as base64
        _, buffer = cv2.imencode('.png', preview_img)
        b64_str = base64.b64encode(buffer).decode('utf-8')
        
        # Calculate aspect ratio
        aspect = w / h if h > 0 else 1.0
        
        return {
            "status": "ok",
            "paths": paths,
            "preview_image": f"data:image/png;base64,{b64_str}",
            "dimensions": {"width": w, "height": h, "aspect": aspect}
        }
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
            state.serial_port.write((clean_cmd + "\n").encode())
            state.serial_port.flush()
            await broadcast({"type": "log", "direction": "out", "content": clean_cmd})
        return {"status": "ok"}
    except Exception as e:
        return JSONResponse({"status": "error", "message": str(e)}, status_code=500)

@app.post("/api/jog")
async def jog_movement(direction: str = Form(...), step: float = Form(...), feedrate: float = Form(...)):
    if not state.connected or not state.serial_port:
        return JSONResponse({"status": "error", "message": "Not connected"}, status_code=400)
        
    dx, dy = 0.0, 0.0
    if direction == "up": dy = step
    elif direction == "down": dy = -step
    elif direction == "left": dx = -step
    elif direction == "right": dx = step
    elif direction == "upleft": dx, dy = -step, step
    elif direction == "upright": dx, dy = step, step
    elif direction == "downleft": dx, dy = -step, -step
    elif direction == "downright": dx, dy = step, -step
    
    cmd = f"G91 G0 X{dx:.3f} Y{dy:.3f} F{feedrate:.0f}"
    
    try:
        # Jog relative move
        state.serial_port.write((cmd + "\n").encode())
        state.serial_port.flush()
        await broadcast({"type": "log", "direction": "out", "content": cmd})
        # After relative jog, restore absolute positioning mode
        state.serial_port.write(b"G90\n")
        return {"status": "ok"}
    except Exception as e:
        return JSONResponse({"status": "error", "message": str(e)}, status_code=500)

@app.post("/api/set_home")
async def set_home_coords():
    if not state.connected or not state.serial_port:
        return JSONResponse({"status": "error", "message": "Not connected"}, status_code=400)
    try:
        # G10 L20 P1 X0 Y0 Z0 -> Reset work coordinates to 0 for all axes
        # M5 (or M3 S0) spindle off
        cmd = "G10 L20 P1 X0 Y0 Z0"
        state.serial_port.write((cmd + "\n").encode())
        state.serial_port.flush()
        await broadcast({"type": "log", "direction": "out", "content": cmd})
        
        # Spindle off
        settings = load_settings()
        pen_up = settings["pen_up_cmd"]
        state.serial_port.write(f"{pen_up}\n".encode())
        state.serial_port.flush()
        await broadcast({"type": "log", "direction": "out", "content": pen_up})
        
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
        state.serial_port.write((cmd + "\n").encode())
        state.serial_port.flush()
        await broadcast({"type": "log", "direction": "out", "content": cmd})
        return {"status": "ok"}
    except Exception as e:
        return JSONResponse({"status": "error", "message": str(e)}, status_code=500)

@app.post("/api/draw/start")
async def start_drawing_paths(scale_factor: float = Form(...)):
    if not state.connected or not state.serial_port:
        return JSONResponse({"status": "error", "message": "Not connected"}, status_code=400)
    if not state.latest_paths:
        return JSONResponse({"status": "error", "message": "No processed text vectors available"}, status_code=400)
    if state.is_streaming:
        return JSONResponse({"status": "error", "message": "Drawing stream already running"}, status_code=400)
        
    settings = load_settings()
    
    # Save the initial coordinates before drawing (to return back to it later)
    state.draw_start_pos = list(state.wpos)
    
    # Generate G-code lines with starting position offsets
    gcode_lines = []
    gcode_lines.append("; --- START DRAWING TEXT ---")
    gcode_lines.append("G21 ; Units in mm")
    gcode_lines.append("G90 ; Absolute coordinates")
    gcode_lines.append(settings["pen_up_cmd"])
    gcode_lines.append(f"F{settings['feedrate']:.0f}")
    
    # First point of the first stroke path is used as the relative reference origin
    ref_x = state.latest_paths[0][0][0]
    ref_y = state.latest_paths[0][0][1]
    
    # Starting offset is the current physical CNC coordinate
    x_curr = state.draw_start_pos[0]
    y_curr = state.draw_start_pos[1]
    
    for idx, path in enumerate(state.latest_paths):
        gcode_lines.append(f"; --- Stroke Path {idx+1} ---")
        
        # Calculate start point
        # X: left-to-right (same direction)
        # Y: top-to-bottom on image maps to bottom-to-top on CNC, so invert relative difference
        dx_start = path[0][0] - ref_x
        dy_start = -(path[0][1] - ref_y)
        
        x_start = dx_start * scale_factor + x_curr
        y_start = dy_start * scale_factor + y_curr
        
        # Rapid move to start of line with pen UP
        gcode_lines.append(f"G0 X{x_start:.3f} Y{y_start:.3f}")
        
        # Pen DOWN
        gcode_lines.append(settings["pen_down_cmd"])
        if settings["pen_dwell"] > 0:
            gcode_lines.append(f"G4 P{settings['pen_dwell']:.3f}")
            
        # Draw all intermediate path coordinates
        for pt in path[1:]:
            dx = pt[0] - ref_x
            dy = -(pt[1] - ref_y)
            x_val = dx * scale_factor + x_curr
            y_val = dy * scale_factor + y_curr
            gcode_lines.append(f"G1 X{x_val:.3f} Y{y_val:.3f}")
            
        # Pen UP
        gcode_lines.append(settings["pen_up_cmd"])
        if settings["pen_dwell"] > 0:
            gcode_lines.append(f"G4 P{settings['pen_dwell']:.3f}")
            
    gcode_lines.append("; --- END DRAWING TEXT ---")
    
    state.stream_gcode_lines = gcode_lines
    state.gcode_index = 0
    state.is_streaming = True
    state.is_paused = False
    
    # Start streamer task
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
