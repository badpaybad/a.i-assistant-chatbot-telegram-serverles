# Báo Cáo & Hướng Dẫn Chi Tiết Tất Cả Các Tính Năng Đã Triển Khai Trong `cncapi`

Tài liệu này tổng hợp toàn bộ kiến trúc, giao diện Web UI, hệ thống REST API backend, thuật toán xử lý và các bước triển khai chi tiết đối chiếu theo yêu cầu tại [`cncapi/whattodo.md`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/whattodo.md) và mã nguồn thực tế tại [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py), [`cncapi/static/index.html`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/index.html), [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js).

---

## 1. Tổng Quan Kiến Trúc & Công Nghệ (System Architecture)

1. **Backend Service (`cncapi/main.py`)**:
   - **Framework**: Python 3 Asyncio + FastAPI + Uvicorn server (chạy tại cổng mặc định `8099`).
   - **Giao tiếp phần cứng**: PySerial đọc/ghi dữ liệu cổng Serial với mạch CNC GRBL, hỗ trợ cơ chế giả lập `DummySerial` cho phép thử nghiệm không cần phần cứng CNC.
   - **Truyền nhận Realtime**: WebSocket (`/ws`) và Giao thức đếm ký tự (Character-Counting Buffer Protocol, giới hạn 127 bytes) đảm bảo bộ đệm GRBL không bị tràn hoặc rơi rớt câu lệnh.
2. **Quản Lý Cấu Hình (`calibration_settings.json`)**:
   - Tự động nạp (`load_settings`) và lưu tức thì (`save_settings`) mọi thông số hệ thống, cổng Serial, tốc độ Feedrate, bước di chuyển `step_distance`, thời gian nhấn giữ `gesture_long_press_dwell`, chế độ bút Servo PWM / Z-axis, tọa độ gốc máy G53, tọa độ gốc làm việc G54, tọa độ điểm đỗ parking point, và 4 góc định vị khung `cnc_tl`, `cnc_tr`, `cnc_bl`, `cnc_br`.
3. **Đóng Gói Binary & Đa Nền Tảng (Cập nhật 15, 16, 17, 18)**:
   - **Tài nguyên tĩnh**: Sử dụng `sys._MEIPASS` tự động tương thích môi trường chạy PyInstaller freeze mode (`STATIC_DIR`).
   - **Cài đặt thư viện**: Thư viện khai báo đầy đủ tại [`cncapi/requirements.txt`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/requirements.txt) (`fastapi`, `uvicorn[standard]`, `pyserial`, `pydantic`, `pyinstaller`, `pillow`, `opencv-python`, `scikit-image`, `numpy`).
   - **Kịch bản Build**: `build_dist.sh` (Linux), `build_dist.bat` / `build_dist.ps1` (Windows), Workflow GitHub Actions (`.github/workflows/build_cncapi.yml` đóng gói tự động cho macOS, Windows và Linux).
   - **Tự động lọc cổng Serial theo OS**:
     - **Linux**: Ưu tiên `/dev/ttyACM*`, `/dev/ttyUSB*`.
     - **Windows**: Liệt kê cổng `COM1`, `COM3`... kèm mô tả thiết bị (`CH340`, `Arduino Uno`...).
     - **macOS**: Ưu tiên `/dev/tty.usbmodem*`, `/dev/cu.usbmodem*`.

---

## 2. Chi Tiết Các Tính Năng Đã Hoàn Thành Theo `whattodo.md`

### 2.1. Cấu Trúc Giao Diện Web UI (Chia 3 Hàng)

#### Hàng 0 (Cấu Hình Kết Nối, Spindle & Gốc Tọa Độ)
- **Cột 0**:
  - Chọn Cổng Serial & Baudrate (Mặc định `/dev/ttyACM0`, `115200`, hỗ trợ tự động nhận diện theo OS - Cập nhật 17).
  - Nút **Kết Nối CNC** / **Ngắt Kết Nối**.
  - Hiển thị Device ID máy CNC ngay tại header `Cấu Hình Kết Nối & Thông Tin CNC: {device_id}` thông qua lệnh `$GETID` khi kết nối thành công (Cập nhật 46).
  - Hiển thị Tọa độ Gốc máy (Machine Zero - G53 / `MPos` - Cập nhật 10), Tọa độ Gốc làm việc (Work Zero - G54 / `WPos`), Tọa độ tương đối so với gốc phôi & gốc làm việc, Tọa độ Điểm đỗ (Parking Point).
- **Cột 1**:
  - Cấu hình Chế độ Bút/Spindle (`pen_mode`: `spindle-pwm` hoặc `z-axis`).
  - Vị trí/Góc Servo PWM khi Nhấc bút (`pen_up_pwm` / `pen_up_z`) và Hạ bút (`pen_down_pwm` / `pen_down_z`), Thời gian trễ hạ bút (`pen_dwell`).
  - Ô nhập Tốc độ Feedrate (`jog_feedrate`), Bước di chuyển (`step_distance` - Cập nhật 7, 13), Tốc độ vuốt (`swipe_feedrate`), Bước vuốt (`gesture_distance`), Tap dwell (`gesture_tap_dwell`), Long press dwell (`gesture_long_press_dwell`, mặc định 1.5s - Cập nhật 12).
  - Nút **Đặt gốc tọa độ làm việc (Work Zero - G54)**: Phát lệnh `G10 L20 P1 X0 Y0 Z0` xuống máy CNC và đánh dấu trạng thái `home_set = True`.
  - Nút **Di chuyển về gốc làm việc** (`G0 X0 Y0`) và Nút **Về điểm đỗ**.
  - Nút **Lưu cấu hình JSON local** và **Load cấu hình JSON local** (Cập nhật 7).
- **Cột 2**:
  - Đèn trạng thái kết nối realtime và nhãn trạng thái máy CNC.
  - Chọn ngôn ngữ đa ngôn ngữ i18n (`vi` Tiếng Việt / `en` English).

#### Hàng 1 (Bộ Di Chuyển, Tool Path View & Quản Lý Kịch Bản)
- **Cột 0 (Độ rộng 25%)**:
  - **Bộ Di Chuyển (Machine Jogging)**: Nút di chuyển 8 hướng (`X+`, `X-`, `Y+`, `Y-`, `Z+`, `Z-`, đường chéo).
  - **Cử Chỉ Touch & Swipe Gestures**: Các nút thao tác cử chỉ Tap, Double Tap, Long Press, Swipe Up, Swipe Down, Swipe Left, Swipe Right. Cử chỉ thực hiện trực tiếp tại vị trí đầu CNC đang đứng (Cập nhật 8), vuốt xong dừng không quay về gốc (Cập nhật 3).
  - **Khối Nút Mở G-Code Editors**: Nút **✍️ Gcode with font** (Cập nhật 19) và Nút **🖼️ Gcode with image** (Cập nhật 25) được bố trí ngay bên dưới vùng Cử chỉ Touch & Swipe Gestures (Cập nhật 30).
- **Cột 1 (Độ rộng 50%)**:
  - **Tool Path View Canvas (`#toolpath-canvas`)**:
    - Vẽ xem trước các đường nét di chuyển của kịch bản, nét chữ font hoặc ảnh sketch.
    - Vẽ đường mờ tracking hành trình di chuyển thực tế của đầu CNC và vị trí đầu bút hiện tại (`WPos` - Cập nhật 4).
    - Hỗ trợ cấu hình hướng trục X/Y (`axis_dir_x`, `axis_dir_y` - Cập nhật 6) và tỷ lệ quy đổi `1px = ? mm` (`mm_per_px`, mặc định 0.5 mm/px - Cập nhật 5, 9).
    - **Click chuột lên Canvas để di chuyển đầu CNC** (Cập nhật 5): Quy đổi tọa độ pixel click trên canvas thành tọa độ làm việc thực tế của máy CNC để đưa đầu bút tới đúng vị trí.
    - **Vẽ Khung Làm Việc 4 Điểm** (Cập nhật 14): Cho phép set 4 góc `cnc_tl`, `cnc_tr`, `cnc_bl`, `cnc_br` để vẽ khung viền làm việc ngoài đời thực lên Tool Path View Canvas.
- **Cột 2 (Độ rộng 25%)**:
  - **Quản Lý & Phím Kịch Bản (Scenario Session - Cập nhật 1)**:
    - Các nút thêm bước: `set begin`, `go to here`, `pen down`, `pen up`, `tap`, `double tap`, `long press`, `swipe up`, `swipe down`, `swipe left`, `swipe right`, `dwell`, `set end`. Nút `set begin` và `set end` tự động nhấc dao trước khi di chuyển.
    - Cho phép chỉnh sửa lại thứ tự bước, ghim vị trí insert bước (`pin`), xóa từng bước hoặc xóa toàn bộ.
    - Kiểm tra điều kiện bắt buộc: Khi chưa set gốc tọa độ làm việc (`home_set == False`), click vào sẽ hiển thị cảnh báo yêu cầu Đặt gốc tọa độ làm việc trước.
    - Các nút vận hành: **Chạy Kịch Bản**, **Chạy Lặp (Loop)**, **Dừng Kịch Bản**, **Tải Về File JSON**, **Nạp File JSON**.

#### Hàng 2 (Cửa Sổ Console Serial)
- Hiển thị nhật ký câu lệnh hai chiều: Chiều OUT (Lệnh gửi đi) và chiều IN (Phản hồi `ok`, `error`, telemetry status `<...>`).
- Thông tin bản quyền Copyright @ 2026.

---

### 2.2. Hệ Thống RESTful Web API Prefix `/cncapi/v1/...` (Cập nhật 11)

Toàn bộ các chức năng điều khiển CNC, quản lý cấu hình và kịch bản đã được đóng gói thành các Web API độc lập tại backend server `cncapi/main.py`, cho phép bất kỳ ứng dụng thứ ba nào (hoặc Mobile App / Script bên ngoài) tương tác trực tiếp:

| Nhóm chức năng | HTTP Method | Endpoint URL | Mô tả / Chức năng |
| :--- | :--- | :--- | :--- |
| **Kết nối** | `GET` | `/cncapi/v1/connection/ports` | Liệt kê danh sách cổng Serial khả dụng theo OS (Cập nhật 17) |
| | `POST` | `/cncapi/v1/connection/connect` | Kết nối vào cổng Serial hoặc Chế độ giả lập `dummy` |
| | `POST` | `/cncapi/v1/connection/disconnect` | Ngắt kết nối cổng Serial |
| **Cấu hình** | `GET` | `/cncapi/v1/settings` | Đọc toàn bộ cấu hình hệ thống hiện tại |
| | `POST` | `/cncapi/v1/settings` | Cập nhật & lưu cấu hình hệ thống vào JSON |
| **Di chuyển** | `POST` | `/cncapi/v1/motion/jog` | Di chuyển đầu CNC theo hướng và bước |
| | `POST` | `/cncapi/v1/motion/move_to` | Di chuyển tuyệt đối tới tọa độ `(X, Y, Z)` |
| | `POST` | `/cncapi/v1/motion/pen` | Điều khiển nhấc bút (`up`) hoặc hạ bút (`down`) |
| | `POST` | `/cncapi/v1/motion/stop` | Dừng khẩn cấp, reset buffer & nhấc bút an toàn |
| | `POST` | `/cncapi/v1/motion/stop-and-return` | Dừng khẩn cấp, nhấc dao & quay về gốc quy định (Cập nhật 29) |
| **Cử chỉ** | `POST` | `/cncapi/v1/gestures/execute` | Thực thi Tap, Double Tap, Long Press, Swipe Up/Down/Left/Right... |
| **Gốc tọa độ** | `POST` | `/cncapi/v1/origin/set_work` | Thiết lập Gốc tọa độ làm việc (G54 / G10 L20 P1) |
| | `POST` | `/cncapi/v1/origin/goto_work` | Di chuyển đầu CNC về gốc làm việc `(0,0)` |
| | `POST` | `/cncapi/v1/origin/set_parking` | Cài đặt tọa độ Điểm đỗ rút dao |
| | `POST` | `/cncapi/v1/origin/goto_parking` | Rút dao di chuyển về Điểm đỗ |
| | `GET` / `DELETE`| `/cncapi/v1/origin/bounds` | Quản lý & Xóa 4 điểm góc khung (`tl, tr, bl, br` - Cập nhật 14) |
| | `POST` | `/cncapi/v1/origin/set_bound_point` | Thiết lập từng điểm góc khung (`tl`, `tr`, `bl`, `br` - Cập nhật 14) |
| | `POST` | `/cncapi/v1/origin/home` | Gửi lệnh Home `$H` (Cập nhật 32) |
| | `POST` | `/cncapi/v1/origin/unlock` | Gửi lệnh Unlock Alarm `$X` (Cập nhật 32) |
| | `POST` | `/cncapi/v1/origin/enable_homing` | Bật Homing `$22=1` trong GRBL (Cập nhật 32) |
| | `POST` | `/cncapi/v1/origin/disable_homing` | Tắt Homing `$22=0` trong GRBL (Cập nhật 32) |
| | `GET` / `POST` | `/cncapi/v1/origin/homing_direction` | Tra cứu / Cài đặt mask chiều Homing `$23` (Cập nhật 33) |
| **Kịch bản** | `GET` | `/cncapi/v1/scenario/session` | Lấy thông tin phiên kịch bản hiện tại |
| | `POST` | `/cncapi/v1/scenario/session/create` | Khởi tạo phiên kịch bản mới |
| | `POST` | `/cncapi/v1/scenario/session/add_step` | Thêm bước kịch bản theo tọa độ WPos tương đối |
| | `GET` / `DELETE`| `/cncapi/v1/scenario/session/steps` | Xem danh sách bước hoặc Xóa bước kịch bản |
| | `POST` | `/cncapi/v1/scenario/session/reorder` | Sắp xếp lại thứ tự các bước kịch bản |
| | `POST` | `/cncapi/v1/scenario/session/pin` | Ghim vị trí chèn bước tiếp theo |
| | `GET` | `/cncapi/v1/scenario/session/gcode` | Biên dịch toàn bộ kịch bản ra chuỗi G-code |
| | `POST` | `/cncapi/v1/scenario/session/run` | Chạy kịch bản (hỗ trợ tham số `loop: true/false`) |
| | `POST` | `/cncapi/v1/scenario/session/stop` | Dừng chạy kịch bản |
| | `GET` / `POST` | `/cncapi/v1/scenario/session/export` | Export / Import file JSON kịch bản |
| **Font G-code**| `GET` | `/cncapi/v1/fonts` | Liệt kê các font chữ khả dụng trong thư mục `fonts/` |
| | `POST` | `/cncapi/v1/generate-font-gcode` | Sinh mã G-code nét chữ 1 nét / contour theo Font |
| | `POST` | `/cncapi/v1/run-gcode` | Thực thi mã G-code trực tiếp lên máy CNC |
| **Image G-code**| `POST` | `/cncapi/v1/convert-image-gcode` | Chuyển đổi ảnh/SVG/Gcode thành nét sketch & G-code (Cập nhật 25) |
| **Visualizer** | `GET` | `/cncapi/v1/state` | Đọc toàn bộ trạng thái telemetry + kịch bản |
| | `GET` | `/cncapi/v1/visualizer/segments` | Trả danh sách các phân đoạn nét vẽ phục vụ UI Canvas |

