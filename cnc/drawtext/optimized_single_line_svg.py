import cv2
import numpy as np

def optimized_single_line_svg(input_image_path, output_svg_path, tolerance=1.0):
    print("Đang đọc và tiền xử lý ảnh...")
    # 1. Đọc ảnh xám
    img = cv2.imread(input_image_path, cv2.IMREAD_GRAYSCALE)
    if img is None:
        raise FileNotFoundError(f"Không tìm thấy ảnh tại: {input_image_path}")

    # 2. Nhị phân hóa (Đảo bét để chữ thành màu trắng)
    _, thresh = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY_INV)

    # 3. Rút xương (Thinning) - Giữ lại lõi 1 pixel ở trung tâm chữ
    print("Đang trích xuất khung xương (Zhang-Suen Thinning)...")
    skeleton = cv2.ximgproc.thinning(thresh, thinningType=cv2.ximgproc.THINNING_ZHANGSUEN)

    # 4. Tìm các đường phân đoạn với thuật toán APPROX_SIMPLE để giảm điểm thừa
    # Bản chất contours của OpenCV sẽ đi bám 2 phía của nét 1px, tạo ra đường lặp khép kín rất mỏng.
    contours, _ = cv2.findContours(skeleton, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)

    print(f"Đang tối ưu hóa đường chạy dao và xuất file SVG: {output_svg_path}...")
    height, width = img.shape

    with open(output_svg_path, "w") as svg_file:
        svg_file.write('<svg xmlns="http://www.w3.org/2000/svg" ')
        svg_file.write(f'viewBox="0 0 {width} {height}" width="{width}" height="{height}">\n')
        
        for contour in contours:
            # Thuật toán Ramer-Douglas-Peucker làm mượt đường thẳng, loại bỏ răng cưa pixel
            # Giúp máy CNC chạy mượt không bị khựng/giật cơ học
            approx = cv2.approxPolyDP(contour, epsilon=tolerance, closed=False)
            
            if len(approx) < 2:
                continue
                
            svg_path_data = []
            # Điểm bắt đầu (Lệnh M - Nhấc dao di chuyển đến điểm mới)
            start_x, start_y = approx[0][0]
            svg_path_data.append(f"M {start_x:.2f},{start_y:.2f}")
            
            # Các điểm tiếp theo (Lệnh L - Hạ dao cắt thẳng)
            for point in approx[1:]:
                x, y = point[0]
                svg_path_data.append(f"L {x:.2f},{y:.2f}")
            
            path_string = " ".join(svg_path_data)
            
            # Xuất thẻ path chuẩn single-line dành cho CNC
            # KHÔNG dùng fill, chỉ dùng stroke. Máy CNC/Laser sẽ hiểu đây là 1 đường cắt đơn.
            svg_file.write(f'  <path d="{path_string}" fill="none" stroke="black" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />\n')
            
        svg_file.write('</svg>\n')
        
    print("Hoàn thành! File SVG single-line đã sẵn sàng để nạp vào phần mềm tạo G-code.")

# --- CHẠY THỬ NGHIỆM ---
try:
    # Tham số tolerance (epsilon): Số càng lớn đường càng mượt và ít điểm (tốt cho CNC), 
    # nhưng lớn quá sẽ làm mất chi tiết chữ. Khoảng 0.5 đến 1.5 là đẹp nhất.
    optimized_single_line_svg("image_0.png", "cnc_perfect_single_line.svg", tolerance=0.8)
except Exception as e:
    print(f"Có lỗi xảy ra: {e}")