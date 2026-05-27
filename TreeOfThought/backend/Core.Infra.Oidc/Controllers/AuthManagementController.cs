using Core.Infra.Auth.Attributes;
using Core.Infra.Session.Models;
using Core.Infra.Oidc.Models;
using Core.Infra.Oidc.Repositories;
using Core.Infra.Firebase.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Core.Infra.Oidc.Services;
using Core.Infra.Base.Interfaces;
using Core.Infra.Base.Controllers;
using Core.Infra.Base.Models;

namespace Core.Infra.Oidc.Controllers;

[ApiController]
[Route("api/[controller]")]
[AppAuthorize(AuthConstants.AdminClaim)]
public class AuthManagementController : BaseController
{
    private readonly IAuthRepository _authRepo;
    private readonly AuthService _authService;
    private readonly FirebaseService _firebaseService;
    private readonly INotifyRepository _notifyRepo;
    private readonly IDispatcher _dispatcher;

    public AuthManagementController(
        IAuthRepository authRepo, 
        AuthService authService, 
        FirebaseService firebaseService,
        INotifyRepository notifyRepo,
        IDispatcher dispatcher)
    {
        _authRepo = authRepo;
        _authService = authService;
        _firebaseService = firebaseService;
        _notifyRepo = notifyRepo;
        _dispatcher = dispatcher;
    }
    
