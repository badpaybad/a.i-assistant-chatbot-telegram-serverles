nghiệp vụ webtestoidc
    FE: TreeOfThought/frontend/webtestoidc
        là asp.net core 8 MVC
    BE: TreeOfThought/frontend/webtestoidc
        là asp.net core 8 MVC

nghiệp vụ này dùng để giả lập bên thứ 3 làm việc với sso oidc không cần theo hết quy chuẩn của tot-dev về BE FE. cần cơ bản đáp ứng các việc sau:
    - login, logout sso lên oidc http://localhost:5000
    - logout ra xong cần có thông báo thành công và auto về màn hình trang chủ    
    - cần dùng project về auth để dùng Auth attribute 
        - tạo 1 trang mvc cần login mới xem được để test chức năng login/logout sso
    - header login xong cần có thông tin về người đăng nhập: username, tên , ảnh ...

**cập nhật cho việc dùng project auth , auth attribute và session**
    dùng project auth để dùng attribute cần appsettings.json


            "Auth": {
                "Jwt": {
                "Secret": "",
                "RsaPrivateKey": "",

                "Kid": "",
                "Algorithm": "RS256",
                "Issuer": "http://127.0.0.1:5000",
                "Audience": "TreeOfThought.FE",
                "ExpiryMinutes": 60,
                "IsOidc": false,
                "Authority": "http://localhost:5000"
                }
            },

        chủ yếu là Authority để Auth attribute hoạt động như 1 bên thứ 3 sso vào 
                "IsOidc": false,
                "Authority": "http://localhost:5000"

        cần thêm session vào appsetting để dùng Auth attr với hybrid jwt + redis session 
            "Session": {
                "Redis": "localhost:6379,defaultDatabase=0,password=Test123456,abortConnect=false"
            }

**chú ý** code đã sẵn có ở TreeOfThought/frontend/webtestoidc cần xem để điều chỉnh phù hợp yêu cầu 