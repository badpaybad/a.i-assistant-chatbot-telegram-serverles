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

namespace Core.Infra.Oidc.Extensions;

public static class AuthServiceExtensions
{
    public static IMvcBuilder AddOidcControllers(this IMvcBuilder mvcBuilder)
    {
        return mvcBuilder.AddApplicationPart(typeof(AuthServiceExtensions).Assembly);
    }

    public static IServiceCollection AddAppOidc(this IServiceCollection services, IConfiguration config, Dictionary<string, Action<AuthorizationPolicyBuilder>>? configurePolicyAdditional = null)
    {
        // 0. Include Authorization Infrastructure (which includes Session)
        services.AddAppAuthorization(config);

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

        // 2. Authentication
        var isOidc = config.GetValue<bool>("Jwt:IsOidc");
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
                        ValidIssuer = config["Jwt:Issuer"],
                        ValidAudience = config["Jwt:Audience"],
                        IssuerSigningKey = GetJwks(config.GetRsaPrivateKey(), config["Jwt:Kid"] ?? "tot-v1"),
                        NameClaimType = AuthConstants.NameClaim,
                        RoleClaimType = AuthConstants.RoleClaim
                    };
                }
                else
                {
                    options.Authority = config["Jwt:Authority"];
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

            })
            .AddCookie(AuthConstants.SsoSessionScheme, options =>
            {
                options.Cookie.Name = "TOT_SSO_SESSION";
                options.Cookie.HttpOnly = true;
                options.Cookie.SameSite = Microsoft.AspNetCore.Http.SameSiteMode.Lax;
                options.Cookie.SecurePolicy = Microsoft.AspNetCore.Http.CookieSecurePolicy.SameAsRequest;
                options.ExpireTimeSpan = TimeSpan.FromDays(7);
                options.LoginPath = "/api/auth/authorize"; // Redirect to authorize if cookie missing
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
        var pgConn = config["Auth:PostgreSql"]!;
        services.AddScoped<AuthDbContext>(sp => new AuthDbContext(pgConn, BaseDbContext.DbProviderType.PostgreSql));
        services.AddScoped<IAuthRepository, AuthRepository>();

        services.AddScoped<AuthService>();
        services.AddScoped<ClaimScannerService>();

        return services;
    }


    public static async Task UseAppAuth(this IApplicationBuilder app, IConfiguration config, Assembly[]? additionalAssembliesToScan = null)
    {
        using (var scope = app.ApplicationServices.CreateScope())
        {
            var services = scope.ServiceProvider;
            try
            {
                // 1. Initialize Auth Database
                var authRepo = services.GetRequiredService<IAuthRepository>();
                await authRepo.EnsureTablesCreatedAsync();
                await authRepo.EnsureAdminExistsAsync(
                    config["Auth:Admin:Username"] ?? "admin",
                    config["Auth:Admin:Password"] ?? "Admin@123",
                    config["Auth:Admin:Email"] ?? "admin@example.com"
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

    public static string NormalizePem(string pem)
    {
        if (string.IsNullOrWhiteSpace(pem)) return string.Empty;

        // Normalize and clean the PEM string
        // Handle literal \n and \r, remove non-ASCII chars, and normalize newlines
        var cleaned = pem
            .Replace("\\n", "\n")
            .Replace("\\r", "\r")
            .Trim();

        // Keep only valid ASCII and printable characters + newlines
        var sb = new StringBuilder();
        foreach (var c in cleaned)
        {
            if (c == '\n' || c == '\r' || (c >= 32 && c <= 126))
            {
                sb.Append(c);
            }
        }
        cleaned = sb.ToString().Replace("\r", ""); // Normalize to \n

        // Ensure headers and content are correctly separated
        var lines = cleaned.Split('\n', StringSplitOptions.RemoveEmptyEntries)
            .Select(l => l.Trim())
            .Where(l => !string.IsNullOrEmpty(l))
            .ToList();

        return string.Join("\n", lines);
    }

    public static string GetRsaPrivateKey(this IConfiguration config)
    {
        return NormalizePem(config["Jwt:RsaPrivateKey"] ?? "");
    }

    public static JsonWebKey GetJwks(string privateKeyPem, string kid = "tot-v1")
    {
        if (string.IsNullOrWhiteSpace(privateKeyPem))
        {
            throw new ArgumentException("Private key PEM is empty or null.", nameof(privateKeyPem));
        }

        using var rsa = RSA.Create();
        var cleanPem = NormalizePem(privateKeyPem);
        var lines = cleanPem.Split('\n').ToList();

        try
        {
            // Try standard way first
            rsa.ImportFromPem(cleanPem);
        }
        catch
        {
            try
            {
                // Fallback: Manually extract base64 data
                var base64Builder = new StringBuilder();
                foreach (var line in lines)
                {
                    if (line.StartsWith("-----")) continue;
                    base64Builder.Append(line);
                }

                var rawBase64 = base64Builder.ToString();
                // Filter to ONLY base64 alphabet characters, ignoring padding for now
                var base64NoPadding = new string(rawBase64.Where(c =>
                    (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9') ||
                    c == '+' || c == '/').ToArray());

                // Re-add padding correctly
                var finalBase64 = base64NoPadding;
                switch (finalBase64.Length % 4)
                {
                    case 2: finalBase64 += "=="; break;
                    case 3: finalBase64 += "="; break;
                }

                var bytes = Convert.FromBase64String(finalBase64);

                if (cleanPem.Contains("RSA PRIVATE KEY"))
                {
                    rsa.ImportRSAPrivateKey(bytes, out _);
                }
                else
                {
                    rsa.ImportPkcs8PrivateKey(bytes, out _);
                }
            }
            catch (Exception innerEx)
            {
                throw new ArgumentException($"Failed to import RSA key. Length: {cleanPem.Length}. " +
                    $"Error: {innerEx.Message}. PEM snippet: {(cleanPem.Length > 50 ? cleanPem.Substring(0, 50) : cleanPem)}", innerEx);
            }
        }

        var parameters = rsa.ExportParameters(false);
        var jwk = new JsonWebKey
        {
            Kty = "RSA",
            Use = "sig",
            Alg = "RS256",
            Kid = kid,
            N = Convert.ToBase64String(parameters.Modulus!).Replace('+', '-').Replace('/', '_').TrimEnd('='),
            E = Convert.ToBase64String(parameters.Exponent!).Replace('+', '-').Replace('/', '_').TrimEnd('=')
        };
        return jwk;
    }
}
