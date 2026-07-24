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
            // Auto-migrate schema: rename existing PascalCase columns to lowercase snake_case if they exist,
            // and add 'type' and 'elapsed_milliseconds' in lowercase snake_case.
            await Database.ExecuteSqlRawAsync(@"
                DO $$
                BEGIN
                    -- Rename old PascalCase columns to lowercase snake_case if they exist
                    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='cqrs_tracking_logs' AND column_name='Id') THEN
                        ALTER TABLE public.cqrs_tracking_logs RENAME COLUMN ""Id"" TO id;
                    END IF;
                    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='cqrs_tracking_logs' AND column_name='TrackingId') THEN
                        ALTER TABLE public.cqrs_tracking_logs RENAME COLUMN ""TrackingId"" TO tracking_id;
                    END IF;
                    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='cqrs_tracking_logs' AND column_name='MessageType') THEN
                        ALTER TABLE public.cqrs_tracking_logs RENAME COLUMN ""MessageType"" TO message_type;
                    END IF;
                    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='cqrs_tracking_logs' AND column_name='MessageData') THEN
                        ALTER TABLE public.cqrs_tracking_logs RENAME COLUMN ""MessageData"" TO message_data;
                    END IF;
                    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='cqrs_tracking_logs' AND column_name='QueueOrTopicName') THEN
                        ALTER TABLE public.cqrs_tracking_logs RENAME COLUMN ""QueueOrTopicName"" TO queue_or_topic_name;
                    END IF;
                    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='cqrs_tracking_logs' AND column_name='SubscriberName') THEN
                        ALTER TABLE public.cqrs_tracking_logs RENAME COLUMN ""SubscriberName"" TO subscriber_name;
                    END IF;
                    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='cqrs_tracking_logs' AND column_name='DestinationQueueName') THEN
                        ALTER TABLE public.cqrs_tracking_logs RENAME COLUMN ""DestinationQueueName"" TO destination_queue_name;
                    END IF;
                    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='cqrs_tracking_logs' AND column_name='SourceComponent') THEN
                        ALTER TABLE public.cqrs_tracking_logs RENAME COLUMN ""SourceComponent"" TO source_component;
                    END IF;
                    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='cqrs_tracking_logs' AND column_name='HandlerName') THEN
                        ALTER TABLE public.cqrs_tracking_logs RENAME COLUMN ""HandlerName"" TO handler_name;
                    END IF;
                    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='cqrs_tracking_logs' AND column_name='WorkerId') THEN
                        ALTER TABLE public.cqrs_tracking_logs RENAME COLUMN ""WorkerId"" TO worker_id;
                    END IF;
                    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='cqrs_tracking_logs' AND column_name='Step') THEN
                        ALTER TABLE public.cqrs_tracking_logs RENAME COLUMN ""Step"" TO step;
                    END IF;
                    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='cqrs_tracking_logs' AND column_name='Status') THEN
                        ALTER TABLE public.cqrs_tracking_logs RENAME COLUMN ""Status"" TO status;
                    END IF;
                    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='cqrs_tracking_logs' AND column_name='ErrorMessage') THEN
                        ALTER TABLE public.cqrs_tracking_logs RENAME COLUMN ""ErrorMessage"" TO error_message;
                    END IF;
                    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='cqrs_tracking_logs' AND column_name='IsRoot') THEN
                        ALTER TABLE public.cqrs_tracking_logs RENAME COLUMN ""IsRoot"" TO is_root;
                    END IF;
                    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='cqrs_tracking_logs' AND column_name='CreatedAt') THEN
                        ALTER TABLE public.cqrs_tracking_logs RENAME COLUMN ""CreatedAt"" TO created_at;
                    END IF;
                    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='cqrs_tracking_logs' AND column_name='Type') THEN
                        ALTER TABLE public.cqrs_tracking_logs RENAME COLUMN ""Type"" TO type;
                    END IF;
                    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='cqrs_tracking_logs' AND column_name='ElapsedMilliseconds') THEN
                        ALTER TABLE public.cqrs_tracking_logs RENAME COLUMN ""ElapsedMilliseconds"" TO elapsed_milliseconds;
                    END IF;

                    -- Add type and elapsed_milliseconds columns if they do not exist
                    ALTER TABLE public.cqrs_tracking_logs ADD COLUMN IF NOT EXISTS type VARCHAR(50) NOT NULL DEFAULT '';
                    ALTER TABLE public.cqrs_tracking_logs ADD COLUMN IF NOT EXISTS elapsed_milliseconds BIGINT NULL;
                END $$;
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
