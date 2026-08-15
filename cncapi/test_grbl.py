import serial
import time
import sys

PORT = '/dev/ttyACM0'
BAUD = 115200

def read_until(ser, timeout=3.0):
    start = time.time()
    lines = []
    while time.time() - start < timeout:
        if ser.in_waiting:
            line = ser.readline().decode('utf-8', errors='ignore').strip()
            if line:
                print(f"[RECV] {line}")
                lines.append(line)
                if line == 'ok' or line.startswith('error:') or line.startswith('ALARM:'):
                    time.sleep(0.1)
                    if not ser.in_waiting:
                        break
        else:
            time.sleep(0.05)
    return lines

def send_cmd(ser, cmd, timeout=3.0):
    print(f"\n---> [SEND] {cmd}")
    ser.write((cmd + '\r\n').encode('utf-8'))
    ser.flush()
    return read_until(ser, timeout=timeout)

def main():
    print(f"Connecting to {PORT} at {BAUD} baud...")
    try:
        ser = serial.Serial(PORT, BAUD, timeout=1)
    except Exception as e:
        print(f"Error opening port: {e}")
        sys.exit(1)

    ser.dtr = False
    time.sleep(0.2)
    ser.dtr = True
    time.sleep(1.5)

    print("\n--- Reading Startup Messages ---")
    read_until(ser, timeout=3.0)

    print("\n--- Enabling Homing ($22=1) ---")
    send_cmd(ser, "$22=1")

    print("\n--- Checking $22 Setting ---")
    send_cmd(ser, "$22")

    print("\n--- Unlocking Alarm ($X) ---")
    send_cmd(ser, "$X")

    print("\n--- Testing Single Axis Homing X ($HX) ---")
    send_cmd(ser, "$HX", timeout=2.0)

    # Abort homing move with Ctrl-X (\x18) if stepper is moving without limit switches
    print("\n--- Resetting GRBL (Ctrl-X) ---")
    ser.write(b'\x18')
    time.sleep(0.5)
    read_until(ser, timeout=2.0)

    ser.close()
    print("\nTest completed.")

if __name__ == '__main__':
    main()
