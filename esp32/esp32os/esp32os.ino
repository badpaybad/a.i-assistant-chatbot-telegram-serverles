#include <WiFi.h>
#include <WebServer.h>
#include <DNSServer.h>
#include <Preferences.h>
#include <driver/i2s.h>
#include <arduinoFFT.h>
#include <tflm_esp32.h>
#include <eloquent_tinyml.h>
#include "wakeupword_model_data.h"

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
void startWakeupDetectionTask();
void onWakeupwordEvent(const String& topic, const String& payload);

// Function declarations from esp32speaker.ino
void initSpeaker();
void playSpeaker(const int16_t* samples, size_t count);
void playOkSound();

// EventBus Callback for Wakeup Word Detections (main thread listener)
void onWakeupwordReceived(const String& topic, const String& payload) {
  Serial.printf("[Main Thread] Received EventBus notification on topic '%s': %s\n", topic.c_str(), payload.c_str());
  
  // If a detection occurred, simulate starting voice processing and auto-resuming after 5 seconds
  if (payload.indexOf("type:detected") != -1) {
    Serial.println("[Main Thread] Wakeup detected! Pausing detection for 5 seconds to simulate system activity...");
    playOkSound(); // Play "ok.wav" feedback sound
    set("resume_timer", String(millis() + 5000));
  }
}

void setup() {
  Serial.begin(1000000);
  delay(1000); // Brief delay for Serial monitor connection
  Serial.println("\n====================================");
  Serial.println("      ESP32 OS INITIALIZING         ");
  Serial.println("====================================");
  
  // Initialize the EventBus singleton and background thread
  initEventBus();
  delay(100);
  
  // Register main thread listener for wakeup word events
  subscribe("wakeupword", "MainAppWakeupListener", onWakeupwordReceived);
  
  // Initialize speaker, microphones and task
  initSpeaker();
  initMic();
  startWakeupDetectionTask();
  
  // Publish start command to initialize and resume detection
  Serial.println("[Main Thread] Publishing initial 'start' command to resume wakeup word detection.");
  publish("wakeupword", "start");
  
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
  if (inApMode) {
    // Serve DNS and HTTP clients in AP mode
    dnsServer.processNextRequest();
    server.handleClient();
  } else {
    // Normal operation: monitor connection and log quality
    monitorWiFi();
    
    // Demo auto-resume helper: check if we should trigger a resume command
    String resumeTimeStr = get("resume_timer");
    if (resumeTimeStr.length() > 0) {
      unsigned long resumeTime = resumeTimeStr.toInt();
      if (millis() >= resumeTime) {
        set("resume_timer", ""); // Clear timer
        Serial.println("[Main Thread] Simulating process complete: publishing 'start' to resume detection.");
        publish("wakeupword", "start");
      }
    }
  }
}
