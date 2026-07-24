using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Infra.Base.Interfaces;

namespace Core.Infra.NhanDienKhuonMat.Models;

[Table("original_images")]
public class original_images_entity : IEntity<Guid>
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
    [Column("file_name")]
    public string file_name { get; set; } = string.Empty;

    [Required]
    [Column("url")]
    public string url { get; set; } = string.Empty;

    [Column("size")]
    public long size { get; set; }

    [Column("user_id")]
    public Guid user_id { get; set; }

    [Required]
    [Column("created_at")]
    public DateTime created_at { get; set; } = DateTime.UtcNow;

    [MaxLength(255)]
    [Column("created_by")]
    public string? created_by { get; set; }

    [Column("upload_session_id")]
    public Guid? upload_session_id { get; set; }

    [ForeignKey("upload_session_id")]
    public virtual upload_sessions_entity? upload_session { get; set; }

    // Navigation property
    public virtual ICollection<cropped_faces_entity> cropped_faces { get; set; } = new List<cropped_faces_entity>();
}
