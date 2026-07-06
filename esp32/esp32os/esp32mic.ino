// esp32mic.ino - Microphone and AI Wakeup Word Detection

#include <WiFiClientSecure.h>
#include <WebSocketsClient.h>
#include <ArduinoJson.h>

// Gemini Live configuration and state variables
extern String gemini_model;
extern String gemini_api_key;
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

// Hướng dẫn đấu nối 2 Mic INMP441 (Stereo):
// 1. Microphone 1 (Kênh Trái - Left Channel):
//    - Chân L/R (Left/Right) nối xuống GND (Ground)
//    - Chân VDD nối vào nguồn 3.3V của ESP32-S3
//    - Chân GND nối vào GND của ESP32-S3
//    - Chân WS nối vào GPIO 5 của ESP32-S3
//    - Chân SCK nối vào GPIO 4 của ESP32-S3
//    - Chân SD nối vào GPIO 6 của ESP32-S3
//
// 2. Microphone 2 (Kênh Phải - Right Channel):
//    - Chân L/R (Left/Right) nối lên nguồn 3.3V (VDD)
//    - Chân VDD nối vào nguồn 3.3V của ESP32-S3
//    - Chân GND nối vào GND của ESP32-S3
//    - Chân WS nối vào GPIO 5 của ESP32-S3
//    - Chân SCK nối vào GPIO 4 của ESP32-S3
//    - Chân SD nối vào GPIO 6 của ESP32-S3
//
// * Lưu ý: Các chân WS, SCK, SD, VDD, GND của cả 2 mic được đấu song song (chập chung) 
//   và cắm chung vào chân GPIO tương ứng trên mạch ESP32-S3. Chỉ có chân L/R là đấu khác nhau.

#define SAMPLING_RATE   16000
#define NUM_CLASSES     3       // Labels: background, oi_gemini, unknown

#define SPEC_ROWS       49
#define SPEC_COLS       257
#define INPUT_SIZE      (SPEC_ROWS * SPEC_COLS)
#define FFT_SAMPLES     512  
#define ARENA_SIZE      (180 * 1024)
#define TF_NUM_OPS      20
#define COOLDOWN_MS     1500  // 1.5s cooldown after detection (matches detect_wakeup.py COOLDOWN_SEC=1.5)
#define THRESHOLD       0.50  // Detection threshold (matches detect_wakeup.py THRESHOLD=0.5)

#include <new>

// Instantiate TFLite model and FFT objects
Eloquent::TF::Sequential<TF_NUM_OPS, ARENA_SIZE>* ml_ptr = nullptr;
#define ml (*ml_ptr)

ArduinoFFT<float> FFT = ArduinoFFT<float>();

float vReal[FFT_SAMPLES];
float vImag[FFT_SAMPLES];

volatile bool micDetectActive = false;
volatile unsigned long last_wakeup_time = 0;

// EventBus subscription callback for wakeupword control topic
void onWakeupwordEvent(const String& topic, const String& payload) {
  String msg = payload;
  msg.trim();
  
  if (msg.indexOf("type:start") != -1 || msg.indexOf("type=start") != -1 || msg == "start") {
    micDetectActive = true;
    Serial.println("[Mic] Detection resumed (micDetectActive = true).");
  } else if (msg.indexOf("type:pending") != -1 || msg.indexOf("type=pending") != -1 || msg == "pending" || msg.indexOf("type:stop") != -1 || msg.indexOf("type=stop") != -1 || msg == "stop") {
    micDetectActive = false;
    Serial.println("[Mic] Detection paused (micDetectActive = false).");
  }
}

