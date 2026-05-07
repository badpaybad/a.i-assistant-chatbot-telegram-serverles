# Kế hoạch phát triển Frontend TreeOfThought (Bổ sung & Hoàn thiện)

Dựa trên yêu cầu chi tiết tại [yeucau.md](file:///work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/frontend/web/yeucau.md), kế hoạch này tập trung vào việc hoàn thiện các tính năng còn thiếu và tối ưu hóa hệ thống hiện tại.

## 1. Công nghệ bổ sung
- **Mermaid.js / Ng-zorro-graph**: Để vẽ luồng Command/Event trực quan hơn.
- **Service Worker**: Để nhận FCM push notification ở chế độ background.

## 2. Các bước thực hiện cụ thể

### Bước 1: Hoàn thiện Firebase & Real-time
- **Firebase Service**:
    - Cập nhật `subscribeToRequestId(requestId)`: Sau khi nhận dữ liệu, thực hiện `deleteDoc` để xóa document tương ứng trên Firestore.
    - Cấu hình `firebase-messaging-sw.js` trong thư mục `src/` để hỗ trợ Google Messaging.
    - Test việc nhận notification khi tab trình duyệt đang đóng hoặc ở background.

### Bước 2: Quản lý Quyền (Permission)
- **Centralized Config**: Tạo `src/app/core/auth/permissions.config.ts` định nghĩa tất cả các quyền UI (ví dụ: `VIEW_CQRS_DASHBOARD`, `MANAGE_WORKERS`).
- **Sync Logic**: 
    - Khi `AuthService` login thành công, so sánh version danh sách permission hiện tại với version lưu ở LocalStorage.
    - Nếu có thay đổi, gửi danh sách này lên BE qua API `/api/auth/permissions/sync` (cần phối hợp với BE).
- **UI Directive**: Sử dụng `*nzPermission="'PERMISSION_NAME'"` để ẩn/hiện menu và nút bấm.

### Bước 3: Nâng cấp CQRS Dashboard
- **Visual Flow (Tracing)**: 
    - Nâng cấp trang Tracing từ dạng Timeline sang dạng Graph (Flow Chart) trực quan.
    - Hiển thị rõ các node: Command -> Worker -> Queue -> Event -> Topic.
- **Detailed Error Dashboard**:
    - Thêm biểu đồ thống kê lỗi theo thời gian (Error rate).
    - Thêm thông tin chi tiết về nguyên nhân lỗi (Stacktrace) trong message detail.
    - Thêm tab quản lý Worker chi tiết: Xem log gần nhất của worker, thời gian uptime.

### Bước 4: Layout & UX refinements
- **Header Update**: 
    - Khi chưa login: Hiện nút Login/Signup.
    - Khi đã login: Hiện `Username (Email)` và nút Logout.
- **Error Handling**: 
    - Interceptor sẽ bắt mọi lỗi API và hiển thị `nzNotification.error`.
    - Các notification này bắt buộc phải có `nzDuration: 0` (người dùng tự đóng) như yêu cầu.

### Bước 5: Docker & Deployment
- Cập nhật `Dockerfile` để copy đúng folder `dist` và cấu hình Nginx support Single Page Application (SPA) routing.

## 3. Các lưu ý quan trọng
- Luôn giữ code sạch, tuân thủ Angular best practices (Standalone components, Signals/RxJS).
- Giao diện phải mang tính "Premium" (Ant Design tokens, smooth transitions).
- Kiểm tra kỹ việc xóa document Firestore để tránh phát sinh chi phí và dư thừa dữ liệu.

## 4. Câu hỏi cho User
- Backend đã sẵn sàng endpoint `/api/auth/permissions/sync` chưa?
- Có cần hỗ trợ đa ngôn ngữ (i18n) cho các notification không?
