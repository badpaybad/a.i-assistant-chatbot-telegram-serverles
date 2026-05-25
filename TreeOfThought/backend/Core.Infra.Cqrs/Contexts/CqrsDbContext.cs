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
    }

    public DbSet<CqrsTrackingLog> CqrsTrackingLogs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<CqrsTrackingLog>(entity =>
        {
            entity.ToTable("cqrs_tracking_logs");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).UseIdentityAlwaysColumn();
            
            entity.HasIndex(e => e.TrackingId);
            entity.HasIndex(e => e.QueueOrTopicName);
            entity.HasIndex(e => e.MessageType);
            entity.HasIndex(e => e.CreatedAt);
            entity.HasIndex(e => e.Status);
        });
    }
}
