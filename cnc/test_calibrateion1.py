import os
os.environ["QT_QPA_PLATFORM"] = "xcb"
import json
import matplotlib.pyplot as plt
import numpy as np

# 1. Đọc dữ liệu từ file JSON (thay 'calibration_settings.json' bằng đường dẫn file của bạn)
file_path = "calibration_settings.json"

try:
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)
except FileNotFoundError:
    print(f"Không tìm thấy file {file_path}. Hãy kiểm tra lại đường dẫn.")
    exit()

# Lấy ma trận biến đổi từ JSON
M = np.array(data["matrix"])


# Hàm áp dụng ma trận Homography để chuyển đổi tọa độ Pixel (Camera) sang mm (CNC)
def transform_point(x, y):
    p = np.array([x, y, 1.0])
    res = M @ p
    return res[0] / res[2], res[1] / res[2]


# Khởi tạo các điểm vẽ theo thứ tự khép kín: TL -> TR -> BR -> BL -> TL
keys = ["tl", "tr", "br", "bl", "tl"]
labels = ["TL", "TR", "BR", "BL"]

# --- TRÍCH XUẤT DỮ LIỆU ---
# Tọa độ Camera (Pixels)
frame_x = [data[f"frame_{k}"]["x"] for k in keys]
frame_y = [data[f"frame_{k}"]["y"] for k in keys]

# Tọa độ CNC thực tế (mm)
cnc_x = [data[f"cnc_{k}"]["x"] for k in keys]
cnc_y = [data[f"cnc_{k}"]["y"] for k in keys]

# Tọa độ Camera sau khi được Ma Trận chuyển đổi sang mm
trans_x, trans_y = [], []
for k in keys:
    tx, ty = transform_point(data[f"frame_{k}"]["x"], data[f"frame_{k}"]["y"])
    trans_x.append(tx)
    trans_y.append(ty)

# Tọa độ các điểm đặc biệt khác
frame_o = (data["frame_o"]["x"], data["frame_o"]["y"])
frame_last = (data["frame_last"]["x"], data["frame_last"]["y"])

cnc_o = (data["cnc_o"]["x"], data["cnc_o"]["y"])
cnc_last = (data["cnc_last"]["x"], data["cnc_last"]["y"])

# Biến đổi các điểm đặc biệt từ pixel sang mm bằng ma trận
trans_o_x, trans_o_y = transform_point(frame_o[0], frame_o[1])
trans_last_x, trans_last_y = transform_point(frame_last[0], frame_last[1])


# --- BẮT ĐẦU VẼ ĐỒ THỊ ---
fig, (ax1, ax2, ax3) = plt.subplots(1, 3, figsize=(18, 6))

# BIỂU ĐỒ 1: Không gian Camera (Pixels)
ax1.plot(frame_x, frame_y, "b-o", label="Khung ảnh Camera")
ax1.scatter(frame_o[0], frame_o[1], color="red", s=100, label="Tâm ảnh (O)")
ax1.scatter(
    frame_last[0],
    frame_last[1],
    color="green",
    marker="X",
    s=100,
    label="Vị trí cuối (Last)",
)
for i, l in enumerate(labels):
    ax1.text(
        frame_x[i], frame_y[i], f" {l}", color="blue", verticalalignment="bottom"
    )
ax1.set_title("1. Không gian Camera (Pixels)")
ax1.set_xlabel("X (pixels)")
ax1.set_ylabel("Y (pixels)")
ax1.invert_yaxis()  # Đảo ngược trục Y theo chuẩn pixel màn hình
ax1.grid(True, linestyle="--", alpha=0.5)
ax1.set_aspect("equal")
ax1.legend()

# BIỂU ĐỒ 2: Không gian Máy CNC (mm)
ax2.plot(cnc_x, cnc_y, "m-s", label="Bàn máy CNC thực tế")
ax2.scatter(cnc_o[0], cnc_o[1], color="red", s=100, label="Gốc CNC (0,0)")
ax2.scatter(
    cnc_last[0],
    cnc_last[1],
    color="green",
    marker="X",
    s=100,
    label="Vị trí cuối (Last)",
)
for i, l in enumerate(labels):
    ax2.text(
        cnc_x[i], cnc_y[i], f" {l}", color="magenta", verticalalignment="bottom"
    )
ax2.set_title("2. Không gian Máy CNC (mm)")
ax2.set_xlabel("X (mm)")
ax2.set_ylabel("Y (mm)")
ax2.grid(True, linestyle="--", alpha=0.5)
ax2.set_aspect("equal")
ax2.legend()

# BIỂU ĐỒ 3: CHỒNG LỚP HIỆU CHUẨN (OVERLAY)
# Vẽ bàn CNC thực tế làm nền (màu hồng)
ax3.plot(cnc_x, cnc_y, "m-s", label="CNC thực tế (mm)", alpha=0.4)
# Vẽ tọa độ Camera sau khi đã "ép" qua ma trận về mm (đường đứt nét màu xanh)
ax3.plot(trans_x, trans_y, "b--o", label="Góc nhìn Cam quy đổi (mm)")

# Điểm gốc và điểm cuối thực tế của CNC
ax3.scatter(cnc_o[0], cnc_o[1], color="red", s=120, label="Gốc CNC (0,0)")
ax3.scatter(
    cnc_last[0],
    cnc_last[1],
    color="green",
    marker="X",
    s=120,
    label="Vị trí cuối CNC",
)

# Điểm tâm ảnh và điểm cuối do Camera tính toán quy đổi ra mm
ax3.scatter(
    trans_o_x,
    trans_o_y,
    color="darkblue",
    marker="x",
    s=100,
    label="Tâm Cam quy đổi",
)
ax3.scatter(
    trans_last_x,
    trans_last_y,
    color="cyan",
    marker="P",
    s=100,
    label="Vị trí cuối Cam quy đổi",
)

# Gán nhãn các góc để thấy sự tương quan lệch
for i, l in enumerate(labels):
    ax3.text(
        cnc_x[i],
        cnc_y[i],
        f" CNC_{l}",
        color="magenta",
        verticalalignment="top",
        fontsize=9,
    )
    ax3.text(
        trans_x[i],
        trans_y[i],
        f" Cam_{l}",
        color="blue",
        verticalalignment="bottom",
        fontsize=9,
    )

ax3.set_title("3. Đồ thị Chồng lớp (Overlay - mm)")
ax3.set_xlabel("X (mm)")
ax3.set_ylabel("Y (mm)")
ax3.grid(True, linestyle="--", alpha=0.5)
ax3.set_aspect("equal")
ax3.legend(loc="upper left", bbox_to_anchor=(1, 1))  # Đẩy bảng chú thích ra ngoài cho thoáng

# Hiển thị
plt.tight_layout()
plt.show()