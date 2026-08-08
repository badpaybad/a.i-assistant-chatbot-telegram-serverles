# Báo Cáo & Hướng Dẫn Chi Tiết Tất Cả Các Tính Năng Đã Triển Khai Trong `cncapi`

Tài liệu này tổng hợp toàn bộ kiến trúc, giao diện Web UI, hệ thống REST API backend, thuật toán xử lý và các bước triển khai chi tiết đối chiếu theo yêu cầu tại [`cncapi/whattodo.md`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/whattodo.md) và mã nguồn thực tế tại [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py), [`cncapi/static/index.html`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/index.html), [`cncapi/static/app.js`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/static/app.js).

---

## 1. Tổng Quan Kiến Trúc & Công Nghệ (System Architecture)

1. **Backend Service (`cncapi/main.py`)**:
   - **Framework**: Python 3 Asyncio + FastAPI + Uvicorn server (chạy tại cổng default `8099`).
   - **Giao tiếp phần cứng**: PySerial đọc/ghi dữ liệu cổng Serial với mạch CNC GRBL, hỗ trợ cơ chế giả lập `DummySerial` cho phép thử nghiệm không cần phần cứng CNC.
   - **Truyền nhận Realtime**: WebSocket (`/ws`) và Giao thức đếm ký tự (Character-Counting Buffer Protocol, giới hạn 127 bytes) đảm bảo bộ đệm GRBL không bị tràn hoặc rơi rớt câu lệnh.
2. **Quản Lý Cấu Hình (`calibration_settings.json`)**:
   - Tự động nạp (`load_settings`) và lưu tức thì (`save_settings`) mọi thông số hệ thống, cổng Serial, tốc độ Feedrate, chế độ bút Servo PWM / Z-axis, tọa độ gốc làm việc (G54), 4 góc định vị khung `cnc_tl`, `cnc_tr`, `cnc_bl`, `cnc_br`.
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
  - Chọn Cổng Serial & Baudrate (Mặc định `/dev/ttyACM0`, `115200`).
  - Nút **Kết Nối CNC** / **Ngắt Kết Nối**.
  - Hiển thị Tọa độ Gốc máy (Machine Zero - G53 / `MPos`), Tọa độ Gốc làm việc (Work Zero - G54 / `WPos`), Tọa độ tương đối so với gốc phôi & gốc làm việc, Tọa độ Điểm đỗ (Parking Point).
- **Cột 1**:
  - Cấu hình Chế độ Bút/Spindle (`pen_mode`: `spindle-pwm` hoặc `z-axis`).
  - Vị trí/Góc Servo PWM khi Nhấc bút (`pen_up_pwm` / `pen_up_z`) và Hạ bút (`pen_down_pwm` / `pen_down_z`), Thời gian trễ hạ bút (`pen_dwell`).
  - Nút **Đặt gốc tọa độ làm việc (Work Zero - G54)**: Phát lệnh `G10 L20 P1 X0 Y0 Z0` xuống máy CNC và đánh dấu trạng thái `home_set = True`.
  - Nút **Di chuyển về gốc làm việc** (`G0 X0 Y0`) và Nút **Về điểm đỗ**.
- **Cột 2**:
  - Đèn trạng thái kết nối realtime và nhãn trạng thái máy CNC.
  - Chọn ngôn ngữ đa ngôn ngữ i18n (`vi` Tiếng Việt / `en` English).

#### Hàng 1 (Bộ Di Chuyển, Tool Path View & Quản Lý Kịch Bản)
- **Cột 0 (Độ rộng 25%)**:
  - **Bộ Di Chuyển (Machine Jogging)**: Nút di chuyển 8 hướng (`X+`, `X-`, `Y+`, `Y-`, `Z+`, `Z-`, đường chéo), ô nhập Tốc độ Jog Feedrate (`jog_feedrate`) và Bước di chuyển (`step_distance`).
  - **Cử Chỉ Touch & Swipe Gestures**: Ô nhập Tốc độ Vuốt (`swipe_feedrate`), Bước vuốt (`gesture_distance`), Dwell chạm (`gesture_tap_dwell`), Dwell Nhấn giữ (`gesture_long_press_dwell`, mặc định 1.5s - Cập nhật 12).
  - Nút **✍️ Gcode with font** (Cập nhật 19) và Nút **🖼️ Gcode with image** (Cập nhật 25).
