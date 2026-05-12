using Core.Infra.Base.Interfaces;
using Core.Infra.Base.Constants;
using StackExchange.Redis;
using System.Text.Json;

namespace Core.Infra.Redis.Services;

public class MessageTracker : IMessageTracker
{
    private readonly IDatabase _db;

    public MessageTracker(string connectionString)
    {
        var redis = ConnectionMultiplexer.Connect(connectionString);
        _db = redis.GetDatabase();
    }

    public async Task TrackAsync(TrackingEntry entry)
    {
        var json = JsonSerializer.Serialize(entry, CqrsJsonOptions.Default);
        var key = CqrsConstants.GetTrackingHistoryKey(entry.TrackingId);
        await _db.ListRightPushAsync(key, json);
        await _db.KeyExpireAsync(key, TimeSpan.FromDays(7));

        // Maintain a global list of all tracking entries for the dashboard
        await _db.ListLeftPushAsync("infra:all_tracks", json);
        await _db.ListTrimAsync("infra:all_tracks", 0, 1999); // Keep last 2000 entries
        await _db.KeyExpireAsync("infra:all_tracks", TimeSpan.FromDays(7));

        // Maintain a list of recent tracking IDs
        await _db.ListRemoveAsync("infra:recent_tracks", entry.TrackingId.ToString());
        await _db.ListLeftPushAsync("infra:recent_tracks", entry.TrackingId.ToString());
        await _db.ListTrimAsync("infra:recent_tracks", 0, 999); // Keep last 1000 IDs
    }

    public async Task<List<TrackingEntry>> GetTrackingHistoryAsync(Guid trackingId)
    {
        var listKey = CqrsConstants.GetTrackingHistoryKey(trackingId);
        var logs = await _db.ListRangeAsync(listKey);
        return logs.Select(l => {
            try {
                return JsonSerializer.Deserialize<TrackingEntry>(l.ToString(), CqrsJsonOptions.Default)!;
            } catch {
                return new TrackingEntry { 
                    TrackingId = trackingId, 
                    Step = "Legacy", 
                    Details = l.ToString(),
                    Timestamp = DateTime.UtcNow
                };
            }
        }).ToList();
    }

    public async Task<List<TrackingEntry>> GetAllTrackingEntriesAsync(int count = 50)
    {
        var logs = await _db.ListRangeAsync("infra:all_tracks", 0, count - 1);
        return logs.Select(l => {
            try {
                return JsonSerializer.Deserialize<TrackingEntry>(l.ToString(), CqrsJsonOptions.Default)!;
            } catch {
                return new TrackingEntry { Step = "Error", Details = "Parse Error" };
            }
        }).ToList();
    }

    public async Task IncrementStatAsync(string statKey)
    {
        await _db.HashIncrementAsync(CqrsConstants.StatsPrefix.TrimEnd(':'), statKey);
    }

    public async Task<long> GetStatAsync(string statKey)
    {
        var value = await _db.HashGetAsync(CqrsConstants.StatsPrefix.TrimEnd(':'), statKey);
        return value.HasValue ? (long)value : 0;
    }

    public async Task<Dictionary<string, long>> GetStatsAsync()
    {
        var entries = await _db.HashGetAllAsync(CqrsConstants.StatsPrefix.TrimEnd(':'));
        return entries.ToDictionary(e => e.Name.ToString(), e => (long)e.Value);
    }

    public async Task<List<string>> GetRecentTrackingIdsAsync(int count = 50)
    {
        var ids = await _db.ListRangeAsync("infra:recent_tracks", 0, count - 1);
        return ids.Select(x => x.ToString()).ToList();
    }

    public async Task ClearTrackingAsync(Guid trackingId)
    {
        await _db.KeyDeleteAsync(CqrsConstants.GetTrackingHistoryKey(trackingId));
        await _db.ListRemoveAsync("infra:recent_tracks", trackingId.ToString());
    }

    public async Task LogStatusAsync(string queueOrTopic, Guid trackingId, string status, string? details = null)
    {
        var score = DateTime.UtcNow.Ticks;
        var zsetKey = CqrsConstants.GetTrackingKey(status, queueOrTopic);
        
        var type = await _db.KeyTypeAsync(zsetKey);
        if (type != RedisType.SortedSet && type != RedisType.None)
        {
            await _db.KeyDeleteAsync(zsetKey);
        }

        // We store the TrackingId in the ZSet. 
        // Using score as timestamp for sorting.
        await _db.SortedSetAddAsync(zsetKey, trackingId.ToString(), score);
        
        // Trim ZSet to keep only last 1000 IDs to avoid memory bloat
        await _db.SortedSetRemoveRangeByRankAsync(zsetKey, 0, -1001);
        await _db.KeyExpireAsync(zsetKey, TimeSpan.FromDays(7));
        
        System.Console.WriteLine($"[TRACKER] LogStatus: Key={zsetKey}, ID={trackingId}, Status={status}");
    }
}
