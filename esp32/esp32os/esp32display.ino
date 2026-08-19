// esp32display.ino - 2.8" TFT LCD Touch ILI9341 (320x240) Configuration & Live Voice Chat Display
// Cap nhat 21: Hien thi thong so cau hinh he thong esp32os da luu tu esp32uiconfig.ino
// Cap nhat 22: Hien thi text transcription (Nguoi dung & Tro ly AI Du) tren man hinh khi tro chuyen

#include <SPI.h>
#include <TFT_eSPI.h>
#include "User_Setup.h"

// Backlight Pin
#ifndef TFT_BL
#define TFT_BL 20
#endif

// Global TFT instance
TFT_eSPI tft = TFT_eSPI();

// Touch Calibration parameters from esp32tfttouchili9341.ino
static uint16_t calData[5] = { 270, 3611, 252, 3545, 7 };

// Reference global configuration and status variables
extern String gemini_api_key;
extern String gemini_model;
extern String firebase_project_id;
extern String firebase_api_key;
extern String firebase_doc_path;
extern String hub_host;
extern int hub_port;
extern String current_hub_host;
extern int current_hub_port;
extern bool inApMode;
extern const char* AP_SSID;
extern volatile bool live_chat_active;
extern WebSocketsClient webSocket;
extern String getEspMacAddress();

// Function declaration from esp32wifi.ino
extern void loadWifiCredentials(WifiCreds savedCreds[], int &count);

// Display modes
enum DisplayMode {
    DISPLAY_MODE_CONFIG,
    DISPLAY_MODE_CHAT
};

static DisplayMode current_display_mode = DISPLAY_MODE_CONFIG;

// Live Chat text state variables
static String last_user_raw_text = "";
static String current_model_raw_text = "";
static String last_user_text = "";
static String current_model_text = "";
static String chat_status = "STANDBY";
static unsigned long last_chat_activity = 0;

// Display state timers
static unsigned long last_display_refresh = 0;
static unsigned long last_touch_time = 0;
static bool display_initialized = false;

// Custom colors (RGB565)
#define COLOR_BG        0x0841  // Very dark slate/navy
#define COLOR_CARD_BG   0x1082  // Dark card background
#define COLOR_BORDER    0x2965  // Subtle border
#define COLOR_ACCENT    0x057D  // Vibrant Cyan
#define COLOR_TITLE     0x07FF  // Bright Cyan
#define COLOR_TEXT      0xFFFF  // White
#define COLOR_SUBTEXT   0xAD75  // Muted gray-cyan
#define COLOR_GREEN     0x07E0  // Bright Green
#define COLOR_YELLOW    0xFFE0  // Yellow
#define COLOR_RED       0xF800  // Red
#define COLOR_ORANGE    0xFD20  // Orange

// Helper: Mask sensitive string showing first 6 and last 4 chars
String maskKey(const String& key) {
    if (key.length() == 0) return "[NOT SET]";
    if (key.length() <= 10) return "******";
    return key.substring(0, 5) + "..." + key.substring(key.length() - 4);
}

