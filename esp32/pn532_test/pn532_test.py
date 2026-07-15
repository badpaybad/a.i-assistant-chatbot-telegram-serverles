import serial
import time
import os
from hashlib import sha1
from Crypto.Cipher import DES, DES3

# --- CẤU HÌNH THÔNG TIN THẺ CCCD (Sử dụng đúng thông số ảnh của bạn) ---
PORT = "/dev/ttyACM0"  # Thay bằng cổng COM thực tế của ESP32-S3 trên máy bạn
BAUDRATE = 921600


# --- ĐIỀU CHỈNH CHUẨN ICAO CHO CCCD 12 SỐ VIỆT NAM ---
# Lấy 9 chữ số cuối của số CCCD để làm MRZ Document Number 
doc_number = SO_CCCD[-9:]  # Kết quả sẽ là: "084019679"
# =====================================================================
# 2. CÁC HÀM TIÊU CHUẨN MẬT MÃ (ICAO DOC 9303 / BAC)
# =====================================================================


def calculate_check_digit(data):
    """Tính toán Check Digit theo chuẩn ICAO Doc 9303"""
    weights = [7, 3, 1]
    total = 0
    for i, c in enumerate(data):
        val = ord(c) - ord('0') if c.isdigit() else (ord(c) -
                                                     ord('A') + 10 if c.isalpha() else 0)
        total += val * weights[i % 3]
    return str(total % 10)


def des_encrypt_block(block, key):
    """Mã hóa Single-DES cho 1 block 8 bytes (Chế độ ECB không padding)"""
    cipher = DES.new(key, DES.MODE_ECB)
    return cipher.encrypt(block)


def des_decrypt_block(block, key):
    """Giải mã Single-DES cho 1 block 8 bytes (Chế độ ECB không padding)"""
    cipher = DES.new(key, DES.MODE_ECB)
    return cipher.decrypt(block)


def calculate_retail_mac(data, k_mac):
    """
    Tính toán Retail MAC (ISO 9797-1 Algorithm 3) bằng khóa 16-byte K_MAC.
    Sử dụng đệm Padding Method 2 (0x80 ... 0x00) theo tiêu chuẩn bảo mật CCCD.
    """
    # Thực hiện Padding Method 2
    padded_data = data + b'\x80'
    while len(padded_data) % 8 != 0:
        padded_data += b'\x00'

    # Chia khóa K_MAC thành Ka và Kb (mỗi khóa 8 bytes)
    ka = k_mac[:8]
    kb = k_mac[8:16]

    # Thực hiện CBC Chaining thô với Single-DES (Khóa Ka)
    x = b'\x00' * 8
    blocks = [padded_data[i:i+8] for i in range(0, len(padded_data), 8)]

    for block in blocks:
        xor_res = bytes([a ^ b for a, b in zip(x, block)])
        x = des_encrypt_block(xor_res, ka)

    # Bước kết thúc Algorithm 3 (X9.19): Giải mã bằng Kb, sau đó mã hóa lại bằng Ka
    step2 = des_decrypt_block(x, kb)
    mac = des_encrypt_block(step2, ka)
    return mac


def encrypt_3des_cbc(data, key):
    """Mã hóa Triple-DES chế độ CBC với IV bằng 0"""
    # K_3DES 16-bytes của BAC cần được mở rộng thành 24-bytes (K1=K3)
    k_3des = key + key[:8]
    cipher = DES3.new(k_3des, DES3.MODE_CBC, iv=b'\x00'*8)
    return cipher.encrypt(data)


def adjust_parity(key_bytes):
    """Sửa lỗi Parity cho các byte khóa của DES để đảm bảo tính chẵn lẻ"""
    adjusted = bytearray()
    for b in key_bytes:
        num_ones = bin(b & 0xFE).count('1')
        if num_ones % 2 == 0:
            adjusted.append((b & 0xFE) | 0x01)
        else:
            adjusted.append(b & 0xFE)
    return bytes(adjusted)

# =====================================================================
# 3. TIẾN TRÌNH KẾT NỐI VÀ GIAO TIẾP VỚI ESP32 BRIDGE
# =====================================================================


# Tính toán chuỗi MRZ và tạo K_seed ban đầu
c_cccd = calculate_check_digit(doc_number)
c_birth = calculate_check_digit(NGAY_SINH)
c_exp = calculate_check_digit(NGAY_EXP)
mrz_info = f"{doc_number}{c_cccd}{NGAY_SINH}{c_birth}{NGAY_EXP}{c_exp}"

print(f"[*] MRZ Info tạo được: {mrz_info}")

hash_mrz = sha1(mrz_info.encode('utf-8')).digest()
k_seed = hash_mrz[:16]
print(f"[*] K_seed khởi tạo thành công: {k_seed.hex().upper()}")

# Kết nối Serial tới ESP32-S3
print(f"[*] Đang kết nối tới ESP32 trên cổng {PORT}...")
ser = serial.Serial(PORT, BAUDRATE, timeout=5)
time.sleep(2)  # Chờ nạp chip và ổn định kết nối Serial


def send_apdu_to_esp32(apdu_bytes):
    """Giao thức đóng gói gửi nhận APDU thô qua ESP32 và PN532"""
    apdu_len = len(apdu_bytes)
    # Gửi Header 2 bytes độ dài trước, sau đó gửi gói APDU thô
    len_header = bytes([(apdu_len >> 8) & 0xFF, apdu_len & 0xFF])
    ser.write(len_header + apdu_bytes)

    # Chờ và đọc 2 bytes độ dài phản hồi từ ESP32 trả về
    resp_len_bytes = ser.read(2)
    if not resp_len_bytes or len(resp_len_bytes) < 2:
        return None
    resp_len = (resp_len_bytes[0] << 8) | resp_len_bytes[1]

    # Đọc trọn vẹn số byte phản hồi thô của thẻ CCCD
    return ser.read(resp_len)


