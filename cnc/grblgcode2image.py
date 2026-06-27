import os
# Ép OpenCV sử dụng plugin xcb (X11) để hiển thị giao diện trên Ubuntu Wayland
os.environ["QT_QPA_PLATFORM"] = "xcb"
import re
import matplotlib.pyplot as plt

def parse_gcode(file_path):
    # Khởi tạo danh sách lưu các phân đoạn đường thẳng
    # Mỗi đường thẳng là một cặp điểm: [(x1, y1), (x2, y2)]
    segments = []
    
    # Tọa độ hiện tại của đầu CNC
    current_x = 0.0
    current_y = 0.0
    
    # Biểu thức chính quy (Regex) để tìm X và Y một cách chính xác
    x_pattern = re.compile(r'X([\d\.-]+)')
    y_pattern = re.compile(r'Y([\d\.-]+)')
    
    with open(file_path, 'r') as file:
        for line in file:
            # Loại bỏ khoảng trắng và bỏ qua các dòng chú thích (bắt đầu bằng dấu ;)
            line = line.strip()
            if not line or line.startswith(';(') or line.startswith(';'):
                continue
                
            # Kiểm tra xem dòng có chứa lệnh di chuyển G0 hoặc G1 không
            if line.startswith('G0') or line.startswith('G1') or ('X' in line or 'Y' in line):
                # Tìm tọa độ mới nếu có thay đổi
                x_match = x_pattern.search(line)
                y_match = y_pattern.search(line)
                
                # Nếu dòng không ghi lại X hoặc Y, giữ nguyên tọa độ cũ
                new_x = float(x_match.group(1)) if x_match else current_x
                new_y = float(y_match.group(1)) if y_match else current_y
                # Phân biệt nét vẽ (thường là G1) và nét di chuyển không vẽ (G0)
                # Lưu ý: Một số phần mềm xuất gcode không lặp lại từ khóa G1 ở mỗi dòng
                is_drawing = 'G1' in line or (not 'G0' in line and not 'G00' in line)
                
                # Nếu là lệnh vẽ, lưu phân đoạn này lại
                if is_drawing:
                    segments.append(((current_x, current_y), (new_x, new_y)))
                
                # Cập nhật vị trí hiện tại
                current_x = new_x
                current_y = new_y
                
    return segments

def plot_gcode(segments):
    plt.figure(figsize=(10, 8))
    
    # Bạn có thể đổi linewidth=1 thành 2, 3 hoặc 5 tùy thuộc độ dày mong muốn
    DO_DAY_NET = 1 # 1 mm
    
    for start, end in segments:
        plt.plot([start[0], end[0]], [start[1], end[1]], color='blue', linewidth=DO_DAY_NET)
        
    plt.title("Mô phỏng đường vẽ từ File GRBL G-code")
    plt.axis('equal') 
    plt.gca().invert_yaxis()  # Giữ nguyên lệnh sửa lỗi ngược gương
    plt.show()

# --- CHẠY CHƯƠNG TRÌNH ---
# Thay 'test.gcode' bằng file của bạn
file_name = 've_spindle_net_don.nc' 

try:
    path_segments = parse_gcode(file_name)
    if path_segments:
        plot_gcode(path_segments)
    else:
        print("Không tìm thấy tọa độ vẽ hợp lệ trong file.")
except FileNotFoundError:
    print(f"Không tìm thấy file: {file_name}. Hãy kiểm tra lại đường dẫn.")