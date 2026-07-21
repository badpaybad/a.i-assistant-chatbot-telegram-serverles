import os
import time
import xml.etree.ElementTree as ET
try:
    import serial
except ImportError:
    serial = None

try:
    from svgpathtools import svg2paths
except ImportError:
    svg2paths = None

def inspect_svg(svg_path):
    """Kiểm tra SVG có chứa thẻ <path> vector hay không"""
    if not os.path.exists(svg_path):
        print(f"❌ File không tồn tại: {svg_path}")
        return False
    
    tree = ET.parse(svg_path)
    root = tree.getroot()
    paths = root.findall('.//{http://www.w3.org/2000/svg}path') + root.findall('.//path')
    images = root.findall('.//{http://www.w3.org/2000/svg}image') + root.findall('.//image')
    
    print(f"🔍 Kiểm tra {svg_path}:")
    print(f"   - Thẻ <path> (Vector): {len(paths)}")
    print(f"   - Thẻ <image> (Bitmap): {len(images)}")
    
    if len(paths) == 0:
        print("⚠️ CẢNH BÁO: File SVG này chưa có thẻ <path> vector nào (chỉ là ảnh nhúng image).")
        print("💡 Hãy dùng Inkscape (Path > Trace Bitmap) hoặc file vector có sẵn như 'cnc_perfect_single_line.svg'.")
        return False
    return True

def convert_svg_to_gcode(input_svg_path, output_gcode_path, safe_z=5.0, cut_z=-1.0, feed_rate=800, travel_rate=1500, segments_per_curve=20, relative_start=True):
    """Chuyển đổi SVG vector thành file G-code chuẩn GRBL, tự động đặt gốc (0,0) tại vị trí hiện tại của đầu CNC"""
    if not svg2paths:
        raise ImportError("Thiếu thư viện 'svgpathtools'. Hãy cài bằng: pip install svgpathtools")

    paths, _ = svg2paths(input_svg_path)
    valid_paths = [p for p in paths if len(p) > 0]
    
    if not valid_paths:
        raise ValueError(f"Không tìm thấy nét vẽ (path) nào trong file {input_svg_path}")

    # Xác định tọa độ gốc (origin_x, origin_y) để offset điểm bắt đầu về (0, 0)
    if relative_start:
        first_pt = valid_paths[0][0].start
        origin_x = first_pt.real
        origin_y = -first_pt.imag
    else:
        origin_x = 0.0
        origin_y = 0.0

    gcode = []

    # Header G-code chuẩn GRBL
    gcode.append("; --- GRBL G-CODE GENERATED FROM SVG ---")
    gcode.append("G21 ; Đơn vị mm")
    gcode.append("G90 ; Tọa độ tuyệt đối")
    if relative_start:
        gcode.append("G92 X0 Y0 Z0 ; Đặt vị trí hiện tại của đầu CNC làm gốc tọa độ (0,0,0)")
    gcode.append("M3 S10000 ; Bật Spindle / Lazer")
    gcode.append(f"G0 Z{safe_z:.2f} ; Nhấc dao lên độ cao an toàn")
    gcode.append(f"G0 F{travel_rate} ; Tốc độ di chuyển không tải")

    count_paths = 0
    for path in valid_paths:
        count_paths += 1

        start_point = path[0].start
        start_x = start_point.real - origin_x
        start_y = -start_point.imag - origin_y  # Đảo Y vì SVG gốc Y hướng xuống, CNC Y hướng lên

        gcode.append(f"G0 X{start_x:.3f} Y{start_y:.3f}")
        gcode.append(f"G1 Z{cut_z:.3f} F{feed_rate}")

        for segment in path:
            num_steps = segments_per_curve if hasattr(segment, 'control1') else 1
            for i in range(1, num_steps + 1):
                t = i / num_steps
                point = segment.point(t)
                x = point.real - origin_x
                y = -point.imag - origin_y
                gcode.append(f"G1 X{x:.3f} Y{y:.3f}")

        gcode.append(f"G0 Z{safe_z:.2f}\n")

    gcode.append("; --- KẾT THÚC CHƯƠNG TRÌNH ---")
    gcode.append(f"G0 Z{safe_z:.2f}")
    gcode.append("G0 X0 Y0 ; Quay về gốc tọa độ ban đầu (vị trí lúc xuất phát)")
    gcode.append("M5 ; Tắt Spindle")
    gcode.append("M30")

    with open(output_gcode_path, "w", encoding="utf-8") as f:
        f.write("\n".join(gcode))

    print(f"✅ Đã tạo file G-code thành công ({count_paths} đường path): {output_gcode_path}")
    if relative_start:
        print(f"📍 Tọa độ đã được offset về vị trí hiện tại của CNC (G92 X0 Y0).")
    return output_gcode_path

