// esp32firebase.ino - Lightweight Google Firebase Firestore REST client for ESP32 OS
// Uses native WiFiClientSecure and HTTPClient with ArduinoJson to read/write without heavy external libraries.

#include <HTTPClient.h>
#include <WiFiClientSecure.h>
#include <ArduinoJson.h>

// Global config variables defined in esp32os.ino
extern String firebase_project_id;
extern String firebase_api_key;
extern String firebase_doc_path;

// Callback prototype defined in esp32os.ino
void onFirebaseWriteEvent(const String& topic, const String& payload);
void onFirebaseReadEvent(const String& topic, const String& payload);

// Hub configurations and variables from other files
extern String current_hub_host;
extern int current_hub_port;
extern String hub_host;
extern int hub_port;

// Token management variables
String firebase_jwt_token = "";
String firebase_id_token = "";
unsigned long token_fetched_millis = 0;

// Google Cloud OAuth 2.0 Access Token variables
String gcloud_access_token = "";
unsigned long gcloud_token_fetched_millis = 0;

// Function declarations
String getEspMacAddress();
bool refreshFirebaseToken();
bool isTokenExpired();
String exchangeCustomTokenForIdToken(const String& customToken);
bool refreshGcloudToken();
bool isGcloudTokenExpired();

// Forward declarations
String flatJsonToFirestore(const String& jsonStr);
String firestoreToFlatJson(const String& firestoreJson);

// Initializer: registers EventBus topic subscribers for asynchronous processing on Core 0
void initFirebase() {
  subscribe("firebase/write", "FirebaseWriteSubscriber", onFirebaseWriteEvent);
  subscribe("firebase/read", "FirebaseReadSubscriber", onFirebaseReadEvent);
  Serial.println("[Firebase] Module initialized. Subscribed to EventBus topics: 'firebase/write', 'firebase/read'");
}

// EventBus subscriber callback to write to Firestore asynchronously
void onFirebaseWriteEvent(const String& topic, const String& payload) {
  Serial.printf("[Firebase] EventBus write request received: %s\n", payload.c_str());
  
  JsonDocument doc;
  DeserializationError error = deserializeJson(doc, payload);
  
  String targetPath = firebase_doc_path;
  String flatData = "";

  if (!error) {
    if (doc.containsKey("path")) {
      targetPath = doc["path"].as<String>();
    }
    
    if (doc.containsKey("data")) {
      serializeJson(doc["data"], flatData);
    } else {
      serializeJson(doc, flatData);
    }
  } else {
    // If payload is not valid JSON, treat it as a raw string message and write it under key "message"
    JsonDocument fallbackDoc;
    fallbackDoc["message"] = payload;
    serializeJson(fallbackDoc, flatData);
  }

  targetPath.trim();
  if (targetPath.length() == 0) {
    Serial.println("[Firebase] Error: Write path is empty.");
    return;
  }

  bool success = firestoreWrite(targetPath, flatData);
  if (success) {
    Serial.printf("[Firebase] Async write to '%s' succeeded.\n", targetPath.c_str());
  } else {
    Serial.printf("[Firebase] Async write to '%s' failed.\n", targetPath.c_str());
  }
}

// EventBus subscriber callback to read from Firestore asynchronously and publish results back to EventBus
void onFirebaseReadEvent(const String& topic, const String& payload) {
  Serial.printf("[Firebase] EventBus read request received. Document path parameter: '%s'\n", payload.c_str());
  
  String targetPath = payload;
  targetPath.trim();
  if (targetPath.length() == 0) {
    targetPath = firebase_doc_path;
  }

  String result = firestoreRead(targetPath);
  if (result.length() > 0) {
    publish("firebase/read/result", result);
    Serial.printf("[Firebase] Async read from '%s' succeeded. Result published to 'firebase/read/result'\n", targetPath.c_str());
  } else {
    publish("firebase/read/result", "{\"error\":\"read_failed\"}");
    Serial.printf("[Firebase] Async read from '%s' failed. Error status published.\n", targetPath.c_str());
  }
}

