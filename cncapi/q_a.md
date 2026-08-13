# Tổng Hợp Tìm Hiểu & Hỏi Đáp (Q&A) Hệ Thống CNC, Grbl, ESP32 & Động Cơ

---

## 1. Khả Năng Hỗ Trợ Trục Của `cncapi/grbl-master`
* **Hỏi**: Mã nguồn `cncapi/grbl-master` chỉ hỗ trợ 3 động cơ (X, Y, Z) thôi đúng không?
* **Trả lời**: 
  - **Đúng**. Mặc định Grbl v1.1 trên ATmega328P (Arduino Uno) chỉ hỗ trợ **3 trục (X, Y, Z)**.
  - Trong file `nuts_bolts.h`, khai báo `#define N_AXIS 3` (dòng `#define A_AXIS 3` bị comment).
  - Tín hiệu Pulse/Dir của 3 trục X (Pin 2,5), Y (Pin 3,6), Z (Pin 4,7) được gom chung vào PORTD của vi điều khiển.
  - **Mở rộng**: Nếu cần chạy 2 động cơ cho trục Y (Dual Y), có thể cắm Jumper clone trục trên CNC Shield V3. Nếu muốn chạy trục xoay A, B, C thực sự thì cần chuyển sang **Grbl-Mega 5-axis** (Arduino Mega 2560) hoặc **grblHAL / FluidNC** (ESP32/STM32).

---

## 2. Nâng Cấp Lên grblHAL (Vi Điều Khiển 32-Bit)
* **Hỏi**: Khi chuyển sang grblHAL, mã điều khiển từ Python có thay đổi gì không và các chân cắm trên CNC Shield V3 có giữ nguyên không?
* **Trả lời**:
  - **Code Python**: **KHÔNG ĐỔI**. Giao thức Serial ASCII G-code của grblHAL hoàn toàn giống Grbl v1.1 (`?`, `$`, `G0`, `G1`, `M3`, `$X`...). Nếu có thêm trục A thì chỉ cần thêm tham số `A` trong lệnh G-code.
  - **Phần cứng CNC Shield V3**: 
    - **Không cắm trực tiếp Arduino Uno được nữa** vì grblHAL dành cho chip 32-bit (ESP32, STM32, RP2040...).
    - **Giải pháp**: Dùng bo 32-bit có dạng chân Arduino Uno (như ESP32 D1 R32) hoặc dùng bo chuyển Adapter cắm CNC Shield V3 + nạp đúng map chân `CNC Shield v3` / `UNO map`.
    - **Lưu ý điện áp**: Chip 32-bit chạy điện áp 3.3V Logic. Hầu hết các Driver A4988 / DRV8825 / TMC2209 đều nhận tốt mức logic 3.3V.

---

## 3. Tự Đấu Dây Thủ Công Với ESP32
* **Hỏi**: Nếu tự đấu chân GPIO của ESP32 sang Driver thì có phải sửa thư viện và nạp lại code cho ESP32 không?
* **Trả lời**:
  - **Với grblHAL**: Khai báo lại các chân GPIO trong file cấu hình board (`my_machine_header.h`) rồi biên dịch và nạp (flash) lại firmware bằng PlatformIO hoặc Arduino IDE.
  - **Với FluidNC (Khuyên dùng cho ESP32)**: **KHÔNG CẦN BIÊN DỊCH LẠI CODE**. Chỉ cần nạp firmware 1 lần, sau đó chỉnh sửa số chân GPIO trong file text `config.yaml` trực tiếp qua Web UI hoặc Serial.

---

## 4. Tín Hiệu & Lưu Ý Khi Nối Dây ESP32 Với Driver
* **Hỏi**: Chỉ cần xem code rồi đấu số PIN IO tương ứng cho mạch driver đúng không?
* **Trả lời**:
  - **Đúng**. Mỗi động cơ cần các tín hiệu:
    - **STEP**: Xuất xung bước.
    - **DIR**: Điều khiển chiều quay.
    - **ENABLE**: Bật/tắt driver (có thể nối chung 1 chân).
    - **GND**: **Bắt buộc nối chung GND** giữa ESP32, Driver và Nguồn động cơ.
  - ⚠️ **Lưu ý chân cấm/tránh trên ESP32**:
    - **Input-Only (Không xuất tín hiệu được)**: GPIO 34, 35, 36 (VP), 39 (VN) -> Chỉ dùng làm công tắc hành trình hoặc công tắc dừng khẩn.
    - **Strapping Pins (Ảnh hưởng khởi động)**: GPIO 0, 2, 5, 12, 15 -> Hạn chế dùng để tránh làm ESP32 bị treo lúc boot.
    - **Chân khuyên dùng**: GPIO 4, 13, 14, 16, 17, 18, 19, 21, 22, 23, 25, 26, 27, 32, 33.

