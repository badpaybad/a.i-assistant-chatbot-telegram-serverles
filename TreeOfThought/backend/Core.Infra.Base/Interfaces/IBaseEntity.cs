namespace Core.Infra.Base.Interfaces;

// Private prj: Chỉ dùng nội bộ trong project Infra cho các xử lý generic đặc thù
internal interface IBaseEntity
{
}

// Public: Project khác nhìn được và sử dụng để định nghĩa Entity có Id
public interface IEntity<TKey>
{
    TKey Id { get; set; }
}

// Public: Tracking interface kế thừa từ IEntity<TKey>
public interface IBaseTrackingEntity<TKey> : IEntity<TKey>
{
    DateTime CreatedAt { get; set; }
    DateTime? UpdatedAt { get; set; }
    string? CreatedBy { get; set; }
    string? UpdatedBy { get; set; }
}
