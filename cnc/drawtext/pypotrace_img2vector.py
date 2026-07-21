import cv2
import numpy as np
import potrace

def bitmap_to_svg_perfect_holes(input_image_path, output_svg_path):
    print("Đang đọc và tiền xử lý ảnh...")
    # 1. Đọc ảnh xám
    img = cv2.imread(input_image_path, cv2.IMREAD_GRAYSCALE)
    if img is None:
        raise FileNotFoundError(f"Không tìm thấy hoặc không thể mở ảnh: {input_image_path}")

    # 2. Xử lý nhị phân và đảo ngược để lấy vùng chữ
    _, thresh = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY_INV)

    # 3. Ép kiểu sang Boolean chuẩn để tránh lỗi dữ liệu lớn
    bitmap_data = thresh.astype(bool)

    # 4. Dò đường viền bằng Potrace
    print("Đang dò đường viền bằng Potrace...")
    bitmap = potrace.Bitmap(bitmap_data)
    path = bitmap.trace()

    print(f"Đang ghi dữ liệu vector ra file: {output_svg_path}...")
    height, width = img.shape
    
    # Mảng này sẽ chứa toàn bộ các đường lệnh vẽ của TẤT CẢ các đường viền
    all_paths_combined = []

    # Duyệt qua từng đường bao (gồm cả viền ngoài và lỗ trong)
    for curve in path:
        svg_path_data = []
        start = curve.start_point
        # M: Di chuyển đến điểm đầu của đường viền này
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
        
        # Z: Đóng đường viền hiện tại
        svg_path_data.append("Z")
        
        # Nối chuỗi lệnh của đường viền này vào mảng tổng
        all_paths_combined.append(" ".join(svg_path_data))

    # Gộp toàn bộ lệnh vẽ thành 1 chuỗi dữ liệu duy nhất siêu dài
    full_d_attribute = " ".join(all_paths_combined)

    # 5. Ghi ra file SVG với duy nhất MỘT thẻ path
    with open(output_svg_path, "w") as svg_file:
        svg_file.write(f'<svg xmlns="http://www.w3.org/2000/svg" ')
        svg_file.write(f'viewBox="0 0 {width} {height}" width="{width}" height="{height}">\n')
        
        # Đưa fill-rule="evenodd" trực tiếp vào thẻ path duy nhất này
        svg_file.write(f'  <path d="{full_d_attribute}" fill="black" stroke="none" fill-rule="evenodd" />\n')
        
        svg_file.write('</svg>\n')
        
    print("Hoàn thành! Lỗ trong các chữ O, D, B... đã được đục thành công.")

# --- CHẠY THỬ NGHIỆM VỚI FILE CỦA BẠN ---
try:
    bitmap_to_svg_perfect_holes("/work/a.i-assistant-chatbot-telegram-serverles/cnc/drawtext/2026-07-12_18-10.png", "pypo_ket_qua_vector_co_lo.svg")
except Exception as e:
    print(f"Có lỗi xảy ra: {e}")