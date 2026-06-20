usb  /dev/ttyACM0
đang connect tới cnc
dùng python lập trình với grbl

folder làm việc: cnc

trục x, y là động cơ bước nema 17

trục z của tôi là servo sg90 hiện tại đang test device setting GRBL-M3 (1.1e or earlier) , light burn đang điểu khiển fire theo % độ.

hiện tại cần dùng cnc để gắn bút cảm ứng, để giả lập touch, vuốt lên màn hình điện thoại

click z+ 2 lần thì phải xoay 2 lần mỗi lần 10 độ, ngược lại click z- 2 lần thì quay ngược 10 độ 2 lần

click pen up, click pen down thì về đúng độ được set

cần vừa gửi lệnh x,y , vừa gửi được spindle z , cần giả lập như ngón tay người touch, many touch, vuốt trái , vuốt phải , vuốt chéo , vuốt lên, vuốt xuống ...

đã cắm camera usb rapoo , bổ xung thêm lên UI để xem camera. camera đang treo phía trên khung cnc để theo dõi, div camera cần luôn hiển thị dạng fixed css và có thể colapse được , vùng camera có thể kéo to hoặc thu nhỏ vùng xem

**cập nhật 1** để xác định gốc tọa độ cho đầu bút cần dựa vào 4 ArUco Marker như hình cnc/printarea.png
camera capture được ảnh, cần xác định 4 đỉnh của hình chữ nhật. rồi đưa đầu bút vào chính giữa hình chữ nhật
    cần draw hình chữ nhật được xác định bới 4 ArUco Marker đó trên video.
    cần vẽ trục tọa độ x,y trên video , sao cho gốc tọa độ trùng với tâm của hình chữ nhật.

**cập nhật 2** khi dùng web UI để điều khiển , và đưa đầu bút vào gốc tọa độ. nhấn nút Home để set gốc tọa độ hiện tại trên ảnh cũng là gốc 0,0,0 của xyz cnc . Cần lưu lại để tắt máy đi vẫn dùng lại được.
Ảnh và 4 đỉnh cũng cần lưu tại thời điểm nhấn nút Home. dùng ảnh đó như bản đồ để di chuyển đầu bút . dựa trên tính toán gốc tọa độ . Ví dụ như sau khi set gốc xong, tôi muốn di chuyển đầu bút tới vị trí (10,10) thì tôi chỉ việc nhập 10,10 vào web UI, và nhấn nút GoTo. lúc đó web UI sẽ tính toán xem đầu bút đang ở đâu , so sánh với ảnh gốc để xác định vị trí , rồi di chuyển đầu bút tới vị trí (10,10) 
