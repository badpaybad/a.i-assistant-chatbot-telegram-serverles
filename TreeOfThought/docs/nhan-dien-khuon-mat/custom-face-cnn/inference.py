import os
import sys
import cv2
import numpy as np
import onnxruntime as ort
import faiss

WORKSPACE_DIR = "/work/a.i-assistant-chatbot-telegram-serverles"
BLAZEFACE_MODEL_PATH = os.path.join(WORKSPACE_DIR, "TreeOfThought/docs/nhan-dien-khuon-mat/ArcFaceFinetune/arcfacemodels/blaze_face_short_range.tflite")
FACELANDMARKER_MODEL_PATH = os.path.join(WORKSPACE_DIR, "TreeOfThought/docs/nhan-dien-khuon-mat/ArcFaceFinetune/arcfacemodels/face_landmarker.task")

def flush_print(msg):
    print(msg)
    sys.stdout.flush()

# =====================================================================
# 1. TIỀN XỬ LÝ ĐỒNG NHẤT 100% VỚI PHẦN HUẤN LUYỆN
# =====================================================================

def align_face_python(image_bgr, eye_left, eye_right):
    cx = (eye_left[0] + eye_right[0]) / 2.0
    cy = (eye_left[1] + eye_right[1]) / 2.0
    dx = eye_right[0] - eye_left[0]
    dy = eye_right[1] - eye_left[1]
    
    current_dist = np.sqrt(dx**2 + dy**2)
    if current_dist == 0:
        current_dist = 1.0
        
    angle_deg = np.degrees(np.arctan2(dy, dx))
    
    # Target alignment coordinates on a 112x112 frame
    target_dist = 35.2372
    tx = 55.9132
    target_ty = 51.59885
    
    scale = target_dist / current_dist
    M = cv2.getRotationMatrix2D((cx, cy), angle_deg, scale)
    M[0, 2] += (tx - cx)
    M[1, 2] += (target_ty - cy)
    
    aligned_face = cv2.warpAffine(image_bgr, M, (112, 112), flags=cv2.INTER_CUBIC, borderValue=0)
    return aligned_face