// Configures the I2S driver for 2 INMP441 microphones in parallel (Stereo Mode)
void initMic() {
  // Allocate TFLite model and arena dynamically (try PSRAM first, fallback to internal Heap)
  size_t obj_size = sizeof(Eloquent::TF::Sequential<TF_NUM_OPS, ARENA_SIZE>);
  void* buf = heap_caps_malloc(obj_size, MALLOC_CAP_SPIRAM);
  if (buf != NULL) {
    Serial.printf("[Memory] Successfully allocated TFLite model and %dKB arena in PSRAM.\n", ARENA_SIZE / 1024);
  } else {
    buf = malloc(obj_size);
    if (buf != NULL) {
      Serial.printf("[Memory] PSRAM allocation failed. Allocated %dKB arena in internal DRAM heap.\n", ARENA_SIZE / 1024);
    } else {
      Serial.println("❌ Failed to allocate TFLite memory arena!");
      return;
    }
  }
  ml_ptr = new (buf) Eloquent::TF::Sequential<TF_NUM_OPS, ARENA_SIZE>();

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
  
  // Register subscription on EventBus to control the detection state
  subscribe("wakeupword", "MicController", onWakeupwordEvent);
  
  // Configure model I/O and operations resolver for EloquentTinyML v3
  ml.setNumInputs(INPUT_SIZE);
  ml.setNumOutputs(NUM_CLASSES);
  ml.resolver.AddConv2D();
  ml.resolver.AddMaxPool2D();
  ml.resolver.AddFullyConnected();
  ml.resolver.AddReshape();
  ml.resolver.AddSoftmax();
  ml.resolver.AddQuantize();
  ml.resolver.AddDequantize();
  ml.resolver.AddShape();
  ml.resolver.AddStridedSlice();
  ml.resolver.AddPack();
  ml.resolver.AddUnpack();
  ml.resolver.AddConcatenation();
  ml.resolver.AddRelu();
  ml.resolver.AddAdd();
  ml.resolver.AddSub();
  ml.resolver.AddMul();

  Serial.println("[Mic] I2S Driver initialized & subscribed to 'wakeupword' topic.");
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
// Returns a heap-allocated byte buffer on success (caller must free it).
// Returns nullptr on allocation failure.
// out_wav_size: set to the total byte size of the WAV file (44 + 2 * samples).
uint8_t* micRecordWav(int seconds, int* out_wav_size) {
  *out_wav_size = 0;

  const int FULL_SAMPLES = 16000 * seconds;
  const int FALLBACK_SAMPLES = 16000 * 2; // 2s fallback if no PSRAM

  int   total_samples = 0;
  uint8_t* wav_buf    = nullptr;

  int byte_size_5s = 44 + FULL_SAMPLES * sizeof(int16_t);
  int byte_size_2s = 44 + FALLBACK_SAMPLES * sizeof(int16_t);

  // Try PSRAM (must enable PSRAM in Arduino IDE: Tools → PSRAM → "OPI PSRAM")
  wav_buf = (uint8_t*)heap_caps_malloc(byte_size_5s, MALLOC_CAP_SPIRAM);
  if (wav_buf != nullptr) {
    total_samples = FULL_SAMPLES;
    Serial.printf("[Mic] Allocated %d KB on PSRAM for %ds WAV recording.\n",
                  byte_size_5s / 1024, seconds);
  } else {
    wav_buf = (uint8_t*)malloc(byte_size_2s);
    if (wav_buf != nullptr) {
      total_samples = FALLBACK_SAMPLES;
      Serial.println("⚠️ [Mic] PSRAM unavailable — internal heap fallback, recording 2s WAV only.");
    } else {
      Serial.println("❌ [Mic] Not enough memory for recording buffer.");
      return nullptr;
    }
  }

  // Pointer to audio data offset after 44-byte WAV header
  int16_t* audio_data = (int16_t*)(wav_buf + 44);

  // Allocate I2S chunk buffer dynamically on the heap to prevent stack overflow (2560 bytes)
  const int CHUNK_FRAMES = 320;
  int32_t* stereo_chunk = (int32_t*)malloc(CHUNK_FRAMES * 2 * sizeof(int32_t));
  if (stereo_chunk == nullptr) {
    Serial.println("❌ [Mic] Failed to allocate temporary I2S RX heap buffer!");
    free(wav_buf);
    return nullptr;
  }

  int       recorded  = 0;
  int       last_sec  = -1;
  unsigned long start_time = millis();
  const unsigned long TIMEOUT_LIMIT_MS = (seconds + 5) * 1000; // e.g. 7s timeout for a 2s recording

  float duration_s = (float)total_samples / 16000.0f;
  Serial.printf("[Mic] Recording %.0fs WAV... Speak now! (Auto-detecting bit depth...)\n", duration_s);

  bool first_read_logged = false;

  while (recorded < total_samples) {
    // Watchdog guard: exit if recording is taking too long (e.g. if I2S is disconnected/hung)
    if (millis() - start_time > TIMEOUT_LIMIT_MS) {
      Serial.println("❌ [Mic] Recording timed out! (I2S RX hardware did not send enough data)");
      break;
    }

    size_t bytes_read = 0;
    // Timeout of 100ms per read, yields to RTOS
    esp_err_t err = i2s_read(I2S_PORT, stereo_chunk, CHUNK_FRAMES * 2 * sizeof(int32_t), &bytes_read, pdMS_TO_TICKS(100));
    
    if (err != ESP_OK || bytes_read == 0) {
      // Yield to scheduler to prevent Task Watchdog reset
      vTaskDelay(pdMS_TO_TICKS(5));
      continue;
    }

    if (!first_read_logged) {
      first_read_logged = true;
      Serial.printf("[Mic] First read successful: %d bytes. Mode: %s\n", 
                    (int)bytes_read, 
                    (bytes_read == CHUNK_FRAMES * 2 * sizeof(int32_t)) ? "32-bit Stereo" : 
                    ((bytes_read == CHUNK_FRAMES * 2 * sizeof(int16_t)) ? "16-bit Stereo" : "Unknown"));
      
      // Print first 5 raw 32-bit samples for debugging alignment
      if (bytes_read == CHUNK_FRAMES * 2 * sizeof(int32_t)) {
        Serial.println("[Mic] First 5 raw 32-bit samples:");
        for (int k = 0; k < 5; k++) {
          int32_t raw_l = stereo_chunk[2 * k];
          int32_t raw_r = stereo_chunk[2 * k + 1];
          Serial.printf("  Sample %d: L = 0x%08X (>>16: %d, >>14: %d, >>8: %d), R = 0x%08X (>>16: %d, >>14: %d, >>8: %d)\n", 
                        k, 
                        raw_l, (int16_t)(raw_l >> 16), (int16_t)(raw_l >> 14), (int16_t)(raw_l >> 8),
                        raw_r, (int16_t)(raw_r >> 16), (int16_t)(raw_r >> 14), (int16_t)(raw_r >> 8));
        }
      }
    }

    if (bytes_read == CHUNK_FRAMES * 2 * sizeof(int32_t)) { // 32-bit Stereo mode (2560 bytes)
      int frames = CHUNK_FRAMES;
      for (int i = 0; i < frames && recorded < total_samples; i++) {
        int16_t left_16 = (int16_t)(stereo_chunk[2 * i] >> 16);
#if USE_DUAL_MIC
        int16_t right_16 = (int16_t)(stereo_chunk[2 * i + 1] >> 16);
        int32_t mono = ((int32_t)left_16 + (int32_t)right_16) / 2;
        audio_data[recorded++] = (int16_t)mono;
#else
        audio_data[recorded++] = left_16; // Use Left channel only (single mic)
#endif
      }
    } else if (bytes_read == CHUNK_FRAMES * 2 * sizeof(int16_t)) { // 16-bit Stereo mode (1280 bytes)
      int frames = CHUNK_FRAMES;
      int16_t* stereo_chunk_16 = (int16_t*)stereo_chunk;
      for (int i = 0; i < frames && recorded < total_samples; i++) {
        int16_t left_16 = stereo_chunk_16[2 * i];
#if USE_DUAL_MIC
        int16_t right_16 = stereo_chunk_16[2 * i + 1];
        int32_t mono = ((int32_t)left_16 + (int32_t)right_16) / 2;
        audio_data[recorded++] = (int16_t)mono;
#else
        audio_data[recorded++] = left_16; // Use Left channel only
#endif
      }
    } else {
      // Fallback
      int frames = (int)(bytes_read / (2 * sizeof(int32_t)));
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
      int remaining_s = (int)((total_samples - recorded) / 16000);
      Serial.printf("[Mic]   %ds recorded, %ds remaining...\n", elapsed_s, remaining_s);
    }
  }

  // Free the temporary RX heap buffer
  free(stereo_chunk);
  stereo_chunk = nullptr;

  // Perform DC offset removal and peak normalization on recorded mono samples to boost volume
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
      if (abs_val > max_val) {
        max_val = abs_val;
      }
    }

    if (max_val > 0) {
      float scale = 28000.0f / (float)max_val; // Boost to 28000 (just under max 32767 to avoid clipping)
      for (int i = 0; i < recorded; i++) {
        int32_t normalized = (int32_t)(audio_data[i] * scale);
        if (normalized > 32767) normalized = 32767;
        else if (normalized < -32768) normalized = -32768;
        audio_data[i] = (int16_t)normalized;
      }
      Serial.printf("[Mic] Peak normalized recording with scale factor: %.2f\n", scale);
    }
  }

  Serial.printf("[Mic] Recording done: %d samples (%.1fs). Writing WAV header...\n",
                recorded, (float)recorded / 16000.0f);
  
  writeWavHeader(wav_buf, 16000, 1, 16, recorded);

  *out_wav_size = 44 + recorded * sizeof(int16_t);
  return wav_buf;
}


