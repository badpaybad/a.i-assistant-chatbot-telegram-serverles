namespace Core.Infra.Base.Interfaces;

// Private prj: Chỉ dùng nội bộ trong project Infra cho các xử lý generic đặc thù
internal interface IBaseEntity
{
}

// Public: Project khác nhìn được và sử dụng để định nghĩa Entity có Id
public interface IEntity<TKey>
{
    TKey id { get; set; }
}

// Public: Tracking interface kế thừa từ IEntity<TKey>
public interface IBaseTrackingEntity<TKey> : IEntity<TKey>
{
    DateTime created_at { get; set; }
    DateTime? updated_at { get; set; }
    string? created_by { get; set; }
    string? updated_by { get; set; }
}
