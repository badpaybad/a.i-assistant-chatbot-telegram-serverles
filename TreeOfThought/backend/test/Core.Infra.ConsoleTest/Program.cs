using Core.Infra.Base.Interfaces;
using Core.Infra.Base.Models;
using Core.Infra.Base.Utils;
using Core.Infra.CQRS.Dispatchers;
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
    public string CommandName => "sample_command_queue";
    public string Data { get; set; } = "Hello Command";
}

public class SampleCommandHandler : ICommandHandler<SampleCommand>
{
    private readonly ILogger<SampleCommandHandler> _logger;
    public SampleCommandHandler(ILogger<SampleCommandHandler> logger) => _logger = logger;

    public Task HandleAsync(SampleCommand command)
    {
        _logger.LogInformation(">>> Xử lý command: {Data} | TrackingId: {Id}", command.Data, command.TrackingId);
        return Task.CompletedTask;
    }
}

// 2. Sample Event
public class SampleEvent : IBaseEvent
{
    public Guid TrackingId { get; set; } = Guid.NewGuid();
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    public string? UserId { get; set; } = "TestUser";
    public string EventName => "sample_topic";
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
        var config = ConfigurationHelper.LoadConfiguration();
        var redisConn = config.GetSection("Redis:ConnectionString").Value ?? "localhost:6379,abortConnect=false";

        var host = Host.CreateDefaultBuilder(args)
            .ConfigureServices((context, services) =>
            {
                services.AddSingleton<RedisService>(sp => new RedisService(redisConn, sp.GetRequiredService<ILogger<RedisService>>()));
                services.AddSingleton<IQueueService>(sp => sp.GetRequiredService<RedisService>());
                services.AddSingleton<IEventBus>(sp => sp.GetRequiredService<RedisService>());
                services.AddSingleton<ICacheService>(sp => sp.GetRequiredService<RedisService>());
                
                services.AddSingleton<IMessageTracker>(sp => new MessageTracker(redisConn));
                services.AddSingleton<IDispatcher, CqrsDispatcher>();
                
                services.AddTransient<SampleCommandHandler>();
                services.AddTransient<SampleEventHandler>();
            })
            .ConfigureLogging(logging =>
            {
                logging.ClearProviders();
                logging.AddConsole();
            })
            .Build();

        var dispatcher = host.Services.GetRequiredService<IDispatcher>();
        var tracker = host.Services.GetRequiredService<IMessageTracker>();

        Console.WriteLine("--- CQRS Simulator Started ---");
        Console.WriteLine($"Redis Connection: {redisConn}");

        try 
        {
            // 3. Register Workers
            await dispatcher.RegisterCommandHandlerAsync<SampleCommand, SampleCommandHandler>("sample_command_queue");
            await dispatcher.RegisterEventHandlerAsync<SampleEvent, SampleEventHandler>("sample_topic", "console_subscriber");

            // 4. Test Command
            Console.WriteLine("\n[COMMAND TEST]");
            var cmd = new SampleCommand { Data = "Message via Queue" };
            Console.WriteLine($"Gửi command ID: {cmd.TrackingId}");
            await dispatcher.SendAsync(cmd);

            // 5. Test Event
            Console.WriteLine("\n[EVENT TEST]");
            var evt = new SampleEvent { Message = "Broadcast via Topic" };
            Console.WriteLine($"Publish event ID: {evt.TrackingId}");
            await dispatcher.PublishAsync(evt);

            // Wait for workers to process
            await Task.Delay(3000);

            // 6. Check Worker Management
            var workerId = "CommandWorker:sample_command_queue";
            Console.WriteLine("\n--- Thử nghiệm Quản lý Worker ---");
            var status = dispatcher.GetWorkerStatus();
            if (status.ContainsKey(workerId))
                Console.WriteLine($"Trạng thái {workerId}: {status[workerId]}");

            // 7. Summary
            Console.WriteLine("\n--- Kết quả Tracking ---");
            var cmdHistory = await tracker.GetTrackingHistoryAsync(cmd.TrackingId);
            Console.WriteLine($"Command History ({cmd.TrackingId}):");
            foreach (var log in cmdHistory) Console.WriteLine($"  {log}");

            var evtHistory = await tracker.GetTrackingHistoryAsync(evt.TrackingId);
            Console.WriteLine($"\nEvent History ({evt.TrackingId}):");
            foreach (var log in evtHistory) Console.WriteLine($"  {log}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"\n[ERROR] Lỗi thực thi simulator: {ex.Message}");
            if (ex.InnerException != null) Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
        }

        Console.WriteLine("\nNhấn phím bất kỳ để kết thúc...");
        if (!Console.IsInputRedirected) Console.ReadKey();
    }
}
