using Core.Infra.Base.Interfaces;
using Core.Infra.Firebase.Services;
using Microsoft.Extensions.Logging;

namespace Core.Infra.Cqrs.Handlers;

/// <summary>
/// A generic handler that automatically publishes events implementing INotifyUiEvent to Firestore.
/// </summary>
/// <typeparam name="TEvent"></typeparam>
public class UiNotificationEventHandler<TEvent> : IEventHandler<TEvent> where TEvent : INotifyUiEvent
{
    private readonly FirebaseService? _firebaseService;
    private readonly ILogger<UiNotificationEventHandler<TEvent>> _logger;

    public UiNotificationEventHandler(ILogger<UiNotificationEventHandler<TEvent>> logger, FirebaseService? firebaseService = null)
    {
        _logger = logger;
        _firebaseService = firebaseService;
    }

    public async Task HandleAsync(TEvent @event)
    {
        if (_firebaseService == null)
        {
            _logger.LogWarning("FirebaseService is not registered. Skipping UI notification for event {TrackingId}.", @event.TrackingId);
            return;
        }

        try
        {
            _logger.LogInformation("Notifying UI via Firestore at path: {Path} for event {TrackingId}", @event.NotifyPath, @event.TrackingId);
            await _firebaseService.PublishToAddressPathAsync("Default", @event.NotifyPath, @event);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error notifying UI via Firestore for event {TrackingId}", @event.TrackingId);
        }
    }
}
