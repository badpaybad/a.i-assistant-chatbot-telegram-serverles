using Core.Infra.Data.Contexts;
using Core.Infra.NhanDienKhuonMat.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Core.Infra.NhanDienKhuonMat.Contexts;

public class FaceDefinitionDbContext : BaseDbContext
{
    public FaceDefinitionDbContext(string connectionString, DbProviderType provider) 
        : base(connectionString, provider)
    {
    }

    public DbSet<UserFaceDefinition> UserFaceDefinitions { get; set; }
    public DbSet<UserFaceEmbedding> UserFaceEmbeddings { get; set; }

    public async Task EnsureTablesCreatedAsync()
    {
        try
        {
            await Database.ExecuteSqlRawAsync(@"
                CREATE TABLE IF NOT EXISTS ""UserFaceDefinitions"" (
                    ""Id"" uuid NOT NULL,
                    ""UserId"" uuid NOT NULL,
                    ""OriginalImageId"" uuid NOT NULL,
                    ""CreatedAt"" timestamp with time zone NOT NULL,
                    CONSTRAINT ""PK_UserFaceDefinitions"" PRIMARY KEY (""Id"")
                );
                CREATE INDEX IF NOT EXISTS ""IX_UserFaceDefinitions_UserId"" ON ""UserFaceDefinitions"" (""UserId"");
                CREATE INDEX IF NOT EXISTS ""IX_UserFaceDefinitions_OriginalImageId"" ON ""UserFaceDefinitions"" (""OriginalImageId"");

                CREATE TABLE IF NOT EXISTS ""UserFaceEmbeddings"" (
                    ""Id"" uuid NOT NULL,
                    ""UserId"" uuid NOT NULL,
                    ""OriginalImageId"" uuid NOT NULL,
                    ""Embedding"" real[] NOT NULL,
                    ""CreatedAt"" timestamp with time zone NOT NULL,
                    CONSTRAINT ""PK_UserFaceEmbeddings"" PRIMARY KEY (""Id"")
                );
                CREATE INDEX IF NOT EXISTS ""IX_UserFaceEmbeddings_UserId"" ON ""UserFaceEmbeddings"" (""UserId"");
                CREATE INDEX IF NOT EXISTS ""IX_UserFaceEmbeddings_OriginalImageId"" ON ""UserFaceEmbeddings"" (""OriginalImageId"");
            ");
        }
        catch (System.Exception ex)
        {
            System.Console.WriteLine($"[FaceDefinitionDbContext] Tables creation check failed: {ex.Message}");
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<UserFaceDefinition>(entity =>
        {
            entity.ToTable("UserFaceDefinitions");
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.UserId);
            entity.HasIndex(e => e.OriginalImageId);
        });

        modelBuilder.Entity<UserFaceEmbedding>(entity =>
        {
            entity.ToTable("UserFaceEmbeddings");
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.UserId);
            entity.HasIndex(e => e.OriginalImageId);
            entity.Property(e => e.Embedding)
                .HasColumnType("real[]");
        });
    }
}
