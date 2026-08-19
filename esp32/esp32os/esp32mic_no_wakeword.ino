// esp32mic_no_wakeword.ino - Microphone Streaming & Speaker Playback with ESP32 Hub (No TFLite Wake-word)
// Cap nhat 20: Bo TFLite Micro wake-word de giai phong >300KB RAM va >1.4MB Flash cho cac tac vu khac.

#include <WiFiClientSecure.h>
#include <WebSocketsClient.h>
#include <ArduinoJson.h>

// Gemini Live configuration and state variables
extern String gemini_model;
extern String gemini_api_key;
extern String hub_host;
extern int hub_port;
extern Preferences preferences;
WebSocketsClient webSocket;
volatile bool live_chat_active = false;
unsigned long last_interaction_time = 0;
unsigned long last_model_audio_time = 0;
volatile int32_t current_utterance_max_volume = 0;
volatile bool ignore_current_turn = false;
volatile bool setup_complete_received = false;
#define LOUD_THRESHOLD 15000

// Microphone Mode:
// Set to 1 to use both microphones (mixes Left and Right channels for 3dB SNR boost).
// Set to 0 to use only 1 microphone (Left channel - L/R pin connected to GND).
#define USE_DUAL_MIC 1

// Dunp config imports and fallback resolution
#define firebase_project_id config_firebase_project_id
#define firebase_api_key config_firebase_api_key
#include "../detect_wakeup/dunp_config.h"
#undef firebase_project_id
#undef firebase_api_key

// Firebase helper functions defined in esp32firebase.ino
extern bool delete_hub_ip_from_firestore();
extern bool get_hub_ip_from_firestore(String &out_ip, int &out_port);

// Display helper functions defined in esp32display.ino
extern void displaySetUserText(const String& userText);
extern void displayAppendModelText(const String& textChunk);
extern void displaySetChatStatus(const String& status);
extern void displayEndChatTurn();

// State variables for Hub resolution
String current_hub_host = "";
int current_hub_port = 8888;
bool has_deleted_ip_document = false;
String current_hub_ip = "";
bool is_using_fallback_ip = false;
unsigned long last_firestore_check_time = 0;
unsigned long last_reconnect_attempt = 0;

// Structures for non-blocking Queue processing
struct AudioPacket {
    int16_t* buffer;
    size_t num_samples;
};
struct MicPacket {
    int16_t* buffer;
    size_t num_samples;
};

QueueHandle_t audio_play_queue = NULL;
QueueHandle_t mic_queue = NULL;
volatile bool ws_task_running = true;
volatile bool model_speaking_turn = false;
volatile bool is_playing_audio = false;

// Audio buffer for chunk processing (DMA buffers in internal SRAM, Mono on PSRAM/Heap)
#define STREAM_CHUNK_FRAMES 1024
static int32_t* stream_stereo_chunk = nullptr;
static int16_t* stream_mono_chunk = nullptr;

#define SAMPLING_RATE         16000
#define SPEAKER_SAMPLING_RATE 24000

// Allocate memory helper functions
void* safe_malloc(size_t size) {
    void* ptr = heap_caps_malloc(size, MALLOC_CAP_SPIRAM);
    if (ptr == NULL) {
        ptr = malloc(size);
    }
    return ptr;
}

void* dma_malloc(size_t size) {
    void* ptr = heap_caps_malloc(size, MALLOC_CAP_DMA | MALLOC_CAP_INTERNAL);
    if (ptr == NULL) {
        ptr = malloc(size);
    }
    return ptr;
}

// Forward declarations for background tasks and handlers
void audio_playback_task(void *pvParameters);
void mic_recording_task(void *pvParameters);
void webSocketEvent(WStype_t type, uint8_t * payload, size_t length);

// Compatibility stub for EventBus topic "wakeupword"
void onWakeupwordEvent(const String& topic, const String& payload) {
    String msg = payload;
    msg.trim();
    if (msg.indexOf("type:start") != -1 || msg.indexOf("type=start") != -1 || msg == "start") {
        if (!live_chat_active && WiFi.status() == WL_CONNECTED) {
            connect_live_chat();
        }
    } else if (msg.indexOf("type:stop") != -1 || msg.indexOf("type=stop") != -1 || msg == "stop") {
        if (live_chat_active) {
            disconnect_live_chat();
        }
    }
}

