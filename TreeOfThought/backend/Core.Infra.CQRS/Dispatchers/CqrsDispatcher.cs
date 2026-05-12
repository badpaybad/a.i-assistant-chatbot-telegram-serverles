using Core.Infra.Base.Interfaces;
using Core.Infra.Base.Constants;
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
    private readonly ConcurrentBag<HandlerRegistrationDto> _registrations = new();
    private readonly ConcurrentDictionary<string, DateTime> _lastActive = new();
    private readonly ConcurrentDictionary<string, HashSet<string>> _topicSubscribers = new();
    private readonly HashSet<string> _allQueues = new();
    private readonly HashSet<string> _allTopics = new();

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
        public string? SubscriberName { get; set; }
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
        var queueName = command.QueueName ?? CqrsExtensions.GetQueueNameFromCommand(command.GetType())!;
        if (string.IsNullOrEmpty(queueName)) queueName = command.GetType().FullName!;

        _allQueues.Add(queueName);
        _lastActive[queueName] = DateTime.UtcNow;

        var json = JsonSerializer.Serialize(command, CqrsJsonOptions.Default);
        if (useMemoryMode)
        {
            await _tracker.TrackAsync(new TrackingEntry { 
                TrackingId = command.TrackingId, 
                Step = "Dispatcher", 
                Details = "Memory Mode: Start",
                MessageContent = json,
                QueueOrTopicName = queueName
            });
            using var scope = _serviceProvider.CreateScope();
            var handler = scope.ServiceProvider.GetRequiredService<ICommandHandler<TCommand>>();
            await handler.HandleAsync(command);
            await _tracker.TrackAsync(new TrackingEntry { 
                TrackingId = command.TrackingId, 
                Step = "Dispatcher", 
                Details = "Memory Mode: End",
                Status = "success"
            });
        }
        else
        {
            await _tracker.TrackAsync(new TrackingEntry { 
                TrackingId = command.TrackingId, 
                Step = "Dispatcher", 
                Details = $"Enqueuing to {queueName} (Priority)",
                MessageContent = json,
                QueueOrTopicName = queueName,
                Status = CqrsConstants.StatusPending
            });

            await _tracker.IncrementStatAsync($"total:{queueName}");
            await _tracker.IncrementStatAsync("commands_total");

            // Use Ticks for priority (Epoch-like)
            await _queueService.EnqueuePriorityAsync(queueName, command, DateTime.UtcNow.Ticks);
        }
    }

    public async Task PublishAsync<TEvent>(TEvent @event, bool useMemoryMode = false) where TEvent : IBaseEvent
    {
        var topic = @event.TopicName ?? CqrsExtensions.GetTopicNameFromEvent(@event.GetType())!;
        if (string.IsNullOrEmpty(topic)) topic = @event.GetType().FullName!;

        _allTopics.Add(topic);
        _lastActive[topic] = DateTime.UtcNow;

        var json = JsonSerializer.Serialize(@event, new JsonSerializerOptions { WriteIndented = true });

        if (useMemoryMode)
        {
            await _tracker.TrackAsync(new TrackingEntry { 
                TrackingId = @event.TrackingId, 
                Step = "Dispatcher", 
                Details = "Memory Mode: Start",
                MessageContent = json,
                QueueOrTopicName = topic
            });
            using var scope = _serviceProvider.CreateScope();
            var handlers = scope.ServiceProvider.GetServices<IEventHandler<TEvent>>();
            foreach (var handler in handlers)
            {
                await handler.HandleAsync(@event);
            }
            await _tracker.TrackAsync(new TrackingEntry { 
                TrackingId = @event.TrackingId, 
                Step = "Dispatcher", 
                Details = "Memory Mode: End",
                Status = "success"
            });
        }
        else
        {
            // Tracking Point 1: Dispatch (Publish)
            await _tracker.TrackAsync(new TrackingEntry { 
                TrackingId = @event.TrackingId, 
                Step = "Dispatcher", 
                Details = $"Publishing to topic: {topic}",
                MessageContent = json,
                QueueOrTopicName = topic,
                Status = CqrsConstants.StatusPending
            });

            await _tracker.IncrementStatAsync($"total:topic:{topic}");
            await _tracker.IncrementStatAsync("events_total");

            // Enqueue to each subscriber and track
            var subscribers = await _queueService.GetSetMembersAsync(CqrsConstants.GetTopicSubsKey(topic));
            long priority = DateTime.UtcNow.Ticks;
            
            foreach (var sub in subscribers)
            {
                var subQueue = CqrsConstants.GetSubQueueKey(topic, sub);
                await _queueService.EnqueuePriorityAsync(subQueue, @event, priority);
                
                await _tracker.TrackAsync(new TrackingEntry {
                    TrackingId = @event.TrackingId,
                    Step = "EventBus",
                    Details = $"Enqueued to subscriber: {sub}",
                    QueueOrTopicName = subQueue,
                    Status = CqrsConstants.StatusPending,
                    MessageContent = json
                });
            }

            // Trigger signal
            await _eventBus.PublishAsync(topic, "new_event");
        }
    }

    private async Task ProcessMessagesAsync<TMessage>(
        string queueName,
        string processingQueueName,
        string workerId,
        string trackingTargetName, // For LogStatus and stats (can be queue name or topic name)
        Func<IServiceProvider, TMessage, Task> handlerInvoker,
        string handlerName,
        CancellationToken ct,
        bool stopWhenEmpty = false)
        where TMessage : IBaseMessage
    {
        await _queueService.RecoverProcessingQueueAsync(queueName, processingQueueName);

        while (!ct.IsCancellationRequested)
        {
            try
            {
                var message = await _queueService.DequeuePriorityAsync<TMessage>(queueName, processingQueueName);
                if (message != null)
                {
                    var json = JsonSerializer.Serialize(message);
                    try
                    {
                        // Tracking Point 2: Dequeue (Before Invoke)
                        await _tracker.TrackAsync(new TrackingEntry { 
                            TrackingId = message.TrackingId, 
                            Step = "Worker", 
                            Details = $"Dequeued from {queueName}",
                            MessageContent = json,
                            QueueOrTopicName = queueName,
                            WorkerName = workerId,
                            Status = "processing"
                        });

                        using (var scope = _serviceProvider.CreateScope())
                        {
                            await handlerInvoker(scope.ServiceProvider, message);
                        }

                        // Tracking Point 3: Success (After Invoke OK)
                        await _tracker.TrackAsync(new TrackingEntry { 
                            TrackingId = message.TrackingId, 
                            Step = "Worker", 
                            Details = $"Handled by {handlerName}",
                            HandlerOrEventName = handlerName,
                            Status = "success"
                        });

                        await _tracker.IncrementStatAsync($"processed:{queueName}");
                        if (trackingTargetName != queueName) 
                            await _tracker.IncrementStatAsync($"processed:topic:{trackingTargetName}");
                        
                        await _tracker.IncrementStatAsync("total:processed");
                        await _tracker.LogStatusAsync(queueName, message.TrackingId, "success");
                        if (trackingTargetName != queueName)
                            await _tracker.LogStatusAsync(trackingTargetName, message.TrackingId, "success");

                        await _queueService.AckReliableAsync(processingQueueName, json);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Error handling message {TrackingId} in {WorkerId}", message.TrackingId, workerId);
                        
                        await _tracker.TrackAsync(new TrackingEntry { 
                            TrackingId = message.TrackingId, 
                            Step = "Worker", 
                            Details = $"Error: {ex.Message}",
                            Status = "error"
                        });

                        await _tracker.IncrementStatAsync($"error:{queueName}");
                        if (trackingTargetName != queueName)
                            await _tracker.IncrementStatAsync($"error:topic:{trackingTargetName}");
                        
                        await _tracker.IncrementStatAsync("total:error");
                        await _tracker.LogStatusAsync(queueName, message.TrackingId, "error", ex.Message);
                        if (trackingTargetName != queueName)
                            await _tracker.LogStatusAsync(trackingTargetName, message.TrackingId, "error", ex.Message);

                        var deadLetter = new { _original = message, _error = ex.Message, _failedAt = DateTime.UtcNow };
                        await _queueService.EnqueueAsync($"{queueName}:dead", deadLetter);
                        await _queueService.AckReliableAsync(processingQueueName, json);
                    }
                }
                else
                {
                    if (stopWhenEmpty) break;
                    await Task.Delay(100, ct);
                }
            }
            catch (OperationCanceledException) { break; }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Critical error in worker loop for {WorkerId}", workerId);
                await Task.Delay(1000, ct);
            }
        }
    }

    public Task RegisterCommandHandlerAsync<TCommand, THandler>(string? queueName = null)
        where TCommand : IBaseCommand
        where THandler : ICommandHandler<TCommand>
    {
        var qName = queueName ?? CqrsExtensions.GetQueueNameFromCommand(typeof(TCommand))!;
        if (string.IsNullOrEmpty(qName)) qName = typeof(TCommand).FullName!;

        _allQueues.Add(qName);
        var workerId = $"CommandWorker:{qName}";

        Func<CancellationToken, Task> startFunc = async (ct) =>
        {
            await ProcessMessagesAsync<TCommand>(
                qName, 
                $"{qName}:processing", 
                workerId, 
                qName,
                async (sp, cmd) => await sp.GetRequiredService<THandler>().HandleAsync(cmd),
                typeof(THandler).Name,
                ct);
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
        
        _registrations.Add(new HandlerRegistrationDto
        {
            MessageName = typeof(TCommand).Name,
            HandlerName = typeof(THandler).Name,
            QueueOrTopicName = qName,
            Type = "Command"
        });

        return StartWorkerAsync(workerId);
    }

    public async Task RegisterEventHandlerAsync<TEvent, THandler>(string topic, string subscriberName)
        where TEvent : IBaseEvent
        where THandler : IEventHandler<TEvent>
    {
        _allTopics.Add(topic);
        if (!_topicSubscribers.ContainsKey(topic)) _topicSubscribers[topic] = new HashSet<string>();
        _topicSubscribers[topic].Add(subscriberName);

        await _queueService.SetAddAsync(CqrsConstants.GetTopicSubsKey(topic), subscriberName);
        
        var workerId = $"EventWorker:{topic}:{subscriberName}";
        var subQueue = CqrsConstants.GetSubQueueKey(topic, subscriberName);
        var processingQueue = CqrsConstants.GetSubProcKey(topic, subscriberName);

        Func<CancellationToken, Task> startFunc = async (ct) =>
        {
            int isRunning = 0;
            Func<Task> drainQueue = async () =>
            {
                if (Interlocked.CompareExchange(ref isRunning, 1, 0) == 1) return;
                try
                {
                    await ProcessMessagesAsync<TEvent>(
                        subQueue, 
                        processingQueue, 
                        workerId, 
                        topic,
                        async (sp, @evt) => await sp.GetRequiredService<THandler>().HandleAsync(@evt),
                        typeof(THandler).Name,
                        ct,
                        stopWhenEmpty: true);
                }
                finally { Interlocked.Exchange(ref isRunning, 0); }
            };

            await drainQueue();
            await _eventBus.SubscribeAsync<TEvent>(topic, subscriberName, async _ => await drainQueue());

            while (!ct.IsCancellationRequested)
            {
                await Task.Delay(5000, ct);
                await drainQueue();
            }
        };

        var workerInfo = new WorkerInfo
        {
            WorkerId = workerId,
            Type = "Event",
            StartFunc = startFunc,
            MessageName = typeof(TEvent).Name,
            HandlerName = typeof(THandler).Name,
            QueueOrTopicName = topic,
            SubscriberName = subscriberName
        };

        _workers[workerId] = workerInfo;

        _registrations.Add(new HandlerRegistrationDto
        {
            MessageName = typeof(TEvent).Name,
            HandlerName = typeof(THandler).Name,
            QueueOrTopicName = topic,
            Type = "Event"
        });

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

    public List<HandlerRegistrationDto> GetHandlerRegistrations()
    {
        return _registrations.ToList();
    }

    public async Task<Dictionary<string, long>> GetStatisticsAsync()
    {
        return await _tracker.GetStatsAsync();
    }

    public List<string> GetAllQueues() => _allQueues.ToList();
    public List<string> GetAllTopics() => _allTopics.ToList();
    public List<string> GetTopicSubscribers(string topic) => 
        _topicSubscribers.TryGetValue(topic, out var subs) ? subs.ToList() : new List<string>();

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
