# Hướng dẫn Thiết kế & Triển khai Tính Năng "Gcode with font" cho `cncapi`

Tài liệu này chi tiết hóa cách thức hoạt động, kiến trúc và các bước triển khai tính năng **Gcode with font** (Soạn thảo văn bản và sinh mã G-code nét vẽ theo Font chữ) từ `cnc/whattodo.md` sang ứng dụng Web API [`cncapi`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/whattodo.md) theo đúng các yêu cầu tại **Cập nhật 19**, **Cập nhật 20** và **Cập nhật 21** của [`cncapi/whattodo.md`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/whattodo.md).

---

## 1. Tổng quan Yêu cầu & Kiến trúc (Overview & Architecture)

### 1.1. Mục tiêu Cập nhật 19 (`cncapi/whattodo.md`)
1. **Bổ sung nút mở Editor `Gcode with font`**: Nằm ở Hàng 1, Cột 0 (phía trên phần **Bộ Di Chuyển & Cử Chỉ**).
2. **Thiết kế Floating Panel 1/3 góc phải màn hình**: Cửa sổ soạn thảo mở ra chiếm **1/3 chiều rộng phía bên phải** màn hình (`width: 33%`, `right: 0`), tuyệt đối **không đè hay che lấp vùng Tool Path View (Xem & Giả Lập Kịch Bản)** chiếm 50% ở cột giữa.
3. **Xem trước (Preview) trên Tool Path View**: Các đường nét chữ sau khi sinh G-code sẽ được hiển thị ngay trên Canvas của Tool Path View.
4. **Viết chữ từ vị trí hiện tại của đầu CNC**: Mã G-code nét chữ sinh ra sẽ lấy gốc tọa độ bắt đầu vẽ xuôi từ **vị trí thực tế hiện tại của đầu CNC** (tọa độ làm việc `WPos`).
5. **Nút "Vẽ xem trước" (Giả lập)**: Cho phép chạy mô phỏng nét vẽ chữ động trên Canvas Tool Path View để người dùng xem trước hành trình di chuyển của bút mà không tác động tới máy CNC thật.
6. **Nút "Vẽ trên cnc" (Chạy CNC thật)**: Gửi trực tiếp chuỗi lệnh G-code sinh ra tới bo mạch CNC để điều khiển máy CNC thực tế di chuyển và hạ bút vẽ.

### 1.2. Mục tiêu Cập nhật 20 (`cncapi/whattodo.md`)
1. **Khắc phục các dòng chữ bị dính/sát nhau khi có xuống dòng `\n`**:
   - Tăng khoảng cách dòng bằng tỷ lệ `line_spacing` (Mặc định `1.2x`).

### 1.3. Mục tiêu Cập nhật 21 (`cncapi/whattodo.md`)
1. **Bổ sung cấu hình Khoảng Cách Dòng tính bằng Milimet (`line_spacing_mm`)**:
   - Khi văn bản có các ký tự xuống dòng `\n`, người dùng có thể thiết lập thêm một khoảng trống tính chính xác bằng đơn vị milimet (mm) giữa các dòng chữ (Mặc định `0.0 mm`, cho phép điều chỉnh từ `0 mm` đến `100 mm`).
2. **Quy đổi Milimet sang Pixel chính xác**:
   - Tỷ lệ quy đổi: `scale_mm_per_px = (font_size_pt * 25.4 / 72.0) / font_size_px`.
   - Số pixel bổ sung thêm cho từng dòng: `extra_spacing_px = int(line_spacing_mm / scale_mm_per_px)`.
   - Tổng khoảng cách dòng truyền cho PIL render: `spacing_px = max(0, int(font_size_px * (line_spacing - 1.0))) + extra_spacing_px`.
3. **Đồng Bộ Hướng Trục Y với Cấu Hình Canvas `axisDirY`**:
   - Ứng dụng `cncapi` sử dụng hướng mặc định `axisDirY = 1` (+Y chỉ hướng xuống dưới).
   - Tọa độ Y hình ảnh PIL nhị phân chuẩn khớp trực tiếp với Canvas:
     `y_mm = round((pt[1] - pad_px) * scale_mm_per_px + req.margin_mm, 2)`
   - Sắp xếp nét chữ xuôi chiều đọc tự nhiên từ dòng trên xuống dòng dưới và từ trái qua phải.
