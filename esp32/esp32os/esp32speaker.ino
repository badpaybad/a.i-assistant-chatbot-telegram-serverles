// esp32speaker.ino - MAX98357A Speaker I2S Driver
// 
// Sơ đồ đấu nối chân MAX98357A với ESP32-S3 N16R8:
// | Chân MAX98357A | Cổng ESP32-S3 | Ghi chú |
// | :------------- | :------------ | :------ |
// | VIN             | 5V            | Cấp nguồn 5V ngoài hoặc từ ESP32 để tránh rè tiếng |
// | GND             | GND           | Nối đất chung |
// | BCLK            | GPIO 14       | BCK / SCK của Loa (I2S_OUT_BCLK) |
// | LRC (WS)        | GPIO 7        | WS / LRC của Loa (I2S_OUT_LRC) |
// | DIN             | GPIO 13       | SD / DIN của Loa (I2S_OUT_DIN) |
// | GAIN            | GND hoặc Trở  | Cấu hình âm lượng vật lý: |
// |                 |               | - Nối trực tiếp GND: Gain 12dB |
// |                 |               | - Nối GND qua trở 100kΩ: Gain cực đại 15dB |
//
// Lưu ý quan trọng: Tuyệt đối KHÔNG đấu LRC/WS/BCLK vào cụm chân GPIO 15, 16, 17 
// do các chân này đã bị chiếm dụng bởi OPI PSRAM của chip ESP32-S3 N16R8.

#include "ok_wav.h"
#include "ok_wifi_wav.h"


#define SPEAKER_SAMPLING_RATE 16000 // Match mic sampling rate for loopback test

// Configures the I2S driver for MAX98357A Speaker Output
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
  
  Serial.println("[Speaker] I2S Driver for MAX98357A initialized.");
}

// Plays a buffer of stereo samples to the speaker
void playSpeaker(const int16_t* samples, size_t count) {
  size_t bytes_written = 0;
  i2s_write(I2S_PORT_OUT, samples, count * sizeof(int16_t), &bytes_written, portMAX_DELAY);
}
// Writes 0s to the speaker to clear DMA buffer and force absolute silence
void playSilence(int duration_ms) {
  i2s_set_sample_rates(I2S_PORT_OUT, SPEAKER_SAMPLING_RATE);
  unsigned int num_samples = (SPEAKER_SAMPLING_RATE * duration_ms) / 1000;
  
  #define SILENCE_CHUNK_SIZE 256
  int16_t* silence_buf = (int16_t*)calloc(SILENCE_CHUNK_SIZE * 2, sizeof(int16_t));
  if (silence_buf == nullptr) {
    return;
  }
  
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
  // Ensure the sample rate is set back to 16kHz for playing local WAV file
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
  // Allocate TX chunk buffer dynamically on the heap to prevent stack overflow
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
    
    // Duplicate mono samples to left and right channels and apply software volume boost
    for (unsigned int j = 0; j < chunk_len; j++) {
      int32_t val = (int32_t)(mono_samples[i + j] * SPEAKER_VOLUME_BOOST);
      if (val > 32767) val = 32767;
      else if (val < -32768) val = -32768;
      int16_t sample = (int16_t)val;
      
      stereo_chunk[2 * j] = sample;     // Left channel
      stereo_chunk[2 * j + 1] = sample; // Right channel
    }
    
    size_t bytes_written = 0;
    i2s_write(I2S_PORT_OUT, stereo_chunk, chunk_len * 2 * sizeof(int16_t), &bytes_written, portMAX_DELAY);
  }

  free(stereo_chunk);
Serial.println("[Self-Test] Playing 1 second of silence to flush DAC...");
  playSilence(1000);
}


void playOkSound() {
  Serial.println("[Speaker] Playing 'ok.wav' sound...");
  playSpeakerWav(ok_wav, ok_wav_len);
  Serial.println("[Speaker] Finished playing 'ok.wav'.");
}

void playOkWifiSound() {
  Serial.println("[Speaker] Playing 'ok_wifi.wav' sound...");
 // playSpeakerWav(ok_wifi_wav, ok_wifi_wav_len);
  Serial.println("[Speaker] Finished playing 'ok_wifi.wav'.");
}
