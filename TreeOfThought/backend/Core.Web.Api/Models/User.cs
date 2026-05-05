namespace Core.Web.Api.Models;

public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Username { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public bool IsEmailVerified { get; set; }
    public string? VerificationCode { get; set; }
    public List<string> Claims { get; set; } = new();
    public string? SsoProvider { get; set; } // google, ms, facebook
    public string? SsoId { get; set; }
}
