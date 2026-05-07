using Core.Infra.Base.Interfaces;
using Core.Infra.Redis.Services;
using Microsoft.Extensions.Logging.Abstractions;
using StackExchange.Redis;
using System.Text.Json;

var connectionString = "localhost:6379,password=Test123456,abortConnect=false";
var redisService = new RedisService(connectionString, NullLogger<RedisService>.Instance);

string queueName = "recovery_test_queue";
string procQueue = "recovery_test_queue:processing";

// 1. Clean up
var redis = ConnectionMultiplexer.Connect(connectionString);
var db = redis.GetDatabase();
await db.KeyDeleteAsync(queueName);
await db.KeyDeleteAsync(procQueue);

// 2. Enqueue message
var msg = new { Id = Guid.NewGuid(), Data = "Test Data" };
await redisService.EnqueueAsync(queueName, msg);
Console.WriteLine("Message enqueued.");

// 3. Simulate crash: Dequeue into processing queue
var popped = await db.ListRightPopLeftPushAsync(queueName, procQueue);
Console.WriteLine($"Message moved to processing queue: {popped}");

// 4. Run recovery
await redisService.RecoverProcessingQueueAsync(queueName, procQueue);
Console.WriteLine("Recovery executed.");

// 5. Verify
var finalQueueLength = await redisService.GetQueueLengthAsync(queueName);
var finalProcLength = await db.ListLengthAsync(procQueue);

Console.WriteLine($"Main Queue Length: {finalQueueLength}");
Console.WriteLine($"Processing Queue Length: {finalProcLength}");

if (finalQueueLength == 1 && finalProcLength == 0) {
    Console.WriteLine("RECOVERY SUCCESSFUL!");
} else {
    Console.WriteLine("RECOVERY FAILED!");
}
