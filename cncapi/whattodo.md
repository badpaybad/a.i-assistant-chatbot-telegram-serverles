folder làm việc: cncapi 
dựa vào cnc/main.py về các code liên quan điều khiển cnc
    bỏ gcode editor
    bỏ gcode with font
    bỏ object detect, không load model object detect do không dùng đến
    bỏ camera stream

Cần làm như sau 

Mà hình chia 3 hàng

Hàng 0
    chia 3 cột
        cột 0
            Cấu hình kết nối cnc , cổng serial vẫn mặc dịnh /dev/ttyACM0 baudrate 115200
            các thông tin về cnc 
                tọa độ gốc máy (Machine Zero - G53)
                    tọa độ đầu cnc theo gốc máy
                tọa độ gốc làm việc, gốc phôi (Work Zero - G54)
                    tọa độ đầu cnc theo tọa độ làm việc 
                tọa độ điểm đỗ ( dùng để rút dao)

        cột 1
                
            cấu hình spindle 

            đặt gốc tọa độ làm việc 
        cột 2
            trạng thái kết nối
            chọn ngôn ngữ
hàng 1
    chia 3 cột
        cột 0 : width 25%

            bộ di chuyển ( machine jogging)
                cấu hình  
                    tốc độ di chuyển feed rate
                    bước di chuyển

            Touch & Swipe Gestures
                cấu hình  
                    tốc độ di chuyển feed rate
                    bước di chuyển
                    tab độ trễ
                    swipe độ dài 

        cột 1: width 50%
            tool path view 
            dùng để preview xem kịch bản hoặc xem chạy giả lập kịch bản 

        cột 2: width 25%
            các thao tác tạo kịch bản ví dụ: tạo, lưu , chạy , chạy loop, chạy giả lập 

            PHÍM KỊCH BẢN
                set begin, ...

Hàng 2
    Cửa Sổ Console Serial
    copy right @ 2026

Logic điều khiển cnc cho kịch bản 

Machine jogging và touch & swipe gesture không phụ thuộc gì cứ cnc connect là điều khiển đầu cnc được, tạo sẵn các api khi UI gọi sẽ thực hiện di chuyển hoặc nâng hạ bút theo nghiệp vụ. Dùng machine jogging để di chuyển đầu CNC và set tọa độ gốc làm việc , có nút dừng và di chuyển về gốc tọa độ làm việc    

Chạy kịch bản cần dựa vào tọa độ gốc làm việc
    các cấu hình di chuyển và touch swipe dùng chung ở trên 
    Dựa vào tọa độ gốc làm việc để lưu các vị trí start, tab, swipe , end .. của đầu cnc 
    Dựa vào tọa độ gốc làm việc để thực hiện các di chuyển và thao tác của đầu cnc cho kịch bản 

Tool Path View (Xem & Giả Lập Kịch Bản)
    chiều Y cần vẽ ngược lại 

**cập nhật 1** Quản Lý & Phím Kịch Bản cần hoạt động được giống bên  cnc/main.py 
    Khi chưa set home gốc làm việc ( gốc phôi) click vào sẽ báo cần Đặt gốc tọa độ làm việc 
    cho phép chỉnh sửa lại thứ tự các thao tác di chuyển 
    cho phép insert thêm vào sau 1 bước nào đó
    tuân thủ Cấu Hình Spindle & Gốc Làm Việc (vị trí nâng hạ bút) có cấu hình nâng hạ
    Tuân thủ cấu hình Cử Chỉ Touch & Swipe Gestures Tốc Độ Feedrate 4000 Bước Chuyển (mm) Tap Độ Trễ (s) Swipe Độ Dài (mm)
    set begin và set end cần nhấc dao trước rồi mới thực hiện  

**cập nhật 2** Tool Path View (Xem & Giả Lập Kịch Bản) đùng để hiển thị các bước ở kịch bản tại Quản Lý & Phím Kịch Bản và thực tế của đầu cnc so với gốc tọa độ làm việc 
    kịch bản sẽ cần được vẽ lên để người dùng nhìn thấy các bước 
    Khi click chạy giả lập thì cnc sẽ đi theo các đường vẽ tương ứng , các đường vẽ sẽ mô phỏng thực tế của đầu cnc so với gốc tọa độ làm việc 
**cập nhật 3** vuốt lên, vuốt xuống, vuốt sang trái , vuốt sang phải chỉ cần thực hiện rồi dừng không cần quay về vị trị bắt đầu vuốt

**cập nhật 4** vẽ tracking di chuyển cnc cần dường mờ nhạt. vẽ đường đi của kịch bản cần đường đi rõ nét bắt đầu từ set begin tới điểm set end, khi nhấn nút chạy hoặc giả lập mới cần vẽ đường đi của kịch bản. còn bình thường chỉ cần vẽ các node theo step của kịch bản .
Lúc chạy hoặc chạy lặp thì cần thể hiện thực tế đầu cnc hiện khi chạy giả lập đã có 

**cập nhật 5** bổ xung việc click chuột lên tool path view để di chuyển. cần quy đổi từ tọa độ điểm click trên canvas sang tọa độ máy để di chuyển tới đó dựa vào gốc tọa độ làm việc. click vị trí nào thì cnc di chuyển tới vị trí đó.
    Tool Path View (Xem & Giả Lập Kịch Bản) bổ xung thêm tỷ lệ 1 pixel tương đương với bao nhiêu milimet (vd 1 px = 0.1mm)

**cập nhật 6** Tool Path View (Xem & Giả Lập Kịch Bản) bổ xung option để hiển thị vẽ trục x,y gốc tọa độ làm việc trên canvas
    x : cho phép chọn trái sang phải là chiều dương hoặc phải sang trái là chiều dương 
    y: cho phép chọn dưới lên trên là chiều dương hoặc trên xuống dưới là chiều dương
    mặc định: x trái sang phải , y trên xuống dưới

**chú ý** để tôi tự test manual, không cần mở chrome để tự verify