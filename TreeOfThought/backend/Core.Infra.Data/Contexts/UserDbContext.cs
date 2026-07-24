using Microsoft.EntityFrameworkCore;
using Core.Infra.Data.Models;

namespace Core.Infra.Data.Contexts;

public class UserDbContext : BaseDbContext
{
    public UserDbContext(string connectionString, DbProviderType provider) 
        : base(connectionString, provider)
    {
    }

    public DbSet<users_entity> users { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<users_entity>(entity =>
        {
            entity.HasKey(e => e.id);
            entity.HasIndex(e => e.phone_number).HasDatabaseName("IX_users_phone");
            entity.HasIndex(e => e.email).HasDatabaseName("IX_users_email");
            entity.HasIndex(e => e.status).HasDatabaseName("IX_users_status");
            entity.ToTable(t => t.HasCheckConstraint("CK_users_status", "status IN ('ACTIVE', 'LOCKED')"));
        });
    }
}
