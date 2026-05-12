using Core.Infra.Redis.Services;
using Microsoft.Extensions.Logging;

namespace Core.Web.Api.Services;

public class AppRedisService : RedisService
{
    public AppRedisService(string connectionString, ILogger<AppRedisService> logger) 
        : base(connectionString, logger)
    {
    }
}
