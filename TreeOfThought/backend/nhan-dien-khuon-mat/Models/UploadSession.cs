using System;
using System.Collections.Generic;

namespace Core.Infra.NhanDienKhuonMat.Models;

public class UploadSession
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public Guid UserId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string CreatedBy { get; set; } = string.Empty;

    // Navigation property
    public virtual ICollection<OriginalImage> OriginalImages { get; set; } = new List<OriginalImage>();
}
