# Hướng dẫn Cấu hình & Cài đặt thư viện trên Arduino IDE

Để biên dịch thành công dự án ESP32 OS này, bạn cần cài đặt gói mạch ESP32 và các thư viện xử lý AI & âm thanh bên dưới vào Arduino IDE.

---

## 1. Cấu hình Mạch ESP32 (ESP32 Core)
Dự án sử dụng các thư viện phần cứng của mạch ESP32 như `<WiFi.h>`, `<WebServer.h>`, `<DNSServer.h>`, `<Preferences.h>` và `<driver/i2s.h>`.

### Các bước cài đặt:
1. Mở Arduino IDE, vào **File -> Preferences** (hoặc **Arduino IDE -> Settings** trên macOS/Linux).
2. Tại ô **Additional Boards Manager URLs**, dán đường dẫn sau:
   ```text
   https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
   ```
3. Vào **Tools -> Board -> Boards Manager...**
4. Tìm kiếm từ khóa `esp32` (của tác giả **Espressif Systems**).
5. Nhấn **Install** để cài đặt.
6. Sau khi cài xong, vào **Tools -> Board -> esp32** chọn **"ESP32S3 Dev Module"** (cho board **ESP32-S3 N16R8**).
7. Vào tiếp **Tools -> Partition Scheme** và chọn **"16MB Flash (3MB APP/9.9MB FATFS)"** hoặc **"Huge APP (3MB No OTA)"**. 
   * *Lưu ý*: Bước này là **bắt buộc** vì mã nguồn kết hợp nhân chạy TensorFlow Lite và mô hình AI của bạn có dung lượng tương đối lớn (~1.44MB). Phân vùng mặc định ("Default" chỉ có 1.2MB cho App) sẽ báo lỗi không đủ dung lượng bộ nhớ chương trình.
8. Vào tiếp **Tools -> PSRAM** và chọn **"OPI PSRAM"** (chọn OPI bắt buộc vì R8 là 8MB Octal PSRAM).
   * *Lưu ý quan trọng*: Bước này là **bắt buộc** để kích hoạt bộ nhớ ngoài (PSRAM) của chip. Nếu chọn "Disabled", toàn bộ 180KB của mô hình AI và 160KB của bộ đệm ghi âm thử mic 5s sẽ bị ép lưu vào RAM nội bộ (Internal DRAM), dẫn đến việc hệ thống thiếu bộ nhớ trầm trọng, gây lỗi driver WiFi (`Expected to init 4 rx buffer, actual is 0`), làm treo mạch và không thể phát ra Hotspot cấu hình.
   * **⚠️ CẢNH BÁO XUNG ĐỘT CHÂN (BẮT BUỘC ĐỌC)**: Khi kích hoạt **OPI PSRAM**, chip ESP32-S3 sẽ sử dụng chân **GPIO 15, 16, 17** cho đường truyền nội bộ của PSRAM. Tuyệt đối **không** được đấu nối Micro (SCK/WS) hoặc Loa (LRC) vào cụm chân 15, 16, 17 này (nếu đấu vào sẽ gây nhiễu trắng "xào xào", làm chậm luồng phát âm thanh và gây crash mạch). Hãy đổi sang các chân an toàn hơn là: Mic (SCK=GPIO 4, WS=GPIO 5, SD=GPIO 6) và Loa (LRC=GPIO 7).

---

## 2. Cài đặt các thư viện bổ sung (Library Manager)
Mở trình quản lý thư viện bằng cách vào **Tools -> Manage Libraries...** (hoặc nhấn `Ctrl + Shift + I` / `Cmd + Shift + I`) và cài các thư viện sau:

### 1. Thư viện truyền nhận WebSockets: `WebSockets`
* **Từ khóa tìm kiếm**: `WebSockets`
* **Tác giả**: *Markus Sattler*
* **Yêu cầu phiên bản**: Phiên bản mới nhất.

