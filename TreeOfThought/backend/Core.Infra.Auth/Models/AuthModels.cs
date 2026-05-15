using Microsoft.AspNetCore.Mvc;

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
    [FromQuery(Name = "client_id")]
    public string? ClientId { get; set; }

    [FromQuery(Name = "redirect_uri")]
    public string? RedirectUri { get; set; }

    [FromQuery(Name = "response_type")]
    public string? ResponseType { get; set; }

    [FromQuery(Name = "scope")]
    public string? Scope { get; set; }

    [FromQuery(Name = "state")]
    public string? State { get; set; }

    [FromQuery(Name = "nonce")]
    public string? Nonce { get; set; }
}

public class TokenRequest
{
    [FromForm(Name = "grant_type")]
    public string? GrantType { get; set; }

    [FromForm(Name = "code")]
    public string? Code { get; set; }

    [FromForm(Name = "redirect_uri")]
    public string? RedirectUri { get; set; }

    [FromForm(Name = "client_id")]
    public string? ClientId { get; set; }

    [FromForm(Name = "client_secret")]
    public string? ClientSecret { get; set; }
}

public class AuthCodeData
{
    public Guid UserId { get; set; }
    public string ClientId { get; set; } = "";
    public string RedirectUri { get; set; } = "";
}
