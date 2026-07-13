import cv2
import numpy as np
import potrace
import os

def extract_perfect_inner_line(input_image_path, output_svg_path):
    print(f"Đang đọc và phân tích cấu trúc hình thái học: {input_image_path}")
    # 1. Đọc ảnh xám
    img = cv2.imread(input_image_path, cv2.IMREAD_GRAYSCALE)
    if img is None:
        raise FileNotFoundError(f"Không tìm thấy hoặc không thể mở ảnh: {input_image_path}")

    # 2. Nhị phân hóa và đảo ngược để lấy vùng chữ đặc (Trắng trên nền đen)
    _, thresh = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY_INV)

    # Đóng các lỗ trống li ti do mực viết tay không đều bằng MORPH_CLOSE
    kernel_smooth = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
    thresh_filled = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel_smooth)

    # 3. THUẬT TOÁN INNER LINE: Distance Transform (Bản đồ khoảng cách nội tâm)
    # Tính khoảng cách từ mỗi pixel trắng tới pixel đen gần nhất (rìa outline)
    print("Đang tính toán bản đồ khoảng cách nội tâm (Distance Transform)...")
    dist_transform = cv2.distanceTransform(thresh_filled, cv2.DIST_L2, 5)

    # Tìm các điểm "đỉnh" nằm ở lõi giữa của nét chữ (Inner Ridge)
    # Một pixel thuộc Inner Line nếu khoảng cách của nó lớn hơn các pixel xung quanh
    inner_ridge = np.zeros_like(thresh_filled)
    
    # Quét ma trận để tìm đỉnh cục bộ (Local Maxima)
    # Lấy những điểm có giá trị lớn hơn hoặc bằng phân nửa độ dày trung bình của nét
    local_max = cv2.dilate(dist_transform, np.ones((3, 3), np.uint8))
    inner_ridge[(dist_transform == local_max) & (dist_transform > 1.5)] = 255

    # 4. Tái cấu trúc Inner Line thành nét đơn 1 pixel liền mạch
    # Dùng Thinning để ép mảng đỉnh về đúng 1 nét đơn tịnh tiến
    inner_line_skeleton = cv2.ximgproc.thinning(inner_ridge, thinningType=cv2.ximgproc.THINNING_ZHANGSUEN)

    # 5. Xử lý xấp xỉ đa giác để nắn thẳng các đoạn vuốt kéo dài của chữ P, p
    contours, _ = cv2.findContours(inner_line_skeleton, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
    clean_inner_canvas = np.zeros_like(inner_line_skeleton)
    
    for cnt in contours:
        # epsilon=0.8 giúp làm mượt răng cưa cơ học nhưng vẫn giữ đúng dáng ngoặt của tay người
        approx = cv2.approxPolyDP(cnt, epsilon=0.8, closed=False)
        cv2.polylines(clean_inner_canvas, [approx], False, 255, 1)

    # 6. Sử dụng Potrace để chuyển Inner Line thành các đường cong Bezier mượt mà
    print("Đang nạp Inner Line vào Potrace để tạo vector Bezier...")
    bitmap_data = clean_inner_canvas.astype(bool)
    bitmap = potrace.Bitmap(bitmap_data)
    
    # alphamax=1.2 đảm bảo các đường inner nối nhau mềm mại đúng tinh thần viết tay
    path = bitmap.trace(alphamax=1.2)

    # 7. Ghi xuất file SVG nét đơn nội tâm (Inner Line SVG)
    print(f"Đang ghi dữ liệu Inner Line ra file SVG: {output_svg_path}...")
    height, width = img.shape
    
    with open(output_svg_path, "w") as svg_file:
        svg_file.write('<svg xmlns="http://www.w3.org/2000/svg" ')
        svg_file.write(f'viewBox="0 0 {width} {height}" width="{width}" height="{height}">\n')
        
        for curve in path:
            svg_path_data = []
            start = curve.start_point
            # M: Di chuyển đầu dao CNC đến điểm bắt đầu của nét Inner
            svg_path_data.append(f"M {start[0]:.2f},{start[1]:.2f}")
            
            for segment in curve.segments:
                if segment.is_corner:
                    c = segment.c
                    end = segment.end_point
                    svg_path_data.append(f"L {c[0]:.2f},{c[1]:.2f} L {end[0]:.2f},{end[1]:.2f}")
                else:
                    c1 = segment.c1
                    c2 = segment.c2
                    end = segment.end_point
                    # C: Lệnh Bezier tạo đường vuốt mượt cho đầu CNC
                    svg_path_data.append(f"C {c1[0]:.2f},{c1[1]:.2f} {c2[0]:.2f},{c2[1]:.2f} {end[0]:.2f},{end[1]:.2f}")
            
            path_string = " ".join(svg_path_data)
            # Khắc nét đơn: fill="none", dùng stroke để máy CNC chạy đúng 1 đường tâm
            svg_file.write(f'  <path d="{path_string}" fill="none" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />\n')
            
        svg_file.write('</svg>\n')
        
    print(f"Hoàn thành! File Inner Line SVG đã sẵn sàng: {os.path.basename(output_svg_path)}")

# --- CHẠY THỬ NGHIỆM ---
try:
    extract_perfect_inner_line("image_0.png", "perfect_inner_line_vector.svg")
except Exception as e:
    print(f"Có lỗi xảy ra: {e}")