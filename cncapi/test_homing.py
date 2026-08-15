import serial
import time
import sys

PORT = '/dev/ttyACM0'
BAUD = 115200

def read_output(ser, duration=2.0):
    start = time.time()
    lines = []
    while time.time() - start < duration:
        if ser.in_waiting:
            line = ser.readline().decode('utf-8', errors='ignore').strip()
            if line:
                print(f"  [RECV] {line}")
                lines.append(line)
        else:
            time.sleep(0.05)
    return lines

def send_cmd(ser, cmd, listen_time=1.5):
    print(f"\n---> [SEND] {cmd}")
    ser.write((cmd + '\r\n').encode('utf-8'))
    ser.flush()
    return read_output(ser, duration=listen_time)

def reset_alarm(ser):
    print("\n---> [SEND] Ctrl-X (Soft Reset)")
    ser.write(b'\x18')
    ser.flush()
    read_output(ser, duration=1.0)
    send_cmd(ser, "$X", listen_time=1.0)

def main():
    print(f"=== GRBL Homing Test on {PORT} ({BAUD} baud) ===")
    try:
        ser = serial.Serial(PORT, BAUD, timeout=1)
    except Exception as e:
        print(f"Failed to open port {PORT}: {e}")
        sys.exit(1)

    # Reset board via DTR
    ser.dtr = False
    time.sleep(0.2)
    ser.dtr = True
    time.sleep(1.5)

    print("\n1. Initial Startup Messages:")
    read_output(ser, duration=2.0)

    print("\n2. Resetting EEPROM ($RST=$):")
    send_cmd(ser, "$RST=$", listen_time=2.0)

    print("\n3. Configuring $22=1 (Homing Enable) & $23=1 (Homing Dir Mask):")
    send_cmd(ser, "$22=1")
    send_cmd(ser, "$23=1")

    print("\n4. Verifying Settings $22 & $23:")
    send_cmd(ser, "$22")
    send_cmd(ser, "$23")

    print("\n5. Unlocking Alarm ($X):")
    send_cmd(ser, "$X")

    print("\n6. Testing Single Axis Homing X ($HX):")
    send_cmd(ser, "$HX", listen_time=3.0)
    reset_alarm(ser)

    print("\n7. Testing Single Axis Homing Y ($HY):")
    send_cmd(ser, "$HY", listen_time=3.0)
    reset_alarm(ser)

    print("\n8. Testing Full Homing X & Y ($H):")
    send_cmd(ser, "$H", listen_time=3.0)
    reset_alarm(ser)

    ser.close()
    print("\n=== Homing Test Completed ===")

if __name__ == '__main__':
    main()
