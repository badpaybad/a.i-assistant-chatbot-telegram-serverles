// esp32wifi.ino - WiFi Management and Credential Storage
#include <esp_netif.h>

// External function from esp32speaker.ino
void playOkWifiSound();

// Configuration & variables for Firestore sync when idle
extern volatile bool live_chat_active;
extern String current_hub_host;
extern int current_hub_port;
extern bool get_hub_ip_from_firestore(String &out_ip, int &out_port);

unsigned long last_idle_firestore_check = 0;

void setCustomDNS() {
    esp_netif_t *netif = esp_netif_get_handle_from_ifkey("WIFI_STA_DEF");
    if (netif) {
        esp_netif_dns_info_t dns;
        dns.ip.type = IPADDR_TYPE_V4;
        
        dns.ip.u_addr.ip4.addr = (uint32_t)IPAddress(8, 8, 8, 8);
        esp_netif_set_dns_info(netif, ESP_NETIF_DNS_MAIN, &dns);
        
        dns.ip.u_addr.ip4.addr = (uint32_t)IPAddress(1, 1, 1, 1);
        esp_netif_set_dns_info(netif, ESP_NETIF_DNS_BACKUP, &dns);
        Serial.println("[WiFi] Custom DNS configured: 8.8.8.8 (Primary) & 1.1.1.1 (Backup)");
    }
}

// Loads stored credentials into the provided array (up to 5)
void loadWifiCredentials(WifiCreds savedCreds[], int &count) {
  preferences.begin("wifi-creds", true); // Open in read-only mode
  count = preferences.getInt("count", 0);
  if (count < 0) count = 0;
  if (count > 5) count = 5;
  
  for (int i = 0; i < count; i++) {
    savedCreds[i].ssid = preferences.getString(("ssid_" + String(i)).c_str(), "");
    savedCreds[i].pass = preferences.getString(("pass_" + String(i)).c_str(), "");
  }
  preferences.end();
}

// Saves a new WiFi network, moving it to index 0 (highest priority/recency)
void saveWifiCredentials(String ssid, String pass) {
  ssid.trim();
  pass.trim();
  if (ssid.length() == 0) return;

  preferences.begin("wifi-creds", false); // Open in read-write mode
  int count = preferences.getInt("count", 0);
  if (count < 0) count = 0;
  if (count > 5) count = 5;
  
  WifiCreds temp[5];
  for (int i = 0; i < count; i++) {
    temp[i].ssid = preferences.getString(("ssid_" + String(i)).c_str(), "");
    temp[i].pass = preferences.getString(("pass_" + String(i)).c_str(), "");
  }
  
  // Check if SSID already exists in the list
  int existingIndex = -1;
  for (int i = 0; i < count; i++) {
    if (temp[i].ssid == ssid) {
      existingIndex = i;
      break;
    }
  }
  
  WifiCreds newCreds[5];
  newCreds[0].ssid = ssid;
  newCreds[0].pass = pass;
  
  int newCount = 0;
  if (existingIndex != -1) {
    // SSID exists, move it to index 0 and shift others
    newCount = count;
    int idx = 1;
    for (int i = 0; i < count; i++) {
      if (i != existingIndex) {
        newCreds[idx++] = temp[i];
      }
    }
  } else {
    // SSID does not exist, insert at index 0 and shift others
    newCount = (count < 5) ? (count + 1) : 5;
    int idx = 1;
    for (int i = 0; i < newCount - 1; i++) {
      newCreds[idx++] = temp[i];
    }
  }
  
  // Write back to Preferences
  preferences.putInt("count", newCount);
  for (int i = 0; i < newCount; i++) {
    preferences.putString(("ssid_" + String(i)).c_str(), newCreds[i].ssid);
    preferences.putString(("pass_" + String(i)).c_str(), newCreds[i].pass);
  }
  
  preferences.end();
  Serial.printf("[WiFi] Saved new credentials. Total saved: %d. Recent: %s\n", newCount, ssid.c_str());
}

