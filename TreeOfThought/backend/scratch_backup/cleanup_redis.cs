using StackExchange.Redis;
using System;
using System.Linq;

var connectionString = "localhost:6379,password=Test123456,allowAdmin=true";
var redis = ConnectionMultiplexer.Connect(connectionString);
var db = redis.GetDatabase();
var server = redis.GetServer(redis.GetEndPoints()[0]);

Console.WriteLine("Cleaning up Redis data...");

// 1. Delete all keys matching patterns
var patterns = new[] { "infra:*", "sub_queue:*", "sub_proc:*", "sample.command*", "sample.event*", "topic_subs:*" };
foreach (var pattern in patterns)
{
    var keys = server.Keys(pattern: pattern).ToArray();
    if (keys.Length > 0)
    {
        Console.WriteLine($"Deleting {keys.Length} keys matching {pattern}...");
        db.KeyDelete(keys);
    }
}

Console.WriteLine("Cleanup complete.");
