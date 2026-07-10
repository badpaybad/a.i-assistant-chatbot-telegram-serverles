import os
os.environ["QT_QPA_PLATFORM"] = "xcb"

import matplotlib.pyplot as plt

# Tọa độ các điểm
points = {
    "BL": [
            54.760433197021484,
            629.47314453125
        ],
        "TR": [
            622.5621337890625,
            187.6825714111328
        ],
        "BR": [
            608.6796875,
            644.039794921875
        ],
        "TL": [
            78.49567413330078,
            153.93231201171875
        ]
}

# Tách x và y để vẽ đường biên tứ giác (nối theo thứ tự TL -> TR -> BR -> BL -> TL)
x_coords = [points["TL"][0], points["TR"][0], points["BR"][0], points["BL"][0], points["TL"][0]]
y_coords = [points["TL"][1], points["TR"][1], points["BR"][1], points["BL"][1], points["TL"][1]]

plt.figure(figsize=(7, 6))

# Vẽ tứ giác CNC
plt.plot(x_coords, y_coords, 'b-', label='CNC Boundary', linewidth=2)

# Vẽ các điểm đỉnh
for name, coord in points.items():
    plt.plot(coord[0], coord[1], 'ro')
    plt.text(coord[0], coord[1], f' {name}\n ({int(coord[0])}, {int(coord[1])})', verticalalignment='bottom')

# Vẽ điểm HOME (0,0)
plt.plot(0, 0, 'g*', markersize=15, label='CNC HOME (0,0)')
plt.text(5, 5, ' HOME (0,0)', color='green', fontweight='bold')

# Cấu hình đồ thị
plt.axhline(0, color='black', linewidth=0.5, linestyle='--')
plt.axvline(0, color='black', linewidth=0.5, linestyle='--')
plt.grid(True, which='both', linestyle=':', alpha=0.5)
plt.xlabel('Trục X')
plt.ylabel('Trục Y')
plt.title('Sơ đồ 4 điểm ArUco CNC và điểm HOME')
plt.legend()

# Đảo ngược trục Y nếu hệ thống camera của bạn coi hướng xuống là Dương
plt.gca().invert_yaxis() 

plt.show()