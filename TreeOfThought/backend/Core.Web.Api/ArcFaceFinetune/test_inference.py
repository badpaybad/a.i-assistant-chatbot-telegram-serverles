#!/usr/bin/env python3
import os
import sys
import argparse
import numpy as np
import cv2
import onnxruntime as ort

def align_face_python(image_bgr, eye_left, eye_right):
    cx = (eye_left[0] + eye_right[0]) / 2.0
    cy = (eye_left[1] + eye_right[1]) / 2.0
    dx = eye_right[0] - eye_left[0]
    dy = eye_right[1] - eye_left[1]
    
    current_dist = np.sqrt(dx**2 + dy**2)
    angle_deg = np.degrees(np.arctan2(dy, dx))
    
    target_dist = 35.2372
    tx = 55.9132
    ty = 51.59885
    
    scale = target_dist / current_dist
    M = cv2.getRotationMatrix2D((cx, cy), angle_deg, scale)
    M[0, 2] += (tx - cx)
    M[1, 2] += (ty - cy)
    
    aligned_face = cv2.warpAffine(image_bgr, M, (112, 112), flags=cv2.INTER_CUBIC, borderValue=0)
    return aligned_face

def extract_embedding(ort_session, image_path, detect_fn):
    image = cv2.imread(image_path)
    if image is None:
        print(f"[-] Không thể đọc ảnh: {image_path}")
        return None
        
    aligned = detect_fn(image)
    if aligned is None:
        print(f"[!] Cảnh báo: Không phát hiện được khuôn mặt trong: {image_path}. Sử dụng center crop fallback.")
        h, w = image.shape[:2]
        size = min(h, w)
        x = (w - size) // 2
        y = (h - size) // 2
        crop = image[y:y+size, x:x+size]
        aligned = cv2.resize(crop, (112, 112), interpolation=cv2.INTER_CUBIC)
        
    # Tiền xử lý theo val_transform của PyTorch / ArcFace
    image_rgb = cv2.cvtColor(aligned, cv2.COLOR_BGR2RGB)
    img_data = image_rgb.astype(np.float32) / 255.0
    img_data = (img_data - 0.5) / 0.5
    img_data = np.transpose(img_data, (2, 0, 1))
    img_data = np.expand_dims(img_data, axis=0)
    
    # Chạy mô hình ONNX
    outputs = ort_session.run(None, {'input': img_data})
    embedding = outputs[0][0]
    
    # L2 Normalize
    norm = np.linalg.norm(embedding)
    if norm > 0:
        embedding = embedding / norm
    return embedding

def parse_args():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    parser = argparse.ArgumentParser(description="Test nhận dạng khuôn mặt sử dụng mô hình ArcFace ONNX đã train.")
    parser.add_argument("--model", type=str, default="", help="Đường dẫn đến mô hình ONNX (mặc định: tự tìm tốt nhất/final)")
    parser.add_argument("--raw_dir", type=str, default=os.path.join(script_dir, "dataraw"), help="Thư mục chứa ảnh thô (mặc định: ./dataraw)")
    parser.add_argument("--test_image", type=str, default=os.path.abspath(os.path.join(script_dir, "..", "du1.jpeg")), help="Đường dẫn đến ảnh test (mặc định: ../du1.jpeg)")
    parser.add_argument("--threshold", type=float, default=0.50, help="Ngưỡng so khớp Cosine Similarity (mặc định: 0.50)")
    parser.add_argument("--use_opencv_only", action="store_true", help="Bỏ qua MediaPipe và chỉ sử dụng OpenCV Haar Cascade.")
    return parser.parse_args()

