using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;
using Core.Infra.Session.Models;
using Core.Infra.Auth.Models;

namespace Core.Infra.Auth.Handlers;

public class AppAuthorizationPolicyProvider : DefaultAuthorizationPolicyProvider
{
    public AppAuthorizationPolicyProvider(IOptions<AuthorizationOptions> options) : base(options)
    {
    }

    public override async Task<AuthorizationPolicy?> GetPolicyAsync(string policyName)
    {
        if (policyName.StartsWith(AuthConstants.PolicyPrefix, StringComparison.OrdinalIgnoreCase))
        {
            var parts = policyName.Split(':');
            if (parts.Length >= 7)
            {
                var mode = Enum.Parse<AuthMode>(parts[1]);
                var action = Enum.Parse<ResourceActions>(parts[2]);
                var resourceType = parts[3] == "null" ? null : parts[3];
                var roles = parts[4] == "null" ? null : parts[4];
                var basePolicy = parts[5] == "null" ? null : parts[5];
                var claims = parts[6] == "null" ? Array.Empty<string>() : parts[6].Split(',');

                var policy = new AuthorizationPolicyBuilder();
                policy.AddRequirements(new AppAuthorizationRequirement(claims, mode, resourceType, action, roles, basePolicy));
                return policy.Build();
            }
        }

        return await base.GetPolicyAsync(policyName);
    }
}
