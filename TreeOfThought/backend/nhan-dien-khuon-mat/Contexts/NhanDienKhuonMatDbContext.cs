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
            // 1. Create UploadSessions table
            await Database.ExecuteSqlRawAsync(@"
                CREATE TABLE IF NOT EXISTS ""UploadSessions"" (
                    ""Id"" uuid NOT NULL,
                    ""Name"" character varying(255) NOT NULL,
                    ""UserId"" uuid NOT NULL,
                    ""CreatedAt"" timestamp with time zone NOT NULL,
                    ""CreatedBy"" character varying(255) NULL,
                    CONSTRAINT ""PK_UploadSessions"" PRIMARY KEY (""Id"")
                );
                CREATE INDEX IF NOT EXISTS ""IX_UploadSessions_UserId"" ON ""UploadSessions"" (""UserId"");
            ");

            // Convert UploadSessions.UserId to uuid if it was varchar
            try
            {
                await Database.ExecuteSqlRawAsync(@"
                    ALTER TABLE ""UploadSessions"" ALTER COLUMN ""UserId"" TYPE uuid USING ""UserId""::uuid;
                ");
            }
            catch {}

            // 2. Create OriginalImages table (without UploadSessionId initially to prevent index fail on pre-existing tables)
            await Database.ExecuteSqlRawAsync(@"
                CREATE TABLE IF NOT EXISTS ""OriginalImages"" (
                    ""Id"" uuid NOT NULL,
                    ""FileName"" character varying(255) NOT NULL,
                    ""Url"" text NOT NULL,
                    ""Size"" bigint NOT NULL,
                    ""UserId"" uuid NOT NULL,
                    ""CreatedAt"" timestamp with time zone NOT NULL,
                    CONSTRAINT ""PK_OriginalImages"" PRIMARY KEY (""Id"")
                );
                CREATE INDEX IF NOT EXISTS ""IX_OriginalImages_UserId"" ON ""OriginalImages"" (""UserId"");
            ");

            // Convert OriginalImages.UserId to uuid if it was varchar
            try
            {
                await Database.ExecuteSqlRawAsync(@"
                    ALTER TABLE ""OriginalImages"" ALTER COLUMN ""UserId"" TYPE uuid USING ""UserId""::uuid;
                ");
            }
            catch {}

            // 3. Ensure UploadSessionId column exists in OriginalImages
            try
            {
                await Database.ExecuteSqlRawAsync(@"
                    ALTER TABLE ""OriginalImages"" ADD COLUMN IF NOT EXISTS ""UploadSessionId"" uuid NULL;
                ");
            }
            catch (System.Exception ex)
            {
                System.Console.WriteLine($"[NhanDienKhuonMat DbContext] Note: UploadSessionId column adding: {ex.Message}");
            }

            // 4. Create Index on UploadSessionId
            try
            {
                await Database.ExecuteSqlRawAsync(@"
                    CREATE INDEX IF NOT EXISTS ""IX_OriginalImages_UploadSessionId"" ON ""OriginalImages"" (""UploadSessionId"");
                ");
            }
            catch (System.Exception ex)
            {
                System.Console.WriteLine($"[NhanDienKhuonMat DbContext] Note: UploadSessionId index creation: {ex.Message}");
            }

            // 5. Add Foreign Key Constraint
            try
            {
                await Database.ExecuteSqlRawAsync(@"
                    ALTER TABLE ""OriginalImages"" 
                    ADD CONSTRAINT ""FK_OriginalImages_UploadSessions_UploadSessionId"" 
                    FOREIGN KEY (""UploadSessionId"") REFERENCES ""UploadSessions"" (""Id"") ON DELETE CASCADE;
                ");
            }
            catch (System.Exception ex)
            {
                System.Console.WriteLine($"[NhanDienKhuonMat DbContext] Note: FK constraint addition: {ex.Message}");
            }

            // 6. Create CroppedFaces table
            await Database.ExecuteSqlRawAsync(@"
                CREATE TABLE IF NOT EXISTS ""CroppedFaces"" (
                    ""Id"" uuid NOT NULL,
                    ""OriginalImageId"" uuid NOT NULL,
                    ""Url"" text NOT NULL,
                    ""BoundingBox"" character varying(500) NOT NULL,
                    ""CreatedAt"" timestamp with time zone NOT NULL,
                    CONSTRAINT ""PK_CroppedFaces"" PRIMARY KEY (""Id""),
                    CONSTRAINT ""FK_CroppedFaces_OriginalImages_OriginalImageId"" FOREIGN KEY (""OriginalImageId"") REFERENCES ""OriginalImages"" (""Id"") ON DELETE CASCADE
                );
                CREATE INDEX IF NOT EXISTS ""IX_CroppedFaces_OriginalImageId"" ON ""CroppedFaces"" (""OriginalImageId"");
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
            var imagesWithoutSession = await OriginalImages.Where(i => i.UploadSessionId == null).ToListAsync();
            if (imagesWithoutSession.Any())
            {
                var groups = imagesWithoutSession.GroupBy(i => i.UserId);
                foreach (var group in groups)
                {
                    var userId = group.Key;
                    var firstSession = await UploadSessions.FirstOrDefaultAsync(s => s.UserId == userId && s.Name == "Phiên đầu tiên");
                    if (firstSession == null)
                    {
                        firstSession = new UploadSession
                        {
                            Id = Guid.NewGuid(),
                            Name = "Phiên đầu tiên",
                            UserId = userId,
                            CreatedAt = DateTime.UtcNow,
                            CreatedBy = "System"
                        };
                        UploadSessions.Add(firstSession);
                        await SaveChangesAsync();
                    }

                    foreach (var img in group)
                    {
                        img.UploadSessionId = firstSession.Id;
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

    public DbSet<UploadSession> UploadSessions { get; set; }
    public DbSet<OriginalImage> OriginalImages { get; set; }
    public DbSet<CroppedFace> CroppedFaces { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<UploadSession>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(255);
            entity.HasIndex(e => e.UserId);
        });

        modelBuilder.Entity<OriginalImage>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.FileName).IsRequired().HasMaxLength(255);
            entity.Property(e => e.Url).IsRequired();
            entity.HasIndex(e => e.UserId);

            entity.HasOne(d => d.UploadSession)
                .WithMany(p => p.OriginalImages)
                .HasForeignKey(d => d.UploadSessionId)
                .OnDelete(DeleteBehavior.Cascade);
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
