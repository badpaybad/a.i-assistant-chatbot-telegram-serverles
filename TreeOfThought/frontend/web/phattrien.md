# Kế hoạch phát triển Frontend TreeOfThought

## 1. Công nghệ sử dụng
- **React 19**: Phiên bản mới nhất của React.
- **TypeScript**: Đảm bảo type safety.
- **Ant Design (antd)**: UI Framework chính.
- **Vite**: Build tool nhanh chóng.
- **React Router DOM**: Quản lý routing.
- **Axios**: Gọi API tới Backend.
- **Firebase SDK**: Hỗ trợ Auth (Custom Token), Firestore (Realtime), FCM (Push Notification).
- **Docker**: Nginx serve static files (folder `dist`).

## 2. Cấu trúc thư mục (Folder Structure)
```
/src
  /assets          # Hình ảnh, font, icon
  /components      # Component dùng chung toàn app
  /hooks           # Custom hooks dùng chung
  /layouts         # Layout chính (MainLayout, AuthLayout)
  /modules         # Các module nghiệp vụ (gói gọn pages, components, hooks, services, types)
    /auth          # Module xác thực
    /cqrs-test     # Module test API CQRS
  /pages           # Các trang độc lập hoặc trang chủ
  /services        # Service dùng chung (Firebase, API base)
  /store           # State management (nếu cần, dùng Context hoặc Zustand)
  /types           # Type definitions dùng chung
  /utils           # Helper functions (Firebase utils, formatters)
/public            # Static assets
/test              # Folder chứa các file test tự động theo quy tắc
Dockerfile
nginx.conf
package.json
tsconfig.json
vite.config.ts
```

## 3. Các bước thực hiện cụ thể

### Bước 1: Khởi tạo Project
- Chạy `npx create-vite@latest . --template react-ts` trong `TreeOfThought/frontend/web`.
- Cài đặt các package cần thiết: `antd`, `axios`, `firebase`, `react-router-dom`, `@ant-design/icons`, `web-vapi-key` (nếu cần).

### Bước 2: Thiết lập Layout và Routing
- Thiết lập `MainLayout` với `Header`, `Sider`, và `Content` sử dụng Ant Design.
- Định nghĩa hệ thống Route tuân thủ MVC: `/auth/login`, `/auth/signup`, `/home`, `/about`, `/contact`, `/modules/cqrs-test`.

### Bước 3: Tích hợp Firebase
- Tạo `firebaseConfig.ts` từ file json được cung cấp.
- Viết `firebaseUtils.ts`:
    - `signInWithCustomToken(token)`: Đăng nhập bằng custom token từ BE.
    - `subscribeToFirestore(requestId)`: Subscribe vào Firestore collection/doc theo request ID để nhận kết quả realtime.
    - `setupFCM()`: Thiết lập Service Worker để nhận push notification ngay cả khi đóng trình duyệt.

### Bước 4: Xây dựng Module Auth
- **Trang Login**: Hỗ trợ Email/Password và SSO (Google, MS, Facebook).
- **Trang Signup**: Đăng ký với các trường bắt buộc, xử lý verify email qua link.
- **SSO Handling**: Nhận callback từ các provider, gửi lên BE để nhận JWT và Firebase Custom Token.

### Bước 5: Xây dựng Module Test CQRS
- Tạo UI để enqueue Command và publish Event.
- Sử dụng Firestore subscription để hiển thị kết quả xử lý từ BE theo `requestId`.

### Bước 6: Phân quyền UI (Permission Handling)
- Viết hook `usePermissions` để check claims từ JWT token.
- Tạo component `PermissionGate` để ẩn/hiện UI dựa trên claims.
- Cơ chế đồng bộ permission lên BE sau khi login thành công.

### Bước 7: Docker hóa
- Viết `Dockerfile`: Multi-stage build. Stage 1: Build Vite (`npm run build`). Stage 2: Nginx serve folder `dist`.

## 4. Các lưu ý quan trọng
- Không dùng Next.js hay SSR.
- Tuân thủ quy tắc đặt tên file test trong folder `test` và tham số `config_dunp`.
- Giao diện cần hiện đại, premium, sử dụng các hiệu ứng của Ant Design.
