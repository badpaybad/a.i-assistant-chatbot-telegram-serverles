using Core.Infra.Data.Contexts;
using Core.Infra.DataTest.Models;
using Microsoft.EntityFrameworkCore;

namespace Core.Infra.DataTest.Contexts;

public class TestRelationalContext : BaseDbContext
{
    public TestRelationalContext(string connectionString, string provider) 
        : base(connectionString, Enum.Parse<DbProviderType>(provider, true)) { }

    public DbSet<SampleEntity> Samples { get; set; } = null!;
}

public class TestMongoContext : MongoDbContext
{
    public TestMongoContext(string connectionString, string databaseName) 
        : base(connectionString, databaseName) { }
}
