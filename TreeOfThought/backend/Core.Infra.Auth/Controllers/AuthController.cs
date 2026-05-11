using Core.Infra.Auth.Attributes;
using Core.Infra.Auth.Models;
using Core.Infra.Auth.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Core.Infra.Auth.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService, Microsoft.Extensions.Configuration.IConfiguration config)
    {
        _authService = authService;
        _config = config;
    }

    private readonly Microsoft.Extensions.Configuration.IConfiguration _config;

    [HttpGet("/.well-known/openid-configuration")]
    public IActionResult GetDiscoveryDocument()
    {
        var baseUrl = $"{Request.Scheme}://{Request.Host}{Request.PathBase}";
        return Ok(new
        {
            issuer = _config["Jwt:Issuer"],
            jwks_uri = $"{baseUrl}/api/auth/jwks",
            authorization_endpoint = $"{baseUrl}/api/auth/authorize",
            token_endpoint = $"{baseUrl}/api/auth/login", // Map to existing login for now
            userinfo_endpoint = $"{baseUrl}/api/auth/me",
            response_types_supported = new[] { "code", "token", "id_token" },
            subject_types_supported = new[] { "public" },
            id_token_signing_alg_values_supported = new[] { "HS256" }
        });
    }

    [HttpGet("jwks")]
    public IActionResult GetJwks()
    {
        return Ok(new { keys = new object[] { } });
    }

    [HttpPost("init")]
    public async Task<IActionResult> Initialize()
    {
        await _authService.InitializeAsync();
        return Ok(new { message = "Auth system initialized and admin seeded" });
    }

    [HttpGet("me")]
    [AppAuthorize]
    public async Task<IActionResult> GetMe()
    {
        var userIdStr = User.FindFirst("userId")?.Value;
        if (string.IsNullOrEmpty(userIdStr) || !Guid.TryParse(userIdStr, out var userId))
            return Unauthorized();

        var user = await _authService.GetUserByIdAsync(userId);
        if (user == null) return NotFound();

        var roles = User.FindAll(ClaimTypes.Role).Select(c => c.Value).ToList();
        var permissions = User.FindAll("permissions").Select(c => c.Value).ToList();

        return Ok(new { 
            user.Username, 
            user.DisplayName, 
            user.Email,
            Roles = roles,
            Permissions = permissions
        });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        try
        {
            var user = await _authService.AuthenticateAsync(request.Username, request.Password);
            if (user == null) return Unauthorized(new { message = "Invalid credentials" });

            var token = await _authService.GenerateJwtToken(user);
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
    public async Task<IActionResult> Signup([FromBody] SignupRequest request)
    {
        try
        {
            var user = await _authService.SignupAsync(request.Username, request.Password, request.DisplayName, request.Email);
            return Ok(new { message = "Signup successful. Please verify your email.", email = user.Email });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("verify")]
    public async Task<IActionResult> Verify([FromQuery] string email, [FromQuery] string code)
    {
        if (await _authService.VerifyEmailAsync(email, code))
            return Ok(new { message = "Email verified successfully. You can now login." });
        return BadRequest(new { message = "Invalid verification code" });
    }

    [HttpPost("sso")]
    public async Task<IActionResult> SsoLogin([FromBody] SsoRequest request)
    {
        var user = await _authService.SsoLoginAsync(request.Provider, request.SsoId, request.Email, request.DisplayName, request.IdToken);
        
        var token = await _authService.GenerateJwtToken(user);
        var firebaseToken = await _authService.GenerateFirebaseToken(user);

        return Ok(new { 
            token, 
            firebaseToken,
            user = new { user.Username, user.DisplayName, user.Email } 
        });
    }

    [HttpPost("permissions/sync")]
    public async Task<IActionResult> SyncPermissions([FromBody] SyncPermissionsRequest request)
    {
        await _authService.SyncPermissionsAsync(request.Version, request.Permissions);
        return Ok(new { message = "Permissions synced successfully" });
    }
}

