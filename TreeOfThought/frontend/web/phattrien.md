# Giải pháp chuyển đổi Permission sang Claims cho FE UI

## 1. Mục tiêu
Thống nhất toàn bộ hệ thống phân quyền ở Frontend (FE) theo cơ chế **Claims-based** thay vì Permission-based, phù hợp với sự thay đổi ở Backend (BE).

## 2. Các thay đổi chính

### 2.1 Cấu hình và Hằng số (Constants)
- Đổi tên file `src/app/core/auth/permissions.config.ts` thành `src/app/core/auth/claims.config.ts`.
- Đổi tên hằng số `APP_PERMISSIONS` thành `APP_CLAIMS`.
- Cập nhật các giá trị claim cho khớp với BE (ví dụ: `cqrs:dashboard:view`).

### 2.2 Dịch vụ và Logic (Services & Logic)
- **AuthService**:
    - Đổi tên method `hasPermission(permission: string)` thành `hasClaim(claim: string)`.
    - Cập nhật logic kiểm tra quyền dựa trên danh sách claims từ JWT hoặc User Profile.
- **AuthManagementService**:
    - Đổi tên các phương thức liên quan đến Permission thành Claim (ví dụ: `getPermissions` -> `getClaims`, `syncPermissions` -> `syncClaims`).
    - Cập nhật endpoint API cho khớp với BE (ví dụ: `/api/auth/claims/sync`).

### 2.3 Bảo vệ tuyến đường (Guards)
- Đổi tên `permissionGuard` thành `claimGuard`.
- Cập nhật tham số nhận vào là mã claim thay vì mã permission.

### 2.4 Chỉ thị (Directives)
- Đổi tên `PermissionDirective` (selector `[appPermission]`) thành `ClaimDirective` (selector `[appClaim]`).

### 2.5 Giao diện người dùng (UI Components)
- **Core Infra Auth Module**:
    - Đổi tên menu "Permission Management" thành "Claims Management".
    - Cập nhật `PermissionSyncComponent` thành `ClaimSyncComponent`.
    - Cập nhật các nhãn (labels), tiêu đề bảng (table headers), thông báo (messages) từ "Permission" sang "Claim".
- **CQRS Dashboard**:
    - Kiểm tra quyền truy cập bằng claim `cqrs:dashboard:view`.

### 2.6 Routes
- Cập nhật `app.routes.ts` để sử dụng `claimGuard` và `APP_CLAIMS`.

## 3. Danh sách file cần chỉnh sửa (Dự kiến)
- `src/app/core/auth/permissions.config.ts` -> `src/app/core/auth/claims.config.ts`
- `src/app/core/auth/permission.guard.ts` -> `src/app/core/auth/claim.guard.ts`
- `src/app/core/auth/auth.service.ts`
- `src/app/shared/directives/permission.directive.ts` -> `src/app/shared/directives/claim.directive.ts`
- `src/app/app.routes.ts`
- `src/app/layouts/main-layout/main-layout.component.html`
- `src/app/modules/core-infra-auth/services/auth-management.service.ts`
- `src/app/modules/core-infra-auth/permission-sync/*` -> `src/app/modules/core-infra-auth/claim-sync/*`
- `src/app/modules/core-infra-auth/role-list/role-list.component.ts`
- `src/app/modules/core-infra-auth/user-list/user-list.component.ts`
- `src/app/modules/core-infra-auth/acl-list/acl-list.component.ts`

## 4. Kế hoạch thực hiện
1. Đổi tên và cập nhật file cấu hình `claims.config.ts`.
2. Cập nhật `AuthService` và `AuthManagementService`.
3. Chuyển đổi `PermissionDirective` sang `ClaimDirective`.
4. Chuyển đổi `permissionGuard` sang `claimGuard`.
5. Cập nhật toàn bộ module `core-infra-auth` (rename component, update template/logic).
6. Cập nhật `MainLayout` và `app.routes.ts`.
7. Kiểm tra lại toàn bộ ứng dụng và chạy `ng build` để xác nhận không còn lỗi tham chiếu.
## 5. Cập nhật 4: Bảo vệ tài khoản và quyền Admin (Admin Special Handling)

### 5.1 Mục tiêu
Đảm bảo các thực thể quan trọng nhất của hệ thống (User admin, Role Admin, Claim admin) không bị xóa hoặc thay đổi nhầm lẫn từ UI.

### 5.2 Kỹ thuật triển khai
- **Vô hiệu hóa hành động xóa**:
    - Trong `UserListComponent`, ẩn hoặc disable nút "Xóa" nếu `username === 'admin'`.
    - Trong `RoleListComponent`, ẩn hoặc disable nút "Xóa" nếu `name === 'Admin'`.
    - Trong `ClaimSyncComponent`, ẩn hoặc disable nút "Xóa" nếu `name === 'admin'`.
- **Khóa gán quyền/vai trò**:
    - Đối với tài khoản `admin`, các tag hiển thị role `Admin` và claim `admin` sẽ được set `nzMode="default"` (không có nút close) để ngăn chặn việc gỡ bỏ các quyền tối cao này.