---

### 2.3. Tính Năng "Gcode with font" (Cập nhật 19, 20, 21, 22, 23, 24, 28)

1. **Cửa Sổ Floating Panel góc phải 33% width**: Mở dạng cửa sổ cố định không che lấp Tool Path View Canvas ở trung tâm.
2. **Đầy đủ 17 Thuộc Tính Cấu Hình Nâng Cao (`FontGcodeRequest`)**:
   - `font_name`: Chọn file font chữ (`.ttf`, `.otf`).
   - `text`: Nội dung văn bản vẽ (hỗ trợ xuống dòng `\n`).
   - `font_size_pt`: Cỡ chữ pt (Mặc định `72 pt`).
   - `line_spacing`: Tỷ lệ cách dòng (Mặc định `1.2x` - Cập nhật 20).
   - `line_spacing_mm`: Khoảng cách dòng bổ sung tính bằng mm (Mặc định `0.0 mm` - Cập nhật 21).
   - `feed_rate`: Tốc độ di chuyển nét vẽ mm/phút (Mặc định `4000`).
   - `stroke_mode`: Chế độ nét chữ (`single_line` 1 nét hoặc `contour` viền chữ).
   - `z_safe`: Vị trí/Góc Servo PWM khi nhấc bút (Mặc định `0.0`).
   - `z_draw`: Vị trí/Góc Servo PWM khi hạ bút vẽ (Mặc định `45.0`).
   - `pen_mode`: Chế độ điều khiển bút (`spindle-pwm` hoặc `z-axis`).
   - `axis_dir_y`: Hướng trục Y (`1` hoặc `-1` Cartesian).
   - `epsilon`: Độ mịn xấp xỉ đường cong `cv2.approxPolyDP` (Mặc định `1.2`).
   - `margin_mm`: Lề lùi viền xung quanh khung chữ (Mặc định `5.0 mm`).
   - `binary_threshold`: Ngưỡng phân tách nhị phân (Mặc định `128`).
   - `render_dpi`: Độ phân giải render font (Mặc định `600 DPI`).
   - `min_path_len_mm`: Ngưỡng lọc rác nhiễu nét quá ngắn (Mặc định `0.5 mm`).
   - `sort_row_height_mm`: Độ cao nhóm hàng gom nét chữ (Mặc định `10.0 mm`).
3. **Thuật Toán Sắp Xếp Nét Chữ Xuôi Từ Trái Sang Phải (Strict Left-to-Right - Cập nhật 24)**:
   - Phân chia nhóm dòng chữ (`line_idx`) chính xác dựa theo chiều cao thực tế `line_height_mm`.
   - Đảo ngược chiều từng nét stroke để luôn di chuyển xuôi chiều Left-to-Right và Top-to-Bottom.
   - Sắp xếp thứ tự ưu tiên tuyệt đối theo tọa độ `min_x` từ nhỏ đến lớn trong cùng 1 dòng văn bản, loại bỏ hoàn toàn hiện tượng nhảy nét chữ ngắn/cao, giúp máy CNC vẽ tự nhiên 100% như tay người viết chữ.
4. **Hạ Bút Chuẩn Xác & Bộ Truyền Đếm Ký Tự (Cập nhật 22)**:
   - Tự động biên dịch câu lệnh di chuyển Z thành lệnh Servo PWM `M3 S<pen_down_pwm>` / `M3 S<pen_up_pwm>` thông qua `translate_command`.
   - Nạp chuỗi G-code vào `gcode_streamer_task` theo Giao thức đếm ký tự 127 bytes, đảm bảo không bị tràn bộ nhớ GRBL và hạ bút vẽ chuẩn xác.
   - Tự động cộng offset vị trí làm việc hiện tại `curWpos` (`offsetX`, `offsetY`) khi bấm **🚀 Vẽ trên CNC**.
5. **Lưu & Nạp Project JSON (Cập nhật 28)**:
   - Hỗ trợ nút **💾 Lưu Project JSON** và **📂 Nạp Project JSON** lưu trữ đầy đủ 15+ thông số font, chuỗi G-code và danh sách nét xem trước.

---

### 2.4. Tính Năng "Gcode with image" (Cập nhật 25)

1. **Giao Diện Floating Panel (`#gcode-image-editor-panel`)**:
   - Mở cửa sổ góc phải 33% width không che Tool Path View Canvas.
   - Nút mở `🖼️ Gcode with image` nằm ở Cột 0 bên dưới khối Cử chỉ Touch & Swipe Gestures (Cập nhật 30).
2. **Các Helper Module Backend Độc Lập (`cncapi/`)**:
   - `cncapi/image2gcodesketch.py`: Thuật toán `maximum_detail_sketch` trích xuất sketch hình khối chi tiết tối đa.
   - `cncapi/image2gcode.py`: Chuyển ảnh thành G-code đơn nét, chữ viết tay (`handwriting_text_to_gcode`) hỗ trợ các mode: Centerline, Potrace Bezier, Outline, Concentric Fill, Raster Scanline, Local Raster, Cross-Hatch.
   - `cncapi/svg2gcode.py`: Biên dịch file vector SVG thành G-code nét vẽ.
   - `cncapi/OutlineExtractorPen.py`: Trích xuất đường viền nét bút.
3. **Endpoint Backend API**:
   - `POST /cncapi/v1/convert-image-gcode` (và alias `/api/gcode-editor/convert`): Nhận file upload (`.png`, `.jpg`, `.jpeg`, `.webp`, `.svg`, `.gcode`, `.nc`, `.cnc`, `.txt`) cùng thông số thuật toán, sinh mã G-code và danh sách các phân đoạn nét vẽ `segments` (`[{"x1", "y1", "x2", "y2"}, ...]`).
4. **Vận Hành Trên UI Canvas & CNC Thật**:
   - **Hiển thị xem trước**: Vẽ các đường nét sketch `segments` trực tiếp lên Tool Path View Canvas.
   - **Nút 🎬 Vẽ xem trước**: Chạy mô phỏng chuyển động nét vẽ ảnh trên Canvas.
   - **Nút 🚀 Vẽ trên CNC**: Tự động cộng offset `curWpos` và nạp bộ đệm streamer gửi mã G-code thực thi trên máy CNC thật.
   - **Lưu/Load Project**: Xuất và nhập project JSON lưu trữ ảnh base64, thông số và G-code.

---

### 2.5. Preset Sketch Chân Dung Cosplay (Cập nhật 26)

1. **Phân Tích Cấu Hình Chuẩn Tối Ưu Tấm Ảnh Cosplay/Chân Dung**:
   - Dựa theo file [`cncapi/project_2 cosplay.json`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/project_2%20cosplay.json), trích xuất các giá trị tham số thuật toán `sketch`:
     - `scale_factor`: `0.15` (Tỷ lệ mm/px tiêu chuẩn vẽ chân dung).
     - `feed_rate`: `2000` mm/phút.
     - `clahe_clip_limit`: `1.0` (Giữ cân bằng độ tương phản mịn).
     - `blur_size`: `9` (Khử hạt nhiễu cơ học tối ưu cho da & tóc).
     - `min_contour_len`: `18` (Lọc nhiễu đốm mực nhỏ).
     - `use_thin`: `false` (Uncheck ép mỏng 1px, giữ nguyên nét vẽ tự nhiên cho ảnh chân dung).
     - `use_clahe`, `use_blur`, `use_connect`, `use_len_filter`: `true`.
2. **Preset UI & Tự Động Nạp Config**:
   - Thêm lựa chọn `Sketch Chân Dung (Portrait Preset - Cosplay)` trong dropdown Thuật Toán Chuyển Đổi (`#image-algorithm-select`).
   - Tự động điền các thông số chuẩn vào giao diện khi người dùng chuyển sang preset này.

---

### 2.6. Thuật Toán Sắp Xếp Nét Vẽ Trái Sang Phải Cho Gcode With Image (Cập nhật 27)

1. **Thuật Toán `sort_gcode_paths_left_to_right` Trong Backend (`cncapi/main.py`)**:
   - **Đảo chiều từng nét vẽ (Stroke Orientation)**: Kiểm tra tọa độ điểm đầu `(start_x, start_y)` và điểm cuối `(end_x, end_y)` của từng đường nét. Nếu `start_x > end_x` (hoặc nếu là đường thẳng đứng có `start_y > end_y`), tiến hành đảo ngược thứ tự các điểm trong nét vẽ để đầu bút luôn di chuyển xuôi chiều từ Trái sang Phải.
   - **Sắp xếp theo thứ tự ưu tiên tuyệt đối (Strict LTR Sorting)**: Gom các nét vẽ theo nhóm hàng độ cao (`row_idx = int(mid_y / row_height_mm)`) từ trên xuống dưới, và sắp xếp thứ tự các nét trong cùng một hàng tuyệt đối theo tọa độ `min_x` từ bé đến lớn.
2. **Áp Dụng Cho Toàn Bộ Thuật Toán Chuyển Đổi**:
   - Áp dụng trực tiếp trong endpoint `POST /cncapi/v1/convert-image-gcode` cho mọi chế độ: `sketch`, `sketch_portrait`, `centerline`, `contour`, `handwriting`, `svg` và cả file `.gcode` thô nạp vào.
   - Giúp chuyển động xem trước trên Canvas, kịch bản mô phỏng và máy CNC thật di chuyển 100% tự nhiên từ trái qua phải như tay người vẽ tranh.

---

### 2.7. Tích Hợp Lưu & Nạp Project JSON Cho Gcode With Font (Cập nhật 28)

1. **Giao Diện Web UI (`cncapi/static/index.html`)**:
   - Bổ sung 2 nút **💾 Lưu Project JSON** (`#btn-save-font-project`) và **📂 Nạp Project JSON** (`#btn-load-font-project`) bên dưới nút Tải file .gcode tại panel `Gcode with font`.
   - Thêm thẻ chọn file ẩn `#font-project-file-input` hỗ trợ file định dạng `.json`.
2. **Cấu Trúc Cấu Hình Project JSON Font (`cncapi/static/app.js`)**:
   - Cấu trúc file JSON lưu giữ đầy đủ 15+ thuộc tính của `FontGcodeRequest`: `version`, `type: "font_gcode_project"`, `text`, `font_name`, `font_size_pt`, `line_spacing`, `line_spacing_mm`, `feed_rate`, `stroke_mode`, `z_safe`, `z_draw`, `pen_mode`, `axis_dir_y`, `epsilon`, `margin_mm`, `binary_threshold`, `render_dpi`, `min_path_len_mm`, `sort_row_height_mm`, cùng `gcode` và `preview_paths`.
3. **Phục Hồi Trạng Thái Dự Án (Project Restoring)**:
   - Khi chọn nạp file JSON, hệ thống tự động giải mã JSON, điền lại toàn bộ thông số vào các ô nhập liệu UI, khôi phục lại chuỗi mã G-code và vẽ ngay lập tức danh sách đường nét chữ lên Tool path view Canvas.

---

### 2.8. Tích Hợp Nút Dừng & Về Gốc Quy Định (Cập nhật 29)

1. **REST API Endpoint `/cncapi/v1/motion/stop-and-return` (`cncapi/main.py`)**:
   - Nhận đối tượng `StopAndReturnRequest` chứa `target_x`, `target_y`, `z_safe`, `pen_mode`.
   - **Xóa bộ đệm lệnh đã nạp**: Gửi tín hiệu Soft Reset `b"\x18"` ngắt ngay streamer và hủy bỏ toàn bộ các lệnh G-code đã xếp hàng trong bộ đệm nối tiếp GRBL.
   - **Mở khóa lần 1**: Gửi `$X\n` để mở khóa GRBL sau reset.
   - **Nhấc dao an toàn trước khi di chuyển**: Phát lệnh nhấc đầu kim `M3 S10` (Servo PWM) hoặc `G0 Z{z_safe}` (Trục Z).
   - **Di chuyển về gốc quy định**: Phát lệnh `G21 G90 G0 X{target_x} Y{target_y}` di chuyển vị trí đầu vẽ.
   - **Mở khóa lần 2**: Gửi `$X\n` để mở khóa hoàn toàn, đảm bảo máy sẵn sàng cho các thao tác kế tiếp.
