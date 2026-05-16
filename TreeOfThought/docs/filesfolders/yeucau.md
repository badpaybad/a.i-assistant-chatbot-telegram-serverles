# Yêu cầu nghiệp vụ Quản lý Tệp tin và Thư mục (FilesFolders)

## 1. Mục tiêu
Xây dựng module quản lý tệp tin và thư mục cá nhân cho người dùng, tích hợp lưu trữ đám mây (Google Cloud Storage) và thông báo trạng thái thời gian thực (Realtime UI Feedback).

## 2. Các chức năng chính
- **Quản lý Thư mục**:
    - Tạo thư mục (hỗ trợ phân cấp lồng nhau).
    - Xóa thư mục (xóa đệ quy toàn bộ nội dung bên trong).
    - Di chuyển thư mục.
    - Xem cây thư mục.
- **Quản lý Tệp tin**:
    - Upload file lên Google Cloud Storage (GCS).
    - Xóa file (xóa cả trong DB và trên GCS).
    - Di chuyển file giữa các thư mục.
    - Tìm kiếm file theo tên.
- **Chia sẻ & Phân quyền**:
    - Thiết lập quyền: Private, Public, Shared.
    - Tạo link chia sẻ có thời hạn (Signed URL).
    - Cập nhật ACL trên GCS tương ứng với quyền của file.

## 3. Yêu cầu kỹ thuật (Tuân thủ Base Infra)
- **Kiến trúc**: Modular Monolith + CQRS.
- **Giao tiếp**: 
    - Controller gọi `IDispatcher` để thực hiện Command.
    - Các tác vụ ghi (Create/Update/Delete) phải là bất đồng bộ (Background processing).
    - Phản hồi UI qua Firestore dựa trên `TrackingId`.
- **Bảo mật**: Kiểm tra quyền truy cập thông qua `AppAuthorizeAttribute` và lọc dữ liệu theo `UserId`.
- **Lưu trữ**:
    - Database: `FilesFoldersDbContext` riêng biệt.
    - File: Tích hợp `FirebaseService` (Google Cloud Storage).