def detect_and_align_face_with_geom(image_bgr, detector=None):
    """
    Quy trình phát hiện và căn chỉnh mắt bằng MediaPipe Face Landmarker (hoặc OpenCV Haar / Center Crop dự phòng).
    Trả về cả ảnh đã align và ma trận đặc trưng hình học (26, 2) của 26 landmarks chuẩn hóa.
    """
    # 26 landmarks mặc định trên khung 112x112 chuẩn hóa
    default_geom = np.array([
        [30.0/112.0, 51.6/112.0],  # 0. Left eye outer
        [46.0/112.0, 51.6/112.0],  # 1. Left eye inner
        [66.0/112.0, 51.6/112.0],  # 2. Right eye inner
        [82.0/112.0, 51.6/112.0],  # 3. Right eye outer
        [38.0/112.0, 48.0/112.0],  # 4. Left upper eyelid
        [38.0/112.0, 54.0/112.0],  # 5. Left lower eyelid
        [74.0/112.0, 48.0/112.0],  # 6. Right upper eyelid
        [74.0/112.0, 54.0/112.0],  # 7. Right lower eyelid
        [38.0/112.0, 51.6/112.0],  # 8. Left Pupil
        [74.0/112.0, 51.6/112.0],  # 9. Right Pupil
        [44.0/112.0, 40.0/112.0],  # 10. Left eyebrow inner
        [26.0/112.0, 42.0/112.0],  # 11. Left eyebrow outer
        [68.0/112.0, 40.0/112.0],  # 12. Right eyebrow inner
        [86.0/112.0, 42.0/112.0],  # 13. Right eyebrow outer
        [55.9/112.0, 48.0/112.0],  # 14. Nose bridge
        [55.9/112.0, 70.0/112.0],  # 15. Nose tip
        [48.0/112.0, 75.0/112.0],  # 16. Left nose wing
        [63.8/112.0, 75.0/112.0],  # 17. Right nose wing
        [55.9/112.0, 82.0/112.0],  # 18. Philtrum
        [44.0/112.0, 90.0/112.0],  # 19. Left mouth corner
        [67.8/112.0, 90.0/112.0],  # 20. Right mouth corner
        [55.9/112.0, 87.0/112.0],  # 21. Upper lip center
        [55.9/112.0, 95.0/112.0],  # 22. Lower lip center
        [20.0/112.0, 75.0/112.0],  # 23. Left cheek
        [92.0/112.0, 75.0/112.0],  # 24. Right cheek
        [55.9/112.0, 105.0/112.0]  # 25. Chin
    ], dtype=np.float32)

    landmark_indices = [33, 133, 362, 263, 159, 145, 386, 374, 468, 473, 70, 107, 300, 336, 168, 4, 129, 358, 164, 61, 291, 0, 17, 234, 454, 152]

    def process_landmarks(face_landmarks):
        h, w = image_bgr.shape[:2]
        # Tọa độ thực tế của mắt để tính góc xoay
        p33 = face_landmarks[33]
        p133 = face_landmarks[133]
        left_eye = (
            ((p33.x + p133.x) / 2.0) * w,
            ((p33.y + p133.y) / 2.0) * h
        )
        
        p362 = face_landmarks[362]
        p263 = face_landmarks[263]
        right_eye = (
            ((p362.x + p263.x) / 2.0) * w,
            ((p362.y + p263.y) / 2.0) * h
        )
        
        cx = (left_eye[0] + right_eye[0]) / 2.0
        cy = (left_eye[1] + right_eye[1]) / 2.0
        dx = right_eye[0] - left_eye[0]
        dy = right_eye[1] - left_eye[1]
        
        current_dist = np.sqrt(dx**2 + dy**2)
        if current_dist == 0:
            current_dist = 1.0
        
        angle_deg = np.degrees(np.arctan2(dy, dx))
        target_dist = 35.2372
        tx = 55.9132
        ty = 51.59885
        
        scale = target_dist / current_dist
        M = cv2.getRotationMatrix2D((cx, cy), angle_deg, scale)
        M[0, 2] += (tx - cx)
        M[1, 2] += (ty - cy)
        
        # Xoay/align khuôn mặt về khung 112x112
        aligned_face = cv2.warpAffine(image_bgr, M, (112, 112), flags=cv2.INTER_CUBIC, borderValue=0)
        
        # Biến đổi tọa độ của 16 landmarks được chọn sang khung 112x112
        transformed_geom = []
        for idx in landmark_indices:
            pt = face_landmarks[idx]
            pt_x = pt.x * w
            pt_y = pt.y * h
            # Áp dụng ma trận affine M
            x_new = M[0, 0] * pt_x + M[0, 1] * pt_y + M[0, 2]
            y_new = M[1, 0] * pt_x + M[1, 1] * pt_y + M[1, 2]
            transformed_geom.append([x_new / 112.0, y_new / 112.0])
        
        return aligned_face, np.array(transformed_geom, dtype=np.float32)

    try:
        import mediapipe as mp
        # 1. Dùng MediaPipe Face Landmarker được truyền vào (tái sử dụng)
        if detector is not None:
            # Nếu detector là landmarks đã phát hiện sẵn (không phải là đối tượng detector)
            if not hasattr(detector, 'detect'):
                return process_landmarks(detector)
            rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)
            mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb)
            results = detector.detect(mp_image)
            if results.face_landmarks:
                return process_landmarks(results.face_landmarks[0])
        else:
            # Tự khởi tạo single-use FaceLandmarker
            from mediapipe.tasks import python as mp_py
            from mediapipe.tasks.python import vision as mp_vision
            base_opts = mp_py.BaseOptions(model_asset_path=FACELANDMARKER_MODEL_PATH)
            det_opts = mp_vision.FaceLandmarkerOptions(
                base_options=base_opts,
                running_mode=mp_vision.RunningMode.IMAGE,
                num_faces=1
            )
            with mp_vision.FaceLandmarker.create_from_options(det_opts) as single_detector:
                rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)
                mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb)
                results = single_detector.detect(mp_image)
                if results.face_landmarks:
                    return process_landmarks(results.face_landmarks[0])
    except Exception:
        pass

    # 2. Dự phòng bằng OpenCV Haar Cascade
    try:
        cascade_path = cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
        face_cascade = cv2.CascadeClassifier(cascade_path)
        gray = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=3, minSize=(30, 30))
        if len(faces) > 0:
            x, y, fw, fh = max(faces, key=lambda r: r[2] * r[3])
            face_crop = image_bgr[y:y+fh, x:x+fw]
            return cv2.resize(face_crop, (112, 112), interpolation=cv2.INTER_CUBIC), default_geom
    except Exception:
        pass

    # 3. Dự phòng cuối cùng: Center Crop
    h, w = image_bgr.shape[:2]
    size = min(h, w)
    x = (w - size) // 2
    y = (h - size) // 2
    crop = image_bgr[y:y+size, x:x+size]
    return cv2.resize(crop, (112, 112), interpolation=cv2.INTER_CUBIC), default_geom