// Task function running AI wakeup word detection on Core 1
void wakeup_detection_task(void *pvParameters) {
  static int32_t stereo_samples[320 * 2]; // Make static to prevent task stack overflow (2.5KB)
  size_t bytes_read = 0;
  
  static int16_t loop_audio_buffer[16000] = {0}; // 1.0 second audio buffer (32KB DRAM)
  int audio_buffer_write_ptr = 0;
  
  // Allocate spectrogram_features dynamically on the heap to save DRAM compile space
  int8_t* spectrogram_features = (int8_t*)malloc(INPUT_SIZE * sizeof(int8_t));
  if (spectrogram_features == NULL) {
    Serial.println("❌ Mic Task: Failed to allocate spectrogram buffer on the heap!");
    vTaskDelete(NULL);
    return;
  }
  
  unsigned long last_debug_print_time = 0;
  unsigned long last_detection_time = 0; // cooldown timer - same as detect_wakeup.py last_detection_time
  int consecutive_zero_frames = 0;
  int samples_since_last_inference = 0;
  int inference_count = 0; // for logging
  bool spectrogram_initialized = false;
  bool was_inactive = true;
  
  // Check if model starts successfully
  if (!ml.begin(model_tflite).isOk()) {
    Serial.println("❌ EloquentTinyML: Failed to initialize AI model!");
    Serial.println(ml.exception.toString());
    free(spectrogram_features);
    vTaskDelete(NULL);
    return;
  }
  Serial.println("[Mic] AI model loaded successfully. Starting task loop on Core 0...");

  for (;;) {
    if (!micDetectActive) {
      was_inactive = true;
      spectrogram_initialized = false; // Reset initialization status when inactive
      if (live_chat_active) {
        // Do NOT read from I2S here because the Gemini streaming is using it!
        vTaskDelay(pdMS_TO_TICKS(100));
        continue;
      }
      // Discard input to clear DMA buffer, preventing lag when resuming
      i2s_read(I2S_PORT, &stereo_samples, sizeof(stereo_samples), &bytes_read, portMAX_DELAY);
      vTaskDelay(pdMS_TO_TICKS(100)); // sleep longer when inactive to save CPU
      continue;
    }

    // Clear buffer when transitioning to active
    if (was_inactive) {
      was_inactive = false;
      memset(loop_audio_buffer, 0, sizeof(loop_audio_buffer));
      audio_buffer_write_ptr = 0;
      samples_since_last_inference = 0;
      Serial.println("[Mic] Transitioned to active: Cleared audio buffer to prevent false wakeup trigger.");
    }

    // Read a stereo frame (20ms block)
    i2s_read(I2S_PORT, &stereo_samples, sizeof(stereo_samples), &bytes_read, portMAX_DELAY);

    float frame_max_amp = 0.0;
    float frame_sum_amp = 0.0;
    int num_frames = 0;

    if (bytes_read == 320 * 2 * sizeof(int32_t)) { // 32-bit Stereo mode (2560 bytes)
      num_frames = 320;
      for (int i = 0; i < num_frames; i++) {
        int16_t left_channel = (int16_t)(stereo_samples[2 * i] >> 16);
#if USE_DUAL_MIC
        int16_t right_channel = (int16_t)(stereo_samples[2 * i + 1] >> 16);
        int32_t mixed_sample = ((int32_t)left_channel + (int32_t)right_channel) / 2;
#else
        int32_t mixed_sample = left_channel; // Use Left channel only (single mic)
#endif
        
        loop_audio_buffer[audio_buffer_write_ptr] = (int16_t)mixed_sample;
        audio_buffer_write_ptr = (audio_buffer_write_ptr + 1) % 16000;
        
        float abs_val = abs((float)mixed_sample / 32768.0f);
        if (abs_val > frame_max_amp) frame_max_amp = abs_val;
        frame_sum_amp += abs_val;
      }
    } else if (bytes_read == 320 * 2 * sizeof(int16_t)) { // 16-bit Stereo mode (1280 bytes)
      num_frames = 320;
      int16_t* stereo_samples_16 = (int16_t*)stereo_samples;
      for (int i = 0; i < num_frames; i++) {
        int16_t left_channel = stereo_samples_16[2 * i];
#if USE_DUAL_MIC
        int16_t right_channel = stereo_samples_16[2 * i + 1];
        int32_t mixed_sample = ((int32_t)left_channel + (int32_t)right_channel) / 2;
#else
        int32_t mixed_sample = left_channel; // Use Left channel only
#endif
        
        loop_audio_buffer[audio_buffer_write_ptr] = (int16_t)mixed_sample;
        audio_buffer_write_ptr = (audio_buffer_write_ptr + 1) % 16000;
        
        float abs_val = abs((float)mixed_sample / 32768.0f);
        if (abs_val > frame_max_amp) frame_max_amp = abs_val;
        frame_sum_amp += abs_val;
      }
    } else {
      // Fallback
      num_frames = bytes_read / (2 * sizeof(int32_t));
      for (int i = 0; i < num_frames; i++) {
        int16_t left_channel = (int16_t)(stereo_samples[2 * i] >> 16);
#if USE_DUAL_MIC
        int16_t right_channel = (int16_t)(stereo_samples[2 * i + 1] >> 16);
        int32_t mixed_sample = ((int32_t)left_channel + (int32_t)right_channel) / 2;
#else
        int32_t mixed_sample = left_channel;
#endif
        
        loop_audio_buffer[audio_buffer_write_ptr] = (int16_t)mixed_sample;
        audio_buffer_write_ptr = (audio_buffer_write_ptr + 1) % 16000;
        
        float abs_val = abs((float)mixed_sample / 32768.0f);
        if (abs_val > frame_max_amp) frame_max_amp = abs_val;
        frame_sum_amp += abs_val;
      }
    }
    
    samples_since_last_inference += num_frames;

    // Diagnostics for wiring issue / silent recording
    if (frame_max_amp == 0.0) {
      consecutive_zero_frames++;
    } else {
      consecutive_zero_frames = 0;
    }

    if (consecutive_zero_frames >= 150) { // 150 frames of 20ms = 3.0s of silence
      static unsigned long last_warn_time = 0;
      if (millis() - last_warn_time >= 4000) {
        last_warn_time = millis();
        Serial.println("⚠️ [Mic Warning] Absolute silence detected (amplitude is 0.00000). Please check microphone wiring (SD, SCK, WS) and Power!");
      }
    }

    // Periodic debug print every 10 seconds
    if (millis() - last_debug_print_time >= 10000) {
      last_debug_print_time = millis();
      float avg_amp = frame_sum_amp / (num_frames > 0 ? num_frames : 1);
      Serial.printf("[Mic Debug] I2S Bytes Read: %d | Frame Peak Amp: %.5f | Avg Amp: %.5f | Status: %s\n", 
                    (int)bytes_read, frame_max_amp, avg_amp, micDetectActive ? "ACTIVE" : "PAUSED");
    }

    // Run AI inference every 1600 samples (100ms) - matches detect_wakeup.py BLOCK_SIZE=1600 (100ms)
    // This reduces CPU load by 5x compared to 20ms cadence, and prevents queue backups.
    if (micDetectActive && samples_since_last_inference >= 1600) {
      samples_since_last_inference = 0;
      inference_count++;

      // === STEP 1: DC Offset Removal & Peak Normalization ===
      // Digital MEMS mics have a constant DC offset. We calculate the mean over the 1-second window
      // and subtract it to center the waveform around 0.0 before finding the peak value.
      float sum = 0.0f;
      for (int i = 0; i < 16000; i++) {
        sum += (float)loop_audio_buffer[i] / 32768.0f;
      }
      float dc_offset = sum / 16000.0f;

      float max_val = 0.0f;
      for (int i = 0; i < 16000; i++) {
        float sample = ((float)loop_audio_buffer[i] / 32768.0f) - dc_offset;
        float abs_val = abs(sample);
        if (abs_val > max_val) max_val = abs_val;
      }

      // Compile spectrogram features
      float input_scale = ml.in->params.scale;   // = 0.22077 from model
      float input_zero_point = ml.in->params.zero_point; // = -128 from model

      // === STEP 2: Sliding Spectrogram Buffer Optimization ===
      // Since the window shifted by 5 steps of 320 samples (1600 samples / 100ms), 
      // the first 44 rows of the spectrogram are identical to the last 44 rows of the previous window.
      // We shift the first 44 rows of spectrogram_features up by 5 rows, and ONLY calculate 5 new FFT rows.
      int start_row = 0;
      if (spectrogram_initialized) {
        // Shift 44 rows (44 * 257 bytes) to the front
        memmove(spectrogram_features, spectrogram_features + (5 * SPEC_COLS), (SPEC_ROWS - 5) * SPEC_COLS * sizeof(int8_t));
        start_row = SPEC_ROWS - 5; // Only compute the 5 newest rows
      } else {
        start_row = 0; // Compute all 49 rows on startup/resume
        spectrogram_initialized = true;
      }

      for (int row = start_row; row < SPEC_ROWS; row++) {
        // Yield CPU control periodically to reset Task Watchdog
        if (row % 10 == 0) {
          vTaskDelay(pdMS_TO_TICKS(1));
        }
        
        int start_idx = row * 320; // FRAME_STEP = 320, same as train.py
        int feature_index = row * SPEC_COLS;
        
        // === STEP 3: Hann Window + Zero-pad (matches tf.signal.stft default behaviour) ===
        for (int i = 0; i < FFT_SAMPLES; i++) {
          if (i < 480) {
            int read_idx = (audio_buffer_write_ptr + start_idx + i) % 16000;
            float sample = ((float)loop_audio_buffer[read_idx] / 32768.0f) - dc_offset;
            if (max_val > 0.0f) {
              sample = sample / max_val; // Peak normalize centered signal
            }
            // Periodic Hann window (N=480) — matches TensorFlow stft default
            float w = 0.5f * (1.0f - cosf((2.0f * PI * i) / 480.0f));
            vReal[i] = sample * w;
          } else {
            vReal[i] = 0.0f; // Zero-pad to FFT_SAMPLES=512
          }
          vImag[i] = 0.0f;
        }

        // === STEP 4: FFT magnitude calculation ===
        FFT.compute(vReal, vImag, FFT_SAMPLES, FFT_FORWARD);
        FFT.complexToMagnitude(vReal, vImag, FFT_SAMPLES);

        // === STEP 5: Quantize and write into features buffer ===
        for (int col = 0; col < SPEC_COLS; col++) {
          float amplitude = vReal[col]; // raw magnitude value from FFT
          int8_t qval;
          if (input_scale != 0.0f) {
            qval = (int8_t)constrain((int)round(amplitude / input_scale) + (int)input_zero_point, -128, 127);
          } else {
            qval = (int8_t)constrain((int)amplitude, -128, 127);
          }
          spectrogram_features[feature_index + col] = qval;
        }
      }

      // Yield CPU control before TFLite model prediction
      vTaskDelay(pdMS_TO_TICKS(1));

      // === STEP 5: Cooldown guard (matches detect_wakeup.py COOLDOWN_SEC=1.5) ===
      unsigned long now_ms = millis();
      bool in_cooldown = (now_ms - last_detection_time) < COOLDOWN_MS;

      // === STEP 6: Classify spectrogram using the TFLite model ===
      if (ml.predict(spectrogram_features).isOk()) {
        float out_scale     = ml.out->params.scale;      // = 0.00390625
        float out_zero_point = ml.out->params.zero_point; // = -128
        
        // Dequantize output: prob = (raw - zero_point) * scale
        float prob_bg     = (ml.outputs[0] - out_zero_point) * out_scale;
        float prob_du_oi  = (ml.outputs[1] - out_zero_point) * out_scale;
        float prob_unknown = (ml.outputs[2] - out_zero_point) * out_scale;

        // Log when model sees anything interesting (not every 20ms to avoid serial flood)
        if (prob_du_oi > 0.10 || (inference_count % 50 == 0)) {
          Serial.printf("[AI #%d] du_oi=%.2f | unk=%.2f | bg=%.2f | amp=%.4f%s\n",
                        inference_count, prob_du_oi, prob_unknown, prob_bg, max_val,
                        in_cooldown ? " [cooldown]" : "");
        }

        // Trigger detection when probability >= THRESHOLD and not in cooldown
        if (!in_cooldown && prob_du_oi >= THRESHOLD) {
          last_detection_time = now_ms;
          last_wakeup_time = now_ms;
          
          Serial.printf("🎉 [AI] Wakeup word 'du ơi' DETECTED! Score: %.2f. Publishing event...\n", prob_du_oi);

          // Immediately pause further detection to avoid duplicates
          micDetectActive = false;
          
          // Publish to EventBus: "class:1,time:<ms>,type:detected,score:<score>"
          String eventPayload = "class:1,time:" + String(last_wakeup_time) + ",type:detected,score:" + String(prob_du_oi, 2);
          publish("wakeupword", eventPayload);
        }
      } else {
        Serial.printf("⚠️ [AI #%d] Prediction failed: %s\n", inference_count, ml.exception.toString());
      }
    }
    vTaskDelay(pdMS_TO_TICKS(1)); // Yield to prevent Watchdog timeout
  }
}

