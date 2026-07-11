import os
os.environ["QT_QPA_PLATFORM"] = "xcb"

import json
import math
import matplotlib.pyplot as plt
import numpy as np

# 1. Đọc dữ liệu từ file JSON
file_path = "calibration_settings.json"

try:
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)
except FileNotFoundError:
    print(f"Không tìm thấy file {file_path}. Hãy kiểm tra lại đường dẫn.")
    exit()

# Lấy ma trận biến đổi từ JSON
M = np.array(data["matrix"]) if "matrix" in data and data["matrix"] else None

# Hàm Homography cũ
def transform_homography(x, y):
    if M is None:
        return None
    p = np.array([x, y, 1.0])
    res = M @ p
    return res[0] / res[2], res[1] / res[2]

# Hàm v48
def pixel_to_cnc_v48(px, py):
    fo = data.get("frame_o", {"x": 360.0, "y": 360.0})
    co = data.get("cnc_o", {"x": 0.0, "y": 0.0})
    h = data.get("camera_height", 542.0)
    
    fox, foy = float(fo["x"]), float(fo["y"])
    cox, coy = float(co["x"]), float(co["y"])
    
    dx = px - fox
    dy = py - foy
    r_px = math.sqrt(dx**2 + dy**2)
    if r_px < 1e-5:
        return cox, coy
        
    if dx >= 0 and dy >= 0:
        f_corner = data["frame_br"]
        c_corner = data["cnc_br"]
    elif dx < 0 and dy >= 0:
        f_corner = data["frame_bl"]
        c_corner = data["cnc_bl"]
    elif dx < 0 and dy < 0:
        f_corner = data["frame_tl"]
        c_corner = data["cnc_tl"]
    else:
        f_corner = data["frame_tr"]
        c_corner = data["cnc_tr"]
        
    fcx, fcy = float(f_corner["x"]), float(f_corner["y"])
    ccx, ccy = float(c_corner["x"]), float(c_corner["y"])
    
    fdx = fcx - fox
    fdy = fcy - foy
    cdx = ccx - cox
    cdy = ccy - coy
    
    r_px_corner = math.sqrt(fdx**2 + fdy**2)
    r_cnc_corner = math.sqrt(cdx**2 + cdy**2)
    
    if r_px_corner < 1e-5 or r_cnc_corner < 1e-5:
        return None
        
    theta_c_corner = math.atan(r_cnc_corner / h)
    theta_c_target = (r_px / r_px_corner) * theta_c_corner
    r_cnc_target = h * math.tan(theta_c_target)
    r_cnc_linear = r_px * (r_cnc_corner / r_px_corner)
    C = r_cnc_target / r_cnc_linear if r_cnc_linear > 1e-5 else 1.0
    
    scale_x = cdx / fdx
    scale_y = cdy / fdy
    
    cnc_x = cox + dx * scale_x * C
    cnc_y = coy + dy * scale_y * C
    return cnc_x, cnc_y