4. **Lưu ý Quy Trình Đóng Gói (Build Dist)**:
   - Không tự động thực chạy script `build_dist.sh`, người dùng sẽ tự chạy thủ công khi cần.

---

## 2. Chi Tiết Các Bước Triển Khai Mã Nguồn (Implementation Steps)

### Bước 1: Bổ sung API Backend trong [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py)

#### 1.1. Định nghĩa Pydantic Request Model (Bổ sung `line_spacing_mm`)
```python
class FontGcodeRequest(BaseModel):
    font_name: str
    text: str
    font_size_pt: float = 72.0
    line_spacing: float = 1.2      # Tỷ lệ khoảng cách dòng (Mặc định 1.2x)
    line_spacing_mm: float = 0.0   # Khoảng cách bổ sung giữa các dòng tính bằng mm (Mặc định 0.0 mm)
    z_safe: float = 0.0
    z_draw: float = 45.0
    feed_rate: float = 4000.0
    margin_mm: float = 5.0
    epsilon: float = 1.2
    stroke_mode: str = "single_line"
```

#### 1.2. Công Thức Tính Spacing Nhị Phân & Đồng Bộ Hướng Trục Y
```python
MM_PER_PT = 25.4 / 72.0
RENDER_DPI = 600
font_size_px = int(req.font_size_pt * (RENDER_DPI / 72.0))
if font_size_px < 8:
    font_size_px = 8

scale_mm_per_px = (req.font_size_pt * MM_PER_PT) / font_size_px

# Quy đổi line_spacing_mm sang pixel extra
extra_spacing_px = max(0, int(req.line_spacing_mm / scale_mm_per_px))
# Tổng spacing pixel cho PIL multiline_text
spacing_px = max(0, int(font_size_px * (req.line_spacing - 1.0))) + extra_spacing_px

dummy_img = Image.new("L", (1, 1))
draw_dummy = ImageDraw.Draw(dummy_img)
bbox = draw_dummy.multiline_textbbox((0, 0), normalized_text, font=font, spacing=spacing_px)

pad_px = int(40 * (RENDER_DPI / 72.0) / 4)
raw_w_px = max(1, bbox[2] - bbox[0])
raw_h_px = max(1, bbox[3] - bbox[1])

canvas_w_px = raw_w_px + pad_px * 2
canvas_h_px = raw_h_px + pad_px * 2

img = Image.new("L", (canvas_w_px, canvas_h_px), color=255)
draw = ImageDraw.Draw(img)
draw.multiline_text((pad_px - bbox[0], pad_px - bbox[1]), normalized_text, fill=0, font=font, spacing=spacing_px)

# Trích xuất đường nét chuẩn hướng trục Y (trên xuống dưới)
raw_paths = []
for contour in contours:
    if len(contour) < 2:
        continue
    approx = cv2.approxPolyDP(contour, epsilon=req.epsilon, closed=False)
    pts = approx.reshape(-1, 2)

    path_mm = []
    for pt in pts:
        x_mm = round((pt[0] - pad_px) * scale_mm_per_px + req.margin_mm, 2)
        y_mm = round((pt[1] - pad_px) * scale_mm_per_px + req.margin_mm, 2)
        path_mm.append((x_mm, y_mm))

    if len(path_mm) >= 2:
        raw_paths.append(path_mm)

# Sắp xếp thứ tự nét vẽ từ dòng trên xuống dòng dưới
def get_sort_key(path):
    p1 = path[0]
    p2 = path[-1]
    min_y = min(p1[1], p2[1])
    min_x = min(p1[0], p2[0])
    row_bucket = int(min_y / 10.0)
    return (row_bucket, min_x)

sorted_paths = sorted(raw_paths, key=get_sort_key)
```

---

### Bước 2: Thiết Kế Giao Diện Web UI (`cncapi/static/index.html` & `styles.css`)

#### 2.1. Cửa Sổ Floating Panel (Bổ sung Ô nhập `Cách Dòng (mm)`)