// Spawns the wakeup detection task on Core 1 (App Core - avoids WiFi/BT driver conflicts on Core 0)
void startWakeupDetectionTask() {
  xTaskCreatePinnedToCore(
    wakeup_detection_task,
    "WakeupDetection",
    32768, // Stack size in bytes (enough space for TFLite inference and FFT)
    NULL,
    2,    // Slightly higher priority to prevent audio frame drops
    NULL,
    1     // Pinned to Core 1 (App Core) - WiFi driver runs on Core 0, avoid sharing
  );
}

// =========================================================================
// GEMINI LIVE CHATBOT WEBSOCKET IMPLEMENTATION
// =========================================================================

void play_beep(int frequency, int duration_ms) {
    int samples = (24000 * duration_ms) / 1000;
    int16_t* beep_buf = NULL;
    
    beep_buf = (int16_t*)malloc(samples * 2 * sizeof(int16_t));
    if (!beep_buf) return;
    
    for (int i = 0; i < samples; i++) {
        int16_t val = (int16_t)(10000.0 * sin(2.0 * PI * frequency * i / 24000.0f));
        beep_buf[2 * i] = val;     // Left channel
        beep_buf[2 * i + 1] = val; // Right channel
    }
    
    // Set speaker rate to 24000 before playing beep
    i2s_set_sample_rates(I2S_PORT_OUT, 24000);
    size_t bytes_written;
    i2s_write(I2S_PORT_OUT, beep_buf, samples * 2 * sizeof(int16_t), &bytes_written, portMAX_DELAY);
    free(beep_buf);
    
    // Flush DMA buffer with silence to prevent stuck buzzer sound
    int silence_samples = (24000 * 50) / 1000;
    int16_t* silence_buf = (int16_t*)calloc(silence_samples * 2, sizeof(int16_t));
    if (silence_buf) {
        i2s_write(I2S_PORT_OUT, silence_buf, silence_samples * 2 * sizeof(int16_t), &bytes_written, portMAX_DELAY);
        free(silence_buf);
    }
}

