# my_pc_assistant

Dự án Flutter hỗ trợ điều khiển và quản lý PC thông qua Telegram Assistant. Dự án này được phát triển và tối ưu hóa bằng **Google Antigravity IDE**.

## 🚀 Bắt đầu

### 🛠 Yêu cầu hệ thống
- Flutter SDK (phiên bản mới nhất)
- Android SDK (cho Android) / Xcode (cho iOS)
- Android NDK: `27.0.12077973` (Cấu hình trong `android/app/build.gradle.kts`)
- Google Antigravity IDE

### 🏃 Cách chạy ứng dụng
Để chạy ứng dụng trên thiết bị giả lập hoặc thiết bị thật, sử dụng lệnh sau trong terminal:

```bash
flutter run
```

### 📱 Máy ảo & Thiết bị (Emulator/Simulator)

#### 1. Lấy danh sách Emulator và Device ID
*   **Xem các thiết bị/máy ảo đang kết nối** (để lấy `<device_id>` như `emulator-5554`):
    ```bash
    flutter devices
    # Hoặc qua adb
    adb devices
    ```
*   **Xem danh sách các máy ảo sẵn có** (để lấy `<emulator_id>` như `Pixel_7`):
    ```bash
    ~/Android/Sdk/emulator/emulator -list-avds
    ```

#### 2. Khởi chạy máy ảo (Run Device)
*   **Khởi chạy máy ảo trực tiếp qua Android SDK** (Khuyên dùng - giúp tránh lỗi kẹt snapshot như exit code `-6`):
    ```bash
    ~/Android/Sdk/emulator/emulator -avd <emulator_id> -no-snapshot-load -no-snapshot-save
    ```
    *   **Lưu ý cho Linux (Wayland):** Nếu gặp lỗi `Could not find the Qt platform plugin "wayland"`, hãy dùng cờ `QT_QPA_PLATFORM=xcb` để ép Emulator sử dụng chế độ X11/XWayland.
        *   **Cách 1 (Khuyên dùng để Resize & Di chuyển):** Thêm cờ **`-noskin`** để tắt khung vỏ điện thoại giả lập. Cửa sổ máy ảo sẽ hiển thị dưới dạng cửa sổ hệ điều hành tiêu chuẩn, có đầy đủ thanh tiêu đề, viền kéo giãn để dễ dàng di chuyển và thay đổi kích thước:
            ```bash
            QT_QPA_PLATFORM=xcb ~/Android/Sdk/emulator/emulator -avd <emulator_id> -noskin -no-snapshot-load -no-snapshot-save
            ```
        *   **Cách 2 (Giữ khung điện thoại):** Nếu muốn giữ nguyên khung viền điện thoại giả lập (nhưng cửa sổ sẽ bị cố định kích thước và khó di chuyển trên một số giao diện Wayland):
            ```bash
            QT_QPA_PLATFORM=xcb ~/Android/Sdk/emulator/emulator -avd <emulator_id> -no-snapshot-load -no-snapshot-save
            ```
    *(Lưu ý chung: Không nên dùng lệnh `flutter emulators --launch` vì nó không hỗ trợ các cờ xử lý lỗi và rất dễ làm máy ảo bị treo không khởi động được).*

#### 3. Chạy ứng dụng trên thiết bị chỉ định
*   Chạy ứng dụng bằng cách chỉ định ID thiết bị:
    ```bash
    flutter run -d <device_id>
    # Ví dụ:
    flutter run -d emulator-5554
    ```

#### 4. Build và cài đặt thủ công vào máy ảo (trong trường hợp `flutter run` bị treo)
*   **Bước 1: Build file APK debug**:
    ```bash
    flutter build apk --debug
    ```
*   **Bước 2: Cài đặt trực tiếp file APK vào máy ảo đang mở**:
    ```bash
    adb install build/app/outputs/flutter-apk/app-debug.apk
    ```
*   **Bước 3: Khởi chạy ứng dụng**:
    ```bash
    adb shell am start -n com.mypcassistant.my_pc_assistant/.MainActivity
    ```

> [!TIP]
> Nếu máy ảo không khởi động được hoặc gặp lỗi `Broken pipe (32)` khi cài đặt APK:
> 1. Xóa file lock: `find ~/.android/avd -name "*.lock" -delete`
> 2. Chạy máy ảo ở trạng thái sạch (không nạp snapshot cũ): `~/Android/Sdk/emulator/emulator -avd <id> -no-snapshot-load`
> 3. Hoặc xóa trắng dữ liệu máy ảo (Wipe Data): `~/Android/Sdk/emulator/emulator -avd <id> -wipe-data`

### 🐞 Debug & Sửa lỗi
- **Hot Reload**: Nhấn `r` trong terminal khi đang chạy `flutter run` để cập nhật code ngay lập tức.
- **Hot Restart**: Nhấn `R` để khởi động lại app.
- **Antigravity Debug**: Bạn có thể dán log lỗi vào khung chat và hỏi: "Lỗi này là gì và sửa thế nào?". Tôi sẽ phân tích stack trace và đề xuất code sửa lỗi chính xác.

### 🧪 Kiểm thử (Testing)
Để chạy toàn bộ các bài test trong thư mục `test/`:
```bash
flutter test
```
*Gợi ý: Bạn có thể bảo tôi: "Viết unit test cho hàm xử lý tin nhắn Telegram trong file telegram_service.dart".*

### 📦 Quản lý Package
Khi cần thêm thư viện mới (ví dụ: `http`, `provider`, v.v.), bạn có thể sử dụng lệnh:

```bash
flutter pub add <tên_package>
```
Sau đó chạy `flutter pub get` để cập nhật dependencies.
*Mẹo: Bạn có thể bảo Antigravity: "Thêm package http vào dự án giúp tôi".*

### 🏗 Build ứng dụng

#### Cho Android (APK/Bundle):
```bash
flutter build apk --release
# Hoặc
flutter build appbundle --release
```

#### Cho iOS:
```bash
flutter build ios --release
```

## 🤖 Phát triển với Antigravity
Dự án này được tối ưu để làm việc cùng **Antigravity**. Bạn có thể tận dụng AI để:
- **Tạo UI nhanh chóng**: "Tạo cho tôi một màn hình Dashboard đẹp mắt với các thông số CPU, RAM".
- **Fix lỗi**: "Kiểm tra và sửa lỗi logic trong file main.dart".
- **Cập nhật tính năng**: "Thêm tính năng gửi thông báo khi PC bị quá nhiệt".

---
*Dự án là một phần của hệ sinh thái a.i-assistant-chatbot-telegram-serverles.*

