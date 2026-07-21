using System.Collections.Generic;

namespace Core.Infra.OnnxComputerVision.Models.Dtos;

public class FaceInfoDto
{
    public Rect Bbox { get; set; }
    public float Score { get; set; }
    public Point2f[] Kps { get; set; } = new Point2f[5];
    public int Landmark106Count { get; set; }
    public Point2f[]? Landmark106 { get; set; }
}

public class FaceDetectionResultDto
{
    public bool Success { get; set; }
    public int TotalFaces { get; set; }
    public List<FaceInfoDto> Faces { get; set; } = new();
    public string? Message { get; set; }
}
