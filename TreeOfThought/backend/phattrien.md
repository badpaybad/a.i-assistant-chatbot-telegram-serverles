# Hướng dẫn Kỹ thuật & Giải pháp phát triển Core Infra (.NET 8)

Tài liệu này cung cấp chi tiết kỹ thuật đầy đủ để tái cấu trúc hệ thống từ đầu nếu cần thiết, đảm bảo tính ổn định và tuân thủ các yêu cầu tại `yeucau.md`.

## 1. Cấu trúc Solution và Dự án

Dự án được tổ chức theo mô hình Modular Monolith/Microservices-ready, tách biệt các mối quan tâm hạ tầng:

- **Core.Infra.Base**: 
    - `Interfaces/`: 
        - `IEntity<TKey>`: **Public interface** có chứa `Id`, dành cho các project khác tham chiếu.
        - `IBaseEntity`: **Internal interface** (private prj), dùng làm marker cho các xử lý generic nội bộ.
        - `IBaseTrackingEntity<TKey>`: Public, chứa thông tin audit.
    - `Models/`: Base class `BaseEntity<TKey>` kế thừa cả public và internal interfaces.
- **Core.Infra.Data**: 
    - `Contexts/`: `BaseDbContext` (EF Core) và `MongoDbContext` (Custom).
    - `Mongo/`: `DbSet<T>` triển khai `IQueryable` bọc `IMongoCollection`.
- **Core.Infra.Redis**: Triển khai `ICacheService`, `IQueueService`, `IEventBus`.
- **Core.Infra.Auth**: 
    - **RBAC & ACL Hybrid**: Hỗ trợ phân quyền linh hoạt theo Role/Permission và theo từng tài nguyên cụ thể.
    - **SSO Management**: Chỉ cho phép 1 Email đã `Verified` và là `Primary` được dùng làm khóa SSO.
    - **OIDC Compliance**: Cung cấp Discovery Document và JWT chuẩn OIDC.

---

## 2. Chi tiết triển khai Hạ tầng

### 2.1. Core Base & Entity (Generic TKey)
- **Generic Entity**: Loại bỏ phụ thuộc cứng vào `Guid`. `IEntity<TKey>` cho phép dùng `string`, `long`, `ObjectId` tùy loại DB.
- **Audit Tracking**: Mọi Entity kế thừa `IBaseTrackingEntity` tự động có `CreatedAt`, `UpdatedAt`, `CreatedBy`, `UpdatedBy`.
- **Vietnamese Search**: `StringHelper` hỗ trợ chuyển đổi có dấu sang không dấu để tìm kiếm chính xác trên các DB không hỗ trợ collation tiếng Việt tốt.
- **Auto Registration Handlers**: Tự động đăng ký các handler thông qua Reflection.
    - **Giải pháp**: Sử dụng `QueueName` trong Command và `TopicName` trong Event để tự động cấu hình Workers thông qua một `IHostedService` tại startup.

### 2.2. Đa Database (SQL & NoSQL)
- **EF Core (SQL)**: Hỗ trợ SQL Server, PostgreSQL, MySQL. Sinh mã tạo bảng (Script Generation) từ Entity.
- **MongoDB**:
    - **EF-like DbSet**: Hỗ trợ đầy đủ `AddAsync`, `UpdateAsync`, `RemoveAsync` và LINQ query.
    - **Auto-Mapping**: Tự động đăng ký `BsonClassMap`, bỏ qua các field dư thừa (ignore extra elements).
    - **Query Logging**: Capture các câu lệnh MQL để debug hiệu năng.
- **Bulk Operations**: Hỗ trợ `BulkInsert`, `BulkUpdate` (toàn bộ hoặc một phần - Partial Update).

### 2.3. Authentication & Authorization (Bitmask ACL)

#### RBAC (Role-Based Access Control)
- Phân quyền dựa trên Role (nhóm quyền) và Permission (quyền cụ thể).
- `AppAuthorizeAttribute` kiểm tra claims trong JWT.

