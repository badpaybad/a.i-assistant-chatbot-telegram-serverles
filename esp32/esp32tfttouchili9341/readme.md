Mô-đun 4 Dây 2.8-inch tft lcd Cổng spi Màn Hình Cảm Ứng ili9341 240320 đấu màn hình vào esp32 s3 n16r8 và code để vẽ lên màn hình , phát hiện touch và vẽ hình tròn điểm vừa touch 

Tìm đến thư mục cài đặt thư viện TFT_eSPI. Trên máy Linux của bạn, đường dẫn thường là:
/home/dunp/Arduino/libraries/TFT_eSPI/ (hoặc trong thư mục sketches/libraries tương tự).

Mở file User_Setup.h bằng một trình soạn thảo văn bản bất kỳ (VS Code, Notepad, v.v.).

Thay thế toàn bộ nội dung trong file đó hoặc chỉnh sửa các dòng tương ứng để định nghĩa đúng Driver và các chân GPIO cho ESP32-S3 của bạn như sau:

esp32/User_Setup.h

// 1. Định nghĩa Driver màn hình
#define ILI9341_DRIVER

// 2. Định nghĩa các chân SPI & TFT cho ESP32-S3
#define TFT_MISO 41
#define TFT_MOSI 38
#define TFT_SCLK 40
#define TFT_CS   21
#define TFT_DC   42
#define TFT_RST  2   // Hoặc -1 nếu nối thẳng vào chân EN/RST của ESP32

// 3. ĐÂY LÀ CHÂN QUYẾT ĐỊNH: Định nghĩa chân chọn chip cảm ứng (Touch CS)
#define TOUCH_CS 39

#define TFT_BL   20  // LED back-light

// 4. Các mức tần số SPI hoạt động ổn định
#define SPI_FREQUENCY        27000000 
#define SPI_READ_FREQUENCY   20000000
#define SPI_TOUCH_FREQUENCY  25000000


#define USE_HSPI_PORT

#define TOUCH_IRQ  47  // Hoặc số chân GPIO bạn vừa nối




Nối chân T_CLK chung vào đường dây của chân SCK (GPIO 40).

Nối chân T_DIN chung vào đường dây của chân SDI/MOSI (GPIO 38).

Nối chân T_DO chung vào đường dây của chân SDO/MISO (GPIO 41).

Chân T_CS nối riêng biệt vào GPIO 39.

Chân T_IRQ nối riêng biệt vào GPIO 47 (như bạn vừa cấu hình ở cuối file User_Setup.h).