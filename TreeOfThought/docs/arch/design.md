Hệ thống giống như 1 tòa nhà lớn, chỉ duy nhất 1 infra được phép dùng cho tất cả các nghiệp vụ, nghiệp vụ như những tầng, phòng ... hạ tầng điện nước thông gió hành lang cầu thang ... nhà hoặc phòng trong tòa nhà đảm nhiệm 1 chức năng nhất định, độc lập với các nhà khác, có thể auto scaling độc lập với các nhà khác dùng chung hạ tầng tòa nhà 

core infra: là hạ tầng cốt lõi của tòa nhà, cung cấp các dịch vụ dùng chung
    backbone message:
        Tòan bộ hệ thống đều nhìn chung về 1 trục dữ liệu, 
            queue,pub sub, set get , cache 

    db connect:
        cung cấp các base connect và orm cho các db
        batch processing: bulk insert, update ...

    noti services: 
        firebase fcm: các push noti lên web, app mobi ... khi ứng dụng đang đóng  
        firestore : push noti UI action khi ứng dụng đang mở

    cloud services: là các base để connect tới các dịch vụ ngoài, được quy chuẩn dùng chung 
        google cloud storage, aws s3...

    cqrs: dùng backbone message để gửi command , event , nơi để phân phối nghiệp vụ chạy, kiểm soát luồng nghiệp vụ chạy 
        command là từ UI action xuống hoặc từ 1 nghiệp vụ khác muốn yêu cầu 1 nghiệp vụ khác xử lý thường là dùng queue 
        handle command là nơi thực sự xử lý command nơi nghiệp vụ được thực hiện 
        event là khi handle command xong thì phát ra để các nghiệp vụ khác có thể nhận và xử lý event đó
        cho phép nghiệp đăng ký các handle command và event handle của mình 
    
    auth & session: về việc xác thực, các quy chuẩn về JWT, token, check quyền, check sesion , auth middleware ...

    cypher: mã hóa và giải mã dữ liệu thông qua hằng số toàn hệ thống cypher

    oidc: là về openid connect, các quy chuẩn để kết nối với các dịch vụ oidc cho mobi app, web app ...

    contract: các command, event dùng chung cho các nghiệp vụ khi cần chia sẻ việc yêu cầu thực hiện nghiệp vụ đó giữa các nghiệp vụ
        Không chia sẻ query dữ liệu dùng chung giữa các nghiệp vụ 

    logs & monitoring: các log , monitoring, log base , log error, log debug. domain business (nghiệp vụ) sẽ hầu như không cần do việc thiết kế core infra đã cho phép handle các exception từ handle của từng nghiệp vụ 

domain business :
    Các nghiệp vụ dùng các core infra thống nhất
    Nghiệp vụ chia backend, frontend với chuẩn restful api
    Các nghiệp vụ độc lập về db của nghiệp vụ đó
        Có thể connect readonly sang db các nghiệp vụ khác lấy dữ liệu
    Các nghiệp vụ có thể trao đổi làm nghiệp vụ thông qua command event
        Các class có hàm handle để viết logic nghiệp vụ, nếu có throw exception cần ghi rõ message context và các value để infra log tracking được
    Query , cache dữ liệu trực tiếp ở controller cho chính nghiệp vụ đó
        Không chia sẻ việc query dữ liệu, cache sang các nghiệp vụ khác
        Cache:
            inmemory cache, là việc dùng memory của chính container thường duy trì thời gian dưới 5s
            network cache là việc dùng backbone message hoặc redis cache để chia sẻ dữ liệu giữa các auto scale container 
    Các controller cũng như FE
        cần tuân thủ AppAuth attribute về quy tắc để valid token session và permission 

Triển khai khi code:
    Leader: 
        code tập trung vào core và infra để đảm bảo high level design, loging monitoring, scale, bacnbone message ...

    Developer: 
        tập trung viết code nghiệp vụ, việc auto scale đã có core infra hỗ trợ
            quan tâm các class có hàm handle để xử lý command
        controller để viết queries dữ liệu 
        tạo db context nghiệp vụ
        tạo db readonly context nếu muốn lấy dữ liệu nghiệp vụ khác
        tạo class handle cho command event
        tạo extesions để đăng ký vào services container, và app usage 
    
A.I workforce (google antigravity-ide)
    Tham gia như 1 developer
        Developer viết yêu cầu cho FE,BE vào 1 file: docs/{folder tên nghiệp vụ}/whattodo.md, vòng lặp phát triển agilie 
            loop:
                Yêu cầu A.I làm
                Đợi kết quả của A.I 
                Review if ok: 
                    end loop
                viết Yêu cầu A.I chỉnh sửa vào whattodo.md 

Về tương lai việc có 1 MCP (model context protocol) để người dùng có thể dùng dạng như antigravity, claude desktop để có thể tương tác với hệ thống, hệ thống cần thiết kế thêm ngoài restful api cần thiết kế cả MCP để A.I có thể làm việc với hệ thống thông qua MCP 