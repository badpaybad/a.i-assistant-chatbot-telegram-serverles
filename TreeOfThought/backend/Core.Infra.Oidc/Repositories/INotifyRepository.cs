using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Infra.Oidc.Models;

namespace Core.Infra.Oidc.Repositories;

public interface INotifyRepository
{
    Task EnsureTablesCreatedAsync();
    Task SaveTokenAsync(Guid userId, string fcmToken, string? deviceId, string? appType);
    Task<List<user_fcm_tokens_entity>> GetTokensByUserIdAsync(Guid userId);
    Task DeleteTokenAsync(Guid id);
}
