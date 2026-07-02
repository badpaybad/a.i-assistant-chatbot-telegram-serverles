#include <WiFi.h>
#include <WebServer.h>
#include <DNSServer.h>
#include <Preferences.h>

// WiFi Access Point Configuration
const char* AP_SSID = "esp32os_dunp";
const char* AP_PASS = "esp32osdunp";

// Web Server and DNS Server instances
WebServer server(80);
DNSServer dnsServer;
Preferences preferences;

// State management variables
bool inApMode = false;
unsigned long lastLogTime = 0;

// Function declarations
void startAP();
void handleRoot();
void handleSave();
void handleNotFound();
bool isIp(String str);
String toStringIp(IPAddress ip);

void setup() {
  Serial.begin(1000000);
  delay(1000); // Brief delay for Serial monitor connection
  Serial.println("\n====================================");
  Serial.println("      ESP32 OS INITIALIZING         ");
  Serial.println("====================================");
  
  // Load saved credentials from NVS (non-volatile storage)
  preferences.begin("wifi-creds", true); // Open namespace in read-only mode
  String savedSsid = preferences.getString("ssid", "");
  String savedPass = preferences.getString("pass", "");
  preferences.end();
  
  if (savedSsid.length() > 0) {
    Serial.print("Saved WiFi configuration found. Connecting to SSID: ");
    Serial.println(savedSsid);
    
    WiFi.mode(WIFI_STA);
    WiFi.begin(savedSsid.c_str(), savedPass.c_str());
    
    // Wait for connection (15 seconds timeout)
    unsigned long startAttemptTime = millis();
    bool dotPrinted = false;
    
    while (WiFi.status() != WL_CONNECTED && millis() - startAttemptTime < 15000) {
      delay(500);
      Serial.print(".");
      dotPrinted = true;
    }
    if (dotPrinted) {
      Serial.println();
    }
    
    if (WiFi.status() == WL_CONNECTED) {
      Serial.println("WiFi successfully connected!");
      Serial.print("Local IP Address: ");
      Serial.println(WiFi.localIP());
      Serial.println("Starting network quality monitoring loop...");
      return;
    } else {
      Serial.println("WiFi connection attempt timed out.");
    }
  } else {
    Serial.println("No saved WiFi credentials found.");
  }
  
  // If connection failed or no credentials found, trigger AP configuration mode
  startAP();
}

void loop() {
  if (inApMode) {
    // Serve DNS and HTTP clients in AP mode
    dnsServer.processNextRequest();
    server.handleClient();
  } else {
    // Normal operation: log WiFi connection status and quality every 5 seconds
    if (WiFi.status() == WL_CONNECTED) {
      if (millis() - lastLogTime >= 5000) {
        lastLogTime = millis();
        
        String ssid = WiFi.SSID();
        long rssi = WiFi.RSSI();
        
        // Convert RSSI to a 0-100% quality metric
        int quality = 0;
        if (rssi <= -100) {
          quality = 0;
        } else if (rssi >= -50) {
          quality = 100;
        } else {
          quality = 2 * (rssi + 100);
        }
        
        Serial.print("[WiFi] Connected to: ");
        Serial.print(ssid);
        Serial.print(" | Signal Strength: ");
        Serial.print(rssi);
        Serial.print(" dBm | Quality: ");
        Serial.print(quality);
        Serial.println("%");
      }
    } else {
      // Handle connection loss
      Serial.println("\n[WiFi] Connection lost! Attempting reconnection...");
      
      unsigned long startAttemptTime = millis();
      while (WiFi.status() != WL_CONNECTED && millis() - startAttemptTime < 15000) {
        delay(500);
        Serial.print(".");
      }
      Serial.println();
      
      if (WiFi.status() != WL_CONNECTED) {
        Serial.println("[WiFi] Reconnection failed. Restarting ESP32 to trigger configuration portal...");
        delay(1000);
        ESP.restart();
      } else {
        Serial.println("[WiFi] Reconnection successful.");
      }
    }
  }
}

