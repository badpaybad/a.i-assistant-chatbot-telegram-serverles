using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Core.Infra.Auth.Attributes;
using Core.Infra.Auth.Repositories;
using Core.Infra.Auth.Models;

namespace Core.Infra.Auth.Services;

public class ClaimScannerService
{
    private readonly AuthService _authService;

    public ClaimScannerService(AuthService authService)
    {
        _authService = authService;
    }

    public async Task ScanAndSyncClaimsAsync(Assembly assembly)
    {
        var claims = GetClaimsFromAssembly(assembly);
        if (claims.Any())
        {
            await _authService.UpsertClaimsAsync(claims, "Attribute Scanner");
        }
    }

    public HashSet<string> GetClaimsFromAssembly(Assembly assembly)
    {
        var claims = new HashSet<string>();
        var types = assembly.GetTypes()
            .Where(t => typeof(ControllerBase).IsAssignableFrom(t));

        foreach (var type in types)
        {
            var classAttributes = type.GetCustomAttributes<AppAuthorizeAttribute>(true);
            foreach (var attr in classAttributes) ExtractClaims(attr, claims);

            var methods = type.GetMethods(BindingFlags.Instance | BindingFlags.Public | BindingFlags.DeclaredOnly);
            foreach (var method in methods)
            {
                var methodAttributes = method.GetCustomAttributes<AppAuthorizeAttribute>(true);
                foreach (var attr in methodAttributes) ExtractClaims(attr, claims);
            }
        }
        return claims;
    }

    private void ExtractClaims(AppAuthorizeAttribute attr, HashSet<string> claims)
    {
        if (string.IsNullOrEmpty(attr.Policy)) return;

        // Format: AppAuthorize:Mode:Action:ResourceType:Roles:Policy:Claims
        var parts = attr.Policy.Split(':');
        if (parts.Length >= 7 && parts[6] != "null")
        {
            var claimsInAttr = parts[6].Split(',');
            foreach (var c in claimsInAttr)
            {
                if (!string.IsNullOrEmpty(c)) claims.Add(c);
            }
        }
    }
}
