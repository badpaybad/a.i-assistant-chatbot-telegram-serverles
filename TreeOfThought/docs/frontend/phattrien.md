# Định hướng Phát triển Frontend (TreeOfThought)

Tài liệu này trình bày giải pháp kỹ thuật cho việc xây dựng Frontend Angular theo mô hình modularized, đảm bảo tính độc lập của các nghiệp vụ (Business Modules) nhưng vẫn tuân thủ các quy chuẩn chung của hệ thống.

## 1. Kiến trúc Module Nghiệp vụ (Business Libraries) và Core Library

Để đạt được sự tách biệt hoàn toàn và khả năng tái sử dụng, chúng ta sẽ sử dụng kiến trúc **Angular Workspace Libraries**.

### Cấu trúc dự kiến:
- **`projects/libs/core`**: Thư viện cốt lõi, tách ra từ `src/app/core` của app chính.
  - Chứa: `HttpClientService`, `AuthService`, `Interceptors`, `Guards`, `Claims Configuration`, `MessageBusService`.
- **`projects/libs/<business-name>`**: Các thư viện nghiệp vụ riêng biệt.
  - Phụ thuộc vào `@tot/core` để sử dụng các rule chung.
- **`src/app`**: App chính (Shell), đóng vai trò cấu hình routing và layout tổng thể.

### Cách thực hiện:
1. Khởi tạo thư viện Core:
```bash
ng generate library @tot/core --prefix tot
```
2. Di chuyển (Refactor) code từ `src/app/core` sang `projects/libs/core/src/lib`.
3. Cấu hình `tsconfig.json` để sử dụng alias `@tot/core`.
4. Các thư viện nghiệp vụ sẽ được tạo tương tự:
```bash
ng generate library @tot/business-a --prefix tot
```

## 2. Quy chuẩn chung (Core Rules)

Tất cả các module nghiệp vụ phải tuân thủ các quy tắc sau:

### HttpClient & Interceptors
- **Core Library** cung cấp `HttpClientService` chuẩn.
- Các nghiệp vụ sử dụng `HttpClientService` từ `@tot/core`.
- **Interceptors** được định nghĩa trong `@tot/core` và được `provide` tại app chính để áp dụng cho toàn bộ ứng dụng.
  - `AuthInterceptor`: Tự động thêm `Authorization: Bearer <token>`.
  - `ErrorInterceptor`: Xử lý thông báo lỗi người dùng qua UI (Toast/Notification).

### Auth & Authorization
- `AuthService`, `ClaimGuard` và hằng số `APP_CLAIMS` sẽ được chuyển hết vào `@tot/core`.
- Điều này đảm bảo tất cả các module nghiệp vụ đều sử dụng chung một cơ chế phân quyền và kiểm tra trạng thái đăng nhập.

## 3. Hệ thống CQRS Event Bus (Commands & Events)

Để nhất quán hoàn toàn với kiến trúc Backend (`Core.Infra.Cqrs`), Frontend sẽ triển khai `MessageBusService` theo mô hình Dispatcher/Mediator:

### Thành phần:
- **`IBaseCommand`**: Interface cho các command.
- **`IBaseEvent`**: Interface cho các event.
- **`ICommandHandler<T>`**: Interface cho các service xử lý command.
- **`IEventHandler<T>`**: Interface cho các service xử lý event.

### API của MessageBusService:
- **`execute<TCommand>(queueName: string, command: TCommand): Promise<void>`**:
  - Thực thi command trên một queue xác định.
  - **Cơ chế Queue**: Các command được xử lý lần lượt (FIFO) dựa trên `queueName`. Chỉ một item được xử lý tại một thời điểm cho mỗi queue name.
- **`publish<TEvent>(topicName: string, event: TEvent): void`**:
  - Phát sóng event tới một topic xác định.
  - **Cơ chế Pub/Sub**: Tất cả các subscriber đã đăng ký lắng nghe `topicName` này sẽ nhận được event.
