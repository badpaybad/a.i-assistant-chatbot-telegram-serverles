using Core.Infra.Base.Interfaces;
using Module.BookingBds.Commands;
using Module.BookingBds.Models;
using Microsoft.Extensions.Logging;

namespace Module.BookingBds.Handlers;

public class AdminCommandHandler : 
    ICommandHandler<CreateProjectCommand>,
    ICommandHandler<CreateApartmentCommand>
{
    private readonly BookingDbContext _dbContext;
    private readonly ILogger<AdminCommandHandler> _logger;

    public AdminCommandHandler(BookingDbContext dbContext, ILogger<AdminCommandHandler> logger)
    {
        _dbContext = dbContext;
        _logger = logger;
    }

    public async Task HandleAsync(CreateProjectCommand command)
    {
        _logger.LogInformation("Creating new project: {Name}", command.Name);
        var project = new Project
        {
            Name = command.Name,
            Description = command.Description,
            Location = command.Location,
            TotalUnits = command.TotalUnits
        };
        await _dbContext.Projects.AddAsync(project);
        await _dbContext.SaveChangesAsync();
    }

    public async Task HandleAsync(CreateApartmentCommand command)
    {
        _logger.LogInformation("Adding apartment {UnitNumber} to project {ProjectId}", command.UnitNumber, command.ProjectId);
        var apartment = new Apartment
        {
            ProjectId = command.ProjectId,
            UnitNumber = command.UnitNumber,
            Floor = command.Floor,
            Price = command.Price,
            Status = ApartmentStatus.Available
        };
        await _dbContext.Apartments.AddAsync(apartment);
        await _dbContext.SaveChangesAsync();
    }
}
