import os
# Ép OpenCV sử dụng plugin xcb (X11) để hiển thị giao diện trên Ubuntu Wayland
os.environ["QT_QPA_PLATFORM"] = "xcb"

import cv2
import numpy as np
import glob

# --- 1. CẤU HÌNH THÔNG SỐ BẢNG CHARUCO (Khớp chính xác với file PDF A4) ---
CHARUCO_SQUARE_X = 5
CHARUCO_SQUARE_Y = 7

# KÍCH THƯỚC THỰC TẾ: Bạn nhớ đo bằng thước kẻ tờ giấy của bạn và điền vào đây nhé!
SQUARE_LENGTH = 0.0325  # Chiều dài cạnh ô vuông bàn cờ (mét)
MARKER_LENGTH = 0.024   # Chiều dài cạnh ô mã ArUco bên trong (mét)

# Khởi tạo đối tượng ArUco và ChArUco Board theo chuẩn OpenCV mới
ARUCO_DICT = cv2.aruco.getPredefinedDictionary(cv2.aruco.DICT_4X4_50)
CHARUCO_BOARD = cv2.aruco.CharucoBoard(
    (CHARUCO_SQUARE_X, CHARUCO_SQUARE_Y), 
    SQUARE_LENGTH, 
    MARKER_LENGTH, 
    ARUCO_DICT
)
CHARUCO_DETECTOR = cv2.aruco.CharucoDetector(CHARUCO_BOARD)

# --- 2. KHỞI TẠO BIẾN LƯU TRỮ DỮ LIỆU ---
output_dir = "captured_calibration_frames"
os.makedirs(output_dir, exist_ok=True)

# Đếm xem trong thư mục đã có sẵn bao nhiêu ảnh để đặt tên file tiếp theo không bị đè
existing_files = glob.glob(os.path.join(output_dir, "*.png"))
captured_count = len(existing_files)

# --- 3. CẤU HÌNH CAMERA ---
cap = cv2.VideoCapture(4)  # Camera index 4 của bạn

# Thiết lập độ phân giải gốc 1280x720
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)
target_size = 720

print("=== HƯỚNG DẪN HIỆU CHUẨN ===")
print(f"- Thư mục lưu trữ: '{output_dir}' (Hiện có: {captured_count} ảnh sẵn có).")
print("- Nhấn [ENTER] để chụp thêm ảnh mới vào thư mục.")
print("- Nhấn [ESC] để DỪNG CAMERA và ĐỌC TOÀN BỘ FILE TRONG THƯ MỤC để làm Calibration.")
print("============================\n")

while True:
    ret, frame = cap.read()
    if not ret:
        print("Không thể kết nối hoặc đọc dữ liệu từ Camera.")
        break

    h, w, _ = frame.shape
    
    # --- TÍNH TOÁN CẮT GIỮA 720x720 ---
    start_x = (w - target_size) // 2
    start_y = (h - target_size) // 2
    cropped_frame = frame[start_y:start_y+target_size, start_x:start_x+target_size]
    
    display_frame = cropped_frame.copy()
    gray = cv2.cvtColor(cropped_frame, cv2.COLOR_BGR2GRAY)
    
    # Nhận diện cấu trúc ChArUco để hiển thị preview cho người dùng thấy
    charuco_corners, charuco_ids, _, _ = CHARUCO_DETECTOR.detectBoard(gray)
    
    if charuco_ids is not None and len(charuco_ids) > 0:
        cv2.aruco.drawDetectedCornersCharuco(display_frame, charuco_corners, charuco_ids, (0, 255, 0))
    
    cv2.putText(display_frame, f"Total in folder: {captured_count} frames", (20, 40), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)
    
    cv2.imshow("Calibration - Cropped Frame (720x720)", display_frame)
    
    key = cv2.waitKey(1) & 0xFF
    
    # --- XỬ LÝ KHI NHẤN ENTER (Chỉ làm nhiệm vụ detect đạt chuẩn và lưu file) ---
    if key == 13: 
        if charuco_ids is not None and len(charuco_ids) > 10: 
            captured_count += 1
            # Lưu ảnh thô xuống ổ cứng
            img_path = os.path.join(output_dir, f"calib_frame_{captured_count:03d}.png")
            cv2.imwrite(img_path, cropped_frame)
            print(f"[OK] Đã chụp và lưu thêm: {os.path.basename(img_path)} (Tìm thấy {len(charuco_ids)} góc).")
        else:
            print("[CẢNH BÁO] Không thể chụp! Đưa bảng lại gần hoặc giữ chắc tay để nhận diện > 10 điểm góc.")
            
    # --- XỬ LÝ KHI NHẤN ESC ĐỂ THOÁT VÒNG LẶP VIDEO ---
    elif key == 27:
        print("\nĐang đóng camera. Bắt đầu quét thư mục để xử lý dữ liệu...")
        break

