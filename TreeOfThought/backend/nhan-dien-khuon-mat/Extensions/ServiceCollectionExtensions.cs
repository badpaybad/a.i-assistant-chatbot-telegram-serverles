using Core.Infra.Data.Contexts;
using Core.Infra.NhanDienKhuonMat.Contexts;
using Core.Infra.NhanDienKhuonMat.Controllers;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

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
}
