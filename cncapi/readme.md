1. Mạch Điều Khiển Trung Tâm (Microcontroller Board)
Tên mạch: Arduino Uno R3 (Microchip ATmega328P)
USB Vendor ID: 2341 (Arduino SA)
USB Product ID: 0043 (Uno R3 CDC ACM)
Serial Number: 24238313635351910130
Firmware: Firmware GRBL 1.1 (đã được tích hợp thêm mã nguồn mở rộng tại 

cncapi/grbl-master/protocol.c
 để nhận diện lệnh $GETID).
2. Mạch Driver Điều Khiển Động Cơ (Motor Driver Shield)
Mạch Shield: CNC Shield V3 (chuyên dụng cắm đè lên Arduino Uno R3).
Driver động cơ bước (Step Driver Modules): Sử dụng các mô-đun driver bước dạng cắm chân phổ biến như A4988 hoặc DRV8825 để điều khiển động cơ bước các trục X, Y, Z.


Ở Firmware (grbl-master/device_id.c):

Giữ nguyên cơ chế hiện tại. Lệnh $GETID đã trả về [ID:GRBL-328P-1E950F-XX, MAC:] là ID duy nhất phần cứng của vi điều khiển.
Ở Backend Python (main.py):

Chuỗi USB Serial (24238313635351910130) rất hữu ích khi quét cổng Serial (/cncapi/v1/connection/ports). Python có thể dùng pyserial (serial.tools.list_ports) đọc chuỗi này để giúp người dùng phân biệt khi cắm đồng thời nhiều máy CNC / Arduino vào máy tính.



Phân biệt nhanh G54-G59 và các điểm khác		
Ký hiệu	Ý nghĩa	Công dụng
G54 - G59	Gốc tọa độ phôi	Xác định điểm $(0,0,0)$ của file G-code. Bạn có thể dùng G54 cho Phôi 1, G55 cho Phôi 2 trên cùng bàn máy.
G28 / G30	Điểm đỗ / Vị trí cố định	Đây mới là điểm dừng/điểm rút dao (ví dụ: điểm an toàn để thay dao hoặc góc bàn máy để dễ tháo phôi).
MPos	Tọa độ máy hiện tại	Cho biết đầu dao đang đứng ở đâu so với khung máy.
WPos	Tọa độ làm việc hiện tại	Cho biết đầu dao đang đứng ở đâu so với gốc phôi (G54/G55...).

Gửi chuỗi lệnh sau theo thứ tự vào Serial Monitor / Terminal để chẩn đoán:		
1	?	
	$\rightarrow$ Xem có báo	
	Alarm	
	không? Có chữ	
	Pn:	
	nào đang sáng không?	
2	$X	
	$\rightarrow$ Mở khóa an toàn.	
3	$$	
	$\rightarrow$ Kiểm tra chắc chắn	
	$22=1	
	,	
	$24	
	và	
	$25	
	$> 0$.	
4	$H	
	$\rightarrow$ Thử lại lệnh về gốc.	


	Khi sử dụng ESP32 kết nối với CNC Shield V3 để điều khiển 4 trục độc lập (X, Y, Z - Đầu 1, A - Đầu 2), đây là hướng dẫn nạp code và sơ đồ nối dây chi tiết:

1. Nạp bản Grbl nào cho ESP32?
Tải bộ code Grbl_ESP32.

Trong dự án Grbl_ESP32 đã có sẵn file cấu hình chân tương thích với CNC Shield V3.
Mở bằng Arduino IDE (chọn Board: ESP32 Dev Module) và nạp thẳng vào ESP32.
2. Sơ đồ nối dây từ ESP32 sang CNC Shield V3 (4 Trục X, Y, Z, A)
Do CNC Shield V3 có chân dạng cắm đè lên Uno, khi dùng ESP32 bạn chỉ cần dùng dây cắm đực - cái (Jumper Dupont) nối các chân GPIO của ESP32 sang các hàng chân trên CNC Shield V3 theo bảng sau:

Chức năng	Chân tương ứng trên CNC Shield V3	Chân GPIO kết nối trên ESP32
X-STEP	Pin 2	GPIO 12
X-DIR	Pin 5	GPIO 14
Y-STEP	Pin 3	GPIO 26
Y-DIR	Pin 6	GPIO 15
Z-STEP (Đầu 1)	Pin 4	GPIO 27
Z-DIR (Đầu 1)	Pin 7	GPIO 33
A-STEP (Đầu 2)	Pin 12 (Vị trí D12)	GPIO 32
A-DIR (Đầu 2)	Pin 13 (Vị trí D13)	GPIO 22
ENABLE (Nguồn Driver)	Pin 8	GPIO 13
GND (Mass chung)	Chân GND trên Shield	Chân GND
Nguồn Logic 5V	Chân 5V trên Shield	Chân VIN / 5V
3. Cài đặt Jumper trên CNC Shield V3 cho Trục A (Đầu 2)
Chọn tín hiệu cho Trục A: Cắm 2 vi-chốt (Jumper) nối ngang vào vị trí D12 (dành cho Step) và D13 (dành cho Dir) ở cụm chốt bên cạnh khe A.
Cài đặt Vi bước (Microstepping): Cắm đủ 3 jumper ở các hàng chốt bên dưới mỗi khe cắm Driver (X, Y, Z, A) để đạt vi bước 1/16 (với A4988) hoặc 1/32 (với DRV8825).
4. Kết quả sau khi hoàn thành:
Bạn có 1 hệ thống CNC 4 trục độc lập: X, Y, Z (Đầu 1), A (Đầu 2).
Tốc độ xử lý ngắt 32-bit 240MHz của ESP32 giúp cả 2 đầu Z và A nâng hạ cực kỳ êm, không bị trễ hay giật động cơ.
Phía phần mềm Python gửi lệnh điều khiển 2 đầu độc lập:
G1 Z-10 F500: Hạ đầu 1 xuống 10mm.
G1 A-10 F500: Hạ đầu 2 xuống 10mm.


