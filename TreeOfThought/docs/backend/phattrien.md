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

## 3. Kết quả Review Code so với Tài liệu (Gap Analysis)

Sau khi rà soát chi tiết mã nguồn hiện tại đối chiếu với [yeucau.md](TreeOfThought/docs/backend/yeucau.md), tôi ghi nhận các kết quả sau:

### 3.1. Các thành phần đã bám sát tài liệu:
- [x] **Hạ tầng đa DB**: `BaseDbContext` và `MongoDbContext` hỗ trợ PostgreSQL, MSSQL, MySql và MongoDB.
- [x] **Hybrid Auth**: `AppAuthorizationHandler` hỗ trợ Claim từ JWT và fallback sang Redis session.
- [x] **Realtime UI**: `UiNotificationEventHandler` (CQRS) kết hợp Firestore.
- [x] **OIDC/SSO**: Cấu hình linh hoạt giữa local và external Authority.
- [x] **Test Clients**: Đã có kế hoạch/thành phần cho MVC test (`webtestoidc`) và Mobile test (`my_pc_assistant`) để kiểm thử SSO.

### 3.2. Các điểm cần bổ sung/hoàn thiện (Gaps):
- [ ] **Xử lý Video**: Cần bổ sung logic transcoding/thumbnail trong `FirebaseService` (line 27).
- [ ] **Cleanup Firestore**: Cân nhắc cơ chế TTL cho các message thông báo nếu FE không xóa kịp.
- [ ] **Đồng bộ Quyền (Auth Sync)**: Cơ chế cập nhật Redis session tức thời khi DB thay đổi quyền.

---

## 4. Quy tắc Phát triển Nghiệp vụ mới (Consistency Guidelines)

Để đảm bảo tính nhất quán, các nghiệp vụ mới cần tuân thủ:

### 4.1. Nhất quán về Auth
- Luôn sử dụng `AppAuthorizeAttribute`.
- Định nghĩa **Claim rõ ràng và chính xác**.
- Sử dụng session khi JWT không đủ thông tin.

### 4.2. Nhất quán về Hạ tầng
- **Database**: Mỗi nghiệp vụ có `DbContext` riêng.
- **Cache/Redis**: Sử dụng dữ liệu Redis, cache riêng theo nghiệp vụ.
- **CQRS**: Tập trung logic tại **Handlers**. Controller chỉ điều phối qua Dispatcher.
- **Firebase**: Sử dụng hạ tầng sẵn có cho thông báo và lưu trữ.

### 4.3. Trao đổi liên nghiệp vụ
- Sử dụng **Command/Event** để trao đổi dữ liệu.

---

## 5. Kế hoạch tiếp theo (Khi có lệnh từ User)

Khi phát triển nghiệp vụ mới, trọng tâm sẽ là:
1. **Host Project**: Hiện tại các nghiệp vụ đang được tích hợp vào `Core.Web.Api` để dễ dàng kiểm thử. Tuy nhiên, có thể tạo thêm project API Restful riêng nếu quy mô nghiệp vụ lớn hoặc yêu cầu độc lập.
2. **Controller**: Gắn `AppAuthorize` với claims chính xác.
3. **Handlers**: Thực hiện logic nghiệp vụ chính.
4. **Data**: Thiết lập DbContext/Redis riêng.
5. **Integration**: Đăng ký extension tại `Program.cs` của host project.

---
**Ghi chú**: Tôi đã ghi nhận thêm các project test (MVC, Mobile) và tính linh hoạt trong việc tạo project API mới. Hệ thống hạ tầng đã sẵn sàng để mở rộng.
