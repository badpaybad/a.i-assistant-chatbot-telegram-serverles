using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using System.Security.Claims;
using Core.Infra.Session.Models;
using Core.Infra.Auth.Attributes;
using Core.Infra.Auth.Models;
using Core.Infra.Session.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace Core.Infra.Auth.Handlers;

public class AppAuthorizationHandler : AuthorizationHandler<AppAuthorizationRequirement>
{
    private readonly IUserSessionService _sessionService;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IServiceProvider _serviceProvider;

    public AppAuthorizationHandler(
        IUserSessionService sessionService,
        IHttpContextAccessor httpContextAccessor,
        IServiceProvider serviceProvider)
    {
        _sessionService = sessionService;
        _httpContextAccessor = httpContextAccessor;
        _serviceProvider = serviceProvider;
    }

    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, AppAuthorizationRequirement requirement)
    {
        var httpContext = _httpContextAccessor.HttpContext;
        if (httpContext == null) return;

        var user = context.User;
        var request = httpContext.Request;

        // 1. Check if authenticated
        if (!user.Identity?.IsAuthenticated ?? true)
        {
            return;
        }

        // 2. Full Access for Admin role or admin claim
        if (user.Claims.Any(c => (c.Type == AuthConstants.RoleClaim && c.Value.Equals(AuthConstants.AdminRole, StringComparison.OrdinalIgnoreCase)) ||
                                 (c.Type == AuthConstants.PermissionClaim && c.Value.Equals(AuthConstants.AdminClaim, StringComparison.OrdinalIgnoreCase))))
        {
            context.Succeed(requirement);
            return;
        }

        // 2.1. Prioritized Role Check (Short-circuit)
        if (!string.IsNullOrEmpty(requirement.Roles))
        {
            var allowedRoles = requirement.Roles.Split(',');
            bool hasRequiredRole = allowedRoles.Any(role => user.IsInRole(role.Trim()));
            if (!hasRequiredRole)
            {
                return;
            }
        }

        // 2.2. Prioritized BasePolicy Check (Short-circuit)
        if (!string.IsNullOrEmpty(requirement.BasePolicy))
        {
            var authService = _serviceProvider.GetRequiredService<IAuthorizationService>();
            var result = await authService.AuthorizeAsync(user, requirement.BasePolicy);
            if (!result.Succeeded)
            {
                return;
            }
        }

        // Xác định ResourceType ưu tiên: Header > Attribute Property
        var finalResourceType = request.Headers["x-resource-type"].ToString();
        if (string.IsNullOrEmpty(finalResourceType))
            finalResourceType = requirement.ResourceType;

        bool isAuthorized = false;

        // 3. Check claims if any specified
        if (requirement.Claims.Length > 0)
        {
            var userId = user.FindFirst(AuthConstants.UserIdClaim)?.Value;
            var userRoles = user.FindAll(AuthConstants.RoleClaim).Select(c => c.Value).ToList();
            List<string> userClaims;

            if (userRoles.Any() && !string.IsNullOrEmpty(userId))
            {
                // Hybrid Mode: Roles detected, fetch granular claims from Redis
                userClaims = await _sessionService.GetUserClaimsAsync(Guid.Parse(userId)) ?? new List<string>();
            }
            else
            {
                // Stateless Mode: Read granular claims from JWT
                userClaims = user.FindAll(AuthConstants.PermissionClaim).Select(c => c.Value).ToList();
            }

            if (requirement.Mode == AuthMode.OR)
            {
                if (requirement.Claims.Any(p => userClaims.Contains(p)))
                {
                    isAuthorized = true;
                }
            }
            else // AND mode
            {
                if (requirement.Claims.All(p => userClaims.Contains(p)))
                {
                    isAuthorized = true;
                }
            }
        }

        // 4. Check ACL from Redis if Action specified
        if (!isAuthorized && requirement.Action != ResourceActions.None)
        {
            var userId = user.FindFirst(AuthConstants.UserIdClaim)?.Value;

            // Thứ tự ưu tiên lấy ResourceId: Header > Route > Query
            var resourceId = request.Headers["x-resource-id"].ToString();
            if (string.IsNullOrEmpty(resourceId))
                resourceId = httpContext.GetRouteData().Values["id"]?.ToString();
            if (string.IsNullOrEmpty(resourceId))
                resourceId = request.Query["id"].ToString();

            if (!string.IsNullOrEmpty(userId) && !string.IsNullOrEmpty(resourceId) && !string.IsNullOrEmpty(finalResourceType))
            {
                var userActionsMask = await _sessionService.GetUserAclMaskAsync(Guid.Parse(userId), finalResourceType, resourceId);

                if (userActionsMask > 0)
                {
                    if (requirement.Mode == AuthMode.OR)
                    {
                        isAuthorized = (userActionsMask & (int)requirement.Action) != 0;
                    }
                    else // AND mode
                    {
                        isAuthorized = (userActionsMask & (int)requirement.Action) == (int)requirement.Action;
                    }
                }
            }
        }

        // 5. Final check (if neither claim nor ACL specified, then just being authenticated is enough)
        if (requirement.Claims.Length == 0 && string.IsNullOrEmpty(finalResourceType))
        {
            isAuthorized = true;
        }

        if (isAuthorized)
        {
            context.Succeed(requirement);
        }
    }
}