#### ACL (Access Control List - Resource Based)
- **Linux-style Bitmask**: Quyền được lưu dưới dạng bit (`Read=1, Write=2, Delete=4, Share=8`).
- **High Performance**: 
    - ACL được đồng bộ sang Redis Key: `acl:{userId}:{resourceType}:{resourceId}`.
    - Kiểm tra quyền bằng toán tử `&` (bitwise AND) trong Middleware, tốc độ cực nhanh.
- **Dynamic Discovery**: Middleware tự động tìm `ResourceId` từ `x-resource-id` header, Route data, hoặc Query string.

#### AppAuthorizeAttribute linh hoạt
- **AuthMode**: Hỗ trợ logic **AND** (cần tất cả quyền) hoặc **OR** (chỉ cần một trong các quyền). Mặc định là **OR**.

#### Đồng bộ Claims (Claim Synchronization)
- **claims/sync**: API cho phép Frontend đồng bộ danh sách định nghĩa các Claims lên hệ thống. Yêu cầu người dùng phải đăng nhập (`[AppAuthorize]`) để thực hiện.

### 2.4. Tự động đăng ký CQRS Handlers (Reflection)
- **Cấu hình dựa trên Property**: 
    - `IBaseCommand.QueueName`: Tên queue cho command (bắt buộc).
    - `IBaseEvent.TopicName`: Tên topic cho event (bắt buộc).
- **Cơ chế Auto Registration**:
    - **Quét Assembly**: `AddCqrsHandlers` quét các class **Public** implement `ICommandHandler<>` hoặc `IEventHandler<>`. Các class không public sẽ bị bỏ qua để đảm bảo tính đóng gói.
    - **Đăng ký DI**: Mọi handler được đăng ký là `Singleton` (Requirement 64).
    - **CqrsAutoRegistrationService (IHostedService)**:
        - Tự động chạy khi ứng dụng Startup.
        - Duyệt danh sách Handlers, xác định Message Type tương ứng.
        - Gọi `RegisterCommandHandlerAsync` hoặc `RegisterEventHandlerAsync` trên `IDispatcher`.
- **Tối ưu hiệu năng & Ràng buộc nghiệp vụ**:
    - **Reflection Caching**: Sử dụng `ConcurrentDictionary<Type, string>` để cache kết quả đọc `QueueName`/`TopicName`. Việc khởi tạo instance và đọc property chỉ diễn ra 1 lần duy nhất cho mỗi message type.
    - **Strict Validation**: Nếu `QueueName` hoặc `TopicName` để trống (null/empty), hệ thống sẽ throw `InvalidOperationException`. 
    - **Báo lỗi chi tiết**: Message lỗi sẽ chỉ rõ Message Type nào bị thiếu cấu hình và **Handler Class nào** đang sử dụng nó để lập trình viên dễ dàng định vị và sửa lỗi.

---

## 3. Mô hình CQRS & Luồng Dữ liệu (Cập nhật 6)

### 3.1. Luồng Command (Thay đổi dữ liệu)
Hệ thống sử dụng cơ chế xử lý bất đồng bộ thông qua Event Bus (Redis) để đảm bảo khả năng mở rộng:
1. **UI FE**: Gửi request (Command) tới API.
2. **Web API**: Nhận request, thực hiện enqueue Command vào Redis Queue.
3. **Command Handler Container**: (Có thể scale ngang độc lập) Dequeue và thực hiện nghiệp vụ (Business Logic).
4. **Publish Event**: Sau khi xử lý xong, Handler publish một Event lên Redis Topic.
5. **Real-time Update**: 
    - Các Event Handler khác (nếu có) subscribe để thực hiện các nghiệp vụ liên quan.
    - Thông báo kết quả về UI FE thông qua **Google Firestore** (đóng vai trò là kênh thông báo thời gian thực).

