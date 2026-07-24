using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Infra.Base.Interfaces;

namespace Core.Infra.NhanDienKhuonMat.Models;

[Table("upload_sessions")]
public class upload_sessions_entity : IEntity<Guid>
{
    [Key]
    [Column("id")]
    public Guid id { get; set; } = Guid.NewGuid();

    [Required]
    [MaxLength(255)]
    [Column("name")]
    public string name { get; set; } = string.Empty;

    [Column("user_id")]
    public Guid user_id { get; set; }

    [Required]
    [Column("created_at")]
    public DateTime created_at { get; set; } = DateTime.UtcNow;

    [MaxLength(255)]
    [Column("created_by")]
    public string? created_by { get; set; }

    // Navigation property
    public virtual ICollection<original_images_entity> original_images { get; set; } = new List<original_images_entity>();
}
