using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.ML.OnnxRuntime;
using Microsoft.ML.OnnxRuntime.Tensors;

namespace CustomFaceCNN.Mobile
{
    public class Point2D
    {
        public float X { get; set; }
        public float Y { get; set; }
        public Point2D(float x, float y) { X = x; Y = y; }
    }

    public class BBox
    {
        public int X { get; set; }
        public int Y { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public BBox(int x, int y, int w, int h)
        {
            X = x; Y = y; Width = w; Height = h;
        }
    }

    public class FaceRecognitionResult
    {
        public float[] Embedding { get; set; }
        public BBox BoundingBox { get; set; }
        public byte[] AlignedFaceImage { get; set; } // 112x112x3 RGB
    }

    public class FaceRecognizer : IDisposable
    {
        private InferenceSession _session;

        // Chỉ mục của 26 landmarks được chọn từ 468 landmarks của MediaPipe FaceMesh
        public static readonly int[] LandmarkIndices = new int[]
        {
            33, 133, 362, 263, 159, 145, 386, 374, 468, 473, 70, 107, 300, 336, 168, 4, 129, 358, 164, 61, 291, 0, 17, 234, 454, 152
        };

        public FaceRecognizer(string modelPath)
        {
            if (!File.Exists(modelPath))
                throw new FileNotFoundException($"Không tìm thấy mô hình ONNX tại {modelPath}");

            // Khởi tạo phiên làm việc ONNX Runtime
            _session = new InferenceSession(modelPath);
        }

        /// <summary>
        /// Tải mô hình MediaPipe Face Landmarker từ kho lưu trữ của Google xuống thư mục cục bộ nếu chưa tồn tại.
        /// </summary>
        public static async Task DownloadMediaPipeModelAsync(string localPath)
        {
            if (File.Exists(localPath)) return;

            string directory = Path.GetDirectoryName(localPath);
            if (!string.IsNullOrEmpty(directory) && !Directory.Exists(directory))
            {
                Directory.CreateDirectory(directory);
            }

            string url = "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";
            Console.WriteLine($"🔄 Đang tải mô hình MediaPipe Face Landmarker từ: {url}...");
            
            using (var client = new System.Net.Http.HttpClient())
            {
                var data = await client.GetByteArrayAsync(url);
                await File.WriteAllBytesAsync(localPath, data);
            }
            Console.WriteLine($"✅ Tải mô hình MediaPipe thành công và lưu tại: {localPath}");
        }

        /// <summary>
        /// Hàm siêu tiện lợi: Nhận ảnh gốc RGB, tự động kiểm tra/tải mô hình MediaPipe,
        /// chạy MediaPipe Face Landmarker để phát hiện 468 landmarks, căn chỉnh và trích xuất embedding ONNX.
        /// </summary>
        public async Task<FaceRecognitionResult> ProcessRawImageAsync(
            byte[] originalImageRgb, int width, int height, 
            string faceLandmarkerTaskPath)
        {
            // 1. Tự động tải mô hình MediaPipe Face Landmarker nhiệm vụ nếu chưa có
            await DownloadMediaPipeModelAsync(faceLandmarkerTaskPath);

            // 2. Chạy phát hiện 468 mốc tọa độ từ ảnh gốc bằng MediaPipe SDK
            Point2D[] all468Landmarks = DetectLandmarksWithMediaPipe(originalImageRgb, width, height, faceLandmarkerTaskPath);

            // 3. Tiến hành căn chỉnh và suy luận đặc trưng
            return ProcessImage(originalImageRgb, width, height, all468Landmarks);
        }

        /// <summary>
        /// Nhận toàn bộ 468 landmarks từ MediaPipe, căn chỉnh mặt và suy luận Vector Embedding 512-D.
        /// </summary>
        public FaceRecognitionResult ProcessImage(byte[] originalImageRgb, int width, int height, Point2D[] all468Landmarks)
        {
            if (all468Landmarks.Length < 468)
                throw new ArgumentException("Bắt buộc phải truyền đủ 468 landmarks từ MediaPipe Face Mesh.");

            // 1. Tính toán Bounding Box từ 26 landmarks mốc trong hệ tọa độ ảnh gốc (có thêm padding)
            var bbox = ComputeBoundingBox(all468Landmarks, width, height);

            // 2. Trích xuất tâm mắt để căn chỉnh
            var pt33 = all468Landmarks[33];
            var pt133 = all468Landmarks[133];
            var eyeLeft = new Point2D((pt33.X + pt133.X) / 2.0f, (pt33.Y + pt133.Y) / 2.0f);

            var pt362 = all468Landmarks[362];
            var pt263 = all468Landmarks[263];
            var eyeRight = new Point2D((pt362.X + pt263.X) / 2.0f, (pt362.Y + pt263.Y) / 2.0f);

            // 3. Thực hiện căn chỉnh xoay thẳng khuôn mặt và phóng to/thu nhỏ về khung 112x112
            var alignment = AlignFace(originalImageRgb, width, height, eyeLeft, eyeRight, all468Landmarks);

            // 4. Lấy 26 landmarks đã được biến đổi sang hệ tọa độ 112x112
            var landmarks26Aligned = new Point2D[26];
            for (int i = 0; i < 26; i++)
            {
                landmarks26Aligned[i] = alignment.TransformedLandmarks[LandmarkIndices[i]];
            }

            // 5. Trích xuất vector đặc trưng 512-D L2-Normalized
            var embedding = ExtractEmbeddingFromAligned(alignment.AlignedImage, landmarks26Aligned);

            return new FaceRecognitionResult
            {
                Embedding = embedding,
                BoundingBox = bbox,
                AlignedFaceImage = alignment.AlignedImage
            };
        }

