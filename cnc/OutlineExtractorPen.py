import numpy as np
from fontTools.ttLib import TTFont
from fontTools.pens.basePen import BasePen


class OutlineExtractorPen(BasePen):
    """Lớp Pen để đọc dữ liệu đường nét Vector (Curves & Lines) từ Glyph của Font"""

    def __init__(self, glyphSet):
        super().__init__(glyphSet)
        self.paths = []
        self.current_path = []

    def _moveTo(self, pt):
        if self.current_path:
            self.paths.append(self.current_path)
            self.current_path = []
        self.current_path.append(('M', pt))

    def _lineTo(self, pt):
        self.current_path.append(('L', pt))

    def _qCurveToOne(self, pt1, pt2):
        # Nội suy đường cong Bezier bậc 2 (Quadratic Bezier) trong Font TTF
        if self.current_path:
            p0 = self.current_path[-1][1]
            for t in np.linspace(0.15, 1.0, 8):
                x = (1-t)**2 * p0[0] + 2*(1-t)*t * pt1[0] + t**2 * pt2[0]
                y = (1-t)**2 * p0[1] + 2*(1-t)*t * pt1[1] + t**2 * pt2[1]
                self.current_path.append(('L', (x, y)))

    def _curveToOne(self, pt1, pt2, pt3):
        # Nội suy đường cong Bezier bậc 3 (Cubic Bezier) trong Font OTF
        if self.current_path:
            p0 = self.current_path[-1][1]
            for t in np.linspace(0.1, 1.0, 10):
                x = (1-t)**3 * p0[0] + 3*(1-t)**2 * t * \
                    pt1[0] + 3*(1-t) * t**2 * pt2[0] + t**3 * pt3[0]
                y = (1-t)**3 * p0[1] + 3*(1-t)**2 * t * \
                    pt1[1] + 3*(1-t) * t**2 * pt2[1] + t**3 * pt3[1]
                self.current_path.append(('L', (x, y)))

    def _closePath(self):
        if self.current_path:
            self.current_path.append(('L', self.current_path[0][1]))
            self.paths.append(self.current_path)
            self.current_path = []

    def _endPath(self):
        if self.current_path:
            self.paths.append(self.current_path)
            self.current_path = []


def text_to_gcode_direct(text, font_path, target_height_mm=20.0, output_path="output_direct.gcode"):
    """
    Chuyển trực tiếp chuỗi Text + Font TTF/OTF thành G-Code GRBL mà KHÔNG qua bước tạo ảnh.
    """
    font = TTFont(font_path)
    glyph_set = font.getGlyphSet()
    cmap = font.getBestCmap()
    units_per_em = font['head'].unitsPerEm

    # Tỷ lệ quy đổi từ đơn vị Font (EM units) sang mm thực tế
    scale = target_height_mm / units_per_em

    # Thông số cấu hình máy CNC GRBL
    Z_SAFE = 3.0       # Độ cao nâng bút an toàn (mm)
    Z_DRAW = 0.0       # Độ cao hạ bút chạm mặt vẽ (mm)
    FEED_RATE = 1200   # Tốc độ cắt/vẽ (mm/phút)

    gcode = []
    gcode.append("; --- GRBL G-Code Generated Directly from TTF Vector ---")
    gcode.append("G21 ; Thước đo mm")
    gcode.append("G90 ; Tọa độ tuyệt đối")
    gcode.append(f"G0 Z{Z_SAFE:.2f} ; Nâng bút an toàn")
    gcode.append("")

    cursor_x = 0.0

    for char in text:
        if char == ' ':
            cursor_x += 500 * scale  # Khoảng trống giữa các từ
            continue

        codepoint = ord(char)
        if codepoint not in cmap:
            continue

        glyph_name = cmap[codepoint]
        glyph = glyph_set[glyph_name]

        pen = OutlineExtractorPen(glyph_set)
        glyph.draw(pen)

        if pen.current_path:
            pen.paths.append(pen.current_path)

        # Xuất các nét vẽ thành lệnh G-Code
        for path in pen.paths:
            if not path:
                continue

            # Tọa độ điểm bắt đầu nét
            _, (px, py) = path[0]
            x_mm = cursor_x + px * scale
            y_mm = py * scale

            # Di chuyển không tải đến điểm bắt đầu
            gcode.append(f"G0 X{x_mm:.2f} Y{y_mm:.2f}")
            # Hạ bút xuống
            gcode.append(f"G1 Z{Z_DRAW:.2f} F{FEED_RATE}")

            # Vẽ liên tiếp qua các điểm vector
            for _, (px, py) in path[1:]:
                x_mm = cursor_x + px * scale
                y_mm = py * scale
                gcode.append(f"G1 X{x_mm:.2f} Y{y_mm:.2f}")

            # Nhấc bút lên
            gcode.append(f"G0 Z{Z_SAFE:.2f}")
            gcode.append("")

        # Tăng con trỏ X theo độ rộng character (Advance Width)
        cursor_x += glyph.width * scale

    gcode.append("G0 X0 Y0 ; Trở về gốc tọa độ")
    gcode.append("M30 ; Kết thúc chương trình")

    with open(output_path, "w", encoding="utf-8") as f:
        f.write("\n".join(gcode))

    print(f"Đã xuất mã G-Code trực tiếp thành công: {output_path}")


# --- THỬ NGHỆM ---
FONT_FILE = "ThuPhap.ttf"  # Thay bằng đường dẫn file font .ttf / .otf của bạn
text_to_gcode_direct("Nguyễn Phan Du", FONT_FILE,
                     target_height_mm=30.0, output_path="direct_cnc.gcode")
