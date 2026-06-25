import os
# Ép OpenCV sử dụng plugin xcb (X11) để hiển thị giao diện trên Ubuntu Wayland
os.environ["QT_QPA_PLATFORM"] = "xcb"

import cv2
import numpy as np

def guo_hall_thinning(img):
    """
    Giải thuật Guo-Hall chuẩn giúp làm mỏng nét chữ dày 
    nhưng giữ nguyên tính liên thông, không làm đứt gãy nét.
    """
    thin_img = img.copy() / 255
    thin_img = thin_img.astype(np.uint8)
    
    while True:
        change = False
        for iter_num in [1, 2]:
            marker = np.zeros(thin_img.shape, dtype=np.uint8)
            # Quét qua các vùng pixel để tìm xương dựa trên cấu trúc lân cận 8 hướng
            for r in range(1, thin_img.shape[0] - 1):
                for c in range(1, thin_img.shape[1] - 1):
                    if thin_img[r, c] == 1:
                        p2 = thin_img[r-1, c]
                        p3 = thin_img[r-1, c+1]
                        p4 = thin_img[r, c+1]
                        p5 = thin_img[r+1, c+1]
                        p6 = thin_img[r+1, c]
                        p7 = thin_img[r+1, c-1]
                        p8 = thin_img[r, c-1]
                        p9 = thin_img[r-1, c-1]

                        C = ((not p2) and (p3 or p4)) + ((not p4) and (p5 or p6)) + \
                            ((not p6) and (p7 or p8)) + ((not p8) and (p9 or p2))
                        N1 = (p9 or p2) + (p3 or p4) + (p5 or p6) + (p7 or p8)
                        N2 = (p2 or p3) + (p4 or p5) + (p6 or p7) + (p8 or p9)
                        N = N1 if N1 < N2 else N2
                        
                        if iter_num == 1:
                            m = (p2 * p4 * p6)
                        else:
                            m = (p2 * p4 * p8)

                        if C == 1 and (2 <= N <= 3) and m == 0:
                            marker[r, c] = 1
                            change = True
            thin_img = cv2.bitwise_and(thin_img, cv2.bitwise_not(marker))
        if not change:
            break
            
    return thin_img * 255

import cv2
import numpy as np

def image_text_to_gcode_spindle_with_preview(image_path, gcode_path, scale_factor=0.1, feed_rate=2000, mode="servo"):
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    if img is None: return
    height, width = img.shape
    
    _, thresh = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY_INV)
    
    # ĐỔI THÀNH RETR_TREE: Để lấy được cả viền ngoài chữ và các lỗ trống bên trong chữ P, A, D
    contours, _ = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    if len(contours) == 0: return

    # Sắp xếp đường viền theo tọa độ X (Từ trái sang phải) cho mạch lạc
    # Với RETR_TREE, sắp xếp theo bounding box X là tối ưu nhất để tránh nhảy nét loạn xạ
    bounding_boxes = [cv2.boundingRect(c) for c in contours]
    blob_list = list(zip(contours, bounding_boxes))
    blob_list.sort(key=lambda b: b[1][0]) # Ưu tiên chạy từ trái sang phải liên tục
    
    sorted_contours = [blob[0] for blob in blob_list if len(blob[0]) > 2]

    # Lưu và hiển thị ảnh kiểm tra lỗ trống
    preview_img = np.ones((height, width, 3), dtype=np.uint8) * 255
    for idx, contour in enumerate(sorted_contours):
        color_ratio = idx / len(sorted_contours) if len(sorted_contours) > 1 else 0
        current_color = (0, int(255 * color_ratio), int(255 * (1 - color_ratio)))
        cv2.drawContours(preview_img, [contour], -1, current_color, 2)

    cv2.imwrite("perfect_outline_preview.png", preview_img)

    # Ghi file G-code
    if mode == "servo":
        PEN_DOWN = "M3 S90 ; Ha but\nG4 P0.2"
        PEN_UP   = "M3 S10 ; Nhac but\nG4 P0.2"
    else:
        PEN_DOWN = "M3 ; Ha but\nG4 P0.5"
        PEN_UP   = "M5 ; Nhac but\nG4 P0.2"

    with open(gcode_path, "w") as f:
        f.write(";--- KHOI TAO MAY VE OUTLINE HOAN HAO ---\n")
        f.write("G21\nG90\nG10 L20 P1 X0 Y0\n")
        f.write(f"{PEN_UP}\nF{feed_rate}\n\n")

        for i, contour in enumerate(sorted_contours):
            f.write(f"; --- Net chu thuan thu {i+1} ---\n")
            first_point = contour[0][0]
            f.write(f"G0 X{first_point[0]*scale_factor:.3f} Y{first_point[1]*scale_factor:.3f}\n")
            f.write(f"{PEN_DOWN}\n")

            for point in contour[1:]:
                actual_point = point[0]
                f.write(f"G1 X{actual_point[0]*scale_factor:.3f} Y{actual_point[1]*scale_factor:.3f}\n")

            f.write(f"G1 X{first_point[0]*scale_factor:.3f} Y{first_point[1]*scale_factor:.3f}\n")
            f.write(f"{PEN_UP}\n\n")

        f.write("G0 X0 Y0\nM30\n")
    print(f"Đã xuất file G-code viền hoàn hảo tại: {gcode_path}")

