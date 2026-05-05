folder làm việc TreeOfThought/frontend/web 

Tham khảo hướng dẫn chung ở TreeOfThought/readme.md 

Đọc kỹ TreeOfThought/frontend/web/yeucau.md và suy nghĩ viết ra cách làm vào TreeOfThought/frontend/web/phattrien.md nếu cần bổ sung thêm yêu cầu thì sửa vào TreeOfThought/frontend/web/yeucau.md và yêu cầu AI suy nghĩ ra cách làm và bổ sung vào TreeOfThought/frontend/web/phattrien.md. Sau khi xem xong có thể bắt đầu 

Các yêu cầu:
    - Dùng TypeScript
    - Dùng React 19
    - Ant design
    - Vite
        - **Không dùng nextjs với ssr ( server side rendering)**
    - Dockerfile 
        - Vite build ra folder dist 
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
            - google messaging ( nhận push noti FCM từ BE) khi không mở trình duyệt vẫn nhận được noti 
    - Các permission ẩn hiện UI theo các claim jwt token khi login xong
        - Các perssmion UI này sẽ cần được quản lý tập trung định nghĩa trên FE và đồng bộ lên BE, start ứng dụng sau login thành công (có thể lưu localstorage để xem có cái nào mới thì gọi đồng bộ lên BE)
    - Api connect sẽ theo mô tả TreeOfThought/backend/yeucau.md (https://localhost:5000/swagger/index.html) nếu chưa có thì vào TreeOfThought/backend/Core.Web.Api chạy lệnh: dotnet run
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

Các lệnh cần để build và chạy FE app này
    cần chạy https và port 4200 để test được google firebase
    ```bash
    npm install
    npm run dev
    npm run build
    npx serve -s dist -l 80
    ```