// Scans for available WiFi networks and attempts to connect to remembered ones in order of preference
bool connectWiFi() {
  WifiCreds savedCreds[5];
  int count = 0;
  loadWifiCredentials(savedCreds, count);
  
  // Append default fallback WiFi if there is space and it's not already present in the list
  bool defaultPresent = false;
  for (int i = 0; i < count; i++) {
    if (savedCreds[i].ssid == String(DEFAULT_WIFI_SSID)) {
      defaultPresent = true;
      break;
    }
  }
  if (!defaultPresent && count < 5) {
    savedCreds[count].ssid = String(DEFAULT_WIFI_SSID);
    savedCreds[count].pass = String(DEFAULT_WIFI_PASS);
    count++;
    Serial.printf("[WiFi] Appended default fallback network: %s\n", DEFAULT_WIFI_SSID);
  }
  
  if (count == 0) {
    Serial.println("[WiFi] No saved or default credentials available.");
    return false;
  }
  
  Serial.println("[WiFi] Scanning for nearby networks...");
  int numNetworks = WiFi.scanNetworks();
  Serial.printf("[WiFi] Scan complete. Found %d networks.\n", numNetworks);
  
  // We look for saved networks in range in order of priority (index 0 is highest)
  for (int i = 0; i < count; i++) {
    bool isVisible = false;
    for (int j = 0; j < numNetworks; j++) {
      if (WiFi.SSID(j) == savedCreds[i].ssid) {
        isVisible = true;
        break;
      }
    }
    
    if (isVisible) {
      Serial.printf("[WiFi] Found remembered network in range: %s. Connecting...\n", savedCreds[i].ssid.c_str());
      WiFi.mode(WIFI_STA);
      WiFi.begin(savedCreds[i].ssid.c_str(), savedCreds[i].pass.c_str());
      
      unsigned long startAttemptTime = millis();
      bool dotPrinted = false;
      
      // Wait up to 10 seconds for connection
      while (WiFi.status() != WL_CONNECTED && millis() - startAttemptTime < 10000) {
        delay(500);
        Serial.print(".");
        dotPrinted = true;
      }
      if (dotPrinted) {
        Serial.println();
      }
      
      if (WiFi.status() == WL_CONNECTED) {
        Serial.printf("[WiFi] Connected to %s successfully!\n", savedCreds[i].ssid.c_str());
        Serial.print("[WiFi] IP Address: ");
        Serial.println(WiFi.localIP());
        Serial.print("[WiFi] MAC Address: ");
        Serial.println(WiFi.macAddress());
        setCustomDNS();
        playOkWifiSound();
        return true;
      } else {
        Serial.printf("[WiFi] Failed to connect to %s.\n", savedCreds[i].ssid.c_str());
      }
    }
  }
  
  // Fallback: if no matching networks were scanned, try connecting to the most recent saved network directly
  // (e.g., in case of a hidden SSID or transient scan issues).
  if (WiFi.status() != WL_CONNECTED && count > 0) {
    Serial.printf("[WiFi] No visible matching networks found. Trying most recent saved (fallback): %s...\n", savedCreds[0].ssid.c_str());
    WiFi.mode(WIFI_STA);
    WiFi.begin(savedCreds[0].ssid.c_str(), savedCreds[0].pass.c_str());
    
    unsigned long startAttemptTime = millis();
    bool dotPrinted = false;
    while (WiFi.status() != WL_CONNECTED && millis() - startAttemptTime < 12000) {
      delay(500);
      Serial.print(".");
      dotPrinted = true;
    }
    if (dotPrinted) {
      Serial.println();
    }
    
    if (WiFi.status() == WL_CONNECTED) {
      Serial.printf("[WiFi] Connected to %s (fallback) successfully!\n", savedCreds[0].ssid.c_str());
      Serial.print("[WiFi] IP Address: ");
      Serial.println(WiFi.localIP());
      Serial.print("[WiFi] MAC Address: ");
      Serial.println(WiFi.macAddress());
      setCustomDNS();
      playOkWifiSound();
      return true;
    }
  }
  
  return false;
}

// Starts the SoftAP configuration portal
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
  
  // Register web routing handlers
  setupWebRoutes();
  
  server.begin();
  Serial.println("HTTP Configuration Web Server started.");
}

// Monitoring and maintenance loop for WiFi connection
void monitorWiFi() {
  if (WiFi.status() == WL_CONNECTED) {
    // Periodically sync Hub IP from Firestore when idle (every 30 seconds)
    if (!live_chat_active && (millis() - last_idle_firestore_check >= 30000)) {
      last_idle_firestore_check = millis();
      Serial.println("[Firebase] Periodically checking Firestore for Hub IP updates (idle mode)...");
      String resolved_ip = "";
      int resolved_port = 8888;
      if (get_hub_ip_from_firestore(resolved_ip, resolved_port)) {
        if (resolved_ip != current_hub_host || resolved_port != current_hub_port) {
          current_hub_host = resolved_ip;
          current_hub_port = resolved_port;
          Serial.printf("🟢 [Firebase Sync] Updated Hub host/IP from Firestore: %s:%d\n", current_hub_host.c_str(), current_hub_port);
        }
      }
    }

    if (millis() - lastLogTime >= 10000) {
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
      
      // Log free memory status dynamically
      Serial.printf("[Memory] Free DRAM: %d bytes | Free PSRAM: %d bytes\n", ESP.getFreeHeap(), ESP.getFreePsram());
    }
  } else {
    // Handle connection loss
    Serial.println("\n[WiFi] Connection lost! Attempting reconnection...");
    
    // Attempt auto-reconnection using the scanner
    if (connectWiFi()) {
      Serial.println("[WiFi] Reconnection successful.");
    } else {
      Serial.println("[WiFi] Reconnection failed. Restarting ESP32 to trigger configuration portal...");
      delay(1000);
      ESP.restart();
    }
  }
}

// Helper to get device MAC address
String getEspMacAddress() {
  return WiFi.macAddress();
}
