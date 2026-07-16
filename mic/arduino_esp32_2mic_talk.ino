#include <Arduino.h>
#include <driver/i2s.h>
#include <arduinoFFT.h>
#include <EloquentTinyML.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <WebSocketsClient.h> // Yêu cầu cài thư viện: WebSockets (bởi Markus Sattler)
#include <ArduinoJson.h>     // Yêu cầu cài thư viện: ArduinoJson (bởi Benoit Blanchon)
#include "model_data.h"      // File chứa mảng Hex INT8 model.tflite của bạn

// ==========================================
// CẤU HÌNH WIFI & GEMINI LIVE API
// ==========================================
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* gemini_api_key = "YOUR_GEMINI_API_KEY";

// Mô hình Gemini Live hỗ trợ WebSockets đa phương thức thời gian thực
const char* gemini_live_model = "gemini-3.1-flash-live-preview"; 

// ==========================================
// THAM SỐ CẤU HÌNH PHẦN CỨNG (2 MIC INMP441 & 1 LOA MAX98357A)
// ==========================================
// 1. Cổng I2S Đầu Vào (I2S Input - Cho 2 Mic INMP441 song song)
#define I2S_PORT_IN  I2S_NUM_0
#define I2S_IN_WS    17  // Chân WS chung của 2 mic (ESP32-S3 GPIO 17)
#define I2S_IN_SD    18  // Chân SD chung của 2 mic (ESP32-S3 GPIO 18)
#define I2S_IN_SCK   16  // Chân SCK chung của 2 mic (ESP32-S3 GPIO 16)

// Hướng dẫn đấu nối 2 Mic (Stereo):
// - Mic 1 (Left Channel): Chân L/R đấu xuống GND (Ground)
// - Mic 2 (Right Channel): Chân L/R đấu lên 3.3V (VDD)
// - Các chân WS, SD, SCK, VDD, GND của cả 2 mic đấu chung vào ESP32 tương ứng ở trên.

// 2. Cổng I2S Đầu Ra (I2S Output - Cho Mạch Khuếch Đại MAX98357A + Loa)
#define I2S_PORT_OUT I2S_NUM_1
#define I2S_OUT_BCLK 14  // Chân BCLK (SCK) của loa
#define I2S_OUT_LRC  15  // Chân LRC (WS) của loa
#define I2S_OUT_DIN  13  // Chân DIN (SD) của loa

// ==========================================
// THAM SỐ PHÂN TÍCH ÂM THANH & TẦN SỐ LẤY MẪU
// ==========================================
#define INPUT_SAMPLING_RATE   16000 // Tần số lấy mẫu mic đầu vào (16kHz để chạy FFT & AI)
#define OUTPUT_SAMPLING_RATE  24000 // Tần số lấy mẫu phát loa đầu ra (Gemini Live trả về 24kHz)
#define NUM_CLASSES           3     // Số lượng nhãn (background, oi_gemini, unknown)

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
// BỘ ĐỆM ĐỌC MIC CHUYÊN DỤNG (TRÁNH TRÀN STACK)
// ==========================================
#define CHUNK_FRAMES 1024 // Đọc 1024 mẫu khung (64ms mỗi lần truyền) để mạng truyền mượt mà
int16_t mic_buffer[CHUNK_FRAMES * 2]; // Bộ đệm đọc stereo I2S
int16_t mono_buffer[CHUNK_FRAMES];   // Bộ đệm trộn mono sau xử lý

// ==========================================
// CÁC BIẾN THEO DÕI TRẠNG THÁI & LIÊN THÔNG THREAD
// ==========================================
volatile unsigned long last_wakeup_time = 0; // Lưu thời gian (ms) nhận diện từ khóa lần cuối
volatile bool is_busy = false;               // Khóa luồng AI Offline khi đang hoạt động Live Chat
volatile bool should_start_chat = false;     // Cờ báo hiệu kích hoạt kết nối WebSocket Live Chat
volatile bool live_chat_active = false;      // Trạng thái đang đàm thoại trực tiếp với Gemini

