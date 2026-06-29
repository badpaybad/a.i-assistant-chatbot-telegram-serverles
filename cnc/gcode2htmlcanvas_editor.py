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
                    segments.append({
                        "x1": current_x, "y1": current_y,
                        "x2": new_x, "y2": new_y
                    })
                
                current_x = new_x
                current_y = new_y
                
    return segments

def generate_editable_html_canvas(segments, output_html_path):
    if not segments:
        print("Không có dữ liệu vẽ.")
        return
        
    all_x = [s["x1"] for s in segments] + [s["x2"] for s in segments]
    all_y = [s["y1"] for s in segments] + [s["y2"] for s in segments]
    
    min_x, max_x = min(all_x), max(all_x)
    min_y, max_y = min(all_y), max(all_y)
    
    json_data = json.dumps(segments)
    
    html_template = f"""<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Bộ chỉnh sửa G-Code trực quan</title>
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
        h2 {{ color: #333; margin-bottom: 5px; }}
        .instructions {{
            color: #555;
            font-size: 14px;
            margin-bottom: 15px;
            background: #fff;
            padding: 10px 15px;
            border-radius: 6px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }}
        canvas {{
            background-color: #ffffff;
            border: 2px solid #aaa;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            cursor: default;
        }}
        .controls {{
            margin-top: 15px;
            display: flex;
            gap: 15px;
            align-items: center;
        }}
        button {{
            background-color: #2e7d32;
            color: white;
            border: none;
            padding: 10px 20px;
            font-size: 15px;
            font-weight: bold;
            border-radius: 4px;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }}
        button:hover {{ background-color: #1b5e20; }}
    </style>
</head>
<body>

    <h2>Bộ chỉnh sửa nét vẽ CNC</h2>
    <div class="instructions">
        💡 <b>Hướng dẫn:</b> Click và kéo các <b>nút tròn màu đỏ</b> để chỉnh tọa độ. 
        Giữ phím <b>Shift</b> trong khi kéo để tự động khóa đường thẳng đứng/ngang!
    </div>
    
    <canvas id="gcodeCanvas" width="800" height="600"></canvas>

    <div class="controls">
        <div>
            <label>Độ dày nét: </label>
            <input type="range" id="lineWidthRange" min="1" max="10" value="2" step="0.5">
            <span id="widthValue">2</span> px
        </div>
        <button id="saveBtn">Lưu lại File G-Code (.gcode)</button>
    </div>

    <script>
        // Tọa độ gốc từ Python sang
        let segments = {json_data};
        
        const minX = {min_x}, maxX = {max_x};
        const minY = {min_y}, maxY = {max_y};
        
        const canvas = document.getElementById('gcodeCanvas');
        const ctx = canvas.getContext('2d');
        const slider = document.getElementById('lineWidthRange');
        const widthValue = document.getElementById('widthValue');
        const saveBtn = document.getElementById('saveBtn');
        
        const padding = 40;
        const gcodeWidth = maxX - minX;
        const gcodeHeight = maxY - minY;
        const scaleX = (canvas.width - padding * 2) / (gcodeWidth || 1);
        const scaleY = (canvas.height - padding * 2) / (gcodeHeight || 1);
        const scale = Math.min(scaleX, scaleY);
        
        // Cấu hình tương tác chỉnh sửa
        let selectedPoint = null; // Lưu thông tin điểm đang được chọn để kéo {segIndex, pointType: 'start'|'end'}
        let isShiftPressed = false;
        const NODE_RADIUS = 5; // Bán kính vòng tròn tương tác
        
        // Theo dõi phím Shift để bật tính năng tự nắn thẳng
        window.addEventListener('keydown', (e) => {{ if(e.key === 'Shift') isShiftPressed = true; }});
        window.addEventListener('keyup', (e) => {{ if(e.key === 'Shift') isShiftPressed = false; }});

        // Hàm chuyển đổi ngược từ tọa độ Canvas Pixel về tọa độ thực tế Máy CNC
        function canvasToReal(canvasX, canvasY) {{
            let rx = (canvasX - padding) / scale + minX;
            let ry = (canvasY - padding) / scale + minY;
            return {{ x: rx, y: ry }};
        }}

        // Hàm chuyển đổi từ tọa độ thực tế Máy CNC sang tọa độ Canvas Pixel
        function realToCanvas(rx, ry) {{
            let cx = padding + (rx - minX) * scale;
            let cy = padding + (ry - minY) * scale;
            return {{ x: cx, y: cy }};
        }}

        function draw() {{
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const lineW = parseFloat(slider.value);
            
            // 1. Vẽ các đường nét liên kết
            ctx.lineWidth = lineW;
            ctx.strokeStyle = '#1e88e5';
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            
            segments.forEach(seg => {{
                let p1 = realToCanvas(seg.x1, seg.y1);
                let p2 = realToCanvas(seg.x2, seg.y2);
                
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }});
            
            // 2. Vẽ các nút đỏ tại điểm mút để người dùng tương tác kéo thả
            segments.forEach(seg => {{
                let p1 = realToCanvas(seg.x1, seg.y1);
                let p2 = realToCanvas(seg.x2, seg.y2);
                
                [p1, p2].forEach(p => {{
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, NODE_RADIUS, 0, 2 * Math.PI);
                    ctx.fillStyle = '#e53935';
                    ctx.fill();
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = '#fff';
                    ctx.stroke();
                }});
            }});
        }}

        // Bắt sự kiện Click chuột xuống để tìm xem người dùng có ấn trúng nút đỏ nào không
        canvas.addEventListener('mousedown', (e) => {{
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            for (let i = 0; i < segments.length; i++) {{
                let p1 = realToCanvas(segments[i].x1, segments[i].y1);
                let p2 = realToCanvas(segments[i].x2, segments[i].y2);
                
                // Kiểm tra điểm đầu x1, y1
                if (Math.hypot(p1.x - mouseX, p1.y - mouseY) < NODE_RADIUS + 4) {{
                    selectedPoint = {{ index: i, type: 'start' }};
                    canvas.style.cursor = 'grabbing';
                    break;
                }}
                // Kiểm tra điểm cuối x2, y2
                if (Math.hypot(p2.x - mouseX, p2.y - mouseY) < NODE_RADIUS + 4) {{
                    selectedPoint = {{ index: i, type: 'end' }};
                    canvas.style.cursor = 'grabbing';
                    break;
                }}
            }}
        }});

        // Bắt sự kiện kéo chuột di chuyển để cập nhật vị trí điểm mút
        canvas.addEventListener('mousemove', (e) => {{
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            // Đổi hiệu ứng chuột khi hover qua nút đỏ
            if (!selectedPoint) {{
                let hover = false;
                for (let i = 0; i < segments.length; i++) {{
                    let p1 = realToCanvas(segments[i].x1, segments[i].y1);
                    let p2 = realToCanvas(segments[i].x2, segments[i].y2);
                    if (Math.hypot(p1.x - mouseX, p1.y - mouseY) < NODE_RADIUS + 4 || 
                        Math.hypot(p2.x - mouseX, p2.y - mouseY) < NODE_RADIUS + 4) {{
                        hover = true;
                        break;
                    }}
                }}
                canvas.style.cursor = hover ? 'pointer' : 'default';
            }}
            
            // Thực hiện tính toán dịch chuyển vị trí nút
            if (selectedPoint) {{
                let realCoords = canvasToReal(mouseX, mouseY);
                let seg = segments[selectedPoint.index];
                
                if (selectedPoint.type === 'start') {{
                    seg.x1 = realCoords.x;
                    seg.y1 = realCoords.y;
                    
                    // Cơ chế nắn thẳng (Snap) khi đè nút Shift
                    if (isShiftPressed) {{
                        if (Math.abs(seg.x1 - seg.x2) < Math.abs(seg.y1 - seg.y2)) {{
                            seg.x1 = seg.x2; // Nắn thẳng đứng
                        }} else {{
                            seg.y1 = seg.y2; // Nắn nằm ngang
                        }}
                    }}
                }} else {{
                    seg.x2 = realCoords.x;
                    seg.y2 = realCoords.y;
                    
                    if (isShiftPressed) {{
                        if (Math.abs(seg.x2 - seg.x1) < Math.abs(seg.y2 - seg.y1)) {{
                            seg.x2 = seg.x1; 
                        }} else {{
                            seg.y2 = seg.y1;
                        }}
                    }}
                }}
                draw();
            }}
        }});

        // Nhả chuột ra thì ngừng kéo
        window.addEventListener('mouseup', () => {{
            if (selectedPoint) {{
                selectedPoint = null;
                canvas.style.cursor = 'default';
            }}
        }});

        slider.addEventListener('input', (e) => {{
            widthValue.innerText = e.target.value;
            draw();
        }});

        // BIÊN DỊCH NGƯỢC VÀ TẢI XUỐNG FILE G-CODE MỚI
        saveBtn.addEventListener('click', () => {{
            let gcodeLines = [];
            gcodeLines.push("; File được chỉnh sửa từ Trình duyệt Web Canvas");
            gcodeLines.push("G21 ; Thang do mm");
            gcodeLines.push("G90 ; Toa do tuyet doi");
            gcodeLines.push("G0 Z5.000 ; Nhac but an toan");
            
            let lastX = null;
            let lastY = null;
            
            segments.forEach(seg => {{
                // Đăng ký lệnh G0 di chuyển nhanh nếu điểm bắt đầu mới không nối tiếp điểm cũ
                if (lastX === null || Math.abs(seg.x1 - lastX) > 0.001 || Math.abs(seg.y1 - lastY) > 0.001) {{
                    gcodeLines.push(`G0 X${{seg.x1.toFixed(3)}} Y${{seg.y1.toFixed(3)}}`);
                }}
                // Lệnh hạ bút vẽ G1
                gcodeLines.push(`G1 X${{seg.x2.toFixed(3)}} Y${{seg.y2.toFixed(3)}} F1200`);
                
                lastX = seg.x2;
                lastY = seg.y2;
            }});
            
            gcodeLines.push("G0 Z5.000 ; Nhac but khi ket thuc");
            gcodeLines.push("M30 ; Ket thuc chuong trinh");
            
            // Tạo công cụ download file tự động trong JS
            const gcodeText = gcodeLines.join('\\n');
            const blob = new Blob([gcodeText], {{ type: 'text/plain' }});
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'edited_output.gcode';
            link.click();
        }});

        // Khởi chạy vẽ ban đầu
        draw();
    </script>
</body>
</html>
"""
    with open(output_html_path, 'w', encoding='utf-8') as f:
        f.write(html_template)
    print(f"Đã xuất trình chỉnh sửa thành công: {output_html_path}")

if __name__ == "__main__":
    # --- CHẠY CHƯƠNG TRÌNH ---
    gcode_file = 've_spindle_net_don.nc'  # Đổi thành đường dẫn file của bạn
    output_html = 'gcode_editor.html'

    try:
        gcode_data = parse_gcode_to_json(gcode_file)
        generate_editable_html_canvas(gcode_data, output_html)
    except FileNotFoundError:
        print(f"Không tìm thấy file: {gcode_file}")