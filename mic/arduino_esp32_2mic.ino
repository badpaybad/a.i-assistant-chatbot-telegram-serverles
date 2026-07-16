#include <Arduino.h>
#include <driver/i2s.h>
#include <arduinoFFT.h>
#include <EloquentTinyML.h>
#include "model_data.h" // File chứa mảng Hex INT8 model.tflite của bạn

// ==========================================
// THAM SỐ CẤU HÌNH PHẦN CỨNG & AI (HỖ TRỢ 2 MICRO INMP441)
// ==========================================
// Hướng dẫn đấu nối 2 Microphone INMP441 hoạt động song song (Stereo):
// 1. Các chân chung đấu song song nối vào ESP32:
//    - SCK (Serial Clock) -> ESP32 Pin 26 (I2S_SCK)
//    - WS (Word Select)   -> ESP32 Pin 25 (I2S_WS)
//    - SD (Serial Data)   -> ESP32 Pin 22 (I2S_SD)
//    - VDD                -> 3.3V
//    - GND                -> GND
// 2. Chân cấu hình kênh trái/phải (L/R - Left/Right Select):
//    - Mic 1 (Kênh Trái - Left): Chân L/R nối xuống GND (Ground)
//    - Mic 2 (Kênh Phải - Right): Chân L/R nối lên 3.3V (VDD)
// Việc này giúp I2S driver đọc song song 2 kênh cùng lúc, sau đó ta sẽ
// cộng gộp và trung bình hai kênh để triệt tiêu tiếng ồn ngẫu nhiên (SNR tăng khoảng 3dB).

#define I2S_WS      17  // Chân WS chung của 2 mic (ESP32-S3 GPIO 17)
#define I2S_SD      18  // Chân SD chung của 2 mic (ESP32-S3 GPIO 18)
#define I2S_SCK     16  // Chân SCK chung của 2 mic (ESP32-S3 GPIO 16)
#define I2S_PORT    I2S_NUM_0

#define SAMPLING_RATE   16000
#define NUM_CLASSES     3       // Số lượng nhãn của bạn (ví dụ: background, oi_gemini, unknown)

// Định hình ảnh Spectrogram đầu vào giống hệt Python (49 hàng x 40 cột)
#define SPEC_ROWS       49
#define SPEC_COLS       40
#define INPUT_SIZE      (SPEC_ROWS * SPEC_COLS)

// Cấu hình cửa sổ FFT giống hệt Python (FRAME_LENGTH = 480)
// Vì thuật toán FFT cơ học yêu cầu độ dài cửa sổ phải là lũy thừa của 2, ta dùng 512  
#define FFT_SAMPLES     512  

// Cấp phát vùng nhớ tĩnh Tensor Arena cho TFLite (ESP32-S3 R8 thừa thãi RAM)
#define ARENA_SIZE      (64 * 1024)

// Khởi tạo thực thể bộ thông dịch AI
// Thừa kế mảng model_tflite và model_tflite_len từ file model_data.h
Eloquent::TinyML::TfLite<NUM_CLASSES, ARENA_SIZE> ml(model_tflite);

// Các biến phục vụ tính toán FFT
ArduinoFFT<float> FFT = ArduinoFFT<float>();
float vReal[FFT_SAMPLES];
float vImag[FFT_SAMPLES];
int8_t spectrogram_features[INPUT_SIZE]; // Mảng chứa ảnh phổ INT8 đầu vào cho AI

// ==========================================
// CẤU HÌNH DRIVER I2S CHO 2 MIC (STEREO)
// ==========================================
void init_i2s() {
    i2s_config_t i2s_config = {
        .mode = (i2s_mode_t)(I2S_MODE_MASTER | I2S_MODE_RX),
        .sample_rate = SAMPLING_RATE,
        .bits_per_sample = I2S_BITS_PER_SAMPLE_16BIT,
        .channel_format = I2S_CHANNEL_FMT_RIGHT_LEFT, // Đọc song song cả 2 kênh (Trái và Phải)
        .communication_format = I2S_COMM_FORMAT_STAND_I2S,
        .intr_alloc_flags = ESP_INTR_FLAG_LEVEL1,
        .dma_buf_count = 8,
        .dma_buf_len = 512,
        .use_apll = false
    };

    i2s_pin_config_t pin_config = {
        .bck_io_num = I2S_SCK,
        .ws_io_num = I2S_WS,
        .data_out_num = I2S_PIN_NO_CHANGE,
        .data_in_num = I2S_SD
    };

    i2s_driver_install(I2S_PORT, &i2s_config, 0, NULL);
    i2s_set_pin(I2S_PORT, &pin_config);
}

