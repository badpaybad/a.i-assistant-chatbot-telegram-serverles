namespace Core.Infra.Base.Interfaces;

public interface IBaseCommand
{
    Guid TrackingId { get; set; }
    DateTime Timestamp { get; set; }
    string? UserId { get; set; }
    string CommandName { get; }
}
