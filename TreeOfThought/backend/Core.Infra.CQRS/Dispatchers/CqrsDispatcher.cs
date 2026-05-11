using Core.Infra.Base.Interfaces;
using Core.Infra.CQRS.Extensions;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.Collections.Concurrent;
using System.Text.Json;

namespace Core.Infra.CQRS.Dispatchers;

public class CqrsDispatcher : IDispatcher
{
    private readonly IServiceProvider _serviceProvider;
    private readonly IQueueService _queueService;
    private readonly IEventBus _eventBus;
    private readonly ILogger<CqrsDispatcher> _logger;
    private readonly IMessageTracker _tracker;

    private readonly ConcurrentDictionary<string, WorkerInfo> _workers = new();

    private class WorkerInfo
    {
        public string WorkerId { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty; // Command or Event
        public bool IsRunning { get; set; }
        public CancellationTokenSource? Cts { get; set; }
        public Func<CancellationToken, Task>? StartFunc { get; set; }
        public string? MessageName { get; set; }
        public string? HandlerName { get; set; }
        public string? QueueOrTopicName { get; set; }
    }

    public CqrsDispatcher(
        IServiceProvider serviceProvider,
        IQueueService queueService,
        IEventBus eventBus,
        IMessageTracker tracker,
        ILogger<CqrsDispatcher> logger)
    {
        _serviceProvider = serviceProvider;
        _queueService = queueService;
        _eventBus = eventBus;
        _tracker = tracker;
        _logger = logger;
    }

    public async Task SendAsync<TCommand>(TCommand command, bool useMemoryMode = false) where TCommand : IBaseCommand
    {
        if (useMemoryMode)
        {
            await _tracker.TrackAsync(command.TrackingId, "Dispatcher", "Memory Mode: Start");
            using var scope = _serviceProvider.CreateScope();
            var handler = scope.ServiceProvider.GetRequiredService<ICommandHandler<TCommand>>();
            await handler.HandleAsync(command);
            await _tracker.TrackAsync(command.TrackingId, "Dispatcher", "Memory Mode: End");
        }
        else
        {
            var queueName = CqrsExtensions.GetQueueNameFromCommand(command.GetType())!;
            await _tracker.TrackAsync(command.TrackingId, "Dispatcher", $"Enqueue to {queueName}");
            await _tracker.IncrementStatAsync($"command:{typeof(TCommand).Name}");
            await _tracker.IncrementStatAsync("commands_processed");
            await _tracker.IncrementStatAsync($"sent:{queueName}");
            await _queueService.EnqueueAsync(queueName, command);
        }
    }

    public async Task PublishAsync<TEvent>(TEvent @event, bool useMemoryMode = false) where TEvent : IBaseEvent
    {
        if (useMemoryMode)
        {
            using var scope = _serviceProvider.CreateScope();
            var handlers = scope.ServiceProvider.GetServices<IEventHandler<TEvent>>();
            foreach (var handler in handlers)
            {
                await handler.HandleAsync(@event);
            }
        }
        else
        {
            var topic = CqrsExtensions.GetTopicNameFromEvent(@event.GetType())!;
            await _tracker.TrackAsync(@event.TrackingId, "Dispatcher", $"Publishing to topic: {topic}");
            await _tracker.IncrementStatAsync($"event:{topic}");
            await _tracker.IncrementStatAsync("events_published");
            await _tracker.IncrementStatAsync($"sent:topic:{topic}");
            await _eventBus.PublishAsync(topic, @event);
        }
    }