2. **Giao Diện UI & 2 Chế Độ Dừng/Về Gốc (`cncapi/static/index.html` & `app.js`)**:
   - **🛑 Dừng & Về gốc ban đầu**: Nhấc dao, xóa bộ đệm lệnh, quay về vị trí tọa độ xuất phát trước khi bắt đầu vẽ (`startOffset.x`, `startOffset.y`), sau đó Unlock.
   - **🏠 Dừng & Về gốc WPos (0,0)**: Nhấc dao, xóa bộ đệm lệnh, quay về gốc tọa độ làm việc WPos `(0, 0)`, sau đó Unlock.

---

### 2.9. Xử Lý Xóa Triệt Để Đồ Họa Xem Trước Tool Path View (Cập nhật 30)

1. **Nguyên Nhân Lỗi Chồng Lấn Nét Vẽ**:
   - Trước đây nút *Xóa đồ họa* (`#btn-clear-path`) chỉ thiết lập mảng `penTrajectory = []`, không giải phóng mảng dữ liệu đường nét `fontPreviewPaths` (Gcode with font) và `imageSegments` (Gcode with image). Vì vậy khi canvas vẽ lại (`drawCanvas()`), các đồ họa nét cũ vẫn còn nguyên gây hiện tượng đè nét.
2. **Triển Khai Hàm `clearAllCanvasGraphics()` (`cncapi/static/app.js`)**:
   - Reset toàn bộ dữ liệu đồ họa: `penTrajectory = []`, `fontPreviewPaths = []`, `fontGcode = ''`, `imageSegments = []`, `imageGcode = ''`, `currentImageFile = null`, `currentImageBase64 = null`.
   - Hủy ngay mọi luồng hiệu ứng giả lập animation frame: `cancelAnimationFrame(fontSimAnimationId)`, `cancelAnimationFrame(imageSimAnimationId)`.
   - Khôi phục trạng thái mặc định của các thẻ hiển thị ảnh preview và nhãn thông tin.
   - Thực hiện `drawCanvas()` làm sạch 100% đồ họa trên Tool path view Canvas.
3. **Gán Sự Kiện Xóa Cho Các Nút Điều Khiển UI (`cncapi/static/index.html`)**:
   - Gán cho nút **Xóa Đồ Họa** (`#btn-clear-path`) ở góc trên Canvas Tool Path View.
   - Bổ sung nút **🧹 Xóa Xem Trước** (`#btn-clear-font-graphics`) vào panel `Gcode with font`.
   - Bổ sung nút **🧹 Xóa Xem Trước** (`#btn-clear-image-graphics`) vào panel `Gcode with image`.

---

### 2.10. Tái Cấu Trúc Vị Trí 2 Nút Mở G-Code Editor (Cập nhật 30)

1. **Di Chuyển Vị Trí Nút Mở Cửa Sổ Nổi (`cncapi/static/index.html`)**:
   - Gỡ bỏ 2 nút `#btn-open-gcode-font` và `#btn-open-gcode-image` khỏi vị trí header Cột 0.
   - Thêm khối điều khiển G-code Editors mới nằm trực tiếp bên dưới vùng **Cử Chỉ Touch & Swipe Gestures** (`<div class="gestures-container">`).
2. **Cấu Trúc Giao Diện Mới**:
   - Đặt 2 nút trong thẻ `div` phân cách `border-top` mỏng với bố cục lưới 2 cột (`grid-template-columns: 1fr 1fr`).
   - Giúp quy trình làm việc được liên tục: Sau khi cài đặt tọa độ điểm Bắt Đầu / Kết Thúc hoặc thực hiện thao tác cử chỉ touch/swipe, người dùng có thể nhấp mở ngay các trình biên dịch G-code chữ hoặc G-code ảnh.

---

### 2.11. Xử Lý Triệt Để Giả Lập Tool Path View & Phản Ánh Thực Tế Hành Trình CNC (Cập nhật 31)

1. **Nguyên Nhân Lỗi Giả Lập Không Dừng & Treo UI**:
   - Khi bấm nút **🛑 Dừng & Về gốc ban đầu** hoặc **🏠 Dừng & Về gốc WPos (0,0)** trong panel `Gcode with font` hoặc `Gcode with image`, code cũ chỉ gọi `cancelAnimationFrame(fontSimAnimationId)` hoặc `cancelAnimationFrame(imageSimAnimationId)`.
   - Tuy nhiên, trong hàm `animateStep()`, animation được kích hoạt đệ quy qua `requestAnimationFrame(() => setTimeout(animateStep, delay))`. Khi timer `setTimeout` đã nằm trong hàng đợi sự kiện của trình duyệt, việc `cancelAnimationFrame` không thể hủy `setTimeout`.
   - Hơn nữa, hàm `animateStep()` thiếu câu lệnh kiểm tra trạng thái `if (!simIsRunning)`. Vì vậy, khi `setTimeout` kích hoạt sau 10-15ms, `animateStep()` vẫn tự động chạy tiếp, liên tục ghi đè vị trí `simHeadPos`, gọi `drawCanvas()` làm mới giao diện và đăng ký frame mới, gây ra hiện tượng giả lập chạy vô hạn ngầm và làm block các tương tác UI.
2. **Triển Khai Giải Pháp Kỹ Thuật (`cncapi/static/app.js`)**:
   - **Bổ sung biến quản lý Timer Timeout**: Thêm `fontSimTimeoutId` và `imageSimTimeoutId` để quản lý triệt để cả Animation Frame lẫn Timeout Timer.
   - **Xây dựng hàm tập trung `stopAllSimulations()`**:
     - Thiết lập `simIsRunning = false`, `isSimulating = false`, `telemetry.streaming = false`.
     - Hủy và reset về `null` cả `fontSimAnimationId` + `fontSimTimeoutId`, `imageSimAnimationId` + `imageSimTimeoutId`, và `simAnimFrame`.
     - Dọn dẹp tất cả hiệu ứng highlight `.sim-active` trên danh sách bước kịch bản.
   - **Ràng buộc ngắt vĩnh viễn trong `animateStep()`**: Thêm điều kiện `if (!simIsRunning)` ngay đầu hàm `animateStep()` ở cả trình giả lập Font và Image. Nếu phát hiện `simIsRunning == false`, lập tức giải phóng biến ID và `return` dừng hoàn toàn vòng lặp đệ quy.
   - **Tích hợp dừng tức thì khi click Nút Dừng & Về gốc**:
     - Trong sự kiện `click` của `btnStopHomeStart` và `btnStopHomeOrigin`, gọi `stopAllSimulations()` ngay đồng bộ ở dòng đầu tiên.
     - Đặt `simHeadPos` về đúng tọa độ đích quy định (Gốc ban đầu hoặc WPos 0,0) và gọi `drawCanvas()` làm mới ngay lập tức trước khi phát lệnh API REST `/cncapi/v1/motion/stop-and-return`.
   - **Tích hợp vào `clearAllCanvasGraphics()` và `stopCNC()`**: Đảm bảo mọi thao tác dọn dẹp canvas hoặc phát lệnh dừng CNC hệ thống đều tự động ngắt triệt để tất cả luồng giả lập đang chạy.
3. **Tự Động Đồng Bộ & Phản Ánh Thực Tế Hành Trình Máy CNC**:
   - **Ngắt giả lập khi chạy thực**: Gọi `stopAllSimulations()` ngay khi người dùng bấm **🚀 Vẽ trên CNC** (`btnRealDraw`), loại bỏ hoàn toàn các luồng giả lập cũ đang chạy ngầm đè lên dữ liệu Telemetry.
   - **Phản ánh tọa độ Telemetry realtime (`telemetry.wpos`)**:
     - Trong `drawCanvas()`, khi `simIsRunning` đã về `false`, canvas hiển thị vị trí đầu bút chuẩn xác theo tọa độ làm việc `telemetry.wpos` do phần cứng CNC gửi về qua WebSocket.
     - Khi phát lệnh Dừng & Về gốc (`stop-and-return`), máy CNC rút dao và di chuyển thực tế về gốc, dữ liệu status `<Idle|MPos:...|WPos:...>` gửi về liên tục và Tool path view canvas lập tức cập nhật theo dõi sát sao từng bước di chuyển thực tế của máy CNC.
   - **Xử lý sự kiện WebSocket `stream_status`**: Khi nhận tín hiệu `stream_status` (`completed`, `stopped`, `failed`), gọi `stopAllSimulations()`, cập nhật `telemetry.streaming = false` và thực hiện `drawCanvas()` để chốt vị trí đầu bút trùng khớp 100% với trạng thái dừng của CNC thật.

---

### 2.12. Phân Tích & Xử Lý Lệnh Home ($H), Cấu Hình Công Tắc Hành Trình & Giả Lập CNC (Cập nhật 32)

1. **Phân Tích Nguyên Nhân Lệnh `$H` Không Chạy**:
   - **Môi trường máy CNC thật (GRBL Serial)**:
     - Mặc định bo mạch GRBL v1.1 tắt chu kỳ Homing tự động (`$22=0`).
     - Khi người dùng gửi lệnh `$H`, GRBL trả về phản hồi `error:5` (*Homing cycle is not enabled via settings*), dẫn tới máy CNC đứng yên không di chuyển.
     - Nếu bật `$22=1` mà **không đấu nối công tắc hành trình (Limit Switches)**, khi phát lệnh `$H`, động cơ CNC sẽ di chuyển kịch khung cơ khí, gây va chạm/trượt bước và GRBL bị rơi vào trạng thái khóa `ALARM:8` hoặc `ALARM:1`.
   - **Môi trường Trình Giả Lập (`DummySerial`)**:
     - Class `DummySerial` trong [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py) chưa xử lý câu lệnh `$H`. Khi nhận lệnh, `DummySerial` chỉ ghi log mà không cập nhật `state.mpos = [0.0, 0.0, 0.0]`, `state.wpos`, hay `state.home_set = True`, làm cho Tool Path View không phản ánh trạng thái Home.
   - **Thiếu cảnh báo trên Giao diện Web UI**:
     - Khi nhận lỗi `error:5` hoặc trạng thái `ALARM:8`, Web UI không hiển thị hướng dẫn người dùng nguyên nhân do chưa bật `$22=1` hoặc thiếu công tắc hành trình.

2. **Quy Định Về Công Tắc Hành Trình (Limit Switches)**:
   - **Trường hợp 1 (Máy CÓ lắp công tắc hành trình)**:
     - Cần bật cài đặt `$22=1` trong GRBL (qua lệnh Console hoặc API `/cncapi/v1/origin/enable_homing`).
     - Khi gửi lệnh `$H`, máy sẽ tự động dò các trục về vị trí công tắc hành trình (Limit Switches), rút lùi khoảng pull-off (`$27`) và gán tọa độ máy `MPos = (0,0,0)`.
   - **Trường hợp 2 (Máy KHÔNG LẮP công tắc hành trình)**:
     - **KHÔNG BẬT `$22=1`** và **KHÔNG DÙNG LỆNH `$H`**.
     - Thay vào đó, người dùng phải sử dụng nút **Về gốc làm việc (0,0)** (`G90 G0 X0 Y0 Z0` / API `/cncapi/v1/origin/goto_work`) hoặc thiết lập gốc tọa độ làm việc thủ công **Đặt gốc tọa độ làm việc (Work Zero - G54)** (`G10 L20 P1 X0 Y0 Z0`).

3. **Cập Nhật Code Triển Khai (`main.py`, `index.html`, `app.js`)**:
   - **Backend (`cncapi/main.py`)**:
     - **Hỗ trợ DummySerial**: Bổ sung nhánh `elif "$H" in upper:` trong `DummySerial.write()` để reset `mpos` về `(0,0,0)`, tính toán `wpos`, gán `home_set = True`, tự động lưu cấu hình và phát tín hiệu `ok` kèm WebSocket log `[MSG:Homing cycle complete (Dummy Mode)]`.
     - **Bắt lỗi GRBL `error:5` & `ALARM`**: Trong `serial_reader_loop()`, khi nhận `error:5`, phát ngay WebSocket log cảnh báo: `⚠️ [Lỗi GRBL error:5] Lệnh Home ($H) thất bại vì chưa bật Homing ($22=1) trong GRBL hoặc chưa kết nối công tắc hành trình!`. Khi nhận `ALARM:`, phát log cảnh báo kèm gợi ý lệnh Unlock `$X`.
     - **Bổ sung Web API REST**:
       - `POST /cncapi/v1/origin/enable_homing`: Bật Homing `$22=1`.
       - `POST /cncapi/v1/origin/disable_homing`: Tắt Homing `$22=0`.
   - **Frontend (`cncapi/static/index.html` & `cncapi/static/app.js`)**:
     - Cập nhật tooltip nút Home (`#jog-home`): *"Về gốc máy ($H) - Yêu cầu bật $22=1 và có công tắc hành trình"*.
     - Bắt các thông điệp cảnh báo `error:5` và `ALARM` gửi từ WebSocket để người dùng nhận biết ngay trên Console và giao diện Web UI.

---

### 2.13. Phân Tích & Hướng Dẫn Cấu Hình Chiều Động Cơ Khi Về Home ($23 - Homing Dir Invert Mask) (Cập nhật 33)

1. **Phân Tích Kỹ Thuật Chiều Di Chuyển Khi Về Home**:
   - Trong firmware GRBL, có hai tham số quản lý chiều di chuyển động cơ riêng biệt:
     - **`$3` (Step direction invert mask)**: Chiều quay chung của động cơ khi di chuyển Jogging hoặc chạy G-code bình thường.
     - **`$23` (Homing direction invert mask)**: CHỈ ĐẢO CHIỀU DI CHUYỂN KHI THỰC HIỆN LỆNH HOME (`$H`) để tìm vị trí công tắc hành trình.
   - Mặc định GRBL quy định `$23=0`, tức là cả 3 trục X, Y, Z sẽ di chuyển về hướng **DƯƠNG (+)** khi bấm `$H`.
   - Nếu công tắc hành trình X/Y/Z được lắp ở phía góc âm **(-)** (ví dụ: góc bên trái cho X, góc phía dưới cho Y), máy sẽ chạy ngược hướng công tắc. Khi đó ta cần cấu hình giá trị Mask `$23` tương ứng.

