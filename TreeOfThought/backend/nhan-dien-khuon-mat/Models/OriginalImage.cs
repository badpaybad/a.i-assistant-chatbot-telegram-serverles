using System;
using System.Collections.Generic;

namespace Core.Infra.NhanDienKhuonMat.Models;

public class OriginalImage
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string FileName { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public long Size { get; set; }
    public Guid UserId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string CreatedBy { get; set; } = string.Empty;

    // Navigation property
    public virtual ICollection<CroppedFace> CroppedFaces { get; set; } = new List<CroppedFace>();
}
