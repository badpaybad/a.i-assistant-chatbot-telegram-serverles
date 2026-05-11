using System.Text;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Core.Infra.Base.Interfaces;
using System.Text.Json;
using Microsoft.Extensions.Caching.Memory;

namespace Core.Web.Api.Attributes;

[AttributeUsage(AttributeTargets.Method | AttributeTargets.Class)]
public class AppCacheAttribute : Attribute, IAsyncActionFilter
{
    private readonly int _memoryExpirySeconds;
    private readonly int _redisExpirySeconds;
    private readonly string? _keyPrefix;

    public AppCacheAttribute(int memoryExpirySeconds = 5, int redisExpirySeconds = 10, string? keyPrefix = null)
    {
        _memoryExpirySeconds = memoryExpirySeconds;
        _redisExpirySeconds = redisExpirySeconds;
        _keyPrefix = keyPrefix;
    }

    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var cacheService = context.HttpContext.RequestServices.GetService<ICacheService>();
        var memoryCache = context.HttpContext.RequestServices.GetService<IMemoryCache>();
        
        var cacheKey = await GenerateCacheKey(context.HttpContext.Request, _keyPrefix);

        // 1. Check Memory Cache (L1)
        if (memoryCache != null && memoryCache.TryGetValue(cacheKey, out string? memoryResult))
        {
            if (memoryResult != null)
            {
                var result = JsonSerializer.Deserialize<object>(memoryResult);
                context.Result = new OkObjectResult(result);
                return;
            }
        }

        // 2. Check Redis Cache (L2)
        if (cacheService != null)
        {
            var redisResult = await cacheService.GetAsync<string>(cacheKey);
            if (redisResult != null)
            {
                // Save to Memory for subsequent requests
                memoryCache?.Set(cacheKey, redisResult, TimeSpan.FromSeconds(_memoryExpirySeconds));

                var result = JsonSerializer.Deserialize<object>(redisResult);
                context.Result = new OkObjectResult(result);
                return;
            }
        }

        // 3. Execute Query
        var executedContext = await next();

        if (executedContext.Result is OkObjectResult okResult)
        {
            var value = okResult.Value;
            if (value != null)
            {
                var json = JsonSerializer.Serialize(value);
                
                // Save to Memory (L1)
                memoryCache?.Set(cacheKey, json, TimeSpan.FromSeconds(_memoryExpirySeconds));
                
                // Save to Redis (L2)
                if (cacheService != null)
                {
                    await cacheService.SetAsync(cacheKey, json, TimeSpan.FromSeconds(_redisExpirySeconds));
                }
            }
        }
    }

    private async Task<string> GenerateCacheKey(HttpRequest request, string? prefix)
    {
        var keyBuilder = new StringBuilder();
        keyBuilder.Append(prefix ?? "query_cache");
        keyBuilder.Append($":{request.Path}");

        // Add Query String
        foreach (var (key, value) in request.Query.OrderBy(x => x.Key))
        {
            keyBuilder.Append($"|{key}={value}");
        }

        // Add Headers (optional, but requested context)
        // We might want to filter specific headers like 'Authorization' or custom ones
        // For now, let's include X-Context headers if any
        foreach (var (key, value) in request.Headers.Where(h => h.Key.StartsWith("X-")).OrderBy(x => x.Key))
        {
            keyBuilder.Append($"|{key}={value}");
        }

        // Add Body if it's a POST/PUT (though queries are usually GET)
        if (request.Method == "POST" || request.Method == "PUT")
        {
            request.EnableBuffering();
            using var reader = new StreamReader(request.Body, leaveOpen: true);
            var body = await reader.ReadToEndAsync();
            request.Body.Position = 0;
            
            if (!string.IsNullOrEmpty(body))
            {
                using var sha256 = SHA256.Create();
                var hash = sha256.ComputeHash(Encoding.UTF8.GetBytes(body));
                keyBuilder.Append($"|body:{Convert.ToBase64String(hash)}");
            }
        }

        return keyBuilder.ToString();
    }
}
