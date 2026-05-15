using Core.Infra.Firebase.Services;
using Core.Infra.Oidc.Attributes;
using Microsoft.AspNetCore.Mvc;

namespace Core.Web.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[AppAuthorize] // Require login for all test endpoints
public class FirebaseTestController : ControllerBase
{
    private readonly FirebaseService _firebase;
    private readonly IConfiguration _config;

    public FirebaseTestController(FirebaseService firebase, IConfiguration config)
    {
        _firebase = firebase;
        _config = config;
    }

    [HttpPost("notify")]
    public async Task<IActionResult> SendNotification([FromQuery] string path, [FromBody] object data)
    {
        await _firebase.PublishToAddressPathAsync("Default", path, data);
        return Ok(new { message = "Notification sent" });
    }

    [HttpPost("push")]
    public async Task<IActionResult> PushNotification([FromQuery] string token, [FromQuery] string title, [FromQuery] string body)
    {
        await _firebase.SendNotificationAsync("Default", token, title, body);
        return Ok(new { message = "Push notification sent" });
    }

    [HttpGet("signed-url")]
    public IActionResult GetSignedUrl([FromQuery] string bucket, [FromQuery] string objectName)
    {
        var url = _firebase.GetSignedUrl("Default", bucket, objectName, TimeSpan.FromHours(1));
        return Ok(new { url });
    }

    [HttpPost("upload")]
    public async Task<IActionResult> UploadFile(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No file uploaded");

        var bucket = _config["Firebase:StorageBucket"] ?? throw new Exception("Firebase:StorageBucket not configured");
        var fileName = $"{Guid.NewGuid()}_{file.FileName}";
        
        using var stream = file.OpenReadStream();
        var url = await _firebase.UploadFileAsync("Default", bucket, fileName, stream, file.ContentType);

        return Ok(new { url, fileName });
    }
}
