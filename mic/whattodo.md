dựa trên mic/train.py và model đã train mic/model.tflite để tạo 1 python code thu âm liên tục từ mic PC chuyển về chuẩn âm thanh như trong train.py rồi khi phát hiện ra "du ơi" là đã train ở mic/model.tflite cắt đoạn phát hiện ra ghi vào file theo thời gian 

**cập nhật 1** xem mic/detect_wakeup.py nâng cấp để như 1 trợ lý real-time , khi du ơi được phát hiện bắt đầu giao tiếp như 1 trợ lý thông minh. 
    sau 1 phút mà không có giao tiếp thì quay lại lắng nghe du ơi 
        tức là detect thấy silence hoặc không nhận được ra 1 từ 1 chữ 1 câu 1 lệnh nào sau 1 phút sẽ quay lại lắng nghe du ơi
    
