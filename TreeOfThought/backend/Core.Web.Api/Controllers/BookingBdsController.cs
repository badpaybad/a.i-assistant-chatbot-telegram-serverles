using Core.Infra.Base.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Module.BookingBds.Commands;
using Module.BookingBds.Models;
using Module.BookingBds.Services;

namespace Core.Web.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class BookingBdsController : ControllerBase
{
    private readonly IDispatcher _dispatcher;
    private readonly BookingQueryService _queryService;

    public BookingBdsController(IDispatcher dispatcher, BookingQueryService queryService)
    {
        _dispatcher = dispatcher;
        _queryService = queryService;
    }

    [HttpGet("projects")]
    public async Task<IActionResult> GetProjects()
    {
        var projects = await _queryService.GetProjectsAsync();
        return Ok(projects);
    }

    [HttpGet("projects/{projectId}/apartments")]
    public async Task<IActionResult> GetApartments(Guid projectId)
    {
        var apartments = await _queryService.GetApartmentsByProjectAsync(projectId);
        return Ok(apartments);
    }

    [HttpPost("booking")]
    public async Task<IActionResult> CreateBooking([FromBody] CreateBookingCommand command)
    {
        // Gán CustomerId từ JWT claim
        var userIdStr = User.FindFirst("userId")?.Value;
        if (Guid.TryParse(userIdStr, out var userId))
        {
            command.CustomerId = userId;
        }
        
        // Gửi command vào queue (Async)
        await _dispatcher.SendAsync(command);
        
        return Accepted(new { TrackingId = command.TrackingId });
    }

    [HttpPost("payment")]
    public async Task<IActionResult> ConfirmPayment([FromBody] ConfirmPaymentRequest request)
    {
        var command = new ConfirmPaymentCommand
        {
            BookingId = request.BookingId,
            TransactionId = request.TransactionId,
            AmountPaid = request.AmountPaid
        };
        await _dispatcher.SendAsync(command);
        return Ok(new { trackingId = command.TrackingId });
    }

    [HttpGet("my-bookings")]
    public async Task<IActionResult> GetMyBookings()
    {
        var userIdStr = User.FindFirst("userId")?.Value;
        if (string.IsNullOrEmpty(userIdStr) || !Guid.TryParse(userIdStr, out var userId))
        {
            return Unauthorized();
        }

        var bookings = await _queryService.GetBookingsByCustomerAsync(userId);
        return Ok(bookings);
    }

    [HttpPost("projects")]
    public async Task<IActionResult> CreateProject([FromBody] CreateProjectCommand command)
    {
        await _dispatcher.SendAsync(command);
        return Ok(new { trackingId = command.TrackingId });
    }

    [HttpPost("apartments")]
    public async Task<IActionResult> CreateApartment([FromBody] CreateApartmentCommand command)
    {
        await _dispatcher.SendAsync(command);
        return Ok(new { trackingId = command.TrackingId });
    }
}

public class CreateBookingRequest
{
    public Guid ApartmentId { get; set; }
    public decimal DepositAmount { get; set; }
    public string RequestId { get; set; } = null!;
}

public class ConfirmPaymentRequest
{
    public Guid BookingId { get; set; }
    public string TransactionId { get; set; } = null!;
    public decimal AmountPaid { get; set; }
}
