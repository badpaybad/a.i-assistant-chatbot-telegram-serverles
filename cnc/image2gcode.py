import os
# Ép OpenCV sử dụng plugin xcb (X11) để hiển thị giao diện trên Ubuntu Wayland
os.environ["QT_QPA_PLATFORM"] = "xcb"

import cv2
import numpy as np
import serial
import time
from skimage.morphology import thin

# pip install scikit-image networkx

def image_to_perfect_single_line_gcode(image_path, gcode_path, scale_factor=0.1, feed_rate=2000, mode="servo"):
    """
    Trích xuất trục trung hòa (xương chữ) thành 1 nét đơn duy nhất và xuất G-code.
    """
    # 1. Đọc ảnh dưới dạng Grayscale
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    if img is None: 
        print(f"Không tìm thấy file ảnh tại: {image_path}")
        return False
    height, width = img.shape
    
    # Nhị phân hóa ảnh bằng thuật toán Otsu tự động
    _, thresh = cv2.threshold(img, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    
    # Kiểm tra tỷ lệ để đảm bảo Chữ luôn là màu TRẮNG (255), Nền là màu ĐEN (0)
    if cv2.countNonZero(thresh) > (height * width / 2):
        thresh = cv2.bitwise_not(thresh)
    
    # Lọc đóng nhẹ bằng cấu hình 3x3 để làm mịn các rìa răng cưa của chữ to
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
    thresh = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel)

    print("Đang trích xuất trục trung hòa của chữ (Centerline Skeleton)...")
    
    # Chuyển đổi ảnh nhị phân thành mảng bool chuẩn cho skimage
    bool_thresh = np.where(thresh > 0, True, False)
    
    # Thực hiện làm mảnh chữ thành sợi chỉ độ dày đúng 1-pixel
    thinned_bool = thin(bool_thresh)
    
    # Khôi phục mảng uint8 từ mảng bool kết quả
    skeleton = np.zeros(thresh.shape, dtype=np.uint8)
    skeleton[thinned_bool] = 255

    # Tìm các đường contour từ xương ảnh (Sử dụng RETR_TREE để lấy cấu trúc đầy đủ)
    contours, _ = cv2.findContours(skeleton, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)
    if len(contours) == 0: 
        print("Vẫn không tìm thấy nét chữ nào! Vui lòng kiểm tra lại độ tương phản của ảnh.")
        return False

    # 2. SẮP XẾP ĐƯỜNG VỀN TỐI ƯU HÓA HÀNH TRÌNH (Greedy Nearest Neighbor)
    # Loại bỏ các đốm chấm nhiễu siêu nhỏ (chỉ giữ lại nét vẽ dài hơn 2 pixel)
    valid_contours = [c for c in contours if len(c) > 2]
    if not valid_contours:
        print("Không có nét vẽ nào đủ độ dài hợp lệ.")
        return False

    print(f"Tìm thấy {len(valid_contours)} đoạn nét đơn vẽ chữ. Đang tối ưu đường chạy...")
    
    # Sắp xếp các nét theo thứ tự khoảng cách ngắn nhất để tối ưu hóa di chuyển của đầu CNC
    sorted_contours = []
    current_pos = np.array([0, 0]) # Giả định bắt đầu từ gốc (0,0)
    
    while valid_contours:
        closest_idx = -1
        min_dist = float('inf')
        reverse_contour = False
        
        for idx, contour in enumerate(valid_contours):
            start_pt = contour[0][0]
            end_pt = contour[-1][0]
            
            # Tính khoảng cách từ vị trí hiện tại tới điểm đầu hoặc điểm cuối của nét
            dist_to_start = np.linalg.norm(current_pos - start_pt)
            dist_to_end = np.linalg.norm(current_pos - end_pt)
            
            if dist_to_start < min_dist:
                min_dist = dist_to_start
                closest_idx = idx
                reverse_contour = False
                
            if dist_to_end < min_dist:
                min_dist = dist_to_end
                closest_idx = idx
                reverse_contour = True
        
        chosen_contour = valid_contours.pop(closest_idx)
        if reverse_contour:
            chosen_contour = np.flip(chosen_contour, axis=0)
            
        sorted_contours.append(chosen_contour)
        current_pos = chosen_contour[-1][0] # Cập nhật vị trí hiện tại là điểm cuối nét vừa vẽ

    # 3. VẼ VÀ LƯU ẢNH PREVIEW NÉT ĐƠN HOÀN HẢO
    preview_img = np.ones((height, width, 3), dtype=np.uint8) * 255
    for idx, contour in enumerate(sorted_contours):
        color_ratio = idx / len(sorted_contours) if len(sorted_contours) > 1 else 0
        # Tạo hiệu ứng đổi màu theo thứ tự vẽ (từ Xanh lá sang Đỏ)
        current_color = (0, int(255 * (1 - color_ratio)), int(255 * color_ratio))
        
        cv2.drawContours(preview_img, [contour], -1, current_color, 2)
        
        # Ghi số thứ tự bước chạy của đầu CNC lên điểm đầu của nét vẽ
        f_pt = contour[0][0]
        cv2.putText(preview_img, str(idx + 1), (f_pt[0], f_pt[1] - 4), 
                    cv2.FONT_HERSHEY_SIMPLEX, 0.35, (0, 0, 0), 1, cv2.LINE_AA)

    preview_file_path = "perfect_single_line_preview.png"
    cv2.imwrite(preview_file_path, preview_img)
    print(f"--- ĐÃ LƯU ẢNH PREVIEW NÉT ĐƠN TẠI: {preview_file_path} ---")

    # Mở cửa sổ popup hiển thị preview (Nhấn phím bất kỳ để tiếp tục xuất G-code)
    # cv2.imshow("Kiem tra net don (Bam phím bat ky de xuat G-code)", preview_img)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()

    # 4. GHI FILE G-CODE NÉT ĐƠN CHUẨN
    if mode == "servo":
        PEN_DOWN = "M3 S90 ; Ha but\nG4 P0.2"
        PEN_UP   = "M3 S10 ; Nhac but\nG4 P0.2"
    else: # Chế độ Spindle / Laser nâng hạ bằng trục Z
        PEN_DOWN = "G1 Z-1.0 F500 ; Ha dau dao xuong xuong"
        PEN_UP   = "G0 Z2.0 ; Nhac dau dao len an toan"

    with open(gcode_path, "w") as f:
        f.write(";--- KHOI TAO MAY VE NET DON TRUC TRUNG HOA ---\n")
        f.write("G21 ; Don vi: mm\n")
        f.write("G90 ; Toa do tuyet doi\n")
        f.write("G10 L20 P1 X0 Y0 ; Tu dong reset vi tri hien tai lam goc (0,0)\n")
        f.write(f"G0 Z2.0 ; Dua Z len vi tri an toan\n")
        f.write(f"F{feed_rate}\n\n")

        for i, contour in enumerate(sorted_contours):
            f.write(f"; --- Net ve don thu {i+1} ---\n")
            
            first_point = contour[0][0]
            x_start = first_point[0] * scale_factor
            # Đảo ngược trục Y (Y_gcode = -Y_pixel) nếu hình vẽ bị lộn ngược trên bàn máy CNC
            y_start = first_point[1] * scale_factor 

            # Di chuyển nhanh đến điểm bắt đầu nét vẽ
            f.write(f"G0 X{x_start:.3f} Y{y_start:.3f}\n")
            # Hạ đầu công cụ xuống
            f.write(f"{PEN_DOWN}\n")

            # Vẽ các điểm tiếp theo trong nét
            for point in contour[1:]:
                actual_point = point[0]
                x = actual_point[0] * scale_factor
                y = actual_point[1] * scale_factor
                f.write(f"G1 X{x:.3f} Y{y:.3f}\n")

            # Nhấc công cụ lên khi kết thúc nét vẽ
            f.write(f"{PEN_UP}\n\n")

        f.write(";--- KET THUC ---\n")
        f.write("G0 Z2.0\nG0 X0 Y0\nM30\n")
    
    print(f"Đã xuất file G-code nét đơn hoàn hảo tại: {gcode_path}")
    return True

