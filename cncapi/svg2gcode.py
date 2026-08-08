import os
import xml.etree.ElementTree as ET
from svgpathtools import svg2paths, Path, Line, polyline, Arc, CubicBezier, QuadraticBezier
import numpy as np

def svg_to_exact_gcode(svg_path, gcode_path, scale_factor=1.0, feed_rate=2000, mode="servo"):
    """
    Chuyển đổi file SVG thành G-code chuẩn cho CNC chạy GRBL.
    Giữ nguyên độ phân giải vector, không bị răng cưa như ảnh bitmap.
    """
    if not os.path.exists(svg_path):
        print(f"Không tìm thấy file SVG tại: {svg_path}")
        return False

    print(f"Đang đọc file SVG: {svg_path}...")
    
    # 1. Đọc các đường dẫn (paths) từ file SVG
    paths, attributes = svg2paths(svg_path)
    
    if not paths:
        print("Không tìm thấy đường nét (path) hợp lệ nào trong file SVG!")
        return False

    svg_height = 100.0
    try:
        tree = ET.parse(svg_path)
        root = tree.getroot()
        viewbox = root.get('viewBox')
        if viewbox:
            svg_height = float(viewbox.split()[3])
        else:
            height_attr = root.get('height')
            if height_attr:
                svg_height = float(height_attr.replace('px', '').replace('mm', '').replace('cm', ''))
    except Exception as e:
        print(f"Lưu ý: Không lấy được chiều cao viewBox thực tế ({e}), dùng mốc mặc định.")

    raw_lines = []
    
    for path in paths:
        if path.length() == 0:
            continue
            
        current_segment_points = []
        num_samples = max(int(path.length() * 2), 10)
        
        for i in range(num_samples + 1):
            t = i / num_samples
            point = path.point(t)
            current_segment_points.append([point.real, point.imag])
            
        if len(current_segment_points) > 1:
            raw_lines.append(current_segment_points)

    print(f"Trích xuất thành công {len(raw_lines)} nét vẽ. Đang tối ưu đường chạy đầu dao...")

    sorted_lines = []
    current_pos = np.array([0.0, 0.0])
    
    while raw_lines:
        closest_idx = -1
        min_dist = float('inf')
        reverse_needed = False
        
        for idx, line in enumerate(raw_lines):
            start_pt = np.array(line[0])
            end_pt = np.array(line[-1])
            
            dist_to_start = np.linalg.norm(current_pos - start_pt)
            dist_to_end = np.linalg.norm(current_pos - end_pt)
            
            if dist_to_start < min_dist:
                min_dist = dist_to_start
                closest_idx = idx
                reverse_needed = False
                
            if dist_to_end < min_dist:
                min_dist = dist_to_end
                closest_idx = idx
                reverse_needed = True
                
        chosen_line = raw_lines.pop(closest_idx)
        if reverse_needed:
            chosen_line.reverse()
            
        sorted_lines.append(chosen_line)
        current_pos = np.array(chosen_line[-1])

    if mode == "servo":
        PEN_DOWN = "M3 S90 ; Ha but\nG4 P0.2"
        PEN_UP   = "M3 S10 ; Nhac but\nG4 P0.2"
    else:
        PEN_DOWN = "G1 Z-1.0 F500 ; Ha dao xuong"
        PEN_UP   = "G0 Z2.0 ; Nhac dao len"

    with open(gcode_path, "w") as f:
        f.write(";--- KHOI TAO MAY VE VECTOR SVG DIRECT ---\n")
        f.write("G21 ; Don vi: mm\n")
        f.write("G90 ; Toa do tuyet doi\n")
        if mode != "servo":
            f.write("G0 Z2.0 ; Đưa trục Z lên thềm an toàn\n")
        f.write(f"F{feed_rate}\n\n")

        for i, line in enumerate(sorted_contours := sorted_lines):
            f.write(f"; --- Net SVG thứ {i+1} ---\n")
            
            x_start = line[0][0] * scale_factor
            y_start = (svg_height - line[0][1]) * scale_factor
            
            f.write(f"G0 X{x_start:.3f} Y{y_start:.3f}\n")
            f.write(f"{PEN_DOWN}\n")
            
            for pt in line[1:]:
                x = pt[0] * scale_factor
                y = (svg_height - pt[1]) * scale_factor
                f.write(f"G1 X{x:.3f} Y{y:.3f}\n")
                
            f.write(f"{PEN_UP}\n\n")

        f.write(";--- KET THUC QUY TRINH ---\n")
        f.write(f"{PEN_UP}\n")
        if mode == "servo":
            f.write("G0 X0 Y0\n")
            f.write(f"{PEN_UP}\n")
        else:
            f.write("G0 Z2.0\n")
            f.write("G0 X0 Y0\n")
            f.write("M30\n")

    print(f" Đã xuất file G-code vector hoàn hảo tại: {gcode_path}")
    return True

if __name__ == "__main__":
    file_svg = "input_logo.svg"
    file_gcode = "output_svg.nc"
    svg_to_exact_gcode(
        svg_path=file_svg, 
        gcode_path=file_gcode, 
        scale_factor=0.5,
        feed_rate=2500,
        mode="servo"
    )
