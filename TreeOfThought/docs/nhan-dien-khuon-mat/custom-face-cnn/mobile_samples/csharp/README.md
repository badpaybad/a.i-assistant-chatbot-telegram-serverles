# C# (.NET MAUI / Xamarin) Integration Guide

Mã nguồn C# mẫu trong [FaceRecognizer.cs](file:///work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/docs/nhan-dien-khuon-mat/custom-face-cnn/mobile_samples/csharp/FaceRecognizer.cs) trình bày cách nạp mô hình `.onnx` và thực hiện trích xuất vector đặc trưng 512 chiều trên ứng dụng di động di động.

---

## 1. Thiết lập Thư viện (NuGet Dependencies)

Để biên dịch và chạy được mã nguồn mẫu này, bạn cần cài đặt các gói NuGet sau vào dự án của mình:

* **`Microsoft.ML.OnnxRuntime`** (hoặc `Microsoft.ML.OnnxRuntime.Managed` / `Microsoft.ML.OnnxRuntime.Maui` tùy thuộc vào hệ điều hành mục tiêu di động của bạn).

---

## 2. Hướng dẫn sử dụng

Dưới đây là đoạn mã ví dụ sử dụng class `FaceRecognizer` để tự động kiểm tra/tải mô hình MediaPipe Face Landmarker, trích xuất và so khớp hai khuôn mặt từ ảnh di động:

```csharp
using System;
using System.IO;
using System.Threading.Tasks;
using CustomFaceCNN.Mobile;

class Program
{
    static async Task Main()
    {
        string modelPath = "custom_face_cnn.onnx";
        string faceLandmarkerTaskPath = "face_landmarker.task";
        
        // 1. Khởi tạo Recognizer với mô hình ONNX đã train
        using (var recognizer = new FaceRecognizer(modelPath))
        {
            // Giả lập ảnh gốc RGB 640x480 dưới dạng mảng byte phẳng RGB (640 * 480 * 3)
            int width = 640;
            int height = 480;
            byte[] image1Bytes = new byte[width * height * 3]; // Thay thế bằng dữ liệu pixel thực tế
            byte[] image2Bytes = new byte[width * height * 3];

            // 2. Chạy toàn bộ quy trình tự động lấy embedding (Tải mô hình -> detect 468 landmarks -> aligned -> embedding)
            FaceRecognitionResult result1 = await recognizer.ProcessRawImageAsync(
                image1Bytes, 
                width, 
                height, 
                faceLandmarkerTaskPath
            );

            FaceRecognitionResult result2 = await recognizer.ProcessRawImageAsync(
                image2Bytes, 
                width, 
                height, 
                faceLandmarkerTaskPath
            );

            Console.WriteLine("=== KẾT QUẢ NHẬN DIỆN KHUÔN MẶT C# ===");
            Console.WriteLine($"Bounding Box: [X: {result1.BoundingBox.X}, Y: {result1.BoundingBox.Y}, W: {result1.BoundingBox.Width}, H: {result1.BoundingBox.Height}]");
            Console.WriteLine($"Kích thước đặc trưng Embedding: {result1.Embedding.Length}"); // 512-D

            // 3. Tính toán độ tương đồng Cosine
            float similarity = FaceRecognizer.CalculateCosineSimilarity(result1.Embedding, result2.Embedding);
            Console.WriteLine($"Độ tương đồng Cosine: {similarity:F4}");

            if (similarity >= 0.55f)
            {
                Console.WriteLine("=> Cùng một người! (Khớp thành công)");
            }
            else
            {
                Console.WriteLine("=> Người khác nhau!");
            }
        }
    }
}
```
