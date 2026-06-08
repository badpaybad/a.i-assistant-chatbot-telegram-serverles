# Sơ đồ cấu tạo và điều khiển UAV

## 1. Sơ đồ thiết kế vật lý UAV

### Góc nhìn từ trên xuống (Top View)

```text
                                  MŨI UAV (HƯỚNG TIẾN)
                                            ▲
                                            │
                    [Cánh tay đòn Trái]     │     [Cánh tay đòn Phải]
                     ┌──────────────────────┼──────────────────────┐
                     │                      │                      │
                ┌────┴────┐           ┌───────────┐           ┌────┴────┐
                │ SERVO 1 │           │  CỤM GIỮA │           │ SERVO 2 │ <── Xoay góc 0 - 180°
                └────┬────┘           │ (Đồng trục│           └────┬────┘
                     │                │ Đồng tốc) │                │
                ┌────┴────┐           └─────┬─────┘           ┌────┴────┐
                │ MOTOR 3 │ <─Quạt phụ      │                 │ MOTOR 4 │ <─Quạt phụ
                └─────────┘   (Trái)        │                 └─────────┘   (Phải)
                                            │
                                            │
                                        ĐUÔI UAV (HƯỚNG LÙI)
```

---

### Góc nhìn chính diện phía trước (Front View) - Trạng thái VTOL (Cất cánh / Giữ độ cao)

```text
                                     [Trục trung tâm cố định]
                                               │
                                       ┌───────┴───────┐
                                 ▲     │ ┌───────────┐ │     ▲
                     Gió thổi   │ │    │ │  MOTOR 1  │ │    │ │   Gió thổi
                     xuống đất  │ │    │ │ (Quay CW) │ │    │ │   xuống đất
                                 ▼     │ └─────┬─────┘ │     ▼
                    ┌──────────────┐   │   ┌───┴───┐   │   ┌──────────────┐
                    │ CÁNH PHỤ TRÁI│   │   │ CÁNH  │   │   │ CÁNH PHỤ PHẢI│ (Servo 1 & 2 xoay
                    └──────────────┘   │   │ TRÊN  │   │   └──────────────┘  trục chúc thẳng
                    ┌──────────────┐   │   └───────┘   │   ┌──────────────┐  xuống 90 độ)
                    │   MOTOR 3    │   │               │   │   MOTOR 4    │
                    └──────┬───────┘   │   ┌───────┐   │   └──────┬───────┘
                           │           │   │ CÁNH  │   │          │
                     ┌─────┴─────┐     │   │ DƯỚI  │   │    ┌─────┴─────┐
                     │  SERVO 1  │     │   └───┬───┘   │    │  SERVO 2  │
                     └─────┬─────┘     │ ┌─────┴─────┐ │    └─────┬─────┘
                           │           │ │  MOTOR 2  │ │          │
                           │           │ │ (Quay CCW)│ │          │
                           │           │ └───────────┘ │          │
                    ───────┴───────────┴───────┬───────┴──────────┴─────── [Cánh tay đòn carbon]
                                               │
                                         ┌─────┴─────┐
                                         │   KHUNG   │ ───> Nơi đặt Arduino Nano, Pin LiPo,
                                         │   TRUNG   │      Mạch nRF24L01 nhận tín hiệu từ
                                         │   TÂM     │      Bàn đạp chân ga & Tay Joystick
                                         └───────────┘
```

---

### Bàn điều khiển chính (Manual Control - Đặt trên bàn, dùng 2 tay 2 chân)

```text
                    [JOYSTICK TRÁI]                                    [JOYSTICK PHẢI]
                    (Tay trái lo Hướng)                            (Tay phải lo Di chuyển)
                    
                             ▲ Xoay Trái                                     ▲ Lao Tiến
                             │                                               │
                     ◄───────┼───────►                               ◄───────┼───────►
                    Nghiêng  │  Nghiêng                             Bay      │  Bay
                    Trái     ▼  Phải                                Trái     ▼  Lùi
                        Xoay Phải                                       Bay Phải
                        
                (Dùng để điều chỉnh                              (Dùng để di chuyển không gian
                    hướng mũi UAV Đông-Tây)                          hoặc thực hiện cú Lật bụng)

                [CHÂN TRÁI - PHANH]                     [CHÂN PHẢI - GA NÂNG HẠ]
                    ┌───────────────────────┐                ┌───────────────────────┐
                    │    BÀN ĐẠP PHANH CHÂN │                │    BÀN ĐẠP CHÂN GA    │
                    │     (AIR BRAKE PEDAL) │                │    (THROTTLE PEDAL)   │
                    │                       │                │                       │
                    │          ▲            │                │          ▲            │
                    │         ╱ ╲           │                │         ╱ ╲           │
                    │        ╱   ╲          │                │        ╱   ╲          │
                    │       ╱  ▲  ╲         │                │       ╱  ▲  ╲         │
                    │      ╱   │   ╲        │                │      ╱   │   ╲        │
                    │     ╱    │    ╲       │                │     ╱    │    ╲       │
                    └────┴─────┴─────┴──────┘                └────┴─────┴─────┴──────┘
                    Đạp xuống: Kích hoạt PHANH               Đạp xuống: TĂNG ĐỘ CAO
                    Nhả chân:  Bay bình thường               Nhả chân:  GIẢM ĐỘ CAO / HẠ CÁNH
```

