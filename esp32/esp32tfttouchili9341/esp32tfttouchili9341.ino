#include <SPI.h>
#include <TFT_eSPI.h>

TFT_eSPI tft = TFT_eSPI();

// Thay thế 5 con số dưới đây bằng 5 con số thực tế bạn đọc được từ Serial Monitor của bạn
uint16_t calData[5] = {324, 3450, 280, 3560, 2}; 

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
  
  if (tft.getTouchRaw(&x, &y)) {
    // Đảo ngược dải map của trục X (đổi 300, 3900 thành 3900, 300) để sửa lỗi ngược Trái - Phải
    uint16_t screen_x = map(y, 3900, 300, 0, 320); 
    
    // Giữ nguyên trục Y nếu chiều Lên - Xuống đã đúng. 
    // (Nếu sau khi đổi X mà bạn thấy chiều Lên - Xuống bị ngược, hãy đổi nốt dòng dưới thành map(x, 3900, 300, 0, 240))
    uint16_t screen_y = map(x, 3900, 300, 0, 240); 
    
    // Giới hạn tọa độ
    screen_x = constrain(screen_x, 0, 320);
    screen_y = constrain(screen_y, 0, 240);
    
    Serial.printf("Raw X=%d, Y=%d | Screen X=%d, Y=%d\n", x, y, screen_x, screen_y);
    
    tft.fillCircle(screen_x, screen_y, 4, TFT_GREEN);
  }
  delay(10);
}