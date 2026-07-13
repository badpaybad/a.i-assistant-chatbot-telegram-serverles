import cv2
import numpy as np
import potrace
import os

def handwriting_bitmap_to_perfect_single_line_svg(input_image_path, output_svg_path):
    """
    Tối ưu hóa ảnh chữ viết tay thành SVG single-line mượt mà dùng Potrace, 
    đặc biệt cho các lỗi nối ngang và nét rời rạc.
    """
    print(f"Bắt đầu xử lý: {input_image_path}...")
    # 1. Đọc ảnh xám
    img = cv2.imread(input_image_path, cv2.IMREAD_GRAYSCALE)
    if img is None:
        raise FileNotFoundError(f"Không tìm thấy hoặc không thể mở ảnh: {input_image_path}")

    # 2. Xử lý nhị phân nâng cao
    # Áp dụng Otsu threshold để tự động tính toán ngưỡng tối ưu cho ảnh có độ sáng không đều
    # và THRESH_BINARY_INV để đảo bét (chữ thành trắng trên nền đen)
    _, thresh = cv2.threshold(img, 0, 255, cv2.THRESH_BINARY_INV | cv2.THRESH_OTSU)

    # 3. THUẬT TOÁN CỐT LÕI 1: Thinning (Trích xuất khung xương)
    # Rút xương nét chữ dày thành một đường mỏng đúng 1 pixel
    print("Đang rút xương nét chữ (Thinning)...")
    skeleton = cv2.ximgproc.thinning(thresh, thinningType=cv2.ximgproc.THINNING_ZHANGSUEN)

    # 4. Xử lý nhiễu hậu Thinning
    # Thinning đôi khi tạo ra các "gai" nhỏ. Ta dùng xói mòn và giãn nở (opening) nhẹ 
    # để làm sạch nét một lần nữa trước khi nạp vào Potrace
    print("Đang làm sạch và liền mạch nét đơn...")
    kernel = np.ones((1, 1), np.uint8) # Dùng nhân rất nhỏ
    skeleton_cleaned = cv2.morphologyEx(skeleton, cv2.MORPH_OPEN, kernel, iterations=1)

    # 5. Ép kiểu sang Boolean chuẩn cho Potrace
    bitmap_data = skeleton_cleaned.astype(bool)

    # 6. THUẬT TOÁN CỐT LÕI 2: Dò đường mượt mà bằng Potrace
    # Thay vì dùng OpenCv contours để nối điểm (tạo ra răng cưa), 
    # ta dùng Potrace để tạo ra các đường cong Bezier
    print("Đang dò đường cong Bezier bằng Potrace...")
    bitmap = potrace.Bitmap(bitmap_data)
    # Tinh chỉnh tham số trace cho single line: 
    # - alphamax: giá trị cao hơn một chút giúp các đường cong mềm mại hơn
    path = bitmap.trace(alphamax=1.0) 

    # 7. Ghi dữ liệu vector ra file SVG
    print(f"Đang ghi dữ liệu vector single-line ra file: {output_svg_path}...")
    height, width = img.shape
    
    with open(output_svg_path, "w") as svg_file:
        svg_file.write(f'<svg xmlns="http://www.w3.org/2000/svg" ')
        svg_file.write(f'viewBox="0 0 {width} {height}" width="{width}" height="{height}">\n')
        
        for curve in path:
            svg_path_data = []
            start = curve.start_point
            # M: Di chuyển đến điểm đầu của đường viền
            svg_path_data.append(f"M {start[0]:.2f},{start[1]:.2f}")
            
            for segment in curve.segments:
                if segment.is_corner:
                    c = segment.c
                    end = segment.end_point
                    # L: Các đường thẳng ngắn (nếu có)
                    svg_path_data.append(f"L {c[0]:.2f},{c[1]:.2f} L {end[0]:.2f},{end[1]:.2f}")
                else:
                    c1 = segment.c1
                    c2 = segment.c2
                    end = segment.end_point
                    # C: Lệnh đường cong Bezier (Trái tim của việc di chuyển CNC mượt mà)
                    svg_path_data.append(f"C {c1[0]:.2f},{c1[1]:.2f} {c2[0]:.2f},{c2[1]:.2f} {end[0]:.2f},{end[1]:.2f}")
            
            # Khử Z (không đóng vòng khép kín): Potrace tạo ra các đường viền khép kín rất mỏng.
            # Với single-line, ta không muốn đường quay về điểm đầu.
            # path_string = " ".join(svg_path_data) + " Z" # Thêm Z để so sánh
            path_string = " ".join(svg_path_data)
            
            # 8. Cấu hình thẻ path cho Laser/CNC
            # - fill="none": Bắt buộc
            # - stroke="black": Bắt buộc để máy hiểu
            # - stroke-linecap="round" / stroke-linejoin="round": Giúp các nét nối được bo tròn, đẹp hơn khi khắc
            svg_file.write(f'  <path d="{path_string}" fill="none" stroke="black" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />\n')
            
        svg_file.write('</svg>\n')
        
    print(f"Hoàn thành! File SVG single-line mượt mà {os.path.basename(output_svg_path)} đã được tạo.")

# --- CHẠY THỬ NGHIỆM VỚI FILE CỦA BẠN ---
try:
    input_file = "image_0.png"
    output_file = "chữ_1_net_mượt_mà.svg"
    handwriting_bitmap_to_perfect_single_line_svg(input_file, output_file)
except FileNotFoundError as e:
    print(f"Lỗi: {e}")
except Exception as e:
    print(f"Có lỗi không xác định xảy ra: {e}")