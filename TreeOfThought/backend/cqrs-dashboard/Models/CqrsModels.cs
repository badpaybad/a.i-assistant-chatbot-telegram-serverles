namespace Core.Infra.CqrsDashboard.Models;

public class RetryRequest
{
    public string QueueName { get; set; } = string.Empty;
    public string MessageJson { get; set; } = string.Empty;
}

public class PushRequest
{
    public string QueueName { get; set; } = string.Empty;
    public string MessageJson { get; set; } = string.Empty;
}

public class LastActivityDto
{
    public string Type { get; set; } = string.Empty; // Command, Topic, Subscriber
    public string MainName { get; set; } = string.Empty; // Queue or Topic name
    public string? SubscriberName { get; set; }
    public DateTime? LastActive { get; set; }
}
