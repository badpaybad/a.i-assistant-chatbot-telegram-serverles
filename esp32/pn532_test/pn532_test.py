import hashlib
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes

# 1. Thông tin bạn đã cung cấp
so_cccd = ""
ngay_sinh = ""       
ngay_het_han = ""    

# 2. Tính toán chuỗi MRZ Information dùng để tạo key
# Theo tiêu chuẩn ICAO Doc 9303, thông tin kiểm tra có dạng:
# Số_CCCD + CheckDigit + Ngày_Sinh + CheckDigit + Ngày_Hết_Hạn + CheckDigit

def calculate_check_digit(data):
    # Hàm tính Check Digit theo chuẩn ICAO Doc 9303
    weights = [7, 3, 1]
    total = 0
    for i, char in enumerate(data):
        if '0' <= char <= '9':
            val = int(char)
        elif 'A' <= char <= 'Z':
            val = ord(char) - 55
        else:
            val = 0
        total += val * weights[i % 3]
    return str(total % 10)

c_cccd = calculate_check_digit(so_cccd)
c_birth = calculate_check_digit(ngay_sinh)
c_expiry = calculate_check_digit(ngay_het_han)

# Tạo chuỗi thông tin MRZ hoàn chỉnh
mrz_info = f"{so_cccd}{c_cccd}{ngay_sinh}{c_birth}{ngay_het_han}{c_expiry}"
print(f"MRZ Info để tạo khóa BAC: {mrz_info}")

# 3. Tạo khóa K_enc và K_mac bằng thuật toán SHA-1
sha = hashlib.sha1(mrz_info.encode('ascii')).digest()
k_seed = sha[:16]

# Từ k_seed này, Python sẽ tính toán ra các cặp khóa 3DES/AES để mã hóa 
# và gửi lệnh xác thực (Mutual Authentication) xuống cho ESP32 truyền vào thẻ.