2. **Bảng Bít Mask Cấu Hình Tham Số `$23`**:

   | Giá Trị `$23` | Mask Nhị Phân | Hướng Trục X | Hướng Trục Y | Hướng Trục Z | Ghi Chú / Mô Tả Kịch Bản Dùng |
   | :---: | :---: | :---: | :---: | :---: | :--- |
   | **`0`** | `000` | **+** | **+** | **+** | Mặc định: Cả 3 trục tìm công tắc ở góc **DƯƠNG (+)** |
   | **`1`** | `001` | **-** | **+** | **+** | Đảo chiều Homing trục **X** sang hướng **ÂM (-)** |
   | **`2`** | `010` | **+** | **-** | **+** | Đảo chiều Homing trục **Y** sang hướng **ÂM (-)** |
   | **`3`** | `011` | **-** | **-** | **+** | Đảo chiều cả trục **X và Y** sang hướng **ÂM (-)** *(Rất phổ biến cho máy vẽ/laser công tắc ở góc Bottom-Left)* |
   | **`4`** | `100` | **+** | **+** | **-** | Đảo chiều Homing trục **Z** sang hướng **ÂM (-)** |
   | **`5`** | `101` | **-** | **+** | **-** | Đảo chiều Homing trục **X và Z** sang hướng **ÂM (-)** |
   | **`6`** | `110` | **+** | **-** | **-** | Đảo chiều Homing trục **Y và Z** sang hướng **ÂM (-)** |
   | **`7`** | `111` | **-** | **-** | **-** | Đảo chiều cả 3 trục **X, Y, Z** sang hướng **ÂM (-)** |

3. **Các Bước Thực Hiện Cấu Hình `$23`**:
   - **Phương pháp 1 (Gửi qua Console Serial Web UI)**:
     - Nhập `$23=3` (hoặc giá trị mong muốn từ bảng trên) vào ô nhập Console và nhấn Enter.
     - Kiểm tra kết quả phản hồi `ok` từ GRBL.
   - **Phương pháp 2 (Sử dụng Web API RESTful trong Backend `cncapi`)**:
     - `GET /cncapi/v1/origin/homing_direction`: Xem bảng tra cứu hướng dẫn.
     - `POST /cncapi/v1/origin/homing_direction`: Gửi body JSON `{"invert_x": true, "invert_y": true, "invert_z": false}` để hệ thống tự động tính toán mask và gửi `$23=3` xuống GRBL.

---

### 2.14. Phân Tích & Chẩn Đoán Lỗi Home ($H) Chỉ Di Chuyển Trục Y, Trục X Không Di Chuyển (Cập nhật 34)

1. **Nguyên Lý Homing Tuần Tự Trong GRBL**:
   - Firmware GRBL mặc định thực hiện chu kỳ Về Home (`$H`) theo cơ chế **TUẦN TỰ LẦN LƯỢT TỪNG TRỤC**:
     - *Bước 1*: Trục Z di chuyển rút lên trên tìm công tắc hành trình Z.
     - *Bước 2*: Trục Y di chuyển tìm công tắc hành trình Y. Khi chạm công tắc Y, trục Y lùi lại một đoạn `pull-off` (`$27`) và ngắt tín hiệu.
     - *Bước 3*: **SAU KHI TRỤC Y THÀNH CÔNG**, GRBL mới phát lệnh cho trục X di chuyển tìm công tắc hành trình X.

2. **Các Nguyên Nhân Khiến Trục X Không Di Chuyển**:
   - **Nguyên nhân 1: Trục Y chưa chạm hoặc không kích hoạt được công tắc Y**:
     - Do trục Y di chuyển chưa tới công tắc Y, công tắc Y bị hỏng/đứt dây, hoặc chiều di chuyển Homing trục Y bị ngược (chạy kịch khung cơ khí không chạm được công tắc).
     - **Hệ quả**: GRBL liên tục chờ trục Y chạm công tắc Y, dẫn tới trục X chưa bao giờ đến lượt di chuyển.
   - **Nguyên nhân 2: Chân công tắc hành trình X (`X-LIMIT`) bị kích hoạt sẵn (Triggered/Closed)**:
     - Dây tín hiệu công tắc X bị chập mass, công tắc X bị kẹt đè sẵn, hoặc giá trị đảo cực công tắc `$5` (Limit switch invert) bị cấu hình ngược.
     - **Hệ quả**: GRBL nhận diện trục X đã chạm công tắc từ đầu, nên bỏ qua hoặc lùi một khoảng cực ngắn rồi kết thúc/báo lỗi mà không cho trục X chạy.
   - **Nguyên nhân 3: Động cơ hoặc Driver trục X gặp sự cố phần cứng**:
     - Trục X bị kẹt cơ khí, đứt dây động cơ bước X, hoặc hỏng driver A4988/DRV8825 trục X.

3. **Quy Trình Chẩn Đoán & Khắc Phục Chi Tiết**:
   - **Bước 1: Kiểm tra trạng thái Realtime bằng lệnh `?`**:
     - Mở Console Serial, gõ `?` -> Enter.
     - Kiểm tra trường `Pn:` trong chuỗi phản hồi (ví dụ `<Idle|MPos:0,0,0|Pn:X>`):
       - Nếu hiển thị `Pn:X` khi chưa đụng vào công tắc X: Công tắc X đang bị chạm/chập sẵn. Cần kiểm tra dây công tắc X hoặc gõ `$5=1` (đảo cực công tắc).
       - Nếu hiển thị `Pn:Y` khi chưa đụng vào công tắc Y: Cần kiểm tra dây công tắc Y.
   - **Bước 2: Kiểm tra công tắc Y có hoạt động không**:
     - Phát lệnh `$H`, khi trục Y đang di chuyển, dùng tay nhấn thử vào công tắc hành trình Y.
     - Nếu ngay khi tay nhấn công tắc Y, trục Y dừng lại và **trục X bắt đầu di chuyển**, điều đó khẳng định 100% nguyên nhân do trục Y di chuyển chưa chạm công tắc Y (cần điều chỉnh vị trí công tắc Y hoặc chỉnh chiều di chuyển Y qua `$23`).
   - **Bước 3: Kiểm tra di chuyển Jogging trục X**:
     - Thử bấm nút `X+` và `X-` trên Web UI. Nếu trục X vẫn di chuyển bình thường khi Jogging nhưng không chạy khi Home, nguyên nhân nằm hoàn toàn ở công tắc Y chưa kích hoạt hoặc công tắc X bị chập sẵn.

---

### 2.15. Nhấc Dao Trước Khi Về Gốc Máy ($H) & Tự Động Unlock ($X) (Cập nhật 35)

1. **Quy Trình Chuẩn 3 Bước Khi Ph      - Gọi `run_auto_home()` ở cuối `connect_cnc()` khi kết nối thành công.
      - Trong `send_command()` khi chặn lệnh `$H`: thực hiện Homing, kiểm tra lỗi phản hồi để ném HTTP 400 khi thất bại, phát lệnh `G10 L2 P1 X0 Y0 Z0` và gán `home_set = True`.
    - Frontend Web UI [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js): Đồng bộ các cảnh báo khi `!isHomeSet` hiển thị thông báo `"Cần thực hiện Homing ($H) về gốc máy trước!"`.
    - Đa ngôn ngữ [`cncapi/static/lang/vi.json`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/lang/vi.json) & [`cncapi/static/lang/en.json`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/lang/en.json): Thêm bản dịch tương ứng.

---

### 2.19. Kiểm Tra Di Chuyển Không Vượt Vùng Làm Việc 4 Góc (TL, TR, BR, BL) (Cập nhật 39)

1. **Nguyên Lý Xác Định Vùng Làm Việc (Working Boundary Area)**:
   - Khi hệ thống đã được Homing (`state.home_set = True`) và người dùng đã thiết lập 4 góc vùng làm việc ngoài đời thực (`cnc_tl`, `cnc_tr`, `cnc_bl`, `cnc_br`), hệ thống tự động xác định hình chữ nhật giới hạn (Bounding Box) theo trục tọa độ làm việc (WPos):
     - `min_x = min(tl.x, tr.x, bl.x, br.x)`
     - `max_x = max(tl.x, tr.x, bl.x, br.x)`
     - `min_y = min(tl.y, tr.y, bl.y, br.y)`
     - `max_y = max(tl.y, tr.y, bl.y, br.y)`

2. **Cơ Chế Kiểm Tra Trên Frontend Web UI (`cncapi/static/app.js`)**:
   - **Thao tác Click di chuyển trên Canvas (Tool Path View)**:
     - Khi người dùng click chọn vị trí di chuyển trên Canvas, hàm `checkBounds(targetWorkX, targetWorkY)` sẽ được gọi để kiểm tra.
     - Nếu vị trí click nằm ngoài phạm vi `[min_x..max_x, min_y..max_y]`, hệ thống bật cảnh báo `alert` thông báo cụ thể tọa độ vượt giới hạn và **hủy phát lệnh di chuyển**.
   - **Phản hồi Trực quan khi Rê Chuột (Hover Info Pill)**:
     - Khi rê chuột trên Tool Path View Canvas, nếu con trỏ chuột nằm ngoài vùng 4 góc, nhãn hiển thị tọa độ sẽ đổi sang màu đỏ kèm cảnh báo `⚠️ (Vượt 4 góc)` giúp người dùng nhận biết ngay lập tức trước khi nhấp chuột.

3. **Cơ Chế Kiểm Tra Trên Backend API (`cncapi/main.py`)**:
   - Thêm hàm trợ giúp `check_motion_bounds(target_x, target_y)` và `check_gcode_line_bounds(clean_cmd, is_relative)`:
     - Kiểm tra mọi thao tác di chuyển thông qua Web API: `POST /cncapi/v1/motion/move_to`, `POST /cncapi/v1/motion/jog`, `POST /cncapi/v1/gestures/execute`, cũng như các câu lệnh GCode di chuyển G0/G1 gửi qua `POST /api/command`.
     - Nếu bất kỳ câu lệnh nào có tọa độ đích vượt khỏi giới hạn 4 góc khi `home_set = True`, backend sẽ lập tức chặn lệnh và ném ngoại lệ `HTTPException(status_code=400, detail=...)` phản hồi nguyên nhân rõ ràng cho client.

4. **Các File Mã Nguồn Đã Cập Nhật**:
   - Backend [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py): Thêm `check_motion_bounds()`, `check_gcode_line_bounds()`, tích hợp kiểm tra vào `send_command`, `v1_jog`, `v1_move_to`, `v1_execute_gesture`.
   - Frontend [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js): Thêm `getWorkBounds()`, `checkBounds()`, tích hợp vào sự kiện click mouseup canvas và render phản hồi hover màu đỏ trực quan khi rê chuột.

---

### 2.20. Hiển Thị Thông Tin Chiều Homing X, Y, Cấu Hình $22, $23 & Các Thông Số Hữu Ích Của CNC (Cập nhật 40)

1. **Phân Tích Nhu Cầu & Mục Tiêu**:
   - Trong quá trình vận hành CNC, người dùng cần theo dõi nhanh chiều di chuyển của máy khi về Home (X, Y) và trạng thái tính năng Homing cycle (`$22=1` hoặc `$22=0`) mà không cần mở Serial Console gõ lệnh `$$` thủ công.
   - Cần bổ sung hiển thị trực quan các thông số quan trọng của bo mạch GRBL tại card **Trạng Thái & Hệ Thống** trên Web UI.

2. **Các Thành Phần Cải Tiến**:
   - **Backend REST API (`GET /cncapi/v1/system/grbl_info`)**:
     - Cung cấp đối tượng JSON tổng hợp cấu hình Homing (`enabled`, `mask`, `x_dir`, `y_dir`, `z_dir`, `label`, `feed_rate`, `seek_rate`, `pulloff`), giới hạn hành trình (`hard_limits`, `soft_limits`) và thông số động cơ (`steps_per_mm`, `max_rate`, `accel`, `max_travel`).
     - Tự động parse các dòng cài đặt GRBL (`$0=...`, `$22=...`, `$23=...`) trả về từ Serial reader loop hoặc DummySerial.
   - **WebSocket Telemetry**:
     - Định kỳ gửi kèm `homing_enabled`, `homing_mask` và đối tượng `homing_dir_info` để giao diện Web UI luôn được đồng bộ realtime.
   - **Giao Diện Web UI (`index.html` & `app.js`)**:
     - Thêm các telemetry chips hiển thị nhanh tại card **Trạng Thái & Hệ Thống**: **🎯 Chiều Homing: X- Y- (Bottom-Left)**, **$22 Homing: Bật/Tắt**, **$23 Mask: 3**.
     - Thêm nút bấm **⚙️ Cấu Hình GRBL & Homing ($22, $23)** mở ra floating panel `#grbl-system-details-panel`.
     - Floating panel cho phép xem toàn bộ bảng thông số động cơ (Steps/mm $100-$102, Tốc độ max $110-$112, Gia tốc $120-$122), cùng nút chuyển nhanh $22 Bật/Tắt và dropdown chọn chiều Homing $23 trực quan.

### 2.21. Khắc Phục Cơ Cấu Nhấc/Hạ Bút Khi Sử Dụng Động Cơ Nema 23 + Vít Me Trục Z (Cập nhật 47)

