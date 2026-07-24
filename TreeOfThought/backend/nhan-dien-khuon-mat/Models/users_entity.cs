using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Infra.Base.Interfaces;

namespace Core.Infra.NhanDienKhuonMat.Models;

[Table("users")]
public class users_entity : IEntity<Guid>
{
    [Key]
    [Column("id")]
    public Guid id { get; set; } = Guid.NewGuid();

    [Required]
    [MaxLength(255)]
    [Column("username")]
    public string username { get; set; } = string.Empty;

    [Required]
    [MaxLength(255)]
    [Column("display_name")]
    public string display_name { get; set; } = string.Empty;

    [Required]
    [MaxLength(255)]
    [Column("email")]
    public string email { get; set; } = string.Empty;

    [Column("avatar_url")]
    public string? avatar_url { get; set; }
}