void connect_live_chat() {
    if (webSocket.isConnected() && setup_complete_received) {
        Serial.println("ℹ️ [Gemini] Already connected and setup. Skipping reconnect.");
        play_beep(880, 100);
        last_interaction_time = millis();
        // Pause wake-word detection task
        publish("wakeupword", "type=stop");
        return;
    }

    Serial.println("🌐 [Gemini] Đang kết nối lên Gemini Live API qua WebSockets...");
    live_chat_active = true;
    setup_complete_received = false;
    
    // Debug API Key
    Serial.printf("[Gemini] Độ dài API Key: %d ký tự\n", gemini_api_key.length());
    if (gemini_api_key.length() > 10) {
        Serial.printf("[Gemini] API Key bắt đầu bằng: %s...\n", gemini_api_key.substring(0, 8).c_str());
    }

    // SSL dry-run test
    WiFiClientSecure test_client;
    test_client.setInsecure();
    Serial.println("[Gemini SSL Test] Kiểm tra kết nối tới generativelanguage.googleapis.com:443...");
    if (test_client.connect("generativelanguage.googleapis.com", 443)) {
        Serial.println("[Gemini SSL Test] Kết nối SSL thành công! TLS stack hoạt động bình thường.");
        test_client.stop();
    } else {
        Serial.println("❌ [Gemini SSL Test] Kết nối SSL thất bại! Hãy kiểm tra mạng Internet hoặc DNS của ESP32.");
        live_chat_active = false;
        publish("wakeupword", "type=start");
        return;
    }
    
    // Path for BidiGenerateContent real-time endpoint (matching Python SDK)
    String path = "/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?key=" + gemini_api_key;
    
    // Set x-goog-api-key header (matching Python SDK) and query param for maximum compatibility
    // Declared static to prevent dangling pointer crashes after connect_live_chat exits
    static String extra_headers;
    extra_headers = "x-goog-api-key: " + gemini_api_key;
    webSocket.setExtraHeaders(extra_headers.c_str());
    
    // Configure SSL Connection (pass empty string for subprotocol to avoid protocol rejection)
    webSocket.beginSSL("generativelanguage.googleapis.com", 443, path.c_str(), nullptr, "");
    webSocket.onEvent(webSocketEvent);
    
    // Ping/Pong every 10 seconds to maintain connection
    webSocket.enableHeartbeat(10000, 3000, 2);
}

