folder làm việc cnc/drawtext có thể dùng venv /work/a.i-assistant-chatbot-telegram-serverles/venv 
tham khảo cách làm web để điều khiển cnc ở cnc/whattodo.md để làm 1 web chuyên vẽ chữ, các yêu cầu
Thiết kế UI là responsive design 
Trên cùng là thanh công cụ: 
    Vùng hoạt động cnc: chiều rộng, chiều dài
    tốc dộ di chuyển, bước di chuyển
    nút Lưu 
        khi clcik nút Lưu thì lưu thông số để tắt máy đi mở lên có thể dùng lại 
dưới thanh công cụ là 2 nửa màn hình, nửa trái: Xử lý text, nửa phải: Cnc preview

Xử lý text
    header 
        drop list cho phép chọn ảnh, hoặc camera (mặc định chọn ảnh)
            chọn ảnh người dùng cần browse ảnh từ máy tính, 
            chọn camera người dùng cần chọn camera lên để và có nút chụp để chụp 
    nửa trên
        Vùng hiển thị ảnh, khi người dùng chọn ảnh, hoặc chụp ảnh, ảnh hiện lên đây
            Kích thước sẽ tuân theo tỷ lệ của Vùng hoạt động cnc, rộng và dài
    nửa dưới: 
        Công cụ xử lý ảnh: dùng opencv contours và các thông số điều khiển chỉnh sửa ảnh, mục tiêu
            ảnh đưa vào sẽ cần xử lý để có thể xử lý ảnh thành chữ 1 nét như chữ viết tay, chữ in hoa 
            đưa về 1 nét để chuyển thành vector và gcode để điều khiển đầu cnc viết chữ cho đẹp nét liền mạch mượt mà
            chủ yếu là xử lý ảnh thành nét chữ, người dùng có thể chỉnh sửa ảnh để lấy các đường nét đặc trưng để có thể tạo vector rồi thành gcode để điều khiển cnc head
        
Cnc preview
    nửa trên là hiển thị cnc preview, mô phỏng đường nét di chuyển của cnc head
        Kích thước sẽ tuân theo tỷ lệ của Vùng hoạt động cnc, rộng và dài
    
    dửa dưới cần bảng điều khiển cnc gồm các nút:  
        nút: Up, Down, Left, Right, UpLeft, UpRight, DownLeft, DownRight
            để di chuyển đầu cnc thủ công với khoảng cách cố định, ví dụ 1mm
        nút: Set home (set home + spidle 0 bút nhấc lên G10 L20 P1 X0 Y0 Z0 và M5 (hoặc M3 S0) )
            cần lưu thông số để khi tắt máy đi mở lên có thể dùng lại 
        nút: nhấc bút, hạ bút 
        nút: Xem trước 
            click nút này thì sẽ dựa vào ảnh đã xử lý contours chuyển thành vector gcode và chạy giả lập trên cnc preview
        nút: Vẽ chữ 
            click nút này thì sẽ gửi lệnh điều khiển cnc head thật, và cnc preview cũng vẽ các nét thực tế cnc đang chạy ngoài đời 
            Khi vẽ thì vẽ bắt đầu từ vị trí hiện tại của cnc head, vẽ xong cần về lại vị trí ban đầu trước khi vẽ 
        nút: Dừng và Go home
            click nút này thì dừng vẽ, nhấc dao lên và về gốc set home trước đó

**cập nhật 1** ảnh đầu vào khi chọn lên có thể làm background mờ mờ ở dưới ảnh Xem trước xử lý nét đơn để cho UI gọn
việc test để tôi tự test không cần mở chronium lên test

**cập nhật 2**  Công cụ xử lý ảnh , hiện tại đang xử lý chữ viết thành vector tạo gcode để chạy cnc, bổ xung tạo tab để xử lý ảnh dạng chữ viết, và thêm tab xử lý ảnh bất kỳ dạng công cụ như cnc/whattodo.md

Các công cụ đều làm thanh trượt slide để tăng giảm số 
Tab xử lý ảnh cần kiểm tra và bổ xung các thông số cho phép người dùng hiệu chỉnh 

Công cụ xử lý ảnh có thêm chức năng lưu lại các thông số cho người dùng download lưu lại và có nút để load lại khi cần dùng lại

Xử lý ảnh sketch có thể tham khảo bổ xung các thông số tham khảo cnc/drawtext/project_2 cosplay (1).json

**cập nhật 3** công cụ xử lý ảnh cần có các check box để apply các chỉ số hoặc không. việc tự động nối liền các nét chữ cũng cần thành 1 option checkbox riêng. việc ảnh xử lý chữ viết nền trắng chữ đen cũng đã rõ ràng chủ yếu cần độ mịn và liền mạch các nét chữ nhờ các pixel liền nhau, nên cần bổ xung thêm các công cụ xử lý ảnh để tạo ra được các đường nét chữ tốt nhất 
Công cụ xử lý ảnh cần xem code cnc/image2gcodesketch.py và cnc/image2gcode.py để tham khảo việc tạo sketch cho cả xử lý text, vector hóa để có thể tạo gcode điều khiển cnc  

**cập nhật 4** công cụ xử lý hình ảnh , text sang vector, tạo code mới dùng  cnc/drawtext/pypotrace_img2vector.py rồi convert svg thành grbl gcode để điều khiển cnc head , cổng usb mặc định ttyACM0 . code của option chọn công cụ thành single line cnc/drawtext/bitmap_to_single_line_svg.py .
các công cụ đều có các thông số có thể thay đổi được dạng slide kéo để thay đổi, có check box để áp dụng từng thông số, các thông số mặc định như trong code mẫu 

có thể kết hợp cả cnc/drawtext/pypotrace_img2vector.py và cnc/drawtext/bitmap_to_single_line_svg.py để xử lý ảnh text thành vector 1 net cho hoàn hảo 

cnc/drawtext/erode_and_trace_outline.py bổ xung thêm tab option này và cho chỉnh thông số tương ứng 

cnc chạy thực tế vẽ ra đang bị như nhìn qua gương so với ảnh hiển thị cần sửa lại , xem code xử lý ở cnc/main.py để điều khiển cnc không bị ngược so với ảnh hiển thị hoặc cnc preview