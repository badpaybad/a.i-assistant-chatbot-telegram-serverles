#include <WiFi.h>
#include <WebServer.h>
#include <DNSServer.h>
#include <Preferences.h>
#include <driver/i2s.h>
#include <arduinoFFT.h>
#include <tflm_esp32.h>
#include <eloquent_tinyml.h>
#include <WiFiClientSecure.h>
#include <WebSocketsClient.h>
#include <ArduinoJson.h>
#include "wakeupword_model_data.h"

// =========================================================================
// HARDWARE PIN CONFIGURATIONS
// =========================================================================
// 1. Microphone Input (I2S RX - Dual INMP441)
#define I2S_WS      5   // WS pin (ESP32-S3 GPIO 5)
#define I2S_SD      6   // SD pin (ESP32-S3 GPIO 6)
#define I2S_SCK     4   // SCK pin (ESP32-S3 GPIO 4)
#define I2S_PORT    I2S_NUM_0

// 2. Speaker Output (I2S TX - MAX98357A)
#define I2S_OUT_BCLK 14  // BCLK (SCK) of speaker (ESP32-S3 GPIO 14)
#define I2S_OUT_LRC  7   // LRC (WS) of speaker (ESP32-S3 GPIO 7)
#define I2S_OUT_DIN  13  // DIN (SD) of speaker (ESP32-S3 GPIO 13)
#define I2S_PORT_OUT I2S_NUM_1

#define SPEAKER_VOLUME_BOOST 2.5f
#define BOOT_BUTTON_PIN 0

// WiFi credentials struct
struct WifiCreds {
  String ssid;
  String pass;
};

// Callback function prototype for EventBus subscribers
typedef void (*EventCallback)(const String& topic, const String& payload);

// WiFi Access Point Configuration (for captive portal)
const char* AP_SSID = "esp32os_dunp";
const char* AP_PASS = "esp32osdunp";
const char* DEFAULT_WIFI_SSID = "Tang 1 OMT";
const char* DEFAULT_WIFI_PASS = "Omt070110";

// Web Server and DNS Server instances
WebServer server(80);
DNSServer dnsServer;
Preferences preferences;

// State management variables
bool inApMode = false;
unsigned long lastLogTime = 0;
String gemini_api_key = "";
String gemini_model = "gemini-3.1-flash-live-preview";

// Function declarations from esp32wifi.ino and esp32uiconfig.ino
void loadWifiCredentials(WifiCreds savedCreds[], int &count);
void saveWifiCredentials(String ssid, String pass);
bool connectWiFi();
void startAP();
void monitorWiFi();

void setupWebRoutes();
void handleRoot();
void handleSave();
void handleNotFound();
bool isIp(String str);
String toStringIp(IPAddress ip);

// Function declarations from esp32eventbus.ino
void initEventBus();
void subscribe(String topic, String subscribeName, EventCallback cb);
void publish(String topic, String payload);
bool enqueue(String queueName, String payload);
String dequeue(String queueName);
void set(String key, String value);
String get(String key);

// Function declarations from esp32mic.ino
void initMic();
uint8_t* micRecordWav(int seconds, int* out_wav_size);
void startWakeupDetectionTask();
void onWakeupwordEvent(const String& topic, const String& payload);
void connect_live_chat();
void disconnect_live_chat();
void loopGeminiLive();
void play_beep(int frequency, int duration_ms);

// Function declarations from esp32speaker.ino
void initSpeaker();
void playSpeaker(const int16_t* samples, size_t count);
void playSpeakerWav(const uint8_t* wav_data, size_t wav_len);
void playOkSound();
void playOkWifiSound();
void playSilence(int duration_ms);

// Function declarations from this file (esp32os.ino)
void micSelfTest();
void checkBootButton();

// EventBus Callback for Wakeup Word Detections (main thread listener)
void onWakeupwordReceived(const String& topic, const String& payload) {
  Serial.printf("[Main Thread] Received EventBus notification on topic '%s': %s\n", topic.c_str(), payload.c_str());
  
  // If a detection occurred. Detection is paused in the AI task loop.
  // We trigger the Gemini Live connection if the API key is configured.
  if (payload.indexOf("type:detected") != -1 || payload.indexOf("type=detected") != -1) {
    Serial.println("[Main Thread] Wakeup detected! Connecting to Gemini Live...");
    if (gemini_api_key.length() > 0) {
      connect_live_chat();
    } else {
      Serial.println("⚠️ [Gemini] API Key is empty! Cannot start live session. Please set it in web config.");
      // Resume wake word detection immediately
      publish("wakeupword", "type=start");
    }
  }
}

