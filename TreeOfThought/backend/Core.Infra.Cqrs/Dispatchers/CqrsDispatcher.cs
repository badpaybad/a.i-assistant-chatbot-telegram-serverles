using Core.Infra.Base.Interfaces;
using Core.Infra.Base.Constants;
using Core.Infra.Base.Utils;
using Core.Infra.Cqrs.Extensions;
using Core.Infra.Cqrs.Services;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Infra.Cqrs.Dispatchers;

public class CqrsDispatcher : IDispatcher
{
    private readonly IServiceProvider _serviceProvider;
    private readonly IQueueService _queueService;
    private readonly IEventBus _eventBus;
    private readonly ILogger<CqrsDispatcher> _logger;
    private readonly IMessageTracker _tracker;

    private readonly ConcurrentDictionary<string, WorkerInfo> _workers = new();
    private readonly ConcurrentBag<HandlerRegistrationDto> _registrations = new();
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

    private string? ResolveSourceComponent()
    {
        try
        {
            var stackTrace = new System.Diagnostics.StackTrace();
            var frames = stackTrace.GetFrames();
            if (frames == null) return null;

            foreach (var frame in frames)
            {
                var method = frame.GetMethod();
                var type = method?.DeclaringType;
                if (type == null) continue;

                // Skip system and CQRS base infrastructure namespaces
                if (type.Assembly.FullName?.StartsWith("System") == true ||
                    type.Assembly.FullName?.StartsWith("Microsoft") == true ||
                    type.FullName?.StartsWith("Core.Infra.Cqrs") == true)
                {
                    continue;
                }

                // Unwrap nested compiler-generated async state machines to find original controller/handler
                while (type != null && 
                       (type.Name.StartsWith("<") || 
                        type.CustomAttributes.Any(a => a.AttributeType.Name == "CompilerGeneratedAttribute")))
                {
                    type = type.DeclaringType;
                }

                if (type == null) continue;

                // Re-verify after unwrapping
                if (type.Assembly.FullName?.StartsWith("System") == true ||
                    type.Assembly.FullName?.StartsWith("Microsoft") == true ||
                    type.FullName?.StartsWith("Core.Infra.Cqrs") == true)
                {
                    continue;
                }

                return type.FullName;
            }
        }
        catch
        {
            // Graceful fallback
        }
        return null;
    }

