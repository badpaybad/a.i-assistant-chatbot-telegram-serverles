# Hướng dẫn Thiết kế & Triển khai Tính Năng "Gcode with font" cho `cncapi`

Tài liệu này chi tiết hóa cách thức hoạt động, kiến trúc và các bước triển khai tính năng **Gcode with font** (Soạn thảo văn bản và sinh mã G-code nét vẽ theo Font chữ) từ `cnc/whattodo.md` sang ứng dụng Web API [`cncapi`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/whattodo.md) theo đúng yêu cầu tại **Cập nhật 19** của [`cncapi/whattodo.md`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/whattodo.md).

---

## 1. Tổng quan Yêu cầu & Kiến trúc (Overview & Architecture)

### 1.1. Mục tiêu Cập nhật 19 (`cncapi/whattodo.md`)
1. **Bổ sung nút mở Editor `Gcode with font`**: Nằm ở Hàng 1, Cột 0 (phía trên phần **Bộ Di Chuyển & Cử Chỉ**).
2. **Thiết kế Floating Panel 1/3 góc phải màn hình**: Cửa sổ soạn thảo mở ra chiếm **1/3 chiều rộng phía bên phải** màn hình (`width: 33%`, `right: 0`), tuyệt đối **không đè hay che lấp vùng Tool Path View (Xem & Giả Lập Kịch Bản)** chiếm 50% ở cột giữa.
3. **Xem trước (Preview) trên Tool Path View**: Các đường nét chữ sau khi sinh G-code sẽ được hiển thị ngay trên Canvas của Tool Path View.
4. **Viết chữ từ vị trí hiện tại của đầu CNC**: Mã G-code nét chữ sinh ra sẽ lấy gốc tọa độ bắt đầu vẽ xuôi từ **vị trí thực tế hiện tại của đầu CNC** (tọa độ làm việc `WPos`).
5. **Nút "Vẽ xem trước" (Giả lập)**: Cho phép chạy mô phỏng nét vẽ chữ động trên Canvas Tool Path View để người dùng xem trước hành trình di chuyển của bút mà không tác động tới máy CNC thật.
6. **Nút "Vẽ trên cnc" (Chạy CNC thật)**: Gửi trực tiếp chuỗi lệnh G-code sinh ra tới bo mạch CNC để điều khiển máy CNC thực tế di chuyển và hạ bút vẽ.

---

## 2. Chi Tiết Các Bước Triển Khai Mã Nguồn (Implementation Steps)

### Bước 1: Bổ sung API Backend trong [`cncapi/main.py`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.py)

#### 1.1. Định nghĩa Pydantic Request Model
```python
class FontGcodeRequest(BaseModel):
    font_name: str
    text: str
    font_size_pt: float = 72.0
    z_safe: float = 0.0
    z_draw: float = 45.0
    feed_rate: float = 4000.0
    margin_mm: float = 5.0
    epsilon: float = 1.2
    stroke_mode: str = "single_line"
```

#### 1.2. API Lấy Danh Sách Font (`GET /cncapi/v1/fonts` & `/api/fonts`)
Đọc toàn bộ file `.ttf`, `.otf`, `.woff`, `.woff2` nằm trong thư mục `cncapi/fonts`:
```python
@app.get("/cncapi/v1/fonts")
@app.get("/api/fonts")
def list_available_fonts():
    fonts_dir = os.path.join(os.path.dirname(__file__), "fonts")
    if not os.path.exists(fonts_dir):
        os.makedirs(fonts_dir, exist_ok=True)
    font_files = []
    valid_exts = (".ttf", ".otf", ".woff", ".woff2")
    for f in os.listdir(fonts_dir):
        if f.lower().endswith(valid_exts) and f not in font_files:
            font_files.append(f)
    font_files.sort()
    return {"fonts": font_files}
```

