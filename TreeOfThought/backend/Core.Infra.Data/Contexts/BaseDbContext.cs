using Core.Infra.Base.Models;
using Core.Infra.Base.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using Core.Infra.Data.Models;

namespace Core.Infra.Data.Contexts;

public abstract class BaseDbContext : DbContext
{
    public enum DbProviderType { SqlServer, PostgreSql, MySql, Sqlite, Oracle }

    private readonly string _connectionString;
    private readonly DbProviderType _provider;

    /// <summary>
    /// Initializes a new instance of the <see cref="BaseDbContext"/> class.
    /// </summary>
    /// <param name="connectionString">The connection string. Examples:
    /// <para>- <b>SqlServer:</b> <c>Server=myServerAddress;Database=myDataBase;User Id=myUsername;Password=myPassword;TrustServerCertificate=True;</c></para>
    /// <para>- <b>PostgreSql:</b> <c>Host=myServer;Database=myDataBase;Username=myUsername;Password=myPassword;</c></para>
    /// <para>- <b>MySql:</b> <c>Server=myServer;Database=myDataBase;Uid=myUsername;Pwd=myPassword;</c></para>
    /// <para>- <b>Sqlite:</b> <c>Data Source=filename.db</c> or <c>Data Source=:memory:</c></para>
    /// <para>- <b>Oracle:</b> <c>User Id=myUsername;Password=myPassword;Data Source=myOracleService</c> or <c>Data Source=(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=myHost)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=myServiceName)));User Id=myUsername;Password=myPassword;</c></para>
    /// </param>
    /// <param name="provider">The database provider type.</param>
    public DbSet<audit_logs_entity> audit_logs { get; set; } = null!;

    protected BaseDbContext(string connectionString, DbProviderType provider)
    {
        _connectionString = connectionString;
        _provider = provider;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<audit_logs_entity>(entity =>
        {
            entity.HasKey(e => e.id);
            entity.Property(e => e.table_name).HasMaxLength(256).IsRequired();
            entity.Property(e => e.action).HasMaxLength(50).IsRequired();
            entity.Property(e => e.entity_id).HasMaxLength(1000).IsRequired();
            entity.Property(e => e.user_id).HasMaxLength(256);
        });
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        switch (_provider)
        {
            case DbProviderType.SqlServer:
                optionsBuilder.UseSqlServer(_connectionString);
                break;
            case DbProviderType.PostgreSql:
                optionsBuilder.UseNpgsql(_connectionString, o => o.UseVector());
                break;
            case DbProviderType.MySql:
                optionsBuilder.UseMySql(_connectionString, ServerVersion.AutoDetect(_connectionString));
                break;
            case DbProviderType.Sqlite:
                optionsBuilder.UseSqlite(_connectionString);
                break;
            case DbProviderType.Oracle:
                optionsBuilder.UseOracle(_connectionString);
                break;
        }

        // Enable SQL logging to Console
        // optionsBuilder.LogTo(Console.WriteLine, Microsoft.Extensions.Logging.LogLevel.Information);
    }

    // Bulk Operations
    public virtual async Task BulkInsertAsync<T>(IEnumerable<T> entities) where T : class
    {
        await Set<T>().AddRangeAsync(entities);
        await SaveChangesAsync();
    }

    public virtual async Task BulkUpdateAsync<T>(IEnumerable<T> entities) where T : class
    {
        Set<T>().UpdateRange(entities);
        await SaveChangesAsync();
    }

    public virtual async Task BulkDeleteAsync<T>(IEnumerable<T> entities) where T : class
    {
        Set<T>().RemoveRange(entities);
        await SaveChangesAsync();
    }

    // Partial Update
    public virtual async Task PartialUpdateAsync<T>(T entity, params Expression<Func<T, object>>[] updatedProperties) where T : class
    {
        var entry = Entry(entity);
        if (entry.State == EntityState.Detached)
        {
            Set<T>().Attach(entity);
        }

        foreach (var property in updatedProperties)
        {
            entry.Property(property).IsModified = true;
        }

        await SaveChangesAsync();
    }

    // Query Helpers
    public virtual async Task<(List<T> Items, int Total)> GetPagedAsync<T>(
        IQueryable<T> query, 
        int page, 
        int pageSize, 
        string? orderBy = null, 
        bool isDescending = false) where T : class
    {
        var total = await query.CountAsync();
        
        if (!string.IsNullOrEmpty(orderBy))
        {
            // Simple dynamic ordering using reflection if needed, but for now we expect query to be pre-ordered or use a string property name
            // For simplicity in base class, we'll assume the caller might pass an already ordered query or use a more advanced lib.
            // But let's implement a basic reflection-based sort for the requirement.
            query = ApplyOrder(query, orderBy, isDescending);
        }

        var items = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
        return (items, total);
    }

    private IQueryable<T> ApplyOrder<T>(IQueryable<T> source, string propertyName, bool isDescending)
    {
        var parameter = Expression.Parameter(typeof(T), "x");
        var property = Expression.Property(parameter, propertyName);
        var lambda = Expression.Lambda(property, parameter);

        string methodName = isDescending ? "OrderByDescending" : "OrderBy";
        var resultExpression = Expression.Call(typeof(Queryable), methodName, 
            new Type[] { typeof(T), property.Type },
            source.Expression, Expression.Quote(lambda));

        return source.Provider.CreateQuery<T>(resultExpression);
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        var entries = ChangeTracker.Entries().ToList();
        if (entries.All(e => e.Entity is audit_logs_entity))
        {
            return await base.SaveChangesAsync(cancellationToken);
        }

        var auditEntries = OnBeforeSaveChanges();
        var result = await base.SaveChangesAsync(cancellationToken);
        await OnAfterSaveChangesAsync(auditEntries, cancellationToken);
        return result;
    }

