import cv2
import numpy as np
import potrace
import os

def prune_skeleton(skeleton_img, max_spur_length=10):
    """
    Thuật toán Pruning: Duyệt qua các pixel để tìm và loại bỏ các nhánh râu ngắn 
    xuất hiện tại các giao điểm chữ viết tay.
    """
    pruned = skeleton_img.copy()
    
    # Tìm các điểm đầu mút (End points) của nét xương
    # Một điểm là đầu mút nếu nó chỉ có chính xác 1 điểm lân cận trong vùng 3x3
    for _ in range(max_spur_length):
        nodes_to_remove = []
        # Định nghĩa nhân quét 3x3 để đếm số pixel lân cận
        kernel = np.array([[1, 1, 1],
                           [1,10, 1],
                           [1, 1, 1]], dtype=np.uint8)
        
        # Lọc ảnh để đếm số điểm lân cận xung quanh mỗi pixel
        filtered = cv2.filter2D((pruned > 0).astype(np.uint8), -1, kernel)
        
        # Các pixel có giá trị chính xác là 11 tức là chính nó (10) + 1 pixel lân cận (1) -> Đầu mút
        end_points = (filtered == 11)
        
        # Tìm các điểm giao (Junction points): chính nó (10) + từ 3 pixel lân cận trở lên (>=3)
        junction_points = (filtered >= 13)
        
        # Thuật toán lan truyền: Nếu đầu mút nằm rất gần điểm giao (nhánh ngắn), ta sẽ xóa nó đi
        # Để đơn giản và hiệu quả, ta gọt dần các đầu mút cụt qua từng vòng lặp
        y_indices, x_indices = np.where(end_points)
        for y, x in zip(y_indices, x_indices):
            # Kiểm tra xem xung quanh điểm mút này có điểm giao nào không
            region = junction_points[max(0, y-2):min(junction_points.shape[0], y+3), 
                                     max(0, x-2):min(junction_points.shape[1], x+3)]
            if np.any(region):
                nodes_to_remove.append((y, x))
                
        if not nodes_to_remove:
            break
            
        for y, x in nodes_to_remove:
            pruned[y, x] = 0
            
    return pruned

def perfect_human_stroke_vectorizer(input_image_path, output_svg_path):
    print(f"Đang xử lý và sửa lỗi gấp khúc nét: {input_image_path}")
    img = cv2.imread(input_image_path, cv2.IMREAD_GRAYSCALE)
    if img is None:
        raise FileNotFoundError(f"Không tìm thấy file: {input_image_path}")

    # 1. Nhị phân hóa ảnh
    _, thresh = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY_INV)
    
    # Làm mịn mảng giao điểm trước khi rút xương
    kernel_close = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
    thresh_smoothed = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel_close)

    # 2. Rút xương lần 1
    skeleton = cv2.ximgproc.thinning(thresh_smoothed, thinningType=cv2.ximgproc.THINNING_ZHANGSUEN)

    # 3. XỬ LÝ CỐT LÕI 1: Khử râu rác tại giao điểm (Pruning)
    print("Đang gọt sạch râu rác, nắn thẳng nét vuốt...")
    skeleton_pruned = prune_skeleton(skeleton, max_spur_length=12)

    # 4. XỬ LÝ CỐT LÕI 2: Làm thẳng các phân đoạn bằng xấp xỉ đa giác nhẹ
    # Bước này ép các đoạn xương bị hơi zic-zắc cơ học thành đường thẳng tuột
    contours, _ = cv2.findContours(skeleton_pruned, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
    clean_skeleton = np.zeros_like(skeleton_pruned)
    for cnt in contours:
        # epsilon = 1.2 giúp triệt tiêu các độ cong gợn sóng nhỏ do răng cưa pixel tạo ra
        approx = cv2.approxPolyDP(cnt, epsilon=1.2, closed=False)
        cv2.polylines(clean_skeleton, [approx], False, 255, 1)

    # 5. Đưa qua Potrace để chuyển hóa sang Bezier mượt mà
    bitmap_data = clean_skeleton.astype(bool)
    bitmap = potrace.Bitmap(bitmap_data)
    # Giảm nhẹ alphamax xuống 1.1 để ưu tiên các đường thẳng dứt khoát, ít bị bo cong quá đà
    path = bitmap.trace(alphamax=1.1)

    # 6. Ghi xuất file SVG tối ưu CNC
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
            svg_file.write(f'  <path d="{path_string}" fill="none" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />\n')
            
        svg_file.write('</svg>\n')
        
    print(f"Hoàn thành! Đường nét vuốt thẳng tự nhiên đã được xuất ra: {output_svg_path}")

# --- CHẠY THỬ NGHIỆM ---
try:
    perfect_human_stroke_vectorizer("image_0.png", "net_vuot_thang_tuyen_tinh.svg")
except Exception as e:
    print(f"Lỗi: {e}")