### 2. Thư viện xử lý JSON: `ArduinoJson`
* **Từ khóa tìm kiếm**: `ArduinoJson`
* **Tác giả**: *Benoit Blanchon*
* **Yêu cầu phiên bản**: Phiên bản 7.x trở lên.

### 3. Thư viện Màn hình & Cảm ứng: `TFT_eSPI` (Cập nhật 21 & 22)
* **Từ khóa tìm kiếm**: `TFT_eSPI`
* **Tác giả**: *Bodmer*
* **Yêu cầu phiên bản**: Phiên bản mới nhất.
* **Cấu hình bắt buộc**: Sau khi cài đặt thư viện `TFT_eSPI`, copy file [User_Setup.h](file:///work/a.i-assistant-chatbot-telegram-serverles/esp32/esp32os/User_Setup.h) vào thư mục thư viện của Arduino IDE:
  * Trên Linux: `/home/<user>/Arduino/libraries/TFT_eSPI/User_Setup.h`
  * Trên Windows: `Documents\Arduino\libraries\TFT_eSPI\User_Setup.h`
  * Trên macOS: `~/Documents/Arduino/libraries/TFT_eSPI/User_Setup.h`
* **Tính năng hỗ trợ**:
  * Chế độ **Dashboard**: Hiển thị toàn bộ thông số WiFi, Hub WebSocket, Model Gemini, Firebase, DRAM/PSRAM.
  * Chế độ **Live Voice Chat (Cập nhật 22)**: Hiển thị văn bản transcription thời gian thực **Tiếng Việt có dấu** của người dùng và trợ lý AI Du (bộ vẽ dấu thanh composite renderer) kèm trạng thái đàm thoại (`[DANG NGHE]`, `[DU TRA LOI]`, `[HOAN TAT]`). Chạm màn hình để chuyển đổi qua lại giữa hai chế độ.

> [!NOTE]
> **Cập nhật 20 - Chế độ Stream Mic Không Wake-word (`esp32mic_no_wakeword.ino`)**:
> Ở chế độ này, mô hình AI cục bộ TFLite đã được lược bỏ để giải phóng bộ nhớ (>300KB RAM và >1.4MB Flash). Do đó bạn **không cần cài** `arduinoFFT`, `EloquentTinyML` hay `tflm_esp32` nữa. ESP32 sẽ stream trực tiếp âm thanh 16kHz PCM lên server local `mic/esp32_hub.py` và nhận âm thanh 24kHz PCM phát ra loa.
> *(Nếu bạn muốn sử dụng lại chế độ nhận diện Wake-word TFLite offline cũ ở `esp32mic.ino`, hãy định nghĩa `#define USE_TFLITE_MIC` và cài thêm `arduinoFFT` >=2.0.0, `EloquentTinyML` >=3.0.1 và `tflm_esp32`).*

> [!WARNING]
> **LỖI BIÊN DỊCH THƯỜNG GẶP**: Nếu bạn gặp lỗi `WebSocketsClient.h: No such file or directory` hoặc `TFT_eSPI.h: No such file or directory`, hãy đảm bảo đã cài đặt đủ các thư viện **WebSockets**, **ArduinoJson** và **TFT_eSPI** theo đúng hướng dẫn trên.

---

## 3. Thứ tự mở file để Biên dịch/Nạp
Vì project được tách làm nhiều file `.ino` con, khi làm việc:
* Hãy luôn mở file chính [esp32os.ino](file:///work/a.i-assistant-chatbot-telegram-serverles/esp32/esp32os/esp32os.ino) bằng Arduino IDE.
* IDE sẽ tự động load các file con (`esp32wifi.ino`, `esp32uiconfig.ino`, `esp32eventbus.ino`, `esp32firebase.ino`, `esp32mic_no_wakeword.ino`, `esp32speaker.ino`, `esp32display.ino`) thành các tab bên cạnh.
* Bấm nút **Verify/Compile** để kiểm tra và **Upload** để nạp chương trình vào ESP32 (cổng `/dev/ttyACM1`).

---

## 4. Sơ đồ đấu nối phần cứng (Wiring Diagram)

Để tránh xung đột với các chân của OPI PSRAM (GPIO 15, 16, 17) trên mạch **ESP32-S3 N16R8**, bạn bắt buộc phải kết nối các thiết bị ngoại vi theo sơ đồ chân dưới đây:

### A. 2 Microphone INMP441 (Stereo)
Các chân của 2 Micro được đấu song song (chung chân) với nhau rồi nối về ESP32-S3, ngoại trừ chân chọn kênh **L/R**:

| Chân INMP441 | Cổng kết nối ESP32-S3 | Ghi chú |
| :--- | :--- | :--- |
| **VDD** (cả 2 mic) | **3.3V** (3V3) | Cấp nguồn 3.3V (Bắt buộc) |
| **GND** (cả 2 mic) | **GND** | Nối đất chung |
| **SCK** (cả 2 mic) | **GPIO 4** | Xung nhịp hệ thống I2S RX |
| **WS** (cả 2 mic) | **GPIO 5** | Xung chọn kênh I2S RX |
| **SD** (cả 2 mic) | **GPIO 6** | Đường truyền dữ liệu âm thanh |
| **L/R (Mic 1 - Trái)** | **GND** | Định danh Mic 1 là kênh Left |
| **L/R (Mic 2 - Phải)**| **3.3V** (3V3) | Định danh Mic 2 là kênh Right |

### B. Mạch khuếch đại Loa MAX98357A
Mạch Loa MAX98357A nên được cấp nguồn riêng hoặc nguồn 5V của ESP32 để tránh sụt áp gây rè tiếng:

| Chân MAX98357A | Cổng kết nối ESP32-S3 | Ghi chú |
| :--- | :--- | :--- |
| **VIN** | **5V** hoặc Nguồn 5V ngoài | Nguồn cấp cho loa |
| **GND** | **GND** (Chung GND với ESP32) | Nối đất (Mass) tham chiếu |
| **BCLK** | **GPIO 14** | Xung nhịp loa (I2S TX) |
| **LRC** (WS) | **GPIO 7** | Xung chọn kênh loa (Tránh GPIO 15) |
| **DIN** | **GPIO 13** | Dữ liệu âm thanh ra loa (I2S TX) |
| **GAIN** | **GND** hoặc **Nối đất qua điện trở 100kΩ** | **Cấu hình âm lượng loa vật lý**:<br>• Nối trực tiếp xuống **GND** để đạt mức Gain **12dB** (To hơn mặc định).<br>• Nối xuống **GND qua điện trở 100kΩ** để đạt mức Gain cực đại **15dB** (To nhất). |

> [!TIP]
> **Tăng âm lượng bằng phần mềm (Software Volume Boost)**: Trong mã nguồn [esp32speaker.ino](file:///work/a.i-assistant-chatbot-telegram-serverles/esp32/esp32os/esp32speaker.ino#L45) đã được cấu hình sẵn hệ số tăng âm lượng `#define SPEAKER_VOLUME_BOOST 1.5f` (khuếch đại âm thanh lên 2.5 lần bằng thuật toán nhân mẫu và giới hạn biên độ). Kết hợp với việc nối chân **GAIN** phần cứng ở trên sẽ giúp âm thanh phát ra loa đạt mức to nhất có thể.

### C. Màn hình 2.8" SPI TFT LCD & Cảm ứng (ILI9341 + XPT2046 - Cập nhật 21)
Kết nối các chân của module màn hình TFT cảm ứng 2.8 inch vào ESP32-S3 theo bảng dưới:

| Chân trên Module TFT | Cổng kết nối ESP32-S3 | Chức năng |
| :--- | :--- | :--- |
| **VCC** | **3.3V** hoặc **5V** | Nguồn cấp cho màn hình |
| **GND** | **GND** | Nối đất chung |
| **CS** (TFT CS) | **GPIO 21** | Chip Select màn hình TFT |
| **RESET** (RST) | **GPIO 2** | Reset màn hình |
| **DC** / RS | **GPIO 42** | Data / Command control |
| **SDI (MOSI)** | **GPIO 38** | Dữ liệu SPI MOSI |
| **SCK (SCLK)** | **GPIO 40** | Xung nhịp SPI Clock |
| **LED** (BL) | **GPIO 20** | Điều khiển đèn nền (Backlight) |
| **SDO (MISO)** | **GPIO 41** | Dữ liệu SPI MISO |
| **T_CLK** | **GPIO 40** | Xung nhịp Touch (Nối chung với SCK) |
| **T_CS** | **GPIO 39** | Chip Select IC cảm ứng XPT2046 |
| **T_DIN** | **GPIO 38** | Dữ liệu Touch DIN (Nối chung với MOSI) |
| **T_DO** | **GPIO 41** | Dữ liệu Touch DO (Nối chung với MISO) |
| **T_IRQ** | **GPIO 47** | Tín hiệu ngắt cảm ứng (Touch IRQ) |

---

## 5. Thông tin WiFi cấu hình sẵn & Điểm phát (AP)
Khi hệ thống chạy lần đầu tiên (hoặc khi không kết nối được WiFi nào trong bộ nhớ):

* **WiFi mặc định thử kết nối (Fallback Client)**:
  * **SSID**: ``
  * **Mật khẩu**: ``
* **WiFi do ESP32 tự phát để cấu hình (SoftAP Captive Portal)**:
  * **SSID**: `esp32os_dunp`
  * **Mật khẩu**: `esp32osdunp`
  * **Địa chỉ IP trang Web cấu hình**: `192.168.4.1` (Tự động mở cửa sổ đăng nhập khi kết nối trên điện thoại/máy tính).

---

## 6. Cấu hình Gemini Live qua local Hub
Khi ở chế độ đàm thoại, ESP32 không kết nối trực tiếp đến Google Gemini Live API nữa. Thay vào đó, toàn bộ nghiệp vụ gọi API Gemini đã được chuyển giao cho máy chủ local **`esp32_hub`**:
1. Máy chủ `esp32_hub.py` sẽ sử dụng API Key từ file cấu hình `config_dunp.py` hoặc biến môi trường `GEMINI_API_KEY` để xác thực với Google.
2. ESP32 chỉ cần cấu hình kết nối mạng LAN và địa chỉ Hub. Bạn có thể cấu hình thông số kết nối của local Hub trực tiếp qua Web UI:
   - **ESP32 Hub Host or IP**: Địa chỉ IP hoặc tên miền cục bộ của máy tính chạy `esp32_hub.py` (ví dụ: `192.168.4.248`).
   - **ESP32 Hub Port**: Cổng dịch vụ của local Hub (ví dụ: `8888`).
3. Khi bắt đầu hội thoại (sau wake-word), ESP32 tự động kết nối qua WebSocket local tới Hub đã cấu hình này để thực hiện stream âm thanh 2 chiều (gửi PCM 16kHz Mono nhị phân và nhận PCM 24kHz Mono nhị phân).
4. Các thông số cấu hình Hub này được lưu trữ trong namespace NVS `"hub-config"`.

---

## 7. Cấu hình Google Firebase Firestore
Để đồng bộ hóa hoặc lưu trữ dữ liệu lên Google Cloud Firestore:
1. Kết nối vào WiFi cấu hình `esp32os_dunp` và truy cập trang web `http://192.168.4.1` (hoặc captive portal tự động nhảy ra).
2. Nhập các thông số Firebase tương ứng:
   * **Firebase Project ID**: ID của dự án Firebase (ví dụ: `my-firebase-project-123`).
   * **Firebase API Key (Optional)**: Web API Key của dự án Firebase (dùng để xác thực nếu quy tắc bảo mật yêu cầu).
   * **Firestore Document Path**: Đường dẫn tài liệu Firestore mặc định (ví dụ: `esp32/status`).
3. Nhập WiFi mạng LAN của bạn và nhấn **Connect**. Các thông số này sẽ tự động lưu vào namespace `"firebase-cfg"` trong bộ nhớ Flash (NVS) và tải lại mỗi lần khởi động mạch.

---

## 8. Factory Reset qua nút Reset ngoài (Nhấn giữ 10 giây)
Khi cần xóa sạch toàn bộ thông tin đã cấu hình và cấu hình lại từ đầu:
1. **Nhấn giữ** nút **Reset Config** ngoài (kết nối với GPIO 1) liên tục trong **10 giây**.
2. Trong khi giữ, ESP32 sẽ phát phản hồi tiến độ qua loa:
   - **5 giây**: 1 tiếng bíp thấp → "tiếp tục giữ"
   - **8 giây**: 2 tiếng bíp vừa → "sắp xong rồi"
   - **10 giây**: chuỗi 3 âm đi xuống (C → G → C thấp) → xác nhận factory reset
3. Toàn bộ các phân vùng cấu hình lưu trong Flash NVS sẽ bị xóa sạch hoàn toàn:
   - **WiFi credentials** (5 mạng đã lưu)
   - **Gemini configurations** (API Key + Model Name)
   - **Firebase configurations** (Project ID + API Key + Doc Path)
   - **Hub configurations** (Hub Host/IP + Port)
4. ESP32 **tự động khởi động lại**.
5. Sau khi khởi động, do không còn credentials, ESP32 sẽ tự mở hotspot **`esp32os_dunp`** (mật khẩu `esp32osdunp`).
6. Kết nối vào hotspot này và truy cập `http://192.168.4.1` để điền lại toàn bộ cấu hình.

> [!NOTE]
> Nếu thả nút trước 10 giây, không có gì xảy ra — factory reset **chỉ kích hoạt khi giữ đủ 10 giây**.
> Task kiểm tra nút nhấn chạy độc lập trên Core 0 thông qua cơ chế polling mỗi 50ms giúp chống nhiễu phím (debounced) cực kì hiệu quả.

---

## 9. Màn hình Dashboard Cấu hình & Cảm ứng (Cập nhật 21)
Màn hình 2.8" TFT ILI9341 tự động hiển thị trực quan toàn bộ các thông số cấu hình hệ thống:
1. **Thẻ 1 - WiFi & Mạng**:
   - Trạng thái kết nối (ONLINE / AP MODE / OFFLINE)
   - SSID hiện tại, địa chỉ IP mạng LAN và mức sóng RSSI (dBm)
   - Địa chỉ MAC của ESP32
   - Số lượng mạng WiFi đã lưu trữ trong bộ nhớ Flash (tối đa 5 mạng)
2. **Thẻ 2 - Local Hub & Gemini AI**:
   - Địa chỉ kết nối Hub (`ws://<host>:<port>/ws`)
   - Trạng thái kết nối WebSocket theo thời gian thực (CONNECTED / CONNECTING / STANDBY)
   - Model Gemini đang sử dụng (ví dụ: `gemini-3.1-flash-live-preview`)
   - Khóa API Key (che bảo mật dạng `AIzaSy...****`)
3. **Thẻ 3 - Firebase Firestore & Tài nguyên Hệ thống**:
   - Firebase Project ID & Đường dẫn Document Path
   - Dung lượng RAM Heap và PSRAM còn trống
4. **Tương tác Cảm ứng (Touch)**:
   - Chạm vào bất kỳ điểm nào trên màn hình để kích hoạt hiệu ứng chạm và **làm mới (refresh)** ngay lập tức toàn bộ thông số trên dashboard.
