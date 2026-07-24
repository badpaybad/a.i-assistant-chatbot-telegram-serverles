using Core.Infra.Base.Interfaces;
using Core.Infra.Base.Constants;
using Core.Infra.CqrsDashboard.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

using Core.Infra.Auth.Attributes;
using Core.Infra.Cqrs.Contexts;

namespace Core.Infra.CqrsDashboard.Controllers;

[ApiController]
[Route("api/cqrs/dashboard")]
[AppAuthorize("be.infra.dashboard")]
public class CqrsDashboardController : ControllerBase
{
    private readonly IDispatcher _dispatcher;
    private readonly IQueueService _queueService;
    private readonly IMessageTracker _tracker;
    private readonly IEventBus _eventBus;
    private readonly ILogger<CqrsDashboardController> _logger;

    public CqrsDashboardController(
        IDispatcher dispatcher, 
        IQueueService queueService, 
        IMessageTracker tracker, 
        IEventBus eventBus, 
        ILogger<CqrsDashboardController> logger)
    {
        _dispatcher = dispatcher;
        _queueService = queueService;
        _tracker = tracker;
        _eventBus = eventBus;
        _logger = logger;
    }

    private async Task<Dictionary<string, long>> GetStatsFromDbAsync(CqrsDbContext db)
    {
        var stats = new Dictionary<string, long>();

        // 1. General System Stats (Queue / Topic counters)
        stats["queue_send_success"] = await db.cqrs_tracking_logs.CountAsync(l => l.type == "queue" && l.step == "send" && l.status == "success");
        stats["queue_send_error"] = await db.cqrs_tracking_logs.CountAsync(l => l.type == "queue" && l.step == "send" && l.status == "error");
        stats["queue_done_success"] = await db.cqrs_tracking_logs.CountAsync(l => l.type == "queue" && l.step == "done" && l.status == "success");
        stats["queue_done_error"] = await db.cqrs_tracking_logs.CountAsync(l => l.type == "queue" && l.step == "done" && l.status == "error");

        stats["topic_send_success"] = await db.cqrs_tracking_logs.CountAsync(l => l.type == "topic" && l.step == "send" && l.status == "success");
        stats["topic_send_error"] = await db.cqrs_tracking_logs.CountAsync(l => l.type == "topic" && l.step == "send" && l.status == "error");
        stats["topic_done_success"] = await db.cqrs_tracking_logs.CountAsync(l => l.type == "topic" && l.step == "done" && l.status == "success" && l.subscriber_name != null);
        stats["topic_done_error"] = await db.cqrs_tracking_logs.CountAsync(l => l.type == "topic" && l.step == "done" && l.status == "error" && l.subscriber_name != null);

        // 2. Active Processing
        stats["total:processing"] = await db.cqrs_tracking_logs
            .Where(p => p.step == "dequeue")
            .Where(p => !db.cqrs_tracking_logs.Any(c => 
                c.tracking_id == p.tracking_id && 
                c.step == "done" && 
                (c.handler_name == p.handler_name)))
            .Select(p => p.tracking_id)
            .Distinct()
            .CountAsync();

        // 3. Specific Entity Groups (Group by Name, Step, Status)
        var groups = await db.cqrs_tracking_logs
            .Where(l => (l.step == "send" || l.step == "done") && (l.status == "success" || l.status == "error"))
            .GroupBy(l => new { l.queue_or_topic_name, l.step, l.status })
            .Select(g => new { QueueOrTopicName = g.Key.queue_or_topic_name, Step = g.Key.step, Status = g.Key.status, Count = g.Count() })
            .ToListAsync();

        foreach (var g in groups)
        {
            if (string.IsNullOrEmpty(g.QueueOrTopicName)) continue;
            var key = $"{g.Step}_{g.Status}:{g.QueueOrTopicName}";
            stats[key] = g.Count;
        }

        return stats;
    }

    [HttpGet("stats")]
    public async Task<IActionResult> GetStats([FromServices] CqrsDbContext db)
    {
        var stats = await GetStatsFromDbAsync(db);
        var workerStatus = _dispatcher.GetWorkerStatus();
        return Ok(new { stats, workerStatus });
    }

