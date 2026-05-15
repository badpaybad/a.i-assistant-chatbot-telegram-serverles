using Core.Infra.Redis.Services;
using Microsoft.Extensions.Logging;

namespace Core.Infra.Oidc.Services;

public class AuthRedisService : RedisService
{
    public AuthRedisService(string connectionString, ILogger<AuthRedisService> logger) 
        : base(connectionString, logger)
    {
    }
}
