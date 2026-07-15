import serial
import time
import os
from hashlib import sha1
from Crypto.Cipher import DES, DES3
from PIL import Image
import io

import pn532_config

# =====================================================================
# 1. CẤU HÌNH THÔNG TIN THÈ CCCD
# =====================================================================
PORT = "/dev/ttyACM0"      # Đổi thành "COMx" nếu dùng Windows (ví dụ: "COM3")
BAUDRATE = 921600

SO_CCCD = pn532_config.SO_CCCD   # Thay bằng số CCCD thực tế
NGAY_SINH = pn532_config.NGAY_SINH       # Định dạng YYMMDD
NGAY_EXP = pn532_config.NGAY_EXP        # Định dạng YYMMDD
doc_number = SO_CCCD[-9:]

# =====================================================================
# 2. CÁC HÀM MẬT MÃ VÀ SECURE MESSAGING (SM)
# =====================================================================

def calculate_check_digit(data):
    weights = [7, 3, 1]
    total = 0
    for i, c in enumerate(data):
        val = ord(c) - ord('0') if c.isdigit() else (ord(c) - ord('A') + 10 if c.isalpha() else 0)
        total += val * weights[i % 3]
    return str(total % 10)

def des_encrypt_block(block, key):
    cipher = DES.new(key, DES.MODE_ECB)
    return cipher.encrypt(block)

def des_decrypt_block(block, key):
    cipher = DES.new(key, DES.MODE_ECB)
    return cipher.decrypt(block)

def calculate_retail_mac(data, k_mac):
    padded_data = data + b'\x80'
    while len(padded_data) % 8 != 0:
        padded_data += b'\x00'
    ka, kb = k_mac[:8], k_mac[8:16]
    x = b'\x00' * 8
    blocks = [padded_data[i:i+8] for i in range(0, len(padded_data), 8)]
    for block in blocks:
        xor_res = bytes([a ^ b for a, b in zip(x, block)])
        x = des_encrypt_block(xor_res, ka)
    step2 = des_decrypt_block(x, kb)
    return des_encrypt_block(step2, ka)

def encrypt_3des_cbc(data, key, iv=b'\x00'*8):
    k_3des = key + key[:8]
    cipher = DES3.new(k_3des, DES3.MODE_CBC, iv=iv)
    return cipher.encrypt(data)

def decrypt_3des_cbc(data, key, iv=b'\x00'*8):
    k_3des = key + key[:8]
    cipher = DES3.new(k_3des, DES3.MODE_CBC, iv=iv)
    return cipher.decrypt(data)

def adjust_parity(key_bytes):
    adjusted = bytearray()
    for b in key_bytes:
        num_ones = bin(b & 0xFE).count('1')
        adjusted.append((b & 0xFE) | 0x01 if num_ones % 2 == 0 else b & 0xFE)
    return bytes(adjusted)

def parse_asn1_length(data):
    if len(data) < 2:
        return 0, 0
    ptr = 1 
    limit_byte = data[ptr]
    if limit_byte < 0x80:
        return ptr + 1, limit_byte
    else:
        num_bytes = limit_byte & 0x7F
        ptr += 1
        val = 0
        for _ in range(num_bytes):
            if ptr < len(data):
                val = (val << 8) | data[ptr]
                ptr += 1
        return ptr, val

