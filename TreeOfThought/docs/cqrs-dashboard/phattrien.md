# Giải pháp phát triển CQRS Dashboard Enrichment - Cập nhật chi tiết UI & Logic

## 1. Mục tiêu và Phạm vi
Hoàn thiện hệ thống giám sát và quản lý CQRS toàn diện, cho phép theo dõi dòng chảy của Command/Event, thống kê hiệu năng xử lý của các Queue/Topic, và quản lý vòng đời của các tiến trình Worker theo yêu cầu mới nhất (2026-05-12 11:40:24).

## 2. Giải pháp thực hiện

### 2.1 Backend (.NET Core)

#### A. Xử lý tên Command/Event & Metadata
- **Định danh**: Nếu `QueueName` hoặc `TopicName` không được định nghĩa rõ ràng trong code, hệ thống tự động sử dụng `Type.FullName` của lớp Message.
- **Ánh xạ Handlers**: `CqrsDispatcher` duy trì danh sách `HandlerRegistrationDto` để hiển thị trên Dashboard mối liên hệ giữa: Thực thể (Queue/Topic) <-> Thông điệp (Command/Event) <-> Lớp xử lý (Handler).

#### B. Logic thống kê chi tiết (Statistics)
- **Đang xử lý (Processing)**: 
    - `Count = (Số lượng trong Queue gốc) + (Số lượng trong Queue :processing)`.
    - Đối với Topic: Tổng của tất cả các bộ (Queue Subscriber + Queue Subscriber :processing).
- **Thành công/Lỗi**: Lấy trực tiếp từ các bộ đếm Redis (`processed:{name}`, `error:{name}`). Bộ đếm được thực hiện tại lớp hạ tầng `RedisService` để đảm bảo tính chính xác cao nhất.

#### C. Tracking append-only & Payload
- **Lưu trữ**: Mỗi bước tracking trong quy trình (Dispatcher -> Worker -> Result) đều lưu lại `Payload` (nội dung JSONIndented của message) tại thời điểm đó.
- **Append-only**: Dữ liệu không bao giờ bị ghi đè, cho phép truy vết lịch sử xử lý xuyên suốt của một `TrackingId`.

### 2.2 Frontend (Angular 21 + Ng-Zorro-Antd)

#### A. Cấu trúc Tab "Hàng đợi & Chủ đề"
- **Bảng dữ liệu**: Hiển thị Loại, Tên, Đang xử lý, Đã xử lý thành công, Đã xử lý lỗi, Tổng message, Danh sách Worker, Danh sách Handlers.
- **Modal Chi tiết**:
    - **Nếu là Command**: Hiển thị bảng danh sách message đơn giản (Thời gian, Message Payload JSON, Trạng thái, Hành động Gửi lại/Xóa).
    - **Nếu là Topic**: Hiển thị giao diện **Tabs**, mỗi Tab đại diện cho một Subscriber. Trong mỗi Tab là bảng danh sách message của Subscriber đó.

#### B. Cấu trúc Tab "Theo dõi gần đây"
- Hiển thị danh sách các Tracking ID. Mỗi dòng có thể mở rộng (Expand) để xem:
    - **Payload**: Nội dung message hiện tại.
    - **Lịch sử xử lý**: Danh sách các bước (Step) kèm thời gian và mô tả chi tiết.
- Cột: Tracking ID, Message Item (Expandable), Thời gian, Trạng thái, Hành động (Gửi lại, Xóa).

#### C. Tính năng vận hành
- **Worker Control**: Nút Dừng/Khởi chạy trực tiếp trên bảng "Trạng thái Workers".
- **Auto Refresh**: Droplist cho phép cấu hình thời gian làm mới tự động (0s - 1h).

## 3. Quy trình Kiểm tra & Xác thực

### 3.1 Backend
- `dotnet run` tại `TreeOfThought/backend/Core.Web.Api`.
- Kiểm tra dữ liệu JSON tại các endpoint dashboard api.
- Xác nhận số liệu thống kê thay đổi khi gửi SampleCommand/SampleEvent.

### 3.2 Frontend
- `ng build` tại thư mục `frontend/web`.
- Đảm bảo tính ổn định của giao diện khi chuyển đổi giữa các tab và mở modal chi tiết topic.
- Kiểm tra chức năng Gửi lại (Retry) và Xóa (Delete) message.

## 4. Trạng thái Hệ thống
- **Stable & Ready to Run**: Toàn bộ code đã được đồng bộ với mô hình dữ liệu thống kê mới và các cột bảng theo yêu cầu.
- **Tài liệu**: Mô tả đủ chi tiết để tái cấu trúc module Dashboard chính xác 100%.