---

## 5. Khả Năng Điều Khiển Của CNC Shield V3
* **Hỏi**: Mạch CNC Shield V3 điều khiển được tối đa mấy động cơ?
* **Trả lời**:
  - Có sẵn **4 khe cắm Driver** (X, Y, Z, A) $\rightarrow$ Điều khiển tối đa **4 Động cơ bước**.
  - **Chế độ 3 trục (4 động cơ)**: X, Y1, Y2 (clone từ Y), Z (Phổ biến cho máy CNC khung lớn).
  - **Chế độ 4 trục độc lập (4 động cơ)**: X, Y, Z, A (Cần nối chân riêng cho khe A).

---

## 6. Mạch Điều Khiển Nhiều Động Cơ Hơn (5 - 8 Động Cơ)
* **Hỏi**: Có mạch driver nào điều khiển được nhiều động cơ hơn không?
* **Trả lời**:
  - **Mạch 32-bit hiện đại (Marlin / Klipper / grblHAL)**:
    - **BigTreeTech Octopus (V1.1/Pro)**: 8 khe cắm driver độc lập.
    - **MKS Monster8**: 8 khe cắm driver.
    - **BTT SKR PRO V1.2**: 6 khe cắm driver.
    - **ESP32 6-Axis CNC Board**: Bo breakout cắm 6 driver cho ESP32.
  - **Mạch Arduino Mega 2560**: RAMPS 1.4 / 1.5 / 1.6 (5 khe driver: X, Y, Z, E0, E1).
  - **Mạch Breakout Board (BOB) Mach3 USB / Ethernet**: Có ngõ ra Pulse/Dir cho 5 - 6 trục để nối Driver công suất lớn rời (TB6600, DM542, DM556).

---

## 7. Ứng Dụng Với Drone (Flycam / Quadcopter)
* **Hỏi**: CNC Shield V3 / Grbl có dùng điều khiển Drone được không?
* **Trả lời**:
  - ❌ **KHÔNG NÊN / KHÔNG DÙNG ĐƯỢC CHỎ DRONE**:
    - **Động cơ bước (Stepper Motor)** nặng, quay chậm, dùng xung Step/Dir $\rightarrow$ Không thể cất cánh.
    - **Drone** cần động cơ không chổi than (**BLDC**) tốc độ cao, điều khiển bằng **ESC** (PWM/DShot) và cần bộ cảm biến cân bằng **IMU (MPU6050/BMI270)**.
  - ✅ **Tận dụng chip**: Chip ESP32 / STM32 thì CÓ THỂ làm bộ điều khiển bay (Flight Controller) cho Drone khi dùng phần mềm **Betaflight**, **INAV**, **ArduPilot**, **ESP-FC**.

---

## 8. Điều Khiển 5 Động Cơ BLDC (Không Chổi Than)
* **Hỏi**: Dùng mạch nào để điều khiển 5 động cơ BLDC?
* **Trả lời**:
  - **Loại 1: Tốc độ cao / Drone / Tàu ngầm (ESC Control)**:
    - Dùng 1 vi điều khiển (ESP32, STM32, Matek H743-WING) xuất 5 đường tín hiệu PWM/DShot.
    - Kết nối sang **5 mạch ESC rời** (hoặc 1 ESC 4-in-1 + 1 ESC đơn).
  - **Loại 2: Robot chính xác / Góc quay / Lực kéo (FOC Control)**:
    - Dùng **3 bo ODrive 3.6 / ODrive Pro** (mỗi bo điều khiển 2 BLDC FOC) kết nối qua giao thức **CAN Bus** về vi điều khiển chính (ESP32 / Raspberry Pi).
    - Hoặc dùng **3 bo VESC Dual** kết nối qua CAN Bus.

---

## 9. Tốc Độ Di Chuyển Tối Đa Của CNC Shield V3
* **Hỏi**: CNC Shield V3 tốc độ max di chuyển có bị hạn chế không?
* **Trả lời**:
  - Bản thân mạch in CNC Shield V3 **không giới hạn tốc độ**.
  - **Nút thắt cổ chai đến từ**:
    1. **Arduino Uno 8-bit**: Xung ngắt max chỉ $\approx 30\text{ kHz}$. Nếu vi bước cao hoặc dùng vít me bước nhỏ, tốc độ sẽ bị giới hạn nặng ($\text{Speed}_{max} = \frac{30.000 \times 60}{\text{Steps/mm}}$).
    2. **Điện áp nguồn**: Dùng nguồn 12V làm động cơ sụt mô-men nhanh ở tốc độ cao. Dùng **24V** sẽ giúp đẩy tốc độ max cao hơn 1.5 - 2 lần.
    3. **Tản nhiệt Driver**: Driver nhỏ (A4988) dễ bị quá nhiệt tự ngắt nếu chạy nhanh liên tục mà không có quạt.

