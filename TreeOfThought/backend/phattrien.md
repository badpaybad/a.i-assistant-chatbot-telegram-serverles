# Giải pháp phát triển Core Infra (.NET 8)

Dựa trên yêu cầu tại `yeucau.md`, chúng ta đã xây dựng một bộ Core Infrastructure mạnh mẽ, linh hoạt và dễ mở rộng trên nền tảng .NET 8.

## 1. Cấu trúc Solution và Project

Dự án được chia thành các module độc lập:

- `Core.Infra.Base`: Chứa các interface chung, base entity, command, event và tiện ích `ConfigurationHelper`.
- `Core.Infra.Data`: Xử lý kết nối database đa nền tảng (SQL Server, PostgreSQL, MySQL) và MongoDB.
- `Core.Infra.Redis`: Xử lý Cache, Queue (tin cậy), Event Bus (hybrid), và Tracking.
- `Core.Infra.CQRS`: Điều phối Command/Event, quản lý Background Workers.
- `Core.Infra.Firebase`: Tích hợp Firebase Admin (Auth, FCM, Firestore, Storage).
- **Folder `test/`**: 
    - `Core.Infra.Tests`: Unit test project (xUnit).
    - `Core.Infra.ConsoleTest`: Console App Simulator để giả lập luồng thực tế.

## 2. Chi tiết giải pháp kỹ thuật

- **BaseDbContext**: 
  - Hỗ trợ đa provider (SqlServer, Npgsql, MySql).
  - **Bulk Operations**: Triển khai `BulkInsertAsync`, `BulkUpdateAsync`, `BulkDeleteAsync` để tối ưu hiệu năng.
  - **Partial Update**: Hỗ trợ cập nhật từng trường cụ thể của Entity thông qua Expression tree.
  - **Paging & Sorting**: Tích hợp sẵn helper `GetPagedAsync` hỗ trợ sắp xếp động theo tên thuộc tính.
  - **Fulltext Search**: Cung cấp `StringHelper.RemoveAccents` để chuẩn hóa dữ liệu tìm kiếm tiếng Việt có dấu và không dấu.
- **MongoDbContext**: Hỗ trợ log các event của MongoDB (CommandStartedEvent).
- **SqlGenerator**: Sử dụng Reflection để sinh mã SQL `CREATE TABLE` từ POCO classes mà không cần Migration.

### 2.2. Reliable Messaging (Redis)
- **Queue tin cậy**: Sử dụng pattern `RPOPLPUSH` (`ListRightPopLeftPushAsync`) để đảm bảo message không bị mất nếu worker crash khi đang xử lý. Message chỉ được xóa khỏi Processing Queue sau khi Handler hoàn thành (Ack).
- **Event Bus Hybrid**:
    - **Persistence**: Mỗi subscriber có một Redis List riêng để chứa message.
    - **Signaling**: Sử dụng Redis Pub/Sub để thông báo cho subscriber khi có data mới.
    - **Draining**: Subscriber khi nhận tín hiệu sẽ chạy loop để xử lý sạch dữ liệu trong queue cá nhân trước khi quay lại trạng thái chờ.

### 2.3. Quản lý CQRS & Worker
- **CqrsDispatcher**: Hỗ trợ 2 chế độ:
    - **Memory Mode**: Thực thi Handler trực tiếp ngay lập tức.
    - **Redis Mode**: Đẩy message vào queue để worker xử lý bất đồng bộ.
- **Worker Management**: 
    - Cho phép đăng ký Handler động.
    - Có cơ chế **Start/Stop** từng worker cụ thể thông qua `CancellationTokenSource`.
    - Truy vấn trạng thái hoạt động của các handler (`GetWorkerStatus`).

### 2.4. Tracking & Statistics
- **MessageTracker**: 
    - Lưu vết (History) chi tiết đường đi của Command/Event theo `TrackingId`.
    - Thống kê (Stats) số lượng message theo type bằng Redis Hashes (`IncrementStatAsync`).

### 2.5. Firebase Integration
- **Firestore**: Hỗ trợ Publish/Subscribe và các thao tác CRUD.
- **FCM**: Gửi thông báo đẩy theo Device Token.
- **Storage**:
    - Upload/Download file, hỗ trợ xử lý byte array trên memory.
    - Tạo **Signed URL** với thời gian hết hạn (Expired link).
    - List file/folder theo đường dẫn.

## 3. Kiểm thử và Mô phỏng

- **Console Simulator**: Một công cụ thực tế để kiểm tra tính ổn định của hệ thống:
    - Giả lập việc gửi Command và Publish Event.
    - Kiểm tra khả năng phục hồi khi dừng và khởi động lại worker.
    - Hiển thị báo cáo tracking và thống kê sau khi kết thúc.

---
**Trạng thái**: Đã hoàn thành triển khai và hoàn thiện tất cả các thành phần theo yêu cầu.

### Cập nhật mới:
- **Firebase Firestore Notification**: Triển khai cơ chế Publish/Delete dữ liệu thông báo qua Firestore path, hỗ trợ Frontend lắng nghe thời gian thực.
- **Firebase Storage Signed URL**: Hoàn thiện logic tạo URL có thời hạn sử dụng `UrlSigner`.
- **Firebase Test Project**: Tạo mới project `Core.Infra.FirebaseTest` với đầy đủ các bài test tích hợp.
- **SqlGenerator**: Tinh chỉnh để hỗ trợ sinh SQL tạo bảng riêng lẻ linh hoạt hơn.

**Lưu ý**: Các bài test tích hợp (Data, Redis, Firebase) yêu cầu môi trường thực tế (Database, Redis, Firebase Project) được cấu hình đúng. Hiện tại mã nguồn đã được xác nhận gọi đúng API và logic xử lý.
