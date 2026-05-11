using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Security.Claims;

namespace Core.Infra.Auth.Attributes;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class AppAuthorizeAttribute : Attribute, IAuthorizationFilter
{
    private readonly string[] _permissions;
    public string? Roles { get; set; }

    public AppAuthorizeAttribute(params string[] permissions)
    {
        _permissions = permissions;
    }

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var user = context.HttpContext.User;

        // 1. Check if authenticated
        if (!user.Identity?.IsAuthenticated ?? true)
        {
            context.Result = new UnauthorizedResult();
            return;
        }

        bool isAuthorized = false;

        // 2. Check Roles if any specified
        if (!string.IsNullOrEmpty(Roles))
        {
            var requiredRoles = Roles.Split(',').Select(r => r.Trim());
            if (requiredRoles.Any(r => user.IsInRole(r)))
            {
                isAuthorized = true;
            }
        }

        // 3. Check permissions if any specified
        if (!isAuthorized && _permissions.Length > 0)
        {
            var userPermissions = user.FindAll("permissions").Select(c => c.Value).ToList();
            if (_permissions.Any(p => userPermissions.Contains(p)))
            {
                isAuthorized = true;
            }
        }

        // 4. Final check (if neither role nor permission specified, then just being authenticated is enough)
        if (string.IsNullOrEmpty(Roles) && _permissions.Length == 0)
        {
            isAuthorized = true;
        }

        if (!isAuthorized)
        {
            context.Result = new ForbidResult();
        }
    }
}

