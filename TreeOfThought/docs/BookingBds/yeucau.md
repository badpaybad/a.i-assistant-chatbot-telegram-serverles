# Yêu cầu nghiệp vụ: Quản lý Booking Bất Động Sản

> [!IMPORTANT]
> Việc phát triển nghiệp vụ này cần tham khảo các tiêu chuẩn cơ sở tại:
> - Backend: TreeOfThought/backend/yeucau.md
> - Frontend: TreeOfThought/frontend/web/yeucau.md

## 1. Giới thiệu
Mô tả ngắn gọn về nghiệp vụ quản lý đặt chỗ (booking) bất động sản.

## 2. Các tính năng chính
- [ ] Quản lý danh sách dự án/căn hộ.
- [ ] Quy trình đặt chỗ (Booking flow).
- [ ] Quản lý trạng thái booking (Chờ duyệt, Đã cọc, Đã hủy, ...).
- [ ] Thanh toán tiền cọc.
- [ ] Quản lý giỏ hàng bất động sản.

## 3. Đối tượng người dùng
- Khách hàng (End-user).
- Nhân viên kinh doanh (Sales).
- Quản trị viên (Admin).

## 4. Quy trình nghiệp vụ (Workflow)
1. **Tìm kiếm & Lựa chọn**: Khách hàng xem danh sách dự án, mặt bằng tầng và chọn căn hộ ưng ý.
2. **Kiểm tra trạng thái**: Hệ thống hiển thị trạng thái thời gian thực của căn hộ (Trống, Đang giữ chỗ, Đã cọc, Đã bán).
3. **Giữ chỗ tạm thời**: Khách hàng chọn "Giữ chỗ", hệ thống sẽ khóa căn hộ trong 15-30 phút để khách hàng thực hiện thanh toán.
4. **Thanh toán đặt chỗ**: Khách hàng thực hiện chuyển khoản hoặc thanh toán qua cổng điện tử.
5. **Xác nhận Booking**: Backend nhận callback từ cổng thanh toán, cập nhật trạng thái "Đã cọc" và bắn thông báo (Real-time qua Firebase) cho Sales và Khách hàng.
6. **Hoàn tất thủ tục**: Sales liên hệ khách hàng để ký hợp đồng mua bán, sau đó Admin cập nhật trạng thái "Đã bán".

## 5. Yêu cầu kỹ thuật & Ràng buộc
- **Concurrency Control**: Sử dụng Redis Lock hoặc Versioning trong MongoDB để đảm bảo không có 2 người cùng đặt 1 căn tại 1 thời điểm.
- **Real-time**: Sử dụng Firebase Firestore để cập nhật bản đồ sản phẩm (inventory map) ngay lập tức khi có thay đổi trạng thái.
- **CQRS**: Các hành động Booking, Thanh toán được xử lý qua Command; Việc xem danh sách, lịch sử được xử lý qua Query.
- **Logging**: Ghi log đầy đủ lịch sử thay đổi trạng thái của từng căn hộ để đối soát.
- **Tích hợp**: Cổng thanh toán (Mockup hoặc thực tế), Firebase FCM cho thông báo đẩy.

**chú ý** cần dùng db postgresql để lưu trữ dữ liệu