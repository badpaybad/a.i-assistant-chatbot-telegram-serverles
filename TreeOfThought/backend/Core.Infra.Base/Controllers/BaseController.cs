using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Core.Infra.Base.Controllers;

public abstract class BaseController : ControllerBase
{
    protected Guid GetUserId()
    {
        var userIdStr = User.FindFirst("userId")?.Value ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdStr) || !Guid.TryParse(userIdStr, out var userId))
            throw new UnauthorizedAccessException("User ID not found in claims");
        return userId;
    }

    protected Guid GetTrackingId()
    {
        if (Request.Headers.TryGetValue("X-Tracking-Id", out var trackingIdStr) && Guid.TryParse(trackingIdStr, out var trackingId))
        {
            return trackingId;
        }
        return Guid.NewGuid();
    }
}
