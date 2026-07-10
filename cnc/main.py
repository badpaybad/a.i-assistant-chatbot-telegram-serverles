import os
import math
import sys
import re
import time
import serial
import asyncio
import logging
import subprocess
import json
import cv2
import numpy as np
import threading
import onnxruntime as ort
from collections import deque
from typing import Dict, List, Set, Optional, Tuple
from fastapi import FastAPI, UploadFile, File, Form, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse, JSONResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

# Configure logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("cnc_controller")

app = FastAPI(title="GRBL CNC Web Controller")

# Calibration Settings persistence
CALIBRATION_FILE = "calibration_settings.json"

HOME_SNAPSHOT_FILE = "home_snapshot.jpg"

def invert_gcode_y(gcode_line: str) -> str:
    # Do not invert Y coordinate (cập nhật 20 - sửa lại)
    return gcode_line

def make_serial_wrapper(original_serial):
    original_write = original_serial.write
    
    def wrapped_write(data):
        if isinstance(data, bytes):
            try:
                decoded = data.decode('utf-8')
                # Check if it looks like a G-code line (not single char real-time commands like '?' or '!')
                if len(decoded) > 1 and any(cmd in decoded for cmd in ["G", "M", "$"]):
                    inverted = invert_gcode_y(decoded)
                    data = inverted.encode('utf-8')
            except Exception as e:
                logger.error(f"Error wrapping serial write: {e}")
        return original_write(data)
        
    original_serial.write = wrapped_write
    return original_serial

def load_calibration_settings() -> dict:
    default_settings = {
        "points": {},
        "matrix": None,
        "draw_overlay": True,
        "home_set": False,
        "home_markers": {},
        "home_snapshot": None,
        "step_distance": 10.0,
        "jog_feedrate": 1000,
        "gesture_feedrate": 4000,
        "gesture_distance": 40.0,
        "gesture_dwell": 0.15,
        "gesture_tap_dwell": 0.05,
        # Pen / Servo configuration defaults
        "pen_mode": "z-axis",
        "pen_up_z": 3.0,
        "pen_down_z": 0.0,
        "pen_up_pwm": 30.0,
        "pen_down_pwm": 90.0,
        "pen_dwell": 0.25,
        "camera_height": 542.0,
        # Cập nhật 48: hệ tọa độ mới
        "frame_o": {"x": 360.0, "y": 360.0},
        "cnc_o":   {"x": 0.0,   "y": 0.0},    # work coord
        "cnc_mpos_o": {"x": 0.0, "y": 0.0},    # mpos cơ học
        "frame_tl": None, "cnc_tl": None, "cnc_mpos_tl": None,
        "frame_tr": None, "cnc_tr": None, "cnc_mpos_tr": None,
        "frame_br": None, "cnc_br": None, "cnc_mpos_br": None,
        "frame_bl": None, "cnc_bl": None, "cnc_mpos_bl": None,
        "frame_last": {"x": 360.0, "y": 360.0},
        "cnc_last":   {"x": 0.0,   "y": 0.0},
    }
    
    settings = default_settings.copy()
    
    # Load calibration settings
    if os.path.exists(CALIBRATION_FILE):
        try:
            with open(CALIBRATION_FILE, "r") as f:
                settings.update(json.load(f))
        except Exception as e:
            logger.error(f"Error loading calibration settings: {e}")
            
    # Migration & compatibility from pen_settings.json
    migration_done = False
    if os.path.exists("pen_settings.json"):
        try:
            with open("pen_settings.json", "r") as f:
                pen_data = json.load(f)
                if "mode" in pen_data:
                    settings["pen_mode"] = pen_data["mode"]
                for k in ["pen_up_z", "pen_down_z", "pen_up_pwm", "pen_down_pwm", "pen_dwell"]:
                    if k in pen_data:
                        settings[k] = pen_data[k]
            migration_done = True
        except Exception as e:
            logger.error(f"Error migrating pen settings: {e}")
            
    # Compatibility checks for step_distance
    if "step_distance" not in settings and "step_index" in settings:
        mapping = [0.1, 1.0, 10.0, 100.0]
        idx = int(settings["step_index"])
        if 0 <= idx < len(mapping):
            settings["step_distance"] = mapping[idx]
            
    if migration_done:
        try:
            with open(CALIBRATION_FILE, "w") as f:
                json.dump(settings, f, indent=4)
            os.remove("pen_settings.json")
            logger.info("Successfully merged pen_settings.json into calibration_settings.json and removed old file.")
        except Exception as e:
            logger.error(f"Error removing old pen settings file after merge: {e}")
            
    return settings

def save_calibration_settings(settings: dict):
    try:
        existing = {}
        if os.path.exists(CALIBRATION_FILE):
            try:
                with open(CALIBRATION_FILE, "r") as f:
                    existing = json.load(f)
            except Exception:
                pass
        merged = {**existing, **settings}
        with open(CALIBRATION_FILE, "w") as f:
            json.dump(merged, f, indent=4)
    except Exception as e:
        logger.error(f"Error saving calibration settings: {e}")

class PenSettings(BaseModel):
    mode: str
    pen_up_z: float
    pen_down_z: float
    pen_up_pwm: float
    pen_down_pwm: float
    pen_dwell: float

# Global Controller State
class ControllerState:
    def __init__(self):
        self.serial_port: Optional[serial.Serial] = None
        self.port_name = "/dev/ttyACM0"
        self.baudrate = 115200
        self.connected = False

        self.grbl_ack_event = asyncio.Event()
        
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
        cal_settings = load_calibration_settings()
        self.pen_mode = cal_settings.get("pen_mode", "z-axis")
        self.pen_up_z = cal_settings.get("pen_up_z", 3.0)
        self.pen_down_z = cal_settings.get("pen_down_z", 0.0)
        self.pen_up_pwm = cal_settings.get("pen_up_pwm", 30.0)
        self.pen_down_pwm = cal_settings.get("pen_down_pwm", 90.0)
        self.pen_dwell = cal_settings.get("pen_dwell", 0.25)
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
        
        # Calibration config
        cal_settings = load_calibration_settings()
        self.calibration_points = cal_settings["points"]
        self.calibration_matrix = cal_settings["matrix"]
        self.draw_overlay = cal_settings["draw_overlay"]
        self.cnc_points = cal_settings.get("cnc_points", {})
        
        # Home settings (cập nhật 2)
        self.home_set = cal_settings.get("home_set", False)
        self.home_markers = cal_settings.get("home_markers", {})
        self.home_snapshot = cal_settings.get("home_snapshot", None)
        self.aruco_standard_points = cal_settings.get("aruco_standard_points", {})
        self.saved_pen_position = cal_settings.get("saved_pen_position", [0.0, 0.0, 0.0])
        # Cập nhật 46: home_pixel luôn là tâm frame chính (360, 360)
        self.home_pixel = [360.0, 360.0]
        self.touch_pen_pixel = cal_settings.get("touch_pen_pixel", None)
        # Cập nhật 46: lưu vị trí CNC tương ứng với mỗi góc ArUco manual
        self.aruco_cnc_points: Dict[str, List[float]] = cal_settings.get("aruco_cnc_points", {})
        # Cập nhật 44: Thêm mpos tại home và mpos cuối cùng được lưu
        self.home_mpos = cal_settings.get("home_mpos", [0.0, 0.0, 0.0])
        self.saved_mpos = cal_settings.get("saved_mpos", [0.0, 0.0, 0.0])

        # Cập nhật 48: hệ tọa độ mới — gốc tọa độ, 4 góc, vị trí cuối
        self.v48_frame_o  = cal_settings.get("frame_o",  {"x": 360.0, "y": 360.0})
        self.v48_cnc_o    = cal_settings.get("cnc_o",    {"x": 0.0,   "y": 0.0})   # work coord
        self.v48_frame_tl = cal_settings.get("frame_tl", None)
        self.v48_cnc_tl   = cal_settings.get("cnc_tl",   None)   # work coord
        self.v48_frame_tr = cal_settings.get("frame_tr", None)
        self.v48_cnc_tr   = cal_settings.get("cnc_tr",   None)   # work coord
        self.v48_frame_br = cal_settings.get("frame_br", None)
        self.v48_cnc_br   = cal_settings.get("cnc_br",   None)   # work coord
        self.v48_frame_bl = cal_settings.get("frame_bl", None)
        self.v48_cnc_bl   = cal_settings.get("cnc_bl",   None)   # work coord
        self.v48_frame_last = cal_settings.get("frame_last", {"x": 360.0, "y": 360.0})
        self.v48_cnc_last   = cal_settings.get("cnc_last",   {"x": 0.0,   "y": 0.0})
        # mpos cơ học GRBL tương ứng với từng điểm calibration
        self.v48_cnc_mpos_o  = cal_settings.get("cnc_mpos_o",  {"x": 0.0, "y": 0.0})
        self.v48_cnc_mpos_tl = cal_settings.get("cnc_mpos_tl", None)
        self.v48_cnc_mpos_tr = cal_settings.get("cnc_mpos_tr", None)
        self.v48_cnc_mpos_br = cal_settings.get("cnc_mpos_br", None)
        self.v48_cnc_mpos_bl = cal_settings.get("cnc_mpos_bl", None)


        self.latest_detected_markers = dict(self.aruco_standard_points) # sync with manual points (cập nhật 19)
        self.latest_detected_markers_time: Dict[str, float] = {name: time.time() for name in self.aruco_standard_points}
        # cập nhật 10: history ring buffer, max 500 items per corner
        self.aruco_history: Dict[str, deque] = {
            name: deque(maxlen=500) for name in ["TL", "TR", "BL", "BR"]
        }
        # cập nhật 10: YOLO detection history, max 500 batches
        self.yolo_history: deque = deque(maxlen=500)

        # UI Preferences (cập nhật 18)
        self.step_distance = cal_settings.get("step_distance", 10.0)
        self.jog_feedrate = cal_settings.get("jog_feedrate", 1000)
        self.gesture_feedrate = cal_settings.get("gesture_feedrate", 4000)
        self.gesture_distance = cal_settings.get("gesture_distance", 40.0)
        self.gesture_dwell = cal_settings.get("gesture_dwell", 0.15)
        self.gesture_tap_dwell = cal_settings.get("gesture_tap_dwell", 0.05)
        self.camera_height = cal_settings.get("camera_height", 542.0)

        # Object detection settings (cập nhật 3)
        self.detect_objects = True
        self.ort_session = None
        self.latest_detection_results = []
        self.latest_detection_time = 0.0
        self.latest_yolo_detections = []
        self.latest_yolo_detection_time = 0.0
        # cập nhật 5: save last known largest object position
        self.last_largest_object_info = None  # {"center": [cx, cy], "bbox": [...], "class_id": n, "confidence": f, "area": n, "time": t}
        # cập nhật 10: separate timestamp for last_largest (survives clear)
        self.last_largest_object_time: float = 0.0
        self.class_names = {0: "sittng"}      # cập nhật 6: class labels mapping
        # cập nhật 8: Moving around state variables
        self.moving_around_running = False
        self.moving_around_task = None
        self.update_calibration_matrix()

    def update_calibration_matrix(self):
        src_pts = []
        dst_pts = []
        
        # 1. Add corner mappings based on manual ArUco and manual CNC points
        for corner in ["TL", "TR", "BR", "BL"]:
            px = self.aruco_standard_points.get(corner)
            cx = self.cnc_points.get(corner)
            if px and cx:
                src_pts.append(px)
                dst_pts.append(cx)
                
        # 2. Add home point mapping if set (Cập nhật 42: Sử dụng touch_pen_pixel ánh xạ về [0,0])
        if self.home_set and (getattr(self, "touch_pen_pixel", None) is not None):
            src_pts.append(self.touch_pen_pixel)
            dst_pts.append([0.0, 0.0])
        elif self.home_set and (getattr(self, "home_pixel", None) is not None):
            # Fallback to home_pixel if touch_pen_pixel is not set yet
            src_pts.append(self.home_pixel)
            dst_pts.append([0.0, 0.0])
            
        # Fallback to old calibration_points if no manual points set
        if len(src_pts) < 3:
            valid_pts = []
            for corner in ["TL", "TR", "BR", "BL"]:
                pt = self.calibration_points.get(corner)
                if pt and "pixel" in pt and "machine" in pt:
                    valid_pts.append(pt)
            if len(valid_pts) >= 3:
                src_pts = [pt["pixel"] for pt in valid_pts]
                dst_pts = [pt["machine"] for pt in valid_pts]
                
        if len(src_pts) < 3:
            self.calibration_matrix = None
            return False
            
        src = np.array(src_pts, dtype=np.float32)
        dst = np.array(dst_pts, dtype=np.float32)
        
        try:
            if len(src_pts) == 3:
                M_aff = cv2.getAffineTransform(src, dst)
                if M_aff is not None:
                    M = np.vstack([M_aff, [0.0, 0.0, 1.0]])
                else:
                    M = None
            else:
                # 4 or more points: Homography
                M, _ = cv2.findHomography(src, dst)
            if M is not None:
                self.calibration_matrix = M.tolist()
                return True
        except Exception as e:
            logger.error(f"Error computing calibration matrix: {e}")
            
        self.calibration_matrix = None
        return False

state = ControllerState()

# ── Cập nhật 43: Camera Calibration — load lúc khởi động, watcher restart khi file đổi ───────
# Khi file camera_calibration_result.npz tồn tại → áp dụng undistortion.
# Nếu file thay đổi (chạy lại calibration_camera.py) → server tự restart để an toàn.
_CAM_CALIB_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "camera_calibration_result.npz")
_CALIB_IMG_SIZE = (720, 720)  # Nhất quán: calibration 720×720 = crop frame 720×720 = UI 720×720

_cam_state = {
    "mtx": None,           # Camera matrix (3×3)
    "dist": None,          # Distortion coefficients (5×1)
    "new_mtx": None,       # Optimal camera matrix với alpha=0
    "loaded_mtime": -1.0,  # mtime lúc load thành công
    "enabled": False       # True khi đã load thành công
}

def _load_cam_calib():
    """
    Load camera_calibration_result.npz lúc khởi động.
    Trả về True nếu load thành công, False nếu file không có hoặc lỗi.
    """
    if not os.path.isfile(_CAM_CALIB_FILE):
        logger.info("[Calib43] Không tìm thấy camera_calibration_result.npz → undistortion tắt (passthrough mode).")
        _cam_state["enabled"] = False
        return False
    try:
        mtime = os.path.getmtime(_CAM_CALIB_FILE)
        with np.load(_CAM_CALIB_FILE) as d:
            mtx = d["mtx"].astype(np.float64)
            dist = d["dist"].astype(np.float64)
        # alpha=0: giữ nguyên 720×720, không cần crop thêm sau undistort
        new_mtx, _ = cv2.getOptimalNewCameraMatrix(mtx, dist, _CALIB_IMG_SIZE, 0, _CALIB_IMG_SIZE)
        _cam_state["mtx"] = mtx
        _cam_state["dist"] = dist
        _cam_state["new_mtx"] = new_mtx
        _cam_state["loaded_mtime"] = mtime
        _cam_state["enabled"] = True
        logger.info(
            f"[Calib43] ✅ Đã load camera_calibration_result.npz "
            f"(cx={new_mtx[0,2]:.1f}, cy={new_mtx[1,2]:.1f})"
        )
        return True
    except Exception as e:
        logger.warning(f"[Calib43] Lỗi khi load calibration: {e} → undistortion tắt.")
        _cam_state["enabled"] = False
        return False

def _start_calib_watcher():
    """
    Cập nhật 43: Background thread theo dõi file camera_calibration_result.npz.
    Nếu file bị thay đổi (mtime mới hơn) → restart toàn bộ server để đảm bảo an toàn.
    Tất cả state sẽ được rebuild từ đầu với thông số calibration mới.
    """
    def _watch():
        logger.info("[Calib43] 🔍 Watcher thread bắt đầu theo dõi camera_calibration_result.npz")
        while True:
            time.sleep(5)  # Kiểm tra mỗi 5 giây
            if not os.path.isfile(_CAM_CALIB_FILE):
                continue
            try:
                current_mtime = os.path.getmtime(_CAM_CALIB_FILE)
            except OSError:
                continue
            if current_mtime > _cam_state["loaded_mtime"]:
                logger.warning(
                    "[Calib43] ⚠️ Phát hiện file camera_calibration_result.npz mới! "
                    "Đang khởi động lại server để áp dụng calibration mới..."
                )
                time.sleep(2)  # Chờ file ghi xong hoàn toàn
                # Restart process: thay thế process hiện tại bằng process mới với cùng arguments
                os.execv(sys.executable, [sys.executable] + sys.argv)

    t = threading.Thread(target=_watch, daemon=True, name="CalibWatcher")
    t.start()

# Thực hiện load lúc khởi động và bắt đầu watcher
_load_cam_calib()
_start_calib_watcher()

def undistort_pixel(px: float, py: float) -> tuple:
    """
    Cập nhật 43: Hiệu chỉnh méo thấu kính cho một điểm pixel trên frame 720×720.
    - Áp dụng khi camera_calibration_result.npz tồn tại lúc khởi động.
    - Khi file calibration được cập nhật → server tự restart, load lại từ đầu.
    - Nếu không có file calibration → passthrough (trả về pixel gốc).
    - Resolution 720×720 nhất quán: calibration → crop frame → UI hiển thị.
    """
    if not _cam_state["enabled"]:
        return px, py
    try:
        pts = np.array([[[float(px), float(py)]]], dtype=np.float32)
        undistorted = cv2.undistortPoints(
            pts, _cam_state["mtx"], _cam_state["dist"], P=_cam_state["new_mtx"]
        )
        return float(undistorted[0, 0, 0]), float(undistorted[0, 0, 1])
    except Exception as e:
        logger.error(f"[Calib43] undistort_pixel error: {e}")
        return px, py