    /// <summary>
    /// enqueue 
    /// </summary>
    /// <typeparam name="TCommand"></typeparam>
    /// <param name="command"></param>
    /// <param name="useMemoryMode"></param>
    /// <returns></returns>
    public async Task SendAsync<TCommand>(TCommand command, bool useMemoryMode = false) where TCommand : IBaseCommand
    {
        var sourceComponent = ResolveSourceComponent();

        var queueName = command.QueueName ?? CqrsExtensions.GetQueueNameFromCommand(command.GetType())!;
        if (string.IsNullOrEmpty(queueName)) queueName = command.GetType().FullName!;

        _allQueues.Add(queueName);
        await _tracker.UpdateLastActiveAsync(queueName);

        // 1. Resolve/Propagate Tracking ID and IsRoot status
        bool isRoot = false;
        if (command.TrackingId == Guid.Empty)
        {
            command.TrackingId = CqrsTrackerContext.CurrentTrackingId != Guid.Empty
                ? CqrsTrackerContext.CurrentTrackingId
                : Guid.NewGuid();
        }
        if (CqrsTrackerContext.CurrentTrackingId == Guid.Empty)
        {
            isRoot = true;
        }

        if (command.Timestamp == default)
        {
            command.Timestamp = DateTime.UtcNow;
        }

        var json = JsonSerializer.Serialize(command, CqrsJsonOptions.Default);
        var dbLogger = _serviceProvider.GetService<CqrsDbLogger>();

        // 2. Redis Telemetry: Total counters
        await _tracker.IncrementStatAsync("total:all");
        await _tracker.IncrementStatAsync($"total:{queueName}");

        if (dbLogger != null)
        {
            await dbLogger.LogAsync(
                command.TrackingId,
                command.GetType().FullName ?? command.GetType().Name,
                json,
                queueName,
                subscriberName: null,
                destinationQueueName: queueName,
                sourceComponent: sourceComponent,
                handlerName: null,
                workerId: null,
                step: "Sending",
                status: "Sending",
                isRoot: isRoot
            );
        }

        await _tracker.TrackAsync(new TrackingEntry
        {
            TrackingId = command.TrackingId,
            Step = "Sending",
            Details = $"Sending command to {queueName}. Source: {sourceComponent}",
            MessageContent = json,
            QueueOrTopicName = queueName,
            HandlerOrEventName = command.GetType().FullName,
            Status = "Sending"
        });

        if (useMemoryMode)
        {
            _logger.LogInformation("[CQRS Dispatcher] [SendAsync (Memory Mode)] TrackingId: {TrackingId}, Command: {Type}, Queue: {Queue}, Source: {Source}",
                command.TrackingId, command.GetType().FullName, queueName, sourceComponent);

            using var scope = _serviceProvider.CreateScope();
            var handler = scope.ServiceProvider.GetRequiredService<ICommandHandler<TCommand>>();
            var handlerName = handler.GetType().FullName ?? handler.GetType().Name;

            // Set active async context
            var originalTrackingId = CqrsTrackerContext.CurrentTrackingId;
            CqrsTrackerContext.CurrentTrackingId = command.TrackingId;

            // Active processing telemetry updates
            await _tracker.IncrementStatAsync("total:processing");
            await _tracker.IncrementStatAsync($"processing:{queueName}");

            if (dbLogger != null)
            {
                await dbLogger.LogAsync(
                    command.TrackingId,
                    command.GetType().FullName ?? command.GetType().Name,
                    json,
                    queueName,
                    subscriberName: null,
                    destinationQueueName: queueName,
                    sourceComponent: sourceComponent,
                    handlerName: handlerName,
                    workerId: "InMemoryWorker",
                    step: "Processing",
                    status: "Processing"
                );
            }

            await _tracker.TrackAsync(new TrackingEntry
            {
                TrackingId = command.TrackingId,
                Step = "Processing",
                Details = $"Memory Mode: Processing command. Handler: {handlerName}",
                MessageContent = json,
                QueueOrTopicName = queueName,
                HandlerOrEventName = command.GetType().FullName,
                Status = "Processing"
            });

            try
            {
                await handler.HandleAsync(command);

                // Success stats
                await _tracker.IncrementStatAsync("total:success");
                await _tracker.IncrementStatAsync($"success:{queueName}");
                await _tracker.DecrementStatAsync("total:processing");
                await _tracker.DecrementStatAsync($"processing:{queueName}");

                if (dbLogger != null)
                {
                    await dbLogger.LogAsync(
                        command.TrackingId,
                        command.GetType().FullName ?? command.GetType().Name,
                        json,
                        queueName,
                        subscriberName: null,
                        destinationQueueName: queueName,
                        sourceComponent: sourceComponent,
                        handlerName: handlerName,
                        workerId: "InMemoryWorker",
                        step: "Success",
                        status: "Success"
                    );
                }

                await _tracker.TrackAsync(new TrackingEntry
                {
                    TrackingId = command.TrackingId,
                    Step = "Success",
                    Details = $"Memory Mode: Handled successfully. Handler: {handlerName}",
                    Status = "Success"
                });

                if (dbLogger != null)
                {
                    await dbLogger.LogAsync(
                        command.TrackingId,
                        command.GetType().FullName ?? command.GetType().Name,
                        json,
                        queueName,
                        subscriberName: null,
                        destinationQueueName: queueName,
                        sourceComponent: sourceComponent,
                        handlerName: null,
                        workerId: null,
                        step: "Sent",
                        status: "Sent"
                    );
                }

                await _tracker.TrackAsync(new TrackingEntry
                {
                    TrackingId = command.TrackingId,
                    Step = "Sent",
                    Details = $"Memory Mode: Completed. Command sent and executed.",
                    Status = "Sent"
                });

                _logger.LogInformation("[CQRS Dispatcher] [Success (Memory Mode)] TrackingId: {TrackingId}, Command: {Type}, Handler: {Handler}",
                    command.TrackingId, command.GetType().FullName, handlerName);
            }
            catch (Exception ex)
            {
                // Error stats
                await _tracker.IncrementStatAsync("total:error");
                await _tracker.IncrementStatAsync($"error:{queueName}");
                await _tracker.DecrementStatAsync("total:processing");
                await _tracker.DecrementStatAsync($"processing:{queueName}");

                if (dbLogger != null)
                {
                    await dbLogger.LogAsync(
                        command.TrackingId,
                        command.GetType().FullName ?? command.GetType().Name,
                        json,
                        queueName,
                        subscriberName: null,
                        destinationQueueName: queueName,
                        sourceComponent: sourceComponent,
                        handlerName: handlerName,
                        workerId: "InMemoryWorker",
                        step: "Error",
                        status: "Error",
                        errorMessage: ex.Message
                    );
                }

                await _tracker.TrackAsync(new TrackingEntry
                {
                    TrackingId = command.TrackingId,
                    Step = "Error",
                    Details = $"Memory Mode: Failure (Error: {ex.Message}). Handler: {handlerName}",
                    Status = "Error"
                });

                _logger.LogError(ex, "[CQRS Dispatcher] [Error (Memory Mode)] TrackingId: {TrackingId}, Command: {Type}, Handler: {Handler} failed.",
                    command.TrackingId, command.GetType().FullName, handlerName);

                throw;
            }
            finally
            {
                CqrsTrackerContext.CurrentTrackingId = originalTrackingId;
            }
        }
        else
        {
            // Queue mode
            if (dbLogger != null)
            {
                await dbLogger.LogAsync(
                    command.TrackingId,
                    command.GetType().FullName ?? command.GetType().Name,
                    json,
                    queueName,
                    subscriberName: null,
                    destinationQueueName: queueName,
                    sourceComponent: sourceComponent,
                    handlerName: null,
                    workerId: null,
                    step: "Sent",
                    status: "Sent",
                    isRoot: false
                );
            }

            await _tracker.TrackAsync(new TrackingEntry
            {
                TrackingId = command.TrackingId,
                Step = "Sent",
                Details = $"Enqueued to {queueName} (Priority). Source: {sourceComponent}",
                MessageContent = json,
                QueueOrTopicName = queueName,
                HandlerOrEventName = command.GetType().FullName,
                Status = "Sent"
            });

            _logger.LogInformation("[CQRS Dispatcher] [SendAsync (Queue Mode)] TrackingId: {TrackingId}, Command: {Type}, Queue: {Queue}, Source: {Source}",
                command.TrackingId, command.GetType().FullName, queueName, sourceComponent);

            await _tracker.IncrementStatAsync($"total:{queueName}");
            await _tracker.IncrementStatAsync("commands_total");

            // Use Ticks for priority
            await _queueService.EnqueuePriorityAsync(queueName, command, DateTime.UtcNow.Ticks);
        }
    }

