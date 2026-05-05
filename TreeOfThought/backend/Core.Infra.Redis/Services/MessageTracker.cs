using Core.Infra.Base.Interfaces;
using StackExchange.Redis;

namespace Core.Infra.Redis.Services;

public class MessageTracker : IMessageTracker
{
    private readonly IDatabase _db;

    public MessageTracker(string connectionString)
    {
        var redis = ConnectionMultiplexer.Connect(connectionString);
        _db = redis.GetDatabase();
    }

    public async Task TrackAsync(Guid trackingId, string step, string details)
    {
        var log = $"{DateTime.UtcNow:O} | {step} | {details}";
        await _db.ListRightPushAsync($"track:{trackingId}", log);
        await _db.KeyExpireAsync($"track:{trackingId}", TimeSpan.FromDays(7));
    }

    public async Task<List<string>> GetTrackingHistoryAsync(Guid trackingId)
    {
        var logs = await _db.ListRangeAsync($"track:{trackingId}");
        return logs.Select(l => l.ToString()).ToList();
    }

    public async Task IncrementStatAsync(string statKey)
    {
        await _db.HashIncrementAsync("infra:stats", statKey);
    }

    public async Task<long> GetStatAsync(string statKey)
    {
        var value = await _db.HashGetAsync("infra:stats", statKey);
        return value.HasValue ? (long)value : 0;
    }
}
