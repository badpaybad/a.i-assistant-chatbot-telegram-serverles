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
                tọa độ gốc phôi, 
                    tọa độ đầu cnc theo gốc phôi
                tọa độ gốc làm việc 
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