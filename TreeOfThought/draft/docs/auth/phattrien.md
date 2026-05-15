# Giải pháp phát triển Module Auth (Xác thực & Phân quyền) - Chi tiết Thực thi

## 1. Mục tiêu và Phạm vi
Hoàn thiện hệ thống xác thực và phân quyền tập trung (Auth Module) cho toàn bộ hệ sinh thái TreeOfThought. Hệ thống đáp ứng các yêu cầu về bảo mật nghiêm ngặt, quản lý linh hoạt (RBAC + ACL), và hỗ trợ đa phương thức đăng nhập (SSO, Local Account).

## 2. Giải pháp thực hiện

### 2.1 Backend (.NET Core 8 + Core.Infra.Auth)
- **Cơ chế xác thực**: Sử dụng JWT Token kết hợp với Firebase Custom Token để đồng bộ trạng thái giữa Web App và Firebase (Firestore/FCM).
- **Phân quyền Hybrid**:
    - **Claims-based**: Các quyền cơ bản được nhúng trực tiếp vào JWT (giới hạn < 30 claims để tối ưu header size).
    - **ACL (Access Control List)**: Các quyền chi tiết hoặc danh sách quyền lớn được lưu trữ và truy vấn qua Redis để đảm bảo hiệu năng cao.
    - **Policy-based**: Sử dụng `AppAuthorizeAttribute` để tạo Policy động, hỗ trợ kiểm tra quyền theo chế độ `AND`/`OR`.
- **Bảo mật hệ thống**:
    - Bảo vệ tuyệt đối các thực thể hệ thống: Tài khoản `admin`, Vai trò `Admin`, và Quyền `be.admin`.
    - Cơ chế ép buộc đổi mật khẩu (`mustChangePassword`) cho tài khoản quản trị khi khởi tạo.
    - Xử lý không phân biệt hoa thường (Case-insensitive) cho Username, Role và Claim.

### 2.2 Frontend (Angular 21 + Ng-Zorro-Antd)
- **Quản lý trạng thái**: `AuthService` xử lý luồng Login/Signup, SSO và đồng bộ Claims tự động khi khởi chạy.
- **UI/UX Phân quyền**:
    - Sử dụng Structural Directive `*appClaim` để ẩn/hiện các thành phần giao diện dựa trên quyền của người dùng.
    - Tự động gán tiền tố `fe.` cho các quyền thuộc về giao diện và `be.` cho các quyền xử lý phía backend.
- **Đa ngôn ngữ (i18n)**: Mặc định tiếng Việt, hỗ trợ tiếng Anh thông qua `ngx-translate`. Các thông báo lỗi và thành công đều được dịch hóa.

---

## 3. Đặc tả Kỹ thuật (Technical Specs)

### 3.1. Danh mục API Endpoints (`/api/Auth/` & `/api/AuthManagement/`)
| Endpoint | Method | Mô tả |
| :--- | :--- | :--- |
| `Auth/login` | POST | Đăng nhập tài khoản local, trả về JWT + Firebase Token |
| `Auth/sso` | POST | Xác thực thông qua Google/Microsoft/Facebook |
| `Auth/me` | GET | Lấy thông tin chi tiết user và danh sách Claims hiện tại |
| `Auth/claims/sync`| POST | Đồng bộ danh sách Claims định nghĩa từ FE lên BE |
| `AuthManagement/users` | GET/DELETE | Quản lý danh sách người dùng và xóa tài khoản |
| `AuthManagement/roles` | GET/POST/DELETE | Quản lý Vai trò (Roles) và gán Quyền (Claims) cho Vai trò |
| `AuthManagement/acl` | GET/POST/DELETE | Quản lý quyền chi tiết (ACL) cho từng User/Resource |

### 3.2. Quy tắc Đặt tên & Bảo mật (Security Rules)
- **Quy tắc Claims**: 
    - `fe.[module]:[feature]:[action]` (Vd: `fe.cqrs:dashboard:view`).
    - `be.[module]:[feature]:[action]` (Vd: `be.admin`).
- **Thực thể được bảo vệ**:
    - Không thể xóa/sửa: User: `admin`, Role: `Admin`, Claim: `be.admin`.
    - Mọi kiểm tra quyền sẽ được ưu tiên `Succeed` nếu User sở hữu Role `Admin` hoặc Claim `be.admin`.

---

## 4. Quy trình Kiểm tra & Xác thực
- **Xác thực**: 
    - Kiểm tra đăng nhập Local với tài khoản `admin/admin123`.
    - Kiểm tra luồng SSO với Google (yêu cầu cấu hình Firebase Client).
- **Phân quyền**:
    - Gán/Gỡ quyền cho User/Role và kiểm tra sự thay đổi tức thì trên giao diện (ẩn/hiện menu/nút bấm).
    - Thử nghiệm truy cập API bằng Postman khi không có quyền để xác nhận lỗi `403 Forbidden`.
- **Bảo mật**:
    - Thử xóa tài khoản `admin` từ giao diện User Management để xác nhận chức năng bị chặn.

## 5. Trạng thái Hệ thống
- **Stable & Ready**: Module Auth đã hoàn thiện các tính năng cốt lõi, sẵn sàng phục vụ cho việc tích hợp các nghiệp vụ khác (CQRS Dashboard, AI Assistant...).
- **Claims Version**: `1.3.0` (Tự động cập nhật khi có thay đổi trong `claims.config.ts`).
