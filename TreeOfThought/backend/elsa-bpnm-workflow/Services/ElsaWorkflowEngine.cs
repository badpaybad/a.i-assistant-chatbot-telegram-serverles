using System.Collections.Concurrent;
using Core.Infra.ElsaBpnmWorkflow.Models;
using Microsoft.Extensions.Logging;

namespace Core.Infra.ElsaBpnmWorkflow.Services;

public class ElsaWorkflowEngine : IElsaWorkflowEngine
{
    private readonly ConcurrentDictionary<string, WorkflowDefinitionDto> _definitions = new();
    private readonly ConcurrentDictionary<string, WorkflowInstanceDto> _instances = new();
    private readonly ConcurrentDictionary<string, UserTaskDto> _userTasks = new();
    private readonly ILogger<ElsaWorkflowEngine> _logger;

    public ElsaWorkflowEngine(ILogger<ElsaWorkflowEngine> logger)
    {
        _logger = logger;
        SeedSampleDefinitions();
        SeedSampleUserTasks();
    }

    private void SeedSampleDefinitions()
    {
        var sampleDefinition = new WorkflowDefinitionDto
        {
            Id = "wf-order-fulfillment-sample",
            DefinitionId = "order-fulfillment",
            Name = "Order Fulfillment & Multi-System Workflow",
            Description = "Mẫu quy trình xử lý đơn hàng tích hợp Redis Cache, PostgreSQL Audit Log, RabbitMQ Async Message & Notification",
            Version = 1,
            IsPublished = true,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            Nodes = new List<WorkflowNodeDto>
            {
                new WorkflowNodeDto
                {
                    Id = "node-1",
                    Name = "HTTP Order Webhook Trigger",
                    ActivityType = "HttpTrigger",
                    Category = "Triggers",
                    PositionX = 100,
                    PositionY = 150,
                    Properties = new Dictionary<string, object>
                    {
                        { "path", "/api/orders/webhook" },
                        { "method", "POST" }
                    }
                },
                new WorkflowNodeDto
                {
                    Id = "node-2",
                    Name = "Save Order to PostgreSQL",
                    ActivityType = "PostgresQuery",
                    Category = "Storage",
                    PositionX = 350,
                    PositionY = 150,
                    Properties = new Dictionary<string, object>
                    {
                        { "sql", "INSERT INTO orders(id, amount, status) VALUES (@orderId, @amount, 'Pending');" },
                        { "connectionString", "Host=localhost;Database=tot_db;Username=postgres;" }
                    }
                },
                new WorkflowNodeDto
                {
                    Id = "node-3",
                    Name = "Cache Order Status in Redis",
                    ActivityType = "RedisCache",
                    Category = "Storage",
                    PositionX = 600,
                    PositionY = 150,
                    Properties = new Dictionary<string, object>
                    {
                        { "key", "order:status:@orderId" },
                        { "value", "Processing" },
                        { "expirySeconds", 3600 }
                    }
                },
                new WorkflowNodeDto
                {
                    Id = "node-4",
                    Name = "Publish Message to RabbitMQ",
                    ActivityType = "RabbitMqPublish",
                    Category = "Messaging",
                    PositionX = 850,
                    PositionY = 150,
                    Properties = new Dictionary<string, object>
                    {
                        { "exchange", "order-exchange" },
                        { "routingKey", "order.created" },
                        { "payload", "{ \"orderId\": \"@orderId\", \"event\": \"Created\" }" }
                    }
                },
                new WorkflowNodeDto
                {
                    Id = "node-5",
                    Name = "Send Telegram Notification",
                    ActivityType = "TelegramNotification",
                    Category = "Integrations",
                    PositionX = 1100,
                    PositionY = 150,
                    Properties = new Dictionary<string, object>
                    {
                        { "chatId", "-10012345678" },
                        { "message", "Đơn hàng mới #@orderId đã được khởi tạo thành công!" }
                    }
                }
            },
            Connections = new List<WorkflowConnectionDto>
            {
                new WorkflowConnectionDto { Id = "c1", SourceNodeId = "node-1", TargetNodeId = "node-2", Outcome = "Done" },
                new WorkflowConnectionDto { Id = "c2", SourceNodeId = "node-2", TargetNodeId = "node-3", Outcome = "Done" },
                new WorkflowConnectionDto { Id = "c3", SourceNodeId = "node-3", TargetNodeId = "node-4", Outcome = "Done" },
                new WorkflowConnectionDto { Id = "c4", SourceNodeId = "node-4", TargetNodeId = "node-5", Outcome = "Done" }
            }
        };

        _definitions[sampleDefinition.Id] = sampleDefinition;
    }