// Stub function to maintain compatibility if called elsewhere
void startWakeupDetectionTask() {
    // No-op: TFLite wake word detection is disabled in no_wakeword mode.
    Serial.println("[Mic] TFLite Wake-word detection is disabled (esp32mic_no_wakeword active).");
}

// Configures the I2S driver for 2 INMP441 microphones in parallel (Stereo Mode)
void initMic() {
    i2s_config_t i2s_config = {
        .mode = (i2s_mode_t)(I2S_MODE_MASTER | I2S_MODE_RX),
        .sample_rate = SAMPLING_RATE,
        .bits_per_sample = I2S_BITS_PER_SAMPLE_32BIT, // Must use 32-bit for INMP441 clocks to be stable
        .channel_format = I2S_CHANNEL_FMT_RIGHT_LEFT, // Read both Left (GND) and Right (3.3V) channel mics
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
    
    // Register subscription on EventBus to control the connection state
    subscribe("wakeupword", "MicController", onWakeupwordEvent);

    // Initialize non-blocking audio play and mic queues
    audio_play_queue = xQueueCreate(64, sizeof(AudioPacket));
    mic_queue = xQueueCreate(16, sizeof(MicPacket));
    stream_stereo_chunk = (int32_t*)dma_malloc(STREAM_CHUNK_FRAMES * 2 * sizeof(int32_t));
    stream_mono_chunk = (int16_t*)safe_malloc(STREAM_CHUNK_FRAMES * sizeof(int16_t));

    // Spawn background streaming tasks on Core 1 (High priority 5 for audio playback to prevent stutter)
    xTaskCreatePinnedToCore(
        audio_playback_task,
        "AudioPlayback",
        4096,
        NULL,
        5,
        NULL,
        1
    );

    xTaskCreatePinnedToCore(
        mic_recording_task,
        "MicRecording",
        4096,
        NULL,
        3,
        NULL,
        1
    );

    Serial.println("[Mic] I2S Driver initialized (No Wake-word mode). Streaming tasks & queues created.");
}

// Helper function to write a standard 44-byte WAV header for mono 16-bit PCM at 16kHz
void writeWavHeader(uint8_t* header, int sampleRate, int numChannels, int bitsPerSample, int numSamples) {
    int subChunk2Size = numSamples * numChannels * (bitsPerSample / 8);
    int chunkSize = 36 + subChunk2Size;
    int byteRate = sampleRate * numChannels * (bitsPerSample / 8);
    int blockAlign = numChannels * (bitsPerSample / 8);

    memcpy(header, "RIFF", 4);
    memcpy(header + 4, &chunkSize, 4);
    memcpy(header + 8, "WAVE", 4);
    memcpy(header + 12, "fmt ", 4);
    int subChunk1Size = 16;
    memcpy(header + 16, &subChunk1Size, 4);
    int16_t audioFormat = 1; // PCM
    memcpy(header + 20, &audioFormat, 2);
    int16_t channels = numChannels;
    memcpy(header + 22, &channels, 2);
    memcpy(header + 24, &sampleRate, 4);
    memcpy(header + 28, &byteRate, 4);
    int16_t align = blockAlign;
    memcpy(header + 32, &align, 2);
    int16_t bps = bitsPerSample;
    memcpy(header + 34, &bps, 2);
    memcpy(header + 36, "data", 4);
    memcpy(header + 40, &subChunk2Size, 4);
}

// Record mono PCM audio from mic for the specified number of seconds and format as a WAV file.
// Used for hardware self-test (micSelfTest) on boot.
uint8_t* micRecordWav(int seconds, int* out_wav_size) {
    *out_wav_size = 0;

    const int FULL_SAMPLES = 16000 * seconds;
    const int FALLBACK_SAMPLES = 16000 * 1; // 1s fallback

    int total_samples = 0;
    uint8_t* wav_buf = nullptr;

    int byte_size = 44 + FULL_SAMPLES * sizeof(int16_t);
    wav_buf = (uint8_t*)heap_caps_malloc(byte_size, MALLOC_CAP_SPIRAM);
    if (wav_buf != nullptr) {
        total_samples = FULL_SAMPLES;
        Serial.printf("[Mic] Allocated %d KB on PSRAM for %ds WAV recording.\n", byte_size / 1024, seconds);
    } else {
        int byte_size_fb = 44 + FALLBACK_SAMPLES * sizeof(int16_t);
        wav_buf = (uint8_t*)malloc(byte_size_fb);
        if (wav_buf != nullptr) {
            total_samples = FALLBACK_SAMPLES;
            Serial.println("⚠️ [Mic] PSRAM unavailable — internal heap fallback for WAV recording.");
        } else {
            Serial.println("❌ [Mic] Not enough memory for recording buffer.");
            return nullptr;
        }
    }

    int16_t* audio_data = (int16_t*)(wav_buf + 44);

    const int CHUNK_FRAMES = 320;
    int32_t* stereo_chunk = (int32_t*)malloc(CHUNK_FRAMES * 2 * sizeof(int32_t));
    if (stereo_chunk == nullptr) {
        Serial.println("❌ [Mic] Failed to allocate temporary I2S RX heap buffer!");
        free(wav_buf);
        return nullptr;
    }

    int recorded = 0;
    int last_sec = -1;
    unsigned long start_time = millis();
    const unsigned long TIMEOUT_LIMIT_MS = (seconds + 5) * 1000;

    float duration_s = (float)total_samples / 16000.0f;
    Serial.printf("[Mic] Recording %.0fs WAV for Self-Test...\n", duration_s);

    while (recorded < total_samples) {
        if (millis() - start_time > TIMEOUT_LIMIT_MS) {
            Serial.println("❌ [Mic] Recording timed out!");
            break;
        }

        size_t bytes_read = 0;
        esp_err_t err = i2s_read(I2S_PORT, stereo_chunk, CHUNK_FRAMES * 2 * sizeof(int32_t), &bytes_read, pdMS_TO_TICKS(100));
        
        if (err != ESP_OK || bytes_read == 0) {
            vTaskDelay(pdMS_TO_TICKS(5));
            continue;
        }

        if (bytes_read == CHUNK_FRAMES * 2 * sizeof(int32_t)) {
            int frames = CHUNK_FRAMES;
            for (int i = 0; i < frames && recorded < total_samples; i++) {
                int16_t left_16 = (int16_t)(stereo_chunk[2 * i] >> 16);
#if USE_DUAL_MIC
                int16_t right_16 = (int16_t)(stereo_chunk[2 * i + 1] >> 16);
                int32_t mono = ((int32_t)left_16 + (int32_t)right_16) / 2;
                audio_data[recorded++] = (int16_t)mono;
#else
                audio_data[recorded++] = left_16;
#endif
            }
        }

        int elapsed_s = recorded / 16000;
        if (elapsed_s != last_sec) {
            last_sec = elapsed_s;
            Serial.printf("[Mic]   %ds recorded...\n", elapsed_s);
        }
    }

    free(stereo_chunk);
    stereo_chunk = nullptr;

    // Peak normalization
    if (recorded > 0) {
        int64_t sum = 0;
        for (int i = 0; i < recorded; i++) {
            sum += audio_data[i];
        }
        int16_t mean = (int16_t)(sum / recorded);

        int16_t max_val = 0;
        for (int i = 0; i < recorded; i++) {
            audio_data[i] -= mean;
            int16_t abs_val = abs(audio_data[i]);
            if (abs_val > max_val) max_val = abs_val;
        }

        if (max_val > 0) {
            float scale = 28000.0f / (float)max_val;
            for (int i = 0; i < recorded; i++) {
                int32_t normalized = (int32_t)(audio_data[i] * scale);
                if (normalized > 32767) normalized = 32767;
                else if (normalized < -32768) normalized = -32768;
                audio_data[i] = (int16_t)normalized;
            }
        }
    }

    writeWavHeader(wav_buf, 16000, 1, 16, recorded);
    *out_wav_size = 44 + recorded * sizeof(int16_t);
    return wav_buf;
}

// =========================================================================
// GEMINI LIVE CHATBOT WEBSOCKET IMPLEMENTATION
// =========================================================================
void play_beep(int frequency, int duration_ms) {
    int samples = (24000 * duration_ms) / 1000;
    int16_t* beep_buf = (int16_t*)dma_malloc(samples * 2 * sizeof(int16_t));
    if (!beep_buf) return;
    
    for (int i = 0; i < samples; i++) {
        int16_t val = (int16_t)(10000.0 * sin(2.0 * PI * frequency * i / 24000.0f));
        beep_buf[2 * i] = val;     // Left channel
        beep_buf[2 * i + 1] = val; // Right channel
    }
    
    i2s_set_sample_rates(I2S_PORT_OUT, 24000);
    size_t bytes_written;
    i2s_write(I2S_PORT_OUT, beep_buf, samples * 2 * sizeof(int16_t), &bytes_written, portMAX_DELAY);
    free(beep_buf);
    
    // Silence flush to clear DMA buffer (~170ms)
    int silence_samples = (24000 * 300) / 1000;
    int16_t* silence_buf = (int16_t*)dma_malloc(silence_samples * 2 * sizeof(int16_t));
    if (silence_buf) {
        memset(silence_buf, 0, silence_samples * 2 * sizeof(int16_t));
        i2s_write(I2S_PORT_OUT, silence_buf, silence_samples * 2 * sizeof(int16_t), &bytes_written, portMAX_DELAY);
        free(silence_buf);
    }
}

void connect_live_chat() {
    if (webSocket.isConnected() && setup_complete_received) {
        Serial.println("ℹ️ [Hub] Already connected and setup.");
        return;
    }

    ws_task_running = false;
    vTaskDelay(pdMS_TO_TICKS(50));

    String target_host = current_hub_host;
    int target_port = current_hub_port;

    if (target_host.length() == 0) {
        Serial.println("[Firebase] Attempting to retrieve Hub IP from Firestore...");
        if (get_hub_ip_from_firestore(current_hub_ip, current_hub_port)) {
            target_host = current_hub_ip;
            target_port = current_hub_port;
            is_using_fallback_ip = false;
        } else {
            Serial.printf("⚠️ [Firebase] Could not retrieve IP from Firestore. Falling back to configured Hub: %s:%d\n", hub_host.c_str(), hub_port);
            target_host = hub_host;
            target_port = hub_port;
            is_using_fallback_ip = true;
            last_firestore_check_time = millis();
        }
    }

    Serial.printf("🌐 [Hub] Connecting to esp32hub at ws://%s:%d/ws ...\n", target_host.c_str(), target_port);
    live_chat_active = true;
    setup_complete_received = false;
    model_speaking_turn = false;

    // Clear mic queue
    MicPacket p;
    while (mic_queue != NULL && xQueueReceive(mic_queue, &p, 0) == pdPASS) {
        if (p.buffer) free(p.buffer);
    }

    // TCP connection test
    WiFiClient test_client;
    if (test_client.connect(target_host.c_str(), target_port)) {
        Serial.println("[Hub TCP] Connection verified successfully!");
        test_client.stop();
        current_hub_host = target_host;
        current_hub_port = target_port;
    } else {
        Serial.printf("❌ [Hub TCP] Connection to %s:%d failed! Clearing cache to retry.\n", target_host.c_str(), target_port);
        current_hub_host = "";
        live_chat_active = false;
        ws_task_running = true;
        return;
    }

    // Connect WebSocket to local hub, passing the MAC address for authentication
    String path = "/ws?mac=" + getEspMacAddress();
    webSocket.begin(current_hub_host.c_str(), current_hub_port, path.c_str());
    webSocket.onEvent(webSocketEvent);
    webSocket.enableHeartbeat(10000, 3000, 2);

    ws_task_running = true;
}

void disconnect_live_chat() {
    Serial.println("🔌 [Hub] Disconnecting from Hub...");
    ws_task_running = false;
    vTaskDelay(pdMS_TO_TICKS(50));

    webSocket.disconnect();
    
    live_chat_active = false;
    setup_complete_received = false;
    model_speaking_turn = false;
    has_deleted_ip_document = false;
    
    // Clear audio play queue
    AudioPacket packet;
    while (audio_play_queue != NULL && xQueueReceive(audio_play_queue, &packet, 0) == pdPASS) {
        if (packet.buffer) free(packet.buffer);
    }
    
    // Clear mic queue
    MicPacket p;
    while (mic_queue != NULL && xQueueReceive(mic_queue, &p, 0) == pdPASS) {
        if (p.buffer) free(p.buffer);
    }
    
    // Restore speaker rate to 24kHz
    i2s_set_sample_rates(I2S_PORT_OUT, 24000);

    ws_task_running = true;
}

void stream_mic_to_websocket() {
    if (mic_queue == NULL) return;
    
    MicPacket packet;
    if (xQueueReceive(mic_queue, &packet, 0) == pdPASS) {
        if (packet.buffer) {
            int32_t peak = 0;
            for (size_t i = 0; i < packet.num_samples; i++) {
                int32_t abs_val = abs((int32_t)packet.buffer[i]);
                if (abs_val > peak) peak = abs_val;
            }
            
            if (peak > current_utterance_max_volume) {
                current_utterance_max_volume = peak;
            }
            
            // If user voice activity detected (peak > 1500), refresh interaction timestamp
            if (peak > 1500) {
                last_interaction_time = millis();
            }
            
            size_t raw_bytes = packet.num_samples * sizeof(int16_t);
            bool success = webSocket.sendBIN((uint8_t*)packet.buffer, raw_bytes);
            free(packet.buffer);
            
            if (!success) {
                Serial.println("❌ [Hub] WebSocket send failed!");
            }
        }
    }
}

void handle_binary_audio(uint8_t * payload, size_t length) {
    if (ignore_current_turn) return;
    
    model_speaking_turn = true;
    
    size_t num_samples = length / sizeof(int16_t);
    int16_t* mono_play_buf = (int16_t*)payload;
    int16_t* stereo_play_buf = (int16_t*)safe_malloc(num_samples * 2 * sizeof(int16_t));
    if (stereo_play_buf) {
        for (size_t i = 0; i < num_samples; i++) {
            int32_t val = (int32_t)(mono_play_buf[i] * SPEAKER_VOLUME_BOOST);
            if (val > 32767) val = 32767;
            else if (val < -32768) val = -32768;
            stereo_play_buf[2 * i] = (int16_t)val;     // Left
            stereo_play_buf[2 * i + 1] = (int16_t)val; // Right
        }
        
        AudioPacket packet = { stereo_play_buf, num_samples };
        if (audio_play_queue != NULL && xQueueSend(audio_play_queue, &packet, pdMS_TO_TICKS(100)) == pdPASS) {
            last_model_audio_time = millis();
        } else {
            Serial.println("❌ [Playback] Playback queue full, dropping chunk!");
            free(stereo_play_buf);
        }
    }
}

void handle_websocket_message(uint8_t * payload, size_t length) {
    JsonDocument doc;
    DeserializationError error = deserializeJson(doc, payload, length);
    if (error) {
        Serial.printf("[Hub WS] JSON parse error: %s\n", error.c_str());
        return;
    }
    
    last_interaction_time = millis();
    
    if (doc.containsKey("event")) {
        String event = doc["event"].as<String>();
        if (event == "setup_complete") {
            Serial.println("🤖 [Hub] Setup complete. Streaming mic...");
            
            // Drain I2S RX DMA buffer to prevent initial burst
            size_t discarded_bytes = 0;
            uint8_t temp_buf[256];
            while (i2s_read(I2S_PORT, temp_buf, sizeof(temp_buf), &discarded_bytes, 0) == ESP_OK && discarded_bytes > 0) {
                vTaskDelay(pdMS_TO_TICKS(1));
            }
            Serial.println("[Hub] Drained I2S RX DMA buffer on startup.");
            
            // Clear mic queue
            MicPacket p;
            while (mic_queue != NULL && xQueueReceive(mic_queue, &p, 0) == pdPASS) {
                if (p.buffer) free(p.buffer);
            }
            
            setup_complete_received = true;
            displaySetChatStatus("DANG NGHE");
        } else if (event == "interrupted") {
            Serial.println("\n🛑 Người dùng nói ngắt lời, dừng loa...");
            ignore_current_turn = true;
            model_speaking_turn = false;
            displaySetChatStatus("NGAT LOI");
            
            // Clear the audio play queue
            AudioPacket packet;
            while (audio_play_queue != NULL && xQueueReceive(audio_play_queue, &packet, 0) == pdPASS) {
                if (packet.buffer) free(packet.buffer);
            }
            
            // Clear the mic queue
            MicPacket p;
            while (mic_queue != NULL && xQueueReceive(mic_queue, &p, 0) == pdPASS) {
                if (p.buffer) free(p.buffer);
            }
            
            i2s_zero_dma_buffer(I2S_PORT_OUT);
        } else if (event == "turn_complete") {
            Serial.println("🤖 [Hub] Turn complete.");
            model_speaking_turn = false;
            ignore_current_turn = false;
            displayEndChatTurn();
        } else if (event == "user_transcription") {
            String text = doc["text"].as<String>();
            Serial.printf("🎙️ [User]: '%s'\n", text.c_str());
            displaySetUserText(text);
        } else if (event == "model_transcription") {
            String text = doc["text"].as<String>();
            Serial.printf("🤖 [Du]: '%s'\n", text.c_str());
            displayAppendModelText(text);
        }
    }
}

void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
    switch(type) {
        case WStype_DISCONNECTED:
            Serial.print("🔌 [Hub WS] Disconnected! Close details: ");
            if (payload != NULL && length > 0) {
                Serial.write(payload, length);
                Serial.println();
            } else {
                Serial.println("None");
            }
            live_chat_active = false;
            setup_complete_received = false;
            model_speaking_turn = false;
            has_deleted_ip_document = false;
            i2s_set_sample_rates(I2S_PORT_OUT, SPEAKER_SAMPLING_RATE);
            break;
        case WStype_CONNECTED:
            Serial.println("🔌 [Hub WS] Connection established successfully! Waiting for setup...");
            if (!has_deleted_ip_document) {
                if (delete_hub_ip_from_firestore()) {
                    has_deleted_ip_document = true;
                }
            }
            break;
        case WStype_TEXT:
            handle_websocket_message(payload, length);
            break;
        case WStype_BIN:
            handle_binary_audio(payload, length);
            break;
        case WStype_ERROR:
            Serial.print("❌ [Hub WS] WebSocket error! Details: ");
            if (payload != NULL && length > 0) {
                Serial.write(payload, length);
                Serial.println();
            } else {
                Serial.println("None");
            }
            break;
    }
}

