using Core.Infra.Base.Interfaces;
using Core.Infra.Oidc.Attributes;
using Core.Infra.Oidc.Models;
using Core.Web.Api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Core.Web.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[AppAuthorize("be.cqrs-test")]
public class CqrsTestController : ControllerBase
{
    private readonly IDispatcher _dispatcher;

    public CqrsTestController(IDispatcher dispatcher)
    {
        _dispatcher = dispatcher;
    }

    [HttpPost("sample-command")]
    public async Task<IActionResult> EnqueueSampleCommand([FromBody] JsonElement payload)
    {
        var command = new SampleCommand { Payload = payload.GetRawText() };
        await _dispatcher.SendAsync(command);
        return Ok(new { message = "Sample command enqueued", trackingId = command.TrackingId });
    }

    [HttpPost("sample-event")]
    public async Task<IActionResult> PublishSampleEvent([FromBody] JsonElement data)
    {
        var @event = new SampleEvent { Payload = data.GetRawText() };
        await _dispatcher.PublishAsync(@event);
        return Ok(new { message = "Sample event published", trackingId = @event.TrackingId });
    }

    [HttpGet("stats")]
    [AppAuthorize(AuthConstants.AdminClaim)] // Only admin can see stats
    public async Task<IActionResult> GetStats()
    {
        var stats = await _dispatcher.GetStatisticsAsync();
        return Ok(stats);
    }

    [HttpGet("workers")]
    [AppAuthorize(AuthConstants.AdminClaim)]
    public IActionResult GetWorkers()
    {
        return Ok(_dispatcher.GetWorkerStatus());
    }
}
