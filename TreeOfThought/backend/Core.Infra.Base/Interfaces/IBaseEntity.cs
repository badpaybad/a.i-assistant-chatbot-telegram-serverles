namespace Core.Infra.Base.Interfaces;

public interface IBaseEntity
{
}

public interface IBaseTrackingEntity : IBaseEntity
{
    Guid Id { get; set; }
    DateTime CreatedAt { get; set; }
    DateTime? UpdatedAt { get; set; }
    string? CreatedBy { get; set; }
    string? UpdatedBy { get; set; }
}
