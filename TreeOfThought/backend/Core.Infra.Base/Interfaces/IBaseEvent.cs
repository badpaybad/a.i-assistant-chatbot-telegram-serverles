namespace Core.Infra.Base.Interfaces;

public interface IBaseEvent
{
    Guid TrackingId { get; set; }
    DateTime Timestamp { get; set; }
    string? UserId { get; set; }
    string TopicName { get; }
}

public interface INotifyUiEvent : IBaseEvent
{
    /// <summary>
    /// Path in Firestore to publish the event data.
    /// Example: notify/{userId}/{trackingId}
    /// </summary>
    string NotifyPath { get; }
}