```html
<!-- CẤU HÌNH KHOẢNG CÁCH DÒNG (CẬP NHẬT 20 & 21) -->
<div class="form-group-row" style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;">
  <div class="form-group">
    <label for="font-size-input">Cỡ Chữ (pt):</label>
    <input type="number" id="font-size-input" value="72" min="8" max="500" />
  </div>
  <div class="form-group">
    <label for="font-line-spacing">Cách Dòng (Tỷ lệ):</label>
    <input type="number" id="font-line-spacing" value="1.2" min="0.5" max="5.0" step="0.1" title="Tỷ lệ khoảng cách giữa các dòng (mặc định 1.2x)" />
  </div>
  <div class="form-group">
    <label for="font-line-spacing-mm">Cách Dòng (mm):</label>
    <input type="number" id="font-line-spacing-mm" value="0.0" min="0.0" max="100.0" step="1.0" title="Khoảng cách bổ sung giữa các dòng tính bằng mm" />
  </div>
</div>
```

---

### Bước 3: Xử Lý Logic Javascript (`cncapi/static/app.js`)

1. **Đọc giá trị `#font-line-spacing-mm` và gửi lên API Backend**:
   ```javascript
   const lineSpacingMmInput = document.getElementById('font-line-spacing-mm');
   const line_spacing_mm = parseFloat(lineSpacingMmInput?.value) || 0.0;

   const res = await fetch('/cncapi/v1/generate-font-gcode', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
           font_name: font_name,
           text: text,
           font_size_pt: parseFloat(fontSizeInput.value) || 72.0,
           line_spacing: parseFloat(lineSpacingInput?.value) || 1.2,
           line_spacing_mm: line_spacing_mm, // Truyền khoảng cách bổ sung mm
           feed_rate: parseFloat(feedRateInput.value) || 4000.0,
           z_safe: parseFloat(document.getElementById('pen-up-val')?.value || '0.0'),
           z_draw: parseFloat(document.getElementById('pen-down-val')?.value || '45.0'),
           stroke_mode: strokeModeSelect ? strokeModeSelect.value : 'single_line'
       })
   });
   ```
2. **Lắng nghe Sự kiện `input`/`change`**:
   Đăng ký event listener lên `#font-line-spacing-mm` để tự động cập nhật lại mã G-code và đường xem trước (preview) trên Canvas realtime khi người dùng tăng giảm milimet.

### 1.4. Mục tiêu & Nguyên Nhân Cập nhật 22 (`cncapi/whattodo.md`)
1. **Nguyên nhân bút không hạ khi click "🚀 Vẽ trên CNC"**:
   - Hàm `generate_font_gcode` trước đây chỉ sinh duy nhất câu lệnh nâng/hạ bút bằng Trục Z (`G0 Z<z_safe>` và `G1 Z<z_draw>`).
   - Khi hệ thống ở cấu hình mặc định `pen_mode = "spindle-pwm"` (Bút vẽ điều khiển bằng động cơ Servo nối với chân Spindle PWM), máy CNC không nhận được lệnh điều khiển Servo `M3 S<pen_down_pwm>` (ví dụ `M3 S45`), dẫn tới bút vẽ nằm nguyên ở vị trí nâng (Pen UP) trong suốt quá trình chạy CNC thật.
   - Đồng thời, khi bấm nút `🚀 Vẽ trên CNC`, câu lệnh G-code nét chữ chưa được tính toán cộng offset vị trí làm việc hiện tại `curWpos` (`offsetX`, `offsetY`) mà bị nhảy về gốc tọa độ máy (5, 5).
2. **Nguyên nhân G-code không vẽ đúng nét chữ như preview trên Tool Path View**:
   - Khi render ảnh chữ bằng PIL, hàng 0 đại diện cho ĐỈNH chữ và hàng H đại diện cho ĐÁY chữ.
   - Ở hệ tọa độ CNC chuẩn Cartesian (`axis_dir_y = -1`), trục Y tăng hướng lên trên (North). Nếu không lộn ngược Y trong PIL contour, ĐỈNH chữ sẽ nhận giá trị Y nhỏ (đáy giấy) và ĐÁY chữ nhận giá trị Y lớn (đỉnh giấy), dẫn tới nét chữ bị vẽ LỘN NGƯỢC theo chiều dọc trên máy CNC thật.
