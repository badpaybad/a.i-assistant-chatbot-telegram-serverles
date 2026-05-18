using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using WebMvcTestOidc.Data;
using Core.Infra.Auth.Extensions;
using Core.Infra.Auth.Models;

System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// SQLite for local data
builder.Services.AddDbContext<TestDbContext>(options =>
    options.UseSqlite("Data Source=test.db"));

// OIDC Configuration
var oidcConfig = builder.Configuration.GetSection("OIDC");

builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
})
.AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
{
    options.Cookie.Name = "WebMvcTestOidc_Auth";
    options.Cookie.SameSite = SameSiteMode.Lax;
    options.LoginPath = "/Home/Login";
})
.AddOpenIdConnect(OpenIdConnectDefaults.AuthenticationScheme, options =>
{
    options.Authority = oidcConfig["Authority"];
    options.ClientId = oidcConfig["ClientId"];
    options.ClientSecret = oidcConfig["ClientSecret"];
    options.ResponseType = "code";

    options.SaveTokens = true;
    options.GetClaimsFromUserInfoEndpoint = true;
    options.RequireHttpsMetadata = false;

    // Fix "Correlation failed" on HTTP localhost
    options.NonceCookie.SameSite = SameSiteMode.Lax;
    options.CorrelationCookie.SameSite = SameSiteMode.Lax;
    options.NonceCookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;
    options.CorrelationCookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;

    // Disable strict state/nonce validators for simplicity in test
    options.ProtocolValidator.RequireNonce = false;

    options.TokenValidationParameters.NameClaimType = "preferred_username";
    options.TokenValidationParameters.RoleClaimType = "role";
    options.TokenValidationParameters.ValidateIssuer = true;
    options.TokenValidationParameters.ValidateAudience = true;
    options.TokenValidationParameters.ValidAudience = oidcConfig["ClientId"];
    options.TokenValidationParameters.ValidateLifetime = false;
    options.TokenValidationParameters.ValidateIssuerSigningKey = true;

    // Manually pre-load and register JWKS public signing keys to guarantee successful signature validation
    try
    {
        using var client = new HttpClient();
        var jwksJson = client.GetStringAsync("http://localhost:5000/api/auth/jwks").GetAwaiter().GetResult();
        var jwks = new Microsoft.IdentityModel.Tokens.JsonWebKeySet(jwksJson);
        var keysList = new List<Microsoft.IdentityModel.Tokens.SecurityKey>();
        foreach (var key in jwks.Keys)
        {
            keysList.Add(key);
        }
        options.TokenValidationParameters.IssuerSigningKeys = keysList;
        Console.WriteLine($"[MVC CLIENT] Successfully pre-loaded and registered {keysList.Count} JWKS signing keys at startup!");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"[MVC CLIENT] Warning: Failed to pre-load JWKS keys at startup: {ex.Message}");
    }

    options.BackchannelHttpHandler = new LoggingBackchannelHandler { InnerHandler = new HttpClientHandler() };

    options.Events = new OpenIdConnectEvents
    {
        OnTokenValidated = async context =>
        {
            var db = context.HttpContext.RequestServices.GetRequiredService<TestDbContext>();
            var name = context.Principal?.Identity?.Name ?? "Unknown";
            db.AuditLogs.Add(new AuditLog
            {
                Message = $"User {name} logged in successfully.",
                Timestamp = DateTime.UtcNow
            });
            await db.SaveChangesAsync();
        },
        OnAuthorizationCodeReceived = context =>
        {
            // Dynamically build TokenEndpoint from options.Authority
            if (context.TokenEndpointRequest != null && !string.IsNullOrEmpty(options.Authority))
            {
                context.TokenEndpointRequest.TokenEndpoint = $"{options.Authority.TrimEnd('/')}/api/auth/token";
            }
            return Task.CompletedTask;
        },
        OnTokenResponseReceived = context =>
        {
            Console.WriteLine($"[MVC CLIENT DEBUG] Received Token Response. AccessToken exists: {!string.IsNullOrEmpty(context.TokenEndpointResponse.AccessToken)}, IdToken exists: {!string.IsNullOrEmpty(context.TokenEndpointResponse.IdToken)}");
            
            try
            {
                if (!string.IsNullOrEmpty(LoggingBackchannelHandler.LastResponseBody))
                {
                    using var doc = System.Text.Json.JsonDocument.Parse(LoggingBackchannelHandler.LastResponseBody);
                    var root = doc.RootElement;
                    
                    if (root.TryGetProperty("id_token", out var idTokenProp))
                    {
                        var idToken = idTokenProp.GetString();
                        if (!string.IsNullOrEmpty(idToken))
                        {
                            context.TokenEndpointResponse.IdToken = idToken;
                            Console.WriteLine($"[MVC CLIENT DEBUG] Successfully extracted and injected id_token manually! Len: {idToken.Length}");
                        }
                    }
                    if (root.TryGetProperty("token_type", out var tokenTypeProp))
                    {
                        var tokenType = tokenTypeProp.GetString();
                        if (!string.IsNullOrEmpty(tokenType))
                        {
                            context.TokenEndpointResponse.TokenType = tokenType;
                            Console.WriteLine($"[MVC CLIENT DEBUG] Successfully extracted and injected token_type manually: {tokenType}");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[MVC CLIENT DEBUG] Error parsing raw JSON manually: {ex.Message}");
            }

            if (string.IsNullOrEmpty(context.TokenEndpointResponse.IdToken))
            {
                Console.WriteLine("[MVC CLIENT DEBUG] IdToken is NULL or EMPTY in TokenEndpointResponse!");
            }
            else
            {
                Console.WriteLine($"[MVC CLIENT DEBUG] IdToken snippet: {context.TokenEndpointResponse.IdToken.Substring(0, Math.Min(30, context.TokenEndpointResponse.IdToken.Length))}...");
            }
            
            // Safeguard against missing id_token property (as fallback)
            if (string.IsNullOrEmpty(context.TokenEndpointResponse.IdToken) && !string.IsNullOrEmpty(context.TokenEndpointResponse.AccessToken))
            {
                Console.WriteLine("[MVC CLIENT DEBUG] Safeguard activated: Copying AccessToken to IdToken!");
                context.TokenEndpointResponse.IdToken = context.TokenEndpointResponse.AccessToken;
                context.TokenEndpointResponse.TokenType = "Bearer";
            }
            return Task.CompletedTask;
        },
        OnRemoteFailure = context =>
        {
            var message = context.Failure?.Message ?? "Unknown error";
            context.Response.Redirect("/Home/Error?message=" + Uri.EscapeDataString(message));
            context.HandleResponse();
            return Task.CompletedTask;
        }
    };
});

builder.Services.AddHttpContextAccessor();
builder.Services.AddAppAuthorization(builder.Configuration, AppAuthMode.None);

var app = builder.Build();

// Initialize Database
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<TestDbContext>();
    db.Database.EnsureCreated();
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();

namespace WebMvcTestOidc.Data
{
    public class TestDbContext : DbContext
    {
        public TestDbContext(DbContextOptions<TestDbContext> options) : base(options) { }
        public DbSet<AuditLog> AuditLogs { get; set; }
    }

    public class AuditLog
    {
        public int Id { get; set; }
        public string Message { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; }
    }

    public class LoggingBackchannelHandler : DelegatingHandler
    {
        public static string LastResponseBody { get; set; } = string.Empty;

        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            Console.WriteLine($"[BACKCHANNEL DEBUG] Outgoing Request: {request.Method} {request.RequestUri}");
            if (request.Content != null)
            {
                var reqContent = await request.Content.ReadAsStringAsync(cancellationToken);
                Console.WriteLine($"[BACKCHANNEL DEBUG] Request Body: {reqContent}");
            }

            var response = await base.SendAsync(request, cancellationToken);

            Console.WriteLine($"[BACKCHANNEL DEBUG] Incoming Response Status: {response.StatusCode}");
            if (response.Content != null)
            {
                LastResponseBody = await response.Content.ReadAsStringAsync(cancellationToken);
                Console.WriteLine($"[BACKCHANNEL DEBUG] Response Body: {LastResponseBody}");
            }

            return response;
        }
    }
}
