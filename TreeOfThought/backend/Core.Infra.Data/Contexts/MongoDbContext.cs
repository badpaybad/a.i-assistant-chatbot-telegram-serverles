using Core.Infra.Base.Models;
using Core.Infra.Base.Interfaces;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Core.Events;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Bson.Serialization.Attributes;
using System.Linq.Expressions;
using System.Reflection;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Infra.Data.Mongo;
using Core.Infra.Data.Models;

namespace Core.Infra.Data.Contexts;

public abstract class MongoDbContext
{
    public readonly IMongoClient Client;
    public readonly IMongoDatabase Database;

    public IDbSet<AuditLog> AuditLogs { get; set; } = null!;

    protected MongoDbContext(string connectionString, string databaseName)
    {
        // Register GuidSerializer if not already registered
        try { BsonSerializer.RegisterSerializer(new GuidSerializer(GuidRepresentation.Standard)); } catch { }

        var mongoUrl = new MongoUrl(connectionString);
        var settings = MongoClientSettings.FromUrl(mongoUrl);

        // Enable Logging
        settings.ClusterConfigurator = cb =>
        {
            cb.Subscribe<CommandStartedEvent>(e =>
            {
                Console.WriteLine($"MongoDB Command Started: {e.CommandName} - {e.Command.ToJson()}");
            });
        };

        Client = new MongoClient(settings);
        Database = Client.GetDatabase(databaseName);

        InitializeDbSets();
    }

    private void InitializeDbSets()
    {
        var properties = this.GetType().GetProperties(BindingFlags.Public | BindingFlags.Instance)
            .Where(p => p.PropertyType.IsGenericType && 
                        (p.PropertyType.GetGenericTypeDefinition() == typeof(IDbSet<>) ||
                         p.PropertyType.GetGenericTypeDefinition() == typeof(DbSet<>)));

        foreach (var prop in properties)
        {
            var entityType = prop.PropertyType.GetGenericArguments()[0];
            var dbSetType = typeof(DbSet<>).MakeGenericType(entityType);
            
            string collectionName = GetCollectionName(prop, entityType);
            
            var dbSetInstance = Activator.CreateInstance(dbSetType, Database, collectionName);
            prop.SetValue(this, dbSetInstance);
        }
    }

    private string GetCollectionName(PropertyInfo prop, Type entityType)
    {
        // 1. Check for BsonElementAttribute on the property in the context
        var bsonAttr = prop.GetCustomAttribute<BsonElementAttribute>();
        if (bsonAttr != null && !string.IsNullOrEmpty(bsonAttr.ElementName))
            return bsonAttr.ElementName;

        // 2. Check for TableAttribute on the property in the context
        var tableAttr = prop.GetCustomAttribute<TableAttribute>();
        if (tableAttr != null && !string.IsNullOrEmpty(tableAttr.Name))
            return tableAttr.Name;

        // 3. Check for TableAttribute on the entity class itself
        var entityTableAttr = entityType.GetCustomAttribute<TableAttribute>();
        if (entityTableAttr != null && !string.IsNullOrEmpty(entityTableAttr.Name))
            return entityTableAttr.Name;

        // 4. Default to entity class name
        return entityType.Name;
    }

    public IMongoCollection<T> GetCollection<T>(string? name = null)
    {
        return Database.GetCollection<T>(name ?? typeof(T).Name);
    }