# Hàm v49 mới
def pixel_to_cnc_v49(px, py):
    fo = data.get("frame_o", {"x": 360.0, "y": 360.0})
    co = data.get("cnc_o", {"x": 0.0, "y": 0.0})
    h = data.get("camera_height", 542.0)
    
    fox, foy = float(fo["x"]), float(fo["y"])
    cox, coy = float(co["x"]), float(co["y"])
    
    dx = px - fox
    dy = py - foy
    r_px = math.sqrt(dx**2 + dy**2)
    if r_px < 1e-5:
        return cox, coy
        
    corners = {
        "TL": data["frame_tl"],
        "TR": data["frame_tr"],
        "BR": data["frame_br"],
        "BL": data["frame_bl"]
    }
    cnc_corners = {
        "TL": data["cnc_tl"],
        "TR": data["cnc_tr"],
        "BR": data["cnc_br"],
        "BL": data["cnc_bl"]
    }
    
    triangles = [
        ("TR", "BR"),
        ("BR", "BL"),
        ("BL", "TL"),
        ("TL", "TR")
    ]
    
    best_val = -float('inf')
    best_coords = None
    best_tri = None
    
    for A_name, B_name in triangles:
        A = corners[A_name]
        B = corners[B_name]
        v1_x = float(A["x"]) - fox
        v1_y = float(A["y"]) - foy
        v2_x = float(B["x"]) - fox
        v2_y = float(B["y"]) - foy
        vp_x = px - fox
        vp_y = py - foy
        
        D = v1_x * v2_y - v1_y * v2_x
        if abs(D) < 1e-6:
            continue
            
        w1 = (vp_x * v2_y - vp_y * v2_x) / D
        w2 = (v1_x * vp_y - v1_y * vp_x) / D
        w0 = 1.0 - w1 - w2
        
        val = min(w1, w2)
        if val > best_val:
            best_val = val
            best_coords = (w0, w1, w2)
            best_tri = (A_name, B_name)
            
    if best_coords is None:
        return None
        
    w0, w1, w2 = best_coords
    A_name, B_name = best_tri
    
    A_px = (float(corners[A_name]["x"]), float(corners[A_name]["y"]))
    B_px = (float(corners[B_name]["x"]), float(corners[B_name]["y"]))
    A_cnc = (float(cnc_corners[A_name]["x"]), float(cnc_corners[A_name]["y"]))
    B_cnc = (float(cnc_corners[B_name]["x"]), float(cnc_corners[B_name]["y"]))
    O_cnc = (cox, coy)
    
    sum_w = w1 + w2
    if abs(sum_w) < 1e-6:
        return w0 * O_cnc[0] + w1 * A_cnc[0] + w2 * B_cnc[0], w0 * O_cnc[1] + w1 * A_cnc[1] + w2 * B_cnc[1]
        
    t = w2 / sum_w
    t = max(0.0, min(1.0, t))
    
    K_px = ((1.0 - t) * A_px[0] + t * B_px[0], (1.0 - t) * A_px[1] + t * B_px[1])
    K_cnc = ((1.0 - t) * A_cnc[0] + t * B_cnc[0], (1.0 - t) * A_cnc[1] + t * B_cnc[1])
    
    r_px_K = math.sqrt((K_px[0] - fox)**2 + (K_px[1] - foy)**2)
    r_cnc_K = math.sqrt((K_cnc[0] - cox)**2 + (K_cnc[1] - coy)**2)
    
    if r_px_K < 1e-5 or r_cnc_K < 1e-5:
        return w0 * O_cnc[0] + w1 * A_cnc[0] + w2 * B_cnc[0], w0 * O_cnc[1] + w1 * A_cnc[1] + w2 * B_cnc[1]
        
    theta_c_corner = math.atan(r_cnc_K / h)
    theta_c_target = (r_px / r_px_K) * theta_c_corner
    r_cnc_target = h * math.tan(theta_c_target)
    r_cnc_linear = r_px * (r_cnc_K / r_px_K)
    
    C = r_cnc_target / r_cnc_linear if r_cnc_linear > 1e-5 else 1.0
    C = max(0.2, min(5.0, C))
    
    cnc_x_lin = w0 * O_cnc[0] + w1 * A_cnc[0] + w2 * B_cnc[0]
    cnc_y_lin = w0 * O_cnc[1] + w1 * A_cnc[1] + w2 * B_cnc[1]
    
    cnc_x = O_cnc[0] + (cnc_x_lin - O_cnc[0]) * C
    cnc_y = O_cnc[1] + (cnc_y_lin - O_cnc[1]) * C
    return cnc_x, cnc_y

# --- TRÍCH XUẤT DỮ LIỆU ĐỂ VẼ ---
keys = ["tl", "tr", "br", "bl", "tl"]
labels = ["TL", "TR", "BR", "BL"]

frame_x = [data[f"frame_{k}"]["x"] for k in keys]
frame_y = [data[f"frame_{k}"]["y"] for k in keys]

cnc_x = [data[f"cnc_{k}"]["x"] for k in keys]
cnc_y = [data[f"cnc_{k}"]["y"] for k in keys]

# Tính toán quy đổi
homg_x, homg_y = [], []
v48_x, v48_y = [], []
v49_x, v49_y = [], []

for k in keys:
    px, py = data[f"frame_{k}"]["x"], data[f"frame_{k}"]["y"]
    
    hx, hy = transform_homography(px, py) if M is not None else (0.0, 0.0)
    homg_x.append(hx)
    homg_y.append(hy)
    
    res48 = pixel_to_cnc_v48(px, py)
    v48_x.append(res48[0] if res48 else 0.0)
    v48_y.append(res48[1] if res48 else 0.0)
    
    res49 = pixel_to_cnc_v49(px, py)
    v49_x.append(res49[0] if res49 else 0.0)
    v49_y.append(res49[1] if res49 else 0.0)