- **`registerCommandHandler(queueName: string, handler: CommandHandler)`**: Đăng ký logic xử lý cho một queue xác định.
- **`registerEventHandler(topicName: string, handler: EventHandler)`**: Đăng ký lắng nghe sự kiện từ một topic xác định.

### Ưu điểm:
- **Nhất quán**: Sử dụng chung thuật ngữ (`Execute`, `Publish`, `Handler`) với Backend.
- **Mở rộng**: Dễ dàng tích hợp với các hệ thống Tracking hoặc Logging tập trung.

## 4. Điều hướng (Navigation) và Menu

Để quản lý menu và điều hướng linh hoạt giữa các module nghiệp vụ:

- **Menu động**: Danh sách menu sẽ được cấu hình tập trung trong `@tot/core`. Mỗi module nghiệp vụ khi được tích hợp sẽ khai báo các mục menu tương ứng.
- **Phân quyền Menu**: Sử dụng `AppClaimDirective` để ẩn/hiện các mục menu dựa trên quyền của người dùng.
- **Breadcrumbs**: Hệ thống sẽ tự động tạo breadcrumb dựa trên cấu trúc routing và thuộc tính `data: { breadcrumb: '...' }`.

## 5. Quản lý State và Trao đổi dữ liệu (State Management)

Việc trao đổi dữ liệu sẽ được thực hiện theo các cấp độ:

### Cấp độ Component (Cha - Con)
- Sử dụng `@Input()` để truyền dữ liệu xuống và `@Output()` (EventEmitter) để gửi sự kiện lên.
- Sử dụng `template reference variables` hoặc `@ViewChild` khi cần truy cập trực tiếp component con.

### Cấp độ Module/Page (Local State)
- **Angular Signals**: Sử dụng `signal`, `computed`, và `effect` để quản lý state reactive một cách hiệu quả và hiệu năng cao.
- **Shared Services**: Tạo các service nội bộ trong module nghiệp vụ để chia sẻ dữ liệu giữa các component của module đó.

### Cấp độ Toàn hệ thống (Global/Cross-Module State)
- **Core Services**: Các dữ liệu dùng chung toàn app (User profile, Settings) được lưu trong các service của `@tot/core`.
- **Event Bus (MessageBusService)**: Đây là cơ chế chính để các module nghiệp vụ gửi dữ liệu cho nhau một cách "lỏng lẻo" (Decoupled).
  - Ví dụ: Module "Files" phát sự kiện `FILE_UPLOADED`, module "Dashboard" nhận sự kiện này để cập nhật thông số hiển thị.
- **Persistent State**: Sử dụng `localStorage` hoặc `sessionStorage` (được bọc trong một `StorageService` của `@tot/core`) để duy trì dữ liệu khi reload trang.

## 6. Setup Routing chuẩn

Hệ thống sẽ sử dụng Lazy Loading để tải các module nghiệp vụ khi cần thiết.

- Mỗi module nghiệp vụ có file `*.routes.ts` riêng.
- `app.routes.ts` sẽ import theo dạng:
```typescript
{
  loadChildren: () => import('@tot/business-a').then(m => m.BUSINESS_A_ROUTES)
}
```

## 6. Sử dụng Component chéo giữa các Module (Cross-Module Usage)

Để đảm bảo tính độc lập nhưng vẫn cho phép các module sử dụng lại component của nhau, chúng ta áp dụng các chiến lược sau:

### 1. Shared UI Library (@tot/shared)
- Các component mang tính chất công cụ (UI-Only) như `CKEditor`, `AppSelect`, `AppUploader` sẽ được đưa vào thư viện `@tot/shared`.
- Bất kỳ module nghiệp vụ nào cũng có thể import và sử dụng trực tiếp các component này.

