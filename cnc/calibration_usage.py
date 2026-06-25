import os
# Ép OpenCV sử dụng plugin xcb (X11) hiển thị trên Ubuntu Wayland
os.environ["QT_QPA_PLATFORM"] = "xcb"

import cv2
import numpy as np
import threading
import queue
import time

# =====================================================================
# 1. CẤU HÌNH THÔNG SỐ VẬT LÝ VÀ ĐỊNH NGHĨA MẶT PHẲNG (Đơn vị: Mét)
# =====================================================================
MARKER_SIZE = 0.0325        # Độ rộng cạnh của ô vuông ArUco (35mm)
WIDTH_BETWEEN = 0.1465      # Khoảng cách ngang: Từ mép trái ID 0 sang mép trái ID 1
HEIGHT_BETWEEN = 0.2315     # Khoảng cách dọc: Từ mép trên ID 0 xuống mép trên ID 2

# Tính toán vị trí trung tâm (Center) của hệ mặt phẳng dựa trên định nghĩa cũ
# để làm lượng dịch chuyển (Offset), biến tâm mặt phẳng thành gốc (0,0,0) mới.
offset_x = (WIDTH_BETWEEN + MARKER_SIZE) / 2.0
offset_y = (-HEIGHT_BETWEEN - MARKER_SIZE) / 2.0

# Định nghĩa tọa độ 3D của 4 Marker sao cho TÂM HỆ PHẲNG LÀ GỐC (0,0,0)
# Quy tắc 4 góc mỗi marker: Trên-Trái -> Trên-Phải -> Dưới-Phải -> Dưới-Trái
MARKER_3D_CENTERED = {
    0: np.array([
        [0 - offset_x, 0 - offset_y, 0],
        [MARKER_SIZE - offset_x, 0 - offset_y, 0],
        [MARKER_SIZE - offset_x, -MARKER_SIZE - offset_y, 0],
        [0 - offset_x, -MARKER_SIZE - offset_y, 0]
    ], dtype=np.float32),
    
    1: np.array([
        [WIDTH_BETWEEN - offset_x, 0 - offset_y, 0],
        [WIDTH_BETWEEN + MARKER_SIZE - offset_x, 0 - offset_y, 0],
        [WIDTH_BETWEEN + MARKER_SIZE - offset_x, -MARKER_SIZE - offset_y, 0],
        [WIDTH_BETWEEN - offset_x, -MARKER_SIZE - offset_y, 0]
    ], dtype=np.float32),
    
    2: np.array([
        [0 - offset_x, -HEIGHT_BETWEEN - offset_y, 0],
        [MARKER_SIZE - offset_x, -HEIGHT_BETWEEN - offset_y, 0],
        [MARKER_SIZE - offset_x, -HEIGHT_BETWEEN - MARKER_SIZE - offset_y, 0],
        [0 - offset_x, -HEIGHT_BETWEEN - MARKER_SIZE - offset_y, 0]
    ], dtype=np.float32),
    
    3: np.array([
        [WIDTH_BETWEEN - offset_x, -HEIGHT_BETWEEN - offset_y, 0],
        [WIDTH_BETWEEN + MARKER_SIZE - offset_x, -HEIGHT_BETWEEN - offset_y, 0],
        [WIDTH_BETWEEN + MARKER_SIZE - offset_x, -HEIGHT_BETWEEN - MARKER_SIZE - offset_y, 0],
        [WIDTH_BETWEEN - offset_x, -HEIGHT_BETWEEN - MARKER_SIZE - offset_y, 0]
    ], dtype=np.float32)
}

# =====================================================================
# 2. ĐỌC FILE CALIBRATION VÀ KHỞI TẠO ARUCO
# =====================================================================
try:
    with np.load('camera_calibration_result.npz') as data:
        camera_matrix = data['mtx']
        dist_coeffs = data['dist']
    print("[OK] Đã tải thành công file camera_calibration_result.npz")
except FileNotFoundError:
    print("[LỖI] Không tìm thấy file calibration. Vui lòng chạy script hiệu chuẩn trước.")
    exit()

