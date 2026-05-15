using System.Reflection;
using Core.Infra.Base.Interfaces;
using Core.Infra.Cqrs.Services;
using Core.Infra.Cqrs.Handlers;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Core.Infra.Redis.Services;
using Core.Infra.Firebase.Services;
using Core.Infra.Cqrs.Dispatchers;

namespace Core.Infra.Cqrs.Extensions;

public static class CqrsExtensions
{
    private static readonly System.Collections.Concurrent.ConcurrentDictionary<Type, string> _nameCache = new();

    public static IServiceCollection AddCqrs(this IServiceCollection services, IConfiguration config, params Assembly[] handlerAssemblies)
    {
        var redisConn = config["Cqrs:Redis"]!;

        // 1. Redis Infrastructure for CQRS (Specific Service Inheritance)
        services.AddSingleton<CqrsRedisService>(sp => new CqrsRedisService(
            redisConn,
            sp.GetRequiredService<ILogger<CqrsRedisService>>()
        ));

        services.AddSingleton<IMessageTracker>(sp => new MessageTracker(redisConn));
        services.AddSingleton<IQueueService>(sp => sp.GetRequiredService<CqrsRedisService>());
        services.AddSingleton<IEventBus>(sp => sp.GetRequiredService<CqrsRedisService>());
        services.AddSingleton<ICacheService>(sp => sp.GetRequiredService<CqrsRedisService>());

        // 2. Firebase Service (Used by some CQRS components/handlers)
        services.AddSingleton<FirebaseService>();

        // 3. Core CQRS Dispatcher
        services.AddSingleton<IDispatcher, CqrsDispatcher>();

        // 4. Auto-register handlers if assemblies provided
        if (handlerAssemblies != null && handlerAssemblies.Length > 0)
        {
            services.AddCqrsHandlers(handlerAssemblies);
        }

        return services;
    }

    public static IServiceCollection AddCqrsHandlers(this IServiceCollection services, params Assembly[] assemblies)
    {
        var handlerTypes = assemblies.SelectMany(a => a.GetTypes())
            .Where(t => t.IsPublic && !t.IsAbstract && !t.IsInterface) // Requirement: Only public classes
            .Where(t => t.GetInterfaces().Any(i =>
                (i.IsGenericType && i.GetGenericTypeDefinition() == typeof(ICommandHandler<>)) ||
                (i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IEventHandler<>))
            ));

        foreach (var type in handlerTypes)
        {
            // Register handlers as Scoped (changed from Singleton to support Scoped dependencies like DbContext)
            services.AddScoped(type);

            // Also register as its interfaces to support IDispatcher Memory Mode (resolving by interface)
            var interfaces = type.GetInterfaces().Where(i =>
                (i.IsGenericType && i.GetGenericTypeDefinition() == typeof(ICommandHandler<>)) ||
                (i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IEventHandler<>))
            );
            foreach (var iface in interfaces)
            {
                services.AddScoped(iface, type);
            }
        }

        // Register open generic notification handler
        services.AddSingleton(typeof(Handlers.UiNotificationEventHandler<>));

        // Register the auto-registration service
        services.AddHostedService<CqrsAutoRegistrationService>(sp =>
            new CqrsAutoRegistrationService(sp, assemblies));

        return services;
    }

    public static string? GetQueueNameFromCommand(Type commandType, Type? handlerType = null)
    {
        if (!typeof(IBaseCommand).IsAssignableFrom(commandType)) return null;

        return _nameCache.GetOrAdd(commandType, t =>
        {
            try
            {
                var instance = Activator.CreateInstance(t) as IBaseCommand;
                var name = instance?.QueueName;
                return !string.IsNullOrEmpty(name) ? name : t.FullName!;
            }
            catch
            {
                return t.FullName!;
            }
        });
    }

    public static string? GetTopicNameFromEvent(Type eventType, Type? handlerType = null)
    {
        if (!typeof(IBaseEvent).IsAssignableFrom(eventType)) return null;

        return _nameCache.GetOrAdd(eventType, t =>
        {
            try
            {
                var instance = Activator.CreateInstance(t) as IBaseEvent;
                var name = instance?.TopicName;
                return !string.IsNullOrEmpty(name) ? name : t.FullName!;
            }
            catch
            {
                return t.FullName!;
            }
        });
    }
}
