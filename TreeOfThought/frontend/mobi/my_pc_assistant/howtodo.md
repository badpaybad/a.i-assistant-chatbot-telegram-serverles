# Kế hoạch phát triển ứng dụng My PC Assistant (Cập nhật liên tục)

Dựa trên các yêu cầu trong `whattodo.md` và các tệp thiết kế trong thư mục `design`, tôi đề xuất kế hoạch triển khai ứng dụng Flutter như sau.

## Tổng quan thiết kế
Ứng dụng sẽ có giao diện hiện đại, sử dụng bảng màu tím/xanh đậm làm chủ đạo, với các bo góc mềm mại và các thành phần UI cao cấp (glassmorphism nhẹ, gradient).

### Màu sắc chủ đạo:
- **Primary**: #3F37C9 (Tím đậm)
- **Secondary**: #4CC9F0 (Xanh cyan)
- **Background**: #F8F9FE (Trắng xám nhạt cho nội dung)
- **Accent**: Các màu sắc tươi sáng cho icon (Đỏ, Cam, Xanh lá, Xanh dương).

## Cấu trúc thư mục (Folder Structure) - [HOÀN THÀNH]
Tuân thủ yêu cầu chia tách rõ ràng:
- `lib/core/`: Chứa các cấu hình dùng chung (theme, constants, routes).
- `lib/pages/`: Các màn hình chính (SignIn, SignUp, Home).
- `lib/widgets/`: Các thành phần UI nhỏ có thể tái sử dụng.
- `lib/services/`: Xử lý logic nghiệp vụ và gọi API (Mock API).
- `lib/models/`: Định nghĩa các đối tượng dữ liệu.
- `lib/utils/`: Các hàm tiện ích.

## Công nghệ & Thư viện sử dụng - [CẬP NHẬT]
- **State Management**: `provider`.
- **Firebase Ecosystem**: 
    - `firebase_core`: Khởi tạo Firebase.
    - `firebase_messaging` (FCM): Nhận thông báo đẩy trên Android/iOS.
    - `cloud_firestore`: Cơ sở dữ liệu NoSQL.
    - `firebase_database`: Realtime Database.
    - `firebase_analytics`: Phân tích dữ liệu.
- **Biometrics**: `local_auth` (Vân tay, Khuôn mặt - FaceID).
- **Bluetooth**: `flutter_blue_plus`.
- **NFC**: `nfc_manager`.
- **Connectivity**: `connectivity_plus` (Wifi, 4G, 5G).
- **HTTP Client**: `dio`.
- **SSO Login**: `flutter_web_auth_2`.

## Lộ trình thực hiện (Tiếp theo)  

### Bước 6: Tích hợp Firebase & Notification - [HOÀN THÀNH]
- Cấu hình khởi tạo Firebase trong `main.dart`.
- Xây dựng `NotificationService` để xử lý FCM (foreground, background, terminated).
- Thiết lập `DatabaseService` cho Firestore và Realtime Database.

### Bước 7: Tương tác Phần hardware (Bluetooth, Biometrics, NFC, Connectivity) - [HOÀN THÀNH]
- Xây dựng `BluetoothService` để quét và kết nối thiết bị.
- Xây dựng `BiometricService` hỗ trợ vân tay và FaceID thông qua `local_auth`.
- Xây dựng `NfcService` xử lý tương tác NFC.
- Xây dựng `ConnectivityService` theo dõi trạng thái mạng (Wifi, 4G, 5G).

### Bước 8: Đa giao diện (Light/Dark Mode) - [HOÀN THÀNH]
- Đã định nghĩa `darkTheme` trong `app_theme.dart`.
- Quản lý trạng thái thông qua `ThemeService` (Provider).
- Tích hợp nút chuyển đổi nhanh trên giao diện chính.

