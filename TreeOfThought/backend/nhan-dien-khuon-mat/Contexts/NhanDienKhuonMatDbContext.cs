using Core.Infra.Data.Contexts;
using Core.Infra.NhanDienKhuonMat.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;

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
            // 1. Create upload_sessions table
            await Database.ExecuteSqlRawAsync(@"
                CREATE TABLE IF NOT EXISTS ""upload_sessions"" (
                    ""id"" uuid NOT NULL,
                    ""name"" character varying(255) NOT NULL,
                    ""user_id"" uuid NOT NULL,
                    ""created_at"" timestamp with time zone NOT NULL,
                    ""created_by"" character varying(255) NULL,
                    CONSTRAINT ""PK_upload_sessions"" PRIMARY KEY (""id"")
                );
                CREATE INDEX IF NOT EXISTS ""IX_upload_sessions_user_id"" ON ""upload_sessions"" (""user_id"");
            ");

            // Convert upload_sessions.user_id to uuid if it was varchar
            try
            {
                await Database.ExecuteSqlRawAsync(@"
                    ALTER TABLE ""upload_sessions"" ALTER COLUMN ""user_id"" TYPE uuid USING ""user_id""::uuid;
                ");
            }
            catch {}

            // 2. Create original_images table
            await Database.ExecuteSqlRawAsync(@"
                CREATE TABLE IF NOT EXISTS ""original_images"" (
                    ""id"" uuid NOT NULL,
                    ""file_name"" character varying(255) NOT NULL,
                    ""url"" text NOT NULL,
                    ""size"" bigint NOT NULL,
                    ""user_id"" uuid NOT NULL,
                    ""created_at"" timestamp with time zone NOT NULL,
                    ""created_by"" character varying(255) NULL,
                    CONSTRAINT ""PK_original_images"" PRIMARY KEY (""id"")
                );
                CREATE INDEX IF NOT EXISTS ""IX_original_images_user_id"" ON ""original_images"" (""user_id"");
            ");

            // Convert original_images.user_id to uuid if it was varchar
            try
            {
                await Database.ExecuteSqlRawAsync(@"
                    ALTER TABLE ""original_images"" ALTER COLUMN ""user_id"" TYPE uuid USING ""user_id""::uuid;
                ");
            }
            catch {}

            // 3. Ensure upload_session_id column exists in original_images
            try
            {
                await Database.ExecuteSqlRawAsync(@"
                    ALTER TABLE ""original_images"" ADD COLUMN IF NOT EXISTS ""upload_session_id"" uuid NULL;
                ");
            }
            catch (System.Exception ex)
            {
                System.Console.WriteLine($"[NhanDienKhuonMat DbContext] Note: upload_session_id column adding: {ex.Message}");
            }

            // 4. Create Index on upload_session_id
            try
            {
                await Database.ExecuteSqlRawAsync(@"
                    CREATE INDEX IF NOT EXISTS ""IX_original_images_upload_session_id"" ON ""original_images"" (""upload_session_id"");
                ");
            }
            catch (System.Exception ex)
            {
                System.Console.WriteLine($"[NhanDienKhuonMat DbContext] Note: upload_session_id index creation: {ex.Message}");
            }

            // 5. Add Foreign Key Constraint
            try
            {
                await Database.ExecuteSqlRawAsync(@"
                    ALTER TABLE ""original_images"" 
                    ADD CONSTRAINT ""FK_original_images_upload_sessions_upload_session_id"" 
                    FOREIGN KEY (""upload_session_id"") REFERENCES ""upload_sessions"" (""id"") ON DELETE CASCADE;
                ");
            }
            catch (System.Exception ex)
            {
                System.Console.WriteLine($"[NhanDienKhuonMat DbContext] Note: FK constraint addition: {ex.Message}");
            }

            // 6. Create cropped_faces table
            await Database.ExecuteSqlRawAsync(@"
                CREATE TABLE IF NOT EXISTS ""cropped_faces"" (
                    ""id"" uuid NOT NULL,
                    ""original_image_id"" uuid NOT NULL,
                    ""url"" text NOT NULL,
                    ""bounding_box"" character varying(500) NOT NULL,
                    ""created_at"" timestamp with time zone NOT NULL,
                    ""created_by"" character varying(255) NULL,
                    CONSTRAINT ""PK_cropped_faces"" PRIMARY KEY (""id""),
                    CONSTRAINT ""FK_cropped_faces_original_images_original_image_id"" FOREIGN KEY (""original_image_id"") REFERENCES ""original_images"" (""id"") ON DELETE CASCADE
                );
                CREATE INDEX IF NOT EXISTS ""IX_cropped_faces_original_image_id"" ON ""cropped_faces"" (""original_image_id"");
            ");

            await SeedDefaultSessionAsync();
        }
        catch (System.Exception ex)
        {
            System.Console.WriteLine($"[NhanDienKhuonMat DbContext] Tables creation check failed: {ex.Message}");
        }
    }

    private async Task SeedDefaultSessionAsync()
    {
        try
        {
            // Seed "Phiên đầu tiên" for existing images without a session, grouped by user
            var imagesWithoutSession = await original_images.Where(i => i.upload_session_id == null).ToListAsync();
            if (imagesWithoutSession.Any())
            {
                var groups = imagesWithoutSession.GroupBy(i => i.user_id);
                foreach (var group in groups)
                {
                    var userId = group.Key;
                    var firstSession = await upload_sessions.FirstOrDefaultAsync(s => s.user_id == userId && s.name == "Phiên đầu tiên");
                    if (firstSession == null)
                    {
                        firstSession = new upload_sessions_entity
                        {
                            id = Guid.NewGuid(),
                            name = "Phiên đầu tiên",
                            user_id = userId,
                            created_at = DateTime.UtcNow,
                            created_by = "System"
                        };
                        upload_sessions.Add(firstSession);
                        await SaveChangesAsync();
                    }

                    foreach (var img in group)
                    {
                        img.upload_session_id = firstSession.id;
                    }
                }
                await SaveChangesAsync();
            }
        }
        catch (System.Exception ex)
        {
            System.Console.WriteLine($"[NhanDienKhuonMat DbContext] Error seeding default session: {ex.Message}");
        }
    }

    public DbSet<upload_sessions_entity> upload_sessions { get; set; }
    public DbSet<original_images_entity> original_images { get; set; }
    public DbSet<cropped_faces_entity> cropped_faces { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<upload_sessions_entity>(entity =>
        {
            entity.ToTable("upload_sessions");
            entity.HasKey(e => e.id);
            entity.Property(e => e.name).IsRequired().HasMaxLength(255);
            entity.HasIndex(e => e.user_id);
        });

        modelBuilder.Entity<original_images_entity>(entity =>
        {
            entity.ToTable("original_images");
            entity.HasKey(e => e.id);
            entity.Property(e => e.file_name).IsRequired().HasMaxLength(255);
            entity.Property(e => e.url).IsRequired();
            entity.HasIndex(e => e.user_id);

            entity.HasOne(d => d.upload_session)
                .WithMany(p => p.original_images)
                .HasForeignKey(d => d.upload_session_id)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<cropped_faces_entity>(entity =>
        {
            entity.ToTable("cropped_faces");
            entity.HasKey(e => e.id);
            entity.Property(e => e.url).IsRequired();
            entity.Property(e => e.bounding_box).IsRequired().HasMaxLength(500);

            entity.HasOne(d => d.original_image)
                .WithMany(p => p.cropped_faces)
                .HasForeignKey(d => d.original_image_id)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
}
