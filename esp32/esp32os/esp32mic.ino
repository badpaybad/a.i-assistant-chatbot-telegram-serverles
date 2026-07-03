// esp32mic.ino - Microphone and AI Wakeup Word Detection

// Hardware pin configurations (Dual INMP441)
#define I2S_WS      17  // WS pin (ESP32-S3 GPIO 17)
#define I2S_SD      18  // SD pin (ESP32-S3 GPIO 18)
#define I2S_SCK     16  // SCK pin (ESP32-S3 GPIO 16)
#define I2S_PORT    I2S_NUM_0

#define SAMPLING_RATE   16000
#define NUM_CLASSES     3       // Labels: background, oi_gemini, unknown

#define SPEC_ROWS       49
#define SPEC_COLS       257
#define INPUT_SIZE      (SPEC_ROWS * SPEC_COLS)
#define FFT_SAMPLES     512  
#define ARENA_SIZE      (180 * 1024)
#define TF_NUM_OPS      20
#define COOLDOWN_MS     1500  // 1.5s cooldown after detection (matches detect_wakeup.py COOLDOWN_SEC=1.5)
#define THRESHOLD       0.80  // Detection threshold (matches detect_wakeup.py THRESHOLD=0.8)

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
  
  if (msg.indexOf("type:start") != -1 || msg == "start") {
    micDetectActive = true;
    Serial.println("[Mic] Detection resumed (micDetectActive = true).");
  } else if (msg.indexOf("type:pending") != -1 || msg == "pending") {
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
    .bits_per_sample = I2S_BITS_PER_SAMPLE_16BIT,
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

// Task function running AI wakeup word detection on Core 0
void wakeup_detection_task(void *pvParameters) {
  int16_t stereo_samples[320 * 2]; // 20ms block at 16000Hz
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
    int total_samples = bytes_read / sizeof(int16_t);
    int num_frames = total_samples / 2;

    // // Forward audio to speaker for hardware loopback test if enabled
    // #if ENABLE_MIC_LOOPBACK
    // playSpeaker(stereo_samples, num_frames * 2);
    // #endif

    float frame_max_amp = 0.0;
    float frame_sum_amp = 0.0;

    // Mix Left & Right channels and write to circular buffer
    for (int i = 0; i < num_frames; i++) {
      int16_t left_channel = stereo_samples[2 * i];
      int16_t right_channel = stereo_samples[2 * i + 1];
      int32_t mixed_sample = ((int32_t)left_channel + (int32_t)right_channel) / 2;
      
      loop_audio_buffer[audio_buffer_write_ptr] = (int16_t)mixed_sample;
      audio_buffer_write_ptr = (audio_buffer_write_ptr + 1) % 16000;
      
      float abs_val = abs((float)mixed_sample / 32768.0);
      if (abs_val > frame_max_amp) {
        frame_max_amp = abs_val;
      }
      frame_sum_amp += abs_val;
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

    // Run AI inference once every 100ms (1600 samples accumulated)
    if (micDetectActive && samples_since_last_inference >= 1600) {
      samples_since_last_inference = 0;
      inference_count++;

      // === STEP 1: Peak Normalization (matches detect_wakeup.py convert_to_spectrogram) ===
      // max_val = tf.reduce_max(tf.abs(audio)) then audio = audio / max_val
      float max_val = 0.0;
      for (int i = 0; i < 16000; i++) {
        float abs_val = abs((float)loop_audio_buffer[i] / 32768.0);
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
        // NOTE: divisor is N=480 (periodic), NOT N-1=479 (symmetric)
        for (int i = 0; i < FFT_SAMPLES; i++) {
          if (i < 480) {
            int read_idx = (audio_buffer_write_ptr + start_idx + i) % 16000;
            float sample = (float)loop_audio_buffer[read_idx] / 32768.0;
            if (max_val > 0.0) {
              sample = sample / max_val; // Peak normalize
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

        // Always log every inference so we can see model is running (matches Python real-time print)
        Serial.printf("[AI #%d] du_oi=%.2f | unknown=%.2f | bg=%.2f | max_amp=%.4f%s\n",
                      inference_count, prob_du_oi, prob_unknown, prob_bg, max_val,
                      in_cooldown ? " (cooldown)" : "");

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
