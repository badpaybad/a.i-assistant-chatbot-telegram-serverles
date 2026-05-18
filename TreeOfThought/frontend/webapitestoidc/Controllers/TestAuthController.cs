using Microsoft.AspNetCore.Mvc;
using Core.Infra.Auth.Attributes;
using Core.Infra.Session.Models;
using System.Security.Claims;
using System.Net.Http;
using Microsoft.IdentityModel.Tokens;

namespace webapitestoidc.Controllers;

[ApiController]
[Route("api/test-auth")]
public class TestAuthController : ControllerBase
{
    [HttpGet("diagnostic-jwks")]
    public async Task<IActionResult> GetDiagnosticJwks()
    {
        try
        {
            using var client = new HttpClient();
            var json = await client.GetStringAsync("http://localhost:5000/api/auth/jwks");
            var jwks = new JsonWebKeySet(json);
            
            var parsedKeys = jwks.Keys.Select(k => new
            {
                k.Kid,
                k.Kty,
                k.Alg,
                k.Use,
                HasModulus = !string.IsNullOrEmpty(k.N),
                HasExponent = !string.IsNullOrEmpty(k.E),
                KeySize = k.KeySize,
                KeyId = k.KeyId
            }).ToList();

            return Ok(new
            {
                RawJson = json,
                KeysCount = jwks.Keys.Count,
                Keys = parsedKeys
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new { Error = ex.Message, Stack = ex.StackTrace });
        }
    }

    // 1. Public Endpoint - No protection
    [HttpGet("public")]
    public IActionResult GetPublic()
    {
        return Ok(new
        {
            Message = "This is a public endpoint. Anyone can access this without a token.",
            Timestamp = DateTime.UtcNow
        });
    }

    // 2. Standard Secure Endpoint - Requires a valid token
    [HttpGet("secure")]
    [AppAuthorize]
    public IActionResult GetSecure()
    {
        return Ok(new
        {
            Message = "Access Granted! You are authenticated with a valid OIDC JWT token.",
            Username = User.Identity?.Name,
            UserId = User.FindFirst(AuthConstants.UserIdClaim)?.Value
        });
    }

    // 3. Admin Role Endpoint - Requires "Admin" role (Prioritized Role Check)
    [HttpGet("admin-role")]
    [AppAuthorize(Roles = "Admin")]
    public IActionResult GetAdminRole()
    {
        return Ok(new
        {
            Message = "Access Granted! You have the 'Admin' role.",
            Username = User.Identity?.Name,
            Roles = User.FindAll(AuthConstants.RoleClaim).Select(c => c.Value)
        });
    }

    // 4. Admin Claim Endpoint - Requires "be.admin" claim (Admin Claim Bypass)
    [HttpGet("admin-claim")]
    [AppAuthorize("admin")] // Will be prefixed to "be.admin" by the attribute constructor
    public IActionResult GetAdminClaim()
    {
        return Ok(new
        {
            Message = "Access Granted! You have the 'be.admin' claim.",
            Username = User.Identity?.Name,
            Claims = User.FindAll(AuthConstants.PermissionClaim).Select(c => c.Value)
        });
    }

    // 5. Custom Claim Endpoint - Requires "be.test.read" claim
    [HttpGet("custom-claim")]
    [AppAuthorize("test.read")] // Will be prefixed to "be.test.read" by the attribute constructor
    public IActionResult GetCustomClaim()
    {
        return Ok(new
        {
            Message = "Access Granted! You have the 'be.test.read' claim.",
            Username = User.Identity?.Name,
            Claims = User.FindAll(AuthConstants.PermissionClaim).Select(c => c.Value)
        });
    }

    // 6. ACL Read Endpoint - Requires Read action on ResourceType "Document"
    // Validates ACL permissions retrieved dynamically from Redis session cache.
    // ResourceId is retrieved in order of priority: Header "x-resource-id" -> Route "id" -> Query string "id"
    [HttpGet("acl-read/{id?}")]
    [AppAuthorize(ResourceType = "Document", Action = ResourceActions.Read)]
    public IActionResult GetAclRead(string? id)
    {
        var finalResourceId = Request.Headers["x-resource-id"].ToString();
        if (string.IsNullOrEmpty(finalResourceId)) finalResourceId = id;
        if (string.IsNullOrEmpty(finalResourceId)) finalResourceId = Request.Query["id"].ToString();

        return Ok(new
        {
            Message = $"Access Granted! You have 'Read' action permissions on Resource 'Document' with ID '{finalResourceId}'.",
            ResourceId = finalResourceId,
            ResourceType = "Document",
            Action = "Read (Bitmask: 1)"
        });
    }

    // 7. ACL Write Endpoint - Requires Write action on ResourceType "Document"
    [HttpGet("acl-write/{id?}")]
    [AppAuthorize(ResourceType = "Document", Action = ResourceActions.Write)]
    public IActionResult GetAclWrite(string? id)
    {
        var finalResourceId = Request.Headers["x-resource-id"].ToString();
        if (string.IsNullOrEmpty(finalResourceId)) finalResourceId = id;
        if (string.IsNullOrEmpty(finalResourceId)) finalResourceId = Request.Query["id"].ToString();

        return Ok(new
        {
            Message = $"Access Granted! You have 'Write' action permissions on Resource 'Document' with ID '{finalResourceId}'.",
            ResourceId = finalResourceId,
            ResourceType = "Document",
            Action = "Write (Bitmask: 2)"
        });
    }

    // 8. User Info Endpoint - Returns token details for easier debugging
    [HttpGet("user-info")]
    [AppAuthorize]
    public IActionResult GetUserInfo()
    {
        var claims = User.Claims.Select(c => new { c.Type, c.Value }).ToList();
        return Ok(new
        {
            IsAuthenticated = User.Identity?.IsAuthenticated,
            AuthenticationType = User.Identity?.AuthenticationType,
            Name = User.Identity?.Name,
            Claims = claims
        });
    }
}
