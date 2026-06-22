import os
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
from typing import Dict, List, Set, Optional
from fastapi import FastAPI, UploadFile, File, Form, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse, JSONResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

# Configure logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("cnc_controller")

app = FastAPI(title="GRBL CNC Web Controller")

# Pen / Servo settings persistence
SETTINGS_FILE = "pen_settings.json"
CALIBRATION_FILE = "calibration_settings.json"

HOME_SNAPSHOT_FILE = "home_snapshot.jpg"

def load_calibration_settings() -> dict:
    default_settings = {
        "points": {},
        "matrix": None,
        "draw_overlay": True,
        "home_set": False,
        "home_markers": {},
        "home_snapshot": None
    }
    if os.path.exists(CALIBRATION_FILE):
        try:
            with open(CALIBRATION_FILE, "r") as f:
                return {**default_settings, **json.load(f)}
        except Exception as e:
            logger.error(f"Error loading calibration settings: {e}")
    return default_settings

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
        
        # Calibration config
        cal_settings = load_calibration_settings()
        self.calibration_points = cal_settings["points"]
        self.calibration_matrix = cal_settings["matrix"]
        self.draw_overlay = cal_settings["draw_overlay"]
        self.latest_detected_markers = {} # {"TL": [x, y], ...}
        # cập nhật 10: timestamps per corner (unix epoch float)
        self.latest_detected_markers_time: Dict[str, float] = {}  # {"TL": t, ...}
        # cập nhật 10: history ring buffer, max 500 items per corner
        self.aruco_history: Dict[str, deque] = {
            name: deque(maxlen=500) for name in ["TL", "TR", "BL", "BR"]
        }
        # cập nhật 10: YOLO detection history, max 500 batches
        self.yolo_history: deque = deque(maxlen=500)
        
        # Home settings (cập nhật 2)
        self.home_set = cal_settings.get("home_set", False)
        self.home_markers = cal_settings.get("home_markers", {})
        self.home_snapshot = cal_settings.get("home_snapshot", None)
        self.aruco_standard_points = cal_settings.get("aruco_standard_points", {})

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
        valid_pts = []
        for corner in ["TL", "TR", "BR", "BL"]:
            pt = self.calibration_points.get(corner)
            if pt and "pixel" in pt and "machine" in pt:
                valid_pts.append(pt)
                
        if len(valid_pts) < 3:
            self.calibration_matrix = None
            return False
            
        src = np.array([pt["pixel"] for pt in valid_pts], dtype=np.float32)
        dst = np.array([pt["machine"] for pt in valid_pts], dtype=np.float32)
        
        try:
            if len(valid_pts) == 3:
                M_aff = cv2.getAffineTransform(src, dst)
                if M_aff is not None:
                    M = np.vstack([M_aff, [0.0, 0.0, 1.0]])
                else:
                    M = None
            else:
                M, _ = cv2.findHomography(src, dst)
            if M is not None:
                self.calibration_matrix = M.tolist()
                return True
        except Exception as e:
            logger.error(f"Error computing calibration matrix: {e}")
            
        self.calibration_matrix = None
        return False