// Writes flat JSON values to Google Firestore using a secure PATCH request (upsert behavior)
bool firestoreWrite(const String& docPath, const String& flatJsonPayload) {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("[Firebase] WiFi not connected. Aborting Firestore write.");
    return false;
  }
  if (firebase_project_id.length() == 0) {
    Serial.println("[Firebase] Firebase Project ID is empty. Aborting Firestore write.");
    return false;
  }

  // Auto-refresh token if expired
  if (isTokenExpired()) {
    Serial.println("[Firebase] JWT token expired or empty. Refreshing from Hub...");
    refreshFirebaseToken();
  }

  WiFiClientSecure client;
  client.setInsecure(); // SSL certificate check bypassed to avoid NTP sync requirement / certificate expiration crashes

  HTTPClient http;
  
  // Format target REST API URL:
  String url = "https://firestore.googleapis.com/v1/projects/" + firebase_project_id + "/databases/(default)/documents/" + docPath;
  
  if (firebase_id_token.length() > 0) {
    Serial.printf("[Firebase] HTTP PATCH to: %s (using Bearer Token)\n", url.c_str());
    http.begin(client, url);
    http.addHeader("Authorization", "Bearer " + firebase_id_token);
  } else {
    if (firebase_api_key.length() > 0) {
      url += "?key=" + firebase_api_key;
    }
    Serial.printf("[Firebase] HTTP PATCH to: %s (using API Key)\n", url.c_str());
    http.begin(client, url);
  }
  http.addHeader("Content-Type", "application/json");

  String firestorePayload = flatJsonToFirestore(flatJsonPayload);
  if (firestorePayload.length() == 0) {
    Serial.println("[Firebase] Failed to format payload to Firestore structure.");
    http.end();
    return false;
  }

  int httpResponseCode = http.sendRequest("PATCH", firestorePayload);
  bool success = false;

  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.printf("[Firebase] HTTP response code: %d\n", httpResponseCode);
    if (httpResponseCode >= 200 && httpResponseCode < 300) {
      success = true;
    } else {
      Serial.printf("[Firebase] Firestore response error: %s\n", response.c_str());
    }
  } else {
    Serial.printf("[Firebase] HTTP error: %s\n", http.errorToString(httpResponseCode).c_str());
  }

  http.end();
  return success;
}

// Reads a document from Firestore, converts to flat JSON, and returns the result string
String firestoreRead(const String& docPath) {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("[Firebase] WiFi not connected. Aborting Firestore read.");
    return "";
  }
  if (firebase_project_id.length() == 0) {
    Serial.println("[Firebase] Firebase Project ID is empty. Aborting Firestore read.");
    return "";
  }

  // Auto-refresh token if expired
  if (isTokenExpired()) {
    Serial.println("[Firebase] JWT token expired or empty. Refreshing from Hub...");
    refreshFirebaseToken();
  }

  WiFiClientSecure client;
  client.setInsecure();

  HTTPClient http;

  // Format target REST API URL:
  String url = "https://firestore.googleapis.com/v1/projects/" + firebase_project_id + "/databases/(default)/documents/" + docPath;
  
  if (firebase_id_token.length() > 0) {
    Serial.printf("[Firebase] HTTP GET to: %s (using Bearer Token)\n", url.c_str());
    http.begin(client, url);
    http.addHeader("Authorization", "Bearer " + firebase_id_token);
  } else {
    if (firebase_api_key.length() > 0) {
      url += "?key=" + firebase_api_key;
    }
    Serial.printf("[Firebase] HTTP GET to: %s (using API Key)\n", url.c_str());
    http.begin(client, url);
  }
  int httpResponseCode = http.GET();
  String flatResult = "";

  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.printf("[Firebase] HTTP response code: %d\n", httpResponseCode);
    if (httpResponseCode >= 200 && httpResponseCode < 300) {
      flatResult = firestoreToFlatJson(response);
    } else {
      Serial.printf("[Firebase] Firestore response error: %s\n", response.c_str());
    }
  } else {
    Serial.printf("[Firebase] HTTP error: %s\n", http.errorToString(httpResponseCode).c_str());
  }

  http.end();
  return flatResult;
}

// Converts a simple flat JSON string into the complex nested Google Firestore REST API format:
// {"fields": {"key1": {"stringValue": "val"}, "key2": {"integerValue": "100"}}}
String flatJsonToFirestore(const String& jsonStr) {
  JsonDocument doc;
  DeserializationError error = deserializeJson(doc, jsonStr);
  if (error) {
    Serial.printf("[Firebase] Helper JSON parsing failed: %s\n", error.c_str());
    return "";
  }

  JsonDocument outDoc;
  JsonObject fields = outDoc["fields"].to<JsonObject>();

  JsonObject rootObj = doc.as<JsonObject>();
  for (JsonPair p : rootObj) {
    String key = p.key().c_str();
    JsonVariant val = p.value();
    JsonObject valObj = fields[key].to<JsonObject>();

    if (val.is<bool>()) {
      valObj["booleanValue"] = val.as<bool>();
    } else if (val.is<int>() || val.is<long>() || val.is<short>()) {
      valObj["integerValue"] = String(val.as<long>()); // Firestore integerValue schema expects a string representation
    } else if (val.is<float>() || val.is<double>()) {
      valObj["doubleValue"] = val.as<double>();
    } else if (val.is<const char*>() || val.is<String>()) {
      valObj["stringValue"] = val.as<String>();
    } else {
      // General fallback as string
      valObj["stringValue"] = val.as<String>();
    }
  }

  String output;
  serializeJson(outDoc, output);
  return output;
}

