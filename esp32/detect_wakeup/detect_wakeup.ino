#include <Arduino.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <WebSocketsClient.h> // Markus Sattler WebSockets Library
#define ARDUINOJSON_DEFAULT_DOCUMENT_ALLOCATOR SpiRamAllocator
#include <ArduinoJson.h>     // Benoit Blanchon ArduinoJson Library
#include <driver/i2s.h>
#include <esp_netif.h>

#include <Preferences.h>
#include "../esp32os/ok_wav.h"

#include "wakeupword_model_data.h"
// =========================================================================
// WIFI & GEMINI LIVE CONFIGURATIONS
// =========================================================================
const char* wifi_ssid = "";
const char* wifi_pass = "";
String gemini_api_key = "";
String gemini_model = "gemini-3.1-flash-live-preview";

// =========================================================================
// HARDWARE PIN CONFIGURATIONS
// =========================================================================
// 1. Microphone Input (I2S RX - Dual INMP441 / Single)
#define I2S_WS          5   // WS pin (ESP32-S3 GPIO 5)
#define I2S_SD          6   // SD pin (ESP32-S3 GPIO 6)
#define I2S_SCK         4   // SCK pin (ESP32-S3 GPIO 4)
#define I2S_PORT        I2S_NUM_0

// Set to 1 to use both microphones (mixes Left and Right channels for 3dB SNR boost).
// Set to 0 to use only 1 microphone (Left channel - L/R pin connected to GND).
#define USE_DUAL_MIC    1

// 2. Speaker Output (I2S TX - MAX98357A)
#define I2S_OUT_BCLK    14  // BCLK (SCK) of speaker (ESP32-S3 GPIO 14)
#define I2S_OUT_LRC     7   // LRC (WS) of speaker (ESP32-S3 GPIO 7)
#define I2S_OUT_DIN     13  // DIN (SD) of speaker (ESP32-S3 GPIO 13)
#define I2S_PORT_OUT    I2S_NUM_1

#define SPEAKER_VOLUME_BOOST 1.0f
#define DISABLE_SPEAKER_OUTPUT 0 // Set to 1 to test if speaker EMI/power sags cause WiFi drops

// =========================================================================
// AUDIO SAMPLING RATES
// =========================================================================
#define SAMPLING_RATE         16000 // Mic input rate (16kHz PCM)
#define SPEAKER_SAMPLING_RATE 16000 // Default speaker rate
#define OUTPUT_SAMPLING_RATE  24000 // Gemini audio output rate (24kHz PCM)
#define LOUD_THRESHOLD        15000 // Amplitude threshold for emergency stop command

// =========================================================================
// STATE VARIABLES
// =========================================================================
WebSocketsClient webSocket;
volatile bool live_chat_active = false;
volatile bool setup_complete_received = false;
volatile bool ignore_current_turn = false;
volatile bool model_speaking_turn = false;
unsigned long last_interaction_time = 0;
unsigned long last_model_audio_time = 0;
volatile bool is_playing_audio = false;
volatile int32_t current_utterance_max_volume = 0;

// Audio buffer for chunk processing
#define CHUNK_FRAMES 1024 // 64ms chunk for 16kHz
int32_t* stereo_chunk = nullptr;
int16_t* mono_chunk = nullptr;
char* b64_buf = nullptr;
char* json_buf = nullptr;

// FreeRTOS Audio Queue & Task structures
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
void audio_playback_task(void *pvParameters);
void mic_recording_task(void *pvParameters);
void gemini_ws_task(void *pvParameters);
void* safe_malloc(size_t size);
void* dma_malloc(size_t size);

// Function prototypes
void initMic();
void initSpeaker();
void connectWiFi();
void setCustomDNS();
void connect_live_chat();
void disconnect_live_chat();
void send_setup_message();
void stream_mic_to_websocket();
void handle_websocket_message(uint8_t * payload, size_t length);
void webSocketEvent(WStype_t type, uint8_t * payload, size_t length);
void play_beep(int frequency, int duration_ms);
void playSilence(int duration_ms);
void playSpeakerWav(const uint8_t* wav_data, size_t wav_len);
size_t base64_decode_to_buf(const char* input, size_t input_len, uint8_t* output);
void base64_encode_to_buf(const uint8_t *input, size_t input_len, char *output);

