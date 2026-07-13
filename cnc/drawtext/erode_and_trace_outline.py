import cv2
import numpy as np
import potrace
import os

def erode_and_trace_outline(input_image_path, output_svg_path, thinness_level=2):
    """
    Làm hẹp nét chữ gốc trước khi lấy outline để hai nét trái/phải ép sát vào nhau.
    - thinness_level: Số càng cao, nét chữ càng hẹp lại.
    """
    print(f"Đang đọc ảnh: {input_image_path}")
    img = cv2.imread(input_image_path, cv2.IMREAD_GRAYSCALE)
    if img is None:
        raise FileNotFoundError(f"Không tìm thấy ảnh tại: {input_image_path}")

    # 1. Nhị phân hóa (Đảo ngược để lấy vùng chữ màu trắng)
    _, thresh = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY_INV)

    # 2. XỬ LÝ CỐT LÕI: Làm hẹp nét chữ (Erosion)
    # Tạo một nhân quét (kernel) kích thước 3x3 hình chữ thập hoặc hình vuông
    kernel = cv2.getStructuringElement(cv2.MORPH_CROSS, (3, 3))
    
    print(f"Đang chủ động co hẹp nét chữ với cấp độ: {thinness_level}")
    # Tiến hành xói mòn rìa ảnh. Mỗi vòng lặp (iteration) sẽ làm nét chữ gầy đi 1-2 pixel
    thinned_thresh = cv2.erode(thresh, kernel, iterations=thinness_level)

    # 3. Ép kiểu Boolean cho Potrace
    bitmap_data = thinned_thresh.astype(bool)

    # 4. Dò đường viền Outline đã được ép sát
    print("Đang dò cặp đường viền song song siêu sát bằng Potrace...")
    bitmap = potrace.Bitmap(bitmap_data)
    path = bitmap.trace(alphamax=1.2)

    # 5. Xuất SVG 
    height, width = img.shape
    all_paths = []

    for curve in path:
        svg_path_data = []
        start = curve.start_point
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
                svg_path_data.append(f"C {c1[0]:.2f},{c1[1]:.2f} {c2[0]:.2f},{c2[1]:.2f} {end[0]:.2f},{end[1]:.2f}")
        
        svg_path_data.append("Z") # Đóng đường viền
        all_paths.append(" ".join(svg_path_data))

    full_d = " ".join(all_paths)

    with open(output_svg_path, "w") as svg_file:
        svg_file.write('<svg xmlns="http://www.w3.org/2000/svg" ')
        svg_file.write(f'viewBox="0 0 {width} {height}" width="{width}" height="{height}">\n')
        
        # Với CNC chạy outline sát nhau, ta cấu hình stroke thay vì fill để thấy rõ 2 đường dao chạy sát nhau
        svg_file.write(f'  <path d="{full_d}" fill="none" stroke="black" stroke-width="0.5" />\n')
        svg_file.write('</svg>\n')
        
    print(f"Hoàn thành! File SVG với 2 nét outline sát nhau đã được tạo: {output_svg_path}")

# --- CHẠY THỬ NGHIỆM ---
try:
    # Bạn tăng thinness_level lên (3, 4, 5...) cho đến khi thấy 2 nét outline sát rạt vào nhau đúng ý
    erode_and_trace_outline("image_0.png", "outline_sat_nhau.svg", thinness_level=1)
except Exception as e:
    print(f"Lỗi: {e}")