def crop_sub_regions(aligned_face):
    """
    Cắt 3 phân vùng từ ảnh 112x112 chuẩn hóa
    """
    global_face = aligned_face.copy()
    eye_region = aligned_face[20:76, 0:112].copy()
    nose_region = aligned_face[45:101, 28:84].copy()
    return global_face, eye_region, nose_region

# =====================================================================
# 2. SUY LUẬN MÔ HÌNH ONNX ĐA CỔNG ĐẦU VÀO
# =====================================================================

class OnnxFaceRecognizer:
    def __init__(self, model_path="custom_face_cnn.onnx"):
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"❌ Không tìm thấy tệp mô hình ONNX tại {model_path}. Hãy chạy train.py trước.")
            
        flush_print(f"🔄 Khởi tạo phiên suy luận ONNX Runtime từ: {model_path}")
        # Ưu tiên sử dụng CPU để chạy đa nền tảng ổn định
        self.session = ort.InferenceSession(model_path, providers=['CPUExecutionProvider'])
        
        # Khởi tạo FaceLandmarker của MediaPipe để tái sử dụng, tăng FPS suy luận thực tế lên gấp nhiều lần
        self.mp_detector = None
        try:
            from mediapipe.tasks import python as mp_py
            from mediapipe.tasks.python import vision as mp_vision
            base_opts = mp_py.BaseOptions(model_asset_path=FACELANDMARKER_MODEL_PATH)
            det_opts = mp_vision.FaceLandmarkerOptions(
                base_options=base_opts,
                running_mode=mp_vision.RunningMode.IMAGE,
                num_faces=1
            )
            self.mp_detector = mp_vision.FaceLandmarker.create_from_options(det_opts)
            flush_print("⚡ Khởi tạo thành công persistent MediaPipe FaceLandmarker để tối ưu hóa FPS!")
        except Exception as e:
            flush_print(f"⚠️ Cảnh báo: Không thể tải persistent FaceLandmarker: {e}. Sẽ dùng OpenCV Cascade dự phòng.")
        
    def _image_to_tensor(self, image_rgb):
        # Chuyển HWC sang CHW và float32
        x = image_rgb.transpose(2, 0, 1).astype(np.float32)
        # Chuẩn hóa về khoảng [-1.0, 1.0]
        x = (x - 127.5) / 127.5
        # Thêm chiều Batch (1, C, H, W)
        return np.expand_dims(x, axis=0)

    def extract_embedding(self, image_bgr):
        """
        Nhập một ảnh thô BGR, trả về vector embedding 512-D đã L2 Normalized
        """
        # 1. Phát hiện, căn chỉnh và trích xuất đặc trưng hình học (tái sử dụng detector)
        aligned, geom = detect_and_align_face_with_geom(image_bgr, detector=self.mp_detector)
        f_global, f_eye, f_nose = crop_sub_regions(aligned)
        
        # Chuyển BGR sang RGB
        f_global = cv2.cvtColor(f_global, cv2.COLOR_BGR2RGB)
        f_eye = cv2.cvtColor(f_eye, cv2.COLOR_BGR2RGB)
        f_nose = cv2.cvtColor(f_nose, cv2.COLOR_BGR2RGB)
        
        # 2. Đưa ảnh về dạng Tensor float32 NCHW và vector tọa độ hình học (1, 26, 2)
        t_global = self._image_to_tensor(f_global)
        t_eye = self._image_to_tensor(f_eye)
        t_nose = self._image_to_tensor(f_nose)
        t_geom = np.expand_dims(geom.astype(np.float32), axis=0) # Shape: (1, 26, 2)
        
        # 3. Chạy suy luận đa đầu vào tương thích đồ thị ONNX (gồm 3 luồng ảnh và 1 luồng tọa độ hình học)
        inputs = {
            "x_global": t_global,
            "x_eye": t_eye,
            "x_nose": t_nose,
            "x_geom": t_geom
        }
        
        outputs = self.session.run(["face_embedding", "attention_weights"], inputs)
        raw_embedding = outputs[0][0] # Vector 512 chiều của ảnh đầu tiên
        attention_w = outputs[1][0]   # Trọng số attention cho 3 phân vùng
        
        # 4. L2 Normalization (Bắt buộc)
        norm = np.linalg.norm(raw_embedding)
        if norm == 0:
            norm = 1e-6
        normalized_embedding = raw_embedding / norm
        
        return normalized_embedding, attention_w

    def process_frame(self, frame_bgr):
        """
        Xử lý toàn bộ khung hình camera (BGR): phát hiện mặt, tính bounding box, landmarks,
        và trích xuất vector đặc trưng embedding kèm trọng số attention.
        """
        h, w = frame_bgr.shape[:2]
        
        # 1. Thử dùng persistent FaceLandmarker trước để bắt khuôn mặt nghiêng/chéo/che
        if self.mp_detector is not None:
            try:
                import mediapipe as mp
                rgb = cv2.cvtColor(frame_bgr, cv2.COLOR_BGR2RGB)
                mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb)
                results = self.mp_detector.detect(mp_image)
                
                if results.face_landmarks:
                    face_landmarks = results.face_landmarks[0]
                    
                    # Tính toán bbox từ 26 landmarks
                    landmark_indices = [33, 133, 362, 263, 159, 145, 386, 374, 468, 473, 70, 107, 300, 336, 168, 4, 129, 358, 164, 61, 291, 0, 17, 234, 454, 152]
                    x_coords = [face_landmarks[idx].x * w for idx in landmark_indices]
                    y_coords = [face_landmarks[idx].y * h for idx in landmark_indices]
                    
                    x_min, x_max = min(x_coords), max(x_coords)
                    y_min, y_max = min(y_coords), max(y_coords)
                    
                    box_w = x_max - x_min
                    box_h = y_max - y_min
                    pad_x = int(box_w * 0.2)
                    pad_y = int(box_h * 0.25)
                    
                    x = max(0, int(x_min - pad_x))
                    y = max(0, int(y_min - pad_y))
                    box_w_pad = min(w - x, int(box_w + 2 * pad_x))
                    box_h_pad = min(h - y, int(box_h + 2 * pad_y))
                    bbox = (x, y, box_w_pad, box_h_pad)
                    
                    # Lấy tọa độ tuyệt đối để vẽ landmarks
                    abs_landmarks = [(int(face_landmarks[idx].x * w), int(face_landmarks[idx].y * h)) for idx in landmark_indices]
                    
                    # Thực hiện align mặt và trích xuất đặc trưng hình học dùng landmarks đã có sẵn
                    aligned, geom = detect_and_align_face_with_geom(frame_bgr, detector=face_landmarks)
                    f_global, f_eye, f_nose = crop_sub_regions(aligned)
                    
                    f_global = cv2.cvtColor(f_global, cv2.COLOR_BGR2RGB)
                    f_eye = cv2.cvtColor(f_eye, cv2.COLOR_BGR2RGB)
                    f_nose = cv2.cvtColor(f_nose, cv2.COLOR_BGR2RGB)
                    
                    t_global = self._image_to_tensor(f_global)
                    t_eye = self._image_to_tensor(f_eye)
                    t_nose = self._image_to_tensor(f_nose)
                    t_geom = np.expand_dims(geom.astype(np.float32), axis=0) # (1, 26, 2)
                    
                    inputs = {
                        "x_global": t_global,
                        "x_eye": t_eye,
                        "x_nose": t_nose,
                        "x_geom": t_geom
                    }
                    
                    outputs = self.session.run(["face_embedding", "attention_weights"], inputs)
                    raw_embedding = outputs[0][0]
                    attention_w = outputs[1][0]
                    
                    norm = np.linalg.norm(raw_embedding)
                    if norm == 0:
                        norm = 1e-6
                    normalized_embedding = raw_embedding / norm
                    
                    return aligned, bbox, abs_landmarks, normalized_embedding, attention_w
            except Exception:
                pass
                
        # 2. Dự phòng bằng OpenCV Haar Cascade nếu FaceLandmarker lỗi
        try:
            cascade_path = cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
            face_cascade = cv2.CascadeClassifier(cascade_path)
            gray = cv2.cvtColor(frame_bgr, cv2.COLOR_BGR2GRAY)
            faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=3, minSize=(60, 60))
            if len(faces) > 0:
                xf, yf, wf, hf = max(faces, key=lambda r: r[2] * r[3])
                bbox = (xf, yf, wf, hf)
                face_roi = frame_bgr[yf:yf+hf, xf:xf+wf]
                
                aligned, geom = detect_and_align_face_with_geom(face_roi, detector=None)
                f_global, f_eye, f_nose = crop_sub_regions(aligned)
                
                f_global = cv2.cvtColor(f_global, cv2.COLOR_BGR2RGB)
                f_eye = cv2.cvtColor(f_eye, cv2.COLOR_BGR2RGB)
                f_nose = cv2.cvtColor(f_nose, cv2.COLOR_BGR2RGB)
                
                t_global = self._image_to_tensor(f_global)
                t_eye = self._image_to_tensor(f_eye)
                t_nose = self._image_to_tensor(f_nose)
                t_geom = np.expand_dims(geom.astype(np.float32), axis=0) # (1, 26, 2)
                
                inputs = {
                    "x_global": t_global,
                    "x_eye": t_eye,
                    "x_nose": t_nose,
                    "x_geom": t_geom
                }
                
                outputs = self.session.run(["face_embedding", "attention_weights"], inputs)
                raw_embedding = outputs[0][0]
                attention_w = outputs[1][0]
                
                norm = np.linalg.norm(raw_embedding)
                if norm == 0:
                    norm = 1e-6
                normalized_embedding = raw_embedding / norm
                
                return aligned, bbox, None, normalized_embedding, attention_w
        except Exception:
            pass
            
        return None, None, None, None, None

