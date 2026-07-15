// Khai báo cấu hình chân TFT_eSPI trực tiếp trong code .ino
#define USER_SETUP_LOADED 

#define ILI9341_DRIVER

// Định nghĩa dải chân an toàn mới (> GPIO 20) cho ESP32-S3 N16R8
#define TFT_MISO 41
#define TFT_MOSI 38
#define TFT_SCLK 40
#define TFT_CS   21
#define TFT_DC   42
#define TFT_RST  2   

// Nối thẳng chân RST của màn hình vào chân EN (hoặc RST) trên board ESP32-S3 (Khuyên dùng nhất ⭐) 
// Trong code bạn sửa thành: #define TFT_RST -1.

#define TOUCH_CS 39

// Sử dụng tần số SPI cao để vẽ mượt mà
#define SPI_FREQUENCY  27000000 
#define SPI_READ_FREQUENCY  20000000
#define SPI_TOUCH_FREQUENCY  25000000

#include <SPI.h>
#include <TFT_eSPI.h>

TFT_eSPI tft = TFT_eSPI();

void setup() {
  Serial.begin(115200);
  tft.begin();
  tft.setRotation(1); 
  tft.fillScreen(TFT_BLACK);
  
  tft.setTextColor(TFT_WHITE, TFT_BLACK);
  tft.setTextSize(2);
  tft.setCursor(10, 10);
  tft.println("Da cau hinh chan > 20!");
}

void loop() {
  uint16_t x, y;
  // Cảm ứng hoạt động thông qua GPIO 39 làm CS và chung bus SPI (38, 40, 41)
  if (tft.getTouch(&x, &y)) {
    Serial.printf("Touch at: X=%d, Y=%d\n", x, y);
    tft.fillCircle(x, y, 4, TFT_GREEN);
  }
}