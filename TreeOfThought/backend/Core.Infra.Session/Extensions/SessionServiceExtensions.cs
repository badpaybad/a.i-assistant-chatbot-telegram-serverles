using Core.Infra.Session.Interfaces;
using Core.Infra.Session.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Core.Infra.Session.Extensions;

public static class SessionServiceExtensions
{
    public static IServiceCollection AddAppSession(this IServiceCollection services, IConfiguration config)
    {
        var redisConn = config["Auth:Redis"] ?? config["Redis:ConnectionString"]!;
        
        services.AddSingleton<RedisSessionService>(sp =>
            new RedisSessionService(redisConn, sp.GetRequiredService<ILogger<RedisSessionService>>()));

        services.AddSingleton<IUserSessionService>(sp =>
            sp.GetRequiredService<RedisSessionService>());

        services.AddSingleton<IJwtService, JwtService>();

        return services;
    }
}
