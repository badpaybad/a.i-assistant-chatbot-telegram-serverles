using Core.Infra.Base.Interfaces;
using Core.Infra.Firebase.Services;
using Core.Web.Api.Models;

namespace Core.Web.Api.Handlers;

public class SampleCommandHandler : ICommandHandler<SampleCommand>
{
    private int _counter = 0;
    private readonly ILogger<SampleCommandHandler> _logger;
    private readonly FirebaseService _firebase;
    private readonly IMessageTracker _tracker;

    public SampleCommandHandler(ILogger<SampleCommandHandler> logger, FirebaseService firebase, IMessageTracker tracker)
    {
        _logger = logger;
        _firebase = firebase;
        _tracker = tracker;
    }

    public async Task HandleAsync(SampleCommand command)
    {
        _counter++;
        _logger.LogInformation("SampleCommandHandler handled command: {Payload}. TrackingId: {TrackingId}. Count: {Count}",
            command.Payload, command.TrackingId, _counter);

        // Simulate some processing
        await Task.Delay(1000);

        // Publish result to Firestore for FE tracking
        await _firebase.PublishToAddressPathAsync("Default", $"commandresults/{command.TrackingId}", new
        {
            status = "success",
            message = $"Command processed successfully. Counter: {_counter}",
            timestamp = DateTime.UtcNow
        });
    }
}

public class SampleEventHandler : IEventHandler<SampleEvent>
{
    private int _counter = 0;
    private readonly ILogger<SampleEventHandler> _logger;

    public SampleEventHandler(ILogger<SampleEventHandler> logger)
    {
        _logger = logger;
    }

    public async Task HandleAsync(SampleEvent @event)
    {
        _counter++;
        _logger.LogInformation("SampleEventHandler handled event: {Data}. Count: {Count}", @event.Data, _counter);
        await Task.CompletedTask;
    }
}

public class SampleEventHandlerAlwaysError : IEventHandler<SampleEvent>
{
    private int _counter = 0;
    private readonly ILogger<SampleEventHandlerAlwaysError> _logger;

    public SampleEventHandlerAlwaysError(ILogger<SampleEventHandlerAlwaysError> logger)
    {
        _logger = logger;
    }

    public async Task HandleAsync(SampleEvent @event)
    {
        throw new Exception("Test error");
        _counter++;
        _logger.LogInformation("SampleEventHandler handled event: {Data}. Count: {Count}", @event.Data, _counter);
        await Task.CompletedTask;
    }
}
