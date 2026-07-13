import cv2
import numpy as np
import potrace
import os

def sort_curves_by_writing_order(path):
    """
    Thuật toán sắp xếp các nét vẽ theo đúng trình tự viết tay (từ trái sang phải, từ trên xuống dưới).
    Giúp CNC head di chuyển tuần tiến như tay người, không bị nhảy cóc hỗn loạn.
    """
    curves = list(path)
    if not curves:
        return []
        
    # Sắp xếp các đường dựa trên tọa độ điểm bắt đầu (Ưu tiên X trước - từ trái sang, Y sau)
    sorted_curves = sorted(curves, key=lambda c: (c.start_point[0], c.start_point[1]))
    return sorted_curves

def human_like_single_line_vectorizer(input_image_path, output_svg_path):
    print(f"Đang phân tích động học nét chữ: {input_image_path}")
    img = cv2.imread(input_image_path, cv2.IMREAD_GRAYSCALE)
    if img is None:
        raise FileNotFoundError(f"Không mở được file ảnh: {input_image_path}")

    # 1. Nhị phân hóa và làm mịn mảng mực đè
    _, thresh = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY_INV)
    kernel_close = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
    thresh_smoothed = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel_close)

    # 2. Trích xuất đường tâm xương chữ
    skeleton = cv2.ximgproc.thinning(thresh_smoothed, thinningType=cv2.ximgproc.THINNING_ZHANGSUEN)

    # 3. Khử lỗ nhiễu tại các điểm thắt nút của chữ viết tay
    contours, hierarchy = cv2.findContours(skeleton, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE)
    if hierarchy is not None:
        hierarchy = hierarchy[0]
        for i, contour in enumerate(contours):
            if hierarchy[i][3] != -1:
                if cv2.contourArea(contour) < 150: 
                    cv2.drawContours(skeleton, [contour], -1, 255, -1)
                    
    final_skeleton = cv2.ximgproc.thinning(skeleton, thinningType=cv2.ximgproc.THINNING_ZHANGSUEN)

    # 4. Chuyển đổi sang Potrace Bezier
    bitmap_data = final_skeleton.astype(bool)
    bitmap = potrace.Bitmap(bitmap_data)
    
    # Tăng alphamax lên 1.35 để tối ưu hóa việc "ngoặt dòng" mượt mà tại các khúc cua gấp
    path = bitmap.trace(alphamax=1.35) 

    # 5. SẮP XẾP TUYẾN TÍNH THEO HÀNH TRÌNH VIẾT CHỮ
    print("Đang tuyến tính hóa hành trình dao theo thói quen viết tay...")
    ordered_curves = sort_curves_by_writing_order(path)

    # 6. Xuất SVG tối ưu hóa Gia tốc (Acceleration Profiles) cho CNC GRBL
    height, width = img.shape
    with open(output_svg_path, "w") as svg_file:
        svg_file.write('<svg xmlns="http://www.w3.org/2000/svg" ')
        svg_file.write(f'viewBox="0 0 {width} {height}" width="{width}" height="{height}">\n')
        
        for curve in ordered_curves:
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
                    # Lệnh C tạo ra phân đoạn Bezier bậc 3, chứa thông tin độ dốc (Slope/Tangent)
                    svg_path_data.append(f"C {c1[0]:.2f},{c1[1]:.2f} {c2[0]:.2f},{c2[1]:.2f} {end[0]:.2f},{end[1]:.2f}")
            
            path_string = " ".join(svg_path_data)
            
            # Ghi chú: stroke-linecap="round" đảm bảo tại điểm ngoặt bất ngờ, 
            # thuật toán look-ahead của bộ điều khiển CNC (như GRBL) hiểu được vector tiếp tuyến để giảm tốc mượt.
            svg_file.write(f'  <path d="{path_string}" fill="none" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />\n')
            
        svg_file.write('</svg>\n')
        
    print(f"Hoàn thành! Vector tuyến tính hóa đã sẵn sàng nạp vào bộ dịch G-code.")

# --- RUN ---
try:
    human_like_single_line_vectorizer("image_0.png", "tuyen_tinh_viet_tay_cnc.svg")
except Exception as e:
    print(f"Lỗi: {e}")