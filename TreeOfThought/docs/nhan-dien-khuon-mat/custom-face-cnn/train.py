import os
os.environ["HSA_OVERRIDE_GFX_VERSION"] = "11.0.0" # Sửa lỗi rocBLAS TensileLibrary trên GPU AMD Radeon (gfx1103)
import sys
import cv2
import numpy as np
import random
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
from torchvision import transforms
from model import CustomPartBasedFaceCNN

# Cấu hình đường dẫn dữ liệu
WORKSPACE_DIR = "/work/a.i-assistant-chatbot-telegram-serverles"
DEFAULT_RAW_DIR = os.path.join(WORKSPACE_DIR, "TreeOfThought/docs/nhan-dien-khuon-mat/ArcFaceFinetune/dataraw")
PROCESSED_DIR = "./data_processed"
BLAZEFACE_MODEL_PATH = os.path.join(WORKSPACE_DIR, "TreeOfThought/docs/nhan-dien-khuon-mat/ArcFaceFinetune/arcfacemodels/blaze_face_short_range.tflite")

# Đảm bảo in ra stdout lập tức để C# parse
def flush_print(msg):
    print(msg)
    sys.stdout.flush()

# =====================================================================
# 1. BỘ TIỀN XỬ LÝ & CẮT PHÂN VÙNG KHUÔN MẶT (MediaPipe / OpenCV / Center Crop)
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
    ty = 51.59885
    
    scale = target_dist / current_dist
    M = cv2.getRotationMatrix2D((cx, cy), angle_deg, scale)
    M[0, 2] += (tx - cx)
    M[1, 2] += (ty - cy)
    
    aligned_face = cv2.warpAffine(image_bgr, M, (112, 112), flags=cv2.INTER_CUBIC, borderValue=0)
    return aligned_face