void disconnect_live_chat() {
    Serial.println("🔌 [Gemini] Đóng kết nối Live Chat. Chuyển về trạng thái chờ...");
    webSocket.disconnect();
    live_chat_active = false;
    setup_complete_received = false;
    
    // Signal tone
    play_beep(400, 150);
    
    // Restore speaker rate to 16kHz
    i2s_set_sample_rates(I2S_PORT_OUT, 16000);

    // Resume wakeup word detection
    publish("wakeupword", "type=start");
}

void send_setup_message() {
    String model_path = gemini_model;
    if (!model_path.startsWith("models/")) {
        model_path = "models/" + model_path;
    }
    // Generate config JSON matching Python code (systemInstruction & activityHandling: NO_INTERRUPTION)
    String setup_json = 
    "{"
      "\"setup\": {"
        "\"model\": \"" + model_path + "\","
        "\"generationConfig\": {"
          "\"responseModalities\": [\"AUDIO\"],"
          "\"speechConfig\": {"
            "\"voiceConfig\": {"
              "\"prebuiltVoiceConfig\": {"
                "\"voiceName\": \"Aoede\""
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
          "\"activityHandling\": \"NO_INTERRUPTION\""
        "}"
      "}"
    "}";
    
    webSocket.sendTXT(setup_json);
    Serial.println("⚙️ [Gemini] Đã gửi cấu hình Setup thành công!");
    
    live_chat_active = true;
    last_interaction_time = millis();
    
    // Success tone
    play_beep(660, 100);
    delay(50);
    play_beep(880, 100);
}

