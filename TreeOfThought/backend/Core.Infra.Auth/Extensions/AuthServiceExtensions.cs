using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Core.Infra.Auth.Contexts;
using Core.Infra.Auth.Handlers;
using Core.Infra.Auth.Repositories;
using Core.Infra.Auth.Services;
using Core.Infra.Data.Contexts;

namespace Core.Infra.Auth.Extensions;

public static class AuthServiceExtensions
{
    public static IServiceCollection AddAppAuth(this IServiceCollection services, IConfiguration config, Dictionary<string, Action<AuthorizationPolicyBuilder>> configurePolicyAdditional = null)
    {
        // 1. HttpContextAccessor
        services.AddHttpContextAccessor();

        // 2. Authentication
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = false,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = config["Jwt:Issuer"],
                    ValidAudience = config["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Secret"]!))
                };
            });

        // 3. Authorization (Dynamic Policy Provider & Custom Handler)
        services.AddSingleton<IAuthorizationPolicyProvider, AppAuthorizationPolicyProvider>();
        services.AddScoped<IAuthorizationHandler, AppAuthorizationHandler>();
        services.AddAuthorization(options =>
        {
            // // Thêm Policy "dunp" cho phép user "dunp" pass mọi thứ
            // options.AddPolicy("dunp", policy => 
            //     policy.RequireClaim("preferred_username", "dunp"));

            if (configurePolicyAdditional != null)
            {
                foreach (var policy in configurePolicyAdditional)
                {
                    options.AddPolicy(policy.Key, policy.Value);
                }
            }
        });

        // 4. Database & Auth Services
        var pgConn = config["Auth:PostgreSql"]!;
        services.AddScoped<AuthDbContext>(sp => new AuthDbContext(pgConn, BaseDbContext.DbProviderType.PostgreSql));
        services.AddScoped<IAuthRepository, AuthRepository>();
        
        // 5. Redis for Auth (Specific Service Inheritance)
        var redisConn = config["Auth:Redis"]!;
        services.AddSingleton<AuthRedisService>(sp => 
            new AuthRedisService(redisConn, sp.GetRequiredService<ILogger<AuthRedisService>>()));
        
        services.AddSingleton<Core.Infra.Base.Interfaces.ICacheService>(sp => 
            sp.GetRequiredService<AuthRedisService>());

        services.AddScoped<AuthService>();

        return services;
    }

    public static IMvcBuilder AddAuthControllers(this IMvcBuilder mvcBuilder)
    {
        return mvcBuilder.AddApplicationPart(typeof(Core.Infra.Auth.Controllers.AuthController).Assembly);
    }
}
