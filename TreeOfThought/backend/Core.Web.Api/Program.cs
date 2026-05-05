using Core.Infra.Base.Interfaces;
using Core.Infra.CQRS.Dispatchers;
using Core.Infra.Data.Contexts;
using Core.Infra.Firebase.Services;
using Core.Infra.Redis.Services;
using Core.Web.Api.Handlers;
using Core.Web.Api.Models;
using Core.Web.Api.Repositories;
using Core.Web.Api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// --- 1. Configuration ---
var config = builder.Configuration;

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
            ValidateLifetime = true,
            ValidateIssuerSigningKey = false,
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
builder.Services.AddSingleton<IMessageTracker>(sp => new MessageTracker(redisConn));
builder.Services.AddSingleton<FirebaseService>();
builder.Services.AddSingleton<IDispatcher, CqrsDispatcher>();

// --- 4. Web API Services & Repos ---
builder.Services.AddSingleton<MockUserRepository>();
builder.Services.AddScoped<AuthService>();

// --- 5. Handlers (Singleton as requested) ---
builder.Services.AddSingleton<SampleCommandHandler>();
builder.Services.AddSingleton<SampleEventHandler>();

// --- 6. Controllers & Swagger ---
builder.Services.AddControllers();
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
// app.UseHttpsRedirection();

// Custom Middleware for Security Headers (Iframe, Camera, Microphone)
app.Use(async (context, next) =>
{
    // Allow iframe loading from any origin
    context.Response.Headers.Remove("X-Frame-Options");
    context.Response.Headers.Append("Content-Security-Policy", "frame-ancestors *;");

    // Allow camera and microphone
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
var firebase = app.Services.GetRequiredService<FirebaseService>();
var jsonPath = config["Firebase:JsonFilePath"]!;
if (!Path.IsPathRooted(jsonPath)) jsonPath = Path.Combine(app.Environment.ContentRootPath, jsonPath);
firebase.InitializeApp("Default", jsonPath, config["Firebase:ProjectId"], config["Firebase:DatabaseId"]);

var dispatcher = app.Services.GetRequiredService<IDispatcher>();
// Register handlers
await dispatcher.RegisterCommandHandlerAsync<SampleCommand, SampleCommandHandler>("sample.command");
await dispatcher.RegisterEventHandlerAsync<SampleEvent, SampleEventHandler>("sample.event", "web-api-subscriber");

app.Run();
