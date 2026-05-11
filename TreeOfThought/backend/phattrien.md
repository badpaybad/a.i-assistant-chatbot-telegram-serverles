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
- **Core.Infra.Auth**: 
    - `Attributes/`: `AppAuthorizeAttribute` tập trung xử lý validate token, authenticate, authorization. Hỗ trợ kiểm tra theo Role hoặc Permission (logic OR).
    - `Services/`: `AuthService` xử lý JWT (OIDC compliant), Firebase Custom Token, RBAC & ACL logic, và Admin seeding.
    - `Controllers/`: 
        - `AuthController`: API Login, Signup, Verify, SSO và OIDC Discovery.
        - `AuthManagementController`: Quản lý Role, Permission, User-Role mapping và ACL entries.
    - `Models/` & `Repositories/`: User, Role, Permission, AclEntry và UserEmail entities. Triển khai PostgreSQL-backed RBAC & ACL.
- **Core.Web.Api**: Host ứng dụng, cấu hình Middleware, DI Container và nạp các Module/Infra thông qua `ApplicationPart`.
- **Module.[BusinessName]** (Tương lai): Các project riêng cho từng nghiệp vụ, tuân thủ CQRS, có controller riêng và sử dụng `Core.Infra.Auth`.

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
    - **Logging**: Tích hợp `ILoggerFactory` vào `DbContextOptions` để capture và log các câu lệnh SQL sinh ra từ LINQ phục vụ debug.
- **Mongo Infrastructure**:
    - **MongoDbContext**: Tự động khám phá và khởi tạo các thuộc tính `IDbSet<T>` thông qua Reflection trong constructor.
    - **Custom DbSet<T>**: Triển khai `IDbSet<T>` và `IQueryable<T>` bằng cách bọc `IMongoCollection.AsQueryable()`.
    - **EF-like Methods**: Hỗ trợ `AddAsync`, `AddRangeAsync`, `UpdateAsync`, `UpdateRangeAsync`, `RemoveAsync`, `RemoveRangeAsync`.
    - **ID Handling**: `RemoveAsync` và `UpdateAsync` ưu tiên ép kiểu về `IBaseTrackingEntity` để lấy `Id`. Nếu không, sử dụng Reflection để tìm property `Id`.
    - **Guid Dependency Removal**: Loại bỏ hoàn toàn các overload `DeleteAsync(Guid id)` trực tiếp để tránh phụ thuộc cứng vào kiểu dữ liệu Guid trong interface hạ tầng.
    - **Mapping**: Tự động gọi `BsonClassMap.RegisterClassMap<T>` với `SetIgnoreExtraElements(true)` để xử lý lỗi missing field/property.
    - **Query Logging**: Sử dụng `ClusterConfigurator` khi khởi tạo `MongoClient` để đăng ký `CommandStartedEvent`, cho phép log chính xác các câu lệnh MQL (Mongo Query Language) sinh ra từ LINQ.

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
- **Observability & Tracking**:
    - **MessageTracker**: Lưu trữ metadata của mọi message (Command/Event) vào Redis Hash. Metadata bao gồm: `SourceQueue`, `TargetTopic`, `HandlerType`, `Status`, `ExecutionTime`.
    - **Lineage Tracking**: Sử dụng `TrackingId` để liên kết các message. Khi một Handler sinh ra message mới, nó kế thừa `TrackingId` cũ, cho phép vẽ biểu đồ luồng đi của dữ liệu giữa các queue và topic.
    - **Statistics**: Tích hợp các counter trong Redis để thống kê số lượng xử lý thành công/thất bại theo từng `CommandType` và `QueueName`.

### 2.5. Cloud Services (Firebase)
- **Multi-App**: Quản lý nhiều Firebase App thông qua `Dictionary<string, FirebaseApp>`.
- **Firestore Notification**: Sử dụng `docRef.SetAsync(data, SetOptions.MergeAll)` để đẩy thông báo lên path cụ thể, đóng vai trò như một kênh realtime cho Frontend.
- **Storage**: Tích hợp `UrlSigner` để tạo link download có thời hạn (Signed URL).

---

- **Authentication & Authorization (Core.Infra.Auth)**: 
    - **PostgreSQL Database**: Sử dụng DB vật lý thay vì mock, đảm bảo tính bền vững.
    - **RBAC & ACL Hybrid**: 
        - **RBAC**: Quản lý quyền theo Role và Permission. Hỗ trợ gán permission trực tiếp cho User (Effective permissions).
        - **ACL**: Quản lý quyền truy cập chi tiết trên từng instance của tài nguyên (`AclEntry` lưu trữ: Subject, ResourceType, ResourceId, Action).
    - **OpenID Connect (OIDC)**: 
        - Cung cấp Discovery Document tại `/.well-known/openid-configuration`.
        - JWT tuân thủ chuẩn OIDC với các claim: `sub`, `preferred_username`, `email`, `iat`, `jti`.
    - **User & Email Management**:
        - Hỗ trợ đa Email cho một User thông qua bảng `UserEmail`.
        - Chỉ cho phép Email đã được **Verified** và là **Primary** được dùng làm khóa SSO (Google, MS, Facebook).
    - **Admin Seeding**: Tự động kiểm tra và tạo tài khoản Admin mặc định (`admin/Admin123!`) khi hệ thống khởi chạy lần đầu.
- **Middleware**:
    - **AppAuthorizeAttribute**: Sử dụng logic OR giữa Roles và Permissions (truy cập được chấp nhận nếu thỏa mãn 1 trong 2).
    - **CORS**: Cấu hình `AllowAll` cho phép Credentials để tích hợp đa nền tảng.
    - **Security Headers**: Gỡ bỏ `X-Frame-Options` và thêm `Content-Security-Policy: frame-ancestors *` để cho phép nhúng iframe.
    - **Permissions-Policy**: Cấp quyền `camera`, `microphone`, `geolocation` cho các ứng dụng nhúng.
- **Modular Hosting**:
    - Host (`Core.Web.Api`) sử dụng `.AddApplicationPart()` để nạp Controller từ các assembly `Core.Infra.Auth` và các dự án nghiệp vụ.
    - Điều này đảm bảo tính tách biệt: Host chỉ quản lý hạ tầng chung, nghiệp vụ nằm trong project riêng.
- **Initialization Sequence**:
    1. Cấu hình DI (Infrastructure -> Auth -> Repos -> Handlers).
    2. Khởi tạo Firebase App.
    3. Đăng ký Command/Event Handlers vào Dispatcher.
    4. Kiểm tra và Seed dữ liệu ban đầu cho Database (nếu có).

## 4. Môi trường Phát triển

- **Docker Compose**: Chạy Redis (port 6379), PostgreSQL (5432), MySQL (3306), MongoDB (27017). Tất cả dùng password `Test123456`.
- **Appsettings**: Chứa connection string cho tất cả DB, cấu hình JWT Secret và đường dẫn file Firebase JSON.

---
**Lưu ý**: Để hệ thống hoạt động ổn định, các Handler phải được đăng ký là `Singleton` trong DI và logic xử lý phải đảm bảo tính `Idempotent` (đặc biệt là khi xử lý lại từ DLQ hoặc Recovery Queue).
