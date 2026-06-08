====================================================================================
GÓC NHÌN TỪ TRÊN XUỐNG (TOP VIEW)
====================================================================================

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


====================================================================================
GÓC NHÌN CHÍNH DIỆN PHÍA TRƯỚC (FRONT VIEW) - Trạng thái VTOL (Cất cánh/Giữ độ cao)
====================================================================================


                                    [Trục trung tâm cố định]
                                            │
                                    ┌───────┴───────┐
                                ▲     │ ┌───────────┐ │     ▲
                    Gió thổi   │ │    │ │  MOTOR 1  │ │    │ │   Gió thổi
                    xuống đất  │ │    │ │ (Quay CW) │ │    │ │   xuống đất
                                ▼      │ └─────┬─────┘ │      ▼
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
                                        │   TÂM    │      Bàn đạp chân ga & Tay Joystick
                                        └───────────┘


====================================================================================
MANUAL BÀN ĐIỀU KHIỂN CHÍNH (ĐẶT TRÊN BÀN - DÙNG 2 TAY 2 CHÂN)
====================================================================================


                    [JOYSTICK TRÁI]                                    [JOYSTICK PHẢI]
                    (Tay trái lo Hướng)                            (Tay phải lo Di chuyển)
                    
                            ▲ Xoay Trái                                    ▲ Lao Tiến
                            │                                              │
                    ◄───────┼───────►                              ◄───────┼───────►
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


====================================================================================
AUTO ĐIỀU KHIỂN BẰNG THUẬT TOÁN
====================================================================================

### Bảng Chuyển Đổi Từ Cơ Cấu Thủ Công Sang Hệ Thống Tự Động Trên UAV

| Cơ cấu tay / chân thủ công (GCS) | Cảm biến thay thế trên UAV | Thuật toán Auto xử lý (Mô phỏng hành vi) |
| :--- | :--- | :--- |
| **Chân phải:** Bàn đạp chân ga nâng hạ | Cảm biến áp suất (Barometer) + Lidar quét đất | **PID Độ cao (Altitude PID):** Tự động giữ cụm đồng trục giữa ở mức ga treo (Hover), tăng ga cất cánh hoặc giảm dần ga để đáp. |
| **Joystick phải (Dọc):** Tiến / Lùi | Module GPS + IMU (Đo vận tốc thực) | **PID Vị trí (Position PID):** Tính khoảng cách tới đích. Khoảng cách càng xa, tự động quét 2 Servo sườn ra sau càng sâu để tăng tốc. |
| **Joystick phải (Ngang):** Nghiêng sườn / Lật bụng | Cảm biến góc nghiêng (Gyro/Accel 6 trục) | **PID Thăng bằng (Attitude PID):** Liên tục kiểm tra góc Roll. Tự động bù vi sai ga cho Motor 3 & 4 để ghìm UAV chống gió tạt sườn. |
| **Joystick trái (Dọc):** Xoay hướng mũi tàu (Yaw) | Cảm biến La bàn số (Magnetometer) | **PID Hướng mũi (Heading PID):** Tính góc lệch giữa mũi tàu và Đích, tự động bẻ Servo 1 & 2 nghiêng ngược chiều nhau để xoay hướng. |
| **Chân trái:** Bàn đạp Phanh khẩn cấp & Ghìm đất | GPS (Vận tốc) + Lidar (Khoảng cách) + Cảm biến chạm đất (Landing Gear Switch) | **Thuật toán Phanh & Ghìm nền chủ động:** <br>1. *Khi sắp tới đích:* Ngắt ga phụ $\rightarrow$ quét servo về $0^\circ$ $\rightarrow$ thốc 100% ga quạt phụ hãm quán tính.<br>2. *Khi cảm biến báo đã chạm đất:* Đảo chiều ESC động cơ phụ, **thổi ngược lên trời** tạo lực ép (Downforce) khóa chặt thân xe/máy bay xuống mặt đất. |

---

### Phân tích logic xử lý của "Thuật toán Ghìm đất"

Để thực hiện ý tưởng đảo chiều động cơ phụ tạo lực ép xuống mặt đất, cấu hình phần cứng và phần mềm ở hàng cuối cùng sẽ hoạt động theo kịch bản 3 giai đoạn nghiêm ngặt:

#### 1. Sơ đồ tuần tự điều khiển (Sequence Workflow)