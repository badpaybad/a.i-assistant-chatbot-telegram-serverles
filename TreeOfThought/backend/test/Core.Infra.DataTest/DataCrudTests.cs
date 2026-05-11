using Core.Infra.Base.Utils;
using Core.Infra.DataTest.Contexts;
using Core.Infra.DataTest.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using Xunit;

namespace Core.Infra.DataTest;

public class DataCrudTests
{
    private readonly IConfiguration _config;

    public DataCrudTests()
    {
        _config = ConfigurationHelper.LoadConfiguration();
    }

    [Theory]
    [InlineData("SqlServer")]
    [InlineData("PostgreSql")]
    [InlineData("MySql")]
    public async Task Relational_Advanced_Operations_Test(string provider)
    {
        var connStr = _config.GetConnectionString(provider);
        if (string.IsNullOrEmpty(connStr)) return;

        using var context = new TestRelationalContext(connStr, provider);
        await context.Database.EnsureCreatedAsync();
        
        // 1. Test Bulk Insert
        var list = new List<SampleEntity>();
        for (int i = 1; i <= 20; i++)
        {
            var name = i % 2 == 0 ? $"Sản phẩm {i}" : $"San pham {i}";
            list.Add(new SampleEntity { 
                Name = name, 
                NameUnaccented = name.RemoveAccents().ToLower(),
                Description = $"Mô tả {i}", 
                Price = i * 100,
                Stock = i
            });
        }
        await context.BulkInsertAsync(list);

        // 2. Test Bulk Update
        foreach (var item in list) item.Price += 50;
        await context.BulkUpdateAsync(list);

        // 3. Test Partial Update
        var first = list[0];
        first.Name = "Tên đã đổi";
        await context.PartialUpdateAsync(first, x => x.Name);

        // 4. Test Query with Paging & Sorting
        var query = context.Samples.AsQueryable();
        var (items, total) = await context.GetPagedAsync(query, 1, 5, "Price", true);
        
        Assert.Equal(20, total);
        Assert.Equal(5, items.Count);
        Assert.True(items[0].Price >= items[1].Price);

        // 5. Test Fulltext Search (Accented and Unaccented)
        var searchText = "sản phẩm";
        var searchUnaccented = searchText.ToSearchFriendly();
        
        var results = await context.Samples
            .Where(x => x.Name.Contains(searchText) || x.NameUnaccented.Contains(searchUnaccented))
            .ToListAsync();
        
        Assert.NotEmpty(results);

        // Cleanup
        await context.BulkDeleteAsync(list);
    }

    [Fact]
    public async Task Mongo_Advanced_Operations_Test()
    {
        var connStr = _config.GetConnectionString("MongoDb");
        if (string.IsNullOrEmpty(connStr)) return;

        var context = new TestMongoContext(connStr, "TestDb");
        var collection = context.GetCollection<SampleEntity>();

        // 1. Test Bulk Insert
        var list = new List<SampleEntity>();
        for (int i = 1; i <= 20; i++)
        {
            var name = i % 2 == 0 ? $"Sản phẩm {i}" : $"San pham {i}";
            list.Add(new SampleEntity { 
                Name = name, 
                NameUnaccented = name.RemoveAccents().ToLower(),
                Description = $"Mô tả {i}", 
                Price = i * 100,
                Stock = i
            });
        }
        await context.BulkInsertAsync(list);

        // 2. Test Bulk Update
        foreach (var item in list) item.Price += 50;
        await context.BulkUpdateAsync<SampleEntity, Guid>(list);

        // 3. Test Paging & Sorting
        var filter = Builders<SampleEntity>.Filter.Empty;
        var sort = Builders<SampleEntity>.Sort.Descending(x => x.Price);
        var (items, total) = await context.GetPagedAsync(filter, 1, 5, sort);
        
        Assert.Equal(20, total);
        Assert.Equal(5, items.Count);
        Assert.True(items[0].Price >= items[1].Price);

        // 4. Test Fulltext Search
        var searchText = "sản phẩm";
        var searchUnaccented = searchText.ToSearchFriendly();
        var searchFilter = Builders<SampleEntity>.Filter.Or(
            Builders<SampleEntity>.Filter.Regex(x => x.Name, new MongoDB.Bson.BsonRegularExpression(searchText, "i")),
            Builders<SampleEntity>.Filter.Regex(x => x.NameUnaccented, new MongoDB.Bson.BsonRegularExpression(searchUnaccented, "i"))
        );
        
        var results = await collection.Find(searchFilter).ToListAsync();
        Assert.NotEmpty(results);

        // Cleanup
        await context.BulkDeleteAsync<SampleEntity, Guid>(list.Select(x => x.Id));
    }
}