void stream_mic_to_websocket() {
    static bool was_suppressed = false;
    if (millis() - last_model_audio_time < 500) {
        was_suppressed = true;
        return;
    }
    
    if (was_suppressed) {
        // Drain I2S DMA buffer to discard old echo/sounds
        size_t discarded_bytes = 0;
        uint8_t temp_buf[256];
        while (i2s_read(I2S_PORT, temp_buf, sizeof(temp_buf), &discarded_bytes, 0) == ESP_OK && discarded_bytes > 0) {
            vTaskDelay(pdMS_TO_TICKS(1));
        }
        was_suppressed = false;
        Serial.println("[Gemini] Drained I2S RX DMA buffer after echo suppression.");
    }

    const int CHUNK_FRAMES = 1024; // 64ms audio chunk (reduces message frequency and network overhead)
    size_t bytes_read = 0;
    
    // Allocate static buffers to prevent heap allocation/fragmentation 15 times per second
    static int32_t stereo_chunk[CHUNK_FRAMES * 2];
    static int16_t mono_chunk[CHUNK_FRAMES];
    static char b64_buf[((CHUNK_FRAMES * 2 * sizeof(int16_t) + 2) / 3) * 4 + 1];
    static char json_buf[120 + sizeof(b64_buf)];

    // Log RAM usage every 100 frames to monitor memory stability
    static int loop_count = 0;
    if (loop_count++ % 100 == 0) {
        Serial.printf("[RAM] Free Heap: %u | Min Free: %u\n", ESP.getFreeHeap(), ESP.getMinFreeHeap());
    }

    esp_err_t err = i2s_read(I2S_PORT, stereo_chunk, CHUNK_FRAMES * 2 * sizeof(int32_t), &bytes_read, pdMS_TO_TICKS(100));
    if (err != ESP_OK || bytes_read == 0) {
        return;
    }

    int frames = bytes_read / (2 * sizeof(int32_t));
    if (frames <= 0) {
        return;
    }

    int32_t peak = 0;
    for (int i = 0; i < frames; i++) {
        int16_t left_16 = (int16_t)(stereo_chunk[2 * i] >> 16);
#if USE_DUAL_MIC
        int16_t right_16 = (int16_t)(stereo_chunk[2 * i + 1] >> 16);
        int32_t mono = ((int32_t)left_16 + (int32_t)right_16) / 2;
        mono_chunk[i] = (int16_t)mono;
#else
        mono_chunk[i] = left_16;
#endif
        int32_t abs_val = abs((int32_t)mono_chunk[i]);
        if (abs_val > peak) peak = abs_val;
    }

    if (peak > current_utterance_max_volume) {
        current_utterance_max_volume = peak;
    }

    size_t raw_bytes = frames * sizeof(int16_t);
    base64_encode_to_buf((uint8_t*)mono_chunk, raw_bytes, b64_buf);
    
    // Construct JSON payload efficiently without String class heap allocation
    strcpy(json_buf, "{\"realtimeInput\":{\"mediaChunks\":[{\"mimeType\":\"audio/pcm;rate=16000\",\"data\":\"");
    strcat(json_buf, b64_buf);
    strcat(json_buf, "\"}]}}");
    
    bool success = webSocket.sendTXT(json_buf);
    if (!success) {
        Serial.println("❌ [Gemini] WebSocket send failed! Queue full?");
    }
}

