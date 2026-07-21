using SkiaSharp;
using Core.Infra.OnnxComputerVision.Models;
using System;
using System.Collections.Generic;

namespace Core.Infra.OnnxComputerVision.Services;

public interface IInsightFaceSkiaService : IDisposable
{
    List<FaceInfo> DetectFace(SKBitmap bitmap, float detThresh = 0.5f);
    float[] VectorFace(SKBitmap bitmap, FaceInfo face);
    double CompareVector(float[] v1, float[] v2);
    (double Similarity, FaceInfo? f1, FaceInfo? f2, float[]? v1, float[]? v2) CompareFaces(SKBitmap img1, SKBitmap img2, float detThresh = 0.5f);
}
