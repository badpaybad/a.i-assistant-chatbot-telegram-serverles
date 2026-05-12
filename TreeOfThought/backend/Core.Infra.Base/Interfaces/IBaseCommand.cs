namespace Core.Infra.Base.Interfaces;

public interface IBaseCommand : IBaseMessage
{
    string QueueName { get; }
}