void handle_websocket_message(uint8_t * payload, size_t length) {
    JsonDocument doc;
    DeserializationError error = deserializeJson(doc, payload, length);
    if (error) {
        Serial.printf("[Gemini WebSocket] JSON parse error: %s\n", error.c_str());
        return;
    }
    
    last_interaction_time = millis();
    
    // Log any errors returned from the server (e.g. invalid API key, invalid model name, etc.)
    if (doc.containsKey("error")) {
        JsonObject err = doc["error"];
        int code = err["code"];
        String message = err["message"].as<String>();
        String status = err["status"].as<String>();
        Serial.printf("❌ [Gemini Error] Code %d (%s): %s\n", code, status.c_str(), message.c_str());
        disconnect_live_chat(); // disconnect on error to avoid hang
        return;
    }
    
    if (doc.containsKey("setupComplete")) {
        Serial.println("🤖 [Gemini] Live Chat: Setup complete received. Starting mic stream.");
        setup_complete_received = true;
        return;
    }
    
    if (doc.containsKey("serverContent")) {
        JsonObject serverContent = doc["serverContent"];
        
        // Parse user interruption flag (matching Python code)
        if (serverContent["interrupted"] == true) {
            Serial.println("\n🛑 Người dùng nói xen vào, dừng phát âm thanh hiện tại...");
            ignore_current_turn = true;
        }

        // Parse user speech transcription to detect stop command (matching Python code)
        if (serverContent.containsKey("inputTranscription")) {
            JsonObject trans = serverContent["inputTranscription"];
            if (trans.containsKey("text")) {
                String text = trans["text"].as<String>();
                if (text.length() > 0) {
                    String text_lower = text;
                    text_lower.toLowerCase();
                    int32_t vol = current_utterance_max_volume;
                    Serial.printf("🎙️ [Gemini Transcription]: '%s' (Volume: %d)\n", text.c_str(), vol);
                    
                    bool is_stop_phrase = (text_lower.indexOf("dừng lại") != -1 || text_lower.indexOf("làm ơn dừng lại") != -1);
                    bool is_loud = (vol >= LOUD_THRESHOLD);
                    
                    if (is_stop_phrase && is_loud) {
                        Serial.printf("🛑 [Gemini] Phát hiện lệnh dừng khẩn cấp với âm lượng lớn (%d)! Dừng phát âm thanh chatbot...\n", vol);
                        ignore_current_turn = true;
                    }
                }
            }
            if (trans["finished"] == true) {
                // Reset volume metric for next utterance
                current_utterance_max_volume = 0;
            }
        }

        if (serverContent.containsKey("modelTurn")) {
            JsonArray parts = serverContent["modelTurn"]["parts"];
            for (JsonObject part : parts) {
                if (part.containsKey("inlineData")) {
                    if (!ignore_current_turn) {
                        String base64Data = part["inlineData"]["data"];
                        
                        last_model_audio_time = millis();
                        
                        size_t input_len = base64Data.length();
                        size_t output_len = (input_len / 4) * 3; 
                        uint8_t* decoded_buf = (uint8_t*)malloc(output_len);
                        
                        if (decoded_buf) {
                            size_t actual_len = base64_decode_to_buf(base64Data.c_str(), input_len, decoded_buf);
                            size_t num_samples = actual_len / sizeof(int16_t);
                            
                            int16_t* stereo_play_buf = (int16_t*)malloc(num_samples * 2 * sizeof(int16_t));
                            if (stereo_play_buf) {
                                int16_t* mono_play_buf = (int16_t*)decoded_buf;
                                for (size_t i = 0; i < num_samples; i++) {
                                    int32_t val = (int32_t)(mono_play_buf[i] * SPEAKER_VOLUME_BOOST);
                                    if (val > 32767) val = 32767;
                                    else if (val < -32768) val = -32768;
                                    int16_t sample = (int16_t)val;
                                    stereo_play_buf[2 * i] = sample;     // Left channel
                                    stereo_play_buf[2 * i + 1] = sample; // Right channel
                                }
                                
                                // Dynamic sample rate switch to 24kHz
                                i2s_set_sample_rates(I2S_PORT_OUT, 24000);
                                
                                size_t bytes_written;
                                i2s_write(I2S_PORT_OUT, stereo_play_buf, num_samples * 2 * sizeof(int16_t), &bytes_written, portMAX_DELAY);
                                free(stereo_play_buf);
                            }
                            free(decoded_buf);
                        }
                    }
                }
            }
        }
        
        if (serverContent["turnComplete"] == true) {
            Serial.println("🤖 [Gemini] Live Chat: Turn complete.");
            ignore_current_turn = false; // Reset ignore turn flag
        }
    }
}

void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
    switch(type) {
        case WStype_DISCONNECTED:
            Serial.print("🔌 [Gemini] Ngắt kết nối WebSocket! Close code/reason: ");
            if (payload != NULL && length > 0) {
                Serial.write(payload, length);
                Serial.println();
            } else {
                Serial.println("None");
            }
            live_chat_active = false;
            // Restore speaker sample rate to 16kHz
            i2s_set_sample_rates(I2S_PORT_OUT, 16000);
            publish("wakeupword", "type=start");
            break;
        case WStype_CONNECTED:
            Serial.println("🔌 [Gemini] Kết nối WebSocket thành công!");
            send_setup_message();
            break;
        case WStype_TEXT:
        case WStype_BIN:
            handle_websocket_message(payload, length);
            break;
        case WStype_ERROR:
            Serial.print("❌ [Gemini] Lỗi kết nối WebSocket! Chi tiết: ");
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
    if (live_chat_active) {
        webSocket.loop();
        
        if (webSocket.isConnected() && setup_complete_received) {
            stream_mic_to_websocket();
            
            if (millis() - last_interaction_time > 60000) {
                Serial.println("⏰ Hết thời gian đàm thoại (1 phút im lặng), ngắt kết nối Live...");
                disconnect_live_chat();
            }
        }
    }
}

// Base64 lookup table and decoding/encoding helper methods
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
