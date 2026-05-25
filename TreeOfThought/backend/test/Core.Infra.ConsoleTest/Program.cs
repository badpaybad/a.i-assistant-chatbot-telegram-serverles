using Core.Infra.Base.Interfaces;
using Core.Infra.Base.Models;
using Core.Infra.Base.Utils;
using Core.Infra.Cqrs.Dispatchers;
using Core.Infra.Cqrs.Extensions;
using Core.Infra.Cqrs.Services;
using Core.Infra.Redis.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Core.Infra.ConsoleTest;

// 1. Sample Command
public class SampleCommand : IBaseCommand
{
    public Guid TrackingId { get; set; } = Guid.NewGuid();
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    public string? UserId { get; set; } = "TestUser";
    public string QueueName => "sample_command_queue";
    public string Data { get; set; } = "Hello Command";
}

public class SampleCommandHandler : ICommandHandler<SampleCommand>
{
    private readonly ILogger<SampleCommandHandler> _logger;
    private readonly IDispatcher _dispatcher;

    public SampleCommandHandler(ILogger<SampleCommandHandler> logger, IDispatcher dispatcher)
    {
        _logger = logger;
        _dispatcher = dispatcher;
    }

    public async Task HandleAsync(SampleCommand command)
    {
        _logger.LogInformation(">>> Xử lý command: {Data} | TrackingId: {Id}", command.Data, command.TrackingId);
        
        // Publish event to demonstrate link
        var evt = new SampleEvent { 
            TrackingId = command.TrackingId, // Keep same tracking ID
            Message = $"Processed: {command.Data}" 
        };
        await _dispatcher.PublishAsync(evt);
    }
}

// 2. Sample Event
public class SampleEvent : IBaseEvent
{
    public Guid TrackingId { get; set; } = Guid.NewGuid();
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    public string? UserId { get; set; } = "TestUser";
    public string TopicName => "sample_topic";
    public string Message { get; set; } = "Hello Event";
}

public class SampleEventHandler : IEventHandler<SampleEvent>
{
    private readonly ILogger<SampleEventHandler> _logger;
    public SampleEventHandler(ILogger<SampleEventHandler> logger) => _logger = logger;

    public Task HandleAsync(SampleEvent @event)
    {
        _logger.LogInformation(">>> Xử lý event: {Message} | TrackingId: {Id}", @event.Message, @event.TrackingId);
        return Task.CompletedTask;
    }
}

class Program
{
    static async Task Main(string[] args)
    {
        var redisConn = "127.0.0.1:6379,password=Test123456,abortConnect=false";
        Console.WriteLine($"Connecting to Redis: {redisConn}");
        var redis = StackExchange.Redis.ConnectionMultiplexer.Connect(redisConn);
        var db = redis.GetDatabase();

        var topics = new[] { "FolderCreatedEvent", "FilePermissionSetEvent" };
        foreach (var t in topics)
        {
            var key = $"topic_subs:{t}";
            var members = await db.SetMembersAsync(key);
            Console.WriteLine($"\n[TOPIC SUBS] Key: {key}");
            foreach (var m in members)
            {
                Console.WriteLine($"  - Member: {m}");
            }
        }
    }
}
