using Core.Infra.Auth.Handlers;
using Core.Infra.Auth.Interfaces;
using Core.Infra.Auth.Models;
using Core.Infra.Auth.Services;
using Core.Infra.Session.Extensions;
using Core.Infra.Session.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;

namespace Core.Infra.Auth.Extensions;

public static class AuthServiceExtensions
{
    public static IServiceCollection AddAppAuthorization(this IServiceCollection services, IConfiguration config, AppAuthMode authMode = AppAuthMode.JwtBearer)
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

        // Cấu hình Authentication dựa theo AuthMode được chọn
        if (authMode == AppAuthMode.JwtBearer)
        {
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
        }
        else if (authMode == AppAuthMode.Cookie)
        {
            services.AddAuthentication(options =>
            {
                options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            })
            .AddCookie(options =>
            {
                options.Cookie.Name = authConfig["Cookie:Name"] ?? "App_Auth_Session";
                options.Cookie.HttpOnly = true;
                options.Cookie.SameSite = SameSiteMode.Lax;
                options.Cookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;
                options.ExpireTimeSpan = TimeSpan.FromDays(7);
                options.LoginPath = authConfig["Cookie:LoginPath"] ?? "/Account/Login";
                options.AccessDeniedPath = authConfig["Cookie:AccessDeniedPath"] ?? "/Account/AccessDenied";
            });
        }
        // Nếu authMode == AppAuthMode.None, chúng ta bỏ qua việc gọi AddAuthentication() ở đây.
        // Project gọi hàm này sẽ tự chịu trách nhiệm cấu hình Authentication của riêng nó.

        return services;
    }
}
