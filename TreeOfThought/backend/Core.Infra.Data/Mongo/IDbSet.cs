using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Core.Infra.Data.Mongo;

public interface IDbSet<T> : IQueryable<T>
{
    IMongoCollection<T> Collection { get; }
    string CollectionName { get; }
    
    // EF-like methods
    Task AddAsync(T entity);
    Task AddRangeAsync(IEnumerable<T> entities);
    Task UpdateAsync(T entity);
    Task UpdateRangeAsync(IEnumerable<T> entities);
    Task RemoveAsync(T entity);
    Task RemoveRangeAsync(IEnumerable<T> entities);
    Task RemoveAsync(Expression<Func<T, bool>> predicate);
    
    // Original methods (aliases)
    Task InsertAsync(T entity);
    Task InsertManyAsync(IEnumerable<T> entities);
    Task DeleteAsync(Expression<Func<T, bool>> predicate);
    Task UpsertAsync(Expression<Func<T, bool>> predicate, T entity);
}
