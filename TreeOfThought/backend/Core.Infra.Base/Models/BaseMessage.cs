namespace Core.Infra.Base.Models;

public abstract class BaseMessage
{
    public Guid TrackingId { get; set; } = Guid.NewGuid();
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    public string? UserId { get; set; }
}
