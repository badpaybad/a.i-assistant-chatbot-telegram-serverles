dựa trên mic/train.py và model đã train mic/model.tflite để tạo 1 python code thu âm liên tục từ mic PC chuyển về chuẩn âm thanh như trong train.py rồi khi phát hiện ra "du ơi" là đã train ở mic/model.tflite cắt đoạn phát hiện ra ghi vào file theo thời gian

**cập nhật 1** xem mic/detect_wakeup.py nâng cấp để như 1 trợ lý real-time , khi du ơi được phát hiện bắt đầu giao tiếp như 1 trợ lý thông minh
    sau 1 phút mà không có giao tiếp thì quay lại lắng nghe du ơi
        tức là detect thấy silence hoặc không nhận được ra 1 từ 1 chữ 1 câu 1 lệnh nào sau 1 phút sẽ quay lại lắng nghe du ơi

dù người dùng nói chen ngang chỗ đang xử lý  Người dùng nói xen vào, dừng phát âm thanh hiện tại... 
thì không ngắt việc voice chatbot nói. 
cần lưu lại lời người nói, để khi xong sẽ xử lý lời vừa lưu lại. 
nếu người dùng nói : "làm ơn dừng lại," "dừng lại" với âm thanh lớn, thì mới dùng lại để lắng nghe người dùng nói xong rồi xử lý trả lời

Không cần kích hoạt nhận diện wakr-word mỗi khi trả lời xong, chỉ kích hoạt khi lúc mới khởi động , sau 1 phút mà không xử lý tts ra chữ được thì lúc nay không stream lên api nữa, quay lại nghe du ơi 

**cập nhật 2** xem code cameraip/train/train_yolo_tiny.py hỗ trợ cả cpu , cuda ... cần cập nhật cho mic/train.py để hỗ trợ cả cpu , cuda ... cho việc train 

**cập nhật 3** Hiện tại bạn đang cấu hình: FRAME_LENGTH = 480 và FRAME_STEP = 320.
Bạn có thể giảm FRAME_STEP xuống (ví dụ 240 hoặc 160) để tăng độ chồng chập (overlap). Việc này giúp ảnh spectrogram mịn hơn, chi tiết hơn theo trục thời gian, từ đó giúp nhận diện các âm tiết ngắn tốt hơn.
cập nhật cho code esp32 , api esp32 hub ở yêu cầu esp32/esp32os/esp32chatvoice.md về FRAME_LENGTH=240 FRAME_STEP =160. để đồng nhất nhất quán xử lý âm thanh cho mượt 

**cập nhật 4** sau khi train xong đã tạo file model_data.h cần copy thành esp32/esp32os/wakeupword_model_data.h , cần khai báo là const vd const unsigned char model_tflite[] __attribute__((aligned(16))) = .... tối ưu cho esp32