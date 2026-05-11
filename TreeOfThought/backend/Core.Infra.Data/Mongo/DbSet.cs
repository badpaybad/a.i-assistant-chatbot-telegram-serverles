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

namespace Core.Infra.Data.Mongo;

public class DbSet<T> : IDbSet<T> where T : class
{
    private readonly IMongoCollection<T> _collection;
    private readonly IQueryable<T> _queryable;
    private readonly string _collectionName;

    private static readonly object _lock = new object();
    private static bool _isMapped = false;

    public DbSet(IMongoDatabase database, string? collectionName = null)
    {
        _collectionName = collectionName ?? typeof(T).Name;
        
        EnsureClassMapRegistered();
        
        _collection = database.GetCollection<T>(_collectionName);
        _queryable = _collection.AsQueryable();
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
        var idProp = typeof(T).GetProperty("Id");
        if (idProp != null)
        {
            idValue = idProp.GetValue(entity);
        }

        if (idValue != null)
        {
            var filter = Builders<T>.Filter.Eq("Id", idValue);
            await _collection.DeleteOneAsync(filter);
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
    public async Task InsertAsync(T entity) => await _collection.InsertOneAsync(entity);
    
    public async Task InsertManyAsync(IEnumerable<T> entities)
    {
        if (entities != null && entities.Any())
        {
            await _collection.InsertManyAsync(entities);
        }
    }

    public async Task UpdateAsync(T entity)
    {
        object? idValue = null;
        
        var idProp = typeof(T).GetProperty("Id");
        if (idProp != null)
        {
            idValue = idProp.GetValue(entity);
        }

        if (idValue != null)
        {
            var filter = Builders<T>.Filter.Eq("Id", idValue);
            await _collection.ReplaceOneAsync(filter, entity);
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
        await _collection.DeleteManyAsync(predicate);
    }

    public async Task UpsertAsync(Expression<Func<T, bool>> predicate, T entity)
    {
        var options = new ReplaceOptions { IsUpsert = true };
        await _collection.ReplaceOneAsync(predicate, entity, options);
    }
}