// Converts complex nested Firestore REST API format back to a simple flat JSON string
String firestoreToFlatJson(const String& firestoreJson) {
  JsonDocument doc;
  DeserializationError error = deserializeJson(doc, firestoreJson);
  if (error) {
    Serial.printf("[Firebase] Helper parsing Firestore JSON failed: %s\n", error.c_str());
    return "";
  }

  if (!doc.containsKey("fields")) {
    Serial.println("[Firebase] Warning: Received Firestore document does not contain 'fields' key.");
    return "{}";
  }

  JsonDocument outDoc;
  JsonObject fields = doc["fields"].as<JsonObject>();
  for (JsonPair p : fields) {
    String key = p.key().c_str();
    JsonObject valObj = p.value().as<JsonObject>();

    if (valObj.containsKey("stringValue")) {
      outDoc[key] = valObj["stringValue"].as<String>();
    } else if (valObj.containsKey("integerValue")) {
      outDoc[key] = valObj["integerValue"].as<String>().toInt();
    } else if (valObj.containsKey("doubleValue")) {
      outDoc[key] = valObj["doubleValue"].as<double>();
    } else if (valObj.containsKey("booleanValue")) {
      outDoc[key] = valObj["booleanValue"].as<bool>();
    } else {
      // Map it as string if we can't identify a simple scalar
      outDoc[key] = p.value().as<String>();
    }
  }

  String output;
  serializeJson(outDoc, output);
  return output;
}

// Performs REST API DELETE request on the specified Firestore document path
bool firestoreDelete(const String& docPath) {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("[Firebase] WiFi not connected. Aborting Firestore delete.");
    return false;
  }
  if (firebase_project_id.length() == 0) {
    Serial.println("[Firebase] Firebase Project ID is empty. Aborting Firestore delete.");
    return false;
  }

  // Auto-refresh token if expired
  if (isTokenExpired()) {
    Serial.println("[Firebase] JWT token expired or empty. Refreshing from Hub...");
    refreshFirebaseToken();
  }

  WiFiClientSecure client;
  client.setInsecure();

  HTTPClient http;
  String url = "https://firestore.googleapis.com/v1/projects/" + firebase_project_id + "/databases/(default)/documents/" + docPath;
  
  if (firebase_id_token.length() > 0) {
    Serial.printf("[Firebase] HTTP DELETE to: %s (using Bearer Token)\n", url.c_str());
    http.begin(client, url);
    http.addHeader("Authorization", "Bearer " + firebase_id_token);
  } else {
    if (firebase_api_key.length() > 0) {
      url += "?key=" + firebase_api_key;
    }
    Serial.printf("[Firebase] HTTP DELETE to: %s (using API Key)\n", url.c_str());
    http.begin(client, url);
  }
  int httpResponseCode = http.sendRequest("DELETE");
  bool success = false;

  if (httpResponseCode >= 200 && httpResponseCode < 300) {
    success = true;
  } else {
    Serial.printf("[Firebase] Firestore DELETE response error: %d\n", httpResponseCode);
  }

  http.end();
  return success;
}

// Helper function to delete the hub IP config document from Firestore
bool delete_hub_ip_from_firestore() {
  return firestoreDelete("esp32hub/config");
}

// Helper function to fetch the hub IP and Port from Firestore config document
bool get_hub_ip_from_firestore(String &out_ip, int &out_port) {
  String flatJson = firestoreRead("esp32hub/config");
  if (flatJson.length() > 0) {
    JsonDocument doc;
    DeserializationError error = deserializeJson(doc, flatJson);
    if (!error) {
      if (doc.containsKey("ip")) {
        out_ip = doc["ip"].as<String>();
      }
      if (doc.containsKey("port")) {
        out_port = doc["port"].as<int>();
      }
      
      if (out_ip.length() > 0) {
        Serial.printf("🟢 [Firebase] Retrieved IP from Firestore: %s, Port: %d\n", out_ip.c_str(), out_port);
        return true;
      } else {
        Serial.println("❌ [Firebase] 'ip' field was missing in retrieved document.");
      }
    } else {
      Serial.printf("❌ [Firebase] JSON parse failed: %s\n", error.c_str());
    }
  }
  return false;
}

// Checks if the active Firebase JWT token is expired (approx 50 minutes threshold for a 1-hour token)
bool isTokenExpired() {
  if (firebase_jwt_token.length() == 0 || firebase_id_token.length() == 0) return true;
  if (millis() - token_fetched_millis > 3000000) {
    return true;
  }
  return false;
}