1. **Yêu Cầu & Nghiệp Vụ Mới**:
   - Khi ở chế độ `pen_mode: z-axis` (động cơ bước Nema 23 + vít me cho trục Z), việc nâng/hạ bút **không phụ thuộc vào `pen_up_z` / `pen_down_z`** tuyệt đối.
   - Thao tác nhấn nút **Nhấc Bút** và **Hạ Bút** (hoặc API `/cncapi/v1/motion/pen`) sẽ điều khiển tăng/giảm nâng hạ trục Z tương đối theo **Bước Nhích (mm)** (`sys-step-distance` / `step_distance`) tương tự như điều khiển di chuyển các trục X, Y.
   - **Quy định hướng di chuyển trục Z**:
     - **Nút Hạ Bút**: Phát lệnh di chuyển **`Z+`** (+step_distance mm).
     - **Nút Nhấc Bút**: Phát lệnh di chuyển **`Z-`** (-step_distance mm).

2. **Các Bước Triển Khai Giải Pháp**:
   - **Chế độ Servo/Spindle PWM (`spindle-pwm`)**:
     - Phát lệnh điều khiển Servo PWM `M3 S<pen_up_pwm>` (Nhấc Bút) và `M3 S<pen_down_pwm>` (Hạ Bút).
   - **Chế độ Vị trí trục Z (`z-axis`)**:
     - **Hạ Bút**: Phát lệnh jog di chuyển trục Z đi lên `+step_distance` mm (`direction: Z+`, lệnh `G91 G1 Z+<step> F<feed> G90`).
     - **Nhấc Bút**: Phát lệnh jog di chuyển trục Z đi xuống `-step_distance` mm (`direction: Z-`, lệnh `G91 G1 Z-<step> F<feed> G90`).
     - Frontend [`app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js) (`sendPenCommand`) đọc thông số `step` (Bước Nhích mm) và `feed` từ `getSystemConfig()`, phát yêu cầu REST API `/cncapi/v1/motion/jog` với `dir = (stateType === 'down') ? 'Z+' : 'Z-'`.
     - Backend [`main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py) (`v1_motion_pen`) phát câu lệnh di chuyển tương đối dựa trên `state.step_distance` với `move_z = -step if state_type == "up" else step`.

---

### 2.22. Bảng Ma Trận Đối Chiếu Tất Cả Cập Nhật (`whattodo.md` vs Code Implementation)