3. **Giải pháp xử lý**:
   - **Backend (`main.py`)**: Nhận thêm tham số `pen_mode` và `axis_dir_y`.
     - Nếu `pen_mode == "spindle-pwm"`, sinh ra câu lệnh `M3 S<z_draw>` (kèm `G4 P<pen_dwell>`) khi hạ bút và `M3 S<z_safe>` khi nâng bút. Ngược lại nếu `pen_mode == "z-axis"`, sử dụng `G1 Z<z_draw>` và `G0 Z<z_safe>`.
     - Tự động đảo chiều tọa độ Y `y_mm = round((raw_h_px - (pt[1] - pad_px)) * scale_mm_per_px + req.margin_mm, 2)` khi `axis_dir_y == -1` (hệ CNC chuẩn Cartesian), đảm bảo nét vẽ thực tế trên máy CNC trùng khớp 100% với hiển thị preview.
   - **Frontend (`static/app.js`)**:
     - Gửi `pen_mode` và `axis_dir_y` hiện tại lên Backend khi tạo mã G-code nét chữ.
     - Khi bấm `🚀 Vẽ trên CNC`, tính toán offset tọa độ X, Y theo vị trí WPos hiện tại của đầu CNC (`X + curWpos.x`, `Y + curWpos.y`) cho toàn bộ các dòng lệnh G0/G1 để CNC hạ bút và bắt đầu vẽ ngay tại vị trí thực tế của đầu bút.

---

## 2. Chi Tiết Các Bước Triển Khai Mã Nguồn (Implementation Steps)

### Bước 1: Bổ sung API Backend trong [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py)

#### 1.1. Định nghĩa Pydantic Request Model (Bổ sung `line_spacing_mm`, `pen_mode`, `axis_dir_y`)
```python
class FontGcodeRequest(BaseModel):
    font_name: str
    text: str
    font_size_pt: float = 72.0
    line_spacing: float = 1.2      # Tỷ lệ khoảng cách dòng (Mặc định 1.2x)
    line_spacing_mm: float = 0.0   # Khoảng cách bổ sung giữa các dòng tính bằng mm (Mặc định 0.0 mm)
    z_safe: float = 0.0
    z_draw: float = 45.0
    feed_rate: float = 4000.0
    margin_mm: float = 5.0
    epsilon: float = 1.2
    stroke_mode: str = "single_line"
    pen_mode: Optional[str] = None    # Phân biệt "spindle-pwm" (Servo) và "z-axis"
    axis_dir_y: Optional[int] = None  # Hướng trục Y (-1: Cartesian chuẩn, 1: +Y xuống)
```

#### 1.3. Nạp và Truyền Toàn Bộ G-code Qua `gcode_streamer_task` (Đối chiếu `cnc/main.py`)
Đối chiếu với kiến trúc gốc ở `cnc/main.py`, khi phát toàn bộ file G-code nét chữ xuống CNC:
1. Mọi câu lệnh được đi qua `translate_command(line)` để tự động đổi các lệnh di chuyển Z thành lệnh nhấc/hạ bút Servo PWM (`M3 S...`) khi `pen_mode == "spindle-pwm"`.
2. Nạp toàn bộ danh sách lệnh `processed_lines` vào `gcode_streamer_task()` để truyền xuống GRBL theo **Giao thức đếm ký tự (Character-Counting Buffer Protocol, tối đa 127 bytes)**. Điều này loại bỏ hoàn toàn hiện tượng tràn bộ đệm làm mất câu lệnh hay lộn xộn đường nét vẽ.
Cập nhật trong `cncapi/main.py`:
```python
@app.post("/cncapi/v1/run-gcode")
@app.post("/api/run-gcode")
async def run_gcode(req: RunGcodeRequest):
    if not state.connected or not state.serial_port:
        raise HTTPException(status_code=400, detail="Chưa kết nối máy CNC")
    lines = [line.strip() for line in req.gcode.splitlines() if line.strip() and not line.strip().startswith(";")]
    state.pen_state = None  # Reset trạng thái bút
    processed_lines = []
    for line in lines:
        processed_lines.extend(translate_command(line))
        
    if state.stream_task and not state.stream_task.done():
        state.stream_task.cancel()

    state.stream_gcode_lines = processed_lines
    state.gcode_index = 0
    state.scenario_is_looping = False
    state.is_streaming = True
    state.is_paused = False
    state.stream_task = asyncio.create_task(gcode_streamer_task())
    await broadcast({"type": "stream_status", "status": "started"})
    return {"status": "success", "lines_sent": len(processed_lines)}
```

