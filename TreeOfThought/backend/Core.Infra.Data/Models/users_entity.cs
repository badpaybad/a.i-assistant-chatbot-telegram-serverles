using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Core.Infra.Base.Interfaces;

namespace Core.Infra.Data.Models;

[Table("users")]
public class users_entity : IEntity<Guid>
{
    [Key]
    [Column("id")]
    [BsonId]
    [BsonRepresentation(BsonType.String)]
    public Guid id { get; set; } = Guid.NewGuid();

    // Explicit interface implementation to satisfy IEntity<Guid> constraint
    [NotMapped]
    [BsonIgnore]
    Guid IEntity<Guid>.Id 
    { 
        get => id; 
        set => id = value; 
    }

    [Required]
    [MaxLength(255)]
    [Column("full_name")]
    [BsonElement("full_name")]
    public string full_name { get; set; } = default!;

    [Required]
    [MaxLength(12)]
    [Column("national_id")]
    [BsonElement("national_id")]
    public string national_id { get; set; } = default!;

    [Required]
    [MaxLength(15)]
    [Column("phone_number")]
    [BsonElement("phone_number")]
    public string phone_number { get; set; } = default!;

    [MaxLength(255)]
    [Column("email")]
    [BsonElement("email")]
    public string? email { get; set; }

    [MaxLength(30)]
    [Column("bank_account_number")]
    [BsonElement("bank_account_number")]
    public string? bank_account_number { get; set; }

    [Column("biometric_data_hash")]
    [BsonElement("biometric_data_hash")]
    public string? biometric_data_hash { get; set; }

    [Column("current_location_lat", TypeName = "decimal(9, 6)")]
    [BsonElement("current_location_lat")]
    public decimal? current_location_lat { get; set; }

    [Required]
    [MaxLength(20)]
    [Column("status")]
    [BsonElement("status")]
    public string status { get; set; } = "ACTIVE";

    [Required]
    [Column("created_at")]
    [BsonElement("created_at")]
    public DateTime created_at { get; set; } = DateTime.UtcNow;
}