// Helper for PSRAM allocation
void* safe_malloc(size_t size) {
    void* ptr = heap_caps_malloc(size, MALLOC_CAP_SPIRAM);
    if (ptr == NULL) {
        ptr = malloc(size);
    }
    return ptr;
}

// Helper for DMA-safe internal SRAM allocation
void* dma_malloc(size_t size) {
    void* ptr = heap_caps_malloc(size, MALLOC_CAP_DMA | MALLOC_CAP_INTERNAL);
    if (ptr == NULL) {
        ptr = malloc(size);
    }
    return ptr;
}

// =========================================================================
// SETUP
// =========================================================================
void setup() {
    Serial.begin(1000000);
    delay(1000);

    // Allocate global audio buffers (DMA buffers MUST be in internal SRAM)
    stereo_chunk = (int32_t*)dma_malloc(CHUNK_FRAMES * 2 * sizeof(int32_t));
    mono_chunk = (int16_t*)safe_malloc(CHUNK_FRAMES * sizeof(int16_t));
    b64_buf = (char*)safe_malloc(((CHUNK_FRAMES * 2 * sizeof(int16_t) + 2) / 3) * 4 + 1);
    json_buf = (char*)safe_malloc(120 + ((CHUNK_FRAMES * 2 * sizeof(int16_t) + 2) / 3) * 4 + 1);
    Serial.println("\n====================================");
    Serial.println("  GEMINI LIVE VOICE CHAT INITIALIZING");
    Serial.println("====================================");

    // Try loading API Key and Model Name from NVS preferences
    Preferences preferences;
    preferences.begin("gemini-config", true);
    String saved_key = preferences.getString("api_key", "");
    String saved_model = preferences.getString("model", "");
    preferences.end();

    if (saved_key.length() > 0) {
        gemini_api_key = saved_key;
        Serial.printf("[Gemini] Loaded API key from NVS (first 5 chars: %s...)\n", gemini_api_key.substring(0, 5).c_str());
    } else {
        Serial.println("[Gemini] Using default hardcoded API key.");
    }

    if (saved_model.length() > 0) {
        gemini_model = saved_model;
        Serial.printf("[Gemini] Loaded Model from NVS: %s\n", gemini_model.c_str());
    } else {
        Serial.println("[Gemini] Using default hardcoded Model.");
    }

    initMic();
    initSpeaker();

    // Create FreeRTOS Audio Queue and Playback Task (Limit to 16 to control peak SRAM usage)
    audio_play_queue = xQueueCreate(16, sizeof(AudioPacket));
    xTaskCreatePinnedToCore(
        audio_playback_task,
        "AudioPlayback",
        4096,
        NULL,
        4, // Pinned to Core 1, priority 4
        NULL,
        1  // Pinned to Core 1 (App Core)
    );

    // Create FreeRTOS Mic Queue and Recording Task
    mic_queue = xQueueCreate(16, sizeof(MicPacket));
    xTaskCreatePinnedToCore(
        mic_recording_task,
        "MicRecording",
        4096,
        NULL,
        3, // Pinned to Core 1, priority 3
        NULL,
        1  // Pinned to Core 1 (App Core)
    );

    // Create Dedicated WebSocket Task
    xTaskCreatePinnedToCore(
        gemini_ws_task,
        "GeminiWS",
        8192, // Pinned to Core 1, priority 5 (highest to prevent starvation)
        NULL,
        5,
        NULL,
        1
    );

    // Start wifi connection
    connectWiFi();

    // Test speaker with ok.wav and 1 second of silence
    Serial.println("[Speaker] Testing speaker with ok.wav...");
    playSpeakerWav(ok_wav, ok_wav_len);
    Serial.println("[Speaker] ok.wav finished. Playing 1s silence...");
    playSilence(1000);
    Serial.println("[Speaker] Speaker test complete.");

    // Initial WebSocket call
    connect_live_chat();
}

