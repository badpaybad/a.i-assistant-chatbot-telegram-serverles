namespace Core.Infra.OnnxComputerVision.Models.Dtos;

public class FaceEmbeddingResultDto
{
    public bool Success { get; set; }
    public bool FaceFound { get; set; }
    public FaceInfoDto? FaceInfo { get; set; }
    public int EmbeddingDimension { get; set; }
    public float[]? Embedding { get; set; }
    public string? Message { get; set; }
}
