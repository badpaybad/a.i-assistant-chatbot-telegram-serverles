// esp32speaker.ino - Speaker (I2S Output MAX98357A) Driver
#include "ok_wav.h"

// Hardware pin configurations for MAX98357A Speaker Amplifier
#define I2S_OUT_BCLK 14  // BCLK (SCK) of speaker (ESP32-S3 GPIO 14)
#define I2S_OUT_LRC  15  // LRC (WS) of speaker (ESP32-S3 GPIO 15)
#define I2S_OUT_DIN  13  // DIN (SD) of speaker (ESP32-S3 GPIO 13)
#define I2S_PORT_OUT I2S_NUM_1

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

// Plays the built-in ok.wav sound (16kHz Mono 16-bit PCM)
void playOkSound() {
  Serial.println("[Speaker] Playing 'ok.wav' sound...");
  
  // Skip the 44-byte WAV header
  const unsigned char* pcm_data = ok_wav + 44;
  unsigned int pcm_bytes = ok_wav_len - 44;
  unsigned int num_samples = pcm_bytes / sizeof(int16_t);
  
  const int16_t* mono_samples = (const int16_t*)pcm_data;
  
  // Play chunk by chunk to avoid allocating a large buffer
  #define PLAY_CHUNK_SIZE 256
  int16_t stereo_chunk[PLAY_CHUNK_SIZE * 2];
  
  for (unsigned int i = 0; i < num_samples; i += PLAY_CHUNK_SIZE) {
    unsigned int chunk_len = num_samples - i;
    if (chunk_len > PLAY_CHUNK_SIZE) {
      chunk_len = PLAY_CHUNK_SIZE;
    }
    
    // Duplicate mono samples to left and right channels
    for (unsigned int j = 0; j < chunk_len; j++) {
      int16_t sample = mono_samples[i + j];
      stereo_chunk[2 * j] = sample;     // Left channel
      stereo_chunk[2 * j + 1] = sample; // Right channel
    }
    
    size_t bytes_written = 0;
    i2s_write(I2S_PORT_OUT, stereo_chunk, chunk_len * 2 * sizeof(int16_t), &bytes_written, portMAX_DELAY);
  }
  
  Serial.println("[Speaker] Finished playing 'ok.wav'.");
}
