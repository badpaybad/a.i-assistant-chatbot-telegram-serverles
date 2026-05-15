using Core.Infra.Auth.Handlers;
using Core.Infra.Session.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Core.Infra.Auth.Extensions;

public static class AuthServiceExtensions
{
    public static IServiceCollection AddAppAuthorization(this IServiceCollection services, IConfiguration config)
    {
        // Include Session Infrastructure
        services.AddAppSession(config);

        services.AddSingleton<IAuthorizationPolicyProvider, AppAuthorizationPolicyProvider>();
        services.AddScoped<IAuthorizationHandler, AppAuthorizationHandler>();
        
        return services;
    }
}
