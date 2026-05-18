# Tài liệu Thiết kế & Giải pháp phát triển WebApiTestOidc

Tài liệu này trình bày giải pháp tạo một dự án ASP.NET Core 8.0 Web API tại thư mục `TreeOfThought/frontend/webapitestoidc` để kiểm thử toàn diện các kịch bản của thuộc tính phân quyền `[AppAuthorize]` (từ thư viện hạ tầng `Core.Infra.Auth`).

---

## 1. Mục tiêu & Phạm vi kịch bản kiểm thử
Chúng ta cần kiểm thử tất cả các tính năng của `AppAuthorizeAttribute` và `AppAuthorizationHandler`:
1.  **Authentication cơ bản:** Endpoint chỉ yêu cầu người dùng đã đăng nhập thành công (`[AppAuthorize]`).
2.  **Kiểm tra Role (Prioritized Role Check):** Endpoint yêu cầu role cụ thể (`[AppAuthorize(Roles = "Admin")]`).
3.  **Kiểm tra Claims (Permission Check):** Endpoint yêu cầu claim phân quyền (ví dụ: `be.test.read`, `be.admin`).
4.  **Kiểm tra ACL (Access Control List từ Redis):** Endpoint kiểm thử phân quyền động với `ResourceType` và `Action` (ví dụ: `ResourceType = "Document"`, `Action = ResourceActions.Read` hoặc `Write`).
    - Lấy `resourceId` qua các thứ tự ưu tiên: Header `x-resource-id` -> Route `id` -> Query string `id`.
    - Kiểm tra mặt nạ bit (bitmask) của quyền hạn được lưu trong Redis.
5.  **Chế độ kết hợp Mode (AND vs OR):** Kiểm thử cả hai chế độ logic khi yêu cầu nhiều claims hoặc actions.

---

## 2. Cấu trúc Dự án Đề xuất

Dự án sẽ được tạo mới hoàn toàn tại thư mục `TreeOfThought/frontend/webapitestoidc` với các file sau:

```
TreeOfThought/frontend/webapitestoidc/
├── webapitestoidc.csproj       # File cấu hình project .NET 8 Web API
├── appsettings.json            # Cấu hình JWT Authority, Redis Session, Kestrel port (5006)
├── Program.cs                  # Thiết lập Pipeline, DI, JWT Bearer Auth & Swagger
├── Controllers/
│   └── TestAuthController.cs   # Controller chứa các endpoints kiểm thử phân quyền
└── wwwroot/
    └── index.html              # Giao diện HTML/JS cực đẹp để kiểm thử trực quan
```

### Chi tiết File 1: `webapitestoidc.csproj`
Project SDK `Microsoft.NET.Sdk.Web`, Target Framework `net8.0`.
Tham chiếu trực tiếp tới các project hạ tầng cốt lõi:
- `../../backend/Core.Infra.Auth/Core.Infra.Auth.csproj`
- `../../backend/Core.Infra.Session/Core.Infra.Session.csproj`

### Chi tiết File 2: `appsettings.json`
Cấu hình Kestrel chạy ở cổng **5006** (tránh xung đột với cổng 5000 của Backend API và 5005 của `webtestoidc`). Cấu hình JWT trỏ Authority về `http://localhost:5000` (hoặc `http://127.0.0.1:5000`) và kết nối Redis Session.
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "Kestrel": {
    "Endpoints": {
      "Http": {
        "Url": "http://0.0.0.0:5006"
      }
    }
  },
  "Auth": {
    "Jwt": {
      "IsOidc": false,
      "Authority": "http://127.0.0.1:5000"
    }
  },
  "Session": {
    "Redis": "localhost:6379,defaultDatabase=0,password=Test123456,abortConnect=false"
  }
}
```

### Chi tiết File 3: `Program.cs`
- Đăng ký hệ thống Authentication & Authorization của hệ thống bằng phương thức mở rộng:
  `builder.Services.AddAppAuthorization(builder.Configuration, AppAuthMode.JwtBearer);`
- Kích hoạt Swagger UI có tích hợp Authorization Bearer Input để dễ dàng kiểm thử thủ công qua API docs.
- Bật CORS cho phép nhận request từ mọi nguồn gốc.

### Chi tiết File 4: `Controllers/TestAuthController.cs`
Triển khai các API endpoints bảo mật bằng `[AppAuthorize]`:
- `GET /api/test-auth/public`: Không yêu cầu token.
- `GET /api/test-auth/secure`: Yêu cầu token hợp lệ (`[AppAuthorize]`).
- `GET /api/test-auth/admin-role`: Yêu cầu Role Admin (`[AppAuthorize(Roles = "Admin")]`).
- `GET /api/test-auth/admin-claim`: Yêu cầu Claim Admin (`[AppAuthorize("admin")]`).
- `GET /api/test-auth/custom-claim`: Yêu cầu Claim cụ thể (`[AppAuthorize("test.read")]`).
- `GET /api/test-auth/acl-read/{id}`: Yêu cầu quyền Read trên ResourceType "Document" (`[AppAuthorize(ResourceType = "Document", Action = ResourceActions.Read)]`).
- `GET /api/test-auth/acl-write/{id}`: Yêu cầu quyền Write trên ResourceType "Document" (`[AppAuthorize(ResourceType = "Document", Action = ResourceActions.Write)]`).
- `GET /api/test-auth/user-info`: Trả về thông tin claims hiện tại của token để debug.

### Chi tiết File 5: `wwwroot/index.html` (Premium Test UI)
Để mang lại trải nghiệm WOW, chúng tôi sẽ xây dựng một giao diện Web Client tương tác cực kỳ bắt mắt:
- **Đăng nhập nhanh:** Form đăng nhập trực tiếp gọi API của Backend `http://localhost:5000/api/auth/login` để lấy JWT Token và tự động lưu vào bộ nhớ / LocalStorage.
- **Trình gửi Request thông minh:** Các nút bấm kích hoạt gọi các API bảo mật trên port 5006, tự động đính kèm `Authorization: Bearer <token>`, và hiển thị kết quả trả về (Success/Forbidden/Unauthorized) dưới dạng JSON được định dạng đẹp mắt với hiệu ứng chuyển động mượt mà.
- **ACL Helper:** Cho phép tùy chỉnh `resourceId`, `x-resource-type` và gửi thử để test chính xác hoạt động phân quyền ACL động từ Redis.

---

## 3. Kế hoạch xác minh (Verification Plan)

### Kiểm thử tự động & khởi động dịch vụ:
1. Chạy lệnh khôi phục dependencies và xây dựng dự án:
   `dotnet build` tại thư mục `TreeOfThought/frontend/webapitestoidc`
2. Chạy ứng dụng trên môi trường dev:
   `dotnet run`
3. Truy cập Swagger UI tại `http://localhost:5006/swagger` để xác thực toàn bộ tài liệu API được sinh ra chính xác.

### Kiểm thử thủ công (Visual & Functional Verification):
1. Truy cập `http://localhost:5006/index.html` trên trình duyệt.
2. Thực hiện đăng nhập bằng tài khoản `admin` / `admin123` để nhận token.
3. Nhấp chọn gọi các API khác nhau để xem kết quả kiểm duyệt phân quyền:
   - Các API `secure`, `admin-role`, `admin-claim` phải trả về `200 OK` do tài khoản admin có toàn quyền.
4. Tạo tài khoản thường hoặc cập nhật Redis cache để giả lập User không có quyền, xác thực xem API có trả về `403 Forbidden` khi thiếu Claim hoặc thiếu quyền ACL tương ứng.
