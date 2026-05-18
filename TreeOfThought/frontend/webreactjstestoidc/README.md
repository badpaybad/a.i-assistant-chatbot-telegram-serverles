# React OIDC Test App

Đây là một ứng dụng ReactJS độc lập (Single Page Application - SPA) được tạo bằng Vite và TypeScript, sử dụng để test tính năng đăng nhập/đăng xuất OIDC SSO (Single Sign-On).

## Yêu cầu

Để ứng dụng này có thể hoạt động đúng với luồng OIDC:
1. Bạn cần phải có Identity Provider (OIDC Server) đang chạy tại địa chỉ `http://localhost:5000` (Ví dụ: project backend `Core.Web.Api` đang được khởi chạy).
2. Tên đăng nhập để test mặc định là:
   - **Username:** admin
   - **Password:** admin123
3. Client ID được cấu hình trong source code hiện tại là `react_spa`. (Có thể thay đổi trong file `src/oidcConfig.ts` nếu cần để map với server của bạn).

## Hướng dẫn cài đặt và chạy ứng dụng

### 1. Cài đặt các thư viện (Dependencies)
Mở terminal, trỏ đường dẫn tới thư mục `TreeOfThought/frontend/webreactjstestoidc` và chạy lệnh sau để tải các packages cần thiết:

```bash
npm install
```

### 2. Khởi chạy môi trường Dev (Development Server)
Sau khi cài đặt xong, chạy lệnh sau để khởi động ứng dụng:

```bash
npm run dev
```

Ứng dụng sẽ được khởi chạy tại địa chỉ `http://localhost:5173/` (Vite mặc định cổng này).
Hãy mở trình duyệt và truy cập vào địa chỉ trên.

### 3. Build ứng dụng (Dùng cho Production)
Nếu cần build ứng dụng ra các file tĩnh (static HTML, JS, CSS) để host trên server (như Nginx, Apache), bạn chạy lệnh:

```bash
npm run build
```

Các file build hoàn thiện sẽ nằm trong thư mục `dist/`.

## Cấu trúc luồng chạy (Flow)
- **`/` (Trang chủ):** Hiển thị thông tin test và nút **"Login with SSO"**.
- **`/profile` (Trang thông tin user):** Nếu chưa login, sẽ cảnh báo "Bạn chưa login!" và redirect về trang chủ. Nếu đã login, sẽ hiển thị thông tin User Claims (dữ liệu token) và có nút **"Logout"**. 

Khi bạn bấm Login hoặc Logout, ứng dụng sẽ tự động redirect sang Identity Server `http://localhost:5000`, thực hiện thao tác rồi redirect quay lại trang ReactJS này.
