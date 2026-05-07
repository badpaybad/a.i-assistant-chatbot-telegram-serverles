namespace Core.Web.Api.Models;

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

public class SyncPermissionsRequest 
{ 
    public string Version { get; set; } = ""; 
    public List<string> Permissions { get; set; } = new(); 
}
