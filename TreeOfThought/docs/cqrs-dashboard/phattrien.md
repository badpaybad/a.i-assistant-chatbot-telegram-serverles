# Giải pháp phát triển CQRS Dashboard Enrichment

## Yêu cầu
Bổ sung thông tin chỉ ra queue name, topic name được khai báo dùng với command nào, event nào, command handler nào, event handler nào.

## Giải pháp thực hiện

### 1. Backend (C#)
- **Cập nhật Interface**: Thay đổi `IDispatcher.GetWorkerStatus()` để trả về danh sách chi tiết các Worker thay vì chỉ là Dictionary trạng thái.
- **Cập nhật Dispatcher**: Trong `CqrsDispatcher`, bổ sung thông tin `MessageName`, `HandlerName` và `QueueOrTopicName` vào cấu trúc lưu trữ `WorkerInfo` khi đăng ký Handler.
- **Cập nhật Controller**: 
    - `CqrsDashboardController.GetStats` trả về danh sách Worker chi tiết.
    - `CqrsDashboardController.GetQueues` thực hiện so khớp tên hàng đợi/chủ đề với các Worker đã đăng ký để gán thông tin Message và Handler tương ứng.

### 2. Frontend (Angular)
- **Cập nhật Service**: Cập nhật các interface `DashboardStats`, `QueueInfo` và thêm `WorkerDetail` để hỗ trợ dữ liệu mới từ backend.
- **Cập nhật Component**: Xử lý dữ liệu Worker chi tiết trong `DashboardComponent`.
- **Cập nhật UI**: 
    - Thêm cột "Lệnh / Sự kiện" (Command / Event) và "Handler" vào bảng "Hàng đợi & Chủ đề".
    - Thêm cột "Lệnh / Sự kiện" và "Handler" vào bảng "Workers".
- **Cập nhật Đa ngôn ngữ**: Bổ sung các bản dịch cho `Lệnh / Sự kiện` và `Handler` vào `vi.json` và `en.json`.

## Kết quả kiểm tra
- Backend đã build thành công với lệnh `dotnet build`.
- Đã chạy thử nghiệm với `dotnet run` và xác nhận ứng dụng khởi động bình thường trên cổng 5000.
- Các worker tự động đăng ký (SampleCommandHandler, SampleEventHandler) đã hiển thị đúng thông tin Message và Handler.
