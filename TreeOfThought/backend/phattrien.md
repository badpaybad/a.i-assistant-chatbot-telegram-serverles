# Hướng dẫn Kỹ thuật & Giải pháp phát triển Core Infra (.NET 8)

Tài liệu này cung cấp chi tiết kỹ thuật đầy đủ để tái cấu trúc hệ thống từ đầu nếu cần thiết, đảm bảo tính ổn định và tuân thủ các yêu cầu tại `yeucau.md`.

## 1. Cấu trúc Solution và Dự án

Dự án được tổ chức theo mô hình Modular Monolith, tách biệt các mối quan tâm hạ tầng:

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

---

## 3. Quy trình Vận hành
- **SSO Login**: Kiểm tra tính hợp lệ của Email (Verified & Primary) trước khi cấp JWT.
- **ACL Sync**: Khi gán quyền cho user trên tài nguyên, gọi `SyncUserAclToRedisAsync` để cập nhật cache tức thì.
- **System Admin**: Tự động Seed tài khoản admin mặc định khi DB trống.

---

## 4. Môi trường Phát triển
- **Docker Compose**: Chạy các dịch vụ phụ trợ (Redis, DBs).
- **Appsettings**: Cấu hình tập trung cho JWT, Redis, Connection Strings và Firebase.

---
**Lưu ý**: Tài liệu này phải được cập nhật ngay khi `yeucau.md` có thay đổi để đảm bảo source code có thể được tái cấu trúc chính xác bất cứ lúc nào.
