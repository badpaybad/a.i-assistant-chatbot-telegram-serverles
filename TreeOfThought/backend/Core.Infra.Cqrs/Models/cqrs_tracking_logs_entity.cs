using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Infra.Cqrs.Models;

[Table("cqrs_tracking_logs")]
public class cqrs_tracking_logs_entity
{
    [Key]
    [Column("id")]
    public long id { get; set; }

    [Column("tracking_id")]
    public Guid tracking_id { get; set; }

    [Required]
    [MaxLength(255)]
    [Column("message_type")]
    public string message_type { get; set; } = string.Empty;

    [Required]
    [Column("message_data")]
    public string message_data { get; set; } = string.Empty;

    [Required]
    [MaxLength(255)]
    [Column("queue_or_topic_name")]
    public string queue_or_topic_name { get; set; } = string.Empty;

    [MaxLength(255)]
    [Column("subscriber_name")]
    public string? subscriber_name { get; set; }

    [MaxLength(255)]
    [Column("destination_queue_name")]
    public string? destination_queue_name { get; set; }

    [MaxLength(255)]
    [Column("source_component")]
    public string? source_component { get; set; }

    [MaxLength(255)]
    [Column("handler_name")]
    public string? handler_name { get; set; }

    [MaxLength(255)]
    [Column("worker_id")]
    public string? worker_id { get; set; }

    [Required]
    [MaxLength(50)]
    [Column("step")]
    public string step { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    [Column("status")]
    public string status { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    [Column("type")]
    public string type { get; set; } = string.Empty;

    [Column("elapsed_milliseconds")]
    public long? elapsed_milliseconds { get; set; }

    [Column("error_message")]
    public string? error_message { get; set; }

    [Column("is_root")]
    public bool is_root { get; set; }

    [Required]
    [Column("created_at")]
    public DateTime created_at { get; set; } = DateTime.UtcNow;
}