void setup() {
  Serial.begin(1000000);
  delay(1000); // Brief delay for Serial monitor connection
  Serial.println("\n====================================");
  Serial.println("      ESP32 OS INITIALIZING         ");
  Serial.println("====================================");
  
  // Load stored Gemini API key and model name
  preferences.begin("gemini-config", true);
  gemini_api_key = preferences.getString("api_key", "");
  gemini_model = preferences.getString("model", "gemini-3.1-flash-live-preview");
  preferences.end();
  
  if (gemini_api_key.length() > 0) {
    Serial.printf("[Gemini] Stored API Key loaded (first 5 chars: %s...)\n", gemini_api_key.substring(0, 5).c_str());
  } else {
    Serial.println("⚠️ [Gemini] Stored API Key is empty! Please configure it via Web UI.");
  }
  Serial.printf("[Gemini] Stored Model loaded: %s\n", gemini_model.c_str());

  // Initialize the EventBus singleton and background thread
  initEventBus();
  delay(100);
  
  // Register main thread listener for wakeup word events
  subscribe("wakeupword", "MainAppWakeupListener", onWakeupwordReceived);
  
  // ═══════════════════════════════════════════════════════════════════════
  // MAIN THREAD BOOT SEQUENCE (runs on Core 1, blocks until complete)
  //   1. initMic()       → Init I2S RX driver (2x INMP441)
  //   2. initSpeaker()   → Init I2S TX driver (MAX98357A)
  //   3. playOkSound()   → Play ok.wav → confirms speaker is working
  //   4. micSelfTest()   → Record 5s WAV → play back → free buffer
  //   5. startWakeupDetectionTask() → Start AI detection on Core 1
  // ═══════════════════════════════════════════════════════════════════════

  // Initialize BOOT button pin
  pinMode(BOOT_BUTTON_PIN, INPUT_PULLUP);

  Serial.println("[Boot] 1/5 - initMic: Initializing microphone I2S RX...");
  initMic();

  Serial.println("[Boot] 2/5 - initSpeaker: Initializing speaker I2S TX...");
  initSpeaker();

  Serial.println("[Boot] 3/5 - playOkSound: Playing ok.wav to verify speaker...");
  playOkSound();
  Serial.println("[Boot]       Speaker OK ✓");

  Serial.println("[Boot] 4/5 - micSelfTest: Record 5s WAV → play back → free memory...");
  micSelfTest();
  Serial.println("[Boot]       Mic OK ✓");

  Serial.println("[Boot] 5/5 - startWakeupDetectionTask: Launching AI detection task...");
  startWakeupDetectionTask();
  Serial.println("[Boot] === All hardware verified. Wakeup detection running. ===\n");

  // Publish start command to activate detection in the AI task
  publish("wakeupword", "type=start");

  
  // Try to connect to WiFi using stored credentials (auto-connect up to 5 stored networks)
  if (connectWiFi()) {
    Serial.println("WiFi successfully connected!");
    Serial.println("Starting network quality monitoring loop...");
  } else {
    Serial.println("Failed to connect to any saved WiFi networks.");
    // If connection failed or no credentials found, trigger AP configuration mode
    startAP();
  }
}

void loop() {
  checkBootButton();
  if (inApMode) {
    // Serve DNS and HTTP clients in AP mode
    dnsServer.processNextRequest();
    server.handleClient();
  } else {
    // Normal operation: monitor connection and log quality
    monitorWiFi();
    // Maintain Gemini live websocket loop & mic streaming
    loopGeminiLive();
  }
}

void checkBootButton() {
  static unsigned long lastPressTime = 0;
  static int pressCount = 0;
  static bool lastButtonState = HIGH;
  
  bool currentButtonState = digitalRead(BOOT_BUTTON_PIN);
  
  // Detect falling edge (transition from released to pressed)
  if (lastButtonState == HIGH && currentButtonState == LOW) {
    unsigned long now = millis();
    // Debounce: check if at least 50ms have passed since last press to filter noise
    if (now - lastPressTime > 50) {
      if (now - lastPressTime < 1000) {
        // Press within 1 second of the last one
        pressCount++;
      } else {
        // Too long since last press, reset count
        pressCount = 1;
      }
      lastPressTime = now;
      Serial.printf("[Button] Boot button pressed. Count: %d\n", pressCount);
      
      if (pressCount >= 2) {
        Serial.println("🚨 [Button] Double-press detected! Disconnecting WiFi and starting configuration portal...");
        pressCount = 0; // Reset
        
        // Signal tone (double beep)
        play_beep(880, 100);
        delay(80);
        play_beep(880, 100);
        
        // Disconnect wifi and start AP portal
        WiFi.disconnect();
        startAP();
      }
    }
  }
  
  lastButtonState = currentButtonState;
}

// Orchestrator for Mic and Speaker Self-Test on Main Thread:
//   1. Call micRecordWav to capture 5 seconds of audio in WAV format (with header) from the microphone
//   2. Call playSpeakerWav to play the recorded WAV buffer through the speaker (skips header)
//   3. Free the allocated WAV buffer memory to release RAM (PSRAM/Internal Heap)
void micSelfTest() {
  Serial.println("\n[Self-Test] === MIC SELF-TEST START (Main Thread WAV Orchestrated) ===");
  
  int wav_size = 0;
  // Record 2 seconds of audio as WAV format (returns pointer to allocated memory)
  uint8_t* wav_buf = micRecordWav(2, &wav_size);
  
  if (wav_buf != nullptr && wav_size > 44) {
    Serial.println("[Self-Test] Recording completed successfully. Beginning WAV playback...");
    
    // Play the recorded WAV buffer through the speaker
    playSpeakerWav(wav_buf, wav_size);
    
    // Play 1 second of silence to clear the I2S DMA buffers and stop any trailing loops
    // Serial.println("[Self-Test] Playing 1 second of silence to flush DAC...");
    // playSilence(1000);
    
    Serial.println("[Self-Test] Playback complete. Releasing WAV buffer memory...");
    // Free the recording buffer to release memory back to the system
    free(wav_buf);
    wav_buf = nullptr;
    Serial.println("[Self-Test] Memory freed successfully.");
  } else {
    Serial.println("❌ [Self-Test] Failed to record or WAV buffer was empty/invalid.");
  }
  
  Serial.println("[Self-Test] === MIC SELF-TEST COMPLETE ===\n");
}

