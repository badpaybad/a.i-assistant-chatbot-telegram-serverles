using Core.Infra.Base.Interfaces;

namespace Module.BookingBds.Models;

public enum BookingStatus
{
    Pending, // Chờ thanh toán
    Paid, // Đã thanh toán cọc
    Cancelled, // Đã hủy
    Completed // Đã hoàn tất thủ tục
}

public class Booking : IBaseTrackingEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid ApartmentId { get; set; }
    public Guid CustomerId { get; set; }
    public string? SalesId { get; set; }
    public decimal DepositAmount { get; set; }
    public BookingStatus Status { get; set; } = BookingStatus.Pending;
    public string RequestId { get; set; } = string.Empty; // Để tracking real-time qua Firebase
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public string? CreatedBy { get; set; }
    public string? UpdatedBy { get; set; }
}
