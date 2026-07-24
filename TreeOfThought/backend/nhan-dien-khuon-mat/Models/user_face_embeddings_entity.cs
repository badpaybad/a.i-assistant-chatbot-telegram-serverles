using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Infra.Base.Interfaces;
using Pgvector;

namespace Core.Infra.NhanDienKhuonMat.Models;

[Table("user_face_embeddings")]
public class user_face_embeddings_entity : IEntity<Guid>
{
    [Key]
    [Column("id")]
    public Guid id { get; set; } = Guid.NewGuid();

    [Column("user_id")]
    public Guid user_id { get; set; }

    [Column("original_image_id")]
    public Guid original_image_id { get; set; }

    [Required]
    [Column("embedding", TypeName = "vector(512)")]
    public Vector embedding { get; set; } = new Vector(Array.Empty<float>());

    [Column("best_model_path")]
    public string? best_model_path { get; set; }

    [Column("input_image_path")]
    public string? input_image_path { get; set; }

    [Required]
    [Column("created_at")]
    public DateTime created_at { get; set; } = DateTime.UtcNow;
}
