import tkinter as tk
import pyautogui

def update_coords():
    # 1. Lấy tọa độ chuột và kích thước màn hình
    x, y = pyautogui.position()
    screen_width, screen_height = pyautogui.size()
    
    # 2. Lấy kích thước của nhãn (label) sau khi vẽ
    # Cần update idletasks để tkinter tính toán chính xác kích thước cửa sổ hiện tại
    root.update_idletasks()
    window_width = root.winfo_width()
    window_height = root.winfo_height()

    # 3. Tính toán vị trí hiển thị (mặc định là bên phải và phía dưới con trỏ)
    # Khoảng cách lề (offset)
    offset_x = 15
    offset_y = 15

    # Nếu chuột sát lề phải màn hình: đẩy label sang bên trái chuột
    if x + window_width + offset_x > screen_width:
        pos_x = x - window_width - offset_x
    else:
        pos_x = x + offset_x

    # Nếu chuột sát lề dưới màn hình: đẩy label lên phía trên chuột
    if y + window_height + offset_y > screen_height:
        pos_y = y - window_height - offset_y
    else:
        pos_y = y + offset_y

    # 4. Cập nhật nội dung và di chuyển cửa sổ
    label.config(text=f"X:{x}, Y:{y}")
    root.geometry(f"+{pos_x}+{pos_y}")
    
    # Tần số 16ms (~60 FPS) là con số lý tưởng cho độ mượt và CPU
    root.after(16, update_coords)

root = tk.Tk()

# Thiết lập cửa sổ
root.overrideredirect(True)
root.attributes("-topmost", True)
root.config(bg='black')

# Thiết lập label (Chữ trắng nền đen cho rõ ràng)
label = tk.Label(root, font=('Arial', '10', 'bold'), fg='white', bg='black', padx=5, pady=2)
label.pack()

update_coords()
root.mainloop()