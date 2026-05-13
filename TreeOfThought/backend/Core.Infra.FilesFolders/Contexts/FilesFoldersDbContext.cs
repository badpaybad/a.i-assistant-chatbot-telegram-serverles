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

    public DbSet<Folder> Folders { get; set; }
    public DbSet<FileItem> Files { get; set; }
    public DbSet<EditorFileItem> EditorFiles { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Folder>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(255);
            entity.HasIndex(e => e.UserId);
            entity.HasIndex(e => e.ParentId);
        });

        modelBuilder.Entity<FileItem>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(255);
            entity.Property(e => e.Url).IsRequired();
            entity.Property(e => e.FolderId).IsRequired(false);
            entity.HasIndex(e => e.UserId);
            entity.HasIndex(e => e.FolderId);
        });

        modelBuilder.Entity<EditorFileItem>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(255);
            entity.Property(e => e.Url).IsRequired();
            entity.HasIndex(e => e.UserId);
        });
    }
}
