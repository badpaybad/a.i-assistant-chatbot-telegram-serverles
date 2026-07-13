import subprocess
import os

def convert_object_to_path(input_svg, output_svg):
    # Đường dẫn tới file chạy của Inkscape (Thay đổi tùy theo HĐH của bạn)
    # Windows thường là: "C:\\Program Files\\Inkscape\\bin\\inkscape.exe"
    # Ubuntu/Mac thường chỉ cần: "inkscape"
    inkscape_path = "inkscape" 
    
    # Lệnh gọi Inkscape thực hiện hành động Object to Path
    command = [
        inkscape_path,
        input_svg,
        "--export-filename=" + output_svg,
        "--actions=select-all;object-to-path"
    ]
    
    try:
        subprocess.run(command, check=True)
        print(f"Chuyển đổi thành công! File lưu tại: {output_svg}")
    except FileNotFoundError:
        print("Không tìm thấy Inkscape. Hãy kiểm tra lại đường dẫn inkscape_path.")
    except subprocess.CalledProcessError as e:
        print(f"Lỗi khi xử lý file: {e}")

# Sử dụng thử
convert_object_to_path("/work/a.i-assistant-chatbot-telegram-serverles/cnc/drawtext/nguyenphandu.png", "ink_chu_da_chuyen_path.svg")