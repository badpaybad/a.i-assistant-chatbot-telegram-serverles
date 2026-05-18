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
                    
                    options.TokenValidationParameters.ValidateAudience = false;
                    options.TokenValidationParameters.ValidateIssuer = false;
                    options.TokenValidationParameters.ValidateIssuerSigningKey = true;
                    options.TokenValidationParameters.NameClaimType = AuthConstants.NameClaim;
                    options.TokenValidationParameters.RoleClaimType = AuthConstants.RoleClaim;
                    
                    options.TokenValidationParameters.IssuerSigningKeyResolver = (token, securityToken, kid, validationParameters) =>
                    {
                        try
                        {
                            using var client = new HttpClient();
                            var authority = authConfig["Jwt:Authority"] ?? "http://localhost:5000";
                            var discoUrl = $"{authority.TrimEnd('/')}/.well-known/openid-configuration";
                            
                            var discoJson = client.GetStringAsync(discoUrl).GetAwaiter().GetResult();
                            var openIdConfig = Microsoft.IdentityModel.Protocols.OpenIdConnect.OpenIdConnectConfiguration.Create(discoJson);
                            
                            var jwksUrl = openIdConfig.JwksUri;
                            if (string.IsNullOrEmpty(jwksUrl))
                            {
                                jwksUrl = $"{authority.TrimEnd('/')}/api/auth/jwks";
                            }
                            
                            var jwksJson = client.GetStringAsync(jwksUrl).GetAwaiter().GetResult();
                            var jwks = new JsonWebKeySet(jwksJson);
                            
                            Console.WriteLine($"[JWT AUTH RESOLVER] Dynamically fetched OIDC keys from {jwksUrl}. Found {jwks.Keys.Count} keys.");
                            return jwks.Keys;
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine($"[JWT AUTH ERROR] Failed to fetch OIDC signing keys dynamically: {ex.Message}");
                        }
                        return Enumerable.Empty<SecurityKey>();
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
