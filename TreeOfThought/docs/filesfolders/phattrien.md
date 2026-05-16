# Kế hoạch Hoàn thiện module FilesFolders (Cập nhật 16/05)

Dựa trên yêu cầu mới nhất, tài liệu này mô tả các bước cụ thể để hoàn thiện trải nghiệm người dùng cho module FilesFolders.

## 1. Các tính năng cần tập trung
- **Trạng thái chia sẻ:** Đã có logic BE, cần đảm bảo FE hiển thị trực quan (Tag/Icon).
- **Xem chi tiết & Preview:** Tích hợp preview đa định dạng trong Modal chi tiết.
- **Đổi tên nhanh (Popover):** Chuyển từ Modal sang Popover cho cả Treeview và Listview.
- **Accordion:** Phân tách danh sách Thư mục và Tệp tin thành các khối có thể đóng/mở độc lập.

## 2. Giải pháp kỹ thuật

### A. Rename Popover Logic
- **Component**: Sử dụng `RenamePopoverComponent` với `@Input` và `@Output` thay vì inject `NZ_MODAL_DATA`.
- **Triggers**:
    - Trong `FileExplorer`: Sử dụng `nz-popover` gắn vào nút "Thao tác" (More) hoặc một icon sửa tên cạnh tên file/folder.
    - Trong `FolderTree`: Gắn `nz-popover` vào menu chuột phải hoặc icon action trên cây.
- **UX**: Tự động focus vào ô nhập liệu khi hiện popover. Nhấn Enter để lưu, Esc để hủy.

### B. File Preview & Details
- **Modal**: Sử dụng `FileDetailModalComponent` với kích thước lớn (nzWidth: 800px hoặc 1000px).
- **Preview Engine**:
    - Image: `<img>`
    - PDF: `<iframe>` (Safe URL)
    - Text/Code: `HttpClient.get(url, {responseType: 'text'})` hiển thị trong `<pre>`.
    - Video/Audio: HTML5 Tags.
- **Metadata**: Hiển thị rõ Ngày tạo, Dung lượng (format premium), Loại file.

### C. Accordion UI
- Sử dụng `nz-collapse` với `[nzBordered]="false"`.
- Hai `nz-collapse-panel` riêng biệt cho "Thư mục" và "Tệp tin".
- Mặc định `[nzActive]="true"`.

## 3. Kế hoạch triển khai (Tasks)
1. [x] Cập nhật `HttpClientService` (Core FE) để hỗ trợ TrackingId.
2. [x] Cập nhật `FirebaseService` (Core BE) để sử dụng Options pattern.
3. [x] Cập nhật `FilesFolders` Controllers để xử lý TrackingId.
4. [x] Cập nhật `FileExplorer` Component để lắng nghe Firestore.
5. [x] Refactor cấu hình và `GetUserId` dùng chung.
6. [/] Hoàn thiện UI File List hiển thị trạng thái chia sẻ (Cần kiểm tra lại Tag).
7. [/] Xây dựng Modal xem chi tiết và Preview file (Đã có basic, cần optimize).
8. [x] Triển khai API Đổi tên thư mục (Backend).
9. [x] Triển khai API Đổi tên file (Backend).
10. [ ] Chuyển đổi UI Đổi tên trên Folder Tree sang Popover.
11. [ ] Chuyển đổi UI Đổi tên trên File List sang Popover.
12. [ ] Tối ưu hóa Accordion (Tách biệt và style premium).

## 4. Xác nhận từ người dùng
- Bạn có đồng ý chuyển sang dùng Popover thay cho Modal khi đổi tên không? (Điều này giúp thao tác nhanh hơn nhưng cần xử lý vị trí hiển thị khéo léo).
- Các định dạng preview hiện có (Ảnh, PDF, Text, Video, Audio) đã đủ cho nhu cầu của bạn chưa?
