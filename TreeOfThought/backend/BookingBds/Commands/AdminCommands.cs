using Core.Infra.Base.Interfaces;
using Core.Infra.Base.Models;

namespace Module.BookingBds.Commands;

public class CreateProjectCommand : BaseMessage, IBaseCommand
{
    public string CommandName => nameof(CreateProjectCommand);
    
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public int TotalUnits { get; set; }
}

public class CreateApartmentCommand : BaseMessage, IBaseCommand
{
    public string CommandName => nameof(CreateApartmentCommand);
    
    public Guid ProjectId { get; set; }
    public string UnitNumber { get; set; } = string.Empty;
    public int Floor { get; set; }
    public decimal Price { get; set; }
}
