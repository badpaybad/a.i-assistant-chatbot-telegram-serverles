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
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
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
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
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
        
        var updated = context.Samples.FirstOrDefault(x => x.Id == found.Id);
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
            { "CreatedAt", DateTime.UtcNow }
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
}