// ==========================================
// CÁC BIẾN THEO DÕI TRẠNG THÁI & LIÊN THÔNG THREAD
// ==========================================
volatile unsigned long last_wakeup_time = 0; // Lưu thời gian (ms) nhận diện từ khóa lần cuối

// Định nghĩa Task FreeRTOS cho việc nhận diện giọng nói
void wakeup_detection_task(void *pvParameters);

// ==========================================
// SETUP & INITIALIZATION
// ==========================================
void setup() {
    Serial.begin(921600);
    while (!Serial);
    
    Serial.println("Initializing Audio AI System (Dual-Mic configuration)...");
    init_i2s();

    // Kiểm tra xem model nạp vào vùng nhớ tĩnh có lỗi không
    if (!ml.begin()) {
        Serial.println("❌ Thất bại khi nạp Model TFLite Micro!");
        while (1) delay(1000);
    }
    Serial.println("🚀 Model AI đã sẵn sàng hoạt động!");

    // Tạo Task chạy nhận diện ở Core 0 (để Core 1 chạy loop() chính thoải mái)
    xTaskCreatePinnedToCore(
        wakeup_detection_task,   // Hàm xử lý của Task
        "WakeupDetectionTask",   // Tên Task
        10000,                   // Kích thước Stack (bytes)
        NULL,                    // Tham số truyền vào Task
        1,                       // Độ ưu tiên của Task
        NULL,                    // Task Handle
        0                        // Pinned vào Core 0 (Core của các tác vụ hệ thống/WiFi)
    );
    Serial.println("🎙️ Thread nhận diện giọng nói (2 Mic) đã được khởi chạy ở Core 0!");
}

// ==========================================
// VÒNG LẶP CHÍNH (THREAD CHÍNH - CORE 1)
// ==========================================
void loop() {
    // Vòng lặp chính hoàn toàn độc lập, không bị block bởi xử lý AI
    // Bạn có thể xử lý các tác vụ khác ở đây (đọc cảm biến, nhấp nháy LED, gửi nhận dữ liệu...)
    
    if (last_wakeup_time > 0) {
        Serial.print("[Main Thread] Trạng thái: Đã từng kích hoạt. Lần cuối cách đây: ");
        Serial.print((millis() - last_wakeup_time) / 1000.0);
        Serial.println(" giây trước.");
    } else {
        Serial.println("[Main Thread] Đang chờ từ khóa kích hoạt...");
    }
    
    delay(2000); // Main thread delay thoải mái mà không ảnh hưởng tới tốc độ lấy mẫu của mic
}

