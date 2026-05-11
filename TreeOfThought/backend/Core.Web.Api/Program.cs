using Core.Infra.Base.Interfaces;
using Core.Infra.CQRS.Dispatchers;
using Core.Infra.Data.Contexts;
using Core.Infra.Firebase.Services;
using Core.Infra.Redis.Services;
using Core.Web.Api.Handlers;
using Core.Web.Api.Models;
using Core.Infra.Auth.Repositories;
using Core.Infra.Auth.Services;
using Core.Infra.Auth.Models;
using Core.Infra.Auth.Contexts;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using System.Reflection;
using Core.Infra.CQRS.Extensions;

var builder = WebApplication.CreateBuilder(args);

// --- 1. Configuration ---
var config = builder.Configuration;
builder.Services.AddMemoryCache();

// --- CORS Configuration ---
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.SetIsOriginAllowed(_ => true) // Allow all origins with credentials
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

// --- 2. Authentication & Authorization ---
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = false,
            ValidateIssuerSigningKey = true,
            ValidIssuer = config["Jwt:Issuer"],
            ValidAudience = config["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Secret"]!))
        };
    });

builder.Services.AddAuthorization();

// --- 3. Infra Services ---
var redisConn = config["Redis:ConnectionString"]!;
builder.Services.AddSingleton<RedisService>(sp => new RedisService(redisConn, sp.GetRequiredService<ILogger<RedisService>>()));
builder.Services.AddSingleton<IQueueService>(sp => sp.GetRequiredService<RedisService>());
builder.Services.AddSingleton<IEventBus>(sp => sp.GetRequiredService<RedisService>());
builder.Services.AddSingleton<ICacheService>(sp => sp.GetRequiredService<RedisService>());
builder.Services.AddSingleton<IMessageTracker>(sp => new MessageTracker(redisConn));
builder.Services.AddSingleton<FirebaseService>();
builder.Services.AddSingleton<IDispatcher, CqrsDispatcher>();

// --- 4. Database & Auth Repos ---
var pgConn = config.GetConnectionString("PostgreSql")!;
builder.Services.AddScoped<AuthDbContext>(sp => new AuthDbContext(pgConn, BaseDbContext.DbProviderType.PostgreSql));
builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddScoped<AuthService>();

// --- 5. Handlers (Auto Registration) ---
builder.Services.AddCqrsHandlers(Assembly.GetExecutingAssembly());
// Note: You can also add handlers from other assemblies if needed:
// builder.Services.AddCqrsHandlers(typeof(SomeModuleHandler).Assembly);

// --- 6. Controllers & Swagger ---
builder.Services.AddControllers()
    .AddApplicationPart(typeof(Core.Infra.Auth.Controllers.AuthController).Assembly)
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
    await next();
});

if (app.Configuration.GetValue<bool>("Swagger:Enabled"))
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// --- 8. Initialize Infrastructure ---
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    
    // Initialize Auth Database
    var authRepo = services.GetRequiredService<IAuthRepository>();
    await authRepo.EnsureTablesCreatedAsync();
    await authRepo.EnsureAdminExistsAsync(
        config["Auth:Admin:Username"] ?? "admin",
        config["Auth:Admin:Password"] ?? "Admin@123",
        config["Auth:Admin:Email"] ?? "admin@example.com"
    );

    // Initialize Firebase
    var firebase = services.GetRequiredService<FirebaseService>();
    var jsonPath = config["Firebase:JsonFilePath"]!;
    if (!Path.IsPathRooted(jsonPath)) jsonPath = Path.Combine(app.Environment.ContentRootPath, jsonPath);
    firebase.InitializeApp("Default", jsonPath, config["Firebase:ProjectId"], config["Firebase:DatabaseId"]);

    // Initialize CQRS Dispatcher (Auto Registration)
    var dispatcher = services.GetRequiredService<IDispatcher>();
    // CQRS Handlers are auto-registered via CqrsAutoRegistrationService (IHostedService)
    
    await dispatcher.PublishAsync(new SampleEvent { Data = "Infrastructure Initialized" });
}

app.Run();