// Convert Vietnamese Unicode UTF-8 (NFC & NFD) to clean, legible ASCII for TFT Display
String decodeVietnameseUtf8(const String& input) {
    String out = "";
    out.reserve(input.length());
    size_t i = 0;
    size_t len = input.length();

    while (i < len) {
        uint8_t c = (uint8_t)input[i];

        if (c < 0x80) {
            // Standard ASCII
            out += (char)c;
            i++;
        } else if ((c & 0xE0) == 0xC0) {
            // 2-byte sequence
            if (i + 1 < len) {
                uint8_t c2 = (uint8_t)input[i + 1];
                if (c == 0xC3) {
                    switch (c2) {
                        case 0x80: case 0x81: case 0x82: case 0x83: out += 'A'; break; // À, Á, Â, Ã
                        case 0xA0: case 0xA1: case 0xA2: case 0xA3: out += 'a'; break; // à, á, â, ã
                        case 0x88: case 0x89: case 0x8A: out += 'E'; break; // È, É, Ê
                        case 0xA8: case 0xA9: case 0xAA: out += 'e'; break; // è, é, ê
                        case 0x8C: case 0x8D: out += 'I'; break; // Ì, Í
                        case 0xAC: case 0xAD: out += 'i'; break; // ì, í
                        case 0x92: case 0x93: case 0x94: case 0x95: out += 'O'; break; // Ò, Ó, Ô, Õ
                        case 0xB2: case 0xB3: case 0xB4: case 0xB5: out += 'o'; break; // ò, ó, ô, õ
                        case 0x99: case 0x9A: out += 'U'; break; // Ù, Ú
                        case 0xB9: case 0xBA: out += 'u'; break; // ù, ú
                        case 0x9D: out += 'Y'; break; // Ý
                        case 0xBD: out += 'y'; break; // ý
                        default: break;
                    }
                } else if (c == 0xC4) {
                    switch (c2) {
                        case 0x82: out += 'A'; break; // Ă
                        case 0x83: out += 'a'; break; // ă
                        case 0x90: out += 'D'; break; // Đ
                        case 0x91: out += 'd'; break; // đ
                        case 0xA8: out += 'I'; break; // Ĩ
                        case 0xA9: out += 'i'; break; // ĩ
                        default: break;
                    }
                } else if (c == 0xC5) {
                    switch (c2) {
                        case 0xA8: out += 'U'; break; // Ũ
                        case 0xA9: out += 'u'; break; // ũ
                        default: break;
                    }
                } else if (c == 0xC6) {
                    switch (c2) {
                        case 0xA0: out += 'O'; break; // Ơ
                        case 0xA1: out += 'o'; break; // ơ
                        case 0xAF: out += 'U'; break; // Ư
                        case 0xB0: out += 'u'; break; // ư
                        default: break;
                    }
                } else if (c == 0xCC || c == 0xCD) {
                    // Combining Diacritical Marks (Decomposed NFD) - Skip tone mark
                }
                i += 2;
            } else {
                i++;
            }
        } else if ((c & 0xF0) == 0xE0) {
            // 3-byte sequence (Latin Extended Additional - Vietnamese precomposed chars)
            if (i + 2 < len) {
                uint8_t c2 = (uint8_t)input[i + 1];
                uint8_t c3 = (uint8_t)input[i + 2];

                if (c == 0xE1 && c2 == 0xBA) {
                    if (c3 >= 0xA0 && c3 <= 0xB7) {
                        out += (c3 % 2 == 0) ? 'A' : 'a'; // ạ, ả, ấ, ầ, ẩ, ẫ, ậ, ắ, ằ, ẳ, ẵ, ặ
                    } else if (c3 >= 0xB8 && c3 <= 0xBF) {
                        out += (c3 % 2 == 0) ? 'E' : 'e'; // ẹ, ẻ, ẽ, ế
                    }
                } else if (c == 0xE1 && c2 == 0xBB) {
                    if (c3 >= 0x80 && c3 <= 0x87) {
                        out += (c3 % 2 == 0) ? 'E' : 'e'; // ề, ể, ễ, ệ
                    } else if (c3 >= 0x88 && c3 <= 0x8B) {
                        out += (c3 % 2 == 0) ? 'I' : 'i'; // ỉ, ị
                    } else if (c3 >= 0x8C && c3 <= 0xA3) {
                        out += (c3 % 2 == 0) ? 'O' : 'o'; // ọ, ỏ, ố, ồ, ổ, ỗ, ộ, ớ, ờ, ở, ỡ, ợ
                    } else if (c3 >= 0xA4 && c3 <= 0xB1) {
                        out += (c3 % 2 == 0) ? 'U' : 'u'; // ụ, ủ, ứng, ứ, ừ, ử, ữ, ự
                    } else if (c3 >= 0xB2 && c3 <= 0xB9) {
                        out += (c3 % 2 == 0) ? 'Y' : 'y'; // ỳ, ỵ, ỷ, ỹ
                    }
                }
                i += 3;
            } else {
                i++;
            }
        } else if ((c & 0xF8) == 0xF0) {
            // 4-byte sequence (Emojis/special symbols)
            i += (i + 3 < len) ? 4 : 1;
        } else {
            i++;
        }
    }
    return out;
}

