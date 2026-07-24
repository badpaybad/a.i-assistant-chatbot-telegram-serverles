using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using Core.Infra.Base.Interfaces;
using Core.Infra.Data.Models;

namespace Core.Infra.Data.Mongo;

public class DbSet<T> : IDbSet<T> where T : class
{
    private readonly IMongoDatabase _database;
    private readonly IMongoCollection<T> _collection;
    private readonly IQueryable<T> _queryable;
    private readonly string _collectionName;

    private static readonly object _lock = new object();
    private static bool _isMapped = false;

    public DbSet(IMongoDatabase database, string? collectionName = null)
    {
        _database = database;
        _collectionName = collectionName ?? typeof(T).Name;
        
        EnsureClassMapRegistered();
        
        _collection = database.GetCollection<T>(_collectionName);
        _queryable = _collection.AsQueryable();
    }

    private async Task WriteAuditLogInternalAsync(audit_logs_entity auditLog)
    {
        if (_collectionName == "audit_logs") return;
        var auditCollection = _database.GetCollection<audit_logs_entity>("audit_logs");
        await auditCollection.InsertOneAsync(auditLog);
    }

    private async Task WriteAuditLogsInternalAsync(IEnumerable<audit_logs_entity> auditLogs)
    {
        if (_collectionName == "audit_logs") return;
        var logs = auditLogs.ToList();
        if (logs.Count == 0) return;
        var auditCollection = _database.GetCollection<audit_logs_entity>("audit_logs");
        await auditCollection.InsertManyAsync(logs);
    }

    private void EnsureClassMapRegistered()
    {
        if (_isMapped) return;

        lock (_lock)
        {
            if (_isMapped) return;

            if (!BsonClassMap.IsClassMapRegistered(typeof(T)))
            {
                BsonClassMap.RegisterClassMap<T>(cm =>
                {
                    cm.AutoMap();
                    cm.SetIgnoreExtraElements(true);
                });
            }
            _isMapped = true;
        }
    }

    public IMongoCollection<T> Collection => _collection;
    public string CollectionName => _collectionName;

    // IQueryable implementation
    public Type ElementType => _queryable.ElementType;
    public Expression Expression => _queryable.Expression;
    public IQueryProvider Provider => _queryable.Provider;

    public IEnumerator<T> GetEnumerator() => _queryable.GetEnumerator();
    IEnumerator IEnumerable.GetEnumerator() => _queryable.GetEnumerator();

    // EF-like methods
    public Task AddAsync(T entity) => InsertAsync(entity);
    public Task AddRangeAsync(IEnumerable<T> entities) => InsertManyAsync(entities);
    public Task UpdateRangeAsync(IEnumerable<T> entities) => UpdateManyAsync(entities);
    
    public async Task RemoveAsync(T entity)
    {
        object? idValue = null;
        
        // Try to get Id via Reflection first to be most flexible
        var idProp = typeof(T).GetProperty("id") ?? typeof(T).GetProperty("Id");
        if (idProp != null)
        {
            idValue = idProp.GetValue(entity);
        }

        if (idValue != null)
        {
            var filter = Builders<T>.Filter.Eq(idProp?.Name ?? "id", idValue);

            // Fetch Before State
            string? beforeState = null;
            try
            {
                var original = await _collection.Find(filter).FirstOrDefaultAsync();
                if (original != null)
                {
                    beforeState = original.ToJson();
                }
                else
                {
                    beforeState = entity.ToJson();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Audit log error fetching original in RemoveAsync: {ex}");
                beforeState = entity.ToJson();
            }

            // Perform Delete
            await _collection.DeleteOneAsync(filter);

            // Audit Log
            try
            {
                string? userId = null;
                var trackingInterface = typeof(T).GetInterfaces()
                    .FirstOrDefault(i => i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IBaseTrackingEntity<>));
                if (trackingInterface != null)
                {
                    userId = (typeof(T).GetProperty("updated_by") ?? typeof(T).GetProperty("UpdatedBy"))?.GetValue(entity) as string 
                             ?? (typeof(T).GetProperty("created_by") ?? typeof(T).GetProperty("CreatedBy"))?.GetValue(entity) as string;
                }

                var auditLog = new audit_logs_entity
                {
                    id = Guid.NewGuid(),
                    table_name = _collectionName,
                    action = "Delete",
                    entity_id = idValue.ToString() ?? string.Empty,
                    before_state = beforeState,
                    after_state = null,
                    timestamp = DateTime.UtcNow,
                    user_id = userId
                };

                await WriteAuditLogInternalAsync(auditLog);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Audit log error writing log in RemoveAsync: {ex}");
            }
        }
        else
        {
            throw new InvalidOperationException("Entity must have an Id property to be removed.");
        }
    }

