import cv2
import numpy as np
from skimage.morphology import thin
from skimage.morphology import skeletonize
import networkx as nx

def image_to_perfect_single_line_gcode(image_path, gcode_path, scale_factor=0.1, feed_rate=2000, mode="servo"):
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    if img is None: return False
    height, width = img.shape
    
    _, thresh = cv2.threshold(img, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    if cv2.countNonZero(thresh) > (height * width / 2):
        thresh = cv2.bitwise_not(thresh)
    
    # 1. Làm mảnh thành xương chữ chuẩn
    bool_thresh = thresh > 0
    skeleton = thin(bool_thresh) # Hoặc dùng skeletonize(bool_thresh)

    # 2. CHUYỂN ĐỔI XƯƠNG CHỮ THÀNH ĐỒ THỊ (GRAPH) ĐỂ LẤY NÉT ĐƠN
    # Tìm các pixel là pixel xương
    y_indices, x_indices = np.where(skeleton)
    points = set(zip(x_indices, y_indices))
    
    G = nx.Graph()
    for (x, y) in points:
        G.add_node((x, y))
        # Kiểm tra 8 pixel xung quanh để nối cạnh
        for dx in [-1, 0, 1]:
            for dy in [-1, 0, 1]:
                if dx == 0 and dy == 0: continue
                neighbor = (x + dx, y + dy)
                if neighbor in points:
                    G.add_edge((x, y), neighbor)

    # Tách đồ thị thành các nét rời rạc (Connected Components)
    lines = []
    for c in nx.connected_components(G):
        subgraph = G.subgraph(c).copy()
        # Tìm các điểm mút (điểm chỉ có 1 liên kết)
        endpoints = [node for node, degree in subgraph.degree() if degree == 1]
        
        if endpoints:
            start_node = endpoints[0]
        else:
            # Nếu là đường cong khép kín (vòng tròn), chọn đại 1 điểm
            start_node = list(subgraph.nodes())[0]
            
        # Duyệt đồ thị theo chiều sâu (DFS) để lấy chuỗi tọa độ liên tục không lặp
        path = list(nx.dfs_preorder_nodes(subgraph, source=start_node))
        if len(path) > 2: # Bỏ qua nhiễu quá ngắn
            lines.append(path)

    if not lines:
        print("Không tìm thấy nét vẽ nào!")
        return False

    # 3. TỐI ƯU HÓA THỨ TỰ CHẠY (Greedy Nearest Neighbor)
    sorted_lines = []
    current_pos = np.array([0, 0])
    
    while lines:
        closest_idx = -1
        min_dist = float('inf')
        reverse_line = False
        
        for idx, line in enumerate(lines):
            start_pt = np.array(line[0])
            end_pt = np.array(line[-1])
            
            dist_to_start = np.linalg.norm(current_pos - start_pt)
            dist_to_end = np.linalg.norm(current_pos - end_pt)
            
            if dist_to_start < min_dist:
                min_dist = dist_to_start
                closest_idx = idx
                reverse_line = False
            if dist_to_end < min_dist:
                min_dist = dist_to_end
                closest_idx = idx
                reverse_line = True
                
        chosen_line = lines.pop(closest_idx)
        if reverse_line:
            chosen_line.reverse()
        sorted_lines.append(chosen_line)
        current_pos = np.array(chosen_line[-1])

    # 4. GHI FILE G-CODE từ dữ liệu sorted_lines
    if mode == "servo":
        PEN_DOWN = "M3 S90 ; Ha but\nG4 P0.2"
        PEN_UP   = "M3 S10 ; Nhac but\nG4 P0.2"
    else:
        PEN_DOWN = "G1 Z-1.0 F500"
        PEN_UP   = "G0 Z2.0"

    with open(gcode_path, "w") as f:
        f.write(";--- KHOI TAO MAY NET DON CHUAN ---\nG21\nG90\nG0 Z2.0\n")
        f.write(f"F{feed_rate}\n\n")

        for i, line in enumerate(sorted_lines):
            f.write(f"; --- Net ve don thu {i+1} ---\n")
            # Lưu ý: OpenCV/Ảnh có gốc tọa độ ở góc TRÊN-TRÁI. 
            # Máy CNC thường có gốc ở DƯỚI-TRÁI. Bạn nên đổi dấu Y (Y_gcode = -Y * scale) nếu chữ bị ngược.
            x_start, y_start = line[0][0] * scale_factor, line[0][1] * scale_factor
            f.write(f"G0 X{x_start:.3f} Y{y_start:.3f}\n")
            f.write(f"{PEN_DOWN}\n")

            for pt in line[1:]:
                x, y = pt[0] * scale_factor, pt[1] * scale_factor
                f.write(f"G1 X{x:.3f} Y{y:.3f}\n")

            f.write(f"{PEN_UP}\n\n")

        f.write("G0 Z2.0\nG0 X0 Y0\nM30\n")
    print(f"Đã xuất file G-code nét đơn HOÀN HẢO tại: {gcode_path}")
    return True

input_image = "doan_van_ban.png"
output_gcode = "ve_spindle_net_don.nc"
serial_port = "/dev/ttyACM0"  # Cổng Arduino trên Linux Ubuntu mặc định

# Bước 1: Chuyển đổi ảnh sang G-code dạng 1 NÉT ĐƠN (Sử dụng "servo" hoặc "spindle" tùy cấu hình máy của bạn)
success = image_to_perfect_single_line_gcode(
    image_path=input_image, 
    gcode_path=output_gcode, 
    scale_factor=0.12, 
    feed_rate=2000, 
    mode="servo" 
)

if __name__ == "__main__":
    # pip install svgpathtools
    from image2gcode import send_gcode_to_grbl
    serial_port = "/dev/ttyACM0"  # Cổng Arduino trên Linux Ubuntu mặc định
    send_gcode_to_grbl(serial_port, output_gcode)