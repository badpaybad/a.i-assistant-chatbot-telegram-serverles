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

**cập nhật 1** để tránh việc màu ảnh hưởng tới việc detect thì cần xử lý ảnh thô từ camera ip về dạng ảnh đen trắng gray scale trước khi đưa vào để train hoặc để detect, kết quả sẽ dựa trên ảnh gốc có bounding box để có thể crop đúng ảnh thật.

**cập nhật 2** tạo thêm code python để tạo các ảnh tăng cường từ 1 folder ảnh có sẵn sang folder agumented_image để dùng cho CVAT để gán nhãn cho từ agumented_image cho phong phú. tạo thêm các ảnh như lật ngang , lật dọc, nghiên 15 độ bên trái phải, nghiêng 30 độ bên trái bên phải, nghiêng 45 độ bên trái bên phải

**cập nhật 3**
xem lại code prepare_data.py ở data raw yolo1.1 xuất ra từ cvat cameraip/train/dataraw có 2 label, nhưng khi split ra train và valid cần phải đủ train valid cho từng lable, nếu 1 label chỉ có 1 ảnh thì cần copy tạo cho train và valid cùng ảnh đó .

**cập nhật 4**
hỗ trợ thêm GPU AMD (ví dụ Radeon™ 780M Graphics × 16) bên cạnh CPU và GPU NVIDIA, tích hợp tự động cấu hình biến môi trường HSA_OVERRIDE_GFX_VERSION cho các dòng GPU consumer RDNA3/iGPU và hiển thị hướng dẫn cấu hình PyTorch ROCm chi tiết.
    xem file cameraip/train/radeon780m.md đã clone vào /vm/pytorch cài vào vnev ở /work/a.i-assistant-chatbot-telegram-serverles/venv 

    /work/a.i-assistant-chatbot-telegram-serverles/venv/bin/pip install --force-reinstall torch torchvision torchaudio --index-url https://download.pytorch.org/whl/rocm6.2
    
        chạy lệnh và xem độ tương thích venv/bin/python cameraip/train/train_yolo.py --data cameraip/train/data/dataset.yaml --model yolo26s.pt --epochs 80 --batch 4 --device amd

**cập nhật 5** hỗ trợ và tối ưu hóa hệ thống cho dòng GPU NVIDIA (ví dụ GeForce RTX 3060 / 3060 Ti), tự động cấu hình biến môi trường tối ưu hóa bộ nhớ `PYTORCH_CUDA_ALLOC_CONF` để tránh phân mảnh VRAM/lỗi tràn bộ nhớ (OOM) khi huấn luyện mô hình lớn với batch size lớn.

**cập nhật 6**
fine tune train yolo cần giải quyết việc detect những object nhỏ như nút bấm trên màn hình điện thoại, icon button , link text , input text, nút bấm share, nút bấm like, nút bấm comment, droplist, chữ, số ... với độ chính xác cao. dựa trên train_yolo.py để tạo train_yolo_tiny.py để chuyên finetune cho detect object nhỏ với độ chính xác cao, vd camera chụp toàn cảnh và lấy được vùng 720px*720px lúc này icon trên màn hình điện thoại đã khá nhỏ, dùng để boxing label rồi cần yolo finetune để nhận diện chính xác  

**cập nhật 7**
tạo folder train_dashboard và tạo index.html để vẽ kết quả train từ result.csv , cần manual load chọn file .csv để xem , dựa trên dữ liệu có thể đưa ra các đánh giá và khuyến nghị với các tham số train 

**chú ý** cần đưa ra giải pháp và cách làm vào cameraip/train/howtodo.md, sau này có cập nhật ở cameraip/train/whattodo.md thì cũng cần cập nhật  trở lại howtodo.md giải pháp và cách làm
