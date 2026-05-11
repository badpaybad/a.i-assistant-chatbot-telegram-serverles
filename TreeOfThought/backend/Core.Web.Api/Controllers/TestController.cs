using Core.Infra.Base.Interfaces;
using Core.Infra.Firebase.Services;
using Core.Web.Api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Core.Web.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TestController : ControllerBase
{
    private readonly IDispatcher _dispatcher;
    private readonly FirebaseService _firebase;
    private readonly IMessageTracker _tracker;

    public TestController(IDispatcher dispatcher, FirebaseService firebase, IMessageTracker tracker)
    {
        _dispatcher = dispatcher;
        _firebase = firebase;
        _tracker = tracker;
    }

    [HttpPost("command")]
    public async Task<IActionResult> EnqueueCommand([FromBody] TestCommandRequest request)
    {
        // For testing, we allow any command name
        // In a real app, you would validate the command name
        var commandType = AppDomain.CurrentDomain.GetAssemblies()
            .SelectMany(a => a.GetTypes())
            .FirstOrDefault(t => t.Name == request.QueueName);

        if (commandType == null)
        {
            // Fallback to dynamic if type not found, or just use a generic command
            // For this test, let's just use SampleCommand if it matches or a generic one
        }

        // Simulating work: the worker will handle this and then we expect it to notify via Firestore
        // The frontend expects the result in Firestore at 'commandresults/{requestId}'
        // We can create a generic handler or just manually publish to Firestore for this test
        
        await _tracker.TrackAsync(request.RequestId, "TestController", $"Received command {request.QueueName}");
        
        // Mocking the completion after a short delay
        _ = Task.Run(async () => {
            await Task.Delay(2000);
            await _firebase.PublishToAddressPathAsync("Default", $"commandresults/{request.RequestId}", new {
                status = "Success",
                message = "Command processed successfully (Mock)",
                data = request.Payload,
                timestamp = DateTime.UtcNow
            });
        });

        return Ok(new { message = "Command received and processing started", requestId = request.RequestId });
    }

    [HttpPost("fcm-sample")]
    public async Task<IActionResult> SendFcmSample([FromBody] FcmSampleRequest request)
    {
        await _firebase.SendNotificationAsync("Default", request.Token, request.Title, request.Body);
        return Ok(new { message = "FCM Notification sent" });
    }
}
