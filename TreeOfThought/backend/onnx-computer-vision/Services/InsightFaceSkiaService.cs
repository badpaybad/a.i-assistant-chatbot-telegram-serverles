using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.ML.OnnxRuntime;
using Microsoft.ML.OnnxRuntime.Tensors;
using SkiaSharp;
using Core.Infra.OnnxComputerVision.Models;
using Core.Infra.OnnxComputerVision.Helpers;

namespace Core.Infra.OnnxComputerVision.Services;

public class InsightFaceSkiaService : IInsightFaceSkiaService
{
    private readonly InferenceSession _detSession;
    private readonly InferenceSession _lmkSession;
    private readonly InferenceSession _recSession;

    private readonly int[] _featStrides = new[] { 8, 16, 32 };
    private readonly int _numAnchors = 2;
    private readonly float _detThresh = 0.5f;
    private readonly float _nmsThresh = 0.4f;

    private readonly Dictionary<(int, int, int), Point2f[]> _anchorCentersCache = new();

    public InsightFaceSkiaService(string? detModelPath = null, string? lmkModelPath = null, string? recModelPath = null)
    {
        string defaultBaseDir = "/work/ekycwebapi/aimodels/weights/models";
        if (!Directory.Exists(defaultBaseDir))
        {
            defaultBaseDir = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "aimodels", "weights", "models");
        }

        detModelPath ??= Path.Combine(defaultBaseDir, "buffalo_l", "det_10g.onnx");
        lmkModelPath ??= Path.Combine(defaultBaseDir, "buffalo_l", "2d106det.onnx");
        recModelPath ??= Path.Combine(defaultBaseDir, "updated_resnet100.onnx");

        if (!File.Exists(detModelPath))
            throw new FileNotFoundException($"ONNX Detection model not found at {detModelPath}");
        if (!File.Exists(lmkModelPath))
            throw new FileNotFoundException($"ONNX Landmark model not found at {lmkModelPath}");
        if (!File.Exists(recModelPath))
            throw new FileNotFoundException($"ONNX Recognition model not found at {recModelPath}");

        var options = new SessionOptions();
        options.AppendExecutionProvider_CPU(0);

