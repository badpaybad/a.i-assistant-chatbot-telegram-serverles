using Core.Infra.Base.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Core.Web.Api.Controllers;

[ApiController]
[Route("api/cqrs/dashboard")]
public class CqrsDashboardController : ControllerBase
{
    private readonly IDispatcher _dispatcher;
    private readonly IQueueService _queueService;
    private readonly IMessageTracker _tracker;

    public CqrsDashboardController(IDispatcher dispatcher, IQueueService queueService, IMessageTracker tracker)
    {
        _dispatcher = dispatcher;
        _queueService = queueService;
        _tracker = tracker;
    }

    [HttpGet("stats")]
    public async Task<IActionResult> GetStats()
    {
        var stats = await _tracker.GetStatsAsync();
        var workerStatus = _dispatcher.GetWorkerStatus();
        return Ok(new { stats, workerStatus });
    }

    [HttpGet("queues")]
    public async Task<IActionResult> GetQueues()
    {
        // Get all keys and filter for potential queues
        var allKeys = await _queueService.GetQueuesAsync();
        
        // Filter: queues usually don't have ":" or they follow a specific pattern
        // For our system:
        // - Queues: sample.command, SampleCommand, etc.
        // - Processing: {q}:processing
        // - Dead: {q}:dead
        // - Sub Queues: sub_queue:{topic}:{sub}
        // - Sub Proc: sub_proc:{topic}:{sub}
        
        var queues = allKeys
            .Where(k => !k.StartsWith("track:") && !k.StartsWith("infra:") && !k.StartsWith("topic_subs:"))
            .ToList();

        var result = new List<object>();
        foreach (var q in queues)
        {
            var length = await _queueService.GetQueueLengthAsync(q);
            var type = "Queue";
            if (q.Contains(":processing") || q.Contains(":dead") || q.Contains("sub_proc:")) type = "Internal";
            else if (q.StartsWith("sub_queue:")) type = "Subscription";

            result.Add(new { name = q, length, type });
        }

        return Ok(result);
    }

    [HttpGet("messages/{queueName}")]
    public async Task<IActionResult> GetMessages(string queueName, [FromQuery] int count = 50)
    {
        var messages = await _queueService.GetListRangeAsync(queueName, 0, count - 1);
        return Ok(messages);
    }

    [HttpPost("retry")]
    public async Task<IActionResult> Retry([FromBody] RetryRequest request)
    {
        await _dispatcher.RetryCommandAsync(request.QueueName, request.MessageJson);
        return Ok(new { message = "Retry command issued" });
    }

    [HttpDelete("dead-letter/{queueName}")]
    public async Task<IActionResult> RemoveFromDeadLetter(string queueName, [FromQuery] string messageJson)
    {
        await _queueService.RemoveFromListAsync($"{queueName}:dead", messageJson);
        return Ok(new { message = "Message removed from DLQ" });
    }

    [HttpGet("tracking/{trackingId}")]
    public async Task<IActionResult> GetTracking(Guid trackingId)
    {
        var history = await _tracker.GetTrackingHistoryAsync(trackingId);
        return Ok(history);
    }
}

public class RetryRequest
{
    public string QueueName { get; set; } = string.Empty;
    public string MessageJson { get; set; } = string.Empty;
}
