
#include "hotfix/User_Setup.h"
#include <SPI.h>
#include <TFT_eSPI.h>

TFT_eSPI tft = TFT_eSPI();

// Thay thế 5 con số dưới đây bằng 5 con số thực tế bạn đọc được từ Serial Monitor của bạn
// uint16_t calData[5] = {324, 3450, 280, 3560, 2}; 
uint16_t calData[5] = { 270, 3611, 252, 3545, 7 };

void setup() {
  Serial.begin(115200);
  delay(1000); 

  pinMode(TFT_BL, OUTPUT);
  digitalWrite(TFT_BL, HIGH); 

  tft.begin();
  tft.setRotation(1); // Xoay ngang màn hình

  // Nạp trực tiếp dữ liệu hiệu chuẩn đã lưu vào thư viện
  tft.setTouch(calData);
  Serial.println("Da nap cau hinh hieu chuan cam ung!");

  tft.fillScreen(TFT_BLACK);
  tft.setTextColor(TFT_WHITE, TFT_BLACK);
  tft.setTextSize(2);
  tft.setCursor(10, 10);
  tft.println("Touch hanh trinh muot ma!");
}
void loop() {
  uint16_t x = 0, y = 0;
  
  // Hàm getTouch() trả về true/false và tự động áp dụng calData để map ra tọa độ screen (0->320, 0->240)
  if (tft.getTouch(&x, &y)) {
    // Lúc này x, y chính là tọa độ màn hình (screen coordinates) chứ không phải tọa độ Raw nữa
    Serial.printf("Screen X=%d, Y=%d\n", x, y);
    tft.fillCircle(x, y, 4, TFT_GREEN);
  }
  delay(10);
}
// void loop() {
//   uint16_t x = 0, y = 0;
  
//   if (tft.getTouchRaw(&x, &y)) {
//     // LỌC NHIỄU: Chỉ xử lý nếu tọa độ Raw nằm trong khoảng hợp lý của màn hình cảm ứng
//     // (Thông thường touch thật sẽ nằm trong khoảng từ 150 đến 3900)
//     if (x > 150 && x < 3950 && y > 150 && y < 3950) {
      
//       // Đảo ngược dải map của trục X để sửa lỗi ngược Trái - Phải
//       uint16_t screen_x = map(y, 3900, 300, 0, 320);
//       uint16_t screen_y = map(x, 3900, 300, 0, 240);
      
//       // Giới hạn tọa độ
//       screen_x = constrain(screen_x, 0, 320);
//       screen_y = constrain(screen_y, 0, 240);
      
//       Serial.printf("Raw X=%d, Y=%d | Screen X=%d, Y=%d\n", x, y, screen_x, screen_y);
//       tft.fillCircle(screen_x, screen_y, 4, TFT_GREEN);
//     }
//   }
//   delay(10);
// }