// Starts Access Point and DNS Redirect Server for Captive Portal
void startAP() {
  inApMode = true;
  WiFi.mode(WIFI_AP);
  
  // Set up Soft AP
  WiFi.softAP(AP_SSID, AP_PASS);
  IPAddress apIP = WiFi.softAPIP();
  
  Serial.println("\n====================================");
  Serial.println("      WIFI CONFIGURATION PORTAL     ");
  Serial.println("====================================");
  Serial.print("SSID: ");
  Serial.println(AP_SSID);
  Serial.print("Password: ");
  Serial.println(AP_PASS);
  Serial.print("Portal IP Address: ");
  Serial.println(apIP);
  Serial.println("------------------------------------");
  
  // Redirect all DNS requests to the AP's local IP address
  dnsServer.start(53, "*", apIP);
  
  // Configure Web Server routing
  server.on("/", HTTP_GET, handleRoot);
  server.on("/save", HTTP_POST, handleSave);
  server.onNotFound(handleNotFound);
  
  server.begin();
  Serial.println("HTTP Configuration Web Server started.");
}

// Serves the beautiful configuration page
void handleRoot() {
  Serial.println("HTTP Root path accessed. Scanning networks...");
  
  // Scan WiFi networks synchronously (blocks for 1-2 seconds)
  int numNetworks = WiFi.scanNetworks();
  Serial.print("Networks scanned: ");
  Serial.println(numNetworks);
  
  // Construct premium dark glassmorphism themed HTML
  String html = "<!DOCTYPE html><html><head>";
  html += "<meta charset='UTF-8'>";
  html += "<meta name='viewport' content='width=device-width, initial-scale=1.0'>";
  html += "<title>ESP32 OS - WiFi Manager</title>";
  html += "<style>";
  html += "  body { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; background: linear-gradient(135deg, #0f0c20 0%, #15102a 50%, #060214 100%); color: #f3f4f6; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 20px; box-sizing: border-box; }";
  html += "  .card { background: rgba(25, 20, 50, 0.45); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 20px; padding: 35px 30px; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4); width: 100%; max-width: 420px; transition: transform 0.3s ease, box-shadow 0.3s ease; }";
  html += "  .card:hover { transform: translateY(-5px); box-shadow: 0 25px 60px rgba(0, 173, 181, 0.15); }";
  html += "  h2 { color: #00adb5; font-size: 26px; font-weight: 700; margin: 0 0 10px 0; text-align: center; letter-spacing: 0.5px; text-shadow: 0 0 10px rgba(0, 173, 181, 0.3); }";
  html += "  .subtitle { text-align: center; color: #9ca3af; font-size: 14px; margin: 0 0 30px 0; }";
  html += "  .form-group { margin-bottom: 24px; display: flex; flex-direction: column; }";
  html += "  label { margin-bottom: 10px; color: #d1d5db; font-size: 14px; font-weight: 500; text-align: left; }";
  html += "  select, input[type='text'], input[type='password'] { padding: 14px 16px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 12px; color: #fff; font-size: 16px; transition: all 0.25s ease; width: 100%; box-sizing: border-box; }";
  html += "  select:focus, input[type='text']:focus, input[type='password']:focus { outline: none; border-color: #00adb5; box-shadow: 0 0 12px rgba(0, 173, 181, 0.35); background: rgba(255, 255, 255, 0.08); }";
  html += "  select option { background-color: #15102a; color: #f3f4f6; }";
  html += "  button { width: 100%; padding: 15px; background: linear-gradient(135deg, #00adb5 0%, #007580 100%); border: none; border-radius: 12px; color: #fff; font-weight: 600; font-size: 16px; cursor: pointer; box-shadow: 0 8px 20px rgba(0, 173, 181, 0.25); transition: all 0.3s ease; margin-top: 10px; text-transform: uppercase; letter-spacing: 1px; }";
  html += "  button:hover { transform: translateY(-2px); box-shadow: 0 12px 25px rgba(0, 173, 181, 0.45); }";
  html += "  button:active { transform: translateY(1px); }";
  html += "  .toggle-btn { color: #00adb5; cursor: pointer; font-size: 14px; margin-top: 15px; text-align: center; text-decoration: underline; display: block; font-weight: 500; transition: color 0.2s ease; }";
  html += "  .toggle-btn:hover { color: #00f5ff; }";
  html += "</style>";
  html += "</head><body>";
  html += "  <div class='card'>";
  html += "    <h2>WiFi Configurator</h2>";
  html += "    <p class='subtitle'>Configure connection settings for ESP32 OS</p>";
  html += "    <form method='POST' action='/save'>";
  html += "      <input type='hidden' name='use_manual' id='use_manual' value='false'>";
  
  // Dropdown block for discovered networks
  html += "      <div class='form-group' id='select-ssid-div'>";
  html += "        <label for='ssid_select'>Select Network</label>";
  if (numNetworks <= 0) {
    html += "        <select id='ssid_select' disabled><option>No networks found</option></select>";
  } else {
    html += "        <select name='ssid_select' id='ssid_select'>";
    for (int i = 0; i < numNetworks; ++i) {
      String ssid = WiFi.SSID(i);
      int rssi = WiFi.RSSI(i);
      // Construct neat display string (SSID and RSSI)
      String rssiIcon = "📶 ";
      if (rssi < -80) rssiIcon = "⚠️ ";
      html += "        <option value='" + ssid + "'>" + rssiIcon + ssid + " (" + String(rssi) + " dBm)</option>";
    }
    html += "        </select>";
  }
  html += "      </div>";
  
  // Text input block for manual entry
  html += "      <div class='form-group' id='manual-ssid-div' style='display:none;'>";
  html += "        <label for='ssid_manual'>Network SSID (Enter manually)</label>";
  html += "        <input type='text' name='ssid_manual' id='ssid_manual' placeholder='SSID Name'>";
  html += "      </div>";
  
  // Password block
  html += "      <div class='form-group'>";
  html += "        <label for='password'>Password</label>";
  html += "        <input type='password' name='password' id='password' placeholder='WiFi Password'>";
  html += "      </div>";
  
  html += "      <button type='submit'>Connect</button>";
  html += "    </form>";
  html += "    <a class='toggle-btn' id='toggle-text' onclick='toggleManualSSID()'>Or enter SSID manually</a>";
  html += "  </div>";
  
  // Interaction Logic script
  html += "  <script>";
  html += "    function toggleManualSSID() {";
  html += "      var manualDiv = document.getElementById('manual-ssid-div');";
  html += "      var selectDiv = document.getElementById('select-ssid-div');";
  html += "      var toggleText = document.getElementById('toggle-text');";
  html += "      var useManual = document.getElementById('use_manual');";
  html += "      if (manualDiv.style.display === 'none') {";
  html += "        manualDiv.style.display = 'block';";
  html += "        selectDiv.style.display = 'none';";
  html += "        useManual.value = 'true';";
  html += "        toggleText.innerText = 'Select from scanned list';";
  html += "      } else {";
  html += "        manualDiv.style.display = 'none';";
  html += "        selectDiv.style.display = 'block';";
  html += "        useManual.value = 'false';";
  html += "        toggleText.innerText = 'Or enter SSID manually';";
  html += "      }";
  html += "    }";
  
  // Default to manual mode if no networks were discovered
  if (numNetworks <= 0) {
    html += "    toggleManualSSID();";
    html += "    document.getElementById('toggle-text').style.display = 'none';";
  }
  html += "  </script>";
  html += "</body></html>";
  
  server.send(200, "text/html", html);
}

