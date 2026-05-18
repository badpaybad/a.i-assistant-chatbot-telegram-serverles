using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Reflection;
using System.Security.Cryptography;
using System.Linq;

using Core.Infra.Oidc.Contexts;
using Core.Infra.Auth.Handlers;
using Core.Infra.Auth.Extensions;
using Core.Infra.Session.Models;
using Core.Infra.Oidc.Repositories;
using Core.Infra.Oidc.Services;
using Core.Infra.Data.Contexts;
using Core.Infra.Oidc.Models;
using Core.Infra.Auth.Services;

namespace Core.Infra.Oidc.Extensions;

public static class OidcServiceExtensions
{
    public static IMvcBuilder AddOidcControllers(this IMvcBuilder mvcBuilder)
    {
        return mvcBuilder.AddApplicationPart(typeof(OidcServiceExtensions).Assembly);
    }

    public static IServiceCollection AddAppOidc(this IServiceCollection services, IConfiguration config, Dictionary<string, Action<AuthorizationPolicyBuilder>>? configurePolicyAdditional = null)
    {
        var oidcConfig = config.GetSection("Oidc");
        var authConfig = config.GetSection("Auth");
        var requireNonce = oidcConfig.GetValue<bool>("RequireNonce")!;
        // 0. Include Authorization Infrastructure (which includes Session)
        services.AddAppAuthorization(config, Auth.Models.AppAuthMode.JwtBearer);

        // --- CORS Configuration ---
        services.AddCors(options =>
        {
            options.AddPolicy("AllowAll", policy =>
            {
                policy.SetIsOriginAllowed(_ => true) // Allow all origins with credentials
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials();
            });
        });

        // 1. HttpContextAccessor
        services.AddHttpContextAccessor();

        // 2. Authentication (JWT Bearer is configured as base in AddAppAuthorization)
        // Add project-specific Cookie Scheme to the existing AuthenticationBuilder
        services.AddAuthentication()
            .AddCookie(AuthConstants.SsoSessionScheme, options =>
            {
                options.Cookie.Name = oidcConfig["Cookies:SessionName"];
                options.Cookie.HttpOnly = true;
                options.Cookie.SameSite = Microsoft.AspNetCore.Http.SameSiteMode.Lax;
                options.Cookie.SecurePolicy = Microsoft.AspNetCore.Http.CookieSecurePolicy.SameAsRequest;
                options.ExpireTimeSpan = TimeSpan.FromDays(7);
                options.LoginPath = oidcConfig["Cookies:LoginPath"]; // Redirect to authorize if cookie missing
            });

        // 3. Authorization (Additional Policies)
        services.AddAuthorization(options =>
        {
            if (configurePolicyAdditional != null)
            {
                foreach (var policy in configurePolicyAdditional)
                {
                    options.AddPolicy(policy.Key, policy.Value);
                }
            }
        });

        // 4. Database & Auth Services
        var pgConn = oidcConfig["PostgreSql"]!;
        services.AddScoped<AuthDbContext>(sp => new AuthDbContext(pgConn, BaseDbContext.DbProviderType.PostgreSql));
        services.AddScoped<IAuthRepository, AuthRepository>();

        services.AddScoped<AuthService>();
        services.AddScoped<ClaimScannerService>();

        return services;
    }


    public static async Task UseAppAuth(this IApplicationBuilder app, IConfiguration config, Assembly[]? additionalAssembliesToScan = null)
    {
        var oidcConfig = config.GetSection("Oidc");

        using (var scope = app.ApplicationServices.CreateScope())
        {
            var services = scope.ServiceProvider;
            try
            {
                // 1. Initialize Auth Database
                var authRepo = services.GetRequiredService<IAuthRepository>();
                await authRepo.EnsureTablesCreatedAsync();
                await authRepo.EnsureAdminExistsAsync(
                    oidcConfig["Admin:Username"]!,
                    oidcConfig["Admin:Password"]!,
                    oidcConfig["Admin:Email"]!
                );

                // 2. Scan and Sync Claims from [AppAuthorize] attributes
                var scanner = services.GetRequiredService<ClaimScannerService>();
                var authService = services.GetRequiredService<AuthService>();

                var allScannedClaims = new HashSet<string>();


                if (additionalAssembliesToScan != null)
                {
                    foreach (var assembly in additionalAssembliesToScan)
                    {
                        foreach (var c in scanner.GetClaimsFromAssembly(assembly))
                            allScannedClaims.Add(c);
                    }
                }

                if (allScannedClaims.Any())
                {
                    await authService.UpsertClaimsAsync(allScannedClaims, "Attribute Scanner", isBeSource: true);
                }
            }
            catch (Exception ex)
            {
                var logger = services.GetService<ILogger<AuthService>>();
                if (logger != null) logger.LogError(ex, "Error during Auth initialization");
                else Console.WriteLine($"[AUTH INIT ERROR] {ex.Message}");
            }
        }
    }


}
