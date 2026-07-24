using Core.Infra.Base.Interfaces;

namespace Core.Infra.Base.Models;

public abstract class BaseEntity<TKey> : IBaseTrackingEntity<TKey>, IBaseEntity
{
    public TKey id { get; set; } = default!;
    public DateTime created_at { get; set; } = DateTime.UtcNow;
    public DateTime? updated_at { get; set; }
    public string? created_by { get; set; }
    public string? updated_by { get; set; }
}
