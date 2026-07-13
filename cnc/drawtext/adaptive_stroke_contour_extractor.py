import cv2
import numpy as np
import potrace
import os

def adaptive_stroke_contour_extractor(input_image_path, output_svg_path, target_thickness=1.0):
    print(f"Đang phân tích độ dày nét chữ (Stroke Thickness Analysis)...")
    img = cv2.imread(input_image_path, cv2.IMREAD_GRAYSCALE)
    if img is None:
        raise FileNotFoundError(f"Không tìm thấy ảnh tại: {input_image_path}")

    # 1. Nhị phân hóa ảnh nhị phân đảo (Chữ trắng, nền đen)
    _, thresh = cv2.threshold(img, 0, 255, cv2.THRESH_BINARY_INV | cv2.THRESH_OTSU)

    # 2. Tính toán ma trận độ dày (Distance Transform)
    # Hàm này cho biết khoảng cách từ tâm nét chữ ra rìa ngoài
    dist = cv2.distanceTransform(thresh, cv2.DIST_L2, 5)
    
    # Lấy độ dày lớn nhất làm điểm tham chiếu
    max_val = np.max(dist)
    print(f"Độ dày nửa nét (bán kính) lớn nhất phát hiện được: {max_val:.2f} pixel")

    # 3. ÉP HẸP NÉT THEO TỶ LỆ ĐỘ DÀY CỤC BỘ (Adaptive Thinning Contour)
    # Thay vì xói mòn đều (dễ làm đứt nét thanh), ta trừ đi một tỷ lệ khoảng cách 
    # Giữ lại phần lõi trung tâm dựa trên độ dày mục tiêu (target_thickness) của béc dao CNC
    thinned_contour = np.zeros_like(thresh)
    # Giữ lại các vùng có khoảng cách nội tâm gần sát đỉnh trục
    thinned_contour[dist > (max_val * 0.15)] = 255 
    
    # Rút xương nhẹ lớp lõi này để thu được cấu trúc liên tục dạng sợi hẹp
    skeleton = cv2.ximgproc.thinning(thinned_contour, thinningType=cv2.ximgproc.THINNING_ZHANGSUEN)

    # 4. Nạp mảng sợi hẹp vào Potrace để lấy Cặp Outline siêu sát
    print("Đang chạy Potrace để lấy Outline nội tâm chập một...")
    bitmap_data = skeleton.astype(bool)
    bitmap = potrace.Bitmap(bitmap_data)
    
    # alphamax=1.25 giữ cấu trúc vuốt thẳng liên tục của chữ viết tay không bị gãy góc
    path = bitmap.trace(alphamax=1.25)

    # 5. Xuất SVG cấu hình 2 nét ôm sát làm 1
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
        
        svg_path_data.append("Z") # Đóng kín đường viền hẹp
        all_paths.append(" ".join(svg_path_data))

    full_d = " ".join(all_paths)

    with open(output_svg_path, "w") as svg_file:
        svg_file.write('<svg xmlns="http://www.w3.org/2000/svg" ')
        svg_file.write(f'viewBox="0 0 {width} {height}" width="{width}" height="{height}">\n')
        
        # Cấu hình fill="none" và stroke="black" để phần mềm CNC đọc làm đường chạy dao (Toolpath)
        # Khi đưa vào LaserGRBL, 2 đường viền này khép sát nhau < 0.1mm sẽ tự chập thành 1 vết cắt duy nhất
        svg_file.write(f'  <path d="{full_d}" fill="none" stroke="black" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" />\n')
        svg_file.write('</svg>\n')
        
    print(f"Xử lý thành công! File lưu tại: {output_svg_path}")

# --- CHẠY KIỂM TRA ---
try:
    adaptive_stroke_contour_extractor("image_0.png", "adaptive_stroke_contour_extractor.svg")
except Exception as e:
    print(f"Có lỗi xảy ra: {e}")