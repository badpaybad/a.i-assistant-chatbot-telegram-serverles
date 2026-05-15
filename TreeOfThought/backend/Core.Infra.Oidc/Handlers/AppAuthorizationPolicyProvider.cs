using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;
using Core.Infra.Oidc.Models;
using Core.Infra.Oidc.Attributes;

namespace Core.Infra.Oidc.Handlers;

public class AppAuthorizationPolicyProvider : DefaultAuthorizationPolicyProvider
{
    private readonly AuthorizationOptions _options;

    public AppAuthorizationPolicyProvider(IOptions<AuthorizationOptions> options) : base(options)
    {
        _options = options.Value;
    }

    public override async Task<AuthorizationPolicy?> GetPolicyAsync(string policyName)
    {
        // Kiểm tra xem policyName có bắt đầu bằng tiền tố của chúng ta không
        if (policyName.StartsWith(AuthConstants.PolicyPrefix, StringComparison.OrdinalIgnoreCase))
        {
            var parts = policyName.Split(':');
            if (parts.Length >= 7)
            {
                // Format: {PolicyPrefix}:Mode:Action:ResourceType:Roles:BasePolicy:Claims
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