def image_to_gcode(image_path, gcode_path, scale_factor=0.12, feed_rate=2000, mode="servo"):
    """
    Hàm chuyển đổi ảnh sang G-code dạng VẼ BAO QUANH CHỮ SIÊU MỊN & KHÉP KÍN FULL (Trong + Ngoài).
    Đã nâng cấp khử răng cưa, làm mịn nâng cao bằng Douglas-Peucker và ép đóng kín nét vẽ.
    """
    # 1. Đọc ảnh dưới dạng Grayscale
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    if img is None:
        print(f"❌ Không tìm thấy ảnh tại: {image_path}")
        return False
        
    # --- CẢI TIẾN 1: PHÓNG TO ẢNH ĐỂ KHỬ RĂNG CƯA VÀ LÀM MỊN ĐƯỜNG CONG ---
    # Phóng to ảnh lên 2 lần bằng nội suy Cubic giúp các nét tròn mịn hơn đáng kể
    img = cv2.resize(img, (0, 0), fx=2.0, fy=2.0, interpolation=cv2.INTER_CUBIC)
    # Vì ảnh phóng to 2 lần nên phải giảm scale_factor đi một nửa để giữ nguyên kích thước thực tế
    adjusted_scale = scale_factor / 2.0
    
    height, width = img.shape
    
    # Cân bằng sáng và làm mờ Gauss nhẹ để loại bỏ hạt nhiễu cơ học
    gray = cv2.equalizeHist(img)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    
    # Nhị phân hóa ảnh bằng phương pháp Adaptive Thresholding
    thresh = cv2.adaptiveThreshold(blurred, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
                                   cv2.THRESH_BINARY_INV, 15, 3)
    
    # Lọc đóng/mở hình thái học nhẹ để kết nối các điểm đứt gãy nhỏ trên viền
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
    thresh = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel)
    
    # Tìm toàn bộ cấu trúc đường viền bao quanh (Cả trong lẫn ngoài)
    contours, _ = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)
    
    if not contours:
        print("❌ Không tìm thấy bất kỳ đường viền nào trên ảnh!")
        return False

    # 2. XỬ LÝ LÀM MỊN ĐƯỜNG CONG (DOUGLAS-PEUCKER)
    valid_contours = []
    for c in contours:
        # Bỏ qua nhiễu đốm quá nhỏ
        if len(c) < 5: 
            continue
            
        # --- CẢI TIẾN 2: THUẬT TOÁN DOUGLAS-PEUCKER LÀM MỊN NÉT ---
        # Chỉ số epsilon nhỏ (0.002) giúp loại bỏ các điểm răng cưa nhỏ nhặt của pixel 
        # nhưng vẫn giữ lại cấu hình góc cạnh sắc nét chuẩn của chữ vẽ
        epsilon = 0.002 * cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, epsilon, True)
        
        if len(approx) >= 3:
            valid_contours.append(approx)

    if not valid_contours:
        print("❌ Không còn nét vẽ nào hợp lệ sau khi lọc mịn!")
        return False

    print(f"Tìm thấy {len(valid_contours)} đường viền siêu mịn. Đang tối ưu hành trình...")

    # 3. SẮP XẾP ĐƯỜNG VIỀN TỐI ƯU HÀNH TRÌNH (Greedy Nearest Neighbor)
    sorted_contours = []
    current_pos = np.array([0, 0])
    
    while valid_contours:
        closest_idx = -1
        min_dist = float('inf')
        reverse_contour = False
        
        for idx, contour in enumerate(valid_contours):
            start_pt = contour[0][0]
            end_pt = contour[-1][0]
            
            dist_to_start = np.linalg.norm(current_pos - start_pt)
            dist_to_end = np.linalg.norm(current_pos - end_pt)
            
            if dist_to_start < min_dist:
                min_dist = dist_to_start
                closest_idx = idx
                reverse_contour = False
                
            if dist_to_end < min_dist:
                min_dist = dist_to_end
                closest_idx = idx
                reverse_contour = True
        
        chosen_contour = valid_contours.pop(closest_idx)
        if reverse_contour:
            chosen_contour = np.flip(chosen_contour, axis=0)
            
        sorted_contours.append(chosen_contour)
        current_pos = chosen_contour[-1][0]

    # 4. TẠO NỘI DUNG G-CODE CHUẨN PHẦN CỨNG CHỐNG NGHẸN
    gcode = [
        ";--- KHOI TAO MAY VE OUTLINE SIEU MIN KHEP KIN ---",
        "G21 ; Don vi: mm",
        "G90 ; Toa do tuyet doi",
        "G10 L20 P1 X0 Y0 ; Tu dong reset vi tri hien tai lam goc (0,0)"
    ]
    
    if mode == "servo":
        gcode.append("M3 S0 ; Khoi tao xung Servo o muc 0")
        def pen_up(): return "M5 ; Nhac but (Tat xung)"
        def pen_down(): return "M3 S90 ; Ha but xuong"
    else:
        def pen_up(): return "G0 Z2.0 ; Nhac dao len an toan"
        def pen_down(): return "G1 Z-1.0 F500 ; Ha dau dao xuong"

    gcode.append(pen_up())
    gcode.append("G0 Z2.0")
    gcode.append(f"G1 F{feed_rate}")

    # 5. XUẤT TỌA ĐỘ ĐẦU CNC DI CHUYỂN KHÉP KÍN
    for i, contour in enumerate(sorted_contours):
        path_points = [point[0] for point in contour]
        
        # Lọc bỏ các điểm trùng lặp hoặc quá sát nhau (< 0.5 pixel trên ảnh phóng to)
        clean_path = [path_points[0]]
        for pt in path_points[1:]:
            if np.linalg.norm(pt - clean_path[-1]) > 0.5:
                clean_path.append(pt)
                
        # --- CẢI TIẾN 3: ÉP ĐÓNG KÍN NÉT TUYỆT ĐỐI ---
        # Bắt buộc điểm cuối cùng của đường viền phải quay về trùng khớp hoàn toàn với điểm đầu
        if len(clean_path) > 1 and np.linalg.norm(clean_path[-1] - clean_path[0]) > 0.01:
            clean_path.append(clean_path[0])

        if len(clean_path) > 1:
            gcode.append(f"; --- Duong vien min thu {i+1} ---")
            
            # Sử dụng adjusted_scale đã được tính toán lại sau khi upscale ảnh
            x_start = clean_path[0][0] * adjusted_scale
            y_start = clean_path[0][1] * adjusted_scale
            
            # Bước A: Di chuyển nhanh G0 đến điểm đầu viền
            gcode.append(f"G0 X{x_start:.3f} Y{y_start:.3f}")
            
            # Bước B: Hạ bút
            gcode.append(pen_down())
            
            # Bước C: Ép điểm đầu tiên chạy chậm F300 để servo kịp phản hồi
            first_move = clean_path[1]
            x_first = first_move[0] * adjusted_scale
            y_first = first_move[1] * adjusted_scale
            gcode.append(f"G1 X{x_first:.3f} Y{y_first:.3f} F300")
            
            # Bước D: Chạy mượt mà toàn bộ các điểm còn lại
            for pt in clean_path[2:]:
                x = pt[0] * adjusted_scale
                y = pt[1] * adjusted_scale
                gcode.append(f"G1 X{x:.3f} Y{y:.3f} F{feed_rate}")
                
            # Bước E: Vẽ xong khép kín thì nhấc bút lên
            gcode.append(pen_up())

    # 6. KẾT THÚC CHƯƠNG TRÌNH
    gcode.append(";--- KET THUC ---")
    gcode.append("G0 Z2.0")
    gcode.append("G0 X0 Y0")
    gcode.append("M5")
    gcode.append("M30")

    with open(gcode_path, "w") as f:
        f.write("\n".join(gcode))
        
    print(f"✅ Đã hoàn thành! Đường viền xuất ra siêu mịn và đóng kín tuyệt đối tại: {gcode_path}")
    return True



