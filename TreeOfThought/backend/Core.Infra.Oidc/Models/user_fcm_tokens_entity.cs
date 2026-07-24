using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Infra.Base.Interfaces;

namespace Core.Infra.Oidc.Models;

[Table("user_fcm_tokens")]
public class user_fcm_tokens_entity : IBaseTrackingEntity<Guid>
{
    [Key]
    [Column("id")]
    public Guid id { get; set; } = Guid.NewGuid();

    [Column("user_id")]
    public Guid user_id { get; set; }

    [Required]
    [Column("fcm_token")]
    public string fcm_token { get; set; } = string.Empty;

    [Required]
    [MaxLength(255)]
    [Column("device_id")]
    public string device_id { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    [Column("app_type")]
    public string app_type { get; set; } = string.Empty; // e.g. "admin", "mobi android", "reactjsatest"

    [Required]
    [Column("created_at")]
    public DateTime created_at { get; set; } = DateTime.UtcNow;

    [Column("updated_at")]
    public DateTime? updated_at { get; set; }

    [Column("created_by")]
    public string? created_by { get; set; }

    [Column("updated_by")]
    public string? updated_by { get; set; }
}
