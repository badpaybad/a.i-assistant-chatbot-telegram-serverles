using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.Infra.Session.Interfaces;

public interface IUserSessionService
{
    Task SetUserClaimsAsync(Guid userId, List<string> claims, TimeSpan? expiry = null);
    Task<List<string>?> GetUserClaimsAsync(Guid userId);
    Task RemoveUserClaimsAsync(Guid userId);
    
    Task SetUserAclAsync(Guid userId, string resourceType, string resourceId, int mask, TimeSpan? expiry = null);
    Task<int> GetUserAclMaskAsync(Guid userId, string resourceType, string resourceId);
    
    Task SaveAuthCodeAsync(string code, object data, TimeSpan? expiry = null);
    Task<T?> GetAuthCodeAsync<T>(string code);
    Task RemoveAuthCodeAsync(string code);
}
