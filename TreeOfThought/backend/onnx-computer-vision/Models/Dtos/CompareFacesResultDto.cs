namespace Core.Infra.OnnxComputerVision.Models.Dtos;

public class CompareFacesResultDto
{
    public bool Success { get; set; }
    public float Similarity { get; set; }
    public bool IsSamePerson { get; set; }
    public float? Threshold { get; set; } = 0.4f;
    public FaceInfoDto? Face1 { get; set; }
    public FaceInfoDto? Face2 { get; set; }
    public string? Message { get; set; }
}

public class CompareEmbeddingsRequestDto
{
    public float[] Vector1 { get; set; } = System.Array.Empty<float>();
    public float[] Vector2 { get; set; } = System.Array.Empty<float>();
    public float? Threshold { get; set; } = 0.4f;
}
