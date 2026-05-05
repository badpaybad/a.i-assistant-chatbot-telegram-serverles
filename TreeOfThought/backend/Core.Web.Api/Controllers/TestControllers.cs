using Core.Infra.Base.Interfaces;
using Core.Infra.Firebase.Services;
using Core.Web.Api.Attributes;
using Core.Web.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace Core.Web.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[AppAuthorize] // Require login for all test endpoints
public class FirebaseTestController : ControllerBase
{
    private readonly FirebaseService _firebase;

    public FirebaseTestController(FirebaseService firebase)
    {
        _firebase = firebase;
    }

    [HttpPost("notify")]
    public async Task<IActionResult> SendNotification([FromQuery] string path, [FromBody] object data)
    {
        await _firebase.PublishToAddressPathAsync("Default", path, data);
        return Ok(new { message = "Notification sent" });
    }

    [HttpGet("signed-url")]
    public IActionResult GetSignedUrl([FromQuery] string bucket, [FromQuery] string objectName)
    {
        var url = _firebase.GetSignedUrl("Default", bucket, objectName, TimeSpan.FromHours(1));
        return Ok(new { url });
    }
}

[ApiController]
[Route("api/[controller]")]
[AppAuthorize("cqrs-test")]
public class CqrsTestController : ControllerBase
{
    private readonly IDispatcher _dispatcher;

    public CqrsTestController(IDispatcher dispatcher)
    {
        _dispatcher = dispatcher;
    }

    [HttpPost("sample-command")]
    public async Task<IActionResult> EnqueueSampleCommand([FromBody] string payload)
    {
        var command = new SampleCommand { Payload = payload };
        await _dispatcher.SendAsync(command);
        return Ok(new { message = "Sample command enqueued", trackingId = command.TrackingId });
    }

    [HttpPost("sample-event")]
    public async Task<IActionResult> PublishSampleEvent([FromBody] string data)
    {
        var @event = new SampleEvent { Data = data };
        await _dispatcher.PublishAsync(@event);
        return Ok(new { message = "Sample event published", trackingId = @event.TrackingId });
    }

    [HttpGet("stats")]
    [AppAuthorize("admin")] // Only admin can see stats
    public async Task<IActionResult> GetStats()
    {
        var stats = await _dispatcher.GetStatisticsAsync();
        return Ok(stats);
    }

    [HttpGet("workers")]
    [AppAuthorize("admin")]
    public IActionResult GetWorkers()
    {
        return Ok(_dispatcher.GetWorkerStatus());
    }
}
