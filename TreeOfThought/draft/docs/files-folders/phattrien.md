# Kế hoạch phát triển module Quản lý Tài liệu (Files & Folders)

Tài liệu này mô tả chi tiết kế hoạch triển khai module quản lý file và folder cho hệ thống TreeOfThought.

## Phân tích yêu cầu

- **Giao diện**: Giống Windows Explorer, có thanh bên trái (sidebar) hiển thị cây thư mục (tree view) và phần nội dung bên phải hiển thị danh sách file/folder.
- **Phân quyền**: Mỗi người dùng có vùng không gian lưu trữ riêng. Không thể xem file của người khác trừ khi được chia sẻ.
- **Lưu trữ**: 
    - Metadata (thông tin file/folder) lưu tại PostgreSQL.
    - Nội dung file thực tế lưu tại Google Cloud Storage (GCS).
- **Tính năng chính**:
    - Xem cấu trúc thư mục (Tree view).
    - Thêm/Xóa/Sửa/Di chuyển (Move) folder và file.
    - Upload file lên GCS và lưu thông tin vào DB.
    - Download file.
    - Chia sẻ file: Thiết lập quyền (Private, Public, Shared với mã xác thực và thời hạn).

## Giải pháp kỹ thuật

### Backend (.NET Core 8)

1. **Project mới**: `Core.Infra.FilesFolders`.
2. **Công nghệ**:
    - EF Core với PostgreSQL.
    - GCS client (sử dụng `Core.Infra.Firebase` hoặc GCS base đã có).
    - CQRS Pattern (Command/Event/Query).
3. **Thực thể (Entities)**:
    - `Folder`: `Id`, `ParentId`, `Name`, `UserId`, `Path` (để tối ưu tìm kiếm tree), `CreatedAt`, `CreatedBy`.
    - `File`: `Id`, `FolderId`, `Name`, `Url`, `Size`, `MimeType`, `UserId`, `PermissionType` (Private, Public, Shared), `ShareCode`, `ExpiredAt`, `CreatedAt`, `CreatedBy`.
4. **CQRS**:
    - **Commands**:
        - `CreateFolderCommand`: Tạo thư mục mới.
        - `UpdateFolderCommand`: Đổi tên thư mục.
        - `DeleteFolderCommand`: Xóa thư mục (xóa đệ quy file và subfolder).
        - `MoveFolderCommand`: Di chuyển thư mục sang vị trí mới.
        - `UploadFileCommand`: Upload file lên GCS và lưu DB.
        - `DeleteFileCommand`: Xóa file khỏi GCS và DB.
        - `MoveFileCommand`: Di chuyển file sang folder khác.
        - `SetFilePermissionCommand`: Cấu hình chia sẻ file.
    - **Queries**:
        - `GetFolderTreeQuery`: Lấy toàn bộ cây thư mục của user.
        - `GetFolderContentsQuery`: Lấy danh sách file và folder con của một folder.
        - `GetFileDetailQuery`: Lấy thông tin chi tiết file.
        - `GetSharedFileQuery`: Lấy thông tin file công khai/được chia sẻ.
5. **API Controllers**:
    - `FoldersController`: Quản lý thư mục.
    - `FilesController`: Quản lý file.

### Frontend (Angular)

1. **Module mới**: `TreeOfThought/frontend/web/src/app/modules/files-folders`.
2. **Components**:
    - `FilesFoldersComponent`: Layout chính của module.
    - `FolderTreeComponent`: Hiển thị treeview ở sidebar (Sử dụng `nz-tree`).
    - `FileExplorerComponent`: Hiển thị danh sách file/folder ở nội dung chính (Sử dụng `nz-table` hoặc grid layout).
    - `FileActionButtons`: Các nút chức năng (Upload, New Folder, Delete, Move).
    - `FileShareModal`: Modal cấu hình chia sẻ file.
    - `FileUploadModal`: Modal quản lý quá trình upload.
3. **Services**:
    - `FilesFoldersService`: Gọi API backend.
4. **Routing**:
    - `/files`: Trang chính quản lý file.

## Kế hoạch triển khai

### Giai đoạn 1: Thiết lập cấu trúc và Database
- [ ] Tạo project backend `Core.Infra.FilesFolders`.
- [ ] Định nghĩa các Entity và DbContext cho PostgreSQL.
- [ ] Tạo module frontend `files-folders` và cấu hình routing.

### Giai đoạn 2: Phát triển Backend (CQRS)
- [ ] Triển khai các Command xử lý Folder (Create, Delete, Move).
- [ ] Triển khai tích hợp GCS (Upload, Delete, Generate Signed URL).
- [ ] Triển khai các Command xử lý File (Upload, Delete, Move).
- [ ] Triển khai các Query (Tree view, List content).

### Giai đoạn 3: Phát triển Frontend UI
- [ ] Xây dựng layout tổng thể với sidebar và content area.
- [ ] Triển khai `FolderTreeComponent` hỗ trợ chọn folder.
- [ ] Triển khai `FileExplorerComponent` hiển thị nội dung folder hiện tại.
- [ ] Triển khai tính năng tạo folder và xóa.

### Giai đoạn 4: Tính năng nâng cao và Hoàn thiện
- [ ] Triển khai Upload file (hỗ trợ progress bar).
- [ ] Triển khai tính năng Move (di chuyển file/folder).
- [ ] Triển khai tính năng Chia sẻ file (Public/Shared link).
- [ ] Kiểm thử và sửa lỗi (Sử dụng `dotnet run` và `ng build`).

## Câu hỏi & Lưu ý quan trọng
- **Xử lý xóa đệ quy**: Khi xóa một folder, cần đảm bảo xóa toàn bộ subfolder và file bên trong ở cả DB và GCS.
- **Tối ưu Tree View**: Nếu số lượng folder lớn, cần cân nhắc load tree theo kiểu lazy load (load khi mở rộng node).
- **Bảo mật**: Kiểm tra kỹ quyền sở hữu (UserId) trong mọi request để tránh rò rỉ dữ liệu giữa các user.

> [!IMPORTANT]
> Người dùng vui lòng duyệt kế hoạch này trước khi tôi tiến hành code.
