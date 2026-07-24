using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Infra.Base.Interfaces;

namespace Core.Infra.NhanDienKhuonMat.Models;

[Table("cropped_faces")]
public class cropped_faces_entity : IEntity<Guid>
{
    [Key]
    [Column("id")]
    public Guid id { get; set; } = Guid.NewGuid();

    [Column("original_image_id")]
    public Guid original_image_id { get; set; }

    [Required]
    [Column("url")]
    public string url { get; set; } = string.Empty;

    [Required]
    [MaxLength(500)]
    [Column("bounding_box")]
    public string bounding_box { get; set; } = string.Empty;

    [Required]
    [Column("created_at")]
    public DateTime created_at { get; set; } = DateTime.UtcNow;

    [MaxLength(255)]
    [Column("created_by")]
    public string? created_by { get; set; }

    [ForeignKey("original_image_id")]
    public virtual original_images_entity? original_image { get; set; }
}