aruco_dict = cv2.aruco.getPredefinedDictionary(cv2.aruco.DICT_4X4_50)
detector_params = cv2.aruco.DetectorParameters()
aruco_detector = cv2.aruco.ArucoDetector(aruco_dict, detector_params)

# Hàng đợi giao tiếp giữa 2 thread
frame_queue = queue.Queue(maxsize=1)
result_queue = queue.Queue(maxsize=1)
running = True

# =====================================================================
# 3. LUỒNG TÍNH TOÁN (WORKER THREAD - Xử lý toán học Pose Estimation)
# =====================================================================
def math_processing_worker():
    global running
    print("[THREAD] Luồng tính toán toán học bắt đầu chạy...")
    
    while running:
        try:
            # Lấy frame từ UI Thread để xử lý (chờ tối đa 1 giây nếu không có dữ liệu)
            gray_frame = frame_queue.get(timeout=1)
        except queue.Empty:
            continue
            
        # Tiến hành detect mã ArUco
        corners, ids, _ = aruco_detector.detectMarkers(gray_frame)
        
        calculated_data = None
        
        # Nếu camera nhận diện được ít nhất một vài marker
        if ids is not None and len(ids) > 0:
            obj_points_list = []
            img_points_list = []
            
            # Khớp các điểm góc phát hiện được với ma trận 3D dịch tâm
            for i, marker_id in enumerate(ids.flatten()):
                if marker_id in MARKER_3D_CENTERED:
                    obj_points_list.append(MARKER_3D_CENTERED[marker_id])
                    img_points_list.append(corners[i].reshape(4, 2))
            
            # Phải nhận diện được ít nhất 1 marker (4 điểm) để giải PnP
            if len(obj_points_list) > 0:
                obj_points = np.vstack(obj_points_list)
                img_points = np.vstack(img_points_list)
                
                # Giải bài toán PnP tìm vector xoay (rvec) và dịch chuyển (tvec) của tâm hệ mặt phẳng
                success, rvec, tvec = cv2.solvePnP(
                    obj_points, img_points, camera_matrix, dist_coeffs, flags=cv2.SOLVEPNP_ITERATIVE
                )
                
                if success:
                    # Tính toán tọa độ pixel 2D của 4 điểm mốc ảo (Tâm thực tế và 3 hướng trục chính)
                    # nhằm mục đích vẽ hệ trục tọa độ XYZ lên màn hình ngay tại tâm mặt phẳng
                    axis_3d = np.array([
                        [0, 0, 0],         # Điểm gốc mới (Chính giữa mặt phẳng)
                        [0.05, 0, 0],      # Trục X (Đỏ) dài 5cm
                        [0, 0.05, 0],      # Trục Y (Xanh lá) dài 5cm
                        [0, 0, 0.05]       # Trục Z (Xanh dương) dài 5cm
                    ], dtype=np.float32)
                    
                    img_points_axis, _ = cv2.projectPoints(axis_3d, rvec, tvec, camera_matrix, dist_coeffs)
                    
                    # Đóng gói dữ liệu tính toán gửi trả lại cho UI Thread vẽ
                    calculated_data = {
                        'corners': corners,
                        'ids': ids,
                        'tvec': tvec,
                        # 'axis_pts': img_points_axis.reshape(-index_pts := 4, 2).astype(int)
                        'axis_pts': img_points_axis.reshape(-1, 2).astype(int)
                    }
        
        # Đẩy kết quả vào result_queue, nếu đầy thì giải phóng kết quả cũ để cập nhật cái mới nhất (Non-blocking)
        if result_queue.full():
            try: result_queue.get_nowait()
            except queue.Empty: pass
        result_queue.put(calculated_data)
        
    print("[THREAD] Luồng tính toán đã dừng.")
