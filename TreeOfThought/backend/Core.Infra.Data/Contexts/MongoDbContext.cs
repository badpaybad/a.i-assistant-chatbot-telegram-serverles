using Core.Infra.Base.Models;
using Core.Infra.Base.Interfaces;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Core.Events;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;
using System.Linq.Expressions;

namespace Core.Infra.Data.Contexts;

public abstract class MongoDbContext
{
    protected readonly IMongoClient Client;
    protected readonly IMongoDatabase Database;

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
    }

    public IMongoCollection<T> GetCollection<T>(string? name = null)
    {
        return Database.GetCollection<T>(name ?? typeof(T).Name);
    }

    // Bulk Operations
    public virtual async Task BulkInsertAsync<T>(IEnumerable<T> entities, string? collectionName = null)
    {
        var collection = GetCollection<T>(collectionName);
        await collection.InsertManyAsync(entities);
    }

    public virtual async Task BulkUpdateAsync<T>(IEnumerable<T> entities, string? collectionName = null) where T : IBaseEntity
    {
        var collection = GetCollection<T>(collectionName);
        var models = entities.Select(e => new ReplaceOneModel<T>(
            Builders<T>.Filter.Eq(x => x.Id, e.Id), e) { IsUpsert = true });
        
        await collection.BulkWriteAsync(models);
    }

    public virtual async Task BulkDeleteAsync<T>(IEnumerable<Guid> ids, string? collectionName = null) where T : IBaseEntity
    {
        var collection = GetCollection<T>(collectionName);
        var models = ids.Select(id => new DeleteOneModel<T>(Builders<T>.Filter.Eq(x => x.Id, id)));
        await collection.BulkWriteAsync(models);
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
