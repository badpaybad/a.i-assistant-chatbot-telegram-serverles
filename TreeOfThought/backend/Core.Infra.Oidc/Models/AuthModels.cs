using Microsoft.AspNetCore.Mvc;

namespace Core.Infra.Oidc.Models;

public class LoginRequest 
{ 
    public string Username { get; set; } = ""; 
    public string Password { get; set; } = ""; 
    public string? FcmToken { get; set; }
    public string? DeviceId { get; set; }
    public string? AppType { get; set; }
}

public class SendNotificationRequest
{
    public string FcmToken { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;
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
    [Microsoft.AspNetCore.Mvc.FromQuery(Name = "client_id")]
    public string? ClientId { get; set; }

    [Microsoft.AspNetCore.Mvc.FromQuery(Name = "redirect_uri")]
    public string? RedirectUri { get; set; }

    [Microsoft.AspNetCore.Mvc.FromQuery(Name = "response_type")]
    public string? ResponseType { get; set; }

    [Microsoft.AspNetCore.Mvc.FromQuery(Name = "scope")]
    public string? Scope { get; set; }

    [Microsoft.AspNetCore.Mvc.FromQuery(Name = "state")]
    public string? State { get; set; }

    [Microsoft.AspNetCore.Mvc.FromQuery(Name = "nonce")]
    public string? Nonce { get; set; }

    [Microsoft.AspNetCore.Mvc.FromQuery(Name = "code_challenge")]
    public string? CodeChallenge { get; set; }

    [Microsoft.AspNetCore.Mvc.FromQuery(Name = "code_challenge_method")]
    public string? CodeChallengeMethod { get; set; }
}

public class TokenRequest
{
    [Microsoft.AspNetCore.Mvc.FromForm(Name = "grant_type")]
    public string? GrantType { get; set; }

    [Microsoft.AspNetCore.Mvc.FromForm(Name = "code")]
    public string? Code { get; set; }

    [Microsoft.AspNetCore.Mvc.FromForm(Name = "redirect_uri")]
    public string? RedirectUri { get; set; }

    [Microsoft.AspNetCore.Mvc.FromForm(Name = "client_id")]
    public string? ClientId { get; set; }

    [Microsoft.AspNetCore.Mvc.FromForm(Name = "client_secret")]
    public string? ClientSecret { get; set; }

    [Microsoft.AspNetCore.Mvc.FromForm(Name = "code_verifier")]
    public string? CodeVerifier { get; set; }
}


