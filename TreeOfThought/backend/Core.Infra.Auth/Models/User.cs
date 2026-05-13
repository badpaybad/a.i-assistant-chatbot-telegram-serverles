using Core.Infra.Base.Interfaces;

namespace Core.Infra.Auth.Models;

public class User : IBaseTrackingEntity<Guid>
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Username { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public string? AvatarUrl { get; set; }
    
    // Primary/Verified email used for SSO
    public string Email { get; set; } = string.Empty;
    public bool IsEmailVerified { get; set; }
    public string? VerificationCode { get; set; }

    public string? SsoProvider { get; set; } // google, ms, facebook
    public string? SsoId { get; set; }
    
    public bool MustChangePassword { get; set; } = false;

    // IBaseTrackingEntity implementation
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public string? CreatedBy { get; set; }
    public string? UpdatedBy { get; set; }
}