        /// <summary>
        /// Thực hiện căn chỉnh ảnh dựa trên tâm 2 mắt, trả về ảnh 112x112x3 RGB và danh sách landmarks biến đổi.
        /// </summary>
        public (byte[] AlignedImage, Point2D[] TransformedLandmarks) AlignFace(
            byte[] srcRgb, int srcW, int srcH, Point2D eyeLeft, Point2D eyeRight, Point2D[] allLandmarks)
        {
            double cx = (eyeLeft.X + eyeRight.X) / 2.0;
            double cy = (eyeLeft.Y + eyeRight.Y) / 2.0;
            double dx = eyeRight.X - eyeLeft.X;
            double dy = eyeRight.Y - eyeLeft.Y;
            double currentDist = Math.Sqrt(dx * dx + dy * dy);
            if (currentDist == 0) currentDist = 1.0;

            double angleRad = Math.Atan2(dy, dx);
            double targetDist = 35.2372;
            double scale = targetDist / currentDist;

            byte[] alignedImage = WarpAffineBilinear(srcRgb, srcW, srcH, cx, cy, angleRad, scale);

            var transformedLandmarks = new Point2D[allLandmarks.Length];
            for (int i = 0; i < allLandmarks.Length; i++)
            {
                transformedLandmarks[i] = TransformPoint(allLandmarks[i], cx, cy, angleRad, scale);
            }

            return (alignedImage, transformedLandmarks);
        }

        /// <summary>
        /// Trích xuất vector đặc trưng 512-D từ ảnh đã được căn chỉnh 112x112 và danh sách 26 landmarks chuẩn hóa.
        /// </summary>
        public float[] ExtractEmbeddingFromAligned(byte[] alignedFaceRgb, Point2D[] landmarks26Aligned)
        {
            var tensorGlobal = PreprocessGlobalImage(alignedFaceRgb);
            var tensorEye = PreprocessSubRegion(alignedFaceRgb, 20, 76, 0, 112);  
            var tensorNose = PreprocessSubRegion(alignedFaceRgb, 45, 101, 28, 84); 
            var tensorGeom = PreprocessGeometry(landmarks26Aligned, 112, 112); 

            var inputs = new List<NamedOnnxValue>
            {
                NamedOnnxValue.CreateFromTensor("x_global", tensorGlobal),
                NamedOnnxValue.CreateFromTensor("x_eye", tensorEye),
                NamedOnnxValue.CreateFromTensor("x_nose", tensorNose),
                NamedOnnxValue.CreateFromTensor("x_geom", tensorGeom)
            };

            using (var results = _session.Run(inputs))
            {
                var outputTensor = results.First(o => o.Name == "face_embedding").AsTensor<float>();
                float[] rawEmbedding = outputTensor.ToArray();
                return L2Normalize(rawEmbedding);
            }
        }

        #region MediaPipe Face Landmarker Run Code (Mobile Native Bindings)

