# Tài liệu Thiết kế Kỹ thuật (BA Design) - Nghiệp vụ ONNX Computer Vision (Khuôn mặt)

> **Mô đun:** `TreeOfThought/backend/onnx-computer-vision`  
> **Tài liệu Yêu cầu (SRS):** `TreeOfThought/docs/onnx-computer-vision/whattodo.md`  
> **Mục tiêu:** Xây dựng module API RESTful nhận dạng khuôn mặt (Phát hiện, Trích xuất Vector Embedding 512D, So sánh khuôn mặt) sử dụng các mô hình InsightFace ONNX Runtime, hoàn toàn **thay thế OpenCvSharp4 bằng SkiaSharp** để xử lý ảnh cross-platform hiệu năng cao.

---

## 1. Kiến trúc Tổng quan & Công nghệ

### 1.1. Công nghệ sử dụng
- **Framework:** .net 10.0 (C# 12)
- **AI Runtime:** `Microsoft.ML.OnnxRuntime` (v1.17.1+)
- **Xử lý Ảnh:** `SkiaSharp` & `SkiaSharp.NativeAssets.Linux.NoDependencies` (Loại bỏ hoàn toàn `OpenCvSharp4` nhằm đơn giản hóa deployment trên Linux Docker/Serverless không phụ thuộc thư viện OpenCV native).
- **Hệ thống Base:** Tích hợp trực tiếp vào `TreeOfThought/backend/Core.Web.Api` thông qua `Core.Infra.OnnxComputerVision.csproj`.

### 1.2. Danh sách Mô hình ONNX (InsightFace / SCRFD + ArcFace)
Các tệp mô hình được nạp từ thư mục `/work/ekycwebapi/aimodels/weights/models`:
1. **Detection Model (`det_10g.onnx`):** SCRFD Detector, nhận ảnh đầu vào `640x640x3`, phát hiện bounding box và 5 điểm mốc khuôn mặt (Mắt trái, Mắt phải, Mũi, Góc miệng trái, Góc miệng phải).
2. **Landmark Model (`2d106det.onnx`):** Phát hiện 106 điểm mốc khuôn mặt chi tiết, đầu vào `192x192x3`.
3. **Recognition Model (`updated_resnet100.onnx`):** ArcFace ResNet100, trích xuất vector đặc trưng 512 chiều từ ảnh khuôn mặt đã căn chỉnh (Aligned Face) `112x112x3`.

---

## 2. Giải pháp Kỹ thuật: Thay thế OpenCvSharp4 bằng SkiaSharp

### 2.1. Căn chỉnh khuôn mặt (Face Alignment) bằng thuật toán Umeyama (2D Similarity Transform)
Trong `InsightFaceHelper.cs` gốc, OpenCV dùng `Cv2.EstimateAffinePartial2D` và `Cv2.WarpAffine`.
Với SkiaSharp, chúng ta tự triển khai thuật toán **Umeyama Least-Squares Alignment**:
1. **Ma trận tham chiếu chuẩn (ArcFace 112x112 RefPoints):**
   - Mắt trái: `(38.2946, 51.6963)`
   - Mắt phải: `(73.5318, 51.5014)`
   - Mũi: `(56.0252, 71.7366)`
   - Góc miệng trái: `(41.5493, 92.3655)`
   - Góc miệng phải: `(70.7299, 92.2041)`
2. **Tính toán ma trận biến đổi affine 2x3 ($M$):** Tối thiểu hóa bình phương khoảng cách giữa 5 keypoints của khuôn mặt phát hiện được và 5 điểm chuẩn.
3. **Biến đổi ảnh (Warp Image) với SkiaSharp:** Dùng `SKCanvas` kết hợp với ma trận `SKMatrix` biến đổi affine để vẽ ảnh khuôn mặt đã nắn chỉnh lên một `SKBitmap` chuẩn `112x112`.

### 2.2. Preprocessing & Postprocessing với SkiaSharp
- **Letterbox Resize (640x640):** Dùng `SKCanvas.DrawBitmap` để resize giữ nguyên tỷ lệ aspect-ratio và pad viền đen.
- **Trích xuất Tensor Float [1, 3, H, W]:** Đọc các pixel bằng `SKBitmap.GetPixelSpan()` hoặc `GetPixels()`, chuẩn hóa RGB theo đúng công thức của từng model ONNX:
  - Detection: `(pixel - 127.5) / 128.0`
  - Landmark 106: `(pixel - 127.5) / 128.0`
  - ArcFace Embedding: Trích xuất kênh theo chuẩn ArcFace (kênh BGR/RGB tương thích với `updated_resnet100.onnx`).
- **Chuẩn hóa Vector L2 (L2 Normalization):**
  $$v_{\text{normalized}} = \frac{v}{\|v\|_2}$$
  Giúp tính Cosine Similarity đơn giản bằng tích vô hướng (Dot Product).

---

## 3. Cấu trúc Thư mục & File của Nghiệp vụ Backend

Tạo mới dự án tại: `TreeOfThought/backend/onnx-computer-vision/`

```
TreeOfThought/backend/onnx-computer-vision/
├── Core.Infra.OnnxComputerVision.csproj
├── Models/
│   ├── FaceInfo.cs                      # Bbox, Kps, Landmark106, Score, Embedding
│   ├── Point2f.cs                       # Tọa độ điểm float (X, Y)
│   ├── Rect.cs                          # Hình chữ nhật (X, Y, Width, Height)
│   └── Dtos/
│       ├── FaceDetectionResultDto.cs    # Response API Detect
│       ├── FaceEmbeddingResultDto.cs    # Response API Extract Embedding
│       ├── CompareFacesResultDto.cs     # Response API Compare 2 ảnh
│       └── CompareEmbeddingsRequestDto.cs # Request API Compare 2 vector
├── Helpers/
│   └── UmeyamaTransformHelper.cs        # Giải thuật biến đổi Affine & Warp bằng SkiaSharp
├── Services/
│   ├── IInsightFaceSkiaService.cs       # Interface điều khiển ONNX Inference
│   └── InsightFaceSkiaService.cs       # Implementation chứa logic ONNX + SkiaSharp
├── Controllers/
│   └── OnnxComputerVisionController.cs  # RESTful Controllers
└── Extensions/
    └── OnnxComputerVisionServiceCollectionExtensions.cs # Đăng ký DI & Cấu hình Path Model
```

---

## 4. Thiết kế RESTful API (`/api/onnx-cv`)

Dạng dữ liệu truyền lên ảnh: `multipart/form-data` (`IFormFile`).

### 4.1. `POST /api/onnx-cv/detect-face`
- **Mô tả:** Phát hiện các khuôn mặt trong ảnh, trả về tọa độ Bbox, điểm mốc 5 keypoints và 106 landmarks.
- **Request Body (multipart/form-data):**
  - `image` (file, Bắt buộc): File ảnh đưa lên (.jpg, .png, .webp).
  - `scoreThreshold` (float, Mặc định: 0.5): Ngưỡng tin cậy phát hiện khuôn mặt.
- **Response (200 OK):**
```json
{
  "success": true,
  "totalFaces": 1,
  "faces": [
    {
      "bbox": { "x": 120, "y": 85, "width": 210, "height": 260 },
      "score": 0.985,
      "kps": [
        { "x": 175.2, "y": 160.5 },
        { "x": 265.1, "y": 158.8 },
        { "x": 220.4, "y": 210.3 },
        { "x": 185.0, "y": 270.1 },
        { "x": 255.6, "y": 268.9 }
      ],
      "landmark106Count": 106
    }
  ]
}
```

### 4.2. `POST /api/onnx-cv/extract-embedding`
- **Mô tả:** Trích xuất vector đặc trưng 512 chiều (L2 Normalized) của khuôn mặt có điểm số cao nhất trong ảnh.
- **Request Body (multipart/form-data):**
  - `image` (file, Bắt buộc): File ảnh đưa lên.
- **Response (200 OK):**
```json
{
  "success": true,
  "faceFound": true,
  "faceInfo": {
    "bbox": { "x": 120, "y": 85, "width": 210, "height": 260 },
    "score": 0.985
  },
  "embeddingDimension": 512,
  "embedding": [ 0.0231, -0.0412, ..., 0.0815 ]
}
```

### 4.3. `POST /api/onnx-cv/compare-faces`
- **Mô tả:** So sánh 2 bức ảnh, phát hiện khuôn mặt nổi bật nhất ở mỗi ảnh và tính điểm tương đồng Cosine Similarity.
- **Request Body (multipart/form-data):**
  - `image1` (file, Bắt buộc): Ảnh thứ nhất.
  - `image2` (file, Bắt buộc): Ảnh thứ hai.
  - `threshold` (double, Mặc định: 0.4): Ngưỡng nhận diện cùng 1 người.
- **Response (200 OK):**
```json
{
  "success": true,
  "similarity": 0.7825,
  "isSamePerson": true,
  "threshold": 0.4,
  "message": "Hai khuôn mặt thuộc cùng một người."
}
```

### 4.4. `POST /api/onnx-cv/compare-embeddings`
- **Mô tả:** So sánh trực tiếp 2 vector embedding 512 chiều.
- **Request Body (application/json):**
```json
{
  "vector1": [ 0.0231, -0.0412, ... ],
  "vector2": [ 0.0215, -0.0398, ... ],
  "threshold": 0.4
}
```
- **Response (200 OK):** Trả về `similarity` và `isSamePerson`.

---

## 5. Kế hoạch Triển khai & Tích hợp

1. **Khởi tạo Project Library:**
   - Tạo `TreeOfThought/backend/onnx-computer-vision/Core.Infra.OnnxComputerVision.csproj`.
   - Cài đặt NuGet: `Microsoft.ML.OnnxRuntime`, `SkiaSharp`, `SkiaSharp.NativeAssets.Linux.NoDependencies`.
2. **Triển khai Logic:**
   - Xây dựng `UmeyamaTransformHelper.cs` (Căn chỉnh ảnh khuôn mặt SkiaSharp 112x112).
   - Xây dựng `InsightFaceSkiaService.cs` (SCRFD Detect + 106 Landmarks + ArcFace Embedding qua ONNX Session).
   - Xây dựng Controller `OnnxComputerVisionController.cs`.
3. **Tích hợp vào `Core.Web.Api`:**
   - Thêm `<ProjectReference Include="..\onnx-computer-vision\Core.Infra.OnnxComputerVision.csproj" />` vào `Core.Web.Api.csproj`.
   - Đăng ký Singleton `IInsightFaceSkiaService` trong `Program.cs` / Dependency Injection extension.
4. **Kiểm thử REST API:**
   - Khởi động backend và gọi thử nghiệm API Swagger / Postman với tệp mẫu trong `/work/ekycwebapi/aimodels/`.

---

## 6. Yêu cầu Xác nhận từ Người dùng (User Approval Required)

> [!IMPORTANT]
> Theo quy trình **tot-dev**, xin vui lòng xem xét thiết kế trên trong `howtodo.md`.
> **Vui lòng xác nhận đồng ý với tài liệu thiết kế này để AI bắt đầu tiến hành viết code triển khai dự án.**
