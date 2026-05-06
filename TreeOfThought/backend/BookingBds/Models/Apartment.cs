using Core.Infra.Base.Interfaces;

namespace Module.BookingBds.Models;

public enum ApartmentStatus
{
    Available,
    Pending, // Đang giữ chỗ
    Deposited, // Đã đặt cọc
    Sold // Đã bán
}

public class Apartment : IBaseTrackingEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid ProjectId { get; set; }
    public string UnitNumber { get; set; } = string.Empty;
    public int Floor { get; set; }
    public decimal Price { get; set; }
    public ApartmentStatus Status { get; set; } = ApartmentStatus.Available;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public string? CreatedBy { get; set; }
    public string? UpdatedBy { get; set; }
}
