using Core.Infra.Redis.Services;
using Core.Infra.Session.Interfaces;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.Infra.Session.Services;

public class RedisSessionService : RedisService, IUserSessionService
{
    public RedisSessionService(string connectionString, ILogger<RedisSessionService> logger) 
        : base(connectionString, logger)
    {
    }

    public async Task SetUserClaimsAsync(Guid userId, List<string> claims, TimeSpan? expiry = null)
    {
        var cacheKey = $"claims:{userId}";
        await SetAsync(cacheKey, claims, expiry ?? TimeSpan.FromHours(24));
    }

    public async Task<List<string>?> GetUserClaimsAsync(Guid userId)
    {
        var cacheKey = $"claims:{userId}";
        return await GetAsync<List<string>>(cacheKey);
    }

    public async Task RemoveUserClaimsAsync(Guid userId)
    {
        var cacheKey = $"claims:{userId}";
        await RemoveAsync(cacheKey);
    }

    public async Task SetUserAclAsync(Guid userId, string resourceType, string resourceId, int mask, TimeSpan? expiry = null)
    {
        var cacheKey = $"acl:{userId}:{resourceType}:{resourceId}";
        await SetAsync(cacheKey, mask, expiry ?? TimeSpan.FromHours(24));
    }

    public async Task<int> GetUserAclMaskAsync(Guid userId, string resourceType, string resourceId)
    {
        var cacheKey = $"acl:{userId}:{resourceType}:{resourceId}";
        return await GetAsync<int>(cacheKey);
    }

    public async Task SaveAuthCodeAsync(string code, object data, TimeSpan? expiry = null)
    {
        var cacheKey = $"auth_code:{code}";
        await SetAsync(cacheKey, data, expiry ?? TimeSpan.FromMinutes(5));
    }

    public async Task<T?> GetAuthCodeAsync<T>(string code)
    {
        var cacheKey = $"auth_code:{code}";
        return await GetAsync<T>(cacheKey);
    }

    public async Task RemoveAuthCodeAsync(string code)
    {
        var cacheKey = $"auth_code:{code}";
        await RemoveAsync(cacheKey);
    }
}
