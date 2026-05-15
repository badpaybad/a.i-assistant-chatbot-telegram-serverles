# Tài liệu Phát triển WebTestOIDC

Dự án này là một ứng dụng ASP.NET Core MVC độc lập dùng để kiểm thử luồng Single Sign-On (SSO) thông qua giao thức OpenID Connect (OIDC).

## Mục tiêu
- Tích hợp OIDC với backend hiện có tại `http://localhost:5000`.
- Kiểm chứng tính năng SSO: Đăng nhập ở một nơi, tự động đăng nhập ở nơi còn lại.
- Hiển thị thông tin người dùng (Claims) sau khi đăng nhập thành công.

## Cấu hình kỹ thuật
- **Framework**: ASP.NET Core 8.0 MVC.
- **Port dự kiến**: `5005` (để tránh xung đột với backend 5000 và frontend 4200).
- **Thư viện OIDC**: `Microsoft.AspNetCore.Authentication.OpenIdConnect`.
- **Lưu trữ local**: SQLite (nếu cần lưu cấu hình hoặc log).

## Luồng thực hiện (Plan)

### 1. Khởi tạo Project
- Chạy lệnh: `dotnet new mvc -n webtestoidc` trong thư mục `TreeOfThought/frontend/webtestoidc`.
- Thêm các package cần thiết:
  - `Microsoft.AspNetCore.Authentication.OpenIdConnect`

### 2. Cấu hình OIDC trong Program.cs
Cấu hình Authentication sử dụng đồng thời Cookie và OpenIdConnect:
- **DefaultScheme**: `Cookies`
- **DefaultChallengeScheme**: `OpenIdConnect`
- **MetadataAddress**: `http://localhost:5000/.well-known/openid-configuration`
- **ClientId**: `webtestoidc` (định danh cho app này)
- **ResponseType**: `code` (Authorization Code Flow)
- **SaveTokens**: `true`
- **Scope**: `openid`, `profile`, `email`
- **RequireHttpsMetadata**: `false` (vì đang chạy localhost/http)

### 3. Xây dựng Giao diện (UI)
- **Trang chủ (Index)**:
  - Nếu chưa đăng nhập: Hiển thị nút "Đăng nhập qua SSO".
  - Nếu đã đăng nhập: Hiển thị thông tin User (Username, Email, Roles) và nút "Đăng xuất".
- **Trang Debug**: Liệt kê tất cả các Claims nhận được từ ID Token/User Info.

### 4. Xử lý SSO
- Để kiểm tra SSO:
  1. Mở trình duyệt, đăng nhập vào `http://localhost:5000` (Backend/Portal).
  2. Truy cập `http://localhost:5005`. Khi nhấn "Đăng nhập", nó sẽ tự động nhận diện session và redirect về mà không bắt nhập lại pass.
  3. Ngược lại, đăng nhập ở `5005` rồi sang `5000` cũng sẽ thấy đã login.

### 5. Dữ liệu Test
- Tài khoản: `admin` / `admin123`.
- Backend đã có sẵn dữ liệu này (đã được seed).

## Các bước triển khai chi tiết
1. [x] Tạo project MVC mới.
2. [x] Chỉnh sửa `appsettings.json` để lưu thông tin Authority và ClientId.
3. [x] Cấu hình `Program.cs` để đăng ký dịch vụ Authentication.
4. [x] Cập nhật `HomeController.cs` để xử lý logic hiển thị và ép buộc login (`[Authorize]`).
5. [x] Chỉnh sửa View `Index.cshtml` và `_Layout.cshtml` để hiển thị trạng thái login.
6. [x] Chạy thử nghiệm và quay video/chụp ảnh kết quả.

## Câu hỏi & Lưu ý
- **IP Address**: Nếu test trên máy ảo hoặc thiết bị khác, cần dùng IP LAN (ví dụ `192.168.4.248`). Tôi sẽ cấu hình linh hoạt trong `appsettings.json`.
- **SameSite Cookies**: Do chạy khác port trên localhost, cần lưu ý cấu hình Cookie Policy để không bị chặn bởi trình duyệt.