# =====================================================================
# 4. LUỒNG HIỂN THỊ (UI THREAD - Đọc Cam và Vẽ đồ họa) - ĐÃ TỐI ƯU
# =====================================================================
def main_ui_thread():
    global running
    
    # Khởi tạo camera với index = 4
    cap = cv2.VideoCapture(4)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)
    
    target_size = 720
    window_name = "Multi-threaded Pose Estimation"
    
    # Khởi tạo cửa sổ hiển thị cố định trước khi vào vòng lặp để tránh sinh nhiều cửa sổ rác
    cv2.namedWindow(window_name, cv2.WINDOW_AUTOSIZE)
    
    # Khởi chạy luồng tính toán toán học nền
    worker_thread = threading.Thread(target=math_processing_worker)
    worker_thread.start()
    
    print("[UI] Đang mở giao diện hiển thị camera. Nhấn [ESC] để thoát.")
    
    while True:
        ret, frame = cap.read()
        if not ret:
            print("[LỖI] Không thể đọc frame từ camera index 4.")
            time.sleep(0.03) # Sleep ngắn khớp với tốc độ camera (khoảng 30 FPS) tránh nghẽn CPU
            continue
            
        # Cắt giữa ảnh thành khổ vuông 720x720
        h, w, _ = frame.shape
        start_x = (w - target_size) // 2
        start_y = (h - target_size) // 2
        cropped_frame = frame[start_y:start_y+target_size, start_x:start_x+target_size]
        
        # Gửi dữ liệu sang luồng tính toán (chỉ gửi khi hàng đợi trống để tránh tồn đọng frame cũ)
        if frame_queue.empty():
            gray = cv2.cvtColor(cropped_frame, cv2.COLOR_BGR2GRAY)
            try:
                frame_queue.put_nowait(gray)
            except queue.Full:
                pass
        
        # Kiểm tra hàng đợi kết quả xem luồng toán học đã tính toán xong chưa
        # Sử dụng timeout rất ngắn để UI Thread giữ được tốc độ phản hồi mượt mà
        try:
            latest_result = result_queue.get(timeout=0.01)
        except queue.Empty:
            latest_result = None
            
        # --- TIẾN HÀNH VẼ ĐỒ HỌA TRÊN UI THREAD ---
        if latest_result is not None:
            # Chỉ thực hiện xử lý đồ họa và vẽ khi luồng tính toán trả về kết quả nhận diện hợp lệ
            cv2.aruco.drawDetectedMarkers(cropped_frame, latest_result['corners'], latest_result['ids'])
            
            axis_pts = latest_result['axis_pts']
            center_pt = tuple(axis_pts[0]) # Điểm gốc trung tâm (0,0,0)
            
            # Vẽ hệ trục tọa độ
            cv2.line(cropped_frame, center_pt, tuple(axis_pts[1]), (0, 0, 255), 3) # Trục X (Đỏ)
            cv2.line(cropped_frame, center_pt, tuple(axis_pts[2]), (0, 255, 0), 3) # Trục Y (Xanh lá)
            cv2.line(cropped_frame, center_pt, tuple(axis_pts[3]), (255, 0, 0), 3) # Trục Z (Xanh dương)
            cv2.circle(cropped_frame, center_pt, 6, (0, 255, 255), -1)
            
            # Xuất thông tin khoảng cách
            tvec = latest_result['tvec']
            distance = np.linalg.norm(tvec)
            
            cv2.putText(cropped_frame, f"GOC TRUNG TAM (0,0,0)", (center_pt[0] - 80, center_pt[1] - 15),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 255), 2)
            cv2.putText(cropped_frame, f"Distance to Center: {distance:.3f} m", (20, 40),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
            cv2.putText(cropped_frame, f"Z (Depth): {tvec[2][0]:.3f} m", (20, 70),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
        else:
            # Nếu frame hiện tại chưa có kết quả tính toán mới, viết cảnh báo trạng thái để người dùng biết
            cv2.putText(cropped_frame, "Searching for ArUco Markers...", (20, 40),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
                        
        # Đẩy khung hình duy nhất lên cửa sổ cố định đã định nghĩa từ trước
        cv2.imshow(window_name, cropped_frame)
        
        # Bắt sự kiện phím bấm ESC để thoát an toàn
        if cv2.waitKey(1) & 0xFF == 27:
            break

    # Tiến hành giải phóng tài nguyên hệ thống
    running = False
    cap.release()
    cv2.destroyAllWindows()
    worker_thread.join()
    print("[UI] Đã đóng ứng dụng an toàn.")

if __name__ == '__main__':
    main_ui_thread()