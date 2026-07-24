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

    public DbSet<user_face_definitions_entity> user_face_definitions { get; set; }
    public DbSet<user_face_embeddings_entity> user_face_embeddings { get; set; }

    public async Task EnsureTablesCreatedAsync()
    {
        try
        {
            await Database.ExecuteSqlRawAsync(@"
                CREATE EXTENSION IF NOT EXISTS vector;

                CREATE TABLE IF NOT EXISTS ""user_face_definitions"" (
                    ""id"" uuid NOT NULL,
                    ""user_id"" uuid NOT NULL,
                    ""original_image_id"" uuid NOT NULL,
                    ""created_at"" timestamp with time zone NOT NULL,
                    CONSTRAINT ""PK_user_face_definitions"" PRIMARY KEY (""id"")
                );
                CREATE INDEX IF NOT EXISTS ""IX_user_face_definitions_user_id"" ON ""user_face_definitions"" (""user_id"");
                CREATE INDEX IF NOT EXISTS ""IX_user_face_definitions_original_image_id"" ON ""user_face_definitions"" (""original_image_id"");

                CREATE TABLE IF NOT EXISTS ""user_face_embeddings"" (
                    ""id"" uuid NOT NULL,
                    ""user_id"" uuid NOT NULL,
                    ""original_image_id"" uuid NOT NULL,
                    ""embedding"" vector(512) NOT NULL,
                    ""best_model_path"" text,
                    ""input_image_path"" text,
                    ""created_at"" timestamp with time zone NOT NULL,
                    CONSTRAINT ""PK_user_face_embeddings"" PRIMARY KEY (""id"")
                );
                CREATE INDEX IF NOT EXISTS ""IX_user_face_embeddings_user_id"" ON ""user_face_embeddings"" (""user_id"");
                CREATE INDEX IF NOT EXISTS ""IX_user_face_embeddings_original_image_id"" ON ""user_face_embeddings"" (""original_image_id"");

                -- Đảm bảo cột embedding luôn có kiểu vector(512)
                ALTER TABLE ""user_face_embeddings"" ALTER COLUMN ""embedding"" TYPE vector(512) USING ""embedding""::vector(512);

                -- Bổ sung cột mới cho metadata nếu chưa có
                ALTER TABLE ""user_face_embeddings"" ADD COLUMN IF NOT EXISTS ""best_model_path"" text;
                ALTER TABLE ""user_face_embeddings"" ADD COLUMN IF NOT EXISTS ""input_image_path"" text;

                -- Tạo chỉ mục HNSW Inner Product
                CREATE INDEX IF NOT EXISTS ""IX_user_face_embeddings_HNSW_IP"" ON ""user_face_embeddings"" USING hnsw (""embedding"" vector_ip_ops);
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

        modelBuilder.Entity<user_face_definitions_entity>(entity =>
        {
            entity.ToTable("user_face_definitions");
            entity.HasKey(e => e.id);
            entity.HasIndex(e => e.user_id);
            entity.HasIndex(e => e.original_image_id);
        });

        modelBuilder.Entity<user_face_embeddings_entity>(entity =>
        {
            entity.ToTable("user_face_embeddings");
            entity.HasKey(e => e.id);
            entity.HasIndex(e => e.user_id);
            entity.HasIndex(e => e.original_image_id);
            entity.Property(e => e.embedding)
                .HasColumnType("vector(512)");
        });
    }
}
