using Core.Infra.Base.Interfaces;
using Core.Infra.Firebase.Services;
using Core.Web.Api.Models;
using Core.Infra.Base.Constants;

namespace Core.Web.Api.Handlers;

public class SampleCommandHandler : ICommandHandler<SampleCommand>
{
    private int _counter = 0;
    private readonly ILogger<SampleCommandHandler> _logger;
    private readonly FirebaseService _firebase;
    private readonly IMessageTracker _tracker;
    private readonly IDispatcher _dispatcher;

    public SampleCommandHandler(ILogger<SampleCommandHandler> logger, FirebaseService firebase, IMessageTracker tracker, IDispatcher dispatcher)
    {
        _logger = logger;
        _firebase = firebase;
        _tracker = tracker;
        _dispatcher = dispatcher;
    }

    public async Task HandleAsync(SampleCommand command)
    {
        _counter++;
        _logger.LogInformation("SampleCommandHandler handled command: {Payload}. TrackingId: {TrackingId}. Count: {Count}",
            command.Payload, command.TrackingId, _counter);

        // Simulate some processing
        await Task.Delay(1000);

        // Publish result to Firestore for FE tracking
        await _firebase.PublishToAddressPathAsync(FirestoreConstants.GetNotificationPath(command.TrackingId), new
        {
            status = "success",
            message = $"Command processed successfully. Counter: {_counter}",
            timestamp = DateTime.UtcNow
        });

        // Publish event to demonstrate command -> event link
        await _dispatcher.PublishAsync(new SampleEvent 
        { 
            TrackingId = command.TrackingId, 
            Payload = $"Event triggered by command count: {_counter}" 
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
        _logger.LogInformation("SampleEventHandler handled event: {Payload}. Count: {Count}", @event.Payload, _counter);
        await Task.CompletedTask;
    }
}

public class SampleEventHandlerAlwaysError : IEventHandler<SampleEvent>
{
    private readonly ILogger<SampleEventHandlerAlwaysError> _logger;

    public SampleEventHandlerAlwaysError(ILogger<SampleEventHandlerAlwaysError> logger)
    {
        _logger = logger;
    }

    public async Task HandleAsync(SampleEvent @event)
    {
        _logger.LogInformation("SampleEventHandlerAlwaysError is about to throw a test error.");
        throw new Exception("Test error");
        // _counter++;
        // _logger.LogInformation("SampleEventHandler handled event: {Payload}. Count: {Count}", @event.Payload, _counter);
        // await Task.CompletedTask;
    }
}
