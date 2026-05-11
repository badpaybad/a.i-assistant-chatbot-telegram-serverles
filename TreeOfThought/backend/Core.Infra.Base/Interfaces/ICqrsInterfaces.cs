namespace Core.Infra.Base.Interfaces;

public interface ICommandHandler<in TCommand> where TCommand : IBaseCommand
{
    Task HandleAsync(TCommand command);
}

public interface IEventHandler<in TEvent> where TEvent : IBaseEvent
{
    Task HandleAsync(TEvent @event);
}

public interface IDispatcher
{
    Task SendAsync<TCommand>(TCommand command, bool useMemoryMode = false) where TCommand : IBaseCommand;
    Task PublishAsync<TEvent>(TEvent @event, bool useMemoryMode = false) where TEvent : IBaseEvent;
    Task RegisterCommandHandlerAsync<TCommand, THandler>(string? queueName = null) 
        where TCommand : IBaseCommand 
        where THandler : ICommandHandler<TCommand>;
    Task RegisterEventHandlerAsync<TEvent, THandler>(string topic, string subscriberName) 
        where TEvent : IBaseEvent 
        where THandler : IEventHandler<TEvent>;
    
    // Handler Management
    Task StopWorkerAsync(string workerId);
    Task StartWorkerAsync(string workerId);
    List<WorkerStatusDto> GetWorkerStatus();
    Task<Dictionary<string, long>> GetStatisticsAsync();
    Task RetryCommandAsync(string queueName, string messageJson);
}

public class WorkerStatusDto
{
    public string Id { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string? MessageName { get; set; }
    public string? HandlerName { get; set; }
    public string? QueueOrTopicName { get; set; }
}