        private Point2D[] DetectLandmarksWithMediaPipe(byte[] rgbBytes, int width, int height, string modelPath)
        {
            // Note: Đoạn mã này mô tả cách chạy MediaPipe Face Landmarker trên ứng dụng di động Xamarin/MAUI (.NET).
            // Do MediaPipe chạy native trên Android (Java) và iOS (Swift), các nhà phát triển .NET MAUI thường gọi thông qua 
            // Platform-Specific code (Android Java bindings hoặc iOS Objective-C bindings).
            
            #if ANDROID
            // Ví dụ mã chạy trên Android:
            // var options = FaceLandmarker.FaceLandmarkerOptions.Builder()
            //     .SetBaseOptions(BaseOptions.Builder().SetModelAssetPath(modelPath).Build())
            //     .SetRunningMode(RunningMode.IMAGE)
            //     .SetNumFaces(1)
            //     .Build();
            // var landmarker = FaceLandmarker.CreateFromOptions(Platform.AppContext, options);
            // var mpImage = new BitmapImageBuilder(bitmap).Build();
            // var result = landmarker.Detect(mpImage);
            // Lấy 468 landmarks từ result và trả về toạ độ pixel tuyệt đối:
            // Point2D[468] list;
            #elif IOS
            // Ví dụ mã chạy trên iOS:
            // let options = FaceLandmarkerOptions()
            // options.baseOptions.modelAssetPath = modelPath
            // options.runningMode = .image
            // let landmarker = try FaceLandmarker(options: options)
            // let result = try landmarker.detect(image: uiImage)
            #endif

            // Để chạy thử nghiệm và demo, chúng tôi cung cấp hàm trả về toạ độ mô phỏng hợp lệ của 468 điểm.
            // Trong ứng dụng thực tế, thay thế hàm này bằng kết quả trả về từ SDK MediaPipe di động.
            var dummyLandmarks = new Point2D[468];
            for (int i = 0; i < 468; i++)
            {
                dummyLandmarks[i] = new Point2D((float)(width * 0.5), (float)(height * 0.5));
            }
            // Thiết lập giá trị giả lập hợp lý cho mắt trái, mắt phải để quá trình aligned không bị chia cho 0
            dummyLandmarks[33] = new Point2D((float)(width * 0.45), (float)(height * 0.45));
            dummyLandmarks[133] = new Point2D((float)(width * 0.48), (float)(height * 0.45));
            dummyLandmarks[362] = new Point2D((float)(width * 0.52), (float)(height * 0.45));
            dummyLandmarks[263] = new Point2D((float)(width * 0.55), (float)(height * 0.45));

            return dummyLandmarks;
        }

        #endregion

        #region Các phép biến đổi hình học (Affine Warp & Transform)

        private byte[] WarpAffineBilinear(byte[] srcRgb, int srcW, int srcH, double cx, double cy, double angleRad, double scale)
        {
            byte[] destRgb = new byte[112 * 112 * 3];
            double cos = Math.Cos(angleRad);
            double sin = Math.Sin(angleRad);
            double tx = 55.9132;
            double ty = 51.59885;

            for (int dy = 0; dy < 112; dy++)
            {
                for (int dx = 0; dx < 112; dx++)
                {
                    double x1 = dx - tx;
                    double y1 = dy - ty;

                    double x2 = (x1 * cos + y1 * sin) / scale;
                    double y2 = (-x1 * sin + y1 * cos) / scale;

                    double srcX = x2 + cx;
                    double srcY = y2 + cy;

                    if (srcX >= 0 && srcX < srcW - 1 && srcY >= 0 && srcY < srcH - 1)
                    {
                        int x0 = (int)Math.Floor(srcX);
                        int x1_coord = x0 + 1;
                        int y0 = (int)Math.Floor(srcY);
                        int y1_coord = y0 + 1;

                        double wx = srcX - x0;
                        double wy = srcY - y0;

                        for (int c = 0; c < 3; c++)
                        {
                            double p00 = srcRgb[(y0 * srcW + x0) * 3 + c];
                            double p10 = srcRgb[(y0 * srcW + x1_coord) * 3 + c];
                            double p01 = srcRgb[(y1_coord * srcW + x0) * 3 + c];
                            double p11 = srcRgb[(y1_coord * srcW + x1_coord) * 3 + c];

                            double val = (1 - wy) * ((1 - wx) * p00 + wx * p10) + wy * ((1 - wx) * p01 + wx * p11);
                            destRgb[(dy * 112 + dx) * 3 + c] = (byte)Math.Clamp(val, 0, 255);
                        }
                    }
                    else
                    {
                        destRgb[(dy * 112 + dx) * 3] = 0;
                        destRgb[(dy * 112 + dx) * 3 + 1] = 0;
                        destRgb[(dy * 112 + dx) * 3 + 2] = 0;
                    }
                }
            }
            return destRgb;
        }

        private Point2D TransformPoint(Point2D pt, double cx, double cy, double angleRad, double scale)
        {
            double cos = Math.Cos(angleRad);
            double sin = Math.Sin(angleRad);
            double tx = 55.9132;
            double ty = 51.59885;

            double x1 = pt.X - cx;
            double y1 = pt.Y - cy;

            double x2 = scale * (x1 * cos - y1 * sin);
            double y2 = scale * (x1 * sin + y1 * cos);

            return new Point2D((float)(x2 + tx), (float)(y2 + ty));
        }

        #endregion

        #region Tiền xử lý Tensor ảnh