def send_gcode_to_tty(gcode_file_path, port_name='/dev/ttyACM0', baud_rate=115200):
    """Gửi từng dòng G-code xuống máy CNC GRBL qua cổng /dev/ttyACM0"""
    if not serial:
        raise ImportError("Thiếu thư viện 'pyserial'. Hãy cài bằng: pip install pyserial")

    if not os.path.exists(gcode_file_path):
        raise FileNotFoundError(f"Không tìm thấy file G-code: {gcode_file_path}")

    print(f"🔌 Đang mở cổng kết nối CNC: {port_name} (Baudrate: {baud_rate})...")
    
    with serial.Serial(port_name, baud_rate, timeout=1) as s:
        # Kích hoạt board GRBL
        s.write(b"\r\n\r\n")
        time.sleep(2)
        s.flushInput()

        print("🚀 Bắt đầu gửi G-code tới máy CNC...")

        with open(gcode_file_path, 'r', encoding="utf-8") as f:
            lines = f.readlines()

        total = len(lines)
        for idx, line in enumerate(lines, 1):
            cleaned = line.strip()
            if not cleaned or cleaned.startswith(';'):
                continue

            print(f"[{idx}/{total}] Send: {cleaned}")
            s.write((cleaned + '\n').encode('utf-8'))

            # Đợi phản hồi ok từ GRBL
            while True:
                resp = s.readline().decode('utf-8', errors='ignore').strip()
                if resp:
                    print(f"   <- GRBL: {resp}")
                    if 'ok' in resp.lower():
                        break
                    elif 'error' in resp.lower():
                        print(f"⚠️ Cảnh báo lỗi từ GRBL: {resp}")
                        break

        print("🎉 Hoàn tất quá trình gia công/khắc CNC!")

if __name__ == "__main__":
    SVG_FILE = "chu_da_chuyen_path.svg"
    GCODE_FILE = "chu_da_chuyen_path.nc"
    SERIAL_PORT = "/dev/ttyACM0"

    print("=== CHƯƠNG TRÌNH TẠO G-CODE VÀ CHẠY MÁY CNC GRBL ===")
    
    # 1. Kiểm tra cấu trúc SVG
    is_valid = inspect_svg(SVG_FILE)
    
    # Nếu file này chưa có vector, tự động tìm file vector hợp lệ trong thư mục
    target_svg = SVG_FILE
    if not is_valid:
        for fallback in ["ket_qua_vector_co_lo.svg", "cnc_perfect_single_line.svg", "chữ_1_net_mượt_mà.svg"]:
            if os.path.exists(fallback):
                print(f"\n🔄 Tự động dùng thử file vector hợp lệ: '{fallback}'...")
                target_svg = fallback
                inspect_svg(target_svg)
                break

    # 2. Biên dịch SVG -> Gcode (nếu có thư viện svgpathtools)
    try:
        convert_svg_to_gcode(target_svg, GCODE_FILE, safe_z=5.0, cut_z=-1.0, feed_rate=1000)
    except Exception as e:
        print(f"❌ Lỗi khi chuyển đổi G-code: {e}")

    # 3. Gửi G-code xuống máy CNC (Hỏi hoặc cấu hình cổng)
    print(f"\n💡 Để truyền file G-code xuống máy CNC qua {SERIAL_PORT}:")
    print(f"   Uncomment dòng `send_gcode_to_tty('{GCODE_FILE}', '{SERIAL_PORT}')` trong script.")
    send_gcode_to_tty(GCODE_FILE, SERIAL_PORT)