// ==========================================
// THREAD NHẬN DIỆN GIỌNG NÓI OFFLINE (CORE 0)
// ==========================================
void wakeup_detection_task(void *pvParameters) {
    // Đọc song song 2 mic (Stereo) yêu cầu bộ đệm lớn gấp đôi (FFT_SAMPLES * 2)
    // Các mẫu âm thanh xen kẽ trong buffer: [Trái_0, Phải_0, Trái_1, Phải_1, ...]
    int16_t stereo_samples[FFT_SAMPLES * 2];
    size_t bytes_read = 0;

    for (;;) {
        int feature_index = 0;

        // Quét liên tục để gom đủ dữ liệu cho các hàng của Spectrogram
        for (int row = 0; row < SPEC_ROWS; row++) {
            // 1. Đọc một khung (Frame) tín hiệu Stereo từ 2 Mic I2S
            // Hàm này tự động block/yield cho scheduler khi đang chờ dữ liệu từ DMA của I2S
            i2s_read(I2S_PORT, &stereo_samples, sizeof(stereo_samples), &bytes_read, portMAX_DELAY);
            int total_samples = bytes_read / sizeof(int16_t);
            int num_frames = total_samples / 2; // Số khung mẫu thực tế đọc được (mỗi khung gồm Trái + Phải)

            // 2. Chuẩn bị dữ liệu cho thuật toán FFT (Cộng gộp & trung bình 2 mic để lọc nhiễu)
            for (int i = 0; i < FFT_SAMPLES; i++) {
                if (i < num_frames) {
                    int16_t left_channel = stereo_samples[2 * i];
                    int16_t right_channel = stereo_samples[2 * i + 1];
                    
                    // Trung bình cộng tín hiệu của Mic Trái & Mic Phải
                    // Tín hiệu trùng pha (giọng nói) sẽ cộng hưởng, nhiễu ngẫu nhiên lệch pha sẽ triệt tiêu bớt
                    int32_t mixed_sample = ((int32_t)left_channel + (int32_t)right_channel) / 2;
                    
                    vReal[i] = (float)mixed_sample / 32768.0; // Chuẩn hóa biên độ về [-1.0, 1.0]
                } else {
                    vReal[i] = 0.0;
                }
                vImag[i] = 0.0;
            }

            // 3. Thực thi thuật toán biến đổi Fourier (FFT) trên chip
            FFT.windowing(vReal, FFT_SAMPLES, FFT_WIN_TYP_HAMMING, FFT_FORWARD);
            FFT.compute(vReal, vImag, FFT_SAMPLES, FFT_FORWARD);
            FFT.complexToMagnitude(vReal, vImag, FFT_SAMPLES);

            // 4. Trích xuất các cột tần số (Cắt lấy số cột SPEC_COLS giống Python)
            for (int col = 0; col < SPEC_COLS; col++) {
                float amplitude = vReal[col];
                
                // Biến đổi logarit tương đương hàm `np.log(matrix_2d + 1e-6)` trong train.py
                float log_amplitude = log(amplitude + 1e-6);

                // Ép thang đo về kiểu INT8 [-128, 127] theo chuẩn Quantization
                int8_t quantized_value = (int8_t)constrain(log_amplitude * 10.0, -128.0, 127.0);

                if (feature_index < INPUT_SIZE) {
                    spectrogram_features[feature_index++] = quantized_value;
                }
            }
        }

        // 5. Đẩy toàn bộ "bức ảnh phổ" vừa chụp trực tiếp vào Model AI để phân loại (Inference)
        int class_id = ml.predictClass(spectrogram_features);
        float probability = ml.getProbability(); // Lấy độ tin cậy % của nhãn dự đoán

        // 6. Kiểm tra kết quả trùng khớp với từ khóa
        // Class [1] là nhãn "du_oi"
        if (class_id == 1 && probability > 0.82) { 
            last_wakeup_time = millis(); // Ghi nhận thời điểm kích hoạt
            
            Serial.print("🔥 [THREAD AI] Đã nhận diện tiếng Việt 'du ơi'! Độ tin cậy: ");
            Serial.print(probability * 100);
            Serial.print("% | Thời điểm: ");
            Serial.print(last_wakeup_time);
            Serial.println(" ms");

            // --- ĐÂY LÀ NƠI BẠN GỌI LÊN GEMINI CLOUD ---
            // Kịch bản tiếp theo: 
            // 1. Tắt chế độ AI Offline này tạm thời.
            // 2. Kích hoạt kết nối WiFiClientSecure để thiết lập kết nối HTTPS bảo mật.
            // 3. Thu âm thêm một chuỗi buffer dài khoảng 3-5 giây (Ghi thẳng vào 8MB PSRAM thênh thang).
            // 4. Mã hóa Base64 chuỗi đó rồi POST/Stream thẳng lên Gemini API để xử lý câu lệnh thông minh!
            
            vTaskDelay(pdMS_TO_TICKS(3000)); // Tạm dừng 3 giây tránh bị trùng lặp lệnh kích hoạt liên tiếp
        }
        
        // Nghỉ 10ms giữa mỗi lần suy luận để giải phóng CPU khi rảnh rỗi
        vTaskDelay(pdMS_TO_TICKS(10));
    }
}
