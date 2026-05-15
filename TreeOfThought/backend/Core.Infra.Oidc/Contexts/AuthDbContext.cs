using Core.Infra.Oidc.Models;
using Core.Infra.Data.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Core.Infra.Oidc.Contexts;

public class AuthDbContext : BaseDbContext
{
    public AuthDbContext(string connectionString, DbProviderType provider) : base(connectionString, provider)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<AppClaim> Claims { get; set; }
    public DbSet<UserRole> UserRoles { get; set; }
    public DbSet<RoleClaim> RoleClaims { get; set; }
    public DbSet<UserClaim> UserClaims { get; set; }
    public DbSet<AclEntry> AclEntries { get; set; }
    public DbSet<UserEmail> UserEmails { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure indexes
        modelBuilder.Entity<User>().HasIndex(u => u.Username).IsUnique();
        modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
        modelBuilder.Entity<Role>().HasIndex(r => r.Name).IsUnique();
        modelBuilder.Entity<AppClaim>().HasIndex(p => p.Name).IsUnique();

        modelBuilder.Entity<UserRole>().HasIndex(ur => new { ur.UserId, ur.RoleId }).IsUnique();
        modelBuilder.Entity<RoleClaim>().HasIndex(rp => new { rp.RoleId, rp.ClaimId }).IsUnique();
        modelBuilder.Entity<UserClaim>().HasIndex(up => new { up.UserId, up.ClaimId }).IsUnique();
        
        modelBuilder.Entity<UserEmail>().HasIndex(ue => ue.Email).IsUnique();
        modelBuilder.Entity<AclEntry>().HasIndex(a => new { a.UserId, a.RoleId, a.ResourceType, a.ResourceId, a.PermissionMask });
    }
}
