#include <Arduino.h>
#include <driver/i2s.h>
#include <arduinoFFT.h>
#include <EloquentTinyML.h>
#include "model_data.h" // File chứa mảng Hex INT8 model.tflite của bạn

// ==========================================
// THAM SỐ CẤU HÌNH PHẦN CỨNG & AI
// ==========================================
#define I2S_WS      25  // Chân WS của INMP441
#define I2S_SD      22  // Chân SD của INMP441
#define I2S_SCK     26  // Chân SCK của INMP441
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
// CẤU HÌNH DRIVER I2S CHO MIC ĐA HƯỚNG
// ==========================================
void init_i2s() {
    i2s_config_t i2s_config = {
        .mode = (i2s_mode_t)(I2S_MODE_MASTER | I2S_MODE_RX),
        .sample_rate = SAMPLING_RATE,
        .bits_per_sample = I2S_BITS_PER_SAMPLE_16BIT,
        .channel_format = I2S_CHANNEL_FMT_ONLY_LEFT, // Ép về Mono như Python
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
// SETUP & INITIALIZATION
// ==========================================
void setup() {
    Serial.begin(115200);
    while (!Serial);
    
    Serial.println("Initializing Audio AI System...");
    init_i2s();

    // Kiểm tra xem model nạp vào vùng nhớ tĩnh có lỗi không
    if (!ml.begin()) {
        Serial.println("❌ Thất bại khi nạp Model TFLite Micro!");
        while (1) delay(1000);
    }
    Serial.println("🚀 Model AI đã sẵn sàng hoạt động!");
}

// ==========================================
// VÒNG LẶP CHÍNH - NHẬN DIỆN THỜI GIAN THỰC
// ==========================================
void loop() {
    int16_t raw_samples[FFT_SAMPLES];
    size_t bytes_read = 0;
    int feature_index = 0;

    // Quét liên tục để gom đủ dữ liệu cho các hàng của Spectrogram
    for (int row = 0; row < SPEC_ROWS; row++) {
        // 1. Đọc một khung (Frame) tín hiệu từ Mic I2S
        i2s_read(I2S_PORT, &raw_samples, sizeof(raw_samples), &bytes_read, portMAX_DELAY);
        int num_samples = bytes_read / sizeof(int16_t);

        // 2. Chuẩn bị dữ liệu cho thuật toán FFT
        for (int i = 0; i < FFT_SAMPLES; i++) {
            if (i < num_samples) {
                vReal[i] = (float)raw_samples[i] / 32768.0; // Chuẩn hóa biên độ về [-1.0, 1.0] tương tự pydub
            } else {
                vReal[i] = 0.0; // Bù khoảng trống nếu thiếu mẫu
            }
            vImag[i] = 0.0; // Phần ảo luôn bằng 0
        }

        // 3. Thực thi thuật toán biến đổi Fourier (FFT) trên chip
        FFT.windowing(vReal, FFT_SAMPLES, FFT_WIN_TYP_HAMMING, FFT_FORWARD);
        FFT.compute(vReal, vImag, FFT_SAMPLES, FFT_FORWARD);
        FFT.complexToMagnitude(vReal, vImag, FFT_SAMPLES);

        // 4. Trích xuất các cột tần số (Cắt lấy số cột cố định SPEC_COLS giống Python)
        for (int col = 0; col < SPEC_COLS; col++) {
            float amplitude = vReal[col];
            
            // Biến đổi logarit tương đương hàm `np.log(matrix_2d + 1e-6)` trong train.py
            float log_amplitude = log(amplitude + 1e-6);

            // Ép thang đo số thực (Float) về số nguyên kiểu INT8 [-128, 127] 
            // Bước này giả lập lại cơ chế Quantization mà TFLite INT8 yêu cầu đầu vào
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
    // Chú ý: Cần kiểm tra kĩ LOG in ra của Python lúc train để Map chuẩn id nhãn của bạn
    // Giả định: 0 -> Background, 1 -> "du ơi", 2 -> Unknown
    if (class_id == 1 && probability > 0.82) { 
        Serial.print("🔥 [KÍCH HOẠT] Đã nhận diện tiếng Việt 'Ơi Gemini'! Độ tin cậy: ");
        Serial.print(probability * 100);
        Serial.println("%");

        // --- ĐÂY LÀ NƠI BẠN GỌI LÊN GEMINI CLOUD ---
        // Kịch bản tiếp theo: 
        // 1. Tắt chế độ AI Offline này tạm thời.
        // 2. Kích hoạt kết nối WiFiClientSecure để thiết lập kết nối HTTPS bảo mật.
        // 3. Thu âm thêm một chuỗi buffer dài khoảng 3-5 giây (Ghi thẳng vào 8MB PSRAM thênh thang).
        // 4. Mã hóa Base64 chuỗi đó rồi POST/Stream thẳng lên Gemini API để xử lý câu lệnh thông minh!
        
        delay(3000); // Tạm dừng 3 giây tránh bị trùng lặp lệnh kích hoạt liên tiếp
    }
}