def send_gcode_to_grbl(port_name, gcode_file_path):
    """
    Truyền dữ liệu G-code tuần tự xuống mạch GRBL qua cổng Serial.
    """
    print(f"Đang kết nối tới {port_name}...")
    try:
        s = serial.Serial(port_name, 115200, timeout=1)
    except Exception as e:
        print(f"Không thể mở cổng kết nối {port_name}: {e}")
        return

    s.write(b"\r\n\r\n")
    time.sleep(2)   # Đợi GRBL khởi động xong
    s.flushInput()  

    print("Kết nối thành công! Đang gửi file G-code...")

    with open(gcode_file_path, 'r') as f:
        for line in f:
            line_clean = line.strip()
            
            # Bỏ qua chú thích trống hoặc dòng lệnh trống
            if not line_clean or line_clean.startswith(';'):
                continue

            command = line_clean + '\n'
            s.write(command.encode('utf-8'))
            print(f"Đã gửi: {line_clean}")

            # Đợi phản hồi xử lý từ bộ đệm GRBL
            while True:
                response = s.readline().decode('utf-8').strip()
                if response:
                    print(f" GRBL phản hồi: {response}")
                    if 'ok' in response or 'error' in response:
                        break
                
    print("--- Hoàn thành gửi toàn bộ file G-code! ---")
    s.close()