frame_o = (data["frame_o"]["x"], data["frame_o"]["y"])
cnc_o = (data["cnc_o"]["x"], data["cnc_o"]["y"])

# Biến đổi điểm Origin
homg_o = transform_homography(frame_o[0], frame_o[1]) if M is not None else (0.0, 0.0)
res48_o = pixel_to_cnc_v48(frame_o[0], frame_o[1])
res49_o = pixel_to_cnc_v49(frame_o[0], frame_o[1])

# --- BẮT ĐẦU VẼ ĐỒ THỊ ---
fig, (ax1, ax2, ax3) = plt.subplots(1, 3, figsize=(20, 6.5))

# BIỂU ĐỒ 1: Không gian Camera (Pixels)
ax1.plot(frame_x, frame_y, "b-o", label="Khung ảnh Camera (720x720)")
ax1.scatter(frame_o[0], frame_o[1], color="red", s=100, label="Tâm ảnh O(360,360)")
for i, l in enumerate(labels):
    ax1.text(frame_x[i], frame_y[i], f" {l}", color="blue", verticalalignment="bottom")
ax1.set_title("1. Không gian Camera (Pixels)")
ax1.set_xlabel("X (pixels)")
ax1.set_ylabel("Y (pixels)")
ax1.invert_yaxis()  # Đảo ngược trục Y theo chuẩn pixel
ax1.grid(True, linestyle="--", alpha=0.5)
ax1.set_aspect("equal")
ax1.legend()

# BIỂU ĐỒ 2: Không gian Máy CNC thực tế (mm)
ax2.plot(cnc_x, cnc_y, "m-s", label="Bàn máy CNC thực tế", alpha=0.8)
ax2.scatter(cnc_o[0], cnc_o[1], color="red", s=100, label="Gốc CNC O(0,0)")
for i, l in enumerate(labels):
    ax2.text(cnc_x[i], cnc_y[i], f" {l}", color="magenta", verticalalignment="bottom")
ax2.set_title("2. Không gian Máy CNC (mm)")
ax2.set_xlabel("X (mm)")
ax2.set_ylabel("Y (mm)")
ax2.grid(True, linestyle="--", alpha=0.5)
ax2.set_aspect("equal")
ax2.legend()

# BIỂU ĐỒ 3: SO SÁNH CÁC PHƯƠNG PHÁP HIỆU CHUẨN
# Vẽ bàn CNC làm nền
ax3.plot(cnc_x, cnc_y, "m-s", label="CNC Thực tế (mm)", alpha=0.3, linewidth=3)
# Vẽ Homography
if M is not None:
    ax3.plot(homg_x, homg_y, "b--o", label="Homography Matrix", alpha=0.7)
# Vẽ v48
ax3.plot(v48_x, v48_y, "y-.^", label="Cập nhật 48 (Quadrant-based)", alpha=0.8)
# Vẽ v49
ax3.plot(v49_x, v49_y, "g-d", label="Cập nhật 49 (Quad-based Piecewise)", alpha=0.9, linewidth=2)

# Gốc tọa độ
ax3.scatter(cnc_o[0], cnc_o[1], color="red", s=120, zorder=5)
ax3.text(cnc_o[0], cnc_o[1], " Gốc thực tế", color="red", verticalalignment="top")

if res49_o:
    ax3.scatter(res49_o[0], res49_o[1], color="green", marker="x", s=100, label="v49 Tâm quy đổi", zorder=5)

ax3.set_title("3. So sánh 3 phương pháp quy đổi sang CNC (mm)")
ax3.set_xlabel("X (mm)")
ax3.set_ylabel("Y (mm)")
ax3.grid(True, linestyle="--", alpha=0.5)
ax3.set_aspect("equal")
ax3.legend(loc="upper left", bbox_to_anchor=(1, 1))

plt.tight_layout()
# Lưu đồ thị dạng ảnh để báo cáo
plt.savefig("calibration_comparison.png", dpi=150, bbox_inches='tight')
print("Đã tạo và lưu biểu đồ so sánh thành công tại 'calibration_comparison.png'")