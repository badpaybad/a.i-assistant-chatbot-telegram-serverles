# Định hướng Phát triển Frontend (TreeOfThought)

Tài liệu này trình bày giải pháp kỹ thuật chi tiết cho việc xây dựng Frontend Angular theo mô hình modularized, đảm bảo tính độc lập của các nghiệp vụ (Business Modules) nhưng vẫn tuân thủ các quy chuẩn chung của hệ thống.

## 1. Kiến trúc Module Nghiệp vụ (Business Libraries)

Hệ thống sử dụng kiến trúc **Angular Workspace Libraries** kết hợp với **Ant Design (NG-ZORRO)**.

### Cấu trúc Workspace:
- **`projects/tot/core`**: Thư viện cốt lõi (Core Library).
  - Chứa: `HttpClientService`, `AuthService`, `Interceptors`, `Guards`, `Claims`, `MessageBusService`, `ComponentRegistryService`.
- **`projects/tot/shared`**: Thư viện dùng chung (Shared Library).
  - Chứa các UI Component tái sử dụng cao: `tot-button`, `tot-autocomplete`, `tot-table`, `tot-editor`...
- **`projects/tot/{ten-nghiep-vu}`**: Các thư viện nghiệp vụ (ví dụ: `dashboard`, `files-folders`).
  - Phụ thuộc vào `@tot/core` và `@tot/shared`. Tuyệt đối không phụ thuộc chéo (circular dependency) vào các module nghiệp vụ khác.

### Workflow phát triển:
Khi tạo nghiệp vụ mới, tạo folder con trong `projects/tot/`:
```bash
ng generate library @tot/{name} --prefix tot
```
Mọi thay đổi trong các lib này sẽ được `watch` và cập nhật trực tiếp lên App chính (HMR) thông qua cấu hình `paths` trong `tsconfig.json`.

---

## 2. Quy chuẩn UI Components (Shared Library)

Mọi module nghiệp vụ phải sử dụng các component từ `@tot/shared` để đảm bảo trải nghiệm người dùng nhất quán.
- **Quy tắc đặt tên (Prefix)**: Tất cả các component trong shared library **BẮT BUỘC** phải bắt đầu bằng tiền tố `tot-` (ví dụ: `tot-button`, `tot-table`, `tot-autocomplete`).

### 2.1. Tot Button
- **Tính năng**: Tự động hiển thị loading icon trên nút khi đang xử lý (async operation).
- **Sử dụng**: Truyền một `Observable` hoặc `Promise` vào input `[loading]`. Nút sẽ tự động vô hiệu hóa và hiện loading cho đến khi stream hoàn tất hoặc bị lỗi.

### 2.2. Tot Autocomplete (Dùng chung cho Dropdown/Select)
- **Tên Component**: `tot-autocomplete` (Trước đây là `tot-select`).
- **Chế độ**: Hỗ trợ Single Select và Multi Select.
- **Dữ liệu (Paging Load)**: Hỗ trợ Infinite Scroll. Khi người dùng cuộn tới cuối danh sách, component tự động gọi API lấy trang tiếp theo. Page size mặc định là **10**.
- **Caching & Hydration**: 
  - Hỗ trợ lưu dữ liệu vào `SessionStorage`. Khi khởi tạo, component ưu tiên lấy dữ liệu từ cache để hiển thị ngay lập tức (instant feel).
  - Khi thực hiện phân trang (paging) hoặc tìm kiếm, hệ thống sẽ merge các giá trị mới vào cache hiện có, đảm bảo không trùng lặp và tối ưu hóa việc gọi API.
- **Trạng thái**: Có loading indicator rõ ràng khi đang fetch dữ liệu.

### 2.3. Tot Table
Thành phần hiển thị danh sách dữ liệu chuyên sâu, hỗ trợ từ các bảng đơn giản đến các dashboard phức tạp (như CQRS Dashboard).
- **Phân trang (Paging)**: 
    - **Bắt buộc có**: Paging tiện lợi (tới trang trước/sau, nhảy trang bất kỳ).
    - **Page Size**: Mặc định là **10**. Cho phép chọn các mức: 5, 10, 20, 25, 50, 100, 200.
    - **Cơ chế**: Hỗ trợ linh hoạt cả Client-side paging (frontPagination) và Server-side paging tùy theo khối lượng dữ liệu.
- **Sắp xếp & Bộ lọc (Sort & Filter)**: Thường xuyên được sử dụng. Hỗ trợ sắp xếp đa cột và bộ lọc tùy chỉnh (text, date, hoặc checkbox) cho từng cột.
- **Cột & Hàng Cố định (Fixed Columns & Rows)**: Tùy chọn theo yêu cầu đặc thù. Hỗ trợ định nghĩa các cột cố định bên trái hoặc bên phải để thuận tiện khi scroll ngang, và cố định hàng (fixed header) cho cuộn dọc.
- **Mở rộng dòng (Expandable Rows)**: Tùy chọn. Cung cấp `expandTemplate` để hiển thị nội dung chi tiết, logs, hoặc dữ liệu JSON phức tạp ngay dưới mỗi dòng mà không cần chuyển trang.
- **Template tùy chỉnh (Custom Cell Templates)**: Cho phép truyền `nz-template` để render các UI elements phức tạp bên trong cell (ví dụ: Tag màu sắc cho trạng thái, nhóm nút hành động, icon).
- **Thao tác hàng loạt (Bulk Actions)**: Thường được tích hợp. Hỗ trợ checkbox selection để người dùng thực hiện các tác vụ trên nhiều bản ghi cùng lúc.
- **Tối ưu hiệu năng**: Tích hợp **Virtual Scroll** để đảm bảo giao diện phản hồi mượt mà ngay cả khi hiển thị danh sách có hàng ngàn bản ghi.
- **Quy chuẩn**: Mọi bảng danh sách trong toàn bộ hệ thống (nghiệp vụ và app shell) bắt buộc sử dụng `tot-table` để đảm bảo tính đồng nhất. Page size khởi tạo luôn phải là **10**.
---

