# Yêu cầu nghiệp vụ Quản lý Tệp tin và Thư mục (FilesFolders)

## 1. Mục tiêu
Xây dựng module quản lý tệp tin và thư mục cá nhân cho người dùng, tích hợp lưu trữ đám mây (Google Cloud Storage) và thông báo trạng thái thời gian thực (Realtime UI Feedback).

## 2. Các chức năng chính
- **Quản lý Thư mục**:
    - Tạo thư mục (hỗ trợ phân cấp lồng nhau).
    - Xóa thư mục (xóa đệ quy toàn bộ nội dung bên trong).
    - Di chuyển thư mục.
    - Xem cây thư mục.
- **Quản lý Tệp tin**:
    - Upload file lên Google Cloud Storage (GCS).
    - Xóa file (xóa cả trong DB và trên GCS).
    - Di chuyển file giữa các thư mục.
    - Tìm kiếm file theo tên.
- **Chia sẻ & Phân quyền**:
    - Thiết lập quyền: Private, Public, Shared.
    - Tạo link chia sẻ có thời hạn (Signed URL).
    - Cập nhật ACL trên GCS tương ứng với quyền của file.

## 3. Yêu cầu kỹ thuật (Tuân thủ Base Infra)
- **Kiến trúc**: Modular Monolith + CQRS.
- **Giao tiếp**: 
    - Controller gọi `IDispatcher` để thực hiện Command.
    - Các tác vụ ghi (Create/Update/Delete) phải là bất đồng bộ (Background processing).
    - Phản hồi UI qua Firestore dựa trên `TrackingId`.
- **Bảo mật**: Kiểm tra quyền truy cập thông qua `AppAuthorizeAttribute` và lọc dữ liệu theo `UserId`.
- **Lưu trữ**:
    - Database: `FilesFoldersDbContext` riêng biệt.
    - File: Tích hợp `FirebaseService` (Google Cloud Storage).

** File trong danh sách quản lý file 
    cần hiển thị thêm tình trạng chia sẻ hiện tại của file đó
        BE nếu trong db chưa thiết kế để lưu trạng thái chia sẻ của file thì cần bổ xung 
    click vào tên file là mở modal hiển thị preview file và các thông tin chi tiết (ngày tạo, dung lượng, ....)
        dựa vào content type của file để hiện preview tương ứng ở modal mở lên

** Bổ xung thêm việc đổi tên cho folder và file, cả treeview và danh sách đều sửa tên folder được
    click sửa tên hiện popover, để điền tên mới (ô nhập đã có value tên hiện tại) và có nút để đồng ý hoặc hủy việc đổi tên 

** Trong danh sách file quản lý cần: bổ xung accodion cho danh sách folder và danh sách file mặc định là expand, khi người dùng muốn xem tập trung danh sách file thì có thể collapse danh sách folder và ngược lại 
    Header của arcodion chiều cao hơi cao, cần dạng 1 dòng ngang vừa với dòng chữ, folder cần về dạng grid do dạng bảng chiếm nhiều không gian, các folder xếp cạnh nhau dạng icon ô vuông 1 cứ hết chiều rộng lại tự xuống dòng (vd float left), cần icon folder gọn gàng chiếm ít diện tich tên hiện đầy đủ 
        Thêm 1 icon Up của folder nếu có folder cha thì khi click vào sẽ selected sang folder cha (treeview cũng selected theo) 
** khi upload file xong cần mở modal hỏi người dùng về việc set quyền cho file vừa upload
    Có các lựa chọn: Private, Public, Shared, để người dùng có thể lựa chọn quyền cho file vừa upload 