### 2. Mô hình Plugin & Registry (Dynamic Injection)
- Đối với các trường hợp nghiệp vụ này cần "nhúng" vào nghiệp vụ kia (ví dụ: File Explorer nhúng vào toolbar của CKEditor):
  - **@tot/core** cung cấp một `ComponentRegistryService`.
  - **Module A (Cung cấp)**: Đăng ký component của mình vào Registry với một mã định danh (key).
    - `registry.register('FILE_PICKER_MODAL', FileExplorerComponent)`
  - **Module B (Sử dụng)**: Yêu cầu component từ Registry thông qua key và hiển thị bằng `ngComponentOutlet`.
    - Điều này giúp Module B không cần import trực tiếp code của Module A, tránh phụ thuộc vòng (Circular Dependency).

### 3. Giao tiếp qua Event Bus
- Khi một component được nhúng (Plugin) thực hiện một hành động (ví dụ: chọn xong file), nó sẽ phát một **Event** qua `MessageBusService`.
- Module chứa (Host) sẽ lắng nghe Event đó để nhận dữ liệu.
  - Ví dụ: `FileExplorer` phát `FILE_SELECTED`, `CKEditor` lắng nghe và chèn link vào văn bản.

### 4. Quản lý Registry Keys tập trung
- Để tránh việc sử dụng các chuỗi ký tự (magic strings) gây lỗi chính tả và khó quản lý, toàn bộ các `Key` dùng để đăng ký component và sự kiện sẽ được định nghĩa tập trung tại **@tot/core**.
- Các module nghiệp vụ và Shared library sẽ import các hằng số này để đảm bảo tính nhất quán.
  - Ví dụ: `REGISTRY_KEYS.FILES_FOLDERS`, `EVENT_TOPICS.FILE_SELECTED`.

## 7. Quy trình Phát triển và Chế độ Watch (DX)

Để đảm bảo các thay đổi trong thư viện (Libs) và Module nghiệp vụ được cập nhật ngay lập tức mà không cần build lại thủ công:

- **TSConfig Path Mapping**: Cấu hình `paths` trong `tsconfig.json` trỏ trực tiếp đến file `public-api.ts` (source) của các thư viện thay vì trỏ vào thư mục `dist/`. 
  - Điều này cho phép Angular Dev Server theo dõi trực tiếp các thay đổi trong code của Libs và tự động reload ứng dụng (HMR - Hot Module Replacement).
- **Lệnh chạy**: Sử dụng `npm start` (ng serve) sẽ tự động watch toàn bộ các file trong workspace (bao gồm cả app chính và các libs được mapping).

## 8. Đảm bảo các tiêu chí cốt lõi

Kiến trúc này được thiết kế để giải quyết triệt để các yêu cầu sau:

- **Kiểm soát nghiệp vụ dễ dàng**: Mỗi nghiệp vụ là một Library riêng biệt trong `projects/tot/business-*`. Việc quản lý source code, versioning và build được thực hiện độc lập.
- **Phát triển tập trung, không phụ thuộc**: 
  - Các module nghiệp vụ **không được phép** import trực tiếp lẫn nhau.
  - Mọi giao tiếp và trao đổi dữ liệu phải thông qua `MessageBusService` (CQRS) của `@tot/core`.
- **Đồng nhất trao đổi dữ liệu**: Sử dụng chung các Interface và mô hình Command/Event định nghĩa trong `@tot/core`.
- **Đồng nhất về Layout**: 
  - Toàn bộ ứng dụng sử dụng chung App Shell (`MainLayoutComponent`).
  - Hệ thống Design System (CSS Variables, Typography, Spacing) được định nghĩa tập trung tại `@tot/core`.
- **Đồng nhất về Permission**:
  - **Truy cập URL**: Sử dụng `claimGuard` thống nhất cho tất cả các Route.
  - **Hiển thị Component/Element**: Sử dụng Directive `*appClaimCheck` để ẩn/hiện hoặc hiển thị thông báo "Truy cập bị hạn chế" một cách nhất quán trên toàn hệ thống.

---
*Tài liệu này sẽ tiếp tục được cập nhật dựa trên quá trình phát triển thực tế.*
