namespace Core.Infra.Base.Interfaces;

public interface IMessageTracker
{
    Task TrackAsync(Guid trackingId, string step, string details);
    Task<List<string>> GetTrackingHistoryAsync(Guid trackingId);
    Task IncrementStatAsync(string statKey);
    Task<long> GetStatAsync(string statKey);
    Task<Dictionary<string, long>> GetStatsAsync();
}
