namespace Core.Infra.ElsaBpnmWorkflow.Models;

public enum WorkflowStatus
{
    Running,
    Completed,
    Failed,
    Cancelled,
    Suspended
}

public class WorkflowInstanceDto
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string DefinitionId { get; set; } = string.Empty;
    public string WorkflowName { get; set; } = string.Empty;
    public int Version { get; set; } = 1;
    public WorkflowStatus Status { get; set; } = WorkflowStatus.Running;
    public DateTime StartedAt { get; set; } = DateTime.UtcNow;
    public DateTime? FinishedAt { get; set; }
    public Dictionary<string, object>? InputData { get; set; } = new();
    public Dictionary<string, object>? OutputData { get; set; } = new();
    public string? ErrorMessage { get; set; }
    public List<WorkflowExecutionLogDto> ExecutionLogs { get; set; } = new();
}

public class WorkflowExecutionLogDto
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string NodeId { get; set; } = string.Empty;
    public string NodeName { get; set; } = string.Empty;
    public string ActivityType { get; set; } = string.Empty;
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    public string Status { get; set; } = "Completed"; // Completed, Executing, Failed
    public string? Message { get; set; }
    public Dictionary<string, object>? EventData { get; set; } = new();
}

public class ExecuteWorkflowRequest
{
    public string DefinitionId { get; set; } = string.Empty;
    public Dictionary<string, object>? Input { get; set; } = new();
}

public class UserTaskDto
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string WorkflowInstanceId { get; set; } = string.Empty;
    public string WorkflowName { get; set; } = string.Empty;
    public string TaskName { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Status { get; set; } = "Pending"; // Pending, Approved, Rejected
    public string? Assignee { get; set; } = "Admin";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? CompletedAt { get; set; }
    public string? DecisionReason { get; set; }
    public Dictionary<string, object>? TaskPayload { get; set; } = new();
}

public class ApproveTaskRequest
{
    public string TaskId { get; set; } = string.Empty;
    public bool Approved { get; set; } = true;
    public string? Reason { get; set; }
}

public class DashboardStatsDto
{
    public int TotalDefinitions { get; set; }
    public int TotalInstances { get; set; }
    public int RunningInstances { get; set; }
    public int CompletedInstances { get; set; }
    public int FailedInstances { get; set; }
    public int PendingUserTasks { get; set; }
    public double SuccessRate { get; set; }
    public List<WorkflowInstanceDto> RecentExecutions { get; set; } = new();
}

public class ActivityMetadataDto
{
    public string ActivityType { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public List<ActivityPropertySchemaDto> Properties { get; set; } = new();
}

public class ActivityPropertySchemaDto
{
    public string Name { get; set; } = string.Empty;
    public string Label { get; set; } = string.Empty;
    public string Type { get; set; } = "string"; // string, number, boolean, json, select
    public string? DefaultValue { get; set; }
    public List<string>? Options { get; set; }
}
