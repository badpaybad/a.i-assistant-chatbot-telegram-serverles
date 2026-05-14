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

                    So sánh với các URL ở chức năng Share
                Chế độ Share	URL sinh ra	Có giống URL trong DB không?
                Công khai (Public)	https://storage.googleapis.com/...	GIỐNG HỆT. Đây chính là URL gốc. Khi bạn bật chế độ này, BE sẽ lên GCS mở quyền cho phép "bất kỳ ai" truy cập vào chính URL gốc đó.
                Link tạm thời (Signed URL)	https://storage.googleapis.com/...&GoogleAccessId=...&Signature=...	KHÁC. Nó bắt đầu bằng URL gốc nhưng có thêm một chuỗi ký tự bảo mật rất dài ở phía sau. Chuỗi này chứa "chìa khóa" tạm thời và thời gian hết hạn.
                Bảo mật (Secure/Mã xác thực)	http://localhost:5000/api/files/share/{shareId}	KHÁC HOÀN TOÀN. Đây là URL nội bộ của hệ thống (không phải link trực tiếp GCS). Khi truy cập link này, người dùng phải nhập mã thì hệ thống mới cho phép tải file.

                Lưu ý quan trọng: Khi bạn chuyển file về Riêng tư (Private), URL gốc trong DB sẽ bị GCS chặn truy cập (lỗi 403), đảm bảo an toàn cho dữ liệu.

    **bug 1** áp dụng riêng tư rồi , sao url https://storage.googleapis.com/dunp-test-gcs/dunp/8a1ae663-4441-458e-9471-4746f84a492f_du1.jpeg vẫn vào đc, code BE chưa gọi lên google cloud storage để set lại quyền
**cập nhật 3**
bên content right danh sách file. nút tải lên để sang bên phải.
bổ xung đường dẫn file hiện tại trên top bên trái . có thể click vào từng folder trên path để truy cập folder
bổ xung nút thêm mới  cạnh nút tải lên , trước nút làm mới 
**cập nhật 4**
thư mục gốc cũng có thể upload được file 

**cập nhật 5**
popover khi điền tên folder để tạo mới, cần có title Tạo mới folder, trong folder hiện tại: {tên folder hiện tại}
    cần dùng chung 1 component popover tạo mới folder cho cả bên treeview sidebar và bên content right khi click nút thêm mới 
nút tạo mới folder cần có icon folder 
ở danh sách bên phải cần bổ xung thêm hành động Chuyển folder (move):
    áp dụng cho cả file và folder
    click vào nút move, hiện lên modal để chọn folder đích
        modal hiển thị treeview folder , người dùng chọn folder và ok thì move

tất cả các thao tác: thêm mới folder , upload file, xóa file, xóa folder, move file, move folder đều cần reload lại danh sách folder ở treeview sidebar và danh sách file bên content right

kiểm tra backend luôn await các async khi gọi insert update delete vào db. đảm bảo dữ liệu vào db rồi mới thực hiện việc khác tiếp

    **bug 2: **cập nhật 5** ** tính năng move file, move folder chưa hoạt động, cần kiểm tra lại và sửa.