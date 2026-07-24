using Core.Infra.Data.Contexts;
using Core.Infra.FilesFolders.Models;
using Microsoft.EntityFrameworkCore;

namespace Core.Infra.FilesFolders.Contexts;

public class FilesFoldersDbContext : BaseDbContext
{
    public FilesFoldersDbContext(string connectionString, DbProviderType provider) 
        : base(connectionString, provider)
    {
    }

    public async Task EnsureTablesCreatedAsync()
    {
        await Database.EnsureCreatedAsync();
    }

    public DbSet<folders_entity> folders { get; set; }
    public DbSet<files_entity> files { get; set; }
    public DbSet<editor_files_entity> editor_files { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<folders_entity>(entity =>
        {
            entity.HasKey(e => e.id);
            entity.Property(e => e.name).IsRequired().HasMaxLength(255);
            entity.HasIndex(e => e.user_id);
            entity.HasIndex(e => e.parent_id);
        });

        modelBuilder.Entity<files_entity>(entity =>
        {
            entity.HasKey(e => e.id);
            entity.Property(e => e.name).IsRequired().HasMaxLength(255);
            entity.Property(e => e.url).IsRequired();
            entity.Property(e => e.folder_id).IsRequired(false);
            entity.HasIndex(e => e.user_id);
            entity.HasIndex(e => e.folder_id);
        });

        modelBuilder.Entity<editor_files_entity>(entity =>
        {
            entity.HasKey(e => e.id);
            entity.Property(e => e.name).IsRequired().HasMaxLength(255);
            entity.Property(e => e.url).IsRequired();
            entity.HasIndex(e => e.user_id);
        });
    }
}