# ==========================================
# KHU VỰC CHẠY THỰC TẾ
# ==========================================
if __name__ == "__main__":
    input_image = "doan_van_ban.png"
    output_gcode = "ve_spindle_net_don.nc"
    serial_port = "/dev/ttyACM0"  # Cổng Arduino trên Linux Ubuntu mặc định
    
    # Bước 1: Chuyển đổi ảnh sang G-code dạng 1 NÉT ĐƠN (Sử dụng "servo" hoặc "spindle" tùy cấu hình máy của bạn)
    success = image_to_perfect_single_line_gcode(
        image_path=input_image, 
        gcode_path=output_gcode, 
        scale_factor=0.12, 
        feed_rate=2000, 
        mode="servo" 
    )
    image_to_gcode(
        image_path=input_image, 
        gcode_path=output_gcode +"1.cn", 
        scale_factor=0.12, 
        feed_rate=2000, 
        mode="servo" 
    )       

    send_gcode_to_grbl(serial_port, output_gcode)     
    
    send_gcode_to_grbl(serial_port, output_gcode +"1.cn")
    
    # for i in range(10):
    #     # Bước 2: Nếu tạo file thành công, tiến hành stream trực tiếp xuống máy GRBL CNC
    #     if success:
    #         # send_gcode_to_grbl(serial_port, output_gcode)
    #         send_gcode_to_grbl(serial_port, output_gcode +"1.cn")