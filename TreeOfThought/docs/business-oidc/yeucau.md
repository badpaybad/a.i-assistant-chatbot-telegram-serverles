# Tài liệu Yêu cầu Nghiệp vụ - Module OIDC (Identity & Decentralized Authorization Management)

Module OIDC cung cấp giải pháp Xác thực tập trung (Single Sign-On - SSO) theo chuẩn OpenID Connect (OIDC) & OAuth2, đồng thời tích hợp hệ thống Quản lý Phân quyền phi tập trung (Decentralized Access Control) dựa trên cơ chế kết hợp Hybrid (Token + Redis Session) và Danh sách kiểm soát truy cập (Access Control List - ACL) theo từng tài nguyên.

## 1. Thông tin Cấu trúc Module

- **Tài liệu nghiệp vụ (Docs):** [yeucau.md](file:///work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/docs/business-oidc/yeucau.md)
- **Backend (BE):**
  - Controllers chính:
    - [AuthController.cs](file:///work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/backend/Core.Infra.Oidc/Controllers/AuthController.cs)
    - [AuthManagementController.cs](file:///work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/backend/Core.Infra.Oidc/Controllers/AuthManagementController.cs)
  - Core Module: [Core.Infra.Oidc](file:///work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/backend/Core.Infra.Oidc)
- **Frontend (FE):** [business-oidc](file:///work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/frontend/web/projects/tot/business-oidc)

---

## 2. Yêu cầu Nghiệp vụ Tổng quan

Hệ thống phân quyền OIDC giải quyết các bài toán cốt lõi sau:

1. **Xác thực tập trung (SSO):** Cho phép người dùng đăng nhập một lần và truy cập vào nhiều ứng dụng trong hệ sinh thái (như App Web, App Mobile, Web Test).
2. **Ủy quyền phi tập trung (Decentralized Authorization):** Hỗ trợ khai báo quyền trực tiếp trong code BE qua Attribute (`AppAuthorize`). Tự động quét và đồng bộ các quyền này vào Cơ sở dữ liệu.
3. **Hybrid Authorization (Tối ưu hóa Token):**
   - Các thông tin cơ bản và vai trò chính (Roles) được lưu trực tiếp trong JWT Token (Stateless).
   - Danh sách quyền chi tiết (Claims/Permissions) được lưu ở Redis Session (Stateful). Khi kiểm tra quyền, hệ thống kết hợp thông tin từ JWT và Redis để xác thực nhanh chóng mà không làm phình to kích thước JWT Token.
4. **Kiểm soát truy cập tài nguyên (ACL):** Cho phép phân quyền chi tiết (Fine-grained access control) tới từng bản ghi tài nguyên cụ thể (`resourceType` & `resourceId`) cho một Người dùng hoặc một Vai trò với Mặt nạ quyền (Permission Mask) dạng Bitmask (Read, Write, Delete, Share).
5. **Realtime Permission Sync (Đồng bộ tức thì):** Khi Admin thay đổi vai trò hoặc quyền của người dùng, hệ thống lập tức đồng bộ thông tin lên Redis Session để có hiệu lực ngay lập tức mà không cần người dùng phải đăng nhập lại.

---

## 3. Chi tiết Yêu cầu và Tính năng Phân hệ Backend (BE)

### 3.1. Phân hệ SSO & OIDC Core ([AuthController.cs](file:///work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/backend/Core.Infra.Oidc/Controllers/AuthController.cs))

- **Discovery Endpoint (`/.well-known/openid-configuration`):** Cung cấp tài liệu cấu hình chuẩn OIDC (issuer, jwks_uri, authorization_endpoint, token_endpoint, userinfo_endpoint, end_session_endpoint...).
- **JWKS Endpoint (`/api/auth/jwks`):** Cung cấp các khóa ký công khai (JSON Web Key Sets) chuẩn RS256 phục vụ client xác thực chữ ký của JWT Token.
- **Login Endpoint (`/api/auth/login`):**
  - Tiếp nhận thông tin Username/Password từ người dùng.
  - Xác thực thông tin, tạo và thiết lập cookie phiên đăng nhập SSO (`CreateSsoSessionCookie`) có thời hạn 7 ngày.
  - Tạo và trả về JWT Access Token cùng Firebase Custom Token phục vụ đồng bộ dữ liệu Realtime.
  - Trả thêm cờ `mustChangePassword` nếu người dùng bắt buộc phải đổi mật khẩu ở lần đăng nhập đầu tiên.
- **Authorize Endpoint (`/api/auth/authorize`):**
  - Tiếp nhận các yêu cầu ủy quyền OAuth2/OIDC (`client_id`, `redirect_uri`, `state`, `response_type`).
  - Nếu người dùng đã có Session Cookie SSO hợp lệ: Tự động tạo `code` (Authorization Code), sau đó chuyển hướng (redirect) người dùng về trang Client kèm `code` và `state`.
  - Nếu chưa đăng nhập: Chuyển hướng người dùng sang giao diện Login UI của SPA kèm theo tham số `returnUrl` được mã hóa.
- **Token Exchange Endpoint (`/api/auth/token`):** Tiếp nhận Authorization Code và Client ID/Secret từ phía Client qua Form hoặc JSON, thực hiện xác thực mã code và trả về JWT Access Token (`id_token` & `access_token`).
- **User Information Endpoint (`/api/auth/me`):** Trả về thông tin chi tiết của người dùng đang đăng nhập (`sub`, username, name, email, email_verified, picture, roles, claims).
- **Social SSO Login (`/api/auth/sso`):** Cho phép đăng nhập SSO qua nhà cung cấp thứ ba (Google, Microsoft, Facebook), khởi tạo Session Cookie và cấp phát token tương ứng.
- **Đăng ký và Xác minh Email (`/api/auth/signup`, `/api/auth/verify`):** Cho phép người dùng đăng ký tài khoản mới và xác minh qua mã gửi về email.
- **Đổi mật khẩu (`/api/auth/change-password`):** Cho phép người dùng tự đổi mật khẩu cá nhân với yêu cầu mật khẩu cũ chính xác.
- **Đăng xuất (`/api/auth/logout`):** Hủy cookie phiên đăng nhập SSO và chuyển hướng về trang `post_logout_redirect_uri` chỉ định.

### 3.2. Phân hệ Quản trị Phân quyền ([AuthManagementController.cs](file:///work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/backend/Core.Infra.Oidc/Controllers/AuthManagementController.cs))

Yêu cầu quyền Admin tối cao (`AdminClaim`).

- **Quản lý Người dùng (User Management):**
  - Hỗ trợ API tìm kiếm và lọc danh sách người dùng nâng cao (`UserSearchQuery`) theo: Từ khóa (Username, DisplayName, Email), trạng thái xác minh, khoảng thời gian tạo (`dateRange`), danh sách vai trò, danh sách quyền trực tiếp, nhà cung cấp SSO (`ssoProvider`), SSO ID.
  - Hỗ trợ CRUD người dùng: Thêm mới, cập nhật thông tin, xóa người dùng (không cho phép xóa tài khoản `admin`).
  - Tải lên ảnh đại diện (`UploadAvatar`): Tải file lên Firebase Storage (Google Cloud Storage) và cập nhật đường dẫn ảnh đại diện vào cơ sở dữ liệu.
  - Quản lý danh sách email phụ của từng người dùng.
- **Quản lý Vai trò (Role Management):**
  - Hỗ trợ API tìm kiếm, lọc danh sách vai trò theo từ khóa, lọc theo danh sách quyền liên kết.
  - Hỗ trợ CRUD vai trò (không cho phép sửa tên hoặc xóa vai trò `Admin`).
  - API gán đơn lẻ hoặc gán hàng loạt (batch) các quyền (claims) cho vai trò, hoặc loại bỏ quyền khỏi vai trò.
- **Quản lý Quyền hạn (Claim Management & Sync):**
  - Hỗ trợ API tìm kiếm và CRUD quyền thủ công.
  - API `/api/Auth/claims/sync` dùng để đồng bộ danh sách quyền từ code hệ thống (thông qua thuộc tính `AppAuthorizeAttribute` được quét ở BE) lên cơ sở dữ liệu.
- **Quản lý Danh sách kiểm soát truy cập (ACL Management):**
  - Lấy danh sách các ACL entry theo tài nguyên (`resourceType` & `resourceId`).
  - Thêm mới ACL entry cho Người dùng hoặc Vai trò trên tài nguyên với Mặt nạ quyền (Bitmask):
    - **Read (1):** Quyền đọc tài nguyên.
    - **Write (2):** Quyền ghi/sửa tài nguyên.
    - **Delete (4):** Quyền xóa tài nguyên.
    - **Share (8):** Quyền chia sẻ tài nguyên.
  - Xóa ACL entry theo ID.
- **Cơ chế Đồng bộ thời gian thực (Realtime Sync):**
  - Mỗi khi Admin thay đổi vai trò hoặc quyền trực tiếp của người dùng (`AssignRole`, `RemoveRole`, `AssignClaims`, `RemoveClaim`), hệ thống tự động gọi hàm đồng bộ thông tin quyền người dùng lên Redis Session (`SyncUserClaimsToRedisAsync`) để áp dụng quyền mới ngay lập tức.
  - Mỗi khi thêm mới ACL entry cho người dùng, hệ thống tự động đồng bộ ACL của user lên Redis (`SyncUserAclToRedisAsync`).

---

## 4. Giao diện Người dùng Phân hệ Frontend (FE)

Phát triển dưới dạng Angular Library độc lập, sử dụng Ng-Zorro-Antd, Transloco (Đa ngôn ngữ), và các component dùng chung đạt chuẩn của dự án (`tot-table`, `tot-button`, `tot-autocomplete`).

### 4.1. Quản lý Người dùng (`user-list` Component)

- **Bảng danh sách người dùng (`tot-table`):**
  - Hiển thị các cột: Avatar (cho phép click để mở hộp thoại tải ảnh đại diện lên ngay lập tức), Người dùng (Tên hiển thị & Username), Email, Trạng thái xác minh email (Tag màu), Vai trò (Hiển thị các tag màu xanh, có nút xóa nhanh từng vai trò trực tiếp trên tag), Quyền trực tiếp (Hiển thị các tag màu tím, có nút xóa nhanh từng quyền trực tiếp), Ngày tạo, Ngày cập nhật, Hành động (Sửa, Xóa).
- **Bộ lọc tìm kiếm:**
  - Nhập từ khóa tìm kiếm (Username, DisplayName, Email) tự động kích hoạt khi nhấn Enter.
  - Lọc theo Trạng thái email (Đã xác minh, Đang chờ).
  - Chọn nhiều Vai trò thông qua component `tot-autocomplete` tự động gọi API lấy danh sách vai trò.
  - Chọn nhiều Quyền thông qua component `tot-autocomplete` tự động gọi API lấy danh sách quyền.
  - Bộ chọn khoảng ngày tạo (`NzDatePicker` range).
  - Lọc theo nhà cung cấp SSO (Google, Microsoft, Facebook) và SSO ID.
  - Nút "Tìm kiếm" và nút "Đặt lại" để khôi phục mặc định bộ lọc.
- **Nút "Sync Claims (BE)":** Nút kích hoạt đồng bộ hóa nhanh danh sách quyền hệ thống được BE phân tích tự động từ code.
- **Modal Thêm/Sửa Người dùng:**
  - Form dọc (`nzLayout="vertical"`).
  - Yêu cầu điền đầy đủ: Tên đăng nhập (chỉ nhập khi thêm mới, bị khóa khi sửa), Mật khẩu (chỉ nhập khi thêm mới), Tên hiển thị, Email.
  - Checkbox "Đã xác minh email".
  - Trường chọn nhiều vai trò và chọn nhiều quyền trực tiếp bằng component autocomplete đa chọn.
- **Modal gán nhanh:** Cho phép gán nhanh danh sách vai trò hoặc quyền cho người dùng bằng autocomplete.

### 4.2. Quản lý Vai trò (`role-list` Component)

- **Bảng danh sách vai trò (`tot-table`):**
  - Hiển thị các cột: Vai trò, Mô tả, Quyền (Danh sách các tag quyền màu xanh đi kèm nút xóa nhanh quyền trực tiếp), Hành động (Sửa, Xóa).
  - Không cho phép xóa vai trò `Admin`.
- **Bộ lọc tìm kiếm:** Tìm kiếm vai trò theo Từ khóa (tên vai trò, mô tả) và lọc theo nhiều quyền liên kết.
- **Modal Thêm/Sửa vai trò:** Form nhập tên vai trò, mô tả, và chọn danh sách các quyền được gắn cho vai trò đó bằng autocomplete đa chọn.

### 4.3. Quản lý ACL (`acl-list` Component)

- **Bộ lọc tài nguyên:** Nhập Loại tài nguyên (ví dụ: `order`) và ID tài nguyên (ví dụ: `123` hoặc `*` cho toàn bộ tài nguyên loại đó) để hiển thị danh sách các ACL kiểm soát truy cập đang được áp dụng.
- **Bảng danh sách ACL (`tot-table`):**
  - Hiển thị các cột: Đối tượng (Người dùng hoặc Vai trò), Tài nguyên (Loại & ID), Mặt nạ quyền (Hiển thị giá trị số mask cùng các Tag phân loại quyền chi tiết: Đọc, Ghi, Xóa, Chia sẻ), Hành động (Xóa).
- **Modal Thêm mới ACL entry:**
  - Cho phép chọn loại đối tượng áp dụng bằng Radio: Người dùng hoặc Vai trò.
  - Chọn đối tượng cụ thể thông qua `tot-autocomplete` (lấy danh sách tương ứng từ API).
  - Nhập Loại tài nguyên và ID tài nguyên.
  - Lựa chọn Mức độ truy cập thông qua Checkbox group (Read - 1, Write - 2, Delete - 4, Share - 8). Giao diện tự động tính toán tổng số Permission Mask (Bitmask) gửi lên BE.

### 4.4. Đồng bộ quyền (`claim-sync` Component)

- **Thông tin đồng bộ:** Hiển thị phiên bản phân quyền hiện tại (`CLAIMS_VERSION`) và số lượng quyền định nghĩa.
- **Nút "Đồng bộ":** Gửi danh sách quyền định nghĩa từ FE lên BE để lưu trữ vào database.
- **Bảng danh sách quyền (`tot-table`):**
  - Hiển thị các cột: Quyền, Mô tả, Ngày tạo, Hành động (Xóa). Không cho phép xóa quyền `admin`.
- **Modal Thêm quyền thủ công:** Cho phép Admin tự nhập mã quyền và mô tả quyền mới ngoài hệ thống quét tự động.

### 4.5. Thông tin Phân quyền cá nhân (`authorize-info` Component)

- **Tab "Quyền của tôi":**
  - Hiển thị chi tiết thông tin Vai trò (Roles) dạng Tag màu vàng (cho Admin) hoặc xanh.
  - Hiển thị chi tiết danh sách Quyền hạn (Claims) dạng Tag màu đỏ (cho Admin) hoặc xanh lá.
  - Hiển thị thẻ thông báo đặc biệt "Bạn đang có quyền Admin tối cao" nếu tài khoản hiện tại sở hữu quyền admin tối cao.
- **Tab "Cấu hình ứng dụng":**
  - Hiển thị phiên bản cấu hình phân quyền hiện tại và Admin Claim quy định.
  - Bảng danh sách các quyền hạn được định nghĩa ở phía Client (`APP_CLAIMS`) giúp kiểm tra nhanh cấu hình.

### 4.6. Đổi mật khẩu (`change-password` Component)

- Giao diện đổi mật khẩu cá nhân cho người dùng đang đăng nhập.
- Yêu cầu nhập: Mật khẩu cũ, Mật khẩu mới (bắt buộc dài tối thiểu 6 ký tự), Xác nhận mật khẩu mới.
- Hỗ trợ validator so khớp mật khẩu mới và mật khẩu xác nhận tức thì trên UI.

**bug user avartar 2026-05-17 12:49:48**
Quản lý người dùng, Khi click vào change avatar ảnh đại diện, chọn ảnh nhưng chưa thấy cập nhật
cần dùng server side paging

**cập nhật 2026-05-21 08:20:20**
Bổ xung thêm chức năng gửi FCM phục vụ noti lên app mobi.
  BE: ở folder TreeOfThought/backend/Core.Infra.Oidc
    - Khi Login cần bổ xung thêm fcm token device id vào request login, allow null or empty
      - Login thành công sẽ lưu fcm token device id vào database.
    - Tạo db riêng cho notify để lưu trữ thông tin user và fcm token device id của user đó, AppType
      - 1 user có thể có nhiều fcm token device id
      - AppType để chỉ ra là fcm token device id đến từ app nào ( admin, mobi android, reactjsatest ...)
  FE: ở folder TreeOfThought/frontend/web/projects/tot/business-oidc
    - Thêm menu để gửi noti cho user, click vào menu vào page
      - danh sách có paging (server side paging), có thể search user theo username hoặc email
        - click gủi noti mở lên modal
            - chọn 1 fcm token device id của user để gửi noti
              - có tiêu đề , nội dung , nút gửi
