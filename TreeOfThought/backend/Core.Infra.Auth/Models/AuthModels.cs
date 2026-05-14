namespace Core.Infra.Auth.Models;

public class LoginRequest 
{ 
    public string Username { get; set; } = ""; 
    public string Password { get; set; } = ""; 
}

public class SignupRequest 
{ 
    public string Username { get; set; } = ""; 
    public string Password { get; set; } = ""; 
    public string DisplayName { get; set; } = ""; 
    public string Email { get; set; } = ""; 
}

public class SsoRequest 
{ 
    public string Provider { get; set; } = ""; 
    public string SsoId { get; set; } = ""; 
    public string Email { get; set; } = ""; 
    public string DisplayName { get; set; } = ""; 
    public string IdToken { get; set; } = ""; 
}

public class SyncClaimsRequest 
{ 
    public string Version { get; set; } = ""; 
    public List<string> Claims { get; set; } = new(); 
}

public class ChangePasswordRequest
{
    public string OldPassword { get; set; } = "";
    public string NewPassword { get; set; } = "";
    public string ConfirmPassword { get; set; } = "";
}

public class AuthorizeRequest
{
    public string? ClientId { get; set; }
    public string? RedirectUri { get; set; }
    public string? ResponseType { get; set; }
    public string? Scope { get; set; }
    public string? State { get; set; }
    public string? Nonce { get; set; }
}

public class TokenRequest
{
    public string? GrantType { get; set; }
    public string? Code { get; set; }
    public string? RedirectUri { get; set; }
    public string? ClientId { get; set; }
    public string? ClientSecret { get; set; }
}

public class AuthCodeData
{
    public Guid UserId { get; set; }
    public string ClientId { get; set; } = "";
    public string RedirectUri { get; set; } = "";
}
