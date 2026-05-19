using Core.Infra.Auth.Attributes;
using Core.Infra.Auth.Models;
using Core.Infra.Session.Models;
using Core.Infra.Session.Interfaces;
using Core.Infra.Oidc.Models;
using Core.Infra.Oidc.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.Extensions.DependencyInjection;
using Core.Infra.Base.Interfaces;
using Core.Infra.Oidc.Extensions;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication.Cookies;
using Core.Infra.Auth.Services;
using Core.Infra.Auth.Interfaces;
using System.Net;
using Microsoft.Extensions.Configuration;

namespace Core.Infra.Oidc.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;
    private readonly IUserSessionService _sessionService;
    private readonly Microsoft.Extensions.Configuration.IConfiguration _config;
    private readonly IJwtService _jwtService;
    public AuthController(
        IJwtService jwtService,
        AuthService authService,
        IUserSessionService sessionService,
        Microsoft.Extensions.Configuration.IConfiguration config)
    {
        _jwtService = jwtService;
        _authService = authService;
        _sessionService = sessionService;
        _config = config;
    }

    [HttpGet("/.well-known/openid-configuration")]
    public IActionResult GetDiscoveryDocument()
    {
        var issuer = _config["Auth:Jwt:Issuer"]?.TrimEnd('/');
        var baseUrl = string.IsNullOrEmpty(issuer)
            ? $"{Request.Scheme}://{Request.Host}{Request.PathBase}"
            : issuer;

        var config = new
        {
            issuer = issuer ?? $"{Request.Scheme}://{Request.Host}{Request.PathBase}",
            jwks_uri = $"{baseUrl}/.well-known/openid-configuration/jwks",
            authorization_endpoint = $"{baseUrl}/connect/authorize",
            token_endpoint = $"{baseUrl}/connect/token",
            userinfo_endpoint = $"{baseUrl}/connect/userinfo",
            end_session_endpoint = $"{baseUrl}/connect/endsession",
            response_types_supported = new[] { "code", "token", "id_token" },
            subject_types_supported = new[] { "public" },
            id_token_signing_alg_values_supported = new[] { "RS256" },
            scopes_supported = new[] { "openid", "profile", "email", "roles", "offline_access" },
            claims_supported = new[] { "sub", "name", "preferred_username", "email", "picture", "role", "claims" },
            token_endpoint_auth_methods_supported = new[] { "client_secret_post", "client_secret_basic" },
            code_challenge_methods_supported = new[] { "S256", "plain" }
        };

        var json = System.Text.Json.JsonSerializer.Serialize(config, new System.Text.Json.JsonSerializerOptions
        {
            WriteIndented = true
        });

        return Content(json, "application/json");
    }
    [Obsolete("Phòng ngừa việc client gọi trực tiếp JWKS tại /.well-known/openid-configuration/jwks, Client hãy gọi theo trả ra ở uri /.well-known/openid-configuration")]
    [HttpGet("/.well-known/openid-configuration/jwks")]
    public IActionResult Get_well_known_Jwks()
    {
        var jwk = _jwtService.GetJwks();
        return Ok(new { keys = new[] { jwk } });
    }
    [HttpGet("jwks")]
    public IActionResult GetJwks()
    {
        var jwk = _jwtService.GetJwks();
        return Ok(new { keys = new[] { jwk } });
    }

    [HttpGet("me")]
    [HttpGet("/connect/userinfo")]
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
            var cachedClaims = await _sessionService.GetUserClaimsAsync(userId);
            if (cachedClaims != null) claims = cachedClaims;
        }

        return Ok(new
        {
            sub = user.Id.ToString(),
            preferred_username = user.Username,
            name = user.DisplayName,
            email = user.Email,
            email_verified = user.IsEmailVerified,
            picture = user.AvatarUrl,
            roles = roles,
            claims = claims,
            permissions = claims // Keep for backward compatibility if any
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

            Console.WriteLine("[AUTH] Creating SSO Session Cookie...");
            await CreateSsoSessionCookie(user);
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

    private async Task CreateSsoSessionCookie(Core.Infra.Oidc.Models.User user)
    {
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
    }

    [HttpGet("authorize")]
    [HttpGet("/connect/authorize")]
    public async Task<IActionResult> Authorize([Microsoft.AspNetCore.Mvc.FromQuery] AuthorizeRequest request)
    {
        // Manual fallback if binding fails (common with complex models and different binder behaviors)
        var clientId = request.ClientId ?? Request.Query["client_id"].ToString();
        var redirectUri = request.RedirectUri ?? Request.Query["redirect_uri"].ToString();
        var state = request.State ?? Request.Query["state"].ToString();
        var nonce = request.Nonce ?? Request.Query["nonce"].ToString();

        if (string.IsNullOrEmpty(clientId) || string.IsNullOrEmpty(redirectUri))
        {
            Console.WriteLine($"[OIDC] Invalid Authorize request (Binding failed?): ClientId={clientId}, RedirectUri={redirectUri}");
            Console.WriteLine($"[OIDC] Raw Query: {Request.QueryString}");
            return BadRequest(new { error = "invalid_request", error_description = "client_id and redirect_uri are required." });
        }

        var requireNonce = _config.GetValue<bool>("Oidc:RequireNonce");
        if (requireNonce && string.IsNullOrEmpty(nonce))
        {
            Console.WriteLine($"[OIDC] Rejecting Authorize request: nonce is required under Oidc:RequireNonce = true configuration.");
            return BadRequest(new { error = "invalid_request", error_description = "nonce is required." });
        }

        var cookies = Request.Cookies.Keys;
        Console.WriteLine($"[OIDC] Authorize request: ClientId={clientId}, RedirectUri={redirectUri}, State={state}, Nonce={nonce}");
        Console.WriteLine($"[OIDC] Cookies received: {string.Join(", ", cookies)}");

        // Update request model to ensure following logic uses corrected values
        request.ClientId = clientId;
        request.RedirectUri = redirectUri;
        request.State = state;
        request.Nonce = nonce;

        // 1. Check if user is already logged in via Session Cookie
        var authenticateResult = await HttpContext.AuthenticateAsync(AuthConstants.SsoSessionScheme);
        if (authenticateResult.Succeeded && authenticateResult.Principal != null)
        {
            var userIdStr = authenticateResult.Principal.FindFirst(AuthConstants.UserIdClaim)?.Value;
            if (Guid.TryParse(userIdStr, out var userId))
            {
                Console.WriteLine($"[OIDC] User {userId} already logged in via SSO Session. Generating code...");
                // Already logged in -> Generate code and redirect back to app
                var code = await _authService.GenerateAuthorizationCodeAsync(userId, request.ClientId, request.RedirectUri, request.Nonce, request.CodeChallenge, request.CodeChallengeMethod, request.Scope);
                var redirectUrl = $"{request.RedirectUri}{(request.RedirectUri.Contains("?") ? "&" : "?")}code={code}&state={request.State}";

                Console.WriteLine($"[OIDC] Redirecting back to client. RedirectUri: {request.RedirectUri}");
                Console.WriteLine($"[OIDC] Final Redirect URL: {redirectUrl}");
                return Redirect(redirectUrl);
            }
        }

        Console.WriteLine("[OIDC] User not logged in or session expired. Redirecting to Login UI...");

        // 2. If not logged in, redirect to SPA Login UI
        var loginUrl = _config["Oidc:OidcLoginUiUrl"]!;
        // Use relative path for returnUrl so the frontend can resolve it using window.location.origin
        var returnUrl = Request.Path + Request.QueryString;

        // Ensure we use the actual host the user is using to avoid 0.0.0.0 issues
        var host = Request.Host.Value;
        var scheme = Request.Scheme;
        var absoluteLoginUrl = loginUrl.StartsWith("http")
            ? loginUrl
            : $"{scheme}://{host}{Request.PathBase}{loginUrl}";

        var finalRedirect = $"{absoluteLoginUrl}?returnUrl={WebUtility.UrlEncode(returnUrl)}";
        Console.WriteLine($"[OIDC] Redirecting to: {finalRedirect}");

        return Redirect(finalRedirect);
    }

    [HttpGet("logout")]
    [HttpGet("/connect/endsession")]
    public async Task<IActionResult> Logout([FromQuery(Name = "post_logout_redirect_uri")] string? postLogoutRedirectUri)
    {
        Console.WriteLine($"[OIDC] Logout request received. PostLogoutRedirectUri={postLogoutRedirectUri}");
        await HttpContext.SignOutAsync(AuthConstants.SsoSessionScheme);

        if (!string.IsNullOrEmpty(postLogoutRedirectUri))
        {
            Console.WriteLine($"[OIDC] Redirecting back to: {postLogoutRedirectUri}");
            return Redirect(postLogoutRedirectUri);
        }

        return Ok(new { message = "Logged out successfully" });
    }

    [HttpPost("token")]
    [HttpPost("/connect/token")]
    public async Task<IActionResult> GetToken()
    {
        TokenRequest? request = null;

        if (Request.HasFormContentType)
        {
            request = new TokenRequest
            {
                GrantType = Request.Form["grant_type"],
                Code = Request.Form["code"],
                ClientId = Request.Form["client_id"],
                RedirectUri = Request.Form["redirect_uri"],
                ClientSecret = Request.Form["client_secret"],
                CodeVerifier = Request.Form["code_verifier"]
            };
            Console.WriteLine("[OIDC] Token request received via Form.");
        }
        else
        {
            try
            {
                request = await Request.ReadFromJsonAsync<TokenRequest>();
                Console.WriteLine("[OIDC] Token request received via JSON.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[OIDC] Failed to read token request as JSON: {ex.Message}");
            }
        }

        if (request == null || string.IsNullOrEmpty(request.Code))
        {
            Console.WriteLine($"[OIDC] Token request failed: request is null or code is missing. Raw ContentType: {Request.ContentType}");
            return BadRequest(new { error = "invalid_request", error_description = "Code is required" });
        }

        Console.WriteLine($"[OIDC] Token request details: GrantType={request.GrantType}, ClientId={request.ClientId}, Code={request.Code.Substring(0, Math.Min(4, request.Code.Length))}...");

        var (user, nonce) = await _authService.ExchangeCodeForTokenAsync(request.Code, request.ClientId ?? "", request.CodeVerifier);
        if (user == null)
        {
            Console.WriteLine($"[OIDC] Token request failed: Invalid code or ClientId. Code: {request.Code}, ClientId: {request.ClientId}");
            return BadRequest(new { error = "invalid_grant" });
        }

        Console.WriteLine($"[OIDC] Code exchanged successfully for user: {user.Username}. Generating separate tokens with nonce: {nonce}...");
        var defaultAudience = _config["Auth:Jwt:Audience"] ?? "TreeOfThought.FE";
        var accessToken = await _authService.GenerateJwtToken(user, defaultAudience, null);
        var idToken = await _authService.GenerateJwtToken(user, request.ClientId ?? defaultAudience, nonce);

        Console.WriteLine($"[OIDC DEBUG] Generated accessToken len: {accessToken?.Length}, idToken len: {idToken?.Length}");
        Console.WriteLine("[OIDC] Separate tokens (access_token & id_token) generated and returned to client.");
        
        var tokenResponse = new
        {
            access_token = accessToken,
            token_type = "Bearer",
            expires_in = 3600,
            id_token = idToken
        };
        var json = System.Text.Json.JsonSerializer.Serialize(tokenResponse);
        Console.WriteLine($"[OIDC DEBUG] Returning JSON: {json.Substring(0, Math.Min(json.Length, 100))}...");
        return Content(json, "application/json");
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

        // Create SSO Session (Cookie) for OIDC flow
        await CreateSsoSessionCookie(user);

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
