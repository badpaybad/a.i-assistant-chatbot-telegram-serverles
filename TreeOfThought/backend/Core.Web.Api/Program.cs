using Core.Infra.Base.Interfaces;
using Core.Infra.CQRS.Dispatchers;
using Core.Infra.Data.Contexts;
using Core.Infra.Firebase.Services;
using Core.Infra.Redis.Services;
using Core.Web.Api.Handlers;
using Core.Web.Api.Models;
using Core.Web.Api.Repositories;
using Core.Web.Api.Services;
using Module.BookingBds.Models;
using Module.BookingBds.Services;
using Module.BookingBds.Handlers;
using Module.BookingBds.Commands;
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
            ValidateLifetime = false,
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
builder.Services.AddScoped<BookingDbContext>();
builder.Services.AddScoped<BookingQueryService>();

// --- 5. Handlers (Singleton as requested) ---
builder.Services.AddSingleton<SampleCommandHandler>();
builder.Services.AddSingleton<SampleEventHandler>();
builder.Services.AddSingleton<SampleEventHandlerAlwaysError>();
builder.Services.AddScoped<CreateBookingCommandHandler>();
builder.Services.AddScoped<ConfirmPaymentCommandHandler>();
builder.Services.AddScoped<AdminCommandHandler>();

// --- 6. Controllers & Swagger ---
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
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
await dispatcher.RegisterEventHandlerAsync<SampleEvent, SampleEventHandlerAlwaysError>("sample.event", "web-api-subscriber-test-always-err");

// Register BookingBds handlers
await dispatcher.RegisterCommandHandlerAsync<CreateBookingCommand, CreateBookingCommandHandler>();
await dispatcher.RegisterCommandHandlerAsync<ConfirmPaymentCommand, ConfirmPaymentCommandHandler>();
await dispatcher.RegisterCommandHandlerAsync<CreateProjectCommand, AdminCommandHandler>();
await dispatcher.RegisterCommandHandlerAsync<CreateApartmentCommand, AdminCommandHandler>();

// Ensure Database Created (PostgreSQL)
using (var scope = app.Services.CreateScope())
{
    var bookingDb = scope.ServiceProvider.GetRequiredService<BookingDbContext>();
    if (bookingDb.Database.EnsureCreated() || !bookingDb.Projects.Any())
    {
        // Seed initial data if database is empty
        if (!bookingDb.Projects.Any())
        {
            var project = new Project
            {
                Id = Guid.NewGuid(),
                Name = "Vinhomes Ocean Park",
                Description = "Khu đô thị đẳng cấp với biển hồ nước mặn.",
                Location = "Gia Lâm, Hà Nội",
                TotalUnits = 100
            };
            bookingDb.Projects.Add(project);

            for (int i = 1; i <= 10; i++)
            {
                bookingDb.Apartments.Add(new Apartment
                {
                    Id = Guid.NewGuid(),
                    ProjectId = project.Id,
                    UnitNumber = $"A-{100 + i}",
                    Floor = 10,
                    Price = 3000000000 + (i * 100000000),
                    Status = ApartmentStatus.Available
                });
            }
            bookingDb.SaveChanges();
        }
    }
}

await dispatcher.PublishAsync(new SampleEvent { Data = "Test" });
app.Run();