    [HttpGet("queues")]
    public async Task<IActionResult> GetQueues([FromServices] CqrsDbContext db)
    {
        var stats = await GetStatsFromDbAsync(db);
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
            
            stats.TryGetValue($"send_success:{q}", out long sendSuccess);
            stats.TryGetValue($"send_error:{q}", out long sendError);
            stats.TryGetValue($"done_success:{q}", out long doneSuccess);
            stats.TryGetValue($"done_error:{q}", out long doneError);

            var workers = workerStatus.Where(w => w.QueueOrTopicName == q).Select(w => w.Id).ToList();
            var handlers = registrations.Where(r => r.QueueOrTopicName == q).Select(r => new { r.HandlerName, r.MessageName }).ToList();

            result.Add(new { 
                name = q, 
                pendingCount = length,
                activeCount = processingLength,
                processingCount = length + processingLength,
                sendSuccessCount = sendSuccess,
                sendErrorCount = sendError,
                doneSuccessCount = doneSuccess,
                doneErrorCount = doneError,
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

            stats.TryGetValue($"send_success:{t}", out long sendSuccess);
            stats.TryGetValue($"send_error:{t}", out long sendError);
            long doneSuccess = 0;
            long doneError = 0;

            var subDetails = new List<object>();
            foreach (var sub in subscribers)
            {
                var subQueue = CqrsConstants.GetSubQueueKey(t, sub);
                var subProc = CqrsConstants.GetSubProcKey(t, sub);
                
                var pending = await _queueService.GetQueueLengthAsync(subQueue);
                var active = await _queueService.GetQueueLengthAsync(subProc);
                
                stats.TryGetValue($"done_success:{subQueue}", out long subDoneSuccess);
                stats.TryGetValue($"done_error:{subQueue}", out long subDoneError);
                
                totalPending += pending;
                totalActive += active;
                doneSuccess += subDoneSuccess;
                doneError += subDoneError;

                subDetails.Add(new {
                    name = sub,
                    queueName = subQueue,
                    pending,
                    active,
                    sendSuccessCount = sendSuccess, // per subscriber send stats is equal to topic send stats
                    sendErrorCount = sendError,
                    doneSuccessCount = subDoneSuccess,
                    doneErrorCount = subDoneError
                });
            }

            var workers = workerStatus.Where(w => w.QueueOrTopicName == t).Select(w => w.Id).ToList();
            var handlers = registrations.Where(r => r.QueueOrTopicName == t).Select(r => new { r.HandlerName, r.MessageName }).ToList();

            result.Add(new { 
                name = t, 
                pendingCount = totalPending,
                activeCount = totalActive,
                processingCount = totalPending + totalActive,
                sendSuccessCount = sendSuccess,
                sendErrorCount = sendError,
                doneSuccessCount = doneSuccess,
                doneErrorCount = doneError,
                type = "Topic", 
                workers,
                handlers,
                subscribers = subDetails
            });
        }

        return Ok(result);
    }

    [HttpGet("last-activity")]
    public async Task<IActionResult> GetLastActivity()
    {
        var keys = await _queueService.GetQueuesAsync($"{CqrsConstants.LastActivePrefix}*");
        var result = new List<LastActivityDto>();

        foreach (var key in keys)
        {
            var rawValue = await ((ICacheService)_queueService).GetAsync<string>(key);
            if (string.IsNullOrEmpty(rawValue)) continue;

            if (DateTime.TryParse(rawValue, out var lastActive))
            {
                var name = key.Replace(CqrsConstants.LastActivePrefix, "");
                var type = "Command";
                var mainName = name;
                string? subName = null;

                if (name.StartsWith(CqrsConstants.SubQueuePrefix))
                {
                    type = "Subscriber";
                    var parts = name.Replace(CqrsConstants.SubQueuePrefix, "").Split(':');
                    if (parts.Length >= 2)
                    {
                        mainName = parts[0];
                        subName = parts[1];
                    }
                }
                else if (_dispatcher.GetAllTopics().Contains(name))
                {
                    type = "Topic";
                }

                result.Add(new LastActivityDto
                {
                    Type = type,
                    MainName = mainName,
                    SubscriberName = subName,
                    LastActive = lastActive
                });
            }
        }

        return Ok(result.OrderByDescending(x => x.LastActive).ToList());
    }

    [HttpGet("messages/{queueName}")]
    public async Task<IActionResult> GetMessages(
        [FromServices] CqrsDbContext db,
        string queueName, 
        [FromQuery] int pageIndex = 1, 
        [FromQuery] int pageSize = 20)
    {
        // If it's a special internal queue (processing or dead letter), read from Redis
        if (queueName.EndsWith(":processing") || queueName.EndsWith(":dead") || queueName.StartsWith("sub_proc:"))
        {
            var total = await _queueService.GetQueueLengthAsync(queueName);
            var start = (pageIndex - 1) * pageSize;
            var end = start + pageSize - 1;
            var messages = await _queueService.GetListRangeAsync(queueName, start, end);
            return Ok(new { items = messages, total });
        }
        else
        {
            // For base queues/topics, show pending messages + database processed logs
            // 1. Get Pending messages from Redis queue
            var pendingMessages = await _queueService.GetListRangeAsync(queueName, 0, 100);
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
                        timestamp = DateTime.UtcNow,
                        content = msg,
                        status = CqrsConstants.StatusPending,
                        details = "Waiting in queue"
                    });
                } catch {
                    resultList.Add(new { trackingId = "N/A", timestamp = DateTime.UtcNow, content = msg, status = CqrsConstants.StatusPending, details = "Raw message" });
                }
            }

            // 2. Query historical logs from PostgreSQL
            var trackingIds = await db.cqrs_tracking_logs
                .Where(l => l.queue_or_topic_name == queueName || l.destination_queue_name == queueName)
                .Select(l => l.tracking_id)
                .Distinct()
                .Take(100)
                .ToListAsync();

            foreach (var tid in trackingIds)
            {
                var logsQuery = db.cqrs_tracking_logs.Where(l => l.tracking_id == tid);

                if (queueName.StartsWith("sub_queue:"))
                {
                    logsQuery = logsQuery.Where(l => l.queue_or_topic_name == queueName || l.destination_queue_name == queueName);
                }
                else if (_dispatcher.GetAllTopics().Contains(queueName))
                {
                    logsQuery = logsQuery.Where(l => l.queue_or_topic_name == queueName || l.destination_queue_name == queueName ||
                        (l.queue_or_topic_name != null && l.queue_or_topic_name.StartsWith("sub_queue:" + queueName + ":")) ||
                        (l.destination_queue_name != null && l.destination_queue_name.StartsWith("sub_queue:" + queueName + ":")));
                }
                else
                {
                    logsQuery = logsQuery.Where(l => l.queue_or_topic_name == queueName || l.destination_queue_name == queueName);
                }

                var logs = await logsQuery
                    .OrderBy(l => l.created_at)
                    .ToListAsync();

                if (logs.Count > 0)
                {
                    var doneLog = logs.FirstOrDefault(l => l.step == "done");
                    var dequeueLog = logs.FirstOrDefault(l => l.step == "dequeue");
                    var sendLog = logs.FirstOrDefault(l => l.step == "send");

                    string statusStr = "pending";
                    string detailsStr = "Waiting in queue";

                    if (doneLog != null)
                    {
                        statusStr = doneLog.status.ToLower();
                        detailsStr = doneLog.error_message ?? (statusStr == "success" ? "Handled successfully" : "Failed");
                    }
                    else if (dequeueLog != null)
                    {
                        statusStr = "processing";
                        detailsStr = "Processing (Dequeued)";
                    }
                    else if (sendLog != null)
                    {
                        statusStr = sendLog.status == "success" ? "pending" : "error";
                        detailsStr = sendLog.status == "success" ? "Waiting in queue" : (sendLog.error_message ?? "Failed to send");
                    }

                    var contentEntry = logs.FirstOrDefault(l => !string.IsNullOrEmpty(l.message_data));
                    
                    resultList.Add(new {
                        trackingId = tid,
                        timestamp = logs.Min(l => l.created_at),
                        content = contentEntry?.message_data ?? "",
                        status = statusStr,
                        details = detailsStr
                    });
                }
            }

            var sortedResult = resultList.OrderByDescending(x => (DateTime)((dynamic)x).timestamp).ToList();
            var total = sortedResult.Count;
            var items = sortedResult.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();

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
                    if (d.status.Equals("error", StringComparison.OrdinalIgnoreCase)) {
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
    public async Task<IActionResult> GetTracking([FromServices] CqrsDbContext db, Guid trackingId)
    {
        var history = await db.cqrs_tracking_logs
            .Where(l => l.tracking_id == trackingId)
            .OrderBy(l => l.created_at)
            .ThenBy(l => l.id)
            .Select(l => new {
                trackingId = l.tracking_id,
                step = l.step,
                timestamp = l.created_at,
                time = l.created_at,
                messageContent = l.message_data,
                status = l.status,
                queueOrTopicName = l.queue_or_topic_name,
                subscriberName = l.subscriber_name,
                destinationQueueName = l.destination_queue_name,
                sourceComponent = l.source_component,
                handlerOrEventName = l.handler_name ?? "",
                workerName = l.worker_id ?? "",
                type = l.type,
                elapsedMilliseconds = l.elapsed_milliseconds,
                details = l.error_message ?? (l.status.ToLower() == "success"
                    ? (l.step == "send" ? "Sent successfully" : (l.step == "dequeue" ? "Dequeued successfully" : "Handled successfully"))
                    : "Processing...")
            })
            .ToListAsync();

        return Ok(history);
    }

    [HttpGet("tracking/recent")]
    public async Task<IActionResult> GetRecentTracking(
        [FromServices] CqrsDbContext db,
        [FromQuery] int pageIndex = 1, 
        [FromQuery] int pageSize = 50, 
        [FromQuery] string? trackingId = null,
        [FromQuery] string? content = null,
        [FromQuery] string? status = null)
    {
        _logger.LogInformation("[DEBUG Backend GetRecentTracking] Received pageIndex: {PageIndex}, pageSize: {PageSize}", pageIndex, pageSize);
        var query = db.cqrs_tracking_logs.Where(l => l.is_root);

        if (!string.IsNullOrEmpty(trackingId))
        {
            if (Guid.TryParse(trackingId, out var gId))
            {
                query = query.Where(l => l.tracking_id == gId);
            }
            else
            {
                var tIdStr = trackingId.ToLower();
                query = query.Where(l => EF.Functions.Like(l.tracking_id.ToString(), $"%{tIdStr}%"));
            }
        }

        if (!string.IsNullOrEmpty(content))
        {
            query = query.Where(l => EF.Functions.Like(l.message_data, $"%{content}%"));
        }

        if (!string.IsNullOrEmpty(status))
        {
            var statusLower = status.ToLower();
            var trackingIdsWithStatus = db.cqrs_tracking_logs
                .GroupBy(l => l.tracking_id)
                .Select(g => new
                {
                    TrackingId = g.Key,
                    LatestStatus = g.OrderByDescending(l => l.id).Select(l => l.status).FirstOrDefault()
                })
                .Where(x => x.LatestStatus != null && x.LatestStatus.ToLower() == statusLower)
                .Select(x => x.TrackingId);

            query = query.Where(l => trackingIdsWithStatus.Contains(l.tracking_id));
        }

        var total = await query.CountAsync();
        _logger.LogInformation("[DEBUG Backend GetRecentTracking] Counted Total: {Total}, Skip: {Skip}, Take: {Take}", total, (pageIndex - 1) * pageSize, pageSize);
        var rootLogs = await query
            .OrderByDescending(l => l.created_at)
            .Skip((pageIndex - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
        _logger.LogInformation("[DEBUG Backend GetRecentTracking] Fetched rootLogs count: {Count}", rootLogs.Count);

        var resultItems = new List<object>();

        foreach (var rootLog in rootLogs)
        {
            var latestLog = await db.cqrs_tracking_logs
                .Where(l => l.tracking_id == rootLog.tracking_id)
                .OrderByDescending(l => l.id)
                .FirstOrDefaultAsync() ?? rootLog;

            resultItems.Add(new {
                id = rootLog.tracking_id,
                step = latestLog.step,
                time = rootLog.created_at.ToString("O"),
                content = rootLog.message_data,
                status = latestLog.status,
                queueOrTopic = rootLog.queue_or_topic_name,
                subscriberName = latestLog.subscriber_name,
                destinationQueueName = latestLog.destination_queue_name,
                sourceComponent = rootLog.source_component,
                handler = latestLog.handler_name ?? "",
                worker = latestLog.worker_id ?? "",
                type = latestLog.type,
                elapsedMilliseconds = latestLog.elapsed_milliseconds,
                errorMessage = latestLog.error_message,
                isRoot = true
            });
        }

        return Ok(new { items = resultItems, total });
    }

    [HttpPost("tracking/{trackingId}/resend")]
    public async Task<IActionResult> ResendTracking([FromServices] CqrsDbContext db, string trackingId)
    {
        var logs = await db.cqrs_tracking_logs
            .Where(l => l.tracking_id == Guid.Parse(trackingId))
            .OrderBy(l => l.created_at)
            .ToListAsync();

        if (logs.Count == 0) return NotFound("Tracking not found");

        var firstEntry = logs.FirstOrDefault(l => l.is_root) ?? logs.First();
        if (string.IsNullOrEmpty(firstEntry.message_data)) return BadRequest("No message content found in tracking");

        var queueOrTopic = firstEntry.queue_or_topic_name;
        if (string.IsNullOrEmpty(queueOrTopic)) return BadRequest("Could not determine queue or topic");

        var obj = JsonSerializer.Deserialize<JsonElement>(firstEntry.message_data);
        
        if (firstEntry.step == "Enqueue")
        {
            await _queueService.EnqueueAsync(queueOrTopic, obj);
        }
        else if (firstEntry.step == "Publish")
        {
            await _eventBus.PublishAsync(queueOrTopic, obj);
        }
        else
        {
            await _queueService.EnqueueAsync(queueOrTopic, obj);
        }

        return Ok(new { message = "Resent successfully" });
    }

    [HttpDelete("tracking/{trackingId}")]
    public async Task<IActionResult> DeleteTracking([FromServices] CqrsDbContext db, string trackingId)
    {
        var logs = await db.cqrs_tracking_logs
            .Where(l => l.tracking_id == Guid.Parse(trackingId))
            .ToListAsync();

        if (logs.Count > 0)
        {
            db.cqrs_tracking_logs.RemoveRange(logs);
            await db.SaveChangesAsync();
        }

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
