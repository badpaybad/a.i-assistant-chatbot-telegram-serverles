using Core.Infra.Data.Contexts;
using Core.Infra.Cqrs.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System;
using System.Threading.Tasks;

namespace Core.Infra.Cqrs.Contexts;

public class CqrsDbContext : BaseDbContext
{
    public CqrsDbContext(string connectionString, DbProviderType provider)
        : base(connectionString, provider)
    {
    }

    public async Task EnsureTablesCreatedAsync()
    {
        try
        {
            await Database.EnsureCreatedAsync();
        }
        catch (Exception)
        {
            // Ignore database creation errors if it already exists
        }

        try
        {
            var databaseCreator = Database.GetService<IDatabaseCreator>() as IRelationalDatabaseCreator;
            if (databaseCreator != null)
            {
                await databaseCreator.CreateTablesAsync();
            }
        }
        catch (Exception ex)
        {
            // CreateTablesAsync throws an exception if the tables already exist (e.g. duplicate table)
            // We can safely ignore this exception as the goal is to make sure tables are created.
            Console.WriteLine($"[CqrsDbContext] Table creation skipped or table already exists: {ex.Message}");
        }

        try
        {
            // Auto-migrate schema: add 'Type' and 'ElapsedMilliseconds' columns if they do not exist
            await Database.ExecuteSqlRawAsync(@"
                ALTER TABLE public.cqrs_tracking_logs 
                ADD COLUMN IF NOT EXISTS ""Type"" VARCHAR(50) NOT NULL DEFAULT '';

                ALTER TABLE public.cqrs_tracking_logs 
                ADD COLUMN IF NOT EXISTS ""ElapsedMilliseconds"" BIGINT NULL;
            ");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[CqrsDbContext] Failed to update schema columns: {ex.Message}");
        }
    }

    public DbSet<cqrs_tracking_logs_entity> cqrs_tracking_logs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<cqrs_tracking_logs_entity>(entity =>
        {
            entity.ToTable("cqrs_tracking_logs");
            entity.HasKey(e => e.id);
            entity.Property(e => e.id).UseIdentityAlwaysColumn();
            
            entity.HasIndex(e => e.tracking_id);
            entity.HasIndex(e => e.queue_or_topic_name);
            entity.HasIndex(e => e.message_type);
            entity.HasIndex(e => e.created_at);
            entity.HasIndex(e => e.status);
            entity.HasIndex(e => e.type);
            entity.HasIndex(e => e.elapsed_milliseconds);
        });
    }
}
