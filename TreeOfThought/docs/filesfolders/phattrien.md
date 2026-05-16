# Kế hoạch Hoàn thiện module FilesFolders (Cập nhật 16/05)

Dựa trên yêu cầu mới nhất, tài liệu này mô tả các bước cụ thể để hoàn thiện trải nghiệm người dùng cho module FilesFolders.

## 1. Các tính năng cần tập trung
- **Trạng thái chia sẻ:** Đã có logic BE, cần đảm bảo FE hiển thị trực quan (Tag/Icon).
- **Xem chi tiết & Preview:** Tích hợp preview đa định dạng trong Modal chi tiết.
- **Đổi tên nhanh (Popover):** Chuyển từ Modal sang Popover cho cả Treeview và Listview.
- **Accordion:** Phân tách danh sách Thư mục và Tệp tin thành các khối có thể đóng/mở độc lập.
- **Xóa triệt để:** Đảm bảo khi xóa thư mục, toàn bộ tệp tin và thư mục con trong DB và trên Google Cloud Storage (GCS) đều bị xóa sạch để tránh phát sinh chi phí.

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

### D. Post-Upload Permission Modal
- **Trigger**: Sau khi tác vụ Upload file hoàn tất (status 'Completed' từ Firestore).
- **Action**: Tự động mở `FileShareModalComponent` cho file vừa upload.
- **Payload**: Cần đảm bảo backend trả về `fileId` hoặc thông tin file trong payload thông báo Firestore để FE có thể mở đúng file.
- **UX**: Cho phép người dùng nhanh chóng thiết lập quyền (Private/Public/Shared) ngay khi file sẵn sàng.

### C. Accordion & Folder Grid UI
- **Accordion**: 
    - Sử dụng `nz-collapse` với `[nzBordered]="false"`.
    - Header của accordion được style siêu gọn (compact), chiều cao chỉ vừa đủ chứa 1 dòng text.
    - Hai `nz-collapse-panel` riêng biệt cho "Thư mục" và "Tệp tin".
    - Mặc định cả hai đều ở trạng thái expand (`[nzActive]="true"`).
- **Folder Grid**:
    - Chuyển danh sách Folder từ dạng bảng (table) sang dạng lưới (grid).
    - Mỗi folder là một icon ô vuông (square card) xếp cạnh nhau.
    - Sử dụng Flexbox (`flex-wrap: wrap`) để tự động xuống dòng khi hết chiều rộng.
    - Tiết kiệm không gian và mang lại cảm giác hiện đại (premium).

### E. Recursive Deletion & GCS Cleanup
- **Logic Backend**:
    - **Bước 1**: Tìm tất cả thư mục con (mọi cấp) dựa trên `Path.StartsWith(folder.Path)`.
    - **Bước 2**: Tìm tất cả tệp tin thuộc về các thư mục đó trong DB.
    - **Bước 3 (Xóa GCS)**:
        - Xóa các tệp tin tìm được ở Bước 2 dựa trên URL (đảm bảo xóa được cả các file đã bị move/rename nhưng chưa đổi path vật lý).
        - **Bổ sung**: Quét (List) toàn bộ objects trên GCS có prefix là `folder.Path` và xóa nốt (đảm bảo không còn "rác" hay file mồ côi trên Cloud Storage).
    - **Bước 4 (Xóa DB)**: Xóa Range tệp tin và thư mục trong DB.
- **Hiệu quả**: Đảm bảo 100% tài nguyên được giải phóng, tối ưu chi phí lưu trữ GCS.

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
12. [x] Tối ưu hóa UI File Explorer:
    - Triển khai Accordion compact cho Thư mục và Tệp tin.
    - Chuyển đổi danh sách Folder sang dạng Grid (ô vuông).
13. [ ] Tự động mở modal thiết lập quyền sau khi upload file thành công.
14. [x] Cập nhật logic xóa thư mục triệt để (GCS prefix cleanup).

## 4. Xác nhận từ người dùng
- Bạn có đồng ý chuyển sang dùng Popover thay cho Modal khi đổi tên không? (Điều này giúp thao tác nhanh hơn nhưng cần xử lý vị trí hiển thị khéo léo).
- Các định dạng preview hiện có (Ảnh, PDF, Text, Video, Audio) đã đủ cho nhu cầu của bạn chưa?