def detect_and_align_face_with_geom(image_bgr, detector=None):
    """
    Phát hiện mặt, align ngang mắt bằng MediaPipe -> OpenCV Haar -> Center Crop
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

    # 1. Dùng MediaPipe BlazeFace
    try:
        import mediapipe as mp
        
        # Sử dụng detector được tái sử dụng để đạt tốc độ cao
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

        # Dự phòng tự khởi tạo nếu detector là None
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

    # 2. Dự phòng bằng OpenCV Haar Cascade
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

    # 3. Dự phòng cuối cùng: Center Crop
    h, w = image_bgr.shape[:2]
    size = min(h, w)
    x = (w - size) // 2
    y = (h - size) // 2
    crop = image_bgr[y:y+size, x:x+size]
    return cv2.resize(crop, (112, 112), interpolation=cv2.INTER_CUBIC), default_geom

def crop_sub_regions(aligned_face):
    """
    Cắt các phân vùng đặc trưng từ ảnh khuôn mặt 112x112 đã align:
    - Global: 112x112
    - Eyes (Periocular): 112x56 (Y: 20:76, X: 0:112)
    - Nose: 56x56 (Y: 45:101, X: 28:84)
    """
    global_face = aligned_face.copy()
    eye_region = aligned_face[20:76, 0:112].copy()
    nose_region = aligned_face[45:101, 28:84].copy()
    return global_face, eye_region, nose_region

def preprocess_dataraw(raw_dir=DEFAULT_RAW_DIR, processed_dir=PROCESSED_DIR):
    """
    Quét dataraw, phát hiện, align và lưu ảnh phân vùng
    """
    # Nếu thư mục data_processed đã chứa dữ liệu thì bỏ qua để tiết kiệm thời gian
    global_dir = os.path.join(processed_dir, "global")
    if os.path.exists(global_dir) and os.path.isdir(global_dir) and len(os.listdir(global_dir)) > 0:
        flush_print("💡 Thư mục data_processed đã chứa dữ liệu từ trước. Bỏ qua bước tiền xử lý.")
        return True

    if not os.path.exists(raw_dir):
        flush_print(f"❌ Lỗi: Không tìm thấy thư mục dataraw tại {raw_dir}")
        return False
        
    flush_print(f"🔄 Bắt đầu tiền xử lý dữ liệu từ {raw_dir}...")
    
    # Tạo các thư mục lưu trữ phân vùng
    for part in ["global", "eye", "nose"]:
        os.makedirs(os.path.join(processed_dir, part), exist_ok=True)
        
    identities = [d for d in os.listdir(raw_dir) if os.path.isdir(os.path.join(raw_dir, d))]
    
    # Khởi tạo FaceDetector một lần duy nhất để tái sử dụng trong suốt quá trình tiền xử lý
    mp_detector = None
    try:
        import mediapipe as mp
        from mediapipe.tasks import python as mp_py
        from mediapipe.tasks.python import vision as mp_vision
        
        if os.path.exists(BLAZEFACE_MODEL_PATH):
            base_opts = mp_py.BaseOptions(model_asset_path=BLAZEFACE_MODEL_PATH)
            det_opts = mp_vision.FaceDetectorOptions(base_options=base_opts, min_detection_confidence=0.35)
            mp_detector = mp_vision.FaceDetector.create_from_options(det_opts)
            flush_print("⚡ Khởi tạo thành công persistent MediaPipe FaceDetector cho tiền xử lý!")
    except Exception as e:
        flush_print(f"⚠️ Cảnh báo: Không thể khởi tạo persistent FaceDetector: {e}. Sẽ dùng OpenCV Cascade dự phòng.")

    total_processed = 0
    for uid in identities:
        user_raw_path = os.path.join(raw_dir, uid)
        files = [f for f in os.listdir(user_raw_path) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
        
        if not files:
            continue
            
        # Tạo thư mục con tương ứng cho danh tính trong các thư mục phân vùng
        for part in ["global", "eye", "nose"]:
            os.makedirs(os.path.join(processed_dir, part, uid), exist_ok=True)
            
        for f in files:
            img_path = os.path.join(user_raw_path, f)
            img = cv2.imread(img_path)
            if img is None:
                continue
                
            aligned, geom = detect_and_align_face_with_geom(img, detector=mp_detector)
            f_global, f_eye, f_nose = crop_sub_regions(aligned)
            
            # Lưu ảnh & đặc trưng hình học landmarks
            base_name = os.path.splitext(f)[0]
            cv2.imwrite(os.path.join(processed_dir, "global", uid, f"{base_name}_global.png"), f_global)
            cv2.imwrite(os.path.join(processed_dir, "eye", uid, f"{base_name}_eye.png"), f_eye)
            cv2.imwrite(os.path.join(processed_dir, "nose", uid, f"{base_name}_nose.png"), f_nose)
            np.save(os.path.join(processed_dir, "global", uid, f"{base_name}_geom.npy"), geom)
            total_processed += 1
            
    # Giải phóng detector
    if mp_detector is not None:
        try:
            mp_detector.close()
        except Exception:
            pass

    flush_print(f"✅ Đã tiền xử lý xong {total_processed} bộ ảnh khuôn mặt đa vùng.")
    return True

# =====================================================================
# 2. PYTORCH MULTI-STREAM DATASET & LOADERS
# =====================================================================

class CustomMultiStreamDataset(Dataset):
    """
    Dataset tùy chỉnh nạp đồng thời 3 luồng ảnh: Global, Eye, Nose
    """
    def __init__(self, processed_dir, file_list, class_to_idx, transform=None, is_train=True):
        self.processed_dir = processed_dir
        self.file_list = file_list
        self.class_to_idx = class_to_idx
        self.transform = transform
        self.is_train = is_train

    def __len__(self):
        return len(self.file_list)

    def __getitem__(self, idx):
        uid, base_name = self.file_list[idx]
        label = self.class_to_idx[uid]
        
        # Đường dẫn tệp ảnh phân vùng
        global_path = os.path.join(self.processed_dir, "global", uid, f"{base_name}_global.png")
        eye_path = os.path.join(self.processed_dir, "eye", uid, f"{base_name}_eye.png")
        nose_path = os.path.join(self.processed_dir, "nose", uid, f"{base_name}_nose.png")
        
        img_global = cv2.imread(global_path)
        img_eye = cv2.imread(eye_path)
        img_nose = cv2.imread(nose_path)
        
        # Dự phòng nếu lỗi đọc ảnh
        if img_global is None: img_global = np.zeros((112, 112, 3), dtype=np.uint8)
        if img_eye is None: img_eye = np.zeros((56, 112, 3), dtype=np.uint8)
        if img_nose is None: img_nose = np.zeros((56, 56, 3), dtype=np.uint8)
        
        # Tải đặc trưng hình học
        geom_path = os.path.join(self.processed_dir, "global", uid, f"{base_name}_geom.npy")
        if os.path.exists(geom_path):
            geom = np.load(geom_path).copy()
        else:
            geom = np.array([
                (55.9132 - 17.6186) / 112.0, 51.59885 / 112.0,
                (55.9132 + 17.6186) / 112.0, 51.59885 / 112.0,
                55.9132 / 112.0, 70.0 / 112.0,
                55.9132 / 112.0, 90.0 / 112.0,
                20.0 / 112.0, 60.0 / 112.0,
                92.0 / 112.0, 60.0 / 112.0
            ], dtype=np.float32)

        # Chuyển đổi BGR sang RGB
        img_global = cv2.cvtColor(img_global, cv2.COLOR_BGR2RGB)
        img_eye = cv2.cvtColor(img_eye, cv2.COLOR_BGR2RGB)
        img_nose = cv2.cvtColor(img_nose, cv2.COLOR_BGR2RGB)
        
        # Áp dụng Data Augmentation / Occlusion Simulation khi Train
        if self.is_train:
            # 1. Ngẫu nhiên lật ngang đồng thời cả 3 luồng để giữ tính đối xứng
            if random.random() > 0.5:
                img_global = cv2.flip(img_global, 1)
                img_eye = cv2.flip(img_eye, 1)
                img_nose = cv2.flip(img_nose, 1)
                
                # Lật tọa độ hình học (x' = 1.0 - x) và tráo đổi trái-phải
                re_x, re_y = geom[0], geom[1]
                le_x, le_y = geom[2], geom[3]
                nt_x, nt_y = geom[4], geom[5]
                mc_x, mc_y = geom[6], geom[7]
                r_ear_x, r_ear_y = geom[8], geom[9]
                l_ear_x, l_ear_y = geom[10], geom[11]
                
                geom[0], geom[1] = 1.0 - le_x, le_y
                geom[2], geom[3] = 1.0 - re_x, re_y
                geom[4], geom[5] = 1.0 - nt_x, nt_y
                geom[6], geom[7] = 1.0 - mc_x, mc_y
                geom[8], geom[9] = 1.0 - l_ear_x, l_ear_y
                geom[10], geom[11] = 1.0 - r_ear_x, r_ear_y
                
            # 2. Ngẫu nhiên xoay và thay đổi tỷ lệ (giả lập nghiêng đầu / góc chéo của camera) - Xác suất 30%
            if random.random() > 0.7:
                angle = random.uniform(-15.0, 15.0)
                scale = random.uniform(0.9, 1.1)
                
                # Tính ma trận xoay quanh tâm khuôn mặt (56, 56)
                M_aug = cv2.getRotationMatrix2D((56, 56), angle, scale)
                
                # Áp dụng cho ảnh global
                img_global = cv2.warpAffine(img_global, M_aug, (112, 112), flags=cv2.INTER_CUBIC, borderValue=0)
                
                # Cắt lại mắt và mũi tương ứng với ảnh đã xoay để đồng bộ 100%
                img_eye = img_global[20:76, 0:112].copy()
                img_nose = img_global[45:101, 28:84].copy()
                
                # Áp dụng xoay tương tự cho 6 keypoints hình học
                for i in range(6):
                    px = geom[2*i] * 112.0
                    py = geom[2*i+1] * 112.0
                    nx = M_aug[0, 0] * px + M_aug[0, 1] * py + M_aug[0, 2]
                    ny = M_aug[1, 0] * px + M_aug[1, 1] * py + M_aug[1, 2]
                    geom[2*i] = nx / 112.0
                    geom[2*i+1] = ny / 112.0

            # 3. Vẽ khẩu trang giả lập ngẫu nhiên trên ảnh global (Xác suất 20%)
            if random.random() > 0.8:
                # Vẽ khối che khuất vùng miệng cằm (nửa dưới ảnh)
                cv2.rectangle(img_global, (0, 75), (112, 112), (128, 128, 128), -1)
                
            # 4. Vẽ kính cận giả lập ngẫu nhiên (Xác suất 20%)
            if random.random() > 0.8:
                # Vẽ gọng kính ngang vùng mắt (Y: 45:60)
                cv2.line(img_global, (15, 52), (97, 52), (0, 0, 0), 2)
                cv2.circle(img_global, (38, 52), 15, (0, 0, 0), 2)
                cv2.circle(img_global, (74, 52), 15, (0, 0, 0), 2)

            # 5. Thêm nhiễu hình học nhỏ (Jittering) để chống Overfitting
            geom += np.random.normal(0, 0.01, size=geom.shape).astype(np.float32)
            geom = np.clip(geom, 0.0, 1.0)

        # Chuẩn hóa về [-1.0, 1.0] tương ứng với ArcFace
        t_global = (torch.from_numpy(img_global).permute(2, 0, 1).float() - 127.5) / 127.5
        t_eye = (torch.from_numpy(img_eye).permute(2, 0, 1).float() - 127.5) / 127.5
        t_nose = (torch.from_numpy(img_nose).permute(2, 0, 1).float() - 127.5) / 127.5
        t_geom = torch.from_numpy(geom).float()
        
        return t_global, t_eye, t_nose, t_geom, label

# =====================================================================
# 3. VÒNG LẶP HUẤN LUYỆN & KIỂM ĐỊNH (TRAIN & VALIDATION)
# =====================================================================

def train_and_validate(epochs=15, batch_size=8, lr=0.0002, device_name="cpu", weight_decay=1e-4, val_split=0.8):
    # 1. Lấy danh tính và lập chỉ mục ảnh
    global_dir = os.path.join(PROCESSED_DIR, "global")
    if not os.path.exists(global_dir):
        flush_print("❌ Không thấy thư mục data_processed. Hãy chạy tiền xử lý trước.")
        return
        
    identities = sorted([d for d in os.listdir(global_dir) if os.path.isdir(os.path.join(global_dir, d))])
    class_to_idx = {uid: idx for idx, uid in enumerate(identities)}
    
    file_list = []
    for uid in identities:
        user_path = os.path.join(global_dir, uid)
        files = [f for f in os.listdir(user_path) if f.endswith("_global.png")]
        for f in files:
            base_name = f.replace("_global.png", "")
            file_list.append((uid, base_name))
            
    if not file_list:
        flush_print("❌ Không tìm thấy tệp ảnh đã tiền xử lý nào!")
        return

    # Trộn ngẫu nhiên dữ liệu và chia Train/Val theo tỉ lệ cấu hình
    random.seed(42)
    random.shuffle(file_list)
    split_idx = int(len(file_list) * val_split)
    train_files = file_list[:split_idx]
    val_files = file_list[split_idx:]
    
    if not val_files: # Đề phòng dataset quá nhỏ
        val_files = train_files
        
    train_dataset = CustomMultiStreamDataset(PROCESSED_DIR, train_files, class_to_idx, is_train=True)
    val_dataset = CustomMultiStreamDataset(PROCESSED_DIR, val_files, class_to_idx, is_train=False)
    
    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True, drop_last=True)
    val_loader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False)
    
    # 2. Khởi tạo mô hình, tối ưu hóa và hàm mất mát
    device = torch.device(device_name)
    flush_print(f"🖥️ Thiết bị sử dụng huấn luyện: {device}")
    
    model = CustomPartBasedFaceCNN(num_classes=len(identities), pretrained_global=False).to(device)
    optimizer = optim.AdamW(model.parameters(), lr=lr, weight_decay=weight_decay)
    criterion = nn.CrossEntropyLoss()
    
    best_val_loss = float('inf')
    
    # 3. Vòng lặp huấn luyện chính
    flush_print("🚀 Bắt đầu quá trình huấn luyện mạng Custom Face CNN...")
    
    for epoch in range(1, epochs + 1):
        model.train()
        train_loss = 0.0
        correct_train = 0
        total_train = 0
        
        for batch_idx, (t_global, t_eye, t_nose, t_geom, labels) in enumerate(train_loader):
            t_global = t_global.to(device)
            t_eye = t_eye.to(device)
            t_nose = t_nose.to(device)
            t_geom = t_geom.to(device)
            labels = labels.to(device)
            
            optimizer.zero_grad()
            
            # Chạy lan truyền thuận (gồm cả ảnh phân vùng và đặc trưng hình học)
            _, logits, _ = model.forward_training(t_global, t_eye, t_nose, t_geom)
            loss = criterion(logits, labels)
            
            loss.backward()
            optimizer.step()
            
            train_loss += loss.item() * labels.size(0)
            _, predicted = torch.max(logits, 1)
            total_train += labels.size(0)
            correct_train += (predicted == labels).sum().item()
            
            acc_batch = (predicted == labels).sum().item() / labels.size(0) * 100
            # Định dạng stdout cho C# parse tiến độ từng batch
            flush_print(f"[BATCH_PROGRESS] Epoch: {epoch}/{epochs} | Batch: {batch_idx+1}/{len(train_loader)} | Loss: {loss.item():.4f} | Acc: {acc_batch:.2f}%")
            
        epoch_train_loss = train_loss / total_train
        epoch_train_acc = correct_train / total_train * 100
        
        # Vòng lặp đánh giá trên tập Validation
        model.eval()
        val_loss = 0.0
        correct_val = 0
        total_val = 0
        
        with torch.no_grad():
            for t_global, t_eye, t_nose, t_geom, labels in val_loader:
                t_global = t_global.to(device)
                t_eye = t_eye.to(device)
                t_nose = t_nose.to(device)
                t_geom = t_geom.to(device)
                labels = labels.to(device)
                
                _, logits, _ = model.forward_training(t_global, t_eye, t_nose, t_geom)
                loss = criterion(logits, labels)
                
                val_loss += loss.item() * labels.size(0)
                _, predicted = torch.max(logits, 1)
                total_val += labels.size(0)
                correct_val += (predicted == labels).sum().item()
                
        epoch_val_loss = val_loss / total_val
        epoch_val_acc = correct_val / total_val * 100
        
        # Định dạng stdout cho C# parse tiến độ epoch
        flush_print(f"[EPOCH_PROGRESS] Epoch: {epoch}/{epochs} | Loss: {epoch_val_loss:.4f} | Acc: {epoch_val_acc:.2f}%")
        
        # Lưu checkpoint tốt nhất dựa trên Val Loss
        if epoch_val_loss < best_val_loss:
            best_val_loss = epoch_val_loss
            checkpoint = {
                "epoch": epoch,
                "model_state_dict": model.state_dict(),
                "optimizer_state_dict": optimizer.state_dict(),
                "loss": epoch_val_loss,
                "class_to_idx": class_to_idx
            }
            torch.save(checkpoint, "checkpoint_best.pth")
            flush_print("💾 Đã lưu Checkpoint tốt nhất (Best loss).")
            
    # Lưu checkpoint cuối cùng
    torch.save({
        "epoch": epochs,
        "model_state_dict": model.state_dict(),
        "optimizer_state_dict": optimizer.state_dict(),
        "loss": epoch_val_loss,
        "class_to_idx": class_to_idx
    }, "checkpoint_final.pth")
    flush_print("💾 Đã lưu Checkpoint cuối cùng (checkpoint_final.pth).")
    
    # 4. Xuất mô hình tốt nhất sang định dạng ONNX
    export_best_to_onnx(len(identities))

# =====================================================================
# 4. BỘ XUẤT MÔ HÌNH SANG ĐỊNH DẠNG ONNX
# =====================================================================

def export_best_to_onnx(num_classes, checkpoint_path="checkpoint_best.pth", output_onnx_path="custom_face_cnn.onnx"):
    if not os.path.exists(checkpoint_path):
        flush_print(f"⚠️ Không tìm thấy checkpoint tại {checkpoint_path}. Huấn luyện xong sẽ xuất.")
        return
        
    flush_print("🔄 Đang nạp checkpoint tốt nhất để xuất sang định dạng ONNX...")
    model = CustomPartBasedFaceCNN(num_classes=num_classes)
    checkpoint = torch.load(checkpoint_path, map_location="cpu")
    model.load_state_dict(checkpoint["model_state_dict"])
    model.eval()
    
    # Chuẩn bị dummy inputs (gồm 3 luồng ảnh và 1 luồng tọa độ hình học 12-D)
    dummy_global = torch.randn(1, 3, 112, 112, dtype=torch.float32)
    dummy_eye = torch.randn(1, 3, 56, 112, dtype=torch.float32)
    dummy_nose = torch.randn(1, 3, 56, 56, dtype=torch.float32)
    dummy_geom = torch.randn(1, 12, dtype=torch.float32)
    
    dummy_inputs = (dummy_global, dummy_eye, dummy_nose, dummy_geom)
    input_names = ["x_global", "x_eye", "x_nose", "x_geom"]
    output_names = ["face_embedding", "attention_weights"]
    
    dynamic_axes = {
        "x_global": {0: "batch_size"},
        "x_eye": {0: "batch_size"},
        "x_nose": {0: "batch_size"},
        "x_geom": {0: "batch_size"},
        "face_embedding": {0: "batch_size"},
        "attention_weights": {0: "batch_size"}
    }
    
    flush_print(f"🔄 Đang thực thi torch.onnx.export -> {output_onnx_path}...")
    torch.onnx.export(
        model,
        dummy_inputs,
        output_onnx_path,
        export_params=True,
        opset_version=16,
        do_constant_folding=True,
        input_names=input_names,
        output_names=output_names,
        dynamic_axes=dynamic_axes
    )
    flush_print("✅ Đã tạo thành công mô hình ONNX đa cổng đầu vào: custom_face_cnn.onnx")

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Train Custom Part-Based Face CNN for Asian faces.")
    parser.add_argument("--epochs", type=int, default=10, help="Number of training epochs (default: 10)")
    parser.add_argument("--batch_size", type=int, default=4, help="Batch size for training (default: 4)")
    parser.add_argument("--lr", type=float, default=0.0002, help="Learning rate (default: 0.0002)")
    parser.add_argument("--device", type=str, default="cpu", help="Device to use for training, e.g. cpu, cuda, or hip (default: cpu)")
    parser.add_argument("--weight_decay", type=float, default=1e-4, help="Weight decay for AdamW optimizer (default: 1e-4)")
    parser.add_argument("--val_split", type=float, default=0.8, help="Train/Validation split ratio (default: 0.8)")
    args = parser.parse_args()

    # Bước 1: Tiền xử lý dataraw
    success = preprocess_dataraw()
    if success:
        # Bước 2: Huấn luyện mạng và xuất ONNX
        train_and_validate(
            epochs=args.epochs,
            batch_size=args.batch_size,
            lr=args.lr,
            device_name=args.device,
            weight_decay=args.weight_decay,
            val_split=args.val_split
        )
