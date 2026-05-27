using Core.Infra.Base.Interfaces;
using Core.Infra.Base.Constants;
using Core.Web.Api.Models;
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

namespace Core.Web.Api.Controllers;

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
        stats["queue_send_success"] = await db.CqrsTrackingLogs.CountAsync(l => l.Type == "queue" && l.Step == "send" && l.Status == "success");
        stats["queue_send_error"] = await db.CqrsTrackingLogs.CountAsync(l => l.Type == "queue" && l.Step == "send" && l.Status == "error");
        stats["queue_done_success"] = await db.CqrsTrackingLogs.CountAsync(l => l.Type == "queue" && l.Step == "done" && l.Status == "success");
        stats["queue_done_error"] = await db.CqrsTrackingLogs.CountAsync(l => l.Type == "queue" && l.Step == "done" && l.Status == "error");

        stats["topic_send_success"] = await db.CqrsTrackingLogs.CountAsync(l => l.Type == "topic" && l.Step == "send" && l.Status == "success");
        stats["topic_send_error"] = await db.CqrsTrackingLogs.CountAsync(l => l.Type == "topic" && l.Step == "send" && l.Status == "error");
        stats["topic_done_success"] = await db.CqrsTrackingLogs.CountAsync(l => l.Type == "topic" && l.Step == "done" && l.Status == "success" && l.SubscriberName != null);
        stats["topic_done_error"] = await db.CqrsTrackingLogs.CountAsync(l => l.Type == "topic" && l.Step == "done" && l.Status == "error" && l.SubscriberName != null);

        // 2. Active Processing
        stats["total:processing"] = await db.CqrsTrackingLogs
            .Where(p => p.Step == "dequeue")
            .Where(p => !db.CqrsTrackingLogs.Any(c => 
                c.TrackingId == p.TrackingId && 
                c.Step == "done" && 
                (c.HandlerName == p.HandlerName)))
            .Select(p => p.TrackingId)
            .Distinct()
            .CountAsync();

        // 3. Specific Entity Groups (Group by Name, Step, Status)
        var groups = await db.CqrsTrackingLogs
            .Where(l => (l.Step == "send" || l.Step == "done") && (l.Status == "success" || l.Status == "error"))
            .GroupBy(l => new { l.QueueOrTopicName, l.Step, l.Status })
            .Select(g => new { g.Key.QueueOrTopicName, g.Key.Step, g.Key.Status, Count = g.Count() })
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
        [FromQuery] int page = 1, 
        [FromQuery] int pageSize = 20)
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
            var trackingIds = await db.CqrsTrackingLogs
                .Where(l => l.QueueOrTopicName == queueName || l.DestinationQueueName == queueName)
                .Select(l => l.TrackingId)
                .Distinct()
                .Take(100)
                .ToListAsync();

            foreach (var tid in trackingIds)
            {
                var logsQuery = db.CqrsTrackingLogs.Where(l => l.TrackingId == tid);

                if (queueName.StartsWith("sub_queue:"))
                {
                    logsQuery = logsQuery.Where(l => l.QueueOrTopicName == queueName || l.DestinationQueueName == queueName);
                }
                else if (_dispatcher.GetAllTopics().Contains(queueName))
                {
                    logsQuery = logsQuery.Where(l => l.QueueOrTopicName == queueName || l.DestinationQueueName == queueName ||
                        (l.QueueOrTopicName != null && l.QueueOrTopicName.StartsWith("sub_queue:" + queueName + ":")) ||
                        (l.DestinationQueueName != null && l.DestinationQueueName.StartsWith("sub_queue:" + queueName + ":")));
                }
                else
                {
                    logsQuery = logsQuery.Where(l => l.QueueOrTopicName == queueName || l.DestinationQueueName == queueName);
                }

                var logs = await logsQuery
                    .OrderBy(l => l.CreatedAt)
                    .ToListAsync();

                if (logs.Count > 0)
                {
                    var doneLog = logs.FirstOrDefault(l => l.Step == "done");
                    var dequeueLog = logs.FirstOrDefault(l => l.Step == "dequeue");
                    var sendLog = logs.FirstOrDefault(l => l.Step == "send");

                    string statusStr = "pending";
                    string detailsStr = "Waiting in queue";

                    if (doneLog != null)
                    {
                        statusStr = doneLog.Status.ToLower();
                        detailsStr = doneLog.ErrorMessage ?? (statusStr == "success" ? "Handled successfully" : "Failed");
                    }
                    else if (dequeueLog != null)
                    {
                        statusStr = "processing";
                        detailsStr = "Processing (Dequeued)";
                    }
                    else if (sendLog != null)
                    {
                        statusStr = sendLog.Status == "success" ? "pending" : "error";
                        detailsStr = sendLog.Status == "success" ? "Waiting in queue" : (sendLog.ErrorMessage ?? "Failed to send");
                    }

                    var contentEntry = logs.FirstOrDefault(l => !string.IsNullOrEmpty(l.MessageData));
                    
                    resultList.Add(new {
                        trackingId = tid,
                        timestamp = logs.Min(l => l.CreatedAt),
                        content = contentEntry?.MessageData ?? "",
                        status = statusStr,
                        details = detailsStr
                    });
                }
            }

            var sortedResult = resultList.OrderByDescending(x => (DateTime)((dynamic)x).timestamp).ToList();
            var total = sortedResult.Count;
            var items = sortedResult.Skip((page - 1) * pageSize).Take(pageSize).ToList();

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
        var history = await db.CqrsTrackingLogs
            .Where(l => l.TrackingId == trackingId)
            .OrderBy(l => l.CreatedAt)
            .ThenBy(l => l.Id)
            .Select(l => new {
                trackingId = l.TrackingId,
                step = l.Step,
                timestamp = l.CreatedAt,
                time = l.CreatedAt,
                messageContent = l.MessageData,
                status = l.Status,
                queueOrTopicName = l.QueueOrTopicName,
                subscriberName = l.SubscriberName,
                destinationQueueName = l.DestinationQueueName,
                sourceComponent = l.SourceComponent,
                handlerOrEventName = l.HandlerName ?? "",
                workerName = l.WorkerId ?? "",
                type = l.Type,
                elapsedMilliseconds = l.ElapsedMilliseconds,
                details = l.ErrorMessage ?? (l.Status == "Success" ? "Handled successfully" : "Processing...")
            })
            .ToListAsync();

        return Ok(history);
    }

    [HttpGet("tracking/recent")]
    public async Task<IActionResult> GetRecentTracking(
        [FromServices] CqrsDbContext db,
        [FromQuery] int page = 1, 
        [FromQuery] int pageSize = 50, 
        [FromQuery] string? trackingId = null,
        [FromQuery] string? content = null,
        [FromQuery] string? status = null)
    {
        var query = db.CqrsTrackingLogs.Where(l => l.IsRoot);

        if (!string.IsNullOrEmpty(trackingId))
        {
            if (Guid.TryParse(trackingId, out var gId))
            {
                query = query.Where(l => l.TrackingId == gId);
            }
            else
            {
                var tIdStr = trackingId.ToLower();
                query = query.Where(l => EF.Functions.Like(l.TrackingId.ToString(), $"%{tIdStr}%"));
            }
        }

        if (!string.IsNullOrEmpty(content))
        {
            query = query.Where(l => EF.Functions.Like(l.MessageData, $"%{content}%"));
        }

        if (!string.IsNullOrEmpty(status))
        {
            var statusLower = status.ToLower();
            var trackingIdsWithStatus = db.CqrsTrackingLogs
                .GroupBy(l => l.TrackingId)
                .Select(g => new
                {
                    TrackingId = g.Key,
                    LatestStatus = g.OrderByDescending(l => l.Id).Select(l => l.Status).FirstOrDefault()
                })
                .Where(x => x.LatestStatus != null && x.LatestStatus.ToLower() == statusLower)
                .Select(x => x.TrackingId);

            query = query.Where(l => trackingIdsWithStatus.Contains(l.TrackingId));
        }

        var total = await query.CountAsync();
        var rootLogs = await query
            .OrderByDescending(l => l.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var resultItems = new List<object>();

        foreach (var rootLog in rootLogs)
        {
            var latestLog = await db.CqrsTrackingLogs
                .Where(l => l.TrackingId == rootLog.TrackingId)
                .OrderByDescending(l => l.Id)
                .FirstOrDefaultAsync() ?? rootLog;

            resultItems.Add(new {
                id = rootLog.TrackingId,
                step = latestLog.Step,
                time = rootLog.CreatedAt.ToString("O"),
                content = rootLog.MessageData,
                status = latestLog.Status,
                queueOrTopic = rootLog.QueueOrTopicName,
                subscriberName = latestLog.SubscriberName,
                destinationQueueName = latestLog.DestinationQueueName,
                sourceComponent = rootLog.SourceComponent,
                handler = latestLog.HandlerName ?? "",
                worker = latestLog.WorkerId ?? "",
                type = latestLog.Type,
                elapsedMilliseconds = latestLog.ElapsedMilliseconds,
                errorMessage = latestLog.ErrorMessage,
                isRoot = true
            });
        }

        return Ok(new { items = resultItems, total });
    }

    [HttpPost("tracking/{trackingId}/resend")]
    public async Task<IActionResult> ResendTracking([FromServices] CqrsDbContext db, string trackingId)
    {
        var logs = await db.CqrsTrackingLogs
            .Where(l => l.TrackingId == Guid.Parse(trackingId))
            .OrderBy(l => l.CreatedAt)
            .ToListAsync();

        if (logs.Count == 0) return NotFound("Tracking not found");

        var firstEntry = logs.FirstOrDefault(l => l.IsRoot) ?? logs.First();
        if (string.IsNullOrEmpty(firstEntry.MessageData)) return BadRequest("No message content found in tracking");

        var queueOrTopic = firstEntry.QueueOrTopicName;
        if (string.IsNullOrEmpty(queueOrTopic)) return BadRequest("Could not determine queue or topic");

        var obj = JsonSerializer.Deserialize<JsonElement>(firstEntry.MessageData);
        
        if (firstEntry.Step == "Enqueue")
        {
            await _queueService.EnqueueAsync(queueOrTopic, obj);
        }
        else if (firstEntry.Step == "Publish")
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
        var logs = await db.CqrsTrackingLogs
            .Where(l => l.TrackingId == Guid.Parse(trackingId))
            .ToListAsync();

        if (logs.Count > 0)
        {
            db.CqrsTrackingLogs.RemoveRange(logs);
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
