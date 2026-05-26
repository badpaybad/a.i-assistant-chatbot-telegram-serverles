# Hướng dẫn Kiểm thử Tracking Message Error với SampleEventHandlerAlwaysError

Tài liệu này hướng dẫn cách kiểm thử và theo dõi luồng tin nhắn (Message Tracking) khi xảy ra lỗi bằng cách sử dụng `SampleEventHandlerAlwaysError` trong hệ thống CQRS.

## 1. Cơ chế hoạt động của SampleEventHandlerAlwaysError

Trong hệ thống CQRS của dự án, khi một sự kiện `SampleEvent` được Publish vào topic `sample.event`:
- Cả hai Subscriber (Event Handlers) đăng ký xử lý `SampleEvent` sẽ nhận được tin nhắn này:
  1. `SampleEventHandler`: Xử lý thành công.
  2. `SampleEventHandlerAlwaysError`: Luôn throw ra một ngoại lệ `Test error` để giả lập quá trình xử lý thất bại.
- Khi `SampleEventHandlerAlwaysError` ném ngoại lệ, `CqrsDispatcher` sẽ bắt lấy ngoại lệ, ghi nhận vào thống kê lỗi (`total:error`, `error:topic:sample.event`), cập nhật dòng thời gian theo dõi (Tracking Step) ở trạng thái `Error` kèm thông báo lỗi chi tiết, đồng thời đẩy tin nhắn vào hàng đợi Dead Letter Queue (DLQ).

## 2. Giải pháp kỹ thuật nâng cấp giao diện UI Kiểm thử (CqrsTestComponent)

Để hỗ trợ kiểm thử tính năng này một cách trực quan, chúng ta sẽ cập nhật file:
`TreeOfThought/frontend/web/projects/tot/business-test/src/lib/cqrs-test/cqrs-test.component.ts`

### Các cải tiến đề xuất:
- **Tích hợp Timeline Theo dõi trực tiếp (Live Tracking Timeline):** Hiển thị trực tiếp lịch sử và tiến trình xử lý của `lastTrackingId` ngay dưới form gửi thử mà không cần người dùng phải chuyển hướng sang trang Dashboard.
- **Hiển thị Chi tiết Lỗi và Stack Trace:** Định dạng các bước xử lý lỗi bằng màu đỏ (Error), hiển thị rõ subscriber bị lỗi (`SampleEventHandlerAlwaysError`) kèm thông điệp lỗi chi tiết `Error: Test error` để lập trình viên xác minh cơ chế tracking lỗi hoạt động đúng.
- **Hỗ trợ Tự động Làm mới (Auto-poll & Refresh):** Tự động tải lại lịch sử tracking sau khi gửi command/event 1.5 giây, đồng thời cung cấp nút "Làm mới dòng thời gian" để người dùng chủ động kiểm tra trạng thái mới nhất.

## 3. Bản thiết kế Giao diện người dùng (UI Design Mockup)

```
+------------------------------------------------------------+
|                         Kiểm thử CQRS                      |
+-----------------------------+------------------------------+
| [ Gửi SampleCommand ]       | [ Gửi SampleEvent ]          |
| Payload:                    | Nội dung:                    |
| { "message": "..." }        | { "message": "..." }         |
|                             |                              |
| [ Gửi Command ]             | [ Gửi Event ]                |
+-----------------------------+------------------------------+
|                   Kết quả & Theo dõi Luồng                   |
|                                                            |
|  Tracking ID: 5f9b3a2c-7b8d-4e9f-a2b1-c3d4e5f6a7b8        |
|  [ Làm mới dòng thời gian ]                                 |
|                                                            |
|  Dòng thời gian xử lý:                                     |
|  O 20:01:02 - Dispatcher (Start Publish)                   |
|  O 20:01:02 - EventBus (Enqueued to SampleEventHandler)    |
|  O 20:01:02 - EventBus (Enqueued to AlwaysError)           |
|  O 20:01:03 - Worker (SampleEventHandler: Success)         |
|  X 20:01:03 - Worker (AlwaysError: Error - Test error)     |
+------------------------------------------------------------+
```
