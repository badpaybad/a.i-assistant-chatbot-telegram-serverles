namespace Core.Infra.Auth.Models;

public static class AuthConstants
{
    public const string AdminClaim = "be.admin";
    public const string AdminRole = "Admin";
    
    public const string RoleClaim = "role";
    public const string PermissionClaim = "claims";
    public const string UserIdClaim = "userId";
    public const string NameClaim = "name";

    public const string PolicyPrefix = "AppAuthorize";

    public const string SsoSessionScheme = "SsoSession";
}
