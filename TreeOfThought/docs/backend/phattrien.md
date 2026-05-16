# Phân tích và Kế hoạch Phát triển Hệ thống TreeOfThought Backend

Tài liệu này tổng hợp các phân tích về kiến trúc hiện tại dựa trên yêu cầu tại [yeucau.md](TreeOfThought/docs/backend/yeucau.md) và hiện trạng code thực tế trong thư mục `TreeOfThought/backend`.

## 1. Tổng quan Kiến trúc
Hệ thống được xây dựng theo hướng **Modular Monolith** kết hợp với các nguyên tắc của **Clean Architecture** và **CQRS**. Backend sử dụng .NET 8.0 làm nền tảng chính.

### Các thành phần cốt lõi (Core Infra):
- **Core.Infra.Base**: Định nghĩa các interface (`ICacheService`, `IQueueService`, `IEventBus`, `IEventHandler`, `INotifyUiEvent`...), hằng số và các model dùng chung cho toàn bộ solution.
- **Core.Infra.Redis**: Triển khai các dịch vụ Cache, Queue (hỗ trợ Reliable Queue và Priority Queue), EventBus (Pub/Sub) dựa trên StackExchange.Redis.
- **Core.Infra.Session**: Quản lý Session người dùng trên Redis, hỗ trợ cơ chế Hybrid Session (kết hợp với JWT để tối ưu kích thước token).
- **Core.Infra.Data**: Quản lý kết nối đa cơ sở dữ liệu (PostgreSQL, MSSQL, MySQL, MongoDB).
- **Core.Infra.Firebase**: Tích hợp các dịch vụ Firebase (FCM cho thông báo, Firestore cho realtime UI notification, Google Cloud Storage cho lưu trữ file).
- **Core.Infra.Auth**: Xử lý logic JWT và Authorization. Đặc biệt là `AppAuthorizeAttribute` mã hóa thông tin (Mode, Action, ResourceType, Claims) vào Policy string, kết hợp với `AppAuthorizationHandler` để kiểm tra quyền linh hoạt (Hybrid Mode: JWT + Redis Session) và ACL.
- **Core.Infra.Cqrs**: Cung cấp hạ tầng cho Command/Handler và Event/PubSub. Có tích hợp `UiNotificationEventHandler` để tự động đẩy thông báo realtime lên UI qua Firestore sau khi xử lý nghiệp vụ (dựa trên interface `INotifyUiEvent`).
- **Core.Infra.Oidc**: Triển khai Identity Server cho giải pháp SSO nội bộ, bao gồm cả `ClaimScannerService` để tự động quét và đồng bộ các quyền khai báo trong code vào DB.
- **Core.Infra.FilesFolders**: Module nghiệp vụ mẫu quản lý tệp tin và thư mục, minh họa việc tách biệt DbContext và logic Handler.

---

## 2. Đánh giá Hiện trạng triển khai

### Điểm mạnh & Đặc điểm nổi bật:
- **Cơ chế Authorization thông minh (Hybrid Auth)**: 
    - Kết hợp giữa JWT (cho các role chính) và Redis Session (cho các permission chi tiết). 
    - Hỗ trợ ACL (Access Control List) dựa trên `ResourceType` và `ResourceId` với bitmask linh hoạt.
- **Quản lý Quyền tự động (Automated Claim Management)**: 
    - `ClaimScannerService` tự động quét các `AppAuthorize` attribute trong code và đồng bộ vào Database khi startup, giúp Admin luôn có danh sách quyền mới nhất để quản lý.
- **Phản hồi UI thời gian thực (Realtime UI Feedback)**: 
    - Bất kỳ Event nào triển khai `INotifyUiEvent` sẽ tự động được `UiNotificationEventHandler` đẩy lên Firestore. 
    - **Cơ chế Tự động Đăng ký (Auto-Registration)**: `CqrsAutoRegistrationService` tự động phát hiện mọi Event implement `INotifyUiEvent` và đăng ký generic handler để đẩy notify lên Firestore.
- **Hạ tầng Queue tin cậy**: Việc triển khai `DequeueReliableAsync` (LPUSH RPOP) đảm bảo không mất message khi process gặp sự cố.
- **Tính đóng gói (Encapsulation)**: Các module hạ tầng được tách biệt rõ ràng, dễ dàng tái sử dụng qua các Extension methods (`AddAppOidc`, `AddCqrs`, `AddFilesFolders`...).

### Các thành phần đã hoàn thiện:
- [x] Cấu trúc Solution và Project bám sát `yeucau.md`.
- [x] Redis Service (Cache, Queue, EventBus).
- [x] Auth logic (Hybrid Authorization, ACL bitmask).
- [x] Claim Sync/Scanner (Tự động hóa quản lý permission).
- [x] CQRS Dispatcher và cơ chế xử lý Event/Command (Background processing).
- [x] Tích hợp Firebase (Firestore notification, FCM, GCS Storage).
- [x] Module nghiệp vụ mẫu: `FilesFolders` (Full CQRS + Realtime UI).

---

