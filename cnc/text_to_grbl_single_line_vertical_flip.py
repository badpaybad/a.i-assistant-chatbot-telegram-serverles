import unicodedata
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from skimage.morphology import skeletonize


def text_to_grbl_single_line(
    text: str,
    font_path: str,
    output_gcode: str = "nguyen_phan_du.gcode",
    max_x: float = 200.0,       # Giới hạn chiều rộng tối đa (mm)
    max_y: float = 100.0,       # Giới hạn chiều cao tối đa (mm)
    target_height_mm: float = None,  # (Tùy chọn) Chiều cao chữ mong muốn
    z_safe: float = 3.0,
    z_draw: float = 0.0,
    feed_rate: float = 1200.0,
    margin_mm: float = 5.0      # Lề an toàn cách mép tối đa (mm)
):
    # 1. Chuẩn hóa chuỗi Unicode Tiếng Việt
    normalized_text = unicodedata.normalize('NFC', text)

    # 2. Khởi tạo Font và Canvas độ phân giải cao
    font_size = 300
    try:
        font = ImageFont.truetype(font_path, size=font_size)
    except Exception as e:
        print(f"Lỗi không mở được file font: {e}")
        return

    # Lấy Bounding Box của văn bản
    dummy_img = Image.new("L", (1, 1))
    draw_dummy = ImageDraw.Draw(dummy_img)
    bbox = draw_dummy.textbbox((0, 0), normalized_text, font=font)

    pad_px = 40
    raw_w_px = bbox[2] - bbox[0]
    raw_h_px = bbox[3] - bbox[1]

    canvas_w_px = raw_w_px + pad_px * 2
    canvas_h_px = raw_h_px + pad_px * 2

    # 3. Render chữ lên Canvas
    img = Image.new("L", (canvas_w_px, canvas_h_px), color=255)
    draw = ImageDraw.Draw(img)
    draw.text((pad_px - bbox[0], pad_px - bbox[1]),
              normalized_text, fill=0, font=font)

    img_np = np.array(img)
    binary_img = img_np < 128

    # 4. Rút xương đường trung tuyến (Centerline 1 nét)
    skeleton = skeletonize(binary_img)
    skeleton_uint8 = (skeleton * 255).astype(np.uint8)

    # 5. Trích xuất các Contours
    contours, _ = cv2.findContours(
        skeleton_uint8, cv2.RETR_LIST, cv2.CHAIN_APPROX_NONE)

    if not contours:
        print("Không trích xuất được đường nét nào!")
        return

    # 6. Tính toán Scale sao cho nằm gọn trong (max_x - 2*margin) và (max_y - 2*margin)
    avail_w_mm = max(1.0, max_x - 2 * margin_mm)
    avail_h_mm = max(1.0, max_y - 2 * margin_mm)

    scale_w = avail_w_mm / raw_w_px
    scale_h = avail_h_mm / raw_h_px

    # Chọn tỷ lệ nhỏ hơn để chữ không bị méo/vượt quá khổ
    scale_mm_per_px = min(scale_w, scale_h)

    if target_height_mm is not None:
        desired_scale = target_height_mm / raw_h_px
        if desired_scale <= scale_mm_per_px:
            scale_mm_per_px = desired_scale
        else:
            print(
                f"⚠️ Cảnh báo: target_height_mm ({target_height_mm}mm) vượt quá max_y ({max_y}mm). Tự động thu nhỏ!")

    # Kích thước thực tế sẽ vẽ ra (mm)
    actual_w_mm = raw_w_px * scale_mm_per_px
    actual_h_mm = raw_h_px * scale_mm_per_px

    # Tọa độ offset căn lề (Căn giữa trong vùng làm việc)
    offset_x_mm = margin_mm + (avail_w_mm - actual_w_mm) / 2.0
    offset_y_mm = margin_mm + (avail_h_mm - actual_h_mm) / 2.0

    print(f"--- THÔNG SỐ VÙNG VẼ ---")
    print(f"Khổ tối đa (Max): {max_x:.1f} x {max_y:.1f} mm")
    print(f"Kích thước chữ thực tế: {actual_w_mm:.2f} x {actual_h_mm:.2f} mm")
    print(
        f"Gốc bắt đầu chữ (Min X, Y): ({offset_x_mm:.2f}, {offset_y_mm:.2f}) mm")

    # 7. Xuất mã G-Code GRBL
    gcode = [
        f"; --- G-CODE CNC 1 NÉT VÙNG GIỚI HẠN ---",
        f"; Chuỗi: {normalized_text}",
        f"; Working Area: {max_x}x{max_y} mm",
        "G21 ; Don vi: mm",
        "G90 ; Toa do tuyet doi",
        f"G0 Z{z_safe:.2f} ; Lift Pen\n"
    ]

    total_paths = 0
    for contour in contours:
        if len(contour) < 3:
            continue

        approx_contour = cv2.approxPolyDP(contour, epsilon=0.8, closed=False)
        pts = approx_contour.reshape(-1, 2)

        # Chuyển đổi tọa độ Pixel -> MM + Shift về gốc offset_x, offset_y
        start_x = (pts[0][0] - pad_px) * scale_mm_per_px + offset_x_mm
        start_y = (pts[0][1] - pad_px) * scale_mm_per_px + offset_y_mm

        # Kiểm tra an toàn tọa độ
        start_x = np.clip(start_x, 0, max_x)
        start_y = np.clip(start_y, 0, max_y)

        gcode.append(f"G0 X{start_x:.2f} Y{start_y:.2f}")
        gcode.append(f"G1 Z{z_draw:.2f} F{feed_rate:.0f}")

        for pt in pts[1:]:
            x_mm = (pt[0] - pad_px) * scale_mm_per_px + offset_x_mm
            y_mm = (pt[1] - pad_px) * scale_mm_per_px + offset_y_mm

            x_mm = np.clip(x_mm, 0, max_x)
            y_mm = np.clip(y_mm, 0, max_y)

            gcode.append(f"G1 X{x_mm:.2f} Y{y_mm:.2f}")

        gcode.append(f"G0 Z{z_safe:.2f}\n")
        total_paths += 1

    gcode.extend(["G0 X0 Y0 ; Tra ve goc 0", "M30 ; Ket thuc"])

    with open(output_gcode, "w", encoding="utf-8") as f:
        f.write("\n".join(gcode))

    print(f"\nXuất mã G-Code thành công: {output_gcode}")
    print(f"Tổng số đường nét: {total_paths}")


# --- CHẠY THỬ NGHỆM ---
if __name__ == "__main__":
    FONT_PATH = "VL_ThuPhap.ttf"
    TEXT_INPUT = "Nguyễn Phan Du"

    text_to_grbl_single_line(
        text=TEXT_INPUT,
        font_path=FONT_PATH,
        output_gcode="nguyen_phan_du_bounded.gcode",
        max_x=50.0,            # Rộng tối đa 150 mm
        max_y=30.0,             # Cao tối đa 60 mm
        margin_mm=3.0,          # Cách mép 3 mm
        z_safe=3.0,
        z_draw=0.0,
        feed_rate=1200
    )