#### 1.3. API Sinh Mã G-code Nét Chữ (`POST /cncapi/v1/generate-font-gcode` & `/api/generate-font-gcode`)
Sử dụng `PIL.ImageFont`, `skimage.morphology.skeletonize` và `cv2.findContours` để trích xuất nét vẽ single-line từ văn bản và tạo chuỗi mã G-code:
```python
@app.post("/cncapi/v1/generate-font-gcode")
@app.post("/api/generate-font-gcode")
def generate_font_gcode(req: FontGcodeRequest):
    # 1. Load Font & Render Văn Bản dạng Ảnh Nhị Phân (Binary Image)
    # 2. Rút Xương Nét Chữ (Skeletonize) để có Nét Đơn (Single Line)
    # 3. Tìm Contours & Nội Suy PolyDP để chuyển thành Tọa độ Milimet (mm)
    # 4. Sinh mã lệnh G-code (G0 Z_safe, G0 X.. Y.., G1 Z_draw F.., G1 X.. Y..)
    # 5. Trả về JSON: {"status": "ok", "gcode": gcode_str, "preview_paths": preview_paths, ...}
```

---

### Bước 2: Cập Nhật Đóng Gói PyInstaller trong [`cncapi/main.spec`](file:///work/a.i-assistant-chatbot-telegram-serverles/cncapi/main.spec)

Đảm bảo thư mục `fonts` được nạp kèm vào bản build thực thi standalone (`./dist/cncapi` & `cncapi.exe`):

```python
a = Analysis(
    ['main.py'],
    pathex=[],
    binaries=[],
    datas=[
        ('static', 'static'),
        ('fonts', 'fonts'),  # Nạp thư mục chứa font vào file đóng gói PyInstaller
    ],
    ...
)
```

---

### Bước 3: Thiết Kế Giao Diện Web UI (`cncapi/static/index.html` & `styles.css`)

#### 3.1. Bổ sung Nút Mở Panel ở Hàng 1, Cột 0 (`index.html`)
Đặt nút bấm phía trên phần **Bộ Di Chuyển (Machine Jogging)**:

```html
<!-- CỘT 0 (25%): BỘ DI CHUYỂN & GESTURES -->
<section class="main-col col-25 card glass-card">
  <div class="col-title-row" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
    <h4 class="card-title" style="margin: 0;" data-i18n>Bộ Di Chuyển & Cử Chỉ</h4>
    <button class="btn btn-warning btn-small" id="btn-open-gcode-font" title="Mở Soạn Thảo G-Code Font">
      ✍️ Gcode with font
    </button>
  </div>
  ...
```

#### 3.2. Cửa Sổ Floating Panel 1/3 Bên Phải (`index.html` & `styles.css`)
Floating panel `#gcode-font-editor-panel` được định vị cố định ở góc phải màn hình, độ rộng 33% (tối thiểu 360px):

```html
<!-- FLOATING PANEL: GCODE WITH FONT EDITOR (1/3 RIGHT) -->
<div id="gcode-font-editor-panel" class="floating-panel-right hidden">
  <div class="panel-header">
    <h3>✍️ Gcode with Font Editor</h3>
    <button class="btn-close" id="btn-close-gcode-font-editor">&times;</button>
  </div>
  <div class="panel-body">
    <!-- Chọn Font & Preset Size -->
    <div class="form-group">
      <label>Chọn Font Chữ:</label>
      <select id="font-select" class="input-select"></select>
    </div>
    <div class="form-group">
      <label>Cỡ Chữ (Font Size pt):</label>
      <div class="input-with-pills">
        <input type="number" id="font-size-input" value="72" min="8" max="500" />
        <div class="pill-group">
          <button class="font-size-pill" data-size="18">18pt</button>
          <button class="font-size-pill" data-size="36">36pt</button>
          <button class="font-size-pill active" data-size="72">72pt</button>
          <button class="font-size-pill" data-size="120">120pt</button>
        </div>
      </div>
    </div>
    <!-- Soạn Văn Bản Notepad -->
    <div class="form-group">
      <label>Nội Dung Văn Bản (Hỗ trợ xuống dòng & Tab):</label>
      <textarea id="font-text-input" rows="5" placeholder="Nhập văn bản cần vẽ..."></textarea>
    </div>
    <!-- Các Nút Thao Tác Chuẩn Cập Nhật 19 -->
    <div class="panel-actions">
      <button class="btn btn-primary" id="btn-generate-font-gcode">⚡ Tạo G-code</button>
      <button class="btn btn-info" id="btn-preview-simulate-draw">🎬 Vẽ xem trước (Giả lập)</button>
      <button class="btn btn-success" id="btn-draw-on-real-cnc">🚀 Vẽ trên CNC (Thực tế)</button>
      <button class="btn btn-secondary" id="btn-download-font-gcode">💾 Tải file .gcode</button>
    </div>
  </div>
</div>
```

