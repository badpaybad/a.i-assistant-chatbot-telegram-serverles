using System;
using System.IO;
using SkiaSharp;
using Core.Infra.OnnxComputerVision.Services;

namespace Scratch;

public class Program
{
    public static void Main()
    {
        Console.WriteLine("=== ONNX Computer Vision (SkiaSharp) Verification ===");

        using var service = new InsightFaceSkiaService();

        string imgPath1 = "/work/ekycwebapi/aimodels/1.jpg";
        string imgPath2 = "/work/ekycwebapi/aimodels/du1.jpeg";

        if (!File.Exists(imgPath1) || !File.Exists(imgPath2))
        {
            Console.WriteLine("Test images not found!");
            return;
        }

        using var bmp1 = SKBitmap.Decode(imgPath1);
        using var bmp2 = SKBitmap.Decode(imgPath2);

        Console.WriteLine($"Image 1 loaded: {bmp1.Width}x{bmp1.Height}");
        Console.WriteLine($"Image 2 loaded: {bmp2.Width}x{bmp2.Height}");

        // 1. Detect Faces
        var faces1 = service.DetectFace(bmp1);
        Console.WriteLine($"Faces in img1: {faces1.Count}");
        foreach (var f in faces1)
        {
            Console.WriteLine($"  Bbox: [{f.Bbox.X}, {f.Bbox.Y}, {f.Bbox.Width}, {f.Bbox.Height}], Score: {f.Score:F4}");
            Console.WriteLine($"  Keypoint 0 (Left Eye): ({f.Kps[0].X:F1}, {f.Kps[0].Y:F1})");
            Console.WriteLine($"  Landmarks 106 count: {f.Landmark106.Length}");
        }

        var faces2 = service.DetectFace(bmp2);
        Console.WriteLine($"Faces in img2: {faces2.Count}");

        // 2. Extract Embedding
        if (faces1.Count > 0)
        {
            var emb = service.VectorFace(bmp1, faces1[0]);
            Console.WriteLine($"Embedding vector length: {emb.Length}");
            float norm = 0f;
            foreach (var v in emb) norm += v * v;
            Console.WriteLine($"Embedding L2 Norm: {MathF.Sqrt(norm):F6}");
        }

        // 3. Compare Faces
        var (sim, f1, f2, v1, v2) = service.CompareFaces(bmp1, bmp2);
        Console.WriteLine($"Similarity score between img1 and img2: {sim:F4}");

        Console.WriteLine("=== VERIFICATION COMPLETE ===");
    }
}
