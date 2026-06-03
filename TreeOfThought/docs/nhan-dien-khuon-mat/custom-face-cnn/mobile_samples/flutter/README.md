# Flutter (Dart) Integration Guide

Mã nguồn Dart/Flutter mẫu trong [face_recognizer.dart](file:///work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/docs/nhan-dien-khuon-mat/custom-face-cnn/mobile_samples/flutter/face_recognizer.dart) trình bày cách tích hợp mô hình `.onnx` đa luồng trên ứng dụng di động Flutter.

---

## 1. Thiết lập Thư viện (pubspec.yaml Dependencies)

Để sử dụng mã nguồn này, bạn hãy khai báo các thư viện phụ thuộc sau vào tệp tin `pubspec.yaml` của dự án Flutter:

```yaml
dependencies:
  flutter:
    sdk: flutter
  
  # Chạy mô hình ONNX Runtime hiệu năng cao trên Android/iOS
  onnxruntime_flutter: ^0.1.0  # Hoặc phiên bản mới nhất tương thích
```

---

## 2. Hướng dẫn sử dụng trong Code Flutter

Dưới đây là một đoạn mã Dart ví dụ minh họa cách sử dụng class `FaceRecognizer` với hai cách tiếp cận:
1. **Dùng hàm tiện lợi một bước (`processRawImage`)**: Tự động tải mô hình MediaPipe, lấy 468 landmarks, thực hiện căn chỉnh xoay thẳng mặt, cắt ảnh cục bộ (mắt/mũi/toàn bộ) và suy luận ONNX.
2. **Dùng hàm xử lý trực tiếp (`processImage`)**: Chạy độc lập nếu bạn đã tự detect landmarks trước đó.

```dart
import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'face_recognizer.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  final recognizer = FaceRecognizer();
  
  try {
    // 1. Khởi tạo session (mô hình ONNX của chúng ta)
    String modelPath = "/path/to/local/custom_face_cnn.onnx";
    await recognizer.initialize(modelPath);
    
    // Giả lập ảnh thô đầu vào RGB 640x480 (Mỗi pixel 3 bytes R-G-B)
    int width = 640;
    int height = 480;
    Uint8List rawRgbBytes = Uint8List(width * height * 3);
    
    // 2. Định nghĩa đường dẫn lưu mô hình MediaPipe Task
    String mpTaskPath = "/path/to/local/face_landmarker.task";
    
    // 3. Chạy toàn bộ pipeline xử lý tự động (Tải MP model -> Lấy 468 Landmarks -> Căn chỉnh mặt -> Trích xuất Embedding)
    FaceRecognitionResult result = await recognizer.processRawImage(
      rawRgbBytes,
      width,
      height,
      mpTaskPath,
    );
    
    print("=== KẾT QUẢ NHẬN DIỆN KHUÔN MẶT ===");
    print("Bounding Box: [X: ${result.boundingBox.x}, Y: ${result.boundingBox.y}, W: ${result.boundingBox.width}, H: ${result.boundingBox.height}]");
    print("Kích thước đặc trưng Embedding: ${result.embedding.length}"); // 512-D
    print("Kích thước ảnh sau căn chỉnh (aligned): ${result.alignedFaceImage.length} bytes (112x112x3 RGB)");
    
    // 4. So sánh hai khuôn mặt sử dụng độ tương đồng Cosine
    Float32List embedding1 = result.embedding;
    Float32List embedding2 = result.embedding; // So sánh với chính nó làm mẫu
    
    double similarity = FaceRecognizer.calculateCosineSimilarity(embedding1, embedding2);
    print("Độ tương đồng Cosine giữa 2 khuôn mặt: ${similarity.toStringAsFixed(4)}");
    
    if (similarity >= 0.55) {
      print("=> KHỚP: Cùng một người!");
    } else {
      print("=> KHÔNG KHỚP: Người khác nhau!");
    }
  } catch (e) {
    print("Lỗi nhận diện: $e");
  } finally {
    // Giải phóng tài nguyên khi đóng app hoặc giải phóng service
    recognizer.release();
  }
}
```
