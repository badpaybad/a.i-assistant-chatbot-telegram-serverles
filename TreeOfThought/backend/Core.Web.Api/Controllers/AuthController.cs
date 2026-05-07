using Core.Web.Api.Attributes;
using Core.Web.Api.Models;
using Core.Web.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Core.Web.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpGet("me")]
    [AppAuthorize]
    public IActionResult GetMe()
    {
        var userIdStr = User.FindFirst("userId")?.Value;
        if (string.IsNullOrEmpty(userIdStr) || !Guid.TryParse(userIdStr, out var userId))
            return Unauthorized();

        var user = _authService.GetUserById(userId);
        if (user == null) return NotFound();

        return Ok(new { 
            user.Username, 
            user.DisplayName, 
            user.Email,
            user.Claims
        });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        try
        {
            var user = _authService.Authenticate(request.Username, request.Password);
            if (user == null) return Unauthorized(new { message = "Invalid credentials" });

            var token = _authService.GenerateJwtToken(user);
            var firebaseToken = await _authService.GenerateFirebaseToken(user);

            return Ok(new { 
                token, 
                firebaseToken,
                user = new { user.Username, user.DisplayName, user.Email } 
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("signup")]
    public IActionResult Signup([FromBody] SignupRequest request)
    {
        try
        {
            var user = _authService.Signup(request.Username, request.Password, request.DisplayName, request.Email);
            return Ok(new { message = "Signup successful. Please verify your email.", email = user.Email });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("verify")]
    public IActionResult Verify([FromQuery] string email, [FromQuery] string code)
    {
        if (_authService.VerifyEmail(email, code))
            return Ok(new { message = "Email verified successfully. You can now login." });
        return BadRequest(new { message = "Invalid verification code" });
    }

    [HttpPost("sso")]
    public async Task<IActionResult> SsoLogin([FromBody] SsoRequest request)
    {
        // In real app, verify external token here
        var user = await _authService.SsoLogin(request.Provider, request.SsoId, request.Email, request.DisplayName, request.IdToken);
        
        var token = _authService.GenerateJwtToken(user);
        var firebaseToken = await _authService.GenerateFirebaseToken(user);

        return Ok(new { 
            token, 
            firebaseToken,
            user = new { user.Username, user.DisplayName, user.Email } 
        });
    }

    [HttpPost("permissions/sync")]
    public IActionResult SyncPermissions([FromBody] SyncPermissionsRequest request)
    {
        _authService.SyncPermissions(request.Version, request.Permissions);
        return Ok(new { message = "Permissions synced successfully" });
    }

}
