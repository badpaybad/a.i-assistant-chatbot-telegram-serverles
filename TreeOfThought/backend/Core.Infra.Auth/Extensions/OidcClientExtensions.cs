using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Net.Http;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;

namespace Core.Infra.Auth.Extensions;

public static class OidcClientExtensions
{
    /// <summary>
    /// Configures the application as an OIDC Client following Keycloak/IdentityServer standards.
    /// Uses OpenIdConnect middleware and patches OnAuthorizationCodeReceived to ensure token endpoint reliability.
    /// </summary>
    public static IServiceCollection AddAppOidcClient(this IServiceCollection services, IConfiguration config)
    {
        var oidcConfig = config.GetSection("OidcClient");

        services.AddAuthentication(options =>
        {
            options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
        })
        .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
        {
            options.Cookie.Name = oidcConfig["CookieName"] ?? "App_Oidc_Auth";
            options.Cookie.SameSite = SameSiteMode.Lax;
            options.LoginPath = oidcConfig["LoginPath"] ?? "/Home/Login";
        })
        .AddOpenIdConnect(OpenIdConnectDefaults.AuthenticationScheme, options =>
        {
            options.Authority = oidcConfig["Authority"];
            options.ClientId = oidcConfig["ClientId"];
            options.ClientSecret = oidcConfig["ClientSecret"];
            options.ResponseType = "code"; // Authorization Code flow

            options.SaveTokens = true;
            options.GetClaimsFromUserInfoEndpoint = true;

            var isLocalhost = false;
            if (Uri.TryCreate(options.Authority, UriKind.Absolute, out var uri))
            {
                isLocalhost = uri.IsLoopback || uri.Host.Equals("localhost", StringComparison.OrdinalIgnoreCase);
            }

            var requireHttpsMetadata = config.GetValue<bool?>("OidcClient:RequireHttpsMetadata");
            options.RequireHttpsMetadata = requireHttpsMetadata.HasValue ? requireHttpsMetadata.Value : !isLocalhost;

            // Fix "Correlation failed" on HTTP localhost
            options.NonceCookie.SameSite = SameSiteMode.Lax;
            options.CorrelationCookie.SameSite = SameSiteMode.Lax;
            options.NonceCookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;
            options.CorrelationCookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;

            // Optional: disable strict state/nonce validators for simplicity in some environments
            var requireNonce = config.GetValue<bool?>("OidcClient:RequireNonce");
            options.ProtocolValidator.RequireNonce = requireNonce.HasValue ? requireNonce.Value : false;

            options.TokenValidationParameters.NameClaimType = "preferred_username";
            options.TokenValidationParameters.RoleClaimType = "role";
            options.TokenValidationParameters.ValidateIssuer = true;
            options.TokenValidationParameters.ValidateAudience = true;
            options.TokenValidationParameters.ValidAudience = oidcConfig["ClientId"];
            options.TokenValidationParameters.ValidateLifetime = true;
            options.TokenValidationParameters.ValidateIssuerSigningKey = true;

            // Automatically try to preload JWKS keys for local environments where normal discovery might fail
            if (isLocalhost)
            {
                try
                {
                    using var client = new HttpClient();
                    var jwksUri = oidcConfig["JwksUri"] ?? $"{options.Authority?.TrimEnd('/')}/api/auth/jwks";
                    var jwksJson = client.GetStringAsync(jwksUri).GetAwaiter().GetResult();
                    var jwks = new JsonWebKeySet(jwksJson);
                    var keysList = new List<SecurityKey>();
                    foreach (var key in jwks.Keys)
                    {
                        keysList.Add(key);
                    }
                    options.TokenValidationParameters.IssuerSigningKeys = keysList;
                    Console.WriteLine($"[OIDC CLIENT] Successfully pre-loaded and registered {keysList.Count} JWKS signing keys at startup!");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"[OIDC CLIENT] Warning: Failed to pre-load JWKS keys at startup: {ex.Message}");
                }
            }

            options.Events = new OpenIdConnectEvents
            {
                OnAuthorizationCodeReceived = context =>
                {
                    // Robust patch: Keycloak/IdentityServer standard redemption via dynamically setting absolute backend URI
                    if (string.IsNullOrEmpty(context.TokenEndpointRequest?.TokenEndpoint))
                    {
                        var baseUri = context.Options.Authority?.TrimEnd('/') ?? "http://localhost:5000";
                        if (context.TokenEndpointRequest != null)
                        {
                            context.TokenEndpointRequest.TokenEndpoint = $"{baseUri}/connect/token";
                            Console.WriteLine($"[OIDC CLIENT] Patched missing TokenEndpoint dynamically to: {context.TokenEndpointRequest.TokenEndpoint}");
                        }
                    }
                    return Task.CompletedTask;
                },
                OnTokenResponseReceived = context =>
                {
                    Console.WriteLine($"[OIDC CLIENT DIAGNOSTIC] IdToken Length: {context.TokenEndpointResponse.IdToken?.Length}");
                    Console.WriteLine($"[OIDC CLIENT DIAGNOSTIC] AccessToken Length: {context.TokenEndpointResponse.AccessToken?.Length}");
                    Console.WriteLine($"[OIDC CLIENT DIAGNOSTIC] TokenType: {context.TokenEndpointResponse.TokenType}");
                    return Task.CompletedTask;
                },
                OnRemoteFailure = context =>
                {
                    var message = context.Failure?.Message ?? "Unknown error";
                    var errorPath = oidcConfig["ErrorPath"] ?? "/Home/Error";
                    context.Response.Redirect($"{errorPath}?message={Uri.EscapeDataString(message)}");
                    context.HandleResponse();
                    return Task.CompletedTask;
                }
            };
        });

        return services;
    }
}