unsigned long last_interaction_time = 0;     // Dùng để tính toán Timeout ngắt kết nối (mặc định 15s im lặng)
unsigned long last_model_audio_time = 0;     // Thời điểm cuối mô hình phát tiếng ra loa (dùng chặn Echo vọng ngược vào mic)

// Khởi tạo thực thể WebSocket Client
WebSocketsClient webSocket;

// Các khai báo hàm
void wakeup_detection_task(void *pvParameters);
void init_i2s_input();
void init_i2s_output();
void init_wifi();
void play_beep(int frequency, int duration_ms);
void connect_live_chat();
void disconnect_live_chat();
void send_setup_message();
void stream_mic_to_websocket();
void handle_websocket_message(uint8_t * payload, size_t length);
void webSocketEvent(WStype_t type, uint8_t * payload, size_t length);
size_t base64_decode_to_buf(const char* input, size_t input_len, uint8_t* output);
void base64_encode_to_buf(const uint8_t *input, size_t input_len, char *output);

// ==========================================
// SETUP & INITIALIZATION
// ==========================================
void setup() {
    Serial.begin(921600);
    while (!Serial);
    
    Serial.println("Initializing Audio AI & Gemini Live Streaming System...");
    
    init_i2s_input();
    init_i2s_output();
    
    // Kết nối mạng WiFi
    init_wifi();

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
    if (live_chat_active) {
        // Thực thi vòng lặp duy trì giao tiếp WebSocket
        webSocket.loop();
        
        // Đọc liên tục micro và đẩy lên Live API qua WebSocket
        stream_mic_to_websocket();
        
        // Kiểm tra Timeout im lặng (Tự động ngắt sau 15 giây không có tương tác để về chế độ chờ)
        if (millis() - last_interaction_time > 15000) {
            Serial.println("⏰ Hết thời gian đàm thoại (15s im lặng), ngắt kết nối Live...");
            disconnect_live_chat();
        }
    } else {
        // Đợi cờ kích hoạt từ Core 0 khi phát hiện Wake-word
        if (should_start_chat) {
            should_start_chat = false;
            connect_live_chat();
        }
    }
    
    // Giải phóng CPU thời gian ngắn cho hệ thống
    delay(2);
}

// ==========================================
// CẤU HÌNH DRIVER I2S CHO 2 MIC (INPUT - PORT 0)
// ==========================================
void init_i2s_input() {
    i2s_config_t i2s_config = {
        .mode = (i2s_mode_t)(I2S_MODE_MASTER | I2S_MODE_RX),
        .sample_rate = INPUT_SAMPLING_RATE,
        .bits_per_sample = I2S_BITS_PER_SAMPLE_16BIT,
        .channel_format = I2S_CHANNEL_FMT_RIGHT_LEFT, // Đọc song song cả 2 kênh (Trái và Phải)
        .communication_format = I2S_COMM_FORMAT_STAND_I2S,
        .intr_alloc_flags = ESP_INTR_FLAG_LEVEL1,
        .dma_buf_count = 8,
        .dma_buf_len = 512,
        .use_apll = false
    };

    i2s_pin_config_t pin_config = {
        .bck_io_num = I2S_IN_SCK,
        .ws_io_num = I2S_IN_WS,
        .data_out_num = I2S_PIN_NO_CHANGE,
        .data_in_num = I2S_IN_SD
    };

    i2s_driver_install(I2S_PORT_IN, &i2s_config, 0, NULL);
    i2s_set_pin(I2S_PORT_IN, &pin_config);
}

