using System;

namespace Core.Infra.NhanDienKhuonMat.Models;

public class UserFaceDefinition
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public Guid OriginalImageId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