// Parses a single UTF-8 sequence into Vietnamese base char + diacritic marks
VnCharInfo parseNextVnChar(const char* str, size_t len) {
    VnCharInfo info = {' ', 0, 0, 1};
    if (len == 0) return info;

    uint8_t c = (uint8_t)str[0];

    // 1-byte ASCII
    if (c < 0x80) {
        info.base = (char)c;
        info.bytes = 1;
        return info;
    }

    // 2-byte UTF-8
    if ((c & 0xE0) == 0xC0 && len >= 2) {
        uint8_t c2 = (uint8_t)str[1];
        info.bytes = 2;

        if (c == 0xC3) {
            switch (c2) {
                case 0x80: info.base = 'A'; info.tone = 2; return info; // À
                case 0x81: info.base = 'A'; info.tone = 1; return info; // Á
                case 0x82: info.base = 'A'; info.hat = 1; return info;  // Â
                case 0x83: info.base = 'A'; info.tone = 4; return info; // Ã
                case 0xA0: info.base = 'a'; info.tone = 2; return info; // à
                case 0xA1: info.base = 'a'; info.tone = 1; return info; // á
                case 0xA2: info.base = 'a'; info.hat = 1; return info;  // â
                case 0xA3: info.base = 'a'; info.tone = 4; return info; // ã

                case 0x88: info.base = 'E'; info.tone = 2; return info; // È
                case 0x89: info.base = 'E'; info.tone = 1; return info; // É
                case 0x8A: info.base = 'E'; info.hat = 1; return info;  // Ê
                case 0xA8: info.base = 'e'; info.tone = 2; return info; // è
                case 0xA9: info.base = 'e'; info.tone = 1; return info; // é
                case 0xAA: info.base = 'e'; info.hat = 1; return info;  // ê

                case 0x8C: info.base = 'I'; info.tone = 2; return info; // Ì
                case 0x8D: info.base = 'I'; info.tone = 1; return info; // Í
                case 0xAC: info.base = 'i'; info.tone = 2; return info; // ì
                case 0xAD: info.base = 'i'; info.tone = 1; return info; // í

                case 0x92: info.base = 'O'; info.tone = 2; return info; // Ò
                case 0x93: info.base = 'O'; info.tone = 1; return info; // Ó
                case 0x94: info.base = 'O'; info.hat = 1; return info;  // Ô
                case 0x95: info.base = 'O'; info.tone = 4; return info; // Õ
                case 0xB2: info.base = 'o'; info.tone = 2; return info; // ò
                case 0xB3: info.base = 'o'; info.tone = 1; return info; // ó
                case 0xB4: info.base = 'o'; info.hat = 1; return info;  // ô
                case 0xB5: info.base = 'o'; info.tone = 4; return info; // õ

                case 0x99: info.base = 'U'; info.tone = 2; return info; // Ù
                case 0x9A: info.base = 'U'; info.tone = 1; return info; // Ú
                case 0xB9: info.base = 'u'; info.tone = 2; return info; // ù
                case 0xBA: info.base = 'u'; info.tone = 1; return info; // ú

                case 0x9D: info.base = 'Y'; info.tone = 1; return info; // Ý
                case 0xBD: info.base = 'y'; info.tone = 1; return info; // ý
                default: info.base = '?'; return info;
            }
        } else if (c == 0xC4) {
            switch (c2) {
                case 0x82: info.base = 'A'; info.hat = 2; return info; // Ă
                case 0x83: info.base = 'a'; info.hat = 2; return info; // ă
                case 0x90: info.base = 'D'; info.hat = 4; return info; // Đ
                case 0x91: info.base = 'd'; info.hat = 4; return info; // đ
                case 0xA8: info.base = 'I'; info.tone = 4; return info; // Ĩ
                case 0xA9: info.base = 'i'; info.tone = 4; return info; // ĩ
                default: info.base = '?'; return info;
            }
        } else if (c == 0xC5) {
            switch (c2) {
                case 0xA8: info.base = 'U'; info.tone = 4; return info; // Ũ
                case 0xA9: info.base = 'u'; info.tone = 4; return info; //ũ
                default: info.base = '?'; return info;
            }
        } else if (c == 0xC6) {
            switch (c2) {
                case 0xA0: info.base = 'O'; info.hat = 3; return info; // Ơ
                case 0xA1: info.base = 'o'; info.hat = 3; return info; // ơ
                case 0xAF: info.base = 'U'; info.hat = 3; return info; // Ư
                case 0xB0: info.base = 'u'; info.hat = 3; return info; // ư
                default: info.base = '?'; return info;
            }
        }
    }

    // 3-byte UTF-8
    if ((c & 0xF0) == 0xE0 && len >= 3) {
        uint8_t c2 = (uint8_t)str[1];
        uint8_t c3 = (uint8_t)str[2];
        info.bytes = 3;

        if (c == 0xE1 && c2 == 0xBA) {
            // A variants
            if (c3 >= 0xA0 && c3 <= 0xB7) {
                info.base = (c3 % 2 == 0) ? 'A' : 'a';
                uint8_t offset = (c3 - 0xA0) / 2;
                if (offset == 0) { info.tone = 5; }
                else if (offset == 1) { info.tone = 3; }
                else if (offset >= 2 && offset <= 6) {
                    info.hat = 1;
                    const uint8_t tones[] = {1, 2, 3, 4, 5};
                    info.tone = tones[offset - 2];
                } else if (offset >= 7 && offset <= 11) {
                    info.hat = 2;
                    const uint8_t tones[] = {1, 2, 3, 4, 5};
                    info.tone = tones[offset - 7];
                }
                return info;
            }
            // E variants (ẹ, ẻ, ẽ, ế)
            if (c3 >= 0xB8 && c3 <= 0xBF) {
                info.base = (c3 % 2 == 0) ? 'E' : 'e';
                uint8_t offset = (c3 - 0xB8) / 2;
                if (offset == 0) { info.tone = 5; }
                else if (offset == 1) { info.tone = 3; }
                else if (offset == 2) { info.tone = 4; }
                else if (offset == 3) { info.hat = 1; info.tone = 1; }
                return info;
            }
        } else if (c == 0xE1 && c2 == 0xBB) {
            // E variants (ề, ể, ễ, ệ)
            if (c3 >= 0x80 && c3 <= 0x87) {
                info.base = (c3 % 2 == 0) ? 'E' : 'e';
                info.hat = 1;
                uint8_t offset = (c3 - 0x80) / 2;
                const uint8_t tones[] = {2, 3, 4, 5};
                info.tone = tones[offset];
                return info;
            }
            // I variants (ỉ, ị)
            if (c3 >= 0x88 && c3 <= 0x8B) {
                info.base = (c3 % 2 == 0) ? 'I' : 'i';
                uint8_t offset = (c3 - 0x88) / 2;
                info.tone = (offset == 0) ? 3 : 5;
                return info;
            }
            // O variants
            if (c3 >= 0x8C && c3 <= 0xA3) {
                info.base = (c3 % 2 == 0) ? 'O' : 'o';
                uint8_t offset = (c3 - 0x8C) / 2;
                if (offset == 0) { info.tone = 5; }
                else if (offset == 1) { info.tone = 3; }
                else if (offset >= 2 && offset <= 6) {
                    info.hat = 1;
                    const uint8_t tones[] = {1, 2, 3, 4, 5};
                    info.tone = tones[offset - 2];
                } else if (offset >= 7 && offset <= 11) {
                    info.hat = 3;
                    const uint8_t tones[] = {1, 2, 3, 4, 5};
                    info.tone = tones[offset - 7];
                }
                return info;
            }
            // U variants
            if (c3 >= 0xA4 && c3 <= 0xB1) {
                info.base = (c3 % 2 == 0) ? 'U' : 'u';
                uint8_t offset = (c3 - 0xA4) / 2;
                if (offset == 0) { info.tone = 5; }
                else if (offset == 1) { info.tone = 3; }
                else if (offset >= 2 && offset <= 6) {
                    info.hat = 3;
                    const uint8_t tones[] = {1, 2, 3, 4, 5};
                    info.tone = tones[offset - 2];
                }
                return info;
            }
            // Y variants (ỳ, ỵ, ỷ, ỹ)
            if (c3 >= 0xB2 && c3 <= 0xB9) {
                info.base = (c3 % 2 == 0) ? 'Y' : 'y';
                uint8_t offset = (c3 - 0xB2) / 2;
                const uint8_t tones[] = {2, 5, 3, 4};
                info.tone = tones[offset];
                return info;
            }
        }
    }

    // 4-byte UTF-8
    if ((c & 0xF8) == 0xF0 && len >= 4) {
        info.base = ' ';
        info.bytes = 4;
        return info;
    }

    info.base = (char)c;
    info.bytes = 1;
    return info;
}

