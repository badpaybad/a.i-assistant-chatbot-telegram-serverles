import os
# Ép OpenCV sử dụng plugin xcb (X11) để hiển thị giao diện trên Ubuntu Wayland
os.environ["QT_QPA_PLATFORM"] = "xcb"

import cv2
import numpy as np

# --- 1. CẤU HÌNH THÔNG SỐ BẢNG CHARUCO (Khớp chính xác với file PDF A4) ---
CHARUCO_SQUARE_X = 5
CHARUCO_SQUARE_Y = 7

# KÌNH THƯỚC THỰC TẾ: Hãy đo bằng thước kẻ tờ giấy của bạn và điền vào đây!
# Nếu ô cờ in ra bị co lại còn 2.8cm -> điền 0.028. Dưới đây đang để mặc định theo PDF ban đầu.
SQUARE_LENGTH = 0.0325  # Chiều dài cạnh ô vuông bàn cờ (mét)
MARKER_LENGTH = 0.024 # Chiều dài cạnh ô mã ArUco bên trong (mét)

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
all_charuco_corners = []
all_charuco_ids = []
captured_count = 0

output_dir = "captured_calibration_frames"
os.makedirs(output_dir, exist_ok=True)

# --- 3. CẤU HÌNH CAMERA ---
cap = cv2.VideoCapture(4)  # Camera index 4 của bạn

# Thiết lập độ phân giải gốc 1280x720
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)
target_size = 720

print("=== HƯỚNG DẪN HIỆU CHUẨN ===")
print("- Hãy đưa bảng ChArUco lại gần (cách cam 30-50cm) sao cho bảng chiếm phần lớn khung hình.")
print("- Di chuyển bảng ra sát các góc: Trên-Trái, Trên-Phải, Dưới-Trái, Dưới-Phải.")
print("- Nhấn [ENTER] để chụp ảnh (Nên chụp từ 12 - 15 ảnh chất lượng ở các góc khác nhau).")
print("- Nhấn [ESC] để kết thúc chụp và bắt đầu tính toán toán học.")
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
    
    # Nhận diện cấu trúc ChArUco
    charuco_corners, charuco_ids, _, _ = CHARUCO_DETECTOR.detectBoard(gray)
    
    # Nếu tìm thấy, vẽ các điểm mốc màu xanh lá cây lên màn hình preview
    if charuco_ids is not None and len(charuco_ids) > 0:
        cv2.aruco.drawDetectedCornersCharuco(display_frame, charuco_corners, charuco_ids, (0, 255, 0))
    
    cv2.putText(display_frame, f"Captured: {captured_count} frames", (20, 40), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)
    
    cv2.imshow("Calibration - Cropped Frame (720x720)", display_frame)
    
    key = cv2.waitKey(1) & 0xFF
    
    # --- XỬ LÝ KHI NHẤN ENTER ---
    if key == 13: 
        # Đảm bảo nhận diện được lượng điểm góc đủ tốt (ví dụ > 10 điểm góc để chất lượng ma trận cao)
        if charuco_ids is not None and len(charuco_ids) > 10: 
            all_charuco_corners.append(charuco_corners)
            all_charuco_ids.append(charuco_ids)
            captured_count += 1
            
            # Lưu ảnh thô để lưu trữ
            img_path = os.path.join(output_dir, f"calib_frame_{captured_count:02d}.png")
            cv2.imwrite(img_path, cropped_frame)
            print(f"[OK] Đã lưu frame thứ {captured_count}. Tìm thấy {len(charuco_ids)} điểm góc ChArUco.")
        else:
            print("[CẢNH BÁO] Không thể chụp! Đưa bảng lại gần camera hơn hoặc giữ chắc tay để nhận diện nhiều điểm góc hơn.")
            
    # --- XỬ LÝ KHI NHẤN ESC ĐỂ THOÁT VÀ TÍNH CALIBRATION ---
    elif key == 27:
        print("\nĐang đóng camera và tiến hành tính toán thông số...")
        break

cap.release()
cv2.destroyAllWindows()

# --- 4. TIẾN HÀNH TÍNH TOÁN CAMERA CALIBRATION ---
if captured_count >= 4:
    print(f"Bắt đầu giải bài toán ma trận dựa trên {captured_count} ảnh đã thu thập...")
    
    camera_matrix_init = np.eye(3, dtype=np.float64)
    dist_coeffs_init = np.zeros((5, 1), dtype=np.float64)
    
    # Thực hiện tính toán tối ưu ma trận camera nội tại
    ret, camera_matrix, dist_coeffs, rvecs, tvecs = cv2.aruco.calibrateCameraCharuco(
        charucoCorners=all_charuco_corners,
        charucoIds=all_charuco_ids,
        board=CHARUCO_BOARD,
        imageSize=(target_size, target_size),
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
        
        # Lưu đè kết quả chuẩn ra file cấu hình chung
        np.savez("camera_calibration_result.npz", mtx=camera_matrix, dist=dist_coeffs)
        print("\n[THÀNH CÔNG] Đã ghi dữ liệu chuẩn mới vào file: 'camera_calibration_result.npz'")
    else:
        print("[THẤT BẠI] Lỗi thuật toán phân tích hình học.")
else:
    print(f"[HỦY BỎ] Số lượng ảnh chụp được quá ít ({captured_count} ảnh).")