#include <Wire.h>
#include <Adafruit_PN532.h>

#define NFC_SDA 8
#define NFC_SCL 18

// Khởi tạo đối tượng PN532 sử dụng giao tiếp I2C
Adafruit_PN532 nfc(NFC_SDA, NFC_SCL);
bool cardSelected = false;

void setup(void) {
  // Cấu hình Baudrate cao để khớp với Script Python
  Serial.begin(921600);
  while (!Serial) delay(10); // Chờ cổng Serial sẵn sàng

  // Khởi tạo I2C và tối ưu hóa cho ESP32
  Wire.begin(NFC_SDA, NFC_SCL);
  Wire.setClock(400000); // Thiết lập tốc độ I2C lên 400kHz để truyền nhanh hơn
  Wire.setTimeOut(1000); // Tăng timeout I2C lên 1 giây tránh mất kết nối khi CCCD xử lý 3DES

  nfc.begin();
  // Kiểm tra kết nối phần cứng với module PN532
  uint32_t versiondata = nfc.getFirmwareVersion();
  if (!versiondata) {
    // Nếu lỗi phần cứng, nhấp nháy đèn hoặc dừng lại
    while (1) {
      delay(500);
    }
  }
  
  // Cấu hình PN532 để đọc các thẻ không tiếp xúc ISO14443
  nfc.SAMConfig();
}

void loop(void) {
  // 1. Quét tìm thẻ CCCD nếu chưa kết nối thành công
  if (!cardSelected) {
    if (nfc.inListPassiveTarget()) {
      
      // Bước bắt tay đồng bộ 2 chiều (Handshake) với Python
      bool handshake_ok = false;
      unsigned long startTime = millis();
      
      while (millis() - startTime < 2000) { // Timeout chờ bắt tay trong 2 giây
        Serial.write(0xDE); // Bắn liên tục byte yêu cầu bắt tay
        delay(10);
        if (Serial.available() > 0) {
          if (Serial.read() == 0xAC) { // Nhận được byte phản hồi (ACK) từ Python
            handshake_ok = true;
            break;
          }
        }
      }

      if (handshake_ok) {
        // Dọn dẹp sạch toàn bộ bộ đệm UART của ESP32 trước khi bắt đầu
        delay(50);
        while(Serial.available() > 0) {
          Serial.read();
        }
        
        cardSelected = true; // Sẵn sàng trao đổi APDU
        
        // Gửi Header báo hiệu SẴN SÀNG lên PC
        uint8_t detectBuf[4] = {0xDE, 0xAD, 0xBE, 0xEF};
        Serial.write(detectBuf, 4);
      }
    }
    delay(200);
    return;
  }

  // 2. Lắng nghe và chuyển tiếp lệnh APDU mã hóa giữa Python và Thẻ CCCD
  if (Serial.available() >= 2) {
    uint8_t lenBuf[2];
    Serial.readBytes(lenBuf, 2); // Đọc 2 byte kích thước gói tin (Big Endian)
    uint16_t apduLen = (lenBuf[0] << 8) | lenBuf[1];
    
    // [BỔ SUNG] Nhận tín hiệu Reset từ Python (Gói tin độ dài 0xFFFF) để quét thẻ mới
    if (apduLen == 0xFFFF) {
        cardSelected = false; // Reset trạng thái để quay lại bước 1
        delay(100);
        while(Serial.available() > 0) {
          Serial.read(); // Dọn sạch buffer
        }
        return;
    }
    
    // Khởi tạo bộ đệm đủ lớn để chứa gói tin APDU bảo mật (SM)
    uint8_t apdu[512];
    if (Serial.readBytes(apdu, apduLen) == apduLen) { // Nhận đủ toàn bộ gói APDU từ Python
      
      // Khởi tạo vùng đệm chứa phản hồi trả về từ thẻ CCCD
      uint8_t response[1024];
      uint8_t responseLength = 255; // Sẽ được nfc.inDataExchange cập nhật lại theo thực tế
      
      // Chuyển tiếp APDU đã được mã hóa vào thẻ CCCD qua sóng NFC của PN532
      bool success = nfc.inDataExchange(apdu, apduLen, response, &responseLength);
      if (success) {
        // Gửi độ dài phản hồi thực tế về PC (2 bytes)
        uint8_t respLenBuf[2];
        respLenBuf[0] = (responseLength >> 8) & 0xFF;
        respLenBuf[1] = responseLength & 0xFF;
        
        Serial.write(respLenBuf, 2);
        Serial.write(response, responseLength); // Trả dữ liệu thô về cho Python xử lý
      } else {
        // Nếu giao tiếp lỗi (mất sóng NFC hoặc sụt áp), reset trạng thái kết nối
        cardSelected = false;
        uint8_t errBuf[2] = {0, 0}; // Gửi tín hiệu báo lỗi 0x00 0x00 về PC
        Serial.write(errBuf, 2);
      }
    }
  }
}