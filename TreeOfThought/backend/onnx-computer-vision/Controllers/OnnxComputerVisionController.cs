using Core.Infra.Auth.Attributes;
using Core.Infra.Base.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SkiaSharp;
using Core.Infra.OnnxComputerVision.Models;
using Core.Infra.OnnxComputerVision.Models.Dtos;
using Core.Infra.OnnxComputerVision.Services;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Infra.OnnxComputerVision.Controllers;

[ApiController]
[Route("api/onnx-cv")]
// [AppAuthorize]
[AllowAnonymous]
public class OnnxComputerVisionController : BaseController
{
    private readonly IInsightFaceSkiaService _insightFaceService;
    private readonly ILogger<OnnxComputerVisionController> _logger;

    public OnnxComputerVisionController(IInsightFaceSkiaService insightFaceService, ILogger<OnnxComputerVisionController> logger)
    {
        _insightFaceService = insightFaceService;
        _logger = logger;
    }

    /// <summary>
    /// Phát hiện các khuôn mặt trong ảnh, trả về tọa độ Bbox, 5 keypoints và 106 landmarks.
    /// </summary>
    [HttpPost("detect-face")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> DetectFace([FromForm] DetectFaceFormRequest request)
    {
        var image = request.Image;
        float scoreThreshold = request.ScoreThreshold ?? 0.5f;

        if (image == null || image.Length == 0)
            return BadRequest(new FaceDetectionResultDto { Success = false, Message = "Tệp ảnh không hợp lệ." });

        using var ms = new MemoryStream();
        await image.CopyToAsync(ms);
        ms.Position = 0;

        using var bitmap = SKBitmap.Decode(ms);
        if (bitmap == null)
            return BadRequest(new FaceDetectionResultDto { Success = false, Message = "Không thể giải mã tệp ảnh." });

        var faces = _insightFaceService.DetectFace(bitmap, scoreThreshold);

        var faceDtos = faces.Select(f => new FaceInfoDto
        {
            Bbox = f.Bbox,
            Score = f.Score,
            Kps = f.Kps,
            Landmark106Count = f.Landmark106.Length,
            Landmark106 = f.Landmark106
        }).ToList();

        return Ok(new FaceDetectionResultDto
        {
            Success = true,
            TotalFaces = faceDtos.Count,
            Faces = faceDtos,
            Message = faceDtos.Count > 0 ? $"Phát hiện {faceDtos.Count} khuôn mặt." : "Không tìm thấy khuôn mặt nào."
        });
    }

    /// <summary>
    /// Trích xuất vector đặc trưng 512 chiều (L2 Normalized) của khuôn mặt tốt nhất trong ảnh.
    /// </summary>
    [HttpPost("extract-embedding")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> ExtractEmbedding([FromForm] ExtractEmbeddingFormRequest request)
    {
        var image = request.Image;

        if (image == null || image.Length == 0)
            return BadRequest(new FaceEmbeddingResultDto { Success = false, Message = "Tệp ảnh không hợp lệ." });

        using var ms = new MemoryStream();
        await image.CopyToAsync(ms);
        ms.Position = 0;

        using var bitmap = SKBitmap.Decode(ms);
        if (bitmap == null)
            return BadRequest(new FaceEmbeddingResultDto { Success = false, Message = "Không thể giải mã tệp ảnh." });

        var faces = _insightFaceService.DetectFace(bitmap);
        if (!faces.Any())
        {
            return Ok(new FaceEmbeddingResultDto
            {
                Success = true,
                FaceFound = false,
                Message = "Không phát hiện khuôn mặt nào trong ảnh."
            });
        }

        var topFace = faces.OrderByDescending(f => f.Score).First();
        var embedding = _insightFaceService.VectorFace(bitmap, topFace);

        var faceDto = new FaceInfoDto
        {
            Bbox = topFace.Bbox,
            Score = topFace.Score,
            Kps = topFace.Kps,
            Landmark106Count = topFace.Landmark106.Length
        };

        return Ok(new FaceEmbeddingResultDto
        {
            Success = true,
            FaceFound = true,
            FaceInfo = faceDto,
            EmbeddingDimension = embedding.Length,
            Embedding = embedding,
            Message = "Trích xuất vector embedding thành công."
        });
    }

    /// <summary>
    /// So sánh 2 bức ảnh, phát hiện khuôn mặt và tính điểm tương đồng Cosine Similarity.
    /// </summary>
    [HttpPost("compare-faces")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> CompareFaces([FromForm] CompareFacesFormRequest request)
    {
        var image1 = request.Image1;
        var image2 = request.Image2;
        float threshold = request.Threshold ?? 0.4f;

        if (image1 == null || image1.Length == 0 || image2 == null || image2.Length == 0)
            return BadRequest(new CompareFacesResultDto { Success = false, Message = "Tệp ảnh không hợp lệ." });

        using var ms1 = new MemoryStream();
        await image1.CopyToAsync(ms1);
        ms1.Position = 0;
        using var bitmap1 = SKBitmap.Decode(ms1);

        using var ms2 = new MemoryStream();
        await image2.CopyToAsync(ms2);
        ms2.Position = 0;
        using var bitmap2 = SKBitmap.Decode(ms2);

        if (bitmap1 == null || bitmap2 == null)
            return BadRequest(new CompareFacesResultDto { Success = false, Message = "Không thể giải mã một trong hai ảnh." });

        var res = _insightFaceService.CompareFaces(bitmap1, bitmap2, threshold);

        if (res.Similarity == -1.0)
            return Ok(new CompareFacesResultDto { Success = true, Similarity = -1.0, IsSamePerson = false, Message = "Không tìm thấy khuôn mặt ở ảnh 1." });
        if (res.Similarity == -2.0)
            return Ok(new CompareFacesResultDto { Success = true, Similarity = -2.0, IsSamePerson = false, Message = "Không tìm thấy khuôn mặt ở ảnh 2." });

        bool isSame = res.Similarity >= threshold;

        return Ok(new CompareFacesResultDto
        {
            Success = true,
            Similarity = res.Similarity,
            IsSamePerson = isSame,
            Threshold = threshold,
            Face1 = res.f1 != null ? new FaceInfoDto { Bbox = res.f1.Bbox, Score = res.f1.Score, Kps = res.f1.Kps } : null,
            Face2 = res.f2 != null ? new FaceInfoDto { Bbox = res.f2.Bbox, Score = res.f2.Score, Kps = res.f2.Kps } : null,
            Message = isSame ? "Hai khuôn mặt thuộc cùng một người." : "Hai khuôn mặt thuộc hai người khác nhau."
        });
    }

    /// <summary>
    /// So sánh trực tiếp 2 vector embedding 512 chiều.
    /// </summary>
    [HttpPost("compare-embeddings")]
    public IActionResult CompareEmbeddings([FromBody] CompareEmbeddingsRequestDto request)
    {
        if (request.Vector1 == null || request.Vector2 == null || request.Vector1.Length == 0 || request.Vector2.Length == 0)
            return BadRequest(new CompareFacesResultDto { Success = false, Message = "Vector không hợp lệ." });

        double sim = _insightFaceService.CompareVector(request.Vector1, request.Vector2);
        float threshold = request.Threshold ?? 0.4f;
        bool isSame = sim >= threshold;

        return Ok(new CompareFacesResultDto
        {
            Success = true,
            Similarity = sim,
            IsSamePerson = isSame,
            Threshold = threshold,
            Message = isSame ? "Hai vector thuộc cùng một người." : "Hai vector thuộc hai người khác nhau."
        });
    }
}
