using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Security.Claims;

namespace Core.Web.Api.Attributes;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class AppAuthorizeAttribute : Attribute, IAuthorizationFilter
{
    private readonly string[] _claims;

    public AppAuthorizeAttribute(params string[] claims)
    {
        _claims = claims;
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

        // 2. Check claims if any specified
        if (_claims.Length > 0)
        {
            var userClaims = user.FindAll("permissions").Select(c => c.Value).ToList();
            bool hasClaim = _claims.Any(c => userClaims.Contains(c));

            if (!hasClaim)
            {
                context.Result = new ForbidResult();
            }
        }
    }
}