def get_camera_extrinsics_pnp() -> Tuple[Optional[np.ndarray], Optional[np.ndarray]]:
    """
    Cập nhật 45: Tìm ma trận quay rvec và tvec từ các điểm standard markers & touch_pen_pixel.
    """
    object_pts = []
    image_pts = []
    
    # 1. Thêm các điểm Aruco đã calibrate
    for corner in ["TL", "TR", "BR", "BL"]:
        px = state.aruco_standard_points.get(corner)
        cx = state.cnc_points.get(corner)
        if px and cx:
            object_pts.append([cx[0], cx[1], 0.0])
            image_pts.append(px)
            
    # 2. Thêm điểm gốc Home/Touch Pen
    if state.home_set:
        if getattr(state, "touch_pen_pixel", None) is not None:
            object_pts.append([0.0, 0.0, 0.0])
            image_pts.append(state.touch_pen_pixel)
        elif getattr(state, "home_pixel", None) is not None:
            object_pts.append([0.0, 0.0, 0.0])
            image_pts.append(state.home_pixel)
            
    if len(object_pts) < 4:
        return None, None
        
    object_pts = np.array(object_pts, dtype=np.float32)
    image_pts = np.array(image_pts, dtype=np.float32)
    
    camera_matrix = _cam_state["new_mtx"] if _cam_state["new_mtx"] is not None else _cam_state["mtx"]
    if camera_matrix is None:
        return None, None
        
    dist_coeffs = np.zeros((5, 1), dtype=np.float32)
    
    try:
        success, rvec, tvec = cv2.solvePnP(
            object_pts, image_pts, camera_matrix, dist_coeffs, flags=cv2.SOLVEPNP_ITERATIVE
        )
        if not success:
            return None, None
        return rvec, tvec
    except Exception as e:
        logger.error(f"[Calib45] solvePnP error: {e}")
        return None, None


def get_adjusted_extrinsics() -> Tuple[Optional[np.ndarray], Optional[np.ndarray]]:
    """
    Lấy extrinsics và hiệu chỉnh tvec theo chiều cao camera được cấu hình.
    """
    rvec, tvec = get_camera_extrinsics_pnp()
    if rvec is None or tvec is None:
        return None, None
        
    try:
        # Chuyển rvec sang ma trận quay R
        R, _ = cv2.Rodrigues(rvec)
        
        # Tọa độ camera trong hệ CNC: C = -R^T * tvec
        R_T = R.T
        C = -np.dot(R_T, tvec)
        
        current_height = C[2, 0]
        target_height = getattr(state, "camera_height", 542.0)
        
        if abs(current_height) > 1e-3:
            scale = target_height / current_height
            tvec_adj = tvec * scale
            return rvec, tvec_adj
    except Exception as e:
        logger.error(f"[Calib45] get_adjusted_extrinsics error: {e}")
        
    return rvec, tvec


def project_pixel_to_cnc(px: float, py: float) -> Optional[Tuple[float, float]]:
    """
    Chiếu một điểm pixel (đã khử méo thấu kính) sang mặt phẳng Z_cnc = 0 dùng solvePnP và camera_height.
    """
    if not _cam_state["enabled"]:
        return None
        
    camera_matrix = _cam_state["new_mtx"] if _cam_state["new_mtx"] is not None else _cam_state["mtx"]
    if camera_matrix is None:
        return None
        
    rvec, tvec = get_adjusted_extrinsics()
    if rvec is None or tvec is None:
        return None
        
    try:
        R, _ = cv2.Rodrigues(rvec)
        R_T = R.T
        
        # Tia chiếu chuẩn hóa trong không gian camera
        fx = camera_matrix[0, 0]
        fy = camera_matrix[1, 1]
        cx = camera_matrix[0, 2]
        cy = camera_matrix[1, 2]
        
        v_c = np.array([(px - cx) / fx, (py - cy) / fy, 1.0], dtype=np.float32).reshape(3, 1)
        
        # Dòng 3 của R_T (tương đương cột 3 của R)
        R_row3 = R_T[2, :]
        
        denom = np.dot(R_row3, v_c)[0]
        if abs(denom) < 1e-6:
            return None
            
        num = np.dot(R_row3, tvec)[0]
        s = num / denom
        
        # Điểm 3D trong không gian CNC: P_cnc = R_T * (s * v_c - tvec)
        P_cnc = np.dot(R_T, s * v_c - tvec)
        
        # Cập nhật 45: đảo dấu X và Y vì camera lắp ngược 180° so với hướng trục CNC
        return float(-P_cnc[0, 0]), float(-P_cnc[1, 0])
    except Exception as e:
        logger.error(f"[Calib45] project_pixel_to_cnc error: {e}")
        return None


def project_cnc_to_pixel(x_cnc: float, y_cnc: float, z_cnc: float) -> Optional[Tuple[float, float]]:
    """
    Chiếu ngược điểm CNC 3D sang pixel ảnh (phục vụ set_home fallback).
    """
    if not _cam_state["enabled"]:
        return None
        
    camera_matrix = _cam_state["new_mtx"] if _cam_state["new_mtx"] is not None else _cam_state["mtx"]
    if camera_matrix is None:
        return None
        
    rvec, tvec = get_adjusted_extrinsics()
    if rvec is None or tvec is None:
        return None
        
    try:
        R, _ = cv2.Rodrigues(rvec)
        # Cập nhật 45: đảo ngược dấu vì project_pixel_to_cnc đã đảo đầu ra
        P_cnc = np.array([-x_cnc, -y_cnc, z_cnc], dtype=np.float32).reshape(3, 1)
        P_cam = np.dot(R, P_cnc) + tvec
        
        if abs(P_cam[2, 0]) < 1e-6:
            return None
            
        u = camera_matrix[0, 0] * (P_cam[0, 0] / P_cam[2, 0]) + camera_matrix[0, 2]
        v = camera_matrix[1, 1] * (P_cam[1, 0] / P_cam[2, 0]) + camera_matrix[1, 2]
        return float(u), float(v)
    except Exception as e:
        logger.error(f"[Calib45] project_cnc_to_pixel error: {e}")
        return None


def get_camera_extrinsics_pnp_for_frame(markers_dict: dict) -> Tuple[Optional[np.ndarray], Optional[np.ndarray]]:
    """
    Giải PnP cho một khung hình cụ thể dựa trên danh sách các marker phát hiện được.
    """
    object_pts = []
    image_pts = []
    
    for corner in ["TL", "TR", "BR", "BL"]:
        px = markers_dict.get(corner)
        cx = state.cnc_points.get(corner)
        if px and cx:
            object_pts.append([cx[0], cx[1], 0.0])
            # Do markers_dict chứa pixel thô, ta cần khử méo thấu kính trước
            ux, uy = undistort_pixel(px[0], px[1])
            image_pts.append([ux, uy])
            
    if len(object_pts) < 4:
        return None, None
        
    object_pts = np.array(object_pts, dtype=np.float32)
    image_pts = np.array(image_pts, dtype=np.float32)
    
    camera_matrix = _cam_state["new_mtx"] if _cam_state["new_mtx"] is not None else _cam_state["mtx"]
    if camera_matrix is None:
        return None, None
        
    dist_coeffs = np.zeros((5, 1), dtype=np.float32)
    
    try:
        success, rvec, tvec = cv2.solvePnP(
            object_pts, image_pts, camera_matrix, dist_coeffs, flags=cv2.SOLVEPNP_ITERATIVE
        )
        if not success:
            return None, None
        return rvec, tvec
    except Exception as e:
        logger.error(f"[Calib45] frame solvePnP error: {e}")
        return None, None


def get_adjusted_extrinsics_for_frame(markers_dict: dict) -> Tuple[Optional[np.ndarray], Optional[np.ndarray]]:
    """
    Lấy extrinsics của một khung hình và hiệu chỉnh theo chiều cao camera.
    """
    rvec, tvec = get_camera_extrinsics_pnp_for_frame(markers_dict)
    if rvec is None or tvec is None:
        return None, None
        
    try:
        R, _ = cv2.Rodrigues(rvec)
        R_T = R.T
        C = -np.dot(R_T, tvec)
        current_height = C[2, 0]
        target_height = getattr(state, "camera_height", 542.0)
        
        if abs(current_height) > 1e-3:
            scale = target_height / current_height
            tvec_adj = tvec * scale
            return rvec, tvec_adj
    except Exception as e:
        logger.error(f"[Calib45] get_adjusted_extrinsics_for_frame error: {e}")
        
    return rvec, tvec


def project_pixel_to_cnc_for_frame(px: float, py: float, markers_dict: dict) -> Optional[Tuple[float, float]]:
    """
    Chiếu một điểm pixel thô trên một khung hình sang mặt phẳng Z_cnc = 0 sử dụng extrinsics của khung hình đó.
    """
    if not _cam_state["enabled"]:
        return None
        
    camera_matrix = _cam_state["new_mtx"] if _cam_state["new_mtx"] is not None else _cam_state["mtx"]
    if camera_matrix is None:
        return None
        
    rvec, tvec = get_adjusted_extrinsics_for_frame(markers_dict)
    if rvec is None or tvec is None:
        return None
        
    try:
        R, _ = cv2.Rodrigues(rvec)
        R_T = R.T
        
        fx = camera_matrix[0, 0]
        fy = camera_matrix[1, 1]
        cx = camera_matrix[0, 2]
        cy = camera_matrix[1, 2]
        
        # Khử méo thấu kính pixel đích
        ux, uy = undistort_pixel(px, py)
        v_c = np.array([(ux - cx) / fx, (uy - cy) / fy, 1.0], dtype=np.float32).reshape(3, 1)
        
        R_row3 = R_T[2, :]
        denom = np.dot(R_row3, v_c)[0]
        if abs(denom) < 1e-6:
            return None
            
        num = np.dot(R_row3, tvec)[0]
        s = num / denom
        P_cnc = np.dot(R_T, s * v_c - tvec)
        # Cập nhật 45: đảo dấu X và Y vì camera lắp ngược 180° so với hướng trục CNC
        return float(-P_cnc[0, 0]), float(-P_cnc[1, 0])
    except Exception as e:
        logger.error(f"[Calib45] project_pixel_to_cnc_for_frame error: {e}")
        return None



def get_adjusted_calibration_matrix() -> Optional[List[List[float]]]:
    M = None
    if state.calibration_matrix:
        M = np.array(state.calibration_matrix, dtype=np.float32)
        if M.shape == (2, 3):
            M = np.vstack([M, [0.0, 0.0, 1.0]])
    elif state.home_set and state.home_markers and len(state.home_markers) == 4:
        # Construct a default calibration matrix using home_markers mapping to a standard 200x150 mm area
        pts = state.home_markers
        src = np.array([pts[c] for c in ["TL", "TR", "BR", "BL"]], dtype=np.float32)
        # We assume physical coordinates relative to the center (0,0):
        # TL = (-100, 75), TR = (100, 75), BR = (100, -75), BL = (-100, -75)
        # Y is positive up (corrected for Y inversion)
        dst = np.array([[-100.0, 75.0], [100.0, 75.0], [100.0, -75.0], [-100.0, -75.0]], dtype=np.float32)
        try:
            M, _ = cv2.findHomography(src, dst)
        except Exception as e:
            logger.error(f"Error generating fallback perspective calibration matrix: {e}")
            M = None

    if M is None:
        return None
    return M.tolist()


def project_frame_pixel_to_cnc(px: float, py: float) -> Optional[Tuple[float, float]]:
    """
    Cập nhật 46: Chiếu pixel (frame chính 720×720) → tọa độ CNC work.
    Sử dụng tam giác vuông từ camera (cao h_cam) chĩa thẳng xuống gốc tọa độ (360, 360),
    cạnh huyền từ camera đến 4 điểm ArUco manual để suy luận chính xác khoảng cách và bù trừ di chuyển.
    Không dùng camera_calibration_result.npz.
    """
    if not state.home_set:
        return None

    # 1. Thu thập các điểm hiệu chuẩn
    aruco_cnc = getattr(state, "aruco_cnc_points", {}) or {}
    corners = ["TL", "TR", "BR", "BL"]
    
    corner_pixels = {}
    corner_cnc = {}
    src_pts = [[360.0, 360.0]]
    dst_pts = [[0.0, 0.0]]
    
    for c in corners:
        gpx = state.aruco_standard_points.get(c)
        gcx = aruco_cnc.get(c)
        if gpx and gcx and len(gpx) >= 2 and len(gcx) >= 2:
            corner_pixels[c] = np.array(gpx, dtype=np.float32)
            corner_cnc[c] = np.array(gcx, dtype=np.float32)
            src_pts.append([float(gpx[0]), float(gpx[1])])
            dst_pts.append([float(gcx[0]), float(gcx[1])])
            
    if len(src_pts) < 4:
        return None

    try:
        # Tính Homography tuyến tính cơ sở để lấy hướng của các trục
        src_arr = np.array(src_pts, dtype=np.float32)
        dst_arr = np.array(dst_pts, dtype=np.float32)
        H_linear, _ = cv2.findHomography(src_arr, dst_arr)
        if H_linear is None:
            return None

        # Tính khoảng cách pixel của điểm hiện tại tới tâm frame (360, 360)
        dx = px - 360.0
        dy = py - 360.0
        r_px = np.sqrt(dx*dx + dy*dy)

        if r_px < 1e-5:
            return 0.0, 0.0

        # Độ cao camera tới mặt phẳng
        h_cam = getattr(state, "camera_height", 542.0)

        # Hồi quy tuyến tính tìm quan hệ tan(theta) = r_px * (a + b * r_px^2)
        # Sử dụng 4 tam giác vuông COXi vuông tại O(0,0,0)
        x_data = []
        y_data = []
        for c, gpx in corner_pixels.items():
            rdx = gpx[0] - 360.0
            rdy = gpx[1] - 360.0
            rr = np.sqrt(rdx*rdx + rdy*rdy)
            
            # Khoảng cách CNC thực tế (cạnh đối diện góc vuông tại gốc)
            R_cnc = np.sqrt(corner_cnc[c][0]**2 + corner_cnc[c][1]**2)
            
            if rr > 1.0:
                tan_theta = R_cnc / h_cam  # Đối / Kề (R_cnc / h_cam)
                x_data.append(rr * rr)
                y_data.append(tan_theta / rr)

        if len(x_data) >= 2:
            x_arr = np.array(x_data, dtype=np.float32)
            y_arr = np.array(y_data, dtype=np.float32)
            A = np.vstack([np.ones_like(x_arr), x_arr]).T
            # Giải hệ phương trình bình phương tối thiểu
            a, b = np.linalg.lstsq(A, y_arr, rcond=None)[0]
        else:
            # Fallback nếu thiếu điểm
            a = 1.0 / h_cam
            b = 0.0

        # Tính tan_theta của điểm hiện tại dựa trên mô hình thấu kính đã khớp
        tan_theta = r_px * (a + b * r_px * r_px)
        
        # Khoảng cách CNC thực tế từ tâm (cạnh đối diện góc vuông tại gốc)
        R_predicted = h_cam * tan_theta

        # Lấy hướng bằng Homography tuyến tính cơ sở
        v = np.array([px, py, 1.0], dtype=np.float32)
        res_linear = np.dot(H_linear, v)
        if abs(res_linear[2]) < 1e-6:
            return None
        wx_linear = res_linear[0] / res_linear[2]
        wy_linear = res_linear[1] / res_linear[2]

        len_linear = np.sqrt(wx_linear**2 + wy_linear**2)
        if len_linear < 1e-5:
            return 0.0, 0.0

        # Chuẩn hóa hướng và nhân với khoảng cách thực tế đã bù trừ độ méo
        dir_x = wx_linear / len_linear
        dir_y = wy_linear / len_linear

        wx = dir_x * R_predicted
        wy = dir_y * R_predicted

        return float(wx), float(wy)

    except Exception as e:
        logger.error(f"[Calib46] project_frame_pixel_to_cnc error: {e}")
        return None


def get_frame_to_cnc_matrix() -> Optional[np.ndarray]:
    """
    Hàm tương thích ngược trả về ma trận Homography cơ sở.
    """
    if not state.home_set:
        return None
    src_pts = [[360.0, 360.0]]
    dst_pts = [[0.0, 0.0]]
    aruco_cnc = getattr(state, "aruco_cnc_points", {}) or {}
    for c in ["TL", "TR", "BR", "BL"]:
        gpx = state.aruco_standard_points.get(c)
        gcx = aruco_cnc.get(c)
        if gpx and gcx:
            src_pts.append(gpx)
            dst_pts.append(gcx)
    if len(src_pts) < 3:
        return None
    try:
        src = np.array(src_pts, dtype=np.float32)
        dst = np.array(dst_pts, dtype=np.float32)
        H, _ = cv2.findHomography(src, dst)
        return H
    except Exception:
        return None