# --- CHẠY THỰC TẾ ---
# image_text_to_gcode_spindle_with_preview("doan_van_ban.png", "ve_spindle.nc", scale_factor=0.12, feed_rate=2000, mode="servo")    
import cv2
import numpy as np
from skimage.morphology import thin

def image_to_perfect_single_line_gcode(image_path, gcode_path, scale_factor=0.1, feed_rate=2000, mode="servo"):
    # 1. Đọc ảnh dưới dạng Grayscale
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    if img is None: 
        print("Không tìm thấy file ảnh!")
        return
    height, width = img.shape
    
    # Nhị phân hóa ảnh bằng thuật toán Otsu tự động
    _, thresh = cv2.threshold(img, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    
    # Kiểm tra tỷ lệ để đảm bảo Chữ luôn là màu TRẮNG (255), Nền là màu ĐEN (0)
    if cv2.countNonZero(thresh) > (height * width / 2):
        thresh = cv2.bitwise_not(thresh)
    
    # Lọc đóng nhẹ bằng cấu hình 3x3 để làm mịn các rìa răng cưa của chữ to
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
    thresh = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel)

    # =========================================================================
    # CHẠY THUẬT TOÁN THINNING CHUẨN (ĐÃ FIX LỖI TRIỆT TIÊU NÉT)
    # =========================================================================
    print("Đang trích xuất trục trung hòa của chữ (Centerline)...")
    
    # Chuyển đổi ảnh nhị phân thành mảng 0 và 1 (kiểu bool chuẩn cho skimage)
    bool_thresh = np.where(thresh > 0, True, False)
    
    # Thực hiện làm mảnh chữ thành sợi chỉ độ dày đúng 1-pixel
    thinned_bool = thin(bool_thresh)
    
    # Khôi phục mảng uint8 từ mảng bool kết quả
    skeleton = np.zeros(thresh.shape, dtype=np.uint8)
    skeleton[thinned_bool] = 255
    
    # 🔴 ĐÃ BỎ LỆNH MORPH_OPEN Ở ĐÂY ĐỂ TRÁNH XÓA MẤT ĐƯỜNG XƯƠNG 1-PIXEL
    # =========================================================================

    # Tìm các đường contour từ xương ảnh (Sử dụng RETR_TREE để lấy cấu trúc đầy đủ)
    contours, _ = cv2.findContours(skeleton, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)
    if len(contours) == 0: 
        print("Vẫn không tìm thấy nét chữ nào! Vui lòng kiểm tra lại độ tương phản của ảnh.")
        return

    # 2. SẮP XẾP ĐƯỜNG VỀN (Từ trái sang phải theo trục X)
    bounding_boxes = [cv2.boundingRect(c) for c in contours]
    blob_list = list(zip(contours, bounding_boxes))
    blob_list.sort(key=lambda b: b[1][0]) # Sắp xếp ưu tiên theo trục X
    
    # Lọc bỏ các đốm chấm nhiễu siêu nhỏ (chỉ giữ lại nét vẽ dài hơn 2 pixel)
    sorted_contours = [blob[0] for blob in blob_list if len(blob[0]) > 2]

    print(f"Thành công! Tìm thấy {len(sorted_contours)} đoạn nét đơn vẽ chữ.")

    # 3. VẼ VÀ LƯU ẢNH PREVIEW NÉT ĐƠN HOÀN HẢO
    preview_img = np.ones((height, width, 3), dtype=np.uint8) * 255
    for idx, contour in enumerate(sorted_contours):
        color_ratio = idx / len(sorted_contours) if len(sorted_contours) > 1 else 0
        current_color = (0, int(255 * color_ratio), int(255 * (1 - color_ratio)))
        
        # Vẽ nét đơn dày 2 pixel lên ảnh preview để người dùng dễ nhìn thấy
        cv2.drawContours(preview_img, [contour], -1, current_color, 2)
        
        # Ghi số thứ tự bước chạy của đầu CNC lên tâm nét vẽ
        M = cv2.moments(contour)
        cX, cY = (int(M["m10"] / M["m00"]), int(M["m01"] / M["m00"])) if M["m00"] != 0 else (contour[0][0][0], contour[0][0][1])
        cv2.putText(preview_img, str(idx + 1), (cX, cY - 2), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (0, 0, 0), 1, cv2.LINE_AA)

    preview_file_path = "perfect_single_line_preview.png"
    cv2.imwrite(preview_file_path, preview_img)
    print(f"--- ĐÃ LƯU ẢNH PREVIEW NÉT ĐƠN TẠI: {preview_file_path} ---")

    # Mở cửa sổ popup hiển thị
    cv2.imshow("Kiem tra net don lien thong (Bam phim bat ky de xuat G-code)", preview_img)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

    # 4. GHI FILE G-CODE NÉT ĐƠN CHUẨN
    if mode == "servo":
        PEN_DOWN = "M3 S90 ; Ha but\nG4 P0.2"
        PEN_UP   = "M3 S10 ; Nhac but\nG4 P0.2"
    else:
        PEN_DOWN = "M3 ; Ha but\nG4 P0.5"
        PEN_UP   = "M5 ; Nhac but\nG4 P0.2"

    with open(gcode_path, "w") as f:
        f.write(";--- KHOI TAO MAY VE NET DON TRUC TRUNG HOA ---\n")
        f.write("G21 ; mm\n")
        f.write("G90 ; Toa do tuyet doi\n")
        f.write("G10 L20 P1 X0 Y0 ; Tu dong thiet lap vi tri hien tai lam goc toa do (0,0)\n")
        f.write(f"{PEN_UP}\nf{feed_rate}\n\n")

        for i, contour in enumerate(sorted_contours):
            f.write(f"; --- Net ve don thu {i+1} ---\n")
            
            first_point = contour[0][0]
            x_start = first_point[0] * scale_factor
            y_start = first_point[1] * scale_factor

            f.write(f"G0 X{x_start:.3f} Y{y_start:.3f}\n")
            f.write(f"{PEN_DOWN}\n")

            for point in contour[1:]:
                actual_point = point[0]
                x = actual_point[0] * scale_factor
                y = actual_point[1] * scale_factor
                f.write(f"G1 X{x:.3f} Y{y:.3f}\n")

            # Nhấc bút lên khi kết thúc nét vẽ đơn lẻ
            f.write(f"{PEN_UP}\n\n")

        f.write(";--- KET THUC ---\n")
        f.write("G0 X0 Y0\nM30\n")
    print(f"Đã xuất file G-code nét đơn hoàn hảo tại: {gcode_path}")

