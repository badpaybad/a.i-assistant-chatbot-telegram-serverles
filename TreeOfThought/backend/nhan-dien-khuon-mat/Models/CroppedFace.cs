using System;

namespace Core.Infra.NhanDienKhuonMat.Models;

public class CroppedFace
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid OriginalImageId { get; set; }
    public string Url { get; set; } = string.Empty;
    public string BoundingBox { get; set; } = string.Empty; // Store face coordinates in JSON format, e.g. {"x": 10, "y": 20, "w": 50, "h": 50}
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string CreatedBy { get; set; } = string.Empty;

    // Navigation property
    public virtual OriginalImage? OriginalImage { get; set; }
}