def pixel_to_cnc_v48(px: float, py: float) -> Optional[Tuple[float, float]]:
    """
    Cập nhật 48: Hàm tính chuyển pixel (frame chính 720×720) → tọa độ CNC (mm).

    Nguyên tắc:
    - Gốc tọa độ frame chính = frame_o (luôn là 360, 360)
    - X+ sang phải, Y+ xuống dưới
    - Phần tư 0: dx>=0, dy>=0  → dùng frame_br / cnc_br
    - Phần tư 1: dx<0,  dy>=0  → dùng frame_bl / cnc_bl
    - Phần tư 2: dx<0,  dy<0   → dùng frame_tl / cnc_tl
    - Phần tư 3: dx>=0, dy<0   → dùng frame_tr / cnc_tr

    Áp dụng công thức lượng giác tang góc:
    1. Tính khoảng cách r_px từ tâm frame_o tới target pixel
    2. Xác định góc phần tư để lấy corner calibration tương ứng
    3. Tính góc theta_frame của target dựa trên camera_height
    4. Tính tỷ lệ góc theta_cnc_corner / theta_frame_corner của corner
    5. Suy ra góc theta_cnc_target của target, từ đó tính khoảng cách thực tế r_cnc_target
    6. Tính hệ số bù trừ phi tuyến (Correction factor) C = r_cnc_target / r_cnc_linear
    7. Áp dụng C vào phép chiếu scale per-axis gốc để đảm bảo đầu góc khớp chính xác tuyệt đối
    """
    if not state.home_set:
        return None

    # Lấy gốc tọa độ frame và camera height
    fo = state.v48_frame_o
    co = state.v48_cnc_o
    h = getattr(state, "camera_height", 542.0)
    if h <= 0:
        h = 542.0

    fox, foy = float(fo.get("x", 360.0)), float(fo.get("y", 360.0))
    cox, coy = float(co.get("x", 0.0)),   float(co.get("y", 0.0))

    dx = px - fox   # dương = phải
    dy = py - foy   # dương = xuống

    r_px = math.sqrt(dx**2 + dy**2)
    if r_px < 1e-5:
        return cox, coy

    # Xác định phần tư và góc calibration tương ứng
    if dx >= 0 and dy >= 0:
        f_corner = state.v48_frame_br
        c_corner = state.v48_cnc_br
        quadrant = 0
    elif dx < 0 and dy >= 0:
        f_corner = state.v48_frame_bl
        c_corner = state.v48_cnc_bl
        quadrant = 1
    elif dx < 0 and dy < 0:
        f_corner = state.v48_frame_tl
        c_corner = state.v48_cnc_tl
        quadrant = 2
    else:  # dx >= 0 and dy < 0
        f_corner = state.v48_frame_tr
        c_corner = state.v48_cnc_tr
        quadrant = 3

    if f_corner is None or c_corner is None:
        logger.warning(f"[v48] pixel_to_cnc_v48: Chưa set góc calibration cho phần tư {quadrant}")
        return None

    # Vector pixel/cnc từ gốc tới góc calibration tương ứng
    fcx = float(f_corner.get("x", 0.0))
    fcy = float(f_corner.get("y", 0.0))
    ccx = float(c_corner.get("x", 0.0))
    ccy = float(c_corner.get("y", 0.0))

    fdx = fcx - fox
    fdy = fcy - foy
    cdx = ccx - cox
    cdy = ccy - coy

    r_px_corner = math.sqrt(fdx**2 + fdy**2)
    r_cnc_corner = math.sqrt(cdx**2 + cdy**2)

    if r_px_corner < 1e-5 or r_cnc_corner < 1e-5:
        logger.warning(f"[v48] pixel_to_cnc_v48: Góc calibration phần tư {quadrant} quá gần gốc tọa độ")
        return None

    # --- Công thức lượng giác tang góc thấu kính camera ---
    # 1. Góc nhìn vật lý từ camera tới manual corner (dùng tang góc)
    theta_c_corner = math.atan(r_cnc_corner / h)

    # 2. Nội suy góc nhìn vật lý cho target (phân bố tuyến tính theo khoảng cách pixel)
    theta_c_target = (r_px / r_px_corner) * theta_c_corner

    # 3. Tính khoảng cách CNC thực tế của target từ gốc tọa độ dựa vào tang góc target
    r_cnc_target = h * math.tan(theta_c_target)

    # 4. Tính hệ số bù trừ phi tuyến (do camera nhìn chéo khi ở rìa) so với mô hình tuyến tính
    r_cnc_linear = r_px * (r_cnc_corner / r_px_corner)
    C = r_cnc_target / r_cnc_linear if r_cnc_linear > 1e-5 else 1.0
    
    # 5. Tính scale per-axis cơ sở từ manual corner
    scale_x = cdx / fdx
    scale_y = cdy / fdy

    # 6. Tọa độ CNC tuyệt đối (work coordinate) đã được nhân hệ số hiệu chỉnh C
    cnc_x = cox + dx * scale_x * C
    cnc_y = coy + dy * scale_y * C

    logger.debug(
        f"[v48] Q{quadrant} px=({px:.1f},{py:.1f}) r_px={r_px:.1f} "
        f"theta_c_corner={math.degrees(theta_c_corner):.2f}° → theta_c_target={math.degrees(theta_c_target):.2f}° "
        f"C={C:.4f} → CNC=({cnc_x:.3f},{cnc_y:.3f})"
    )
    return float(cnc_x), float(cnc_y)


def _v48_save_last_pos(target_px: float, target_py: float, cnc_x: float, cnc_y: float):
    """Cập nhật 48: Lưu vị trí cuối cùng của CNC head vào state và file."""
    state.v48_frame_last = {"x": target_px, "y": target_py}
    state.v48_cnc_last   = {"x": cnc_x,     "y": cnc_y}
    save_calibration_settings({
        "frame_last": state.v48_frame_last,
        "cnc_last":   state.v48_cnc_last,
    })


# ONNX Detection Helper Functions (cập nhật 3)
def get_ort_session(forceload=False):
    if forceload ==True:
        state.ort_session=None
        pass
    if state.ort_session is None:
        model_path = "/work/a.i-assistant-chatbot-telegram-serverles/cnc/aimodels/tiny/best.onnx" 
        print("model_path",model_path)
        if os.path.exists(model_path):
            try:
                logger.info(f"Loading ONNX model from {model_path}...")
                state.ort_session = ort.InferenceSession(model_path, providers=['CPUExecutionProvider'])
                logger.info("ONNX model loaded successfully.")
                
                # Load class names from model metadata (cập nhật 6)
                try:
                    meta = state.ort_session.get_modelmeta()
                    if "names" in meta.custom_metadata_map:
                        import ast
                        state.class_names = ast.literal_eval(meta.custom_metadata_map["names"])
                        logger.info(f"Loaded class names from metadata: {state.class_names}")
                except Exception as e:
                    logger.warning(f"Could not load class names from metadata: {e}")
            except Exception as e:
                logger.error(f"Error loading ONNX model: {e}")
        else:
            logger.error(f"Model file not found at: {model_path}")
    return state.ort_session

def letterbox(img, new_shape=(640, 640), color=(114, 114, 114)):
    """Resizes and pads image while keeping aspect ratio."""
    shape = img.shape[:2]  # current shape [height, width]
    if isinstance(new_shape, int):
        new_shape = (new_shape, new_shape)

    # Scale ratio (new / old)
    r = min(new_shape[0] / shape[0], new_shape[1] / shape[1])

    # Compute padding
    new_unpad = int(round(shape[1] * r)), int(round(shape[0] * r))
    dw, dh = new_shape[1] - new_unpad[0], new_shape[0] - new_unpad[1]  # wh padding

    dw /= 2  # divide padding into 2 sides
    dh /= 2

    if shape[::-1] != new_unpad:  # resize
        img = cv2.resize(img, new_unpad, interpolation=cv2.INTER_LINEAR)
    top, bottom = int(round(dh - 0.1)), int(round(dh + 0.1))
    left, right = int(round(dw - 0.1)), int(round(dw + 0.1))
    img = cv2.copyMakeBorder(img, top, bottom, left, right, cv2.BORDER_CONSTANT, value=color)  # add border
    return img, r, (dw, dh)


def run_object_detection(frame, conf_threshold=0.25, iou_threshold=0.45):
    session = get_ort_session()
    if session is None:
        return []

    # Get model inputs
    inputs = session.get_inputs()
    input_name = inputs[0].name
    input_shape = inputs[0].shape
    img_h, img_w = input_shape[2], input_shape[3]

    # Convert original image to 3-channel grayscale for inference (to prevent color bias, matching update 1 in cameraip whattodo)
    gray_img = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    gray_3ch = cv2.cvtColor(gray_img, cv2.COLOR_GRAY2BGR)

    # Preprocess image with letterbox
    pad_img, r, (dw, dh) = letterbox(gray_3ch, (img_h, img_w))
    
    # Convert BGR to RGB
    rgb_img = cv2.cvtColor(pad_img, cv2.COLOR_BGR2RGB)
    
    # Normalize and transpose
    blob = rgb_img.astype(np.float32) / 255.0
    blob = np.transpose(blob, (2, 0, 1))
    blob = np.expand_dims(blob, axis=0)

    # Run inference
    try:
        outputs = session.run(None, {input_name: blob})
    except Exception as e:
        logger.error(f"ONNX session run failed: {e}")
        return []
        
    raw_output = outputs[0][0]  # Get output for batch 0
    
    boxes = []
    confidences = []
    class_ids = []

    # Format 1: YOLO26 / End-to-End models with shape [max_detections, 6]
    if len(raw_output.shape) == 2 and raw_output.shape[1] == 6:
        for row in raw_output:
            confidence = float(row[4])
            if confidence > conf_threshold:
                x1, y1, x2, y2 = row[:4]
                w = x2 - x1
                h = y2 - y1
                boxes.append([float(x1), float(y1), float(w), float(h)])
                confidences.append(confidence)
                class_ids.append(int(row[5]))
    # Format 2: YOLOv8 / YOLO11 models with shape [4 + num_classes, num_anchors]
    else:
        output = np.transpose(raw_output)
        for row in output:
            scores = row[4:]
            class_id = np.argmax(scores)
            confidence = float(scores[class_id])
            if confidence > conf_threshold:
                xc, yc, w, h = row[:4]
                x1 = xc - w / 2
                y1 = yc - h / 2
                boxes.append([float(x1), float(y1), float(w), float(h)])
                confidences.append(confidence)
                class_ids.append(int(class_id))

    # Apply NMS
    indices = cv2.dnn.NMSBoxes(boxes, confidences, conf_threshold, iou_threshold)
    
    detections = []
    if len(indices) > 0:
        indices = indices.flatten() if hasattr(indices, 'flatten') else [i[0] if isinstance(i, (list, tuple, np.ndarray)) else i for i in indices]
        for i in indices:
            box = boxes[i]
            conf = confidences[i]
            cid = class_ids[i]
            
            # Remove padding and rescale to original coordinates
            x1 = (box[0] - dw) / r
            y1 = (box[1] - dh) / r
            w_box = box[2] / r
            h_box = box[3] / r
            
            # Map box to pixel coordinates
            ix1 = max(0, int(round(x1)))
            iy1 = max(0, int(round(y1)))
            ix2 = min(frame.shape[1], int(round(x1 + w_box)))
            iy2 = min(frame.shape[0], int(round(y1 + h_box)))
            
            cx = (ix1 + ix2) / 2.0
            cy = (iy1 + iy2) / 2.0
            area = (ix2 - ix1) * (iy2 - iy1)
            
            detections.append({
                "class_id": cid,
                "confidence": conf,
                "bbox": [ix1, iy1, ix2, iy2],
                "center": [cx, cy],
                "area": area
            })
            
    return detections

