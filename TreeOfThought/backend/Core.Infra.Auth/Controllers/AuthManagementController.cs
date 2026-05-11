using Core.Infra.Auth.Attributes;
using Core.Infra.Auth.Models;
using Core.Infra.Auth.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Core.Infra.Auth.Controllers;

[ApiController]
[Route("api/[controller]")]
[AppAuthorize("admin")]
public class AuthManagementController : ControllerBase
{
    private readonly IAuthRepository _authRepo;

    public AuthManagementController(IAuthRepository authRepo)
    {
        _authRepo = authRepo;
    }

    [HttpGet("roles")]
    public async Task<IActionResult> GetRoles() => Ok(await _authRepo.GetAllRolesAsync());

    [HttpPost("roles")]
    public async Task<IActionResult> CreateRole([FromBody] Role role)
    {
        await _authRepo.CreateRoleAsync(role);
        return Ok(role);
    }

    [HttpGet("claims")]
    public async Task<IActionResult> GetClaims() => Ok(await _authRepo.GetAllClaimsAsync());

    [HttpPost("claims")]
    public async Task<IActionResult> CreateClaim([FromBody] AppClaim claim)
    {
        await _authRepo.CreateClaimAsync(claim);
        return Ok(claim);
    }

    [HttpPost("users/{userId}/roles/{roleId}")]
    public async Task<IActionResult> AssignRole(Guid userId, Guid roleId)
    {
        await _authRepo.AssignRoleToUserAsync(userId, roleId);
        return Ok(new { message = "Role assigned successfully" });
    }

    [HttpDelete("users/{userId}/roles/{roleId}")]
    public async Task<IActionResult> RemoveRole(Guid userId, Guid roleId)
    {
        await _authRepo.RemoveRoleFromUserAsync(userId, roleId);
        return Ok(new { message = "Role removed successfully" });
    }

    [HttpPost("roles/{roleId}/claims/{claimId}")]
    public async Task<IActionResult> AssignClaimToRole(Guid roleId, Guid claimId)
    {
        await _authRepo.AssignClaimToRoleAsync(roleId, claimId);
        return Ok(new { message = "Claim assigned to role successfully" });
    }

    [HttpPost("users/{userId}/claims/{claimId}")]
    public async Task<IActionResult> AssignDirectClaim(Guid userId, Guid claimId)
    {
        await _authRepo.AssignClaimToUserAsync(userId, claimId);
        return Ok(new { message = "Direct claim assigned successfully" });
    }

    [HttpGet("acl")]
    public async Task<IActionResult> GetAcl([FromQuery] string resourceType, [FromQuery] string resourceId)
    {
        return Ok(await _authRepo.GetAclEntriesAsync(resourceType, resourceId));
    }

    [HttpPost("acl")]
    public async Task<IActionResult> AddAcl([FromBody] AclEntry entry)
    {
        await _authRepo.AddAclAsync(entry);
        return Ok(entry);
    }

    [HttpDelete("acl/{id}")]
    public async Task<IActionResult> RemoveAcl(Guid id)
    {
        await _authRepo.RemoveAclAsync(id);
        return Ok(new { message = "ACL entry removed successfully" });
    }

    [HttpGet("users/{userId}/emails")]
    public async Task<IActionResult> GetUserEmails(Guid userId)
    {
        return Ok(await _authRepo.GetUserEmailsAsync(userId));
    }

    [HttpPost("users/{userId}/emails")]
    public async Task<IActionResult> AddUserEmail(Guid userId, [FromBody] UserEmail email)
    {
        email.UserId = userId;
        await _authRepo.AddUserEmailAsync(email);
        return Ok(email);
    }
}