class SecureMessaging:
    def __init__(self, ks_enc, ks_mac, ssc):
        self.ks_enc = ks_enc
        self.ks_mac = ks_mac
        self.ssc = ssc

    def increment_ssc(self):
        val = int.from_bytes(self.ssc, byteorder='big') + 1
        self.ssc = val.to_bytes(8, byteorder='big')

    def protect(self, apdu):
        self.increment_ssc()
        cla, ins, p1, p2 = apdu[0], apdu[1], apdu[2], apdu[3]

        do_db = False
        le_val = None
        data = b''

        if len(apdu) == 5:
            le_val = apdu[4]
        elif len(apdu) > 5:
            lc = apdu[4]
            data = apdu[5:5+lc]
            do_db = True
            if len(apdu) > 5 + lc:
                le_val = apdu[5+lc]

        db_field = b''
        if do_db:
            padded_data = data + b'\x80'
            while len(padded_data) % 8 != 0:
                padded_data += b'\x00'

            # [SỬA LỖI QUAN TRỌNG]: IV trong BAC luôn là 8 byte 0, không dùng SSC
            iv = b'\x00' * 8
            encrypted_data = encrypt_3des_cbc(padded_data, self.ks_enc, iv=iv)

            data_len = len(encrypted_data) + 1
            if data_len < 128:
                db_field = b'\x87' + bytes([data_len, 0x01]) + encrypted_data
            else:
                db_field = b'\x87\x81' + bytes([data_len, 0x01]) + encrypted_data

        do97_field = b''
        if le_val is not None:
            do97_field = b'\x97\x01' + bytes([le_val])

        protected_header = bytes([cla | 0x0C, ins, p1, p2])
        padded_header = protected_header + b'\x80'
        while len(padded_header) % 8 != 0:
            padded_header += b'\x00'

        mac_input = self.ssc + padded_header + db_field + do97_field
        mac_val = calculate_retail_mac(mac_input, self.ks_mac)
        mac_field = b'\x8E\x08' + mac_val

        payload = db_field + do97_field + mac_field
        
        if le_val is not None:
            return protected_header + bytes([len(payload)]) + payload + b'\x00'
        else:
            return protected_header + bytes([len(payload)]) + payload

    def unprotect(self, resp_bytes):
        if len(resp_bytes) < 4:
            return resp_bytes

        if resp_bytes[0] not in [0x87, 0x99]:
            return resp_bytes

        self.increment_ssc()

        idx = 0
        decrypted_data = b''
        sw1_sw2 = b'\x90\x00'

        if resp_bytes[idx] == 0x87:
            idx += 1
            len_byte = resp_bytes[idx]
            idx += 1
            if len_byte & 0x80:
                num_len = len_byte & 0x7F
                data_len = 0
                for _ in range(num_len):
                    data_len = (data_len << 8) + resp_bytes[idx]
                    idx += 1
            else:
                data_len = len_byte
                
            encrypted_payload = resp_bytes[idx+1 : idx+data_len]
            idx += data_len

            # [SỬA LỖI QUAN TRỌNG]: Giải mã DO '87' cũng bắt buộc dùng IV = 0
            iv = b'\x00' * 8
            decrypted_padded = decrypt_3des_cbc(encrypted_payload, self.ks_enc, iv=iv)

            pad_idx = len(decrypted_padded) - 1
            while pad_idx >= 0 and decrypted_padded[pad_idx] == 0x00:
                pad_idx -= 1
            if pad_idx >= 0 and decrypted_padded[pad_idx] == 0x80:
                decrypted_data = decrypted_padded[:pad_idx]
            else:
                decrypted_data = decrypted_padded

        if idx < len(resp_bytes) and resp_bytes[idx] == 0x99:
            idx += 1
            do99_len = resp_bytes[idx]
            idx += 1
            sw1_sw2 = resp_bytes[idx : idx+do99_len]
            
        return decrypted_data + sw1_sw2

# =====================================================================
# 3. TIẾN TRÌNH KẾT NỐI VÀ ĐỌC DỮ LIỆU
# =====================================================================

c_cccd = calculate_check_digit(doc_number)
c_birth = calculate_check_digit(NGAY_SINH)
c_exp = calculate_check_digit(NGAY_EXP)
mrz_info = f"{doc_number}{c_cccd}{NGAY_SINH}{c_birth}{NGAY_EXP}{c_exp}"

hash_mrz = sha1(mrz_info.encode('utf-8')).digest()
k_seed = hash_mrz[:16]

k_enc_seed = k_seed + b'\x00\x00\x00\x01'
k_mac_seed = k_seed + b'\x00\x00\x00\x02'
k_enc = adjust_parity(sha1(k_enc_seed).digest()[:16])
k_mac = adjust_parity(sha1(k_mac_seed).digest()[:16])

ser = serial.Serial(PORT, BAUDRATE, timeout=5)
time.sleep(2)
ser.reset_input_buffer()

