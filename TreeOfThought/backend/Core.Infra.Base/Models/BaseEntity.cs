using Core.Infra.Base.Interfaces;

namespace Core.Infra.Base.Models;

public abstract class BaseEntity<TKey> : IBaseTrackingEntity<TKey>, IBaseEntity
{
    public TKey Id { get; set; } = default!;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public string? CreatedBy { get; set; }
    public string? UpdatedBy { get; set; }
}
