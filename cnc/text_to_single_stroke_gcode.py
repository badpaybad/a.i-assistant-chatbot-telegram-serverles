import unicodedata
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from skimage.morphology import skeletonize

def text_to_grbl_single_line(
    text: str,
    font_path: str,
    output_gcode: str = "nguyen_phan_du.gcode",
    target_height_mm: float = 30.0,
    z_safe: float = 3.0,
    z_draw: float = 0.0,
    feed_rate: float = 1200.0
):
    # 1. Chuẩn hóa chuỗi Unicode Tiếng Việt về dạng NFC chuẩn
    normalized_text = unicodedata.normalize('NFC', text)

    # 2. Khởi tạo Font và tính toán kích thước Canvas vẽ
    font_size = 300  # Độ phân giải cao để giữ độ chi tiết nét uốn
    try:
        font = ImageFont.truetype(font_path, size=font_size)
    except Exception as e:
        print(f"Lỗi không mở được file font: {e}")
        return

    # Lấy kích thước khung chữ
    dummy_img = Image.new("L", (1, 1))
    draw_dummy = ImageDraw.Draw(dummy_img)
    bbox = draw_dummy.textbbox((0, 0), normalized_text, font=font)
    
    padding = 60
    text_width = bbox[2] - bbox[0] + padding * 2
    text_height = bbox[3] - bbox[1] + padding * 2

    # 3. Render chữ nét nét căng lên Canvas nhị phân
    img = Image.new("L", (text_width, text_height), color=255)
    draw = ImageDraw.Draw(img)
    draw.text((padding - bbox[0], padding - bbox[1]), normalized_text, fill=0, font=font)

    img_np = np.array(img)
    binary_img = img_np < 128  # Chuyển chữ thành True, nền thành False

    # 4. Rút xương đường trung tuyến (Centerline 1 nét)
    skeleton = skeletonize(binary_img)
    skeleton_uint8 = (skeleton * 255).astype(np.uint8)

    # 5. Trích xuất các chuỗi đường nét Vector (Contours/Paths)
    contours, _ = cv2.findContours(skeleton_uint8, cv2.RETR_LIST, cv2.CHAIN_APPROX_NONE)

    if not contours:
        print("Không trích xuất được đường nét nào!")
        return

    # 6. Tính tỷ lệ Quy đổi từ Pixel sang MM thực tế cho máy CNC
    actual_char_height_px = bbox[3] - bbox[1]
    scale_mm_per_px = target_height_mm / actual_char_height_px

    # 7. Khởi tạo và ghi mã G-Code GRBL
    gcode = [
        f"; --- G-CODE CNC 1 NÉT TIẾNG VIỆT ---",
        f"; Chuỗi: {normalized_text}",
        "G21 ; Don vi: mm",
        "G90 ; Toa do tuyet doi",
        f"G0 Z{z_safe:.2f} ; Lift Pen\n"
    ]

    total_paths = 0
    for contour in contours:
        # Lọc bỏ các hạt nhiễu nhỏ hơn 3 pixel
        if len(contour) < 3:
            continue

        # Đơn giản hóa bớt các điểm nằm thẳng hàng để G-code nhẹ hơn
        approx_contour = cv2.approxPolyDP(contour, epsilon=0.8, closed=False)
        pts = approx_contour.reshape(-1, 2)

        # Chuyển đổi tọa độ pixel sang mm (lật trục Y cho đúng gốc máy CNC)
        start_x = pts[0][0] * scale_mm_per_px
        start_y = (text_height - pts[0][1]) * scale_mm_per_px

        # Di chuyển không tải tới điểm đầu nét
        gcode.append(f"G0 X{start_x:.2f} Y{start_y:.2f}")
        # Hạ bút
        gcode.append(f"G1 Z{z_draw:.2f} F{feed_rate:.0f}")

        # Vẽ liên tục qua các điểm mốc
        for pt in pts[1:]:
            x_mm = pt[0] * scale_mm_per_px
            y_mm = (text_height - pt[1]) * scale_mm_per_px
            gcode.append(f"G1 X{x_mm:.2f} Y{y_mm:.2f}")

        # Nâng bút
        gcode.append(f"G0 Z{z_safe:.2f}\n")
        total_paths += 1

    gcode.extend(["G0 X0 Y0 ; Tra ve goc 0", "M30 ; Ket thuc"])

    with open(output_gcode, "w", encoding="utf-8") as f:
        f.write("\n".join(gcode))

    print(f"Xuất mã G-Code 1 nét thành công!")
    print(f"File: {output_gcode}")
    print(f"Tổng số nét vẽ: {total_paths}")

# --- CHẠY THỬ ---
if __name__ == "__main__":
    # Thay đường dẫn font TTF của bạn vào đây
    FONT_PATH = "VL_Halifax_Thin.ttf"
    TEXT_INPUT = "Nguyễn Phan Du"

    text_to_grbl_single_line(
        text=TEXT_INPUT,
        font_path=FONT_PATH,
        output_gcode="nguyen_phan_du_1net.gcode",
        target_height_mm=30.0,
        z_safe=3.0,
        z_draw=0.0,
        feed_rate=1200
    )