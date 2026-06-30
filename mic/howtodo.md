# Hướng Dẫn Thiết Kế Mạch Phần Cứng Chống Nhiễu Cho ESP32, INMP441 Và MAX98357A

Tài liệu này tổng hợp các lưu ý kỹ thuật chuyên sâu về thiết kế mạch điện tử (PCB/Hardware Design) khi kết hợp vi điều khiển **ESP32**, cảm biến micro **INMP441 (I2S Input)** và mạch khuếch đại âm thanh **MAX98357A (I2S Output)**. Hầu hết các lỗi như mic rè, thu âm kém, loa kêu dập dờn hoặc AI nhận diện sai đều bắt nguồn từ việc thiết kế mạch và cấp nguồn chưa tối ưu.

---

## 1. Thiết Kế PCB & Đường Tín Hiệu Số Tốc Độ Cao (I2S)

Đường truyền I2S hoạt động ở tần số xung nhịp cao (đặc biệt là đường SCK/BCLK). Nếu đấu nối bằng dây cắm test board (dupont) hoặc đi dây PCB cẩu thả, xung sẽ bị méo do phản xạ đường truyền và nhiễu điện từ (EMI).

* **Phủ mass (Ground Plane)**: Khi thiết kế PCB, bắt buộc phải phủ mass toàn bộ lớp dưới (hoặc lớp trong đối với mạch nhiều lớp) ngay bên dưới các đường tín hiệu I2S nhằm giảm thiểu vòng lặp dòng điện (current loop) và lọc nhiễu EMI chéo.
* **Điện trở giảm méo xung (Series Termination Resistor)**:
  * Thêm một điện trở **$33\ \Omega$** (hoặc trong khoảng từ $22\ \Omega$ đến $47\ \Omega$) nối tiếp trên đường xung nhịp **SCK / BCLK** (đặt điện trở càng gần chân phát của chip phát xung càng tốt).
  * Điện trở này có tác dụng phối hợp trở kháng đường truyền, hấp thụ các sóng phản xạ (ringing) giúp giữ dạng sóng vuông của xung nhịp luôn sắc nét, tránh méo xung gây mất đồng bộ dữ liệu âm thanh.

### Cấu Hình Và Đấu Nối Song Song 2 Micro INMP441 (Stereo)

Để 2 micro INMP441 hoạt động song song tăng cường thu âm (giảm nhiễu môi trường nhờ thuật toán cộng gộp trung bình cộng), chúng ta kết nối chung vào 1 cổng I2S của ESP32 theo nguyên lý chia sẻ đường truyền (Time Division Multiplexing):