void loopGeminiLive() {
    if (live_chat_active && ws_task_running) {
        webSocket.loop();
        
        if (webSocket.isConnected() && setup_complete_received) {
            stream_mic_to_websocket();
        }
    } else if (WiFi.status() == WL_CONNECTED && !live_chat_active) {
        // Auto-reconnect to Hub every 5 seconds when WiFi is active
        if (millis() - last_reconnect_attempt > 5000) {
            last_reconnect_attempt = millis();
            Serial.println("[Hub Auto-Connect] WiFi active, connecting to ESP32 Hub...");
            connect_live_chat();
        }
    }

    // Periodically poll Firestore if currently connected/connecting via fallback IP
    if (is_using_fallback_ip && WiFi.status() == WL_CONNECTED) {
        if (millis() - last_firestore_check_time > 10000) {
            last_firestore_check_time = millis();
            Serial.println("[Firebase] Periodically checking Firestore for a new Hub IP document...");
            if (get_hub_ip_from_firestore(current_hub_ip, current_hub_port)) {
                if (current_hub_ip != hub_host || current_hub_port != hub_port) {
                    WiFiClient test_client;
                    if (test_client.connect(current_hub_ip.c_str(), current_hub_port)) {
                        test_client.stop();
                        Serial.printf("🟢 [Firebase] Found new Hub IP on Firestore: %s:%d. Reconnecting and auto-saving...\n", current_hub_ip.c_str(), current_hub_port);
                        current_hub_host = current_hub_ip;
                        is_using_fallback_ip = false;

                        // Auto-save to config
                        preferences.begin("hub-config", false);
                        preferences.putString("host", current_hub_host);
                        preferences.putInt("port", current_hub_port);
                        preferences.end();

                        hub_host = current_hub_host;
                        hub_port = current_hub_port;

                        disconnect_live_chat();
                        connect_live_chat();
                    } else {
                        Serial.printf("[Firebase] Resolved new IP %s:%d failed connection test. Not updating.\n", current_hub_ip.c_str(), current_hub_port);
                    }
                }
            }
        }
    }
}

