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
6. Sau khi cài xong, vào **Tools -> Board -> esp32** chọn đúng dòng mạch của bạn (ví dụ: `ESP32 Dev Module` hoặc `ESP32S3 Dev Module`).
7. Vào tiếp **Tools -> Partition Scheme** và chọn **Huge APP (3MB No OTA)** hoặc **No OTA (2MB APP / 2MB SPIFFS)**. 
   * *Lưu ý*: Bước này là **bắt buộc** vì mã nguồn kết hợp nhân chạy TensorFlow Lite và mô hình AI của bạn có dung lượng tương đối lớn (~1.44MB). Phân vùng mặc định ("Default" chỉ có 1.2MB cho App) sẽ báo lỗi không đủ dung lượng bộ nhớ chương trình.
8. Vào tiếp **Tools -> PSRAM** và chọn **"OPI PSRAM"** (hoặc **"QSPI PSRAM"** tùy thuộc vào mạch ESP32-S3 của bạn).
   * *Lưu ý quan trọng*: Bước này là **bắt buộc** để kích hoạt bộ nhớ ngoài (PSRAM) của chip. Nếu chọn "Disabled", toàn bộ 180KB của mô hình AI sẽ bị ép lưu vào RAM nội bộ (Internal DRAM), dẫn đến việc WiFi Driver bị lỗi thiếu bộ nhớ khi chạy (`Expected to init 4 rx buffer, actual is 0`), làm treo mạch và không thể phát ra Hotspot cấu hình.

---

## 2. Cài đặt các thư viện bổ sung (Library Manager)
Mở trình quản lý thư viện bằng cách vào **Tools -> Manage Libraries...** (hoặc nhấn `Ctrl + Shift + I` / `Cmd + Shift + I`) và cài các thư viện sau:

### 1. Thư viện xử lý FFT: `arduinoFFT`
* **Từ khóa tìm kiếm**: `arduinoFFT`
* **Tác giả**: *Didier Longueville* / *Hugo Ares*
* **Yêu cầu phiên bản**: **Phiên bản 2.0.0 trở lên** (vì code sử dụng cú pháp template float mới `ArduinoFFT<float>`).

### 2. Thư viện chạy Model AI: `EloquentTinyML` & `tflm_esp32`
* **Thư viện chính**: `EloquentTinyML` (Tác giả: *Simone Salerno*)
  * **Yêu cầu phiên bản**: **Phiên bản 3.0.1 trở lên**
* **Thư viện phụ thuộc**: `tflm_esp32` (TensorFlow Lite Micro cho chip ESP32)
  * **Yêu cầu phiên bản**: Phiên bản mới nhất.
* *Lưu ý quan trọng*: Để sử dụng bản 3.0.x mới nhất, bạn bắt buộc phải cài đặt đồng thời cả hai thư viện `EloquentTinyML` (bản 3.0.1) và `tflm_esp32` trong trình quản lý thư viện (Library Manager). Cấu trúc code mới đã được tối ưu hóa cho cấu hình này.

---

## 3. Thứ tự mở file để Biên dịch/Nạp
Vì project được tách làm nhiều file `.ino` con, khi làm việc:
* Hãy luôn mở file chính [esp32os.ino](file:///work/a.i-assistant-chatbot-telegram-serverles/esp32/esp32os/esp32os.ino) bằng Arduino IDE.
* IDE sẽ tự động load các file con (`esp32wifi.ino`, `esp32uiconfig.ino`, `esp32eventbus.ino`, `esp32mic.ino`, `esp32speaker.ino`) thành các tab bên cạnh.
* Bấm nút **Verify/Compile** để kiểm tra và **Upload** để nạp chương trình vào ESP32 (cổng `/dev/ttyACM1`).

---

## 4. Thông tin WiFi cấu hình sẵn & Điểm phát (AP)
Khi hệ thống chạy lần đầu tiên (hoặc khi không kết nối được WiFi nào trong bộ nhớ):

* **WiFi mặc định thử kết nối (Fallback Client)**:
  * **SSID**: `Tang 1 OMT`
  * **Mật khẩu**: `Omt070110`
* **WiFi do ESP32 tự phát để cấu hình (SoftAP Captive Portal)**:
  * **SSID**: `esp32os_dunp`
  * **Mật khẩu**: `esp32osdunp`
  * **Địa chỉ IP trang Web cấu hình**: `192.168.4.1` (Tự động mở cửa sổ đăng nhập khi kết nối trên điện thoại/máy tính).