// Fetches a new Firebase Custom Token (JWT) from the local hub and exchanges it for a Firebase ID Token
bool refreshFirebaseToken() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("[Firebase] WiFi not connected. Cannot refresh Firebase Token.");
    return false;
  }

  String host = current_hub_host;
  int port = current_hub_port;
  if (host.length() == 0) {
    host = hub_host;
    port = hub_port;
  }

  WiFiClient client;
  HTTPClient http;

  String url = "http://" + host + ":" + String(port) + "/firebase-token?mac=" + getEspMacAddress();
  Serial.printf("[Firebase] Requesting new Firebase token from: %s\n", url.c_str());

  http.begin(client, url);
  int httpResponseCode = http.GET();
  bool success = false;

  if (httpResponseCode == 200) {
    String response = http.getString();
    JsonDocument doc;
    DeserializationError error = deserializeJson(doc, response);
    if (!error && doc.containsKey("token")) {
      String custom_token = doc["token"].as<String>();
      Serial.println("[Firebase] Successfully retrieved Firebase Custom Token from Hub. Exchanging for ID Token...");
      
      // Perform the exchange
      String id_token = exchangeCustomTokenForIdToken(custom_token);
      if (id_token.length() > 0) {
        firebase_jwt_token = custom_token;
        firebase_id_token = id_token;
        token_fetched_millis = millis();
        Serial.println("[Firebase] Successfully exchanged and updated Firebase ID Token!");
        success = true;
      } else {
        Serial.println("[Firebase] Exchange failed. Token not updated.");
      }
    } else {
      Serial.println("[Firebase] Failed to parse JSON token response from Hub.");
    }
  } else {
    Serial.printf("[Firebase] HTTP error requesting token from Hub. Response code: %d\n", httpResponseCode);
  }

  http.end();
  return success;
}

// Exchange Custom Token for Firebase ID Token using Firebase Auth REST API
String exchangeCustomTokenForIdToken(const String& customToken) {
  if (customToken.length() == 0) return "";
  
  WiFiClientSecure client;
  client.setInsecure();
  
  HTTPClient http;
  String url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=" + firebase_api_key;
  
  http.begin(client, url);
  http.addHeader("Content-Type", "application/json");
  
  JsonDocument doc;
  doc["token"] = customToken;
  doc["returnSecureToken"] = true;
  
  String payload;
  serializeJson(doc, payload);
  
  int httpResponseCode = http.POST(payload);
  String idToken = "";
  
  if (httpResponseCode == 200) {
    String response = http.getString();
    JsonDocument respDoc;
    DeserializationError error = deserializeJson(respDoc, response);
    if (!error && respDoc.containsKey("idToken")) {
      idToken = respDoc["idToken"].as<String>();
      Serial.println("[Firebase] Successfully exchanged Custom Token for ID Token.");
    } else {
      Serial.println("[Firebase] Failed to parse ID Token from exchange response.");
    }
  } else {
    Serial.printf("[Firebase] Custom Token exchange failed with HTTP code: %d\n", httpResponseCode);
    if (httpResponseCode > 0) {
      Serial.println(http.getString());
    }
  }
  
  http.end();
  return idToken;
}

// Checks if the Google Access Token is expired (50 minutes threshold)
bool isGcloudTokenExpired() {
  if (gcloud_access_token.length() == 0) return true;
  if (millis() - gcloud_token_fetched_millis > 3000000) {
    return true;
  }
  return false;
}

// Fetches a new Google OAuth 2.0 Access Token from the local hub
bool refreshGcloudToken() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("[Google Cloud] WiFi not connected. Cannot refresh Google Access Token.");
    return false;
  }

  String host = current_hub_host;
  int port = current_hub_port;
  if (host.length() == 0) {
    host = hub_host;
    port = hub_port;
  }

  WiFiClient client;
  HTTPClient http;

  String url = "http://" + host + ":" + String(port) + "/gcloud-token?mac=" + getEspMacAddress();
  Serial.printf("[Google Cloud] Requesting new Google Access Token from: %s\n", url.c_str());

  http.begin(client, url);
  int httpResponseCode = http.GET();
  bool success = false;

  if (httpResponseCode == 200) {
    String response = http.getString();
    JsonDocument doc;
    DeserializationError error = deserializeJson(doc, response);
    if (!error && doc.containsKey("access_token")) {
      gcloud_access_token = doc["access_token"].as<String>();
      gcloud_token_fetched_millis = millis();
      Serial.println("[Google Cloud] Successfully retrieved and updated Google Access Token!");
      success = true;
    } else {
      Serial.println("[Google Cloud] Failed to parse JSON token response from Hub.");
    }
  } else {
    Serial.printf("[Google Cloud] HTTP error requesting Google token from Hub. Response code: %d\n", httpResponseCode);
  }

  http.end();
  return success;
}

