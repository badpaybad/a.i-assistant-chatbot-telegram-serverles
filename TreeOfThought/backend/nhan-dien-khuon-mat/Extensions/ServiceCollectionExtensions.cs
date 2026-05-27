using Core.Infra.Data.Contexts;
using Core.Infra.NhanDienKhuonMat.Contexts;
using Core.Infra.NhanDienKhuonMat.Controllers;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;

namespace Core.Infra.NhanDienKhuonMat.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddNhanDienKhuonMat(this IServiceCollection services, IConfiguration config)
    {
        var connectionString = config["NhanDienKhuonMat:Postgresql"];
        if (string.IsNullOrEmpty(connectionString)) 
            throw new Exception("ConnectionString for NhanDienKhuonMat:Postgresql not found in appsettings.json.");

        services.AddScoped<NhanDienKhuonMatDbContext>(sp => 
            new NhanDienKhuonMatDbContext(connectionString, BaseDbContext.DbProviderType.PostgreSql));

        return services;
    }

    public static IMvcBuilder AddNhanDienKhuonMatControllers(this IMvcBuilder mvcBuilder)
    {
        return mvcBuilder.AddApplicationPart(typeof(FaceDetectionController).Assembly);
    }

    public static async Task UseNhanDienKhuonMat(this IApplicationBuilder app)
    {
        using (var scope = app.ApplicationServices.CreateScope())
        {
            var services = scope.ServiceProvider;
            try
            {
                var faceDb = services.GetRequiredService<NhanDienKhuonMatDbContext>();
                await faceDb.EnsureTablesCreatedAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[STARTUP ERROR] NhanDienKhuonMatDbContext table creation failed: {ex.Message}");
            }
        }
    }
}
