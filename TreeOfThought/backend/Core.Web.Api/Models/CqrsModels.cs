namespace Core.Web.Api.Models;

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
