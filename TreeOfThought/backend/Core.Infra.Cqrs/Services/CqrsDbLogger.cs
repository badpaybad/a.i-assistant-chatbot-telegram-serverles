using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Core.Infra.Cqrs.Contexts;
using Core.Infra.Cqrs.Models;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Core.Infra.Cqrs.Services;

public class CqrsDbLogger : IDisposable, IAsyncDisposable
{
    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<CqrsDbLogger> _logger;
    private readonly ConcurrentQueue<CqrsTrackingLog> _queue = new();
    private readonly CancellationTokenSource _cts = new();
    private readonly Task _backgroundTask;
    private bool _disposed;

    public CqrsDbLogger(IServiceProvider serviceProvider, ILogger<CqrsDbLogger> logger)
    {
        _serviceProvider = serviceProvider;
        _logger = logger;
        _backgroundTask = Task.Run(ProcessQueueLoopAsync);
    }

    public Task LogAsync(
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
        if (_disposed)
        {
            _logger.LogWarning("Discarding log entry for TrackingId: {TrackingId} because CqrsDbLogger is disposed", trackingId);
            return Task.CompletedTask;
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

        _queue.Enqueue(logEntry);
        return Task.CompletedTask;
    }

    private async Task ProcessQueueLoopAsync()
    {
        while (!_cts.Token.IsCancellationRequested)
        {
            try
            {
                await Task.Delay(TimeSpan.FromSeconds(5), _cts.Token);
                await FlushQueueAsync();
            }
            catch (OperationCanceledException)
            {
                break;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in CqrsDbLogger background loop");
            }
        }
    }

    private async Task FlushQueueAsync()
    {
        if (_queue.IsEmpty)
        {
            return;
        }

        var items = new List<CqrsTrackingLog>();
        while (items.Count < 1000 && _queue.TryDequeue(out var item))
        {
            items.Add(item);
        }

        if (items.Count == 0)
        {
            return;
        }

        _logger.LogInformation("CqrsDbLogger: Flushing {Count} logs in batches of 100", items.Count);

        const int batchSize = 100;
        for (int i = 0; i < items.Count; i += batchSize)
        {
            var batch = items.Skip(i).Take(batchSize).ToList();
            try
            {
                using var scope = _serviceProvider.CreateScope();
                var db = scope.ServiceProvider.GetService<CqrsDbContext>();
                if (db != null)
                {
                    db.CqrsTrackingLogs.AddRange(batch);
                    await db.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to write CQRS DB log batch of {Count} items", batch.Count);
            }
        }
    }

    public void Dispose()
    {
        if (_disposed) return;
        _disposed = true;

        _cts.Cancel();
        try
        {
            // Block synchronously to flush remaining logs during app domain shutdown
            _backgroundTask.Wait(TimeSpan.FromSeconds(5));
            FlushQueueAsync().GetAwaiter().GetResult();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error disposing CqrsDbLogger");
        }
        _cts.Dispose();
        GC.SuppressFinalize(this);
    }

    public async ValueTask DisposeAsync()
    {
        if (_disposed) return;
        _disposed = true;

        _cts.Cancel();
        try
        {
            // Wait for background task to complete gracefully
            await Task.WhenAny(_backgroundTask, Task.Delay(TimeSpan.FromSeconds(5)));
            await FlushQueueAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error async disposing CqrsDbLogger");
        }
        _cts.Dispose();
        GC.SuppressFinalize(this);
    }
}
