module files: Quản lý tài liệu
folder FE: TreeOfThought/frontend/web/src/app/modules/files-folders
    tham khảo TreeOfThought/frontend/web/yeucau.md và TreeOfThought/docs/cqrs-dashboard/yeucau.md
folder BE: tạo prj Core.Infra.FilesFolders trong TreeOfThought/backend
    dùng lại các core infra base khác khi cần thiết xem TreeOfThought/backend/yeucau.md và TreeOfThought/docs/cqrs-dashboard/yeucau.md
    cần db riêng    

Chức năng và quản lý file, folder info với db postgresql, UI giống folder explorer
- Mỗi user có folder riêng
- Treeview folder với sidebar bên trái
- Tạo folder
- Có thể tạo subfolder trong folder
- Trong folder có thể upload file và subfolder
- Trong folder có thể download file 
- Trong folder có thể delete file và subfolder
- Trong folder có thể move file và subfolder 
- upload file là dùng google cloud storage, file info lưu url , size , mime type, created at, created by ...
    - file đã upload lên google cloud storage cho phép set lại thành private or public or share có mã xác thực và hạn thời gian , có url để chia sẻ file 

**tuân thủ** hướng dẫn TreeOfThought/1st.md

**cập nhật 1**
ở tree view folder (sidemenu) , nút tạo mới folder cần:
    click vào lên popover có input để điền tên folder ( cần check theo chuẩn tên folder như hệ điều hành)
    mặc định chọn là folder gốc: tài liệu của tôi
    khi tạo mới folder sẽ tạo subfolder của folder đang chọn
    chọn folder nào thì content bên phải là danh sách file có phân trang 
    khi tao xong cần reload lại treeview

ở content area (content bên phải) , khi upload xong cần reload lại
**cập nhật 2**
Ở danh sách file bên phải, nút share file , click vào lên modal để chọn chế độ share
    cần đưa ra các cách share file theo google cloud storage về share file và url