// Draws a single Vietnamese character with accurate tone marks and hats
void drawVietnameseChar(const VnCharInfo& info, int charX, int charY, uint16_t textColor, uint16_t bgColor, uint8_t font) {
    // Draw base character
    tft.setTextColor(textColor, bgColor);
    tft.setTextSize(1);
    char buf[2] = {info.base, '\0'};
    tft.drawString(buf, charX, charY, font);

    int charW = tft.textWidth(buf, font);
    int midX = charX + (charW / 2);
    bool isUpper = (info.base >= 'A' && info.base <= 'Z');
    int topY = isUpper ? (charY + 1) : (charY + 4);

    // 1. Draw Hat/Modifier
    if (info.hat == 1) {
        // Mũ Circumflex (^)
        tft.drawLine(midX - 2, topY, midX, topY - 2, textColor);
        tft.drawLine(midX, topY - 2, midX + 2, topY, textColor);
    } else if (info.hat == 2) {
        // Trăng Breve (˘)
        tft.drawPixel(midX - 2, topY - 2, textColor);
        tft.drawLine(midX - 1, topY - 1, midX + 1, topY - 1, textColor);
        tft.drawPixel(midX + 2, topY - 2, textColor);
    } else if (info.hat == 3) {
        // Râu Horn (ơ, ư)
        tft.drawLine(charX + charW - 1, topY + 1, charX + charW + 1, topY - 2, textColor);
    } else if (info.hat == 4) {
        // Gạch Đ / đ
        int barY = isUpper ? (charY + 7) : (charY + 6);
        tft.drawLine(charX - 1, barY, charX + charW - 1, barY, textColor);
    }

    // 2. Draw Tone Mark
    if (info.tone == 1) {
        // Sắc (Acute /)
        if (info.hat == 1 || info.hat == 2) {
            tft.drawLine(midX + 1, topY - 2, midX + 3, topY - 4, textColor);
        } else {
            tft.drawLine(midX - 1, topY - 1, midX + 2, topY - 3, textColor);
        }
    } else if (info.tone == 2) {
        // Huyền (Grave \)
        if (info.hat == 1 || info.hat == 2) {
            tft.drawLine(midX - 3, topY - 4, midX - 1, topY - 2, textColor);
        } else {
            tft.drawLine(midX - 2, topY - 3, midX + 1, topY - 1, textColor);
        }
    } else if (info.tone == 3) {
        // Hỏi (Hook ?)
        if (info.hat == 1 || info.hat == 2) {
            tft.drawLine(midX + 1, topY - 4, midX + 3, topY - 4, textColor);
            tft.drawPixel(midX + 3, topY - 3, textColor);
            tft.drawPixel(midX + 2, topY - 2, textColor);
        } else {
            tft.drawLine(midX - 1, topY - 4, midX + 1, topY - 4, textColor);
            tft.drawPixel(midX + 1, topY - 3, textColor);
            tft.drawPixel(midX, topY - 2, textColor);
        }
    } else if (info.tone == 4) {
        // Ngã (Tilde ~)
        if (info.hat == 1 || info.hat == 2) {
            tft.drawLine(midX + 1, topY - 4, midX + 2, topY - 4, textColor);
            tft.drawLine(midX + 3, topY - 3, midX + 4, topY - 3, textColor);
        } else {
            tft.drawLine(midX - 2, topY - 3, midX - 1, topY - 3, textColor);
            tft.drawLine(midX, topY - 4, midX + 1, topY - 4, textColor);
            tft.drawLine(midX + 2, topY - 3, midX + 3, topY - 3, textColor);
        }
    } else if (info.tone == 5) {
        // Nặng (Dot below .)
        int dotY = isUpper ? (charY + 16) : (charY + 14);
        tft.fillRect(midX - 1, dotY, 2, 2, textColor);
    }
}

