using Core.Infra.Base.Interfaces;
using Core.Infra.Firebase.Services;
using Module.BookingBds.Commands;
using Module.BookingBds.Models;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace Module.BookingBds.Handlers;

public class ConfirmPaymentCommandHandler : ICommandHandler<ConfirmPaymentCommand>
{
    private readonly BookingDbContext _dbContext;
    private readonly FirebaseService _firebaseService;
    private readonly ILogger<ConfirmPaymentCommandHandler> _logger;

    public ConfirmPaymentCommandHandler(
        BookingDbContext dbContext,
        FirebaseService firebaseService,
        ILogger<ConfirmPaymentCommandHandler> logger)
    {
        _dbContext = dbContext;
        _firebaseService = firebaseService;
        _logger = logger;
    }

    public async Task HandleAsync(ConfirmPaymentCommand command)
    {
        _logger.LogInformation("Processing ConfirmPaymentCommand for Booking: {BookingId}", command.BookingId);

        // 1. Tìm Booking
        var booking = await _dbContext.Bookings.FirstOrDefaultAsync(x => x.Id == command.BookingId);
        if (booking == null)
        {
            _logger.LogWarning("Booking not found: {BookingId}", command.BookingId);
            return;
        }

        if (booking.Status != BookingStatus.Pending)
        {
            _logger.LogWarning("Booking {BookingId} is already processed with status {Status}", command.BookingId, booking.Status);
            return;
        }

        // 2. Cập nhật trạng thái Booking
        booking.Status = BookingStatus.Paid;
        booking.UpdatedAt = DateTime.UtcNow;

        // 3. Cập nhật trạng thái Căn hộ sang Deposited
        var apartment = await _dbContext.Apartments.FirstOrDefaultAsync(x => x.Id == booking.ApartmentId);
        if (apartment != null)
        {
            apartment.Status = ApartmentStatus.Deposited;
            apartment.UpdatedAt = DateTime.UtcNow;
        }

        await _dbContext.SaveChangesAsync();

        // 4. Bắn thông báo Real-time cho khách hàng (Dùng RequestId ban đầu của booking)
        await _firebaseService.PublishToAddressPathAsync("Default", $"commandresults/{booking.RequestId}", new
        {
            Status = "PAID_SUCCESS",
            Message = $"Thanh toán thành công cho căn {apartment?.UnitNumber}. Booking ID: {booking.Id}",
            Timestamp = DateTime.UtcNow
        });
    }
}