// =========================================================================
// MAIN LOOP
// =========================================================================
void loop() {
    // Keep WiFi alive
    if (WiFi.status() != WL_CONNECTED) {
        connectWiFi();
    }

    if (live_chat_active) {
        if (setup_complete_received) {
            // Timeout after 60s of silence - disconnect and trigger auto reconnect
            if (millis() - last_interaction_time > 60000) {
                Serial.println("⏰ Inactivity timeout (60s). Disconnecting to refresh session...");
                disconnect_live_chat();
            }
        }
    } else {
        // Auto-reconnect after 3 seconds if inactive
        static unsigned long last_reconnect_attempt = 0;
        if (millis() - last_reconnect_attempt > 3000) {
            last_reconnect_attempt = millis();
            if (WiFi.status() == WL_CONNECTED) {
                connect_live_chat();
            }
        }
    }
    
    delay(10); // Don't yield with delay(1) - let FreeRTOS scheduler give full quanta to gemini_ws_task
}

// =========================================================================
// WIFI MANAGEMENT
// =========================================================================
void setCustomDNS() {
    esp_netif_t *netif = esp_netif_get_handle_from_ifkey("WIFI_STA_DEF");
    if (netif) {
        esp_netif_dns_info_t dns;
        dns.ip.type = IPADDR_TYPE_V4;
        
        dns.ip.u_addr.ip4.addr = (uint32_t)IPAddress(8, 8, 8, 8);
        esp_netif_set_dns_info(netif, ESP_NETIF_DNS_MAIN, &dns);
        
        dns.ip.u_addr.ip4.addr = (uint32_t)IPAddress(1, 1, 1, 1);
        esp_netif_set_dns_info(netif, ESP_NETIF_DNS_BACKUP, &dns);
        Serial.println("[WiFi] Custom DNS configured: 8.8.8.8 & 1.1.1.1");
    }
}

void connectWiFi() {
    if (WiFi.status() == WL_CONNECTED) return;

    Serial.printf("[WiFi] Connecting to SSID: %s\n", wifi_ssid);
    WiFi.mode(WIFI_STA);
    WiFi.begin(wifi_ssid, wifi_pass);
    
    unsigned long start = millis();
    while (WiFi.status() != WL_CONNECTED && millis() - start < 15000) {
        delay(500);
        Serial.print(".");
    }
    Serial.println();
    
    if (WiFi.status() == WL_CONNECTED) {
        Serial.printf("[WiFi] Connected! IP Address: %s\n", WiFi.localIP().toString().c_str());
        WiFi.setSleep(false); // Disable WiFi power save mode to prevent latency/drops during streaming
        // setCustomDNS(); // Commented out to prevent TCP netif/DHCP instability on mesh network
        play_beep(880, 100); // Higher tone for success
    } else {
        Serial.println("❌ [WiFi] Connection timed out! Retrying...");
        play_beep(440, 300); // Error tone
    }
}