// ==========================================
// CẤU HÌNH DRIVER I2S CHO LOA (OUTPUT - PORT 1)
// ==========================================
void init_i2s_output() {
    i2s_config_t i2s_config = {
        .mode = (i2s_mode_t)(I2S_MODE_MASTER | I2S_MODE_TX),
        .sample_rate = OUTPUT_SAMPLING_RATE, // Cấu hình chuẩn 24kHz
        .bits_per_sample = I2S_BITS_PER_SAMPLE_16BIT,
        .channel_format = I2S_CHANNEL_FMT_RIGHT_LEFT, // Stereo Output
        .communication_format = I2S_COMM_FORMAT_STAND_I2S,
        .intr_alloc_flags = ESP_INTR_FLAG_LEVEL1,
        .dma_buf_count = 8,
        .dma_buf_len = 512,
        .use_apll = false
    };

    i2s_pin_config_t pin_config = {
        .bck_io_num = I2S_OUT_BCLK,
        .ws_io_num = I2S_OUT_LRC,
        .data_out_num = I2S_OUT_DIN,
        .data_in_num = I2S_PIN_NO_CHANGE
    };

    i2s_driver_install(I2S_PORT_OUT, &i2s_config, 0, NULL);
    i2s_set_pin(I2S_PORT_OUT, &pin_config);
}

// ==========================================
// KẾT NỐI WIFI
// ==========================================
void init_wifi() {
    Serial.printf("Connecting to %s ", ssid);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("\n🚀 WiFi connected!");
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());
}

// ==========================================
// PHÁT BEEP ĐỂ TIỆN THEO DÕI TRẠNG THÁI LOA
// ==========================================
void play_beep(int frequency, int duration_ms) {
    int samples = (OUTPUT_SAMPLING_RATE * duration_ms) / 1000;
    int16_t* beep_buf = NULL;
    
    if (psramFound()) {
        beep_buf = (int16_t*)ps_malloc(samples * 2 * sizeof(int16_t));
    } else {
        beep_buf = (int16_t*)malloc(samples * 2 * sizeof(int16_t));
    }
    
    if (!beep_buf) return;
    
    for (int i = 0; i < samples; i++) {
        int16_t val = (int16_t)(10000.0 * sin(2.0 * PI * frequency * i / (float)OUTPUT_SAMPLING_RATE));
        beep_buf[2 * i] = val;     // Kênh Trái
        beep_buf[2 * i + 1] = val; // Kênh Phải
    }
    
    size_t bytes_written;
    i2s_write(I2S_PORT_OUT, beep_buf, samples * 2 * sizeof(int16_t), &bytes_written, portMAX_DELAY);
    free(beep_buf);
}

// ==========================================
// KHỞI ĐẦU PHIÊN ĐÀM THOẠI WEBSOCKET
// ==========================================
void connect_live_chat() {
    Serial.println("🌐 Đang kết nối lên Gemini Live API qua WebSockets...");
    
    // Đường dẫn API thời gian thực hai chiều (BidiGenerateContent)
    String path = "/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=" + String(gemini_api_key);
    
    // Khởi tạo kết nối SSL
    webSocket.beginSslWithCA("generativelanguage.googleapis.com", 443, path.c_str(), nullptr, "wss");
    webSocket.onEvent(webSocketEvent);
    
    // Kích hoạt nhịp tim Ping/Pong duy trì đường truyền chống tự động ngắt
    webSocket.enableHeartbeat(10000, 3000, 2);
}

// ==========================================
// ĐÓNG PHIÊN ĐÀM THOẠI WEBSOCKET
// ==========================================
void disconnect_live_chat() {
    Serial.println("🔌 Đóng kết nối Live Chat. Chuyển về trạng thái chờ...");
    webSocket.disconnect();
    live_chat_active = false;
    
    // Tiếng bíp giảm tần số báo tắt máy
    play_beep(440, 150);
    delay(50);
    play_beep(330, 250);
    
    // Reset cờ điều khiển để Core 0 tiếp tục quét Wake-word
    is_busy = false;
}

// ==========================================
// GỬI TIN NHẮN THIẾT LẬP BAN ĐẦU (SETUP)
// ==========================================
void send_setup_message() {
    // Tạo cấu trúc JSON thiết lập yêu cầu trả về bằng ÂM THANH
    String setup_json = 
    "{"
      "\"setup\": {"
        "\"model\": \"" + String(gemini_live_model) + "\","
        "\"generationConfig\": {"
          "\"responseModalities\": [\"AUDIO\"],"
          "\"speechConfig\": {"
            "\"voiceConfig\": {"
              "\"prebuiltVoiceConfig\": {"
                "\"voiceName\": \"Aoede\"" // Các giọng đọc chuẩn: Aoede, Charon, Fenrir, Kore, Puck
              "}"
            "}"
          "}"
        "}"
      "}"
    "}";
    
    webSocket.sendTXT(setup_json);
    Serial.println("⚙️ Đã gửi cấu hình Setup thành công!");
    
    // Đánh dấu luồng đàm thoại hoạt động
    live_chat_active = true;
    last_interaction_time = millis();
    
    // Phát âm thanh báo hiệu sẵn sàng giao tiếp
    play_beep(660, 100);
    delay(50);
    play_beep(880, 100);
}

