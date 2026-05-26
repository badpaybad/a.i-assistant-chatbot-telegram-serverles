Sau khi đăng nhập người dùng vào chức năng Nhận diện khuôn mặt

Session làm việc 

    cho phép tạo session bằng việc 
        nhờ việc kéo file ảnh, chọn file ảnh, hoặc kéo folder, chọn folder
            khi kéo file or folder sẽ để ảnh vào danh sách bên trái
            xử lý face detect xong , dùng MediaPipe Face Detection chạy trên trình duyệt 
            để ảnh có khuôn mặt sang danh sách bên phải 
                danh sách ảnh có khuôn mặt sẽ có thêm danh sách các khuôn mặt được crop ra từ file ảnh đó
                người dùng xem trước khuôn mặt được crop có thể chọn không lưu nếu không muốn
                người dùng cần chọn xem ảnh gốc nào, ảnh crop nào được đưa lưu
        có thể kéo thêm file ảnh hoặc folder vào session đã có để xử lý tiếp

    Cần cho phép người dùng đặt tên cho session
    Khi click nút lưu 
        lưu các file ảnh gốc và các mặt crop được chọn vào session đó

    Lưu xong sẽ reset session làm việc và reload lại Danh sách quản lý


Danh sách quản lý 

    danh sách sesion sẽ hiện lần lượt bên dưới với tên, thời gian mỗi phiên upload.
        mỗi session sẽ có các hành động: xem chi tiết, đặt lại tên, xóa
            xem chi tiết: mở modal show bảng danh sách các ảnh gốc và các mặt được crop từ file ảnh gốc
                có cột action xóa từng ảnh crop, xóa ảnh gốc
                    xóa ảnh gốc sẽ xóa cả các ảnh crop từ file đó
                    xóa ảnh crop sẽ xóa riêng ảnh crop đó

    do dùng google cloud storage lưu file nên khi xóa cần xóa cả trên GCS

**bug 1**
    Cần theo chuẩn TreeOfThought/docs/frontend/howtodo.md 
    Danh sách quản lý đang hiện từng dòng theo file gốc, trong khi cần hiển thị là session
    mỗi dòng là 1 session 