cap.release()
cv2.destroyAllWindows()


# =====================================================================
# --- 4. TIẾN HÀNH TÍNH TOÁN CAMERA CALIBRATION TỪ FILE TRÊN Ổ CỨNG ---
# =====================================================================
print(f"\n[BƯỚC 4] Đang đọc toàn bộ file ảnh từ thư mục '{output_dir}'...")

all_charuco_corners = []
all_charuco_ids = []
image_size = None
valid_frames_count = 0

# Tìm tất cả các file ảnh hệ thống đã lưu trong thư mục
image_files = glob.glob(os.path.join(output_dir, "*.png"))
image_files.sort()  # Sắp xếp theo tên file

if len(image_files) == 0:
    print("[HỦY BỎ] Không tìm thấy file ảnh nào trong thư mục để tính toán.")
    exit()

# Vòng lặp đọc lại toàn bộ file ảnh từ ổ cứng
for file_path in image_files:
    img = cv2.imread(file_path)
    if img is None:
        continue
        
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    if image_size is None:
        image_size = gray_img.shape[::-1]  # Định dạng (width, height) tức (720, 720)
        
    # Nhận diện lại bảng ChArUco từ file ảnh tĩnh
    c_corners, c_ids, _, _ = CHARUCO_DETECTOR.detectBoard(gray_img)
    
    if c_ids is not None and len(c_ids) > 10:
        all_charuco_corners.append(c_corners)
        all_charuco_ids.append(c_ids)
        valid_frames_count += 1
        print(f"  -> [OK] Phân tích {os.path.basename(file_path)}: Đạt {len(c_ids)} điểm góc.")
    else:
        print(f"  -> [LOẠI BỎ] {os.path.basename(file_path)}: Ảnh chất lượng kém hoặc không tìm thấy đủ góc.")

print("-" * 60)
print(f"Tổng hợp: Có {valid_frames_count} ảnh hợp lệ trên tổng số {len(image_files)} ảnh trong thư mục.")

# Chạy thuật toán Calibration nếu số ảnh hợp lệ quét từ ổ cứng gói gọn >= 4 tấm
if valid_frames_count >= 4:
    print(f"Bắt đầu giải toán tối ưu ma trận thấu kính...")
    
    camera_matrix_init = np.eye(3, dtype=np.float64)
    dist_coeffs_init = np.zeros((5, 1), dtype=np.float64)
    
    ret, camera_matrix, dist_coeffs, rvecs, tvecs = cv2.aruco.calibrateCameraCharuco(
        charucoCorners=all_charuco_corners,
        charucoIds=all_charuco_ids,
        board=CHARUCO_BOARD,
        imageSize=image_size,
        cameraMatrix=camera_matrix_init,
        distCoeffs=dist_coeffs_init
    )
    
    if ret:
        print("\n=== HIỆU CHUẨN CAMERA THÀNH CÔNG ===")
        print(f"Sai số trung bình (Re-projection Error): {ret:.4f} pixel")
        print("\nMa trận Camera (Camera Matrix):")
        print(camera_matrix)
        print("\nHệ số biến dạng (Distortion Coefficients):")
        print(dist_coeffs.flatten())
        
        # Lưu đè file kết quả cấu hình
        np.savez("camera_calibration_result.npz", mtx=camera_matrix, dist=dist_coeffs)
        print("\n[THÀNH CÔNG] Đã cập nhật ma trận mới vào file: 'camera_calibration_result.npz'")
    else:
        print("[THẤT BẠI] Lỗi xử lý toán học ma trận.")
else:
    print(f"[HỦY BỎ] Số lượng ảnh đạt chuẩn trong thư mục quá ít ({valid_frames_count} ảnh).")