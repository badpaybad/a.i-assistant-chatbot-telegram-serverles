using Microsoft.AspNetCore.Http;

namespace Core.Infra.OnnxComputerVision.Models.Dtos;

public class DetectFaceFormRequest
{
    public IFormFile Image { get; set; } = null!;
    public float ScoreThreshold { get; set; } = 0.5f;
}

public class ExtractEmbeddingFormRequest
{
    public IFormFile Image { get; set; } = null!;
}

public class CompareFacesFormRequest
{
    public IFormFile Image1 { get; set; } = null!;
    public IFormFile Image2 { get; set; } = null!;
    public double Threshold { get; set; } = 0.4;
}
