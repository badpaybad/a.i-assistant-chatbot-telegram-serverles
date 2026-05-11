using Core.Infra.Base.Interfaces;
using Core.Web.Api.Models;
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
        var allKeys = await _queueService.GetQueuesAsync();
        var stats = await _tracker.GetStatsAsync();
        var workerStatus = _dispatcher.GetWorkerStatus();
        
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

            // Determine stat keys
            string sentKey = q.StartsWith("sub_queue:") ? $"sent:topic:{q.Split(':')[1]}" : $"sent:{q}";
            string errorKey = q.StartsWith("sub_queue:") ? $"error:event:{q.Split(':')[1]}:{q.Split(':')[2]}" : $"error:{q}";
            
            // For dead letter queues, the error count is relevant for the parent
            if (q.EndsWith(":dead"))
            {
                var parent = q.Replace(":dead", "");
                errorKey = parent.StartsWith("sub_queue:") ? $"error:event:{parent.Split(':')[1]}:{parent.Split(':')[2]}" : $"error:{parent}";
            }

            stats.TryGetValue(sentKey, out long sentCount);
            stats.TryGetValue(errorKey, out long errorCount);

            // Find associated worker info
            var associatedWorker = workerStatus.FirstOrDefault(w => w.QueueOrTopicName == q || (q.StartsWith("sub_queue:") && w.QueueOrTopicName == q.Split(':')[1]));

            result.Add(new { 
                name = q, 
                length, 
                type, 
                sentCount, 
                errorCount,
                messageName = associatedWorker?.MessageName,
                handlerName = associatedWorker?.HandlerName
            });
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

    [HttpPost("push")]
    public async Task<IActionResult> Push([FromBody] PushRequest request)
    {
        var obj = JsonSerializer.Deserialize<JsonElement>(request.MessageJson);
        await _queueService.EnqueueAsync(request.QueueName, obj);
        return Ok(new { message = "Message pushed to queue" });
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
        var result = history.Select(log => {
            var parts = log.Split('|');
            return new {
                Time = parts.Length > 0 ? parts[0].Trim() : "",
                Step = parts.Length > 1 ? parts[1].Trim() : "",
                Details = parts.Length > 2 ? parts[2].Trim() : ""
            };
        });
        return Ok(result);
    }

    [HttpGet("tracking/recent")]
    public async Task<IActionResult> GetRecentTracking([FromQuery] int count = 50)
    {
        var allKeys = await _queueService.GetQueuesAsync();
        var trackingKeys = allKeys
            .Where(k => k.StartsWith("track:"))
            .OrderByDescending(k => k)
            .Take(count)
            .ToList();

        var result = new List<object>();
        foreach (var key in trackingKeys)
        {
            var history = await _tracker.GetTrackingHistoryAsync(Guid.Parse(key.Replace("track:", "")));
            var lastStep = history.LastOrDefault() ?? "No steps";
            result.Add(new { 
                id = key.Replace("track:", ""), 
                lastStep = lastStep.Split('|').Length > 1 ? lastStep.Split('|')[1].Trim() : lastStep,
                time = lastStep.Split('|').Length > 0 ? lastStep.Split('|')[0].Trim() : ""
            });
        }
        return Ok(result);
    }

    [HttpPost("workers/{workerId}/stop")]
    public async Task<IActionResult> StopWorker(string workerId)
    {
        await _dispatcher.StopWorkerAsync(workerId);
        return Ok(new { message = $"Worker {workerId} stopped" });
    }

    [HttpPost("workers/{workerId}/start")]
    public async Task<IActionResult> StartWorker(string workerId)
    {
        await _dispatcher.StartWorkerAsync(workerId);
        return Ok(new { message = $"Worker {workerId} started" });
    }
}
