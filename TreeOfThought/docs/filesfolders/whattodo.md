# Yêu cầu Nghiệp vụ Quản lý Tệp tin và Thư mục (FilesFolders)

> [!NOTE]
> Tài liệu này mô tả chi tiết các yêu cầu nghiệp vụ và kỹ thuật đối với Module Quản lý Tệp tin và Thư mục cá nhân (FilesFolders) trong hệ thống TreeOfThought.

## 1. Tổng quan & Mục tiêu

Xây dựng module quản lý tệp tin và thư mục cá nhân cho người dùng với trải nghiệm premium, tích hợp lưu trữ đám mây Google Cloud Storage (GCS) thông qua Firebase và cơ chế phản hồi giao diện thời gian thực (Realtime UI Feedback) dựa trên Firestore.

### Cấu trúc Folder dự án

- **Tài liệu (Docs):** `TreeOfThought/docs/filesfolders`
- **Backend (BE):** `TreeOfThought/backend/Core.Infra.FilesFolders`
- **Frontend (FE):** `TreeOfThought/frontend/web/projects/tot/business-files`

---

## 2. Các chức năng chi tiết

### A. Quản lý Thư mục (Folder Management)

1. **Tạo thư mục:** Hỗ trợ tạo thư mục phân cấp, lồng nhau (không giới hạn cấp độ).
2. **Xem cây thư mục (Treeview):** Hiển thị trực quan cấu trúc cây thư mục bên trái màn hình.
3. **Đổi tên thư mục (Rename):**
   - Hỗ trợ đổi tên ở cả cây thư mục (Treeview) và danh sách tệp tin (File Explorer).
   - Thao tác nhanh qua **Popover** (thay vì mở Modal cồng kềnh):
     - Click sửa tên hiển thị Popover ngay tại vị trí thư mục.
     - Ô nhập liệu tự động focus và điền sẵn giá trị tên hiện tại.
     - Có nút đồng ý (Lưu) và nút Hủy. Nhấn `Enter` để lưu nhanh, `Esc` để hủy nhanh.
4. **Di chuyển thư mục (Move):** Di chuyển thư mục đến thư mục cha khác thông qua Modal lựa chọn cây thư mục.
5. **Xóa thư mục triệt để (Recursive Deletion):**
   - Khi xóa một thư mục, hệ thống sẽ thực hiện xóa đệ quy toàn bộ thư mục con và tệp tin bên trong.
   - **Yêu cầu nghiêm ngặt:** Phải xóa sạch bản ghi trong Database và xóa thực tế trên Google Cloud Storage (GCS) bao gồm cả các tệp mồ côi có tiền tố (prefix) trùng khớp để tránh phát sinh chi phí lưu trữ ngoài ý muốn.

### B. Quản lý Tệp tin (File Management)

1. **Tải lên tệp tin (Upload):**
   - Cho phép upload tệp tin lên Google Cloud Storage (GCS) bất đồng bộ (qua Background Job/Dispatcher).
   - **Quy trình set quyền sau upload:** Sau khi tệp tin tải lên thành công, hệ thống tự động mở Modal hỏi người dùng thiết lập quyền truy cập cho tệp tin vừa upload (mặc định ban đầu là Riêng tư).
2. **Xem chi tiết & Xem trước (Preview & Details):**
   - Click vào tên file sẽ mở Modal hiển thị thông tin chi tiết (Tên, ngày tạo, dung lượng định dạng premium, loại file...) và vùng xem trước (Preview).
   - Tự động hiển thị trình xem trước tương ứng dựa trên loại nội dung (Content Type/MimeType):
     - *Hình ảnh:* Hiển thị thẻ `<img>` xem ảnh trực tiếp.
     - *PDF:* Hiển thị thẻ `<iframe>` an toàn.
     - *Văn bản/Mã nguồn:* Tải nội dung text hiển thị trong block `<pre>` hoặc code-viewer.
     - *Video/Audio:* Sử dụng trình phát media HTML5 mặc định.
     - *Định dạng khác:* Hiển thị icon và nút tải về trực tiếp.
3. **Đổi tên tệp tin:** Đổi tên nhanh thông qua Popover tương tự thư mục.
4. **Di chuyển tệp tin:** Di chuyển file giữa các thư mục cha khác nhau.
5. **Xóa tệp tin:** Xóa bản ghi trong Database và xóa tệp tin vật lý thực tế trên GCS.
6. **Tìm kiếm tệp tin:** Ô tìm kiếm nhanh theo tên file ở đầu File Explorer, hỗ trợ chuyển nhanh đến thư mục chứa tệp tin và giữ nguyên kết quả tìm kiếm trực quan.

### C. Chia sẻ & Phân quyền (Sharing & Permissions)

