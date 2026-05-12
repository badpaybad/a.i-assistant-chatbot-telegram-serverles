# Hướng dẫn Kỹ thuật & Giải pháp phát triển Core Infra (.NET 8)

Tài liệu này cung cấp chi tiết kỹ thuật đầy đủ để tái cấu trúc hệ thống từ đầu nếu cần thiết, đảm bảo tính ổn định và tuân thủ các yêu cầu tại `yeucau.md`.

## 1. Cấu trúc Solution và Dự án

Dự án được tổ chức theo mô hình Modular Monolith/Microservices-ready, tách biệt các mối quan tâm hạ tầng:

- **Core.Infra.Base**: Định nghĩa các Interface và Model cơ bản.
    - `IEntity<TKey>`: Public interface chứa `Id`.
    - `IBaseTrackingEntity<TKey>`: Chứa thông tin audit (`CreatedAt`, `UpdatedAt`, `CreatedBy`, `UpdatedBy`).
- **Core.Infra.Data**: Triển khai EF Core và MongoDB.
- **Core.Infra.Redis**: Triển khai Cache, Queue, Event Bus và Message Tracking.
- **Core.Infra.Auth**: Quản lý định danh, phân quyền RBAC & ACL.

---

## 2. Chi tiết triển khai Hạ tầng

### 2.1. Quản trị Hệ thống & Bảo mật (Admin Protection)
Hệ thống thiết lập các cơ chế bảo vệ tài khoản quản trị tối cao:
- **Khởi tạo (Initialization)**: Khi chưa có DB, hệ thống tự động tạo tài khoản `admin` (mật khẩu mặc định: `admin123`), role `Admin` và claim `admin`.
- **Bất biến (Immutability)**: 
    - Không cho phép xóa hoặc đổi tên tài khoản `admin`.
    - Không cho phép xóa hoặc đổi tên role `Admin`.
    - Không cho phép xóa hoặc đổi tên claim `admin`.
- **Quyền hạn tối cao (Full Access)**: 
    - Trong `AppAuthorizeAttribute`, ưu tiên kiểm tra nếu User có role `Admin` hoặc claim `admin` thì cấp quyền truy cập toàn diện, bỏ qua mọi hạn chế (restrict) khác.
- **Case-Insensitivity**: Việc kiểm tra `username`, `role`, và `claim` không phân biệt chữ hoa chữ thường.

### 2.2. Tự động đăng ký CQRS Handlers (Reflection)
- **Cơ chế**: Quét Assembly để tìm các class implement `ICommandHandler<>` hoặc `IEventHandler<>`.
- **Định danh Tự động (Naming Fallback)**: 
    - Ưu tiên lấy `QueueName`/`TopicName` định nghĩa trong code.
    - Nếu trống (Empty/Null), hệ thống tự động sử dụng **`Type.FullName`** của lớp thông điệp làm tên hàng đợi/chủ đề.
- **Hiệu năng**: Kết quả Reflection (tên, kiểu dữ liệu) được cache lại để tránh quét nhiều lần.

### 2.3. Đa Database (SQL & NoSQL)
- **EF Core**: Hỗ trợ PostgreSQL, MySQL, MSSQL. Có hàm sinh Script SQL tạo bảng độc lập.
- **MongoDB**: 
    - `DbSet<T>` bọc `IMongoCollection`, hỗ trợ LINQ và các phương thức `Add/Update/Delete` Async tương tự EF.
    - Cho phép lỗi `Missing Field` khi dữ liệu DB và Entity không khớp hoàn toàn.

### 2.4. Redis Service & Statistics
- **Đa năng**: Một service duy nhất (`RedisService`) đóng vai trò là Cache, Queue và Event Bus.
- **Thống kê (Counters)**: Tích hợp ghi nhận số liệu trực tiếp khi Enqueue/Publish/Subscribe.
    - `processed:{name}`: Số lượng xử lý thành công.
    - `error:{name}`: Số lượng xử lý lỗi.
    - Topic Stat: Tổng hợp số liệu từ tất cả các Subscriber queue.

---

## 3. Mô hình CQRS & Luồng Dữ liệu

### 3.1. Quy trình xử lý
1. **Command**: UI gửi request -> API Enqueue -> Worker Dequeue -> Xử lý nghiệp vụ -> Publish Event.
2. **Event**: Worker nhận signal từ Redis Pub/Sub -> Dequeue từ queue riêng của subscriber -> Xử lý nghiệp vụ liên quan.
3. **Tracking**: Hệ thống ghi log `Append-only` vào Redis tại mỗi điểm thay đổi trạng thái kèm theo `Payload` dữ liệu.

### 3.2. Caching Hybrid
- **L1 (Memory)**: 5 giây - Giảm tải tức thì.
- **L2 (Redis)**: 10 giây - Nhất quán giữa các container.

---

## 4. Vận hành & Scale ngang
- **Stateless**: Toàn bộ trạng thái phiên làm việc được quản lý qua JWT và Redis.
- **Horizontal Scaling**: Các Command/Event Workers có thể scale độc lập theo tên hàng đợi để đáp ứng tải trọng cao.

---
**Lưu ý**: Luôn đảm bảo khi có `yeucau.md` và `phatrien.md`, dù source code có mất vẫn có thể viết lại một cách chính xác.
