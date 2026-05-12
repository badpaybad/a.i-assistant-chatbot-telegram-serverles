using System.Reflection;
using Core.Infra.Base.Interfaces;
using Core.Infra.CQRS.Services;
using Core.Infra.CQRS.Handlers;
using Microsoft.Extensions.DependencyInjection;

namespace Core.Infra.CQRS.Extensions;

public static class CqrsExtensions
{
    private static readonly System.Collections.Concurrent.ConcurrentDictionary<Type, string> _nameCache = new();

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
            // Requirement 64: Register handlers as Singleton
            services.AddSingleton(type);
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

        return _nameCache.GetOrAdd(commandType, t => {
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

        return _nameCache.GetOrAdd(eventType, t => {
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