# Chạy kiểm tra lại
# image_to_perfect_single_line_gcode("doan_van_ban.png", "ve_spindle_net_don.nc", scale_factor=0.12, feed_rate=2000, mode="servo")

import serial
import time

def send_gcode_to_grbl(port_name, gcode_file_path):
    # 1. Kết nối tới cổng Serial của Arduino GRBL (Thường tốc độ là 115200)
    print(f"Đang kết nối tới {port_name}...")
    s = serial.Serial(port_name, 115200, timeout=1)
    
    # Khởi động lại Arduino và đợi GRBL sẵn sàng
    s.write(b"\r\n\r\n")
    time.sleep(2)   # Đợi 2 giây để GRBL khởi động xong
    s.flushInput()  # Xóa sạch dữ liệu thừa trong bộ đệm nhận

    print("Kết nối thành công! Đang gửi file G-code...")

    # 2. Mở file G-code để đọc từng dòng
    with open(gcode_file_path, 'r') as f:
        for line in f:
            line_clean = line.strip() # Xóa khoảng trắng thừa và ký tự xuống dòng
            
            # Bỏ qua các dòng chú thích trống hoặc bắt đầu bằng dấu ";"
            if not line_clean or line_clean.startswith(';'):
                continue

            # Gửi dòng lệnh xuống GRBL (phải có '\n' ở cuối)
            command = line_clean + '\n'
            s.write(command.encode('utf-8'))
            print(f"Đã gửi: {line_clean}")

            # 3. VÒNG LẶP CHỜ PHẢN HỒI 'ok' TỪ GRBL
            while True:
                response = s.readline().decode('utf-8').strip()
                if response:
                    print(f" GRBL phản hồi: {response}")
                    
                    # Nếu nhận được 'ok' hoặc 'error', thoát vòng lặp để gửi dòng tiếp theo
                    if 'ok' in response or 'error' in response:
                        break
                
    # Kết thúc file
    print("--- Hoàn thành gửi toàn bộ file G-code! ---")
    s.close()

# --- CHẠY THỬ ---
# Thay 'COM3' bằng cổng kết nối thực tế trên máy của bạn (trên Linux thường là '/dev/ttyUSB0')


# image_text_to_gcode_spindle_with_preview("doan_van_ban.png", "ve_spindle.nc", scale_factor=0.12, feed_rate=2000, mode="servo")
image_text_to_gcode_spindle_with_preview("doan_van_ban.png", "ve_spindle.nc", scale_factor=0.12, feed_rate=2000, mode="servo") 
send_gcode_to_grbl('/dev/ttyACM0', 've_spindle.nc')