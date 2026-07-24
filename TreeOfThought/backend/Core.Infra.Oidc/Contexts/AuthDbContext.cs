using Core.Infra.Oidc.Models;
using Core.Infra.Data.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Core.Infra.Oidc.Contexts;

public class AuthDbContext : BaseDbContext
{
    public AuthDbContext(string connectionString, DbProviderType provider) : base(connectionString, provider)
    {
    }

    public DbSet<users_entity> users { get; set; }
    public DbSet<roles_entity> roles { get; set; }
    public DbSet<app_claims_entity> app_claims { get; set; }
    public DbSet<user_roles_entity> user_roles { get; set; }
    public DbSet<role_claims_entity> role_claims { get; set; }
    public DbSet<user_claims_entity> user_claims { get; set; }
    public DbSet<acl_entries_entity> acl_entries { get; set; }
    public DbSet<user_emails_entity> user_emails { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure indexes
        modelBuilder.Entity<users_entity>().HasIndex(u => u.username).IsUnique();
        modelBuilder.Entity<users_entity>().HasIndex(u => u.email).IsUnique();
        modelBuilder.Entity<roles_entity>().HasIndex(r => r.name).IsUnique();
        modelBuilder.Entity<app_claims_entity>().HasIndex(p => p.name).IsUnique();

        modelBuilder.Entity<user_roles_entity>().HasIndex(ur => new { ur.user_id, ur.role_id }).IsUnique();
        modelBuilder.Entity<role_claims_entity>().HasIndex(rp => new { rp.role_id, rp.claim_id }).IsUnique();
        modelBuilder.Entity<user_claims_entity>().HasIndex(up => new { up.user_id, up.claim_id }).IsUnique();
        
        modelBuilder.Entity<user_emails_entity>().HasIndex(ue => ue.email).IsUnique();
        modelBuilder.Entity<acl_entries_entity>().HasIndex(a => new { a.user_id, a.role_id, a.resource_type, a.resource_id, a.permission_mask });
    }
}