// ==========================================
// ĐỌC VÀ TRUYỀN PHÁT LUỒNG ÂM THANH TỪ MIC LÊN WEBSOCKET
// ==========================================
void stream_mic_to_websocket() {
    // THỦ THUẬT CHỐNG VỌNG ÂM (ECHO SUPPRESSION):
    // Nếu mô hình vừa mới phát tiếng ra loa trong vòng 500ms qua, ta bỏ qua không gửi dữ liệu mic
    // Điều này ngăn ngừa âm thanh từ loa phát ra dội ngược vào micro tạo ra vòng lặp phản hồi âm.
    if (millis() - last_model_audio_time < 500) {
        return;
    }

    size_t bytes_read = 0;
    // Đọc một gói tín hiệu Stereo từ 2 Mic I2S (Khối này block tự nhiên để điều tiết nhịp truyền)
    i2s_read(I2S_PORT_IN, &mic_buffer, sizeof(mic_buffer), &bytes_read, portMAX_DELAY);
    int total_samples = bytes_read / sizeof(int16_t);
    int num_frames = total_samples / 2;
    
    if (num_frames <= 0) return;
    
    // Trộn hai kênh Trái & Phải thành Mono
    for (int i = 0; i < num_frames; i++) {
        int16_t left = mic_buffer[2 * i];
        int16_t right = mic_buffer[2 * i + 1];
        int32_t mixed = ((int32_t)left + (int32_t)right) / 2;
        mono_buffer[i] = (int16_t)mixed;
    }
    
    // Mã hóa Base64 gói âm thanh Mono thô vừa trộn
    size_t raw_bytes = num_frames * sizeof(int16_t);
    size_t b64_size = ((raw_bytes + 2) / 3) * 4 + 1;
    char* b64_buf = (char*)malloc(b64_size);
    if (!b64_buf) return;
    
    base64_encode_to_buf((uint8_t*)mono_buffer, raw_bytes, b64_buf);
    
    // Định dạng gói tin JSON realtimeInput gửi lên API Gemini
    String json_msg = "{\"realtimeInput\":{\"mediaChunks\":[{\"mimeType\":\"audio/pcm;rate=16000\",\"data\":\"" + String(b64_buf) + "\"}]}}";
    webSocket.sendTXT(json_msg);
    
    free(b64_buf);
}

