using Core.Infra.Oidc.Models;
using Core.Infra.Data.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Core.Infra.Oidc.Contexts;

public class NotifyDbContext : BaseDbContext
{
    public NotifyDbContext(string connectionString, DbProviderType provider) : base(connectionString, provider)
    {
    }

    public DbSet<user_fcm_tokens_entity> user_fcm_tokens { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure table name
        modelBuilder.Entity<user_fcm_tokens_entity>().ToTable("user_fcm_tokens");

        // Indexes for performance and querying
        modelBuilder.Entity<user_fcm_tokens_entity>().HasIndex(t => t.user_id);
        modelBuilder.Entity<user_fcm_tokens_entity>().HasIndex(t => t.fcm_token);
        modelBuilder.Entity<user_fcm_tokens_entity>().HasIndex(t => t.device_id);
        
        // Composite index to speed up device-specific lookups
        modelBuilder.Entity<user_fcm_tokens_entity>().HasIndex(t => new { t.user_id, t.device_id });
    }
}
