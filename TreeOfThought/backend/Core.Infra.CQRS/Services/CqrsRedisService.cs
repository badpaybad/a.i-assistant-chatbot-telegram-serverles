using Core.Infra.Redis.Services;
using Microsoft.Extensions.Logging;

namespace Core.Infra.CQRS.Services;

public class CqrsRedisService : RedisService
{
    public CqrsRedisService(string connectionString, ILogger<CqrsRedisService> logger) 
        : base(connectionString, logger)
    {
    }
}
