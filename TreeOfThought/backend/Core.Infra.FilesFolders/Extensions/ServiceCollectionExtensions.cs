using Core.Infra.Data.Contexts;
using Core.Infra.FilesFolders.Contexts;
using Core.Infra.FilesFolders.Controllers;
using Core.Infra.FilesFolders.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Core.Infra.FilesFolders.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddFilesFolders(this IServiceCollection services, IConfiguration config)
    {
        var connectionString = config["FilesFolders:Postgres"]!;
        if (string.IsNullOrEmpty(connectionString)) throw new Exception("FilesFolders:Postgres not found");

        services.AddScoped<FilesFoldersDbContext>(sp => new FilesFoldersDbContext(connectionString, BaseDbContext.DbProviderType.PostgreSql));
        services.AddScoped<FilesFoldersService>();

        return services;
    }
    public static IMvcBuilder AddFilesFoldersControllers(this IMvcBuilder mvcBuilder)
    {
        return mvcBuilder.AddApplicationPart(typeof(FilesController).Assembly);
    }
}