def main():
    args = parse_args()
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # 1. Tìm mô hình ONNX để test
    model_path = args.model
    if not model_path:
        # Ưu tiên mô hình best, sau đó là final
        for name in ["arcface_model_best.onnx", "arcface_model_final.onnx"]:
            path = os.path.join(script_dir, name)
            if os.path.exists(path):
                model_path = path
                break
                
    if not model_path or not os.path.exists(model_path):
        print(f"[-] Lỗi: Không tìm thấy mô hình ONNX tại '{model_path}'. Vui lòng huấn luyện finetune trước.")
        sys.exit(1)
        
    print(f"[+] Sử dụng mô hình ONNX: {os.path.abspath(model_path)}")
    ort_session = ort.InferenceSession(model_path)
    
    # 2. Thiết lập face detector & aligner
    use_mp = False
    mp_detector = None
    mp_landmarker = None
    
    if args.use_opencv_only:
        print("[!] Được cấu hình bỏ qua MediaPipe và chỉ sử dụng OpenCV Haar Cascade.")
    else:
        try:
            import mediapipe as mp_lib
            from mediapipe.tasks import python as mp_py
            from mediapipe.tasks.python import vision as mp_vision
            
            # Ưu tiên face landmarker (advanced)
            landmarker_path = os.path.join(script_dir, "arcfacemodels", "face_landmarker.task")
            if os.path.exists(landmarker_path):
                base_opts = mp_py.BaseOptions(model_asset_path=landmarker_path)
                options = mp_vision.FaceLandmarkerOptions(
                    base_options=base_opts,
                    output_face_blendshapes=False,
                    output_facial_transformation_matrixes=False,
                    num_faces=1
                )
                mp_landmarker = mp_vision.FaceLandmarker.create_from_options(options)
                use_mp = True
                print("[+] Khởi tạo thành công MediaPipe Face Landmarker (Advanced).")
            else:
                detector_path = os.path.join(script_dir, "arcfacemodels", "blaze_face_short_range.tflite")
                if os.path.exists(detector_path):
                    base_opts = mp_py.BaseOptions(model_asset_path=detector_path)
                    det_opts = mp_vision.FaceDetectorOptions(base_options=base_opts, min_detection_confidence=0.5)
                    mp_detector = mp_vision.FaceDetector.create_from_options(det_opts)
                    use_mp = True
                    print("[+] Khởi tạo thành công MediaPipe BlazeFace (Standard).")
        except Exception as e:
            print(f"[!] Cảnh báo khi nạp MediaPipe: {e}. Sẽ dùng OpenCV Haar Cascade.")
        
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')
    
    def detect_align(image_bgr):
        h, w = image_bgr.shape[:2]
        if use_mp:
            import mediapipe as mp_lib
            rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)
            mp_image = mp_lib.Image(image_format=mp_lib.ImageFormat.SRGB, data=rgb)
            
            if mp_landmarker is not None:
                result = mp_landmarker.detect(mp_image)
                if result.face_landmarks and len(result.face_landmarks) > 0:
                    landmarks = result.face_landmarks[0]
                    # Mắt trái ảnh
                    pt33 = landmarks[33]
                    pt133 = landmarks[133]
                    eye_left = (int((pt33.x + pt133.x)/2 * w), int((pt33.y + pt133.y)/2 * h))
                    # Mắt phải ảnh
                    pt362 = landmarks[362]
                    pt263 = landmarks[263]
                    eye_right = (int((pt362.x + pt263.x)/2 * w), int((pt362.y + pt263.y)/2 * h))
                    return align_face_python(image_bgr, eye_left, eye_right)
            elif mp_detector is not None:
                result = mp_detector.detect(mp_image)
                if result.detections:
                    det = max(result.detections, key=lambda d: d.categories[0].score)
                    kp = det.keypoints
                    if len(kp) >= 2:
                        right_eye = (int(kp[0].x * w), int(kp[0].y * h))
                        left_eye = (int(kp[1].x * w), int(kp[1].y * h))
                        return align_face_python(image_bgr, right_eye, left_eye)
                        
        # Fallback OpenCV
        gray = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
        if len(faces) > 0:
            x, y, fw, fh = max(faces, key=lambda r: r[2]*r[3])
            roi_gray = gray[y:y+fh, x:x+fw]
            eyes = eye_cascade.detectMultiScale(roi_gray, scaleFactor=1.1, minNeighbors=5, minSize=(15, 15))
            if len(eyes) >= 2:
                es = sorted(eyes, key=lambda e: e[0])
                ex1, ey1, ew1, eh1 = es[0]
                ex2, ey2, ew2, eh2 = es[1]
                left_eye = (x + ex1 + ew1 // 2, y + ey1 + eh1 // 2)
                right_eye = (x + ex2 + ew2 // 2, y + ey2 + eh2 // 2)
                return align_face_python(image_bgr, left_eye, right_eye)
            else:
                pad_x = int(fw * 0.20)
                pad_y = int(fh * 0.20)
                face_crop = image_bgr[max(0, y-pad_y):min(h, y+fh+pad_y),
                                      max(0, x-pad_x):min(w, x+fw+pad_x)]
                return cv2.resize(face_crop, (112, 112), interpolation=cv2.INTER_CUBIC)
        return None

    # 3. Tạo Vector cơ sở dữ liệu khuôn mặt (identity database) từ dataraw/
    print(f"[*] Đang đọc dữ liệu từ thư mục ảnh thô '{args.raw_dir}'...")
    if not os.path.exists(args.raw_dir):
        print(f"[-] Lỗi: Thư mục raw_dir '{args.raw_dir}' không tồn tại!")
        sys.exit(1)
        
    identity_vectors = {}
    
    for identity in sorted(os.listdir(args.raw_dir)):
        identity_path = os.path.join(args.raw_dir, identity)
        if not os.path.isdir(identity_path):
            continue
            
        embeddings_list = []
        for file_name in os.listdir(identity_path):
            if not file_name.lower().endswith(('.png', '.jpg', '.jpeg', '.webp', '.bmp')):
                continue
                
            img_path = os.path.join(identity_path, file_name)
            emb = extract_embedding(ort_session, img_path, detect_align)
            if emb is not None:
                embeddings_list.append(emb)
                
        if len(embeddings_list) > 0:
            # Vector đại diện cho danh tính (mean vector)
            mean_vector = np.mean(embeddings_list, axis=0)
            # Chuẩn hóa lại vector trung bình
            mean_vector = mean_vector / np.linalg.norm(mean_vector)
            identity_vectors[identity] = mean_vector
            print(f"    [+] Đã tạo vector cho: '{identity}' (từ {len(embeddings_list)} ảnh)")
            
    if not identity_vectors:
        print("[-] Lỗi: Không có vector danh tính nào được tạo ra!")
        sys.exit(1)
        
    # 4. Trích xuất embedding từ ảnh test du1.jpeg
    print(f"\n[*] Đang xử lý ảnh test: '{args.test_image}'...")
    if not os.path.exists(args.test_image):
        print(f"[-] Lỗi: Ảnh test '{args.test_image}' không tồn tại!")
        sys.exit(1)
        
    test_embedding = extract_embedding(ort_session, args.test_image, detect_align)
    if test_embedding is None:
        print("[-] Lỗi: Không thể trích xuất embedding từ ảnh test!")
        sys.exit(1)
        
    # 5. Đối sánh vector tìm người khớp nhất bằng Cosine Similarity (Dot Product vì đã normalize)
    print("\n[*] Đang tiến hành đối sánh đối tác...")
    results = []
    for identity, identity_vector in identity_vectors.items():
        similarity = np.dot(test_embedding, identity_vector)
        results.append((identity, similarity))
        
    results = sorted(results, key=lambda x: x[1], reverse=True)
    
    print("\n" + "="*50)
    print(" KẾT QUẢ ĐỐI SÁNH COSINE SIMILARITY")
    print("="*50)
    for identity, score in results:
        print(f" - Danh tính: {identity:<15} | Độ khớp: {score:.4f} ({(score*100):.2f}%)")
    print("="*50)
    
    best_match, best_score = results[0]
    matched_id = "Không xác định"
    if best_score >= args.threshold:
        matched_id = best_match
        
    print(f"\n[+] Kết quả nhận diện tốt nhất: '{matched_id}' với độ khớp: {best_score:.4f}")
    
    # 6. Kiểm thử xem kết quả có đúng là 'dunp' hay không
    print(f"[*] Đang kiểm chứng kỳ vọng nhận dạng: Match = 'dunp'...")
    assert matched_id == "dunp", f"[-] Kiểm thử thất bại: Nhận diện ra '{matched_id}' nhưng kỳ vọng là 'dunp'."
    print("[SUCCESS] Thử nghiệm thành công! Mô hình nhận diện chính xác hình ảnh là 'dunp'.")

if __name__ == "__main__":
    main()
