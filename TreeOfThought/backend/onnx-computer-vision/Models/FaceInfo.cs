namespace Core.Infra.OnnxComputerVision.Models;

public class FaceInfo
{
    public Rect Bbox { get; set; }
    public Point2f[] Kps { get; set; } = new Point2f[5];
    public Point2f[] Landmark106 { get; set; } = new Point2f[106];
    public float[]? Embedding { get; set; }
    public float Score { get; set; }
}
