Sau khi đăng nhập người dùng vào chức năng Nhận diện khuôn mặt
    Kéo 1 folder ảnh lên hoặc ảnh lên, trong folder có rất nhiều ảnh, có thể có cả subfolder

cần làm xử lý tại trên trình duyệt trước. lấy các ảnh có trong folder hiện danh sách cho người dùng thấy các file ảnh đang có
cần xử lý lần lượt việc nhận ra khuôn mặt trong hình (detect face only) nếu có chuyển sang danh sách để người dùng duyệt
    danh sách file ảnh có khuôn mặt sẽ có thêm danh sách các khuôn mặt được crop ra từ file ảnh đó
    người dùng xem trước khuôn mặt được crop có thể chọn không lưu nếu không muốn

dùng js MediaPipe Face Detection để xử lý detect face trên trình duyệt 

duyệt xong cho phép người dùng chọn các khuôn mặt để upload và lưu trữ lên server 
    lưu file gốc, lưu các mặt crop được chọn

cần kết nối db tạo dbcontext hoặc cần redis riêng thì tạo thêm các class tương ứng trong nghiệp vụ
    với connectionstring tạo vào appsettings.json của từng nghiệp vụ với key là tên nghiệp vụ (vd: NhanDienKhuonMat:Postgresql or NhanDienKhuonMat:Redis)