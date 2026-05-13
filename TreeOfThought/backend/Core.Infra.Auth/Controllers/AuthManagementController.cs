using Core.Infra.Auth.Attributes;
using Core.Infra.Auth.Models;
using Core.Infra.Auth.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Core.Infra.Auth.Controllers;

[ApiController]
[Route("api/[controller]")]
[AppAuthorize(AuthConstants.AdminClaim)]
public class AuthManagementController : ControllerBase
{
    private readonly IAuthRepository _authRepo;

    public AuthManagementController(IAuthRepository authRepo)
    {
        _authRepo = authRepo;
    }
    
    [HttpGet("users")]
    public async Task<IActionResult> GetUsers([FromQuery] UserSearchQuery query)
    {
        var users = await _authRepo.GetAllUsersAsync(query);
        var result = new List<UserDto>();
        
        foreach (var user in users)
        {
            var roles = await _authRepo.GetUserRolesAsync(user.Id);
            var claims = await _authRepo.GetUserDirectClaimsAsync(user.Id);
            
            result.Add(new UserDto
            {
                Id = user.Id,
                Username = user.Username,
                DisplayName = user.DisplayName,
                Email = user.Email,
                IsEmailVerified = user.IsEmailVerified,
                Roles = roles.Select(r => new IdNameDto { Id = r.Id, Name = r.Name }).ToList(),
                DirectClaims = claims.Select(c => new IdNameDto { Id = c.Id, Name = c.Name }).ToList()
            });
        }
        
        return Ok(result);
    }

    [HttpPost("users")]
    public async Task<IActionResult> CreateUser([FromBody] User user)
    {
        await _authRepo.CreateUserAsync(user);
        return Ok(user);
    }

    [HttpPut("users/{id}")]
    public async Task<IActionResult> UpdateUser(Guid id, [FromBody] User user)
    {
        user.Id = id;
        await _authRepo.UpdateUserAsync(user);
        return Ok(user);
    }

    [HttpGet("roles")]
    public async Task<IActionResult> GetRoles([FromQuery] RoleSearchQuery query)
    {
        var roles = await _authRepo.GetAllRolesAsync(query);
        var result = new List<RoleDto>();
        
        foreach (var role in roles)
        {
            var claims = await _authRepo.GetRoleClaimsAsync(role.Id);
            result.Add(new RoleDto
            {
                Id = role.Id,
                Name = role.Name,
                Description = role.Description,
                Claims = claims.Select(c => new IdNameDto { Id = c.Id, Name = c.Name }).ToList()
            });
        }
        
        return Ok(result);
    }

    [HttpPost("roles")]
    public async Task<IActionResult> CreateRole([FromBody] Role role)
    {
        await _authRepo.CreateRoleAsync(role);
        return Ok(role);
    }

    [HttpPut("roles/{id}")]
    public async Task<IActionResult> UpdateRole(Guid id, [FromBody] Role role)
    {
        role.Id = id;
        await _authRepo.UpdateRoleAsync(role);
        return Ok(role);
    }

    [HttpGet("claims")]
    public async Task<IActionResult> GetClaims([FromQuery] ClaimSearchQuery query) => Ok(await _authRepo.GetAllClaimsAsync(query));

    [HttpPost("claims")]
    public async Task<IActionResult> CreateClaim([FromBody] AppClaim claim)
    {
        await _authRepo.CreateClaimAsync(claim);
        return Ok(claim);
    }

    [HttpPut("claims/{id}")]
    public async Task<IActionResult> UpdateClaim(Guid id, [FromBody] AppClaim claim)
    {
        claim.Id = id;
        await _authRepo.UpdateClaimAsync(claim);
        return Ok(claim);
    }

    [HttpDelete("users/{id}")]
    public async Task<IActionResult> DeleteUser(Guid id)
    {
        try
        {
            await _authRepo.DeleteUserAsync(id);
            return Ok(new { message = "User deleted successfully" });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpDelete("roles/{id}")]
    public async Task<IActionResult> DeleteRole(Guid id)
    {
        try
        {
            await _authRepo.DeleteRoleAsync(id);
            return Ok(new { message = "Role deleted successfully" });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpDelete("claims/{id}")]
    public async Task<IActionResult> DeleteClaim(Guid id)
    {
        try
        {
            await _authRepo.DeleteClaimAsync(id);
            return Ok(new { message = "Claim deleted successfully" });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("users/{userId}/roles/{roleId}")]
    public async Task<IActionResult> AssignRole(Guid userId, Guid roleId)
    {
        await _authRepo.AssignRoleToUserAsync(userId, roleId);
        return Ok(new { message = "Role assigned successfully" });
    }

    [HttpPost("users/{userId}/roles/batch")]
    public async Task<IActionResult> AssignRoles(Guid userId, [FromBody] List<Guid> roleIds)
    {
        await _authRepo.AssignRolesToUserAsync(userId, roleIds);
        return Ok(new { message = "Roles assigned successfully" });
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

    [HttpPost("roles/{roleId}/claims/batch")]
    public async Task<IActionResult> AssignClaimsToRole(Guid roleId, [FromBody] List<Guid> claimIds)
    {
        await _authRepo.AssignClaimsToRoleAsync(roleId, claimIds);
        return Ok(new { message = "Claims assigned to role successfully" });
    }

    [HttpPost("users/{userId}/claims/{claimId}")]
    public async Task<IActionResult> AssignDirectClaim(Guid userId, Guid claimId)
    {
        await _authRepo.AssignClaimToUserAsync(userId, claimId);
        return Ok(new { message = "Direct claim assigned successfully" });
    }

    [HttpPost("users/{userId}/claims/batch")]
    public async Task<IActionResult> AssignDirectClaims(Guid userId, [FromBody] List<Guid> claimIds)
    {
        await _authRepo.AssignClaimsToUserAsync(userId, claimIds);
        return Ok(new { message = "Direct claims assigned successfully" });
    }

    [HttpDelete("users/{userId}/claims/{claimId}")]
    public async Task<IActionResult> RemoveDirectClaim(Guid userId, Guid claimId)
    {
        await _authRepo.RemoveClaimFromUserAsync(userId, claimId);
        return Ok(new { message = "Direct claim removed successfully" });
    }

    [HttpDelete("roles/{roleId}/claims/{claimId}")]
    public async Task<IActionResult> RemoveClaimFromRole(Guid roleId, Guid claimId)
    {
        await _authRepo.RemoveClaimFromRoleAsync(roleId, claimId);
        return Ok(new { message = "Claim removed from role successfully" });
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
