namespace Core.Infra.Base.Interfaces;

public interface IBaseEvent
{
    Guid TrackingId { get; set; }
    DateTime Timestamp { get; set; }
    string? UserId { get; set; }
    string EventName { get; }
}
