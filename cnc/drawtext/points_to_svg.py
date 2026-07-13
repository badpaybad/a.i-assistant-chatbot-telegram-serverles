
import cv2
import numpy as np
from svgpathtools import svg2paths
import svgwrite

# Bước 1: Đọc ảnh - Load ảnh đen trắng
def load_handwriting(image_path):
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    if img is None:
        raise FileNotFoundError(f"Không tìm thấy ảnh: {image_path}")
    
    # Threshold nhị phân: chữ đen nền trắng
    _, binary = cv2.threshold(img, 128, 255, cv2.THRESH_BINARY_INV)
    return binary

# Bước 2: Skeletonization - Tạo xương 1 pixel cho chữ
def skeletonize_image(binary_img):
    skeleton = np.zeros_like(binary_img)
    img = binary_img.copy()
    
    while True:
        # Bước 1: Tìm pixel biên
        eroded = cv2.erode(img, np.ones((3,3), np.uint8))
        temp = cv2.dilate(eroded, np.ones((3,3), np.uint8))
        border = cv2.subtract(img, temp)
        
        # Bước 2: Kiểm tra điều kiện skeleton
        skeleton_prev = skeleton.copy()
        
        for y in range(1, img.shape[0]-1):
            for x in range(1, img.shape[1]-1):
                if img[y, x] == 255:
                    if cv2.countNonZero(img[y-1:y+2, x-1:x+2]) >= 2:
                        skeleton[y, x] = 0  # Giữ xương
                    else:
                        skeleton[y, x] = 255  # Loại bỏ
        
        # Kết hợp border vào skeleton
        skeleton = cv2.bitwise_or(skeleton, border)
        
        # Dừng khi không thay đổi
        if np.array_equal(skeleton, skeleton_prev):
            break
        
        img = eroded
    
    return skeleton

# Bước 3: Chuyển skeleton thành điểm vector
def skeleton_to_points(skeleton_img):
    points = []
    visited = np.zeros_like(skeleton_img, dtype=bool)
    
    for y in range(skeleton_img.shape[0]):
        for x in range(skeleton_img.shape[1]):
                        
            if skeleton_img[y, x] == 255 and not visited[y, x]:
                            path_points = []
                            stack = [(x, y)]
                            
                            while stack:
                                cx, cy = stack.pop()
                                if visited[cy, cx]:
                                    continue
                                visited[cy, cx] = True
                                path_points.append((cx, cy))
                                
                                for dy in [-1, 0, 1]:
                                    for dx in [-1, 0, 1]:
                                        nx, ny = cx + dx, cy + dy
                                        if 0 <= nx < skeleton_img.shape[1] and 0 <= ny < skeleton_img.shape[0]:
                                            if skeleton_img[ny, nx] == 255 and not visited[ny, nx]:
                                                stack.append((nx, ny))
                            
                            if len(path_points) > 5:
                                points.append(path_points)
    
    return points

# Bước 4: Tạo SVG từ điểm skeleton
def points_to_svg(points, output_svg):
    svg = svgwrite.Drawing(output_svg, profile='tiny')
    group = svg.g()
    
    for path_points in points:
        if len(path_points) < 2:
            continue
        path_data = ""
        for i, (x, y) in enumerate(path_points):
            if i == 0:
                path_data += f"M {x},{y} "
            else:
                # Thêm line hoặc cubic bezier cho mượt
                if i < len(path_points) - 1:
                    next_p = path_points[i+1]
                    mid_x = (x + next_p[0]) / 2
                    mid_y = (y + next_p[1]) / 2
                    path_data += f"Q {x},{y} {mid_x},{mid_y} "
                else:
                    path_data += f"L {x},{y} "
        
        svg_path = svg.path(d=path_data, stroke="black", fill="none", stroke_width=1)
        group.add(svg_path)
    
    svg.add(group)
    svg.save()

# Bước 5: Chuyển SVG thành G-code GRBL cơ bản (không tối ưu cho CNC)

def svg_to_gcode(svg_path, output_gcode, feed_rate=1000, tool_height=2.0):
    paths, attributes = svg2paths(svg_path)
    
    with open(output_gcode, 'w') as f:
        f.write("; G-code from handwriting SVG\n")
        f.write(f"F{feed_rate}\n")
        
        for path in paths:
            f.write("G1 Z5.0\n")  # Lên cao khi di chuyển
            first = True
            for segment in path:
                if hasattr(segment, 'start'):
                    if first:
                        x_start = segment.start.real
                        y_start = segment.start.imag
                        f.write(f"G1 X{x_start:.2f} Y{y_start:.2f}\n")
                        f.write(f"G1 Z{tool_height:.2f}\n")  # Hạ công cụ
                        first = False
                    
                    # Lấy điểm cuối của segment
                    x_end = segment.end.real
                    y_end = segment.end.imag
                    f.write(f"G1 X{x_end:.2f} Y{y_end:.2f}\n")
            
            f.write("G1 Z5.0\n")  # Lên cao sau mỗi nét
        
        f.write("G1 Z10.0\n")
        f.write("M30\n")  # Kết thúc
    
    print(f"Đã tạo G-code: {output_gcode}")

# Main - Chạy toàn bộ pipeline
def handwriting_to_gcode(image_path, output_gcode):
    # Đọc ảnh
    binary = load_handwriting(image_path)
    
    # Skeleton hóa
    skeleton = skeletonize_image(binary)
    cv2.imwrite("skeleton_debug.png", skeleton)
    
    # Trích xuất điểm
    points = skeleton_to_points(skeleton)
    print(f"Tìm thấy {len(points)} đường nét")
    
    # Tạo SVG
    svg_path = "output_handwriting.svg"
    points_to_svg(points, svg_path)
    
    # Tạo G-code
    svg_to_gcode(svg_path, output_gcode)

# Sử dụng:
handwriting_to_gcode("image_0.png", "output.gcode")
print("Hoàn tất! File G-code sẵn sàng cho GRBL")