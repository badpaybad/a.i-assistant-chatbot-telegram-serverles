using Core.Infra.Data.Contexts;
using Core.Infra.NhanDienKhuonMat.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Core.Infra.NhanDienKhuonMat.Contexts;

public class FaceDefinitionDbContext : BaseDbContext
{
    private readonly string _connectionString;

    public FaceDefinitionDbContext(string connectionString, DbProviderType provider) 
        : base(connectionString, provider)
    {
        _connectionString = connectionString;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(_connectionString, o => o.UseVector());
    }

    public DbSet<UserFaceDefinition> UserFaceDefinitions { get; set; }
    public DbSet<UserFaceEmbedding> UserFaceEmbeddings { get; set; }

    public async Task EnsureTablesCreatedAsync()
    {
        try
        {
            await Database.ExecuteSqlRawAsync(@"
                CREATE EXTENSION IF NOT EXISTS vector;

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
                    ""Embedding"" vector(512) NOT NULL,
                    ""BestModelPath"" text,
                    ""InputImagePath"" text,
                    ""CreatedAt"" timestamp with time zone NOT NULL,
                    CONSTRAINT ""PK_UserFaceEmbeddings"" PRIMARY KEY (""Id"")
                );
                CREATE INDEX IF NOT EXISTS ""IX_UserFaceEmbeddings_UserId"" ON ""UserFaceEmbeddings"" (""UserId"");
                CREATE INDEX IF NOT EXISTS ""IX_UserFaceEmbeddings_OriginalImageId"" ON ""UserFaceEmbeddings"" (""OriginalImageId"");

                -- Đảm bảo cột Embedding luôn có kiểu vector(512)
                ALTER TABLE ""UserFaceEmbeddings"" ALTER COLUMN ""Embedding"" TYPE vector(512) USING ""Embedding""::vector(512);

                -- Bổ sung cột mới cho metadata nếu chưa có
                ALTER TABLE ""UserFaceEmbeddings"" ADD COLUMN IF NOT EXISTS ""BestModelPath"" text;
                ALTER TABLE ""UserFaceEmbeddings"" ADD COLUMN IF NOT EXISTS ""InputImagePath"" text;

                -- Tạo chỉ mục HNSW Inner Product
                CREATE INDEX IF NOT EXISTS ""IX_UserFaceEmbeddings_HNSW_IP"" ON ""UserFaceEmbeddings"" USING hnsw (""Embedding"" vector_ip_ops);
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
        modelBuilder.HasPostgresExtension("vector");

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
                .HasColumnType("vector(512)");
        });
    }
}
