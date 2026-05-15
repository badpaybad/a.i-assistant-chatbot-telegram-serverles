using Core.Infra.Auth.Attributes;
using Core.Infra.Auth.Models;
using Core.Infra.Auth.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.Extensions.DependencyInjection;
using Core.Infra.Base.Interfaces;
using Core.Infra.Auth.Extensions;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace Core.Infra.Auth.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;
    private readonly AuthRedisService _cacheService;
    private readonly Microsoft.Extensions.Configuration.IConfiguration _config;

    public AuthController(
        AuthService authService,
        AuthRedisService cacheService,
        Microsoft.Extensions.Configuration.IConfiguration config)
    {
        _authService = authService;
        _cacheService = cacheService;
        _config = config;
    }

    [HttpGet("/.well-known/openid-configuration")]
    public IActionResult GetDiscoveryDocument()
    {
        var baseUrl = $"{Request.Scheme}://{Request.Host}{Request.PathBase}";
        return Ok(new
        {
            issuer = _config["Jwt:Issuer"],
            jwks_uri = $"{baseUrl}/api/auth/jwks",
            authorization_endpoint = $"{baseUrl}/api/auth/authorize",
            token_endpoint = $"{baseUrl}/api/auth/token",
            userinfo_endpoint = $"{baseUrl}/api/auth/me",
            response_types_supported = new[] { "code", "token", "id_token" },
            subject_types_supported = new[] { "public" },
            id_token_signing_alg_values_supported = new[] { "RS256" }
        });
    }

    [HttpGet("jwks")]
    public IActionResult GetJwks()
    {
        var jwk = AuthServiceExtensions.GetJwks(_config.GetRsaPrivateKey(), _config["Jwt:Kid"] ?? "tot-v1");
        return Ok(new { keys = new[] { jwk } });
    }

    // [HttpPost("init")]
    // public async Task<IActionResult> Initialize()
    // {
    //     await _authService.InitializeAsync();
    //     return Ok(new { message = "Auth system initialized and admin seeded" });
    // }

    [HttpGet("me")]
    [AppAuthorize]
    public async Task<IActionResult> GetMe()
    {
        var userIdStr = User.FindFirst(AuthConstants.UserIdClaim)?.Value;
        if (string.IsNullOrEmpty(userIdStr) || !Guid.TryParse(userIdStr, out var userId))
            return Unauthorized();

        var user = await _authService.GetUserByIdAsync(userId);
        if (user == null) return NotFound();

        // 1. Try reading from JWT first (Stateless Mode)
        var roles = User.FindAll(AuthConstants.RoleClaim).Select(c => c.Value).ToList();
        var claims = User.FindAll(AuthConstants.PermissionClaim).Select(c => c.Value).ToList();

        // 2. If none in JWT, check Redis (Hybrid Mode)
        if (!claims.Any())
        {
            var cacheKey = $"claims:{userId}";
            var cachedClaims = await _cacheService.GetAsync<List<string>>(cacheKey);
            if (cachedClaims != null) claims = cachedClaims;
        }

        return Ok(new
        {
            user.Username,
            user.DisplayName,
            user.Email,
            Roles = roles,
            Claims = claims
        });
    }


    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        Console.WriteLine($"[AUTH] Login attempt for user: {request.Username}");
        try
        {
            var user = await _authService.AuthenticateAsync(request.Username, request.Password);
            if (user == null)
            {
                Console.WriteLine($"[AUTH] Authentication failed for user: {request.Username}");
                return Unauthorized(new { message = "Invalid credentials" });
            }

            Console.WriteLine($"[AUTH] Authentication successful for user: {user.Username} (ID: {user.Id})");

            // 1. Create SSO Session (Cookie)
            Console.WriteLine("[AUTH] Creating SSO Session Cookie...");
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(AuthConstants.UserIdClaim, user.Id.ToString())
            };
            var identity = new ClaimsIdentity(claims, AuthConstants.SsoSessionScheme);
            var principal = new ClaimsPrincipal(identity);
            await HttpContext.SignInAsync(AuthConstants.SsoSessionScheme, principal, new AuthenticationProperties
            {
                IsPersistent = true,
                ExpiresUtc = DateTimeOffset.UtcNow.AddDays(7)
            });
            Console.WriteLine("[AUTH] SSO Session Cookie created.");

            Console.WriteLine("[AUTH] Generating JWT Token...");
            var token = await _authService.GenerateJwtToken(user);
            
            Console.WriteLine("[AUTH] Generating Firebase Token...");
            var firebaseToken = await _authService.GenerateFirebaseToken(user);

            Console.WriteLine($"[AUTH] Login completed for {user.Username}. Returning tokens.");

            return Ok(new
            {
                token,
                firebaseToken,
                mustChangePassword = user.MustChangePassword,
                user = new { user.Username, user.DisplayName, user.Email }
            });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[AUTH] Error during login for {request.Username}: {ex.Message}");
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("authorize")]
    public async Task<IActionResult> Authorize([FromQuery] AuthorizeRequest request)
    {
        if (string.IsNullOrEmpty(request.ClientId) || string.IsNullOrEmpty(request.RedirectUri))
        {
            Console.WriteLine($"[OIDC] Invalid Authorize request: ClientId={request.ClientId}, RedirectUri={request.RedirectUri}");
            return BadRequest(new { error = "invalid_request", error_description = "client_id and redirect_uri are required." });
        }

        var cookies = Request.Cookies.Keys;
        Console.WriteLine($"[OIDC] Authorize request: ClientId={request.ClientId}, RedirectUri={request.RedirectUri}, State={request.State}");
        Console.WriteLine($"[OIDC] Cookies received: {string.Join(", ", cookies)}");

        // 1. Check if user is already logged in via Session Cookie
        var authenticateResult = await HttpContext.AuthenticateAsync(AuthConstants.SsoSessionScheme);
        if (authenticateResult.Succeeded && authenticateResult.Principal != null)
        {
            var userIdStr = authenticateResult.Principal.FindFirst(AuthConstants.UserIdClaim)?.Value;
            if (Guid.TryParse(userIdStr, out var userId))
            {
                Console.WriteLine($"[OIDC] User {userId} already logged in via SSO Session. Generating code...");
                // Already logged in -> Generate code and redirect back to app
                var code = await _authService.GenerateAuthorizationCodeAsync(userId, request.ClientId, request.RedirectUri);
                var redirectUrl = $"{request.RedirectUri}{(request.RedirectUri.Contains("?") ? "&" : "?")}code={code}&state={request.State}";
                
                Console.WriteLine($"[OIDC] Redirecting back to client. RedirectUri: {request.RedirectUri}");
                Console.WriteLine($"[OIDC] Final Redirect URL: {redirectUrl}");
                return Redirect(redirectUrl);
            }
        }

        Console.WriteLine("[OIDC] User not logged in or session expired. Redirecting to Login UI...");

        // 2. If not logged in, redirect to SPA Login UI
        var loginUrl = _config["Auth:OidcLoginUiUrl"] ?? "/login";
        var returnUrl = Request.Scheme + "://" + Request.Host + Request.Path + Request.QueryString;

        // Đảm bảo URL chuyển hướng là tuyệt đối và sử dụng chính Host mà client đang truy cập
        // (Điều này quan trọng vì máy ảo dùng 10.0.2.2 còn desktop dùng localhost hoặc IP LAN)
        var host = Request.Host.Value;
        var scheme = Request.Scheme;
        var absoluteLoginUrl = loginUrl.StartsWith("http") 
            ? loginUrl 
            : $"{scheme}://{host}{Request.PathBase}{loginUrl}";

        var finalRedirect = $"{absoluteLoginUrl}?returnUrl={Uri.EscapeDataString(returnUrl)}";
        Console.WriteLine($"[OIDC] Redirecting to: {finalRedirect}");
        
        return Redirect(finalRedirect);
    }

    [HttpPost("token")]
    [Consumes("application/x-www-form-urlencoded", "application/json")]
    public async Task<IActionResult> GetToken([FromForm] TokenRequest? formRequest, [FromBody] TokenRequest? bodyRequest)
    {
        var request = formRequest?.Code != null ? formRequest : bodyRequest;
        Console.WriteLine($"[OIDC] Token request received. GrantType={request?.GrantType}, ClientId={request?.ClientId}");

        if (request == null || string.IsNullOrEmpty(request.Code))
        {
            Console.WriteLine("[OIDC] Token request failed: Code is missing.");
            return BadRequest(new { error = "invalid_request", error_description = "Code is required" });
        }

        var user = await _authService.ExchangeCodeForTokenAsync(request.Code, request.ClientId ?? "");
        if (user == null)
        {
            Console.WriteLine("[OIDC] Token request failed: Invalid code or ClientId.");
            return BadRequest(new { error = "invalid_grant" });
        }

        Console.WriteLine($"[OIDC] Code exchanged successfully for user: {user.Username}. Generating tokens...");
        var token = await _authService.GenerateJwtToken(user);

        Console.WriteLine("[OIDC] Tokens generated and returned to client.");
        return Ok(new
        {
            access_token = token,
            token_type = "Bearer",
            expires_in = 3600,
            id_token = token
        });
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

        return Ok(new
        {
            token,
            firebaseToken,
            user = new { user.Username, user.DisplayName, user.Email }
        });
    }

    [HttpPost("claims/sync")]
    [AppAuthorize]
    public async Task<IActionResult> SyncClaims([FromBody] SyncClaimsRequest request)
    {
        await _authService.SyncClaimsAsync(request.Version, request.Claims);
        return Ok(new { message = "Claims synced successfully" });
    }

    [HttpPost("change-password")]
    [AppAuthorize]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
    {
        var userIdStr = User.FindFirst(AuthConstants.UserIdClaim)?.Value;
        if (string.IsNullOrEmpty(userIdStr) || !Guid.TryParse(userIdStr, out var userId))
            return Unauthorized();

        if (await _authService.ChangePasswordAsync(userId, request.OldPassword, request.NewPassword))
        {
            return Ok(new { message = "Password changed successfully" });
        }
        return BadRequest(new { message = "Invalid current password" });
    }
}

