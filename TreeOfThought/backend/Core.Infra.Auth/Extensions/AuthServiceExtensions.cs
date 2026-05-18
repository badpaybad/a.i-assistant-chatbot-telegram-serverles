using Core.Infra.Auth.Handlers;
using Core.Infra.Auth.Interfaces;
using Core.Infra.Auth.Services;
using Core.Infra.Session.Extensions;
using Core.Infra.Session.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Core.Infra.Auth.Extensions;

public static class AuthServiceExtensions
{
    public static IServiceCollection AddAppAuthorization(this IServiceCollection services, IConfiguration config)
    {
        var authConfig = config.GetSection("Auth");

        var sessionConfig = config["Session"]!;
        // 1. HttpContextAccessor
        services.AddHttpContextAccessor();

        // Include Session Infrastructure
        services.AddAppSession(config);

        services.AddSingleton<IAuthorizationPolicyProvider, AppAuthorizationPolicyProvider>();
        services.AddScoped<IAuthorizationHandler, AppAuthorizationHandler>();

        services.AddSingleton<IJwtService, JwtService>();

        // Cấu hình Authentication mặc định sử dụng JWT Bearer
        var isOidc = authConfig.GetValue<bool>("Jwt:IsOidc");
        services.AddAuthentication(options =>
        {
            options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            if (isOidc)
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = false,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = authConfig["Jwt:Issuer"]!,
                    ValidAudience = authConfig["Jwt:Audience"]!,
                    IssuerSigningKey = JwtService.GetJwks(authConfig["Jwt:RsaPrivateKey"]!, authConfig["Jwt:Kid"]!),
                    NameClaimType = AuthConstants.NameClaim,
                    RoleClaimType = AuthConstants.RoleClaim
                };
            }
            else
            {
                options.Authority = authConfig["Jwt:Authority"]!;
                options.RequireHttpsMetadata = false;
                options.MapInboundClaims = false;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateAudience = false,
                    ValidateIssuer = false,
                    NameClaimType = AuthConstants.NameClaim,
                    RoleClaimType = AuthConstants.RoleClaim
                };
            }
        });

        return services;
    }
}