state = ControllerState()

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
        dst = np.array([[-100.0, 75.0], [100.0, 75.0], [100.0, -75.0], [-100.0, -75.0]], dtype=np.float32)
        try:
            M, _ = cv2.findHomography(src, dst)
            logger.info("Generated a default perspective calibration matrix from home markers (fallback).")
        except Exception as e:
            logger.error(f"Error generating fallback perspective calibration matrix: {e}")
            M = None

    if M is None:
        return None

    if state.home_set and state.home_markers:
        pts = state.home_markers
        # Get list of valid corners recorded during homing
        home_corners = [c for c in ["TL", "TR", "BR", "BL"] if c in pts]
        if len(home_corners) >= 3:
            cx_home = sum(pts[c][0] for c in home_corners) / len(home_corners)
            cy_home = sum(pts[c][1] for c in home_corners) / len(home_corners)
            
            denom_home = M[2, 0] * cx_home + M[2, 1] * cy_home + M[2, 2]
            if abs(denom_home) > 1e-5:
                hx_cal = (M[0, 0] * cx_home + M[0, 1] * cy_home + M[0, 2]) / denom_home
                hy_cal = (M[1, 0] * cx_home + M[1, 1] * cy_home + M[1, 2]) / denom_home
            else:
                hx_cal = M[0, 0] * cx_home + M[0, 1] * cy_home + M[0, 2]
                hy_cal = M[1, 0] * cx_home + M[1, 1] * cy_home + M[1, 2]
            
            M_adj = M.copy()
            M_adj[0, :] -= hx_cal * M_adj[2, :]
            M_adj[1, :] -= hy_cal * M_adj[2, :]
            
            # Now calculate shift compensation based on current ArUco markers vs home markers
            common_corners = [c for c in ["TL", "TR", "BR", "BL"] if c in state.home_markers and c in state.latest_detected_markers]
            if len(common_corners) == 4:
                try:
                    src_pts = np.array([state.latest_detected_markers[c] for c in common_corners], dtype=np.float32)
                    dst_pts = np.array([state.home_markers[c] for c in common_corners], dtype=np.float32)
                    H, _ = cv2.findHomography(src_pts, dst_pts)
                    if H is not None:
                        M_adj = np.dot(M_adj, H)
                        logger.debug("Successfully applied perspective correction to calibration matrix.")
                except Exception as e:
                    logger.error(f"Error computing perspective calibration alignment: {e}")
            elif len(common_corners) == 3:
                try:
                    src_pts = np.array([state.latest_detected_markers[c] for c in common_corners], dtype=np.float32)
                    dst_pts = np.array([state.home_markers[c] for c in common_corners], dtype=np.float32)
                    H_aff, _ = cv2.estimateAffine2D(src_pts, dst_pts)
                    if H_aff is not None:
                        H = np.vstack([H_aff, [0.0, 0.0, 1.0]])
                        M_adj = np.dot(M_adj, H)
                        logger.debug("Successfully applied affine correction to calibration matrix.")
                except Exception as e:
                    logger.error(f"Error computing affine calibration alignment: {e}")
            elif 1 <= len(common_corners) <= 2:
                try:
                    src_pts = np.array([state.latest_detected_markers[c] for c in common_corners], dtype=np.float32)
                    dst_pts = np.array([state.home_markers[c] for c in common_corners], dtype=np.float32)
                    shift = np.mean(dst_pts - src_pts, axis=0) # [dx, dy]
                    H = np.array([[1.0, 0.0, shift[0]], [0.0, 1.0, shift[1]], [0.0, 0.0, 1.0]], dtype=np.float32)
                    M_adj = np.dot(M_adj, H)
                    logger.debug(f"Successfully applied translation shift: {shift}")
                except Exception as e:
                    logger.error(f"Error computing translation calibration alignment: {e}")
            # Invert Y-axis dynamically to correct physical Y direction
            M_adj[1, :] = -M_adj[1, :]
            return M_adj.tolist()
    # Invert Y-axis for fallback case
    M_copy = M.copy()
    M_copy[1, :] = -M_copy[1, :]
    return M_copy.tolist()

