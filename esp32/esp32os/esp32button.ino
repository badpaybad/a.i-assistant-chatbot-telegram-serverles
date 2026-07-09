#include <nvs_flash.h>

extern Preferences preferences;

#define RESET_BUTTON_PIN 9 // External reset button connected to GPIO 9 chân còn lại của nút đấu GND
#define BTN_HOLD_RESET_MS 10000 // hold this many ms to trigger factory reset

// FreeRTOS task: polls RESET button (GPIO 9) every 50 ms.
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
  vTaskDelay(pdMS_TO_TICKS(2000));

  // Serial.println("[Button] GPIO 9 : " + digitalRead(RESET_BUTTON_PIN));

  // ── Guard 2: wait for pin to be observed HIGH (idle/released) ──
  // A valid button press MUST be a HIGH→LOW transition.
  {
    bool gpioReady = false;
    unsigned long waitStart = millis();
    while (millis() - waitStart < 15000) {
      if (digitalRead(RESET_BUTTON_PIN) == HIGH) {
        gpioReady = true;
        break;
      }
      vTaskDelay(pdMS_TO_TICKS(100));
    }
    if (!gpioReady) {
      Serial.println("[Button] GPIO 9 stuck LOW after 15s – button monitoring disabled.");
      Serial.flush();
      vTaskDelete(NULL);
      return;
    }
  }

  Serial.printf("[Button] Polling task ready. Hold RESET button (GPIO %d) 10s to factory reset.\n", RESET_BUTTON_PIN);
  Serial.flush();

  // ── Guard 3: require seenHigh before accepting any LOW as a press ──
  bool seenHigh = true;

  // Consecutive LOW count for debounce (3 × 50 ms = 150 ms sustained LOW needed)
  const int PRESS_CONFIRM_COUNT = 3;
  int lowCount = 0;

  for (;;) {
    bool pinLow = (digitalRead(RESET_BUTTON_PIN) == LOW);

    if (!pinLow) {
      // ── Pin is HIGH: button released / idle ──
      seenHigh = true;
      lowCount = 0;
      if (isHeld) {
        isHeld  = false;
        fired5s = false;
        fired8s = false;
        Serial.println("[Button] Released – factory reset cancelled.");
        Serial.flush();
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
        Serial.flush();
      }
    }

    if (isHeld) {
      unsigned long heldMs = millis() - pressStartMs;

      if (!fired5s && heldMs >= 5000) {
        fired5s = true;
        play_beep(440, 150);
        Serial.println("[Button] 5s / 10s – keep holding...");
        Serial.flush();
      }
      if (!fired8s && heldMs >= 8000) {
        fired8s = true;
        play_beep(660, 100);
        delay(80);
        play_beep(660, 100);
        Serial.println("[Button] 8s / 10s – almost there!");
        Serial.flush();
      }
      if (heldMs >= BTN_HOLD_RESET_MS) {
        Serial.println("\n🚨 [Button] 10s hold confirmed! Wiping all config and restarting...");
        Serial.flush();

        play_beep(1046, 150); // C6
        delay(60);
        play_beep(784,  150); // G5
        delay(60);
        play_beep(523,  300); // C5 (long)
        delay(300);

        // 1. Explicitly clear all Preferences namespaces
        Serial.println("[Button] Clearing Preferences namespaces...");
        Serial.flush();
        
        preferences.begin("wifi-creds", false);
        preferences.clear();
        preferences.end();
        
        preferences.begin("gemini-config", false);
        preferences.clear();
        preferences.end();
        
        preferences.begin("firebase-cfg", false);
        preferences.clear();
        preferences.end();
        
        preferences.begin("hub-config", false);
        preferences.clear();
        preferences.end();

        // 2. Erase the entire default NVS partition (requires deinitializing first)
        Serial.println("[Button] Deinitializing NVS flash...");
        Serial.flush();
        nvs_flash_deinit();

        Serial.println("[Button] Erasing NVS flash partition...");
        Serial.flush();
        esp_err_t err = nvs_flash_erase();
        if (err == ESP_OK) {
          Serial.println("[Button] NVS partition erased successfully.");
        } else {
          Serial.printf("[Button] NVS partition erase failed: %d\n", err);
        }
        Serial.flush();
        
        // Re-initialize NVS so it's clean and ready for the next boot
        err = nvs_flash_init();
        if (err == ESP_OK) {
          Serial.println("[Button] NVS partition initialized successfully.");
        } else {
          Serial.printf("[Button] NVS partition init failed: %d\n", err);
        }
        Serial.flush();

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
  // Configure RESET button pin as INPUT_PULLUP
  pinMode(RESET_BUTTON_PIN, INPUT_PULLUP);

  xTaskCreatePinnedToCore(
    buttonPollingTask,
    "BtnPoll",
    8192,  // Increased stack size to prevent overflow during NVS writes
    NULL,
    1,
    NULL,
    0  // Core 0, away from I2S-heavy loop() on Core 1
  );
}
