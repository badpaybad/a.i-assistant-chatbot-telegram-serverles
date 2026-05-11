using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Security.Claims;
using Core.Infra.Auth.Models;

namespace Core.Infra.Auth.Attributes;

public enum AuthMode { OR, AND }


[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class AppAuthorizeAttribute : Attribute, IAuthorizationFilter
{
    private readonly string[] _permissions;
    public string? Roles { get; set; }
    public AuthMode Mode { get; set; } = AuthMode.OR;
    public string? ResourceType { get; set; }
    public ResourceActions Action { get; set; } // Sử dụng Enum Flags

    public AppAuthorizeAttribute(params string[] permissions)
    {
        _permissions = permissions;
    }

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var user = context.HttpContext.User;
        var request = context.HttpContext.Request;

        // 1. Check if authenticated
        if (!user.Identity?.IsAuthenticated ?? true)
        {
            context.Result = new UnauthorizedResult();
            return;
        }

        // Xác định ResourceType ưu tiên: Header > Attribute Property
        var finalResourceType = request.Headers["x-resource-type"].ToString();
        if (string.IsNullOrEmpty(finalResourceType))
            finalResourceType = ResourceType;

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
            if (Mode == AuthMode.OR)
            {
                if (_permissions.Any(p => userPermissions.Contains(p)))
                {
                    isAuthorized = true;
                }
            }
            else // AND mode
            {
                if (_permissions.All(p => userPermissions.Contains(p)))
                {
                    isAuthorized = true;
                }
            }
        }

        // 4. Check ACL from Redis if Action specified
        if (!isAuthorized && Action != ResourceActions.None)
        {
            var userId = user.FindFirst("userId")?.Value;

            // Thứ tự ưu tiên lấy ResourceId: Header > Route > Query
            var resourceId = request.Headers["x-resource-id"].ToString();
            if (string.IsNullOrEmpty(resourceId)) 
                resourceId = context.RouteData.Values["id"]?.ToString();
            if (string.IsNullOrEmpty(resourceId))
                resourceId = request.Query["id"].ToString();

            if (!string.IsNullOrEmpty(userId) && !string.IsNullOrEmpty(resourceId) && !string.IsNullOrEmpty(finalResourceType))
            {
                var cacheService = context.HttpContext.RequestServices.GetService(typeof(Core.Infra.Base.Interfaces.ICacheService)) as Core.Infra.Base.Interfaces.ICacheService;
                if (cacheService != null)
                {
                    // Key format: acl:{userId}:{resourceType}:{resourceId}
                    var cacheKey = $"acl:{userId}:{finalResourceType}:{resourceId}";
                    var userActionsMask = cacheService.GetAsync<int>(cacheKey).GetAwaiter().GetResult();
                    
                    if (userActionsMask > 0)
                    {
                        if (Mode == AuthMode.OR)
                        {
                            isAuthorized = (userActionsMask & (int)Action) != 0;
                        }
                        else // AND mode
                        {
                            isAuthorized = (userActionsMask & (int)Action) == (int)Action;
                        }
                    }
                }
            }
        }

        // 5. Final check (if neither role nor permission nor ACL specified, then just being authenticated is enough)
        if (string.IsNullOrEmpty(Roles) && _permissions.Length == 0 && string.IsNullOrEmpty(finalResourceType))
        {
            isAuthorized = true;
        }

        if (!isAuthorized)
        {
            context.Result = new ForbidResult();
        }
    }
}