    private void SeedSampleUserTasks()
    {
        var task1 = new UserTaskDto
        {
            Id = "task-approve-order-001",
            WorkflowInstanceId = "inst-sample-01",
            WorkflowName = "Order Fulfillment & Multi-System Workflow",
            TaskName = "Phê duyệt thanh toán đơn hàng #ORD-9982",
            Description = "Yêu cầu ban quản trị duyệt khoản thanh toán giá trị 25.000.000 VNĐ cho đơn hàng nhập khẩu thiết bị.",
            Status = "Pending",
            Assignee = "Admin",
            CreatedAt = DateTime.UtcNow.AddHours(-2),
            TaskPayload = new Dictionary<string, object>
            {
                { "orderId", "ORD-9982" },
                { "amount", "25000000 VNĐ" },
                { "customer", "Công ty TNHH Giải Pháp Công Nghệ" }
            }
        };

        var task2 = new UserTaskDto
        {
            Id = "task-approve-contract-002",
            WorkflowInstanceId = "inst-sample-02",
            WorkflowName = "Contract Review Process",
            TaskName = "Phê duyệt Hợp đồng Đối tác số #HD-2026/05",
            Description = "Xác nhận điều khoản hợp đồng dịch vụ lưu trữ dữ liệu phân tán PostgreSQL & Kafka Cluster.",
            Status = "Approved",
            Assignee = "Admin",
            CreatedAt = DateTime.UtcNow.AddDays(-1),
            CompletedAt = DateTime.UtcNow.AddHours(-5),
            DecisionReason = "Đã kiểm tra hợp lệ toàn bộ điều khoản pháp lý.",
            TaskPayload = new Dictionary<string, object>
            {
                { "contractId", "HD-2026/05" },
                { "partner", "Cloud Infra Provider" }
            }
        };

        _userTasks[task1.Id] = task1;
        _userTasks[task2.Id] = task2;
    }

    public Task<List<WorkflowDefinitionDto>> GetDefinitionsAsync()
    {
        return Task.FromResult(_definitions.Values.OrderByDescending(d => d.UpdatedAt).ToList());
    }

    public Task<WorkflowDefinitionDto?> GetDefinitionByIdAsync(string id)
    {
        _definitions.TryGetValue(id, out var def);
        return Task.FromResult(def);
    }

    public Task<WorkflowDefinitionDto> SaveDefinitionAsync(WorkflowDefinitionDto definition)
    {
        if (string.IsNullOrWhiteSpace(definition.Id))
        {
            definition.Id = Guid.NewGuid().ToString();
        }
        definition.UpdatedAt = DateTime.UtcNow;
        _definitions[definition.Id] = definition;
        _logger.LogInformation("Saved Workflow Definition: {Id} - {Name}", definition.Id, definition.Name);
        return Task.FromResult(definition);
    }

    public Task<bool> DeleteDefinitionAsync(string id)
    {
        return Task.FromResult(_definitions.TryRemove(id, out _));
    }

    public async Task<WorkflowInstanceDto> ExecuteWorkflowAsync(ExecuteWorkflowRequest request)
    {
        var definition = await GetDefinitionByIdAsync(request.DefinitionId);
        if (definition == null)
        {
            throw new ArgumentException($"Workflow definition with ID '{request.DefinitionId}' not found.");
        }

        var instance = new WorkflowInstanceDto
        {
            Id = "inst-" + Guid.NewGuid().ToString("N")[..10],
            DefinitionId = definition.Id,
            WorkflowName = definition.Name,
            Version = definition.Version,
            Status = WorkflowStatus.Running,
            StartedAt = DateTime.UtcNow,
            InputData = request.Input ?? new Dictionary<string, object>()
        };

        _instances[instance.Id] = instance;

        _logger.LogInformation("Executing Workflow Instance {InstanceId} for Workflow '{WorkflowName}'", instance.Id, definition.Name);

        var visitedNodes = new HashSet<string>();
        var currentNode = definition.Nodes.FirstOrDefault(n => n.Category == "Triggers" || n.ActivityType.EndsWith("Trigger"))
                           ?? definition.Nodes.FirstOrDefault();

        while (currentNode != null && !visitedNodes.Contains(currentNode.Id))
        {
            visitedNodes.Add(currentNode.Id);

            var executionLog = new WorkflowExecutionLogDto
            {
                Id = Guid.NewGuid().ToString(),
                NodeId = currentNode.Id,
                NodeName = currentNode.Name,
                ActivityType = currentNode.ActivityType,
                Timestamp = DateTime.UtcNow,
                Status = "Completed",
                Message = $"Activity '{currentNode.Name}' ({currentNode.ActivityType}) executed successfully."
            };

            instance.ExecutionLogs.Add(executionLog);

            var connection = definition.Connections.FirstOrDefault(c => c.SourceNodeId == currentNode.Id);
            if (connection != null)
            {
                currentNode = definition.Nodes.FirstOrDefault(n => n.Id == connection.TargetNodeId);
            }
            else
            {
                currentNode = null;
            }

            await Task.Delay(50);
        }

        instance.Status = WorkflowStatus.Completed;
        instance.FinishedAt = DateTime.UtcNow;
        instance.OutputData = new Dictionary<string, object>
        {
            { "result", "Success" },
            { "executedNodesCount", visitedNodes.Count },
            { "completedAt", DateTime.UtcNow.ToString("o") }
        };

        _instances[instance.Id] = instance;
        return instance;
    }

