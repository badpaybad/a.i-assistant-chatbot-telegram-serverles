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
import shutil
from evaluator import evaluate_epoch

# Cấu hình đường dẫn dữ liệu
WORKSPACE_DIR = "/work/a.i-assistant-chatbot-telegram-serverles"
DEFAULT_RAW_DIR = os.path.join(WORKSPACE_DIR, "TreeOfThought/docs/nhan-dien-khuon-mat/ArcFaceFinetune/dataraw")
PROCESSED_DIR = "./data_processed"
BLAZEFACE_MODEL_PATH = os.path.join(WORKSPACE_DIR, "TreeOfThought/docs/nhan-dien-khuon-mat/ArcFaceFinetune/arcfacemodels/blaze_face_short_range.tflite")
FACELANDMARKER_MODEL_PATH = os.path.join(WORKSPACE_DIR, "TreeOfThought/docs/nhan-dien-khuon-mat/ArcFaceFinetune/arcfacemodels/face_landmarker.task")

# Đảm bảo in ra stdout lập tức và ghi vào file train.log
def flush_print(msg):
    print(msg)
    sys.stdout.flush()
    try:
        with open("train.log", "a", encoding="utf-8") as f:
            f.write(msg + "\n")
    except Exception:
        pass

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

def detect_and_align_face_with_geom(image_bgr, face_mesh_detector=None):
    """
    Phát hiện mặt và trích xuất 26 landmarks bằng MediaPipe Face Landmarker.
    Nếu Face Landmarker hoạt động, ta dùng tọa độ mắt để xoay align ảnh 112x112,
    sau đó biến đổi affine tọa độ 26 landmarks về khung 112x112 chuẩn hóa.
    Nếu Face Landmarker không chạy được/không phát hiện thấy mặt, ta dùng Haar Cascade / Center Crop
    và trả về khuôn mặt align kèm tọa độ template 26 landmarks mặc định.
    """
    # 37 landmarks mặc định trên khung 112x112 chuẩn hóa (bao gồm 11 viền/đường bao khuôn mặt)
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
        [55.9/112.0, 105.0/112.0], # 25. Chin
        [55.9/112.0, 10.0/112.0],  # 26. Forehead top center (10)
        [30.0/112.0, 15.0/112.0],  # 27. Forehead top left (109)
        [82.0/112.0, 15.0/112.0],  # 28. Forehead top right (338)
        [15.0/112.0, 35.0/112.0],  # 29. Left temple (127)
        [97.0/112.0, 35.0/112.0],  # 30. Right temple (356)
        [15.0/112.0, 60.0/112.0],  # 31. Left mid-jaw (132)
        [97.0/112.0, 60.0/112.0],  # 32. Right mid-jaw (361)
        [25.0/112.0, 85.0/112.0],  # 33. Left lower jaw (58)
        [87.0/112.0, 85.0/112.0],  # 34. Right lower jaw (288)
        [40.0/112.0, 102.0/112.0], # 35. Left chin corner (136)
        [72.0/112.0, 102.0/112.0]  # 36. Right chin corner (365)
    ], dtype=np.float32)

    landmark_indices = [
        33, 133, 362, 263, 159, 145, 386, 374, 468, 473, 
        70, 107, 300, 336, 168, 4, 129, 358, 164, 61, 
        291, 0, 17, 234, 454, 152,
        10, 109, 338, 127, 356, 132, 361, 58, 288, 136, 365
    ]

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

    # 1. Dùng MediaPipe Face Landmarker
    if face_mesh_detector is not None:
        try:
            import mediapipe as mp
            rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)
            mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb)
            results = face_mesh_detector.detect(mp_image)
            if results.face_landmarks:
                return process_landmarks(results.face_landmarks[0])
        except Exception:
            pass
    else:
        # Dự phòng tự khởi tạo
        try:
            import mediapipe as mp
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
    Cắt các phân vùng đặc trưng từ ảnh khuôn mặt 112x112 đã align:
    - Global: 112x112
    - Eyes (Periocular): 112x56 (Y: 20:76, X: 0:112)
    - Nose: 56x56 (Y: 45:101, X: 28:84)
    """
    global_face = aligned_face.copy()
    eye_region = aligned_face[20:76, 0:112].copy()
    nose_region = aligned_face[45:101, 28:84].copy()
    return global_face, eye_region, nose_region

def preprocess_dataraw(raw_dir=DEFAULT_RAW_DIR, processed_dir=PROCESSED_DIR, num_landmarks=37):
    """
    Quét dataraw, phát hiện, align, áp dụng tăng cường dữ liệu (data augmentation) và lưu ảnh phân vùng
    """
    # Kiểm tra xem dữ liệu đã được xử lý ở dạng num_landmarks và có chứa dữ liệu tăng cường chưa
    need_reprocess = True
    global_dir = os.path.join(processed_dir, "global")
    if os.path.exists(global_dir) and os.path.isdir(global_dir):
        npy_files = []
        has_aug = False
        for root, dirs, files in os.walk(global_dir):
            for f in files:
                if f.endswith("_geom.npy"):
                    npy_files.append(os.path.join(root, f))
                if "_aug_" in f:
                    has_aug = True
            if npy_files and has_aug:
                break
        
        if npy_files and has_aug:
            try:
                test_geom = np.load(npy_files[0])
                if test_geom.shape == (num_landmarks, 2):
                    need_reprocess = False
                    flush_print(f"💡 Thư mục data_processed đã chứa dữ liệu dạng {num_landmarks} landmarks và ảnh tăng cường. Bỏ qua tiền xử lý.")
                    return True
            except Exception:
                pass

    if need_reprocess:
        if os.path.exists(processed_dir):
            flush_print("♻️ Phát hiện thư mục dữ liệu cũ hoặc chưa đủ ảnh tăng cường, tiến hành dọn dẹp để xử lý lại...")
            shutil.rmtree(processed_dir)

    if not os.path.exists(raw_dir):
        flush_print(f"❌ Lỗi: Không tìm thấy thư mục dataraw tại {raw_dir}")
        return False
        
    flush_print(f"🔄 Bắt đầu tiền xử lý dữ liệu và tạo ảnh tăng cường (Data Augmentation) từ {raw_dir}...")
    
    # Tạo các thư mục lưu trữ phân vùng
    for part in ["global", "eye", "nose"]:
        os.makedirs(os.path.join(processed_dir, part), exist_ok=True)
        
    identities = [d for d in os.listdir(raw_dir) if os.path.isdir(os.path.join(raw_dir, d))]
    
    # Khởi tạo FaceLandmarker một lần duy nhất để tái sử dụng
    mp_detector = None
    try:
        from mediapipe.tasks import python as mp_py
        from mediapipe.tasks.python import vision as mp_vision
        base_opts = mp_py.BaseOptions(model_asset_path=FACELANDMARKER_MODEL_PATH)
        det_opts = mp_vision.FaceLandmarkerOptions(
            base_options=base_opts,
            running_mode=mp_vision.RunningMode.IMAGE,
            num_faces=1
        )
        mp_detector = mp_vision.FaceLandmarker.create_from_options(det_opts)
        flush_print("⚡ Khởi tạo thành công persistent MediaPipe FaceLandmarker cho tiền xử lý!")
    except Exception as e:
        flush_print(f"⚠️ Cảnh báo: Không thể khởi tạo persistent FaceLandmarker: {e}. Sẽ dùng OpenCV Cascade dự phòng.")

    total_processed = 0
    total_augmented = 0
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
                
            aligned, geom = detect_and_align_face_with_geom(img, face_mesh_detector=mp_detector)
            f_global, f_eye, f_nose = crop_sub_regions(aligned)
            
            # 1. Lưu ảnh gốc đã align & đặc trưng hình học landmarks
            base_name = os.path.splitext(f)[0]
            cv2.imwrite(os.path.join(processed_dir, "global", uid, f"{base_name}_global.png"), f_global)
            cv2.imwrite(os.path.join(processed_dir, "eye", uid, f"{base_name}_eye.png"), f_eye)
            cv2.imwrite(os.path.join(processed_dir, "nose", uid, f"{base_name}_nose.png"), f_nose)
            np.save(os.path.join(processed_dir, "global", uid, f"{base_name}_geom.npy"), geom)
            total_processed += 1
            
            # --- TĂNG CƯỜNG DỮ LIỆU OFFLINE (OFFLINE DATA AUGMENTATION) ---
            # Tạo 5 phiên bản tăng cường để chống quá khớp (Overfitting):
            
            # 1. Lật ngang (Horizontal Flip)
            aligned_flip = cv2.flip(aligned, 1)
            geom_flip = geom.copy()
            geom_flip[:, 0] = 1.0 - geom_flip[:, 0]
            geom_flip[[0, 3]] = geom_flip[[3, 0]]
            geom_flip[[1, 2]] = geom_flip[[2, 1]]
            geom_flip[[4, 6]] = geom_flip[[6, 4]]
            geom_flip[[5, 7]] = geom_flip[[7, 5]]
            geom_flip[[8, 9]] = geom_flip[[9, 8]]
            geom_flip[[10, 12]] = geom_flip[[12, 10]]
            geom_flip[[11, 13]] = geom_flip[[13, 11]]
            geom_flip[[16, 17]] = geom_flip[[17, 16]]
            geom_flip[[19, 20]] = geom_flip[[20, 19]]
            geom_flip[[23, 24]] = geom_flip[[24, 23]]
            
            # Tráo đổi các cặp đối xứng của viền khuôn mặt (indices 26-36):
            # 27<->28, 29<->30, 31<->32, 33<->34, 35<->36
            if geom_flip.shape[0] >= 37:
                geom_flip[[27, 28]] = geom_flip[[28, 27]]
                geom_flip[[29, 30]] = geom_flip[[30, 29]]
                geom_flip[[31, 32]] = geom_flip[[32, 31]]
                geom_flip[[33, 34]] = geom_flip[[34, 33]]
                geom_flip[[35, 36]] = geom_flip[[36, 35]]
            
            # 2. Xoay chéo trái (Rotation +10 độ, Scale 1.03)
            M_rotP = cv2.getRotationMatrix2D((56, 56), 10.0, 1.03)
            aligned_rotP = cv2.warpAffine(aligned, M_rotP, (112, 112), flags=cv2.INTER_CUBIC, borderValue=0)
            geom_rotP = geom.copy()
            for i in range(geom_rotP.shape[0]):
                px = geom[i, 0] * 112.0
                py = geom[i, 1] * 112.0
                nx = M_rotP[0, 0] * px + M_rotP[0, 1] * py + M_rotP[0, 2]
                ny = M_rotP[1, 0] * px + M_rotP[1, 1] * py + M_rotP[1, 2]
                geom_rotP[i, 0] = np.clip(nx / 112.0, 0.0, 1.0)
                geom_rotP[i, 1] = np.clip(ny / 112.0, 0.0, 1.0)

            # 3. Xoay chéo phải (Rotation -10 độ, Scale 1.03)
            M_rotN = cv2.getRotationMatrix2D((56, 56), -10.0, 1.03)
            aligned_rotN = cv2.warpAffine(aligned, M_rotN, (112, 112), flags=cv2.INTER_CUBIC, borderValue=0)
            geom_rotN = geom.copy()
            for i in range(geom_rotN.shape[0]):
                px = geom[i, 0] * 112.0
                py = geom[i, 1] * 112.0
                nx = M_rotN[0, 0] * px + M_rotN[0, 1] * py + M_rotN[0, 2]
                ny = M_rotN[1, 0] * px + M_rotN[1, 1] * py + M_rotN[1, 2]
                geom_rotN[i, 0] = np.clip(nx / 112.0, 0.0, 1.0)
                geom_rotN[i, 1] = np.clip(ny / 112.0, 0.0, 1.0)

            # 4. Giả lập che khẩu trang (Mask Occlusion)
            aligned_mask = aligned.copy()
            cv2.rectangle(aligned_mask, (0, 75), (112, 112), (128, 128, 128), -1)
            geom_mask = geom.copy()

            # 5. Giả lập đeo kính cận (Glasses Occlusion)
            aligned_glasses = aligned.copy()
            cv2.line(aligned_glasses, (15, 52), (97, 52), (0, 0, 0), 2)
            cv2.circle(aligned_glasses, (38, 52), 15, (0, 0, 0), 2)
            cv2.circle(aligned_glasses, (74, 52), 15, (0, 0, 0), 2)
            geom_glasses = geom.copy()

            # 6. Tăng độ sáng (Brightness)
            aligned_bright = cv2.convertScaleAbs(aligned, alpha=1.2, beta=30)
            geom_bright = geom.copy()

            # 7. Giảm độ sáng (Darkness)
            aligned_dark = cv2.convertScaleAbs(aligned, alpha=0.8, beta=-30)
            geom_dark = geom.copy()

            # Lưu các phiên bản tăng cường
            augmentations = [
                ("_aug_flip", aligned_flip, geom_flip),
                ("_rotP", aligned_rotP, geom_rotP),
                ("_rotN", aligned_rotN, geom_rotN),
                ("_mask", aligned_mask, geom_mask),
                ("_glasses", aligned_glasses, geom_glasses),
                ("_bright", aligned_bright, geom_bright),
                ("_dark", aligned_dark, geom_dark)
            ]

            for suffix, aug_img, aug_geom in augmentations:
                aug_global, aug_eye, aug_nose = crop_sub_regions(aug_img)
                cv2.imwrite(os.path.join(processed_dir, "global", uid, f"{base_name}{suffix}_global.png"), aug_global)
                cv2.imwrite(os.path.join(processed_dir, "eye", uid, f"{base_name}{suffix}_eye.png"), aug_eye)
                cv2.imwrite(os.path.join(processed_dir, "nose", uid, f"{base_name}{suffix}_nose.png"), aug_nose)
                np.save(os.path.join(processed_dir, "global", uid, f"{base_name}{suffix}_geom.npy"), aug_geom)
                total_augmented += 1
            
    # Giải phóng detector
    if mp_detector is not None:
        try:
            mp_detector.close()
        except Exception:
            pass

    flush_print(f"✅ Đã tiền xử lý xong: {total_processed} ảnh gốc. Đã sinh thêm {total_augmented} ảnh tăng cường chống quá khớp.")
    return True

# =====================================================================
# 2. PYTORCH MULTI-STREAM DATASET & LOADERS
# =====================================================================

class CustomMultiStreamDataset(Dataset):
    """
    Dataset tùy chỉnh nạp đồng thời 3 luồng ảnh: Global, Eye, Nose
    """
    def __init__(self, processed_dir, file_list, class_to_idx, transform=None, is_train=True, allow_online_aug=True):
        self.processed_dir = processed_dir
        self.file_list = file_list
        self.class_to_idx = class_to_idx
        self.transform = transform
        self.is_train = is_train
        # allow_online_aug=False cho ảnh đã augment offline để tránh double-augmentation
        self.allow_online_aug = allow_online_aug

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
        
        # Tải đặc trưng hình học 26 landmarks
        geom_path = os.path.join(self.processed_dir, "global", uid, f"{base_name}_geom.npy")
        if os.path.exists(geom_path):
            geom = np.load(geom_path).copy()
        else:
            geom = np.array([
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
                [55.9/112.0, 105.0/112.0], # 25. Chin
                [55.9/112.0, 10.0/112.0],  # 26. Forehead top center (10)
                [30.0/112.0, 15.0/112.0],  # 27. Forehead top left (109)
                [82.0/112.0, 15.0/112.0],  # 28. Forehead top right (338)
                [15.0/112.0, 35.0/112.0],  # 29. Left temple (127)
                [97.0/112.0, 35.0/112.0],  # 30. Right temple (356)
                [15.0/112.0, 60.0/112.0],  # 31. Left mid-jaw (132)
                [97.0/112.0, 60.0/112.0],  # 32. Right mid-jaw (361)
                [25.0/112.0, 85.0/112.0],  # 33. Left lower jaw (58)
                [87.0/112.0, 85.0/112.0],  # 34. Right lower jaw (288)
                [40.0/112.0, 102.0/112.0], # 35. Left chin corner (136)
                [72.0/112.0, 102.0/112.0]  # 36. Right chin corner (365)
            ], dtype=np.float32)

        # Chuyển đổi BGR sang RGB
        img_global = cv2.cvtColor(img_global, cv2.COLOR_BGR2RGB)
        img_eye = cv2.cvtColor(img_eye, cv2.COLOR_BGR2RGB)
        img_nose = cv2.cvtColor(img_nose, cv2.COLOR_BGR2RGB)
        
        # Áp dụng Data Augmentation / Occlusion Simulation khi Train
        # Chỉ áp dụng online aug nếu được phép (tránh double-augment ảnh offline aug)
        if self.is_train and self.allow_online_aug:
            # 1. Ngẫu nhiên lật ngang đồng thời cả 3 luồng để giữ tính đối xứng
            if random.random() > 0.5:
                img_global = cv2.flip(img_global, 1)
                img_eye = cv2.flip(img_eye, 1)
                img_nose = cv2.flip(img_nose, 1)
                
                # Lật tọa độ hình học (x' = 1.0 - x)
                geom[:, 0] = 1.0 - geom[:, 0]
                
                # Tráo đổi các cặp đối xứng trái-phải cho 26 landmarks
                geom[[0, 3]] = geom[[3, 0]]
                geom[[1, 2]] = geom[[2, 1]]
                geom[[4, 6]] = geom[[6, 4]]
                geom[[5, 7]] = geom[[7, 5]]
                geom[[8, 9]] = geom[[9, 8]]
                geom[[10, 12]] = geom[[12, 10]]
                geom[[11, 13]] = geom[[13, 11]]
                geom[[16, 17]] = geom[[17, 16]]
                geom[[19, 20]] = geom[[20, 19]]
                geom[[23, 24]] = geom[[24, 23]]
                
                # Tráo đổi các cặp đối xứng của viền khuôn mặt (indices 26-36):
                # 27<->28, 29<->30, 31<->32, 33<->34, 35<->36
                if geom.shape[0] >= 37:
                    geom[[27, 28]] = geom[[28, 27]]
                    geom[[29, 30]] = geom[[30, 29]]
                    geom[[31, 32]] = geom[[32, 31]]
                    geom[[33, 34]] = geom[[34, 33]]
                    geom[[35, 36]] = geom[[36, 35]]
                
            # 2. Ngẫu nhiên xoay và thay đổi tỷ lệ (giả lập nghiêng đầu / góc chéo của camera) - Xác suất 30%
            if random.random() > 0.7:
                angle = random.uniform(-15.0, 15.0)
                scale = random.uniform(0.9, 1.1)
                
                M_aug = cv2.getRotationMatrix2D((56, 56), angle, scale)
                img_global = cv2.warpAffine(img_global, M_aug, (112, 112), flags=cv2.INTER_CUBIC, borderValue=0)
                
                # Cắt lại mắt và mũi tương ứng với ảnh đã xoay để đồng bộ 100%
                img_eye = img_global[20:76, 0:112].copy()
                img_nose = img_global[45:101, 28:84].copy()
                
                # Áp dụng xoay tương tự cho các keypoints hình học
                for i in range(geom.shape[0]):
                    px = geom[i, 0] * 112.0
                    py = geom[i, 1] * 112.0
                    nx = M_aug[0, 0] * px + M_aug[0, 1] * py + M_aug[0, 2]
                    ny = M_aug[1, 0] * px + M_aug[1, 1] * py + M_aug[1, 2]
                    geom[i, 0] = nx / 112.0
                    geom[i, 1] = ny / 112.0

            # 3. Vẽ khẩu trang giả lập ngẫu nhiên trên ảnh global (Xác suất 20%)
            if random.random() > 0.8:
                cv2.rectangle(img_global, (0, 75), (112, 112), (128, 128, 128), -1)
                
            # 4. Vẽ kính cận giả lập ngẫu nhiên (Xác suất 20%)
            if random.random() > 0.8:
                cv2.line(img_global, (15, 52), (97, 52), (0, 0, 0), 2)
                cv2.circle(img_global, (38, 52), 15, (0, 0, 0), 2)
                cv2.circle(img_global, (74, 52), 15, (0, 0, 0), 2)

            # 5. Gaussian Blur ngẫu nhiên (Xác suất 30%) - làm mờ ảnh để buộc mô hình học kết cấu tổng quát
            if random.random() > 0.7:
                ksize = random.choice([3, 5])
                img_global = cv2.GaussianBlur(img_global, (ksize, ksize), 0)
                img_eye = cv2.GaussianBlur(img_eye, (ksize, ksize), 0)
                img_nose = cv2.GaussianBlur(img_nose, (ksize, ksize), 0)

            # 6. Color Jitter: thay đổi ngẫu nhiên độ bão hòa và tương phản (Xác suất 40%)
            if random.random() > 0.6:
                alpha = random.uniform(0.7, 1.3)  # contrast
                beta = random.randint(-20, 20)     # brightness
                img_global = cv2.convertScaleAbs(img_global, alpha=alpha, beta=beta)
                img_eye = cv2.convertScaleAbs(img_eye, alpha=alpha, beta=beta)
                img_nose = cv2.convertScaleAbs(img_nose, alpha=alpha, beta=beta)

            # 7. Perspective Distortion nhẹ (Xác suất 20%) - giả lập góc camera thay đổi
            if random.random() > 0.8:
                margin = random.randint(3, 8)
                src_pts = np.float32([[0, 0], [111, 0], [111, 111], [0, 111]])
                dst_pts = np.float32([
                    [random.randint(0, margin), random.randint(0, margin)],
                    [111 - random.randint(0, margin), random.randint(0, margin)],
                    [111 - random.randint(0, margin), 111 - random.randint(0, margin)],
                    [random.randint(0, margin), 111 - random.randint(0, margin)]
                ])
                M_persp = cv2.getPerspectiveTransform(src_pts, dst_pts)
                img_global = cv2.warpPerspective(img_global, M_persp, (112, 112))
                img_eye = img_global[20:76, 0:112].copy()
                img_nose = img_global[45:101, 28:84].copy()

            # 8. Thêm nhiễu hình học (Geom Jittering) chống Overfitting - tăng std lên 0.015
            geom += np.random.normal(0, 0.015, size=geom.shape).astype(np.float32)
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

def train_and_validate(epochs=15, batch_size=8, lr=0.0002, device_name="cpu", weight_decay=1e-4, val_split=0.8, backbone_name="resnet18", pretrained_global=True, l1_lambda=1e-5, arcface_s=30.0, arcface_m=0.50, arcface_k=3, dropout=0.4, num_landmarks=37, freeze_epochs=0, freeze_layers=-1):
    # 1. Lấy danh tính và lập chỉ mục ảnh
    global_dir = os.path.join(PROCESSED_DIR, "global")
    if not os.path.exists(global_dir):
        flush_print("❌ Không thấy thư mục data_processed. Hãy chạy tiền xử lý trước.")
        return
        
    identities = sorted([d for d in os.listdir(global_dir) if os.path.isdir(os.path.join(global_dir, d))])
    class_to_idx = {uid: idx for idx, uid in enumerate(identities)}
    
    original_files = []  # Danh sách ảnh gốc (không chứa hậu tố tăng cường)
    augmented_files = {}  # Map từ uid -> { orig_base -> [aug_bases] }
    
    for uid in identities:
        user_path = os.path.join(global_dir, uid)
        files = [f for f in os.listdir(user_path) if f.endswith("_global.png")]
        for f in files:
            base_name = f.replace("_global.png", "")
            
            # Kiểm tra xem đây có phải là ảnh tăng cường không
            is_aug = False
            aug_suffixes = ["_aug_flip", "_rotP", "_rotN", "_mask", "_glasses", "_bright", "_dark"]
            for suffix in aug_suffixes:
                if base_name.endswith(suffix):
                    is_aug = True
                    orig_base = base_name[:-len(suffix)]
                    if uid not in augmented_files:
                        augmented_files[uid] = {}
                    if orig_base not in augmented_files[uid]:
                        augmented_files[uid][orig_base] = []
                    augmented_files[uid][orig_base].append(base_name)
                    break
            
            if not is_aug:
                original_files.append((uid, base_name))
                
    if not original_files:
        flush_print("❌ Không tìm thấy tệp ảnh gốc đã tiền xử lý nào!")
        return

    # Trộn ngẫu nhiên danh sách ảnh gốc để chia Train/Val
    random.seed(42)
    random.shuffle(original_files)
    split_idx = int(len(original_files) * val_split)
    train_originals = original_files[:split_idx]
    val_originals = original_files[split_idx:]
    val_files = [(uid, base) for uid, base in val_originals]  # Val chỉ dùng ảnh gốc sạch
    
    # FIX DATA LEAKAGE: Xây dựng tập val_orig_keys để loại bỏ aug của val khỏi train
    val_orig_keys = set((uid, base) for uid, base in val_originals)

    # Xây dựng train_files: ảnh gốc train + aug của chúng
    # KHÔNG cho aug của ảnh val vào train để tránh data leakage!
    train_files_orig = []   # Ảnh gốc train (dùng online aug)
    train_files_aug = []    # Ảnh offline aug train (KHÔNG dùng online aug)
    for uid, orig_base in train_originals:
        train_files_orig.append((uid, orig_base))
        if uid in augmented_files and orig_base in augmented_files[uid]:
            for aug_base in augmented_files[uid][orig_base]:
                train_files_aug.append((uid, aug_base))
                
    if not val_files:  # Đề phòng dataset quá nhỏ
        val_files = [(uid, base) for uid, base in train_originals]
        
    flush_print(f"📊 Train originals: {len(train_files_orig)} | Train aug (offline): {len(train_files_aug)} | Val (clean): {len(val_files)}")

    # Dataset gốc train: cho phép online augmentation đầy đủ
    train_dataset_orig = CustomMultiStreamDataset(PROCESSED_DIR, train_files_orig, class_to_idx, is_train=True, allow_online_aug=True)
    # Dataset aug train: KHÔNG online aug để tránh double-augmentation
    train_dataset_aug = CustomMultiStreamDataset(PROCESSED_DIR, train_files_aug, class_to_idx, is_train=True, allow_online_aug=False)
    # Ghép 2 dataset lại
    from torch.utils.data import ConcatDataset
    train_dataset = ConcatDataset([train_dataset_orig, train_dataset_aug])
    val_dataset = CustomMultiStreamDataset(PROCESSED_DIR, val_files, class_to_idx, is_train=False)
    
    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True, drop_last=True)
    val_loader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False)
    
    # 2. Khởi tạo mô hình, tối ưu hóa và hàm mất mát
    device = torch.device(device_name)
    flush_print(f"🖥️ Thiết bị sử dụng huấn luyện: {device}")
    
    model = CustomPartBasedFaceCNN(num_classes=len(identities), pretrained_global=pretrained_global, backbone_name=backbone_name, s=arcface_s, m=arcface_m, k=arcface_k, dropout=dropout, num_landmarks=num_landmarks).to(device)

    # -------------------------------------------------------------------------
    # Cấu hình Freeze Layer linh hoạt:
    #   freeze_layers = -1 : Freeze TOÀN BỘ backbone
    #   freeze_layers =  0 : KHÔNG freeze layer nào
    #   freeze_layers =  N : Freeze N stages/blocks đầu tiên (1-4 tùy backbone)
    # freeze_epochs = 0 : Không warmup, train toàn bộ ngay từ epoch 1
    # -------------------------------------------------------------------------
    BACKBONE_FREEZE_EPOCHS = freeze_epochs  # 0 = vô hiệu hóa hoàn toàn

    def _get_backbone_stages(model_bb, bb_name):
        """Trả về list các sub-module stage theo thứ tự shallow→deep."""
        n = bb_name.lower()
        if n.startswith("resnet"):
            # ResNet: layer1, layer2, layer3, layer4
            return [model_bb.layer1, model_bb.layer2, model_bb.layer3, model_bb.layer4]
        elif n == "mobilenet_v3":
            # MobileNetV3: features chứa 16 InvertedResidual blocks
            return list(model_bb.features.children())
        elif n == "convnext":
            # ConvNeXt: features[0..7] – 0=stem, 1=stage1, 2=stage2, 3=stage3
            return list(model_bb.features.children())
        return []

    def set_freeze(requires_grad: bool, n_stages: int = -1):
        """
        Freeze/Unfreeze backbone.
        n_stages=-1  → toàn bộ backbone
        n_stages=0   → không freeze gì cả
        n_stages=N   → chỉ freeze N stage đầu tiên
        """
        bb = model.global_branch.backbone
        if n_stages == 0:
            return  # không làm gì
        if n_stages == -1:
            # Toàn bộ backbone
            for param in bb.parameters():
                param.requires_grad = requires_grad
        else:
            stages = _get_backbone_stages(bb, backbone_name)
            target = stages[:n_stages]
            for stage in target:
                for param in stage.parameters():
                    param.requires_grad = requires_grad

    if BACKBONE_FREEZE_EPOCHS > 0 and freeze_layers != 0:
        set_freeze(False, freeze_layers)  # Freeze ban đầu
        layer_desc = "TOÀN BỘ" if freeze_layers == -1 else f"{freeze_layers} stage(s) đầu"
        flush_print(f"🔒 Freeze {layer_desc} của backbone trong {BACKBONE_FREEZE_EPOCHS} epoch đầu (warmup).")
    else:
        flush_print("🔓 Không freeze backbone – train toàn bộ ngay từ epoch 1.")

    optimizer = optim.AdamW(filter(lambda p: p.requires_grad, model.parameters()), lr=lr, weight_decay=weight_decay)
    criterion = nn.CrossEntropyLoss()

    # CosineAnnealingLR: học rate giảm dần theo hàm cosine để tránh mắc kẹt vào local minima
    scheduler = optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=epochs, eta_min=lr * 0.01)
    
    best_val_loss = float('inf')
    
    # Khởi tạo file CSV ghi log hội tụ
    import csv
    from datetime import datetime
    csv_file_path = "train_log.csv"
    try:
        with open(csv_file_path, mode='w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow(["timestamp", "epoch", "batch", "loss", "accuracy", "phase"])
    except Exception as e:
        flush_print(f"⚠️ Cảnh báo: Không thể khởi tạo file CSV log: {e}")
        
    # Xóa tệp tin đánh giá cũ để tránh lẫn lộn dữ liệu giữa các lần chạy
    eval_txt_path = "train_evaluations.txt"
    if os.path.exists(eval_txt_path):
        try:
            os.remove(eval_txt_path)
        except Exception:
            pass
    
    # 3. Vòng lặp huấn luyện chính
    flush_print(f"📊 Dataset Size: Total Identities: {len(identities)} | Original Images: {len(original_files)} | Train Samples (with aug): {len(train_files_orig) + len(train_files_aug)} | Val Samples (clean): {len(val_files)}")
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
            _, logits, _ = model.forward_training(t_global, t_eye, t_nose, t_geom, labels)
            loss = criterion(logits, labels)
            
            # Tăng cường chống quá khớp bằng L1 Regularization (nếu l1_lambda > 0)
            if l1_lambda > 0:
                l1_loss = 0.0
                for param in model.parameters():
                    l1_loss += torch.sum(torch.abs(param))
                loss = loss + l1_lambda * l1_loss
            
            # Gradient clipping phải đặt SAU loss.backward() để clip gradient vừa tính xong
            loss.backward()
            torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=2.0)
            optimizer.step()
            
            train_loss += loss.item() * labels.size(0)
            _, predicted = torch.max(logits, 1)
            total_train += labels.size(0)
            correct_train += (predicted == labels).sum().item()
            
            acc_batch = (predicted == labels).sum().item() / labels.size(0) * 100
            now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            # Định dạng stdout cho C# parse tiến độ từng batch kèm mốc thời gian chạy từng batch
            flush_print(f"[BATCH_PROGRESS] {now_str} | Epoch: {epoch}/{epochs} | Batch: {batch_idx+1}/{len(train_loader)} | Loss: {loss.item():.4f} | Acc: {acc_batch:.2f}%")
            
            # Ghi log batch vào CSV
            try:
                with open(csv_file_path, mode='a', newline='', encoding='utf-8') as f:
                    writer = csv.writer(f)
                    writer.writerow([now_str, epoch, batch_idx+1, f"{loss.item():.4f}", f"{acc_batch:.2f}", "train_batch"])
            except Exception:
                pass
            
        epoch_train_loss = train_loss / total_train
        epoch_train_acc = correct_train / total_train * 100

        # Unfreeze backbone sau BACKBONE_FREEZE_EPOCHS epoch
        if BACKBONE_FREEZE_EPOCHS > 0 and freeze_layers != 0 and epoch == BACKBONE_FREEZE_EPOCHS:
            set_freeze(True, freeze_layers)  # Unfreeze
            layer_desc = "TOÀN BỘ" if freeze_layers == -1 else f"{freeze_layers} stage(s) đầu"
            # Tái tạo optimizer để include backbone params với discriminative LR
            optimizer = optim.AdamW([
                {"params": model.global_branch.backbone.parameters(), "lr": lr * 0.1},
                {"params": [p for n, p in model.named_parameters() if "global_branch.backbone" not in n], "lr": lr}
            ], weight_decay=weight_decay)
            scheduler = optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=epochs - BACKBONE_FREEZE_EPOCHS, eta_min=lr * 0.01)
            flush_print(f"🔓 Unfreeze {layer_desc} backbone từ epoch {epoch + 1}. Discriminative LR: backbone={lr*0.1:.6f}, head={lr:.6f}")

        # Cập nhật learning rate theo cosine schedule
        scheduler.step()
        current_lr = scheduler.get_last_lr()
        
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
                
                _, logits, _ = model.forward_training(t_global, t_eye, t_nose, t_geom, labels)
                loss = criterion(logits, labels)
                
                val_loss += loss.item() * labels.size(0)
                _, predicted = torch.max(logits, 1)
                total_val += labels.size(0)
                correct_val += (predicted == labels).sum().item()
                
        epoch_val_loss = val_loss / total_val
        epoch_val_acc = correct_val / total_val * 100
        
        # Định dạng stdout cho C# parse tiến độ epoch
        now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        flush_print(f"[EPOCH_PROGRESS] Epoch: {epoch}/{epochs} | Loss: {epoch_val_loss:.4f} | Acc: {epoch_val_acc:.2f}% | LR: {current_lr}")
        flush_print(f"[OVERFIT_CHECK] Train Loss: {epoch_train_loss:.4f} | Train Acc: {epoch_train_acc:.2f}% | Val Loss: {epoch_val_loss:.4f} | Val Acc: {epoch_val_acc:.2f}% | Gap: {epoch_train_acc - epoch_val_acc:.2f}%")
        
        # Ghi log epoch (train & val) vào CSV
        try:
            with open(csv_file_path, mode='a', newline='', encoding='utf-8') as f:
                writer = csv.writer(f)
                writer.writerow([now_str, epoch, "ALL", f"{epoch_train_loss:.4f}", f"{epoch_train_acc:.2f}", "train_epoch"])
                writer.writerow([now_str, epoch, "ALL", f"{epoch_val_loss:.4f}", f"{epoch_val_acc:.2f}", "val_epoch"])
        except Exception:
            pass
        
        # Lưu checkpoint tốt nhất dựa trên Val Loss
        if epoch_val_loss < best_val_loss:
            best_val_loss = epoch_val_loss
            checkpoint = {
                "epoch": epoch,
                "model_state_dict": model.state_dict(),
                "optimizer_state_dict": optimizer.state_dict(),
                "loss": epoch_val_loss,
                "class_to_idx": class_to_idx,
                "backbone_name": backbone_name,
                "s": arcface_s,
                "m": arcface_m,
                "k": arcface_k,
                "dropout": dropout,
                "num_landmarks": num_landmarks
            }
            torch.save(checkpoint, "checkpoint_best.pth")
            flush_print("💾 Đã lưu Checkpoint tốt nhất (Best loss).")
            
        # 4. Đánh giá hội tụ bằng cách gọi module evaluator riêng biệt
        # Truyền freeze_epochs để evaluator biết bỏ qua Gemini API trong giai đoạn warmup
        try:
            evaluate_epoch(epoch, epochs, csv_path=csv_file_path, freeze_epochs=BACKBONE_FREEZE_EPOCHS)
        except Exception as e:
            flush_print(f"⚠️ Cảnh báo: Lỗi khi đánh giá tiến trình: {e}")
            
    # Lưu checkpoint cuối cùng
    torch.save({
        "epoch": epochs,
        "model_state_dict": model.state_dict(),
        "optimizer_state_dict": optimizer.state_dict(),
        "loss": epoch_val_loss,
        "class_to_idx": class_to_idx,
        "backbone_name": backbone_name,
        "s": arcface_s,
        "m": arcface_m,
        "k": arcface_k,
        "dropout": dropout,
        "num_landmarks": num_landmarks
    }, "checkpoint_final.pth")
    flush_print("💾 Đã lưu Checkpoint cuối cùng (checkpoint_final.pth).")
    
    # 4. Xuất mô hình tốt nhất sang định dạng ONNX
    export_best_to_onnx()

# =====================================================================
# 4. BỘ XUẤT MÔ HÌNH SANG ĐỊNH DẠNG ONNX
# =====================================================================

def export_best_to_onnx(checkpoint_path="checkpoint_best.pth", output_onnx_path="custom_face_cnn.onnx"):
    if not os.path.exists(checkpoint_path):
        flush_print(f"⚠️ Không tìm thấy checkpoint tại {checkpoint_path}. Không thể xuất mô hình ONNX.")
        return
        
    flush_print("🔄 Đang nạp checkpoint tốt nhất để xuất sang định dạng ONNX...")
    try:
        checkpoint = torch.load(checkpoint_path, map_location="cpu")
        backbone_name = checkpoint.get("backbone_name", "resnet18")
        class_to_idx = checkpoint.get("class_to_idx", {})
        num_classes = len(class_to_idx)
        if num_classes == 0:
            flush_print("❌ Lỗi: Checkpoint không chứa class_to_idx hợp lệ.")
            return
            
        # Tự động phát hiện cấu hình classifier từ checkpoint để tương thích ngược
        model_state_dict = checkpoint["model_state_dict"]
        s = checkpoint.get("s", 30.0)
        m = checkpoint.get("m", 0.50)
        k = checkpoint.get("k", 1)  # Mặc định là 1 nếu là checkpoint cũ (nn.Linear)
        dropout = checkpoint.get("dropout", 0.4)
        num_landmarks = checkpoint.get("num_landmarks", 26)
        
        if "classifier.weight" in model_state_dict:
            weight_shape = model_state_dict["classifier.weight"].shape
            calculated_k = weight_shape[0] // num_classes
            if calculated_k > 0:
                k = calculated_k
                
        flush_print(f"💡 Phát hiện backbone: {backbone_name} | Số lớp: {num_classes} | ArcFace s: {s}, m: {m}, k: {k} | Dropout: {dropout} | Landmarks: {num_landmarks}")
        model = CustomPartBasedFaceCNN(num_classes=num_classes, backbone_name=backbone_name, s=s, m=m, k=k, dropout=dropout, num_landmarks=num_landmarks)
        model.load_state_dict(model_state_dict, strict=False)
        model.eval()
        
        # Chuẩn bị dummy inputs (gồm 3 luồng ảnh và 1 luồng tọa độ hình học landmarks * 2)
        dummy_global = torch.randn(1, 3, 112, 112, dtype=torch.float32)
        dummy_eye = torch.randn(1, 3, 56, 112, dtype=torch.float32)
        dummy_nose = torch.randn(1, 3, 56, 56, dtype=torch.float32)
        dummy_geom = torch.randn(1, num_landmarks, 2, dtype=torch.float32)
        
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
    except Exception as e:
        flush_print(f"❌ Lỗi xảy ra khi xuất ONNX từ checkpoint: {e}")

if __name__ == "__main__":
    import argparse
    import signal
    
    # Đăng ký signal handler để bắt SIGINT và SIGTERM chuyển thành KeyboardInterrupt
    def sig_handler(signum, frame):
        flush_print(f"\n🛑 Nhận tín hiệu ngắt {signum}. Đang kích hoạt dừng tiến trình và xuất ONNX...")
        try:
            export_best_to_onnx()
        except Exception as e:
            flush_print(f"⚠️ Cảnh báo: Không thể xuất ONNX từ checkpoint tốt nhất: {e}")
        raise KeyboardInterrupt
        
    signal.signal(signal.SIGINT, sig_handler)
    signal.signal(signal.SIGTERM, sig_handler)

    parser = argparse.ArgumentParser(description="Train Custom Part-Based Face CNN for Asian faces.")
    parser.add_argument("--epochs", type=int, default=200, help="Number of training epochs (default: 200)")
    parser.add_argument("--batch_size", type=int, default=32, help="Batch size for training (default: 32)")
    parser.add_argument("--lr", type=float, default=0.0002, help="Learning rate (default: 0.0002)")
    parser.add_argument("--device", type=str, default="cpu", help="Device to use for training, e.g. cpu, cuda, or hip (default: cpu)")
    parser.add_argument("--weight_decay", type=float, default=1e-4, help="Weight decay for AdamW optimizer (default: 1e-4)")
    parser.add_argument("--val_split", type=float, default=0.8, help="Train/Validation split ratio (default: 0.8)")
    parser.add_argument("--backbone", type=str, default="convnext", choices=["resnet18", "resnet50", "mobilenet_v3", "convnext"], help="Backbone model for global features (default: convnext)")
    parser.add_argument("--no_pretrained_global", action="store_false", dest="pretrained_global", help="Disable pre-trained ImageNet weights for global backbone")
    parser.add_argument("--l1_lambda", type=float, default=1e-5, help="L1 regularization penalty coefficient (default: 1e-5)")
    parser.add_argument("--arcface_s", type=float, default=30.0, help="ArcFace scale parameter s (default: 30.0)")
    parser.add_argument("--arcface_m", type=float, default=0.50, help="ArcFace margin parameter m (default: 0.50)")
    parser.add_argument("--arcface_k", type=int, default=3, help="Sub-centers for Sub-center ArcFace, 1 for standard ArcFace (default: 3)")
    parser.add_argument("--dropout", type=float, default=0.4, help="Classifier dropout rate (default: 0.4)")
    parser.add_argument("--num_landmarks", type=int, default=37, help="Number of facial landmarks to use (default: 37)")
    parser.add_argument("--freeze_epochs", type=int, default=0,
                        help="Số epoch đầu freeze backbone để warmup. 0 = không freeze (mặc định: 0)")
    parser.add_argument("--freeze_layers", type=int, default=-1,
                        help="Số stages/layers của backbone sẽ bị freeze: -1=toàn bộ, 0=không freeze, N=N stages đầu (mặc định: -1)")
    parser.set_defaults(pretrained_global=True)
    args = parser.parse_args()

    # Xóa log cũ nếu tồn tại
    if os.path.exists("train.log"):
        try:
            os.remove("train.log")
        except Exception:
            pass
            
    if os.path.exists("train_evaluations.txt"):
        try:
            os.remove("train_evaluations.txt")
        except Exception:
            pass
            
    # Bước 1: Tiền xử lý dataraw
    success = preprocess_dataraw(num_landmarks=args.num_landmarks)
    if success:
        # Bước 2: Huấn luyện mạng và xuất ONNX (Bọc trong try-except để xử lý dừng ngắt từ người dùng)
        try:
            train_and_validate(
                epochs=args.epochs,
                batch_size=args.batch_size,
                lr=args.lr,
                device_name=args.device,
                weight_decay=args.weight_decay,
                val_split=args.val_split,
                backbone_name=args.backbone,
                pretrained_global=args.pretrained_global,
                l1_lambda=args.l1_lambda,
                arcface_s=args.arcface_s,
                arcface_m=args.arcface_m,
                arcface_k=args.arcface_k,
                dropout=args.dropout,
                num_landmarks=args.num_landmarks,
                freeze_epochs=args.freeze_epochs,
                freeze_layers=args.freeze_layers
            )
        except (KeyboardInterrupt, SystemExit):
            flush_print("\n🛑 Nhận tín hiệu dừng từ người dùng (Ctrl+C hoặc nút Stop). Đang tiến hành xuất mô hình ONNX từ checkpoint tốt nhất...")
            try:
                export_best_to_onnx()
            except Exception as e:
                flush_print(f"⚠️ Cảnh báo: Không thể xuất ONNX từ checkpoint tốt nhất: {e}")
            import sys
            sys.exit(0)
