# Trình Duyệt Web (HTML5/JavaScript) Integration Guide

Thư mục này chứa mã nguồn mẫu (Code Sample) bằng **JavaScript (ES6+)** để chạy nhận diện và so khớp khuôn mặt trực tiếp trên trình duyệt client-side mà không cần máy chủ (serverless).

---

## 1. Thành Phần Pipeline Trình Duyệt

Hệ thống hoạt động trực tiếp 100% trên trình duyệt bằng cách phối hợp:
1. **MediaPipe Tasks Vision (`@mediapipe/tasks-vision`)**: Trích xuất 468 mốc khuôn mặt qua WebAssembly (WASM) tăng tốc phần cứng.
2. **ONNX Runtime Web (`onnxruntime-web`)**: Nạp mô hình `.onnx` và thực hiện suy luận đa luồng bằng bộ nhớ WebGL/WASM/WebGPU.
3. **Thuật toán Affine Transform song tuyến tính (Bilinear Interpolation)**: Xoay thẳng mặt và cắt sub-regions ngay trên mảng byte phẳng bằng JS thuần để tương thích đa nền tảng.

---

## 2. Danh Mục Các Tệp Tin

* [faceRecognizer.js](file:///work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/docs/nhan-dien-khuon-mat/custom-face-cnn/mobile_samples/web_javascript/faceRecognizer.js): Chứa lớp `FaceRecognizer` chịu trách nhiệm nạp mô hình, biến đổi ma trận hình học (`warpAffineBilinear`), tiền xử lý ảnh thô thành Tensor, và chạy suy luận lấy vector 512-D.
* [index.html](file:///work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/docs/nhan-dien-khuon-mat/custom-face-cnn/mobile_samples/web_javascript/index.html): Giao diện đồ họa tối (dark-themed dashboard) cho phép người dùng chọn ảnh Template và Target, tự động vẽ HUD landmarks, vẽ ảnh căn chỉnh, và hiển thị tỷ lệ trùng khớp.

---

## 3. Cách Khởi Chạy Demo

Vì lý do bảo mật của trình duyệt (CORS policy), các tệp tin WebAssembly của MediaPipe và mô hình ONNX nội bộ không thể nạp trực tiếp qua giao thức `file://` (khi click đúp trực tiếp vào `index.html`). 

Bạn cần chạy một HTTP Server đơn giản từ thư mục dự án. Ví dụ sử dụng python:

```bash
# Di chuyển tới thư mục web_javascript
cd TreeOfThought/docs/nhan-dien-khuon-mat/custom-face-cnn/mobile_samples/web_javascript/

# Khởi chạy máy chủ HTTP tĩnh
python -m http.server 8080
```

Sau đó, truy cập qua trình duyệt tại địa chỉ:
👉 **[http://localhost:8080](http://localhost:8080)**

---

## 4. Hướng Dẫn Sử Dụng Trong Mã Nguồn

```javascript
// 1. Khởi tạo Recognizer
const recognizer = new FaceRecognizer();
await recognizer.initialize("custom_face_cnn.onnx"); // Đường dẫn URL mô hình

// 2. Chạy MediaPipe Face Landmarker để lấy 468 landmarks
// (Xem chi tiết cách nạp trong index.html)
const resultMP = faceLandmarker.detect(imageElement);
const all468Landmarks = resultMP.faceLandmarks[0].map(pt => ({
    x: pt.x * imageWidth,
    y: pt.y * imageHeight
}));

// 3. Thực hiện căn chỉnh và suy luận đặc trưng trong JS
// rawRgbBytes: Uint8Array có kích thước (Width * Height * 3) của ảnh gốc
const result = await recognizer.processImage(rawRgbBytes, imageWidth, imageHeight, all468Landmarks);

console.log("Vector Đặc Trưng 512-D L2-Normalized:", result.embedding);
console.log("Kích thước Bounding Box khuôn mặt:", result.boundingBox);

// 4. So sánh hai khuôn mặt
const similarity = FaceRecognizer.calculateCosineSimilarity(embedding1, embedding2);
console.log(`Độ tương đồng Cosine: ${similarity}`);
```