// Saves LAN credentials to Preferences, triggers restart
void handleSave() {
  String useManual = server.arg("use_manual");
  String ssid = "";
  if (useManual == "true") {
    ssid = server.arg("ssid_manual");
  } else {
    ssid = server.arg("ssid_select");
  }
  String pass = server.arg("password");
  
  ssid.trim();
  pass.trim();
  
  if (ssid.length() == 0) {
    String errorHtml = "<html><head><meta name='viewport' content='width=device-width, initial-scale=1.0'>";
    errorHtml += "<style>body{background-color:#0f0c20;color:#ff5555;font-family:sans-serif;text-align:center;padding:50px;}a{color:#00adb5;text-decoration:none;font-weight:bold;}</style></head>";
    errorHtml += "<body><h2>Error</h2><p>SSID name cannot be blank.</p><p><a href='/'>Go Back</a></p></body></html>";
    server.send(400, "text/html", errorHtml);
    return;
  }
  
  // Save credentials to Preferences
  preferences.begin("wifi-creds", false); // Open namespace in read-write mode
  preferences.putString("ssid", ssid);
  preferences.putString("pass", pass);
  preferences.end();
  
  Serial.println("\n[Portal] Configuration credentials updated.");
  Serial.print("[Portal] Saved SSID: ");
  Serial.println(ssid);
  
  // Serve the elegant confirmation/success page
  String successHtml = "<!DOCTYPE html><html><head>";
  successHtml += "<meta charset='UTF-8'>";
  successHtml += "<meta name='viewport' content='width=device-width, initial-scale=1.0'>";
  successHtml += "<title>ESP32 OS - Connection Initiated</title>";
  successHtml += "<style>";
  successHtml += "  body { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; background: linear-gradient(135deg, #0f0c20 0%, #060214 100%); color: #f3f4f6; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 20px; box-sizing: border-box; }";
  successHtml += "  .card { background: rgba(25, 20, 50, 0.45); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 20px; padding: 40px 30px; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4); width: 100%; max-width: 420px; text-align: center; }";
  successHtml += "  h2 { color: #00adb5; font-size: 24px; font-weight: 700; margin: 0 0 15px 0; }";
  successHtml += "  p { color: #d1d5db; font-size: 15px; line-height: 1.6; margin: 0 0 25px 0; }";
  successHtml += "  .loader { border: 4px solid rgba(255, 255, 255, 0.1); width: 45px; height: 45px; border-radius: 50%; border-left-color: #00adb5; animation: spin 1s linear infinite; margin: 20px auto 0 auto; }";
  successHtml += "  @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }";
  successHtml += "</style>";
  successHtml += "</head><body>";
  successHtml += "  <div class='card'>";
  successHtml += "    <h2>Saving & Restarting</h2>";
  successHtml += "    <p>Credentials for <strong>" + ssid + "</strong> saved successfully.</p>";
  successHtml += "    <p>The ESP32 is now restarting to establish a connection. Please switch your device back to your local network.</p>";
  successHtml += "    <div class='loader'></div>";
  successHtml += "  </div>";
  successHtml += "</body></html>";
  
  server.send(200, "text/html", successHtml);
  
  // Wait to ensure client has completely received the HTML response, then restart the MCU
  delay(2000);
  ESP.restart();
}

// Redirects client requests to portal page (Captive Portal DNS hijacking)
void handleNotFound() {
  String host = server.hostHeader();
  IPAddress apIP = WiFi.softAPIP();
  
  // If request isn't directed to the gateway IP, redirect to the portal
  if (host != apIP.toString() && host != String(AP_SSID)) {
    Serial.print("[Portal] Redirecting request for: ");
    Serial.println(host);
    server.sendHeader("Location", "http://" + apIP.toString() + "/", true);
    server.send(302, "text/plain", "");
    return;
  }
  
  server.send(404, "text/plain", "Not Found");
}

bool isIp(String str) {
  IPAddress ip;
  return ip.fromString(str);
}

String toStringIp(IPAddress ip) {
  return ip.toString();
}