    public override int SaveChanges()
    {
        var entries = ChangeTracker.Entries().ToList();
        if (entries.All(e => e.Entity is audit_logs_entity))
        {
            return base.SaveChanges();
        }

        var auditEntries = OnBeforeSaveChanges();
        var result = base.SaveChanges();
        OnAfterSaveChanges(auditEntries);
        return result;
    }

    private List<AuditEntry> OnBeforeSaveChanges()
    {
        ChangeTracker.DetectChanges();
        var auditEntries = new List<AuditEntry>();

        var trackingEntries = ChangeTracker.Entries()
            .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

        foreach (var entry in trackingEntries)
        {
            var entityType = entry.Entity.GetType();
            var trackingInterface = entityType.GetInterfaces()
                .FirstOrDefault(i => i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IBaseTrackingEntity<>));

            if (trackingInterface != null)
            {
                if (entry.State == EntityState.Added)
                {
                    entityType.GetProperty("CreatedAt")?.SetValue(entry.Entity, DateTime.UtcNow);
                }
                else
                {
                    entityType.GetProperty("UpdatedAt")?.SetValue(entry.Entity, DateTime.UtcNow);
                }
            }
        }

        foreach (var entry in ChangeTracker.Entries())
        {
            if (entry.Entity is audit_logs_entity || entry.State == EntityState.Detached || entry.State == EntityState.Unchanged)
                continue;

            var auditEntry = new AuditEntry(entry)
            {
                TableName = entry.Metadata.GetTableName() ?? entry.Entity.GetType().Name,
                Action = entry.State.ToString()
            };

            var entityType = entry.Entity.GetType();
            var trackingInterface = entityType.GetInterfaces()
                .FirstOrDefault(i => i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IBaseTrackingEntity<>));
            if (trackingInterface != null)
            {
                if (entry.State == EntityState.Added)
                {
                    auditEntry.UserId = entityType.GetProperty("CreatedBy")?.GetValue(entry.Entity) as string;
                }
                else
                {
                    auditEntry.UserId = entityType.GetProperty("UpdatedBy")?.GetValue(entry.Entity) as string;
                }
            }

            auditEntries.Add(auditEntry);

            foreach (var property in entry.Properties)
            {
                string propertyName = property.Metadata.Name;
                if (property.Metadata.IsPrimaryKey())
                {
                    auditEntry.KeyValues[propertyName] = property.CurrentValue;
                    continue;
                }

                switch (entry.State)
                {
                    case EntityState.Added:
                        auditEntry.AfterValues[propertyName] = property.CurrentValue;
                        break;
                    case EntityState.Deleted:
                        auditEntry.BeforeValues[propertyName] = property.OriginalValue;
                        break;
                    case EntityState.Modified:
                        if (property.IsModified)
                        {
                            auditEntry.BeforeValues[propertyName] = property.OriginalValue;
                            auditEntry.AfterValues[propertyName] = property.CurrentValue;
                        }
                        break;
                }
            }
        }

        return auditEntries;
    }

    private async Task OnAfterSaveChangesAsync(List<AuditEntry> auditEntries, CancellationToken cancellationToken = default)
    {
        if (auditEntries == null || auditEntries.Count == 0)
            return;

        foreach (var auditEntry in auditEntries)
        {
            foreach (var prop in auditEntry.Entry.Properties)
            {
                if (prop.Metadata.IsPrimaryKey())
                {
                    auditEntry.KeyValues[prop.Metadata.Name] = prop.CurrentValue;
                }
            }

            auditEntry.EntityId = System.Text.Json.JsonSerializer.Serialize(auditEntry.KeyValues);
            audit_logs.Add(auditEntry.ToAuditLog());
        }

        await base.SaveChangesAsync(cancellationToken);
    }

    private void OnAfterSaveChanges(List<AuditEntry> auditEntries)
    {
        if (auditEntries == null || auditEntries.Count == 0)
            return;

        foreach (var auditEntry in auditEntries)
        {
            foreach (var prop in auditEntry.Entry.Properties)
            {
                if (prop.Metadata.IsPrimaryKey())
                {
                    auditEntry.KeyValues[prop.Metadata.Name] = prop.CurrentValue;
                }
            }

            auditEntry.EntityId = System.Text.Json.JsonSerializer.Serialize(auditEntry.KeyValues);
            audit_logs.Add(auditEntry.ToAuditLog());
        }

        base.SaveChanges();
    }
}

internal class AuditEntry
{
    public Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry Entry { get; }
    public string TableName { get; set; } = default!;
    public string Action { get; set; } = default!;
    public string EntityId { get; set; } = default!;
    public Dictionary<string, object?> KeyValues { get; } = new();
    public Dictionary<string, object?> BeforeValues { get; } = new();
    public Dictionary<string, object?> AfterValues { get; } = new();
    public string? UserId { get; set; }

    public AuditEntry(Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry entry)
    {
        Entry = entry;
    }

    public audit_logs_entity ToAuditLog()
    {
        return new audit_logs_entity
        {
            id = Guid.NewGuid(),
            table_name = TableName,
            action = Action,
            entity_id = EntityId,
            before_state = BeforeValues.Count == 0 ? null : System.Text.Json.JsonSerializer.Serialize(BeforeValues),
            after_state = AfterValues.Count == 0 ? null : System.Text.Json.JsonSerializer.Serialize(AfterValues),
            timestamp = DateTime.UtcNow,
            user_id = UserId
        };
    }
}