// =========================================================================
// HARDWARE INITIALIZATION
// =========================================================================
void initMic() {
    i2s_config_t i2s_config = {
        .mode = (i2s_mode_t)(I2S_MODE_MASTER | I2S_MODE_RX),
        .sample_rate = SAMPLING_RATE,
        .bits_per_sample = I2S_BITS_PER_SAMPLE_32BIT, // Must be 32-bit for stable INMP441 clock
        .channel_format = I2S_CHANNEL_FMT_RIGHT_LEFT, // Read both Left and Right channels
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
    Serial.println("[Mic] Microphone I2S RX driver installed.");
}

void initSpeaker() {
    i2s_config_t i2s_config = {
        .mode = (i2s_mode_t)(I2S_MODE_MASTER | I2S_MODE_TX),
        .sample_rate = SPEAKER_SAMPLING_RATE,
        .bits_per_sample = I2S_BITS_PER_SAMPLE_16BIT,
        .channel_format = I2S_CHANNEL_FMT_RIGHT_LEFT, // Stereo Mode
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
    Serial.println("[Speaker] Speaker I2S TX driver installed.");
}

// =========================================================================
// WEBSOCKET CONNECTIONS
// =========================================================================
void connect_live_chat() {
    if (live_chat_active && setup_complete_received) {
        return;
    }

    ws_task_running = false;
    delay(50); // Yield to let gemini_ws_task exit webSocket.loop()

    Serial.println("🌐 [Gemini] Connecting to Gemini Live WebSockets...");
    live_chat_active = true;
    setup_complete_received = false;
    model_speaking_turn = false;

    // Clear mic queue
    MicPacket p;
    while (mic_queue != NULL && xQueueReceive(mic_queue, &p, 0) == pdPASS) {
        if (p.buffer) free(p.buffer);
    }

    // SSL dry-run test
    WiFiClientSecure test_client;
    test_client.setInsecure();
    if (test_client.connect("generativelanguage.googleapis.com", 443)) {
        Serial.println("[Gemini SSL] SSL Connection handshake verified successfully!");
        test_client.stop();
    } else {
        Serial.println("❌ [Gemini SSL] Handshake failed! Check network/DNS.");
        live_chat_active = false;
        ws_task_running = true;
        return;
    }

    // Connect WebSocket
    String path = "/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=" + gemini_api_key;
    static String extra_headers;
    extra_headers = "x-goog-api-key: " + gemini_api_key;

    webSocket.setExtraHeaders(extra_headers.c_str());
    webSocket.beginSSL("generativelanguage.googleapis.com", 443, path.c_str(), nullptr, "");
    webSocket.onEvent(webSocketEvent);
    webSocket.enableHeartbeat(10000, 3000, 2);

    ws_task_running = true;
}

void disconnect_live_chat() {
    Serial.println("🔌 [Gemini] Disconnecting Live Chat...");
    ws_task_running = false;
    delay(50); // Let gemini_ws_task exit webSocket.loop()

    webSocket.disconnect();
    
    live_chat_active = false;
    setup_complete_received = false;
    model_speaking_turn = false;
    play_beep(400, 150);
    i2s_set_sample_rates(I2S_PORT_OUT, SPEAKER_SAMPLING_RATE);
    
    ws_task_running = true;
}

void send_setup_message() {
    String model_path = String(gemini_model);
    if (!model_path.startsWith("models/")) {
        model_path = "models/" + model_path;
    }

    String setup_json = 
    "{"
      "\"setup\": {"
        "\"model\": \"" + model_path + "\","
        "\"generationConfig\": {"
          "\"responseModalities\": [\"AUDIO\"],"
          "\"speechConfig\": {"
            "\"voice_config\": {"
              "\"prebuilt_voice_config\": {"
                "\"voice_name\": \"Aoede\""
              "}"
            "}"
          "}"
        "},"
        "\"systemInstruction\": {"
          "\"parts\": [{"
            "\"text\": \"Bạn là trợ lý ảo tiếng Việt thông minh có tên là 'Du'. Hãy trả lời cực kỳ ngắn gọn, tự nhiên và trôi chảy như đang hội thoại thực tế.\""
          "}]"
        "},"
        "\"realtimeInputConfig\": {"
          "\"activity_handling\": \"NO_INTERRUPTION\""
        "}"
      "}"
    "}";
    
    bool success = webSocket.sendTXT(setup_json);
    if (success) {
        Serial.println("⚙️ [Gemini] Setup configuration sent.");
    } else {
        Serial.println("❌ [Gemini] Failed to send setup configuration!");
    }
    
    live_chat_active = true;
    last_interaction_time = millis();
    
    // Readiness tone
    play_beep(660, 100);
    delay(50);
    play_beep(880, 100);
}

// =========================================================================
// AUDIO STREAMING
// =========================================================================
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
            
            size_t raw_bytes = packet.num_samples * sizeof(int16_t);
            base64_encode_to_buf((uint8_t*)packet.buffer, raw_bytes, b64_buf);
            free(packet.buffer); // Free the mono buffer immediately
            
            strcpy(json_buf, "{\"realtime_input\":{\"audio\":{\"mimeType\":\"audio/pcm;rate=16000\",\"data\":\"");
            strcat(json_buf, b64_buf);
            strcat(json_buf, "\"}}}");
            
            bool success = webSocket.sendTXT(json_buf);
            if (!success) {
                Serial.println("❌ [Gemini] WebSocket send failed! Queue full?");
            } else {
                static int packet_count = 0;
                if (packet_count++ % 15 == 0) {
                    Serial.printf("[Debug] Sent packet #%d. Size=%d, peak=%d\n", packet_count, strlen(json_buf), peak);
                }
            }
        }
    }
}

