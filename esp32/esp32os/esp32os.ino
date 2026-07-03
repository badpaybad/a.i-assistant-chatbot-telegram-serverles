#include <WiFi.h>
#include <WebServer.h>
#include <DNSServer.h>
#include <Preferences.h>

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

// EventBus Demo Callback Functions (logging executing Core ID)
void onSensorData(const String& topic, const String& payload) {
  Serial.printf("[Demo] Subscriber 'SensorHandler' received topic '%s': %s (running on Core %d)\n", topic.c_str(), payload.c_str(), xPortGetCoreID());
}

void onAlert(const String& topic, const String& payload) {
  Serial.printf("[Demo] Subscriber 'AlertHandler' received topic '%s': %s (running on Core %d)\n", topic.c_str(), payload.c_str(), xPortGetCoreID());
}

void onAlertBackup(const String& topic, const String& payload) {
  Serial.printf("[Demo] Subscriber 'AlertBackupHandler' received topic '%s': %s (running on Core %d)\n", topic.c_str(), payload.c_str(), xPortGetCoreID());
}

void setup() {
  Serial.begin(1000000);
  delay(1000); // Brief delay for Serial monitor connection
  Serial.println("\n====================================");
  Serial.println("      ESP32 OS INITIALIZING         ");
  Serial.println("====================================");
  
  // --- EventBus Demo Setup ---
  Serial.println("\n--- EventBus Initialization and Test ---");
  
  // Start the background EventBus task on Core 0
  initEventBus();
  delay(100); // Small delay to let the task initialize and print its start log
  
  Serial.printf("[Demo] Main setup is running on Core %d\n", xPortGetCoreID());
  
  // 1. Test Pub/Sub
  // Subscribe handlers
  subscribe("sensors/temperature", "SensorHandler", onSensorData);
  subscribe("system/alerts", "AlertHandler", onAlert);
  // Test duplicate name rejection
  subscribe("system/alerts", "AlertHandler", onAlertBackup); // Should fail/reject
  subscribe("system/alerts", "AlertBackupHandler", onAlertBackup); // Should succeed
  
  // Publish test messages
  Serial.println("[Demo] Publishing test events from main thread...");
  publish("sensors/temperature", "24.5 C");
  publish("system/alerts", "Low battery warning!");
  
  // Give a small delay to let the async thread process the callbacks
  delay(100);
  
  // 2. Test Queue (FIFO)
  Serial.println("[Demo] Testing Queue enqueues from main thread...");
  enqueue("task-queue", "Task 1: Read sensor");
  enqueue("task-queue", "Task 2: Send telemetry");
  enqueue("task-queue", "Task 3: Blink LED");
  
  Serial.println("[Demo] Testing Queue dequeues...");
  Serial.printf("[Demo] Dequeued: %s\n", dequeue("task-queue").c_str());
  Serial.printf("[Demo] Dequeued: %s\n", dequeue("task-queue").c_str());
  Serial.printf("[Demo] Dequeued: %s\n", dequeue("task-queue").c_str());
  Serial.printf("[Demo] Dequeued from empty queue: %s\n", dequeue("task-queue").c_str()); // Should be empty ""
  
  // 3. Test State Management (Key-Value)
  Serial.println("[Demo] Testing State set/get...");
  set("device_status", "ACTIVE");
  set("version", "v1.0.4-refactored");
  
  Serial.printf("[Demo] Key 'device_status' value: %s\n", get("device_status").c_str());
  Serial.printf("[Demo] Key 'version' value: %s\n", get("version").c_str());
  Serial.printf("[Demo] Key 'nonexistent' value: %s\n", get("nonexistent").c_str()); // Should be empty ""
  Serial.println("--- EventBus Test End ---\n");
  
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
  }
}
