import sys
import os
import cv2
import numpy as np

# Set environment to suppress TF logs
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"

def align_face_python(image_bgr, eye_left, eye_right):
    cx = (eye_left[0] + eye_right[0]) / 2.0
    cy = (eye_left[1] + eye_right[1]) / 2.0
    dx = eye_right[0] - eye_left[0]
    dy = eye_right[1] - eye_left[1]
    
    current_dist = np.sqrt(dx**2 + dy**2)
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

def main():
    if len(sys.argv) < 3:
        print("Usage: python align_face_helper.py <input_path> <output_path>")
        sys.exit(1)
        
    input_path = sys.argv[1]
    output_path = sys.argv[2]
    
    if not os.path.exists(input_path):
        print(f"Error: input path {input_path} not found")
        sys.exit(1)
        
    image = cv2.imread(input_path)
    if image is None:
        print("Error: cannot read image")
        sys.exit(1)
        
    # Method 1: MediaPipe BlazeFace
    try:
        import mediapipe as mp
        from mediapipe.tasks import python as mp_py
        from mediapipe.tasks.python import vision as mp_vision
        
        # Locate model file
        model_path = os.path.join(os.path.dirname(__file__), "arcfacemodels", "blaze_face_short_range.tflite")
        if not os.path.exists(model_path):
            model_path = os.path.join(os.path.dirname(__file__), "facesid", "arcfacemodels", "blaze_face_short_range.tflite")
            
        base_opts = mp_py.BaseOptions(model_asset_path=model_path)
        det_opts = mp_vision.FaceDetectorOptions(base_options=base_opts, min_detection_confidence=0.35)
        
        with mp_vision.FaceDetector.create_from_options(det_opts) as detector:
            rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb)
            result = detector.detect(mp_image)
            
            if result.detections:
                det = max(result.detections, key=lambda d: d.categories[0].score)
                kp = det.keypoints
                if len(kp) >= 2:
                    h, w = image.shape[:2]
                    # Keypoint 0: right eye (left side of image), Keypoint 1: left eye (right side of image)
                    right_eye = (int(kp[0].x * w), int(kp[0].y * h))
                    left_eye = (int(kp[1].x * w), int(kp[1].y * h))
                    
                    aligned = align_face_python(image, right_eye, left_eye)
                    cv2.imwrite(output_path, aligned)
                    print("SUCCESS")
                    sys.exit(0)
    except Exception as e:
        pass
        
    # Method 2: OpenCV Haar Cascade
    try:
        cascade_path = cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
        eye_cascade_path = cv2.data.haarcascades + 'haarcascade_eye.xml'
        
        face_cascade = cv2.CascadeClassifier(cascade_path)
        eye_cascade = cv2.CascadeClassifier(eye_cascade_path)
        
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=3, minSize=(30, 30))
        if len(faces) > 0:
            x, y, fw, fh = max(faces, key=lambda r: r[2] * r[3])
            roi_gray = gray[y:y+fh, x:x+fw]
            eyes = eye_cascade.detectMultiScale(roi_gray, scaleFactor=1.1, minNeighbors=3, minSize=(10, 10))
            if len(eyes) >= 2:
                es = sorted(eyes, key=lambda e: e[0])
                left_eye = (x + es[0][0] + es[0][2] // 2, y + es[0][1] + es[0][3] // 2)
                right_eye = (x + es[1][0] + es[1][2] // 2, y + es[1][1] + es[1][3] // 2)
                
                aligned = align_face_python(image, left_eye, right_eye)
                cv2.imwrite(output_path, aligned)
                print("SUCCESS")
                sys.exit(0)
                
            # If no eyes found, fallback to crop and resize face bounding box
            face_crop = image[y:y+fh, x:x+fw]
            aligned = cv2.resize(face_crop, (112, 112), interpolation=cv2.INTER_CUBIC)
            cv2.imwrite(output_path, aligned)
            print("SUCCESS")
            sys.exit(0)
    except Exception as e:
        pass
        
    # Method 3: Center Crop Fallback
    try:
        h, w = image.shape[:2]
        size = min(h, w)
        x = (w - size) // 2
        y = (h - size) // 2
        crop = image[y:y+size, x:x+size]
        aligned = cv2.resize(crop, (112, 112), interpolation=cv2.INTER_CUBIC)
        cv2.imwrite(output_path, aligned)
        print("SUCCESS")
        sys.exit(0)
    except Exception as e:
        print(f"FAILED: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()
