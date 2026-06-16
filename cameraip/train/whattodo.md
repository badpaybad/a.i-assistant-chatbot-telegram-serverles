folder làm việc cameraip/train
dùng YOLO để train, transform learning nhận dạng object.
folder dataraw chứa ảnh
    cần làm gì để dataraw tạo ra folder data dùng để train và validate với yolo

viết python code để làm dữ liệu vào folder data từ dataraw
viết python code để load dataset từ folder data rồi train và validate, cần xuất ra dạng .onnx để dùng trên được cả PC (CPU) và android or ios
viết python code để dùng file .onnx để detect object

cần làm dataraw và data như thế nào?
    có thể tạo mẫu 1 vài dataraw để tham khảo
    CVAT chạy local qua docker, cần tạo docker compose file có mount volume để lưu để không bị mất dữ liệu, hướng dẫn chạy dockercompose để khởi động máy lên dùng được CVAT
        tạo redis với port 16379 pass Test123456
        đăng nhập CVAT : dunp / Test123456
    chỉ cần dùng CVAT

viết hướng dẫn sử dụng để làm dataraw cho việc train, có thể dùng công cụ nào để boxing làm label

dùng flask để làm web realtime check quá trình train và đánh giá kết quả

cần để các file pretrain vào cameraip/train 

train để dùng camera ip thu hình full hd ở 4 góc phòng học để có thể đếm được số người đang ngồi học 

kiểm tra pretrain chưa có thì download về, cần cho phép chọn pretrain model mặc định dùng Medium

**chú ý** cần đưa ra giải pháp và cách làm vào cameraip/train/howtodo.md, sau này có cập nhật ở cameraip/train/whattodo.md thì cũng cần cập nhật  trở lại howtodo.md giải pháp và cách làm
