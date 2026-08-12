/*
  device_id.c - Device identification & MAC reporting implementation
*/

#include "grbl.h"
#include "device_id.h"

#if defined(__AVR__)
  #include <avr/boot.h>
#endif

// Helper function to print an uint8 variable in hex format (2 digits)
static void print_uint8_hex(uint8_t n)
{
  uint8_t h = n >> 4;
  uint8_t l = n & 0x0F;
  serial_write(h < 10 ? '0' + h : 'A' + (h - 10));
  serial_write(l < 10 ? '0' + l : 'A' + (l - 10));
}

// Prints device ID and MAC address over serial
void report_device_id(void)
{
  printPgmString(PSTR("[ID:"));
  #ifdef DEVICE_ID
    printString(DEVICE_ID);
  #elif defined(ESP32) || defined(ESP_PLATFORM)
    printPgmString(PSTR("GRBL-ESP32-"));
    printPgmString(PSTR(GRBL_VERSION));
  #elif defined(__AVR__)
    #if defined(__AVR_ATmega328PB__)
      printPgmString(PSTR("GRBL-328PB-"));
      uint8_t i;
      for (i = 0; i < 4; i++) {
        print_uint8_hex(boot_signature_byte_get(0x0E + i));
      }
    #else
      // ATmega328P: Tạo Device ID phần cứng duy nhất (Model ID + OSCCAL Silicon Fingerprint)
      printPgmString(PSTR("GRBL-328P-"));
      print_uint8_hex(boot_signature_byte_get(0x00)); // 1E (Atmel Signature)
      print_uint8_hex(boot_signature_byte_get(0x02)); // 95 (328P Family)
      print_uint8_hex(boot_signature_byte_get(0x04)); // 0F (Revision)
      printPgmString(PSTR("-"));
      #ifdef boot_signature_byte_get
        print_uint8_hex(boot_signature_byte_get(0x01)); // OSCCAL Silicon Fingerprint duy nhất từng con chip
      #else
        printPgmString(PSTR("00"));
      #endif
    #endif
  #else
    printPgmString(PSTR("GRBL-GENERIC"));
  #endif

  printPgmString(PSTR(", MAC:"));
  #ifdef DEVICE_MAC
    printString(DEVICE_MAC);
  #elif defined(ESP32) || defined(ESP_PLATFORM)
    // ESP32: Đọc địa chỉ MAC phần cứng mạng thật từ eFuse
    uint8_t mac[6];
    esp_read_mac(mac, ESP_MAC_WIFI_STA);
    uint8_t i;
    for (i = 0; i < 6; i++) {
      print_uint8_hex(mac[i]);
      if (i < 5) { printPgmString(PSTR(":")); }
    }
  #else
    // Phần cứng không có chip mạng (như ATmega328P thuần) -> Trả về MAC rỗng
  #endif

  printPgmString(PSTR("]\r\n"));
}