    public Task<List<WorkflowInstanceDto>> GetInstancesAsync()
    {
        return Task.FromResult(_instances.Values.OrderByDescending(i => i.StartedAt).ToList());
    }

    public Task<WorkflowInstanceDto?> GetInstanceByIdAsync(string id)
    {
        _instances.TryGetValue(id, out var inst);
        return Task.FromResult(inst);
    }

    public Task<List<UserTaskDto>> GetUserTasksAsync()
    {
        return Task.FromResult(_userTasks.Values.OrderByDescending(t => t.CreatedAt).ToList());
    }

    public Task<UserTaskDto> ApproveUserTaskAsync(string taskId, bool approved, string? reason)
    {
        if (!_userTasks.TryGetValue(taskId, out var task))
        {
            throw new ArgumentException($"User task '{taskId}' not found.");
        }

        task.Status = approved ? "Approved" : "Rejected";
        task.CompletedAt = DateTime.UtcNow;
        task.DecisionReason = reason ?? (approved ? "Đã phê duyệt chấp nhận" : "Đã từ chối tác vụ");

        _userTasks[taskId] = task;
        _logger.LogInformation("User Task {TaskId} decision: {Status}. Reason: {Reason}", taskId, task.Status, task.DecisionReason);

        return Task.FromResult(task);
    }

    public Task<DashboardStatsDto> GetDashboardStatsAsync()
    {
        var instances = _instances.Values.ToList();
        var total = instances.Count;
        var completed = instances.Count(i => i.Status == WorkflowStatus.Completed);
        var failed = instances.Count(i => i.Status == WorkflowStatus.Failed);
        var running = instances.Count(i => i.Status == WorkflowStatus.Running);
        var pendingTasks = _userTasks.Values.Count(t => t.Status == "Pending");

        var stats = new DashboardStatsDto
        {
            TotalDefinitions = _definitions.Count,
            TotalInstances = total,
            RunningInstances = running,
            CompletedInstances = completed,
            FailedInstances = failed,
            PendingUserTasks = pendingTasks,
            SuccessRate = total > 0 ? Math.Round((double)completed / total * 100, 1) : 100.0,
            RecentExecutions = instances.OrderByDescending(i => i.StartedAt).Take(5).ToList()
        };

        return Task.FromResult(stats);
    }

