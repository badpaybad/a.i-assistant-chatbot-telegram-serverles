import cv2
import numpy as np


def maximum_detail_sketch(
    image_path,
    gcode_path="output.gcode",
    contours_path="contours_output.png",
    scale_mm_per_pixel=0.15,
    speed=1500,
    clahe_clip_limit=1.5,
    clahe_tile_grid_size=8,
    blur_size=3,
    canny_ultra_low=5,
    canny_ultra_high=25,
    canny_medium_low=20,
    canny_medium_high=60,
    canny_strong_low=50,
    canny_strong_high=120,
    min_contour_len=5,
    use_clahe=True,
    use_blur=True,
    use_connect=True,
    use_thin=True,
    use_len_filter=True
):
    img = cv2.imread(image_path)
    if img is None:
        print("Không tìm thấy ảnh!")
        return False

    height, width = img.shape[:2]
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # 1. LÀM DỊU ĐỘ TƯƠNG PHẢN & PHÂN BỔ ĐỀU ÁNH SÁNG (Histogram Equalization)
    if use_clahe:
        clahe = cv2.createCLAHE(clipLimit=clahe_clip_limit, tileGridSize=(
            clahe_tile_grid_size, clahe_tile_grid_size))
        gray_balanced = clahe.apply(gray)
    else:
        gray_balanced = gray.copy()

    # Lọc nhẹ để triệt tiêu nhiễu hạt siêu nhỏ của máy ảnh
    if use_blur:
        if blur_size % 2 == 0:
            blur_size = max(1, blur_size - 1)
        smoothed = cv2.GaussianBlur(gray_balanced, (blur_size, blur_size), 0)
    else:
        smoothed = gray_balanced.copy()

    # 2. BỘ QUÉT ĐA NGƯỠNG CANNY (MULTI-THRESHOLD CANNY DETECTOR)
    edges_ultra = cv2.Canny(smoothed, canny_ultra_low, canny_ultra_high)
    edges_medium = cv2.Canny(smoothed, canny_medium_low, canny_medium_high)
    edges_strong = cv2.Canny(smoothed, canny_strong_low, canny_strong_high)

    combined_edges = cv2.bitwise_or(edges_ultra, edges_medium)
    combined_edges = cv2.bitwise_or(combined_edges, edges_strong)

    # 3. KẾT NỐI VÀ LÀM THANH MẢNH ĐƯỜNG NÉT
    if use_connect:
        kernel_connect = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
        edges_connected = cv2.morphologyEx(
            combined_edges, cv2.MORPH_CLOSE, kernel_connect)
    else:
        edges_connected = combined_edges.copy()

    if use_thin:
        kernel_thin = np.ones((2, 2), np.uint8)
        binary_clean = cv2.morphologyEx(
            edges_connected, cv2.MORPH_ERODE, kernel_thin)
    else:
        binary_clean = edges_connected.copy()

    # 4. TÌM CONTOURS VÀ LỌC NHIỄU TỐI THIỂU
    contours, _ = cv2.findContours(
        binary_clean, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)

    white_background = np.full(img.shape, 255, dtype=np.uint8)

    valid_contours = []
    for contour in contours:
        if use_len_filter and len(contour) < min_contour_len:
            continue
        valid_contours.append(contour)

    # Vẽ toàn bộ nét vẽ 1px lên nền trắng
    cv2.drawContours(white_background, valid_contours, -1, (0, 0, 0), 1)
    cv2.imwrite(contours_path, white_background)
    print(f"Đã xuất ảnh Sketch tối đa chi tiết tại: {contours_path}")

    # 4.5. ĐẢO HƯỚNG NẾT VÀ SẮP XẾP TUẦN TỰ TRÁI SANG PHẢI (Strict Left-to-Right)
    oriented_contours = []
    for contour in valid_contours:
        pts = contour.reshape(-1, 2)
        if len(pts) > 1:
            start_x, start_y = pts[0]
            end_x, end_y = pts[-1]
            if start_x > end_x or (abs(start_x - end_x) < 0.5 and start_y > end_y):
                pts = np.flip(pts, axis=0)
        oriented_contours.append(pts.reshape(-1, 1, 2))

    row_height_mm = 10.0
    def get_contour_sort_key(c):
        pts = c.reshape(-1, 2)
        xs = pts[:, 0] * scale_mm_per_pixel
        ys = pts[:, 1] * scale_mm_per_pixel
        min_x = float(np.min(xs))
        mid_y = float((np.min(ys) + np.max(ys)) / 2.0)
        row_idx = int(mid_y / row_height_mm)
        return (row_idx, min_x, float(pts[0, 0] * scale_mm_per_pixel))

    sorted_contours = sorted(oriented_contours, key=get_contour_sort_key)

    # 5. XUẤT FILE G-CODE CHO MÁY CNC/LASER
    with open(gcode_path, "w") as f:
        f.write("; Sketch sieu chi tiet - Quet da nguong (Strict Left-to-Right)\n")
        f.write("G21 ; mm\n")
        f.write("G90 ; Toa do tuyet doi\n")
        f.write(f"G94 F{speed} ; Speed\n")
        f.write("M5\n\n")

        for contour in sorted_contours:
            first_point = contour[0][0]
            x_start = round(first_point[0] * scale_mm_per_pixel, 2)
            y_start = round(first_point[1] * scale_mm_per_pixel, 2)

            f.write(f"G0 X{x_start} Y{y_start}\n")
            f.write("M3 S1000\n")

            for point in contour[1:]:
                x = round(point[0][0] * scale_mm_per_pixel, 2)
                y = round(point[0][1] * scale_mm_per_pixel, 2)
                f.write(f"G1 X{x} Y{y}\n")

            f.write("M5\n\n")

        f.write("G0 X0 Y0\n")
        f.write("M30\n")

    print(f"Đã tạo xong file G-code siêu chi tiết: {gcode_path}")
    return True


if __name__ == "__main__":
    maximum_detail_sketch("dunp.png", "portrait.gcode",
                          "portrait_contours.png", scale_mm_per_pixel=0.15, speed=1500)