// =========================================================================
// WEBSOCKET EVENTS & HANDLERS
// =========================================================================
void handle_websocket_message(uint8_t * payload, size_t length) {
    static JsonDocument doc;
    doc.clear();
    DeserializationError error = deserializeJson(doc, payload, length);
    if (error) {
        Serial.printf("[Gemini WS] JSON parsing error: %s\n", error.c_str());
        return;
    }
    
    last_interaction_time = millis();
    
    if (doc.containsKey("error")) {
        JsonObject err = doc["error"];
        int code = err["code"];
        String message = err["message"].as<String>();
        String status = err["status"].as<String>();
        Serial.printf("❌ [Gemini API Error] %d (%s): %s\n", code, status.c_str(), message.c_str());
        disconnect_live_chat();
        return;
    }
    
    if (doc.containsKey("setupComplete")) {
        Serial.println("🤖 [Gemini] Live session configuration verified. Streaming...");
        
        // Drain I2S RX DMA buffer to prevent immediate burst of old data
        size_t discarded_bytes = 0;
        uint8_t temp_buf[256];
        while (i2s_read(I2S_PORT, temp_buf, sizeof(temp_buf), &discarded_bytes, 0) == ESP_OK && discarded_bytes > 0) {
            delay(1);
        }
        Serial.println("[Gemini] Drained I2S RX DMA buffer on startup.");
        
        // Clear mic queue
        MicPacket p;
        while (mic_queue != NULL && xQueueReceive(mic_queue, &p, 0) == pdPASS) {
            if (p.buffer) free(p.buffer);
        }
        
        setup_complete_received = true;
        return;
    }
    
    if (doc.containsKey("serverContent")) {
        JsonObject serverContent = doc["serverContent"];
        
        // Interrupt detection (barge-in)
        if (serverContent["interrupted"] == true) {
            Serial.println("\n🛑 Interruption detected! Muting speaker...");
            ignore_current_turn = true;
            model_speaking_turn = false;
            
            // Clear the audio play queue
            AudioPacket packet;
            while (audio_play_queue != NULL && xQueueReceive(audio_play_queue, &packet, 0) == pdPASS) {
                if (packet.buffer) {
                    free(packet.buffer);
                }
            }
            
            // Clear the mic queue to prevent echo feedback loop
            MicPacket p;
            while (mic_queue != NULL && xQueueReceive(mic_queue, &p, 0) == pdPASS) {
                if (p.buffer) {
                    free(p.buffer);
                }
            }
            
            i2s_zero_dma_buffer(I2S_PORT_OUT);
        }

        // Voice stop command detection
        if (serverContent.containsKey("inputTranscription")) {
            JsonObject trans = serverContent["inputTranscription"];
            if (trans.containsKey("text")) {
                String text = trans["text"].as<String>();
                if (text.length() > 0) {
                    String text_lower = text;
                    text_lower.toLowerCase();
                    int32_t vol = current_utterance_max_volume;
                    Serial.printf("🎙️ [User Speech]: '%s' (Max Volume: %d)\n", text.c_str(), vol);
                    
                    bool is_stop = (text_lower.indexOf("dừng lại") != -1 || text_lower.indexOf("làm ơn dừng lại") != -1);
                    bool is_loud = (vol >= LOUD_THRESHOLD);
                    if (is_stop && is_loud) {
                        Serial.println("🛑 Emergency stop command trigger. Muting speaker...");
                        ignore_current_turn = true;
                        
                        // Clear the audio play queue
                        AudioPacket packet;
                        while (audio_play_queue != NULL && xQueueReceive(audio_play_queue, &packet, 0) == pdPASS) {
                            if (packet.buffer) {
                                free(packet.buffer);
                            }
                        }
                        
                        // Clear the mic queue
                        MicPacket p;
                        while (mic_queue != NULL && xQueueReceive(mic_queue, &p, 0) == pdPASS) {
                            if (p.buffer) {
                                free(p.buffer);
                            }
                        }
                        
                        i2s_zero_dma_buffer(I2S_PORT_OUT);
                    }
                }
            }
            if (trans["finished"] == true) {
                current_utterance_max_volume = 0; // reset
            }
        }

        // Model audio response playback
        if (serverContent.containsKey("modelTurn")) {
            model_speaking_turn = true;
            JsonArray parts = serverContent["modelTurn"]["parts"];
            for (JsonObject part : parts) {
                if (part.containsKey("inlineData")) {
                    if (!ignore_current_turn) {
                        String base64Data = part["inlineData"]["data"];
                        last_model_audio_time = millis();
                        
                        size_t input_len = base64Data.length();
                        size_t output_len = (input_len / 4) * 3; 
                        uint8_t* decoded_buf = (uint8_t*)safe_malloc(output_len);
                        
                        if (decoded_buf) {
                            size_t actual_len = base64_decode_to_buf(base64Data.c_str(), input_len, decoded_buf);
                            size_t num_samples = actual_len / sizeof(int16_t);
                            
                            int16_t* mono_play_buf = (int16_t*)decoded_buf;
                            int16_t* stereo_play_buf = (int16_t*)dma_malloc(num_samples * 2 * sizeof(int16_t));
                            if (stereo_play_buf) {
                                for (size_t i = 0; i < num_samples; i++) {
                                    int32_t val = (int32_t)(mono_play_buf[i] * SPEAKER_VOLUME_BOOST);
                                    if (val > 32767) val = 32767;
                                    else if (val < -32768) val = -32768;
                                    int16_t sample = (int16_t)val;
                                    stereo_play_buf[2 * i] = sample;     // Left
                                    stereo_play_buf[2 * i + 1] = sample; // Right
                                }
                                
                                AudioPacket packet = { stereo_play_buf, num_samples };
                                if (audio_play_queue != NULL && xQueueSend(audio_play_queue, &packet, 0) == pdPASS) {
                                    Serial.printf("[Gemini] Queued voice response chunk: %d samples. Free Heap: %d, Free PSRAM: %d\n", 
                                                  num_samples, ESP.getFreeHeap(), ESP.getFreePsram());
                                } else {
                                    Serial.println("❌ [Gemini] Playback queue full, dropping chunk!");
                                    free(stereo_play_buf);
                                }
                            }
                            free(decoded_buf);
                        }
                    }
                }
                if (part.containsKey("text")) {
                    if (!ignore_current_turn) {
                        String text = part["text"].as<String>();
                        Serial.print(text);
                    }
                }
            }
        }
        
        if (serverContent["turnComplete"] == true) {
            Serial.println("🤖 [Gemini] Turn complete.");
            model_speaking_turn = false;
            ignore_current_turn = false;
        }
    }
}

