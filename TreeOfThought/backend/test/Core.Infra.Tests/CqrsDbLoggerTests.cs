using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Core.Infra.Cqrs.Contexts;
using Core.Infra.Cqrs.Models;
using Core.Infra.Cqrs.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Xunit;

namespace Core.Infra.Tests;

public class CqrsDbLoggerTests
{
    private class FakeServiceScope : IServiceScope
    {
        public IServiceProvider ServiceProvider { get; }

        public FakeServiceScope(IServiceProvider serviceProvider)
        {
            ServiceProvider = serviceProvider;
        }

        public void Dispose() { }
    }

    private class FakeServiceScopeFactory : IServiceScopeFactory
    {
        private readonly IServiceProvider _serviceProvider;

        public FakeServiceScopeFactory(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public IServiceScope CreateScope()
        {
            return new FakeServiceScope(_serviceProvider);
        }
    }

    private class FakeServiceProvider : IServiceProvider
    {
        private readonly Dictionary<Type, object> _services = new();

        public void Register<T>(object service)
        {
            _services[typeof(T)] = service;
        }

        public object? GetService(Type serviceType)
        {
            if (serviceType == typeof(IServiceScopeFactory))
            {
                return new FakeServiceScopeFactory(this);
            }
            return _services.TryGetValue(serviceType, out var service) ? service : null;
        }
    }

    private class FakeCqrsDbContext : CqrsDbContext
    {
        public List<CqrsTrackingLog> SavedLogs { get; } = new();

        public FakeCqrsDbContext() : base("Server=dummy;Database=dummy", DbProviderType.SqlServer)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=dummy;Database=dummy");
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            foreach (var entry in ChangeTracker.Entries<CqrsTrackingLog>())
            {
                if (entry.State == EntityState.Added)
                {
                    SavedLogs.Add(entry.Entity);
                }
            }
            ChangeTracker.Clear();
            return Task.FromResult(0);
        }
    }

    [Fact]
    public async Task LogAsync_ShouldEnqueueAndFlushInBatches()
    {
        // Arrange
        var provider = new FakeServiceProvider();
        var db = new FakeCqrsDbContext();
        provider.Register<CqrsDbContext>(db);

        var loggerFactory = LoggerFactory.Create(builder => { });
        var logger = loggerFactory.CreateLogger<CqrsDbLogger>();

        using (var dbLogger = new CqrsDbLogger(provider, logger))
        {
            // Act - Log 150 items
            for (int i = 0; i < 150; i++)
            {
                await dbLogger.LogAsync(
                    Guid.NewGuid(),
                    "TestMessage",
                    "{}",
                    "test-queue",
                    null,
                    null,
                    null,
                    null,
                    null,
                    "dequeue",
                    "success",
                    "queue"
                );
            }

            // At this point, the queue contains 150 items, but the background loop has not run yet.
            Assert.Empty(db.SavedLogs);
        } // Dispose is called here, forcing FlushQueueAsync

        // Assert
        Assert.Equal(150, db.SavedLogs.Count);
        foreach (var log in db.SavedLogs)
        {
            Assert.Equal("test-queue", log.QueueOrTopicName);
            Assert.Equal("TestMessage", log.MessageType);
        }
    }
}
