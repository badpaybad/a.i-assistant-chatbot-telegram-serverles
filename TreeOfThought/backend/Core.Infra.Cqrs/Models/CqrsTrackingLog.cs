using System;

namespace Core.Infra.Cqrs.Models;

public class CqrsTrackingLog
{
    public long Id { get; set; }
    public Guid TrackingId { get; set; }
    public string MessageType { get; set; } = string.Empty;
    public string MessageData { get; set; } = string.Empty;
    public string QueueOrTopicName { get; set; } = string.Empty;
    public string? SubscriberName { get; set; }
    public string? DestinationQueueName { get; set; }
    public string? SourceComponent { get; set; }
    public string? HandlerName { get; set; }
    public string? WorkerId { get; set; }
    public string Step { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string? ErrorMessage { get; set; }
    public bool IsRoot { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