* **Sơ đồ đấu nối dây**:
  * **SCK (BCLK)**: Nối chung chân SCK của cả 2 mic và kết nối vào Pin 26 của ESP32 qua trở $33\ \Omega$ nối tiếp.
  * **WS (LRCK)**: Nối chung chân WS của cả 2 mic và kết nối vào Pin 25 của ESP32.
  * **SD (DOUT)**: Nối chung chân SD của cả 2 mic và kết nối trực tiếp vào Pin 22 của ESP32.
  * **VDD & GND**: Đấu song song nguồn 3.3V và GND sạch của ESP32.
  *(Các định nghĩa chân này trùng khớp hoàn toàn với cấu hình `#define I2S_SCK 26`, `#define I2S_WS 25` và `#define I2S_SD 22` trong file code [arduino_esp32_2mic.ino](file:///work/a.i-assistant-chatbot-telegram-serverles/mic/arduino_esp32_2mic.ino))*
* **Cấu hình kênh Trái/Phải (L/R - Left/Right Select)**:
  * **Micro Kênh Trái (Left)**: Chân **L/R nối trực tiếp xuống GND**. Khi đường WS ở mức thấp, micro này sẽ được kích hoạt để truyền dữ liệu lên đường truyền SD chung (tương ứng kênh Trái `stereo_samples[2 * i]` trong code).
  * **Micro Kênh Phải (Right)**: Chân **L/R nối trực tiếp lên 3.3V (VDD)**. Khi đường WS ở mức cao, micro này sẽ truyền dữ liệu (tương ứng kênh Phải `stereo_samples[2 * i + 1]` trong code).
  * **Lưu ý**: Tuyệt đối không để thả nổi chân L/R trên cả hai micro vì sẽ gây xung đột dữ liệu trên đường truyền SD và méo tiếng.
* **Thiết kế PCB cho 2 Mic**:
  * Đi dây tín hiệu từ ESP32 đến 2 micro với chiều dài tương đương nhau (Length matching) để tránh lệch pha tín hiệu.
  * Chạy đường mass bọc xung quanh các đường tín hiệu SCK, WS, SD để bảo vệ tín hiệu khỏi nhiễu cảm ứng từ anten WiFi/Bluetooth.

---

## 2. Thiết Kế Nguồn Cấp (Power Delivery Network) Cho Mạch Khuếch Đại MAX98357A

Mạch khuếch đại Class-D MAX98357A tiêu thụ dòng điện tức thời rất lớn khi đánh loa công suất cao. 

* **Tách biệt nguồn cấp (Separate Power Rails)**:
  * **TUYỆT ĐỐI KHÔNG** lấy nguồn 5V trực tiếp từ chân đầu ra của ESP32 (hoặc từ mạch nguồn tích hợp trên kit phát triển ESP32) để cấp cho chân VDD của MAX98357A. Dòng tiêu thụ đột ngột của loa sẽ làm sụt áp nguồn của ESP32, gây nhiễu cho ADC/I2S và làm rè loa, thậm chí reset ESP32.
  * Hãy cấp nguồn 5V cho MAX98357A từ một đường nguồn riêng biệt có dòng tối thiểu 1A - 2A.
* **Mạch lọc nguồn LC**:
  * Đặt một mạch lọc LC ngay trước chân cấp nguồn VDD của MAX98357A để chặn nhiễu cao tần (từ vi điều khiển hoặc sóng RF của WiFi/Bluetooth trên ESP32).
  * Cấu hình khuyên dùng: Sử dụng một cuộn cảm (Ferrite Bead hoặc Inductor khoảng $2.2\ \mu\text{H}$ - $4.7\ \mu\text{H}$ với dòng định mức cao) kết hợp với hệ tụ lọc song song gồm $10\ \mu\text{F}$ (tụ tantalum hoặc ceramic lọc nguồn chính) và $100\text{ nF}$ (tụ ceramic lọc nhiễu cao tần).

---

## 3. Cố Định Mức Logic Cho Chân GAIN Của MAX98357A

Chân **GAIN** (độ lợi khuếch đại) của chip MAX98357A mặc định có thể để thả nổi để chọn độ lợi trung bình (15dB). Tuy nhiên, trong môi trường nhiễu công nghiệp hoặc nhiễu điện từ mạnh, việc thả nổi chân này sẽ làm độ lợi thay đổi ngẫu nhiên, gây ra tiếng nổ lụp bụp hoặc méo tiếng.

* **Giải pháp**: Cố định cứng mức logic của chân GAIN bằng cách nối trực tiếp hoặc qua điện trở:
  * **Nối GND**: Thiết lập độ lợi **9dB** (Khuyên dùng cho loa nhỏ để giữ chất âm sạch nhất).
  * **Nối VDD**: Thiết lập độ lợi **6dB**.
  * **Nối VDD qua điện trở $100\ \text{k}\Omega$**: Thiết lập độ lợi **3dB**.
  * **Nối GND qua điện trở $100\ \text{k}\Omega$**: Thiết lập độ lợi **12dB**.

---

## 4. Lưu Ý Về Xử Lý Nhận Diện AI Offline (TinyML) & Môi Trường Thu Âm

Chất lượng phần cứng tốt chỉ là điều kiện cần; phần mềm và môi trường thu âm là điều kiện đủ để hệ thống nhận diện từ khóa (Wake-word) hoạt động chính xác.

* **Đặc thù ngôn ngữ (Tiếng Việt)**:
  * Hầu hết các thuật toán TinyML phổ biến hiện nay được tối ưu hóa cho tiếng Anh (ngôn ngữ không dấu). 
  * Tiếng Việt là ngôn ngữ đơn âm tiết có thanh điệu (6 dấu: sắc, huyền, hỏi, ngã, nặng, ngang). Cùng một âm vần nhưng khác dấu sẽ thay đổi hoàn toàn phổ tần số (Spectrogram). Vì vậy, mô hình AI offline cần được train kỹ lưỡng với tập dữ liệu đa dạng của nhiều người Việt khác nhau.
* **Môi trường thu âm**:
  * Hệ thống FFT chuyển đổi sóng âm thô sang ảnh phổ. Nếu môi trường xung quanh có nhiều tạp âm (tiếng quạt, tiếng tivi, tiếng người nói chuyện khác), ảnh phổ spectrogram sẽ bị nhòe và trộn lẫn tín hiệu, khiến mô hình AI không thể nhận diện chính xác.
  * Khi thu âm huấn luyện mẫu cũng như lúc vận hành thực tế, hãy đảm bảo phòng yên tĩnh, câu lệnh kích hoạt phát âm rõ ràng, dứt khoát để đạt tỉ lệ nhận diện cao nhất.

---

## 5. Kết Luận

Micro **INMP441** và mạch khuếch đại **MAX98357A** là những linh kiện chất lượng rất tốt trong tầm giá và cực kỳ phổ biến. Nếu hệ thống của bạn hoạt động không ổn định (rè, nhiễu, không nhận dạng được âm thanh), **90% nguyên nhân** nằm ở thiết kế mạch cấp nguồn cẩu thả, đi dây I2S quá dài không bọc nhiễu, hoặc nguồn cấp bị sụt áp đột ngột. Hãy tuân thủ nghiêm ngặt các nguyên tắc thiết kế mạch phần cứng ở trên để có được chất lượng âm thanh tốt nhất.
