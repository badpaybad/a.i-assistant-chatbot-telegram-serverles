using System.Text.Json.Nodes;

namespace Core.Infra.ElsaBpnmWorkflow.Models;

public class WorkflowDefinitionDto
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string DefinitionId { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int Version { get; set; } = 1;
    public bool IsPublished { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public List<WorkflowNodeDto> Nodes { get; set; } = new();
    public List<WorkflowConnectionDto> Connections { get; set; } = new();
    public Dictionary<string, object>? Variables { get; set; } = new();
}

public class WorkflowNodeDto
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; } = string.Empty;
    public string ActivityType { get; set; } = string.Empty; // e.g. Http, Redis, MongoDb, Kafka, RabbitMq, Postgres, Cqrs, Telegram
    public string Category { get; set; } = "General"; // Triggers, System, Messaging, Storage, Integrations
    public double PositionX { get; set; } = 100;
    public double PositionY { get; set; } = 100;
    public Dictionary<string, object> Properties { get; set; } = new();
}

public class WorkflowConnectionDto
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string SourceNodeId { get; set; } = string.Empty;
    public string TargetNodeId { get; set; } = string.Empty;
    public string Outcome { get; set; } = "Done"; // Done, True, False, Error
}
