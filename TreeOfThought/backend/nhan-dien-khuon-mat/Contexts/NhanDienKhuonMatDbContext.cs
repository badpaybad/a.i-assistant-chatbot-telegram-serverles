using Core.Infra.Data.Contexts;
using Core.Infra.NhanDienKhuonMat.Models;
using Microsoft.EntityFrameworkCore;

using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;

namespace Core.Infra.NhanDienKhuonMat.Contexts;

public class NhanDienKhuonMatDbContext : BaseDbContext
{
    public NhanDienKhuonMatDbContext(string connectionString, DbProviderType provider) 
        : base(connectionString, provider)
    {
    }

    public async Task EnsureTablesCreatedAsync()
    {
        try
        {
            var databaseCreator = Database.GetService<IDatabaseCreator>() as RelationalDatabaseCreator;
            if (databaseCreator != null)
            {
                await databaseCreator.CreateTablesAsync();
            }
        }
        catch (System.Exception ex)
        {
            System.Console.WriteLine($"[NhanDienKhuonMat DbContext] Tables creation checked/exists: {ex.Message}");
        }
    }

    public DbSet<OriginalImage> OriginalImages { get; set; }
    public DbSet<CroppedFace> CroppedFaces { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<OriginalImage>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.FileName).IsRequired().HasMaxLength(255);
            entity.Property(e => e.Url).IsRequired();
            entity.HasIndex(e => e.UserId);
        });

        modelBuilder.Entity<CroppedFace>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Url).IsRequired();
            entity.Property(e => e.BoundingBox).IsRequired().HasMaxLength(500);

            entity.HasOne(d => d.OriginalImage)
                .WithMany(p => p.CroppedFaces)
                .HasForeignKey(d => d.OriginalImageId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
}
