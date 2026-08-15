#!/usr/bin/env python3
"""
Script test trực tiếp cổng Serial /dev/ttyACM0 để điều khiển Servo RC (SG90 / MG90S).
Sử dụng thư viện pyserial kết nối trực tiếp với mạch Arduino Uno.
"""

import sys
import time
import serial

PORT = "/dev/ttyACM0"
BAUDRATE = 115200

def read_responses(ser, timeout=0.5):
    time.sleep(timeout)
    lines = []
    while ser.in_waiting:
        line = ser.readline().decode("utf-8", errors="ignore").strip()
        if line:
            lines.append(line)
            print(f"  [GRBL] <-- {line}")
    return lines

def send_cmd(ser, cmd):
    print(f"\n[GỬI] --> {cmd}")
    ser.write((cmd + "\n").encode("utf-8"))
    return read_responses(ser, timeout=0.3)

def main():
    print(f"==================================================")
    print(f"  TEST ĐIỀU KHIỂN SERVO TRỰC TIẾP QUA {PORT}")
    print(f"==================================================")

    try:
        ser = serial.Serial(PORT, BAUDRATE, timeout=1.0)
        time.sleep(2.0)  # Chờ Arduino Uno khởi động lại sau DTR reset
    except Exception as e:
        print(f"❌ LỖI: Không thể mở cổng {PORT}: {e}")
        print("👉 Vui lòng kiểm tra lại cáp USB hoặc tắt các tiến trình đang chiếm cổng!")
        sys.exit(1)

    # 1. Đánh thức GRBL & Mở khóa
    print("\n--- 1. Khởi tạo & Mở khóa GRBL ---")
    ser.write(b"\r\n\r\n")
    read_responses(ser, timeout=1.0)
    send_cmd(ser, "$X")
    send_cmd(ser, "$30=255")  # Đặt Max Spindle = 255
    send_cmd(ser, "$32=0")    # Tắt Laser mode

    # 2. Test các góc gạt Servo cơ bản
    print("\n==================================================")
    print("--- 2. BẮT ĐẦU TEST CHU KỲ NHẤC / HẠ SERVO ---")
    print("==================================================")

    test_sequence = [
        ("M3 S10", "NHẤC BÚT (Góc 0 độ / Nhấc cao)", 1.5),
        ("M3 S25", "HẠ BÚT MỨC 1 (Góc ~45 độ / Chạm nhẹ)", 1.5),
        ("M3 S10", "NHẤC BÚT (Góc 0 độ)", 1.5),
        ("M3 S35", "HẠ BÚT MỨC 2 (Góc ~90 độ / Chạm chắc)", 1.5),
        ("M3 S10", "NHẤC BÚT (Góc 0 độ)", 1.5),
        ("M3 S45", "HẠ BÚT MỨC 3 (Góc ~135 độ / Hạ sâu)", 1.5),
        ("M3 S10", "NHẤC BÚT (Góc 0 độ)", 1.5),
    ]

    for cmd, desc, delay in test_sequence:
        print(f"\n👉 {desc}")
        send_cmd(ser, cmd)
        time.sleep(delay)

    # 3. Test quét liên tục từ 10 đến 45 (Mỗi nấc 0.4s)
    print("\n==================================================")
    print("--- 3. TEST QUÉT MỊN TỪ 10 ĐẾN 45 ---")
    print("==================================================")
    for s in [10, 15, 20, 25, 30, 35, 40, 45, 40, 35, 30, 25, 20, 15, 10]:
        print(f"Quét S = {s}...")
        send_cmd(ser, f"M3 S{s}")
        time.sleep(0.4)

    # 4. Tắt xung M5
    print("\n--- 4. Kết thúc: Tắt xung M5 ---")
    send_cmd(ser, "M5")

    ser.close()
    print("\n✅ Đã hoàn tất chương trình test Serial!")
    print("==================================================")

if __name__ == "__main__":
    main()