class CameraManager:
    def __init__(self):
        self.lock = threading.Lock()
        self.caps = {}
        self.latest_frames = {}
        self.latest_raw_frames = {} 
        self.latest_uncropped_frames = {}
        self.active_clients = {}
        self.threads = {}
        self.running = {}
        
        # cập nhật 9+10: shared results per camera (protected by self.lock)
        self.aruco_latest = {}
        self.smoothed_aruco_markers = {}  # cập nhật 12: EMA smoothed markers per camera
        self.aruco_latest_time = {}
        self.aruco_history = {}
        self.yolo_latest = {}
        self.yolo_latest_time = {}
        self.yolo_history = {}
        self.YOLO_CLEAR_TIMEOUT = 5.0

    def get_raw_frame(self, index: int) -> Optional[np.ndarray]:
        with self.lock:
            if index in self.latest_raw_frames:
                return self.latest_raw_frames[index].copy()
            return None

    def get_uncropped_frame(self, index: int) -> Optional[np.ndarray]:
        with self.lock:
            if index in self.latest_uncropped_frames:
                return self.latest_uncropped_frames[index].copy()
            return None

    def start_camera(self, index: int):
        with self.lock:
            if index in self.running and self.running[index]:
                return
            self.running[index] = True
            self.active_clients[index] = 0
            
            # Initialize camera history / state buffers
            self.aruco_latest[index] = {}
            self.aruco_latest_time[index] = {}
            self.aruco_history[index] = {name: deque(maxlen=500) for name in ["TL", "TR", "BL", "BR"]}
            self.yolo_latest[index] = []
            self.yolo_latest_time[index] = 0.0
            self.yolo_history[index] = deque(maxlen=500)
            
            # Start the 4 separate threads
            t_capture = threading.Thread(target=self._capture_loop, args=(index,), daemon=True)
            t_aruco = threading.Thread(target=self._aruco_loop, args=(index,), daemon=True)
            t_yolo = threading.Thread(target=self._yolo_loop, args=(index,), daemon=True)
            t_draw = threading.Thread(target=self._draw_loop, args=(index,), daemon=True)
            
            self.threads[index] = {
                "capture": t_capture,
                "aruco":   t_aruco,
                "yolo":    t_yolo,
                "draw":    t_draw,
            }
            
            t_capture.start()
            t_aruco.start()
            t_yolo.start()
            t_draw.start()
            logger.info(f"Started 4 camera threads for index {index}")

    def stop_camera(self, index: int):
        with self.lock:
            self.running[index] = False
        logger.info(f"Requested stop for camera index {index}")

    # ── Thread 1: capture ────────────────────────────────────────────────────
    def _capture_loop(self, index: int):
        logger.info(f"[Capture] Opening camera index {index}…")
        cap = cv2.VideoCapture(index)
        if not cap.isOpened():
            logger.error(f"[Capture] Failed to open camera index {index}")
            with self.lock:
                self.running[index] = False
            return

        with self.lock:
            self.caps[index] = cap

        # cập nhật 10: 1280x720 camera frame
        cap.set(cv2.CAP_PROP_FRAME_WIDTH,  1280)
        cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)
        actual_w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        actual_h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        logger.info(f"[Capture] Camera {index} opened ({actual_w}×{actual_h})")

        consecutive_failures = 0
        while True:
            with self.lock:
                if not self.running.get(index, False):
                    break
            try:
                ret, frame = cap.read()
                if not ret or frame is None:
                    consecutive_failures += 1
                    if consecutive_failures > 30:
                        logger.error(f"[Capture] Too many failures on camera {index}. Stopping.")
                        break
                    time.sleep(0.03)
                    continue

                consecutive_failures = 0

                with self.lock:
                    self.latest_uncropped_frames[index] = frame.copy()

                # cập nhật 10: crop frame về 720x720 lấy vùng giữa frame
                fh, fw = frame.shape[:2]
                if fh >= 720 and fw >= 720:
                    y_start = (fh - 720) // 2
                    x_start = (fw - 720) // 2
                    frame = frame[y_start:y_start+720, x_start:x_start+720]
                else:
                    crop_size = min(fh, fw)
                    y_start = (fh - crop_size) // 2
                    x_start = (fw - crop_size) // 2
                    frame = frame[y_start:y_start+crop_size, x_start:x_start+crop_size]

                with self.lock:
                    self.latest_raw_frames[index] = frame  # no copy – draw thread will copy
                time.sleep(0.033)
            except Exception as e:
                logger.error(f"[Capture] Error camera {index}: {e}")
                time.sleep(0.1)

        logger.info(f"[Capture] Releasing camera {index}…")
        try:
            cap.release()
        except Exception as e:
            logger.error(f"[Capture] Error releasing camera {index}: {e}")

        with self.lock:
            self.running[index] = False
            self.caps.pop(index, None)
            self.latest_raw_frames.pop(index, None)
            self.latest_uncropped_frames.pop(index, None)
            self.latest_frames.pop(index, None)
        logger.info(f"[Capture] Camera {index} released.")

    # ── Thread 2: ArUco detection ─────────────────────────────────────────────
    _clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))

    def _detect_aruco_fullframe(self, gray_full, aruco_dict, parameters, use_new_api,
                                  cx_frame: int, cy_frame: int):
        found = {}   # corner_name -> (center, area)
        scales = [1.0, 0.75, 1.5]
        for scale in scales:
            if scale != 1.0:
                resized = cv2.resize(gray_full, (0, 0), fx=scale, fy=scale,
                                     interpolation=cv2.INTER_LINEAR)
            else:
                resized = gray_full

            win_min = max(3, int(15 * scale)) | 1
            win_max = max(win_min + 2, int(75 * scale)) | 1
            parameters.adaptiveThreshWinSizeMin = win_min
            parameters.adaptiveThreshWinSizeStep = max(2, int(10 * scale))
            parameters.adaptiveThreshWinSizeMax = win_max
            parameters.adaptiveThreshConstant = 7
            parameters.minMarkerPerimeterRate = 0.01 / max(scale, 0.5)
            parameters.maxMarkerPerimeterRate = 4.0
            parameters.polygonalApproxAccuracyRate = 0.04
            parameters.minCornerDistanceRate = 0.05
            parameters.minDistanceToBorder = 3
            parameters.perspectiveRemovePixelPerCell = 8
            parameters.perspectiveRemoveIgnoredMarginPerCell = 0.13
            parameters.errorCorrectionRate = 0.6

            try:
                if use_new_api:
                    try:
                        detector = cv2.aruco.ArucoDetector(aruco_dict, parameters)
                        corners, ids, _ = detector.detectMarkers(resized)
                    except Exception:
                        corners, ids, _ = cv2.aruco.detectMarkers(
                            resized, aruco_dict, parameters=parameters)
                else:
                    corners, ids, _ = cv2.aruco.detectMarkers(
                        resized, aruco_dict, parameters=parameters)
            except Exception:
                continue

            if ids is not None and len(ids) > 0:
                for i in range(len(ids)):
                    pts_resized = corners[i][0]
                    pts_orig    = pts_resized / scale
                    center = np.mean(pts_orig, axis=0)
                    area   = cv2.contourArea(pts_orig.reshape(-1, 1, 2).astype(np.float32))

                    cx_m, cy_m = float(center[0]), float(center[1])
                    if cx_m < cx_frame:
                        name = "TL" if cy_m < cy_frame else "BL"
                    else:
                        name = "TR" if cy_m < cy_frame else "BR"

                    if name not in found or area > found[name][1]:
                        found[name] = (center, area)
                break

        return {name: data[0].tolist() for name, data in found.items()}

    def _aruco_loop(self, index: int):
        logger.info(f"[ArUco] Thread started for camera {index} (dynamic detection disabled - cập nhật 19)")
        while True:
            with self.lock:
                if not self.running.get(index, False):
                    break
            time.sleep(0.5)
        logger.info(f"[ArUco] Thread stopped for camera {index}")

    # ── Thread 3: YOLO object detection ──────────────────────────────────────
    def _yolo_loop(self, index: int):
        logger.info(f"[YOLO] Thread started for camera {index}")

        while True:
            with self.lock:
                if not self.running.get(index, False):
                    break
                raw = self.latest_raw_frames.get(index)

            if raw is None:
                time.sleep(0.1)
                continue

            frame = raw.copy()
            now = time.time()
            try:
                detections = run_object_detection(frame)
            except Exception as e:
                logger.error(f"[YOLO] Detection error camera {index}: {e}")
                detections = []

            with self.lock:
                if detections:
                    for d in detections:
                        d["time"] = now
                    self.yolo_latest[index] = detections
                    self.yolo_latest_time[index] = now
                    self.yolo_history[index].append({"detections": detections, "time": now})
                    state.latest_yolo_detections = detections
                    state.latest_yolo_detection_time = now
                    state.yolo_history.append({"detections": detections, "time": now})
                    sittng_dets = [d for d in detections if state.class_names.get(d["class_id"], "") == "sittng"]
                    if sittng_dets:
                        largest = max(sittng_dets, key=lambda d: d["area"])
                        state.last_largest_object_info = largest
                        state.last_largest_object_time = now
                    else:
                        if now - state.last_largest_object_time > self.YOLO_CLEAR_TIMEOUT:
                            state.last_largest_object_info = None
                else:
                    elapsed = now - self.yolo_latest_time.get(index, 0.0)
                    if elapsed > self.YOLO_CLEAR_TIMEOUT:
                        self.yolo_latest[index] = []
                        state.last_largest_object_info = None
                        state.latest_yolo_detections = []

            time.sleep(0.20)

        logger.info(f"[YOLO] Thread stopped for camera {index}")

    # ── Thread 4: Draw / UI frame composer ───────────────────────────────────
    def _draw_loop(self, index: int):
        logger.info(f"[Draw] Thread started for camera {index}")

        while True:
            with self.lock:
                if not self.running.get(index, False):
                    break
                raw = self.latest_raw_frames.get(index)
                draw_overlay = state.draw_overlay
                detect_draw  = state.detect_objects
                aruco_pts = dict(self.aruco_latest.get(index, {}))
                yolo_dets = list(self.yolo_latest.get(index, [])) if detect_draw else []

            if raw is None:
                time.sleep(0.033)
                continue

            frame = raw.copy()

            # ── Cập nhật 46: Luôn vẽ trục tọa độ làm việc tại tâm frame (360, 360) ──
            # Gốc tọa độ = tâm frame chính; X+ = phải; Y+ = xuống dưới
            try:
                h_f, w_f = frame.shape[:2]
                cx_frame = w_f // 2  # 360
                cy_frame = h_f // 2  # 360
                # Đường X (ngang) — màu cyan nhạt
                cv2.line(frame, (0, cy_frame), (w_f - 1, cy_frame), (180, 180, 0), 1)
                # Đường Y (dọc) — màu magenta nhạt
                cv2.line(frame, (cx_frame, 0), (cx_frame, h_f - 1), (180, 0, 180), 1)
                # Chấm tròn tại gốc tọa độ
                cv2.circle(frame, (cx_frame, cy_frame), 5, (255, 255, 255), -1)
                # Nhãn x+ ở bên phải
                cv2.putText(frame, "x+", (w_f - 40, cy_frame - 6),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 0), 1, cv2.LINE_AA)
                # Nhãn y+ ở bên dưới
                cv2.putText(frame, "y+", (cx_frame + 6, h_f - 6),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 255), 1, cv2.LINE_AA)
                # Nhãn (0,0) tại gốc
                cv2.putText(frame, "(0,0)", (cx_frame + 7, cy_frame - 7),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.45, (200, 200, 200), 1, cv2.LINE_AA)
            except Exception as e:
                logger.error(f"[Draw] Coordinate axes error camera {index}: {e}")

            if draw_overlay:
                try:
                    # ── Draw actively/live detected ArUco markers (faded) ──────────────────────────────
                    for name, pt in aruco_pts.items():
                        if pt is None:
                            continue
                        pt_int = (int(pt[0]), int(pt[1]))
                        # Faded orange/red color: (80, 80, 150), thickness 1
                        cv2.circle(frame, pt_int, 4, (80, 80, 150), -1)
                        cv2.putText(frame, name, (pt_int[0] + 8, pt_int[1] + 8),
                                    cv2.FONT_HERSHEY_SIMPLEX, 0.4, (120, 120, 120), 1)

                    # Draw connecting lines for live corners (faded)
                    live_four = all(aruco_pts.get(c) is not None for c in ["TL", "TR", "BR", "BL"])
                    if live_four:
                        live_pts = {name: (int(aruco_pts[name][0]), int(aruco_pts[name][1]))
                                    for name in ["TL", "TR", "BR", "BL"]}
                        # Faded grey/green box
                        cv2.line(frame, live_pts["TL"], live_pts["TR"], (120, 150, 120), 1)
                        cv2.line(frame, live_pts["TR"], live_pts["BR"], (120, 150, 120), 1)
                        cv2.line(frame, live_pts["BR"], live_pts["BL"], (120, 150, 120), 1)
                        cv2.line(frame, live_pts["BL"], live_pts["TL"], (120, 150, 120), 1)

                    # Draw manually set/standard ArUco standard points (cập nhật 13)
                    if state.aruco_standard_points:
                        for name, pt in state.aruco_standard_points.items():
                            if pt is not None:
                                pt_int = (int(pt[0]), int(pt[1]))
                                cv2.circle(frame, pt_int, 6, (0, 140, 255), -1)
                                cv2.putText(frame, f"{name} (manual)", (pt_int[0] + 8, pt_int[1] - 8),
                                            cv2.FONT_HERSHEY_SIMPLEX, 0.4, (0, 140, 255), 1)

                    # Draw manually set touch pen position (cập nhật 42)
                    if getattr(state, "touch_pen_pixel", None) is not None:
                        pt_int = (int(state.touch_pen_pixel[0]), int(state.touch_pen_pixel[1]))
                        cv2.circle(frame, pt_int, 6, (255, 0, 255), -1)
                        cv2.putText(frame, "Touch Pen", (pt_int[0] + 8, pt_int[1] - 8),
                                    cv2.FONT_HERSHEY_SIMPLEX, 0.4, (255, 0, 255), 1)

                    # ── Draw standard ArUco coordinate system (bright) ──────────────────────────────
                    # Primary choice: state.aruco_standard_points
                    # Fallback choice: aruco_pts if standard is not set yet
                    std_pts_source = state.aruco_standard_points if (state.aruco_standard_points and len(state.aruco_standard_points) == 4) else None
                    if std_pts_source is None and live_four:
                        std_pts_source = aruco_pts

                    if std_pts_source and all(std_pts_source.get(c) is not None for c in ["TL", "TR", "BR", "BL"]):
                        std_pts = {name: (int(std_pts_source[name][0]), int(std_pts_source[name][1]))
                                   for name in ["TL", "TR", "BR", "BL"]}

                        # Bright green rectangle for standard boundaries
                        cv2.line(frame, std_pts["TL"], std_pts["TR"], (0, 255, 0), 2)
                        cv2.line(frame, std_pts["TR"], std_pts["BR"], (0, 255, 0), 2)
                        cv2.line(frame, std_pts["BR"], std_pts["BL"], (0, 255, 0), 2)
                        cv2.line(frame, std_pts["BL"], std_pts["TL"], (0, 255, 0), 2)

                        # # Centre (blue dot)
                        # cx = (std_pts["TL"][0] + std_pts["TR"][0] + std_pts["BR"][0] + std_pts["BL"][0]) // 4
                        # cy = (std_pts["TL"][1] + std_pts["TR"][1] + std_pts["BR"][1] + std_pts["BL"][1]) // 4
                        # cv2.circle(frame, (cx, cy), 8, (255, 0, 0), -1)
                        # cv2.putText(frame, "(0,0)", (cx + 15, cy + 5),
                        #             cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 0, 0), 2)

                        # # Midpoints
                        # mid_left = ((std_pts["TL"][0] + std_pts["BL"][0]) // 2, (std_pts["TL"][1] + std_pts["BL"][1]) // 2)
                        # mid_right = ((std_pts["TR"][0] + std_pts["BR"][0]) // 2, (std_pts["TR"][1] + std_pts["BR"][1]) // 2)
                        # mid_top = ((std_pts["TL"][0] + std_pts["TR"][0]) // 2, (std_pts["TL"][1] + std_pts["TR"][1]) // 2)
                        # mid_bot = ((std_pts["BL"][0] + std_pts["BR"][0]) // 2, (std_pts["BL"][1] + std_pts["BR"][1]) // 2)

                        # # X-axis: cyan line from Left Midpoint to Right Midpoint
                        # cv2.line(frame, mid_left, mid_right, (255, 255, 0), 2)
                        # # Put text x+ at right midpoint
                        # cv2.putText(frame, "x+", (mid_right[0] + 8, mid_right[1] + 5),
                        #             cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 0), 2)

                        # # Y-axis: magenta line from Top Midpoint to Bottom Midpoint
                        # cv2.line(frame, mid_top, mid_bot, (255, 0, 255), 2)
                        # # Put text y+ at bottom midpoint
                        # cv2.putText(frame, "y+", (mid_bot[0] - 10, mid_bot[1] + 20),
                        #             cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 0, 255), 2)

                except Exception as e:
                    logger.error(f"[Draw] ArUco overlay error camera {index}: {e}")

                # ── Draw YOLO detections ────────────────────────────────
                if yolo_dets:
                    try:
                        # Map current GRBL position to pixel coordinates
                        M_adj = get_adjusted_calibration_matrix()
                        pen_px = None
                        if M_adj is not None:
                            try:
                                M = np.array(M_adj, dtype=np.float32)
                                M_inv = np.linalg.inv(M)
                                wpos_vec = np.array([state.wpos[0], state.wpos[1], 1.0], dtype=np.float32)
                                px_vec = np.dot(M_inv, wpos_vec)
                                if abs(px_vec[2]) > 1e-5:
                                    px = px_vec[0] / px_vec[2]
                                    py = px_vec[1] / px_vec[2]
                                    pen_px = (int(round(px)), int(round(py)))
                            except Exception as e:
                                logger.error(f"Error calculating pen pixel coordinates: {e}")

                        # Draw a small crosshair for the current pen position if mapped
                        if pen_px is not None:
                            cv2.drawMarker(frame, pen_px, (255, 128, 0), markerType=cv2.MARKER_CROSS, markerSize=14, thickness=2)

                        colors = [(0, 0, 255), (0, 255, 0), (255, 0, 0), (0, 255, 255)]
                        for d in yolo_dets:
                            ix1, iy1, ix2, iy2 = d["bbox"]
                            cid  = d["class_id"]
                            conf = d["confidence"]
                            class_name = state.class_names.get(cid, f"Obj {cid}")
                            
                            is_cnchead = (class_name == "cnchead")
                            in_range = True
                            if is_cnchead:
                                if pen_px is not None:
                                    px, py = pen_px
                                    in_range = (ix1 <= px <= ix2) and (iy1 <= py <= iy2)
                                else:
                                    in_range = False
                            
                            color = (0, 0, 255) if (is_cnchead and not in_range) else colors[cid % len(colors)]
                            
                            cv2.rectangle(frame, (ix1, iy1), (ix2, iy2), color, 2)
                            dcx, dcy = d["center"]
                            cv2.circle(frame, (int(dcx), int(dcy)), 4, color, -1)
                            
                            label = f"{class_name}: {conf:.2f}"
                            if is_cnchead and not in_range:
                                label += " (not in range)"
                                
                            label_sz, base_line = cv2.getTextSize(
                                label, cv2.FONT_HERSHEY_SIMPLEX, 0.5, 1)
                            iy1_text = max(iy1, label_sz[1] + 5)
                            cv2.rectangle(frame,
                                          (ix1, iy1_text - label_sz[1] - 5),
                                          (ix1 + label_sz[0], iy1_text + base_line - 5),
                                          color, -1)
                            cv2.putText(frame, label, (ix1, iy1_text - 5),
                                        cv2.FONT_HERSHEY_SIMPLEX, 0.5,
                                        (0, 0, 0), 1, cv2.LINE_AA)
                                        
                            if is_cnchead and not in_range:
                                cv2.putText(frame, "not in range", (ix1, iy2 + 20),
                                            cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 255), 2, cv2.LINE_AA)
                    except Exception as e:
                        logger.error(f"[Draw] YOLO overlay error camera {index}: {e}")

            # Encode JPEG
            try:
                _, jpeg = cv2.imencode('.jpg', frame, [cv2.IMWRITE_JPEG_QUALITY, 70])
                with self.lock:
                    self.latest_frames[index] = jpeg.tobytes()
            except Exception as e:
                logger.error(f"[Draw] JPEG encode error camera {index}: {e}")

            time.sleep(0.033)

        logger.info(f"[Draw] Thread stopped for camera {index}")

    def get_frame(self, index: int) -> bytes:
        with self.lock:
            return self.latest_frames.get(index, b"")

camera_manager = CameraManager()

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
    return ""

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
                parts = [float(x) for x in val.split(",")]
                # Do not invert Y coordinate (cập nhật 20 - sửa lại)
                state.wpos = parts
                # Calculate MPos if we have WCO
                state.mpos = [w + o for w, o in zip(state.wpos, state.wco)]
            elif key == "MPos":
                parts = [float(x) for x in val.split(",")]
                # Do not invert Y coordinate (cập nhật 20 - sửa lại)
                state.mpos = parts
                # Calculate WPos if we have WCO
                state.wpos = [m - o for m, o in zip(state.mpos, state.wco)]
            elif key == "WCO":
                parts = [float(x) for x in val.split(",")]
                # Do not invert Y coordinate (cập nhật 20 - sửa lại)
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
                        if state.sent_buffer_lengths:
                            # Acknowledge line
                            state.sent_buffer_lengths.pop(0)
                            # Notify streaming task to send more lines
                            # We can trigger checking queue
                            if state.stream_task:
                                # We wake up stream_task or it checks dynamically
                                pass

                        # --- KÍCH HOẠT SỰ KIỆN CHO CÁC HÀM ĐANG ĐỢI ---
                        state.grbl_ack_event.set()

            else:
                await asyncio.sleep(0.01)
        except Exception as e:
            logger.error(f"Error in serial reader: {e}")
            state.connected = False
            await broadcast({"type": "connection", "connected": False, "message": f"Connection lost: {e}"})
            break
        
async def wait_for_ok(timeout=1.0):
    """
    Đợi luồng đọc nền nhận được 'ok' hoặc 'error' từ GRBL mà không gây xung đột cổng Serial.
    """
    # 1. Xóa trạng thái của chuông về vô hiệu (chuẩn bị đợi)
    state.grbl_ack_event.clear()
    
    try:
        # 2. Ngồi đợi chuông reo hoặc hết thời gian timeout
        await asyncio.wait_for(state.grbl_ack_event.wait(), timeout=timeout)
        return True
    except asyncio.TimeoutError:
        # Quá thời gian chờ mà luồng nền chưa nhận được ok
        return False
        
# Auto Query Loop
async def status_polling_loop():
    last_save_time = time.time()
    while state.connected and state.serial_port:
        try:
            # Send '?' to poll GRBL status
            state.serial_port.write(b"?")
            state.serial_port.flush()
        except Exception as e:
            logger.error(f"Error writing status poll: {e}")
            
        # Periodically save current pen position (every 3 seconds if changed)
        now = time.time()
        if now - last_save_time > 3.0:
            try:
                if getattr(state, "wpos", None) and state.wpos != getattr(state, "saved_pen_position", [0.0, 0.0, 0.0]):
                    state.saved_pen_position = list(state.wpos)
                    state.saved_mpos = list(state.mpos)
                    save_calibration_settings({
                        "saved_pen_position": state.saved_pen_position,
                        "saved_mpos": state.saved_mpos
                    })
            except Exception as e:
                logger.error(f"Failed to auto-save pen position: {e}")
            last_save_time = now
            
        await asyncio.sleep(0.2) # Poll every 200ms

