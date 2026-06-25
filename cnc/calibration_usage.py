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
MARKER_SIZE = 0.0325        # Độ rộng cạnh của ô vuông ArUco
WIDTH_BETWEEN = 0.1465      # Khoảng cách ngang: Từ mép trái ID 0 sang mép trái ID 1
HEIGHT_BETWEEN = 0.2315     # Khoảng cách dọc: Từ mép trên ID 0 xuống mép trên ID 2

# Tính toán vị trí trung tâm (Center) của hệ mặt phẳng để làm lượng dịch chuyển (Offset)
offset_x = (WIDTH_BETWEEN + MARKER_SIZE) / 2.0
offset_y = (-HEIGHT_BETWEEN - MARKER_SIZE) / 2.0

# Định nghĩa tọa độ 3D của 4 Marker riêng biệt (TÂM HỆ PHẲNG LÀ GỐC 0,0,0)
# Điểm đầu tiên [0] của mỗi mảng chính là vị trí 3D vật lý của góc Top-Left từng Marker
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
            gray_frame = frame_queue.get(timeout=1)
        except queue.Empty:
            continue
            
        corners, ids, _ = aruco_detector.detectMarkers(gray_frame)
        calculated_data = None
        
        if ids is not None and len(ids) > 0:
            obj_points_list = []
            img_points_list = []
            formatted_corners = {}
            
            for i, marker_id in enumerate(ids.flatten()):
                if marker_id in MARKER_3D_CENTERED:
                    obj_points_list.append(MARKER_3D_CENTERED[marker_id])
                    pts_2d = corners[i].reshape(4, 2).astype(int)
                    img_points_list.append(corners[i].reshape(4, 2))
                    formatted_corners[marker_id] = pts_2d
            
            if len(obj_points_list) > 0:
                obj_points = np.vstack(obj_points_list)
                img_points = np.vstack(img_points_list)
                
                # Tìm Pose [rvec, tvec] của Tâm mặt phẳng chính
                success, rvec, tvec = cv2.solvePnP(
                    obj_points, img_points, camera_matrix, dist_coeffs, flags=cv2.SOLVEPNP_ITERATIVE
                )
                
                if success:
                    # 1. Chiếu trục ảo độ dài 5cm tại Tâm gốc chính (0,0,0)
                    center_axis_3d = np.array([[0,0,0], [0.05,0,0], [0,0.05,0], [0,0,0.05]], dtype=np.float32)
                    img_pts_center, _ = cv2.projectPoints(center_axis_3d, rvec, tvec, camera_matrix, dist_coeffs)
                    
                    # 2. Chiếu trục ảo độ dài 3cm tại góc Top-Left của TỪNG Marker
                    marker_axes_projected = {}
                    for marker_id in ids.flatten():
                        if marker_id in MARKER_3D_CENTERED:
                            # Lấy tọa độ 3D của góc Top-Left của Marker hiện tại làm điểm gốc cục bộ
                            orig_3d = MARKER_3D_CENTERED[marker_id][0]
                            
                            # Xây dựng hệ trục 3D riêng cho Marker (dài 3cm = 0.03m)
                            marker_axis_3d = np.array([
                                orig_3d,                             # Gốc riêng của Marker
                                orig_3d + np.array([0.03, 0, 0]),    # Trục X cục bộ
                                orig_3d + np.array([0, 0.03, 0]),    # Trục Y cục bộ
                                orig_3d + np.array([0, 0, 0.03])     # Trục Z cục bộ
                            ], dtype=np.float32)
                            
                            img_pts_marker, _ = cv2.projectPoints(marker_axis_3d, rvec, tvec, camera_matrix, dist_coeffs)
                            marker_axes_projected[marker_id] = img_pts_marker.reshape(-1, 2).astype(int)
                    
                    calculated_data = {
                        'corners_dict': formatted_corners,
                        'tvec': tvec,
                        'center_axis_pts': img_pts_center.reshape(-1, 2).astype(int),
                        'marker_axes_dict': marker_axes_projected
                    }
        
        if result_queue.full():
            try: result_queue.get_nowait()
            except queue.Empty: pass
        result_queue.put(calculated_data)
        
    print("[THREAD] Luồng tính toán đã dừng.")