// Background FreeRTOS tasks implementation
void audio_playback_task(void *pvParameters) {
    AudioPacket packet;
    
    while (true) {
        if (audio_play_queue != NULL && xQueueReceive(audio_play_queue, &packet, pdMS_TO_TICKS(100)) == pdPASS) {
            if (!is_playing_audio) {
                is_playing_audio = true;
                i2s_set_sample_rates(I2S_PORT_OUT, 24000); // Enforce 24kHz native rate for Gemini Live
                // Jitter buffer pre-fill: Wait briefly until at least 2 packets are queued
                int prefill_wait = 0;
                while (uxQueueMessagesWaiting(audio_play_queue) < 2 && prefill_wait < 5) {
                    vTaskDelay(pdMS_TO_TICKS(10));
                    prefill_wait++;
                }
            }
            if (packet.buffer) {
                size_t bytes_written = 0;
                i2s_write(I2S_PORT_OUT, packet.buffer, packet.num_samples * 2 * sizeof(int16_t), &bytes_written, portMAX_DELAY);
                last_model_audio_time = millis();
                free(packet.buffer);
            }
        } else {
            if (is_playing_audio) {
                is_playing_audio = false;
                i2s_zero_dma_buffer(I2S_PORT_OUT);
            }
        }
    }
}

