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

// =========================================================================
// WIFI & HUB CONFIGURATIONS
// =========================================================================
#include "dunp_config.h"

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
// No global Base64 or JSON buffers needed for binary streaming

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
void stream_mic_to_websocket();
void handle_text_message(uint8_t * payload, size_t length);
void handle_binary_audio(uint8_t * payload, size_t length);
void webSocketEvent(WStype_t type, uint8_t * payload, size_t length);
void play_beep(int frequency, int duration_ms);
void playSilence(int duration_ms);
void playSpeakerWav(const uint8_t* wav_data, size_t wav_len);

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
    Serial.println("\n====================================");
    Serial.println("  GEMINI LIVE VOICE CHAT INITIALIZING");
    Serial.println("====================================");

    // Gemini configuration is managed by esp32hub on Python side. NVS loading skipped.

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

    Serial.printf("🌐 [Hub] Connecting to esp32hub at ws://%s:%d/ws ...\n", esp32hub_host, esp32hub_port);
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
    if (test_client.connect(esp32hub_host, esp32hub_port)) {
        Serial.println("[Hub TCP] Connection verified successfully!");
        test_client.stop();
    } else {
        Serial.println("❌ [Hub TCP] Connection failed! Check if esp32hub server is running.");
        live_chat_active = false;
        ws_task_running = true;
        return;
    }

    // Connect WebSocket to local hub
    webSocket.begin(esp32hub_host, esp32hub_port, "/ws");
    webSocket.onEvent(webSocketEvent);
    webSocket.enableHeartbeat(10000, 3000, 2);

    ws_task_running = true;
}

void disconnect_live_chat() {
    Serial.println("🔌 [Hub] Disconnecting from Hub...");
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
            bool success = webSocket.sendBIN((uint8_t*)packet.buffer, raw_bytes);
            free(packet.buffer); // Free the mono buffer immediately
            
            if (!success) {
                Serial.println("❌ [Hub] WebSocket send failed!");
            } else {
                static int packet_count = 0;
                if (packet_count++ % 30 == 0) {
                    Serial.printf("[Debug] Sent binary packet #%d. Size=%d, peak=%d\n", packet_count, raw_bytes, peak);
                }
            }
        }
    }
}

// =========================================================================
// WEBSOCKET EVENTS & HANDLERS
// =========================================================================
void handle_binary_audio(uint8_t * payload, size_t length) {
    if (ignore_current_turn) return;
    
    model_speaking_turn = true;
    
    size_t num_samples = length / sizeof(int16_t);
    int16_t* mono_play_buf = (int16_t*)payload;
    int16_t* stereo_play_buf = (int16_t*)dma_malloc(num_samples * 2 * sizeof(int16_t));
    if (stereo_play_buf) {
        for (size_t i = 0; i < num_samples; i++) {
            int32_t val = (int32_t)(mono_play_buf[i] * SPEAKER_VOLUME_BOOST);
            if (val > 32767) val = 32767;
            else if (val < -32768) val = -32768;
            stereo_play_buf[2 * i] = (int16_t)val;     // Left
            stereo_play_buf[2 * i + 1] = (int16_t)val; // Right
        }
        
        AudioPacket packet = { stereo_play_buf, num_samples };
        if (audio_play_queue != NULL && xQueueSend(audio_play_queue, &packet, 0) == pdPASS) {
            last_model_audio_time = millis();
        } else {
            Serial.println("❌ [Playback] Playback queue full, dropping chunk!");
            free(stereo_play_buf);
        }
    }
}

void handle_text_message(uint8_t * payload, size_t length) {
    static JsonDocument doc;
    doc.clear();
    DeserializationError error = deserializeJson(doc, payload, length);
    if (error) {
        Serial.printf("[Hub WS] JSON parsing error: %s\n", error.c_str());
        return;
    }
    
    last_interaction_time = millis();
    
    if (doc.containsKey("event")) {
        String event = doc["event"].as<String>();
        if (event == "setup_complete") {
            Serial.println("🤖 [Hub] Setup complete. Streaming mic...");
            
            // Drain I2S RX DMA buffer to prevent immediate burst of old data
            size_t discarded_bytes = 0;
            uint8_t temp_buf[256];
            while (i2s_read(I2S_PORT, temp_buf, sizeof(temp_buf), &discarded_bytes, 0) == ESP_OK && discarded_bytes > 0) {
                delay(1);
            }
            Serial.println("[Hub] Drained I2S RX DMA buffer on startup.");
            
            // Clear mic queue
            MicPacket p;
            while (mic_queue != NULL && xQueueReceive(mic_queue, &p, 0) == pdPASS) {
                if (p.buffer) free(p.buffer);
            }
            
            setup_complete_received = true;
        } else if (event == "interrupted") {
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
        } else if (event == "turn_complete") {
            Serial.println("🤖 [Hub] Turn complete.");
            model_speaking_turn = false;
            ignore_current_turn = false;
        } else if (event == "user_transcription") {
            String text = doc["text"].as<String>();
            Serial.printf("🎙️ [User]: '%s'\n", text.c_str());
        }
    }
}

void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
    switch(type) {
        case WStype_DISCONNECTED:
            Serial.print("🔌 [Hub WS] Disconnected! Details: ");
            if (payload != NULL && length > 0) {
                Serial.write(payload, length);
                Serial.println();
            } else {
                Serial.println("None");
            }
            live_chat_active = false;
            setup_complete_received = false;
            i2s_set_sample_rates(I2S_PORT_OUT, SPEAKER_SAMPLING_RATE);
            break;
        case WStype_CONNECTED:
            Serial.println("🔌 [Hub WS] Connection established successfully! Waiting for setup...");
            break;
        case WStype_TEXT:
            handle_text_message(payload, length);
            break;
        case WStype_BIN:
            handle_binary_audio(payload, length);
            break;
        case WStype_ERROR:
            Serial.print("❌ [Hub WS] Connection error! Details: ");
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
    
    while (true) {
        if (audio_play_queue != NULL && xQueueReceive(audio_play_queue, &packet, pdMS_TO_TICKS(100)) == pdPASS) {
            if (!is_playing_audio) {
                is_playing_audio = true;
                i2s_set_sample_rates(I2S_PORT_OUT, OUTPUT_SAMPLING_RATE);
            }
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
        } else {
            if (is_playing_audio) {
                is_playing_audio = false;
                i2s_zero_dma_buffer(I2S_PORT_OUT);
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
