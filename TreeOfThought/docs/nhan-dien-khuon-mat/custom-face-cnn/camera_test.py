import os
import sys
# Ép buộc OpenCV sử dụng nền tảng hiển thị X11 (xcb) thay vì Wayland để tránh crash
os.environ["QT_QPA_PLATFORM"] = "xcb"
import cv2
import time
import numpy as np
from inference import OnnxFaceRecognizer, FaissFaceDatabase

WORKSPACE_DIR = "/work/a.i-assistant-chatbot-telegram-serverles"
DEFAULT_RAW_DIR = os.path.join(WORKSPACE_DIR, "TreeOfThought/docs/nhan-dien-khuon-mat/ArcFaceFinetune/dataraw")

def flush_print(msg):
    print(msg)
    sys.stdout.flush()

def main():
    onnx_path = "custom_face_cnn.onnx"
    if not os.path.exists(onnx_path):
        flush_print(f"❌ Lỗi: Không tìm thấy tệp mô hình ONNX tại {onnx_path}.")
        flush_print("👉 Hãy chạy train.py trước để huấn luyện mạng và xuất mô hình ONNX.")
        return

    # 1. Khởi tạo mô hình ONNX và Database Vector FAISS
    flush_print("🔄 Đang khởi tạo phiên suy luận Custom Face CNN ONNX...")
    recognizer = OnnxFaceRecognizer(onnx_path)
    db = FaissFaceDatabase()

    # Tự động đăng ký mẫu nếu DB rỗng để người dùng test được ngay
    if len(db.user_ids) == 0 and os.path.exists(DEFAULT_RAW_DIR):
        flush_print("💡 Cơ sở dữ liệu FAISS trống. Đang quét dataraw để đăng ký các khuôn mặt mẫu...")
        identities = [d for d in os.listdir(DEFAULT_RAW_DIR) if os.path.isdir(os.path.join(DEFAULT_RAW_DIR, d))]
        for uid in identities:
            user_path = os.path.join(DEFAULT_RAW_DIR, uid)
            files = [f for f in os.listdir(user_path) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
            if files:
                img_file = os.path.join(user_path, files[0])
                img = cv2.imread(img_file)
                if img is not None:
                    emb, _ = recognizer.extract_embedding(img)
                    db.register_user(uid, emb)
        db.save_database()

    if len(db.user_ids) == 0:
        flush_print("❌ Lỗi: Cơ sở dữ liệu FAISS rỗng và không có dữ liệu mẫu trong dataraw để tự động đăng ký.")
        return

    flush_print(f"✅ Cơ sở dữ liệu đã sẵn sàng với {len(db.user_ids)} đối tượng.")
    flush_print("📹 Đang mở camera để test nhận diện khuôn mặt thời gian thực...")

    # 2. Khởi tạo OpenCV Camera
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        flush_print("❌ Lỗi: Không thể mở camera. Hãy kiểm tra lại kết nối webcam hoặc quyền truy cập camera.")
        # Thử mở camera index khác nếu 0 không hoạt động
        cap = cv2.VideoCapture(1)
        if not cap.isOpened():
            flush_print("❌ Lỗi: Không thể kết nối với bất kỳ camera nào.")
            return

    # Sử dụng Haar Cascade để phát hiện vùng mặt thô nhanh phục vụ vẽ bounding box
    cascade_path = cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
    face_cascade = cv2.CascadeClassifier(cascade_path)

    prev_time = time.time()
    flush_print("\n🔥 Bắt đầu kiểm thử Real-time! Nhấn 'q' trên màn hình camera để thoát.")

    while True:
        ret, frame = cap.read()
        if not ret:
            flush_print("⚠️ Lỗi: Không thể nhận frame từ camera.")
            break

        # Sao chép để xử lý
        display_frame = frame.copy()
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        
        # Phát hiện khuôn mặt thô để vẽ khung
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.2, minNeighbors=5, minSize=(60, 60))

        for (x, y, w, h) in faces:
            # Cắt vùng khuôn mặt thô phục vụ suy luận trích xuất đặc trưng đa nhánh
            face_roi = frame[y:y+h, x:x+w]
            if face_roi.size == 0:
                continue

            try:
                # 3. Trích xuất đặc trưng từ mạng đa nhánh Custom CNN qua ONNX
                embedding, weights = recognizer.extract_embedding(face_roi)
                
                # 4. Tìm kiếm đối tượng khớp nhất trong database FAISS
                matched_user, similarity = db.search_nearest(embedding, threshold=0.52)
                
                # 5. Thiết lập màu sắc và hiển thị kết quả
                if matched_user:
                    color = (0, 255, 0) # Màu xanh lá cho đối tượng đã biết
                    label = f"ID: {matched_user} ({similarity:.2f})"
                else:
                    color = (0, 0, 255) # Màu đỏ cho đối tượng không xác định
                    label = f"Unknown ({similarity:.2f})"

                # Vẽ khung bounding box kiểu viền bo góc bo sắc nét (Premium design)
                # Viền chữ nhật mờ nền
                cv2.rectangle(display_frame, (x, y), (x+w, y+h), color, 2)
                
                # Vẽ thông số Attention Weights lên đầu khung nhận diện
                attention_text = f"Eye:{weights[0]:.2f} | Nose:{weights[1]:.2f} | Global:{weights[2]:.2f}"
                cv2.putText(display_frame, attention_text, (x, y - 25), 
                            cv2.FONT_HERSHEY_SIMPLEX, 0.45, (255, 255, 255), 1, cv2.LINE_AA)
                
                # Hiển thị Nhãn Danh Tính
                cv2.rectangle(display_frame, (x - 1, y - 20), (x + w + 1, y), color, -1)
                cv2.putText(display_frame, label, (x + 5, y - 5), 
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0) if matched_user else (255, 255, 255), 1, cv2.LINE_AA)

            except Exception as e:
                # Bỏ qua nếu có lỗi xử lý frame đơn lẻ
                pass

        # 6. Tính toán và hiển thị FPS thời gian thực
        curr_time = time.time()
        fps = 1.0 / (curr_time - prev_time + 1e-6)
        prev_time = curr_time
        
        cv2.putText(display_frame, f"FPS: {fps:.1f}", (15, 30), 
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 255), 2, cv2.LINE_AA)
        cv2.putText(display_frame, "Q để thoát", (15, 60), 
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 1, cv2.LINE_AA)

        # Hiển thị lên màn hình
        cv2.imshow("Custom Face CNN Real-time Test", display_frame)

        # Nhấn 'q' để thoát khỏi loop
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Giải phóng camera và đóng cửa sổ
    cap.release()
    cv2.destroyAllWindows()
    flush_print("📹 Đã đóng camera và dừng kịch bản kiểm thử.")

if __name__ == "__main__":
    main()
