# Kế hoạch Hoàn thiện module FilesFolders

Dựa trên review hiện trạng, tài liệu này mô tả các bước cụ thể để hoàn thiện tính năng Realtime UI Feedback và tối ưu hóa code base cho module FilesFolders.

## 1. Vấn đề hiện tại
- **Frontend**: Chưa lắng nghe Firestore, đang refresh UI thủ công. Chưa sinh `TrackingId` đồng bộ.
- **Backend**: Controller chưa hỗ trợ nhận/trả `TrackingId`. Cấu hình Firebase còn bị hardcode.

## 2. Giải pháp kỹ thuật

### A. Hạ tầng & Core (Cải tiến chung)
- **TrackingId Management**: 
    - Frontend `HttpClientService` sẽ tự động sinh `X-Tracking-Id` (Guid) cho mọi request `POST`, `PUT`, `DELETE`.
    - `X-Tracking-Id` này sẽ được gửi trong header.
- **Firebase Config**:
    - Định nghĩa `FirebaseOptions` class trong `Core.Infra.Firebase`.
    - Map cấu hình từ `appsettings.json` vào options này.
    - Inject `IOptions<FirebaseOptions>` vào các service thay vì dùng `IConfiguration` trực tiếp.

### B. Backend (Core.Infra.FilesFolders)
- **Controllers**:
    - `FilesController` và `FoldersController` sẽ đọc `X-Tracking-Id` từ header.
    - Gán `TrackingId` vào Command trước khi `SendAsync`.
    - Phản hồi API sẽ trả về `TrackingId` để FE xác nhận.
- **Handlers**:
    - Refactor `FilesFoldersCommandHandler` để sử dụng cấu hình Firebase từ Options thay vì hardcode.
- **Service**:
    - Refactor `GetUserId()` vào một Base class để dùng chung.

### C. Frontend (business-files)
- **Services**:
    - `FilesFoldersService` sẽ nhận về `TrackingId` từ các lệnh gọi API.
- **Components (FileExplorer)**:
    - Sau khi gọi API thành công (nhận được `TrackingId`), Component sẽ gọi `FirebaseService.subscribeToRequestId(trackingId)`.
    - Khi Firestore trả về dữ liệu (Event `Completed` hoặc `Error`):
        - Hiển thị thông báo (`NzMessageService`).
        - Gọi `loadContent()` để làm mới dữ liệu.
        - Tự động unsub và xóa doc trên Firestore (đã có logic trong core).

## 3. Kế hoạch triển khai (Tasks)
1. [ ] Cập nhật `HttpClientService` (Core FE) để hỗ trợ TrackingId.
2. [ ] Cập nhật `FirebaseService` (Core BE) để sử dụng Options pattern.
3. [ ] Cập nhật `FilesFolders` Controllers để xử lý TrackingId.
4. [ ] Cập nhật `FileExplorer` Component để lắng nghe Firestore.
5. [ ] Refactor cấu hình và `GetUserId` dùng chung.

## 4. Xác nhận từ người dùng
- Tôi sẽ tiến hành triển khai các bước trên. Bạn có yêu cầu thay đổi nào không?
