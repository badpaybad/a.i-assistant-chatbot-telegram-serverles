# Kế hoạch phát triển Layout (phattrien.md)

Dựa trên yêu cầu tại [yeucau.md](file:///work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/docs/layout/yeucau.md), tài liệu này mô tả giải pháp và kế hoạch thực hiện cho phần Breadcrumb và Sidemenu của Main Layout.

## 1. Giải pháp thực hiện

### 1.1. Breadcrumb chung cho Main Layout
- **Vị trí**: Nằm trong `nz-content`, phía trên `router-outlet`.
- **Logic**: Sử dụng `ActivatedRoute` và lắng nghe sự kiện `NavigationEnd` của `Router` để xây dựng mảng breadcrumb item.
- **Dữ liệu**: Bổ sung `data: { breadcrumb: '...' }` vào các route trong `app.routes.ts`. Nếu route không có dữ liệu này, breadcrumb sẽ không hiển thị item đó hoặc fallback theo tên path.
- **Ngôn ngữ**: Hỗ trợ đa ngôn ngữ thông qua `ngx-translate`.

### 1.2. Sidemenu tự động Active và Expand
- **Active**: Sử dụng thuộc tính `nzMatchRouter` của `ng-zorro-antd` trên các `nz-menu-item`.
- **Expand**: Duy trì một `openMap` trong `MainLayoutComponent`. Khi URL thay đổi, logic sẽ kiểm tra URL hiện tại để cập nhật trạng thái mở (`nzOpen`) cho các `nz-submenu` tương ứng (Dashboard, Auth, Test).

### 1.3. Cải thiện Style cho Sidemenu
- **Màu sắc**: Điều chỉnh CSS để đảm bảo các text không phải link (như tiêu đề Submenu) trong menu Dark theme không bị màu đen, đảm bảo độ tương phản tốt trên nền tối.
- **Hiệu ứng**: Thêm hiệu ứng hover cho các tiêu đề submenu để tạo cảm giác tương tác như các thẻ link `<a>`.

## 2. Danh sách file thay đổi

- `frontend/web/src/app/app.routes.ts`: Thêm metadata breadcrumb cho các route.
- `frontend/web/src/app/layouts/main-layout/main-layout.component.ts`: Cài đặt logic xử lý breadcrumb và auto-expand.
- `frontend/web/src/app/layouts/main-layout/main-layout.component.html`: Thêm component `nz-breadcrumb` và ràng buộc `nzOpen`.
- `frontend/web/src/app/layouts/main-layout/main-layout.component.css`: Thêm style cho breadcrumb và sửa lỗi màu chữ menu.

## 3. Kiểm tra và Nghiệm thu

- Chạy `ng build` để kiểm tra lỗi biên dịch Frontend.
- Sửa lỗi runtime `TypeError: Cannot read properties of undefined (reading 'url')` bằng cách thêm kiểm tra `snapshot` trong logic breadcrumb.
- Sửa cảnh báo deprecation của `ngx-translate` bằng cách sử dụng `fallbackLang` thay cho `defaultLanguage`.
- **Sửa lỗi Breadcrumb Hierarchy**: Chuyển đổi cấu trúc router từ dạng phẳng (flat) sang phân cấp (hierarchical) trong `app.routes.ts`. Điều này giúp logic breadcrumb tự động nhận diện các trang cha và tạo đường dẫn quay lại chính xác (vd: Home / CQRS Dashboard / Tracing).
- Kiểm tra thủ công việc điều hướng qua lại giữa các trang để đảm bảo breadcrumb cập nhật đúng và menu tự động mở rộng.
- Đảm bảo ngôn ngữ hiển thị là tiếng Việt (ưu tiên).