- **Xử lý thông báo**:
    - Hiển thị thông báo cảnh báo (Warning) nếu người dùng cố gắng thực hiện các hành động bị cấm thông qua các phương thức lập trình.
- **Quản lý Xóa (Delete Management)**:
    - Triển khai các phương thức `deleteUser`, `deleteRole`, `deleteClaim` trong `AuthManagementService` để gọi API BE tương ứng.
    - Luôn hiển thị modal xác nhận (`nz-modal` confirm) trước khi thực hiện xóa các thực thể thông thường.
- **Bắt buộc đổi mật khẩu Admin**:
    - Sau khi login, nếu response trả về `mustChangePassword: true`, FE sẽ tự động điều hướng về trang `/modules/core-infra-auth/change-password` (hoặc modal tương ứng) và không cho phép thoát ra cho đến khi đổi mật khẩu thành công.

## 6. Cập nhật 3: Linh kiện Droplist thông minh

### 5.1 Mục tiêu
Xây dựng component `AppSelectComponent` dùng chung hỗ trợ:
- Autocomplete & Server-side search.
- Infinite scroll (Scroll paging, size = 20).
- Multi-select với Checkbox.

### 5.2 Kỹ thuật triển khai
- **Base**: `nz-select` của NG-ZORRO.
- **Search**: RxJS `Subject` + `debounceTime(300)` + `distinctUntilChanged`.
- **Infinite Scroll**: Lắng nghe `nzScrollToBottom`, gọi API với `pageIndex++`.
- **UI**: 
    - Custom template cho `nz-option` để hiển thị Checkbox khi `mode="multiple"`.
    - `nzServerSearch` để tắt search local.
- **Data Binding**: Hỗ trợ `ControlValueAccessor` để dùng được với `ngModel` và `ReactiveForms`.

### 5.3 Danh sách file
- `src/app/shared/components/app-select/app-select.component.ts`
- `src/app/shared/components/app-select/app-select.component.html`
- `src/app/shared/shared.module.ts` (export component)

## 7. Cập nhật 5: Nâng cấp hệ thống Directive Phân quyền (Structural Directive)

### 7.1 Mục tiêu
Thay thế hoàn toàn việc sử dụng `*ngIf="hasClaim(...)"` bằng Directive chuyên dụng `*appClaimCheck` để:
- Giảm thiểu code lặp lại trong template.
- Tự động hiển thị thông báo "Truy cập bị hạn chế" (Permission Denied) thay vì chỉ ẩn đi, giúp tăng trải nghiệm người dùng.

### 7.2 Kỹ thuật triển khai
- **AppClaimDirective (Selector: `appClaimCheck`)**:
    - Là một **Structural Directive** (`*appClaimCheck`).
    - **Logic**: Nếu người dùng có quyền, render nội dung gốc. Nếu không, render một giao diện thông báo lỗi (Denial Message) chuyên nghiệp.
    - **Hỗ trợ chế độ ẩn**: Thêm Input `appClaimCheckHide` để chỉ ẩn phần tử (giống `*ngIf`) khi cần thiết (ví dụ: các nút hành động nhỏ).
    - **Xử lý Layout Thông minh**: Tự động nhận diện nếu Directive nằm trong một danh sách (`<ul>` - ví dụ: Menu Sidebar) thì sẽ bọc thông báo lỗi trong thẻ `<li>` để đảm bảo không làm vỡ cấu trúc DOM và CSS của Ant Design.
    - **Bảo mật & Thẩm mỹ**: Sử dụng `DomSanitizer` để render an toàn các thông báo có style CSS inline, tạo giao diện báo lỗi Premium.
- **Tích hợp Router Toàn cục**:
    - Sử dụng `*appClaimCheck=""` bọc ngoài `<router-outlet>` trong `MainLayout`. Đây là một kỹ thuật mạnh mẽ để yêu cầu trạng thái đăng nhập cho toàn bộ khu vực nội dung chính mà không cần cấu hình Guard cho từng route lẻ.
- **Cập nhật AuthService**:
    - Phương thức `hasClaim` được nâng cấp để hỗ trợ kiểm tra giá trị rỗng (`null`, `undefined`, `""`, `[]`). Khi giá trị kiểm tra rỗng, hàm sẽ trả về `true` nếu người dùng đã đăng nhập (có bất kỳ claim nào), giúp triển khai điều kiện "Chỉ cần đăng nhập" một cách dễ dàng.

### 7.3 Danh sách file đã hoàn thành
- `src/app/shared/directives/claim.directive.ts` (Implement `AppClaimDirective`)
- `src/app/core/auth/auth.service.ts` (Nâng cấp logic `hasClaim`)
- `src/app/layouts/main-layout/main-layout.component.html` (Chuyển đổi từ `*ngIf` sang `*appClaimCheck`)
- `src/app/layouts/main-layout/main-layout.component.ts` (Import và cấu hình directive)
