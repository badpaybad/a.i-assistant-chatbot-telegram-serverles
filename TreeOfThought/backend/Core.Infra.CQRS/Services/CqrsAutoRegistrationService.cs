using System.Reflection;
using Core.Infra.Base.Interfaces;
using Core.Infra.CQRS.Extensions;
using Core.Infra.CQRS.Handlers;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Core.Infra.CQRS.Services;

public class CqrsAutoRegistrationService : IHostedService
{
    private readonly IServiceProvider _serviceProvider;
    private readonly Assembly[] _assemblies;
    private readonly ILogger<CqrsAutoRegistrationService> _logger;

    public CqrsAutoRegistrationService(
        IServiceProvider serviceProvider, 
        Assembly[] assemblies)
    {
        _serviceProvider = serviceProvider;
        _assemblies = assemblies;
        _logger = serviceProvider.GetRequiredService<ILogger<CqrsAutoRegistrationService>>();
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Starting CQRS Auto-Registration...");

        using var scope = _serviceProvider.CreateScope();
        var dispatcher = scope.ServiceProvider.GetRequiredService<IDispatcher>();

        var handlerTypes = _assemblies.SelectMany(a => a.GetTypes())
            .Where(t => t.IsPublic && !t.IsAbstract && !t.IsInterface);

        foreach (var type in handlerTypes)
        {
            // Command Handlers
            var commandHandlerInterfaces = type.GetInterfaces()
                .Where(i => i.IsGenericType && i.GetGenericTypeDefinition() == typeof(ICommandHandler<>));

            foreach (var @interface in commandHandlerInterfaces)
            {
                var commandType = @interface.GetGenericArguments()[0];
                var queueName = CqrsExtensions.GetQueueNameFromCommand(commandType, type);

                _logger.LogInformation("Auto-registering Command Handler: {Handler} for Queue: {Queue}", type.Name, queueName);

                var method = dispatcher.GetType().GetMethod(nameof(IDispatcher.RegisterCommandHandlerAsync))
                    ?.MakeGenericMethod(commandType, type);

                if (method != null)
                {
                    await (Task)method.Invoke(dispatcher, new object?[] { queueName })!;
                }
            }

            // Event Handlers
            var eventHandlerInterfaces = type.GetInterfaces()
                .Where(i => i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IEventHandler<>));

            foreach (var @interface in eventHandlerInterfaces)
            {
                var eventType = @interface.GetGenericArguments()[0];
                var topicName = CqrsExtensions.GetTopicNameFromEvent(eventType, type);
                var subscriberName = type.Name; // Default subscriber name to handler type name

                _logger.LogInformation("Auto-registering Event Handler: {Handler} for Topic: {Topic} as {Subscriber}", type.Name, topicName, subscriberName);

                var method = dispatcher.GetType().GetMethod(nameof(IDispatcher.RegisterEventHandlerAsync))
                    ?.MakeGenericMethod(eventType, type);

                if (method != null)
                {
                    await (Task)method.Invoke(dispatcher, new object?[] { topicName, subscriberName })!;
                }
            }
        }

        // Get all Event types in the assemblies to check for INotifyUiEvent
        var eventTypes = _assemblies.SelectMany(a => a.GetTypes())
            .Where(t => typeof(IBaseEvent).IsAssignableFrom(t) && !t.IsInterface && !t.IsAbstract);

        foreach (var eventType in eventTypes)
        {
            if (typeof(INotifyUiEvent).IsAssignableFrom(eventType))
            {
                var topicName = CqrsExtensions.GetTopicNameFromEvent(eventType);
                var subscriberName = "UiNotificationHandler";

                _logger.LogInformation("Auto-registering Global UI Notification Handler for Topic: {Topic}", topicName);

                var handlerType = typeof(UiNotificationEventHandler<>).MakeGenericType(eventType);
                
                var method = dispatcher.GetType().GetMethod(nameof(IDispatcher.RegisterEventHandlerAsync))
                    ?.MakeGenericMethod(eventType, handlerType);

                if (method != null)
                {
                    await (Task)method.Invoke(dispatcher, new object?[] { topicName, subscriberName })!;
                }
            }
        }

        _logger.LogInformation("CQRS Auto-Registration completed.");
    }

    public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
}
