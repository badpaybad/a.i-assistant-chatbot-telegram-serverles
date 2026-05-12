namespace Core.Infra.Base.Interfaces;

public interface IBaseMessage
{
    Guid TrackingId { get; set; }
    DateTime Timestamp { get; set; }
    string? UserId { get; set; }
}
