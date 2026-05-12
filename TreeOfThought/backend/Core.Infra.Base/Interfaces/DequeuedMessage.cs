namespace Core.Infra.Base.Interfaces;

public class DequeuedMessage<T>
{
    public T Value { get; set; } = default!;
    public string RawJson { get; set; } = string.Empty;
}
