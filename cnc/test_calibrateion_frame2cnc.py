import os
os.environ["QT_QPA_PLATFORM"] = "xcb"

import json
import matplotlib.pyplot as plt
import numpy as np

# 1. Tải dữ liệu hiệu chuẩn từ JSON
file_path = "calibration_settings.json"
with open(file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

# Lấy ma trận Homography 3x3
M = np.array(data["matrix"])

# Thứ tự các góc để vẽ khung
keys = ["tl", "tr", "br", "bl", "tl"]
frame_x = [data[f"frame_{k}"]["x"] for k in keys]
frame_y = [data[f"frame_{k}"]["y"] for k in keys]


# 2. Hàm công thức chuyển đổi từ Pixel -> CNC
def pixel_to_cnc(x_pixel, y_pixel):
    # Tạo vector tọa độ đồng nhất [x, y, 1]
    pixel_point = np.array([x_pixel, y_pixel, 1.0])

    # Nhân với ma trận M
    transformed = M @ pixel_point

    # Chia cho thành phần w (phần tử thứ 3) để ra tọa độ thực tế
    w = transformed[2]
    x_cnc = transformed[0] / w
    y_cnc = transformed[1] / w

    return x_cnc, y_cnc


# 3. Sự kiện xử lý khi click chuột lên biểu đồ
def on_click(event):
    # Kiểm tra xem người dùng có click vào vùng đồ thị không
    if event.xdata is not None and event.ydata is not None:
        x_click = event.xdata
        y_click = event.ydata

        # Áp dụng công thức tính tọa độ CNC
        x_cnc, y_cnc = pixel_to_cnc(x_click, y_click)

        # Vẽ điểm vừa click lên đồ thị để trực quan hóa
        plt.scatter(x_click, y_click, color="red", marker="o", s=50)
        plt.text(
            x_click + 10,
            y_click,
            f"CNC: ({x_cnc:.2f}, {y_cnc:.2f})",
            color="red",
            fontsize=9,
        )
        fig.canvas.draw()

        # In kết quả ra Terminal
        print(
            f"Click tại Frame Pixel: ({x_click:.1f}, {y_click:.1f}) -> Tọa độ Máy CNC tương ứng: X = {x_cnc:.3f} mm, Y = {y_cnc:.3f} mm"
        )


# 4. Giao diện hiển thị để test click
fig, ax = plt.subplots(figsize=(8, 8))
ax.plot(
    frame_x, frame_y, "b-o", linewidth=2, label="Vùng chọn trên ảnh (Frame)"
)
ax.scatter(
    data["frame_o"]["x"], data["frame_o"]["y"], color="blue", marker="x", s=100
)

ax.set_title("Hệ Tọa Độ Ảnh Camera - CLICK VÀO ĐÂY")
ax.set_xlabel("X (pixels)")
ax.set_ylabel("Y (pixels)")
ax.invert_yaxis()  # Đảo trục Y theo chuẩn camera
ax.grid(True, linestyle="--", alpha=0.5)
ax.set_aspect("equal")

# Kết nối sự kiện click chuột với hàm xử lý
fig.canvas.mpl_connect("button_press_event", on_click)

print("Mẹo: Hãy click chuột vào một điểm bất kỳ trên biểu đồ ảnh...")
plt.show()