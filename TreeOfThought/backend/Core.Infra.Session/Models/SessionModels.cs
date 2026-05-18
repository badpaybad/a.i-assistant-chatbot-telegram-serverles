using System;
using System.Collections.Generic;

namespace Core.Infra.Session.Models;

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

public enum AuthMode { OR, AND }

[Flags]
public enum ResourceActions
{
    None = 0,
    Read = 1,      // 1 << 0
    Write = 2,     // 1 << 1
    Delete = 4,    // 1 << 2
    Share = 8,     // 1 << 3
    FullControl = 15 // 1|2|4|8
}

public class AuthCodeData
{
    public Guid UserId { get; set; }
    public string ClientId { get; set; } = string.Empty;
    public string RedirectUri { get; set; } = string.Empty;
    public string? Nonce { get; set; }
}
