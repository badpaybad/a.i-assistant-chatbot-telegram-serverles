using Core.Infra.Base.Models;
using Core.Infra.Base.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Core.Infra.Data.Contexts;

public abstract class BaseDbContext : DbContext
{
    public enum DbProviderType { SqlServer, PostgreSql, MySql }

    private readonly string _connectionString;
    private readonly DbProviderType _provider;

    protected BaseDbContext(string connectionString, DbProviderType provider)
    {
        _connectionString = connectionString;
        _provider = provider;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        switch (_provider)
        {
            case DbProviderType.SqlServer:
                optionsBuilder.UseSqlServer(_connectionString);
                break;
            case DbProviderType.PostgreSql:
                optionsBuilder.UseNpgsql(_connectionString);
                break;
            case DbProviderType.MySql:
                optionsBuilder.UseMySql(_connectionString, ServerVersion.AutoDetect(_connectionString));
                break;
        }

        // Enable SQL logging to Console
        optionsBuilder.LogTo(Console.WriteLine, Microsoft.Extensions.Logging.LogLevel.Information);
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
    public virtual async Task PartialUpdateAsync<T>(T entity, params Expression<Func<T, object>>[] updatedProperties) where T : class, IBaseEntity
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
}
