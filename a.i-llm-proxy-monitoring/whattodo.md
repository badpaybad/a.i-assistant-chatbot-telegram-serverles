whattodo.md của người viết để hiểu yêu cầu và ý định cần làm. howtodo.md của a.i viết giải quyết yêu cầu của whattodo.md

Cần làm 1 proxy để kiểm soát các IDE A.I gọi lên các llm api cloud.
    tìm hiểu các domain và cấu hình của từng IDE để làm
        antigravity
        antigravity-ide
        claude
        codex

Làm 1 proxy để map các domain tìm được của từng IDE
    ghi log lại IP của từng máy ở cùng mạng LAN nào gọi lên api llm cloud nào, model nào, số tokens input , token output 
    Khi có danh sách api llm cloud và domain , IP máy LAN hoặc MAC address máy LAN cần 1 bảng ma trận cấu hình cho phép PC nào được phép gọi lên api nào , model nào , token output tối đa bao nhiêu, token input tối đa bao nhiêu.
        1 Proxy Central cho cả LAN
        Các máy trong LAN cần cấu hình proxy để dẫn traffic qua proxy
        Các thông số kiểm soát cho từng PC : 
            - IP, MAC address: Giới hạn PC nào được phép dùng Proxy.
            - Model Restrictions: Chỉ cho phép gọi các model cụ thể (ví dụ: chỉ OpenAI API Key được dùng cho Anthropic model).
            - Token Limits: Giới hạn số lượng Input/Output tokens (tính tổng trên 1 ngày total token input per day, total token output per day ).
            - Protocol/Port: Hỗ trợ các giao thức phổ biến (HTTP, HTTPS, SOCKS5) và các cổng cụ thể cho MCP/Streaming.
        Nếu có PC (IP or MAC address nào vi phạm các thông số cần kiểm soát) thì không cho phép gọi lên api llm cloud nữa , 
            Máy Trạm Mạng LAN (IP & MAC)
                cần hiển thị thông báo vi phạm để có thể cấu hình lại khi cần 
        a.i-llm-proxy-monitoring/policy_matrix.yaml này là sample default ban đầu khi có 1 PC (IP or MAC address) mới tham gia gọi proxy cần allow all và unlimit, cần lưu matrix ở db để khi có thay đổi có thể apply các rule về kiểm soát gọi api llm cloud 

    cần có UI để thao tác về bảng cấu hình allow / block từng loại ip , mac , domain , model  
    cần cấu hình để allow block MCP gọi thông qua socket, sse, websocket, wss, grpc, protobuf ...

    cơ chế là nếu lần đầu gọi các api llm , mcp ... thì ghi nhận logs và các domain ,ip của server cloud, rồi sẽ vào UI để cấu hình allow hay block tùy nhu cầu 

    mặc định các máy tham gia sẽ allow all hết, khi cần cấu hình sẽ vào UI chỉnh sửa cho từng máy, không hạn chế tokens input output 

Viết các hướng dẫn cấu hình cho từng IDE để trước khi ra internet cần gọi thông qua proxy pass, nếu chỉ ra file cấu hình của từng IDE hoặc biến môi trường thì cần hướng dẫn rõ đường dẫn key env ...
    viết ra file a.i-ide-setup-use-proxy.md 

Viết dockerfile và dockercompose để build và sẽ chạy proxy cho mang LAN, các máy ở mạng LAN sẽ cần sửa cấu hình IDE để dùng proxy này 

Cung cấp tính năng reset các logs và bộ đếm tokens:
    Có chức năng (trên UI và API) để xóa/reset toàn bộ nhật ký audit log và bộ đếm số lượng tokens đã dùng về 0 để bắt đầu tính lại từ đầu khi cần.
    Hỗ trợ xác nhận an toàn trước khi thực hiện reset để tránh thao tác nhầm.
    Có tùy chọn giữ lại hoặc reset danh sách domain/endpoint đã discovery.

 Nhật Ký Audit Chi Tiết Thời Gian Thực
    cần có phân trang, mỗi trang 20 item 
    tìm kiếm và sắp xếp cho từng header column của bảng

Thêm icon để đổi theme sáng tối, mặc định chọn theme sáng 