---

## 10. Tải Trọng Xe 4 Bánh Dùng CNC Shield V3
* **Hỏi**: CNC Shield V3 có thể điều khiển 4 bánh xe ô tô mức tải trọng nào?
* **Trả lời**:
  - Dùng **4 động cơ Nema 17** (lực kéo $\approx 0.4\text{ Nm}$ mỗi con, phù hợp với dòng 1.2A - 1.5A của A4988/DRV8825):
    - **Nối trực tiếp vào bánh xe ($\Phi 65 - 80\text{mm}$)**: Tải trọng tổng (xe + hàng) khoảng **10 kg – 15 kg** trên mặt phẳng.
    - **Dùng qua Hộp số giảm tốc (1:5 / 1:10)**: Tải trọng nâng lên **20 kg – 40 kg** (nhưng tốc độ chậm đi 5-10 lần).
  - Nếu tải trọng nặng (> 50kg): Bắt buộc dùng vi điều khiển + **Driver rời công suất lớn (DM542, DM556)** + **Động cơ Nema 23 / Nema 34 hoặc Động cơ DC/BLDC**.

---

## 11. Encoder Và Vòng Lặp Kín (Closed-Loop)
* **Hỏi**: CNC Shield V3 có Encoder không?
* **Trả lời**:
  - **Không**. Mạch CNC Shield V3 không có Encoder và Grbl v1.1 trên Arduino Uno chạy vòng lặp mở (Open-loop), không đọc tín hiệu Encoder động cơ.
  - **Giải pháp**: Sử dụng **Bộ Động cơ bước vòng lặp kín (Closed-loop Stepper như MKS SERVO42C)**. Mạch đít động cơ tự đọc Encoder và tự sửa bước. Tín hiệu nối về CNC Shield V3 vẫn chỉ là 2 dây `STEP` và `DIR` tiêu chuẩn.

---

## 12. Nguyên Lý Quản Lý Vị Trí Của Động Cơ Bước
* **Hỏi**: Thực tế di chuyển của động cơ bước hoàn toàn phải lưu trên phần mềm vị trí start, rồi tính toán tương đối trên đó?
* **Trả lời**:
  - **ĐÚNG**. Động cơ bước không có trí nhớ vị trí tuyệt đối khi mới bật nguồn.
  - Vi điều khiển quản lý vị trí bằng **biến đếm xung tương đối trong RAM** (`Position = Position ± 1`).
  - **Homing (`$H`)**: Động cơ di chuyển về đụng công tắc hành trình (Limit Switch) để reset biến vị trí về đúng mốc `(0,0,0)` chuẩn (Machine Zero).
  - **Khuyết điểm**: Nếu bị cản hay vướng vật cản làm trượt bước, phần mềm vẫn cộng xung $\rightarrow$ Dẫn đến lệch tọa độ thực tế và phần mềm (**Mất bước - Lost Steps**).

---

## 13. Khắc Phục Khi Động Cơ Bước Bị Cản / Kẹt
* **Hỏi**: Cách khắc phục khi dùng động cơ bước với CNC Shield V3 bị cản?
* **Trả lời**:
  1. **Nâng cấp Động cơ bước Vòng lặp kín (MKS SERVO42C)**: Tự tăng dòng khi gặp cản nhẹ, tự phát Alarm ngắt máy khi bị cản quá mạnh $\rightarrow$ Không bao giờ lệch tọa độ âm thầm.
  2. **Dùng Driver TMC2209 (StallGuard)**: Phát hiện kẹt tải qua chân `DIAG`, nối về chân E-STOP để dừng khẩn cấp.
  3. **Tăng điện áp nguồn lên 24V**: Giúp động cơ giữ mô-men tốt hơn ở tốc độ cao.
  4. **Tăng Vref Driver & Giảm Vi bước**: Chỉnh Vref lên 0.8V-1.0V (kèm quạt), giảm vi bước từ 1/16 xuống 1/8 hoặc 1/4 để tăng lực kéo.
  5. **Giảm gia tốc trong Grbl**: Giảm tham số gia tốc (`$120, $121, $122`) để động cơ tăng tốc êm hơn, dễ vượt cản.