### 3.2. Luồng Query (Lấy dữ liệu)
- Queries được triển khai trực tiếp tại các project nghiệp vụ (Business Projects).
- Controller gọi Query Service để lấy dữ liệu từ Read DB.
- **Hybrid Caching**: Sử dụng `AppCacheAttribute` để tự động hóa việc cache với độ ưu tiên:
    1. **Memory Cache (L1)**: Thời gian cache mặc định **5 giây**. Phù hợp cho các request cực ngắn và giảm tải ngay lập tức cho mạng/Redis.
    2. **Redis Cache (L2)**: Thời gian cache mặc định **10 giây**. Đảm bảo dữ liệu nhất quán giữa các container khi scale ngang.
    3. **Database Query**: Thực hiện truy vấn nếu không tìm thấy trong cả 2 tầng cache.
- Key cache được sinh dựa trên Context: Path, Query String, Headers (X-*), và Body.

### 3.3. Khả năng Mở rộng (Horizontal Scaling)
- **Stateless Web API**: Sử dụng JWT và Redis làm session store chung (thông qua Core.Infra.Auth).
- **Independent Workers**: Command Handlers và Event Handlers có thể đóng gói thành các container riêng biệt và scale ngang tùy theo tải của từng loại nghiệp vụ.
- **Unified Event Bus**: Tất cả các thành phần (Web, Workers) kết nối chung vào hệ thống Redis Event Bus để điều phối công việc.

### 3.4. Phát triển Nghiệp vụ mới
Mỗi nghiệp vụ mới được tách thành một project riêng biệt, chỉ cần tập trung vào:
- **Controller**: Tiếp nhận request.
- **Commands & Handlers**: Xử lý logic thay đổi trạng thái.
- **Events & Handlers**: Xử lý các tác vụ phụ trợ và đồng bộ.
- **Queries**: Xử lý lấy dữ liệu.
- **Entities & DbContext**: Định nghĩa schema dữ liệu riêng.

---

## 4. Quy trình Vận hành
- **SSO Login**: Kiểm tra tính hợp lệ của Email (Verified & Primary) trước khi cấp JWT.
- **ACL Sync**: Khi gán quyền cho user trên tài nguyên, gọi `SyncUserAclToRedisAsync` để cập nhật cache tức thì.
- **System Admin**: 
    - Tự động Seed tài khoản admin mặc định (`admin` / `Admin@123`) và role `Admin`, claim `admin` khi hệ thống khởi tạo lần đầu.
    - **Full Access Logic**: Trong `AppAuthorizeAttribute`, ưu tiên kiểm tra nếu User có role `Admin` hoặc claim `admin` thì cấp quyền truy cập ngay lập tức, bỏ qua các bước kiểm tra claim hoặc ACL khác.
    - **Entity Protection**:
        - Không cho phép xóa hoặc sửa tên tài khoản `admin`.
        - Không cho phép xóa hoặc sửa tên role `Admin`.
        - Không cho phép xóa hoặc sửa tên claim `admin`.
        - Các logic bảo vệ này được thực hiện tại tầng `AuthRepository` để đảm bảo an toàn dữ liệu tuyệt đối.
    - **Mandatory Password Change**: Khi tài khoản admin được tạo lần đầu trong `EnsureAdminExistsAsync`, field `MustChangePassword` sẽ được set thành `true`. API `login` sẽ trả về cờ này để FE điều hướng người dùng. Sau khi đổi mật khẩu thành công, cờ này sẽ được set về `false`.

---

## 5. Môi trường Phát triển
- **Docker Compose**: Chạy các dịch vụ phụ trợ (Redis, DBs).
- **Appsettings**: Cấu hình tập trung cho JWT, Redis, Connection Strings và Firebase.

---
**Lưu ý**: Tài liệu này phải được cập nhật ngay khi `yeucau.md` có thay đổi để đảm bảo source code có thể được tái cấu trúc chính xác bất cứ lúc nào.
