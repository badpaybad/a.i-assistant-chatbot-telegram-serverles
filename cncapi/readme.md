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