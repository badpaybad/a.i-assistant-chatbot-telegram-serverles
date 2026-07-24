using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Infra.Base.Interfaces;

namespace Core.Infra.FilesFolders.Models;

public enum PermissionType
{
    Private = 0,
    Public = 1,
    Shared = 2
}

[Table("folders")]
public class folders_entity : IBaseTrackingEntity<Guid>
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

    [Column("parent_id")]
    public Guid? parent_id { get; set; }

    [Required]
    [MaxLength(255)]
    [Column("name")]
    public string name { get; set; } = string.Empty;

    [Column("user_id")]
    public Guid user_id { get; set; }

    [Required]
    [Column("path")]
    public string path { get; set; } = string.Empty;

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

[Table("files")]
public class files_entity : IBaseTrackingEntity<Guid>
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

    [Column("folder_id")]
    public Guid? folder_id { get; set; }

    [Required]
    [MaxLength(255)]
    [Column("name")]
    public string name { get; set; } = string.Empty;

    [Required]
    [Column("url")]
    public string url { get; set; } = string.Empty;

    [Column("size")]
    public long size { get; set; }

    [Required]
    [Column("mime_type")]
    public string mime_type { get; set; } = string.Empty;

    [Column("user_id")]
    public Guid user_id { get; set; }
    
    [Column("permission")]
    public PermissionType permission { get; set; } = PermissionType.Private;

    [Column("share_code")]
    public string? share_code { get; set; }

    [Column("expired_at")]
    public DateTime? expired_at { get; set; }

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

[Table("editor_files")]
public class editor_files_entity : IBaseTrackingEntity<Guid>
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

    [Required]
    [Column("url")]
    public string url { get; set; } = string.Empty;

    [Column("size")]
    public long size { get; set; }

    [Required]
    [Column("mime_type")]
    public string mime_type { get; set; } = string.Empty;

    [Column("user_id")]
    public Guid user_id { get; set; }

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