Thiết lập quyền linh hoạt cho từng tệp tin với các lựa chọn:

- **Riêng tư (Private):** Chỉ chủ sở hữu mới xem được. Tệp tin trên GCS được cấu hình ACL ở chế độ Private.
- **Công khai (Public):** Bất kỳ ai có đường dẫn URL trực tiếp từ GCS đều xem được. GCS ACL được chuyển sang Public (public-read).
- **Liên kết tạm thời (Signed URL):** Sinh ra một Signed URL an toàn từ GCS có thời hạn sử dụng tùy chọn (1 giờ, 24 giờ, 7 ngày). Sau khi hết hạn, liên kết tự động vô hiệu lực.
- **Bảo mật (Secure):** Tệp tin được bảo vệ bởi mã bảo mật (Share Code) và ngày hết hạn. Chỉ những ai nhập đúng mã bảo mật mới có thể truy cập.

---

## 3. Trải nghiệm Giao diện (Premium UI/UX)

1. **Hiển thị Trạng thái Chia sẻ:** Danh sách tệp tin hiển thị trực quan tình trạng chia sẻ hiện tại của từng tệp tin thông qua các Tag/Icon màu sắc (vd: xanh lá cho Public, xanh dương cho Shared/Secure, xám cho Private).
2. **Khối Danh mục thông minh (Accordion compact):**
   - Phân tách danh sách thành 2 Accordion (nz-collapse): **Thư mục** và **Tệp tin**.
   - Mặc định ở trạng thái mở rộng (Expand). Người dùng có thể thu gọn (Collapse) để xem tập trung danh sách tệp tin hoặc thư mục.
   - Header của Accordion thiết kế siêu gọn (compact), chiều cao chỉ vừa bằng dòng chữ tiêu đề kèm Tag số lượng vật phẩm bên trong.
3. **Lưới Thư mục (Folder Grid):**
   - Danh sách thư mục được chuyển từ dạng bảng (table) sang dạng lưới (grid) để tiết kiệm không gian.
   - Các thư mục hiển thị dạng card vuông, xếp cạnh nhau và tự động xuống dòng (flex-wrap grid) khi hết chiều rộng.
   - Icon thư mục đẹp mắt, tên thư mục hiển thị đầy đủ hoặc kèm tooltip.
4. **Nút điều hướng cha (Up Folder Button):**
   - Thêm nút "Up" (`...`) dạng ô vuông ở vị trí đầu lưới thư mục nếu thư mục hiện tại có cha.
   - Khi click vào nút này, hệ thống sẽ di chuyển lên thư mục cha đồng thời selected thư mục đó trên cây thư mục bên trái tương ứng.

---

## 4. Yêu cầu kỹ thuật (Tuân thủ Base Infra)

- **Kiến trúc:** Modular Monolith kết hợp CQRS.
- **Xử lý bất đồng bộ:** Toàn bộ tác vụ ghi (Tạo/Xóa thư mục, Di chuyển, Upload, Cập nhật quyền) phải chạy ngầm thông qua `IDispatcher` (MemoryMode).
- **Realtime UI Feedback:** Trạng thái tác vụ chạy ngầm được cập nhật liên tục lên UI thông qua Firestore dựa trên `TrackingId`.
- **Bảo mật:**
  - Kiểm tra quyền hạn nghiêm ngặt ở lớp API thông qua `AppAuthorizeAttribute`.
  - Lọc toàn bộ dữ liệu truy vấn thư mục, tệp tin và tìm kiếm theo `UserId` của phiên đăng nhập hiện tại để đảm bảo an toàn thông tin tuyệt đối giữa các người dùng.
- **Cơ sở dữ liệu:** Sử dụng `FilesFoldersDbContext` riêng biệt để cô lập dữ liệu.

**chú ý** cần luôn xem yeucau.md và cập nhật phattrien.md khi có thay đổi. đợi người dùng duyệt phattrien.md trước khi tiếp tục

**cập nhật 2026-05-25 15:09:09**

Danh sách file UI cần dùng tot-table, cột hành động cần là fixed cố định, kết quả tìm kiếm file cột thao tác cũng cần fixed cố định
   cột tên file cần hiển thị tốt tên file không bị cắt ngắn khi màn hình hẹp có thể dài 25 ký tự có thể wrap xuống dòng

Ở Treeview folder TreeOfThought/frontend/web/projects/tot/business-files/src/lib/components/folder-tree/folder-tree.ts 
   bổ xung thêm nút ẩn hiện folder treeview ngay ở title cạnh nut thêm mới. khi màn hình mobi nhỏ có thể ẩn hiện treeview folder để thao tác với danh sách file và danh sách kết quả tìm kiếm file