## 3. Hệ thống CQRS Message Bus (Event Bus)

Dựa trên mô hình `Core.Infra.Cqrs` ở Backend, Frontend triển khai `MessageBusService` để điều phối giao tiếp giữa các module.

### 3.1. Command (Queue)
- **Cơ chế**: FIFO (First In First Out).
- **Quy tắc**: Tại một thời điểm, chỉ có **duy nhất 1** process được xử lý cho một `queueName`. Các yêu cầu tiếp theo sẽ được xếp hàng đợi (Queue).
- **API**: `messageBus.execute(queueName, commandPayload)`
- **Sử dụng**: Dùng cho các tác vụ cần tuần tự hóa (ví dụ: Upload file hàng loạt, xử lý dữ liệu nặng).

### 3.2. Event (Pub/Sub)
- **Cơ chế**: Phát sóng (Broadcasting).
- **Quy tắc**: Một topic có thể có nhiều Subscriber. Dữ liệu được gửi đi ngay lập tức cho tất cả bên đang lắng nghe.
- **API**: `messageBus.publish(topicName, eventPayload)` / `messageBus.subscribe(topicName, callback)`
- **Sử dụng**: Thông báo trạng thái thay đổi (ví dụ: `FILE_UPLOADED`, `USER_LOGGED_OUT`).

### 3.3. Realtime Feedback (Backend to Frontend)
- **Cơ chế**: Lắng nghe sự kiện từ Backend thông qua Firestore/Realtime DB.
- **Quy tắc (Once-only Receipt)**:
  - Khi gửi một Command lên BE, Frontend kèm theo một `trackingId`. 
  - BE xử lý xong sẽ publish kết quả vào path: `commandresults/{trackingId}`.
  - **Quan trọng**: Sau khi Frontend nhận được data và xử lý UI xong, phải thực hiện **XÓA NGAY** record tại path đó để tránh rác dữ liệu, đảm bảo mỗi notification chỉ được xử lý đúng một lần và đặc biệt là để **tối ưu chi phí lưu trữ/truy vấn trên Cloud (Firestore)**.
- **Sử dụng**: `firebaseService.subscribeOnce(trackingId, callback)`.

---

## 4. Điều phối Component chéo (Component Registry)

Để các module nghiệp vụ sử dụng UI của nhau mà không gây phụ thuộc trực tiếp (ví dụ: CKEditor cần dùng FileSelector làm plugin):

1. **Đăng ký**: Module cung cấp (Provider) đăng ký component vào Registry tại `@tot/core`.
   ```typescript
   registry.register(REGISTRY_KEYS.FILES_SELECTOR, FileSelectorComponent);
   ```
2. **Sử dụng**: Module tiêu thụ (Consumer) gọi component qua Key.
   - Sử dụng hằng số `REGISTRY_KEYS` tập trung tại `@tot/core`.
   - Sử dụng `totComponentHost` directive để render component động.
3. **Mở rộng (Plugin System)**:
   - Các component phức tạp như Editor sẽ cung cấp các "Slots" hoặc "Extension Points".
   - Các module khác có thể đăng ký "Plugin Component" vào các slot này thông qua Registry và Message Bus.

---

## 5. Cấu trúc App Shell (Main App)

App chính (`src/app`) đóng vai trò là "vỏ" (Shell) điều hướng:
- **Layout**: Quản lý Theme (Dark/Light), Sidebar, Header, Breadcrumb.
- **Routing**: Cấu hình **Lazy Loading** cho tất cả các module nghiệp vụ.
- **Security & Permissions**: 
  - `ClaimGuard`: Kiểm tra quyền truy cập URL tập trung.
  - `*totClaimCheck`: Structural Directive (trước đây là `appClaimCheck`) để ẩn/hiện UI elements dựa trên Permission/Claims.
  - Các hằng số Claims được quản lý tập trung tại `@tot/core`.
- **Interceptors**: 
  - `AuthInterceptor`: Tự động gắn Bearer Token.
  - `ErrorInterceptor`: Bắt lỗi HTTP và hiển thị thông báo (Notification) tập trung.

---

## 6. Quy trình Phát triển và DX (Developer Experience)

- **Chế độ Watch**: Cấu hình `paths` trong `tsconfig.json` trỏ trực tiếp đến `public-api.ts` của các libs.
  - Khi sửa code ở bất kỳ Lib nào, App chính sẽ tự động reload (HMR).
- **Lệnh chạy**: `npm start` (hoặc `run-dev.sh`) để watch toàn bộ workspace.

---

## 7. Nguyên tắc KISS & Decoupling

- **Kiểm soát dễ dàng**: Mỗi nghiệp vụ là một đơn vị độc lập (Library).
- **Không phụ thuộc**: Các module nghiệp vụ tuyệt đối không import chéo code của nhau.
- **Đồng nhất**: Mọi module đều dùng chung Layout, Auth, và cơ chế HTTP.
- **Permission tập trung**: Kiểm soát truy cập từ URL đến từng Element nhỏ nhất trên UI.
- **Dữ liệu nhất quán**: Mọi trao đổi dữ liệu xuyên module phải qua Message Bus.
- **Không Placeholder**: Khi phát triển, sử dụng dữ liệu mẫu (mock) sát thực tế hoặc các hình ảnh sinh bởi AI để đảm bảo thẩm mỹ.

---
*Tài liệu này là quy chuẩn bắt buộc cho mọi thành viên phát triển Frontend TreeOfThought.*