void mic_recording_task(void *pvParameters) {
    while (true) {
        if (!live_chat_active || !setup_complete_received) {
            vTaskDelay(pdMS_TO_TICKS(10));
            continue;
        }
        
        // Echo suppression check (while model audio is playing, or within 800ms after last playback)
        bool should_suppress = model_speaking_turn || 
                               is_playing_audio || 
                               (millis() - last_model_audio_time < 800) || 
                               (audio_play_queue != NULL && uxQueueMessagesWaiting(audio_play_queue) > 0);
        
        if (should_suppress) {
            // Discard mic input to prevent echo loop
            size_t bytes_read = 0;
            i2s_read(I2S_PORT, stream_stereo_chunk, STREAM_CHUNK_FRAMES * 2 * sizeof(int32_t), &bytes_read, pdMS_TO_TICKS(50));
            
            // Clear mic queue
            MicPacket p;
            while (mic_queue != NULL && xQueueReceive(mic_queue, &p, 0) == pdPASS) {
                if (p.buffer) free(p.buffer);
            }
            vTaskDelay(pdMS_TO_TICKS(10));
            continue;
        }
        
        size_t bytes_read = 0;
        esp_err_t err = i2s_read(I2S_PORT, stream_stereo_chunk, STREAM_CHUNK_FRAMES * 2 * sizeof(int32_t), &bytes_read, pdMS_TO_TICKS(150));
        if (err == ESP_OK && bytes_read > 0) {
            int frames = bytes_read / (2 * sizeof(int32_t));
            if (frames > 0) {
                int16_t* pcm_buf = (int16_t*)safe_malloc(frames * sizeof(int16_t));
                if (pcm_buf) {
                    for (int i = 0; i < frames; i++) {
                        int16_t left_16 = (int16_t)(stream_stereo_chunk[2 * i] >> 16);
#if USE_DUAL_MIC
                        int16_t right_16 = (int16_t)(stream_stereo_chunk[2 * i + 1] >> 16);
                        pcm_buf[i] = (int16_t)(((int32_t)left_16 + (int32_t)right_16) / 2);
#else
                        pcm_buf[i] = left_16;
#endif
                    }
                    
                    MicPacket packet = { pcm_buf, (size_t)frames };
                    if (mic_queue != NULL && xQueueSend(mic_queue, &packet, 0) != pdPASS) {
                        free(pcm_buf); // Drop if queue full
                    }
                }
            }
        }
        vTaskDelay(pdMS_TO_TICKS(1));
    }
}
