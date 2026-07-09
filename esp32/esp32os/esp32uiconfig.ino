// esp32uiconfig.ino - Web UI Configuration Manager

// Registers routing handlers on the Web Server
void setupWebRoutes() {
  server.on("/", HTTP_GET, handleRoot);
  server.on("/save", HTTP_POST, handleSave);
  server.onNotFound(handleNotFound);
}

// Serves the beautiful configuration page with remembered networks
void handleRoot() {
  Serial.println("HTTP Root path accessed. Scanning networks...");
  
  // Scan WiFi networks
  int numNetworks = WiFi.scanNetworks();
  Serial.print("Networks scanned: ");
  Serial.println(numNetworks);
  
  // Load saved networks
  WifiCreds savedCreds[5];
  int savedCount = 0;
  loadWifiCredentials(savedCreds, savedCount);

  // Load saved Gemini API Key and Model Name
  preferences.begin("gemini-config", true);
  String savedGeminiKey = preferences.getString("api_key", "");
  String savedGeminiModel = preferences.getString("model", "gemini-3.1-flash-live-preview");
  preferences.end();

  // Load saved Firebase settings
  preferences.begin("firebase-cfg", true);
  String savedFirebaseProject = preferences.getString("proj_id", "");
  String savedFirebaseApiKey = preferences.getString("api_key", "");
  String savedFirebaseDocPath = preferences.getString("doc_path", "esp32/status");
  preferences.end();
  
  // Load saved Hub settings
  preferences.begin("hub-config", true);
  String savedHubHost = preferences.getString("host", "192.168.4.248");
  int savedHubPort = preferences.getInt("port", 8888);
  preferences.end();
  
  // Construct premium dark glassmorphism themed HTML
  String html = "<!DOCTYPE html><html><head>";
  html += "<meta charset='UTF-8'>";
  html += "<meta name='viewport' content='width=device-width, initial-scale=1.0'>";
  html += "<title>ESP32 OS - WiFi Manager</title>";
  html += "<style>";
  html += "  body { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; background: linear-gradient(135deg, #0f0c20 0%, #15102a 50%, #060214 100%); color: #f3f4f6; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 20px; box-sizing: border-box; }";
  html += "  .card { background: rgba(25, 20, 50, 0.45); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 20px; padding: 35px 30px; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4); width: 100%; max-width: 420px; transition: transform 0.3s ease, box-shadow 0.3s ease; }";
  html += "  .card:hover { transform: translateY(-3px); box-shadow: 0 25px 60px rgba(0, 173, 181, 0.15); }";
  html += "  h2 { color: #00adb5; font-size: 26px; font-weight: 700; margin: 0 0 5px 0; text-align: center; letter-spacing: 0.5px; text-shadow: 0 0 10px rgba(0, 173, 181, 0.3); }";
  html += "  .subtitle { text-align: center; color: #9ca3af; font-size: 14px; margin: 0 0 25px 0; }";
  
  // Section for saved networks
  html += "  .section-title { font-size: 13px; font-weight: 600; text-transform: uppercase; color: #9ca3af; margin-bottom: 12px; letter-spacing: 1px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 6px; }";
  html += "  .saved-list { list-style: none; padding: 0; margin: 0 0 25px 0; }";
  html += "  .saved-item { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 10px; margin-bottom: 8px; font-size: 14px; }";
  html += "  .saved-item .ssid-name { font-weight: 500; color: #e5e7eb; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 240px; }";
  html += "  .saved-item .priority-badge { font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 20px; }";
  html += "  .badge-primary { background: rgba(0, 173, 181, 0.2); color: #00adb5; border: 1px solid rgba(0, 173, 181, 0.4); }";
  html += "  .badge-secondary { background: rgba(255, 255, 255, 0.05); color: #9ca3af; border: 1px solid rgba(255, 255, 255, 0.1); }";
  html += "  .no-saved { text-align: center; color: #6b7280; font-size: 13px; font-style: italic; padding: 10px 0; }";
  
  html += "  .form-group { margin-bottom: 20px; display: flex; flex-direction: column; }";
  html += "  label { margin-bottom: 8px; color: #d1d5db; font-size: 13px; font-weight: 500; text-align: left; }";
  html += "  select, input[type='text'], input[type='password'] { padding: 12px 14px; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; color: #fff; font-size: 15px; transition: all 0.2s ease; width: 100%; box-sizing: border-box; }";
  html += "  select:focus, input[type='text']:focus, input[type='password']:focus { outline: none; border-color: #00adb5; box-shadow: 0 0 10px rgba(0, 173, 181, 0.3); background: rgba(255, 255, 255, 0.07); }";
  html += "  select option { background-color: #15102a; color: #f3f4f6; }";
  html += "  button { width: 100%; padding: 14px; background: linear-gradient(135deg, #00adb5 0%, #007580 100%); border: none; border-radius: 10px; color: #fff; font-weight: 600; font-size: 15px; cursor: pointer; box-shadow: 0 6px 16px rgba(0, 173, 181, 0.2); transition: all 0.2s ease; margin-top: 5px; text-transform: uppercase; letter-spacing: 0.5px; }";
  html += "  button:hover { transform: translateY(-1.5px); box-shadow: 0 10px 20px rgba(0, 173, 181, 0.35); }";
  html += "  button:active { transform: translateY(0.5px); }";
  html += "  .toggle-btn { color: #00adb5; cursor: pointer; font-size: 13px; margin-top: 15px; text-align: center; text-decoration: underline; display: block; font-weight: 500; transition: color 0.2s ease; }";
  html += "  .toggle-btn:hover { color: #00f5ff; }";
  html += "</style>";
  html += "</head><body>";
  html += "  <div class='card'>";
  html += "    <h2>WiFi Configurator</h2>";
  html += "    <p class='subtitle'>Configure connection settings for ESP32 OS</p>";
  
  // Render Remembered Networks
  html += "    <div class='section-title'>Remembered Networks</div>";
  if (savedCount == 0) {
    html += "    <div class='no-saved'>No networks remembered yet.</div>";
  } else {
    html += "    <ul class='saved-list'>";
    for (int i = 0; i < savedCount; i++) {
      html += "      <li class='saved-item'>";
      html += "        <span class='ssid-name'>" + savedCreds[i].ssid + "</span>";
      if (i == 0) {
        html += "        <span class='priority-badge badge-primary'>1st (Active)</span>";
      } else {
        String pos = String(i + 1) + "th";
        if (i == 1) pos = "2nd";
        if (i == 2) pos = "3rd";
        html += "        <span class='priority-badge badge-secondary'>" + pos + "</span>";
      }
      html += "      </li>";
    }
    html += "    </ul>";
  }
  
  // Render form
  html += "    <div class='section-title'>Configure New Connection</div>";
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
      String rssiIcon = "📶 ";
      if (rssi < -85) rssiIcon = "⚠️ ";
      else if (rssi < -70) rssiIcon = "📶 (Weak) ";
      html += "        <option value='" + ssid + "'>" + rssiIcon + ssid + " (" + String(rssi) + " dBm)</option>";
    }
    html += "        </select>";
  }
  html += "      </div>";
  
  // Text input block for manual entry
  html += "      <div class='form-group' id='manual-ssid-div' style='display:none;'>";
  html += "        <label for='ssid_manual'>Network SSID (Enter manually)</label>";
  html += "        <input type='text' name='ssid_manual' id='ssid_manual' placeholder='SSID Name' autocomplete='off'>";
  html += "      </div>";
  
  // Password block
  html += "      <div class='form-group'>";
  html += "        <label for='password'>Password</label>";
  html += "        <input type='password' name='password' id='password' placeholder='WiFi Password' autocomplete='current-password'>";
  html += "      </div>";

  // Gemini API Key block
  html += "      <div class='form-group'>";
  html += "        <label for='gemini_key'>Gemini API Key</label>";
  html += "        <input type='text' name='gemini_key' id='gemini_key' placeholder='AIzaSy...' value='" + savedGeminiKey + "' autocomplete='off'>";
  html += "      </div>";

  // Gemini Model block
  html += "      <div class='form-group'>";
  html += "        <label for='gemini_model'>Gemini Model Name</label>";
  html += "        <input type='text' name='gemini_model' id='gemini_model' placeholder='gemini-3.1-flash-live-preview' value='" + savedGeminiModel + "' autocomplete='off'>";
  html += "      </div>";

  // Firebase Project ID block
  html += "      <div class='form-group'>";
  html += "        <label for='firebase_project_id'>Firebase Project ID</label>";
  html += "        <input type='text' name='firebase_project_id' id='firebase_project_id' placeholder='my-firebase-project' value='" + savedFirebaseProject + "' autocomplete='off'>";
  html += "      </div>";

  // Firebase API Key block
  html += "      <div class='form-group'>";
  html += "        <label for='firebase_api_key'>Firebase API Key (Optional)</label>";
  html += "        <input type='text' name='firebase_api_key' id='firebase_api_key' placeholder='AIzaSy...' value='" + savedFirebaseApiKey + "' autocomplete='off'>";
  html += "      </div>";

  // Firebase Document Path block
  html += "      <div class='form-group'>";
  html += "        <label for='firebase_doc_path'>Firestore Document Path</label>";
  html += "        <input type='text' name='firebase_doc_path' id='firebase_doc_path' placeholder='esp32/status' value='" + savedFirebaseDocPath + "' autocomplete='off'>";
  html += "      </div>";

  // ESP32 Hub Host/IP block
  html += "      <div class='form-group'>";
  html += "        <label for='hub_host'>ESP32 Hub Host or IP</label>";
  html += "        <input type='text' name='hub_host' id='hub_host' placeholder='192.168.4.248' value='" + savedHubHost + "' autocomplete='off'>";
  html += "      </div>";

  // ESP32 Hub Port block
  html += "      <div class='form-group'>";
  html += "        <label for='hub_port'>ESP32 Hub Port</label>";
  html += "        <input type='text' name='hub_port' id='hub_port' placeholder='8888' value='" + String(savedHubPort) + "' autocomplete='off'>";
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
  String geminiKey = server.arg("gemini_key");
  String geminiModel = server.arg("gemini_model");
  
  // Read firebase parameters
  String firebaseProject = server.arg("firebase_project_id");
  String firebaseApiKey = server.arg("firebase_api_key");
  String firebaseDocPath = server.arg("firebase_doc_path");
  
  ssid.trim();
  pass.trim();
  geminiKey.trim();
  geminiModel.trim();
  firebaseProject.trim();
  firebaseApiKey.trim();
  firebaseDocPath.trim();

  if (geminiModel.length() == 0) {
    geminiModel = "gemini-3.1-flash-live-preview";
  }
  if (firebaseDocPath.length() == 0) {
    firebaseDocPath = "esp32/status";
  }
  
  if (ssid.length() == 0) {
    String errorHtml = "<html><head><meta name='viewport' content='width=device-width, initial-scale=1.0'>";
    errorHtml += "<style>body{background-color:#0f0c20;color:#ff5555;font-family:sans-serif;text-align:center;padding:50px;}a{color:#00adb5;text-decoration:none;font-weight:bold;}</style></head>";
    errorHtml += "<body><h2>Error</h2><p>SSID name cannot be blank.</p><p><a href='/'>Go Back</a></p></body></html>";
    server.send(400, "text/html", errorHtml);
    return;
  }
  
  // Save credentials to Preferences
  saveWifiCredentials(ssid, pass);

  // Save Gemini API Key & Model Name to Preferences
  preferences.begin("gemini-config", false);
  preferences.putString("api_key", geminiKey);
  preferences.putString("model", geminiModel);
  preferences.end();

  // Save Firebase configurations to Preferences
  preferences.begin("firebase-cfg", false);
  preferences.putString("proj_id", firebaseProject);
  preferences.putString("api_key", firebaseApiKey);
  preferences.putString("doc_path", firebaseDocPath);
  preferences.end();

  // Read Hub parameters
  String hubHost = server.arg("hub_host");
  String hubPortStr = server.arg("hub_port");
  
  hubHost.trim();
  hubPortStr.trim();
  
  int hubPort = hubPortStr.toInt();
  if (hubPort <= 0 || hubPort > 65535) {
    hubPort = 8888;
  }
  if (hubHost.length() == 0) {
    hubHost = "192.168.4.248";
  }

  // Save Hub configurations to Preferences
  preferences.begin("hub-config", false);
  preferences.putString("host", hubHost);
  preferences.putInt("port", hubPort);
  preferences.end();
  
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
