namespace Core.Infra.OnnxComputerVision.Models;

public struct Point2f
{
    public float X { get; set; }
    public float Y { get; set; }

    public Point2f(float x, float y)
    {
        X = x;
        Y = y;
    }
}