    // Bulk Operations
    public virtual async Task BulkInsertAsync<T>(IEnumerable<T> entities, string? collectionName = null)
    {
        string name = collectionName ?? typeof(T).Name;
        var collection = GetCollection<T>(name);
        await collection.InsertManyAsync(entities);

        if (name == "AuditLogs") return;
        try
        {
            var auditLogs = new List<AuditLog>();
            var idProp = typeof(T).GetProperty("Id");
            var trackingInterface = typeof(T).GetInterfaces()
                .FirstOrDefault(i => i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IBaseTrackingEntity<>));

            foreach (var entity in entities)
            {
                var idValue = idProp?.GetValue(entity)?.ToString() ?? string.Empty;
                string? userId = null;
                if (trackingInterface != null)
                {
                    userId = typeof(T).GetProperty("CreatedBy")?.GetValue(entity) as string;
                }

                auditLogs.Add(new AuditLog
                {
                    Id = Guid.NewGuid(),
                    TableName = name,
                    Action = "Insert",
                    EntityId = idValue,
                    BeforeState = null,
                    AfterState = entity.ToJson(),
                    Timestamp = DateTime.UtcNow,
                    UserId = userId
                });
            }

            var auditCollection = Database.GetCollection<AuditLog>("AuditLogs");
            await auditCollection.InsertManyAsync(auditLogs);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Audit log error in BulkInsertAsync: {ex}");
        }
    }

    public virtual async Task BulkUpdateAsync<T, TKey>(IEnumerable<T> entities, string? collectionName = null) where T : IEntity<TKey>
    {
        string name = collectionName ?? typeof(T).Name;
        var collection = GetCollection<T>(name);

        var entityDict = entities.ToDictionary(e => e.Id);
        var ids = entityDict.Keys.ToList();
        var filter = Builders<T>.Filter.In("Id", ids);

        Dictionary<TKey, string> beforeStates = new();
        try
        {
            var originals = await collection.Find(filter).ToListAsync();
            foreach (var original in originals)
            {
                beforeStates[original.Id] = original.ToJson();
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Audit log error fetching originals in BulkUpdateAsync: {ex}");
        }

        var models = entities.Select(e => new ReplaceOneModel<T>(
            Builders<T>.Filter.Eq("Id", e.Id), e) { IsUpsert = true });
        
        await collection.BulkWriteAsync(models);

        if (name == "AuditLogs") return;
        try
        {
            var auditLogs = new List<AuditLog>();
            var trackingInterface = typeof(T).GetInterfaces()
                .FirstOrDefault(i => i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IBaseTrackingEntity<>));

            foreach (var entity in entities)
            {
                string? userId = null;
                if (trackingInterface != null)
                {
                    userId = typeof(T).GetProperty("UpdatedBy")?.GetValue(entity) as string 
                             ?? typeof(T).GetProperty("CreatedBy")?.GetValue(entity) as string;
                }

                beforeStates.TryGetValue(entity.Id, out string? beforeState);

                auditLogs.Add(new AuditLog
                {
                    Id = Guid.NewGuid(),
                    TableName = name,
                    Action = "Update",
                    EntityId = entity.Id?.ToString() ?? string.Empty,
                    BeforeState = beforeState,
                    AfterState = entity.ToJson(),
                    Timestamp = DateTime.UtcNow,
                    UserId = userId
                });
            }

            var auditCollection = Database.GetCollection<AuditLog>("AuditLogs");
            await auditCollection.InsertManyAsync(auditLogs);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Audit log error writing logs in BulkUpdateAsync: {ex}");
        }
    }

    public virtual async Task BulkDeleteAsync<T, TKey>(IEnumerable<TKey> ids, string? collectionName = null)
    {
        string name = collectionName ?? typeof(T).Name;
        var collection = GetCollection<T>(name);

        List<T> originals = new();
        try
        {
            var filter = Builders<T>.Filter.In("Id", ids);
            originals = await collection.Find(filter).ToListAsync();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Audit log error fetching originals in BulkDeleteAsync: {ex}");
        }

        var models = ids.Select(id => new DeleteOneModel<T>(Builders<T>.Filter.Eq("Id", id)));
        await collection.BulkWriteAsync(models);

        if (name == "AuditLogs") return;
        if (originals.Any())
        {
            try
            {
                var auditLogs = new List<AuditLog>();
                var trackingInterface = typeof(T).GetInterfaces()
                    .FirstOrDefault(i => i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IBaseTrackingEntity<>));

                foreach (var original in originals)
                {
                    object? idValue = typeof(T).GetProperty("Id")?.GetValue(original);
                    string? userId = null;
                    if (trackingInterface != null)
                    {
                        userId = typeof(T).GetProperty("UpdatedBy")?.GetValue(original) as string 
                                 ?? typeof(T).GetProperty("CreatedBy")?.GetValue(original) as string;
                    }

                    auditLogs.Add(new AuditLog
                    {
                        Id = Guid.NewGuid(),
                        TableName = name,
                        Action = "Delete",
                        EntityId = idValue?.ToString() ?? string.Empty,
                        BeforeState = original.ToJson(),
                        AfterState = null,
                        Timestamp = DateTime.UtcNow,
                        UserId = userId
                    });
                }

                var auditCollection = Database.GetCollection<AuditLog>("AuditLogs");
                await auditCollection.InsertManyAsync(auditLogs);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Audit log error writing logs in BulkDeleteAsync: {ex}");
            }
        }
    }


    // Paging & Sorting
    public virtual async Task<(List<T> Items, long Total)> GetPagedAsync<T>(
        FilterDefinition<T> filter,
        int page,
        int pageSize,
        SortDefinition<T>? sort = null,
        string? collectionName = null)
    {
        var collection = GetCollection<T>(collectionName);
        var total = await collection.CountDocumentsAsync(filter);
        
        var query = collection.Find(filter);
        if (sort != null) query = query.Sort(sort);
        
        var items = await query.Skip((page - 1) * pageSize).Limit(pageSize).ToListAsync();
        return (items, total);
    }
}