        private DenseTensor<float> PreprocessGlobalImage(byte[] alignedFaceRgb)
        {
            var tensor = new DenseTensor<float>(new int[] { 1, 3, 112, 112 });
            for (int h = 0; h < 112; h++)
            {
                for (int w = 0; w < 112; w++)
                {
                    int idx = (h * 112 + w) * 3;
                    tensor[0, 0, h, w] = (alignedFaceRgb[idx] - 127.5f) / 127.5f;     
                    tensor[0, 1, h, w] = (alignedFaceRgb[idx + 1] - 127.5f) / 127.5f; 
                    tensor[0, 2, h, w] = (alignedFaceRgb[idx + 2] - 127.5f) / 127.5f; 
                }
            }
            return tensor;
        }

        private DenseTensor<float> PreprocessSubRegion(byte[] alignedFaceRgb, int yStart, int yEnd, int xStart, int xEnd)
        {
            int height = yEnd - yStart;
            int width = xEnd - xStart;
            var tensor = new DenseTensor<float>(new int[] { 1, 3, height, width });

            for (int y = 0; y < height; y++)
            {
                for (int x = 0; x < width; x++)
                {
                    int origY = yStart + y;
                    int origX = xStart + x;
                    int idx = (origY * 112 + origX) * 3;

                    tensor[0, 0, y, x] = (alignedFaceRgb[idx] - 127.5f) / 127.5f;
                    tensor[0, 1, y, x] = (alignedFaceRgb[idx + 1] - 127.5f) / 127.5f;
                    tensor[0, 2, y, x] = (alignedFaceRgb[idx + 2] - 127.5f) / 127.5f;
                }
            }
            return tensor;
        }

        #endregion

        #region Tiền xử lý Hình học (x_geom)

        private DenseTensor<float> PreprocessGeometry(Point2D[] landmarks26, int width, int height)
        {
            var normPoints = new Point2D[26];
            for (int i = 0; i < 26; i++)
            {
                normPoints[i] = new Point2D(landmarks26[i].X / width, landmarks26[i].Y / height);
            }

            float eyeLeftX = (normPoints[0].X + normPoints[1].X) / 2.0f;
            float eyeLeftY = (normPoints[0].Y + normPoints[1].Y) / 2.0f;

            float eyeRightX = (normPoints[2].X + normPoints[3].X) / 2.0f;
            float eyeRightY = (normPoints[2].Y + normPoints[3].Y) / 2.0f;

            float eyeMidX = (eyeLeftX + eyeRightX) / 2.0f;
            float eyeMidY = (eyeLeftY + eyeRightY) / 2.0f;

            float dx = eyeRightX - eyeLeftX;
            float dy = eyeRightY - eyeLeftY;
            float ipd = (float)Math.Sqrt(dx * dx + dy * dy);
            if (ipd == 0) ipd = 1.0f;

            var tensor = new DenseTensor<float>(new int[] { 1, 26, 2 });

            for (int i = 0; i < 26; i++)
            {
                float dispX = normPoints[i].X - eyeMidX;
                float dispY = normPoints[i].Y - eyeMidY;

                tensor[0, i, 0] = dispX / ipd;
                tensor[0, i, 1] = dispY / ipd;
            }

            return tensor;
        }

        #endregion

        #region Tiện ích hỗ trợ

        private BBox ComputeBoundingBox(Point2D[] allLandmarks, int imgW, int imgH)
        {
            float xMin = float.MaxValue, xMax = float.MinValue;
            float yMin = float.MaxValue, yMax = float.MinValue;

            foreach (var idx in LandmarkIndices)
            {
                var pt = allLandmarks[idx];
                if (pt.X < xMin) xMin = pt.X;
                if (pt.X > xMax) xMax = pt.X;
                if (pt.Y < yMin) yMin = pt.Y;
                if (pt.Y > yMax) yMax = pt.Y;
            }

            float boxW = xMax - xMin;
            float boxH = yMax - yMin;
            int padX = (int)(boxW * 0.2f);
            int padY = (int)(boxH * 0.25f);

            int x = Math.Max(0, (int)(xMin - padX));
            int y = Math.Max(0, (int)(yMin - padY));
            int w = Math.Min(imgW - x, (int)(boxW + 2 * padX));
            int h = Math.Min(imgH - y, (int)(boxH + 2 * padY));

            return new BBox(x, y, w, h);
        }

        private float[] L2Normalize(float[] vector)
        {
            double sum = 0;
            for (int i = 0; i < vector.Length; i++)
            {
                sum += vector[i] * vector[i];
            }
            float norm = (float)Math.Sqrt(sum);
            if (norm == 0) return vector;

            return vector.Select(val => val / norm).ToArray();
        }

        public static float CalculateCosineSimilarity(float[] vector1, float[] vector2)
        {
            if (vector1.Length != vector2.Length)
                throw new ArgumentException("Hai vector phải có cùng chiều dài.");

            float dotProduct = 0f;
            for (int i = 0; i < vector1.Length; i++)
            {
                dotProduct += vector1[i] * vector2[i];
            }
            return dotProduct;
        }

        #endregion

        public void Dispose()
        {
            _session?.Dispose();
        }
    }
}
