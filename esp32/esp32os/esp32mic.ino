// esp32mic.ino - Microphone and AI Wakeup Word Detection

// Hardware pin configurations (Dual INMP441)
#define I2S_WS      17  // WS pin (ESP32-S3 GPIO 17)
#define I2S_SD      18  // SD pin (ESP32-S3 GPIO 18)
#define I2S_SCK     16  // SCK pin (ESP32-S3 GPIO 16)
#define I2S_PORT    I2S_NUM_0

#define SAMPLING_RATE   16000
#define NUM_CLASSES     3       // Labels: background, oi_gemini, unknown

#define SPEC_ROWS       49
#define SPEC_COLS       40
#define INPUT_SIZE      (SPEC_ROWS * SPEC_COLS)
#define FFT_SAMPLES     512  
#define ARENA_SIZE      (160 * 1024)
#define TF_NUM_OPS      20

// Instantiate TFLite model and FFT objects
Eloquent::TF::Sequential<TF_NUM_OPS, ARENA_SIZE> ml;
ArduinoFFT<float> FFT = ArduinoFFT<float>();

float vReal[FFT_SAMPLES];
float vImag[FFT_SAMPLES];
int8_t spectrogram_features[INPUT_SIZE]; // Input features spectrogram for AI

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
  int16_t stereo_samples[FFT_SAMPLES * 2];
  size_t bytes_read = 0;
  
  unsigned long last_debug_print_time = 0;
  int consecutive_zero_frames = 0;
  
  // Check if model starts successfully
  if (!ml.begin(model_tflite).isOk()) {
    Serial.println("❌ EloquentTinyML: Failed to initialize AI model!");
    Serial.println(ml.exception.toString());
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

    int feature_index = 0;
    bool activeDuringScan = true;
    
    float spectrogram_max_amp = 0.0;
    float spectrogram_sum_amp = 0.0;
    int total_processed_samples = 0;

    // Scan to compile the spectrogram
    for (int row = 0; row < SPEC_ROWS; row++) {
      if (!micDetectActive) {
        activeDuringScan = false;
        break;
      }

      // Read a stereo frame
      i2s_read(I2S_PORT, &stereo_samples, sizeof(stereo_samples), &bytes_read, portMAX_DELAY);
      int total_samples = bytes_read / sizeof(int16_t);
      int num_frames = total_samples / 2;

      // Forward audio to speaker for hardware loopback test
      playSpeaker(stereo_samples, num_frames * 2);

      // Merge Left & Right channels to average signal and reduce noise (3dB SNR gain)
      for (int i = 0; i < FFT_SAMPLES; i++) {
        if (i < num_frames) {
          int16_t left_channel = stereo_samples[2 * i];
          int16_t right_channel = stereo_samples[2 * i + 1];
          int32_t mixed_sample = ((int32_t)left_channel + (int32_t)right_channel) / 2;
          float float_sample = (float)mixed_sample / 32768.0;
          vReal[i] = float_sample;
          
          float abs_val = abs(float_sample);
          if (abs_val > spectrogram_max_amp) {
            spectrogram_max_amp = abs_val;
          }
          spectrogram_sum_amp += abs_val;
          total_processed_samples++;
        } else {
          vReal[i] = 0.0;
        }
        vImag[i] = 0.0;
      }

      // Run FFT on current frame
      FFT.windowing(vReal, FFT_SAMPLES, FFT_WIN_TYP_HAMMING, FFT_FORWARD);
      FFT.compute(vReal, vImag, FFT_SAMPLES, FFT_FORWARD);
      FFT.complexToMagnitude(vReal, vImag, FFT_SAMPLES);

      // Quantize column results into spectrogram features
      for (int col = 0; col < SPEC_COLS; col++) {
        float amplitude = vReal[col];
        float log_amplitude = log(amplitude + 1e-6);
        int8_t quantized_value = (int8_t)constrain(log_amplitude * 10.0, -128.0, 127.0);

        if (feature_index < INPUT_SIZE) {
          spectrogram_features[feature_index++] = quantized_value;
        }
      }
    }

    // Diagnostics for wiring issue / silent recording
    if (activeDuringScan) {
      if (spectrogram_max_amp == 0.0) {
        consecutive_zero_frames++;
      } else {
        consecutive_zero_frames = 0;
      }

      if (consecutive_zero_frames >= 2) { // 2 full spectrogram scans are ~3 seconds
        static unsigned long last_warn_time = 0;
        if (millis() - last_warn_time >= 4000) {
          last_warn_time = millis();
          Serial.println("⚠️ [Mic Warning] Absolute silence detected (amplitude is 0.00000). Please check microphone wiring (SD, SCK, WS) and Power!");
        }
      }

      // Periodic debug print every 5 seconds
      if (millis() - last_debug_print_time >= 5000) {
        last_debug_print_time = millis();
        float avg_amp = spectrogram_sum_amp / (total_processed_samples > 0 ? total_processed_samples : 1);
        Serial.printf("[Mic Debug] I2S Bytes Read: %d | Spectrogram Max Amp: %.5f | Avg Amp: %.5f | Status: %s\n", 
                      (int)bytes_read, spectrogram_max_amp, avg_amp, micDetectActive ? "ACTIVE" : "PAUSED");
      }
    }

    // Classify spectrogram using the TFLite model
    if (activeDuringScan && micDetectActive) {
      if (ml.predict(spectrogram_features).isOk()) {
        int class_id = ml.classification;
        
        // Dequantize the output score (int8) to get float probability (0.0 to 1.0)
        float scale = ml.out->params.scale;
        float zero_point = ml.out->params.zero_point;
        float probability = (ml.outputs[class_id] - zero_point) * scale;

        // Class 1 represents the "du_oi" wakeup word
        if (class_id == 1 && probability > 0.82) {
          last_wakeup_time = millis();
          
          // Format payload: "class:1,time:<detectTime>,type:detected,score:<score>"
          String eventPayload = "class:" + String(class_id) + ",time:" + String(last_wakeup_time) + ",type:detected,score:" + String(probability, 2);
          
          Serial.printf("🔥 [THREAD AI] Wakeup word 'du ơi' detected! Score: %.2f. Publishing to EventBus...\n", probability);
          
          // Immediately pause further detection to avoid duplicates
          micDetectActive = false;
          publish("wakeupword", eventPayload);
        }
      }
    }

    vTaskDelay(pdMS_TO_TICKS(10));
  }
}

// Spawns the wakeup detection task on Core 0
void startWakeupDetectionTask() {
  xTaskCreatePinnedToCore(
    wakeup_detection_task,
    "WakeupDetectionTask",
    8192, // Stack size in words (enough space for TFLite inference)
    NULL,
    2,    // Slightly higher priority to prevent audio frame drops
    NULL,
    0     // Pinned to Core 0 (System Core)
  );
}