// Helper: Draw word-wrapped Vietnamese text with full Unicode diacritic accents inside a bounding box
void drawWrappedVietnameseText(const String& utf8Text, int x, int y, int maxW, int maxH, uint16_t textColor, uint16_t bgColor, uint8_t font) {
    int lineHeight = (font == 1) ? 12 : 18;
    int curX = x;
    int curY = y;

    size_t i = 0;
    size_t len = utf8Text.length();

    while (i < len) {
        // Check for newline
        if (utf8Text[i] == '\n') {
            curX = x;
            curY += lineHeight;
            if (curY + lineHeight > y + maxH) break;
            i++;
            continue;
        }

        // Measure next word width
        size_t wordStart = i;
        int wordW = 0;
        size_t wordScan = i;
        while (wordScan < len && utf8Text[wordScan] != ' ' && utf8Text[wordScan] != '\n') {
            VnCharInfo vi = parseNextVnChar(utf8Text.c_str() + wordScan, len - wordScan);
            char b[2] = {vi.base, '\0'};
            wordW += tft.textWidth(b, font);
            wordScan += vi.bytes;
        }

        // Wrap to next line if word exceeds max width
        if (curX + wordW > x + maxW && curX > x) {
            curX = x;
            curY += lineHeight;
            if (curY + lineHeight > y + maxH) break;
        }

        // Draw the word
        size_t wordDraw = wordStart;
        while (wordDraw < wordScan) {
            VnCharInfo vi = parseNextVnChar(utf8Text.c_str() + wordDraw, len - wordDraw);
            char b[2] = {vi.base, '\0'};
            int charW = tft.textWidth(b, font);

            if (curX + charW <= x + maxW && curY + lineHeight <= y + maxH) {
                drawVietnameseChar(vi, curX, curY, textColor, bgColor, font);
            }
            curX += charW;
            wordDraw += vi.bytes;
        }

        // Handle trailing space
        i = wordScan;
        if (i < len && utf8Text[i] == ' ') {
            int spaceW = tft.textWidth(" ", font);
            curX += spaceW;
            i++;
        }
    }
}

