using Core.Infra.Base.Interfaces;
using Core.Infra.Base.Models;

namespace Module.BookingBds.Commands;

public class CreateBookingCommand : BaseMessage, IBaseCommand
{
    public string CommandName => nameof(CreateBookingCommand);
    
    public Guid ApartmentId { get; set; }
    public Guid CustomerId { get; set; }
    public decimal DepositAmount { get; set; }
    public string RequestId { get; set; } = string.Empty;
}