    /// <summary>
    /// publish 
    /// </summary>
    /// <typeparam name="TEvent"></typeparam>
    /// <param name="event"></param>
    /// <param name="useMemoryMode"></param>
    /// <returns></returns>
    public async Task PublishAsync<TEvent>(TEvent @event, bool useMemoryMode = false) where TEvent : IBaseEvent
    {
        var sourceComponent = ResolveSourceComponent();

        var topic = @event.TopicName ?? CqrsExtensions.GetTopicNameFromEvent(@event.GetType())!;
        if (string.IsNullOrEmpty(topic)) topic = @event.GetType().FullName!;

        _allTopics.Add(topic);
        await _tracker.UpdateLastActiveAsync(topic);

        // 1. Resolve/Propagate Tracking ID and IsRoot status
        bool isRoot = false;
        if (@event.TrackingId == Guid.Empty)
        {
            @event.TrackingId = CqrsTrackerContext.CurrentTrackingId != Guid.Empty
                ? CqrsTrackerContext.CurrentTrackingId
                : Guid.NewGuid();
        }
        if (CqrsTrackerContext.CurrentTrackingId == Guid.Empty)
        {
            isRoot = true;
        }

        if (@event.Timestamp == default)
        {
            @event.Timestamp = DateTime.UtcNow;
        }

        var json = JsonSerializer.Serialize(@event, CqrsJsonOptions.Default);
        var dbLogger = _serviceProvider.GetService<CqrsDbLogger>();

        // 2. Redis Telemetry: Total counters
        await _tracker.IncrementStatAsync("total:all");
        await _tracker.IncrementStatAsync($"total:topic:{topic}");

        if (dbLogger != null)
        {
            await dbLogger.LogAsync(
                @event.TrackingId,
                @event.GetType().FullName ?? @event.GetType().Name,
                json,
                topic,
                subscriberName: null,
                destinationQueueName: null,
                sourceComponent: sourceComponent,
                handlerName: null,
                workerId: null,
                step: "Publishing",
                status: "Publishing",
                isRoot: isRoot
            );
        }

        await _tracker.TrackAsync(new TrackingEntry
        {
            TrackingId = @event.TrackingId,
            Step = "Publishing",
            Details = $"Publishing event to topic {topic}. Source: {sourceComponent}",
            MessageContent = json,
            QueueOrTopicName = topic,
            HandlerOrEventName = @event.GetType().FullName,
            Status = "Publishing"
        });

        if (useMemoryMode)
        {
            _logger.LogInformation("[CQRS Dispatcher] [PublishAsync (Memory Mode)] TrackingId: {TrackingId}, Event: {Type}, Topic: {Topic}, Source: {Source}",
                @event.TrackingId, @event.GetType().FullName, topic, sourceComponent);

            using var scope = _serviceProvider.CreateScope();
            var handlers = scope.ServiceProvider.GetServices<IEventHandler<TEvent>>();
            foreach (var handler in handlers)
            {
                var handlerName = handler.GetType().FullName ?? handler.GetType().Name;

                // Set active context
                var originalTrackingId = CqrsTrackerContext.CurrentTrackingId;
                CqrsTrackerContext.CurrentTrackingId = @event.TrackingId;

                await _tracker.IncrementStatAsync("total:processing");
                await _tracker.IncrementStatAsync($"processing:topic:{topic}");

                if (dbLogger != null)
                {
                    await dbLogger.LogAsync(
                        @event.TrackingId,
                        @event.GetType().FullName ?? @event.GetType().Name,
                        json,
                        topic,
                        subscriberName: handler.GetType().Name,
                        destinationQueueName: topic,
                        sourceComponent: sourceComponent,
                        handlerName: handlerName,
                        workerId: "InMemoryWorker",
                        step: "Processing",
                        status: "Processing"
                    );
                }

                try
                {
                    await handler.HandleAsync(@event);

                    await _tracker.IncrementStatAsync("total:success");
                    await _tracker.IncrementStatAsync($"success:topic:{topic}");
                    await _tracker.DecrementStatAsync("total:processing");
                    await _tracker.DecrementStatAsync($"processing:topic:{topic}");

                    if (dbLogger != null)
                    {
                        await dbLogger.LogAsync(
                            @event.TrackingId,
                            @event.GetType().FullName ?? @event.GetType().Name,
                            json,
                            topic,
                            subscriberName: handler.GetType().Name,
                            destinationQueueName: topic,
                            sourceComponent: sourceComponent,
                            handlerName: handlerName,
                            workerId: "InMemoryWorker",
                            step: "Success",
                            status: "Success"
                        );
                    }

                    _logger.LogInformation("[CQRS Dispatcher] [Success (Memory Mode)] TrackingId: {TrackingId}, Event: {Type}, Handler: {Handler}",
                        @event.TrackingId, @event.GetType().FullName, handlerName);
                }
                catch (Exception ex)
                {
                    await _tracker.IncrementStatAsync("total:error");
                    await _tracker.IncrementStatAsync($"error:topic:{topic}");
                    await _tracker.DecrementStatAsync("total:processing");
                    await _tracker.DecrementStatAsync($"processing:topic:{topic}");

                    if (dbLogger != null)
                    {
                        await dbLogger.LogAsync(
                            @event.TrackingId,
                            @event.GetType().FullName ?? @event.GetType().Name,
                            json,
                            topic,
                            subscriberName: handler.GetType().Name,
                            destinationQueueName: topic,
                            sourceComponent: sourceComponent,
                            handlerName: handlerName,
                            workerId: "InMemoryWorker",
                            step: "Error",
                            status: "Error",
                            errorMessage: ex.Message
                        );
                    }

                    _logger.LogError(ex, "[CQRS Dispatcher] [Error (Memory Mode)] TrackingId: {TrackingId}, Event: {Type}, Handler: {Handler} failed.",
                        @event.TrackingId, @event.GetType().FullName, handlerName);

                    throw;
                }
                finally
                {
                    CqrsTrackerContext.CurrentTrackingId = originalTrackingId;
                }
            }

            if (dbLogger != null)
            {
                await dbLogger.LogAsync(
                    @event.TrackingId,
                    @event.GetType().FullName ?? @event.GetType().Name,
                    json,
                    topic,
                    subscriberName: null,
                    destinationQueueName: null,
                    sourceComponent: sourceComponent,
                    handlerName: null,
                    workerId: null,
                    step: "Published",
                    status: "Published"
                );
            }

            await _tracker.TrackAsync(new TrackingEntry
            {
                TrackingId = @event.TrackingId,
                Step = "Published",
                Details = "Memory Mode: Published event successfully.",
                Status = "Published"
            });
        }
        else
        {
            // Queue mode
            _logger.LogInformation("[CQRS Dispatcher] [PublishAsync (Queue Mode)] TrackingId: {TrackingId}, Event: {Type}, Topic: {Topic}, Source: {Source}",
                @event.TrackingId, @event.GetType().FullName, topic, sourceComponent);

            await _tracker.IncrementStatAsync($"total:topic:{topic}");
            await _tracker.IncrementStatAsync("events_total");

            // Self-healing: Ensure local subscribers are registered in Redis (in case of Redis restart/flush)
            if (_topicSubscribers.TryGetValue(topic, out var localSubs))
            {
                foreach (var sub in localSubs)
                {
                    await _queueService.SetAddAsync(CqrsConstants.GetTopicSubsKey(topic), sub);
                }
            }

            // Enqueue to each subscriber and track
            var subscribers = await _queueService.GetSetMembersAsync(CqrsConstants.GetTopicSubsKey(topic));
            long priority = DateTime.UtcNow.Ticks;

            foreach (var sub in subscribers)
            {
                var subQueue = CqrsConstants.GetSubQueueKey(topic, sub);
                await _queueService.EnqueuePriorityAsync(subQueue, @event, priority);

                if (dbLogger != null)
                {
                    await dbLogger.LogAsync(
                        @event.TrackingId,
                        @event.GetType().FullName ?? @event.GetType().Name,
                        json,
                        topic,
                        subscriberName: sub,
                        destinationQueueName: subQueue,
                        sourceComponent: sourceComponent,
                        handlerName: null,
                        workerId: null,
                        step: "Subscribe",
                        status: "Pending"
                    );
                }

                await _tracker.TrackAsync(new TrackingEntry
                {
                    TrackingId = @event.TrackingId,
                    Step = "Subscribe",
                    Details = $"Enqueued to subscriber: {sub} ({subQueue})",
                    QueueOrTopicName = subQueue,
                    HandlerOrEventName = @event.GetType().FullName,
                    Status = CqrsConstants.StatusPending,
                    MessageContent = json
                });
            }

            // Trigger signal
            await _eventBus.PublishAsync(topic, "new_event");

            if (dbLogger != null)
            {
                await dbLogger.LogAsync(
                    @event.TrackingId,
                    @event.GetType().FullName ?? @event.GetType().Name,
                    json,
                    topic,
                    subscriberName: null,
                    destinationQueueName: null,
                    sourceComponent: sourceComponent,
                    handlerName: null,
                    workerId: null,
                    step: "Published",
                    status: "Published"
                );
            }

            await _tracker.TrackAsync(new TrackingEntry
            {
                TrackingId = @event.TrackingId,
                Step = "Published",
                Details = $"Published event to topic: {topic}",
                Status = "Published"
            });
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
                var dequeued = await _queueService.DequeuePriorityAsync<TMessage>(queueName, processingQueueName);
                if (dequeued != null)
                {
                    var message = dequeued.Value;
                    var json = dequeued.RawJson;
                    var dbLogger = _serviceProvider.GetService<CqrsDbLogger>();

                    string? subName = null;
                    if (trackingTargetName != queueName)
                    {
                        var parts = queueName.Split(':');
                        if (parts.Length > 0)
                        {
                            subName = parts[parts.Length - 1];
                        }
                    }

                    try
                    {
                        // Update last active for the specific subscriber queue
                        await _tracker.UpdateLastActiveAsync(queueName);
                        if (trackingTargetName != queueName)
                            await _tracker.UpdateLastActiveAsync(trackingTargetName);

                        // Increment active processing counters
                        await _tracker.IncrementStatAsync("total:processing");
                        await _tracker.IncrementStatAsync($"processing:{queueName}");
                        if (trackingTargetName != queueName)
                            await _tracker.IncrementStatAsync($"processing:topic:{trackingTargetName}");

                        // PostgreSQL log: Dequeue milestone
                        if (dbLogger != null)
                        {
                            await dbLogger.LogAsync(
                                message.TrackingId,
                                message.GetType().FullName ?? message.GetType().Name,
                                json,
                                queueName,
                                subscriberName: subName,
                                destinationQueueName: queueName,
                                sourceComponent: null,
                                handlerName: handlerName,
                                workerId: workerId,
                                step: "Processing",
                                status: "Processing"
                            );
                        }

                        // Tracking Point 2: Dequeue (Before Invoke)
                        await _tracker.TrackAsync(new TrackingEntry
                        {
                            TrackingId = message.TrackingId,
                            Step = "Processing",
                            Details = $"Processing message from {queueName}. Worker: {workerId}. Handler: {handlerName}",
                            MessageContent = json,
                            QueueOrTopicName = queueName,
                            WorkerName = workerId,
                            HandlerOrEventName = message.GetType().FullName,
                            Status = "Processing"
                        });

                        _logger.LogInformation("[CQRS Worker] [Processing] TrackingId: {TrackingId}, Message: {Type}, Queue: {Queue}, Worker: {Worker}, Handler: {Handler}",
                            message.TrackingId, message.GetType().FullName, queueName, workerId, handlerName);

                        // Execute within context
                        var originalTrackingId = CqrsTrackerContext.CurrentTrackingId;
                        CqrsTrackerContext.CurrentTrackingId = message.TrackingId;
                        try
                        {
                            using (var scope = _serviceProvider.CreateScope())
                            {
                                await handlerInvoker(scope.ServiceProvider, message);
                            }
                        }
                        finally
                        {
                            CqrsTrackerContext.CurrentTrackingId = originalTrackingId;
                        }

                        // Success stats update
                        await _tracker.IncrementStatAsync("total:success");
                        await _tracker.IncrementStatAsync($"success:{queueName}");
                        if (trackingTargetName != queueName)
                            await _tracker.IncrementStatAsync($"success:topic:{trackingTargetName}");

                        await _tracker.DecrementStatAsync("total:processing");
                        await _tracker.DecrementStatAsync($"processing:{queueName}");
                        if (trackingTargetName != queueName)
                            await _tracker.DecrementStatAsync($"processing:topic:{trackingTargetName}");

                        // PostgreSQL log: Success milestone
                        if (dbLogger != null)
                        {
                            await dbLogger.LogAsync(
                                message.TrackingId,
                                message.GetType().FullName ?? message.GetType().Name,
                                json,
                                queueName,
                                subscriberName: subName,
                                destinationQueueName: queueName,
                                sourceComponent: null,
                                handlerName: handlerName,
                                workerId: workerId,
                                step: "Success",
                                status: "Success"
                            );
                        }

                        // Tracking Point 3: Success (After Invoke OK)
                        await _tracker.TrackAsync(new TrackingEntry
                        {
                            TrackingId = message.TrackingId,
                            Step = "Success",
                            Details = $"Handled by {handlerName}",
                            HandlerOrEventName = handlerName,
                            Status = "Success"
                        });

                        _logger.LogInformation("[CQRS Worker] [Success] TrackingId: {TrackingId}, Message: {Type}, Queue: {Queue}, Handler: {Handler} successfully completed.",
                            message.TrackingId, message.GetType().FullName, queueName, handlerName);

                        await _tracker.IncrementStatAsync($"processed:{queueName}");
                        if (trackingTargetName != queueName)
                            await _tracker.IncrementStatAsync($"processed:topic:{trackingTargetName}");

                        await _tracker.IncrementStatAsync("total:processed");
                        await _tracker.LogStatusAsync(queueName, message.TrackingId, CqrsConstants.StatusSuccess);
                        if (trackingTargetName != queueName)
                            await _tracker.LogStatusAsync(trackingTargetName, message.TrackingId, CqrsConstants.StatusSuccess);

                        await _queueService.ZAddAsync(CqrsConstants.GetTrackingKey(CqrsConstants.StatusSuccess, trackingTargetName), message.TrackingId.ToString(), DateTime.UtcNow.Ticks);

                        await _queueService.AckReliableAsync(processingQueueName, json);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "[CQRS Worker] [Error] TrackingId: {TrackingId}, Message: {Type}, Queue: {Queue}, Handler: {Handler} failed with error: {Error}",
                            message.TrackingId, message.GetType().FullName, queueName, handlerName, ex.Message);

                        // Error stats update
                        await _tracker.IncrementStatAsync("total:error");
                        await _tracker.IncrementStatAsync($"error:{queueName}");
                        if (trackingTargetName != queueName)
                            await _tracker.IncrementStatAsync($"error:topic:{trackingTargetName}");

                        await _tracker.DecrementStatAsync("total:processing");
                        await _tracker.DecrementStatAsync($"processing:{queueName}");
                        if (trackingTargetName != queueName)
                            await _tracker.DecrementStatAsync($"processing:topic:{trackingTargetName}");

                        // PostgreSQL log: Error milestone
                        if (dbLogger != null)
                        {
                            await dbLogger.LogAsync(
                                message.TrackingId,
                                message.GetType().FullName ?? message.GetType().Name,
                                json,
                                queueName,
                                subscriberName: subName,
                                destinationQueueName: queueName,
                                sourceComponent: null,
                                handlerName: handlerName,
                                workerId: workerId,
                                step: "Error",
                                status: "Error",
                                errorMessage: ex.Message
                            );
                        }

                        await _tracker.TrackAsync(new TrackingEntry
                        {
                            TrackingId = message.TrackingId,
                            Step = "Error",
                            Details = $"Error in handler {handlerName}: {ex.Message}",
                            HandlerOrEventName = handlerName,
                            Status = "Error"
                        });
                        await _queueService.ZAddAsync(CqrsConstants.GetTrackingKey(CqrsConstants.StatusError, trackingTargetName), message.TrackingId.ToString(), DateTime.UtcNow.Ticks);

                        await _tracker.LogStatusAsync(queueName, message.TrackingId, CqrsConstants.StatusError, ex.Message);
                        if (trackingTargetName != queueName)
                            await _tracker.LogStatusAsync(trackingTargetName, message.TrackingId, CqrsConstants.StatusError, ex.Message);

                        var deadLetter = new { original = message, error = ex.Message, failedAt = DateTime.UtcNow };
                        await _queueService.EnqueueAsync(CqrsConstants.GetDeadLetterKey(queueName), deadLetter);
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
        var workerId = CqrsConstants.GetCommandWorkerId(qName);

        Func<CancellationToken, Task> startFunc = async (ct) =>
        {
            await ProcessMessagesAsync<TCommand>(
                qName,
                CqrsConstants.GetProcessingKey(qName),
                workerId,
                qName,
                async (sp, cmd) => await sp.GetRequiredService<THandler>().HandleAsync(cmd),
                typeof(THandler).FullName ?? typeof(THandler).Name,
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

        var workerId = CqrsConstants.GetEventWorkerId(topic, subscriberName);
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
                        typeof(THandler).FullName ?? typeof(THandler).Name,
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