# =====================================================================
# 3. QUẢN LÝ DATABASE VÀ SO KHỚP VECTOR BẰNG FAISS
# =====================================================================

class FaissFaceDatabase:
    def __init__(self, dimension=512, index_path="faiss_faces.index", ids_path="user_ids.txt"):
        self.dimension = dimension
        self.index_path = index_path
        self.ids_path = ids_path
        # Khởi tạo chỉ mục FAISS Inner Product (Tương đương Cosine Similarity khi vector được L2 normalized)
        self.index = faiss.IndexFlatIP(self.dimension)
        self.user_ids = []
        
        # Tự động nạp cơ sở dữ liệu nếu đã có tệp lưu trữ sẵn
        self.load_if_exists()

    def register_user(self, user_id, embedding):
        """
        Đăng ký vector embedding khuôn mặt mới cho ID người dùng
        """
        vector = np.array(embedding, dtype=np.float32).reshape(1, -1)
        # Đảm bảo vector được chuẩn hóa L2
        norm = np.linalg.norm(vector)
        if norm == 0:
            norm = 1e-6
        vector_normalized = vector / norm
        
        # Thêm vào chỉ mục FAISS
        self.index.add(vector_normalized)
        self.user_ids.append(str(user_id))
        flush_print(f"✅ Đăng ký thành công Face Vector cho User ID: '{user_id}' vào FAISS.")
        
        # Tự động lưu trữ cơ sở dữ liệu sau khi đăng ký mới
        self.save_database()

    def search_nearest(self, query_embedding, threshold=0.55):
        """
        Tìm kiếm danh tính khớp nhất trong Database ngoại tuyến bằng FAISS
        """
        if len(self.user_ids) == 0:
            return None, 0.0
            
        vector = np.array(query_embedding, dtype=np.float32).reshape(1, -1)
        # Chuẩn hóa L2
        norm = np.linalg.norm(vector)
        if norm == 0:
            norm = 1e-6
        vector_normalized = vector / norm
        
        # Thực hiện truy vấn K=1 láng giềng gần nhất
        similarities, indices = self.index.search(vector_normalized, 1)
        
        best_idx = indices[0][0]
        best_sim = similarities[0][0]
        
        # Kiểm tra ngưỡng tương đồng Cosine
        if best_idx != -1 and best_sim >= threshold:
            matched_user = self.user_ids[best_idx]
            return matched_user, float(best_sim)
        else:
            # Trả về None nếu không ai vượt qua được ngưỡng tin cậy
            return None, float(best_sim)

    def save_database(self):
        faiss.write_index(self.index, self.index_path)
        with open(self.ids_path, "w") as f:
            for uid in self.user_ids:
                f.write(f"{uid}\n")
        flush_print("💾 Cơ sở dữ liệu FAISS đã được ghi xuống đĩa.")

    def load_if_exists(self):
        if os.path.exists(self.index_path) and os.path.exists(self.ids_path):
            self.index = faiss.read_index(self.index_path)
            with open(self.ids_path, "r") as f:
                self.user_ids = [line.strip() for line in f.readlines()]
            flush_print(f"🔌 Đã nạp thành công Database Vector với {len(self.user_ids)} bản ghi khuôn mặt.")
        else:
            flush_print("💡 Khởi tạo Cơ sở dữ liệu Vector trống.")

