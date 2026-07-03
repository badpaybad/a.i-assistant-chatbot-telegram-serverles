// esp32mic.ino - Microphone and AI Wakeup Word Detection

// Hardware pin configurations (Dual INMP441)
#define I2S_WS      5   // WS pin (ESP32-S3 GPIO 5 - avoids OPI PSRAM conflict on GPIO 17)
#define I2S_SD      6   // SD pin (ESP32-S3 GPIO 6)
#define I2S_SCK     4   // SCK pin (ESP32-S3 GPIO 4 - avoids OPI PSRAM conflict on GPIO 16)
#define I2S_PORT    I2S_NUM_0

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
      // Discard input to clear DMA buffer, preventing lag when resuming
      i2s_read(I2S_PORT, &stereo_samples, sizeof(stereo_samples), &bytes_read, portMAX_DELAY);
      vTaskDelay(pdMS_TO_TICKS(100)); // sleep longer when inactive to save CPU
      continue;
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

    // Run AI inference every FRAME_STEP=320 samples (20ms) - same cadence as Python's rolling buffer
    // This ensures speech just spoken rolls into the FRONT of the 1s window where model expects it
    if (micDetectActive && samples_since_last_inference >= 320) {
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
      int feature_index = 0;
      float input_scale = ml.in->params.scale;   // = 0.22077 from model
      float input_zero_point = ml.in->params.zero_point; // = -128 from model

      for (int row = 0; row < SPEC_ROWS; row++) {
        // Yield CPU control every 10 rows to reset Task Watchdog
        if (row % 10 == 0) {
          vTaskDelay(pdMS_TO_TICKS(1));
        }
        
        int start_idx = row * 320; // FRAME_STEP = 320, same as train.py
        
        // === STEP 2: Hann Window + Zero-pad (matches tf.signal.stft default behaviour) ===
        // tf.signal.stft uses PERIODIC Hann window: w[n] = 0.5*(1 - cos(2*pi*n/N)) where N=480
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

        // === STEP 3: FFT magnitude (no extra windowing — window already applied above) ===
        FFT.compute(vReal, vImag, FFT_SAMPLES, FFT_FORWARD);
        FFT.complexToMagnitude(vReal, vImag, FFT_SAMPLES);

        // === STEP 4: Quantize (matches Python: (spec/input_scale) + input_zero_point) ===
        for (int col = 0; col < SPEC_COLS; col++) {
          float amplitude = vReal[col]; // raw magnitude value from FFT
          int8_t qval;
          if (input_scale != 0.0f) {
            qval = (int8_t)constrain((int)round(amplitude / input_scale) + (int)input_zero_point, -128, 127);
          } else {
            qval = (int8_t)constrain((int)amplitude, -128, 127);
          }
          if (feature_index < INPUT_SIZE) {
            spectrogram_features[feature_index++] = qval;
          }
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
