#!/usr/bin/env python3
"""
Test nhấc / hạ Servo với dải xung thực tế:
- NHẤC: S0 (hoặc S50)
- HẠ: S200 (hoặc S255)
"""
import serial
import time

ser = serial.Serial('/dev/ttyACM0', 115200, timeout=1.0)
time.sleep(2.0)

def send(cmd):
    print(f"GỬI LỆNH: {cmd}")
    ser.write((cmd + "\n").encode("utf-8"))
    time.sleep(0.3)
    while ser.in_waiting:
        line = ser.readline().decode("utf-8", errors="ignore").strip()
        if line:
            print(f"  <-- {line}")

print("\n--- 1. Mở Khóa GRBL ($X) ---")
ser.write(b"\r\n\r\n")
time.sleep(1.0)
send("$X")
send("$30=255")
send("$32=0")

print("\n=== 2. BẮT ĐẦU TEST NHẤC (S0) <-> HẠ (S220) 4 LẦN ===")
for i in range(1, 5):
    print(f"\n--- LẦN {i} ---")
    print("👉 1. HẠ BÚT (M3 S220) - Giữ 2.0s...")
    send("M3 S220")
    time.sleep(2.0)

    print("👉 2. NHẤC BÚT (M3 S0) - Giữ 2.0s...")
    send("M3 S0")
    time.sleep(2.0)

send("M5")
ser.close()
print("\n=== HOÀN TẤT CHU TRÌNH TEST! ===")
