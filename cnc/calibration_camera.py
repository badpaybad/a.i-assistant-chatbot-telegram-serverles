
import os
# Ép OpenCV sử dụng plugin xcb (X11) để hiển thị giao diện trên Ubuntu Wayland
os.environ["QT_QPA_PLATFORM"] = "xcb"

import cv2
import numpy as np

# --- 1. CẤU HÌNH THÔNG SỐ BẢNG CHARUCO (Khớp chính xác với file PDF A4) ---
# Số ô vuông theo chiều ngang và dọc của bảng ChArUco
CHARUCO_SQUARE_X = 5
CHARUCO_SQUARE_Y = 7

# Kích thước thực tế ngoài đời (đơn vị: mét)
SQUARE_LENGTH = 0.0325  # Ô cờ vuông: 30mm = 0.030m
MARKER_LENGTH = 0.024  # Mã ArUco bên trong: 22mm = 0.022m

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

# Tạo thư mục tạm để lưu ảnh nếu bạn muốn kiểm tra lại sau này
output_dir = "captured_calibration_frames"
os.makedirs(output_dir, exist_ok=True)

# --- 3. CẤU HÌNH CAMERA ---
cap = cv2.VideoCapture(4)  # Thử thay bằng 1 hoặc 2 nếu bạn dùng webcam rời

# Thiết lập độ phân giải gốc 1280x720
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)

print("=== HƯỚNG DẪN ===")
print("- Đưa bảng ChArUco vào vùng khung hình vuông.")
print("- Nhấn [ENTER] để chụp ảnh hiệu chuẩn (Cần chụp 10-20 ảnh ở các góc/khoảng cách khác nhau).")
print("- Nhấn [ESC] để kết thúc chụp và bắt đầu tính toán Calibration.")
print("=================\n")

while True:
    ret, frame = cap.read()
    if not ret:
        print("Không thể kết nối hoặc đọc dữ liệu từ Camera.")
        break

    # Lấy kích thước thực tế của frame nhận được (phòng trường hợp camera không hỗ trợ đúng 1280x720)
    h, w, _ = frame.shape
    
    # --- TÍNH TOÁN CẮT GIỮA 720x720 ---
    target_size = 720
    start_x = (w - target_size) // 2
    start_y = (h - target_size) // 2
    
    # Tiến hành crop lấy vùng trung tâm
    cropped_frame = frame[start_y:start_y+target_size, start_x:start_x+target_size]
    
    # Tạo một bản sao để vẽ hiển thị (tránh làm bẩn ảnh gốc dùng để tính toán)
    display_frame = cropped_frame.copy()
    
    # Chuyển ảnh sang màu xám để detector nhận diện tối ưu hơn
    gray = cv2.cvtColor(cropped_frame, cv2.COLOR_BGR2GRAY)
    
    # Thử tìm kiếm cấu trúc ChArUco trên frame hiện tại
    charuco_corners, charuco_ids, marker_corners, marker_ids = CHARUCO_DETECTOR.detectBoard(gray)
    
    # Nếu tìm thấy các điểm góc của bảng, vẽ lên màn hình để người dùng biết bảng đang được nhận diện tốt
    if charuco_ids is not None and len(charuco_ids) > 0:
        cv2.aruco.drawDetectedCornersCharuco(display_frame, charuco_corners, charuco_ids, (0, 255, 0))
    
    # Hiển thị số lượng ảnh đã chụp thành công lên góc màn hình
    cv2.putText(display_frame, f"Captured: {captured_count} frames", (20, 40), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)
    
    # Hiển thị khung hình vuông đã crop ra màn hình
    cv2.imshow("Calibration - Cropped Frame (720x720)", display_frame)
    
    # Nhận phím bấm từ bàn phím
    key = cv2.waitKey(1) & 0xFF
    
    # --- XỬ LÝ KHI NHẤN ENTER (Mã ASCII của Enter trong OpenCV thường là 13) ---
    if key == 13: 
        if charuco_ids is not None and len(charuco_ids) > 4: # Yêu cầu tìm thấy ít nhất 4 góc để đảm bảo chất lượng# Tối ưu hóa vị trí các điểm góc xuống mức subpixel trước khi lưu
            criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 30, 0.001)
            cv2.cornerSubPix(gray, charuco_corners, (5, 5), (-1, -1), criteria)
            
            all_charuco_corners.append(charuco_corners)
            all_charuco_ids.append(charuco_ids)
            captured_count += 1
            # all_charuco_corners.append(charuco_corners)
            # all_charuco_ids.append(charuco_ids)
            # captured_count += 1
            
            # Lưu ảnh gốc đã crop xuống ổ cứng để lưu trữ
            img_path = os.path.join(output_dir, f"calib_frame_{captured_count:02d}.png")
            cv2.imwrite(img_path, cropped_frame)
            
            print(f"[OK] Đã lưu frame thứ {captured_count}. Tìm thấy {len(charuco_ids)} điểm góc.")
        else:
            print("[CẢNH BÁO] Không thể chụp! Hãy giữ chắc camera hoặc đưa bảng ChArUco rõ hơn vào vùng vuông.")
            
    # --- XỬ LÝ KHI NHẤN ESC (Mã ASCII là 27) ĐỂ THOÁT VÀ TÍNH CALIBRATION ---
    elif key == 27:
        print("\nĐang đóng camera và tiến hành tính toán thông số...")
        break