// Render complete dashboard of all ESP32 OS configurations
void renderConfigDisplay() {
    tft.fillScreen(COLOR_BG);

    // =========================================================================
    // 1. HEADER BAR (Y: 0 -> 24)
    // =========================================================================
    tft.fillRect(0, 0, 320, 24, 0x0010);
    tft.drawFastHLine(0, 24, 320, COLOR_ACCENT);

    tft.setTextColor(COLOR_TITLE, 0x0010);
    tft.setTextSize(1);
    tft.drawString("ESP32 OS - SYSTEM CONFIG", 10, 8, 2);

    // WiFi Indicator on Header
    if (inApMode) {
        tft.setTextColor(COLOR_YELLOW, 0x0010);
        tft.drawString("[AP MODE]", 245, 8, 2);
    } else if (WiFi.status() == WL_CONNECTED) {
        tft.setTextColor(COLOR_GREEN, 0x0010);
        tft.drawString("[ONLINE]", 255, 8, 2);
    } else {
        tft.setTextColor(COLOR_RED, 0x0010);
        tft.drawString("[OFFLINE]", 245, 8, 2);
    }

    // =========================================================================
    // 2. CARD 1: WIFI & NETWORK CONFIGURATION (Y: 28 -> 88)
    // =========================================================================
    tft.fillRoundRect(6, 28, 308, 58, 4, COLOR_CARD_BG);
    tft.drawRoundRect(6, 28, 308, 58, 4, COLOR_BORDER);

    // Title tag
    tft.setTextColor(COLOR_ACCENT, COLOR_CARD_BG);
    tft.drawString("1. WIFI & NETWORK", 12, 32, 2);

    // Count remembered networks
    WifiCreds savedCreds[5];
    int savedCount = 0;
    loadWifiCredentials(savedCreds, savedCount);

    tft.setTextColor(COLOR_SUBTEXT, COLOR_CARD_BG);
    tft.drawString("Saved: " + String(savedCount) + "/5", 240, 32, 2);

    // Line 1: SSID and RSSI
    tft.setTextColor(COLOR_TEXT, COLOR_CARD_BG);
    if (inApMode) {
        tft.drawString("SSID: " + String(AP_SSID) + " (Hotspot)", 12, 48, 1);
        tft.drawString("IP: 192.168.4.1", 12, 60, 1);
    } else if (WiFi.status() == WL_CONNECTED) {
        String ssidStr = "SSID: " + WiFi.SSID();
        if (ssidStr.length() > 24) ssidStr = ssidStr.substring(0, 24) + "..";
        tft.drawString(ssidStr, 12, 48, 1);

        String ipStr = "IP: " + WiFi.localIP().toString() + " (" + String(WiFi.RSSI()) + "dBm)";
        tft.drawString(ipStr, 12, 60, 1);
    } else {
        tft.drawString("SSID: Disconnected (Retrying...)", 12, 48, 1);
        tft.drawString("IP: 0.0.0.0", 12, 60, 1);
    }

    // Line 2: MAC Address
    tft.setTextColor(COLOR_SUBTEXT, COLOR_CARD_BG);
    tft.drawString("MAC: " + getEspMacAddress(), 12, 72, 1);

    // =========================================================================
    // 3. CARD 2: LOCAL HUB & GEMINI CONFIGURATION (Y: 90 -> 150)
    // =========================================================================
    tft.fillRoundRect(6, 90, 308, 58, 4, COLOR_CARD_BG);
    tft.drawRoundRect(6, 90, 308, 58, 4, COLOR_BORDER);

    // Title tag
    tft.setTextColor(COLOR_ACCENT, COLOR_CARD_BG);
    tft.drawString("2. ESP32 HUB & GEMINI AI", 12, 94, 2);

    // Hub WebSocket status
    String targetHub = (current_hub_host.length() > 0) ? current_hub_host : hub_host;
    int targetPort = (current_hub_port > 0) ? current_hub_port : hub_port;

    if (webSocket.isConnected()) {
        tft.setTextColor(COLOR_GREEN, COLOR_CARD_BG);
        tft.drawString("WS: CONNECTED", 205, 94, 2);
    } else if (live_chat_active) {
        tft.setTextColor(COLOR_YELLOW, COLOR_CARD_BG);
        tft.drawString("WS: CONNECTING", 195, 94, 2);
    } else {
        tft.setTextColor(COLOR_SUBTEXT, COLOR_CARD_BG);
        tft.drawString("WS: STANDBY", 215, 94, 2);
    }

    // Hub URL
    tft.setTextColor(COLOR_TEXT, COLOR_CARD_BG);
    tft.drawString("Hub: ws://" + targetHub + ":" + String(targetPort) + "/ws", 12, 110, 1);

    // Gemini Model & Key
    tft.drawString("Model: " + gemini_model, 12, 122, 1);
    tft.setTextColor(COLOR_SUBTEXT, COLOR_CARD_BG);
    tft.drawString("Key: " + maskKey(gemini_api_key), 12, 134, 1);

    // =========================================================================
    // 4. CARD 3: GOOGLE FIREBASE & SYSTEM RESOURCES (Y: 152 -> 212)
    // =========================================================================
    tft.fillRoundRect(6, 152, 308, 58, 4, COLOR_CARD_BG);
    tft.drawRoundRect(6, 152, 308, 58, 4, COLOR_BORDER);

    // Title tag
    tft.setTextColor(COLOR_ACCENT, COLOR_CARD_BG);
    tft.drawString("3. FIREBASE & SYSTEM", 12, 156, 2);

    // Project & Doc Path
    tft.setTextColor(COLOR_TEXT, COLOR_CARD_BG);
    String projStr = "Proj: " + (firebase_project_id.length() > 0 ? firebase_project_id : "[EMPTY]");
    if (projStr.length() > 22) projStr = projStr.substring(0, 22) + "..";
    tft.drawString(projStr, 12, 172, 1);

    tft.drawString("Path: " + firebase_doc_path, 12, 184, 1);

    // Memory info (DRAM Heap & PSRAM)
    uint32_t freeHeap = ESP.getFreeHeap() / 1024;
    uint32_t freePsram = psramFound() ? (ESP.getFreePsram() / 1024) : 0;

    tft.setTextColor(COLOR_SUBTEXT, COLOR_CARD_BG);
    tft.drawString("DRAM: " + String(freeHeap) + "KB | PSRAM: " + String(freePsram) + "KB", 12, 196, 1);

    // =========================================================================
    // 5. FOOTER BAR (Y: 216 -> 240)
    // =========================================================================
    tft.fillRect(0, 216, 320, 24, 0x0010);
    tft.drawFastHLine(0, 216, 320, COLOR_BORDER);

    tft.setTextColor(COLOR_SUBTEXT, 0x0010);
    tft.drawString("Cham man hinh de xem Chat | 2.8\" TFT ILI9341", 10, 222, 1);
}