# =====================================================================
# 4. CHƯƠNG TRÌNH KIỂM THỬ SUY LUẬN & ĐĂNG KÝ VẬN HÀNH
# =====================================================================

def main():
    # Kiểm tra sự tồn tại của mô hình ONNX
    onnx_path = "custom_face_cnn.onnx"
    if not os.path.exists(onnx_path):
        flush_print(f"❌ Không tìm thấy tệp {onnx_path}. Hãy chạy train.py trước để tạo ra mô hình ONNX.")
        return

    # 1. Khởi tạo mô hình ONNX và Database Vector
    recognizer = OnnxFaceRecognizer(onnx_path)
    db = FaissFaceDatabase()

    # 2. Đăng ký tự động thử nghiệm nếu DB đang trống (Nạp ảnh mẫu từ dataraw)
    dataraw_dir = os.path.join(WORKSPACE_DIR, "TreeOfThought/docs/nhan-dien-khuon-mat/ArcFaceFinetune/dataraw")
    if len(db.user_ids) == 0 and os.path.exists(dataraw_dir):
        flush_print("🔄 Cơ sở dữ liệu trống. Đang quét ảnh trong dataraw để đăng ký mẫu...")
        identities = [d for d in os.listdir(dataraw_dir) if os.path.isdir(os.path.join(dataraw_dir, d))]
        
        for uid in identities[:5]: # Đăng ký tối đa 5 người đầu tiên để test
            user_path = os.path.join(dataraw_dir, uid)
            files = [f for f in os.listdir(user_path) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
            if files:
                # Lấy ảnh đầu tiên của từng người để đăng ký
                img_file = os.path.join(user_path, files[0])
                img = cv2.imread(img_file)
                if img is not None:
                    emb, _ = recognizer.extract_embedding(img)
                    db.register_user(uid, emb)
                    
    # 3. Thực hiện chạy truy vấn so khớp thử nghiệm
    if len(db.user_ids) > 0:
        flush_print("🔎 Thực hiện kịch bản so khớp khuôn mặt truy vấn...")
        # Lấy một danh tính ngẫu nhiên đã đăng ký để tìm ảnh khác của họ làm truy vấn
        test_uid = db.user_ids[0]
        user_path = os.path.join(dataraw_dir, test_uid)
        files = [f for f in os.listdir(user_path) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
        
        if len(files) > 1:
            # Lấy ảnh thứ hai (khác ảnh đăng ký) để so khớp thực tế
            query_img_file = os.path.join(user_path, files[1])
            flush_print(f"📷 Đọc ảnh truy vấn của '{test_uid}': {query_img_file}")
            
            img = cv2.imread(query_img_file)
            if img is not None:
                query_emb, weights = recognizer.extract_embedding(img)
                flush_print(f"📊 Trọng số Attention thu được: Mắt: {weights[0]:.4f} | Mũi: {weights[1]:.4f} | Chung: {weights[2]:.4f}")
                
                matched_user, sim = db.search_nearest(query_emb, threshold=0.50)
                if matched_user:
                    flush_print(f"🎉 KHỚP THÀNH CÔNG! Đã nhận diện được User ID: '{matched_user}' | Độ tương đồng Cosine: {sim:.4f}")
                else:
                    flush_print(f"❓ Nhận diện thất bại! Không ai vượt qua ngưỡng. Người gần nhất có độ tương đồng: {sim:.4f}")
        else:
            flush_print("⚠️ Không đủ ảnh khác biệt của danh tính để chạy kịch bản thử nghiệm.")
    else:
        flush_print("⚠️ Cơ sở dữ liệu rỗng và không thấy thư mục dataraw để tự động tạo dữ liệu mẫu.")

if __name__ == "__main__":
    main()
