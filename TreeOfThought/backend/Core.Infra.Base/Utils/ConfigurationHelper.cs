using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Core.Infra.Base.Utils;

public static class ConfigurationHelper
{
    public static IConfiguration LoadConfiguration(string? environment = null)
    {
        var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .AddJsonFile($"appsettings.{environment ?? "Production"}.json", optional: true)
            .AddEnvironmentVariables();

        return builder.Build();
    }

    public static T BindOptions<T>(this IConfiguration configuration, string sectionName) where T : new()
    {
        var options = new T();
        configuration.GetSection(sectionName).Bind(options);
        return options;
    }
}