// Render Live Voice Chat Interface (User & Model Transcription)
void renderChatDisplay() {
    tft.fillScreen(COLOR_BG);

    // =========================================================================
    // 1. HEADER BAR (Y: 0 -> 24)
    // =========================================================================
    tft.fillRect(0, 0, 320, 24, 0x0010);
    tft.drawFastHLine(0, 24, 320, COLOR_ACCENT);

    tft.setTextColor(COLOR_TITLE, 0x0010);
    tft.setTextSize(1);
    tft.drawString("AI VOICE ASSISTANT (DU)", 10, 8, 2);

    // Status Badge
    tft.fillRect(200, 0, 120, 24, 0x0010);
    tft.setTextColor(COLOR_GREEN, 0x0010);
    tft.drawString("[" + chat_status + "]", 205, 8, 2);

    // =========================================================================
    // 2. CARD 1: USER TRANSCRIPTION (Y: 28 -> 80)
    // =========================================================================
    tft.fillRoundRect(6, 28, 308, 52, 4, COLOR_CARD_BG);
    tft.drawRoundRect(6, 28, 308, 52, 4, COLOR_BORDER);

    tft.setTextColor(COLOR_YELLOW, COLOR_CARD_BG);
    tft.drawString("BAN (USER):", 12, 32, 2);

    String displayUser = (last_user_raw_text.length() > 0) ? last_user_raw_text : "Dang lang nghe giong noi...";
    uint16_t userColor = (last_user_raw_text.length() > 0) ? COLOR_TEXT : COLOR_SUBTEXT;
    drawWrappedVietnameseText(displayUser, 12, 48, 296, 30, userColor, COLOR_CARD_BG, 2);

    // =========================================================================
    // 3. CARD 2: MODEL TRANSCRIPTION (Y: 84 -> 212)
    // =========================================================================
    tft.fillRoundRect(6, 84, 308, 128, 4, COLOR_CARD_BG);
    tft.drawRoundRect(6, 84, 308, 128, 4, COLOR_BORDER);

    tft.setTextColor(COLOR_TITLE, COLOR_CARD_BG);
    tft.drawString("DU (TRO LY AO):", 12, 88, 2);

    String displayModel = (current_model_raw_text.length() > 0) ? current_model_raw_text : "Cho phan hoi tu Gemini Live...";
    uint16_t modelColor = (current_model_raw_text.length() > 0) ? COLOR_TEXT : COLOR_SUBTEXT;
    drawWrappedVietnameseText(displayModel, 12, 106, 296, 102, modelColor, COLOR_CARD_BG, 2);

    // =========================================================================
    // 4. FOOTER BAR (Y: 216 -> 240)
    // =========================================================================
    tft.fillRect(0, 216, 320, 24, 0x0010);
    tft.drawFastHLine(0, 216, 320, COLOR_BORDER);

    tft.setTextColor(COLOR_SUBTEXT, 0x0010);
    tft.drawString("Cham man hinh de xem Dashboard | 2.8\" TFT", 10, 222, 1);
}

// State tracking for smooth non-blocking text streaming
static bool model_text_dirty = false;
static unsigned long last_model_draw_time = 0;

// Redraw only the text area of the Model Card when new text arrives (Extremely Fast & No Flicker)
static void updateModelTextCard() {
    // Only clear the inner text rectangle to avoid expensive SPI roundrect redraws
    tft.fillRect(10, 106, 300, 102, COLOR_CARD_BG);
    drawWrappedVietnameseText(current_model_raw_text, 12, 106, 296, 102, COLOR_TEXT, COLOR_CARD_BG, 2);
    last_model_draw_time = millis();
}

// API: Set user transcription text
void displaySetUserText(const String& userText) {
    last_user_raw_text = userText;
    last_user_text = decodeVietnameseUtf8(userText);
    current_model_raw_text = "..."; // Show ... while waiting for answer
    current_model_text = "...";
    chat_status = "DANG XU LY";
    last_chat_activity = millis();
    model_text_dirty = false;

    current_display_mode = DISPLAY_MODE_CHAT;
    renderChatDisplay();
}