# ONNX Detection Helper Functions (cập nhật 3)
def get_ort_session():
    if state.ort_session is None:
        model_path = "/work/a.i-assistant-chatbot-telegram-serverles/cameraip/train/runs/detect/train/weights/best.onnx"
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
            
            # detect object chỉ lấy lable: sittng (class_id = 0)
            if cid != 0:
                continue
            
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
        logger.info(f"[ArUco] Thread started for camera {index}")
        dict_id = cv2.aruco.DICT_4X4_1000
        try:
            aruco_dict = cv2.aruco.getPredefinedDictionary(dict_id)
            parameters = cv2.aruco.DetectorParameters()
            use_new_api = True
        except AttributeError:
            aruco_dict = cv2.aruco.Dictionary_get(dict_id)
            parameters = cv2.aruco.DetectorParameters_create()
            use_new_api = False

        latest = {"TL": None, "TR": None, "BR": None, "BL": None}
        latest_time = {}

        while True:
            with self.lock:
                if not self.running.get(index, False):
                    break
                raw = self.latest_raw_frames.get(index)

            if raw is None:
                time.sleep(0.05)
                continue

            frame = raw.copy()
            h, w = frame.shape[:2]
            cx_frame, cy_frame = w // 2, h // 2

            gray_full = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            gray_full = self._clahe.apply(gray_full)

            detected_this = {}
            try:
                detected_this = self._detect_aruco_fullframe(
                    gray_full, aruco_dict, parameters, use_new_api,
                    cx_frame, cy_frame)
            except Exception as e:
                logger.error(f"[ArUco] Detection error camera {index}: {e}")

            now = time.time()
            with self.lock:
                if index not in self.smoothed_aruco_markers:
                    self.smoothed_aruco_markers[index] = {"TL": None, "TR": None, "BR": None, "BL": None}
                smoothed_dict = self.smoothed_aruco_markers[index]

            for name, pt in detected_this.items():
                if smoothed_dict[name] is None:
                    smoothed_dict[name] = pt
                else:
                    last_pt = smoothed_dict[name]
                    # EMA smoothing with alpha=0.15 for high stability (cập nhật 12)
                    smoothed_x = 0.15 * pt[0] + 0.85 * last_pt[0]
                    smoothed_y = 0.15 * pt[1] + 0.85 * last_pt[1]
                    smoothed_dict[name] = [smoothed_x, smoothed_y]

                smoothed_pt = smoothed_dict[name]
                latest[name] = smoothed_pt
                latest_time[name] = now

            with self.lock:
                self.aruco_latest[index] = {k: v for k, v in latest.items() if v is not None}
                self.aruco_latest_time[index] = {k: v for k, v in latest_time.items() if latest.get(k) is not None}
                for name, pt in detected_this.items():
                    smoothed_pt = smoothed_dict[name]
                    self.aruco_history[index][name].append({"pt": smoothed_pt, "time": now})

            for name, pt in detected_this.items():
                smoothed_pt = smoothed_dict[name]
                state.latest_detected_markers[name] = smoothed_pt
                state.latest_detected_markers_time[name] = now
                state.aruco_history[name].append({"pt": smoothed_pt, "time": now})

            time.sleep(0.125)

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
                    largest = max(detections, key=lambda d: d["area"])
                    state.last_largest_object_info = largest
                    state.last_largest_object_time = now
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

                        # Centre (blue dot)
                        cx = (std_pts["TL"][0] + std_pts["TR"][0] + std_pts["BR"][0] + std_pts["BL"][0]) // 4
                        cy = (std_pts["TL"][1] + std_pts["TR"][1] + std_pts["BR"][1] + std_pts["BL"][1]) // 4
                        cv2.circle(frame, (cx, cy), 8, (255, 0, 0), -1)
                        cv2.putText(frame, "(0,0)", (cx + 15, cy + 5),
                                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 0, 0), 2)

                        # Midpoints
                        mid_left = ((std_pts["TL"][0] + std_pts["BL"][0]) // 2, (std_pts["TL"][1] + std_pts["BL"][1]) // 2)
                        mid_right = ((std_pts["TR"][0] + std_pts["BR"][0]) // 2, (std_pts["TR"][1] + std_pts["BR"][1]) // 2)
                        mid_top = ((std_pts["TL"][0] + std_pts["TR"][0]) // 2, (std_pts["TL"][1] + std_pts["TR"][1]) // 2)
                        mid_bot = ((std_pts["BL"][0] + std_pts["BR"][0]) // 2, (std_pts["BL"][1] + std_pts["BR"][1]) // 2)

                        # X-axis: cyan line from Left Midpoint to Right Midpoint
                        cv2.line(frame, mid_left, mid_right, (255, 255, 0), 2)
                        # Put text x+ at right midpoint
                        cv2.putText(frame, "x+", (mid_right[0] + 8, mid_right[1] + 5),
                                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 0), 2)

                        # Y-axis: magenta line from Top Midpoint to Bottom Midpoint
                        cv2.line(frame, mid_top, mid_bot, (255, 0, 255), 2)
                        # Put text y+ at bottom midpoint
                        cv2.putText(frame, "y+", (mid_bot[0] - 10, mid_bot[1] + 20),
                                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 0, 255), 2)
                except Exception as e:
                    logger.error(f"[Draw] ArUco overlay error camera {index}: {e}")

                # ── Draw YOLO detections ────────────────────────────────
                if yolo_dets:
                    try:
                        colors = [(0, 0, 255), (0, 255, 0), (255, 0, 0), (0, 255, 255)]
                        for d in yolo_dets:
                            ix1, iy1, ix2, iy2 = d["bbox"]
                            cid  = d["class_id"]
                            conf = d["confidence"]
                            color = colors[cid % len(colors)]
                            cv2.rectangle(frame, (ix1, iy1), (ix2, iy2), color, 2)
                            dcx, dcy = d["center"]
                            cv2.circle(frame, (int(dcx), int(dcy)), 4, color, -1)
                            class_name = state.class_names.get(cid, f"Obj {cid}")
                            label = f"{class_name}: {conf:.2f}"
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
                    save_calibration_settings({
                        "saved_pen_position": state.saved_pen_position
                    })
            except Exception as e:
                logger.error(f"Failed to auto-save pen position: {e}")
            last_save_time = now
            
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
        if state.port_name.lower() in ["dummy", "mock"]:
            state.serial_port = DummySerial()
            state.connected = True
            state.machine_state = "Idle"
            saved_pos = getattr(state, "saved_pen_position", [0.0, 0.0, 0.0])
            if saved_pos and any(v != 0.0 for v in saved_pos):
                state.wpos = list(saved_pos)
            await broadcast({"type": "connection", "connected": True, "message": "Connected to Mock CNC (Dummy Mode)"})
            return {"status": "ok", "message": "Connected to Mock CNC successfully"}
            
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
        
        # Restore position if we have a saved one (cập nhật 13)
        saved_pos = getattr(state, "saved_pen_position", [0.0, 0.0, 0.0])
        if saved_pos and any(v != 0.0 for v in saved_pos):
            g92_cmd = f"G92 X{saved_pos[0]:.3f} Y{saved_pos[1]:.3f} Z{saved_pos[2]:.3f}"
            logger.info(f"Restoring last known pen position: {g92_cmd}")
            await asyncio.sleep(0.5)
            state.serial_port.write((g92_cmd + "\n").encode())
            state.serial_port.flush()
            
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
    return {
        "detected": list(state.latest_detected_markers.keys()),
        "coords": state.latest_detected_markers,
        "yolo_detected": yolo_detected,
        "yolo_detections": state.latest_yolo_detections if yolo_detected else [],
        "has_last_object": has_last_object,
        "last_object": last_object,
        "calibration_matrix": get_adjusted_calibration_matrix(),
        "home_set": state.home_set,
        "moving_around_running": getattr(state, "moving_around_running", False),
        "aruco_standard_points": state.aruco_standard_points
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
        
    # Record the current CNC machine coordinates from the state
    machine_coord = [state.wpos[0], state.wpos[1]]
    
    state.calibration_points[corner] = {
        "pixel": pixel_coord,
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
        "calibrated": state.calibration_matrix is not None,
        "draw_overlay": state.draw_overlay
    }

@app.post("/api/calibration/set_aruco")
async def set_aruco_standard():
    if not state.latest_detected_markers or len(state.latest_detected_markers) != 4:
        return JSONResponse({"status": "error", "message": "All 4 ArUco markers must be detected before setting standard points"}, status_code=400)
    
    state.aruco_standard_points = dict(state.latest_detected_markers)
    save_calibration_settings({
        "aruco_standard_points": state.aruco_standard_points
    })
    return {"status": "ok", "message": "ArUco standard points set", "aruco_standard_points": state.aruco_standard_points}

class ManualCornerConfig(BaseModel):
    corner: str
    x: float
    y: float

@app.post("/api/calibration/set_manual_corner")
async def set_manual_corner(config: ManualCornerConfig):
    if config.corner not in ["TL", "TR", "BR", "BL"]:
        return JSONResponse({"status": "error", "message": "Invalid corner name"}, status_code=400)
    
    if not state.aruco_standard_points:
        state.aruco_standard_points = {}
    state.aruco_standard_points[config.corner] = [config.x, config.y]
    
    save_calibration_settings({
        "aruco_standard_points": state.aruco_standard_points
    })
    
    return {
        "status": "ok",
        "message": f"Successfully set standard corner {config.corner} to pixel ({config.x:.1f}, {config.y:.1f})",
        "aruco_standard_points": state.aruco_standard_points
    }

@app.post("/api/calibration/clear")
async def clear_calibration():
    state.calibration_points = {}
    state.calibration_matrix = None
    state.latest_detected_markers = {}
    state.aruco_standard_points = {}
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
        "home_set": state.home_set,
        "home_markers": state.home_markers,
        "home_snapshot": state.home_snapshot,
        "saved_pen_position": state.saved_pen_position
    })
    
    return {"status": "ok", "message": "Calibration cleared"}

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

    # Send GRBL command to zero work coordinates at current position
    home_cmd = "G10 L20 P0 X0 Y0 Z0"
    try:
        state.serial_port.write((home_cmd + "\n").encode())
        state.serial_port.flush()
        await broadcast({"type": "log", "direction": "out", "content": home_cmd})
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

    # Record state
    state.home_set = True
    if state.aruco_standard_points and len(state.aruco_standard_points) == 4:
        state.home_markers = dict(state.aruco_standard_points)
    else:
        state.home_markers = dict(state.latest_detected_markers)
    state.home_snapshot = snapshot_path

    # Reset wpos in state to zeros
    state.wpos = [0.0, 0.0, 0.0]

    # Persist to disk
    save_calibration_settings({
        "points": state.calibration_points,
        "matrix": state.calibration_matrix,
        "draw_overlay": state.draw_overlay,
        "home_set": state.home_set,
        "home_markers": state.home_markers,
        "home_snapshot": state.home_snapshot
    })

    return {
        "status": "ok",
        "message": "Home set: current position is now (0, 0, 0). Snapshot saved.",
        "home_set": state.home_set,
        "home_markers": state.home_markers,
        "has_snapshot": snapshot_path is not None
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
        "wpos": state.wpos
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

    cmd = f"G90 G0 X{config.x:.3f} Y{config.y:.3f}"
    if config.feedrate > 0:
        cmd = f"G90 G1 X{config.x:.3f} Y{config.y:.3f} F{config.feedrate:.0f}"

    try:
        state.serial_port.write((cmd + "\n").encode())
        state.serial_port.flush()
        await broadcast({"type": "log", "direction": "out", "content": cmd})
    except Exception as e:
        return JSONResponse({"status": "error", "message": f"Failed to send GoTo command: {e}"}, status_code=500)

    return {
        "status": "ok",
        "message": f"Moving to X={config.x:.3f}, Y={config.y:.3f} at F{config.feedrate:.0f}",
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
        dwell_time = max(0.1, state.pen_dwell)
        await asyncio.sleep(dwell_time + 0.2)

    async def simulate_pen_touch():
        # Pen down
        down_cmds = translate_command(f"G0 Z{state.pen_down_z}")
        for cmd in down_cmds:
            if not state.moving_around_running:
                return
            state.serial_port.write((cmd + "\n").encode())
            state.serial_port.flush()
            await broadcast({"type": "log", "direction": "out", "content": cmd})
        dwell_time = max(0.1, state.pen_dwell)
        await asyncio.sleep(dwell_time + 0.2)
        
        # Pen up
        up_cmds = translate_command(f"G0 Z{state.pen_up_z}")
        for cmd in up_cmds:
            if not state.moving_around_running:
                return
            state.serial_port.write((cmd + "\n").encode())
            state.serial_port.flush()
            await broadcast({"type": "log", "direction": "out", "content": cmd})
        await asyncio.sleep(dwell_time + 0.2)

    try:
        M = np.array(M_adj, dtype=np.float32)
        pts = state.home_markers
        
        # Calculate target coordinates at distance 100 in the direction of the 4 markers
        targets = {}
        for c in ["TR", "BR", "BL", "TL"]:
            if c in pts:
                px, py = pts[c]
                gx = M[0, 0] * px + M[0, 1] * py + M[0, 2]
                gy = M[1, 0] * px + M[1, 1] * py + M[1, 2]
                length = math.sqrt(gx*gx + gy*gy)
                if length > 0:
                    tx = (gx / length) * 100.0
                    ty = (gy / length) * 100.0
                    targets[c] = (tx, ty)
                else:
                    targets[c] = (0.0, 0.0)
            else:
                # Fallback direction vectors if a marker is missing
                fallback = {
                    "TR": (70.71, 70.71),
                    "BR": (70.71, -70.71),
                    "BL": (-70.71, -70.71),
                    "TL": (-70.71, 70.71)
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
        success = await send_gcode_and_wait("G90 G0 X0 Y0", 0.0, 0.0)
        if success and state.moving_around_running:
            await simulate_pen_touch()
        
        while state.moving_around_running:
            # We loop starting from TR
            for name, tx, ty in seq[1:]:
                if not state.moving_around_running:
                    break
                cmd = f"G90 G0 X{tx:.3f} Y{ty:.3f}"
                success = await send_gcode_and_wait(cmd, tx, ty)
                if not success:
                    break
                if state.moving_around_running:
                    await simulate_pen_touch()
                
            # After finishing the 4 corners, we go to Origin and touch
            if state.moving_around_running:
                success = await send_gcode_and_wait("G90 G0 X0 Y0", 0.0, 0.0)
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
            # Send feed hold
            state.serial_port.write(b"!")
            state.serial_port.flush()
            await asyncio.sleep(0.2)
            # Send soft reset
            state.serial_port.write(b"\x18")
            state.serial_port.flush()
            await asyncio.sleep(0.5)
            # Unlock
            state.serial_port.write(b"$X\n")
            state.serial_port.flush()
            await asyncio.sleep(0.2)
            # Move back to origin
            cmd = "G90 G0 X0 Y0"
            state.serial_port.write((cmd + "\n").encode())
            state.serial_port.flush()
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
        
    M_adj = get_adjusted_calibration_matrix()
    if not M_adj:
        return JSONResponse({"status": "error", "message": "Calibration is not complete. Please calibrate at least 3 points first."}, status_code=400)
    
    # cập nhật 5: try live detection first, fallback to cached last object
    largest_obj = None
    
    raw_frame = camera_manager.get_raw_frame(camera_index)
    if raw_frame is not None:
        try:
            detections = run_object_detection(raw_frame)
            if detections:
                largest_obj = max(detections, key=lambda d: d["area"])
                # Update saved last object
                state.last_largest_object_info = largest_obj
                # Save detections for flash overlay
                state.latest_detection_results = detections
                state.latest_detection_time = time.time()
        except Exception as e:
            logger.error(f"Live detection failed: {e}")
    
    # Fallback to cached last object if live detection found nothing
    if largest_obj is None:
        largest_obj = getattr(state, "last_largest_object_info", None)
    
    if largest_obj is None:
        return JSONResponse({"status": "error", "message": "No objects detected. Point camera at object and retry."}, status_code=400)
        
    cx, cy = largest_obj["center"]
    
    # Map pixel center to work coordinates
    M = np.array(M_adj, dtype=np.float32)
    denom = M[2, 0] * cx + M[2, 1] * cy + M[2, 2] if M.shape[0] > 2 else 1.0
    if abs(denom) > 1e-5:
        wx = (M[0, 0] * cx + M[0, 1] * cy + M[0, 2]) / denom
        wy = (M[1, 0] * cx + M[1, 1] * cy + M[1, 2]) / denom
    else:
        wx = M[0, 0] * cx + M[0, 1] * cy + M[0, 2]
        wy = M[1, 0] * cx + M[1, 1] * cy + M[1, 2]
    
    # Send G0 command
    cmd = f"G0 X{wx:.3f} Y{wy:.3f}"
    try:
        state.serial_port.write((cmd + "\n").encode())
        state.serial_port.flush()
        await broadcast({"type": "log", "direction": "out", "content": cmd})
    except Exception as e:
        return JSONResponse({"status": "error", "message": f"Failed to send movement command: {e}"}, status_code=500)
    
    return {
        "status": "ok",
        "message": f"Moving pen to object ({state.class_names.get(largest_obj['class_id'], 'object')}, conf {largest_obj['confidence']:.2f}) at work coords X={wx:.3f}, Y={wy:.3f}",
        "center": [cx, cy],
        "target": [wx, wy],
        "class_id": largest_obj["class_id"],
        "confidence": largest_obj["confidence"],
        "bbox": largest_obj["bbox"]
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
        
    M_adj = get_adjusted_calibration_matrix()
    if not M_adj:
        return JSONResponse({"status": "error", "message": "Calibration is not complete. Please calibrate at least 3 points first."}, status_code=400)
        
    # Check if the click coordinate falls inside any active bounding boxes
    # We use live detections or cached detections from state.latest_yolo_detections
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
                
    # Map pixel coordinates to work coordinates
    M = np.array(M_adj, dtype=np.float32)
    denom = M[2, 0] * target_x + M[2, 1] * target_y + M[2, 2] if M.shape[0] > 2 else 1.0
    if abs(denom) > 1e-5:
        wx = (M[0, 0] * target_x + M[0, 1] * target_y + M[0, 2]) / denom
        wy = (M[1, 0] * target_x + M[1, 1] * target_y + M[1, 2]) / denom
    else:
        wx = M[0, 0] * target_x + M[0, 1] * target_y + M[0, 2]
        wy = M[1, 0] * target_x + M[1, 1] * target_y + M[1, 2]
    
    cmd = f"G0 X{wx:.3f} Y{wy:.3f}"
    try:
        state.serial_port.write((cmd + "\n").encode())
        state.serial_port.flush()
        await broadcast({"type": "log", "direction": "out", "content": cmd})
    except Exception as e:
        return JSONResponse({"status": "error", "message": f"Failed to send movement command: {e}"}, status_code=500)
        
    return {
        "status": "ok",
        "message": f"Moving pen to target X={wx:.3f}, Y={wy:.3f}",
        "target": [wx, wy],
        "pixel": [target_x, target_y]
    }

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

@app.get("/api/devices/cameras")
async def get_usb_cameras():
    import glob
    import re
    cameras = []
    for dev_path in sorted(glob.glob("/sys/class/video4linux/video*")):
        base = os.path.basename(dev_path)
        match = re.match(r"video(\d+)", base)
        if match:
            idx = int(match.group(1))
            name_file = os.path.join(dev_path, "name")
            name = f"Camera {idx}"
            if os.path.exists(name_file):
                try:
                    with open(name_file, "r") as f:
                        name = f.read().strip()
                except Exception:
                    pass
            cameras.append({
                "index": idx,
                "name": f"{name} (Cam {idx})"
            })
    return cameras

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
