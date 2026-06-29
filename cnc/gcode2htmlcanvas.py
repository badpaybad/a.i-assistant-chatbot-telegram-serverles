import re
import json

def parse_gcode_to_json(file_path):
    segments = []
    current_x = 0.0
    current_y = 0.0
    
    x_pattern = re.compile(r'X([\d\.-]+)')
    y_pattern = re.compile(r'Y([\d\.-]+)')
    
    with open(file_path, 'r') as file:
        for line in file:
            line = line.strip()
            if not line or line.startswith(';') or line.startswith('('):
                continue
                
            if line.startswith('G0') or line.startswith('G1') or ('X' in line or 'Y' in line):
                x_match = x_pattern.search(line)
                y_match = y_pattern.search(line)
                
                new_x = float(x_match.group(1)) if x_match else current_x
                new_y = float(y_match.group(1)) if y_match else current_y
                
                is_drawing = 'G1' in line or (not 'G0' in line and not 'G00' in line)
                
                if is_drawing:
                    # Lưu tọa độ điểm đầu và điểm cuối
                    segments.append({
                        "x1": current_x, "y1": current_y,
                        "x2": new_x, "y2": new_y
                    })
                
                current_x = new_x
                current_y = new_y
                
    return segments

def generate_html_canvas(segments, output_html_path):
    # Tìm giới hạn tọa độ để tự động căn chỉnh (Scale) hình ảnh vừa vặn với Canvas
    if not segments:
        print("Không có dữ liệu vẽ.")
        return
        
    all_x = [s["x1"] for s in segments] + [s["x2"] for s in segments]
    all_y = [s["y1"] for s in segments] + [s["y2"] for s in segments]
    
    min_x, max_x = min(all_x), max(all_x)
    min_y, max_y = min(all_y), max(all_y)
    
    # Chuyển đổi dữ liệu sang chuỗi JSON để nhúng vào JS
    json_data = json.dumps(segments)
    
    # Nội dung file HTML mã hóa cứng cấu trúc vẽ Canvas
    html_template = f"""<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Mô phỏng G-Code trên HTML Canvas</title>
    <style>
        body {{
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #f0f2f5;
            margin: 0;
            padding: 20px;
        }}
        h2 {{ color: #333; }}
        canvas {{
            background-color: #ffffff;
            border: 2px solid #ccc;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }}
        .controls {{ margin-bottom: 15px; }}
    </style>
</head>
<body>

    <h2>Đường vẽ đầu CNC (HTML Canvas)</h2>
    <div class="controls">
        <label>Độ dày nét vẽ: </label>
        <input type="range" id="lineWidthRange" min="1" max="10" value="2" step="0.5">
        <span id="widthValue">2</span> px
    </div>
    
    <canvas id="gcodeCanvas" width="800" height="600"></canvas>

    <script>
        // Dữ liệu tọa độ từ Python chuyển sang
        const segments = {json_data};
        
        // Giới hạn tọa độ gốc từ file G-code
        const minX = {min_x}, maxX = {max_x};
        const minY = {min_y}, maxY = {max_y};
        
        const canvas = document.getElementById('gcodeCanvas');
        const ctx = canvas.getContext('2d');
        const slider = document.getElementById('lineWidthRange');
        const widthValue = document.getElementById('widthValue');
        
        function draw(lineWidth) {{
            // Xóa sạch canvas trước khi vẽ lại
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const padding = 40; // Khoảng cách đệm từ rìa canvas
            const gcodeWidth = maxX - minX;
            const gcodeHeight = maxY - minY;
            
            // Tính toán tỷ lệ scale để hình ảnh luôn nằm vừa vặn trong Canvas 800x600
            const scaleX = (canvas.width - padding * 2) / (gcodeWidth || 1);
            const scaleY = (canvas.height - padding * 2) / (gcodeHeight || 1);
            const scale = Math.min(scaleX, scaleY); // Giữ nguyên tỉ lệ hình dáng (Aspect Ratio)
            
            // Cấu hình nét vẽ
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = '#1e88e5'; // Màu xanh dương
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            
            // Tiến hành vẽ từng đoạn thẳng
            segments.forEach(seg => {{
                // 1. Dịch chuyển tọa độ về gốc (0,0)
                // 2. Nhân với tỷ lệ scale
                // 3. ĐẢO NGƯỢC TRỤC Y: canvas.height - padding - ... (Để sửa lỗi ngược gương)
              let x1 = padding + (seg.x1 - minX) * scale;
    let y1 = padding + (seg.y1 - minY) * scale; // <-- Bỏ "canvas.height - padding -"
    
    let x2 = padding + (seg.x2 - minX) * scale;
    let y2 = padding + (seg.y2 - minY) * scale; // <-- Bỏ "canvas.height - padding -"
                
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }});
        }}
        
        // Lắng nghe sự thay đổi độ dày nét vẽ từ thanh trượt (Slider)
        slider.addEventListener('input', (e) => {{
            const val = e.target.value;
            widthValue.innerText = val;
            draw(parseFloat(val));
        }});

        // Chạy hàm vẽ lần đầu tiên với độ dày mặc định là 2px
        draw(2);
    </script>
</body>
</html>
"""
    with open(output_html_path, 'w', encoding='utf-8') as f:
        f.write(html_template)
    print(f"Đã xuất file giao diện web thành công: {output_html_path}")

if __name__ == "__main__":
    # --- CHẠY CHƯƠNG TRÌNH ---
    gcode_file = 've_spindle_net_don.nc'  # Thay bằng tên file gcode thực tế của bạn
    output_html = 'gcode_canvas.html'

    try:
        gcode_data = parse_gcode_to_json(gcode_file)
        generate_html_canvas(gcode_data, output_html)
    except FileNotFoundError:
        print(f"Không tìm thấy file: {gcode_file}")