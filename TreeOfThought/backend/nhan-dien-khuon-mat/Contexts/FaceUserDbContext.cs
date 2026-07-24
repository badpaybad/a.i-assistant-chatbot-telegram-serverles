using Core.Infra.Data.Contexts;
using Core.Infra.NhanDienKhuonMat.Models;
using Microsoft.EntityFrameworkCore;

namespace Core.Infra.NhanDienKhuonMat.Contexts;

public class FaceUserDbContext : BaseDbContext
{
    public FaceUserDbContext(string connectionString, DbProviderType provider) 
        : base(connectionString, provider)
    {
    }

    public DbSet<users_entity> users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<users_entity>(entity =>
        {
            entity.ToTable("users");
            entity.HasKey(e => e.id);
        });
    }
}
