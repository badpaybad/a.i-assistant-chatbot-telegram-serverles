# Mobile Code Samples for Custom Face CNN

Thư mục này chứa mã nguồn mẫu (Code Samples) bằng ngôn ngữ **C# (cho Xamarin/MAUI/Native)** và **Dart (cho Flutter)** để tích hợp mô hình `custom_face_cnn.onnx` nhận diện khuôn mặt trực tiếp trên ứng dụng di động từ một tệp tin ảnh.

---

## Quy Trình Xử Lý Trên Thiết Bị Di Động

Để đạt được độ chính xác đồng bộ 100% với mô hình đã huấn luyện ở Python, ứng dụng di động cần thực hiện tuần tự các bước sau:

```mermaid
graph TD
    A[Đọc file ảnh BGR/RGB] --> B[Sử dụng MediaPipe Face Landmarker di động]
    B --> C[Lấy 26 Landmarks tương ứng với FaceMesh]
    C --> D[Căn chỉnh xoay mặt aligned 112x112]
    D --> E[Cắt 3 luồng: Global, Eye, Nose]
    C --> F[Tính toán vector tọa độ x_geom 1x26x2 chuẩn hóa theo IPD]
    E --> G[Chuyển đổi ảnh thành Tensor float32 chuẩn hóa -1.0 đến 1.0]
    G --> H[Chạy mô hình ONNX Runtime Mobile]
    F --> H
    H --> I[Lấy Embedding 512-D và thực hiện chuẩn hóa L2]
```

### 1. Phát Hiện Khuôn Mặt & Landmarks
* **Bắt buộc**: Trên nền tảng di động, không sử dụng ML Kit thông thường (vì không đủ 468 mốc khuôn mặt và không trùng chỉ mục). Bạn cần sử dụng **MediaPipe Tasks SDK (Face Landmarker)** cho Android/iOS/Flutter.
* MediaPipe Face Landmarker sẽ trả về danh sách 468 điểm tọa độ khuôn mặt (tương tự FaceMesh ở Python). Từ đó trích xuất ra **26 landmarks** theo đúng bảng chỉ mục chỉ định.

### 2. Trích Xuất 26 Landmarks mốc
26 mốc điểm đặc trưng được trích xuất từ 468 mốc của MediaPipe tương ứng với các chỉ mục sau:
`[33, 133, 362, 263, 159, 145, 386, 374, 468, 473, 70, 107, 300, 336, 168, 4, 129, 358, 164, 61, 291, 0, 17, 234, 454, 152]`

---

## Danh Mục Mã Nguồn Mẫu

* [csharp/FaceRecognizer.cs](file:///work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/docs/nhan-dien-khuon-mat/custom-face-cnn/mobile_samples/csharp/FaceRecognizer.cs): Class viết bằng C# sử dụng gói NuGet `Microsoft.ML.OnnxRuntime` để chạy suy luận mô hình và xử lý ma trận.
* [flutter/face_recognizer.dart](file:///work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/docs/nhan-dien-khuon-mat/custom-face-cnn/mobile_samples/flutter/face_recognizer.dart): Service viết bằng Dart sử dụng pub package `onnxruntime_flutter` để suy luận đa luồng đầu vào.