---

### Bước 2: Thiết Kế Giao Diện Web UI (`cncapi/static/index.html` & `styles.css`)

#### 2.1. Cửa Sổ Floating Panel (Bổ sung Ô nhập `Cách Dòng (mm)`)

```html
<!-- CẤU HÌNH KHOẢNG CÁCH DÒNG (CẬP NHẬT 20 & 21) -->
<div class="form-group-row" style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;">
  <div class="form-group">
    <label for="font-size-input">Cỡ Chữ (pt):</label>
    <input type="number" id="font-size-input" value="72" min="8" max="500" />
  </div>
  <div class="form-group">
    <label for="font-line-spacing">Cách Dòng (Tỷ lệ):</label>
    <input type="number" id="font-line-spacing" value="1.2" min="0.5" max="5.0" step="0.1" title="Tỷ lệ khoảng cách giữa các dòng (mặc định 1.2x)" />
  </div>
  <div class="form-group">
    <label for="font-line-spacing-mm">Cách Dòng (mm):</label>
    <input type="number" id="font-line-spacing-mm" value="0.0" min="0.0" max="100.0" step="1.0" title="Khoảng cách bổ sung giữa các dòng tính bằng mm" />
  </div>
</div>
```

---

### Bước 3: Xử Lý Logic Javascript (`cncapi/static/app.js`)

1. **Gửi `pen_mode` khi gọi API backend `/cncapi/v1/generate-font-gcode`**:
   ```javascript
   const res = await fetch('/cncapi/v1/generate-font-gcode', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
           font_name: font_name,
           text: text,
           font_size_pt: parseFloat(fontSizeInput.value) || 72.0,
           line_spacing: parseFloat(lineSpacingInput?.value) || 1.2,
           line_spacing_mm: line_spacing_mm,
           feed_rate: parseFloat(feedRateInput.value) || 4000.0,
           z_safe: parseFloat(document.getElementById('pen-up-val')?.value || '0.0'),
           z_draw: parseFloat(document.getElementById('pen-down-val')?.value || '45.0'),
           stroke_mode: strokeModeSelect ? strokeModeSelect.value : 'single_line',
           pen_mode: penMode // Phân biệt Servo PWM hoặc Z-Axis
       })
   });
   ```

2. **Cộng Offset Tọa Độ WPos Hiện Tại Khi Bấm "🚀 Vẽ trên CNC"**:
   ```javascript
   if (btnRealDraw) {
       btnRealDraw.addEventListener('click', async () => {
           const curWpos = telemetry.wpos || [0, 0, 0];
           const offsetX = curWpos[0];
           const offsetY = curWpos[1];

           const lines = fontGcode.split('\n');
           const offsetLines = lines.map(line => {
               let trimmed = line.trim();
               if (!trimmed || trimmed.startsWith(';')) return line;
               const parts = line.split(';');
               parts[0] = parts[0].replace(/([XY])(-?\d+\.?\d*)/g, (match, axis, val) => {
                   const num = parseFloat(val);
                   if (axis === 'X') return `X${(num + offsetX).toFixed(2)}`;
                   if (axis === 'Y') return `Y${(num + offsetY).toFixed(2)}`;
                   return match;
               });
               return parts.join(';');
           });

           let offsetGcode = `G90\n` + offsetLines.join('\n');
           await fetch('/cncapi/v1/run-gcode', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ gcode: offsetGcode })
           });
       });
   }
   ```

### 1.5. Mục tiêu & Triển khai Cập nhật 23 (`cncapi/whattodo.md`)
1. **Bổ sung giao diện Điều Chỉnh Nâng Cao (`⚙️ Điều Chỉnh Nâng Cao`)**:
   - Thêm phần mở rộng collapsible (`<details>`) trong Floating Panel `gcode-font-editor-panel` cho phép người dùng cấu hình trực tiếp toàn bộ 17 thuộc tính của `FontGcodeRequest`.
