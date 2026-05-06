using Core.Infra.Base.Interfaces;
using Core.Infra.Base.Models;

namespace Module.BookingBds.Commands;

public class ConfirmPaymentCommand : BaseMessage, IBaseCommand
{
    public string CommandName => nameof(ConfirmPaymentCommand);
    
    public Guid BookingId { get; set; }
    public string TransactionId { get; set; } = string.Empty;
    public decimal AmountPaid { get; set; }
}
