using System.Text.Json;
using Core.Infra.Base.Interfaces;
using Core.Infra.Base.Constants;
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
        
        var str = value.ToString();
        if (typeof(T) == typeof(string))
        {
            try
            {
                return JsonSerializer.Deserialize<T>(str);
            }
            catch
            {
                return (T?)(object)str;
            }
        }
        
        return JsonSerializer.Deserialize<T>(str);
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

    public async Task EnqueuePriorityAsync<T>(string queueName, T message, long priority)
    {
        var json = JsonSerializer.Serialize(message, CqrsJsonOptions.Default);
        var type = await _db.KeyTypeAsync(queueName);
        if (type != RedisType.SortedSet && type != RedisType.None)
        {
            await _db.KeyDeleteAsync(queueName);
        }
        await _db.SortedSetAddAsync(queueName, json, priority);
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

    public async Task<DequeuedMessage<T>?> DequeuePriorityAsync<T>(string queueName, string processingQueueName)
    {
        // Lua script for reliable priority dequeue (handles both List and ZSet for source)
        const string script = @"
            local typeinfo = redis.call('TYPE', KEYS[1])
            local type = typeinfo['ok']
            local val = nil
            if type == 'zset' then
                local pop = redis.call('ZPOPMIN', KEYS[1])
                if pop and #pop > 0 then
                    val = pop[1]
                end
            else
                val = redis.call('RPOP', KEYS[1])
            end
            
            if val then
                redis.call('LPUSH', KEYS[2], val)
                return val
            end
            return nil";

        var result = await _db.ScriptEvaluateAsync(script, new RedisKey[] { queueName, processingQueueName });
        if (result.IsNull) return default;

        var json = result.ToString()!;
        try
        {
            var value = JsonSerializer.Deserialize<T>(json, CqrsJsonOptions.Default);
            if (value == null) return default;

            return new DequeuedMessage<T> { Value = value, RawJson = json };
        }
        catch (JsonException ex)
        {
            _logger.LogWarning("Failed to deserialize message from {Queue}: {Json}. Error: {Error}. Acknowledging to skip corrupt message.", queueName, json, ex.Message);
            await AckReliableAsync(processingQueueName, json);
            return default;
        }
    }

    public async Task AckReliableAsync(string processingQueueName, string messageJson)
    {
        await _db.ListRemoveAsync(processingQueueName, messageJson);
    }

    public async Task<long> GetQueueLengthAsync(string queueName)
    {
        var type = await _db.KeyTypeAsync(queueName);
        if (type == RedisType.SortedSet)
            return await _db.SortedSetLengthAsync(queueName);
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
        var type = await _db.KeyTypeAsync(key);
        if (type == RedisType.SortedSet)
        {
            var values = await _db.SortedSetRangeByRankAsync(key, start, stop, Order.Descending);
            return values.Select(v => v.ToString()).ToList();
        }
        else
        {
            var values = await _db.ListRangeAsync(key, start, stop);
            return values.Select(v => v.ToString()).ToList();
        }
    }

    public async Task RemoveFromListAsync(string key, string value)
    {
        var type = await _db.KeyTypeAsync(key);
        if (type == RedisType.SortedSet)
            await _db.SortedSetRemoveAsync(key, value);
        else
            await _db.ListRemoveAsync(key, value);
    }

    public async Task RecoverProcessingQueueAsync(string queueName, string processingQueueName)
    {
        long recoveredCount = 0;
        var type = await _db.KeyTypeAsync(queueName);

        while (true)
        {
            var value = await _db.ListRightPopAsync(processingQueueName);
            if (!value.HasValue) break;

            if (type == RedisType.SortedSet)
            {
                // For priority queues, we use Ticks from the message if possible, 
                // but since we don't want to deserialize here, we just use current ticks as fallback
                // or assume we can't easily recover exact priority without deserialization.
                // However, usually recovery just puts it back at "now" priority.
                await _db.SortedSetAddAsync(queueName, value, DateTime.UtcNow.Ticks);
            }
            else
            {
                await _db.ListLeftPushAsync(queueName, value);
            }
            recoveredCount++;
        }

        if (recoveredCount > 0)
        {
            _logger.LogInformation("Recovered {Count} messages from {ProcessingQueue} to {Queue}", recoveredCount, processingQueueName, queueName);
        }
    }

    // Event Bus Implementation (Simplified: Only handles signaling)
    public async Task PublishAsync<T>(string topic, T @event)
    {
        // For CQRS, the Dispatcher handles enqueuing to subscriber queues.
        // This method just triggers the signal to wake up workers.
        await _redis.GetSubscriber().PublishAsync(RedisChannel.Literal(topic), CqrsConstants.SignalMessage);
    }

    public async Task SubscribeAsync<T>(string topic, string subscriberName, Func<T, Task> handler)
    {
        // Just register the subscriber
        await _db.SetAddAsync(CqrsConstants.GetTopicSubsKey(topic), subscriberName);

        // Note: CqrsDispatcher will handle the drainQueue loop and call the handler.
        // We still subscribe to the channel to trigger the dispatcher if needed,
        // but the dispatcher will handle the actual Subscribe logic.
        await _redis.GetSubscriber().SubscribeAsync(RedisChannel.Literal(topic), async (channel, message) =>
        {
            await handler(default!);
        });
    }
    public async Task<List<string>> GetSetMembersAsync(string key)
    {
        var members = await _db.SetMembersAsync(key);
        return members.Select(m => m.ToString()).ToList();
    }

    public async Task SetAddAsync(string key, string member)
    {
        await _db.SetAddAsync(key, member);
    }

    public async Task ZAddAsync(string key, string member, double score)
    {
        await _db.SortedSetAddAsync(key, member, score);
    }
}