    public Task RegisterCommandHandlerAsync<TCommand, THandler>(string? queueName = null)
        where TCommand : IBaseCommand
        where THandler : ICommandHandler<TCommand>
    {
        var qName = queueName ?? CqrsExtensions.GetQueueNameFromCommand(typeof(TCommand))!;
        var workerId = $"CommandWorker:{qName}";

        if (_workers.TryGetValue(workerId, out var existing))
        {
            if (existing.Type != "Command")
                throw new InvalidOperationException($"Worker {workerId} is already registered as {existing.Type}");
            
            _logger.LogWarning("Worker {WorkerId} is already registered. Overwriting.", workerId);
        }

        Func<CancellationToken, Task> startFunc = async (ct) =>
        {
            var processingQueue = $"{qName}:processing";
            
            // Initial recovery
            await _queueService.RecoverProcessingQueueAsync(qName, processingQueue);

            while (!ct.IsCancellationRequested)
            {
                try
                {
                    var command = await _queueService.DequeueReliableAsync<TCommand>(qName, processingQueue);
                    if (command != null)
                    {
                        var json = JsonSerializer.Serialize(command);
                        try
                        {
                            await _tracker.TrackAsync(command.TrackingId, "Worker", $"Dequeued from {qName}");
                            using var scope = _serviceProvider.CreateScope();
                            var handler = scope.ServiceProvider.GetRequiredService<THandler>();
                            await handler.HandleAsync(command);
                            await _tracker.TrackAsync(command.TrackingId, "Worker", $"Handled by {typeof(THandler).Name}");
                            
                            await _queueService.AckReliableAsync(processingQueue, json);
                        }
                        catch (Exception ex)
                        {
                            _logger.LogError(ex, "Error handling command {TrackingId} in queue {Queue}. Moving to DLQ.", command.TrackingId, qName);
                            await _tracker.TrackAsync(command.TrackingId, "Worker", $"Error: {ex.Message}. Moving to DLQ.");
                            await _tracker.IncrementStatAsync($"error:{qName}");
                            await _tracker.IncrementStatAsync("errors_total");
                            
                            // Move to dead letter queue with metadata
                            var deadLetter = new
                            {
                                _original = command,
                                _error = ex.Message,
                                _failedAt = DateTime.UtcNow,
                                _queue = qName,
                                _workerId = workerId,
                                _exceptionType = ex.GetType().Name
                            };
                            await _queueService.EnqueueAsync($"{qName}:dead", deadLetter);
                            await _queueService.AckReliableAsync(processingQueue, json);
                        }
                    }
                    else
                    {
                        await Task.Delay(100, ct);
                    }
                }
                catch (OperationCanceledException) { break; }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Critical error in command worker loop for queue {Queue}", qName);
                    await Task.Delay(1000, ct);
                }
            }
        };

        var workerInfo = new WorkerInfo
        {
            WorkerId = workerId,
            Type = "Command",
            StartFunc = startFunc,
            MessageName = typeof(TCommand).Name,
            HandlerName = typeof(THandler).Name,
            QueueOrTopicName = qName
        };

        _workers[workerId] = workerInfo;
        return StartWorkerAsync(workerId);
    }