void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
    switch(type) {
        case WStype_DISCONNECTED:
            Serial.print("🔌 [Gemini WS] Disconnected! Details: ");
            if (payload != NULL && length > 0) {
                Serial.write(payload, length);
                Serial.println();
            } else {
                Serial.println("None");
            }
            live_chat_active = false;
            i2s_set_sample_rates(I2S_PORT_OUT, SPEAKER_SAMPLING_RATE);
            break;
        case WStype_CONNECTED:
            Serial.println("🔌 [Gemini WS] Connection established successfully!");
            send_setup_message();
            break;
        case WStype_TEXT:
        case WStype_BIN:
            handle_websocket_message(payload, length);
            break;
        case WStype_ERROR:
            Serial.print("❌ [Gemini WS] Connection error! Details: ");
            if (payload != NULL && length > 0) {
                Serial.write(payload, length);
                Serial.println();
            } else {
                Serial.println("None");
            }
            break;
    }
}

// =========================================================================
// UTILITY HELPERS
// =========================================================================
void play_beep(int frequency, int duration_ms) {
    int samples = (OUTPUT_SAMPLING_RATE * duration_ms) / 1000;
    int16_t* beep_buf = (int16_t*)dma_malloc(samples * 2 * sizeof(int16_t));
    if (!beep_buf) return;
    
    for (int i = 0; i < samples; i++) {
        int16_t val = (int16_t)(10000.0 * sin(2.0 * PI * frequency * i / (float)OUTPUT_SAMPLING_RATE));
        beep_buf[2 * i] = val;     // Left
        beep_buf[2 * i + 1] = val; // Right
    }
    
    i2s_set_sample_rates(I2S_PORT_OUT, OUTPUT_SAMPLING_RATE);
    size_t bytes_written;
    i2s_write(I2S_PORT_OUT, beep_buf, samples * 2 * sizeof(int16_t), &bytes_written, portMAX_DELAY);
    free(beep_buf);
    
    // Silence flush to completely fill and clear the circular DMA buffer (which is ~170ms)
    int silence_samples = (OUTPUT_SAMPLING_RATE * 300) / 1000;
    int16_t* silence_buf = (int16_t*)dma_malloc(silence_samples * 2 * sizeof(int16_t));
    if (silence_buf) {
        memset(silence_buf, 0, silence_samples * 2 * sizeof(int16_t));
        i2s_write(I2S_PORT_OUT, silence_buf, silence_samples * 2 * sizeof(int16_t), &bytes_written, portMAX_DELAY);
        free(silence_buf);
    }
}

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

