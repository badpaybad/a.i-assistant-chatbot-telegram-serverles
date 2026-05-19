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

    var isLocalhost = false;
    if (Uri.TryCreate(options.Authority, UriKind.Absolute, out var uri))
    {
        isLocalhost = uri.IsLoopback || uri.Host.Equals("localhost", StringComparison.OrdinalIgnoreCase);
    }

    var requireHttpsMetadata = builder.Configuration.GetValue<bool?>("OIDC:RequireHttpsMetadata");
    options.RequireHttpsMetadata = requireHttpsMetadata.HasValue ? requireHttpsMetadata.Value : !isLocalhost;

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
    if (isLocalhost)
    {
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
    }

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
            // Robust patch: If the internal .NET configuration parser drops the token_endpoint, 
            // guarantee successful standard OIDC redemption by dynamically setting it to the absolute backend URI.
            if (string.IsNullOrEmpty(context.TokenEndpointRequest?.TokenEndpoint))
            {
                var baseUri = context.Options.Authority?.TrimEnd('/') ?? "http://localhost:5000";
                if (context.TokenEndpointRequest != null)
                {
                    context.TokenEndpointRequest.TokenEndpoint = $"{baseUri}/connect/token";
                    Console.WriteLine($"[MVC CLIENT] Patched missing TokenEndpoint dynamically to: {context.TokenEndpointRequest.TokenEndpoint}");
                }
            }
            return Task.CompletedTask;
        },
        OnTokenResponseReceived = context =>
        {
            Console.WriteLine("[MVC CLIENT DIAGNOSTIC] Keys in TokenResponse:");
            foreach(var kvp in context.TokenEndpointResponse.Parameters)
            {
                Console.WriteLine($"  {kvp.Key}: {(kvp.Value?.Length ?? 0)} chars");
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


}
