import os
import time
import cv2
import numpy as np
import potrace
from svgpathtools import svg2paths
from shapely.geometry import Polygon, MultiPolygon
from shapely.ops import unary_union

try:
    import serial
except ImportError:
    serial = None


def resize_and_vectorize(input_image_path, output_svg_path, max_dim=299):
    """
    1. Thu nhỏ ảnh về kích thước dưới max_dim px (ví dụ: < 300px) giữ nguyên tỉ lệ khung hình.
    2. Dùng Potrace chuyển đổi ảnh thành file SVG vector (giữ lỗ rỗng chữ O, D, B...).
    """
    print(
        f"🖼️ Đang đọc và thu nhỏ ảnh: {input_image_path} (Tối đa {max_dim}px mỗi chiều)...")
    img = cv2.imread(input_image_path, cv2.IMREAD_GRAYSCALE)
    if img is None:
        raise FileNotFoundError(f"Không tìm thấy ảnh: {input_image_path}")

    h, w = img.shape
    scale = max_dim / max(h, w)
    new_w = int(w * scale)
    new_h = int(h * scale)

    resized_img = cv2.resize(img, (new_w, new_h), interpolation=cv2.INTER_AREA)
    _, thresh = cv2.threshold(resized_img, 127, 255, cv2.THRESH_BINARY_INV)

    print(f"📐 Kích thước ảnh sau khi thu nhỏ: {new_w} x {new_h} px")

    # Trace bằng Potrace
    bitmap = potrace.Bitmap(thresh.astype(bool))
    path = bitmap.trace()

    all_paths = []
    for curve in path:
        svg_path_data = []
        start = curve.start_point
        svg_path_data.append(f"M {start[0]:.2f},{start[1]:.2f}")
        for segment in curve.segments:
            if segment.is_corner:
                c = segment.c
                end = segment.end_point
                svg_path_data.append(
                    f"L {c[0]:.2f},{c[1]:.2f} L {end[0]:.2f},{end[1]:.2f}")
            else:
                c1 = segment.c1
                c2 = segment.c2
                end = segment.end_point
                svg_path_data.append(
                    f"C {c1[0]:.2f},{c1[1]:.2f} {c2[0]:.2f},{c2[1]:.2f} {end[0]:.2f},{end[1]:.2f}")
        svg_path_data.append("Z")
        all_paths.append(" ".join(svg_path_data))

    full_d = " ".join(all_paths)
    with open(output_svg_path, "w", encoding="utf-8") as f:
        f.write(
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {new_w} {new_h}" width="{new_w}" height="{new_h}">\n')
        f.write(
            f'  <path d="{full_d}" fill="black" stroke="none" fill-rule="evenodd" />\n')
        f.write('</svg>\n')

    print(f"✅ Đã tạo file SVG nhỏ: {output_svg_path}")
    return output_svg_path, new_w, new_h


def extract_polygons_from_svg(svg_path):
    """Đọc file SVG và chuyển đổi thành shapely Polygon"""
    paths, _ = svg2paths(svg_path)
    if not paths:
        raise ValueError(f"Không tìm thấy path nào trong {svg_path}")

    subpaths = paths[0].continuous_subpaths()
    polys = []

    for sp in subpaths:
        pts = []
        for seg in sp:
            for t in np.linspace(0, 1, 10, endpoint=False):
                pt = seg.point(t)
                pts.append((pt.real, pt.imag))
        if len(pts) >= 3:
            poly = Polygon(pts)
            if not poly.is_valid:
                poly = poly.buffer(0)
            if poly.area > 0.05:
                polys.append(poly)

    return polys


def generate_concentric_infill(svg_path, step_mm=0.4):
    """
    Phương pháp B: Thu nhỏ đường viền đồng dạng vào trong (Concentric / Offset Inset Infill)
    """
    print(
        f"🔄 Đang tính toán Concentric Infill (Phương pháp B) cho: {svg_path}...")
    polys = extract_polygons_from_svg(svg_path)
    polys.sort(key=lambda p: p.area, reverse=True)

    outer_polys = []
    hole_polys = []

    for i, p1 in enumerate(polys):
        contains_count = 0
        for j, p2 in enumerate(polys):
            if i != j and p2.contains(p1):
                contains_count += 1
        if contains_count % 2 == 0:
            outer_polys.append(p1)
        else:
            hole_polys.append(p1)

    composite = unary_union(outer_polys)
    for hp in hole_polys:
        composite = composite.difference(hp)

    curr = composite
    level = 0
    all_rings = []

    def extract_rings(geom):
        rings = []
        if geom.is_empty:
            return rings
        if isinstance(geom, Polygon):
            rings.append(geom.exterior.coords[:])
            for hole in geom.interiors:
                rings.append(hole.coords[:])
        elif isinstance(geom, MultiPolygon):
            for poly in geom.geoms:
                rings.append(poly.exterior.coords[:])
                for hole in poly.interiors:
                    rings.append(hole.coords[:])
        return rings

    while not curr.is_empty and curr.area > 0.1:
        rings = extract_rings(curr)
        if rings:
            all_rings.extend(rings)
            level += 1
        curr = curr.buffer(-step_mm)

    print(
        f"✨ Đã tạo {level} cấp viền Concentric ({len(all_rings)} đường vòng tô kín ruột).")
    return all_rings


def convert_rings_to_grbl(all_rings, output_gcode_path, safe_z=5.0, cut_z=-1.0, feed_rate=1000, travel_rate=1500, relative_start=True):
    """Biên dịch các đường Concentric Infill thành G-code chuẩn GRBL"""
    if not all_rings:
        raise ValueError("Danh sách đường vẽ rỗng.")

    first_ring = all_rings[0]
    origin_x = first_ring[0][0]
    origin_y = first_ring[0][1]

    gcode = []
    gcode.append(
        "; --- GRBL G-CODE: SMALL SVG CONCENTRIC INFILL (METHOD B) ---")
    gcode.append("G21 ; Đơn vị mm")
    gcode.append("G90 ; Tọa độ tuyệt đối")
    if relative_start:
        gcode.append(
            "G92 X0 Y0 Z0 ; Đặt vị trí hiện tại của đầu CNC làm gốc (0,0,0)")
    gcode.append("M3 S10000 ; Bật Spindle / Lazer")

    # 1. Nhấc bút lên độ cao an toàn trước khi di chuyển
    gcode.append(
        f"G0 Z{safe_z:.2f} ; 1. Nhấc bút lên độ cao an toàn trước khi bắt đầu di chuyển")
    gcode.append(f"G0 F{travel_rate} ; Tốc độ di chuyển không tải")

    # 2. Di chuyển và hạ bút tại vị trí hiện tại của đầu CNC trước khi bắt đầu vẽ
    gcode.append("G0 X0.000 Y0.000 ; Tới vị trí hiện tại của đầu CNC")
    gcode.append(
        f"G1 Z{cut_z:.3f} F{feed_rate} ; 2. Hạ bút tại vị trí hiện tại của đầu CNC")
    gcode.append(
        f"G0 Z{safe_z:.2f} ; Nhấc bút lên độ cao an toàn để di chuyển vẽ các vòng infill")

    for ring in all_rings:
        if len(ring) < 2:
            continue
        start_x = ring[0][0] - origin_x
        start_y = -(ring[0][1] - origin_y)

        gcode.append(f"G0 X{start_x:.3f} Y{start_y:.3f}")
        gcode.append(f"G1 Z{cut_z:.3f} F{feed_rate}")

        for pt in ring[1:]:
            x = pt[0] - origin_x
            y = -(pt[1] - origin_y)
            gcode.append(f"G1 X{x:.3f} Y{y:.3f}")

        gcode.append(f"G0 Z{safe_z:.2f}")

    gcode.append("; --- KẾT THÚC CHƯƠNG TRÌNH ---")
    gcode.append(f"G0 Z{safe_z:.2f}")
    gcode.append("G0 X0 Y0 ; Quay về vị trí bắt đầu")
    gcode.append("M5 ; Tắt Spindle / Nhấc bút")
    gcode.append("M30")

    with open(output_gcode_path, "w", encoding="utf-8") as f:
        f.write("\n".join(gcode))

    print(f"💾 Đã xuất file G-code: {output_gcode_path}")
    return output_gcode_path


def send_gcode_to_grbl(gcode_file_path, port_name='/dev/ttyACM0', baud_rate=115200):
    """Gửi file G-code xuống máy CNC GRBL qua cổng Serial"""
    if not serial:
        print("⚠️ Thiếu thư viện 'pyserial'.")
        return
    if not os.path.exists(gcode_file_path):
        raise FileNotFoundError(
            f"File G-code không tồn tại: {gcode_file_path}")

    print(f"🔌 Đang kết nối {port_name} ({baud_rate})...")
    with serial.Serial(port_name, baud_rate, timeout=1) as s:
        s.write(b"\r\n\r\n")
        time.sleep(2)
        s.flushInput()
        print("🚀 Đang truyền G-code tới máy CNC...")
        with open(gcode_file_path, 'r', encoding="utf-8") as f:
            lines = f.readlines()
        total = len(lines)
        for idx, line in enumerate(lines, 1):
            cleaned = line.strip()
            if not cleaned or cleaned.startswith(';'):
                continue
            print(f"[{idx}/{total}] Send: {cleaned}")
            s.write((cleaned + '\n').encode('utf-8'))
            while True:
                resp = s.readline().decode('utf-8', errors='ignore').strip()
                if resp:
                    if 'ok' in resp.lower():
                        break
                    elif 'error' in resp.lower():
                        print(f"⚠️ GRBL lỗi: {resp}")
                        break
        print("🎉 Hoàn tất truyền G-code!")


if __name__ == "__main__":
    IMAGE_FILE = "2026-07-12_18-10.png"
    SVG_SMALL = "pypo_ket_qua_vector_co_lo.small.svg"
    GCODE_FILE = "pypo_ket_qua_vector_co_lo.small_fill.nc"
    SERIAL_PORT = "/dev/ttyACM0"
    STEP_MM = 0.4  # Bước thu nhỏ viền 0.4mm

    print("=== TẠO FILE SVG NHỎ (<300px) & G-CODE CONCENTRIC INFILL (METHOD B) ===")

    # 1. Thu nhỏ ảnh về dưới 300px mỗi chiều và vectorize bằng Potrace
    resize_and_vectorize(IMAGE_FILE, SVG_SMALL, max_dim=299)

    # 2. Tạo đường Concentric Infill (Phương pháp B) từ SVG nhỏ
    rings = generate_concentric_infill(SVG_SMALL, step_mm=STEP_MM)

    # 3. Biên dịch thành G-code chuẩn GRBL (Bắt đầu tại vị trí hiện tại của CNC)
    convert_rings_to_grbl(rings, GCODE_FILE, safe_z=5.0, cut_z=-
                          1.0, feed_rate=1000, travel_rate=1500, relative_start=True)

    print("\n✅ Hoàn tất quá trình tạo file!")
    print(f" - SVG nhỏ: {SVG_SMALL}")
    print(f" - G-code NC: {GCODE_FILE}")
    print("\n💡 Bạn có thể tự mở cổng Serial chạy thử lệnh bằng cách giải phóng comment dòng bên dưới:")
    print(f" # send_gcode_to_grbl('{GCODE_FILE}', '{SERIAL_PORT}')")
    send_gcode_to_grbl(GCODE_FILE, SERIAL_PORT)