---

## 2. Hệ thống điều khiển tự động (Auto Control)

Khi gạt công tắc chuyển trạng thái sang **AUTO**, toàn bộ quyền can thiệp cơ học từ phần cứng Trạm mặt đất sẽ bị ngắt hoàn toàn. Hệ thống tự động ánh xạ thông số cảm biến để mô phỏng chính xác hành vi lái của con người:

| Cơ cấu tay / chân thủ công (GCS) | Cảm biến thay thế trên UAV | Thuật toán Auto xử lý (Mô phỏng hành vi) |
| :--- | :--- | :--- |
| **Chân phải:** Bàn đạp chân ga nâng hạ | Cảm biến áp suất (Barometer) + Lidar quét đất | **PID Độ cao (Altitude PID):** Tự động giữ cụm đồng trục giữa ở mức ga treo (Hover), tăng ga cất cánh hoặc giảm dần ga để đáp. |
| **Joystick phải (Dọc):** Tiến / Lùi | Module GPS + IMU (Đo vận tốc thực) | **PID Vị trí (Position PID):** Tính khoảng cách tới đích. Khoảng cách càng xa, tự động quét 2 Servo sườn ra sau càng sâu. |
| **Joystick phải (Ngang):** Nghiêng sườn / Lật bụng | Cảm biến góc nghiêng (Gyro/Accel 6 trục) | **PID Thăng bằng (Attitude PID):** Liên tục kiểm tra góc Roll. Tự động bù vi sai ga cho Motor 3 & 4 để ghìm UAV chống gió tạt. |
| **Joystick trái (Dọc):** Xoay hướng mũi tàu (Yaw) | Cảm biến La bàn số (Magnetometer) | **PID Hướng mũi (Heading PID):** Tính góc lệch giữa mũi tàu và Đích, tự động bẻ Servo 1 & 2 nghiêng ngược chiều nhau để xoay hướng. |
| **Chân trái:** Bàn đạp Phanh khẩn cấp | GPS (Tốc độ) + Lidar (Khoảng cách đích) | **Thuật toán Phanh chủ động:** Tự động ngắt ga phụ $\rightarrow$ quét servo về $0^\circ$ $\rightarrow$ thốc 100% ga quạt phụ hãm quán tính khi sắp tới đích. |

# BẢNG CẤU HÌNH PHẦN CỨNG ĐÁP ỨNG THỜI GIAN BAY 1 TIẾNG (60 PHÚT)

Bảng đặc tả này áp dụng riêng cho cấu hình UAV Lai (Hybrid Coaxial-Tricopter: Cụm nâng đồng trục trung tâm kết hợp 2 quạt phụ điều hướng xoay trục sườn).

---

## 1. Bảng Tổng Hợp Cấu Hình Phần Cứng Theo Tải Trọng (Payload)

| Tải trọng (Payload) | Tổng trọng lượng cất cánh (Ước tính) | Cụm đồng trục giữa (Lực nâng chính) | Cánh quạt giữa (Carbon) | 2 Quạt phụ hai bên sườn (Điều hướng) | Cánh quạt phụ | Mạch điều tốc (ESC) | Giải pháp nguồn năng lượng (Quyết định thời gian bay 60 phút) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **0.5 kg** | $\approx$ 1.8 kg | 2x Motor 3508 hoặc 4108 (380KV - 400KV) | 1447 hoặc 1555 (14 - 15 inch) | 2x Motor 1404 hoặc 1503 (2500KV) | 3 - 4 inch | 4x ESC 30A BLHeli_32 | **Thuần điện tử (Li-Ion):** Pack pin 4S3P (14.8V) đóng từ 12 cell Li-Ion 21700 Molicel P45B hoặc Samsung 50S. Dung lượng: 13.500 mAh. Trọng lượng pin: ~0.85kg. |
| **1.0 kg** | $\approx$ 3.8 kg | 2x Motor 4114 hoặc 5010 (300KV - 340KV) | 1655 hoặc 1758 (16 - 17 inch) | 2x Motor 2204 (1400KV) | 6 inch | 4x ESC 40A - 50A | **Thuần điện tử (Li-Ion):** Pack pin 6S4P (22.2V) đóng từ 24 cell Li-Ion 21700 chuyên dụng. Dung lượng: 18.000 mAh - 20.000 mAh. Trọng lượng pin: ~1.7kg. |
| **5.0 kg** | $\approx$ 10 kg | 2x Motor công nghiệp 8108 (100KV - 135KV) | 2808 hoặc 3010 (28 - 30 inch) | 2x Motor 4114 (400KV) | 15 inch | 4x ESC 80A - 100A High-Voltage | **Hệ thống Lai (Xăng pha Điện):** Bộ máy phát điện UAV Hybrid Generator chạy xăng 2 thì/V2, công suất 3KW - 4KW. Bình xăng: 3.5 - 4 lít. Kết hợp 1 viên LiPo 6S 3300mAh làm đệm áp. |
| **10.0 kg** | $\approx$ 22 kg | 2x Motor siêu khủng 10010 hoặc U15 (80KV - 100KV) | 3211 hoặc 3612 (32 - 36 inch) | 2x Motor 6215 (170KV) | 22 inch | 4x ESC 120A - 150A High-Voltage | **Hệ thống Lai (Xăng pha Điện):** Bộ máy phát điện UAV Hybrid Generator chạy xăng công suất lớn 6KW - 8KW. Bình xăng: 6.5 - 8 lít. Kết hợp 1 viên LiPo 12S 3300mAh làm nguồn đệm chống sụt áp. |

