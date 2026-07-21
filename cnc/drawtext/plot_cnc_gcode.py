import re
import os
import matplotlib.pyplot as plt
from matplotlib.collections import LineCollection

def plot_gcode_movement(gcode_path, output_img_path):
    """
    Đọc file G-code và vẽ ảnh mô phỏng chuyển động của máy CNC:
    - Nét màu xanh lá (Green): Hạ bút vẽ (Pen Down / G1)
    - Nét nét đứt màu đỏ (Red): Nhấc bút di chuyển (Pen Up / G0)
    - Điểm màu hồng (Pink): Vị trí xuất phát (0,0)
    """
    if not os.path.exists(gcode_path):
        raise FileNotFoundError(f"Không tìm thấy file G-code: {gcode_path}")

    print(f"📊 Đang phân tích file G-code: {gcode_path}...")

    curr_x, curr_y, curr_z = 0.0, 0.0, 5.0
    pen_down = False

    draw_lines = []
    travel_lines = []

    with open(gcode_path, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith(';'):
                continue
            
            # Kiểm tra trục Z để xác định hạ/nhấc bút
            z_match = re.search(r'[Zz]([-+]?\d*\.?\d+)', line)
            if z_match:
                curr_z = float(z_match.group(1))
                pen_down = (curr_z <= 0)

            # Đọc tọa độ X và Y
            x_match = re.search(r'[Xx]([-+]?\d*\.?\d+)', line)
            y_match = re.search(r'[Yy]([-+]?\d*\.?\d+)', line)

            if x_match or y_match:
                new_x = float(x_match.group(1)) if x_match else curr_x
                new_y = float(y_match.group(1)) if y_match else curr_y
                
                if (new_x != curr_x) or (new_y != curr_y):
                    if pen_down:
                        draw_lines.append([(curr_x, curr_y), (new_x, new_y)])
                    else:
                        travel_lines.append([(curr_x, curr_y), (new_x, new_y)])
                    curr_x, curr_y = new_x, new_y

    print(f"✅ Đã trích xuất {len(draw_lines)} đoạn nét hạ bút (G1) và {len(travel_lines)} đoạn nét nhấc bút (G0).")

    # Vẽ biểu đồ mô phỏng
    fig, ax = plt.subplots(figsize=(12, 7), dpi=150)
    fig.patch.set_facecolor('#111827')
    ax.set_facecolor('#1f2937')

    # Vẽ các đoạn di chuyển nhấc bút (G0)
    if travel_lines:
        lc_travel = LineCollection(travel_lines, colors='#ef4444', linestyles='dashed', linewidths=0.6, alpha=0.5, label='Nét nhấc bút (Pen Up Travel G0)')
        ax.add_collection(lc_travel)

    # Vẽ các đoạn hạ bút tô chữ (G1)
    if draw_lines:
        lc_draw = LineCollection(draw_lines, colors='#10b981', linewidths=0.9, alpha=0.95, label='Nét hạ bút tô chữ (Pen Down G1)')
        ax.add_collection(lc_draw)

    # Đánh dấu vị trí xuất phát gốc (0,0)
    ax.scatter([0], [0], color='#ec4899', s=120, zorder=5, label='Origin (0,0) - Vị trí đầu CNC')
    ax.annotate('  Bắt đầu (0,0)', (0, 0), color='#f472b6', fontsize=11, fontweight='bold')

    ax.autoscale()
    ax.set_aspect('equal', 'box')
    ax.set_title('Mô Phỏng Quỹ Đạo Di Chuyển Đầu Bút CNC (Concentric Infill G-Code)', color='#f9fafb', fontsize=14, pad=15, fontweight='bold')
    ax.set_xlabel('X (mm)', color='#9ca3af')
    ax.set_ylabel('Y (mm)', color='#9ca3af')
    ax.tick_params(colors='#9ca3af')
    ax.grid(True, linestyle=':', alpha=0.25, color='#6b7280')
    ax.legend(loc='upper right', facecolor='#374151', edgecolor='#4b5563', labelcolor='#f3f4f6')

    plt.savefig(output_img_path, bbox_inches='tight', facecolor=fig.get_facecolor())
    plt.close(fig)
    print(f"🖼️ Đã tạo thành công ảnh minh họa: {output_img_path}")
    return output_img_path

if __name__ == "__main__":
    GCODE_FILE = "pypo_ket_qua_vector_co_lo.small_fill.nc"
    OUTPUT_IMAGE = "cnc_gcode_simulation.png"
    plot_gcode_movement(GCODE_FILE, OUTPUT_IMAGE)
