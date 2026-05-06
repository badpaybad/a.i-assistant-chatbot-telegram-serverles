using Core.Infra.Data.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Module.BookingBds.Models;

public class BookingDbContext : BaseDbContext
{
    public BookingDbContext(IConfiguration configuration) 
        : base(configuration.GetConnectionString("PostgreSql") ?? "Host=localhost;Database=BookingBds;Username=root;Password=Test123456", DbProviderType.PostgreSql)
    {
    }

    public DbSet<Project> Projects { get; set; } = null!;
    public DbSet<Apartment> Apartments { get; set; } = null!;
    public DbSet<Booking> Bookings { get; set; } = null!;
}
