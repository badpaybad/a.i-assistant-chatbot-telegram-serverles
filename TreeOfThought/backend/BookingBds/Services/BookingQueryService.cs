using Module.BookingBds.Models;
using Microsoft.EntityFrameworkCore;

namespace Module.BookingBds.Services;

public class BookingQueryService
{
    private readonly BookingDbContext _dbContext;

    public BookingQueryService(BookingDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<Project>> GetProjectsAsync()
    {
        return await _dbContext.Projects.ToListAsync();
    }

    public async Task<List<Apartment>> GetApartmentsByProjectAsync(Guid projectId)
    {
        return await _dbContext.Apartments
            .Where(x => x.ProjectId == projectId)
            .ToListAsync();
    }

    public async Task<Booking?> GetBookingByIdAsync(Guid bookingId)
    {
        return await _dbContext.Bookings.FirstOrDefaultAsync(x => x.Id == bookingId);
    }

    public async Task<List<Booking>> GetBookingsByCustomerAsync(Guid customerId)
    {
        return await _dbContext.Bookings
            .Where(x => x.CustomerId == customerId)
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync();
    }
}
