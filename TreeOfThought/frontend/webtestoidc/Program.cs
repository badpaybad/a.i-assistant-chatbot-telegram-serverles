using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using WebTestOidc.Data;

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
        ValidAudience = "TreeOfThought.FE"
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
        OnRedirectToIdentityProvider = context =>
        {
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

builder.Services.AddAuthorization();

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
