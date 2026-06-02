import os
import sys
import cv2
import numpy as np
import onnxruntime as ort
import faiss

WORKSPACE_DIR = "/work/a.i-assistant-chatbot-telegram-serverles"
BLAZEFACE_MODEL_PATH = os.path.join(WORKSPACE_DIR, "TreeOfThought/docs/nhan-dien-khuon-mat/ArcFaceFinetune/arcfacemodels/blaze_face_short_range.tflite")

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
    Quy trình phát hiện và căn chỉnh mắt (MediaPipe -> OpenCV Haar -> Center Crop)
    Trả về cả ảnh đã align và vector đặc trưng hình học 12 chiều chuẩn hóa của 6 keypoints.
    """
    # Giá trị hình học mặc định
    default_geom = np.array([
        (55.9132 - 17.6186) / 112.0, 51.59885 / 112.0,
        (55.9132 + 17.6186) / 112.0, 51.59885 / 112.0,
        55.9132 / 112.0, 70.0 / 112.0,
        55.9132 / 112.0, 90.0 / 112.0,
        20.0 / 112.0, 60.0 / 112.0,
        92.0 / 112.0, 60.0 / 112.0
    ], dtype=np.float32)

    try:
        import mediapipe as mp
        
        # 1. Dùng MediaPipe BlazeFace với detector được tái sử dụng để đạt tốc độ cao
        if detector is not None:
            rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)
            mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb)
            result = detector.detect(mp_image)
            
            if result.detections:
                det = max(result.detections, key=lambda d: d.categories[0].score)
                kp = det.keypoints
                if len(kp) >= 2:
                    h, w = image_bgr.shape[:2]
                    right_eye = (int(kp[0].x * w), int(kp[0].y * h))
                    left_eye = (int(kp[1].x * w), int(kp[1].y * h))
                    
                    cx = (right_eye[0] + left_eye[0]) / 2.0
                    cy = (right_eye[1] + left_eye[1]) / 2.0
                    dx = left_eye[0] - right_eye[0]
                    dy = left_eye[1] - right_eye[1]
                    
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
                    
                    aligned_face = cv2.warpAffine(image_bgr, M, (112, 112), flags=cv2.INTER_CUBIC, borderValue=0)
                    
                    # Áp dụng ma trận M cho 6 keypoints
                    transformed_geom = []
                    for i in range(min(len(kp), 6)):
                        x_orig = kp[i].x * w
                        y_orig = kp[i].y * h
                        x_new = M[0, 0] * x_orig + M[0, 1] * y_orig + M[0, 2]
                        y_new = M[1, 0] * x_orig + M[1, 1] * y_orig + M[1, 2]
                        transformed_geom.extend([x_new / 112.0, y_new / 112.0])
                    
                    while len(transformed_geom) < 12:
                        transformed_geom.append(0.5)
                        
                    return aligned_face, np.array(transformed_geom, dtype=np.float32)

        # Dự phòng tự khởi tạo nếu detector là None (suy luận offline đơn lẻ)
        elif os.path.exists(BLAZEFACE_MODEL_PATH):
            from mediapipe.tasks import python as mp_py
            from mediapipe.tasks.python import vision as mp_vision
            base_opts = mp_py.BaseOptions(model_asset_path=BLAZEFACE_MODEL_PATH)
            det_opts = mp_vision.FaceDetectorOptions(base_options=base_opts, min_detection_confidence=0.35)
            
            with mp_vision.FaceDetector.create_from_options(det_opts) as single_detector:
                rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)
                mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb)
                result = single_detector.detect(mp_image)
                
                if result.detections:
                    det = max(result.detections, key=lambda d: d.categories[0].score)
                    kp = det.keypoints
                    if len(kp) >= 2:
                        h, w = image_bgr.shape[:2]
                        right_eye = (int(kp[0].x * w), int(kp[0].y * h))
                        left_eye = (int(kp[1].x * w), int(kp[1].y * h))
                        
                        cx = (right_eye[0] + left_eye[0]) / 2.0
                        cy = (right_eye[1] + left_eye[1]) / 2.0
                        dx = left_eye[0] - right_eye[0]
                        dy = left_eye[1] - right_eye[1]
                        
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
                        
                        aligned_face = cv2.warpAffine(image_bgr, M, (112, 112), flags=cv2.INTER_CUBIC, borderValue=0)
                        
                        # Áp dụng ma trận M cho 6 keypoints
                        transformed_geom = []
                        for i in range(min(len(kp), 6)):
                            x_orig = kp[i].x * w
                            y_orig = kp[i].y * h
                            x_new = M[0, 0] * x_orig + M[0, 1] * y_orig + M[0, 2]
                            y_new = M[1, 0] * x_orig + M[1, 1] * y_orig + M[1, 2]
                            transformed_geom.extend([x_new / 112.0, y_new / 112.0])
                        
                        while len(transformed_geom) < 12:
                            transformed_geom.append(0.5)
                            
                        return aligned_face, np.array(transformed_geom, dtype=np.float32)
    except Exception:
        pass

    try:
        cascade_path = cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
        eye_cascade_path = cv2.data.haarcascades + 'haarcascade_eye.xml'
        
        face_cascade = cv2.CascadeClassifier(cascade_path)
        eye_cascade = cv2.CascadeClassifier(eye_cascade_path)
        
        gray = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=3, minSize=(30, 30))
        if len(faces) > 0:
            x, y, fw, fh = max(faces, key=lambda r: r[2] * r[3])
            roi_gray = gray[y:y+fh, x:x+fw]
            eyes = eye_cascade.detectMultiScale(roi_gray, scaleFactor=1.1, minNeighbors=3, minSize=(10, 10))
            if len(eyes) >= 2:
                es = sorted(eyes, key=lambda e: e[0])
                left_eye = (x + es[0][0] + es[0][2] // 2, y + es[0][1] + es[0][3] // 2)
                right_eye = (x + es[1][0] + es[1][2] // 2, y + es[1][1] + es[1][3] // 2)
                
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
                
                aligned_face = cv2.warpAffine(image_bgr, M, (112, 112), flags=cv2.INTER_CUBIC, borderValue=0)
                return aligned_face, default_geom
                
            face_crop = image_bgr[y:y+fh, x:x+fw]
            return cv2.resize(face_crop, (112, 112), interpolation=cv2.INTER_CUBIC), default_geom
    except Exception:
        pass

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
        
        # Khởi tạo FaceDetector của MediaPipe để tái sử dụng, tăng FPS suy luận thực tế lên gấp nhiều lần
        self.mp_detector = None
        try:
            import mediapipe as mp
            from mediapipe.tasks import python as mp_py
            from mediapipe.tasks.python import vision as mp_vision
            
            if os.path.exists(BLAZEFACE_MODEL_PATH):
                base_opts = mp_py.BaseOptions(model_asset_path=BLAZEFACE_MODEL_PATH)
                det_opts = mp_vision.FaceDetectorOptions(base_options=base_opts, min_detection_confidence=0.35)
                self.mp_detector = mp_vision.FaceDetector.create_from_options(det_opts)
                flush_print("⚡ Tải thành công persistent MediaPipe FaceDetector để tối ưu hóa FPS!")
        except Exception as e:
            flush_print(f"⚠️ Cảnh báo: Không thể tải persistent FaceDetector: {e}. Sẽ dùng OpenCV Cascade dự phòng.")
        
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
        
        # 2. Đưa ảnh về dạng Tensor float32 NCHW và vector tọa độ hình học (1, 12)
        t_global = self._image_to_tensor(f_global)
        t_eye = self._image_to_tensor(f_eye)
        t_nose = self._image_to_tensor(f_nose)
        t_geom = np.expand_dims(geom.astype(np.float32), axis=0) # Shape: (1, 12)
        
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
