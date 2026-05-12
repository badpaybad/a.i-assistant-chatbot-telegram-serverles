using Core.Infra.Base.Interfaces;
using Core.Infra.Base.Constants;
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
    private readonly IEventBus _eventBus;
    private readonly ILogger<CqrsDashboardController> _logger;

    public CqrsDashboardController(IDispatcher dispatcher, IQueueService queueService, IMessageTracker tracker, IEventBus eventBus, ILogger<CqrsDashboardController> logger)
    {
        _dispatcher = dispatcher;
        _queueService = queueService;
        _tracker = tracker;
        _eventBus = eventBus;
        _logger = logger;
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
        var stats = await _tracker.GetStatsAsync();
        var workerStatus = _dispatcher.GetWorkerStatus();
        var registrations = _dispatcher.GetHandlerRegistrations();
        
        var queues = _dispatcher.GetAllQueues();
        var topics = _dispatcher.GetAllTopics();

        var result = new List<object>();

        // Process Queues
        foreach (var q in queues)
        {
            var length = await _queueService.GetQueueLengthAsync(q);
            var processingLength = await _queueService.GetQueueLengthAsync($"{q}:processing");
            
            stats.TryGetValue($"processed:{q}", out long processedCount);
            stats.TryGetValue($"error:{q}", out long errorCount);
            stats.TryGetValue($"total:{q}", out long totalCount);

            var workers = workerStatus.Where(w => w.QueueOrTopicName == q).Select(w => w.Id).ToList();
            var handlers = registrations.Where(r => r.QueueOrTopicName == q).Select(r => new { r.HandlerName, r.MessageName }).ToList();

            result.Add(new { 
                name = q, 
                pendingCount = length,
                activeCount = processingLength,
                processingCount = length + processingLength,
                processedCount = processedCount,
                errorCount = errorCount,
                totalCount = totalCount,
                type = "Queue", 
                workers,
                handlers
            });
        }

        // Process Topics
        foreach (var t in topics)
        {
            var subscribers = _dispatcher.GetTopicSubscribers(t);
            long totalPending = 0;
            long totalActive = 0;
            long totalProcessed = 0;
            long totalError = 0;
            long totalMsg = 0;

            var subDetails = new List<object>();
            foreach (var sub in subscribers)
            {
                var subQueue = CqrsConstants.GetSubQueueKey(t, sub);
                var subProc = CqrsConstants.GetSubProcKey(t, sub);
                
                var pending = await _queueService.GetQueueLengthAsync(subQueue);
                var active = await _queueService.GetQueueLengthAsync(subProc);
                
                stats.TryGetValue($"processed:{subQueue}", out long proc);
                stats.TryGetValue($"error:{subQueue}", out long err);
                
                totalPending += pending;
                totalActive += active;
                totalProcessed += proc;
                totalError += err;

                subDetails.Add(new {
                    name = sub,
                    queueName = subQueue,
                    pending,
                    active,
                    processed = proc,
                    error = err
                });
            }

            stats.TryGetValue($"total:topic:{t}", out totalMsg);

            var workers = workerStatus.Where(w => w.QueueOrTopicName == t).Select(w => w.Id).ToList();
            var handlers = registrations.Where(r => r.QueueOrTopicName == t).Select(r => new { r.HandlerName, r.MessageName }).ToList();

            result.Add(new { 
                name = t, 
                pendingCount = totalPending,
                activeCount = totalActive,
                processingCount = totalPending + totalActive,
                processedCount = totalProcessed,
                errorCount = totalError,
                totalCount = totalMsg,
                type = "Topic", 
                workers,
                handlers,
                subscribers = subDetails
            });
        }

        return Ok(result);
    }

    [HttpGet("messages/{queueName}")]
    public async Task<IActionResult> GetMessages(string queueName, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
    {
        // If it's a special internal queue (processing or dead letter), read from Redis
        if (queueName.EndsWith(":processing") || queueName.EndsWith(":dead") || queueName.StartsWith("sub_proc:"))
        {
            var total = await _queueService.GetQueueLengthAsync(queueName);
            var start = (page - 1) * pageSize;
            var end = start + pageSize - 1;
            var messages = await _queueService.GetListRangeAsync(queueName, start, end);
            return Ok(new { items = messages, total });
        }
        else
        {
            // For base queues/topics, show tracked history (processed messages) + Pending messages
            // 1. Get Pending messages from the actual queue
            var pendingMessages = await _queueService.GetListRangeAsync(queueName, 0, 100);
            
            // 2. Get Tracking IDs from success and error ZSets for this queue/topic
            var successKey = CqrsConstants.GetTrackingKey(CqrsConstants.StatusSuccess, queueName);
            var errorKey = CqrsConstants.GetTrackingKey(CqrsConstants.StatusError, queueName);
            
            var successIds = await _queueService.GetListRangeAsync(successKey, 0, 100);
            var errorIds = await _queueService.GetListRangeAsync(errorKey, 0, 100);
            
            _logger.LogInformation("GetMessages for {QueueName}: Pending={PendingCount}, Success={SuccessCount} (Key: {SuccessKey}), Error={ErrorCount} (Key: {ErrorKey})", 
                queueName, pendingMessages.Count, successIds.Count, successKey, errorIds.Count, errorKey);
            
            if (successIds.Count > 0) _logger.LogInformation("Sample Success IDs for {QueueName}: {Ids}", queueName, string.Join(", ", successIds.Take(5)));
            if (errorIds.Count > 0) _logger.LogInformation("Sample Error IDs for {QueueName}: {Ids}", queueName, string.Join(", ", errorIds.Take(5)));
            
            var resultList = new List<object>();

            // Add pending messages first
            foreach (var msg in pendingMessages)
            {
                try {
                    var obj = JsonSerializer.Deserialize<Dictionary<string, object>>(msg, CqrsJsonOptions.Default);
                    string tid = "N/A";
                    if (obj != null) {
                        if (obj.TryGetValue("trackingId", out var t1)) tid = t1.ToString()!;
                        else if (obj.TryGetValue("TrackingId", out var t2)) tid = t2.ToString()!;
                    }

                    resultList.Add(new {
                        trackingId = tid,
                        timestamp = DateTime.UtcNow, // For pending, we don't always have the exact time in the simple dict
                        content = msg,
                        status = CqrsConstants.StatusPending,
                        details = "Waiting in queue"
                    });
                } catch {
                    resultList.Add(new { trackingId = "N/A", timestamp = DateTime.UtcNow, content = msg, status = CqrsConstants.StatusPending, details = "Raw message" });
                }
            }

            // 3. Add historical messages
            var allIds = successIds.Concat(errorIds).Distinct().Select(id => Guid.Parse(id)).ToList();
            foreach (var tid in allIds)
            {
                var history = await _tracker.GetTrackingHistoryAsync(tid);
                if (history.Count > 0)
                {
                    var finalState = history.OrderByDescending(e => e.Status == CqrsConstants.StatusSuccess || e.Status == CqrsConstants.StatusError).FirstOrDefault();
                    var contentEntry = history.FirstOrDefault(e => !string.IsNullOrEmpty(e.MessageContent));
                    
                    resultList.Add(new {
                        trackingId = tid,
                        timestamp = history.Min(e => e.Timestamp),
                        content = contentEntry?.MessageContent ?? "",
                        status = finalState?.Status ?? CqrsConstants.StatusProcessing,
                        details = finalState?.Details ?? ""
                    });
                }
            }

            var sortedResult = resultList.OrderByDescending(x => (DateTime)((dynamic)x).timestamp).ToList();
            var total = sortedResult.Count;
            var items = sortedResult.Skip((page - 1) * pageSize).Take(pageSize).ToList();

            // Format for MessageListComponent
            var resultItems = items.Select(x => {
                try {
                    var d = (dynamic)x;
                    var content = (string)d.content;
                    if (string.IsNullOrEmpty(content)) content = "{}";
                    
                    var mockObj = new Dictionary<string, object>();
                    if (content.StartsWith("{")) {
                        mockObj = JsonSerializer.Deserialize<Dictionary<string, object>>(content) ?? new Dictionary<string, object>();
                    }
                    
                    mockObj["_trackingId"] = d.trackingId;
                    mockObj["_status"] = d.status;
                    mockObj["timestamp"] = d.timestamp;
                    if (d.status == CqrsConstants.StatusError) {
                        mockObj["_error"] = d.details;
                        mockObj["_failedAt"] = d.timestamp;
                    }
                    
                    return JsonSerializer.Serialize(mockObj, CqrsJsonOptions.Default);
                } catch {
                    return ((dynamic)x).content;
                }
            }).ToList();

            return Ok(new { items = resultItems, total });
        }
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
        return Ok(history);
    }

    [HttpGet("tracking/recent")]
    public async Task<IActionResult> GetRecentTracking(
        [FromQuery] int page = 1, 
        [FromQuery] int pageSize = 50, 
        [FromQuery] string? trackingId = null,
        [FromQuery] string? content = null,
        [FromQuery] string? status = null)
    {
        var allEntries = await _tracker.GetAllTrackingEntriesAsync(1000);
        
        // Filter and group by TrackingId to show the latest state or all steps
        // The requirement says "bảng dữ liệu lấy ra từ danh sách tracking đã lưu... theo thứ tự thời gian"
        // and shows multiple rows for the same ID.
        
        var filtered = allEntries.AsEnumerable();

        if (!string.IsNullOrEmpty(trackingId))
            filtered = filtered.Where(e => e.TrackingId.ToString().Contains(trackingId, StringComparison.OrdinalIgnoreCase));
        
        if (!string.IsNullOrEmpty(content))
            filtered = filtered.Where(e => e.MessageContent?.Contains(content, StringComparison.OrdinalIgnoreCase) ?? false);

        if (!string.IsNullOrEmpty(status))
            filtered = filtered.Where(e => e.Status?.Equals(status, StringComparison.OrdinalIgnoreCase) ?? false);

        var result = filtered.Select(e => new {
            id = e.TrackingId,
            step = e.Step,
            time = e.Timestamp.ToString("O"),
            content = e.MessageContent ?? "",
            status = e.Status ?? "unknown",
            queueOrTopic = e.QueueOrTopicName ?? "",
            handler = e.HandlerOrEventName ?? "",
            worker = e.WorkerName ?? ""
        }).ToList();

        var total = result.Count;
        var pagedResult = result.Skip((page - 1) * pageSize).Take(pageSize).ToList();

        return Ok(new { items = pagedResult, total });
    }

    [HttpPost("tracking/{trackingId}/resend")]
    public async Task<IActionResult> ResendTracking(string trackingId)
    {
        var history = await _tracker.GetTrackingHistoryAsync(Guid.Parse(trackingId));
        if (history.Count == 0) return NotFound("Tracking not found");

        var firstEntry = history.First();
        if (string.IsNullOrEmpty(firstEntry.MessageContent)) return BadRequest("No message content found in tracking");

        var queueOrTopic = firstEntry.QueueOrTopicName;
        if (string.IsNullOrEmpty(queueOrTopic)) return BadRequest("Could not determine queue or topic");

        var obj = JsonSerializer.Deserialize<JsonElement>(firstEntry.MessageContent);
        
        if (firstEntry.Step == "Dispatcher" && firstEntry.Details.Contains("Enqueuing"))
        {
            await _queueService.EnqueueAsync(queueOrTopic, obj);
        }
        else if (firstEntry.Step == "Dispatcher" && firstEntry.Details.Contains("Publishing"))
        {
            await _eventBus.PublishAsync(queueOrTopic, obj);
        }
        else
        {
            // Generic fallback
            await _queueService.EnqueueAsync(queueOrTopic, obj);
        }

        return Ok(new { message = "Resent successfully" });
    }

    [HttpDelete("tracking/{trackingId}")]
    public async Task<IActionResult> DeleteTracking(string trackingId)
    {
        await _tracker.ClearTrackingAsync(Guid.Parse(trackingId));
        return Ok(new { message = "Tracking cleared" });
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
