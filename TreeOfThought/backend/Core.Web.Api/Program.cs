using StackExchange.Redis;
using Core.Infra.Base.Interfaces;
using Core.Infra.Data.Contexts;
using Core.Infra.Firebase.Services;
using Core.Web.Api.Handlers;
using Core.Web.Api.Models;
using Core.Infra.Oidc.Repositories;
using Core.Infra.Oidc.Services;
using Core.Infra.Oidc.Models;
using Core.Infra.Oidc.Contexts;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using System.Reflection;
using Core.Infra.Cqrs.Extensions;
using Core.Infra.Session.Extensions;
using Core.Infra.Auth.Extensions;
using Core.Infra.Oidc.Extensions;
using Core.Web.Api.Services;
using Core.Infra.FilesFolders.Extensions;
using Core.Infra.FilesFolders.Handlers;
using Core.Infra.FilesFolders.Contexts;
using Core.Infra.Firebase.Extensions;
using Core.Infra.Firebase.Models;
using Core.Infra.NhanDienKhuonMat.Extensions;
using Core.Infra.NhanDienKhuonMat.Handlers;
using Core.Infra.NhanDienKhuonMat.Contexts;

var builder = WebApplication.CreateBuilder(args);

// --- 1. Configuration ---
var config = builder.Configuration;
builder.Services.AddMemoryCache();
builder.Services.AddAppFirebase(config);

// --- Default Redis Service (for general caching) ---
var defaultRedisConn = config["Redis:ConnectionString"];
if (!string.IsNullOrEmpty(defaultRedisConn))
{
    builder.Services.AddSingleton<AppRedisService>(sp =>
        new AppRedisService(defaultRedisConn, sp.GetRequiredService<ILogger<AppRedisService>>()));
    builder.Services.AddSingleton<ICacheService>(sp => sp.GetRequiredService<AppRedisService>());
}

// --- 2. Authentication & Authorization (Encapsulated) ---
builder.Services.AddAppOidc(config);

// --- 3. Infra Services (CQRS & Base) ---
builder.Services.AddCqrs(config, Assembly.GetExecutingAssembly(), typeof(FilesFoldersCommandHandler).Assembly, typeof(FaceDetectionCommandHandler).Assembly);

// --- 4. Database & Auth Repos ---
builder.Services.AddFilesFolders(config);
builder.Services.AddNhanDienKhuonMat(config);
// Registered via AddAppAuth extension

// --- 5. Handlers ---
// Registered via AddCqrs extension above

// --- 6. Controllers & Swagger ---
builder.Services.AddControllers()
    .AddFilesFoldersControllers()
    .AddNhanDienKhuonMatControllers()
    .AddOidcControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
    });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Core Web API", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
            },
            new string[] {}
        }
    });
});

var app = builder.Build();

// --- 7. Configure Pipeline ---
app.UseCors("AllowAll");
app.Use(async (context, next) =>
{
    context.Response.Headers.Remove("X-Frame-Options");
    context.Response.Headers.Append("Content-Security-Policy", "frame-ancestors *;");
    context.Response.Headers.Append("Permissions-Policy", "camera=*, microphone=*, geolocation=*");
    context.Response.Headers.Append("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    await next();
});

app.UseStaticFiles();

if (app.Configuration.GetValue<bool>("Swagger:Enabled"))
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapFallbackToFile("/admin/{*path:nonfile}", "admin/index.html");

// --- 8. Initialize Infrastructure ---
await app.UseAppAuth(config, new[] { Assembly.GetExecutingAssembly() });

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var filesDb = services.GetRequiredService<FilesFoldersDbContext>();
        await filesDb.EnsureTablesCreatedAsync();

        var faceDb = services.GetRequiredService<NhanDienKhuonMatDbContext>();
        await faceDb.EnsureTablesCreatedAsync();
    }
    catch (Exception ex)
    {
        Console.WriteLine($"[STARTUP ERROR] {ex.Message}");
    }
}

app.Run();
