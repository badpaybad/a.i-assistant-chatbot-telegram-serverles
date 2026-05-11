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
    private readonly string[] _claims;
    public AuthMode Mode { get; set; } = AuthMode.OR;
    public string? ResourceType { get; set; }
    public ResourceActions Action { get; set; } // Sử dụng Enum Flags

    public AppAuthorizeAttribute(params string[] claims)
    {
        _claims = claims;
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


        // 3. Check claims if any specified
        if (!isAuthorized && _claims.Length > 0)
        {
            var userId = user.FindFirst("userId")?.Value;
            var userRoles = user.FindAll(ClaimTypes.Role).Select(c => c.Value).ToList();
            List<string> userClaims;

            if (userRoles.Any() && !string.IsNullOrEmpty(userId))
            {
                // Hybrid Mode: Roles detected, fetch granular claims from Redis
                var cacheService = context.HttpContext.RequestServices.GetService(typeof(Core.Infra.Base.Interfaces.ICacheService)) as Core.Infra.Base.Interfaces.ICacheService;
                if (cacheService != null)
                {
                    var cacheKey = $"claims:{userId}";
                    userClaims = cacheService.GetAsync<List<string>>(cacheKey).GetAwaiter().GetResult() ?? new List<string>();
                }
                else
                {
                    userClaims = new List<string>();
                }
            }
            else
            {
                // Stateless Mode: Read granular claims from JWT
                userClaims = user.FindAll("claims").Select(c => c.Value).ToList();
            }

            if (Mode == AuthMode.OR)
            {
                if (_claims.Any(p => userClaims.Contains(p)))
                {
                    isAuthorized = true;
                }
            }
            else // AND mode
            {
                if (_claims.All(p => userClaims.Contains(p)))
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

        // 5. Final check (if neither claim nor ACL specified, then just being authenticated is enough)
        if (_claims.Length == 0 && string.IsNullOrEmpty(finalResourceType))
        {
            isAuthorized = true;
        }

        if (!isAuthorized)
        {
            context.Result = new ForbidResult();
        }
    }
}


