using System;
using Pgvector;

namespace Core.Infra.NhanDienKhuonMat.Models;

public class UserFaceEmbedding
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public Guid OriginalImageId { get; set; }
    public Vector Embedding { get; set; } = new Vector(Array.Empty<float>());
    public string? BestModelPath { get; set; }
    public string? InputImagePath { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
