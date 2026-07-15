
/*
Đoạn code dưới đây biến ESP32-S3 và PN532 thành một đầu đọc thẻ thông minh (PC/SC Reader) chuẩn ISO/IEC 14443-4 (chuẩn của CCCD gắn chip). Nó sẽ nhận diện thẻ CCCD và sẵn sàng truyền nhận các lệnh APDU bảo mật.
chip (ICAO Doc 9303)
BAC (Basic Access Control) để mở khóa bộ nhớ chip. Khóa BAC này được tạo ra từ 3 thông tin bắt buộc:

Số căn cước (12 số): Bạn đã có (123456789012).

Ngày sinh của chủ thẻ (định dạng YYMMDD).

Ngày hết hạn của thẻ (định dạng YYMMDD).
*/
// Sử dụng chân I2C an toàn đã thống nhất

// Sử dụng chân I2C an toàn đã thống nhất
#define NFC_SDA 8
#define NFC_SCL 18


https://github.com/Vanhoai/AndroidSCReader