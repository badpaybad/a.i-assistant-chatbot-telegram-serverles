# Phân tích và Kế hoạch Phát triển Hệ thống TreeOfThought Backend

Tài liệu này tổng hợp các phân tích về kiến trúc hiện tại dựa trên yêu cầu tại [yeucau.md](TreeOfThought/docs/backend/yeucau.md) và hiện trạng code trong thư mục `TreeOfThought/backend`.

## 1. Tổng quan Kiến trúc
Hệ thống được xây dựng theo hướng **Modular Monolith** kết hợp với các nguyên tắc của **Clean Architecture** và **CQRS**. Backend sử dụng .NET 8.0 làm nền tảng chính.

### Các thành phần cốt lõi (Core Infra):
- **Core.Infra.Base**: Định nghĩa các interface (ICacheService, IQueueService, IEventBus, IEventHandler...), hằng số và các model dùng chung cho toàn bộ solution.
- **Core.Infra.Redis**: Triển khai các dịch vụ Cache, Queue (hỗ trợ Reliable Queue và Priority Queue), EventBus (Pub/Sub) dựa trên StackExchange.Redis.
- **Core.Infra.Session**: Quản lý Session người dùng trên Redis, hỗ trợ cơ chế Hybrid Session (kết hợp với JWT để tối ưu kích thước token).
- **Core.Infra.Data**: Quản lý kết nối đa cơ sở dữ liệu (PostgreSQL, MSSQL, MySQL, MongoDB).
- **Core.Infra.Firebase**: Tích hợp các dịch vụ Firebase (FCM cho thông báo, Firestore cho realtime UI notification, Google Cloud Storage cho lưu trữ file).
- **Core.Infra.Auth**: Xử lý logic JWT và Authorization. Đặc biệt là `AppAuthorizeAttribute` và `AppAuthorizationHandler` hỗ trợ kiểm tra quyền linh hoạt (Hybrid Mode: JWT + Redis Session) và ACL.
- **Core.Infra.Cqrs**: Cung cấp hạ tầng cho Command/Handler và Event/PubSub. Có tích hợp `UiNotificationEventHandler` để tự động đẩy thông báo realtime lên UI qua Firestore sau khi xử lý nghiệp vụ.
- **Core.Infra.Oidc**: Triển khai Identity Server cho giải pháp SSO nội bộ.
- **Core.Infra.FilesFolders**: Quản lý tệp tin và thư mục cho người dùng.

---

## 2. Đánh giá Hiện trạng triển khai

### Điểm mạnh:
- **Tính đóng gói (Encapsulation)**: Các module hạ tầng được tách biệt rõ ràng, dễ dàng tái sử dụng và bảo trì.
- **Cơ chế Authorization mạnh mẽ**: Việc hỗ trợ Hybrid Mode giúp giải quyết vấn đề JWT quá lớn khi user có nhiều quyền, đồng thời cho phép kiểm soát quyền động (dynamic roles/claims).
- **Realtime Integration**: Sự kết hợp giữa CQRS và Firestore giúp tối ưu hóa UX, cho phép FE nhận phản hồi ngay lập tức mà không cần polling.
- **Hạ tầng Queue tin cậy**: Việc triển khai `DequeueReliableAsync` (LPUSH RPOP) đảm bảo không mất message khi process gặp sự cố.

### Các thành phần đã hoàn thiện (theo quan sát sơ bộ):
- [x] Cấu trúc Solution và Project.
- [x] Base Interfaces và Constants.
- [x] Redis Service (Cache, Queue, EventBus).
- [x] Auth logic (JWT, AppAuthorize attribute, Hybrid Authorization).
- [x] CQRS Dispatcher và cơ chế xử lý Event/Command.
- [x] Tích hợp Firebase cơ bản (FirebaseService, Firestore notification).
- [x] File Management Service (FilesFolders).
- [x] OIDC Integration.

---

## 3. Quy tắc Phát triển Nghiệp vụ mới (Consistency Guidelines)

Để đảm bảo tính nhất quán và hiệu quả khi triển khai các nghiệp vụ mới, cần tuân thủ các nguyên tắc sau:

### 3.1. Nhất quán về Auth (Authentication & Authorization)
- Luôn sử dụng `AppAuthorizeAttribute` cho các Controller/Action.
- Định nghĩa **Claim rõ ràng và chính xác**.
- Tận dụng cơ chế **Hybrid Auth**: Có thể sử dụng session (qua `IUserSessionService`) nếu JWT chưa đủ thông tin.

### 3.2. Nhất quán về Hạ tầng (DB, Cache, CQRS, Firebase)
- **Database**: Mỗi nghiệp vụ có `DbContext` riêng. Có thể dùng thêm DbContext khác để lấy dữ liệu nghiệp vụ khác nếu cần.
- **Cache/Redis**: Sử dụng dữ liệu Redis, cache riêng theo nghiệp vụ nếu cần.
- **CQRS**: 
    - Logic nghiệp vụ tập trung hoàn toàn tại **Handlers**. 
    - Controller chỉ đóng vai trò nhận request, kiểm tra quyền và đẩy Command/Query vào Dispatcher.
- **Firebase**: Sử dụng hạ tầng Firebase sẵn có cho thông báo và lưu trữ.

### 3.3. Trao đổi dữ liệu liên nghiệp vụ (Inter-module Communication)
- Không gọi trực tiếp service của nghiệp vụ khác.
- Trao đổi dữ liệu nghiệp vụ khác thông qua **Command/Event**.

---

## 4. Kế hoạch tiếp theo (Khi có lệnh từ User)

Khi phát triển nghiệp vụ mới, trọng tâm sẽ nằm ở:

1. **Controller**: Sử dụng `AppAuthorize` với claims chính xác và gọi Dispatcher.
2. **Handlers**: Thực hiện toàn bộ logic nghiệp vụ tại đây.
3. **Data**: Thiết lập **DbContext** và **Redis/Cache** riêng theo nhu cầu nghiệp vụ.
4. **Communication**: Định nghĩa các **Command/Event** để giao tiếp với các module khác.
5. **Integration**: Viết extension method để đăng ký chạy ở `Program.cs`.

---
**Ghi chú**: Tôi đã review code và xác nhận hạ tầng đã sẵn sàng sử dụng (không cần sửa đổi Core Infra). Tôi sẽ tuân thủ các nguyên tắc nhất quán trên khi phát triển các nghiệp vụ tiếp theo.
