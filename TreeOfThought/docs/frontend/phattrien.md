# Định hướng Phát triển Frontend (TreeOfThought)

Tài liệu này trình bày giải pháp kỹ thuật cho việc xây dựng Frontend Angular theo mô hình modularized, đảm bảo tính độc lập của các nghiệp vụ (Business Modules) nhưng vẫn tuân thủ các quy chuẩn chung của hệ thống.

## 1. Kiến trúc Module Nghiệp vụ (Business Libraries) và Core Library

Để đạt được sự tách biệt hoàn toàn và khả năng tái sử dụng, chúng ta sử dụng kiến trúc **Angular Workspace Libraries** kết hợp với **Ant Design (NG-ZORRO)** cho UI.

### Cấu trúc thư mục:
- **`projects/tot/core`**: Thư viện cốt lõi (Core Library).
  - Chứa: `HttpClientService`, `AuthService`, `Interceptors`, `Guards`, `Claims Configuration`, `MessageBusService`, `ComponentRegistryService`.
- **`projects/tot/shared`**: Thư viện dùng chung (Shared Library) cho các UI Component tái sử dụng (Editor, Select, Modals).
- **`projects/tot/business-*` hoặc `projects/tot/*`**: Các thư viện nghiệp vụ riêng biệt (ví dụ: `auth`, `files`, `dashboard`).
  - Phụ thuộc vào `@tot/core` và `@tot/shared`.
- **`src/app`**: App chính (Shell), đóng vai trò cấu hình routing cấp cao và layout tổng thể.

### Cách thực hiện cho nghiệp vụ mới:
Khi phát triển nghiệp vụ mới, tạo thư viện trong thư mục `projects/tot`. Tên thư viện cần phản ánh chính xác nghiệp vụ đó (không bắt buộc phải có prefix `business-`):
```bash
ng generate library @tot/{ten-nghiep-vu} --prefix tot
```
*Lưu ý: Luôn tuân thủ việc sử dụng các thư viện core và shared để đảm bảo tính nhất quán.*

## 2. Quy chuẩn chung (Core Rules)

Tất cả các module nghiệp vụ phải tuân thủ các quy tắc sau để đảm bảo tính đồng nhất:

### HttpClient & Interceptors
- **Core Library** cung cấp `HttpClientService` chuẩn hóa.
- Các nghiệp vụ sử dụng `HttpClientService` từ `@tot/core`.
- **Interceptors** được định nghĩa trong `@tot/core` và được `provide` tại app chính:
  - `AuthInterceptor`: Tự động thêm `Authorization: Bearer <token>`.
  - `ErrorInterceptor`: Xử lý thông báo lỗi tập trung qua `AppNotificationService`.

### Auth & Authorization
- `AuthService`, `ClaimGuard` và hằng số `APP_CLAIMS` nằm trong `@tot/core`.
- Sử dụng Directive `*appClaimCheck` (trong Core) để kiểm soát ẩn/hiện UI dựa trên Permission.

## 3. Hệ thống CQRS Message Bus (Commands & Events)

Frontend triển khai `MessageBusService` để đảm bảo giao tiếp "lỏng lẻo" (decoupled) và nhất quán với kiến trúc Backend.

### Cơ chế Command (Queue):
- **Tính chất**: FIFO (First In First Out).
- **Ràng buộc**: Tại một thời điểm, chỉ có **một** process được xử lý cho một `queueName` cụ thể. Các item tiếp theo sẽ phải đợi item trước hoàn thành (Promise-based).
- **Sử dụng**: `messageBus.execute('UPLOAD_QUEUE', command)`.

### Cơ chế Event (Pub/Sub):
- **Tính chất**: Phát sóng (Broadcasting).
- **Sử dụng**: `messageBus.publish('FILE_SELECTED', event)`. Nhiều subscriber có thể cùng lắng nghe một topic.

## 4. Điều hướng (Navigation) và Menu

- **Menu động**: Cấu hình tập trung trong `MenuService` của `@tot/core`.
- **Breadcrumbs**: Tự động sinh dựa trên cấu trúc routing và `data: { breadcrumb: '...' }`.
- **Phân quyền**: Menu item tự động ẩn nếu người dùng không có đủ Claim tương ứng.

## 5. Quản lý State và Trao đổi dữ liệu

### Giữa các Module (Cross-Module):
- **MessageBusService**: Đây là cơ chế chính để trao đổi dữ liệu mà không gây phụ thuộc vòng.
- Ví dụ: `business-files` phát sự kiện, `business-dashboard` lắng nghe để cập nhật.

### Trong nội bộ Module:
- **Angular Signals**: Sử dụng cho local state (computed, effect).
- **Shared Services**: Service nội bộ của module nghiệp vụ.

## 6. Setup Routing và Lazy Loading

Hệ thống sử dụng Lazy Loading để tối ưu hóa tốc độ tải trang:
- Mỗi module nghiệp vụ có file `*.routes.ts` riêng.
- App chính import các route này thông qua `loadChildren`.
- Tất cả các route nghiệp vụ đều được bảo vệ bởi `ClaimGuard`.

## 7. Sử dụng Component chéo (Component Registry)

Để một nghiệp vụ sử dụng component của nghiệp vụ khác mà không cần import trực tiếp:

1. **Đăng ký (Provider Side)**: Nghiệp vụ cung cấp component đăng ký vào `ComponentRegistryService` với một `REGISTRY_KEY`.
   - `registry.register(REGISTRY_KEYS.FILE_EXPLORER, FileExplorerComponent)`
2. **Sử dụng (Consumer Side)**: Nghiệp vụ cần dùng sẽ lấy component từ Registry qua key.
   - Sử dụng `ngComponentOutlet` để hiển thị component động.
3. **Giao tiếp**: Component được nhúng giao tiếp ngược lại với Host thông qua `MessageBusService`.

*Ví dụ: CKEditor (Shared) cần nút chọn file từ `business-files`. CKEditor sẽ yêu cầu component qua key `FILES_SELECTOR` mà không cần biết `business-files` là gì.*

## 8. Quy trình Phát triển và DX (Developer Experience)

- **Chế độ Watch**: Cấu hình `paths` trong `tsconfig.json` trỏ trực tiếp đến `public-api.ts` của các libs.
  - Khi sửa code ở bất kỳ Lib nào, App chính sẽ tự động reload (HMR).
- **Lệnh chạy**: `npm start` (hoặc `run-dev.sh`) để watch toàn bộ workspace.

## 9. Đảm bảo các tiêu chí cốt lõi (KISS & Clean Architecture)

- **Kiểm soát dễ dàng**: Mỗi nghiệp vụ là một đơn vị độc lập.
- **Không phụ thuộc**: Các module nghiệp vụ tuyệt đối không import chéo code của nhau.
- **Đồng nhất**: Mọi module đều dùng chung Layout, Auth, và cơ chế HTTP.
- **Permission tập trung**: Kiểm soát truy cập từ URL đến từng Element nhỏ nhất trên UI.

---
*Tài liệu này là hướng dẫn bắt buộc cho mọi thành viên phát triển Frontend TreeOfThought.*
