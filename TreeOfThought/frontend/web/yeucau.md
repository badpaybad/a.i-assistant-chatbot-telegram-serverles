folder làm việc TreeOfThought/frontend/web 

**Tuân thủ** hướng dẫn chung ở TreeOfThought/1st.md 

Đọc kỹ TreeOfThought/frontend/web/yeucau.md và suy nghĩ viết ra cách làm vào TreeOfThought/frontend/web/phattrien.md nếu cần bổ sung thêm yêu cầu thì sửa vào TreeOfThought/frontend/web/yeucau.md và yêu cầu AI suy nghĩ ra cách làm và bổ sung vào TreeOfThought/frontend/web/phattrien.md. Sau khi xem xong có thể bắt đầu 

Các yêu cầu:
    - Dùng TypeScript
    - Dùng Angular 20
    - Ant design
    - Dockerfile 
        - Angular build ra folder dist 
        - nginx serve folder dist
    - Layout:
        - Header: Logo, link to Home,About, Contact
        - Sider: Menu
        - Content: load các pages, modules
    - Routing, route cần định nghĩa rõ ràng, tuân thủ MVC như BE
    - Modules: là nghiệp vụ được gom hết vào 1 folder bên trong có thể có pages, components, hooks, services, types
        - Mỗi module có thể deploy độc lập 
        - Có routing tới các pages của modules
        - Định nghĩa các services đi theo nghiệp vụ 
    - Pages: là các trang cụ thể khai báo routing trực tiếp vào trang
    - Components: là các component dùng chung cho cả frontend hoặc cơ bản chỉ dùng trong 1 module, 1 page
    - Utils, directive, hook là các tool dùng chung cho cả frontend
        Utils về googel firebase (auth, firestore, fcm) xem yêu cầu bên BE TreeOfThought/backend/yeucau.md . cần lưu vào settings firebase config ở file TreeOfThought/backend/realtimedbtest-d8c6b-firebase-frontend.json 
            - Auto login với firebase custom token từ BE trả ra qua api auth login
            - push noti với FCM dùng firebase custom token
            - Firestore subcribe theo request id ( GUID sinh ra chủ động trên FE), dùng cho các UI đang thao tác đợi kết quả từ BE và sẽ được BE subcribe topic tương ứng với request id.
                - khi FE nhận được noti data cần xóa data đó để tránh lưu trữ và thừa
            - google messaging ( nhận push noti FCM từ BE) khi không mở trình duyệt vẫn nhận được noti 
    - Các Claims ẩn hiện UI theo các claim jwt token khi login xong
        - Các Claims UI này sẽ cần được quản lý tập trung định nghĩa trên FE và đồng bộ lên BE, start ứng dụng sau login thành công (có thể lưu localstorage để xem có cái nào mới thì gọi đồng bộ lên BE)
    - Api connect sẽ theo mô tả TreeOfThought/backend/yeucau.md (http://localhost:5000/swagger/index.html) nếu chưa có thì vào TreeOfThought/backend/Core.Web.Api chạy lệnh: dotnet run
        - API_BASE_URL cần đưa vào file cấu hình .ts khi build production sẽ lấy theo chuẩn biến môi trường để build. không phụ thuộc vào config_dunp python
    Cần tạo các pages cũng cần kế thừa layout như đã định nghĩa 
        - Login
            - Login với username/password
            - Login với google
            - Login với MS
            - Login với facebook
        - Signup 
            - Signup với username, password, email và tên hiển thị bắt buộc và cần xác nhận email như BE mô tả TreeOfThought/backend/yeucau.md 
            - Signup với google
            - Signup với MS
            - Signup với facebook
        - SSO với google, MS, facebook
        - Tạo Modules để test các api cqrs của BE
        - Tạo Module để test việc dùng firestore noti lên 1 UI chức năng khi gọi lên BE, đợi BE hoàn thành rồi nhận noti và hiển thị noti ở góc phải màn hình. người dùng cần tự đóng noti này
            - Bổ xung thêm page để test FCM push noti từ BE lên FE ( FE lấy token device id) gửi lên BE để BE gửi noti sample lại. noti này cũng hiện góc phải màn hình, người dùng cần tự đóng
        - FE khi login xong cần để username và email thay vào nút login, đồng thời hiện nút logout.
            - Kích vào nút logout thì log out và chuyển sang trang login
        - wrap HttpClient ở utils để khi login thì luôn đưa jwt vào auth header 
            Cần handle error và show noti góc phải màn hình, noti người dùng tự cần đóng.   
        - Cần noti content hỗ trợ html để để url cho người dùng click vào đường link dẫn đến login khi không có Claims, khi httpclient gọi api bị lỗi 401 hoặc không có quyền truy cập, không có quyền xem noti cần hiển thị link đến trang login 

Các lệnh cần để build và chạy FE app này
    cần chạy https và port 4200 để test được google firebase
        
        cần ghi chú hướng dẫn vào google console firestore để set quyền đọc ghi cho user 

                    rules_version = '2';
                    service cloud.firestore {
                    match /databases/{database}/documents {
                        // Cho phép mọi người (đã login hoặc chưa) đọc/ghi vào bảng kết quả lệnh để test
                        match /commandresults/{document=**} {
                        allow read, write: if true;
                        }
                        
                        // Các phần khác yêu cầu phải đăng nhập (token bạn đã gửi từ BE)
                        match /{document=**} {
                        allow read, write: if request.auth != null;
                        }
                    }
                    }

tạo module CQRS Dashboard với các chức năng sau:
        CQRS cần bổ xung UI để visualize các topic queue dashboard về số lượng, lỗi, stuck queue ....
        Có UI để retry resend lên queue or topic các command or event đã fail
        Vẽ luồng đi lại của command, event đã tracking qua các queue name, topic name
        Xem và thao tác worker
        Xem và thao tác chi tiết message bị lỗi, retry (bao gồm cả đọc, retry, push lại)
        Xem lịch sử message đã xử lý, đã retry, đã fail và nguyên nhân, và đi qua các queue name, topic name trong suốt quá trình xử lý
        cần thêm trang dashboard chi tiết về các lỗi của các worker và queue. để biết được worker nào đang xử lý lỗi và queue nào đang gặp vấn đề

        khi vào dashboard này cần Claims: "cqrs:dashboard:view" và các Claims khác để full acccess với account admin, account admin mock càn bổ xung claim, nếu BE chưa có api nhận đồng bộ Claims thì cần bổ xung

        cqrs dashboard cần show đúng số message lỗi, queue và topic cũng cần thống kê được tổng số message gửi đến, xem danh sách các message lỗi lỗi ở topic queue nào subcriber nào và khi click vào message lỗi cần có thể show detail và retry send message hoặc loại bỏ message đó ra khỏi queue

# triển khai UI cho core infra auth 

đọc yêu cầu của BE cho core infra auth trong file TreeOfThought/backend/yeucau.md và triển khai Module UI cho core infra auth, UI UX dễ dùng thuận tiện :
    - Role Management
    - Claims Management
    - User Management
    - Acl Management cho users

    **chú ý làm xong cần tuân thủ TreeOfThought/1st.md** việc phân quyền module là cần là account admin hoặc user được gán các Claims. Do BE đã chuyển permision thành Claims nên FE cần thống nhất theo

**cập nhật 1** cần check xem những gì liên quan permission cần chuyển thành claims cho FE UI , do BE đã chuyển khái niệm permision thành claim như mô tả ở TreeOfThought/backend/yeucau.md

**cập nhật 2**

ở TreeOfThought/backend/yeucau.md có **cập nhật 8** cần làm UI tương ứng cho việc đổi mật khẩu của tài khoản admin 