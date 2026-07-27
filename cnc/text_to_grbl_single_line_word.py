import unicodedata
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from skimage.morphology import skeletonize


def text_to_grbl_single_line_word(
    text: str,
    font_path: str,
    output_gcode: str = "nguyen_phan_du_print.gcode",
    # Cỡ chữ theo chuẩn Word (pt). Ví dụ: 72pt, 120pt, v.v.
    font_size_pt: float = 72.0,
    z_safe: float = 3.0,
    z_draw: float = 0.0,
    feed_rate: float = 1200.0,
    margin_mm: float = 5.0
):
    # 1. Chuẩn hóa Unicode Tiếng Việt (NFC)
    normalized_text = unicodedata.normalize('NFC', text)

    # 2. Quy đổi cỡ chữ từ pt (Word) sang mm thực tế
    # Standard Typography: 1 inch = 72 pt = 25.4 mm => 1 pt = 0.352778 mm
    MM_PER_PT = 25.4 / 72.0
    em_height_mm = font_size_pt * MM_PER_PT

    # Render ở độ phân giải siêu nét (DPI cao) để làm mịn đường cong thư pháp
    RENDER_DPI = 600
    font_size_px = int(font_size_pt * (RENDER_DPI / 72.0))

    try:
        font = ImageFont.truetype(font_path, size=font_size_px)
    except Exception as e:
        print(f"Lỗi không mở được file font: {e}")
        return

    # 3. Tính toán Bounding Box và kích thước Canvas
    dummy_img = Image.new("L", (1, 1))
    draw_dummy = ImageDraw.Draw(dummy_img)
    bbox = draw_dummy.textbbox((0, 0), normalized_text, font=font)

    pad_px = int(40 * (RENDER_DPI / 72.0) / 4)
    raw_w_px = bbox[2] - bbox[0]
    raw_h_px = bbox[3] - bbox[1]

    canvas_w_px = raw_w_px + pad_px * 2
    canvas_h_px = raw_h_px + pad_px * 2

    # 4. Render chữ
    img = Image.new("L", (canvas_w_px, canvas_h_px), color=255)
    draw = ImageDraw.Draw(img)
    draw.text((pad_px - bbox[0], pad_px - bbox[1]),
              normalized_text, fill=0, font=font)

    img_np = np.array(img)
    binary_img = img_np < 128

    # 5. Rút xương Centerline (1 nét)
    skeleton = skeletonize(binary_img)
    skeleton_uint8 = (skeleton * 255).astype(np.uint8)

    # 6. Trích xuất Contours
    contours, _ = cv2.findContours(
        skeleton_uint8, cv2.RETR_LIST, cv2.CHAIN_APPROX_NONE)

    if not contours:
        print("Không trích xuất được đường nét nào!")
        return

    # 7. Tính tỉ lệ quy đổi Pixel Canvas -> MM
    # Quy đổi dựa trên tỉ lệ chính xác của Font size (pt)
    scale_mm_per_px = (font_size_pt * MM_PER_PT) / font_size_px
    actual_w_mm = raw_w_px * scale_mm_per_px
    actual_h_mm = raw_h_px * scale_mm_per_px

    # 8. Thu thập và Tối ưu hóa danh sách nét vẽ (Paths)
    raw_paths = []
    for contour in contours:
        if len(contour) < 3:
            continue

        approx = cv2.approxPolyDP(contour, epsilon=1.2, closed=False)
        pts = approx.reshape(-1, 2)

        # Chuyển đổi tọa độ Pixel sang MM
        # (Y tính từ đỉnh xuống đáy để đảm bảo chuẩn thứ tự)
        path_mm = []
        for pt in pts:
            x_mm = (pt[0] - pad_px) * scale_mm_per_px + margin_mm
            y_mm = (pt[1] - pad_px) * scale_mm_per_px + margin_mm
            path_mm.append((x_mm, y_mm))

        if len(path_mm) >= 2:
            raw_paths.append(path_mm)

    # 9. Sắp xếp thứ tự nét vẽ: TRÊN XUỐNG DƯỚI, TRÁI SANG PHẢI
    # Lấy điểm đầu của nét để làm tiêu chí sắp xếp
    def get_sort_key(path):
        p1 = path[0]
        p2 = path[-1]
        # Chọn điểm cao hơn (y nhỏ hơn) làm điểm bắt đầu
        top_y = min(p1[1], p2[1])
        left_x = min(p1[0], p2[0])
        # Nhóm các nét cùng dòng (chia dải 10mm) rồi ưu tiên theo X từ trái sang
        row_bucket = int(top_y / 8.0)
        return (row_bucket, left_x, top_y)

    # Đảm bảo từng nét riêng lẻ luôn đi từ điểm cao hơn/bên trái hơn
    oriented_paths = []
    for path in raw_paths:
        p_start = path[0]
        p_end = path[-1]
        # Nếu điểm cuối nằm cao hơn điểm đầu (hoặc cùng độ cao mà bên trái hơn), đảo chiều nét
        if (p_end[1] < p_start[1]) or (abs(p_end[1] - p_start[1]) < 0.1 and p_end[0] < p_start[0]):
            oriented_paths.append(list(reversed(path)))
        else:
            oriented_paths.append(path)

    # Sắp xếp danh sách toàn bộ các nét
    sorted_paths = sorted(oriented_paths, key=get_sort_key)

    # 10. Tạo Mã G-Code GRBL
    gcode = [
        f"; --- G-CODE CNC 1 NÉT CHUẨN IN ẤN (WORD) ---",
        f"; Chuỗi: {normalized_text}",
        f"; Font Size: {font_size_pt} pt ({actual_h_mm:.2f} mm height)",
        f"; Kich thuoc thuc te: {actual_w_mm:.2f} x {actual_h_mm:.2f} mm",
        "G21 ; Don vi: mm",
        "G90 ; Toa do tuyet doi",
        f"G0 Z{z_safe:.2f} ; Lift Pen\n"
    ]

    for path in sorted_paths:
        start_pt = path[0]
        gcode.append(f"G0 X{start_pt[0]:.2f} Y{start_pt[1]:.2f}")
        gcode.append(f"G1 Z{z_draw:.2f} F{feed_rate:.0f}")

        for pt in path[1:]:
            gcode.append(f"G1 X{pt[0]:.2f} Y{pt[1]:.2f}")

        gcode.append(f"G0 Z{z_safe:.2f}\n")

    gcode.extend(["G0 X0 Y0 ; Tra ve goc 0", "M30 ; Ket thuc"])

    with open(output_gcode, "w", encoding="utf-8") as f:
        f.write("\n".join(gcode))

    print(f"--- THÔNG SỐ VÙNG VẼ ---")
    print(f"Size chữ đặt (Word): {font_size_pt} pt")
    print(
        f"Kích thước vẽ thực tế: {actual_w_mm:.2f} mm (Rộng) x {actual_h_mm:.2f} mm (Cao)")
    print(f"Tổng số đường nét vẽ: {len(sorted_paths)}")
    print(f"File kết quả: {output_gcode}")


# --- CHẠY THỬ NGHỆM ---
if __name__ == "__main__":
    FONT_PATH = "VL_GREATVIBES.ttf"
    TEXT_INPUT = "Nguyễn Phan Du"

    text_to_grbl_single_line_word(
        text=TEXT_INPUT,
        font_path=FONT_PATH,
        output_gcode="nguyen_phan_du_72pt.gcode",
        font_size_pt=24.0,      # Cỡ chữ 72pt (~25.4mm chiều cao)
        margin_mm=5.0,          # Cách lề gốc 5mm
        z_safe=3.0,
        z_draw=0.0,
        feed_rate=1200
    )
