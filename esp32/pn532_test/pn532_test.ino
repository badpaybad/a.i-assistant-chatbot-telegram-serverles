#include <Wire.h>
#include <Adafruit_PN532.h>

#define NFC_SDA 8
#define NFC_SCL 18

Adafruit_PN532 nfc(NFC_SDA, NFC_SCL);
bool cardSelected = false;

void setup(void) {
  // Khởi tạo Serial tốc độ cao để truyền dữ liệu ảnh mượt mà, không bị nghẽn
  Serial.begin(921600); 
  //           115200
  while (!Serial) delay(1000);

  Wire.begin(NFC_SDA, NFC_SCL);
  nfc.begin();

  uint32_t versiondata = nfc.getFirmwareVersion();
  if (!versiondata) {
    while (1) delay(100); // Dừng nếu lỗi phần cứng
  }
  nfc.SAMConfig();
}

void loop(void) {

  // 1. Quét tìm thẻ CCCD nếu chưa kết nối
  if (!cardSelected) {
    if (nfc.inListPassiveTarget()) {
      cardSelected = true;
      // Gửi tín hiệu báo cho Python biết đã phát hiện thẻ
      Serial.println("CARD_DETECTED");
    }else{

      Serial.println("CARD_NONE");
    }
    delay(1000);
    return;
  }

  // 2. Lắng nghe lệnh APDU từ Python gửi xuống qua Serial
  if (Serial.available() > 0) {
    // Đọc độ dài gói tin APDU trước (2 bytes đầu)
    uint8_t lenBuf[2];
    if (Serial.readBytes(lenBuf, 2) == 2) {
      uint16_t apduLen = (lenBuf[0] << 8) | lenBuf[1];
      uint8_t apdu[512];
      
      // Đọc đủ số byte của lệnh APDU
      if (Serial.readBytes(apdu, apduLen) == apduLen) {
        uint8_t response[1024];
        uint8_t responseLength = 255; // Tạm thời để đệm nhận tối đa của PN532

        // Gửi APDU thô vào CCCD qua PN532
        bool success = nfc.inDataExchange(apdu, apduLen, response, &responseLength);

        if (success) {
          // Gửi ngược dữ liệu thô về Python theo cấu trúc: [Độ dài 2 bytes] + [Dữ liệu phản hồi]
          uint8_t respLenBuf[2];
          respLenBuf[0] = (responseLength >> 8) & 0xFF;
          respLenBuf[1] = responseLength & 0xFF;
          
          Serial.write(respLenBuf, 2);
          Serial.write(response, responseLength);
        } else {
          // Báo lỗi giao tiếp thẻ cho Python
          cardSelected = false; // Reset trạng thái thẻ để quét lại
          Serial.write(0x00);
          Serial.write(0x00);
        }
      }
    }
  }
}