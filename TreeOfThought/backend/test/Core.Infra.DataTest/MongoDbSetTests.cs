using Core.Infra.Base.Utils;
using Core.Infra.DataTest.Contexts;
using Core.Infra.DataTest.Models;
using Core.Infra.Data.Mongo;
using Core.Infra.Data.Contexts;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Xunit;
using Core.Infra.Base.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Infra.Data.Models;

namespace Core.Infra.DataTest;

public class MongoDbSetTests
{
    private readonly IConfiguration _config;

    public MongoDbSetTests()
    {
        _config = ConfigurationHelper.LoadConfiguration();
    }

    [Table("CustomCollectionName")]
    public class AttributedEntity : IBaseTrackingEntity<Guid>
    {
        public Guid id { get; set; }
        public string Name { get; set; } = string.Empty;
        public DateTime created_at { get; set; }
        public DateTime? updated_at { get; set; }
        public string? created_by { get; set; }
        public string? updated_by { get; set; }
    }

    public class TestEnhancedMongoContext : MongoDbContext
    {
        public TestEnhancedMongoContext(string connectionString, string databaseName) 
            : base(connectionString, databaseName) { }

        public IDbSet<SampleEntity> Samples { get; set; }
        public IDbSet<ExtraFieldEntity> Extras { get; set; }
        
        [BsonElement("PropertiesAttributedName")]
        public IDbSet<SampleEntity> AttributedSamples { get; set; }
        
        public IDbSet<AttributedEntity> AttributedEntities { get; set; }
    }

    public class ExtraFieldEntity : IBaseTrackingEntity<Guid>
    {
        public Guid id { get; set; }
        public string Name { get; set; } = string.Empty;
        public DateTime created_at { get; set; }
        public DateTime? updated_at { get; set; }
        public string? created_by { get; set; }
        public string? updated_by { get; set; }
    }

    [Fact]
    public async Task Mongo_DbSet_AutoInitialization_And_Operations_Test()
    {
        var connStr = _config.GetConnectionString("MongoDb");
        if (string.IsNullOrEmpty(connStr)) return;

        var context = new TestEnhancedMongoContext(connStr, "TestDbSet");

        // Verify Auto-initialization
        Assert.NotNull(context.Samples);
        Assert.NotNull(context.Extras);
        Assert.Equal("SampleEntity", context.Samples.CollectionName);

        // Verify Attribute-based naming
        Assert.Equal("PropertiesAttributedName", context.AttributedSamples.CollectionName);
        Assert.Equal("CustomCollectionName", context.AttributedEntities.CollectionName);

        // 1. Test Insert via DbSet
        var entity = new SampleEntity { Name = "Test DbSet", Price = 100 };
        await context.Samples.AddAsync(entity);

        // 2. Test Query via DbSet (IQueryable)
        var found = context.Samples.FirstOrDefault(x => x.Name == "Test DbSet");
        Assert.NotNull(found);
        Assert.Equal(100, found.Price);

        // 3. Test Update via DbSet
        found.Price = 200;
        await context.Samples.UpdateAsync(found);
        
        var updated = context.Samples.FirstOrDefault(x => x.id == found.id);
        Assert.Equal(200, updated.Price);

        // 4. Test Missing Fields (Extra Elements)
        // Directly insert a document with an extra field using a BsonDocument
        var collection = context.Database.GetCollection<MongoDB.Bson.BsonDocument>("ExtraFieldEntity");
        var extraId = Guid.NewGuid();
        var extraDoc = new MongoDB.Bson.BsonDocument
        {
            { "_id", new BsonBinaryData(extraId, GuidRepresentation.Standard) },
            { "Name", "Entity with extra field" },
            { "MissingInModel", "This field is not in C# class" },
            { "created_at", DateTime.UtcNow }
        };
        await collection.InsertOneAsync(extraDoc);

        // Try to read it back into ExtraFieldEntity - should not throw if SetIgnoreExtraElements(true) works
        var extraFound = await context.Extras.Where(x => x.Name == "Entity with extra field").FirstOrDefaultAsync();
        Assert.NotNull(extraFound);
        Assert.Equal("Entity with extra field", extraFound.Name);

        // Cleanup
        await context.Samples.RemoveAsync(x => x.Name == "Test DbSet");
        await context.Extras.RemoveAsync(x => x.Name == "Entity with extra field");
    }

    [Fact]
    public async Task Mongo_AuditLog_Test()
    {
        var connStr = _config.GetConnectionString("MongoDb");
        if (string.IsNullOrEmpty(connStr)) return;

        var context = new TestEnhancedMongoContext(connStr, "TestDbSetAudit");

        // Clear existing collection records
        await context.Samples.RemoveAsync(x => true);
        await context.audit_logs.RemoveAsync(x => true);

        // 1. Test Insert
        var entity = new SampleEntity 
        { 
            Name = "Mongo Audit Item", 
            Price = 100,
            created_by = "MongoInserter"
        };
        await context.Samples.AddAsync(entity);

        // Verify Insert Log
        var insertLogs = await context.audit_logs.Collection.AsQueryable().ToListAsync();
        Assert.Single(insertLogs);
        var insertLog = insertLogs[0];
        Assert.Equal("SampleEntity", insertLog.table_name);
        Assert.Equal("Insert", insertLog.action);
        Assert.Contains("Mongo Audit Item", insertLog.after_state ?? "");
        Assert.Null(insertLog.before_state);
        Assert.Equal("MongoInserter", insertLog.user_id);

        // 2. Test Update
        entity.Price = 200;
        entity.updated_by = "MongoUpdater";
        await context.Samples.UpdateAsync(entity);

        var allLogs = await context.audit_logs.Collection.AsQueryable().ToListAsync();
        Assert.Equal(2, allLogs.Count);
        var updateLog = allLogs[1];
        Assert.Equal("SampleEntity", updateLog.table_name);
        Assert.Equal("Update", updateLog.action);
        Assert.Contains("100", updateLog.before_state ?? "");
        Assert.Contains("200", updateLog.after_state ?? "");
        Assert.Equal("MongoUpdater", updateLog.user_id);

        // 3. Test Delete
        await context.Samples.RemoveAsync(entity);

        allLogs = await context.audit_logs.Collection.AsQueryable().ToListAsync();
        Assert.Equal(3, allLogs.Count);
        var deleteLog = allLogs[2];
        Assert.Equal("SampleEntity", deleteLog.table_name);
        Assert.Equal("Delete", deleteLog.action);
        Assert.Contains("200", deleteLog.before_state ?? "");
        Assert.Null(deleteLog.after_state);
        Assert.Equal("MongoUpdater", deleteLog.user_id);
    }
}
