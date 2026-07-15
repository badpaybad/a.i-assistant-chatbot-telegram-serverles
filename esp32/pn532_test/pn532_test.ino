#include <Wire.h>
#include <Adafruit_PN532.h>
#include "mbedtls/des.h"
#include "mbedtls/md.h"
/*
Đoạn code dưới đây biến ESP32-S3 và PN532 thành một đầu đọc thẻ thông minh (PC/SC Reader) chuẩn ISO/IEC 14443-4 (chuẩn của CCCD gắn chip). Nó sẽ nhận diện thẻ CCCD và sẵn sàng truyền nhận các lệnh APDU bảo mật.
chip (ICAO Doc 9303)
BAC (Basic Access Control) để mở khóa bộ nhớ chip. Khóa BAC này được tạo ra từ 3 thông tin bắt buộc:

Số căn cước (12 số): Bạn đã có (123456789012).

Ngày sinh của chủ thẻ (định dạng YYMMDD).

Ngày hết hạn của thẻ (định dạng YYMMDD).
*/
// Sử dụng chân I2C an toàn đã thống nhất

// Sử dụng chân I2C an toàn đã thống nhất
#define NFC_SDA 8
#define NFC_SCL 18

Adafruit_PN532 nfc(NFC_SDA, NFC_SCL);

// Thông tin CCCD bạn cung cấp để test
const char* so_cccd = "";
const char* ngay_sinh = "";       // YYMMDD 
const char* ngay_het_han = "";   // YYMMDD

// Hàm tính Check Digit theo chuẩn ICAO Doc 9303
char calculateCheckDigit(const char* data) {
  int weights[] = {7, 3, 1};
  int total = 0;
  int len = strlen(data);
  
  for (int i = 0; i < len; i++) {
    char c = data[i];
    int val = 0;
    if (c >= '0' && c <= '9') {
      val = c - '0';
    } else if (c >= 'A' && c <= 'Z') {
      val = c - 'A' + 10;
    }
    total += val * weights[i % 3];
  }
  return (total % 10) + '0';
}

void setup(void) {
  Serial.begin(115200);
  while (!Serial) delay(10);

  Serial.println("\n--- ĐANG KHỞI TẠO XÁC THỰC CCCD ---");

  // 1. Tính toán mã MRZ Info
  char c_cccd = calculateCheckDigit(so_cccd);
  char c_birth = calculateCheckDigit(ngay_sinh);
  char c_expiry = calculateCheckDigit(ngay_het_han);

  // Ghép chuỗi MRZ: Số_CCCD + Check_CCCD + Ngày_Sinh + Check_Sinh + Hạn_Dùng + Check_Hạn
  String mrz_info = String(so_cccd) + c_cccd + ngay_sinh + c_birth + ngay_het_han + c_expiry;
  Serial.print("1. Chuỗi MRZ Info tạo được: ");
  Serial.println(mrz_info);

  // 2. Băm SHA-1 chuỗi MRZ bằng thư viện mbedTLS của ESP32
  uint8_t sha1_result[20];
  mbedtls_md_context_t ctx;
  mbedtls_md_type_t md_type = MBEDTLS_MD_SHA1;
  
  mbedtls_md_init(&ctx);
  mbedtls_md_setup(&ctx, mbedtls_md_info_from_type(md_type), 0);
  mbedtls_md_starts(&ctx);
  mbedtls_md_update(&ctx, (const unsigned char*)mrz_info.c_str(), mrz_info.length());
  mbedtls_md_finish(&ctx, sha1_result);
  mbedtls_md_free(&ctx);

  // 3. Trích xuất 16-byte đầu tiên làm K_seed cho BAC
  Serial.print("2. Mã K_seed sinh ra (HEX): ");
  for (int i = 0; i < 16; i++) {
    if (sha1_result[i] < 0x10) Serial.print("0");
    Serial.print(sha1_result[i], HEX);
    Serial.print(" ");
  }
  Serial.println("\n-------------------------------------------");

  // Khởi tạo PN532
  Wire.begin(NFC_SDA, NFC_SCL);
  nfc.begin();

  uint32_t versiondata = nfc.getFirmwareVersion();
  if (!versiondata) {
    Serial.println("Không tìm thấy mạch PN532! Kiểm tra lại dây.");
    while (1);
  }
  nfc.SAMConfig();
  Serial.println("Đặt thẻ CCCD lên đầu đọc để test kết nối...");
}


