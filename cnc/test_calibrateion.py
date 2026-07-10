import os
os.environ["QT_QPA_PLATFORM"] = "xcb"
import matplotlib.pyplot as plt

# 1. Dữ liệu gốc từ câu hỏi của bạn
frame = {
    "o":  [360.0, 360.0],
    "tl": [80.24767801857585, 168.29721362229103],
    "tr": [625.2631578947369, 174.98452012383902],
    "br": [635.2941176470588, 641.9814241486068],
    "bl": [81.36222910216718, 646.4396284829721]
}

cnc = {
    "o":  [0.0, 0.0],
    "tl": [-135.0, -93.0],
    "tr": [126.0, -90.0],
    "br": [126.0, 132.0],
    "bl": [-135.0, 132.0]
}

# 2. Dịch chuyển tọa độ Frame để tâm (360, 360) về (0, 0) nhằm mục đích overlay
frame_shifted = {k: [v[0] - frame["o"][0], v[1] - frame["o"][1]] for k, v in frame.items()}

# 3. Chuẩn bị danh sách tọa độ để vẽ đường khép kín (TL -> TR -> BR -> BL -> TL)
order = ["tl", "tr", "br", "bl", "tl"]
f_x = [frame_shifted[k][0] for k in order]
f_y = [frame_shifted[k][1] for k in order]

c_x = [cnc[k][0] for k in order]
c_y = [cnc[k][1] for k in order]

# 4. Khởi tạo đồ thị với 2 trục khác nhau (Overlay bằng Twin Axes)
fig, ax1 = plt.subplots(figsize=(8, 7))

# Trục 1: Vẽ khung ảnh (Frame) - Đã dịch tâm
color_frame = 'tab:blue'
ax1.set_xlabel('Khoảng cách tính từ Tâm (X)', fontweight='bold')
ax1.set_ylabel('Tọa độ Pixel (Đã dịch tâm về 0)', color=color_frame)
line1 = ax1.plot(f_x, f_y, color=color_frame, linestyle='--', linewidth=2, label='Khung Frame (Pixels)')
ax1.tick_params(axis='y', labelcolor=color_frame)

# Vẽ các điểm nút của Frame
for k in ["tl", "tr", "br", "bl"]:
    ax1.plot(frame_shifted[k][0], frame_shifted[k][1], 'bo')
    ax1.text(frame_shifted[k][0], frame_shifted[k][1], f' F_{k.upper()}', color='blue', alpha=0.7)

# Trục 2: Vẽ khung CNC (Mpos - mm)
ax2 = ax1.twinx()  # Tạo trục Y thứ hai chia sẻ chung trục X
ax2 = ax1.twiny()  # Tạo trục X thứ hai nếu muốn tách biệt hoàn toàn, nhưng ở đây chung góc 0 nên chỉ cần twinx là đủ.
# Để overlay đẹp nhất và không rối, ta vẽ CNC trực tiếp lên cùng hệ tọa độ nhưng sử dụng label khác:
color_cnc = 'tab:red'
line2 = ax1.plot(c_x, c_y, color=color_cnc, linestyle='-', linewidth=2, label='Khung CNC (mm)')

# Vẽ các điểm nút của CNC
for k in ["tl", "tr", "br", "bl"]:
    ax1.plot(cnc[k][0], cnc[k][1], 'ro')
    ax1.text(cnc[k][0], cnc[k][1], f' CNC_{k.upper()}', color='red')

# Vẽ điểm Gốc chung (Tâm O / HOME)
ax1.plot(0, 0, 'g*', markersize=15, label='Tâm O (0,0) / (360,360)')
ax1.text(5, 5, '  Gốc O / HOME', color='green', fontweight='bold')

# 5. Cấu hình hiển thị
ax1.axhline(0, color='black', linewidth=0.8, linestyle=':')
ax1.axvline(0, color='black', linewidth=0.8, linestyle=':')
ax1.grid(True, linestyle='--', alpha=0.5)

# Gom legend của cả 2 đường lại làm 1
lines = line1 + line2
labels = [l.get_label() for l in lines]
ax1.legend(lines, labels, loc='upper right')

plt.title('Đồ thị Overlay: Hệ tọa độ Frame vs Hệ tọa độ CNC', fontsize=14, fontweight='bold', pad=20)

# Trong hệ tọa độ ảnh của bạn, Y hướng xuống là dương (168 ở trên, 641 ở dưới)
# CNC của bạn cũng có Y_bl, Y_br = 132 (dưới) và Y_tl, Y_tr = -93 (trên)
# Do đó ta lật ngược trục Y để đúng thực tế hiển thị camera hướng xuống
ax1.invert_yaxis()

plt.tight_layout()
plt.show()