void playSilence(int duration_ms) {
    i2s_set_sample_rates(I2S_PORT_OUT, SPEAKER_SAMPLING_RATE);
    unsigned int num_samples = (SPEAKER_SAMPLING_RATE * duration_ms) / 1000;
    
    #define SILENCE_CHUNK_SIZE 256
    int16_t* silence_buf = (int16_t*)dma_malloc(SILENCE_CHUNK_SIZE * 2 * sizeof(int16_t));
    if (silence_buf == nullptr) {
        return;
    }
    memset(silence_buf, 0, SILENCE_CHUNK_SIZE * 2 * sizeof(int16_t));
    
    unsigned int played = 0;
    while (played < num_samples) {
        unsigned int chunk = num_samples - played;
        if (chunk > SILENCE_CHUNK_SIZE) {
            chunk = SILENCE_CHUNK_SIZE;
        }
        
        size_t bytes_written = 0;
        i2s_write(I2S_PORT_OUT, silence_buf, chunk * 2 * sizeof(int16_t), &bytes_written, portMAX_DELAY);
        played += chunk;
    }
    
    free(silence_buf);
}

void playSpeakerWav(const uint8_t* wav_data, size_t wav_len) {
    i2s_set_sample_rates(I2S_PORT_OUT, SPEAKER_SAMPLING_RATE);
    if (wav_data == nullptr || wav_len <= 44) {
        Serial.println("[Speaker] Invalid WAV data or size too small.");
        return;
    }
    
    // Skip the 44-byte WAV header
    const uint8_t* pcm_data = wav_data + 44;
    unsigned int pcm_bytes = wav_len - 44;
    unsigned int num_samples = pcm_bytes / sizeof(int16_t);
    const int16_t* mono_samples = (const int16_t*)pcm_data;
    
    #define MONO_PLAY_CHUNK 256
    int16_t* stereo_chunk = (int16_t*)malloc(MONO_PLAY_CHUNK * 2 * sizeof(int16_t));
    if (stereo_chunk == nullptr) {
        Serial.println("❌ [Speaker] Failed to allocate temporary I2S TX heap buffer!");
        return;
    }
    
    for (unsigned int i = 0; i < num_samples; i += MONO_PLAY_CHUNK) {
        unsigned int chunk_len = num_samples - i;
        if (chunk_len > MONO_PLAY_CHUNK) {
            chunk_len = MONO_PLAY_CHUNK;
        }
        
        for (unsigned int j = 0; j < chunk_len; j++) {
            int32_t val = (int32_t)(mono_samples[i + j] * SPEAKER_VOLUME_BOOST);
            if (val > 32767) val = 32767;
            else if (val < -32768) val = -32768;
            int16_t sample = (int16_t)val;
            
            stereo_chunk[2 * j] = sample;     // Left
            stereo_chunk[2 * j + 1] = sample; // Right
        }
        
        size_t bytes_written = 0;
        i2s_write(I2S_PORT_OUT, stereo_chunk, chunk_len * 2 * sizeof(int16_t), &bytes_written, portMAX_DELAY);
    }

    free(stereo_chunk);
}

