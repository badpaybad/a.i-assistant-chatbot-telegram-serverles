namespace Core.Infra.Base.Interfaces;

public class TrackingEntry
{
    public Guid TrackingId { get; set; }
    public string Step { get; set; } = string.Empty;
    public string Details { get; set; } = string.Empty;
    public string? Status { get; set; }
    public string? MessageContent { get; set; }
    public string? QueueOrTopicName { get; set; }
    public string? HandlerOrEventName { get; set; }
    public string? WorkerName { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}

public interface IMessageTracker
{
    Task TrackAsync(TrackingEntry entry);
    Task<List<TrackingEntry>> GetTrackingHistoryAsync(Guid trackingId);
    Task<List<TrackingEntry>> GetAllTrackingEntriesAsync(int count = 50);
    Task IncrementStatAsync(string statKey);
    Task UpdateLastActiveAsync(string name);
    Task<long> GetStatAsync(string statKey);
    Task<Dictionary<string, long>> GetStatsAsync();
    Task<List<string>> GetRecentTrackingIdsAsync(int count = 50);
    Task ClearTrackingAsync(Guid trackingId);
    Task LogStatusAsync(string queueOrTopic, Guid trackingId, string status, string? details = null);
}
