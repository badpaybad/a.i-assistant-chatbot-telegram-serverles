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

#define SPEAKER_VOLUME_BOOST 1.5f
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
extern volatile bool live_chat_active;

// Firebase Firestore global configurations
String firebase_project_id = "";
String firebase_api_key = "";
String firebase_doc_path = "esp32/status";

#define BTN_HOLD_RESET_MS 10000 // hold this many ms to trigger factory reset

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

// Function declarations from esp32firebase.ino
void initFirebase();
bool firestoreWrite(const String& docPath, const String& flatJsonPayload);
String firestoreRead(const String& docPath);

// Function declarations from this file (esp32os.ino)
void micSelfTest();
void startButtonPollingTask();

// EventBus Callback for Wakeup Word Detections (main thread listener)
void onWakeupwordReceived(const String& topic, const String& payload) {
  Serial.printf("[Main Thread] Received EventBus notification on topic '%s': %s\n", topic.c_str(), payload.c_str());
  
  // If a detection occurred. Detection is paused in the AI task loop.
  // We trigger the Voice Chat connection to the local Hub.
  if (payload.indexOf("type:detected") != -1 || payload.indexOf("type=detected") != -1) {
    Serial.println("[Main Thread] Wakeup detected! Connecting to Local Hub for Voice Chat...");
    connect_live_chat();
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

  // Load stored Firebase/Firestore configurations
  preferences.begin("firebase-cfg", true);
  firebase_project_id = preferences.getString("proj_id", "");
  firebase_api_key = preferences.getString("api_key", "");
  firebase_doc_path = preferences.getString("doc_path", "esp32/status");
  preferences.end();
  
  if (firebase_project_id.length() > 0) {
    Serial.printf("[Firebase] Stored Project ID loaded: %s\n", firebase_project_id.c_str());
  } else {
    Serial.println("⚠️ [Firebase] Stored Project ID is empty! Please configure it via Web UI.");
  }
  
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

  // Initialize Firebase and subscribe to EventBus topics
  initFirebase();
  
  // ═══════════════════════════════════════════════════════════════════════
  // MAIN THREAD BOOT SEQUENCE (runs on Core 1, blocks until complete)
  //   1. initMic()       → Init I2S RX driver (2x INMP441)
  //   2. initSpeaker()   → Init I2S TX driver (MAX98357A)
  //   3. playOkSound()   → Play ok.wav → confirms speaker is working
  //   4. micSelfTest()   → Record 5s WAV → play back → free buffer
  //   5. startWakeupDetectionTask() → Start AI detection on Core 1
  // ═══════════════════════════════════════════════════════════════════════

  // BOOT button pin – configured as INPUT_PULLUP.
  // Detection is handled by a FreeRTOS polling task (startButtonPollingTask)
  // started at the end of setup(). No hardware interrupt is used to avoid
  // WDT crashes from GPIO 0 / USB-CDC noise on ESP32-S3.
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

  // Start the boot-button polling task LAST (after all hardware is ready).
  // This task polls GPIO 0 every 50ms – no hardware interrupt needed.
  // startButtonPollingTask();
}


void loop() {
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

// -------------------------------------------------------------------------
// FreeRTOS task: polls BOOT button (GPIO 0) every 50 ms.
//
// Why polling instead of hardware interrupt:
//   GPIO 0 on ESP32-S3 is shared with the USB-CDC bridge. When Serial Monitor
//   is connected, USB activity generates rapid spurious FALLING/CHANGE edges
//   that flood an ISR and trigger the Interrupt Watchdog Timer (WDT crash).
//   A 50 ms polling interval avoids ISR context entirely and naturally
//   debounces contact bounce.
//
// Hold timeline:
//   0 s  → pressed, timer starts
//   5 s  → 1 beep ("keep holding")
//   8 s  → 2 beeps ("almost there")
//  10 s  → factory reset: wipe NVS → restart
//   any  → release before 10 s = nothing happens
// -------------------------------------------------------------------------
void buttonPollingTask(void* param) {
  bool isHeld          = false;
  unsigned long pressStartMs = 0;
  bool fired5s         = false;
  bool fired8s         = false;

  // ── Guard 1: boot settle delay ──
  // Give the bootloader and USB-CDC subsystem time to release GPIO 0.
  vTaskDelay(pdMS_TO_TICKS(2000));

  // ── Guard 2: wait for GPIO 0 to be observed HIGH (idle/released) ──
  // A valid button press MUST be a HIGH→LOW transition.
  // If GPIO 0 is already LOW when the task starts (due to bootloader, USB-CDC,
  // or hardware strapping), we must wait until it goes HIGH before accepting
  // any LOW as a real press.  Timeout: 15 s.  If never HIGH → disable task.
  {
    bool gpioReady = false;
    unsigned long waitStart = millis();
    while (millis() - waitStart < 15000) {
      if (digitalRead(BOOT_BUTTON_PIN) == HIGH) {
        gpioReady = true;
        break;
      }
      vTaskDelay(pdMS_TO_TICKS(100));
    }
    if (!gpioReady) {
      Serial.println("[Button] GPIO 0 stuck LOW after 15s – button monitoring disabled.");
      vTaskDelete(NULL);
      return;
    }
  }

  Serial.println("[Button] Polling task ready. Hold BOOT 10s to factory reset.");

  // ── Guard 3: require seenHigh before accepting any LOW as a press ──
  // Initialized to true because we just confirmed HIGH above.
  // Reset to false if the pin goes LOW without a prior HIGH (e.g. USB noise).
  bool seenHigh = true;

  // Consecutive LOW count for debounce (3 × 50 ms = 150 ms sustained LOW needed)
  const int PRESS_CONFIRM_COUNT = 3;
  int lowCount = 0;

  for (;;) {
    bool pinLow = (digitalRead(BOOT_BUTTON_PIN) == LOW);

    if (!pinLow) {
      // ── Pin is HIGH: button released / idle ──
      seenHigh = true;
      lowCount = 0;
      if (isHeld) {
        isHeld  = false;
        fired5s = false;
        fired8s = false;
        Serial.println("[Button] Released – factory reset cancelled.");
      }
    } else if (seenHigh) {
      // ── Pin is LOW and was HIGH before: could be a real press ──
      lowCount++;
      if (lowCount > PRESS_CONFIRM_COUNT) lowCount = PRESS_CONFIRM_COUNT;

      if (!isHeld && lowCount >= PRESS_CONFIRM_COUNT) {
        isHeld       = true;
        pressStartMs = millis() - (PRESS_CONFIRM_COUNT * 50UL); // back-date to first LOW
        fired5s      = false;
        fired8s      = false;
        Serial.println("[Button] Pressed. Hold 10s to factory reset, release to cancel.");
      }
    }
    // else: pinLow && !seenHigh → ignore (no preceding HIGH, likely boot noise)

    if (isHeld) {
      unsigned long heldMs = millis() - pressStartMs;

      if (!fired5s && heldMs >= 5000) {
        fired5s = true;
        play_beep(440, 150);
        Serial.println("[Button] 5s / 10s – keep holding...");
      }
      if (!fired8s && heldMs >= 8000) {
        fired8s = true;
        play_beep(660, 100);
        delay(80);
        play_beep(660, 100);
        Serial.println("[Button] 8s / 10s – almost there!");
      }
      if (heldMs >= BTN_HOLD_RESET_MS) {
        Serial.println("\n🚨 [Button] 10s hold confirmed! Wiping all config and restarting...");

        play_beep(1046, 150); // C6
        delay(60);
        play_beep(784,  150); // G5
        delay(60);
        play_beep(523,  300); // C5 (long)
        delay(300);

        // Local Preferences object avoids global-state conflicts
        Preferences pref;
        pref.begin("wifi-creds", false);
        pref.clear();
        pref.end();
        Serial.println("[Button] WiFi credentials cleared.");

        pref.begin("gemini-config", false);
        pref.clear();
        pref.end();
        Serial.println("[Button] Gemini config cleared.");

        pref.begin("firebase-cfg", false);
        pref.clear();
        pref.end();
        Serial.println("[Button] Firebase config cleared.");

        Serial.println("[Button] Restarting in 500ms...");
        Serial.flush();
        delay(500);
        ESP.restart();
        vTaskDelete(NULL);
      }
    }

    vTaskDelay(pdMS_TO_TICKS(50));
  }
}

void startButtonPollingTask() {
  xTaskCreatePinnedToCore(
    buttonPollingTask,
    "BtnPoll",
    4096,
    NULL,
    1,
    NULL,
    0  // Core 0, away from I2S-heavy loop() on Core 1
  );
}

// Orchestrator for Mic and Speaker Self-Test on Main Thread:
//   1. Call micRecordWav to capture 5 seconds of audio in WAV format (with header) from the microphone
//   2. Call playSpeakerWav to play the recorded WAV buffer through the speaker (skips header)
//   3. Free the allocated WAV buffer memory to release RAM (PSRAM/Internal Heap)
void micSelfTest() {
  Serial.println("\n[Self-Test] === MIC SELF-TEST START (Main Thread WAV Orchestrated) ===");
  
  int wav_size = 0;
  // Record 1 seconds of audio as WAV format (returns pointer to allocated memory)
  uint8_t* wav_buf = micRecordWav(1, &wav_size);
  
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