2. **Danh sách đầy đủ 17 thuộc tính của `FontGcodeRequest` trên UI**:
   - `font_name` (`#font-select`): Tên file font chữ.
   - `text` (`#font-text-input`): Văn bản vẽ.
   - `font_size_pt` (`#font-size-input`): Cỡ chữ pt (Mặc định `72.0`).
   - `line_spacing` (`#font-line-spacing`): Tỷ lệ giãn dòng (Mặc định `1.2`).
   - `line_spacing_mm` (`#font-line-spacing-mm`): Giãn dòng bổ sung mm (Mặc định `0.0`).
   - `feed_rate` (`#font-feed-rate`): Tốc độ di chuyển nét chữ (Mặc định `4000`).
   - `stroke_mode` (`#font-stroke-mode`): Mode nét chữ (`single_line` / `contour`).
   - `z_safe` (`#font-z-safe`): Vị trí/góc PWM khi nhấc bút (Mặc định `0.0`).
   - `z_draw` (`#font-z-draw`): Vị trí/góc PWM khi hạ bút (Mặc định `45.0`).
   - `pen_mode` (`#font-pen-mode`): Chế độ bút (`spindle-pwm` / `z-axis`).
   - `axis_dir_y` (`#font-axis-dir-y`): Hướng trục Y (Mặc định `1` [+Y hướng xuống], hoặc `-1` Cartesian chuẩn).
   - `epsilon` (`#font-epsilon`): Độ mịn nét xấp xỉ đường cong `cv2.approxPolyDP` (Mặc định `1.2`).
   - `margin_mm` (`#font-margin-mm`): Khoảng cách lề lùi viền xung quanh chữ (Mặc định `5.0 mm`).
   - `binary_threshold` (`#font-binary-thresh`): Ngưỡng phân tách nét chữ nhị phân 1-254 (Mặc định `128`).
   - `render_dpi` (`#font-render-dpi`): Độ phân giải render ảnh font chữ (Mặc định `600 DPI`).
   - `min_path_len_mm` (`#font-min-path-len`): Ngưỡng lọc rác nhiễu nét vẽ ngắn (Mặc định `0.5 mm`).
   - `sort_row_height_mm` (`#font-sort-row-h`): Độ cao nhóm hàng gom nét vẽ (Mặc định `10.0 mm`).

---

## 3. Quy Trình Kiểm Thử Thủ Công (Manual Testing Steps)

1. **Khởi động Server Backend**:
   ```bash
   python3 main.py
   ```
2. **Mở Trình Duyệt Web & Kết Nối CNC**:
   - Truy cập `http://localhost:8099`.
   - Chọn Cổng COM/Serial và bấm **Kết Nối CNC**.
3. **Thử Nghiệm Tính Năng Hạ Bút Servo (`spindle-pwm`)**:
   - Mở panel `✍️ Gcode with font`.
   - Nhập nội dung văn bản `Test Pen`.
   - Chọn chế độ điều khiển bút là `Servo PWM (Spindle PWM)`.
   - Bấm **🚀 Vẽ trên CNC**.
   - **Kỳ vọng**: Kiểm tra console log hoặc máy CNC nhận lệnh `M3 S45` (hoặc góc Servo đã cài đặt) để hạ bút chạm bề mặt vẽ trước khi di chuyển nét chữ, sau đó phát lệnh `M3 S0` để nhấc bút lên khi chuyển sang nét chữ tiếp theo.
4. **Thử Nghiệm Vị Trí Vẽ Bắt Đầu Từ Vị Trí Hiện Tại (`curWpos`)**:
   - Dùng phím di chuyển đưa đầu CNC tới tọa độ ví dụ `X=50, Y=30`.
   - Bấm **🚀 Vẽ trên CNC**.
   - **Kỳ vọng**: Chữ vẽ bắt đầu từ tọa độ `X=50, Y=30` và không bị nhấc bút bay về `(0,0)`.
5. **Thử Nghiệm Tùy Chỉnh Thông Số Nâng Cao (Cập nhật 23)**:
   - Mở mục `⚙️ Điều Chỉnh Nâng Cao (Config Nét Chữ 1 Nét)`.
   - Thay đổi **Mịn Nét (Epsilon)** từ `1.2` xuống `0.4` và xem đường nét preview mịn theo đường cong của font chữ.
   - Thay đổi **Render DPI** thành `800 DPI` hoặc `1200 DPI` để xem chữ nhỏ được trích xuất sắc nét.
   - Quan sát thông số số dòng G-code và đường nét trong ô thông tin được cập nhật realtime.

