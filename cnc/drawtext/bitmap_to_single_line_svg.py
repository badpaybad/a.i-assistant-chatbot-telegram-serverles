import cv2
import numpy as np

def bitmap_to_single_line_svg(input_image_path, output_svg_path):
    print("Đang đọc và tiền xử lý ảnh...")
    # 1. Đọc ảnh xám
    img = cv2.imread(input_image_path, cv2.IMREAD_GRAYSCALE)
    if img is None:
        raise FileNotFoundError(f"Không tìm thấy ảnh tại: {input_image_path}")

    # 2. Nhị phân hóa: Chữ đen thành trắng (255), nền trắng thành đen (0)
    _, thresh = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY_INV)

    # 3. THUẬT TOÁN CỐT LÕI: Thinning (Trích xuất khung xương 1 nét đơn)
    # Thuật toán Zhang-Suen sẽ làm mảnh nét chữ cho đến khi nó chỉ còn độ dày đúng 1 pixel
    print("Đang rút xương nét chữ (Thinning)...")
    skeleton = cv2.ximgproc.thinning(thresh, thinningType=cv2.ximgproc.THINNING_ZHANGSUEN)

    # 4. Tìm các đường phân đoạn từ khung xương
    # Vì ảnh lúc này chỉ dày 1 pixel, ta tìm các đường biên (contours) dạng chuỗi điểm
    contours, _ = cv2.findContours(skeleton, cv2.RETR_LIST, cv2.CHAIN_APPROX_NONE)

    print(f"Đang chuyển đổi và ghi ra file SVG đơn nét: {output_svg_path}...")
    height, width = img.shape

    # 5. Ghi file SVG nét đơn
    with open(output_svg_path, "w") as svg_file:
        svg_file.write(f'<svg xmlns="http://www.w3.org/2000/svg" ')
        svg_file.write(f'viewBox="0 0 {width} {height}" width="{width}" height="{height}">\n')
        
        # Duyệt qua từng đường nét đơn tìm được
        for contour in contours:
            if len(contour) < 2:
                continue # Bỏ qua các điểm chấm nhiễu quá nhỏ
                
            svg_path_data = []
            # Điểm bắt đầu
            start_x, start_y = contour[0][0]
            svg_path_data.append(f"M {start_x:.2f},{start_y:.2f}")
            
            # Nối các điểm tiếp theo bằng lệnh đường thẳng L
            for point in contour[1:]:
                x, y = point[0]
                svg_path_data.append(f"L {x:.2f},{y:.2f}")
            
            path_string = " ".join(svg_path_data)
            
            # LƯU Ý: Với nét đơn, ta KHÔNG dùng fill="black" mà dùng stroke="black" (vẽ nét)
            # Khử đóng vòng khép kín 'Z' để máy không tự động nối điểm cuối về điểm đầu nếu là nét hở
            svg_file.write(f'  <path d="{path_string}" fill="none" stroke="black" stroke-width="1" />\n')
            
        svg_file.write('</svg>\n')
        
    print("Hoàn thành! File SVG hiện tại là các đường Single-line (1 nét thẳng giữa chữ).")

# --- CHẠY THỬ NGHIỆM ---
try:
    bitmap_to_single_line_svg("nguyenphandu.png", "ket_qua_1_net_don.svg")
except Exception as e:
    print(f"Có lỗi xảy ra: {e}")