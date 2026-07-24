using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MongoDB.Bson.Serialization.Attributes;

namespace Core.Infra.Data.Models;

[Table("audit_logs")]
public class audit_logs_entity
{
    [Key]
    [BsonId]
    [Column("id")]
    public Guid id { get; set; }

    [Required]
    [MaxLength(256)]
    [Column("table_name")]
    [BsonElement("table_name")]
    public string table_name { get; set; } = default!;

    [Required]
    [MaxLength(50)]
    [Column("action")]
    [BsonElement("action")]
    public string action { get; set; } = default!;

    [Required]
    [MaxLength(1000)]
    [Column("entity_id")]
    [BsonElement("entity_id")]
    public string entity_id { get; set; } = default!;

    [Column("before_state")]
    [BsonElement("before_state")]
    public string? before_state { get; set; }

    [Column("after_state")]
    [BsonElement("after_state")]
    public string? after_state { get; set; }

    [Column("timestamp")]
    [BsonElement("timestamp")]
    public DateTime timestamp { get; set; } = DateTime.UtcNow;

    [MaxLength(256)]
    [Column("user_id")]
    [BsonElement("user_id")]
    public string? user_id { get; set; }
}
