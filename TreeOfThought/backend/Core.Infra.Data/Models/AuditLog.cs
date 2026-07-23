using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MongoDB.Bson.Serialization.Attributes;

namespace Core.Infra.Data.Models;

[Table("AuditLogs")]
public class AuditLog
{
    [Key]
    [BsonId]
    public Guid Id { get; set; }

    [Required]
    [MaxLength(256)]
    public string TableName { get; set; } = default!;

    [Required]
    [MaxLength(50)]
    public string Action { get; set; } = default!;

    [Required]
    [MaxLength(1000)]
    public string EntityId { get; set; } = default!;

    public string? BeforeState { get; set; }

    public string? AfterState { get; set; }

    public DateTime Timestamp { get; set; } = DateTime.UtcNow;

    [MaxLength(256)]
    public string? UserId { get; set; }
}
