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