print("[*] Vui lòng đặt thẻ CCCD vào mạch quét NFC...")
while True:
    line = ser.readline().decode('utf-8', errors='ignore').strip()
    # Thêm dòng này để xem ESP32 thực tế có gửi gì lên không:
    if line:
        print(f"[Debug Serial nhận được]: {line}")
    if "CARD_DETECTED" in line:
        print("[+] Đã phát hiện thẻ CCCD! Bắt đầu thực hiện chuỗi APDU...")
        break

# Gửi các lệnh APDU tuần tự
try:
    # -------------------------------------------------------------
    # BƯỚC 1: SELECT APPLICATION (Chọn ứng dụng định danh)
    # -------------------------------------------------------------
    print("[*] [APDU SEND] -> SELECT AID...")
    select_aid = bytes([0x00, 0xA4, 0x04, 0x0C, 0x07, 0xA0,
                       0x00, 0x00, 0x02, 0x47, 0x10, 0x01])
    resp = send_apdu_to_esp32(select_aid)
    if not resp or resp[-2:] != b'\x90\x00':
        raise Exception("Không thể SELECT AID thành công. Vui lòng thử lại!")
    print("[OK] Đã chọn phân vùng ứng dụng định danh (90 00)!")

    # -------------------------------------------------------------
    # BƯỚC 2: GET CHALLENGE (Yêu cầu thẻ cấp mã thử thách ngẫu nhiên)
    # -------------------------------------------------------------
    print("[*] [APDU SEND] -> GET CHALLENGE...")
    get_challenge = bytes([0x00, 0x84, 0x00, 0x00, 0x08])
    resp = send_apdu_to_esp32(get_challenge)
    if not resp or resp[-2:] != b'\x90\x00':
        raise Exception("Thẻ từ chối cấp mã ngẫu nhiên.")

    r_icc = resp[:8]  # Lấy 8 byte mã ngẫu nhiên từ chip CCCD
    print(f"[OK] Đã nhận mã thử thách của thẻ (R_ICC): {r_icc.hex().upper()}")

    # -------------------------------------------------------------
    # BƯỚC 3: TÍNH TOÁN VÀ GỬI MUTUAL AUTHENTICATE
    # -------------------------------------------------------------
    # Tạo khóa mã hóa K_ENC và khóa xác thực K_MAC từ K_seed
    k_enc_seed = k_seed + b'\x00\x00\x00\x01'
    k_mac_seed = k_seed + b'\x00\x00\x00\x02'

    k_enc = adjust_parity(sha1(k_enc_seed).digest()[:16])
    k_mac = adjust_parity(sha1(k_mac_seed).digest()[:16])

    # Sinh chuỗi số ngẫu nhiên từ phía PC (8-byte ngẫu nhiên và 16-byte khóa chia sẻ)
    r_ifd = os.urandom(8)
    k_ifd = os.urandom(16)

    # Ghép chuỗi đầu vào: S = R_IFD + R_ICC + K_IFD (Độ dài chuẩn: 32 bytes)
    S = r_ifd + r_icc + k_ifd

    # Mã hóa chuỗi S bằng Triple-DES (CBC mode, IV = 0)
    e_ifd = encrypt_3des_cbc(S, k_enc)

    # Ký nhận bằng thuật toán Retail MAC (ISO 9797-1) để chứng minh quyền truy cập
    m_ifd = calculate_retail_mac(e_ifd, k_mac)

    # Gộp thành dữ liệu Mutual Authenticate thô (Tổng 40 bytes)
    mutual_auth_data = e_ifd + m_ifd

    # Đóng gói lệnh APDU MUTUAL AUTHENTICATE hoàn chỉnh gửi xuống thẻ
    apdu_auth = bytes([0x00, 0x82, 0x00, 0x00, len(
        mutual_auth_data)]) + mutual_auth_data + bytes([0x28])

    print("[*] [APDU SEND] -> MUTUAL AUTHENTICATE...")
    resp_auth = send_apdu_to_esp32(apdu_auth)

    if resp_auth and resp_auth[-2:] == b'\x90\x00':
        print("\n==========================================================")
        print("[SUCCESS] ĐÃ XÁC THỰC THÀNH CÔNG VỚI CHIP CCCD (MUTUAL AUTHENTICATED)!")
        print("==========================================================")
        print(
            f"-> Phản hồi thô nhận về (40 bytes): {resp_auth[:40].hex().upper()}")
        print(
            "[*] Cửa bảo mật đã mở! Hãy bắt đầu thiết lập Session Keys để đọc thông tin cá nhân.")
    else:
        print(
            "\n[FAIL] Xác thực thất bại! Hãy chắc chắn thẻ nằm im trên đầu đọc PN532.")
        if resp_auth:
            print(f"Mã phản hồi lỗi từ thẻ: {resp_auth[-2:].hex().upper()}")

except Exception as e:
    print(f"[ERROR] Đã xảy ra lỗi trong quá trình thực thi: {str(e)}")

finally:
    ser.close()
    print("[*] Đã đóng an toàn cổng kết nối Serial.")