    public async Task RemoveRangeAsync(IEnumerable<T> entities)
    {
        foreach (var entity in entities)
        {
            await RemoveAsync(entity);
        }
    }

    public Task RemoveAsync(Expression<Func<T, bool>> predicate) => DeleteAsync(predicate);

    // CRUD Operations (Original/Aliases)
    public async Task InsertAsync(T entity)
    {
        await _collection.InsertOneAsync(entity);

        try
        {
            var idProp = typeof(T).GetProperty("id") ?? typeof(T).GetProperty("Id");
            var idValue = idProp?.GetValue(entity)?.ToString() ?? string.Empty;

            string? userId = null;
            var trackingInterface = typeof(T).GetInterfaces()
                .FirstOrDefault(i => i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IBaseTrackingEntity<>));
            if (trackingInterface != null)
            {
                userId = (typeof(T).GetProperty("created_by") ?? typeof(T).GetProperty("CreatedBy"))?.GetValue(entity) as string;
            }

            var auditLog = new audit_logs_entity
            {
                id = Guid.NewGuid(),
                table_name = _collectionName,
                action = "Insert",
                entity_id = idValue,
                before_state = null,
                after_state = entity.ToJson(),
                timestamp = DateTime.UtcNow,
                user_id = userId
            };

            await WriteAuditLogInternalAsync(auditLog);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Audit log error in InsertAsync: {ex}");
        }
    }
    
    public async Task InsertManyAsync(IEnumerable<T> entities)
    {
        if (entities != null && entities.Any())
        {
            await _collection.InsertManyAsync(entities);

            try
            {
                var auditLogs = new List<audit_logs_entity>();
                var idProp = typeof(T).GetProperty("id") ?? typeof(T).GetProperty("Id");
                var trackingInterface = typeof(T).GetInterfaces()
                    .FirstOrDefault(i => i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IBaseTrackingEntity<>));

                foreach (var entity in entities)
                {
                    var idValue = idProp?.GetValue(entity)?.ToString() ?? string.Empty;
                    string? userId = null;
                    if (trackingInterface != null)
                    {
                        userId = (typeof(T).GetProperty("created_by") ?? typeof(T).GetProperty("CreatedBy"))?.GetValue(entity) as string;
                    }

                    auditLogs.Add(new audit_logs_entity
                    {
                        id = Guid.NewGuid(),
                        table_name = _collectionName,
                        action = "Insert",
                        entity_id = idValue,
                        before_state = null,
                        after_state = entity.ToJson(),
                        timestamp = DateTime.UtcNow,
                        user_id = userId
                    });
                }

                await WriteAuditLogsInternalAsync(auditLogs);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Audit log error in InsertManyAsync: {ex}");
            }
        }
    }

    public async Task UpdateAsync(T entity)
    {
        object? idValue = null;
        
        var idProp = typeof(T).GetProperty("id") ?? typeof(T).GetProperty("Id");
        if (idProp != null)
        {
            idValue = idProp.GetValue(entity);
        }

        if (idValue != null)
        {
            var filter = Builders<T>.Filter.Eq(idProp?.Name ?? "id", idValue);

            // Fetch Before State
            string? beforeState = null;
            try
            {
                var original = await _collection.Find(filter).FirstOrDefaultAsync();
                if (original != null)
                {
                    beforeState = original.ToJson();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Audit log error fetching original in UpdateAsync: {ex}");
            }

            // Update
            await _collection.ReplaceOneAsync(filter, entity);

            // Audit
            try
            {
                string? userId = null;
                var trackingInterface = typeof(T).GetInterfaces()
                    .FirstOrDefault(i => i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IBaseTrackingEntity<>));
                if (trackingInterface != null)
                {
                    userId = (typeof(T).GetProperty("updated_by") ?? typeof(T).GetProperty("UpdatedBy"))?.GetValue(entity) as string 
                             ?? (typeof(T).GetProperty("created_by") ?? typeof(T).GetProperty("CreatedBy"))?.GetValue(entity) as string;
                }

                var auditLog = new audit_logs_entity
                {
                    id = Guid.NewGuid(),
                    table_name = _collectionName,
                    action = "Update",
                    entity_id = idValue.ToString() ?? string.Empty,
                    before_state = beforeState,
                    after_state = entity.ToJson(),
                    timestamp = DateTime.UtcNow,
                    user_id = userId
                };

                await WriteAuditLogInternalAsync(auditLog);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Audit log error writing log in UpdateAsync: {ex}");
            }
        } 
        else
        {
            throw new InvalidOperationException("Entity must have an Id property to be updated.");
        }
    }

    public async Task UpdateManyAsync(IEnumerable<T> entities)
    {
        foreach (var entity in entities)
        {
            await UpdateAsync(entity);
        }
    }


    public async Task DeleteAsync(Expression<Func<T, bool>> predicate)
    {
        List<T> originals = new();
        try
        {
            originals = await _collection.Find(predicate).ToListAsync();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Audit log error fetching originals in DeleteAsync: {ex}");
        }

        await _collection.DeleteManyAsync(predicate);

        if (originals.Any())
        {
            try
            {
                var auditLogs = new List<audit_logs_entity>();
                var idProp = typeof(T).GetProperty("id") ?? typeof(T).GetProperty("Id");
                var trackingInterface = typeof(T).GetInterfaces()
                    .FirstOrDefault(i => i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IBaseTrackingEntity<>));

                foreach (var original in originals)
                {
                    var idValue = idProp?.GetValue(original)?.ToString() ?? string.Empty;
                    string? userId = null;
                    if (trackingInterface != null)
                    {
                        userId = (typeof(T).GetProperty("updated_by") ?? typeof(T).GetProperty("UpdatedBy"))?.GetValue(original) as string 
                                 ?? (typeof(T).GetProperty("created_by") ?? typeof(T).GetProperty("CreatedBy"))?.GetValue(original) as string;
                    }

                    auditLogs.Add(new audit_logs_entity
                    {
                        id = Guid.NewGuid(),
                        table_name = _collectionName,
                        action = "Delete",
                        entity_id = idValue,
                        before_state = original.ToJson(),
                        after_state = null,
                        timestamp = DateTime.UtcNow,
                        user_id = userId
                    });
                }

                await WriteAuditLogsInternalAsync(auditLogs);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Audit log error writing logs in DeleteAsync: {ex}");
            }
        }
    }

    public async Task UpsertAsync(Expression<Func<T, bool>> predicate, T entity)
    {
        string? beforeState = null;
        bool exists = false;
        try
        {
            var original = await _collection.Find(predicate).FirstOrDefaultAsync();
            if (original != null)
            {
                beforeState = original.ToJson();
                exists = true;
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Audit log error checking original in UpsertAsync: {ex}");
        }

        var options = new ReplaceOptions { IsUpsert = true };
        await _collection.ReplaceOneAsync(predicate, entity, options);

        try
        {
            var idProp = typeof(T).GetProperty("id") ?? typeof(T).GetProperty("Id");
            var idValue = idProp?.GetValue(entity)?.ToString() ?? string.Empty;

            string? userId = null;
            var trackingInterface = typeof(T).GetInterfaces()
                .FirstOrDefault(i => i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IBaseTrackingEntity<>));
            if (trackingInterface != null)
            {
                if (exists)
                {
                    userId = (typeof(T).GetProperty("updated_by") ?? typeof(T).GetProperty("UpdatedBy"))?.GetValue(entity) as string 
                             ?? (typeof(T).GetProperty("created_by") ?? typeof(T).GetProperty("CreatedBy"))?.GetValue(entity) as string;
                }
                else
                {
                    userId = (typeof(T).GetProperty("created_by") ?? typeof(T).GetProperty("CreatedBy"))?.GetValue(entity) as string;
                }
            }

            var auditLog = new audit_logs_entity
            {
                id = Guid.NewGuid(),
                table_name = _collectionName,
                action = exists ? "Update" : "Insert",
                entity_id = idValue,
                before_state = beforeState,
                after_state = entity.ToJson(),
                timestamp = DateTime.UtcNow,
                user_id = userId
            };

            await WriteAuditLogInternalAsync(auditLog);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Audit log error writing log in UpsertAsync: {ex}");
        }
    }
}
