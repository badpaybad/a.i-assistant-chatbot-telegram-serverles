import serial
import time
import os

def send_gcode_to_grbl(port_name, gcode_file_path, baud_rate=115200):
    """
    Truyền file G-code xuống máy CNC GRBL qua kết nối Serial.
    """
    if not os.path.exists(gcode_file_path):
        raise FileNotFoundError(f"Không tìm thấy file G-code tại: {gcode_file_path}")

    print(f"Kiểm tra cổng kết nối: {port_name}...")
    
    try:
        # 1. Khởi tạo kết nối Serial với GRBL
        # GRBL mặc định chạy ở Baudrate 115200
        s = serial.Serial(port_name, baud_rate, timeout=1)
        
        # Kích hoạt mạch GRBL (Mạch thường reset khi vừa mở cổng kết nối)
        s.write(b"\r\n\r\n")
        time.sleep(2) # Đợi 2 giây để GRBL khởi động xong
        s.flushInput() # Xóa sạch dữ liệu rác trong bộ đệm nhận
        
        print("Đã kết nối thành công với GRBL!")
        print("Đang mở file G-code và bắt đầu truyền...")

        # 2. Đọc và lọc file G-code
        with open(gcode_file_path, 'r') as f:
            lines = f.readlines()

        total_lines = len(lines)
        current_line = 0

        # 3. Vòng lặp gửi từng dòng lệnh
        for line in lines:
            current_line += 1
            # Làm sạch dòng lệnh (Xóa khoảng trắng thừa, ký tự xuống dòng)
            cleaned_line = line.strip()
            
            # Bỏ qua các dòng trống hoặc dòng chú thích (bắt đầu bằng dấu ;)
            if not cleaned_line or cleaned_line.startswith(';'):
                continue

            print(f"[{current_line}/{total_lines}] Đang gửi: {cleaned_line}")
            
            # Gửi dòng lệnh xuống GRBL (Phải kèm theo ký tự xuống dòng \n)
            s.write((cleaned_line + '\n').encode('utf-8')) 
            
            # Đợi phản hồi từ GRBL cho đến khi nhận được chữ 'ok' hoặc 'error'
            while True:
                grbl_out = s.readline().decode('utf-8').strip()
                if grbl_out:
                    print(f"   -> GRBL phản hồi: {grbl_out}")
                    if 'ok' in grbl_out.lower():
                        break # Nhận được lệnh OK, thoát vòng lặp để gửi dòng tiếp theo
                    elif 'error' in grbl_out.lower():
                        print(f"⚠️ CẢNH BÁO: GRBL báo lỗi tại dòng: {cleaned_line}")
                        # Tùy chọn: Bạn có thể chọn dừng chương trình tại đây nếu muốn an toàn
                        break

        # 4. Dọn dẹp sau khi chạy xong
        print("\n🎉 Đã truyền toàn bộ file G-code thành công!")
        
        # Đợi một chút để máy thực hiện nốt các lệnh cuối cùng trước khi đóng cổng
        time.sleep(1)
        s.close()
        print("Đã ngắt kết nối an toàn với máy CNC.")

    except serial.SerialException as e:
        print(f"❌ Lỗi kết nối Serial: {e}")
        print("Mẹo: Kiểm tra xem cổng đã đúng chưa và bạn đã cấp quyền truy cập cổng chưa (sudo chmod 666 /dev/...)")
    except Exception as e:
        print(f"Đã xảy ra lỗi: {e}")

# --- CHẠY CHƯƠNG TRÌNH ---
if __name__ == "__main__":
    # Thay đổi đường dẫn cổng của bạn tại đây (ví dụ: '/dev/ttyAMA0', '/dev/ttyUSB0', '/dev/ttyACM0')
    SERIAL_PORT = '/dev/ttyAMA0' 
    GCODE_FILE = 'cnc_output.nc'
    
    send_gcode_to_grbl(SERIAL_PORT, GCODE_FILE)