### Bước 9: Tích hợp Firebase (FCM, Firestore, Realtime) - [HOÀN THÀNH]
- Đã xây dựng `NotificationService` để xử lý FCM.
- Đã xây dựng `DatabaseService` để tương tác với Firestore và Realtime Database.

### Bước 10: Lưu trữ dữ liệu cục bộ & Media (Microphone, Camera) - [HOÀN THÀNH]
- Tích hợp `shared_preferences` cho cấu hình người dùng (theme, cài đặt cáyna).
- Tích hợp `path_provider` để quản lý tệp tin, ảnh chụp và bộ nhớ tạm (cache).
- Sử dụng `ObjectBox` làm Vector Database hỗ trợ lưu trữ embedding cho AI (Gemma4, FastText).
- Đã bổ sung `MediaService` hỗ trợ ghi âm (Microphone) và chụp ảnh (Camera).
- Cập nhật `AndroidManifest.xml` với các quyền `RECORD_AUDIO` và `CAMERA`.
- Đảm bảo dữ liệu được duy trì khi khởi động lại ứng dụng.

### Bước 11: Tích hợp Native Custom & Vector Search Demo - [HOÀN THÀNH]
- Đã thêm Method Channel vào `MainActivity.kt` để lấy thông tin hệ thống trực tiếp từ Android Native.
- Xây dựng `HardwarePage` để kiểm tra các tính năng phần cứng: Bluetooth, NFC, Biometrics, Connectivity.
- Xây dựng `VectorSearchPage` để trình diễn khả năng tìm kiếm tương đồng (Similarity Search) sử dụng ObjectBox.
- Hoàn thiện điều hướng từ màn hình chính tới các tính năng native.

### Bước 12: Kiểm thử tự động (Automation Testing) - [ĐANG TRIỂN KHAI]
- Tích hợp `integration_test` để kiểm tra luồng UI chính.
- Chạy test tự động trên emulator để đảm bảo tính ổn định.
- Tự động chạy emulator và ứng dụng thông qua command line.

### Bước 13: Tích hợp Đăng nhập SSO với authapp - [HOÀN THÀNH]
- Đã bổ sung thư viện `flutter_web_auth_2` và `dio`.
- Đã cấu hình URL SSO: `http://10.0.2.2:5000` cho Android Emulator và `localhost:5000` cho các môi trường khác.
- Đã thêm nút "Sign in with SSO" vào `SignInPage`.
- Đã xử lý callback trao đổi mã code lấy token và lấy thông tin user trong `AuthService`.
- Đã cấu hình deep link scheme `my-pc-assistant` trong `AndroidManifest.xml` (Android) và `Info.plist` (iOS).

### Bước 14: Tính năng Đăng xuất (Sign Out & OIDC Logout) - [HOÀN THÀNH]
- Đã bổ sung nút Đăng xuất (Sign Out) ngay cạnh Avatar trên màn hình chính (`HomePage`).
- Tích hợp logic gọi hàm `signOut()` từ `AuthService`.
- **Hỗ trợ OIDC Logout**: Khi đăng xuất, ứng dụng sẽ mở trình duyệt để gọi endpoint `api/auth/logout` của OIDC Provider nhằm xóa session cookie trên server, đảm bảo đăng xuất hoàn toàn (Single Sign-Out).
- Sau khi OIDC Provider callback về app, ứng dụng sẽ xóa session cục bộ và chuyển hướng người dùng quay lại màn hình Đăng nhập (`SignInPage`).

---

### Bước 15: Feature Nhận diện khuôn mặt (tot_facerecognition) - [HOÀN THÀNH]

#### Mục tiêu
Thêm tính năng nhận diện khuôn mặt thời gian thực sử dụng ONNX InsightFace models, hiển thị bbox overlay trên camera stream và so sánh với ảnh mẫu CCCD của người dùng.

