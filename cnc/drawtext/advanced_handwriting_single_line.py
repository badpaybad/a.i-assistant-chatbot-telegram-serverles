import cv2
import numpy as np
import potrace
import os

def clean_junction_loops(skeleton_img):
    """
    Thuật toán tìm và lấp đầy các lỗ rỗng nhỏ (bubbles) tại giao điểm nét chữ.
    """
    # Tìm các đường viền của ảnh skeleton (tìm cả viền ngoài và lỗ trong)
    contours, hierarchy = cv2.findContours(skeleton_img, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE)
    
    if hierarchy is None:
        return skeleton_img

    filled_skeleton = skeleton_img.copy()
    hierarchy = hierarchy[0]

    for i, contour in enumerate(contours):
        # Nếu hierarchy[i][3] != -1 tức là đường viền này nằm TRONG một đường viền khác (đây là cái lỗ)
        if hierarchy[i][3] != -1:
            area = cv2.contourArea(contour)
            # Các lỗ rỗng do lỗi giao điểm viết tay thường rất nhỏ (dưới 100 pixel)
            if area < 100: 
                # Lấp đầy lỗ này thành màu trắng
                cv2.drawContours(filled_skeleton, [contour], -1, 255, -1)
                
    return filled_skeleton

def advanced_handwriting_single_line(input_image_path, output_svg_path):
    print(f"Đang xử lý ảnh: {input_image_path}")
    img = cv2.imread(input_image_path, cv2.IMREAD_GRAYSCALE)
    if img is None:
        raise FileNotFoundError(f"Không tìm thấy ảnh tại: {input_image_path}")

    # 1. Nhị phân hóa ảnh (Otsu tự động tối ưu ngưỡng)
    _, thresh = cv2.threshold(img, 0, 255, cv2.THRESH_BINARY_INV | cv2.THRESH_OTSU)

    # 2. Rút xương lần 1 (Tạo ra khung xương thô - bộc lộ các nút thắt lỗi)
    print("Rút xương lần 1...")
    skeleton = cv2.ximgproc.thinning(thresh, thinningType=cv2.ximgproc.THINNING_ZHANGSUEN)

    # 3. XỬ LÝ CỐT LÕI: Sửa lỗi giao điểm nét chữ viết tay
    print("Đang triệt tiêu các nút thắt/vòng lặp tại giao điểm nét...")
    filled_skeleton = clean_junction_loops(skeleton)

    # 4. Rút xương lần 2 (Ép các nút thắt đã lấp đầy thành 1 giao điểm duy nhất)
    print("Tái cấu trúc giao điểm thẳng mượt...")
    final_skeleton = cv2.ximgproc.thinning(filled_skeleton, thinningType=cv2.ximgproc.THINNING_ZHANGSUEN)

    # 5. Chuyển đổi sang Boolean và dùng Potrace để làm mượt đường Bezier
    bitmap_data = final_skeleton.astype(bool)
    bitmap = potrace.Bitmap(bitmap_data)
    path = bitmap.trace(alphamax=1.2) # Tăng nhẹ alphamax để các nét chữ viết tay uốn lượn tự nhiên hơn

    # 6. Xuất file SVG chuẩn cho CNC
    print(f"Ghi file SVG: {output_svg_path}")
    height, width = img.shape
    
    with open(output_svg_path, "w") as svg_file:
        svg_file.write('<svg xmlns="http://www.w3.org/2000/svg" ')
        svg_file.write(f'viewBox="0 0 {width} {height}" width="{width}" height="{height}">\n')
        
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
            
            path_string = " ".join(svg_path_data)
            # stroke-width="1" thích hợp cho việc hiển thị và nạp phần mềm CAM tạo G-code
            svg_file.write(f'  <path d="{path_string}" fill="none" stroke="black" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />\n')
            
        svg_file.write('</svg>\n')
        
    print("Hoàn thành! Các nét thẳng giao nhau đã liền mạch và giữ đúng đặc thù viết tay.")

# --- CHẠY KIỂM TRA ---
try:
    advanced_handwriting_single_line("image_0.png", "chu_viet_tay_giao_diem_hoan_hao.svg")
except Exception as e:
    print(f"Lỗi: {e}")