namespace Core.Web.Api.Models;

public class CreateBookingRequest
{
    public Guid ApartmentId { get; set; }
    public decimal DepositAmount { get; set; }
    public string RequestId { get; set; } = null!;
}

public class ConfirmPaymentRequest
{
    public Guid BookingId { get; set; }
    public string TransactionId { get; set; } = null!;
    public decimal AmountPaid { get; set; }
}
