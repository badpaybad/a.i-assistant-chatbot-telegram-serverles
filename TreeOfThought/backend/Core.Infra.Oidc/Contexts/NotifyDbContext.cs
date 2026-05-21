using Core.Infra.Oidc.Models;
using Core.Infra.Data.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Core.Infra.Oidc.Contexts;

public class NotifyDbContext : BaseDbContext
{
    public NotifyDbContext(string connectionString, DbProviderType provider) : base(connectionString, provider)
    {
    }

    public DbSet<UserFcmToken> UserFcmTokens { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure table name
        modelBuilder.Entity<UserFcmToken>().ToTable("UserFcmTokens");

        // Indexes for performance and querying
        modelBuilder.Entity<UserFcmToken>().HasIndex(t => t.UserId);
        modelBuilder.Entity<UserFcmToken>().HasIndex(t => t.FcmToken);
        modelBuilder.Entity<UserFcmToken>().HasIndex(t => t.DeviceId);
        
        // Composite index to speed up device-specific lookups
        modelBuilder.Entity<UserFcmToken>().HasIndex(t => new { t.UserId, t.DeviceId });
    }
}
