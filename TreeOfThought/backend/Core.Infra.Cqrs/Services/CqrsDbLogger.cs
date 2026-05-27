using System;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Infra.Cqrs.Contexts;
using Core.Infra.Cqrs.Models;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Core.Infra.Cqrs.Services;

public class CqrsDbLogger
{
    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<CqrsDbLogger> _logger;

    public CqrsDbLogger(IServiceProvider serviceProvider, ILogger<CqrsDbLogger> logger)
    {
        _serviceProvider = serviceProvider;
        _logger = logger;
    }

    public async Task LogAsync(
        Guid trackingId,
        string messageType,
        string messageData,
        string queueOrTopicName,
        string? subscriberName,
        string? destinationQueueName,
        string? sourceComponent,
        string? handlerName,
        string? workerId,
        string step,
        string status,
        string type,
        long? elapsedMilliseconds = null,
        string? errorMessage = null,
        bool isRoot = false)
    {
        try
        {
            using var scope = _serviceProvider.CreateScope();
            var db = scope.ServiceProvider.GetService<CqrsDbContext>();
            if (db == null)
            {
                return;
            }

            var logEntry = new CqrsTrackingLog
            {
                TrackingId = trackingId,
                MessageType = messageType,
                MessageData = messageData,
                QueueOrTopicName = queueOrTopicName,
                SubscriberName = subscriberName,
                DestinationQueueName = destinationQueueName,
                SourceComponent = sourceComponent,
                HandlerName = handlerName,
                WorkerId = workerId,
                Step = step,
                Status = status,
                Type = type,
                ElapsedMilliseconds = elapsedMilliseconds,
                ErrorMessage = errorMessage,
                IsRoot = isRoot,
                CreatedAt = DateTime.UtcNow
            };

            db.CqrsTrackingLogs.Add(logEntry);
            await db.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to write CQRS DB log for TrackingId: {TrackingId}", trackingId);
        }
    }
}
