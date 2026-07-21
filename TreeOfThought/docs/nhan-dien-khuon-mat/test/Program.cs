using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using SkiaSharp;
using Core.Infra.OnnxComputerVision.Services;

namespace FaceRecognitionTest;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== Starting Face Recognition ONNX Comparison Test ===");

        string current = AppDomain.CurrentDomain.BaseDirectory;
        DirectoryInfo? dirInfo = new DirectoryInfo(current);
        while (dirInfo != null && dirInfo.Name != "TreeOfThought")
        {
            dirInfo = dirInfo.Parent;
        }

        if (dirInfo == null)
        {
            throw new DirectoryNotFoundException("Could not locate TreeOfThought root directory.");
        }

        string baseDir = dirInfo.FullName;
        
        string detModelPath = Path.Combine(baseDir, "backend", "Core.Web.Api", "aimodels", "weights", "models", "buffalo_l", "det_10g.onnx");
        string lmkModelPath = Path.Combine(baseDir, "backend", "Core.Web.Api", "aimodels", "weights", "models", "buffalo_l", "2d106det.onnx");

        string updatedResnetModelPath = Path.Combine(baseDir, "backend", "Core.Web.Api", "aimodels", "weights", "models", "updated_resnet100.onnx");
        string arcfaceBestModelPath = Path.Combine(baseDir, "docs", "nhan-dien-khuon-mat", "ArcFaceFinetune", "arcface_model_best.onnx");

        string baseImagePath = Path.Combine(baseDir, "backend", "Core.Web.Api", "aimodels", "11.jpg");

        string[] testImagePaths = new string[]
        {
            Path.Combine(baseDir, "backend", "Core.Web.Api", "aimodels", "1.jpg"),
            Path.Combine(baseDir, "backend", "Core.Web.Api", "aimodels", "2026-07-17_09-42.png"),
            Path.Combine(baseDir, "backend", "Core.Web.Api", "aimodels", "du1.jpeg"),
            Path.Combine(baseDir, "backend", "Core.Web.Api", "aimodels", "IMG_20230110_141005_504.jpg")
        };

        string outputDir = Path.Combine(baseDir, "docs", "nhan-dien-khuon-mat", "test");
        string updatedResnetCsv = Path.Combine(outputDir, "updated_resnet100.onnx.csv");
        string arcfaceBestCsv = Path.Combine(outputDir, "arcface_model_best.onnx.csv");

        // Verify models and images exist
        if (!File.Exists(detModelPath)) throw new FileNotFoundException($"Detection model not found: {detModelPath}");
        if (!File.Exists(lmkModelPath)) throw new FileNotFoundException($"Landmark model not found: {lmkModelPath}");
        if (!File.Exists(updatedResnetModelPath)) throw new FileNotFoundException($"Model not found: {updatedResnetModelPath}");
        if (!File.Exists(arcfaceBestModelPath)) throw new FileNotFoundException($"Model not found: {arcfaceBestModelPath}");
        if (!File.Exists(baseImagePath)) throw new FileNotFoundException($"Base image not found: {baseImagePath}");

        foreach (var img in testImagePaths)
        {
            if (!File.Exists(img)) throw new FileNotFoundException($"Test image not found: {img}");
        }

        // 1. Benchmark updated_resnet100.onnx
        var resnetResults = RunEvaluation(
            modelName: "updated_resnet100.onnx",
            recModelPath: updatedResnetModelPath,
            detModelPath: detModelPath,
            lmkModelPath: lmkModelPath,
            baseImagePath: baseImagePath,
            testImagePaths: testImagePaths,
            csvOutputPath: updatedResnetCsv
        );

        // 2. Benchmark arcface_model_best.onnx
        var arcfaceResults = RunEvaluation(
            modelName: "arcface_model_best.onnx",
            recModelPath: arcfaceBestModelPath,
            detModelPath: detModelPath,
            lmkModelPath: lmkModelPath,
            baseImagePath: baseImagePath,
            testImagePaths: testImagePaths,
            csvOutputPath: arcfaceBestCsv
        );

        // 3. Generate resultsidebyside.csv
        string sideBySideCsv = Path.Combine(outputDir, "resultsidebyside.csv");
        var sideBySideContent = new StringBuilder();
        sideBySideContent.AppendLine("BaseImage,TestImage,updated_resnet100_similarity,arcface_model_best_similarity,Evaluation");

        string baseFileName = Path.GetFileName(baseImagePath);
        foreach (var testPath in testImagePaths)
        {
            string testFileName = Path.GetFileName(testPath);
            float resnetSim = resnetResults.GetValueOrDefault(testFileName, -1f);
            float arcfaceSim = arcfaceResults.GetValueOrDefault(testFileName, -1f);

            string evaluation;
            if (testFileName == "2026-07-17_09-42.png")
            {
                // Negative pair (different person)
                if (arcfaceSim > 0.5f)
                {
                    evaluation = $"FAIL: Feature Collapse / Supervised collapse (Diff person sim too high: {arcfaceSim:F4})";
                }
                else
                {
                    evaluation = $"PASS: Different person correctly distinguished (Sim: {arcfaceSim:F4})";
                }
            }
            else
            {
                // Positive pairs (same person)
                float diffSimForNegative = arcfaceResults.GetValueOrDefault("2026-07-17_09-42.png", -1f);
                if (diffSimForNegative > 0.5f)
                {
                    evaluation = $"INVALID: False positive due to embedding collapse across all images (Sim: {arcfaceSim:F4})";
                }
                else if (arcfaceSim > resnetSim)
                {
                    evaluation = $"PASS: Fine-tune improved similarity (Original: {resnetSim:F4} -> Fine-tuned: {arcfaceSim:F4})";
                }
                else
                {
                    evaluation = $"WARNING: Similarity did not improve (Original: {resnetSim:F4} vs Fine-tuned: {arcfaceSim:F4})";
                }
            }

            sideBySideContent.AppendLine($"{baseFileName},{testFileName},{resnetSim:F6},{arcfaceSim:F6},\"{evaluation}\"");
        }

        File.WriteAllText(sideBySideCsv, sideBySideContent.ToString(), Encoding.UTF8);
        Console.WriteLine($"\nSaved side-by-side results to {sideBySideCsv}");

        Console.WriteLine("\n=== Face Recognition ONNX Comparison Completed Successfully ===");
    }

    static Dictionary<string, float> RunEvaluation(
        string modelName,
        string recModelPath,
        string detModelPath,
        string lmkModelPath,
        string baseImagePath,
        string[] testImagePaths,
        string csvOutputPath)
    {
        Console.WriteLine($"\n--------------------------------------------------");
        Console.WriteLine($"Evaluating model: {modelName}");
        Console.WriteLine($"Model path: {recModelPath}");
        Console.WriteLine($"Output CSV: {csvOutputPath}");

        var similarities = new Dictionary<string, float>();
        using var service = new InsightFaceSkiaService(detModelPath, lmkModelPath, recModelPath);
        using var baseBitmap = SKBitmap.Decode(baseImagePath);

        if (baseBitmap == null)
        {
            Console.WriteLine($"ERROR: Failed to decode base image: {baseImagePath}");
            return similarities;
        }

        var csvContent = new StringBuilder();
        csvContent.AppendLine("BaseImage,TestImage,Similarity,BaseFaceDetected,TestFaceDetected,BaseFaceScore,TestFaceScore");

        string baseFileName = Path.GetFileName(baseImagePath);

        foreach (var testPath in testImagePaths)
        {
            string testFileName = Path.GetFileName(testPath);
            using var testBitmap = SKBitmap.Decode(testPath);

            if (testBitmap == null)
            {
                Console.WriteLine($"ERROR: Failed to decode test image: {testPath}");
                csvContent.AppendLine($"{baseFileName},{testFileName},ERROR,False,False,0.0,0.0");
                continue;
            }

            var (similarity, f1, f2, v1, v2) = service.CompareFaces(baseBitmap, testBitmap);

            bool baseDetected = f1 != null;
            bool testDetected = f2 != null;
            float baseScore = f1?.Score ?? 0.0f;
            float testScore = f2?.Score ?? 0.0f;

            similarities[testFileName] = similarity;

            string line = $"{baseFileName},{testFileName},{similarity:F6},{baseDetected},{testDetected},{baseScore:F4},{testScore:F4}";
            csvContent.AppendLine(line);

            Console.WriteLine($"[{baseFileName} vs {testFileName}] -> Similarity: {similarity:F6} (Base Score: {baseScore:F4}, Test Score: {testScore:F4})");
        }

        File.WriteAllText(csvOutputPath, csvContent.ToString(), Encoding.UTF8);
        Console.WriteLine($"Saved results to {csvOutputPath}");

        return similarities;
    }
}
