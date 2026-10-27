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

    cần có UI để thao tác về bảng cấu hình allow / block từng loại ip , mac , domain , model  
    cần cấu hình để allow block MCP gọi thông qua socket, sse, websocket, wss, grpc, protobuf ...

    cơ chế là nếu lần đầu gọi các api llm , mcp ... thì ghi nhận logs và các domain ,ip của server cloud, rồi sẽ vào UI để cấu hình allow hay block tùy nhu cầu 

    mặc định các máy tham gia sẽ allow all hết, khi cần cấu hình sẽ vào UI chỉnh sửa cho từng máy, không hạn chế tokens input output 

Viết các hướng dẫn cấu hình cho từng IDE để trước khi ra internet cần gọi thông qua proxy pass, nếu chỉ ra file cấu hình của từng IDE hoặc biến môi trường thì cần hướng dẫn rõ đường dẫn key env ...
    viết ra file a.i-ide-setup-use-proxy.md 

Viết dockerfile và dockercompose để build và sẽ chạy proxy cho mang LAN, các máy ở mạng LAN sẽ cần sửa cấu hình IDE để dùng proxy này 