cap.release()
cv2.destroyAllWindows()

# --- 4. TIẾN HÀNH TÍNH TOÁN CAMERA CALIBRATION ---
if captured_count >= 4:  # Tối thiểu phải có 4 ảnh hợp lệ, nhưng khuyến nghị >10 ảnh
    print(f"Bắt đầu xử lý tính toán dựa trên {captured_count} ảnh đã thu thập...")
    
    # Khởi tạo các ma trận rỗng để chứa kết quả đầu ra
    camera_matrix_init = np.eye(3, dtype=np.float64)
    dist_coeffs_init = np.zeros((5, 1), dtype=np.float64)
    
    # Hàm hiệu chuẩn đặc thù cho bảng ChArUco
    ret, camera_matrix, dist_coeffs, rvecs, tvecs = cv2.aruco.calibrateCameraCharuco(
        charucoCorners=all_charuco_corners,
        charucoIds=all_charuco_ids,
        board=CHARUCO_BOARD,
        imageSize=(target_size, target_size), # Kích thước ảnh đầu vào là 720x720
        cameraMatrix=camera_matrix_init,
        distCoeffs=dist_coeffs_init
    )
    
    if ret:
        print("\n=== HIỆU CHUẨN CAMERA THÀNH CÔNG ===")
        print(f"Sai số trung bình (Re-projection Error): {ret:.4f} pixel (Càng gần 0 càng chính xác, < 0.5 là rất tốt)")
        print("\nMa trận Camera (Camera Matrix):")
        print(camera_matrix)
        print("\nHệ số biến dạng (Distortion Coefficients):")
        print(dist_coeffs.flatten())
        
        # Lưu kết quả ra file định dạng .npz của numpy để tái sử dụng cho code đo khoảng cách sau này
        np.savez("camera_calibration_result.npz", mtx=camera_matrix, dist=dist_coeffs)
        print("\n[THÀNH CÔNG] Đã lưu thông số cấu hình vào file: 'camera_calibration_result.npz'")
    else:
        print("[THẤT BẠI] Quá trình xử lý toán học thất bại. Vui lòng chạy lại và chụp rõ nét hơn.")
else:
    print(f"[HỦY BỎ] Số lượng ảnh chụp được quá ít ({captured_count} ảnh). Cần tối thiểu từ 4-10 ảnh để tính toán.")