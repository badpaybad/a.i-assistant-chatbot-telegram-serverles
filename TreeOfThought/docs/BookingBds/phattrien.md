# Kế hoạch phát triển: Quản lý Booking Bất Động Sản

## 1. Phân tích giải pháp & Data Schema

### 1.1. Data Models (PostgreSQL)
- **Project**: `Id (Guid), Name, Description, Location, TotalUnits, ...`
- **Apartment**: `Id (Guid), ProjectId, UnitNumber, Floor, Price, Status (Enum/Int), ...`
- **Booking**: `Id (Guid), ApartmentId, CustomerId, SalesId, DepositAmount, Status (Enum/Int), RequestId, CreatedAt, ...`

### 1.2. CQRS Workflow
- **Commands**:
    - `CreateBookingCommand`: Khởi tạo giữ chỗ, dùng EF Core Transaction và Redis Lock để bảo vệ tranh chấp.
    - `CancelBookingCommand`: Hủy giữ chỗ.
    - `ConfirmPaymentCommand`: Cập nhật trạng thái thanh toán.
- **Queries**: Dùng LINQ to SQL qua EF Core.
    - `GetMyBookingsQuery`: Lấy danh sách booking của khách hàng hiện tại.

### 1.3. Real Estate Cart (Giỏ hàng)
- Khách hàng có thể xem danh sách các căn hộ đã giữ chỗ.
- Cho phép thanh toán hoặc hủy giữ chỗ từ giỏ hàng.
- Hiển thị thời gian còn lại (Countdown) cho các căn hộ đang giữ chỗ.

## 2. Kiến trúc chi tiết

### 2.1. Backend (`backend/BookingBds`)
- Kế thừa `Core.Infra.Base`, `Core.Infra.Data` (MongoDB), `Core.Infra.CQRS`.
- Sử dụng `FirebaseService` để đẩy thông báo trạng thái Booking qua Firestore topic (RequestId).
- Sử dụng `RedisService` để quản lý Distributed Lock khi xử lý `CreateBookingCommand`.

### 2.2. Frontend (`frontend/web/src/modules/BookingBds`)
- **Pages**:
    - `ProjectListPage`: Danh sách dự án.
    - `ApartmentLayoutPage`: Sơ đồ căn hộ (dùng Ant Design Card/Grid).
    - `BookingCheckoutPage`: Form điền thông tin và nút thanh toán.
- **Services**:
    - `BookingService`: Gọi API Command/Query.
    - `FirebaseHook`: Subscribe Firestore để nhận kết quả Booking real-time.

## 3. Các bước thực hiện

### Bước 1: Backend Setup
1. Tạo Entity và DBContext cho BookingBds (MongoDB).
2. Viết các Command Handle: `CreateBooking`, `ConfirmPayment`.
3. Viết các Query Handle: `GetProjects`, `GetApartments`.
4. Đăng ký Module vào API Gateway (`Core.Web.Api`).

### Bước 2: Frontend Setup
1. Định nghĩa types cho Project, Apartment, Booking.
2. Xây dựng UI danh sách dự án và sơ đồ căn hộ.
3. Tích hợp Firebase listener để cập nhật trạng thái căn hộ real-time trên giao diện.

### Bước 3: Kiểm thử
1. Test concurrency: 2 user cùng book 1 căn.
2. Test flow thanh toán (mock callback).
3. Test thông báo Firebase.