def send_apdu_to_esp32(apdu_bytes):
    apdu_len = len(apdu_bytes)
    len_header = bytes([(apdu_len >> 8) & 0xFF, apdu_len & 0xFF])
    ser.write(len_header + apdu_bytes)
    resp_len_bytes = ser.read(2)
    if not resp_len_bytes or len(resp_len_bytes) < 2:
        return None
    resp_len = (resp_len_bytes[0] << 8) | resp_len_bytes[1]
    return ser.read(resp_len)

print("[*] Vui lòng đặt thẻ CCCD vào mạch quét NFC...")

while True:
    if ser.in_waiting > 0:
        rx_byte = ser.read(1)
        if rx_byte == b'\xDE':
            ser.write(b'\xAC')
            print("[+] Đang dọn dẹp luồng truyền nhận...")
            break
    time.sleep(0.01)

ready_buffer = b''
while True:
    if ser.in_waiting > 0:
        ready_buffer += ser.read(ser.in_waiting)
        if b'\xDE\xAD\xBE\xEF' in ready_buffer:
            print("[+] Luồng truyền nhị phân SẠCH hoàn toàn! Khởi động tiến trình APDU...")
            break
    time.sleep(0.01)

ser.reset_input_buffer()

try:
    # 1. SELECT AID
    select_aid = bytes([0x00, 0xA4, 0x04, 0x0C, 0x07, 0xA0, 0x00, 0x00, 0x02, 0x47, 0x10, 0x01])
    send_apdu_to_esp32(select_aid)

    # 2. GET CHALLENGE
    get_challenge = bytes([0x00, 0x84, 0x00, 0x00, 0x08])
    resp_challenge = send_apdu_to_esp32(get_challenge)
    r_icc = resp_challenge[:8]

    # 3. Sinh dữ liệu Mutual Authenticate phía PC
    r_ifd = os.urandom(8)
    k_ifd = os.urandom(16)
    S = r_ifd + r_icc + k_ifd
    e_ifd = encrypt_3des_cbc(S, k_enc, iv=b'\x00'*8)
    m_ifd = calculate_retail_mac(e_ifd, k_mac)
    mutual_auth_data = e_ifd + m_ifd

    # Gửi MUTUAL AUTHENTICATE
    apdu_auth = bytes([0x00, 0x82, 0x00, 0x00, len(mutual_auth_data)]) + mutual_auth_data + bytes([0x28])
    resp_auth = send_apdu_to_esp32(apdu_auth)

    if resp_auth and resp_auth[-2:] == b'\x90\x00':
        print("[SUCCESS] BẮT TAY THÀNH CÔNG VỚI CHIP CCCD!")

        # Khởi tạo khóa phiên SM
        decrypted_response = decrypt_3des_cbc(resp_auth[:32], k_enc, iv=b'\x00'*8)
        k_icc = decrypted_response[16:32]

        k_seed_session = bytes([a ^ b for a, b in zip(k_ifd, k_icc)])

        ks_enc_seed = k_seed_session + b'\x00\x00\x00\x01'
        ks_mac_seed = k_seed_session + b'\x00\x00\x00\x02'

        ks_enc = adjust_parity(sha1(ks_enc_seed).digest()[:16])
        ks_mac = adjust_parity(sha1(ks_mac_seed).digest()[:16])

        ssc = r_icc[4:8] + r_ifd[4:8]
        sm = SecureMessaging(ks_enc, ks_mac, ssc)
        print("[*] Đã khởi tạo thành công kênh Secure Messaging mã hóa 3DES!")

        # =============================================================
        # BƯỚC 5: ĐỌC TỆP TIN THÔNG TIN CÁ NHÂN (DG1)
        # =============================================================
        print("\n[*] Đang đọc file DG1 (Thông tin cá nhân)...")
        
        apdu_select_dg1 = bytes([0x00, 0xA4, 0x02, 0x0C, 0x02, 0x01, 0x01])
        resp_select_dg1 = send_apdu_to_esp32(sm.protect(apdu_select_dg1)) 
        
        if not resp_select_dg1:
            raise Exception("Lỗi kết nối vật lý khi SELECT DG1")
            
        unprotected_select_dg1 = sm.unprotect(resp_select_dg1)
        if unprotected_select_dg1[-2:] != b'\x90\x00':
            raise Exception("Chip từ chối lệnh SELECT DG1")

        apdu_read_header = bytes([0x00, 0xB0, 0x00, 0x00, 0x04])
        resp_header_protected = send_apdu_to_esp32(sm.protect(apdu_read_header))
        
        if not resp_header_protected:
            raise Exception("Mất kết nối khi gọi lệnh đọc DG1 Header")
            
        unprotected_header = sm.unprotect(resp_header_protected)
        if unprotected_header[-2:] != b'\x90\x00':
            raise Exception(f"Chip phản hồi lỗi khi đọc Header: {unprotected_header[-2:].hex()}")

        header_bytes = unprotected_header[:-2]
        header_len, body_len = parse_asn1_length(header_bytes)
        total_dg1_size = header_len + body_len
        print(f"[+] Kích thước DG1 thực tế: {total_dg1_size} bytes")

        # 5.2. Đọc toàn bộ file DG1 dựa theo kích thước chuẩn xác
        dg1_full_data = bytearray()
        offset = 0
        chunk_size = 0x18  # <--- ĐỔI TỪ 0x60 THÀNH 0x18 (24 bytes)

        while offset < total_dg1_size:
            current_chunk = min(chunk_size, total_dg1_size - offset)
            offset_high = (offset >> 8) & 0xFF
            offset_low = offset & 0xFF
            
            apdu_read_dg1 = bytes([0x00, 0xB0, offset_high, offset_low, current_chunk])
            resp_read_protected = send_apdu_to_esp32(sm.protect(apdu_read_dg1))

            if not resp_read_protected:
                print(f"[-] Lỗi phần cứng tại offset: {offset}")
                break

            unprotected_read = sm.unprotect(resp_read_protected)
            if unprotected_read[-2:] != b'\x90\x00':
                print(f"[-] Chip từ chối đọc offset {offset}: {unprotected_read[-2:].hex()}")
                break

            chunk_data = unprotected_read[:-2]
            dg1_full_data.extend(chunk_data)
            offset += len(chunk_data)

        mrz_tag_idx = dg1_full_data.find(b'\x5F\x1F')
        if mrz_tag_idx != -1:
            mrz_data = dg1_full_data[mrz_tag_idx + 3:]
            try:
                mrz_text = mrz_data.decode('utf-8', errors='ignore')
                print("\n============ THÔNG TIN MRZ ĐỌC TỪ CHIP CCCD ============")
                print(mrz_text.strip())
                print("=========================================================")
            except Exception as e:
                print(f"[-] Không thể hiển thị MRZ dạng text: {e}")
        else:
            clean_text = "".join([chr(b) for b in dg1_full_data if 32 <= b <= 126])
            print(f"[+] Dữ liệu thô DG1: {clean_text}")

        # =============================================================
        # BƯỚC 6: ĐỌC TỆP TIN ẢNH CHÂN DUNG (DG2)
        # =============================================================
        print("\n[*] Đang đọc file DG2 (Ảnh chân dung)...")
        
        apdu_select_dg2 = bytes([0x00, 0xA4, 0x02, 0x0C, 0x02, 0x01, 0x02])
        resp_select_dg2 = send_apdu_to_esp32(sm.protect(apdu_select_dg2))

        if not resp_select_dg2:
            raise Exception("Lỗi kết nối vật lý khi SELECT DG2")

        unprotected_select_dg2 = sm.unprotect(resp_select_dg2)
        if unprotected_select_dg2[-2:] != b'\x90\x00':
            raise Exception("Chip từ chối lệnh SELECT DG2")

        apdu_read_dg2_header = bytes([0x00, 0xB0, 0x00, 0x00, 0x05])
        resp_dg2_hdr_protected = send_apdu_to_esp32(sm.protect(apdu_read_dg2_header))
        
        if not resp_dg2_hdr_protected:
            raise Exception("Lỗi kết nối khi đọc Header DG2")

        unprotected_dg2_hdr = sm.unprotect(resp_dg2_hdr_protected)
        if unprotected_dg2_hdr[-2:] != b'\x90\x00':
            raise Exception(f"Lỗi đọc Header DG2: {unprotected_dg2_hdr[-2:].hex()}")

        dg2_header_bytes = unprotected_dg2_hdr[:-2]
        dg2_header_len, dg2_body_len = parse_asn1_length(dg2_header_bytes)
        total_dg2_size = dg2_header_len + dg2_body_len
        print(f"[+] Kích thước ảnh DG2 thực tế: {total_dg2_size} bytes")

        # 6.2. Tiến hành đọc vòng lặp với kích thước chuẩn
        dg2_full_data = bytearray()
        offset = 0
        chunk_size = 0x18  # <--- ĐỔI TỪ 0x60 THÀNH 0x18 (24 bytes)

        print("[*] Đang tải ảnh chân dung từ chip thẻ (quá trình này mất khoảng 8-15 giây)...")
        while offset < total_dg2_size:
            current_chunk = min(chunk_size, total_dg2_size - offset)
            offset_high = (offset >> 8) & 0xFF
            offset_low = offset & 0xFF
            
            apdu_read_dg2 = bytes([0x00, 0xB0, offset_high, offset_low, current_chunk])
            resp_read_dg2 = send_apdu_to_esp32(sm.protect(apdu_read_dg2))

            if not resp_read_dg2:
                print(f"\n[-] Lỗi phần cứng đọc DG2 tại offset: {offset}")
                break

            unprotected_read_dg2 = sm.unprotect(resp_read_dg2)
            if unprotected_read_dg2[-2:] != b'\x90\x00':
                print(f"\n[-] Chip từ chối offset {offset} DG2: {unprotected_read_dg2[-2:].hex()}")
                break

            chunk_data = unprotected_read_dg2[:-2]
            dg2_full_data.extend(chunk_data)
            offset += len(chunk_data)
            print(f"-> Đã tải: {offset}/{total_dg2_size} bytes ({(offset/total_dg2_size)*100:.1f}%)", end='\r')

        print(f"\n[+] Đã tải xong ảnh chân dung thô. Tổng dung lượng nhận được: {len(dg2_full_data)} bytes")

        jp2_header = b'\x00\x00\x00\x0C\x6A\x50\x20\x20\x0D\x0A\x87\x0A'
        img_index = dg2_full_data.find(jp2_header)

        if img_index == -1:
            img_index = dg2_full_data.find(b'\xFF\xD8\xFF')

        if img_index != -1:
            raw_image_bytes = dg2_full_data[img_index:]
            with open("cccd_face.jp2", "wb") as f:
                f.write(raw_image_bytes)
            print("[+] Đã lưu thành công ảnh chân dung gốc: 'cccd_face.jp2'")

            try:
                img = Image.open(io.BytesIO(raw_image_bytes))
                img.save("cccd_face_converted.jpg", "JPEG")
                print("[+] Đã chuyển đổi thành công ảnh sang định dạng: 'cccd_face_converted.jpg'")
            except Exception as e:
                print(f"[-] Không thể tự động chuyển đổi sang JPG: {e}")
        else:
            print("[-] Không tìm thấy Marker/Signature của ảnh trong tệp tin DG2 nhận được.")
        
        # =============================================================
        # BƯỚC 7: ĐỌC TỆP TIN NHÂN KHẨU HỌC CHI TIẾT (DG13)
        # =============================================================
        print("\n[*] Đang đọc file DG13 (Thông tin cá nhân chi tiết)...")
        
        # Gửi SELECT DG13 (0x01 0x0D) bọc SM
        apdu_select_dg13 = bytes([0x00, 0xA4, 0x02, 0x0C, 0x02, 0x01, 0x0D])
        resp_select_dg13 = send_apdu_to_esp32(sm.protect(apdu_select_dg13))

        if not resp_select_dg13:
            raise Exception("Lỗi kết nối vật lý khi SELECT DG13")

        unprotected_select_dg13 = sm.unprotect(resp_select_dg13)
        if unprotected_select_dg13[-2:] != b'\x90\x00':
            raise Exception("Chip từ chối lệnh SELECT DG13")

        # Đọc Header của DG13 (đọc 5 byte đầu để lấy độ dài)
        apdu_read_dg13_header = bytes([0x00, 0xB0, 0x00, 0x00, 0x05])
        resp_dg13_hdr_protected = send_apdu_to_esp32(sm.protect(apdu_read_dg13_header))
        
        if not resp_dg13_hdr_protected:
            raise Exception("Lỗi kết nối khi đọc Header DG13")

        unprotected_dg13_hdr = sm.unprotect(resp_dg13_hdr_protected)
        if unprotected_dg13_hdr[-2:] != b'\x90\x00':
            raise Exception(f"Lỗi đọc Header DG13: {unprotected_dg13_hdr[-2:].hex()}")

        dg13_header_bytes = unprotected_dg13_hdr[:-2]
        dg13_header_len, dg13_body_len = parse_asn1_length(dg13_header_bytes)
        total_dg13_size = dg13_header_len + dg13_body_len
        print(f"[+] Kích thước tệp DG13 thực tế: {total_dg13_size} bytes")

        # Tiến hành đọc vòng lặp với chunk_size = 24 bytes (0x18)
        dg13_full_data = bytearray()
        offset = 0
        chunk_size = 0x18  # Bắt buộc là 24 bytes cho PN532

        while offset < total_dg13_size:
            current_chunk = min(chunk_size, total_dg13_size - offset)
            offset_high = (offset >> 8) & 0xFF
            offset_low = offset & 0xFF
            
            apdu_read_dg13 = bytes([0x00, 0xB0, offset_high, offset_low, current_chunk])
            resp_read_dg13 = send_apdu_to_esp32(sm.protect(apdu_read_dg13))

            if not resp_read_dg13:
                print(f"\n[-] Lỗi phần cứng đọc DG13 tại offset: {offset}")
                break

            unprotected_read_dg13 = sm.unprotect(resp_read_dg13)
            if unprotected_read_dg13[-2:] != b'\x90\x00':
                print(f"\n[-] Chip từ chối offset {offset} DG13")
                break

            chunk_data = unprotected_read_dg13[:-2]
            dg13_full_data.extend(chunk_data)
            offset += len(chunk_data)

        print(f"\n[+] Đã tải xong thông tin DG13 ({len(dg13_full_data)} bytes).")

        # -------------------------------------------------------------
        # TRÍCH XUẤT NHANH TEXT TIẾNG VIỆT TỪ DỮ LIỆU THÔ DG13
        # DG13 được mã hóa theo cấu trúc ASN.1 TLV (Tag-Length-Value). 
        # Để lấy nhanh dữ liệu, ta sẽ quét các chuỗi UTF-8 hợp lệ.
        # -------------------------------------------------------------
        print("\n============ THÔNG TIN CHI TIẾT TỪ DG13 ============")
        import re
        
        # Tìm các chuỗi byte có độ dài từ 3 trở lên, ký tự UTF-8 (tiếng Việt)
        # Bỏ qua các byte điều khiển và tag hệ thống
        pattern = re.compile(b'[\x20-\x7E\xC2-\xF4][\x80-\xBF]*')
        
        # -------------------------------------------------------------
        # TRÍCH XUẤT CHÍNH XÁC VĂN BẢN TỪ ASN.1 BER-TLV (DG13)
        # -------------------------------------------------------------
        print("\n============ THÔNG TIN CHI TIẾT TỪ DG13 (CHUẨN TLV) ============")
        
        parsed_texts = []
        i = 0
        data_len = len(dg13_full_data)
        
        while i < data_len:
            tag = dg13_full_data[i]
            
            # 0x0C là Tag của UTF8String (Tiếng Việt có dấu)
            # 0x13 là Tag của PrintableString (Chữ cái cơ bản, số, ngày tháng)
            if tag in [0x0C, 0x13]:
                i += 1
                if i >= data_len: break
                
                # Đọc độ dài (Length)
                length_byte = dg13_full_data[i]
                i += 1
                
                if length_byte < 0x80:
                    val_len = length_byte
                else:
                    num_len_bytes = length_byte & 0x7F
                    val_len = 0
                    for _ in range(num_len_bytes):
                        if i >= data_len: break
                        val_len = (val_len << 8) | dg13_full_data[i]
                        i += 1
                
                # Trích xuất giá trị (Value) theo đúng độ dài
                if i + val_len <= data_len:
                    val_bytes = dg13_full_data[i : i+val_len]
                    try:
                        text = val_bytes.decode('utf-8')
                        # Lọc bỏ các chuỗi trống hoặc chỉ chứa khoảng trắng
                        if text.strip():
                            parsed_texts.append(text.strip())
                    except Exception:
                        pass
                
                i += val_len
            else:
                # Nếu không phải Tag văn bản, nhảy sang byte tiếp theo để dò
                i += 1
                
        # In ra kết quả (giữ nguyên thứ tự xuất hiện trên chip)
        unique_texts = []
        for t in parsed_texts:
            if t not in unique_texts:
                unique_texts.append(t)
                
        for idx, text in enumerate(unique_texts):
            print(f" [{idx+1}] {text}")
            
        print("=================================================================")
        
        # =============================================================
        # BƯỚC 8: ĐỌC TỆP TIN CHỈ MỤC (COM)
        # =============================================================
        print("\n[*] Đang đọc tệp tin chỉ mục COM...")
        
        apdu_select_com = bytes([0x00, 0xA4, 0x02, 0x0C, 0x02, 0x01, 0x1E])
        resp_select_com = send_apdu_to_esp32(sm.protect(apdu_select_com))
        sm.unprotect(resp_select_com) # Bỏ qua check lỗi để nhanh

        # Đọc 20 byte đầu để lấy danh sách (COM thường rất nhỏ)
        apdu_read_com = bytes([0x00, 0xB0, 0x00, 0x00, 0x14])
        resp_read_com = send_apdu_to_esp32(sm.protect(apdu_read_com))
        
        if resp_read_com:
            com_data = sm.unprotect(resp_read_com)[:-2]
            print("[+] Dữ liệu thô tệp COM: ", com_data.hex())
            # Nếu phân tích kỹ, bạn sẽ thấy các byte như 60, 61, 62, 6D (tương ứng DG1, DG2, DG3, DG13...)

        # =============================================================
        # BƯỚC 9: ĐỌC TỆP TIN BẢO MẬT CHỮ KÝ SỐ (SOD)
        # =============================================================
        print("\n[*] Đang đọc tệp tin Chữ ký số (SOD) - Tệp này khá lớn...")
        
        apdu_select_sod = bytes([0x00, 0xA4, 0x02, 0x0C, 0x02, 0x01, 0x1D])
        resp_select_sod = send_apdu_to_esp32(sm.protect(apdu_select_sod))
        sm.unprotect(resp_select_sod)

        # Lấy độ dài SOD
        apdu_read_sod_header = bytes([0x00, 0xB0, 0x00, 0x00, 0x05])
        resp_sod_hdr = send_apdu_to_esp32(sm.protect(apdu_read_sod_header))
        sod_header_bytes = sm.unprotect(resp_sod_hdr)[:-2]
        sod_header_len, sod_body_len = parse_asn1_length(sod_header_bytes)
        total_sod_size = sod_header_len + sod_body_len
        print(f"[+] Kích thước tệp SOD: {total_sod_size} bytes")

        # Tải toàn bộ SOD
        sod_full_data = bytearray()
        offset = 0
        chunk_size = 0x18  # Bắt buộc là 24 bytes

        while offset < total_sod_size:
            current_chunk = min(chunk_size, total_sod_size - offset)
            offset_high = (offset >> 8) & 0xFF
            offset_low = offset & 0xFF
            
            apdu_read_sod = bytes([0x00, 0xB0, offset_high, offset_low, current_chunk])
            resp_read_sod = send_apdu_to_esp32(sm.protect(apdu_read_sod))
            
            if not resp_read_sod:
                break
                
            chunk_data = sm.unprotect(resp_read_sod)[:-2]
            sod_full_data.extend(chunk_data)
            offset += len(chunk_data)
            print(f"-> Đang tải SOD: {offset}/{total_sod_size} bytes", end='\r')

        print(f"\n[+] Đã tải xong SOD ({len(sod_full_data)} bytes).")
        with open("cccd_security.sod", "wb") as f:
            f.write(sod_full_data)
        print("[+] Đã lưu chữ ký số ra file 'cccd_security.sod'")

    else:
        print("[-] Lỗi bắt tay BAC thất bại. Vui lòng kiểm tra lại cấu hình thông tin CCCD!")

except Exception as e:
    print(f"[ERROR] Đã xảy ra lỗi hệ thống: {e}")
finally:
    ser.close()
    print("[*] Đã đóng cổng kết nối.")