        _detSession = new InferenceSession(detModelPath, options);
        _lmkSession = new InferenceSession(lmkModelPath, options);
        _recSession = new InferenceSession(recModelPath, options);
    }

    public List<FaceInfo> DetectFace(SKBitmap bitmap, float detThresh = 0.5f)
    {
        if (bitmap == null || bitmap.Width == 0 || bitmap.Height == 0)
            return new List<FaceInfo>();

        float effectiveDetThresh = detThresh > 0 ? detThresh : _detThresh;

        const int targetWidth = 640;
        const int targetHeight = 640;

        // 1. Preprocess: letterbox resize
        double imRatio = (double)bitmap.Height / bitmap.Width;
        double modelRatio = (double)targetHeight / targetWidth;
        int newWidth, newHeight;
        if (imRatio > modelRatio)
        {
            newHeight = targetHeight;
            newWidth = (int)(newHeight / imRatio);
        }
        else
        {
            newWidth = targetWidth;
            newHeight = (int)(newWidth * imRatio);
        }
        double detScale = (double)newHeight / bitmap.Height;

        using var detImg = new SKBitmap(targetWidth, targetHeight, SKColorType.Rgba8888, SKAlphaType.Premul);
        using (var canvas = new SKCanvas(detImg))
        {
            canvas.Clear(SKColors.Black);
            var destRect = new SKRect(0, 0, newWidth, newHeight);
            canvas.DrawBitmap(bitmap, destRect);
            canvas.Flush();
        }

        // 2. Prepare ONNX input tensor [1, 3, 640, 640] (float32 for ONNX)
        float[] inputData = new float[1 * 3 * targetHeight * targetWidth];
        ReadOnlySpan<byte> pixelSpan = detImg.GetPixelSpan();

        for (int y = 0; y < targetHeight; y++)
        {
            int rowOffset = y * targetWidth * 4;
            for (int x = 0; x < targetWidth; x++)
            {
                int pxOffset = rowOffset + x * 4;
                byte r = pixelSpan[pxOffset + 0];
                byte g = pixelSpan[pxOffset + 1];
                byte b = pixelSpan[pxOffset + 2];

                int pixelIdx = y * targetWidth + x;
                inputData[0 * targetHeight * targetWidth + pixelIdx] = (r - 127.5f) / 128.0f;
                inputData[1 * targetHeight * targetWidth + pixelIdx] = (g - 127.5f) / 128.0f;
                inputData[2 * targetHeight * targetWidth + pixelIdx] = (b - 127.5f) / 128.0f;
            }
        }

        var inputTensor = new DenseTensor<float>(inputData, new int[] { 1, 3, targetHeight, targetWidth });
        var inputs = new List<NamedOnnxValue>
        {
            NamedOnnxValue.CreateFromTensor(_detSession.InputMetadata.First().Key, inputTensor)
        };

        // 3. Run Inference
        using var results = _detSession.Run(inputs);

        Tensor<float>?[,] mappedTensors = new Tensor<float>?[3, 3];
        foreach (var result in results)
        {
            var tensor = result.AsTensor<float>();
            var dim = tensor.Dimensions;
            if (dim.Length != 2) continue;

            int strideIdx = -1;
            int numAnchors = dim[0];
            if (numAnchors == 12800) strideIdx = 0;
            else if (numAnchors == 3200) strideIdx = 1;
            else if (numAnchors == 800) strideIdx = 2;

            int typeIdx = -1;
            int contentSize = dim[1];
            if (contentSize == 1) typeIdx = 0;
            else if (contentSize == 4) typeIdx = 1;
            else if (contentSize == 10) typeIdx = 2;

            if (strideIdx != -1 && typeIdx != -1)
            {
                mappedTensors[strideIdx, typeIdx] = tensor;
            }
        }

        for (int s = 0; s < 3; s++)
        {
            for (int t = 0; t < 3; t++)
            {
                if (mappedTensors[s, t] == null)
                    return new List<FaceInfo>();
            }
        }

        var candidates = new List<FaceInfo>();

        int fmc = _featStrides.Length;
        for (int idx = 0; idx < fmc; idx++)
        {
            int stride = _featStrides[idx];

            var scoresTensor = mappedTensors[idx, 0]!;
            var bboxTensor = mappedTensors[idx, 1]!;
            var kpsTensor = mappedTensors[idx, 2]!;

            int gridHeight = targetHeight / stride;
            int gridWidth = targetWidth / stride;
            int anchorNum = gridHeight * gridWidth * _numAnchors;

            var anchorCenters = GetAnchorCenters(gridHeight, gridWidth, stride);

            for (int i = 0; i < anchorNum; i++)
            {
                float score = scoresTensor[i, 0];
                if (score >= effectiveDetThresh)
                {
                    var pt = anchorCenters[i];

                    float dLeft = bboxTensor[i, 0] * stride;
                    float dTop = bboxTensor[i, 1] * stride;
                    float dRight = bboxTensor[i, 2] * stride;
                    float dBottom = bboxTensor[i, 3] * stride;

                    float x1 = (pt.X - dLeft) / (float)detScale;
                    float y1 = (pt.Y - dTop) / (float)detScale;
                    float x2 = (pt.X + dRight) / (float)detScale;
                    float y2 = (pt.Y + dBottom) / (float)detScale;

                    x1 = Math.Clamp(x1, 0, bitmap.Width);
                    y1 = Math.Clamp(y1, 0, bitmap.Height);
                    x2 = Math.Clamp(x2, 0, bitmap.Width);
                    y2 = Math.Clamp(y2, 0, bitmap.Height);

                    Point2f[] kps = new Point2f[5];
                    for (int k = 0; k < 5; k++)
                    {
                        float dx = kpsTensor[i, k * 2 + 0] * stride;
                        float dy = kpsTensor[i, k * 2 + 1] * stride;
                        float kx = (pt.X + dx) / (float)detScale;
                        float ky = (pt.Y + dy) / (float)detScale;

                        kps[k] = new Point2f(Math.Clamp(kx, 0, bitmap.Width), Math.Clamp(ky, 0, bitmap.Height));
                    }

                    candidates.Add(new FaceInfo
                    {
                        Bbox = new Rect((int)x1, (int)y1, (int)(x2 - x1), (int)(y2 - y1)),
                        Score = score,
                        Kps = kps
                    });
                }
            }
        }

        // 4. Perform Non-Maximum Suppression (NMS)
        var keepIdx = Nms(candidates, _nmsThresh);
        var faces = keepIdx.Select(i => candidates[i]).ToList();

        // 5. Extract 106 landmarks for each candidate
        foreach (var face in faces)
        {
            ExtractLandmarks106(bitmap, face);
        }

        return faces;
    }

    private void ExtractLandmarks106(SKBitmap bitmap, FaceInfo face)
    {
        var bbox = face.Bbox;
        float w = bbox.Width;
        float h = bbox.Height;
        float center_x = bbox.X + w / 2f;
        float center_y = bbox.Y + h / 2f;

        const int targetSize = 192;
        float scale = targetSize / (Math.Max(w, h) * 1.5f);

        float tx = -scale * center_x + targetSize / 2f;
        float ty = -scale * center_y + targetSize / 2f;

        using var warped = new SKBitmap(targetSize, targetSize, SKColorType.Rgba8888, SKAlphaType.Premul);
        using (var canvas = new SKCanvas(warped))
        {
            canvas.Clear(SKColors.Black);
            var matrix = new SKMatrix
            {
                ScaleX = scale,
                SkewX = 0f,
                TransX = tx,
                SkewY = 0f,
                ScaleY = scale,
                TransY = ty,
                Persp0 = 0,
                Persp1 = 0,
                Persp2 = 1
            };
            canvas.SetMatrix(matrix);
            using var paint = new SKPaint { FilterQuality = SKFilterQuality.Medium };
            canvas.DrawBitmap(bitmap, 0, 0, paint);
            canvas.Flush();
        }

        float[] inputData = new float[1 * 3 * targetSize * targetSize];
        ReadOnlySpan<byte> pixelSpan = warped.GetPixelSpan();

        for (int y = 0; y < targetSize; y++)
        {
            int rowOffset = y * targetSize * 4;
            for (int x = 0; x < targetSize; x++)
            {
                int pxOffset = rowOffset + x * 4;
                byte r = pixelSpan[pxOffset + 0];
                byte g = pixelSpan[pxOffset + 1];
                byte b = pixelSpan[pxOffset + 2];

                int pixelIdx = y * targetSize + x;
                inputData[0 * targetSize * targetSize + pixelIdx] = (r - 127.5f) / 128.0f;
                inputData[1 * targetSize * targetSize + pixelIdx] = (g - 127.5f) / 128.0f;
                inputData[2 * targetSize * targetSize + pixelIdx] = (b - 127.5f) / 128.0f;
            }
        }

        var inputTensor = new DenseTensor<float>(inputData, new int[] { 1, 3, targetSize, targetSize });
        var inputs = new List<NamedOnnxValue>
        {
            NamedOnnxValue.CreateFromTensor(_lmkSession.InputMetadata.First().Key, inputTensor)
        };

        using var results = _lmkSession.Run(inputs);
        var pred = results.First().AsTensor<float>();

        float lmkHalfSize = targetSize / 2f;
        for (int i = 0; i < 106; i++)
        {
            float px = (pred[0, i * 2] + 1f) * lmkHalfSize;
            float py = (pred[0, i * 2 + 1] + 1f) * lmkHalfSize;

            float orig_x = (px - tx) / scale;
            float orig_y = (py - ty) / scale;

            face.Landmark106[i] = new Point2f(orig_x, orig_y);
        }
    }

    public float[] VectorFace(SKBitmap bitmap, FaceInfo face)
    {
        using var aligned = UmeyamaTransformHelper.AlignFace(bitmap, face.Kps);

        const int targetSize = 112;
        float[] inputData = new float[1 * 3 * targetSize * targetSize];
        ReadOnlySpan<byte> pixelSpan = aligned.GetPixelSpan();

        for (int y = 0; y < targetSize; y++)
        {
            int rowOffset = y * targetSize * 4;
            for (int x = 0; x < targetSize; x++)
            {
                int pxOffset = rowOffset + x * 4;
                byte r = pixelSpan[pxOffset + 0];
                byte g = pixelSpan[pxOffset + 1];
                byte b = pixelSpan[pxOffset + 2];

                int pixelIdx = y * targetSize + x;
                inputData[0 * targetSize * targetSize + pixelIdx] = b;
                inputData[1 * targetSize * targetSize + pixelIdx] = g;
                inputData[2 * targetSize * targetSize + pixelIdx] = r;
            }
        }

        var inputTensor = new DenseTensor<float>(inputData, new int[] { 1, 3, targetSize, targetSize });
        var inputs = new List<NamedOnnxValue>
        {
            NamedOnnxValue.CreateFromTensor(_recSession.InputMetadata.First().Key, inputTensor)
        };

        using var results = _recSession.Run(inputs);
        var embedding = results.First().AsTensor<float>().ToArray();

        // Perform L2 Normalization
        float norm = 0f;
        for (int i = 0; i < embedding.Length; i++)
        {
            norm += embedding[i] * embedding[i];
        }
        norm = MathF.Sqrt(norm);

        if (norm > 0f)
        {
            for (int i = 0; i < embedding.Length; i++)
            {
                embedding[i] /= norm;
            }
        }

        return embedding;
    }

    public double CompareVector(float[] v1, float[] v2)
    {
        if (v1 == null || v2 == null || v1.Length != v2.Length)
            return 0.0;

        float dot = 0f;
        for (int i = 0; i < v1.Length; i++)
        {
            dot += v1[i] * v2[i];
        }
        return dot;
    }

    public (double Similarity, FaceInfo? f1, FaceInfo? f2, float[]? v1, float[]? v2) CompareFaces(SKBitmap img1, SKBitmap img2, float detThresh = 0.5f)
    {
        var faces1 = DetectFace(img1, detThresh);
        var faces2 = DetectFace(img2, detThresh);

        if (!faces1.Any()) return (-1.0, null, null, null, null);
        if (!faces2.Any()) return (-2.0, null, null, null, null);

        var f1 = faces1.OrderByDescending(f => f.Score).First();
        var f2 = faces2.OrderByDescending(f => f.Score).First();

        var v1 = VectorFace(img1, f1);
        var v2 = VectorFace(img2, f2);

        double similarity = CompareVector(v1, v2);

        return (similarity, f1, f2, v1, v2);
    }

    private Point2f[] GetAnchorCenters(int height, int width, int stride)
    {
        var key = (height, width, stride);
        if (_anchorCentersCache.TryGetValue(key, out var cached))
            return cached;

        var centers = new Point2f[height * width * _numAnchors];
        int idx = 0;
        for (int y = 0; y < height; y++)
        {
            for (int x = 0; x < width; x++)
            {
                float px = x * stride;
                float py = y * stride;
                for (int a = 0; a < _numAnchors; a++)
                {
                    centers[idx++] = new Point2f(px, py);
                }
            }
        }

        _anchorCentersCache[key] = centers;
        return centers;
    }

    private List<int> Nms(List<FaceInfo> candidates, float threshold)
    {
        var order = candidates
            .Select((c, idx) => new { Candidate = c, Index = idx })
            .OrderByDescending(x => x.Candidate.Score)
            .Select(x => x.Index)
            .ToList();

        var keep = new List<int>();
        while (order.Count > 0)
        {
            int i = order[0];
            keep.Add(i);
            var rest = new List<int>();
            for (int j = 1; j < order.Count; j++)
            {
                int idx = order[j];
                float iou = CalculateIoU(candidates[i].Bbox, candidates[idx].Bbox);
                if (iou <= threshold)
                {
                    rest.Add(idx);
                }
            }
            order = rest;
        }
        return keep;
    }

    private float CalculateIoU(Rect boxA, Rect boxB)
    {
        int x1 = Math.Max(boxA.X, boxB.X);
        int y1 = Math.Max(boxA.Y, boxB.Y);
        int x2 = Math.Min(boxA.X + boxA.Width, boxB.X + boxB.Width);
        int y2 = Math.Min(boxA.Y + boxA.Height, boxB.Y + boxB.Height);

        int interArea = Math.Max(0, x2 - x1) * Math.Max(0, y2 - y1);
        int areaA = boxA.Width * boxA.Height;
        int areaB = boxB.Width * boxB.Height;

        if (areaA + areaB - interArea == 0) return 0f;
        return (float)interArea / (areaA + areaB - interArea);
    }

    public void Dispose()
    {
        _detSession?.Dispose();
        _lmkSession?.Dispose();
        _recSession?.Dispose();
    }
}