async def send_telemetry():
    """Send current machine state & coordinates to clients."""
    M_adj = get_adjusted_calibration_matrix()
    pen_px = None
    if M_adj is not None:
        try:
            M = np.array(M_adj, dtype=np.float32)
            M_inv = np.linalg.inv(M)
            wpos_vec = np.array([state.wpos[0], state.wpos[1], 1.0], dtype=np.float32)
            px_vec = np.dot(M_inv, wpos_vec)
            if abs(px_vec[2]) > 1e-5:
                px = px_vec[0] / px_vec[2]
                py = px_vec[1] / px_vec[2]
                pen_px = [float(px), float(py)]
        except Exception:
            pass

    await broadcast({
        "type": "telemetry",
        "state": state.machine_state,
        "mpos": state.mpos,
        "wpos": state.wpos,
        "pen_px": pen_px,
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
            
            # Send stop and reset command (Ctrl-X) to clear buffer automatically
            if state.connected and state.serial_port:
                try:
                    logger.info("Stream completed. Automatically resetting and clearing GRBL buffer...")
                    state.serial_port.write(b"\x18")
                    state.serial_port.flush()
                    
                    # Auto-unlock after reset to clear Alarm lock
                    await asyncio.sleep(1.5)
                    logger.info("Automatically unlocking GRBL from Alarm lock after completed reset...")
                    state.serial_port.write(b"$X\n")
                    state.serial_port.flush()
                except Exception as e:
                    logger.error(f"Error resetting GRBL on stream completion: {e}")
                    
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
# Mock Serial for Testing (cập nhật 3)
class DummySerial:
    def __init__(self):
        self.in_waiting = 0
    def write(self, data: bytes):
        cmd = data.decode('utf-8', errors='ignore').strip()
        logger.info(f"[DUMMY SERIAL WRITE] {cmd}")
        try:
            if cmd.startswith("G92") or cmd.startswith("G0") or cmd.startswith("G1"):
                for axis in ["X", "Y", "Z"]:
                    match = re.search(rf"{axis}([-+]?[0-9]*\.?[0-9]+)", cmd, re.IGNORECASE)
                    if match:
                        val = float(match.group(1))
                        # Do not invert Y coordinate (cập nhật 20 - sửa lại)
                        idx = {"X": 0, "Y": 1, "Z": 2}[axis]
                        state.wpos[idx] = val
                        state.mpos[idx] = val
                import asyncio
                asyncio.create_task(send_telemetry())
        except Exception as e:
            logger.error(f"[Dummy Serial] Simulation error: {e}")
    def read(self, size: int) -> bytes:
        return b""
    def flush(self):
        pass
    def close(self):
        pass

async def realign_cnc_coordinates_on_startup():
    """
    Called upon startup / serial connection.
    Recalculates the CNC coordinate offset so that it aligns correctly relative to the saved home,
    based on the last known position (state.saved_pen_position) or live camera detection.
    """
    await asyncio.sleep(2.0) # Wait for serial loops to initialize
    
    if not state.connected or not state.serial_port:
        return
        
    if not state.home_set:
        logger.info("Startup coordinate alignment: No home is set yet. Skipping.")
        return

    logger.info("Startup coordinate alignment: Homing reference exists. Calculating head position...")

    x_cnc = None
    y_cnc = None
    z_cnc = None
    aligned_via_mpos = False

    # 1. Cập nhật 44: Thử khôi phục qua mechanical offset từ home_mpos và saved_mpos (chính xác tuyệt đối)
    if getattr(state, "home_mpos", None) is not None and getattr(state, "saved_mpos", None) is not None:
        try:
            x_cnc = state.saved_mpos[0] - state.home_mpos[0]
            y_cnc = state.saved_mpos[1] - state.home_mpos[1]
            z_cnc = state.saved_mpos[2] - state.home_mpos[2]
            aligned_via_mpos = True
            logger.info(f"Startup coordinate alignment [Calib44]: Aligned via mechanical saved mpos offset relative to home: X={x_cnc:.3f}, Y={y_cnc:.3f}, Z={z_cnc:.3f}")
        except Exception as e:
            logger.error(f"Startup coordinate alignment [Calib44]: Error calculating mechanical offset: {e}")

    aligned_via_camera = False
    if not aligned_via_mpos:
        # Start camera 4 to capture frame and run YOLO detections (cập nhật 37)
        camera_index = 4
        camera_manager.start_camera(camera_index)

        # Poll for YOLO detections for up to 5 seconds
        cnchead_px = None
        for _ in range(25):
            if not state.connected:
                break
            if state.latest_yolo_detections:
                for d in state.latest_yolo_detections:
                    if state.class_names.get(d["class_id"]) == "cnchead":
                        cnchead_px = d["center"]
                        break
            if cnchead_px is not None:
                break
            await asyncio.sleep(0.2)

        if cnchead_px is not None and state.latest_detected_markers and len(state.latest_detected_markers) >= 3:
            try:
                aligned_pnp = False
                # Thử tính bằng PnP và Height nếu đủ marker
                if len(state.latest_detected_markers) >= 4 and len(state.home_markers) >= 4:
                    try:
                        head_proj = project_pixel_to_cnc_for_frame(cnchead_px[0], cnchead_px[1], state.latest_detected_markers)
                        home_proj = project_pixel_to_cnc_for_frame(state.home_pixel[0], state.home_pixel[1], state.home_markers)
                        if head_proj is not None and home_proj is not None:
                            # Cập nhật 45: PnP đã đảo dấu X,Y nên khoảng lệch tính trực tiếp là đúng
                            x_cnc = head_proj[0] - home_proj[0]
                            y_cnc = head_proj[1] - home_proj[1]
                            aligned_via_camera = True
                            aligned_pnp = True
                            logger.info(f"Startup coordinate alignment [Calib45 PnP & Height]: Mapped via PnP: X={x_cnc:.3f}, Y={y_cnc:.3f}")
                    except Exception as ePnP:
                        logger.warning(f"Startup alignment via PnP failed: {ePnP}. Falling back to homography.")

                if not aligned_pnp:
                    import numpy as np
                    import cv2
                    
                    # Get homography matrix for current frame
                    common_corners = [c for c in ["TL", "TR", "BR", "BL"] if c in state.latest_detected_markers]
                    src_pts = np.array([state.latest_detected_markers[c] for c in common_corners], dtype=np.float32)
                    dst_pts = np.array([[-100.0, 75.0] if c=="TL" else [100.0, 75.0] if c=="TR" else [100.0, -75.0] if c=="BR" else [-100.0, -75.0] for c in common_corners], dtype=np.float32)
                    
                    if len(common_corners) == 3:
                        H_curr_aff, _ = cv2.estimateAffine2D(src_pts, dst_pts)
                        H_curr = np.vstack([H_curr_aff, [0.0, 0.0, 1.0]])
                    else:
                        H_curr, _ = cv2.findHomography(src_pts, dst_pts)
                        
                    # Current head in BCS
                    px_vec = np.array([cnchead_px[0], cnchead_px[1], 1.0], dtype=np.float32)
                    bed_head = np.dot(H_curr, px_vec)
                    x_head_bed = bed_head[0] / bed_head[2]
                    y_head_bed = bed_head[1] / bed_head[2]
                    
                    # Saved home in BCS
                    home_corners = [c for c in ["TL", "TR", "BR", "BL"] if c in state.home_markers]
                    if len(home_corners) >= 3:
                        src_home = np.array([state.home_markers[c] for c in home_corners], dtype=np.float32)
                        dst_home = np.array([[-100.0, 75.0] if c=="TL" else [100.0, 75.0] if c=="TR" else [100.0, -75.0] if c=="BR" else [-100.0, -75.0] for c in home_corners], dtype=np.float32)
                        
                        if len(home_corners) == 3:
                            H_home_aff, _ = cv2.estimateAffine2D(src_home, dst_home)
                            H_home = np.vstack([H_home_aff, [0.0, 0.0, 1.0]])
                        else:
                            H_home, _ = cv2.findHomography(src_home, dst_home)
                            
                        px_home_vec = np.array([state.home_pixel[0], state.home_pixel[1], 1.0], dtype=np.float32)
                        bed_home = np.dot(H_home, px_home_vec)
                        x_home_bed = bed_home[0] / bed_home[2]
                        y_home_bed = bed_home[1] / bed_home[2]
                        
                        # Cập nhật 45: đảo dấu cả X và Y (đồng nhất với PnP path)
                        x_cnc = -(x_head_bed - x_home_bed)
                        y_cnc = -(y_head_bed - y_home_bed)
                        aligned_via_camera = True
                        logger.info(f"Startup coordinate alignment [Calib45 Homography Fallback]: Mapped via camera relative to set home: X={x_cnc:.3f}, Y={y_cnc:.3f}")
            except Exception as e:
                logger.error(f"Startup coordinate alignment: Homography mapping failed: {e}")

        # Stop camera if there are no active clients
        with camera_manager.lock:
            if camera_manager.active_clients.get(camera_index, 0) == 0:
                camera_manager.stop_camera(camera_index)

    # Fallback to last saved pen position if camera mapping was not possible
    saved_pos = getattr(state, "saved_pen_position", [0.0, 0.0, 0.0])
    if not aligned_via_mpos and not aligned_via_camera:
        x_cnc = saved_pos[0]
        y_cnc = saved_pos[1]
        logger.info(f"Startup coordinate alignment: Fallback to last saved pen position: X={x_cnc:.3f}, Y={y_cnc:.3f}")

    if z_cnc is None:
        z_cnc = saved_pos[2]

    # Send G10 command to define G54 coordinate system at the current position
    # (GRBL's machine position defaults to 0,0 on startup, so the G54 offsets are adjusted accordingly)
    cmd = f"G10 L20 P0 X{x_cnc:.3f} Y{y_cnc:.3f} Z{z_cnc:.3f}"
    try:
        state.serial_port.write((cmd + "\n").encode())
        state.serial_port.flush()
        await broadcast({"type": "log", "direction": "out", "content": cmd})
        state.wpos[0] = x_cnc
        state.wpos[1] = y_cnc
        state.wpos[2] = z_cnc
        logger.info(f"Startup coordinate alignment: Alignment successful. Sent G-code: {cmd}")
    except Exception as e:
        logger.error(f"Startup coordinate alignment: Failed to write to serial port: {e}")

class ConnectionConfig(BaseModel):
    port: str
    baudrate: int

# get_ort_session

@app.get("/api/reload-ai-model")
def load_onnx_session():
    get_ort_session(forceload=True)
    return {"status": "ok", "message": "Model reloaded successfully"}

@app.post("/api/connect")
async def connect(config: ConnectionConfig):
    if state.connected:
        return JSONResponse({"status": "ok", "message": "Already connected"})
        
    state.port_name = config.port
    state.baudrate = config.baudrate
    
    logger.info(f"Connecting to serial port {state.port_name} at {state.baudrate}")
    
    try:
        if state.port_name.lower() in ["dummy", "mock"]:
            state.serial_port = DummySerial()
            make_serial_wrapper(state.serial_port) # Wrap DummySerial to support transparent Y inversion (cập nhật 20)
            state.connected = True
            state.machine_state = "Idle"
            saved_pos = getattr(state, "saved_pen_position", [0.0, 0.0, 0.0])
            if saved_pos and any(v != 0.0 for v in saved_pos):
                state.wpos = list(saved_pos)
            await broadcast({"type": "connection", "connected": True, "message": "Connected to Mock CNC (Dummy Mode)"})
            return {"status": "ok", "message": "Connected to Mock CNC successfully"}
            
        # Open serial port
        state.serial_port = serial.Serial(state.port_name, state.baudrate, timeout=0.1)
        make_serial_wrapper(state.serial_port) # Wrap physical serial port to support transparent Y inversion (cập nhật 20)
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
        
        # Re-align coordinates dynamically or fallback to last saved coordinates (cập nhật 37)
        asyncio.create_task(realign_cnc_coordinates_on_startup())
            
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
            if not state.is_streaming:
                state.sent_buffer_lengths = []
                
            lines = [line.strip() for line in clean_cmd.splitlines() if line.strip()]
            all_cmds = []
            for line in lines:
                all_cmds.extend(translate_command(line))
                
            for cmd in all_cmds:
                clean_line = re.sub(r'\(.*?\)', '', cmd).strip()
                clean_line = re.sub(r';.*', '', clean_line).strip()
                if not clean_line:
                    continue
                    
                line_len = len(clean_line) + 1
                
                # Wait if rx buffer is full
                while True:
                    if not state.connected:
                        break
                    current_buffer_sum = sum(state.sent_buffer_lengths)
                    if current_buffer_sum + line_len <= 127:
                        break
                    await asyncio.sleep(0.01)
                    
                if not state.connected:
                    break
                    
                state.sent_buffer_lengths.append(line_len)
                state.serial_port.write((clean_line + "\n").encode())
                state.serial_port.flush()
                await broadcast({"type": "log", "direction": "out", "content": clean_line})
            
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
    
    save_calibration_settings({
        "pen_mode": state.pen_mode,
        "pen_up_z": state.pen_up_z,
        "pen_down_z": state.pen_down_z,
        "pen_up_pwm": state.pen_up_pwm,
        "pen_down_pwm": state.pen_down_pwm,
        "pen_dwell": state.pen_dwell
    })
    return {"status": "ok", "message": "Pen settings updated successfully"}

class UIPreferences(BaseModel):
    step_distance: float
    jog_feedrate: int
    gesture_feedrate: int
    gesture_distance: float
    gesture_dwell: float
    gesture_tap_dwell: float
    camera_height: float = 542.0

@app.get("/api/ui_preferences")
async def get_ui_preferences():
    settings = load_calibration_settings()
    return {
        "step_distance": settings.get("step_distance", 10.0),
        "jog_feedrate": settings.get("jog_feedrate", 1000),
        "gesture_feedrate": settings.get("gesture_feedrate", 4000),
        "gesture_distance": settings.get("gesture_distance", 40.0),
        "gesture_dwell": settings.get("gesture_dwell", 0.15),
        "gesture_tap_dwell": settings.get("gesture_tap_dwell", 0.05),
        "camera_height": settings.get("camera_height", 542.0)
    }

@app.post("/api/ui_preferences")
async def update_ui_preferences(prefs: UIPreferences):
    state.step_distance = prefs.step_distance
    state.jog_feedrate = prefs.jog_feedrate
    state.gesture_feedrate = prefs.gesture_feedrate
    state.gesture_distance = prefs.gesture_distance
    state.gesture_dwell = prefs.gesture_dwell
    state.gesture_tap_dwell = prefs.gesture_tap_dwell
    state.camera_height = prefs.camera_height

    save_calibration_settings({
        "step_distance": prefs.step_distance,
        "jog_feedrate": prefs.jog_feedrate,
        "gesture_feedrate": prefs.gesture_feedrate,
        "gesture_distance": prefs.gesture_distance,
        "gesture_dwell": prefs.gesture_dwell,
        "gesture_tap_dwell": prefs.gesture_tap_dwell,
        "camera_height": prefs.camera_height
    })
    return {"status": "ok", "message": "UI preferences updated successfully"}

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
            
            # Automatically unlock after reset to clear the Alarm lock state
            async def auto_unlock_after_stop():
                await asyncio.sleep(1.5)
                if state.connected and state.serial_port:
                    logger.info("Automatically unlocking GRBL from Alarm lock after stop reset...")
                    state.serial_port.write(b"$X\n")
                    state.serial_port.flush()
            
            asyncio.create_task(auto_unlock_after_stop())
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

@app.get("/api/video_feed")
async def video_feed(index: int = 4):
    camera_manager.start_camera(index)
    
    with camera_manager.lock:
        camera_manager.active_clients[index] = camera_manager.active_clients.get(index, 0) + 1

    async def gen():
        try:
            # Wait up to 3 seconds for the first frame
            retries = 30
            while retries > 0 and not camera_manager.get_frame(index):
                if not camera_manager.running.get(index, False):
                    break
                await asyncio.sleep(0.1)
                retries -= 1
                
            if not camera_manager.running.get(index, False):
                logger.error(f"Camera index {index} failed to start. Exiting generator.")
                return

            while True:
                if not camera_manager.running.get(index, False):
                    logger.warning(f"Camera index {index} stopped running. Exiting generator.")
                    break
                frame = camera_manager.get_frame(index)
                if frame:
                    yield (b'--frame\r\n'
                           b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
                else:
                    await asyncio.sleep(0.1)
                    continue
                await asyncio.sleep(0.05)
        finally:
            with camera_manager.lock:
                camera_manager.active_clients[index] = max(0, camera_manager.active_clients.get(index, 1) - 1)
                if camera_manager.active_clients[index] == 0:
                    asyncio.create_task(stop_camera_after_delay(index, 5))

    async def stop_camera_after_delay(idx: int, delay: float):
        await asyncio.sleep(delay)
        with camera_manager.lock:
            if camera_manager.active_clients.get(idx, 0) == 0:
                camera_manager.stop_camera(idx)

    return StreamingResponse(gen(), media_type="multipart/x-mixed-replace; boundary=frame")

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

# API endpoints for calibration
class RecordConfig(BaseModel):
    corner: str # "TL", "TR", "BR", "BL"

@app.get("/api/calibration/status")
async def get_calibration_status():
    yolo_detected = False
    if getattr(state, "detect_objects", False):
        t_diff = time.time() - getattr(state, "latest_yolo_detection_time", 0.0)
        if t_diff < 2.0 and getattr(state, "latest_yolo_detections", None):
            yolo_detected = True
    # cập nhật 5: expose whether we have a saved last object position
    has_last_object = state.last_largest_object_info is not None
    # Build serializable last object info for frontend
    last_object = None
    if state.last_largest_object_info:
        obj = state.last_largest_object_info
        last_object = {
            "center": obj.get("center"),
            "bbox": obj.get("bbox"),
            "class_id": obj.get("class_id"),
            "confidence": obj.get("confidence"),
            "area": obj.get("area")
        }

    # Enrich yolo_detections with class_name for frontend convenience (Cập nhật 27)
    enriched_yolo_detections = []
    if yolo_detected and state.latest_yolo_detections:
        for d in state.latest_yolo_detections:
            cid = d["class_id"]
            name = state.class_names.get(cid, f"Obj {cid}")
            enriched_yolo_detections.append({
                "class_id": cid,
                "class_name": name,
                "confidence": d["confidence"],
                "bbox": d["bbox"],
                "center": d["center"],
                "area": d.get("area", 0)
            })

    return {
        "detected": list(state.latest_detected_markers.keys()),
        "coords": state.latest_detected_markers,
        "yolo_detected": yolo_detected,
        "yolo_detections": enriched_yolo_detections,
        "has_last_object": has_last_object,
        "last_object": last_object,
        "calibration_matrix": get_adjusted_calibration_matrix(),
        "home_set": state.home_set,
        "moving_around_running": getattr(state, "moving_around_running", False),
        "aruco_standard_points": state.aruco_standard_points,
        "cnc_points": state.cnc_points,
        "touch_pen_pixel": state.touch_pen_pixel
    }

@app.post("/api/calibration/record")
async def record_calibration(config: RecordConfig):
    corner = config.corner
    if corner not in ["TL", "TR", "BR", "BL"]:
        return JSONResponse({"status": "error", "message": "Invalid corner"}, status_code=400)
        
    pixel_coord = state.latest_detected_markers.get(corner)
    if not pixel_coord:
        return JSONResponse({"status": "error", "message": f"Corner {corner} is not currently detected by the camera"}, status_code=400)
        
    if not state.connected:
        return JSONResponse({"status": "error", "message": "CNC machine is not connected"}, status_code=400)
        
    # Cập nhật 43: Undistort the detected ArUco corner pixel before storing as calibration point
    raw_px, raw_py = pixel_coord[0], pixel_coord[1]
    ux, uy = undistort_pixel(raw_px, raw_py)
    logger.info(f"[Calib43] record_calibration {corner} raw: ({raw_px:.1f}, {raw_py:.1f}) → undistorted: ({ux:.1f}, {uy:.1f})")
    pixel_coord_undistorted = [ux, uy]

    # Record the current CNC machine coordinates from the state
    machine_coord = [state.wpos[0], state.wpos[1]]
    
    state.calibration_points[corner] = {
        "pixel": pixel_coord_undistorted,
        "machine": machine_coord
    }

    
    # Recompute the matrix
    state.update_calibration_matrix()
    
    # Save settings
    save_calibration_settings({
        "points": state.calibration_points,
        "matrix": state.calibration_matrix,
        "draw_overlay": state.draw_overlay
    })
    
    return {
        "status": "ok",
        "message": f"Successfully calibrated {corner} at pixel {pixel_coord} and machine position {machine_coord}",
        "config": state.calibration_points,
        "calibrated": state.calibration_matrix is not None
    }

@app.get("/api/calibration/config")
async def get_calibration_config():
    return {
        "points": state.calibration_points,
        "aruco_standard_points": state.aruco_standard_points,
        "cnc_points": state.cnc_points,
        "calibrated": state.calibration_matrix is not None,
        "draw_overlay": state.draw_overlay,
        "touch_pen_pixel": state.touch_pen_pixel
    }

class SetCNCConfig(BaseModel):
    corner: str

@app.post("/api/calibration/set_cnc")
async def set_cnc_corner(config: SetCNCConfig):
    corner = config.corner
    if corner not in ["TL", "TR", "BR", "BL"]:
        return JSONResponse({"status": "error", "message": "Invalid corner name"}, status_code=400)
        
    if not state.connected:
        return JSONResponse({"status": "error", "message": "CNC machine is not connected"}, status_code=400)
        
    machine_coord = [state.wpos[0], state.wpos[1]]
    
    state.cnc_points[corner] = machine_coord
    state.update_calibration_matrix()
    
    save_calibration_settings({
        "cnc_points": state.cnc_points,
        "matrix": state.calibration_matrix
    })
    
    return {
        "status": "ok",
        "message": f"Successfully set CNC corner {corner} to position {machine_coord}",
        "cnc_points": state.cnc_points,
        "calibrated": state.calibration_matrix is not None
    }

@app.post("/api/calibration/set_aruco")
async def set_aruco_standard():
    if not state.latest_detected_markers or len(state.latest_detected_markers) != 4:
        return JSONResponse({"status": "error", "message": "All 4 ArUco markers must be detected before setting standard points"}, status_code=400)

    # Cập nhật 43: Undistort detected ArUco corners before saving as calibration source points
    undistorted_markers = {}
    for corner_name, pt in state.latest_detected_markers.items():
        ux, uy = undistort_pixel(pt[0], pt[1])
        logger.info(f"[Calib43] set_aruco {corner_name} raw: ({pt[0]:.1f}, {pt[1]:.1f}) → undistorted: ({ux:.1f}, {uy:.1f})")
        undistorted_markers[corner_name] = [ux, uy]
    state.aruco_standard_points = undistorted_markers
    save_calibration_settings({
        "aruco_standard_points": state.aruco_standard_points
    })
    return {"status": "ok", "message": "ArUco standard points set (with lens undistortion)", "aruco_standard_points": state.aruco_standard_points}

class ManualCornerConfig(BaseModel):
    corner: str
    x: float
    y: float

@app.post("/api/calibration/set_manual_corner")
async def set_manual_corner(config: ManualCornerConfig):
    if config.corner not in ["TL", "TR", "BR", "BL"]:
        return JSONResponse({"status": "error", "message": "Invalid corner name"}, status_code=400)

    # Cập nhật 46: Không dùng undistort_pixel thô, lưu trực tiếp tọa độ pixel click trên frame chính
    raw_x, raw_y = config.x, config.y
    ux, uy = raw_x, raw_y
    logger.info(f"[Calib46] set_manual_corner {config.corner} raw: ({raw_x:.1f}, {raw_y:.1f})")

    if not state.aruco_standard_points:
        state.aruco_standard_points = {}
    state.aruco_standard_points[config.corner] = [ux, uy]
    state.latest_detected_markers[config.corner] = [ux, uy]
    state.latest_detected_markers_time[config.corner] = time.time()

    # Cập nhật 46: lưu vị trí CNC hiện tại tương ứng với góc ArUco này
    if not hasattr(state, "aruco_cnc_points") or state.aruco_cnc_points is None:
        state.aruco_cnc_points = {}
    state.aruco_cnc_points[config.corner] = [float(state.wpos[0]), float(state.wpos[1])]
    logger.info(f"[Calib46] set_manual_corner {config.corner}: pixel=({ux:.1f},{uy:.1f}), CNC=({state.wpos[0]:.3f},{state.wpos[1]:.3f})")

    # Cập nhật 48: lưu theo định dạng mới {x, y}
    # cnc_* = work coord (wpos), cnc_mpos_* = mpos cơ học
    corner_key_lower = config.corner.lower()  # tl, tr, br, bl
    frame_key    = f"frame_{corner_key_lower}"
    cnc_key      = f"cnc_{corner_key_lower}"
    cnc_mpos_key = f"cnc_mpos_{corner_key_lower}"
    frame_val    = {"x": float(ux), "y": float(uy)}
    cnc_val      = {"x": float(state.wpos[0]), "y": float(state.wpos[1])}   # work coord
    cnc_mpos_val = {"x": float(state.mpos[0]), "y": float(state.mpos[1])}  # mpos cơ học
    setattr(state, f"v48_frame_{corner_key_lower}",    frame_val)
    setattr(state, f"v48_cnc_{corner_key_lower}",      cnc_val)
    setattr(state, f"v48_cnc_mpos_{corner_key_lower}", cnc_mpos_val)
    logger.info(
        f"[v48] set_manual_corner {config.corner}: "
        f"frame={frame_val}, cnc_wpos={cnc_val}, cnc_mpos={cnc_mpos_val}"
    )

    save_calibration_settings({
        "aruco_standard_points": state.aruco_standard_points,
        "aruco_cnc_points": state.aruco_cnc_points,
        # Cập nhật 48
        frame_key:    frame_val,
        cnc_key:      cnc_val,      # work coord
        cnc_mpos_key: cnc_mpos_val, # mpos cơ học
    })

    return {
        "status": "ok",
        "message": (
            f"Successfully set corner {config.corner} to pixel ({raw_x:.1f}, {raw_y:.1f}), "
            f"wpos=({state.wpos[0]:.3f},{state.wpos[1]:.3f}), "
            f"mpos=({state.mpos[0]:.3f},{state.mpos[1]:.3f})"
        ),
        "aruco_standard_points": state.aruco_standard_points,
        "aruco_cnc_points": state.aruco_cnc_points,
        "v48_frame":    frame_val,
        "v48_cnc":      cnc_val,
        "v48_cnc_mpos": cnc_mpos_val,
    }

class SetTouchPenConfig(BaseModel):
    x: float
    y: float

@app.post("/api/calibration/set_touch_pen")
async def set_touch_pen(config: SetTouchPenConfig):
    if not state.connected:
        return JSONResponse({"status": "error", "message": "CNC machine is not connected"}, status_code=400)
    if not state.home_set:
        return JSONResponse({"status": "error", "message": "Please set Home first."}, status_code=400)

    # Cập nhật 46: Không dùng undistort_pixel thô, lưu trực tiếp tọa độ click touch pen
    raw_x, raw_y = config.x, config.y
    ux, uy = raw_x, raw_y
    logger.info(f"[Calib46] set_touch_pen raw: ({raw_x:.1f}, {raw_y:.1f})")
    state.touch_pen_pixel = [ux, uy]
    state.update_calibration_matrix()
    
    save_calibration_settings({
        "points": state.calibration_points,
        "matrix": state.calibration_matrix,
        "draw_overlay": state.draw_overlay,
        "home_set": state.home_set,
        "home_markers": state.home_markers,
        "home_snapshot": state.home_snapshot,
        "home_pixel": state.home_pixel,
        "touch_pen_pixel": state.touch_pen_pixel
    })
    
    return {
        "status": "ok",
        "message": f"Successfully set touch pen position to pixel ({raw_x:.1f}, {raw_y:.1f})",
        "touch_pen_pixel": state.touch_pen_pixel,
        "calibrated": state.calibration_matrix is not None
    }

@app.post("/api/calibration/clear")
async def clear_calibration():
    state.calibration_points = {}
    state.calibration_matrix = None
    state.latest_detected_markers = {}
    state.latest_detected_markers_time = {}
    state.aruco_standard_points = {}
    state.cnc_points = {}
    camera_manager.smoothed_aruco_markers = {}
    state.home_set = False
    state.home_markers = {}
    state.home_snapshot = None
    state.saved_pen_position = [0.0, 0.0, 0.0]
    
    save_calibration_settings({
        "points": state.calibration_points,
        "matrix": state.calibration_matrix,
        "draw_overlay": state.draw_overlay,
        "aruco_standard_points": state.aruco_standard_points,
        "cnc_points": state.cnc_points,
        "home_set": state.home_set,
        "home_markers": state.home_markers,
        "home_snapshot": state.home_snapshot,
        "saved_pen_position": state.saved_pen_position
    })
    
    return {"status": "ok", "message": "Calibration cleared"}

class SetCameraHeightConfig(BaseModel):
    height: float

@app.post("/api/calibration/set_camera_height")
async def set_camera_height(config: SetCameraHeightConfig):
    """Cập nhật 48: Cập nhật chiều cao từ camera tới mặt phẳng làm việc (mm)."""
    if config.height <= 0:
        return JSONResponse({"status": "error", "message": "Chiều cao phải > 0 mm"}, status_code=400)
    state.camera_height = config.height
    save_calibration_settings({"camera_height": config.height})
    logger.info(f"[v48] set_camera_height: {config.height} mm")
    return {"status": "ok", "camera_height": state.camera_height, "message": f"Đã cập nhật chiều cao camera: {config.height} mm"}

@app.post("/api/calibration/reset_aruco")
async def reset_aruco():
    state.aruco_standard_points = {}
    state.latest_detected_markers = {}
    state.latest_detected_markers_time = {}
    save_calibration_settings({
        "aruco_standard_points": state.aruco_standard_points
    })
    return {"status": "ok", "message": "ArUco standard points reset", "aruco_standard_points": state.aruco_standard_points}

@app.post("/api/home/reset")
async def reset_home_api(force_current: bool = False):
    """
    Restore/reset the CNC coordinate system back to the saved home reference.
    If force_current is True, it will directly zero the CNC at the current position (manual alignment fallback).
    Otherwise, it uses the camera to auto-align the CNC coordinate system to the saved home.
    """
    if not state.connected or not state.serial_port:
        return JSONResponse({"status": "error", "message": "CNC machine is not connected"}, status_code=400)

    if not state.home_set:
        return JSONResponse({"status": "error", "message": "Home position has not been set yet"}, status_code=400)

    if force_current:
        # Manual alignment fallback: zero the coordinates at current physical position
        home_cmd = "G10 L20 P0 X0 Y0 Z0 M3 S0"
        try:
            state.serial_port.write((home_cmd + "\n").encode())
            state.serial_port.flush()
            await broadcast({"type": "log", "direction": "out", "content": home_cmd})
            state.wpos = [0.0, 0.0, 0.0]
            return {
                "status": "ok",
                "message": "CNC Home reset manually to current position. Saved references are kept."
            }
        except Exception as e:
            return JSONResponse({"status": "error", "message": f"Failed to send zero command: {e}"}, status_code=500)

    # Automatic alignment using camera
    # 1. Detect the CNC head
    cnchead_px = None
    if state.latest_yolo_detections:
        for d in state.latest_yolo_detections:
            cid = d["class_id"]
            class_name = state.class_names.get(cid, f"Obj {cid}")
            if class_name == "cnchead":
                cnchead_px = d["center"]  # [cx, cy]
                break

    if cnchead_px is None:
        return JSONResponse({
            "status": "head_not_detected",
            "message": "Không tìm thấy đầu CNC trong camera. Vui lòng di chuyển đầu CNC vào camera hoặc tự căn chỉnh đầu CNC về vị trí home cũ rồi nhấn OK."
        })

    try:
        aligned_pnp = False
        if len(state.latest_detected_markers) >= 4 and len(state.home_markers) >= 4:
            try:
                head_proj = project_pixel_to_cnc_for_frame(cnchead_px[0], cnchead_px[1], state.latest_detected_markers)
                home_proj = project_pixel_to_cnc_for_frame(state.home_pixel[0], state.home_pixel[1], state.home_markers)
                if head_proj is not None and home_proj is not None:
                    x_cnc_expected = head_proj[0] - home_proj[0]
                    y_cnc_expected = head_proj[1] - home_proj[1]
                    aligned_pnp = True
                    logger.info(f"[Calib45] reset_home_api restored via PnP & Height: X={x_cnc_expected:.3f}, Y={y_cnc_expected:.3f}")
            except Exception as ePnP:
                logger.warning(f"Home restoration via PnP failed: {ePnP}. Falling back to homography.")

        if not aligned_pnp:
            # 2. Get current homography matrix from pixels to Bed Coordinates (BCS)
            if not state.latest_detected_markers or len(state.latest_detected_markers) < 3:
                return JSONResponse({
                    "status": "error", 
                    "message": "Không đủ 3 hoặc 4 điểm ArUco hiện tại để định vị hệ tọa độ bed."
                }, status_code=400)
            
            import numpy as np
            import cv2
            
            common_corners = [c for c in ["TL", "TR", "BR", "BL"] if c in state.latest_detected_markers]
            src_pts = np.array([state.latest_detected_markers[c] for c in common_corners], dtype=np.float32)
            dst_pts = np.array([[-100.0, 75.0] if c=="TL" else [100.0, 75.0] if c=="TR" else [100.0, -75.0] if c=="BR" else [-100.0, -75.0] for c in common_corners], dtype=np.float32)
            
            if len(common_corners) == 3:
                H_curr_aff, _ = cv2.estimateAffine2D(src_pts, dst_pts)
                H_curr = np.vstack([H_curr_aff, [0.0, 0.0, 1.0]])
            else:
                H_curr, _ = cv2.findHomography(src_pts, dst_pts)
                
            # Convert current cnchead_px to current Bed Coordinates (BCS)
            px_vec = np.array([cnchead_px[0], cnchead_px[1], 1.0], dtype=np.float32)
            bed_head = np.dot(H_curr, px_vec)
            x_head_bed = bed_head[0] / bed_head[2]
            y_head_bed = bed_head[1] / bed_head[2]
            
            # 3. Get saved home coordinates in BCS using saved home markers
            home_corners = [c for c in ["TL", "TR", "BR", "BL"] if c in state.home_markers]
            if len(home_corners) < 3:
                return JSONResponse({
                    "status": "error",
                    "message": "Không đủ thông tin ArUco trong kịch bản home đã lưu để định vị."
                }, status_code=400)
                
            src_home = np.array([state.home_markers[c] for c in home_corners], dtype=np.float32)
            dst_home = np.array([[-100.0, 75.0] if c=="TL" else [100.0, 75.0] if c=="TR" else [100.0, -75.0] if c=="BR" else [-100.0, -75.0] for c in home_corners], dtype=np.float32)
            
            if len(home_corners) == 3:
                H_home_aff, _ = cv2.estimateAffine2D(src_home, dst_home)
                H_home = np.vstack([H_home_aff, [0.0, 0.0, 1.0]])
            else:
                H_home, _ = cv2.findHomography(src_home, dst_home)
                
            # Convert saved home_pixel to saved Bed Coordinates (BCS)
            px_home_vec = np.array([state.home_pixel[0], state.home_pixel[1], 1.0], dtype=np.float32)
            bed_home = np.dot(H_home, px_home_vec)
            x_home_bed = bed_home[0] / bed_home[2]
            y_home_bed = bed_home[1] / bed_home[2]
            
            # 4. Cập nhật 45: đảo dấu cả X và Y (đồng nhất với PnP path)
            x_cnc_expected = -(x_head_bed - x_home_bed)
            y_cnc_expected = -(y_head_bed - y_home_bed)
        
        # Send G10 command to redefine current coordinates on the CNC
        cmd = f"G10 L20 P0 X{x_cnc_expected:.3f} Y{y_cnc_expected:.3f}"
        state.serial_port.write((cmd + "\n").encode())
        state.serial_port.flush()
        await broadcast({"type": "log", "direction": "out", "content": cmd})
        
        # Update wpos in state
        state.wpos[0] = x_cnc_expected
        state.wpos[1] = y_cnc_expected
        
        return {
            "status": "ok",
            "message": f"CNC Home restored! Set current coordinates to X={x_cnc_expected:.3f}, Y={y_cnc_expected:.3f}.",
            "x": x_cnc_expected,
            "y": y_cnc_expected
        }
        
    except Exception as e:
        logger.error(f"Error restoring home coordinate system: {e}")
        return JSONResponse({"status": "error", "message": f"Lỗi khôi phục tọa độ: {e}"}, status_code=500)

class ToggleOverlayConfig(BaseModel):
    draw_overlay: bool

@app.post("/api/calibration/toggle_overlay")
async def toggle_overlay(config: ToggleOverlayConfig):
    state.draw_overlay = config.draw_overlay
    
    save_calibration_settings({
        "points": state.calibration_points,
        "matrix": state.calibration_matrix,
        "draw_overlay": state.draw_overlay
    })
    
    return {"status": "ok", "draw_overlay": state.draw_overlay}


# --- Home / GoTo endpoints (cập nhật 2) ---

class GoToConfig(BaseModel):
    x: float
    y: float
    feedrate: float = 1000.0

@app.post("/api/home")
async def set_home(camera_index: int = 4):
    """
    Set the current pen/spindle position as the work-coordinate origin (0, 0, 0).
    Saves a camera snapshot and detected marker positions at the moment of homing.
    Persists so the home survives server restarts.
    """
    if not state.connected or not state.serial_port:
        return JSONResponse({"status": "error", "message": "Not connected"}, status_code=400)

    # Cập nhật 48: Dùng G10 L20 P1 để set work coordinate origin
    home_cmd1 = "G10 L20 P1 X0 Y0 Z0"
    home_cmd2 = "M5"
    try:
        state.serial_port.write((home_cmd1 + "\n").encode())
        state.serial_port.flush()
        await broadcast({"type": "log", "direction": "out", "content": home_cmd1})
        state.serial_port.write((home_cmd2 + "\n").encode())
        state.serial_port.flush()
        await broadcast({"type": "log", "direction": "out", "content": home_cmd2})
    except Exception as e:
        return JSONResponse({"status": "error", "message": f"Failed to send home command: {e}"}, status_code=500)

    # Capture camera snapshot
    snapshot_path = None
    frame_data = camera_manager.get_frame(camera_index)
    if frame_data:
        try:
            snapshot_path = HOME_SNAPSHOT_FILE
            with open(snapshot_path, "wb") as f:
                f.write(frame_data)
            logger.info(f"Saved home snapshot to {snapshot_path}")
        except Exception as e:
            logger.error(f"Failed to save home snapshot: {e}")
            snapshot_path = None

    # Find current cnchead position in pixel coordinates
    cnchead_px = None
    if state.latest_yolo_detections:
        for d in state.latest_yolo_detections:
            cid = d["class_id"]
            class_name = state.class_names.get(cid, f"Obj {cid}")
            if class_name == "cnchead":
                cnchead_px = d["center"]  # [cx, cy]
                break

    # Fallback to current mapped position of pen from grbl if cnchead not detected
    if cnchead_px is None:
        projected_px = project_cnc_to_pixel(state.wpos[0], state.wpos[1], state.wpos[2])
        if projected_px is not None:
            cnchead_px = list(projected_px)
            logger.info(f"[Calib45] set_home fallback projected via PnP: {cnchead_px}")
        else:
            M_adj = get_adjusted_calibration_matrix()
            if M_adj is not None:
                try:
                    M = np.array(M_adj, dtype=np.float32)
                    M_inv = np.linalg.inv(M)
                    wpos_vec = np.array([state.wpos[0], state.wpos[1], 1.0], dtype=np.float32)
                    px_vec = np.dot(M_inv, wpos_vec)
                    if abs(px_vec[2]) > 1e-5:
                        cnchead_px = [float(px_vec[0] / px_vec[2]), float(px_vec[1] / px_vec[2])]
                        logger.info(f"[Calib45] set_home fallback projected via homography: {cnchead_px}")
                except Exception:
                    pass

    # If all fails, fall back to center of frame
    if cnchead_px is None:
        cnchead_px = [360.0, 360.0]

    # Cập nhật 43: Undistort home_pixel before saving — ensures home anchor is in undistorted pixel space
    raw_hx, raw_hy = cnchead_px[0], cnchead_px[1]
    ux_h, uy_h = undistort_pixel(raw_hx, raw_hy)
    logger.info(f"[Calib43] set_home cnchead_px raw: ({raw_hx:.1f}, {raw_hy:.1f}) → undistorted: ({ux_h:.1f}, {uy_h:.1f})")
    state.home_pixel = [ux_h, uy_h]


    # Record state
    state.home_set = True
    if state.aruco_standard_points and len(state.aruco_standard_points) == 4:
        state.home_markers = dict(state.aruco_standard_points)
    else:
        state.home_markers = dict(state.latest_detected_markers)
    state.home_snapshot = snapshot_path

    # Cập nhật 46: home_pixel luôn là tâm frame chính (360, 360)
    # Người dùng đã đưa CNC head về tâm frame trước khi nhấn Set Home
    state.home_pixel = [360.0, 360.0]
    state.touch_pen_pixel = [360.0, 360.0]
    # Lưu mpos cơ học tại thời điểm set home (cập nhật 44)
    state.home_mpos = list(state.mpos)
    state.update_calibration_matrix()

    # Cập nhật 48: lưu frame_o và cnc_o
    # frame_o luôn là tâm frame chính (360, 360)
    # cnc_o = work coord, sau G10 L20 P1 X0 Y0 thì wpos = (0, 0)
    state.v48_frame_o    = {"x": 360.0, "y": 360.0}
    state.v48_cnc_o      = {"x": 0.0, "y": 0.0}   # work coord
    state.v48_cnc_mpos_o = {"x": float(state.mpos[0]), "y": float(state.mpos[1])}  # mpos cơ học
    state.v48_frame_last = {"x": 360.0, "y": 360.0}
    state.v48_cnc_last   = {"x": 0.0, "y": 0.0}   # work coord
    logger.info(f"[v48] set_home: frame_o=(360,360), cnc_o=(0,0) work, cnc_mpos_o=({state.mpos[0]:.3f},{state.mpos[1]:.3f}) mpos")

    # Reset wpos in state to zeros
    state.wpos = [0.0, 0.0, 0.0]
    state.saved_mpos = list(state.mpos)
    state.saved_pen_position = [0.0, 0.0, 0.0]

    # Persist to disk
    save_calibration_settings({
        "points": state.calibration_points,
        "matrix": state.calibration_matrix,
        "draw_overlay": state.draw_overlay,
        "home_set": state.home_set,
        "home_markers": state.home_markers,
        "home_snapshot": state.home_snapshot,
        "home_pixel": state.home_pixel,
        "touch_pen_pixel": state.touch_pen_pixel,
        "home_mpos": state.home_mpos,
        "saved_mpos": state.saved_mpos,
        "saved_pen_position": state.saved_pen_position,
        "aruco_cnc_points": getattr(state, "aruco_cnc_points", {}),
        # Cập nhật 48
        "frame_o":      state.v48_frame_o,
        "cnc_o":        state.v48_cnc_o,       # work coord
        "cnc_mpos_o":   state.v48_cnc_mpos_o,  # mpos cơ học
        "frame_last":   state.v48_frame_last,
        "cnc_last":     state.v48_cnc_last,
    })

    return {
        "status": "ok",
        "message": f"Home set: current machine position is now (0, 0, 0) relative to home. home_mpos saved: {state.home_mpos}",
        "home_set": state.home_set,
        "home_markers": state.home_markers,
        "has_snapshot": snapshot_path is not None,
        "home_pixel": state.home_pixel,
        "touch_pen_pixel": state.touch_pen_pixel
    }


@app.get("/api/home_snapshot")
async def get_home_snapshot():
    """Serve the home snapshot image taken at the time Home was set."""
    if state.home_snapshot and os.path.exists(state.home_snapshot):
        from fastapi.responses import FileResponse
        return FileResponse(state.home_snapshot, media_type="image/jpeg")
    return JSONResponse({"status": "error", "message": "No home snapshot available"}, status_code=404)


@app.get("/api/home_status")
async def get_home_status():
    """Return current home configuration."""
    return {
        "home_set": state.home_set,
        "home_markers": state.home_markers,
        "has_snapshot": state.home_snapshot is not None and os.path.exists(state.home_snapshot or ""),
        "wpos": state.wpos,
        "home_pixel": state.home_pixel,
        "touch_pen_pixel": state.touch_pen_pixel,
        # Cập nhật 48
        "frame_o": state.v48_frame_o,
        "cnc_o":   state.v48_cnc_o,
        "cnc_mpos_o": state.v48_cnc_mpos_o,
        "frame_tl": state.v48_frame_tl, "cnc_tl": state.v48_cnc_tl, "cnc_mpos_tl": state.v48_cnc_mpos_tl,
        "frame_tr": state.v48_frame_tr, "cnc_tr": state.v48_cnc_tr, "cnc_mpos_tr": state.v48_cnc_mpos_tr,
        "frame_br": state.v48_frame_br, "cnc_br": state.v48_cnc_br, "cnc_mpos_br": state.v48_cnc_mpos_br,
        "frame_bl": state.v48_frame_bl, "cnc_bl": state.v48_cnc_bl, "cnc_mpos_bl": state.v48_cnc_mpos_bl,
        "frame_last": state.v48_frame_last,
        "cnc_last":   state.v48_cnc_last,
        "camera_height": state.camera_height,
    }


@app.post("/api/goto")
async def goto_position(config: GoToConfig):
    """
    Move the pen/spindle to the specified work-coordinate position (X, Y).
    Requires home to have been set (G10 L20 P0) so that work coordinates are valid.
    """
    if not state.connected or not state.serial_port:
        return JSONResponse({"status": "error", "message": "Not connected"}, status_code=400)

    if not state.home_set:
        return JSONResponse({"status": "error", "message": "Home has not been set. Please press Home button first."}, status_code=400)

    feedrate = config.feedrate if config.feedrate > 0 else state.gesture_feedrate
    cmd = f"G90 G1 X{config.x:.3f} Y{config.y:.3f} F{feedrate:.0f}"

    try:
        state.serial_port.write((cmd + "\n").encode())
        state.serial_port.flush()
        await broadcast({"type": "log", "direction": "out", "content": cmd})
    except Exception as e:
        return JSONResponse({"status": "error", "message": f"Failed to send GoTo command: {e}"}, status_code=500)

    return {
        "status": "ok",
        "message": f"Moving to X={config.x:.3f}, Y={config.y:.3f} at F{feedrate:.0f}",
        "command": cmd
    }

async def send_gcode_and_wait(cmd: str, target_x: float, target_y: float):
    import math
    try:
        state.serial_port.write((cmd + "\n").encode())
        state.serial_port.flush()
        await broadcast({"type": "log", "direction": "out", "content": cmd})
    except Exception as e:
        logger.error(f"Error sending command in loop: {e}")
        return False
        
    # Wait for the command to execute
    start_time = time.time()
    await asyncio.sleep(0.2) # Allow GRBL to start processing
    while state.moving_around_running:
        # Check distance
        dist = math.sqrt((state.wpos[0] - target_x)**2 + (state.wpos[1] - target_y)**2)
        if dist < 0.2:
            break
        # Fallback check for Idle state
        if time.time() - start_time > 0.5 and state.machine_state == "Idle":
            break
        await asyncio.sleep(0.05)
    return True

async def moving_around_loop_task(M_adj):
    import math
    
    async def simulate_pen_up():
        up_cmds = translate_command(f"G0 Z{state.pen_up_z}")
        for cmd in up_cmds:
            if not state.moving_around_running:
                return
            state.serial_port.write((cmd + "\n").encode())
            state.serial_port.flush()
            await broadcast({"type": "log", "direction": "out", "content": cmd})
        dwell_time = max(0.01, state.gesture_dwell)
        await asyncio.sleep(dwell_time + 0.1)

    async def simulate_pen_touch():
        # Pen down
        down_cmds = translate_command(f"G0 Z{state.pen_down_z}")
        for cmd in down_cmds:
            if not state.moving_around_running:
                return
            state.serial_port.write((cmd + "\n").encode())
            state.serial_port.flush()
            await broadcast({"type": "log", "direction": "out", "content": cmd})
        dwell_time = max(0.01, state.gesture_tap_dwell)
        await asyncio.sleep(dwell_time + 0.1)
        
        # Pen up
        up_cmds = translate_command(f"G0 Z{state.pen_up_z}")
        for cmd in up_cmds:
            if not state.moving_around_running:
                return
            state.serial_port.write((cmd + "\n").encode())
            state.serial_port.flush()
            await broadcast({"type": "log", "direction": "out", "content": cmd})
        await asyncio.sleep(dwell_time + 0.1)

    try:
        M = np.array(M_adj, dtype=np.float32)
        pts = state.home_markers
        
        # Calculate target coordinates at gesture_distance in the direction of the 4 markers
        targets = {}
        for c in ["TR", "BR", "BL", "TL"]:
            if c in pts:
                px, py = pts[c]
                gx = M[0, 0] * px + M[0, 1] * py + M[0, 2]
                gy = M[1, 0] * px + M[1, 1] * py + M[1, 2]
                length = math.sqrt(gx*gx + gy*gy)
                if length > 0:
                    tx = (gx / length) * state.gesture_distance
                    ty = (gy / length) * state.gesture_distance
                    targets[c] = (tx, ty)
                else:
                    targets[c] = (0.0, 0.0)
            else:
                # Fallback direction vectors if a marker is missing
                d_half = state.gesture_distance * 0.70710678
                fallback = {
                    "TR": (d_half, d_half),
                    "BR": (d_half, -d_half),
                    "BL": (-d_half, -d_half),
                    "TL": (-d_half, d_half)
                }
                targets[c] = fallback[c]

        logger.info(f"Moving around targets calculated: {targets}")
        
        # Sequence of corner points
        seq = [
            ("Origin", 0.0, 0.0),
            ("TR", targets["TR"][0], targets["TR"][1]),
            ("BR", targets["BR"][0], targets["BR"][1]),
            ("BL", targets["BL"][0], targets["BL"][1]),
            ("TL", targets["TL"][0], targets["TL"][1])
        ]
        
        # Lift pen initially
        await simulate_pen_up()
        
        # First go to origin and touch
        success = await send_gcode_and_wait(f"G90 G1 X0 Y0 F{state.gesture_feedrate:.0f}", 0.0, 0.0)
        if success and state.moving_around_running:
            await simulate_pen_touch()
        
        while state.moving_around_running:
            # We loop starting from TR
            for name, tx, ty in seq[1:]:
                if not state.moving_around_running:
                    break
                cmd = f"G90 G1 X{tx:.3f} Y{ty:.3f} F{state.gesture_feedrate:.0f}"
                success = await send_gcode_and_wait(cmd, tx, ty)
                if not success:
                    break
                if state.moving_around_running:
                    await simulate_pen_touch()
                
            # After finishing the 4 corners, we go to Origin and touch
            if state.moving_around_running:
                success = await send_gcode_and_wait(f"G90 G1 X0 Y0 F{state.gesture_feedrate:.0f}", 0.0, 0.0)
                if success and state.moving_around_running:
                    await simulate_pen_touch()
                
    except asyncio.CancelledError:
        logger.info("Moving around task cancelled")
    except Exception as e:
        logger.error(f"Error in moving around task: {e}")
    finally:
        state.moving_around_running = False

@app.post("/api/calibration/moving_around/start")
async def start_moving_around():
    if not state.connected or not state.serial_port:
        return JSONResponse({"status": "error", "message": "Not connected"}, status_code=400)
    if not state.home_set:
        return JSONResponse({"status": "error", "message": "Home has not been set. Please set home first."}, status_code=400)
    
    M_adj = get_adjusted_calibration_matrix()
    if not M_adj:
        return JSONResponse({"status": "error", "message": "Calibration matrix is not available"}, status_code=400)
        
    if state.moving_around_running:
        return {"status": "ok", "message": "Already running"}
        
    state.moving_around_running = True
    state.moving_around_task = asyncio.create_task(moving_around_loop_task(M_adj))
    
    return {"status": "ok", "message": "Moving around loop started"}

@app.post("/api/calibration/moving_around/stop")
async def stop_moving_around():
    if not state.moving_around_running:
        return {"status": "ok", "message": "Not running"}
        
    state.moving_around_running = False
    if state.moving_around_task:
        state.moving_around_task.cancel()
        state.moving_around_task = None
        # Send stop command to GRBL immediately
    if state.connected and state.serial_port:
        try:
            # 1. Phanh khẩn cấp lập tức (Ký tự real-time không cần \n)
            state.serial_port.write(b"!")
            state.serial_port.flush()
            await asyncio.sleep(0.2) # 200ms là đủ để motor dừng hẳn

            # 2. Soft Reset để xóa sạch bộ đệm lệnh cũ
            state.serial_port.write(b"\x18")
            state.serial_port.flush()
            await asyncio.sleep(1) # Chờ 1000ms cho mạch khởi động lại

            # 3. CHUẨN BỊ BỘ ĐỆM: Xóa sạch trạng thái Event cũ trước khi gửi lệnh có phản hồi 'ok'
            state.grbl_ack_event.clear()

            # 3. Mở khóa trạng thái Alarm sau Reset
            state.serial_port.write(b"$X\n")
            state.serial_port.flush()
            await wait_for_ok(timeout=2.0)

            # 5. Xóa Event một lần nữa để chuẩn bị đợi chữ 'ok' của lệnh di chuyển cuối cùng
            state.grbl_ack_event.clear()

            # 4. GỘP lện nhấc bút (M5) và lệnh về gốc tuyệt đối (G90 G21) làm MỘT dòng duy nhất
            # Việc gộp này ép GRBL xử lý đồng thời: Nhấc bút trước rồi kéo motor về sau
            cmd = f"G90 G21 M5 G01 X0 Y0 F{state.gesture_feedrate:.0f}\n"
            
            # print("ve goc toa do: ", cmd)
            state.serial_port.write(cmd.encode())
            state.serial_port.flush()

            await wait_for_ok(timeout=10.0) # Đợi luồng nền báo đã nhận ok khi máy về đích xong

            await broadcast({"type": "log", "direction": "out", "content": cmd})
            
        except Exception as e:
            logger.error(f"Error stopping moving around loop: {e}")
            
    return {"status": "ok", "message": "Moving around loop stopped"}

# --- Object Detection Endpoints (cập nhật 3) ---

class ToggleDetectionConfig(BaseModel):
    detect_objects: bool

@app.post("/api/detection/toggle")
async def toggle_detection(config: ToggleDetectionConfig):
    state.detect_objects = config.detect_objects
    return {"status": "ok", "detect_objects": state.detect_objects}

@app.post("/api/detection/move_to_largest")
async def move_to_largest(camera_index: int = 4):
    if not state.connected or not state.serial_port:
        return JSONResponse({"status": "error", "message": "Not connected"}, status_code=400)
        
    if not state.home_set:
        return JSONResponse({"status": "error", "message": "Home has not been set. Please press Set Home button first."}, status_code=400)

    # cập nhật 5: try live detection first, fallback to cached last object
    largest_obj = None
    
    raw_frame = camera_manager.get_raw_frame(camera_index)
    if raw_frame is not None:
        try:
            detections = run_object_detection(raw_frame)
            if detections:
                sittng_dets = [d for d in detections if state.class_names.get(d["class_id"], "") == "sittng"]
                if sittng_dets:
                    largest_obj = max(sittng_dets, key=lambda d: d["area"])
                    state.last_largest_object_info = largest_obj
                    state.latest_detection_results = detections
                    state.latest_detection_time = time.time()
        except Exception as e:
            logger.error(f"Live detection failed: {e}")
    
    if largest_obj is None:
        largest_obj = getattr(state, "last_largest_object_info", None)
    
    if largest_obj is None:
        return JSONResponse({"status": "error", "message": "No objects detected. Point camera at object and retry."}, status_code=400)
        
    cx, cy = largest_obj["center"]

    # Cập nhật 48: dùng pixel_to_cnc_v48 — không dùng lại code cũ
    result = pixel_to_cnc_v48(cx, cy)
    if result is None:
        return JSONResponse({
            "status": "error",
            "message": "Chưa đủ dữ liệu calibration v48. Hãy set home và set 4 góc ArUco manual."
        }, status_code=400)
    wx, wy = result
    logger.info(f"[v48] move_to_largest: px=({cx:.1f},{cy:.1f}) → CNC=({wx:.3f},{wy:.3f})")

    # Send G1 command using global feedrate
    cmd = f"G90 G1 X{wx:.3f} Y{wy:.3f} F{state.gesture_feedrate:.0f}"
    try:
        state.serial_port.write((cmd + "\n").encode())
        state.serial_port.flush()
        await broadcast({"type": "log", "direction": "out", "content": cmd})
    except Exception as e:
        return JSONResponse({"status": "error", "message": f"Failed to send movement command: {e}"}, status_code=500)

    # Cập nhật 48: lưu vị trí cuối
    _v48_save_last_pos(cx, cy, wx, wy)
    
    return {
        "status": "ok",
        "message": f"Moving pen to object ({state.class_names.get(largest_obj['class_id'], 'object')}, conf {largest_obj['confidence']:.2f}) at work coords X={wx:.3f}, Y={wy:.3f}",
        "center": [cx, cy],
        "target": [wx, wy],
        "class_id": largest_obj["class_id"],
        "confidence": largest_obj["confidence"],
        "bbox": largest_obj["bbox"]
    }

class MoveToObjectConfig(BaseModel):
    class_id: int
    center: List[float]
    bbox: List[float]
    camera_index: int = 4

@app.post("/api/detection/move_to_object")
async def move_to_object(config: MoveToObjectConfig):
    if not state.connected or not state.serial_port:
        return JSONResponse({"status": "error", "message": "Not connected"}, status_code=400)
        
    if not state.home_set:
        return JSONResponse({"status": "error", "message": "Home has not been set. Please press Set Home button first."}, status_code=400)

    cx_obj, cy_obj = config.center

    # Cập nhật 48: dùng pixel_to_cnc_v48 — không dùng lại code cũ
    result = pixel_to_cnc_v48(cx_obj, cy_obj)
    if result is None:
        return JSONResponse({
            "status": "error",
            "message": "Chưa đủ dữ liệu calibration v48. Hãy set home và set 4 góc ArUco manual."
        }, status_code=400)
    target_wx, target_wy = result
    logger.info(f"[v48] move_to_object: px=({cx_obj:.1f},{cy_obj:.1f}) → CNC=({target_wx:.3f},{target_wy:.3f})")

    # Send G1 command using global feedrate
    cmd = f"G90 G1 X{target_wx:.3f} Y{target_wy:.3f} F{state.gesture_feedrate:.0f}"
    try:
        state.serial_port.write((cmd + "\n").encode())
        state.serial_port.flush()
        await broadcast({"type": "log", "direction": "out", "content": cmd})
    except Exception as e:
        return JSONResponse({"status": "error", "message": f"Failed to send movement command: {e}"}, status_code=500)

    # Cập nhật 48: lưu vị trí cuối
    _v48_save_last_pos(cx_obj, cy_obj, target_wx, target_wy)

    label_name = state.class_names.get(config.class_id, f"Obj {config.class_id}")
    return {
        "status": "ok",
        "message": f"Moved CNC head to {label_name} center at machine coords: X={target_wx:.3f}, Y={target_wy:.3f}",
        "target": [target_wx, target_wy]
    }

class ClickGoConfig(BaseModel):
    x: float
    y: float
    camera_index: int = 4

@app.post("/api/detection/click_go")
async def click_go(config: ClickGoConfig):
    if not state.connected or not state.serial_port:
        return JSONResponse({"status": "error", "message": "Not connected"}, status_code=400)
        
    if not state.home_set:
        return JSONResponse({"status": "error", "message": "Home has not been set. Please press Set Home button first."}, status_code=400)

    # Check if the click coordinate falls inside any active bounding boxes
    target_x, target_y = config.x, config.y
    
    # Check if there are active detections within 2 seconds
    t_diff = time.time() - getattr(state, "latest_yolo_detection_time", 0.0)
    if t_diff < 2.0 and getattr(state, "latest_yolo_detections", None):
        for d in state.latest_yolo_detections:
            x1, y1, x2, y2 = d["bbox"]
            if x1 <= config.x <= x2 and y1 <= config.y <= y2:
                # Snap to center of the clicked object!
                target_x, target_y = d["center"]
                logger.info(f"Click inside object {d['class_id']} detected. Snapping to center: {target_x}, {target_y}")
                break

    # Cập nhật 48: dùng pixel_to_cnc_v48 — không dùng lại code cũ
    result = pixel_to_cnc_v48(target_x, target_y)
    if result is None:
        return JSONResponse({
            "status": "error",
            "message": "Chưa đủ dữ liệu calibration v48. Hãy set home và set 4 góc ArUco manual."
        }, status_code=400)
    wx, wy = result
    logger.info(f"[v48] click_go: px=({target_x:.1f},{target_y:.1f}) → CNC=({wx:.3f},{wy:.3f})")

    cmd = f"G90 G1 X{wx:.3f} Y{wy:.3f} F{state.gesture_feedrate:.0f}"
    try:
        state.serial_port.write((cmd + "\n").encode())
        state.serial_port.flush()
        await broadcast({"type": "log", "direction": "out", "content": cmd})
    except Exception as e:
        return JSONResponse({"status": "error", "message": f"Failed to send movement command: {e}"}, status_code=500)

    # Cập nhật 48: lưu vị trí cuối
    _v48_save_last_pos(target_x, target_y, wx, wy)
        
    return {
        "status": "ok",
        "message": f"Moving pen to target X={wx:.3f}, Y={wy:.3f}",
        "target": [wx, wy],
        "pixel": [target_x, target_y]
    }

# --- Camera Capture & Download Endpoints (cập nhật 14) ---

@app.get("/api/capture/download")
async def download_capture(mode: str, camera_index: int = 4):
    import io
    
    # Get uncropped frame from manager
    uncropped = camera_manager.get_uncropped_frame(camera_index)
    if uncropped is None:
        # Fallback to latest raw frame if uncropped is missing
        uncropped = camera_manager.get_raw_frame(camera_index)
        
    if uncropped is None:
        return HTMLResponse(status_code=400, content="No active camera frame. Open camera feed first.")
        
    timestamp = time.strftime("%Y%m%d_%H%M%S")
    
    if mode == "1280" or mode == "720_raw":
        # Encode uncropped to JPEG
        ret, raw_jpg = cv2.imencode(".jpg", uncropped)
        if not ret:
            return HTMLResponse(status_code=500, content="Failed to encode raw image.")
            
        filename = f"capture_1280_{timestamp}.jpg" if mode == "1280" else f"capture_raw_{timestamp}.jpg"
        headers = {
            "Content-Disposition": f'attachment; filename="{filename}"'
        }
        return StreamingResponse(io.BytesIO(raw_jpg.tobytes()), media_type="image/jpeg", headers=headers)
        
    elif mode == "720_cropped":
        # Create cropped 720 frame
        fh, fw = uncropped.shape[:2]
        if fh >= 720 and fw >= 720:
            y_start = (fh - 720) // 2
            x_start = (fw - 720) // 2
            cropped = uncropped[y_start:y_start+720, x_start:x_start+720]
        else:
            crop_size = min(fh, fw)
            y_start = (fh - crop_size) // 2
            x_start = (fw - crop_size) // 2
            cropped = uncropped[y_start:y_start+crop_size, x_start:x_start+crop_size]
            
        ret_crop, crop_jpg = cv2.imencode(".jpg", cropped)
        if not ret_crop:
            return HTMLResponse(status_code=500, content="Failed to encode cropped image.")
            
        filename = f"capture_cropped_{timestamp}.jpg"
        headers = {
            "Content-Disposition": f'attachment; filename="{filename}"'
        }
        return StreamingResponse(io.BytesIO(crop_jpg.tobytes()), media_type="image/jpeg", headers=headers)
    else:
        return HTMLResponse(status_code=400, content="Invalid capture mode.")

# --- Device Listing Endpoints (cập nhật 4) ---

@app.get("/api/devices/ports")
async def get_serial_ports():
    import serial.tools.list_ports
    ports = []
    # Add dummy mock port first
    ports.append({
        "port": "dummy",
        "description": "Virtual Mock GRBL Controller"
    })
    for p in serial.tools.list_ports.comports():
        desc = p.description if p.description != 'n/a' else p.device
        ports.append({
            "port": p.device,
            "description": f"{p.device} ({desc})"
        })
    return ports

async def get_cameras_v4l2():
    cameras = []
    try:
        # Chạy lệnh v4l2-ctl ngoài hệ thống
        proc = await asyncio.create_subprocess_exec(
            'v4l2-ctl', '--list-devices',
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        stdout, _ = await proc.communicate()
        output = stdout.decode('utf-8')
        
        # Phân tách các cụm thiết bị
        chunks = output.strip().split("\n\n")
        for chunk in chunks:
            lines = chunk.split("\n")
            if not lines:
                continue
                
            # Dòng đầu tiên luôn là tên Camera và Bus (ví dụ: Integrated Camera (usb-0000:00:14.0-5):)
            device_info = lines[0]
            
            # Tìm đường dẫn /dev/videoX đầu tiên trong cụm
            video_paths = [line.strip() for line in lines[1:] if "/dev/video" in line]
            if not video_paths:
                continue
                
            # Lấy index từ đường dẫn đầu tiên (ví dụ: /dev/video0 -> 0)
            match = re.search(r"video(\d+)", video_paths[0])
            if match:
                idx = int(match.group(1))
                
                # Xác định loại camera dựa trên tên hoặc thông tin bus
                is_builtin = "integrated" in device_info.lower() or "built-in" in device_info.lower()
                camera_type = "Built-in" if is_builtin else "External USB"
                
                cameras.append({
                    "index": idx,
                    "name": f"{device_info.split('(')[0].strip()} (Cam {idx})",
                    "type": camera_type
                })
    except Exception as e:
        print(f"Lỗi khi chạy v4l2-ctl: {e}")
        
    return cameras

@app.get("/api/devices/cameras")
async def get_all_cameras():
    return await get_cameras_v4l2()
    cameras = []
    # Quét qua tất cả các thiết bị video4linux
    for dev_path in sorted(glob.glob("/sys/class/video4linux/video*")):
        base = os.path.basename(dev_path)
        match = re.match(r"video(\d+)", base)
        if not match:
            continue
            
        idx = int(match.group(1))
        
        # 1. Đọc tên thân thiện của camera
        name_file = os.path.join(dev_path, "name")
        name = f"Camera {idx}"
        if os.path.exists(name_file):
            try:
                with open(name_file, "r") as f:
                    name = f.read().strip()
            except Exception:
                pass
        
        # 2. Kiểm tra loại bus để phân biệt Built-in vs USB ngoài
        # Thường camera built-in sẽ nhận diện là "Integrated Camera", "Front Camera", hoặc chạy bus PCI/I2C
        subsystem_path = os.path.realpath(os.path.join(dev_path, "device", "subsystem"))
        bus_type = os.path.basename(subsystem_path)
        
        # Kiểm tra thêm vị trí thiết bị (nếu cần tinh chỉnh)
        is_builtin = "usb" not in bus_type or "integrated" in name.lower() or "built-in" in name.lower()
        
        camera_type = "Built-in" if is_builtin else "External USB"
        
        cameras.append({
            "index": idx,
            "name": f"{name} ({camera_type} - Cam {idx})",
            "type": camera_type
        })
        
    return cameras

# Serve Frontend
# Ensure directories exist
os.makedirs("static", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")

# G-code Editor Endpoints
class SetGcodeRequest(BaseModel):
    gcode: str

@app.post("/api/gcode-editor/convert")
async def gcode_editor_convert(
    file: UploadFile = File(...),
    scale_factor: float = Form(0.1),
    feed_rate: int = Form(2000),
    mode: str = Form("servo"),
    algorithm: str = Form("centerline"),
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
    use_len_filter: bool = Form(True)
):
    try:
        # Create temp folder if not exists
        temp_dir = os.path.join("static", "temp")
        os.makedirs(temp_dir, exist_ok=True)
        
        # Save uploaded file
        file_ext = os.path.splitext(file.filename)[1].lower()
        temp_input_path = os.path.join(temp_dir, f"input_{int(time.time())}{file_ext}")
        temp_gcode_path = os.path.join(temp_dir, f"output_{int(time.time())}.gcode")
        
        with open(temp_input_path, "wb") as f:
            f.write(await file.read())
            
        success = False
        
        # SVG Conversion
        if file_ext == ".svg":
            from svg2gcode import svg_to_exact_gcode
            success = svg_to_exact_gcode(
                svg_path=temp_input_path,
                gcode_path=temp_gcode_path,
                scale_factor=scale_factor,
                feed_rate=feed_rate,
                mode=mode
            )
        # Image Conversion
        elif file_ext in [".png", ".jpg", ".jpeg", ".webp"]:
            from image2gcode import image_to_perfect_single_line_gcode, image_to_gcode
            if algorithm == "centerline":
                success = image_to_perfect_single_line_gcode(
                    image_path=temp_input_path,
                    gcode_path=temp_gcode_path,
                    scale_factor=scale_factor,
                    feed_rate=feed_rate,
                    mode=mode
                )
            elif algorithm == "sketch":
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
                success = image_to_gcode(
                    image_path=temp_input_path,
                    gcode_path=temp_gcode_path,
                    scale_factor=scale_factor,
                    feed_rate=feed_rate,
                    mode=mode
                )
        else:
            return JSONResponse({"status": "error", "message": f"Unsupported file type: {file_ext}"}, status_code=400)
            
        if not success or not os.path.exists(temp_gcode_path):
            return JSONResponse({"status": "error", "message": "Conversion failed"}, status_code=500)
            
        # Read the generated G-code
        with open(temp_gcode_path, "r", encoding="utf-8", errors="ignore") as f:
            gcode_content = f.read()
            
        # Parse G-code to segments
        segments = []
        current_x = 0.0
        current_y = 0.0
        
        x_pattern = re.compile(r'X([\d\.-]+)', re.IGNORECASE)
        y_pattern = re.compile(r'Y([\d\.-]+)', re.IGNORECASE)
        
        for line in gcode_content.splitlines():
            line = line.strip()
            if not line or line.startswith(';') or line.startswith('('):
                continue
                
            if line.upper().startswith('G0') or line.upper().startswith('G1') or ('X' in line.upper() or 'Y' in line.upper()):
                x_match = x_pattern.search(line)
                y_match = y_pattern.search(line)
                
                new_x = float(x_match.group(1)) if x_match else current_x
                new_y = float(y_match.group(1)) if y_match else current_y
                
                is_drawing = 'G1' in line.upper() or (not 'G0' in line.upper() and not 'G00' in line.upper())
                
                if is_drawing:
                    segments.append({
                        "x1": current_x, "y1": current_y,
                        "x2": new_x, "y2": new_y
                    })
                
                current_x = new_x
                current_y = new_y
                
        # Clean up temp files
        try:
            os.remove(temp_input_path)
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

@app.post("/api/gcode-editor/set-gcode")
async def gcode_editor_set_gcode(req: SetGcodeRequest):
    try:
        lines = req.gcode.splitlines()
        valid_lines = []
        for line in lines:
            line_stripped = line.strip()
            if line_stripped:
                valid_lines.append(line_stripped)
                
        state.gcode_lines = valid_lines
        state.gcode_index = 0
        state.is_streaming = False
        state.is_paused = False
        
        logger.info(f"Loaded G-code from editor: {len(valid_lines)} lines")
        return {
            "status": "ok",
            "lines_count": len(valid_lines)
        }
    except Exception as e:
        logger.error(f"Error setting G-code from editor: {e}")
        return JSONResponse({"status": "error", "message": str(e)}, status_code=500)

@app.get("/")
async def root():
    with open(os.path.join("static", "index.html"), "r") as f:
        return HTMLResponse(content=f.read())

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8099)
