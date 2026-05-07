using System.Text.Json;
using Core.Infra.Base.Interfaces;
using Microsoft.Extensions.Logging;
using StackExchange.Redis;

namespace Core.Infra.Redis.Services;

public class RedisService : ICacheService, IQueueService, IEventBus
{
    private readonly IConnectionMultiplexer _redis;
    private readonly IDatabase _db;
    private readonly ILogger<RedisService> _logger;

    public RedisService(string connectionString, ILogger<RedisService> logger)
    {
        _logger = logger;
        _redis = ConnectionMultiplexer.Connect(connectionString);
        _db = _redis.GetDatabase();
    }

    // Cache Implementation
    public async Task<T?> GetAsync<T>(string key)
    {
        var value = await _db.StringGetAsync(key);
        if (!value.HasValue) return default;
        return JsonSerializer.Deserialize<T>(value!);
    }

    public async Task SetAsync<T>(string key, T value, TimeSpan? expiry = null)
    {
        var json = JsonSerializer.Serialize(value);
        if (expiry.HasValue)
        {
            await _db.StringSetAsync(key, json, expiry.Value);
        }
        else
        {
            await _db.StringSetAsync(key, json);
        }
    }

    public async Task RemoveAsync(string key)
    {
        await _db.KeyDeleteAsync(key);
    }

    // Queue Implementation
    public async Task EnqueueAsync<T>(string queueName, T message)
    {
        var json = JsonSerializer.Serialize(message);
        await _db.ListLeftPushAsync(queueName, json);
    }

    public async Task<T?> DequeueAsync<T>(string queueName)
    {
        var value = await _db.ListRightPopAsync(queueName);
        if (!value.HasValue) return default;
        return JsonSerializer.Deserialize<T>(value!);
    }

    public async Task<T?> DequeueReliableAsync<T>(string queueName, string processingQueueName)
    {
        var value = await _db.ListRightPopLeftPushAsync(queueName, processingQueueName);
        if (!value.HasValue) return default;
        return JsonSerializer.Deserialize<T>(value!);
    }

    public async Task AckReliableAsync(string processingQueueName, string messageJson)
    {
        await _db.ListRemoveAsync(processingQueueName, messageJson);
    }

    public async Task<long> GetQueueLengthAsync(string queueName)
    {
        return await _db.ListLengthAsync(queueName);
    }

    public async Task<List<string>> GetQueuesAsync(string pattern = "*")
    {
        var server = _redis.GetServer(_redis.GetEndPoints()[0]);
        var keys = server.Keys(_db.Database, pattern);
        return keys.Select(k => k.ToString()).ToList();
    }

    public async Task<List<string>> GetListRangeAsync(string key, int start, int stop)
    {
        var values = await _db.ListRangeAsync(key, start, stop);
        return values.Select(v => v.ToString()).ToList();
    }

    public async Task RemoveFromListAsync(string key, string value)
    {
        await _db.ListRemoveAsync(key, value);
    }

    public async Task RecoverProcessingQueueAsync(string queueName, string processingQueueName)
    {
        long recoveredCount = 0;
        while (true)
        {
            // Move from processing queue back to the main queue
            var value = await _db.ListRightPopLeftPushAsync(processingQueueName, queueName);
            if (!value.HasValue) break;
            recoveredCount++;
        }

        if (recoveredCount > 0)
        {
            _logger.LogInformation("Recovered {Count} messages from {ProcessingQueue} to {Queue}", recoveredCount, processingQueueName, queueName);
        }
    }

    // Event Bus Implementation (Reliable Hybrid: Pub/Sub + Persistent Queues)
    public async Task PublishAsync<T>(string topic, T @event)
    {
        var json = JsonSerializer.Serialize(@event);

        // 1. Enqueue to all subscriber queues
        var subscribers = await _db.SetMembersAsync($"topic_subs:{topic}");
        foreach (var sub in subscribers)
        {
            var subQueue = $"sub_queue:{topic}:{sub}";
            await _db.ListLeftPushAsync(subQueue, json);
        }

        // 2. Trigger signal via Pub/Sub
        await _redis.GetSubscriber().PublishAsync(RedisChannel.Literal(topic), json);
    }

    public async Task SubscribeAsync<T>(string topic, string subscriberName, Func<T, Task> handler)
    {
        await _db.SetAddAsync($"topic_subs:{topic}", subscriberName);

        var subQueue = $"sub_queue:{topic}:{subscriberName}";
        var processingQueue = $"sub_proc:{topic}:{subscriberName}";

        // Worker function to drain the queue
        Func<Task> drainQueue = async () =>
        {
            while (true)
            {
                try
                {
                    var value = await _db.ListRightPopLeftPushAsync(subQueue, processingQueue);
                    if (value.HasValue)
                    {
                        var @event = JsonSerializer.Deserialize<T>(value!);
                        if (@event != null)
                        {
                            await handler(@event);
                            await _db.ListRemoveAsync(processingQueue, value);
                        }
                    }
                    else
                    {
                        break; // Queue is empty, stop loop and wait for next signal
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error draining queue {Queue}", subQueue);
                    break;
                }
            }
        };

        // 1. Initial recovery and drain (in case there's old data or previous crash)
        _ = Task.Run(async () => {
            await RecoverProcessingQueueAsync(subQueue, processingQueue);
            await drainQueue();
        });

        // 2. Wait for signal to drain again
        await _redis.GetSubscriber().SubscribeAsync(RedisChannel.Literal(topic), async (channel, message) =>
        {
            await drainQueue();
        });
    }
}
