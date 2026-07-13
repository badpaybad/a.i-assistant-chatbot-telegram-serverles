import cv2
import numpy as np
import potrace
import os

def advanced_single_line_vectorizer(input_image_path, output_svg_path):
    print(f"Đang đọc và phân tích cấu trúc ảnh viết tay: {input_image_path}")
    # 1. Đọc ảnh xám
    img = cv2.imread(input_image_path, cv2.IMREAD_GRAYSCALE)
    if img is None:
        raise FileNotFoundError(f"Không mở được file ảnh: {input_image_path}")

    # 2. Nhị phân hóa (Đảo ngược để lấy vùng chữ viết tay)
    _, thresh = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY_INV)

    # 3. Làm mịn thô trước khi rút xương (Đóng các lỗ trống nhỏ bên trong nét mực viết tay)
    # Bước này giúp ngăn chặn việc tạo ra các lỗ rỗng tại điểm giao của chữ P
    kernel_close = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
    thresh_smoothed = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel_close)

    # 4. Rút xương trích xuất đường tâm (Single Line Centerline)
    print("Đang trích xuất đường tâm đơn của chữ viết tay...")
    skeleton = cv2.ximgproc.thinning(thresh_smoothed, thinningType=cv2.ximgproc.THINNING_ZHANGSUEN)

    # 5. Khử nhiễu cấu trúc (Lấp toàn bộ các bong bóng/vòng thắt nhỏ còn sót lại tại giao điểm)
    contours, hierarchy = cv2.findContours(skeleton, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE)
    if hierarchy is not None:
        hierarchy = hierarchy[0]
        for i, contour in enumerate(contours):
            # Nếu phát hiện lỗ rỗng bên trong đường xương (nút thắt lỗi)
            if hierarchy[i][3] != -1:
                area = cv2.contourArea(contour)
                if area < 120: # Ngưỡng diện tích vòng lỗi chữ viết tay
                    cv2.drawContours(skeleton, [contour], -1, 255, -1)
                    
    # Rút xương lại một lần cuối sau khi đã lấp đầy các lỗ giao điểm
    final_skeleton = cv2.ximgproc.thinning(skeleton, thinningType=cv2.ximgproc.THINNING_ZHANGSUEN)

    # 6. Ép kiểu sang Boolean chuẩn cho Potrace
    bitmap_data = final_skeleton.astype(bool)

    # 7. SỬ DỤNG POTRACE ĐỂ BIẾN ĐƯỜNG TÂM THÀNH VECTOR MƯỢT MÀ
    print("Đang dùng Potrace để nội suy đường cong Bezier cho nét chữ...")
    bitmap = potrace.Bitmap(bitmap_data)
    # alphamax = 1.3 giúp các đường bẻ góc của chữ viết tay mềm mại, uốn lượn liên tục
    path = bitmap.trace(alphamax=1.3) 

    print(f"Đang xuất file SVG đơn nét tối ưu CNC: {output_svg_path}")
    height, width = img.shape
    
    with open(output_svg_path, "w") as svg_file:
        svg_file.write('<svg xmlns="http://www.w3.org/2000/svg" ')
        svg_file.write(f'viewBox="0 0 {width} {height}" width="{width}" height="{height}">\n')
        
        for curve in path:
            svg_path_data = []
            start = curve.start_point
            # M: Di chuyển dao đến điểm đầu nét
            svg_path_data.append(f"M {start[0]:.2f},{start[1]:.2f}")
            
            for segment in curve.segments:
                if segment.is_corner:
                    c = segment.c
                    end = segment.end_point
                    # L: Đoạn thẳng khi chữ viết tay gập góc nhọn
                    svg_path_data.append(f"L {c[0]:.2f},{c[1]:.2f} L {end[0]:.2f},{end[1]:.2f}")
                else:
                    c1 = segment.c1
                    c2 = segment.c2
                    end = segment.end_point
                    # C: Tạo ra đường cong Bezier mềm mại (Không bị răng cưa pixel)
                    svg_path_data.append(f"C {c1[0]:.2f},{c1[1]:.2f} {c2[0]:.2f},{c2[1]:.2f} {end[0]:.2f},{end[1]:.2f}")
            
            path_string = " ".join(svg_path_data)
            
            # Xuất thẻ path chuẩn Single-line
            # stroke-linecap/linejoin="round" giúp đầu nét cắt tròn trịa, không bị vấp khi máy CNC đổi hướng
            svg_file.write(f'  <path d="{path_string}" fill="none" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />\n')
            
        svg_file.write('</svg>\n')
        
    print(f"Thành công! Đã tạo file: {os.path.basename(output_svg_path)}")

# --- TIẾN HÀNH CHẠY THỬ NGHIỆM ---
try:
    advanced_single_line_vectorizer("image_0.png", "viet_tay_single_line_potrace.svg")
except Exception as e:
    print(f"Lỗi: {e}")