| STT Cập Nhật | Nội Dung Yêu Cầu Tại `whattodo.md` | Trạng Thái | File Mã Nguồn Thực Hiện | Chi Tiết Giải Pháp Triển Khai |
| :---: | :--- | :---: | :--- | :--- |
| **Cập nhật 1** | Quản lý & phím kịch bản giống `cnc/main.py`, bắt buộc đặt gốc làm việc G54, chỉnh thứ tự, insert, pen mode up/down, feedrate 4000, step distance, dwell, set begin/end nhấc dao | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py), [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js) | Session API, cảnh báo chưa set home WPos, pin insert step, nhấc dao tự động cho set begin/end. |
| **Cập nhật 2** | Tool Path View hiển thị kịch bản & đầu CNC so gốc WPos | ✅ Hoàn thành | [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js) | Canvas render các bước kịch bản và vị trí `WPos` realtime. |
| **Cập nhật 3** | Cử chỉ vuốt thực hiện rồi dừng, không về vị trí start vuốt | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py) | API `/gestures/execute` phát lệnh di chuyển tương đối và giữ nguyên đầu bút tại vị trí mới. |
| **Cập nhật 4** | Canvas vẽ tracking mờ, vẽ kịch bản rõ từ begin->end, thể hiện thực tế | ✅ Hoàn thành | [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js) | `penTrajectory` vẽ màu nhạt, `scenarioSteps` vẽ đường nối nổi bật kèm icon đầu bút. |
| **Cập nhật 5** | Click chuột canvas quy đổi tọa độ di chuyển CNC | ✅ Hoàn thành | [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js) | Quy đổi click pixel sang WPos mm, gọi API `/motion/move_to`. |
| **Cập nhật 6** | Option vẽ hướng trục X, Y trên canvas (mặc định X trái->phải, Y trên->dưới) | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py), [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js) | Config `axis_dir_x`, `axis_dir_y`, render hệ tọa độ canvas theo cấu hình. |
| **Cập nhật 7** | Tập trung cấu hình di chuyển/gestures về Cấu hình Spindle & Gốc làm việc, thêm nút lưu/load JSON local | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py), [`cncapi/static/index.html`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/index.html) | `calibration_settings.json`, các nút Download JSON và Upload Load Config file. |
| **Cập nhật 8** | Gestures thực hiện tại vị trí CNC hiện tại, không cần về gốc làm việc trước | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py) | Thực thi Tap/Swipe trực tiếp từ tọa độ hiện tại `cur_pos`. |
| **Cập nhật 9** | Đưa tỷ lệ mm/px (mặc định 1px = 0.5mm) & hướng trục X/Y lên Cấu Hình Gốc Làm Việc | ✅ Hoàn thành | [`cncapi/calibration_settings.json`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/calibration_settings.json), [`cncapi/static/index.html`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/index.html) | `mm_per_px` (0.5 mm/px) cho phép người dùng tùy chỉnh trên Web UI. |
| **Cập nhật 10** | Đổi hiển thị gốc phôi sang Tọa độ gốc máy (Machine Zero - G53) | ✅ Hoàn thành | [`cncapi/static/index.html`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/index.html), [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js) | Giao diện hiển thị rõ ràng G53 (Machine Zero / MPos) và G54 (Work Zero / WPos). |
| **Cập nhật 11** | Bổ sung hệ thống REST API prefix `/cncapi/v1/...` | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py) | Khởi tạo đầy đủ 35+ Web API endpoints chuẩn RESTful. |
| **Cập nhật 12** | Bổ sung cấu hình thời gian Nhấn giữ (mặc định 1.5s) | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py), [`cncapi/calibration_settings.json`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/calibration_settings.json) | Field `gesture_long_press_dwell: 1.5` trong Pydantic request & JSON config. |
| **Cập nhật 13** | Bổ sung `sys-step-distance` (`step_distance`) trong cấu hình | ✅ Hoàn thành | [`cncapi/calibration_settings.json`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/calibration_settings.json) | Field `step_distance: 5.0` hỗ trợ lưu và cập nhật đồng bộ. |
| **Cập nhật 14** | Bổ sung 4 nút set góc khung (`cnc_tl`, `cnc_tr`, `cnc_bl`, `cnc_br`) để vẽ khung ngoài đời thực | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py), [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js) | Web API `/origin/set_bound_point` và logic vẽ khung chữ nhật 4 điểm trên canvas. |
| **Cập nhật 15** | Đóng gói PyInstaller thành 1 file chạy duy nhất `dist/cncapi` | ✅ Hoàn thành | [`cncapi/main.spec`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.spec), [`cncapi/build_dist.sh`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/build_dist.sh) | `STATIC_DIR` tự động dùng `sys._MEIPASS`, script build tự động ra `dist/cncapi`. |
| **Cập nhật 16** | Hỗ trợ build cross-platform cho Linux, Windows và macOS | ✅ Hoàn thành | `build_dist.bat`, `build_dist.ps1`, `.github/workflows/build_cncapi.yml` | Build binary tự động cho cả 3 HĐH trên CI/CD GitHub Actions. |
| **Cập nhật 17** | Tự động nhận diện & ưu tiên cổng Serial theo Hệ điều hành | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py) | Lọc cổng USB CNC theo OS (Linux `ttyACM/ttyUSB`, Win `COM`, macOS `usbmodem`). |
| **Cập nhật 18** | Khai báo thư viện vào `requirements.txt` và tự động install trong script build | ✅ Hoàn thành | [`cncapi/requirements.txt`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/requirements.txt), `build_dist.sh` | File requirements chứa 5 core dependencies, tích hợp `pip install` khi build. |
| **Cập nhật 19** | Gcode with font floating panel 33% bên phải, preview & real draw | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py), [`cncapi/static/index.html`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/index.html) | Panel `#gcode-font-editor-panel`, API `/generate-font-gcode` & `/run-gcode`. |
| **Cập nhật 20** | Cấu hình `line_spacing` cho Gcode with font | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py) | Tham số `line_spacing` (mặc định 1.2x) trong PIL multiline rendering. |
| **Cập nhật 21** | Cấu hình `line_spacing_mm` (cách dòng mm) | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py) | Tham số `line_spacing_mm` quy đổi mm sang pixel bổ sung khoảng cách dòng. |
| **Cập nhật 22** | Fix hạ bút Gcode with font, Character-Counting Protocol (127 bytes), Cartesian Y flip | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py) | Tự động chuyển Z -> `M3 S<pwm>`, streaming 127 bytes, lộn Y Cartesian khi `axis_dir_y == -1`. |
| **Cập nhật 23** | Cho phép tùy chỉnh đầy đủ 17 thuộc tính `FontGcodeRequest` trong Điều Chỉnh Nâng Cao | ✅ Hoàn thành | [`cncapi/static/index.html`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/index.html), [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js) | Collapsible panel chứa 17 ô nhập liệu cấu hình chi tiết font, tự động cập nhật realtime. |
| **Cập nhật 24** | Gcode with font vẽ tuần tự từ Trái sang Phải (Strict Left-to-Right & Top-to-Bottom) | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py) | Thuật toán gom nhóm dòng `line_idx` và sắp xếp stroke theo `min_x` từ bé đến lớn. |
| **Cập nhật 25** | Gcode with image floating panel 33% bên phải, modules sketch/potrace/svg, preview & real draw | ✅ Hoàn thành | `image2gcodesketch.py`, `image2gcode.py`, `svg2gcode.py`, `OutlineExtractorPen.py` | API `/convert-image-gcode`, panel `#gcode-image-editor-panel`, canvas preview & CNC real draw. |
| **Cập nhật 26** | Preset Sketch Chân Dung Cosplay với thông số tối ưu từ `project_2 cosplay.json` | ✅ Hoàn thành | [`cncapi/project_2 cosplay.json`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/project_2%20cosplay.json), [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js) | Preset Portrait Cosplay tự động điền `scale:0.15`, `blur:9`, `clahe:1.0`, `min_len:18`, `thin:false`. |
| **Cập nhật 27** | Gcode with image vẽ tuần tự từ Trái sang Phải | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py) | Hàm `sort_gcode_paths_left_to_right` tự động đảo nét stroke ngược và sắp xếp LTR. |
| **Cập nhật 28** | Lưu & Nạp Project JSON cho Gcode with font | ✅ Hoàn thành | [`cncapi/static/index.html`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/index.html), [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js) | Nút Lưu/Load JSON project font khôi phục 15+ thông số và nét chữ canvas. |
| **Cập nhật 29** | Nút Dừng & Về gốc ban đầu / gốc WPos (0,0) (Nhấc dao, Soft Reset 0x18, Unlock $X) | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py) | Web API REST `/motion/stop-and-return`, nhấc dao an toàn, dọn buffer và Unlock. |
| **Cập nhật 30** | Chuyển vị trí 2 nút Gcode Editors xuống dưới Cử chỉ Touch & Swipe Gestures; nút Xóa Xem Trước dọn dẹp canvas | ✅ Hoàn thành | [`cncapi/static/index.html`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/index.html), [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js) | Đưa nút xuống Cột 0 dưới gestures; hàm `clearAllCanvasGraphics()` xóa sạch 100% graphics. |
| **Cập nhật 31** | Hủy triệt để luồng giả lập simulation (Timer Timeout + Animation Frame) khi bấm Dừng về gốc và đồng bộ phản ánh 100% CNC thực tế | ✅ Hoàn thành | [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js) | Biến `simTimeoutId`, hàm `stopAllSimulations()`, kiểm tra `if (!simIsRunning)` ngắt đệ quy và cập nhật WPos realtime từ WebSocket. |
| **Cập nhật 32** | Phân tích & xử lý lệnh Home ($H), công tắc hành trình, DummySerial, API enable/disable homing, bắt lỗi `error:5` & `ALARM` | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py) | DummySerial mock `$H`, WebSocket log tiếng Việt hướng dẫn bật `$22=1` và lắp công tắc hành trình. |
| **Cập nhật 33** | Cấu hình chiều động cơ khi về Home qua tham số GRBL `$23` (Homing dir invert mask) | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py), [`cncapi/howtodo.md`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/howtodo.md) | Web API `/origin/homing_direction` tự động tính bít mask `$23` gửi xuống GRBL. |
| **Cập nhật 34** | Chẩn đoán & hướng dẫn xử lý lỗi Home ($H) chỉ di chuyển trục Y, trục X không di chuyển | ✅ Hoàn thành | [`cncapi/howtodo.md`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/howtodo.md) | Hướng dẫn chẩn đoán tuần tự GRBL (Y->X), công tắc Y chưa chạm, hoặc công tắc X bị chập `Pn:X`. |
| **Cập nhật 35** | Khi bấm nút Về gốc máy ($H), nhấc dao trước rồi mới thực hiện Homing ($H), khi về gốc thành công tự động Unlock ($X) | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py), [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js) | API REST `/origin/home` & `send_command` tự động phát lệnh Nhấc dao -> Homing ($H) -> Unlock ($X). |
| **Cập nhật 36** | Khi Homing thành công, tự động set Gốc máy MPos=(0,0,0) và Gốc làm việc G54 WPos=(0,0,0) (G10 L20 P1 X0 Y0 Z0) và gán home_set=True | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py) | Tự động phát `G10 L20 P1 X0 Y0 Z0`, gán `home_set=True`, lưu JSON và broadcast telemetry realtime. |
| **Cập nhật 37** | Khi kết nối CNC thành công, tự động phát lệnh Unlock ($X) để giải phóng máy khỏi trạng thái Alarm và sẵn sàng làm việc ngay | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py) | Tự động gửi `$X` trong `connect_cnc()` cho cả cổng Serial phần cứng và chế độ Giả lập DummySerial. |
| **Cập nhật 38** | Khi khởi động lại web hoặc kết nối lại CNC thì cần Homing tự động; khi Homing thành công set gốc máy và gốc làm việc trùng gốc máy (0,0,0) | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py), [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js) | `home_set = False` khi khởi động/kết nối lại CNC; khởi tạo tác vụ nền `run_auto_home()` thực hiện Homing `$H`, kiểm tra lỗi phản hồi và chỉ gửi `G10 L2 P1 X0 Y0 Z0` để đồng bộ G54 = G53. |
| **Cập nhật 39** | Khi có gốc máy, gốc làm việc và 4 góc (TL, TR, BR, BL), kiểm tra việc di chuyển bằng click hoặc di chuyển trên Tool Path View không được vượt quá vùng làm việc | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py), [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js) | `check_motion_bounds` backend & `checkBounds` frontend chặn di chuyển vượt khung `[min_x..max_x, min_y..max_y]`, render hover warning màu đỏ. | điều hành | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py) | Lọc cổng USB CNC theo OS (Linux `ttyACM/ttyUSB`, Win `COM`, macOS `usbmodem`). |
| **Cập nhật 40** | ở Trạng Thái & Hệ Thống lấy thêm thông tin về chiều homing x,y các thông tin về $22 $23 và các thông tin hữu ích khác của cnc | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py), [`cncapi/static/index.html`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/index.html), [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js) | API `/cncapi/v1/system/grbl_info`, chips telemetry chiều Homing X,Y, panel `#grbl-system-details-panel` điều chỉnh $22, $23 trực quan. |
| **Cập nhật 18** | Khai báo thư viện vào `requirements.txt` và tự động install trong script build | ✅ Hoàn thành | [`cncapi/requirements.txt`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/requirements.txt), `build_dist.sh` | File requirements chứa 5 core dependencies, tích hợp `pip install` khi build. |
| **Cập nhật 19** | Gcode with font floating panel 33% bên phải, preview & real draw | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py), [`cncapi/static/index.html`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/index.html) | Panel `#gcode-font-editor-panel`, API `/generate-font-gcode` & `/run-gcode`. |
| **Cập nhật 20** | Cấu hình `line_spacing` cho Gcode with font | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py) | Tham số `line_spacing` (mặc định 1.2x) trong PIL multiline rendering. |
| **Cập nhật 21** | Cấu hình `line_spacing_mm` (cách dòng mm) | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py) | Tham số `line_spacing_mm` quy đổi mm sang pixel bổ sung khoảng cách dòng. |
| **Cập nhật 22** | Fix hạ bút Gcode with font, Character-Counting Protocol (127 bytes), Cartesian Y flip | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py) | Tự động chuyển Z -> `M3 S<pwm>`, streaming 127 bytes, lộn Y Cartesian khi `axis_dir_y == -1`. |
| **Cập nhật 23** | Cho phép tùy chỉnh đầy đủ 17 thuộc tính `FontGcodeRequest` trong Điều Chỉnh Nâng Cao | ✅ Hoàn thành | [`cncapi/static/index.html`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/index.html), [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js) | Collapsible panel chứa 17 ô nhập liệu cấu hình chi tiết font, tự động cập nhật realtime. |
| **Cập nhật 24** | Gcode with font vẽ tuần tự từ Trái sang Phải (Strict Left-to-Right & Top-to-Bottom) | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py) | Thuật toán gom nhóm dòng `line_idx` và sắp xếp stroke theo `min_x` từ bé đến lớn. |
| **Cập nhật 25** | Gcode with image floating panel 33% bên phải, modules sketch/potrace/svg, preview & real draw | ✅ Hoàn thành | `image2gcodesketch.py`, `image2gcode.py`, `svg2gcode.py`, `OutlineExtractorPen.py` | API `/convert-image-gcode`, panel `#gcode-image-editor-panel`, canvas preview & CNC real draw. |
| **Cập nhật 26** | Preset Sketch Chân Dung Cosplay với thông số tối ưu từ `project_2 cosplay.json` | ✅ Hoàn thành | [`cncapi/project_2 cosplay.json`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/project_2%20cosplay.json), [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js) | Preset Portrait Cosplay tự động điền `scale:0.15`, `blur:9`, `clahe:1.0`, `min_len:18`, `thin:false`. |
| **Cập nhật 27** | Gcode with image vẽ tuần tự từ Trái sang Phải | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py) | Hàm `sort_gcode_paths_left_to_right` tự động đảo nét stroke ngược và sắp xếp LTR. |
| **Cập nhật 28** | Lưu & Nạp Project JSON cho Gcode with font | ✅ Hoàn thành | [`cncapi/static/index.html`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/index.html), [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js) | Nút Lưu/Load JSON project font khôi phục 15+ thông số và nét chữ canvas. |
| **Cập nhật 29** | Nút Dừng & Về gốc ban đầu / gốc WPos (0,0) (Nhấc dao, Soft Reset 0x18, Unlock $X) | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py) | Web API REST `/motion/stop-and-return`, nhấc dao an toàn, dọn buffer và Unlock. |
| **Cập nhật 30** | Chuyển vị trí 2 nút Gcode Editors xuống dưới Cử chỉ Touch & Swipe Gestures; nút Xóa Xem Trước dọn dẹp canvas | ✅ Hoàn thành | [`cncapi/static/index.html`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/index.html), [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js) | Đưa nút xuống Cột 0 dưới gestures; hàm `clearAllCanvasGraphics()` xóa sạch 100% graphics. |
| **Cập nhật 31** | Hủy triệt để luồng giả lập simulation (Timer Timeout + Animation Frame) khi bấm Dừng về gốc và đồng bộ phản ánh 100% CNC thực tế | ✅ Hoàn thành | [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js) | Biến `simTimeoutId`, hàm `stopAllSimulations()`, kiểm tra `if (!simIsRunning)` ngắt đệ quy và cập nhật WPos realtime từ WebSocket. |
| **Cập nhật 32** | Phân tích & xử lý lệnh Home ($H), công tắc hành trình, DummySerial, API enable/disable homing, bắt lỗi `error:5` & `ALARM` | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py) | DummySerial mock `$H`, WebSocket log tiếng Việt hướng dẫn bật `$22=1` và lắp công tắc hành trình. |
| **Cập nhật 33** | Cấu hình chiều động cơ khi về Home qua tham số GRBL `$23` (Homing dir invert mask) | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py), [`cncapi/howtodo.md`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/howtodo.md) | Web API `/origin/homing_direction` tự động tính bít mask `$23` gửi xuống GRBL. |
| **Cập nhật 34** | Chẩn đoán & hướng dẫn xử lý lỗi Home ($H) chỉ di chuyển trục Y, trục X không di chuyển | ✅ Hoàn thành | [`cncapi/howtodo.md`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/howtodo.md) | Hướng dẫn chẩn đoán tuần tự GRBL (Y->X), công tắc Y chưa chạm, hoặc công tắc X bị chập `Pn:X`. |
| **Cập nhật 35** | Khi bấm nút Về gốc máy ($H), nhấc dao trước rồi mới thực hiện Homing ($H), khi về gốc thành công tự động Unlock ($X) | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py), [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js) | API REST `/origin/home` & `send_command` tự động phát lệnh Nhấc dao -> Homing ($H) -> Unlock ($X). |
| **Cập nhật 36** | Khi Homing thành công, tự động set Gốc máy MPos=(0,0,0) và Gốc làm việc G54 WPos=(0,0,0) (G10 L20 P1 X0 Y0 Z0) và gán home_set=True | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py) | Tự động phát `G10 L20 P1 X0 Y0 Z0`, gán `home_set=True`, lưu JSON và broadcast telemetry realtime. |
| **Cập nhật 37** | Khi kết nối CNC thành công, tự động phát lệnh Unlock ($X) để giải phóng máy khỏi trạng thái Alarm và sẵn sàng làm việc ngay | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py) | Tự động gửi `$X` trong `connect_cnc()` cho cả cổng Serial phần cứng và chế độ Giả lập DummySerial. |
| **Cập nhật 38** | Khi khởi động lại web hoặc kết nối lại CNC thì cần Homing tự động; khi Homing thành công set gốc máy và gốc làm việc trùng gốc máy (0,0,0) | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py), [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js) | `home_set = False` khi khởi động/kết nối lại CNC; khởi tạo tác vụ nền `run_auto_home()` thực hiện Homing `$H`, kiểm tra lỗi phản hồi và chỉ gửi `G10 L2 P1 X0 Y0 Z0` để đồng bộ G54 = G53. |
| **Cập nhật 41** | Gcode with background float panel, Layer 0 rendering, tính tỷ lệ px/mm, vị trí X/Y & góc xoay real CNC, drawable vectorization & lưu settings JSON | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py), [`cncapi/static/index.html`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/index.html), [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js), [`cncapi/calibration_settings.json`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/calibration_settings.json) | Panel `#gcode-background-editor-panel`, Layer 0 canvas rendering, nút Cập nhật tính `1px = ... mm`, options vị trí/góc xoay real CNC, option xem như đối tượng để vẽ (đen trắng, đường kẻ, sketch filter) và lưu persistent `background_settings` vào JSON. |
| **Cập nhật 42** | Gcode with font: Bổ sung option góc quay chữ (`rotation_angle`, mặc định -90°), cập nhật lề biên `margin_mm=0.0`, `render_dpi=300` và đồng bộ tỷ lệ mm/px từ system calibration | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py), [`cncapi/static/index.html`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/index.html), [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js) | Ô nhập `#font-rotation-angle` (-90°), ma trận quay 2D `(x*cos - y*sin, x*sin + y*cos)` trong backend, đọc `mm_per_px` từ `calibration_settings.json`. |
| **Cập nhật 43** | Xử lý triệt để mất nét chữ nhỏ (8pt–14pt): Mặc định font `arial.ttf`, tự động điều chỉnh adaptive thresholding, morphological dilation, epsilon 0.3, min_path_len 0.05mm và micro-dip cho dấu chấm đơn | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py), [`cncapi/static/index.html`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/index.html), [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js) | Default `arial.ttf`, mode `single_line_bold`, binarization adaptive `thresh=180`, `min_path_len_mm=0.05`, `epsilon=0.3`, tự động chuyển dấu chấm 1-point thành micro-dip stroke `[(x,y), (x+0.05, y+0.05)]`. |
| **Cập nhật 44** | Bổ sung 4 nút di chuyển góc (`goto tl`, `goto tr`, `goto bl`, `goto br`) ở Bộ Di Chuyển & Cử Chỉ, tự động hiển thị khi 4 góc được cấu hình | ✅ Hoàn thành | [`cncapi/static/index.html`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/index.html), [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js) | Khối `#jog-goto-corners-container`, tự động hiện/ẩn nút theo `cncBounds[corner]` và gọi `/cncapi/v1/motion/move_to` di chuyển CNC tới tọa độ góc khi click. |
| **Cập nhật 45** | Tự động lưu cấu hình `step_distance` (`sys-step-distance`) và các thông số Cấu Hình Cấu Trúc & Gốc Làm Việc khi thay đổi ô nhập dữ liệu, tránh mất dữ liệu khi nhấn F5 reload page | ✅ Hoàn thành | [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js) | Đã gắn hàm `saveSystemSettingsSilent()` tự động bắt sự kiện `change` & `input` cho `sys-step-distance` và các ô nhập hệ thống để lưu tức tính vào `calibration_settings.json`. |
| **Cập nhật 46** | Tự động gửi lệnh `$GETID` khi kết nối CNC thành công (phần cứng & dummy) để lấy Device ID và hiển thị ngay sau header `Cấu Hình Kết Nối & Thông Tin CNC: {device_id}` | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py), [`cncapi/static/index.html`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/index.html), [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js) | Mạch GRBL phản hồi `[ID:..., MAC:...]` qua lệnh `$GETID`. Backend đọc & trích xuất `device_id`, truyền qua telemetry WebSocket và frontend hiển thị realtime tại `<span id="cnc-device-id">`. |
| **Cập nhật 47** | Ở chế độ Vị trí trục Z (`pen_mode: z-axis` cho Nema 23 + vít me), nút Nhấc Bút & Hạ Bút điều khiển nâng/hạ trục Z tương đối theo Bước Nhích (mm) (`step_distance`) linh hoạt tương tự điều khiển jog X, Y. | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py), [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js) | Chế độ `z-axis` phát lệnh di chuyển tương đối `G91 G0 Z+<step> F<feed> G90` (Nhấc Bút) và `G91 G0 Z-<step> F<feed> G90` (Hạ Bút) theo Bước Nhích (`sys-step-distance`). |
| **Cập nhật 48** | Thông báo lỗi Toastr tập trung: Bắt HTTP status != 200, phản hồi lỗi WebSocket GRBL, lỗi không kết nối được cổng USB với CNC, yêu cầu người dùng bấm đóng thủ công (`timeOut: 0`, `closeButton: true`). | ✅ Hoàn thành | [`cncapi/static/index.html`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/index.html), [`cncapi/static/styles.css`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/styles.css), [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js) | Tích hợp Toastr JS/CSS & hệ thống Toast DOM fallback. Tự động bắt lỗi HTTP API != 200, bẫy log lỗi `error:`/`ALARM:` từ WebSocket, bẫy lỗi ngắt kết nối USB và cấu hình `timeOut: 0` để người dùng chủ động bấm đóng (`✕`). |
| **Cập nhật 49** | Hiển thị và cho phép chỉnh sửa toàn bộ 34+ thông số GRBL ($0–$132) lấy theo lệnh `$$`, lưu persistent thành đối tượng `cnc_physical` trong `calibration_settings.json`. | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py), [`cncapi/static/index.html`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/index.html), [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js), [`cncapi/calibration_settings.json`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/calibration_settings.json) | Web API `/cncapi/v1/system/grbl_settings`, tự động bẫy phản hồi `$id=val` lưu vào `cnc_physical` đối tượng, UI panel `#grbl-system-details-panel` hiển thị và cho phép sửa tất cả 34+ tham số GRBL. |
| **Cập nhật 51** | Gcode with Font Editor & Gcode with Image Editor: Khi click **🛑 Dừng & Về gốc ban đầu** hoặc **🏠 Dừng & Về gốc WPos**, hệ thống tự động nhấc bút an toàn và chờ trễ `pen_dwell` hoàn tất trước khi di chuyển X/Y về gốc để chống cào rách phôi/màn hình | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py), [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js) | Cập nhật API REST `/cncapi/v1/motion/stop-and-return`: thực hiện Soft Reset `\x18`, Unlock `$X`, phát lệnh nhấc bút `M3 S<pen_up_pwm>` hoặc `G0 Z<pen_up_z>`, chờ trễ `max(pen_dwell + 0.15, 0.4s)` rồi mới di chuyển `G0 X.. Y..`, cuối cùng tắt xung `M5`. |
| **Cập nhật 52** | Bổ sung đầy đủ các ô nhập thông số Góc Xoay (`rotation_angle`), Lật Ngang (`flip_x`), Lật Dọc (`flip_y`) cho cả 3 bộ sinh: Gcode with Font, Gcode with Image và Gcode Background | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py), [`cncapi/static/index.html`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/index.html), [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js) | Bổ sung UI controls, tích hợp biến đổi ma trận 2D xoay và lật trục tọa độ cho Font (`generate_font_gcode`), Image/SVG (`sort_gcode_paths_left_to_right`), Background Layer 0 canvas rendering & Background-to-Gcode. |
| **Cập nhật 53** | Tự động đồng bộ toàn diện cấu hình Nhấc / Hạ Bút từ "Cấu Hình Cấu Trúc & Gốc Làm Việc" sang G-code Font và G-code Image | ✅ Hoàn thành | [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py), [`cncapi/image2gcode.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/image2gcode.py), [`cncapi/svg2gcode.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/svg2gcode.py), [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js) | Cả hai bộ sinh `generate_font_gcode` và `sort_gcode_paths_left_to_right` đọc trực tiếp `state.pen_mode`, `state.pen_up_pwm`, `state.pen_down_pwm`, `state.pen_dwell`. Các module `image2gcode.py` và `svg2gcode.py` tự động đọc cấu hình động qua `_get_pen_commands()`. |