#### Models sẵn có (từ /work/ekycwebapi/.../aimodels/)
| Model | File | Kích thước | Chức năng |
|-------|------|------------|-----------|
| Face Detector | `buffalo_l/det_10g.onnx` | ~16MB | Detect bbox + 5 keypoints |
| Landmark 106 | `buffalo_l/2d106det.onnx` | ~5MB | 106 điểm landmark khuôn mặt |
| Face Embedding | `weights/models/updated_resnet100.onnx` | ~249MB | ArcFace embedding 512-dim |

#### Pipeline xử lý (port từ InsightFaceHelper.cs)
```
Frame camera → DetectFace (det_10g) → Bbox + 5 Kps
            → ExtractLandmarks106 (2d106det) → 106 landmarks
            → AlignFace (affine warp 112x112) → VectorFace (resnet100)
            → Embedding [512] → CompareVector (cosine similarity)
```

#### Cấu trúc Package mới: `packages/tot_facerecognition/`
```
packages/tot_facerecognition/
├── pubspec.yaml
├── assets/
│   ├── models/
│   │   ├── det_10g.onnx       (~16MB, copy từ aimodels)
│   │   ├── 2d106det.onnx      (~5MB, copy từ aimodels)
│   │   └── resnet100.onnx     (~249MB, copy từ aimodels - chỉ bundled trong debug)
│   └── faces/
│       └── user_cccd.jpg      (copy từ faceids/038084019679/cccd.jpg)
└── lib/
    ├── tot_facerecognition.dart     # barrel export
    └── src/
        ├── models/
        │   └── face_detection_result.dart    # Data class: bbox, score, embedding
        ├── services/
        │   ├── face_recognition_service.dart  # Xử lý detect, embed, compare
        │   └── model_loader_service.dart      # Load/copy ONNX model từ assets
        ├── pages/
        │   └── face_recognition_page.dart     # Page chính: camera + UI
        └── widgets/
            ├── camera_bbox_painter.dart       # CustomPainter vẽ bbox overlay
            └── face_score_overlay.dart        # Widget hiển thị score
```

#### Thư viện bổ sung (thêm vào pubspec.yaml của package)
- `onnxruntime: ^1.5.1` — chạy ONNX model trực tiếp (không cần convert sang TFLite)
- `image: ^4.0.0` — xử lý ảnh, resize, affine transform

#### Cập nhật App Shell
- **`pubspec.yaml`**: thêm `tot_facerecognition: path: ./packages/tot_facerecognition`
- **`lib/app_routes.dart`**: thêm route `faceRecognition: '/face-recognition'`
- **`lib/pages/home_page.dart`**: thêm `FeatureItem` "Face Recognition" vào GridView

#### Luồng UI
1. Tap "Face Recognition" trên Home → mở `FaceRecognitionPage`
2. Init camera (front cam mặc định) → stream frames
3. Throttle 5fps gọi `FaceRecognitionService.processFrame()`
4. Detect → Embed → Compare với `userEmbedding` (tính từ cccd.jpg lúc khởi động)
5. Vẽ bbox (xanh nếu score > 0.4, đỏ nếu không khớp) + hiển thị score %
6. FAB icon camera flip → đổi giữa camera trước và camera sau

#### Lưu ý kỹ thuật
- **Isolate**: Xử lý inference trong `Isolate` riêng để không block UI thread
- **Throttle**: Chỉ process 1 frame mỗi 200ms (5fps) tránh quá tải
- **Model lớn**: resnet100.onnx (~249MB) bundle vào assets của package; với production cần xem xét download on-demand
- **Normalization**: 
  - det_10g: `(pixel - 127.5) / 128.0` (RGB order)
  - resnet100: pixel raw (không normalize), giá trị 0-255

---
Lưu ý quan trọng:
Để các tính năng Firebase hoạt động, bạn cần thực hiện bước cuối cùng là thêm các tệp cấu hình từ Firebase Console:

Thêm google-services.json vào thư mục android/app/.
Thêm GoogleService-Info.plist vào thư mục ios/Runner/.