using Core.Infra.Base.Interfaces;
using Core.Infra.Firebase.Services;
using Module.BookingBds.Commands;
using Module.BookingBds.Models;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace Module.BookingBds.Handlers;

public class CreateBookingCommandHandler : ICommandHandler<CreateBookingCommand>
{
    private readonly BookingDbContext _dbContext;
    private readonly FirebaseService _firebaseService;
    private readonly ILogger<CreateBookingCommandHandler> _logger;

    public CreateBookingCommandHandler(
        BookingDbContext dbContext,
        FirebaseService firebaseService,
        ILogger<CreateBookingCommandHandler> logger)
    {
        _dbContext = dbContext;
        _firebaseService = firebaseService;
        _logger = logger;
    }

    public async Task HandleAsync(CreateBookingCommand command)
    {
        _logger.LogInformation("Processing CreateBookingCommand for Apartment: {ApartmentId}", command.ApartmentId);

        // 1. Kiểm tra căn hộ có tồn tại và đang Available không
        var apartment = await _dbContext.Apartments.FirstOrDefaultAsync(x => x.Id == command.ApartmentId);
        if (apartment == null || apartment.Status != ApartmentStatus.Available)
        {
            await SendNotificationAsync(command.RequestId, "FAILED", "Căn hộ không khả dụng hoặc đã có người đặt.");
            return;
        }

        // 2. Chuyển trạng thái căn hộ sang Pending
        apartment.Status = ApartmentStatus.Pending;
        apartment.UpdatedAt = DateTime.UtcNow;
        // EF tracks changes automatically if entity was loaded from context

        // 3. Tạo record Booking
        var booking = new Booking
        {
            ApartmentId = command.ApartmentId,
            CustomerId = command.CustomerId,
            DepositAmount = command.DepositAmount,
            Status = BookingStatus.Pending,
            RequestId = command.RequestId
        };
        await _dbContext.Bookings.AddAsync(booking);
        
        await _dbContext.SaveChangesAsync();

        // 4. Bắn thông báo qua Firebase (Real-time update cho FE)
        await SendNotificationAsync(command.RequestId, "SUCCESS", "Giữ chỗ thành công. Vui lòng thanh toán trong 15 phút.");
    }

    private async Task SendNotificationAsync(string requestId, string status, string message)
    {
        // Topic address path chính là commandresults/requestId theo yêu cầu base standards
        await _firebaseService.PublishToAddressPathAsync("Default", $"commandresults/{requestId}", new
        {
            Status = status,
            Message = message,
            Timestamp = DateTime.UtcNow
        });
    }
}
