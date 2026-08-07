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

---

## 3. Quy Trình Kiểm Thử Thủ Công (Manual Testing Steps)

1. **Khởi động Server Backend**:
   ```bash
   python3 cncapi/main.py
   ```
2. **Mở Trình Duyệt Web**:
   - Truy cập `http://localhost:8099`.
3. **Thử Nghiệm Hiển Thị Đúng Hướng Chữ**:
   - Mở panel `✍️ Gcode with font`.
   - Nhập nội dung văn bản (ví dụ: `Xin Chào CNC`).
   - Quan sát chữ hiển thị trên Tool Path View Canvas đúng chiều xuôi, chữ đọc bình thường không bị lộn ngược từ dưới lên.
