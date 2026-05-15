using Microsoft.AspNetCore.Authorization;
using Core.Infra.Session.Models;

namespace Core.Infra.Auth.Models;

public class AppAuthorizationRequirement : IAuthorizationRequirement
{
    public string[] Claims { get; }
    public AuthMode Mode { get; }
    public string? ResourceType { get; }
    public ResourceActions Action { get; }
    public string? Roles { get; }
    public string? BasePolicy { get; }

    public AppAuthorizationRequirement(string[] claims, AuthMode mode, string? resourceType, ResourceActions action, string? roles = null, string? basePolicy = null)
    {
        Claims = claims;
        Mode = mode;
        ResourceType = resourceType;
        Action = action;
        Roles = roles;
        BasePolicy = basePolicy;
    }
}