    public List<ActivityMetadataDto> GetAvailableActivities()
    {
        return new List<ActivityMetadataDto>
        {
            new ActivityMetadataDto
            {
                ActivityType = "HttpRequest",
                DisplayName = "HTTP API Request",
                Category = "HTTP",
                Description = "Gửi HTTP Request đến REST API bên ngoài (GET, POST, PUT, DELETE)",
                Properties = new List<ActivityPropertySchemaDto>
                {
                    new ActivityPropertySchemaDto { Name = "url", Label = "API URL", Type = "string", DefaultValue = "https://api.example.com/data" },
                    new ActivityPropertySchemaDto { Name = "method", Label = "HTTP Method", Type = "select", DefaultValue = "GET", Options = new List<string> { "GET", "POST", "PUT", "DELETE" } }
                }
            },
            new ActivityMetadataDto
            {
                ActivityType = "RedisCache",
                DisplayName = "Redis Cache Operations",
                Category = "Storage",
                Description = "Đọc/Ghi dữ liệu tạm thời vào hệ thống Redis Caching",
                Properties = new List<ActivityPropertySchemaDto>
                {
                    new ActivityPropertySchemaDto { Name = "operation", Label = "Thao tác", Type = "select", DefaultValue = "Set", Options = new List<string> { "Set", "Get", "Delete" } },
                    new ActivityPropertySchemaDto { Name = "key", Label = "Redis Key", Type = "string", DefaultValue = "cache:key" }
                }
            },
            new ActivityMetadataDto
            {
                ActivityType = "MongoDbQuery",
                DisplayName = "MongoDB Document Store",
                Category = "Storage",
                Description = "Thao tác cơ sở dữ liệu MongoDB NoSQL (Insert, Query, Update)",
                Properties = new List<ActivityPropertySchemaDto>
                {
                    new ActivityPropertySchemaDto { Name = "collectionName", Label = "Tên Collection", Type = "string", DefaultValue = "workflow_logs" }
                }
            },
            new ActivityMetadataDto
            {
                ActivityType = "PostgresQuery",
                DisplayName = "PostgreSQL Database Query",
                Category = "Storage",
                Description = "Thực thi câu lệnh SQL trực tiếp trên cơ sở dữ liệu PostgreSQL",
                Properties = new List<ActivityPropertySchemaDto>
                {
                    new ActivityPropertySchemaDto { Name = "sql", Label = "Câu lệnh SQL", Type = "string", DefaultValue = "SELECT * FROM users WHERE active = true;" }
                }
            },
            new ActivityMetadataDto
            {
                ActivityType = "KafkaPublish",
                DisplayName = "Apache Kafka Publisher",
                Category = "Messaging",
                Description = "Gửi thông điệp sự kiện thời gian thực tới Topic Apache Kafka",
                Properties = new List<ActivityPropertySchemaDto>
                {
                    new ActivityPropertySchemaDto { Name = "topic", Label = "Kafka Topic Name", Type = "string", DefaultValue = "events.orders" }
                }
            },
            new ActivityMetadataDto
            {
                ActivityType = "RabbitMqPublish",
                DisplayName = "RabbitMQ Queue Producer",
                Category = "Messaging",
                Description = "Đưa thông điệp vào hàng đợi RabbitMQ Exchange",
                Properties = new List<ActivityPropertySchemaDto>
                {
                    new ActivityPropertySchemaDto { Name = "exchange", Label = "Exchange Name", Type = "string", DefaultValue = "tot-exchange" }
                }
            },
            new ActivityMetadataDto
            {
                ActivityType = "CqrsCommand",
                DisplayName = "CQRS Core Command Dispatcher",
                Category = "Core Infra",
                Description = "Phát lệnh CQRS Command tới bus hệ thống Core.Infra.Cqrs",
                Properties = new List<ActivityPropertySchemaDto>
                {
                    new ActivityPropertySchemaDto { Name = "commandType", Label = "Command Full Name", Type = "string", DefaultValue = "Core.Infra.FilesFolders.Models.UploadFileCommand" }
                }
            },
            new ActivityMetadataDto
            {
                ActivityType = "TelegramNotification",
                DisplayName = "Telegram Bot Notification",
                Category = "Integrations",
                Description = "Gửi tin nhắn cảnh báo/thông báo tự động tới Telegram Group hoặc Channel",
                Properties = new List<ActivityPropertySchemaDto>
                {
                    new ActivityPropertySchemaDto { Name = "chatId", Label = "Telegram Chat ID", Type = "string", DefaultValue = "-10012345678" }
                }
            }
        };
    }

    public List<ActivityMetadataDto> GetAvailableTriggers()
    {
        return new List<ActivityMetadataDto>
        {
            new ActivityMetadataDto
            {
                ActivityType = "HttpTrigger",
                DisplayName = "HTTP Webhook Listener",
                Category = "Triggers",
                Description = "Lắng nghe sự kiện kích hoạt từ HTTP Request / Webhook",
                Properties = new List<ActivityPropertySchemaDto>
                {
                    new ActivityPropertySchemaDto { Name = "path", Label = "Endpoint Path", Type = "string", DefaultValue = "/api/workflows/trigger/order" }
                }
            },
            new ActivityMetadataDto
            {
                ActivityType = "CronTrigger",
                DisplayName = "Cron Schedule / Timer Trigger",
                Category = "Triggers",
                Description = "Kích hoạt chạy quy trình theo lịch biểu Cron định kỳ",
                Properties = new List<ActivityPropertySchemaDto>
                {
                    new ActivityPropertySchemaDto { Name = "cronExpression", Label = "Cron Expression", Type = "string", DefaultValue = "0 */5 * * * *" }
                }
            }
        };
    }
}
