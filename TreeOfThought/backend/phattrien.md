# Hướng dẫn Kỹ thuật & Giải pháp phát triển Core Infra (.NET 8)

Tài liệu này cung cấp chi tiết kỹ thuật đầy đủ để tái cấu trúc hệ thống từ đầu nếu cần thiết, đảm bảo tính ổn định và tuân thủ các yêu cầu tại `yeucau.md`.

## 1. Cấu trúc Solution và Dự án

Dự án được tổ chức theo mô hình Modular Monolith, tách biệt các mối quan tâm hạ tầng:

- **Core.Infra.Base**: 
    - `Interfaces/`: Định nghĩa các hợp đồng cho Entity, Command, Event, Dispatcher, Queue, Cache.
    - `Models/`: Các base class như `BaseEntity`, `BaseMessage`.
    - `Utils/`: `StringHelper` (xử lý tiếng Việt), `ConfigurationHelper`.
- **Core.Infra.Data**: 
    - `Contexts/`: `BaseDbContext` (EF Core) và `MongoDbContext` (Custom).
    - `Mongo/`: Triển khai `DbSet<T>` cho MongoDB hỗ trợ LINQ.
    - `Utils/`: `SqlGenerator` để sinh schema SQL mà không cần Migration.
- **Core.Infra.Redis**: 
    - `Services/`: `RedisService` triển khai 3 interface: `ICacheService`, `IQueueService`, `IEventBus`.
    - `MessageTracker`: Quản lý tracking ID và thống kê.
- **Core.Infra.CQRS**: 
    - `Dispatchers/`: `CqrsDispatcher` điều phối Command/Event và quản lý vòng đời Worker.
- **Core.Infra.Firebase**: 
    - `Services/`: `FirebaseService` tích hợp Auth, Firestore, FCM, Cloud Storage.
- **Core.Web.Api**: RESTful API, Middleware, DI Container và khởi tạo hệ thống.

---

## 2. Chi tiết triển khai Hạ tầng

### 2.1. Core Base & Entity
- **IBaseTrackingEntity**: Chứa `Id` (Guid), `CreatedAt`, `UpdatedAt`, `CreatedBy`, `UpdatedBy`.
- **Base Messages**: `IBaseCommand` và `IBaseEvent` đều có `TrackingId` (Guid) và `Timestamp` để truy vết.
- **Vietnamese Search**: `StringHelper.RemoveAccents()` chuẩn hóa chuỗi về dạng không dấu, thay thế 'đ' -> 'd' để tìm kiếm chính xác.

### 2.2. Đa Database (SQL & NoSQL)
- **BaseDbContext (EF Core)**:
    - Hỗ trợ `SqlServer`, `PostgreSql`, `MySql` thông qua enum `DbProviderType`.
    - **Bulk Operations**: Sử dụng `AddRangeAsync`, `UpdateRange`, `RemoveRange` tích hợp sẵn của EF Core.
    - **Partial Update**: Sử dụng `Entry(entity).Property(x => x.Field).IsModified = true` để chỉ cập nhật các trường được chỉ định.
    - **SQL Generation**: `context.Database.GenerateCreateScript()` được dùng để sinh mã tạo bảng từ Entity POCO.
- **Mongo Infrastructure**:
    - **MongoDbContext**: Tự động khởi tạo các `DbSet<T>` thông qua Reflection khi constructor được gọi.
    - **Custom DbSet<T>**: Triển khai `IQueryable<T>` bằng cách bọc `IMongoCollection.AsQueryable()`. Hỗ trợ các phương thức giống EF như `AddAsync`, `RemoveRangeAsync`, `UpdateAsync`.
    - **Mapping**: Tự động bỏ qua các trường thừa (`SetIgnoreExtraElements(true)`) và ánh xạ `Id` kiểu Guid.

### 2.3. Messaging Tin cậy với Redis
- **Reliable Queue**: 
    - Sử dụng `ListRightPopLeftPushAsync` (RPOPLPUSH) để di chuyển message từ hàng chờ chính sang hàng chờ đang xử lý (`processing`).
    - Nếu xử lý thành công, gọi `AckReliableAsync` để xóa khỏi queue `processing`.
    - Khi khởi động, Worker gọi `RecoverProcessingQueueAsync` để đẩy ngược message từ `processing` về queue chính nếu trước đó bị crash.
- **Hybrid Event Bus**:
    - **Persistence**: Mỗi Subscriber có một Redis List riêng (`sub_queue:topic:subName`).
    - **Signaling**: Sử dụng Redis Pub/Sub để thông báo "có dữ liệu mới".
    - **Drain Loop**: Khi nhận tín hiệu, Subscriber chạy vòng lặp xử lý sạch queue cá nhân của mình.

### 2.4. Điều phối CQRS & Worker Management
- **CqrsDispatcher**:
    - **Memory Mode**: Sử dụng `IServiceProvider` để lấy Handler và thực thi trực tiếp trong cùng process.
    - **Redis Mode**: Đẩy Command vào Queue (tên queue = tên Command) hoặc Publish Event vào Topic.
- **Worker Loop**:
    - Mỗi Handler được chạy trong một `Task.Run` with `CancellationToken`.
    - Hỗ trợ **Dead Letter Queue (DLQ)**: Khi Handler lỗi sau khi retry (nếu có), message kèm metadata lỗi được đẩy vào `{queueName}:dead`.
    - **Management**: Cung cấp `StartWorkerAsync`, `StopWorkerAsync` và `GetWorkerStatus` để điều khiển runtime.

### 2.5. Cloud Services (Firebase)
- **Multi-App**: Quản lý nhiều Firebase App thông qua `Dictionary<string, FirebaseApp>`.
- **Firestore Notification**: Sử dụng `docRef.SetAsync(data, SetOptions.MergeAll)` để đẩy thông báo lên path cụ thể, đóng vai trò như một kênh realtime cho Frontend.
- **Storage**: Tích hợp `UrlSigner` để tạo link download có thời hạn (Signed URL).

---

## 3. Cấu hình Web API & Security

- **Authentication**: 
    - Kết hợp JWT truyền thống và Firebase Custom Token.
    - `AppAuthorizeAttribute` hỗ trợ kiểm tra Login và phân quyền theo Claim.
- **Middleware**:
    - **CORS**: Cấu hình `AllowAll` cho phép Credentials để tích hợp đa nền tảng.
    - **Security Headers**: Gỡ bỏ `X-Frame-Options` và thêm `Content-Security-Policy: frame-ancestors *` để cho phép nhúng iframe.
    - **Permissions-Policy**: Cấp quyền `camera`, `microphone`, `geolocation` cho các ứng dụng nhúng.
- **Initialization Sequence**:
    1. Cấu hình DI (Infrastructure -> Repos -> Handlers).
    2. Khởi tạo Firebase App.
    3. Đăng ký Command/Event Handlers vào Dispatcher.
    4. Kiểm tra và Seed dữ liệu ban đầu cho Database.

## 4. Môi trường Phát triển

- **Docker Compose**: Chạy Redis (port 6379), PostgreSQL (5432), MySQL (3306), MongoDB (27017). Tất cả dùng password `Test123456`.
- **Appsettings**: Chứa connection string cho tất cả DB, cấu hình JWT Secret và đường dẫn file Firebase JSON.

---
**Lưu ý**: Để hệ thống hoạt động ổn định, các Handler phải được đăng ký là `Singleton` trong DI và logic xử lý phải đảm bảo tính `Idempotent` (đặc biệt là khi xử lý lại từ DLQ hoặc Recovery Queue).
