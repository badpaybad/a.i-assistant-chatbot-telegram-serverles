using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using WebTestOidc.Data;
using Core.Infra.Auth.Extensions;

System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// SQLite for local data
builder.Services.AddDbContext<TestDbContext>(options =>
    options.UseSqlite("Data Source=test.db"));

// OIDC Configuration
var oidcConfig = builder.Configuration.GetSection("OIDC");
Console.WriteLine($"[OIDC DEBUG] Section exists: {oidcConfig.Exists()}, Authority: '{oidcConfig["Authority"]}', ClientId: '{oidcConfig["ClientId"]}'");

builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
})
.AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
{
    options.Cookie.Name = "WebTestOidc_Auth";
    options.Cookie.SameSite = SameSiteMode.Lax;
    options.LoginPath = "/Home/Login";
})
.AddOpenIdConnect(OpenIdConnectDefaults.AuthenticationScheme, options =>
{
    options.Authority = oidcConfig["Authority"];
    options.MetadataAddress = oidcConfig["MetadataAddress"];
    options.ClientId = oidcConfig["ClientId"];
    options.ClientSecret = oidcConfig["ClientSecret"];
    options.ResponseType = "code";
    options.Backchannel = new HttpClient(new OidcBackchannelLoggingHandler(new HttpClientHandler()));
    
    options.SaveTokens = true;
    options.GetClaimsFromUserInfoEndpoint = true;
    options.RequireHttpsMetadata = false; 

    // Fix "Correlation failed" on HTTP
    options.NonceCookie.SameSite = SameSiteMode.Lax;
    options.CorrelationCookie.SameSite = SameSiteMode.Lax;
    options.NonceCookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;
    options.CorrelationCookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;

    // Fix "RequireNonce is True" error (provider doesn't support nonce)
    options.ProtocolValidator.RequireNonce = false;

    options.TokenValidationParameters = new TokenValidationParameters
    {
        NameClaimType = "preferred_username",
        RoleClaimType = "role",
        ValidateIssuer = false,
        ValidAudience = "TreeOfThought.FE",
        ValidateLifetime = false,
        ValidateIssuerSigningKey = false,
        SignatureValidator = delegate (string token, TokenValidationParameters parameters)
        {
            var jwtHandler = new Microsoft.IdentityModel.JsonWebTokens.JsonWebTokenHandler();
            return jwtHandler.ReadJsonWebToken(token);
        }
    };

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
        OnRedirectToIdentityProvider = async context =>
        {
            var config = await context.Options.ConfigurationManager.GetConfigurationAsync(context.HttpContext.RequestAborted);
            if (config != null)
            {
                config.TokenEndpoint = "http://127.0.0.1:5000/api/auth/token";
                config.UserInfoEndpoint = "http://127.0.0.1:5000/api/auth/me";
                config.EndSessionEndpoint = "http://127.0.0.1:5000/api/auth/logout";
                context.Options.Configuration = config;
            }
            Console.WriteLine($"[OIDC DEBUG] Redirecting to Identity Provider. IssuerAddress: '{context.ProtocolMessage.IssuerAddress}'");
        },
        OnAuthorizationCodeReceived = async context =>
        {
            var config = await context.Options.ConfigurationManager.GetConfigurationAsync(context.HttpContext.RequestAborted);
            if (config != null)
            {
                config.TokenEndpoint = "http://127.0.0.1:5000/api/auth/token";
                config.UserInfoEndpoint = "http://127.0.0.1:5000/api/auth/me";
                config.EndSessionEndpoint = "http://127.0.0.1:5000/api/auth/logout";
                context.Options.Configuration = config;
            }
            Console.WriteLine($"[OIDC DEBUG] Auth Code Received event. Code: '{context.ProtocolMessage.Code}'. TokenEndpoint: '{context.Options.Configuration?.TokenEndpoint}'");
        },
        OnTokenResponseReceived = context =>
        {
            if (string.IsNullOrEmpty(context.TokenEndpointResponse.IdToken) && !string.IsNullOrEmpty(context.TokenEndpointResponse.AccessToken))
            {
                Console.WriteLine("[OIDC DEBUG] Manually copying AccessToken to IdToken and setting TokenType to Bearer.");
                context.TokenEndpointResponse.IdToken = context.TokenEndpointResponse.AccessToken;
                context.TokenEndpointResponse.TokenType = "Bearer";
            }

            var parameters = string.Join(", ", context.TokenEndpointResponse.Parameters.Select(p => $"{p.Key}: '{p.Value}'"));
            Console.WriteLine($"[OIDC DEBUG] Token Response Raw Parameters: {parameters}");
            Console.WriteLine($"[OIDC DEBUG] Token Response Received. IdToken: '{context.TokenEndpointResponse.IdToken}', AccessToken: '{context.TokenEndpointResponse.AccessToken}', TokenType: '{context.TokenEndpointResponse.TokenType}'");
            return Task.CompletedTask;
        },
        OnRemoteFailure = context =>
        {
            var message = context.Failure?.Message ?? "Unknown error";
            Console.WriteLine($"[OIDC DEBUG] Remote Failure: {message}");
            context.Response.Redirect("/Home/Error?message=" + Uri.EscapeDataString(message));
            context.HandleResponse();
            return Task.CompletedTask;
        }
    };
});

builder.Services.AddHttpContextAccessor();
builder.Services.AddAppAuthorization(builder.Configuration);

// TEST BACKCHANNEL
Task.Run(async () =>
{
    await Task.Delay(3000);
    try
    {
        using var client = new HttpClient();
        var res = await client.GetStringAsync("http://127.0.0.1:5000/.well-known/openid-configuration");
        Console.WriteLine($"[OIDC DEBUG] Backchannel fetch success: {res.Substring(0, Math.Min(res.Length, 150))}...");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"[OIDC DEBUG] Backchannel fetch failed: {ex.Message}");
    }
});

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

namespace WebTestOidc.Data
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

public class OidcBackchannelLoggingHandler : DelegatingHandler
{
    public OidcBackchannelLoggingHandler(HttpMessageHandler innerHandler) : base(innerHandler) { }

    protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
    {
        Console.WriteLine($"[BACKCHANNEL REQ] {request.Method} {request.RequestUri}");
        if (request.Content != null)
        {
            var reqBody = await request.Content.ReadAsStringAsync(cancellationToken);
            Console.WriteLine($"[BACKCHANNEL REQ BODY] {reqBody}");
        }

        var response = await base.SendAsync(request, cancellationToken);

        Console.WriteLine($"[BACKCHANNEL RES] Status: {response.StatusCode}");
        if (response.Content != null)
        {
            var resBody = await response.Content.ReadAsStringAsync(cancellationToken);
            Console.WriteLine($"[BACKCHANNEL RES BODY] {resBody}");
            try
            {
                var msg = new Microsoft.IdentityModel.Protocols.OpenIdConnect.OpenIdConnectMessage(resBody);
                Console.WriteLine($"[DEBUG PARSE] IdToken: '{msg.IdToken}', AccessToken: '{msg.AccessToken}', TokenType: '{msg.TokenType}'");
                Console.WriteLine($"[DEBUG PARSE KEYS] {string.Join(", ", msg.Parameters.Keys)}");
                
                using var doc = System.Text.Json.JsonDocument.Parse(resBody);
                Console.WriteLine("[JSON DOC SUCCESS]");
                foreach (var prop in doc.RootElement.EnumerateObject())
                {
                    Console.WriteLine($"[JSON PROP] {prop.Name}: {prop.Value.ValueKind}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[DEBUG PARSE ERR] {ex.Message}");
            }
        }

        return response;
    }
}