// API: Append model transcription text chunk during streaming (Non-blocking dirty-flag update)
void displayAppendModelText(const String& textChunk) {
    if (current_model_raw_text == "...") {
        current_model_raw_text = "";
    }
    current_model_raw_text += textChunk;
    chat_status = "DU TRA LOI";
    last_chat_activity = millis();
    model_text_dirty = true;

    if (current_display_mode != DISPLAY_MODE_CHAT) {
        current_display_mode = DISPLAY_MODE_CHAT;
        renderChatDisplay();
        model_text_dirty = false;
        last_model_draw_time = millis();
    }
}

// API: Set chat status tag in header
void displaySetChatStatus(const String& status) {
    chat_status = status;
    last_chat_activity = millis();

    if (current_display_mode == DISPLAY_MODE_CHAT) {
        tft.fillRect(200, 0, 120, 24, 0x0010);
        tft.setTextColor(COLOR_GREEN, 0x0010);
        tft.drawString("[" + chat_status + "]", 205, 8, 2);
    }
}

// API: Complete speaking turn (Flush any remaining dirty text)
void displayEndChatTurn() {
    chat_status = "HOAN TAT";
    last_chat_activity = millis();

    if (current_display_mode == DISPLAY_MODE_CHAT) {
        tft.fillRect(200, 0, 120, 24, 0x0010);
        tft.setTextColor(COLOR_GREEN, 0x0010);
        tft.drawString("[" + chat_status + "]", 205, 8, 2);

        if (model_text_dirty) {
            updateModelTextCard();
            model_text_dirty = false;
        }
    }
}

// Initializes the TFT Display and Touch controller
void initDisplay() {
    Serial.println("[TFT] Initializing 2.8\" ILI9341 TFT Display & Touch...");

    // Turn on Backlight
    pinMode(TFT_BL, OUTPUT);
    digitalWrite(TFT_BL, HIGH);

    tft.begin();
    tft.setRotation(1); // Landscape 320x240
    tft.setAttribute(UTF8_SWITCH, true); // Enable UTF-8 decoding support in TFT_eSPI

    // Load calibration data for touch
    tft.setTouch(calData);

    // Initial Splash Screen
    tft.fillScreen(COLOR_BG);
    tft.setTextColor(COLOR_TITLE, COLOR_BG);
    tft.drawString("ESP32 OS", 90, 70, 4);

    tft.setTextColor(COLOR_TEXT, COLOR_BG);
    tft.drawString("Initializing system modules...", 60, 110, 2);

    tft.setTextColor(COLOR_SUBTEXT, COLOR_BG);
    tft.drawString("TFT ILI9341 (320x240) Ready", 75, 140, 2);

    display_initialized = true;
    delay(300); // Brief visual confirmation
}

// Checks touch events and refreshes dynamic text periodically
void updateDisplay() {
    if (!display_initialized) return;

    uint16_t x = 0, y = 0;
    // Check Touch Input to toggle display mode
    if (tft.getTouch(&x, &y)) {
        if (millis() - last_touch_time > 350) {
            last_touch_time = millis();
            Serial.printf("[TFT Touch] Screen Touched at X=%d, Y=%d -> Toggling Mode!\n", x, y);

            // Draw a temporary touch ripple circle
            tft.drawCircle(x, y, 6, COLOR_TITLE);
            tft.drawCircle(x, y, 10, COLOR_ACCENT);
            delay(50);

            // Toggle mode
            if (current_display_mode == DISPLAY_MODE_CONFIG) {
                current_display_mode = DISPLAY_MODE_CHAT;
                renderChatDisplay();
            } else {
                current_display_mode = DISPLAY_MODE_CONFIG;
                renderConfigDisplay();
            }
            last_display_refresh = millis();
            return;
        }
    }

    // Smooth throttled update for Model Text in Chat mode (~10-12 FPS, e.g. every 90ms)
    if (current_display_mode == DISPLAY_MODE_CHAT && model_text_dirty) {
        if (millis() - last_model_draw_time >= 90) {
            updateModelTextCard();
            model_text_dirty = false;
        }
    }

    // Auto-switch back to Config Dashboard after 20s of chat inactivity
    if (current_display_mode == DISPLAY_MODE_CHAT) {
        if (last_chat_activity > 0 && millis() - last_chat_activity > 20000) {
            current_display_mode = DISPLAY_MODE_CONFIG;
            renderConfigDisplay();
            last_display_refresh = millis();
            return;
        }
    }

    // Periodic refresh in Config Mode every 3 seconds to update dynamic status
    if (current_display_mode == DISPLAY_MODE_CONFIG) {
        if (millis() - last_display_refresh >= 3000) {
            last_display_refresh = millis();
            renderConfigDisplay();
        }
    }
}