# =====================================================================
# 4. LUỒNG HIỂN THỊ (UI THREAD - Đọc Cam và Vẽ đồ họa)
# =====================================================================
def main_ui_thread():
    global running
    
    cap = cv2.VideoCapture(4)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)
    
    target_size = 720
    window_name = "Multi-threaded Pose Estimation"
    cv2.namedWindow(window_name, cv2.WINDOW_AUTOSIZE)
    
    worker_thread = threading.Thread(target=math_processing_worker)
    worker_thread.start()
    
    print("[UI] Giao diện hoạt động. Nhấn [ESC] để thoát.")
    
    while True:
        ret, frame = cap.read()
        if not ret:
            time.sleep(0.03)
            continue
            
        h, w, _ = frame.shape
        start_x = (w - target_size) // 2
        start_y = (h - target_size) // 2
        cropped_frame = frame[start_y:start_y+target_size, start_x:start_x+target_size]
        
        if frame_queue.empty():
            gray = cv2.cvtColor(cropped_frame, cv2.COLOR_BGR2GRAY)
            try: frame_queue.put_nowait(gray)
            except queue.Full: pass
        
        try: latest_result = result_queue.get(timeout=0.01)
        except queue.Empty: latest_result = None
            
        # --- TIẾN HÀNH VẼ ĐỒ HỌA TRÊN UI THREAD ---
        if latest_result is not None:
            corners_dict = latest_result['corners_dict']
            marker_axes_dict = latest_result['marker_axes_dict']
            
            # Vẽ các đường bao và góc pixel của ArUco
            for marker_id, pts in corners_dict.items():
                cv2.polylines(cropped_frame, [pts], isClosed=True, color=(150, 150, 150), thickness=1)
                
                # Ghi số hiệu ID
                cv2.putText(cropped_frame, f"ID={marker_id}", (pts[0][0], pts[0][1] - 8),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.4, (255, 255, 0), 1)
                
                # Đánh dấu chấm tròn tại 4 góc pixel
                for idx, pt in enumerate(pts):
                    circle_color = (0, 0, 255) if idx == 0 else (255, 0, 255)
                    cv2.circle(cropped_frame, (pt[0], pt[1]), 3, circle_color, -1)

                # --- VẼ HỆ TRỤC 3D RIÊNG CHO TỪNG MARKER (Tọa độ cục bộ dời về Top-Left) ---
                if marker_id in marker_axes_dict:
                    m_axis = marker_axes_dict[marker_id]
                    m_orig = tuple(m_axis[0]) # Gốc tọa độ 3D của riêng Marker đó
                    
                    # Vẽ các tia trục dài 3cm mảnh hơn trục chính: X(Đỏ), Y(Xanh lá), Z(Xanh dương)
                    cv2.line(cropped_frame, m_orig, tuple(m_axis[1]), (0, 0, 255), 2)  # Trục X cục bộ
                    cv2.line(cropped_frame, m_orig, tuple(m_axis[2]), (0, 255, 0), 2)  # Trục Y cục bộ
                    cv2.line(cropped_frame, m_orig, tuple(m_axis[3]), (255, 0, 0), 2)  # Trục Z cục bộ

            # --- VẼ HỆ TRỤC 3D LỚN TẠI GỐC TRUNG TÂM CHÍNH (0,0,0) ---
            center_axis = latest_result['center_axis_pts']
            center_pt = tuple(center_axis[0])
            
            cv2.line(cropped_frame, center_pt, tuple(center_axis[1]), (0, 0, 255), 4) # Trục X lớn
            cv2.line(cropped_frame, center_pt, tuple(center_axis[2]), (0, 255, 0), 4) # Trục Y lớn
            cv2.line(cropped_frame, center_pt, tuple(center_axis[3]), (255, 0, 0), 4) # Trục Z lớn
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
            cv2.putText(cropped_frame, "Searching for ArUco Markers...", (20, 40),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
                        
        cv2.imshow(window_name, cropped_frame)
        if cv2.waitKey(1) & 0xFF == 27:
            break

    running = False
    cap.release()
    cv2.destroyAllWindows()
    worker_thread.join()
    print("[UI] Đã đóng ứng dụng an toàn.")

if __name__ == '__main__':
    main_ui_thread()