### 2.22. Quản Lý & Lưu Cấu Hình Tất Cả Thông Số GRBL ($$) vào đối tượng `cnc_physical` trong `calibration_settings.json` (Cập nhật 49)

1. **Yêu Cầu & Phân Tích Nghiệp Vụ**:
   - Khi chạy lệnh `$$`, mạch GRBL v1.1 phản hồi toàn bộ danh sách 34+ tham số phần cứng (`$0` đến `$132`).
   - Cần lấy đầy đủ tất cả các tham số này, hiển thị trực quan lên giao diện Web UI tại floating panel `#grbl-system-details-panel` và cho phép người dùng nhập/chỉnh sửa trực tiếp từng tham số.
   - Khi có phản hồi từ lệnh `$$` hoặc khi người dùng chỉnh sửa thông số trên UI, toàn bộ tập dữ liệu cấu hình phần cứng GRBL phải được lưu trữ vĩnh viễn dưới key đối tượng `"cnc_physical"` trong file [`cncapi/calibration_settings.json`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/calibration_settings.json).

2. **Cấu Trúc Dữ Liệu Đối Tượng `cnc_physical`**:
   ```json
   "cnc_physical": {
     "$0": "10",
     "$1": "25",
     "$2": "0",
     "$3": "0",
     "$4": "0",
     "$5": "0",
     "$6": "0",
     "$10": "1",
     "$11": "0.010",
     "$12": "0.002",
     "$13": "0",
     "$20": "0",
     "$21": "0",
     "$22": "1",
     "$23": "3",
     "$24": "25.000",
     "$25": "500.000",
     "$26": "250",
     "$27": "1.000",
     "$30": "1000",
     "$31": "0",
     "$32": "0",
     "$100": "250.000",
     "$101": "250.000",
     "$102": "250.000",
     "$110": "4000.000",
     "$111": "4000.000",
     "$112": "4000.000",
     "$120": "500.000",
     "$121": "500.000",
     "$122": "500.000",
     "$130": "200.000",
     "$131": "200.000",
     "$132": "200.000"
   }
   ```

3. **Backend Python & Web API (`cncapi/main.py`)**:
   - `load_settings()` & `ControllerState`: Khởi tạo sẵn giá trị mặc định cho `"cnc_physical"`. Nạp lại từ `calibration_settings.json` khi mở ứng dụng.
   - `serial_reader_loop()` & `DummySerial`: Tự động bẫy các câu lệnh cài đặt `$id=val` từ GRBL, cập nhật vào `state.grbl_settings` và tự động lưu `save_settings({"cnc_physical": state.grbl_settings})`.
   - Web API REST:
     - `GET /cncapi/v1/system/grbl_settings`: Trả về danh sách định nghĩa 34+ tham số GRBL (key, code, name, description, unit, value).
     - `POST /cncapi/v1/system/grbl_settings`: Tiếp nhận body JSON `{ "settings": { "$0": "10", ... } }` hoặc `{ "param": "$100", "value": "250" }`, gửi lệnh xuống máy CNC thật/dummy, đồng bộ `state.grbl_settings` và lưu vĩnh viễn vào `calibration_settings.json`.

4. **Frontend Web UI (`index.html` & `app.js`)**:
   - Panel `#grbl-system-details-panel` hiển thị danh sách 34+ thông số GRBL được nhóm theo 5 danh mục trực quan.
   - Tích hợp ô nhập liệu/dropdown cho phép xem và sửa từng tham số kèm nút **💾 Lưu Cấu Hình GRBL Physical** và **🔄 Tải Lại ($$)**.


### 2.23. Cập Nhật Tập Tham Số `cnc_physical` Chuẩn và Quy Chuẩn Hệ Tọa Độ CNC Trên Tool Path View (Cập nhật 50)

1. **Yêu Cầu & Phân Tích Nghiệp Vụ**:
   - Nạp tập tham số vật lý chuẩn thu được từ câu lệnh `$$` của mạch GRBL vào đối tượng `"cnc_physical"` trong file [`cncapi/calibration_settings.json`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/calibration_settings.json).
   - Xác nhận quy chuẩn hệ tọa độ Đề-các (Cartesian Coordinate System) dùng cho máy CNC và hiển thị giao diện xem trước đường đi (Tool Path View).

2. **Cấu Trúc Dữ Liệu `cnc_physical` Chuẩn ($0 – $132)**:
   ```json
   "cnc_physical": {
     "$0": "10",
     "$1": "25",
     "$2": "0",
     "$3": "0",
     "$4": "0",
     "$5": "0",
     "$6": "0",
     "$10": "1",
     "$11": "0.010",
     "$12": "0.002",
     "$13": "0",
     "$20": "0",
     "$21": "0",
     "$22": "1",
     "$23": "1",
     "$24": "25.000",
     "$25": "500.000",
     "$26": "250",
     "$27": "1.000",
     "$30": "1000",
     "$31": "0",
     "$32": "0",
     "$100": "250.000",
     "$101": "250.000",
     "$102": "250.000",
     "$110": "500.000",
     "$111": "500.000",
     "$112": "500.000",
     "$120": "10.000",
     "$121": "10.000",
     "$122": "10.000",
     "$130": "200.000",
     "$131": "200.000",
     "$132": "200.000"
   }
   ```
   *Ý nghĩa các tham số quan trọng:*
   - `$130=200.0`, `$131=200.0`, `$132=200.0`: Hành trình tối đa X, Y, Z = 200mm.
   - `$100=250.0`, `$101=250.0`, `$102=250.0`: Tỷ lệ xung 250 bước/mm.
   - `$22=1`: Cho phép chu trình Homing ($H).
   - `$23=1`: Mật nạ đảo chiều Homing (`00000001` -> Trục X home về bên trái/chiều âm, trục Y & Z home về chiều dương).

3. **Xác Nhận Quy Chuẩn Trục Tọa Độ Trên Tool Path View**:
   - **Gốc Tọa Độ (0,0)**: Bắt buộc nằm ở góc **Bottom-Left (Góc dưới cùng bên trái)** của bàn làm việc (Machine Working Area).
   - **Trục OX (Chiều ngang)**: Hướng từ **Trái sang Phải** là chiều **DƯƠNG (+X)**. Hướng từ Phải sang Trái là chiều ÂM (-X).
   - **Trục OY (Chiều dọc)**: Hướng từ **Dưới lên Trên** là chiều **DƯƠNG (+Y)**. Hướng từ Trên xuống Dưới là chiều ÂM (-Y).
   - **Trục OZ (Chiều đứng)**: Hướng từ **Dưới lên Trên** (Nâng bút/dao nhấc lên cao) là chiều **DƯƠNG (+Z)**, Hạ bút/dao xuống phôi là chiều ÂM (-Z) hoặc 0.

4. **Kỹ Thuật Xử Lý Biến Đổi Hệ Tọa Độ Trong Tool Path View (Y-Flip Matrix)**:
   - Màn hình HTML Canvas mặc định có gốc (0,0) ở góc Top-Left, trục Y đi xuống (+Y xuống).
   - Để hiển thị đúng chuẩn CNC (Bottom-Left), hệ thống áp dụng công thức đảo trục Y khi render:
     $$\text{y\_canvas} = \text{canvas\_height} - (\text{y\_cnc} \times \text{scale})$$
   - Hoặc biến đổi ma trận Canvas context: `ctx.transform(1, 0, 0, -1, 0, height)`.

---

### 2.23. Phân Tích & Khắc Phục Vấn Đề Khung 4 Góc (TL, TR, BL, BR) Bị Nhỏ Hơn Kích Thước Thực Tế (Cập nhật 50)

1. **Hiện Tượng Thực Tế**:
   - Khung viền đỏ nét đứt thể hiện 4 góc làm việc (`TL, TR, BL, BR`) hiển thị trên Canvas có kích thước chỉ khoảng **$94\text{ mm} \times 85\text{ mm}$** (lưu trong `calibration_settings.json` là `TR(94, 85)`, `TL(0, 85)`, `BR(93, 0)`, `BL(0, 0)`).
   - Khung này nhỏ hơn rất nhiều so với kích thước thật của máy (ví dụ khổ A4 $210 \times 297\text{ mm}$ hoặc hành trình máy $200 \times 200\text{ mm}$ `$130/$131`).
   - Khi đặt ảnh nền Background (khổ A4 $210 \times 297\text{ mm}$), khung đỏ 4 góc máy chỉ nằm lọt thỏm ở một góc nhỏ.

2. **Các Nguyên Nhân Kỹ Thuật Gây Ra Vấn Đề**:
   - **Nguyên nhân 1: Tỷ lệ xung GRBL `$100`, `$101` (Steps/mm) chưa được hiệu chuẩn (Calibrate) đúng với phần cứng cơ khí**:
     - GRBL đang cài đặt mặc định: `$100 = 250.000` xung/mm, `$101 = 250.000` xung/mm.
     - Khi đầu máy di chuyển cơ khí thực tế một quãng đường $L_{\text{thực}}$ (ví dụ 210mm), nhưng nếu phần cứng thật chỉ cần $80\text{ xung/mm}$ (dây đai GT2 20T vi bước 1/16), thì GRBL ghi nhận tọa độ báo về $WPos = \frac{210 \times 80}{250} \approx 67.2\text{ mm}$!
     - Khi người dùng chạy máy ra 4 góc biên thật và bấm **Set TL / TR / BL / BR**, GRBL chỉ báo tọa độ nhỏ ($94\text{ mm} \times 85\text{ mm}$) và hệ thống lưu chính xác con số này vào `calibration_settings.json`.
   - **Nguyên nhân 2: Độ lệch so sánh giữa Khung máy ($94 \times 85\text{ mm}$) và Ảnh nền Background ($210 \times 297\text{ mm}$)**:
     - Khổ giấy A4 trong `background_settings` được quy ước chuẩn là $210\text{ mm} \times 297\text{ mm}$.
     - Do tọa độ 4 góc máy đang lưu là $94 \times 85\text{ mm}$, Canvas vẽ đúng tỷ lệ mm khiến khung máy chỉ bằng 1/3 khổ A4.
   - **Nguyên nhân 3: Quy trình lấy mẫu 4 góc (Set Corner Points)**:
     - Nếu người dùng bấm Set góc khi đầu vẽ mới chỉ di chuyển một phần hành trình (jog thử) mà chưa chạy ra sát 4 góc cực đại của bàn máy (hoặc chưa thực hiện Homing `$H` về gốc `0,0` trước khi di chuyển đo biên).

3. **Công Thức & Quy Trình Hiệu Chuẩn (Calibration Steps/mm)**:
   - **Công thức tính bước chuẩn**:
     $$\text{Tham số mới (\$100 hoặc \$101)} = \text{Tham số hiện tại} \times \frac{\text{Khoảng cách lệnh phát (mm)}}{\text{Khoảng cách thực tế di chuyển (mm)}}$$
   - **Các thông số phần cứng cơ bản phổ biến**:
     | Cơ cấu truyền động | Vi bước Driver | Bán kính / Bước ren | Tỷ lệ chuẩn (\$100 / \$101) |
     | :--- | :--- | :--- | :--- |
     | **Dây đai GT2 (Pulley 20 răng)** | 1/16 (A4988 / DRV8825) | 40 mm/vòng | **`$100=80.000`, `$101=80.000`** |
     | **Dây đai GT2 (Pulley 16 răng)** | 1/16 (A4988 / DRV8825) | 32 mm/vòng | **`$100=100.000`, `$101=100.000`** |
     | **Vít me T8 (Lead 8mm, 4 đầu ren)** | 1/16 (A4988 / DRV8825) | 8 mm/vòng | **`$100=400.000`, `$101=400.000`** |
     | **Vít me T8 (Lead 8mm, 4 đầu ren)** | 1/8 vi bước | 8 mm/vòng | **`$100=200.000`, `$101=200.000`** |