// ==========================================
// PHÂN TÍCH VÀ PHÁT AUDIO KHUẾCH ĐẠI TỪ WEBSOCKET
// ==========================================
void handle_websocket_message(uint8_t * payload, size_t length) {
    JsonDocument doc;
    DeserializationError error = deserializeJson(doc, payload, length);
    if (error) return; // Bỏ qua gói lỗi cấu trúc nếu đường truyền chập chờn
    
    // Cập nhật tương tác để tránh bị Timeout ngắt kết nối
    last_interaction_time = millis();
    
    if (doc.containsKey("serverContent")) {
        JsonObject serverContent = doc["serverContent"];
        
        // Xử lý khi Gemini trả dữ liệu mô hình đàm thoại
        if (serverContent.containsKey("modelTurn")) {
            JsonArray parts = serverContent["modelTurn"]["parts"];
            for (JsonObject part : parts) {
                if (part.containsKey("inlineData")) {
                    String base64Data = part["inlineData"]["data"];
                    
                    // Cập nhật thời điểm phát âm thanh ra loa để tạm dừng mic (Chống Echo)
                    last_model_audio_time = millis();
                    
                    // Giải mã Base64 âm thanh nhận được
                    size_t input_len = base64Data.length();
                    size_t output_len = (input_len / 4) * 3; 
                    uint8_t* decoded_buf = (uint8_t*)malloc(output_len);
                    
                    if (decoded_buf) {
                        size_t actual_len = base64_decode_to_buf(base64Data.c_str(), input_len, decoded_buf);
                        
                        // ĐỊNH HÌNH TỪ MONO SANG STEREO ĐỂ PHÁT LOA ĐÚNG TỐC ĐỘ:
                        // Âm thanh ra từ Gemini Live là PCM Mono 24kHz. Để phát trên cổng I2S Stereo đúng tần số,
                        // ta nhân đôi mỗi mẫu Mono sang cả kênh Trái và kênh Phải.
                        size_t num_samples = actual_len / sizeof(int16_t);
                        int16_t* stereo_play_buf = (int16_t*)malloc(num_samples * 2 * sizeof(int16_t));
                        if (stereo_play_buf) {
                            int16_t* mono_play_buf = (int16_t*)decoded_buf;
                            for (size_t i = 0; i < num_samples; i++) {
                                stereo_play_buf[2 * i] = mono_play_buf[i];     // Kênh Trái
                                stereo_play_buf[2 * i + 1] = mono_play_buf[i]; // Kênh Phải
                            }
                            
                            size_t bytes_written;
                            // Ghi trực tiếp ra I2S Output (24kHz)
                            i2s_write(I2S_PORT_OUT, stereo_play_buf, num_samples * 2 * sizeof(int16_t), &bytes_written, portMAX_DELAY);
                            free(stereo_play_buf);
                        }
                        
                        free(decoded_buf);
                    }
                }
            }
        }
        
        if (serverContent["turnComplete"] == true) {
            Serial.println("🤖 Gemini kết thúc câu trả lời thoại.");
        }
    }
}

// ==========================================
// QUẢN LÝ CÁC SỰ KIỆN KẾT NỐI WEBSOCKET
// ==========================================
void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
    switch(type) {
        case WStype_DISCONNECTED:
            Serial.println("🔌 Ngắt kết nối WebSocket!");
            live_chat_active = false;
            is_busy = false;
            break;
        case WStype_CONNECTED:
            Serial.println("🔌 Kết nối WebSocket thành công!");
            send_setup_message();
            break;
        case WStype_TEXT:
            handle_websocket_message(payload, length);
            break;
        case WStype_BIN:
            break;
        case WStype_ERROR:
            Serial.println("❌ Lỗi kết nối WebSocket!");
            break;
    }
}

// ==========================================
// HÀM BỔ TRỢ GIẢI MÃ BASE64 SẠCH
// ==========================================
const uint8_t b64_lookup[] = {
    64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64,
    64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64,
    64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 62, 64, 64, 64, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 64, 64, 64, 64, 64, 64,
    64,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 64, 64, 64, 64, 64,
    64, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 64, 64, 64, 64, 64
};

size_t base64_decode_to_buf(const char* input, size_t input_len, uint8_t* output) {
    if (input_len % 4 != 0) return 0;
    size_t out_len = (input_len / 4) * 3;
    if (input[input_len - 1] == '=') out_len--;
    if (input[input_len - 2] == '=') out_len--;

    size_t i = 0, j = 0;
    while (i < input_len) {
        uint32_t sextet_a = input[i] < 128 ? b64_lookup[(uint8_t)input[i]] : 64;
        uint32_t sextet_b = input[i+1] < 128 ? b64_lookup[(uint8_t)input[i+1]] : 64;
        uint32_t sextet_c = input[i+2] < 128 ? b64_lookup[(uint8_t)input[i+2]] : 64;
        uint32_t sextet_d = input[i+3] < 128 ? b64_lookup[(uint8_t)input[i+3]] : 64;
        i += 4;

        uint32_t triple = (sextet_a << 3 * 6) + (sextet_b << 2 * 6) + (sextet_c << 1 * 6) + sextet_d;

        if (j < out_len) output[j++] = (triple >> 2 * 8) & 0xFF;
        if (j < out_len) output[j++] = (triple >> 1 * 8) & 0xFF;
        if (j < out_len) output[j++] = (triple >> 0 * 8) & 0xFF;
    }
    return out_len;
}