- **Cột 1 (Độ rộng 50%)**:
  - **Tool Path View Canvas (`#toolpath-canvas`)**:
    - Vẽ xem trước các đường nét di chuyển của kịch bản, nét chữ font hoặc ảnh sketch.
    - Vẽ đường mờ tracking hành trình di chuyển thực tế của đầu CNC và vị trí đầu bút hiện tại (`WPos`).
    - Hỗ trợ cấu hình hướng trục X/Y (`axis_dir_x`, `axis_dir_y`) và tỷ lệ quy đổi `1px = ? mm` (`mm_per_px`, mặc định 0.05 mm/px).
    - **Click chuột lên Canvas để di chuyển đầu CNC** (Cập nhật 5): Quy đổi tọa độ pixel click trên canvas thành tọa độ làm việc thực tế của máy CNC để đưa đầu bút tới đúng vị trí.
    - **Vẽ Khung Làm Việc 4 Điểm** (Cập nhật 14): Cho phép set 4 góc `cnc_tl`, `cnc_tr`, `cnc_bl`, `cnc_br` để vẽ khung viền làm việc ngoài đời thực lên Tool Path View Canvas.
- **Cột 2 (Độ rộng 25%)**:
  - **Quản Lý & Phím Kịch Bản (Scenario Session)**:
    - Các nút thêm bước: `set begin`, `go to here`, `pen down`, `pen up`, `tap`, `double tap`, `long press`, `swipe up`, `swipe down`, `swipe left`, `swipe right`, `dwell`, `set end`.
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
| **Kết nối** | `GET` | `/cncapi/v1/connection/ports` | Liệt kê danh sách cổng Serial khả dụng theo OS |
| | `POST` | `/cncapi/v1/connection/connect` | Kết nối vào cổng Serial hoặc Chế độ giả lập `dummy` |
| | `POST` | `/cncapi/v1/connection/disconnect` | Ngắt kết nối cổng Serial |
| **Cấu hình** | `GET` | `/cncapi/v1/settings` | Đọc toàn bộ cấu hình hệ thống hiện tại |
| | `POST` | `/cncapi/v1/settings` | Cập nhật & lưu cấu hình hệ thống vào JSON |
| **Di chuyển** | `POST` | `/cncapi/v1/motion/jog` | Di chuyển đầu CNC theo hướng và bước |
| | `POST` | `/cncapi/v1/motion/move_to` | Di chuyển tuyệt đối tới tọa độ `(X, Y, Z)` |
| | `POST` | `/cncapi/v1/motion/pen` | Điều khiển nhấc bút (`up`) hoặc hạ bút (`down`) |
| | `POST` | `/cncapi/v1/motion/stop` | Dừng khẩn cấp, reset buffer & nhấc bút an toàn |
| **Cử chỉ** | `POST` | `/cncapi/v1/gestures/execute` | Thực thi Tap, Double Tap, Long Press, Swipe... |
| **Gốc tọa độ** | `POST` | `/cncapi/v1/origin/set_work` | Thiết lập Gốc tọa độ làm việc (G54 / G10 L20 P1) |
| | `POST` | `/cncapi/v1/origin/goto_work` | Di chuyển đầu CNC về gốc làm việc `(0,0)` |
| | `POST` | `/cncapi/v1/origin/set_parking` | Cài đặt tọa độ Điểm đỗ rút dao |
| | `POST` | `/cncapi/v1/origin/goto_parking` | Rút dao di chuyển về Điểm đỗ |
| | `GET` / `POST` | `/cncapi/v1/origin/bounds` | Quản lý & Cài đặt 4 điểm góc khung (`tl, tr, bl, br`) |
| | `POST` | `/cncapi/v1/origin/home` | Gửi lệnh Home `$H` |
| | `POST` | `/cncapi/v1/origin/unlock` | Gửi lệnh Unlock Alarm `$X` |
| **Kịch bản** | `GET` / `POST` | `/cncapi/v1/scenario/session` | Lấy thông tin hoặc Khởi tạo phiên kịch bản mới |
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
| **Visualizer** | `GET` | `/cncapi/v1/state` | Đọc toàn bộ trạng thái telemetry + kịch bản |
| | `GET` | `/cncapi/v1/visualizer/segments` | Trả danh sách các phân đoạn nét vẽ phục vụ UI Canvas |

---

### 2.3. Tính Năng "Gcode with font" (Cập nhật 19, 20, 21, 22, 23, 24)

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

---

### 2.4. Tính Năng "Gcode with image" (Cập nhật 25)

1. **Giao Diện Floating Panel (`#gcode-image-editor-panel`)**:
   - Mở cửa sổ góc phải 33% width không che Tool Path View Canvas.
   - Nút mở `🖼️ Gcode with image` nằm cạnh nút `✍️ Gcode with font` tại Cột 0.
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
3. **Đóng Gói Binary Thực Thi (`dist/cncapi`)**:
   ```bash
   ./build_dist.sh
   ```
   Chạy trực tiếp `./dist/cncapi` để xác nhận ứng dụng hoạt động hoàn hảo mà không bị thiếu bất kỳ thư viện hay tài nguyên tĩnh nào.
