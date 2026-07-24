using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Infra.Base.Interfaces;
using Core.Infra.Auth.Models;

namespace Core.Infra.Oidc.Models;

[Table("roles")]
public class roles_entity : IBaseTrackingEntity<Guid>
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
    [Column("name")]
    public string name { get; set; } = string.Empty;

    [Column("description")]
    public string? description { get; set; }

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

[Table("app_claims")]
public class app_claims_entity : IBaseTrackingEntity<Guid>
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
    [Column("name")]
    public string name { get; set; } = string.Empty;

    [Column("description")]
    public string? description { get; set; }

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

[Table("user_roles")]
public class user_roles_entity : IBaseTrackingEntity<Guid>
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

    [Column("user_id")]
    public Guid user_id { get; set; }

    [Column("role_id")]
    public Guid role_id { get; set; }

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

[Table("role_claims")]
public class role_claims_entity : IBaseTrackingEntity<Guid>
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

    [Column("role_id")]
    public Guid role_id { get; set; }

    [Column("claim_id")]
    public Guid claim_id { get; set; }

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

[Table("user_claims")]
public class user_claims_entity : IBaseTrackingEntity<Guid>
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

    [Column("user_id")]
    public Guid user_id { get; set; }

    [Column("claim_id")]
    public Guid claim_id { get; set; }

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

[Table("acl_entries")]
public class acl_entries_entity : IBaseTrackingEntity<Guid>
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

    [Column("user_id")]
    public Guid? user_id { get; set; }

    [Column("role_id")]
    public Guid? role_id { get; set; }

    [Required]
    [MaxLength(255)]
    [Column("resource_type")]
    public string resource_type { get; set; } = string.Empty;

    [Required]
    [MaxLength(255)]
    [Column("resource_id")]
    public string resource_id { get; set; } = string.Empty;

    [Column("permission_mask")]
    public int permission_mask { get; set; }

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

[Table("user_emails")]
public class user_emails_entity : IBaseTrackingEntity<Guid>
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

    [Column("user_id")]
    public Guid user_id { get; set; }

    [Required]
    [MaxLength(255)]
    [Column("email")]
    public string email { get; set; } = string.Empty;

    [Column("is_verified")]
    public bool is_verified { get; set; }

    [Column("is_primary")]
    public bool is_primary { get; set; }

    [MaxLength(255)]
    [Column("verification_code")]
    public string? verification_code { get; set; }

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