// ==========================================
// HÀM BỔ TRỢ MÃ HÓA BASE64 SẠCH
// ==========================================
void base64_encode_to_buf(const uint8_t *input, size_t input_len, char *output) {
    const char b64_chars[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    size_t i = 0;
    size_t j = 0;
    
    while (i < input_len) {
        uint32_t octet_a = i < input_len ? input[i++] : 0;
        uint32_t octet_b = i < input_len ? input[i++] : 0;
        uint32_t octet_c = i < input_len ? input[i++] : 0;

        uint32_t triple = (octet_a << 0x10) + (octet_b << 0x08) + octet_c;

        output[j++] = b64_chars[(triple >> 3 * 6) & 0x3F];
        output[j++] = b64_chars[(triple >> 2 * 6) & 0x3F];
        output[j++] = b64_chars[(triple >> 1 * 6) & 0x3F];
        output[j++] = b64_chars[(triple >> 0 * 6) & 0x3F];
    }
    
    size_t mod = input_len % 3;
    if (mod == 1) {
        output[j - 2] = '=';
        output[j - 1] = '=';
    } else if (mod == 2) {
        output[j - 1] = '=';
    }
    output[j] = '\0';
}

// ==========================================
// THREAD NHẬN DIỆN GIỌNG NÓI OFFLINE (CORE 0)
// ==========================================
void wakeup_detection_task(void *pvParameters) {
    int16_t stereo_samples[FFT_SAMPLES * 2];
    size_t bytes_read = 0;

    for (;;) {
        // Tạm dừng quét Wake-word khi cuộc đàm thoại đang diễn ra
        if (is_busy) {
            vTaskDelay(pdMS_TO_TICKS(100));
            continue;
        }

        int feature_index = 0;

        // Quét liên tục gom đủ hàng Spectrogram
        for (int row = 0; row < SPEC_ROWS; row++) {
            i2s_read(I2S_PORT_IN, &stereo_samples, sizeof(stereo_samples), &bytes_read, portMAX_DELAY);
            int total_samples = bytes_read / sizeof(int16_t);
            int num_frames = total_samples / 2;

            for (int i = 0; i < FFT_SAMPLES; i++) {
                if (i < num_frames) {
                    int16_t left_channel = stereo_samples[2 * i];
                    int16_t right_channel = stereo_samples[2 * i + 1];
                    int32_t mixed_sample = ((int32_t)left_channel + (int32_t)right_channel) / 2;
                    
                    vReal[i] = (float)mixed_sample / 32768.0; 
                } else {
                    vReal[i] = 0.0;
                }
                vImag[i] = 0.0;
            }

            FFT.windowing(vReal, FFT_SAMPLES, FFT_WIN_TYP_HAMMING, FFT_FORWARD);
            FFT.compute(vReal, vImag, FFT_SAMPLES, FFT_FORWARD);
            FFT.complexToMagnitude(vReal, vImag, FFT_SAMPLES);

            for (int col = 0; col < SPEC_COLS; col++) {
                float amplitude = vReal[col];
                float log_amplitude = log(amplitude + 1e-6);
                int8_t quantized_value = (int8_t)constrain(log_amplitude * 10.0, -128.0, 127.0);

                if (feature_index < INPUT_SIZE) {
                    spectrogram_features[feature_index++] = quantized_value;
                }
            }
        }

        int class_id = ml.predictClass(spectrogram_features);
        float probability = ml.getProbability(); 

        if (class_id == 1 && probability > 0.82) { 
            last_wakeup_time = millis();
            
            Serial.print("🔥 [THREAD AI] Đã nhận diện tiếng Việt 'du ơi'! Độ tin cậy: ");
            Serial.print(probability * 100);
            Serial.println("%");

            // Kích hoạt trạng thái chuyển đổi chế độ
            is_busy = true;
            should_start_chat = true;
        }
        
        vTaskDelay(pdMS_TO_TICKS(10));
    }
}