```css
/* CSS Floating Panel 1/3 Right */
.floating-panel-right {
  position: fixed;
  top: 60px;
  right: 15px;
  width: 33%;
  min-width: 360px;
  max-width: 480px;
  height: calc(100vh - 80px);
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(56, 189, 248, 0.3);
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.floating-panel-right.hidden {
  opacity: 0;
  pointer-events: none;
  transform: translateX(100%);
}
```

---

### Bước 4: Xử Lý Logic Javascript & Preview trên Canvas (`cncapi/static/app.js`)

1. **Nạp Danh Sách Font**: Khi mở panel, tự động gọi `GET /cncapi/v1/fonts` để điền danh sách vào thẻ `<select id="font-select">`.
2. **Sinh G-code & Tọa Độ Bắt Đầu**: Khi nhấn "Tạo G-code" hoặc thay đổi nội dung, gửi yêu cầu tới `POST /cncapi/v1/generate-font-gcode`.
3. **Vẽ Xem Trước Từ Vị Trí Đầu CNC (`WPos`)**:
   - Lấy tọa độ hiện tại của đầu CNC: `curX = state.wpos.x`, `curY = state.wpos.y`.
   - Bù offset `(curX, curY)` vào từng điểm trong `preview_paths` để vẽ các nét chữ nối tiếp bắt đầu ngay từ vị trí hiện tại của đầu bút CNC trên Tool Path View Canvas.
4. **Nút "Vẽ xem trước" (Giả lập)**:
   - Kích hoạt vòng lặp `requestAnimationFrame` mô phỏng di chuyển bút ảo qua từng đường nét trong `preview_paths` trên Canvas Tool Path View. Không gửi mã G-code xuống cổng Serial CNC.
5. **Nút "Vẽ trên cnc" (Thực tế)**:
   - Truyền chuỗi lệnh G-code sinh ra xuống cổng Serial điều khiển CNC thực tế để máy bắt đầu thực hiện chuyển động di chuyển và hạ bút vẽ thật.

---

## 3. Quy Trình Kiểm Thử Thủ Công (Manual Testing Steps)

1. **Khởi động Server Backend**:
   ```bash
   python3 cncapi/main.py
   # hoặc chạy bản build:
   ./cncapi/dist/cncapi
   ```
2. **Mở Trình Duyệt Web**:
   - Truy cập `http://localhost:8099`.
3. **Kiểm tra Nút & Floating Panel**:
   - Nhấn nút `✍️ Gcode with font` ở Cột 0 (phía trên Bộ Di Chuyển).
   - Kiểm tra cửa sổ trượt ra từ lề phải (33% độ rộng), **không che lấp** vùng Canvas Tool Path View ở trung tâm.
4. **Tạo & Vẽ Xem Trước Giả Lập**:
   - Chọn Font chữ (ví dụ: `VL_ThuPhap.ttf` hoặc `VL_GREATVIBES.ttf`).
   - Nhập nội dung văn bản (ví dụ: `Xin Chào CNC`).
   - Nhấn nút **🎬 Vẽ xem trước (Giả lập)** để xem giả lập nét vẽ chạy chuyển động trên Canvas từ vị trí WPos của CNC.
5. **Thực Thi Máy CNC Thật**:
   - Kết nối cổng Serial CNC (`/dev/ttyACM0` hoặc `dummy`).
   - Nhấn nút **🚀 Vẽ trên CNC (Thực tế)** và kiểm tra máy CNC thực tế thực hiện lệnh vẽ.
