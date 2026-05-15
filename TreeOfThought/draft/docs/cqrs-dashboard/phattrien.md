# Giải pháp phát triển CQRS Dashboard Enrichment - Cập nhật chi tiết UI & Logic

## 1. Mục tiêu và Phạm vi
Hoàn thiện hệ thống giám sát và quản lý CQRS toàn diện, cho phép theo dõi dòng chảy của Command/Event, thống kê hiệu năng xử lý của các Queue/Topic, và quản lý vòng đời của các tiến trình Worker theo yêu cầu mới nhất (2026-05-12 11:40:24).

## 2. Giải pháp thực hiện

### 2.1 Backend (.NET Core)
- **Định danh**: Ưu tiên lấy từ code, fallback về `Type.FullName`.
- **Thống kê**: Tính toán động `Processing = Queue + ProcessingQueue`. Thành công/Lỗi lấy từ Counters và ZSETs.
- **Tracking**: Ghi nhận 3 điểm chốt kèm Payload JSON vào `infra:tracks:history:{id}`.

### 2.2 Frontend (Angular 21 + Ng-Zorro-Antd)
- **Tab Hàng đợi & Chủ đề**: Bảng tổng quát + Modal chi tiết (Command: List, Topic: Subscriber Tabs).
- **Tab Theo dõi gần đây**: Timeline dòng chảy message từ lịch sử tracking.
- **Tab Hoạt động cuối cùng**: Danh sách thực thể sắp xếp theo thời gian tương tác mới nhất.

---

## 3. Đặc tả Kỹ thuật (Technical Specs)

### 3.1. Danh mục API Endpoints (`/api/cqrs/dashboard/`)
| Endpoint | Method | Mô tả |
| :--- | :--- | :--- |
| `stats` | GET | Lấy bộ đếm thống kê tổng quát và trạng thái Workers |
| `queues` | GET | Lấy danh sách Queue/Topic kèm thông số chi tiết và Handlers |
| `last-activity` | GET | Lấy danh sách thời gian hoạt động cuối cùng của các thực thể |
| `messages/{name}` | GET | Lấy danh sách message (Pending + Historical) của một Queue/Topic |
| `tracking/{id}` | GET | Lấy toàn bộ lịch sử các bước xử lý của một TrackingId |
| `tracking/recent`| GET | Lấy danh sách các bản ghi tracking mới nhất (có phân trang) |
| `retry` | POST | Gửi lệnh yêu cầu thực hiện lại (Retry) một message |
| `workers/{id}/stop`| POST | Dừng một Worker cụ thể |
| `workers/{id}/start`| POST | Khởi chạy một Worker cụ thể |

### 3.2. Quy tắc Ánh xạ Dữ liệu (Frontend Data Mapping)
- **Trạng thái Message**: 
    - `pending`: Đang nằm trong hàng đợi chờ xử lý.
    - `processing`: Đang được Worker đảm nhận.
    - `success`: Xử lý thành công.
    - `error`: Gặp lỗi (hiện kèm chi tiết lỗi).
- **Phân loại Thực thể**:
    - `Queue`: Các hàng đợi Command.
    - `Topic`: Các chủ đề Event.
    - `Subscriber`: Từng hàng đợi riêng biệt của từng Subscriber thuộc Topic.

---

## 4. Quy trình Kiểm tra & Xác thực
- **Backend**: `dotnet run` -> Kiểm tra JSON tại các endpoint trên. Fix `JsonException` bằng cách bọc `try-catch` tại `RedisService.GetAsync<string>`.
- **Frontend**: `npm start` -> Kiểm tra giao diện các Tab, Modal và chức năng Resend/Retry.

## 5. Trạng thái Hệ thống
- **Stable & Ready to Run**: Tài liệu mô tả đủ chi tiết để tái cấu trúc module Dashboard chính xác 100% dù không còn Source Code.
