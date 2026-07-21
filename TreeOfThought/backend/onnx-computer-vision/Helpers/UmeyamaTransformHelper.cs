using SkiaSharp;
using Core.Infra.OnnxComputerVision.Models;
using System;

namespace Core.Infra.OnnxComputerVision.Helpers;

public static class UmeyamaTransformHelper
{
    // Predefined 112x112 target coordinates for ArcFace standard alignment
    public static readonly Point2f[] RefPoints = new Point2f[]
    {
        new Point2f(38.2946f, 51.6963f), // Left Eye
        new Point2f(73.5318f, 51.5014f), // Right Eye
        new Point2f(56.0252f, 71.7366f), // Nose
        new Point2f(41.5493f, 92.3655f), // Left Mouth Corner
        new Point2f(70.7299f, 92.2041f)  // Right Mouth Corner
    };

    /// <summary>
    /// Calculates 2D similarity affine transformation matrix M (2x3) mapping srcPoints to dstPoints using Least-Squares.
    /// </summary>
    public static float[,] EstimateSimilarityTransform(Point2f[] srcPoints, Point2f[] dstPoints)
    {
        if (srcPoints == null || dstPoints == null || srcPoints.Length != 5 || dstPoints.Length != 5)
            throw new ArgumentException("Requires exactly 5 point pairs for similarity transform calculation.");

        float meanSrcX = 0f, meanSrcY = 0f;
        float meanDstX = 0f, meanDstY = 0f;

        for (int i = 0; i < 5; i++)
        {
            meanSrcX += srcPoints[i].X;
            meanSrcY += srcPoints[i].Y;
            meanDstX += dstPoints[i].X;
            meanDstY += dstPoints[i].Y;
        }

        meanSrcX /= 5f;
        meanSrcY /= 5f;
        meanDstX /= 5f;
        meanDstY /= 5f;

        float varSrc = 0f;
        float sumUxVx = 0f;
        float sumVxUy = 0f;

        for (int i = 0; i < 5; i++)
        {
            float sx = srcPoints[i].X - meanSrcX;
            float sy = srcPoints[i].Y - meanSrcY;
            float dx = dstPoints[i].X - meanDstX;
            float dy = dstPoints[i].Y - meanDstY;

            varSrc += sx * sx + sy * sy;
            sumUxVx += dx * sx + dy * sy;
            sumVxUy += dy * sx - dx * sy;
        }

        if (varSrc < 1e-6f)
            varSrc = 1e-6f;

        float alpha = sumUxVx / varSrc;
        float beta = sumVxUy / varSrc;

        float tx = meanDstX - (alpha * meanSrcX - beta * meanSrcY);
        float ty = meanDstY - (beta * meanSrcX + alpha * meanSrcY);

        return new float[2, 3]
        {
            { alpha, -beta, tx },
            { beta,  alpha, ty }
        };
    }

    /// <summary>
    /// Warps srcBitmap using 5 keypoints to standard ArcFace 112x112 target bitmap using SkiaSharp.
    /// </summary>
    public static SKBitmap AlignFace(SKBitmap srcBitmap, Point2f[] kps)
    {
        var M = EstimateSimilarityTransform(kps, RefPoints);

        var alignedBitmap = new SKBitmap(112, 112, SKColorType.Rgba8888, SKAlphaType.Premul);
        using var canvas = new SKCanvas(alignedBitmap);
        canvas.Clear(SKColors.Black);

        var matrix = new SKMatrix
        {
            ScaleX = M[0, 0],
            SkewX = M[0, 1],
            TransX = M[0, 2],
            SkewY = M[1, 0],
            ScaleY = M[1, 1],
            TransY = M[1, 2],
            Persp0 = 0,
            Persp1 = 0,
            Persp2 = 1
        };

        canvas.SetMatrix(matrix);

        using var paint = new SKPaint
        {
            IsAntialias = true,
            FilterQuality = SKFilterQuality.High
        };

        canvas.DrawBitmap(srcBitmap, 0, 0, paint);
        canvas.Flush();

        return alignedBitmap;
    }
}
