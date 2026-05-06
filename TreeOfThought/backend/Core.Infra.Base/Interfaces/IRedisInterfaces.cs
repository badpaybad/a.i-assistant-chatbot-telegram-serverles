namespace Core.Infra.Base.Interfaces;

public interface ICacheService
{
    Task<T?> GetAsync<T>(string key);
    Task SetAsync<T>(string key, T value, TimeSpan? expiry = null);
    Task RemoveAsync(string key);
}

public interface IQueueService
{
    Task EnqueueAsync<T>(string queueName, T message);
    Task<T?> DequeueAsync<T>(string queueName);
    Task<T?> DequeueReliableAsync<T>(string queueName, string processingQueueName);
    Task AckReliableAsync(string processingQueueName, string messageJson);
    Task<long> GetQueueLengthAsync(string queueName);
    Task<List<string>> GetQueuesAsync(string pattern = "*");
    Task<List<string>> GetListRangeAsync(string key, int start, int stop);
    Task RemoveFromListAsync(string key, string value);
}

public interface IEventBus
{
    Task PublishAsync<T>(string topic, T @event);
    Task SubscribeAsync<T>(string topic, string subscriberName, Func<T, Task> handler);
}
