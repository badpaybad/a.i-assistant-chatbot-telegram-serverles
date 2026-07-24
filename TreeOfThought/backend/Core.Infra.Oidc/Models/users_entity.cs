using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Infra.Base.Interfaces;

namespace Core.Infra.Oidc.Models;

[Table("users")]
public class users_entity : IBaseTrackingEntity<Guid>
{
    [Key]
    [Column("id")]
    public Guid id { get; set; } = Guid.NewGuid();

    [NotMapped]
    Guid IEntity<Guid>.Id
    {
        get => id;
        set => id = value;
    }

    [Required]
    [MaxLength(255)]
    [Column("username")]
    public string username { get; set; } = string.Empty;

    [Required]
    [MaxLength(255)]
    [Column("password_hash")]
    public string password_hash { get; set; } = string.Empty;

    [Required]
    [MaxLength(255)]
    [Column("display_name")]
    public string display_name { get; set; } = string.Empty;

    [Column("avatar_url")]
    public string? avatar_url { get; set; }
    
    [Required]
    [MaxLength(255)]
    [Column("email")]
    public string email { get; set; } = string.Empty;

    [Column("is_email_verified")]
    public bool is_email_verified { get; set; }

    [MaxLength(255)]
    [Column("verification_code")]
    public string? verification_code { get; set; }

    [MaxLength(50)]
    [Column("sso_provider")]
    public string? sso_provider { get; set; }

    [MaxLength(255)]
    [Column("sso_id")]
    public string? sso_id { get; set; }
    
    [Column("must_change_password")]
    public bool must_change_password { get; set; } = false;

    [Column("is_mfa_enabled")]
    public bool is_mfa_enabled { get; set; } = false;

    [MaxLength(255)]
    [Column("mfa_secret")]
    public string? mfa_secret { get; set; }

    [Column("mfa_backup_codes")]
    public string? mfa_backup_codes { get; set; }

    [MaxLength(50)]
    [Column("preferred_mfa_provider")]
    public string? preferred_mfa_provider { get; set; }

    [Required]
    [Column("created_at")]
    public DateTime created_at { get; set; } = DateTime.UtcNow;

    [Column("updated_at")]
    public DateTime? updated_at { get; set; }

    [Column("created_by")]
    public string? created_by { get; set; }

    [Column("updated_by")]
    public string? updated_by { get; set; }

    [NotMapped]
    DateTime IBaseTrackingEntity<Guid>.CreatedAt
    {
        get => created_at;
        set => created_at = value;
    }

    [NotMapped]
    DateTime? IBaseTrackingEntity<Guid>.UpdatedAt
    {
        get => updated_at;
        set => updated_at = value;
    }

    [NotMapped]
    string? IBaseTrackingEntity<Guid>.CreatedBy
    {
        get => created_by;
        set => created_by = value;
    }

    [NotMapped]
    string? IBaseTrackingEntity<Guid>.UpdatedBy
    {
        get => updated_by;
        set => updated_by = value;
    }
}