## 3. Kết quả Review Code so với Tài liệu (Gap Analysis)

### 3.1. Các thành phần đã bám sát tài liệu:
- [x] **Hạ tầng đa DB**: Hỗ trợ PostgreSQL, MSSQL, MySql và MongoDB.
- [x] **Hybrid Auth**: Xử lý Claim từ JWT và fallback sang Redis session/ACL.
- [x] **Realtime UI**: Pattern `INotifyUiEvent` -> `Firestore` đã chạy tốt và được tự động hóa.
- [x] **OIDC/SSO**: Cấu hình linh hoạt giữa local và external Authority.

### 3.2. Các điểm cần bổ sung/hoàn thiện (Gaps):
- [ ] **Cleanup Firestore**: Cần cơ chế TTL (Time To Live) cho các document trong collection `notify` để tránh rác nếu FE không xóa kịp.
- [ ] **Auth Sync logic**: Trong `AuthManagementController`, cần gọi `AuthService.SyncUserClaimsToRedisAsync` và `SyncUserAclToRedisAsync` ngay khi Admin thay đổi quyền/role/ACL của user để session có hiệu lực tức thì.
- [/] **Firebase Config Consolidation**: Chuyển các hằng số AppName, BucketName vào `appsettings.json` (Đang triển khai).
- [/] **Realtime UI Feedback Hoàn thiện**: Tích hợp TrackingId và Firestore subscription cho module `FilesFolders` (Xem chi tiết tại [FilesFolders phattrien.md](../filesfolders/phattrien.md)).

---

## 4. Quy tắc Phát triển & Bảo trì (Consistency Guidelines)

Để đảm bảo tính nhất quán, mọi thay đổi (phát triển nghiệp vụ mới, sửa lỗi, bổ sung logic) cần tuân thủ:

### 4.1. Nhất quán về Auth
- Luôn sử dụng `AppAuthorizeAttribute` with claims cụ thể (ví dụ: `[AppAuthorize("be.feature.action")]`).
- Tận dụng `ResourceType` và `Action` cho các nghiệp vụ cần ACL chi tiết đến từng bản ghi (ResourceId).
- Sử dụng session nếu JWT chưa đủ thông tin.

### 4.2. Nhất quán về Hạ tầng
- **Database**: Mỗi nghiệp vụ có `DbContext` riêng, kế thừa từ `BaseDbContext`. Sử dụng db, redis dữ liệu, cache riêng theo nghiệp vụ nếu cần.
- **CQRS**: 
    - Logic nghiệp vụ nằm hoàn toàn ở **Handlers**. 
    - Controller chỉ dùng `IDispatcher` để gửi Command/Event.
    - Để phản hồi realtime cho UI, chỉ cần Event triển khai `INotifyUiEvent`, hệ thống sẽ tự động handle việc đẩy notify lên Firestore tại path: `commandresults/{TrackingId}`.
- **Firebase**: Sử dụng `FirebaseService` cho thông báo và lưu trữ. Việc xử lý logic bổ sung (thumb, resize...) thực hiện tại module nghiệp vụ nếu cần.

### 4.3. Cô lập Nghiệp vụ (Strict Isolation)
- **Tuyệt đối không gọi code hoặc add reference chéo** giữa các project nghiệp vụ để tránh lệ thuộc.
- Trao đổi dữ liệu giữa các nghiệp vụ thông qua **Command/Event**.
- Nếu cần truy vấn dữ liệu của nghiệp vụ khác: Tạo thêm `DbContext` phụ trong nghiệp vụ hiện tại nhưng **chỉ được phép Read-only** (không có code thay đổi dữ liệu).

### 4.4. Chi tiết về AppAuthorize
- **Claims**: Phải có prefix `be.` (nếu không có sẽ tự động thêm vào). Ví dụ: `[AppAuthorize("files.read")]` tương đương claim `be.files.read`.
- **Mode**: 
    - `OR`: Chỉ cần thỏa mãn 1 trong các claims/roles.
    - `AND`: Phải thỏa mãn tất cả.
- **ACL**: Sử dụng `ResourceType` và `Action` (Bitmask) để kiểm tra quyền trên resource cụ thể.

---

## 5. Kế hoạch tiếp theo (Khi có lệnh từ User)

1. **Nghiệp vụ mới**: Sẵn sàng triển khai các module nghiệp vụ tiếp theo (ví dụ: Chatbot, Telegram Integration) dựa trên khung hạ tầng đã vững chắc.
2. **Hoàn thiện Infra**: 
    - Cấu hình Cloud Function hoặc cơ chế nội bộ để dọn dẹp Firestore notify collection.
    - Refactor `AuthManagementController` để trigger sync session.
    - Di chuyển toàn bộ cấu hình Firebase vào `appsettings.json`.
3. **Mở rộng OIDC**: Hỗ trợ thêm các Social Login providers khác nếu cần.

---
**Ghi chú**: Hệ thống hiện tại đã đạt độ trưởng thành cao về mặt kiến trúc, cho phép mở rộng nhanh chóng mà vẫn duy trì được tính nhất quán và bảo mật.