4. **Cách Khắc Phục Triệt Để**:
   - **Bước 1**: Mở panel **⚙️ Cấu Hình GRBL ($$)**, điều chỉnh `$100` và `$101` về đúng tỷ lệ phần cứng thực tế (ví dụ: `$100=80`, `$101=80` cho máy vẽ đai GT2 hoặc `$100=400`, `$101=400` cho vít me T8).
   - **Bước 2**: Thực hiện **Homing ($H)** để đưa máy về gốc chuẩn `(0, 0)`.
   - **Bước 3**: Dùng bộ điều khiển Jog di chuyển đầu vẽ đến đúng 4 góc biên thực tế của bàn làm việc và bấm lần lượt **Set BL**, **Set BR**, **Set TL**, **Set TR**.
   - **Bước 4**: Kiểm tra lại Tool Path View: Khung viền đỏ 4 góc sẽ mở rộng bao trọn toàn bộ kích thước thật của bàn máy và khớp hoàn hảo với khổ làm việc (A4/A3).

---






### 2.24. Cấu Hình Tần Số PWM Timer2 61Hz Cho Động Cơ Servo RC (SG90 / MG90S) Trên GRBL (Cập Nhật 52)

1. **Phân Tích Nguyên Nhân Kỹ Thuật (Lỗi Chập Chờn / Đơ Máy Ở 980Hz)**:
   - GRBL v1.1 mặc định cấu hình Timer2 ở chế độ Fast PWM với Prescaler `1/64` tạo ra tần số phát xung **~980Hz (chu kỳ chỉ 1.02ms)**, tối ưu cho đầu cắt Laser / Spindle DC.
   - Động cơ Servo RC (SG90 / MG90S) có mạch giải mã tích phân analog chỉ nhận diện độ rộng xung chuẩn trong chu kỳ **20ms (50Hz – 60Hz)**.
   - Khi cấp xung 980Hz vào Servo RC:
     - Tụ điện nạp/xả liên tục với tần số quá nhanh dẫn đến bão hòa hoặc sai lệch mức so sánh.
     - Dòng điện tăng vọt gây sụt áp cổng USB (Brown-out) khiến Servo bị giật rè rè, nóng ran và đơ mạch ("lúc được lúc không").

2. **Giải Pháp Triển Khai Phần Cứng Firmware (`cpu_map.h`)**:
   - Chuyển bộ chia tần số Prescaler của Timer2 từ `1/64` sang `1/1024`:
     ```c
     // File: cncapi/grbl-master/cpu_map.h (dòng 147 & 213)
     // #define SPINDLE_TCCRB_INIT_MASK   (1<<CS22)               // 1/64 prescaler -> 0.98kHz [CODE CŨ]
     #define SPINDLE_TCCRB_INIT_MASK   ((1<<CS22) | (1<<CS21) | (1<<CS20)) // 1/1024 prescaler -> ~61Hz [CHUẨN SERVO RC]
     ```

3. **Toán Học Tính Toán Dải Giá Trị Xung Điều Khiển ($S7 \div S39$)**:
   - Tần số Timer2 sau chia: $F = 16,000,000 / 1024 = 15,625\text{ Hz}$.
   - Thời gian của 1 tick ($1$ đơn vị $S$): $T_{tick} = 1 / 15,625\text{ s} = 0.064\text{ ms} = 64\mu s$.
   - **Góc cực tiểu $0^\circ$ ($0.5\text{ms}$)**: $S_{\min} = 0.5\text{ms} / 0.064\text{ms} \approx \mathbf{7.8} \rightarrow \mathbf{S7 \div S8}$.
   - **Góc cực đại $180^\circ$ ($2.5\text{ms}$)**: $S_{\max} = 2.5\text{ms} / 0.064\text{ms} \approx \mathbf{39.0} \rightarrow \mathbf{S39}$.
   - **Cặp giá trị chuẩn**:
     - **Nhấc Bút (Pen Up)**: `M3 S10` *(hoặc `S12`)*
     - **Hạ Bút / Chạm Màn Hình (Pen Down)**: `M3 S28` *(hoặc `S32`)*

---

### 2.25. Tự Động Đồng Bộ Toàn Diện Cấu Hình Nhấc / Hạ Bút Từ "Cấu Hình Cấu Trúc & Gốc Làm Việc" Sang G-code Font & G-code Image (Cập Nhật 53)

1. **Vấn Đề Kỹ Thuật Cũ**:
   - Bộ sinh G-code Font trước đây sinh lệnh cơ khí `G0 Z0` và `G1 Z45` khiến bộ dịch PWM hiểu nhầm Z45 là nhấc bút và Z0 là hạ bút $\rightarrow$ bị đảo ngược hoàn toàn (cần vẽ thì nhấc, cần nhấc thì đè).
   - Bộ sinh G-code Image trước đây gán cứng các lệnh `M3 S90` và `M3 S10` không theo cấu hình hệ thống.

2. **Giải Pháp Đồng Bộ Hóa Đã Triển Khai**:
   - **Backend G-code Font (`generate_font_gcode` trong [`main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py))**:
     - Tự động đọc `state.pen_mode`, `state.pen_up_pwm`, `state.pen_down_pwm`, `state.pen_dwell`.
     - Chế độ `spindle-pwm`: Phát trực tiếp `M3 S<state.pen_up_pwm>` + `G4 P<state.pen_dwell>` khi nhấc bút và `M3 S<state.pen_down_pwm>` + `G4 P<state.pen_dwell>` khi hạ bút.
     - Chế độ `z-axis`: Phát trực tiếp `G0 Z<state.pen_up_z>` và `G1 Z<state.pen_down_z> F<feed_rate>`.
     - Kết thúc bản vẽ phát lệnh `M5` tắt xung an toàn.
   - **Backend G-code Image (`sort_gcode_paths_left_to_right`, [`image2gcode.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/image2gcode.py), [`svg2gcode.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/svg2gcode.py))**:
     - Hàm `sort_gcode_paths_left_to_right` đồng bộ hóa 100% với `state.pen_mode` và các thông số nhấc/hạ PWM/Z.
     - Tất cả các hàm chuyển đổi ảnh/SVG sử dụng helper `_get_pen_commands()` đọc dữ liệu động từ [`calibration_settings.json`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/calibration_settings.json).
   - **Frontend UI (`app.js` & `index.html`)**:
     - `updatePenInputs()` tự động gán giá trị từ khung Cấu Hình sang các form G-code Font/Image.
 ### 2.26. Tự Động Nhấc Bút An Toàn Khi Bấm "Dừng & Về Gốc Ban Đầu" / "Dừng & Về Gốc WPos" (Cập Nhật 51)

1. **Vấn Đề Kỹ Thuật Trước Đây**:
   - Khi đang vẽ G-code Font hoặc G-code Image, nếu người dùng bấm **🛑 Dừng & Về gốc ban đầu** hoặc **🏠 Dừng & Về gốc WPos (0,0)**:
     - Hệ thống phát lệnh Soft Reset `\x18` để ngắt đệm lệnh, nhưng sau đó lệnh di chuyển `G0 X... Y...` về gốc lại chạy quá nhanh trong khi đầu bút chưa kịp nhấc lên hoàn toàn (hoặc dùng tham số `z_safe` bị gán cứng không theo cấu hình hệ thống).
     - Kết quả: Đầu bút quẹt/cào thẳng một đường ngang qua mặt phẳng phôi hoặc màn hình cảm ứng trong lúc hồi quy về gốc.

2. **Giải Pháp Đã Triển Khai**:
   - **Backend API `/cncapi/v1/motion/stop-and-return` ([`main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py))**:
     1. Gửi byte `\x18` (Soft Reset) để hủy toàn bộ các lệnh vẽ còn tồn trong buffer GRBL.
     2. Gửi lệnh Unlock `$X` để đưa GRBL về trạng thái sẵn sàng.
     3. Đọc thông số nhấc bút từ `state.pen_mode`, `state.pen_up_pwm` (nếu Servo PWM) hoặc `state.pen_up_z` (nếu Trục Z) và phát lệnh nhấc bút tương ứng (`M3 S<pen_up_pwm>` hoặc `G0 Z<pen_up_z>`).
     4. Chờ đúng thời gian trễ thực tế: `await asyncio.sleep(max(pen_dwell + 0.15, 0.4))` để đảm bảo động cơ Servo / Trục Z đã nhấc bút hoàn toàn tách khỏi bề mặt.
     5. Phát lệnh di chuyển `G21 G90 G0 X<target_x> Y<target_y>` để đưa đầu CNC về gốc an toàn.
     6. Nếu chạy Servo PWM, tự động gửi `M5` tắt xung Servo sau khi đã về gốc để bảo vệ động cơ.
   - **Frontend ([`static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js))**:
     - Cả 4 nút bấm dừng về gốc trong **Gcode with Font Editor** và **Gcode with Image Editor** (`btnStopReturnOrigin`, `btnStopHomeOrigin`) đều lấy trực tiếp `pen_mode` và `pen-up-val` từ **Cấu Hình Cấu Trúc & Gốc Làm Việc** truyền vào API, đảm bảo đồng bộ tuyệt đối.

### 2.27. Bổ Sung Góc Xoay, Flip Ngang, Flip Dọc Cho Gcode Font, Gcode Image Và Gcode Background (Cập Nhật 52)

1. **Yêu Cầu Nghiệp Vụ**:
   - Cả 3 bộ công cụ sinh G-code trong hệ thống (**Gcode with Font Editor**, **Gcode with Image Editor**, **Gcode Background Editor**) cần hỗ trợ đầy đủ bộ 3 biến đổi hình học 2D:
     1. **Góc Xoay (°)** (`rotation_angle`): Xoay đối tượng tự do từ $-360^\circ \div +360^\circ$.
     2. **Lật Ngang** (`flip_x`): Lật ngược hình chiếu đối xứng qua trục đứng (gương ngang).
     3. **Lật Dọc** (`flip_y`): Lật ngược hình chiếu đối xứng qua trục ngang (gương dọc).

2. **Giải Pháp Kỹ Thuật Đã Triển Khai**:
   - **Gcode with Font (`generate_font_gcode` trong [`main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py))**:
     - Thêm `flip_x: bool = False`, `flip_y: bool = False` vào `FontGcodeRequest`.
     - Áp dụng phép đối xứng trên tọa độ điểm pixel `(px_x, px_y)` trước khi nhân tỷ lệ mm/px:
       ```python
       if req.flip_x: px_x = raw_w_px - px_x
       if req.flip_y: px_y = raw_h_px - px_y
       ```
     - Áp dụng ma trận quay 2D $(X\cos\alpha - Y\sin\alpha, X\sin\alpha + Y\cos\alpha)$ theo `rot_deg`.
   - **Gcode with Image (`sort_gcode_paths_left_to_right` trong [`main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py))**:
     - Thêm các tham số `rotation_angle: float`, `flip_x: bool`, `flip_y: bool` vào API `/cncapi/v1/convert-image-gcode`.
     - Tìm tâm điểm bounding box $(\text{center\_x}, \text{center\_y})$ của tập đường nét, sau đó lật đối xứng và xoay toàn bộ vector nét vẽ quanh tâm trước khi sắp xếp thứ tự vẽ Left-to-Right.
   - **Gcode Background (`bgState` & `drawCanvas` trong [`static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js))**:
     - Bổ sung `flip_x`, `flip_y` vào `bgState` và lưu persistent trong `calibration_settings.json`.
     - Render Layer 0 canvas áp dụng `ctx.scale((bgState.flip_x ? -1 : 1) * axisDirX, (bgState.flip_y ? -1 : 1) * axisDirY)` và vẽ ảnh bù trừ offset tương ứng.
     - Khi bấm **Tạo Vector & G-code từ Background**, truyền trực tiếp `rotation_angle`, `flip_x`, `flip_y` vào backend để sinh mã G-code đồng bộ 100% với giao diện xem trước.

---

## 3. Quy Trình Kiểm Thử & Xác Nhận (Verification Steps)

1. **Chạy Server API Backend**:
   ```bash
   python3 main.py
   ```
2. **Kiểm Tra Trình Duyệt Web (`http://localhost:8099`)**:
   - Thử kết nối CNC thực tế hoặc Chế độ Giả Lập (`dummy`).
   - Thử di chuyển đầu CNC, thử hạ/nhấc bút và các cử chỉ Touch & Swipe.
   - Thử nghiệm tạo kịch bản, thêm bước, chạy kịch bản 1 lần và chạy loop.
   - Thử nghiệm mở panel `✍️ Gcode with font`, nhập văn bản và bấm **🎬 Vẽ xem trước** / **🚀 Vẽ trên CNC**.
   - Thử nghiệm mở panel `🖼️ Gcode with image`, nạp file ảnh/SVG và chuyển đổi sketch.
   - Thử nghiệm bấm nút **🛑 Dừng & Về gốc ban đầu** và **🏠 Dừng & Về gốc WPos (0,0)** để xác nhận dọn đệm lệnh và ngắt luồng giả lập mượt mà.
3. **Đóng Gói Binary Thực Thi (`dist/cncapi`)**:
   ```bash
   ./build_dist.sh
   ```
   Chạy trực tiếp `./dist/cncapi` để xác nhận ứng dụng hoạt động hoàn hảo mà không bị thiếu bất kỳ thư viện hay tài nguyên tĩnh nào.
