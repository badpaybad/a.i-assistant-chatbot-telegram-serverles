using Core.Infra.Auth.Attributes;
using Core.Infra.Base.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.ML.OnnxRuntime;
using Microsoft.ML.OnnxRuntime.Tensors;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Infra.NhanDienKhuonMat.Controllers;

[ApiController]
[Route("api/face-process")]
[AppAuthorize]
[AllowAnonymous] // Cho phép truy cập ẩn danh phục vụ mục đích kiểm thử và phát triển dễ dàng
public class FaceProcessController : BaseController
{
    private readonly ILogger<FaceProcessController> _logger;
    private static readonly ConcurrentDictionary<string, Lazy<InferenceSession>> _onnxSessions = new();

    public FaceProcessController(ILogger<FaceProcessController> logger)
    {
        _logger = logger;
    }

    /// <summary>
    /// Phát hiện khuôn mặt bằng mô hình BlazeFace ONNX (chuyển đổi từ blaze_face_short_range.tflite).
    /// </summary>
    [HttpPost("detect")]
    public async Task<IActionResult> DetectFace(IFormFile image)
    {
        if (image == null || image.Length == 0)
            return BadRequest("Tệp ảnh không hợp lệ.");

        var modelPath = GetModelPath("face_detection.onnx");
        if (!System.IO.File.Exists(modelPath))
            return NotFound($"Không tìm thấy mô hình face_detection.onnx tại: {modelPath}");

        try
        {
            var session = GetOrCreateSession(modelPath);

            using var ms = new MemoryStream();
            await image.CopyToAsync(ms);
            ms.Position = 0;

            using var img = Image.Load<Rgb24>(ms);
            // Resize về kích thước đầu vào của BlazeFace short range: 160 (rộng) x 272 (cao)
            img.Mutate(x => x.Resize(160, 272));

            // Chuyển thành tensor NCHW [1, 3, 272, 160] và chuẩn hóa về [-1, 1]
            var tensor = new DenseTensor<float>(new[] { 1, 3, 272, 160 });
            img.ProcessPixelRows(accessor =>
            {
                for (int y = 0; y < 272; y++)
                {
                    var row = accessor.GetRowSpan(y);
                    for (int x = 0; x < 160; x++)
                    {
                        var pixel = row[x];
                        tensor[0, 0, y, x] = (pixel.R - 127.5f) / 127.5f; // Đỏ
                        tensor[0, 1, y, x] = (pixel.G - 127.5f) / 127.5f; // Lục
                        tensor[0, 2, y, x] = (pixel.B - 127.5f) / 127.5f; // Lam
                    }
                }
            });

            var inputs = new List<NamedOnnxValue>
            {
                NamedOnnxValue.CreateFromTensor("input.1", tensor)
            };

            using var results = session.Run(inputs);

            // Thu thập dữ liệu các tensor đầu ra
            var outputsSummary = new List<object>();
            foreach (var result in results)
            {
                var outputName = result.Name;
                var outputTensor = result.AsTensor<float>();
                var outputShape = outputTensor.Dimensions.ToArray();
                var data = outputTensor.ToArray();

                outputsSummary.Add(new
                {
                    Name = outputName,
                    Shape = outputShape,
                    Size = data.Length,
                    FirstValues = data.Take(10).ToArray()
                });
            }

            return Ok(new
            {
                message = "Phát hiện khuôn mặt bằng ONNX thành công.",
                inputShape = new[] { 1, 3, 272, 160 },
                outputs = outputsSummary
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Lỗi khi chạy mô hình phát hiện khuôn mặt ONNX.");
            return StatusCode(500, new { message = $"Lỗi xử lý: {ex.Message}" });
        }
    }

    /// <summary>
    /// Trích xuất 148 điểm mốc 3D (444 tọa độ) bằng mô hình Face Landmark ONNX (chuyển đổi từ face_landmarker.task).
    /// </summary>
    [HttpPost("landmarks")]
    public async Task<IActionResult> ExtractLandmarks(IFormFile image)
    {
        if (image == null || image.Length == 0)
            return BadRequest("Tệp ảnh không hợp lệ.");

        var modelPath = GetModelPath("face_landmark.onnx");
        if (!System.IO.File.Exists(modelPath))
            return NotFound($"Không tìm thấy mô hình face_landmark.onnx tại: {modelPath}");

        try
        {
            var session = GetOrCreateSession(modelPath);

            using var ms = new MemoryStream();
            await image.CopyToAsync(ms);
            ms.Position = 0;

            using var img = Image.Load<Rgb24>(ms);
            // Resize về kích thước đầu vào của Face Landmark Mesh: 128 (rộng) x 128 (cao)
            img.Mutate(x => x.Resize(128, 128));

            // Chuyển thành tensor NCHW [1, 3, 128, 128] và chuẩn hóa về [0, 1] hoặc [-1, 1] tùy mô hình
            var tensor = new DenseTensor<float>(new[] { 1, 3, 128, 128 });
            img.ProcessPixelRows(accessor =>
            {
                for (int y = 0; y < 128; y++)
                {
                    var row = accessor.GetRowSpan(y);
                    for (int x = 0; x < 128; x++)
                    {
                        var pixel = row[x];
                        tensor[0, 0, y, x] = pixel.R / 255.0f; // Đỏ
                        tensor[0, 1, y, x] = pixel.G / 255.0f; // Lục
                        tensor[0, 2, y, x] = pixel.B / 255.0f; // Lam
                    }
                }
            });

            var inputs = new List<NamedOnnxValue>
            {
                NamedOnnxValue.CreateFromTensor("data", tensor)
            };

            using var results = session.Run(inputs);

            // Bóc tách các đầu ra theo đúng metadata của Face Landmark ONNX
            var landmarksTensor = results.FirstOrDefault(r => r.Name == "output_landmarks")?.AsTensor<float>().ToArray() ?? Array.Empty<float>();
            var eulerTensor = results.FirstOrDefault(r => r.Name == "output_euler")?.AsTensor<float>().ToArray() ?? Array.Empty<float>();
            var probTensor = results.FirstOrDefault(r => r.Name == "output_prob")?.AsTensor<float>().ToArray() ?? Array.Empty<float>();

            // Chuyển mảng 444 floats thành danh sách 148 điểm mốc 3D (x, y, z)
            var points3D = new List<object>();
            for (int i = 0; i < landmarksTensor.Length; i += 3)
            {
                if (i + 2 < landmarksTensor.Length)
                {
                    points3D.Add(new
                    {
                        index = i / 3,
                        x = landmarksTensor[i],
                        y = landmarksTensor[i + 1],
                        z = landmarksTensor[i + 2]
                    });
                }
            }

            // MediaPipe Landmark Index tham chiếu cho mắt (pupil / centers)
            // Trong hệ thống 148 landmarks của mô hình FaceLandmark Mesh ONNX:
            // Mắt trái nằm quanh điểm 33, Mắt phải nằm quanh điểm 133
            var leftEye = points3D.Count > 33 ? points3D[33] : null;
            var rightEye = points3D.Count > 133 ? points3D[133] : null;

            return Ok(new
            {
                message = "Trích xuất landmarks khuôn mặt bằng ONNX thành công.",
                probability = probTensor.Length > 0 ? probTensor[0] : 0f,
                euler = eulerTensor,
                landmarkCount = points3D.Count,
                leftEyeReferenced = leftEye,
                rightEyeReferenced = rightEye,
                landmarks = points3D.Take(20).ToList(), // Chỉ trả về 20 điểm đầu để tránh phình to JSON trả về
                allLandmarksCount = points3D.Count
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Lỗi khi chạy mô hình trích xuất landmarks khuôn mặt ONNX.");
            return StatusCode(500, new { message = $"Lỗi xử lý: {ex.Message}" });
        }
    }

    /// <summary>
    /// Thực hiện căn chỉnh khuôn mặt chuẩn 112x112 sử dụng tọa độ mắt trích xuất từ mô hình landmarks ONNX.
    /// </summary>
    [HttpPost("align")]
    public async Task<IActionResult> AlignFace(
        IFormFile image,
        [FromForm] float eyeLeftX, [FromForm] float eyeLeftY,
        [FromForm] float eyeRightX, [FromForm] float eyeRightY)
    {
        if (image == null || image.Length == 0)
            return BadRequest("Tệp ảnh không hợp lệ.");

        try
        {
            using var ms = new MemoryStream();
            await image.CopyToAsync(ms);
            ms.Position = 0;

            using var source = Image.Load<Rgb24>(ms);
            
            float dx = eyeRightX - eyeLeftX;
            float dy = eyeRightY - eyeLeftY;
            float currentDist = (float)Math.Sqrt(dx * dx + dy * dy);
            if (currentDist < 1e-5f) currentDist = 1e-5f;
            float angleRad = (float)Math.Atan2(dy, dx);

            float arcfaceScale = 35.2372f / currentDist;
            float cosVal = (float)Math.Cos(angleRad);
            float sinVal = (float)Math.Sin(angleRad);

            using var target = new Image<Rgb24>(112, 112);
            float tx = 55.9132f;
            float ty = 51.59885f;
            float cxSrc = (eyeLeftX + eyeRightX) / 2.0f;
            float cySrc = (eyeLeftY + eyeRightY) / 2.0f;

            target.ProcessPixelRows(accessor =>
            {
                for (int y = 0; y < 112; y++)
                {
                    var row = accessor.GetRowSpan(y);
                    float y3 = y - ty;
                    for (int x = 0; x < 112; x++)
                    {
                        float x3 = x - tx;
                        float x2 = x3 / arcfaceScale;
                        float y2 = y3 / arcfaceScale;

                        float x1 = x2 * cosVal + y2 * sinVal;
                        float y1 = -x2 * sinVal + y2 * cosVal;

                        float xSrc = x1 + cxSrc;
                        float ySrc = y1 + cySrc;

                        row[x] = SampleBilinear(source, xSrc, ySrc);
                    }
                }
            });

            using var outputMs = new MemoryStream();
            target.SaveAsPng(outputMs);
            return File(outputMs.ToArray(), "image/png");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Lỗi khi thực hiện căn chỉnh khuôn mặt bằng C#.");
            return StatusCode(500, new { message = $"Lỗi xử lý: {ex.Message}" });
        }
    }

    // ==========================================
    // === PRIVATE HELPERS ===
    // ==========================================

    private static Rgb24 SampleBilinear(Image<Rgb24> source, float x, float y)
    {
        int width = source.Width;
        int height = source.Height;

        x = Math.Clamp(x, 0f, width - 1f);
        y = Math.Clamp(y, 0f, height - 1f);

        int xFloor = (int)Math.Floor(x);
        int yFloor = (int)Math.Floor(y);
        int xCeil = Math.Min(xFloor + 1, width - 1);
        int yCeil = Math.Min(yFloor + 1, height - 1);

        float dx = x - xFloor;
        float dy = y - yFloor;

        Rgb24 p00 = source[xFloor, yFloor];
        Rgb24 p10 = source[xCeil, yFloor];
        Rgb24 p01 = source[xFloor, yCeil];
        Rgb24 p11 = source[xCeil, yCeil];

        float r = (1f - dx) * (1f - dy) * p00.R + dx * (1f - dy) * p10.R + (1f - dx) * dy * p01.R + dx * dy * p11.R;
        float g = (1f - dx) * (1f - dy) * p00.G + dx * (1f - dy) * p10.G + (1f - dx) * dy * p01.G + dx * dy * p11.G;
        float b = (1f - dx) * (1f - dy) * p00.B + dx * (1f - dy) * p10.B + (1f - dx) * dy * p01.B + dx * dy * p11.B;

        return new Rgb24((byte)Math.Clamp(r, 0f, 255f), (byte)Math.Clamp(g, 0f, 255f), (byte)Math.Clamp(b, 0f, 255f));
    }

    private string GetModelPath(string modelName)
    {
        var arcfaceDir = FaceDetectionController.GetArcFaceDir();
        return Path.Combine(arcfaceDir, "arcfacemodels", modelName);
    }

    private static InferenceSession GetOrCreateSession(string modelPath)
    {
        var lazySession = _onnxSessions.GetOrAdd(modelPath, path =>
        {
            return new Lazy<InferenceSession>(() =>
            {
                var options = new SessionOptions();
                options.AppendExecutionProvider_CPU(0);
                return new InferenceSession(path, options);
            }, LazyThreadSafetyMode.ExecutionAndPublication);
        });

        return lazySession.Value;
    }
}