void audio_playback_task(void *pvParameters) {
    AudioPacket packet;
    // Set speaker rate to 24kHz for Gemini Live audio playback
    i2s_set_sample_rates(I2S_PORT_OUT, OUTPUT_SAMPLING_RATE);
    
    while (true) {
        is_playing_audio = false; // Idle while waiting for audio packets
        if (audio_play_queue != NULL && xQueueReceive(audio_play_queue, &packet, portMAX_DELAY) == pdPASS) {
            is_playing_audio = true;
            if (packet.buffer) {
                size_t bytes_written = 0;
#if !DISABLE_SPEAKER_OUTPUT
                i2s_write(I2S_PORT_OUT, packet.buffer, packet.num_samples * 2 * sizeof(int16_t), &bytes_written, portMAX_DELAY);
#else
                // Simulate speaker playback delay (24000 samples per second = 24 samples per millisecond)
                vTaskDelay(pdMS_TO_TICKS(packet.num_samples / 24));
#endif
                last_model_audio_time = millis(); // Keep suppression active while samples are in I2S DMA buffers
                free(packet.buffer);
            }
        }
        vTaskDelay(pdMS_TO_TICKS(1)); // Small yield
    }
}

void mic_recording_task(void *pvParameters) {
    while (true) {
        if (!live_chat_active || !setup_complete_received) {
            vTaskDelay(pdMS_TO_TICKS(10));
            continue;
        }
        
        // Suppression check (while playing model audio or queue has packets, or within 500ms after last playback)
        bool should_suppress = model_speaking_turn || 
                               is_playing_audio || 
                               (millis() - last_model_audio_time < 500) || 
                               (audio_play_queue != NULL && uxQueueMessagesWaiting(audio_play_queue) > 0);
        
        if (should_suppress) {
            // Discard mic input to prevent backlog and echo
            size_t bytes_read = 0;
            i2s_read(I2S_PORT, stereo_chunk, CHUNK_FRAMES * 2 * sizeof(int32_t), &bytes_read, pdMS_TO_TICKS(50));
            
            // Clear the mic queue to ensure no old frames are sent when suppression ends
            MicPacket p;
            while (mic_queue != NULL && xQueueReceive(mic_queue, &p, 0) == pdPASS) {
                if (p.buffer) {
                    free(p.buffer);
                }
            }
            vTaskDelay(pdMS_TO_TICKS(10));
            continue;
        }
        
        size_t bytes_read = 0;
        esp_err_t err = i2s_read(I2S_PORT, stereo_chunk, CHUNK_FRAMES * 2 * sizeof(int32_t), &bytes_read, pdMS_TO_TICKS(150));
        if (err == ESP_OK && bytes_read > 0) {
            int frames = bytes_read / (2 * sizeof(int32_t));
            if (frames > 0) {
                int16_t* pcm_buf = (int16_t*)safe_malloc(frames * sizeof(int16_t));
                if (pcm_buf) {
                    for (int i = 0; i < frames; i++) {
                        int16_t left_16 = (int16_t)(stereo_chunk[2 * i] >> 16);
#if USE_DUAL_MIC
                        int16_t right_16 = (int16_t)(stereo_chunk[2 * i + 1] >> 16);
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
        vTaskDelay(pdMS_TO_TICKS(1)); // Yield to other tasks
    }
}

void gemini_ws_task(void *pvParameters) {
    while (true) {
        if (live_chat_active && ws_task_running) {
            webSocket.loop();
            if (webSocket.isConnected() && setup_complete_received) {
                stream_mic_to_websocket();
            }
        } else {
            vTaskDelay(pdMS_TO_TICKS(10));
        }
        vTaskDelay(pdMS_TO_TICKS(1)); // Yield
    }
}
