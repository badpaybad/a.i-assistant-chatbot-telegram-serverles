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
#if DEBUG
        Microsoft.IdentityModel.Logging.IdentityModelEventSource.ShowPII = true;
#endif

        // Include Session Infrastructure
        services.AddAppSession(config);

        services.AddSingleton<IAuthorizationPolicyProvider, AppAuthorizationPolicyProvider>();
        services.AddScoped<IAuthorizationHandler, AppAuthorizationHandler>();

        services.AddSingleton<IJwtService, JwtService>();

        // Cấu hình Authentication dựa theo AuthMode được chọn
        if (authMode == AppAuthMode.JwtBearer)
        {
            var isOidc = authConfig.GetValue<bool>("Jwt:IsOidc");
            var validateLifetime = authConfig.GetValue<bool?>("Jwt:ValidateLifetime") ?? false;
            services.AddAuthentication(options =>
            {
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = context =>
                    {
                        Console.WriteLine($"[JWT AUTH ERROR] Authentication failed: {context.Exception?.Message}");
                        return System.Threading.Tasks.Task.CompletedTask;
                    },
                    OnTokenValidated = context =>
                    {
                        // Console.WriteLine("[JWT AUTH SUCCESS] Token validated successfully.");
                        return System.Threading.Tasks.Task.CompletedTask;
                    },
                    OnMessageReceived = context =>
                    {
                        var accessToken = context.Request.Query["access_token"];
                        if (!string.IsNullOrEmpty(accessToken))
                        {
                            context.Token = accessToken;
                        }
                        return System.Threading.Tasks.Task.CompletedTask;
                    }
                };

                if (isOidc)
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateIssuerSigningKey = true,
                        ValidateAudience = false,
                        ValidateLifetime = validateLifetime,
                        ValidIssuer = authConfig["Jwt:Issuer"]!,
                        ValidAudience = authConfig["Jwt:Audience"]!,
                        IssuerSigningKey = JwtService.GetJwks(authConfig["Jwt:RsaPrivateKey"]!, authConfig["Jwt:Kid"]!),
                        NameClaimType = AuthConstants.NameClaim,
                        RoleClaimType = AuthConstants.RoleClaim
                    };
                }
                else
                {
                    var requireHttpsMetadata = authConfig.GetValue<bool?>("Jwt:RequireHttpsMetadata");
                    // Detect if the authority is localhost/loopback (development env)
                    var authority = authConfig["Jwt:Authority"] ?? "http://localhost:5000";
                    var isLocalhost = false;
                    if (Uri.TryCreate(authority, UriKind.Absolute, out var uri))
                    {
                        isLocalhost = uri.IsLoopback || uri.Host.Equals("localhost", StringComparison.OrdinalIgnoreCase);
                    }

                    options.Authority = authority;
                    options.RequireHttpsMetadata = requireHttpsMetadata.HasValue ? requireHttpsMetadata.Value : !isLocalhost;
                    options.MapInboundClaims = false;
                    options.UseSecurityTokenValidators = false;


                    options.TokenValidationParameters.ValidateLifetime = validateLifetime;
                    options.TokenValidationParameters.ValidateAudience = false;
                    options.TokenValidationParameters.ValidateIssuer = true;
                    options.TokenValidationParameters.ValidateIssuerSigningKey = true;
                    options.TokenValidationParameters.NameClaimType = AuthConstants.NameClaim;
                    options.TokenValidationParameters.RoleClaimType = AuthConstants.RoleClaim;

                    Console.WriteLine($"[JWT AUTH] Relying on standard dynamic OIDC JWKS discovery from authority: {authority}");
                }
            });
        }
        // else if (authMode == AppAuthMode.Cookie)
        // {
        //     services.AddAuthentication(options =>
        //     {
        //         options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        //         options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        //     })
        //     .AddCookie(options =>
        //     {
        //         options.Cookie.Name = authConfig["Cookie:Name"] ?? "App_Auth_Session";
        //         options.Cookie.HttpOnly = true;
        //         options.Cookie.SameSite = SameSiteMode.Lax;
        //         options.Cookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;
        //         options.ExpireTimeSpan = TimeSpan.FromDays(7);
        //         options.LoginPath = authConfig["Cookie:LoginPath"] ?? "/Account/Login";
        //         options.AccessDeniedPath = authConfig["Cookie:AccessDeniedPath"] ?? "/Account/AccessDenied";
        //     });
        // }
        // Nếu authMode == AppAuthMode.None, chúng ta bỏ qua việc gọi AddAuthentication() ở đây.
        // Project gọi hàm này sẽ tự chịu trách nhiệm cấu hình Authentication của riêng nó.

        return services;
    }
}

