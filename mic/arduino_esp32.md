1. Chuẩn bị thư viện trên Arduino IDE
Bạn mở Arduino IDE, vào Tools -> Manage Libraries và cài đặt chính xác các thư viện sau:

EloquentTinyML (bởi Simone Salerno) - Bản bọc TFLite Micro siêu nhẹ.

arduino-fft (bởi kosme) - Dùng để tính toán biến đổi Fourier nhanh (FFT) nhằm chuyển audio thô thành ảnh phổ.

2. Mã nguồn C++ Hoàn Chỉnh cho ESP32-S3
Bạn tạo một project mới trên Arduino IDE, đặt file model_data.h (vừa được tạo ra từ Python) chung thư mục với file code chính .ino này. mic/arduino_esp32.ino


3. Ánh xạ Chỉ số Nhãn (Class Mapping) từ Python sang ESP32
Khi chạy kịch bản huấn luyện hoặc chạy nhận diện `detect_wakeup.py`, chương trình sẽ quét thư mục `dataraw` và in ra thứ tự nhãn. Với cấu trúc thư mục hiện tại:
* **`Class [0]`**: `background` (Tiếng ồn nền)
* **`Class [1]`**: `du_oi` (Từ khóa kích hoạt)
* **`Class [2]`**: `unknown` (Từ nói khác/từ lạ)

Trong mã nguồn [arduino_esp32.ino](file:///work/a.i-assistant-chatbot-telegram-serverles/mic/arduino_esp32.ino), cấu trúc kiểm tra điều kiện kích hoạt đã được ánh xạ tương ứng:
```cpp
    // 6. Kiểm tra kết quả trùng khớp với từ khóa
    // ID 1 tương ứng với nhãn "du_oi"
    if (class_id == 1 && probability > 0.82) { 
        Serial.print("🔥 [KÍCH HOẠT] Đã nhận diện tiếng Việt 'Ơi Gemini'! Độ tin cậy: ");
        Serial.print(probability * 100);
        Serial.println("%");
        // ... xử lý câu lệnh tiếp theo ...
    }
```