    [HttpGet("users")]
    public async Task<IActionResult> GetUsers([FromQuery] UserSearchQuery query)
    {
        var (users, totalCount) = await _authRepo.GetAllUsersAsync(query);
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
                AvatarUrl = user.AvatarUrl,
                IsEmailVerified = user.IsEmailVerified,
                CreatedAt = user.CreatedAt,
                UpdatedAt = user.UpdatedAt,
                Roles = roles.Select(r => new IdNameDto { Id = r.Id, Name = r.Name }).ToList(),
                DirectClaims = claims.Select(c => new IdNameDto { Id = c.Id, Name = c.Name }).ToList()
            });
        }
        
        return Ok(new { items = result, total = totalCount });
    }

    [HttpPost("users")]
    [AppAuthorize("be.auth.manage.user.create")]
    public async Task<IActionResult> CreateUser([FromBody] CreateUserCommand command)
    {
        command.TrackingId = GetTrackingId();
        command.UserId = GetUserId().ToString();
        await _dispatcher.SendAsync(command);
        return Ok(new { trackingId = command.TrackingId });
    }

    [HttpPut("users/{id}")]
    public async Task<IActionResult> UpdateUser(Guid id, [FromBody] UpdateUserCommand command)
    {
        command.Id = id;
        command.TrackingId = GetTrackingId();
        command.UserId = GetUserId().ToString();
        await _dispatcher.SendAsync(command);
        return Ok(new { trackingId = command.TrackingId });
    }

    [HttpGet("roles")]
    public async Task<IActionResult> GetRoles([FromQuery] RoleSearchQuery query)
    {
        var (roles, totalCount) = await _authRepo.GetAllRolesAsync(query);
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
        
        return Ok(new { items = result, total = totalCount });
    }

    [HttpPost("roles")]
    public async Task<IActionResult> CreateRole([FromBody] CreateRoleCommand command)
    {
        command.TrackingId = GetTrackingId();
        command.UserId = GetUserId().ToString();
        await _dispatcher.SendAsync(command);
        return Ok(new { trackingId = command.TrackingId });
    }

    [HttpPut("roles/{id}")]
    public async Task<IActionResult> UpdateRole(Guid id, [FromBody] UpdateRoleCommand command)
    {
        command.Id = id;
        command.TrackingId = GetTrackingId();
        command.UserId = GetUserId().ToString();
        await _dispatcher.SendAsync(command);
        return Ok(new { trackingId = command.TrackingId });
    }

    [HttpGet("claims")]
    public async Task<IActionResult> GetClaims([FromQuery] ClaimSearchQuery query)
    {
        var (claims, totalCount) = await _authRepo.GetAllClaimsAsync(query);
        return Ok(new { items = claims, total = totalCount });
    }

    [HttpPost("claims")]
    public async Task<IActionResult> CreateClaim([FromBody] AppClaim claim)
    {
        var command = new CreateClaimCommand
        {
            Claim = claim,
            TrackingId = GetTrackingId(),
            UserId = GetUserId().ToString()
        };
        await _dispatcher.SendAsync(command);
        return Ok(new { trackingId = command.TrackingId });
    }

    [HttpPut("claims/{id}")]
    public async Task<IActionResult> UpdateClaim(Guid id, [FromBody] AppClaim claim)
    {
        var command = new UpdateClaimCommand
        {
            Id = id,
            Claim = claim,
            TrackingId = GetTrackingId(),
            UserId = GetUserId().ToString()
        };
        await _dispatcher.SendAsync(command);
        return Ok(new { trackingId = command.TrackingId });
    }

    [HttpDelete("users/{id}")]
    public async Task<IActionResult> DeleteUser(Guid id)
    {
        var command = new DeleteUserCommand
        {
            Id = id,
            TrackingId = GetTrackingId(),
            UserId = GetUserId().ToString()
        };
        await _dispatcher.SendAsync(command);
        return Ok(new { trackingId = command.TrackingId });
    }

    [HttpDelete("roles/{id}")]
    public async Task<IActionResult> DeleteRole(Guid id)
    {
        var command = new DeleteRoleCommand
        {
            Id = id,
            TrackingId = GetTrackingId(),
            UserId = GetUserId().ToString()
        };
        await _dispatcher.SendAsync(command);
        return Ok(new { trackingId = command.TrackingId });
    }

    [HttpPost("users/{userId}/avatar")]
    public async Task<IActionResult> UploadAvatar(Guid userId, [FromForm] IFormFile file)
    {
        if (file == null || file.Length == 0) return BadRequest(new { message = "No file uploaded" });

        using var ms = new MemoryStream();
        await file.CopyToAsync(ms);

        var command = new UploadAvatarCommand
        {
            UserId = userId,
            FileName = $"avatars/{userId}_{DateTime.UtcNow.Ticks}{Path.GetExtension(file.FileName)}",
            ContentType = file.ContentType,
            Content = ms.ToArray(),
            TrackingId = GetTrackingId()
        };
        // Explicitly set inherited string? UserId
        ((BaseMessage)command).UserId = GetUserId().ToString();

        await _dispatcher.SendAsync(command);
        return Ok(new { trackingId = command.TrackingId });
    }

    [HttpDelete("claims/{id}")]
    public async Task<IActionResult> DeleteClaim(Guid id)
    {
        var command = new DeleteClaimCommand
        {
            Id = id,
            TrackingId = GetTrackingId(),
            UserId = GetUserId().ToString()
        };
        await _dispatcher.SendAsync(command);
        return Ok(new { trackingId = command.TrackingId });
    }

    [HttpPost("users/{userId}/roles/{roleId}")]
    public async Task<IActionResult> AssignRole(Guid userId, Guid roleId)
    {
        var command = new AssignRoleCommand
        {
            UserId = userId,
            RoleId = roleId,
            TrackingId = GetTrackingId()
        };
        ((BaseMessage)command).UserId = GetUserId().ToString();

        await _dispatcher.SendAsync(command);
        return Ok(new { trackingId = command.TrackingId });
    }

    [HttpPost("users/{userId}/roles/batch")]
    public async Task<IActionResult> AssignRoles(Guid userId, [FromBody] List<Guid> roleIds)
    {
        var command = new AssignRolesCommand
        {
            UserId = userId,
            RoleIds = roleIds,
            TrackingId = GetTrackingId()
        };
        ((BaseMessage)command).UserId = GetUserId().ToString();

        await _dispatcher.SendAsync(command);
        return Ok(new { trackingId = command.TrackingId });
    }

    [HttpDelete("users/{userId}/roles/{roleId}")]
    public async Task<IActionResult> RemoveRole(Guid userId, Guid roleId)
    {
        var command = new RemoveRoleCommand
        {
            UserId = userId,
            RoleId = roleId,
            TrackingId = GetTrackingId()
        };
        ((BaseMessage)command).UserId = GetUserId().ToString();

        await _dispatcher.SendAsync(command);
        return Ok(new { trackingId = command.TrackingId });
    }

    [HttpPost("roles/{roleId}/claims/{claimId}")]
    public async Task<IActionResult> AssignClaimToRole(Guid roleId, Guid claimId)
    {
        var command = new AssignClaimToRoleCommand
        {
            RoleId = roleId,
            ClaimId = claimId,
            TrackingId = GetTrackingId(),
            UserId = GetUserId().ToString()
        };
        await _dispatcher.SendAsync(command);
        return Ok(new { trackingId = command.TrackingId });
    }

    [HttpPost("roles/{roleId}/claims/batch")]
    public async Task<IActionResult> AssignClaimsToRole(Guid roleId, [FromBody] List<Guid> claimIds)
    {
        var command = new AssignClaimsToRoleCommand
        {
            RoleId = roleId,
            ClaimIds = claimIds,
            TrackingId = GetTrackingId(),
            UserId = GetUserId().ToString()
        };
        await _dispatcher.SendAsync(command);
        return Ok(new { trackingId = command.TrackingId });
    }

    [HttpPost("users/{userId}/claims/{claimId}")]
    public async Task<IActionResult> AssignDirectClaim(Guid userId, Guid claimId)
    {
        var command = new AssignDirectClaimCommand
        {
            UserId = userId,
            ClaimId = claimId,
            TrackingId = GetTrackingId()
        };
        ((BaseMessage)command).UserId = GetUserId().ToString();

        await _dispatcher.SendAsync(command);
        return Ok(new { trackingId = command.TrackingId });
    }

    [HttpPost("users/{userId}/claims/batch")]
    public async Task<IActionResult> AssignDirectClaims(Guid userId, [FromBody] List<Guid> claimIds)
    {
        var command = new AssignDirectClaimsCommand
        {
            UserId = userId,
            ClaimIds = claimIds,
            TrackingId = GetTrackingId()
        };
        ((BaseMessage)command).UserId = GetUserId().ToString();

        await _dispatcher.SendAsync(command);
        return Ok(new { trackingId = command.TrackingId });
    }

    [HttpDelete("users/{userId}/claims/{claimId}")]
    public async Task<IActionResult> RemoveDirectClaim(Guid userId, Guid claimId)
    {
        var command = new RemoveDirectClaimCommand
        {
            UserId = userId,
            ClaimId = claimId,
            TrackingId = GetTrackingId()
        };
        ((BaseMessage)command).UserId = GetUserId().ToString();

        await _dispatcher.SendAsync(command);
        return Ok(new { trackingId = command.TrackingId });
    }

    [HttpDelete("roles/{roleId}/claims/{claimId}")]
    public async Task<IActionResult> RemoveClaimFromRole(Guid roleId, Guid claimId)
    {
        var command = new RemoveClaimFromRoleCommand
        {
            RoleId = roleId,
            ClaimId = claimId,
            TrackingId = GetTrackingId(),
            UserId = GetUserId().ToString()
        };
        await _dispatcher.SendAsync(command);
        return Ok(new { trackingId = command.TrackingId });
    }

    [HttpGet("acl")]
    public async Task<IActionResult> GetAcl([FromQuery] string resourceType, [FromQuery] string resourceId, [FromQuery] int? pageIndex = null, [FromQuery] int? pageSize = null)
    {
        var (items, totalCount) = await _authRepo.GetAclEntriesAsync(resourceType, resourceId, pageIndex, pageSize);
        return Ok(new { items, total = totalCount });
    }

    [HttpPost("acl")]
    public async Task<IActionResult> AddAcl([FromBody] AclEntry entry)
    {
        var command = new AddAclCommand
        {
            Entry = entry,
            TrackingId = GetTrackingId(),
            UserId = GetUserId().ToString()
        };
        await _dispatcher.SendAsync(command);
        return Ok(new { trackingId = command.TrackingId });
    }

    [HttpDelete("acl/{id}")]
    public async Task<IActionResult> RemoveAcl(Guid id)
    {
        var command = new RemoveAclCommand
        {
            Id = id,
            TrackingId = GetTrackingId(),
            UserId = GetUserId().ToString()
        };
        await _dispatcher.SendAsync(command);
        return Ok(new { trackingId = command.TrackingId });
    }

    [HttpGet("users/{userId}/emails")]
    public async Task<IActionResult> GetUserEmails(Guid userId)
    {
        return Ok(await _authRepo.GetUserEmailsAsync(userId));
    }

    [HttpPost("users/{userId}/emails")]
    public async Task<IActionResult> AddUserEmail(Guid userId, [FromBody] UserEmail email)
    {
        var command = new AddUserEmailCommand
        {
            UserId = userId,
            Email = email,
            TrackingId = GetTrackingId()
        };
        ((BaseMessage)command).UserId = GetUserId().ToString();

        await _dispatcher.SendAsync(command);
        return Ok(new { trackingId = command.TrackingId });
    }

    [HttpGet("users/{userId}/fcm-tokens")]
    public async Task<IActionResult> GetUserFcmTokens(Guid userId)
    {
        var tokens = await _notifyRepo.GetTokensByUserIdAsync(userId);
        return Ok(tokens);
    }

    [HttpPost("users/send-notification")]
    public async Task<IActionResult> SendNotification([FromBody] SendNotificationRequest request)
    {
        var command = new SendNotificationCommand
        {
            Request = request,
            TrackingId = GetTrackingId(),
            UserId = GetUserId().ToString()
        };
        await _dispatcher.SendAsync(command);
        return Ok(new { trackingId = command.TrackingId });
    }
}
