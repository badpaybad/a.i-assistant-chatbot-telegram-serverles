using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Infra.Base.Interfaces;

namespace Core.Infra.NhanDienKhuonMat.Models;

[Table("user_face_definitions")]
public class user_face_definitions_entity : IEntity<Guid>
{
    [Key]
    [Column("id")]
    public Guid id { get; set; } = Guid.NewGuid();

    [Column("user_id")]
    public Guid user_id { get; set; }

    [Column("original_image_id")]
    public Guid original_image_id { get; set; }

    [Required]
    [Column("created_at")]
    public DateTime created_at { get; set; } = DateTime.UtcNow;
}