---

## 2. Các Lưu Ý Kỹ Thuật Đặc Thù Khi Bay Tải Nặng Liên Tục 1 Tiếng

### 2.1. Giới Hạn Của Công Nghệ Nguồn Năng Lượng
* **Dưới 2kg tổng tải (0.5kg - 1kg):** Tuyệt đối không dùng pin LiPo thương mại thông thường vì mật độ năng lượng thấp (Energy Density), pin sẽ bị quá nhiệt và tụt áp sau 20-25 phút. Bắt buộc phải tự đóng Pack pin bằng **Cell Li-Ion 21700** dòng xả cao nhằm tối ưu tỷ lệ Dung lượng / Trọng lượng.
* **Trên 5kg tổng tải (5kg - 10kg):** Trọng lượng pin tỷ lệ thuận để duy trì 1 tiếng sẽ vượt quá lực nâng khả dụng của motor (Hiệu ứng bão hòa trọng lượng pin). Giải pháp duy nhất là sử dụng **Bộ máy phát điện chạy xăng (Hybrid Generator)**. Xăng có mật độ năng lượng gấp hàng chục lần pin, và máy bay sẽ nhẹ dần (bay tiết kiệm điện hơn) ở nửa cuối hành trình khi xăng cạn dần.

### 2.2. Nâng Cấp Hệ Thống Servo Sườn (Tilt-Rotor Servo)
Khi thời gian bay kéo dài liên tục 60 phút, hệ thống Servo sườn phải liên tục gồng mình giữ góc và chịu rung động từ motor phụ.
* **Cấp tải 0.5kg - 1kg:** Sử dụng Servo nhông kim loại điện tử (Digital Metal Gear) có lực kéo $>15\text{kg/cm}$ như dòng **Kingmax** hoặc **TD-8120MG**, có vỏ nhôm giải nhiệt (`Aluminium Heatsink`).
* **Cấp tải 5kg - 10kg:** Bắt buộc sử dụng **Servo Công Nghiệp Không Chổi Than (Industrial Brushless Servo)** có lực ghì lớn từ $40\text{kg/cm}$ đến $70\text{kg/cm}$ kết hợp vòng bi gối đỡ chịu lực bên ngoài để tránh hiện tượng rơ lắc hoặc om cuộn dây dẫn đến cháy Servo giữa không trung.


```text


[MŨI VÒNG KHUNG TRÒN]
                                   ┌───────┐
                              ┌────┘       └────┐
                            ┌─┘   Luồng gió vào └──┐
                            │      (Hút xuyên)     │
       ┌────────────────────┼──────────────────────┼────────────────────┐
       │   [QUẠT PHỤ TRÁI]  │    ┌───────────┐     │  [QUẠT PHỤ PHẢI]   │
       │                    │    │ CỤM GIỮA  │     │                    │
       │     (Nhô ra)       │    │ Đồng trục │     │     (Nhô ra)       │
       └────────────────────┼────┴─────┬─────┴─────┼────────────────────┘
                            │          │           │
                            │      Vỏ Khung Lưới   │ <── Sợi Carbon / Nhựa in 3D
                            │      Thoát Khí   │     (Lỗ tổ ong lớn)
                            └─┐                 ┌─┘
                              └───┐         ┌───┘
                                  │ ┌─────┐ │
                                  └─┤KHUNG├─┘
                                    │TRUNG│
                                    │ TÂM │
                                    └──┬──┘
                                       │
                              ┌────────┴────────┐
                              ▼                 ▼
                         [CHÂN ĐÁP 1]      [CHÂN ĐÁP 2]  <── Khung 3 chân dạng kiềng
                        (Có giảm chấn)    (Có giảm chấn)     (Chân 3 nằm phía sau)


```
