using System;
using Core.Infra.Base.Interfaces;

namespace Core.Infra.Oidc.Models;

public class UserFcmToken : IBaseTrackingEntity<Guid>
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public string FcmToken { get; set; } = string.Empty;
    public string DeviceId { get; set; } = string.Empty;
    public string AppType { get; set; } = string.Empty; // e.g. "admin", "mobi android", "reactjsatest"

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public string? CreatedBy { get; set; }
    public string? UpdatedBy { get; set; }
}