    public async Task RegisterEventHandlerAsync<TEvent, THandler>(string topic, string subscriberName)
        where TEvent : IBaseEvent
        where THandler : IEventHandler<TEvent>
    {
        var workerId = $"EventWorker:{topic}:{subscriberName}";
        
        if (_workers.TryGetValue(workerId, out var existing))
        {
            _logger.LogWarning("Event Worker {WorkerId} is already registered. Overwriting.", workerId);
        }
        
        // This is tricky because SubscribeAsync in RedisService already starts a Task.Run.
        // For management, we should move that logic here or make it controllable.
        // For now, let's just wrap it.

        Func<CancellationToken, Task> startFunc = async (ct) =>
        {
            await _eventBus.SubscribeAsync<TEvent>(topic, subscriberName, async @event =>
            {
                if (ct.IsCancellationRequested) return;
                var json = JsonSerializer.Serialize(@event);
                try 
                {
                    await _tracker.TrackAsync(@event.TrackingId, "Worker", $"Event received: {topic}:{subscriberName}");
                    using var scope = _serviceProvider.CreateScope();
                    var handler = scope.ServiceProvider.GetRequiredService<THandler>();
                    await handler.HandleAsync(@event);
                    await _tracker.TrackAsync(@event.TrackingId, "Worker", $"Event handled by {typeof(THandler).Name}");
                }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Error handling event {TrackingId} in {Topic}:{Subscriber}. Moving to DLQ.", @event.TrackingId, topic, subscriberName);
                        await _tracker.TrackAsync(@event.TrackingId, "Worker", $"Error: {ex.Message}. Moving to DLQ.");
                        await _tracker.IncrementStatAsync($"error:event:{topic}:{subscriberName}");
                        await _tracker.IncrementStatAsync("errors_total");
                        
                        // Move to dead letter queue with metadata
                        var deadLetter = new
                        {
                            _original = @event,
                            _error = ex.Message,
                            _failedAt = DateTime.UtcNow,
                            _topic = topic,
                            _subscriber = subscriberName,
                            _workerId = workerId,
                            _exceptionType = ex.GetType().Name
                        };
                        var deadQueue = $"sub_queue:{topic}:{subscriberName}:dead";
                        await _queueService.EnqueueAsync(deadQueue, deadLetter);
                    }
            });
            
            // Wait until cancelled
            await Task.Delay(-1, ct);
        };

        var workerInfo = new WorkerInfo
        {
            WorkerId = workerId,
            Type = "Event",
            StartFunc = startFunc,
            MessageName = typeof(TEvent).Name,
            HandlerName = typeof(THandler).Name,
            QueueOrTopicName = topic
        };

        _workers[workerId] = workerInfo;
        await StartWorkerAsync(workerId);
    }

    public Task StartWorkerAsync(string workerId)
    {
        if (_workers.TryGetValue(workerId, out var worker) && !worker.IsRunning)
        {
            worker.Cts = new CancellationTokenSource();
            worker.IsRunning = true;
            _ = Task.Run(() => worker.StartFunc!(worker.Cts.Token), worker.Cts.Token);
            _logger.LogInformation("Started worker: {WorkerId}", workerId);
        }
        return Task.CompletedTask;
    }

    public Task StopWorkerAsync(string workerId)
    {
        if (_workers.TryGetValue(workerId, out var worker) && worker.IsRunning)
        {
            worker.Cts?.Cancel();
            worker.IsRunning = false;
            _logger.LogInformation("Stopped worker: {WorkerId}", workerId);
        }
        return Task.CompletedTask;
    }

    public List<WorkerStatusDto> GetWorkerStatus()
    {
        return _workers.Values.Select(w => new WorkerStatusDto
        {
            Id = w.WorkerId,
            Type = w.Type,
            Status = w.IsRunning ? "Running" : "Stopped",
            MessageName = w.MessageName,
            HandlerName = w.HandlerName,
            QueueOrTopicName = w.QueueOrTopicName
        }).ToList();
    }

    public async Task<Dictionary<string, long>> GetStatisticsAsync()
    {
        return await _tracker.GetStatsAsync();
    }

    public async Task RetryCommandAsync(string queueName, string messageJson)
    {
        var deadQueue = queueName.EndsWith(":dead") ? queueName : $"{queueName}:dead";
        await _queueService.RemoveFromListAsync(deadQueue, messageJson);
        
        using var doc = JsonDocument.Parse(messageJson);
        if (doc.RootElement.TryGetProperty("_original", out var original))
        {
            await _queueService.EnqueueAsync(queueName.Replace(":dead", ""), original);
        }
        else
        {
            // Deserialize to dynamic/object to re-enqueue (legacy format)
            var obj = JsonSerializer.Deserialize<JsonElement>(messageJson);
            await _queueService.EnqueueAsync(queueName.Replace(":dead", ""), obj);
        }
        
        _logger.LogInformation("Retried message for queue {Queue}", queueName);
    }
}