void loop(void) {
  uint8_t success;
  uint8_t response[255];
  uint8_t responseLength = 255;
  
  // 1. Quét tìm và bắt tay CCCD ở chế độ Smartcard
  success = nfc.inListPassiveTarget();
  
  if (success) {
    Serial.println("\n[SYSTEM] Đã nhận diện thẻ CCCD ở chế độ Smartcard!");

    // 2. Lệnh SELECT ứng dụng định danh trên CCCD
    uint8_t selectApp[] = { 
      0x00, 0xA4, 0x04, 0x0C, 
      0x07,                   
      0xA0, 0x00, 0x00, 0x02, 0x47, 0x10, 0x01 
    };

    Serial.println("[SEND] 1. Đang gửi lệnh SELECT AID...");
    responseLength = 255;
    success = nfc.inDataExchange(selectApp, sizeof(selectApp), response, &responseLength);
    
    if (success && responseLength >= 2 && response[responseLength - 2] == 0x90 && response[responseLength - 1] == 0x00) {
      Serial.println("[OK] Đã kết nối ứng dụng định danh thành công (90 00)!");
      
      // 3. Gửi lệnh GET CHALLENGE (Yêu cầu thẻ cấp 8 byte số ngẫu nhiên phục vụ BAC)
      // APDU: CLA=00, INS=84 (Get Challenge), P1=00, P2=00, Le=08 (Yêu cầu nhận về 8 bytes)
      uint8_t getChallenge[] = { 0x00, 0x84, 0x00, 0x00, 0x08 };
      
      Serial.println("[SEND] 2. Đang yêu cầu thẻ cấp mã xác thực ngẫu nhiên (GET CHALLENGE)...");
      responseLength = 255; // Reset bộ đệm nhận
      
      delay(50); // Nghỉ ngắn giữa 2 lệnh APDU để chip thẻ xử lý ổn định
      success = nfc.inDataExchange(getChallenge, sizeof(getChallenge), response, &responseLength);
      
      if (success) {
        Serial.print("[CCCD Phản hồi mã ngẫu nhiên]: ");
        for (uint8_t i = 0; i < responseLength; i++) {
          if (response[i] < 0x10) Serial.print("0");
          Serial.print(response[i], HEX); Serial.print(" ");
        }
        Serial.println();
        
        // Kiểm tra xem mã phản hồi 2 byte cuối có phải là 90 00 không
        if (responseLength >= 10 && response[responseLength - 2] == 0x90 && response[responseLength - 1] == 0x00) {
          Serial.println("[OK] Thẻ đã cấp mã ngẫu nhiên thành công!");
          Serial.print("-> Mã Thử thách (Challenge - 8 bytes đầu): ");
          for (uint8_t i = 0; i < 8; i++) {
            if (response[i] < 0x10) Serial.print("0");
            Serial.print(response[i], HEX); Serial.print(" ");
          }
          Serial.println("\n-> Sẵn sàng cho bước mã hóa K_seed + Mutual Authentication.");
        } else {
          Serial.println("[FAIL] Thẻ từ chối cấp mã ngẫu nhiên hoặc sai định dạng.");
        }
      } else {
        Serial.println("[ERROR] Không nhận được phản hồi cho lệnh GET CHALLENGE.");
      }
      
    } else {
      Serial.println("[FAIL] Không thể SELECT AID thành công ở lượt này.");
    }
    
    // Đợi 4 giây trước khi thực hiện lượt quét mới để tránh lặp liên tục
    delay(4000);
  }
  delay(100);
}