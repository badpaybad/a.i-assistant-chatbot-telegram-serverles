using Core.Infra.Firebase.Models;
using Core.Infra.Firebase.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Core.Infra.Firebase.Extensions;

public static class FirebaseExtensions
{
    public static IServiceCollection AddAppFirebase(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<FirebaseOptions>(configuration.GetSection(FirebaseOptions.Firebase));
        services.AddSingleton<FirebaseService>();
        return services;
    }
}
