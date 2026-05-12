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

### 2.2. Tự động đăng ký CQRS Handlers (Reflection)
- **Cơ chế**: Quét Assembly để tìm các class implement `ICommandHandler<>` hoặc `IEventHandler<>`.
- **Định danh Tự động (Naming Fallback)**: 
    - Ưu tiên lấy `QueueName`/`TopicName` định nghĩa trong code.
    - Nếu trống, hệ thống tự động sử dụng **`Type.FullName`** của lớp thông điệp.

---

## 3. Đặc tả Kỹ thuật Hệ thống (Technical Specs)

Để đảm bảo khả năng tái cấu trúc 100%, các quy chuẩn sau đây phải được tuân thủ tuyệt đối:

### 3.1. Quy chuẩn Đặt tên Key Redis
| Loại dữ liệu | Pattern Key | Mô tả |
| :--- | :--- | :--- |
| **Subscriber List** | `topic_subs:{topic}` | Set chứa danh sách tên các Subscriber của topic |
| **Subscriber Queue** | `sub_queue:{topic}:{sub}` | Sorted Set (ZSET) chứa message của từng subscriber |
| **Processing Queue** | `sub_proc:{topic}:{sub}` | List chứa message đang được xử lý (Reliable) |
| **Tracking History** | `infra:tracks:history:{id}` | List chứa các bước (TrackingEntry) của 1 TrackingId |
| **Tracking Status** | `infra:tracks:{status}:{name}` | ZSET chứa TrackingId thành công/lỗi theo queue/topic |
| **Counters** | `infra:stats:{metric}` | String/Counter lưu số lượng (eg: `processed:{name}`) |
| **Last Active** | `infra:last_active:{name}` | String lưu ISO Timestamp hoạt động cuối cùng |

### 3.2. Cấu trúc Dữ liệu Cốt lõi (DTOs)
- **TrackingEntry**: `TrackingId (Guid)`, `Step (string)`, `Details (string)`, `Status (string)`, `MessageContent (string)`, `QueueOrTopicName (string)`, `Timestamp (DateTime)`.
- **WorkerStatusDto**: `Id (string)`, `Type (Command/Event)`, `Status (Running/Stopped)`, `HandlerName (string)`, `QueueOrTopicName (string)`.

### 3.3. Logic Priority Dequeue (Lua Script)
Để đảm bảo tính nguyên tử (Atomic) và tin cậy (Reliable), việc Dequeue từ hàng đợi ưu tiên sử dụng Lua script:
```lua
local val = redis.call('ZPOPMIN', KEYS[1]) -- Lấy message có score nhỏ nhất (cũ nhất)
if val and #val > 0 then
    redis.call('LPUSH', KEYS[2], val[1]) -- Đẩy vào processing queue
    return val[1]
end
return nil
```

---

## 4. Mô hình CQRS & Luồng Dữ liệu

### 4.1. Quy trình xử lý & Tracking (Append-only)
Tracking được thực hiện tại 3 điểm chốt trong `CqrsDispatcher`:
1. **Point 1 (Dispatch)**: Ghi nhận message phát sinh + Payload. Trạng thái: `pending`.
2. **Point 2 (Worker Receive)**: Ghi nhận message bắt đầu được xử lý. Trạng thái: `processing`.
3. **Point 3 (Handler Result)**: Ghi nhận kết quả cuối cùng. Trạng thái: `success` hoặc `error`.

### 4.2. Giám sát Hoạt động (Last Activity)
Mỗi khi Enqueue hoặc Dequeue thành công, hệ thống gọi `UpdateLastActiveAsync(name)` để ghi lại thời điểm tương tác cuối cùng vào Redis.

---

## 5. Vận hành & Scale ngang
- **Stateless**: Trạng thái phiên làm việc qua JWT và Redis.
- **Horizontal Scaling**: Workers có thể scale độc lập theo tên hàng đợi.
- **Reliability**: Cơ chế processing queue và recovery (khi khởi động worker) đảm bảo không mất tin nhắn.

---
**Lưu ý**: Tài liệu này là cơ sở để viết lại toàn bộ Source Code trong trường hợp mất dữ liệu. Đảm bảo tính nhất quán giữa mô hình và thực tế.
