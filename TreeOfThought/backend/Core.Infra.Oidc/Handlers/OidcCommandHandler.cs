using Core.Infra.Base.Interfaces;
using Core.Infra.Oidc.Models;
using Core.Infra.Oidc.Repositories;
using Core.Infra.Oidc.Services;
using Core.Infra.Firebase.Services;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Infra.Oidc.Handlers;

public class OidcCommandHandler :
    ICommandHandler<CreateUserCommand>,
    ICommandHandler<UpdateUserCommand>,
    ICommandHandler<DeleteUserCommand>,
    ICommandHandler<CreateRoleCommand>,
    ICommandHandler<UpdateRoleCommand>,
    ICommandHandler<DeleteRoleCommand>,
    ICommandHandler<CreateClaimCommand>,
    ICommandHandler<UpdateClaimCommand>,
    ICommandHandler<DeleteClaimCommand>,
    ICommandHandler<UploadAvatarCommand>,
    ICommandHandler<AssignRoleCommand>,
    ICommandHandler<AssignRolesCommand>,
    ICommandHandler<RemoveRoleCommand>,
    ICommandHandler<AssignClaimToRoleCommand>,
    ICommandHandler<AssignClaimsToRoleCommand>,
    ICommandHandler<AssignDirectClaimCommand>,
    ICommandHandler<AssignDirectClaimsCommand>,
    ICommandHandler<RemoveDirectClaimCommand>,
    ICommandHandler<RemoveClaimFromRoleCommand>,
    ICommandHandler<AddAclCommand>,
    ICommandHandler<RemoveAclCommand>,
    ICommandHandler<AddUserEmailCommand>,
    ICommandHandler<SendNotificationCommand>
{
    private readonly IAuthRepository _authRepo;
    private readonly AuthService _authService;
    private readonly FirebaseService _firebaseService;
    private readonly INotifyRepository _notifyRepo;
    private readonly IDispatcher _dispatcher;
    private readonly ILogger<OidcCommandHandler> _logger;

    public OidcCommandHandler(
        IAuthRepository authRepo,
        AuthService authService,
        FirebaseService firebaseService,
        INotifyRepository notifyRepo,
        IDispatcher dispatcher,
        ILogger<OidcCommandHandler> logger)
    {
        _authRepo = authRepo;
        _authService = authService;
        _firebaseService = firebaseService;
        _notifyRepo = notifyRepo;
        _dispatcher = dispatcher;
        _logger = logger;
    }

    public async Task HandleAsync(CreateUserCommand command)
    {
        var user = new users_entity
        {
            username = command.Username,
            password_hash = BCrypt.Net.BCrypt.HashPassword(command.Password),
            display_name = command.DisplayName,
            email = command.Email,
            is_email_verified = command.IsEmailVerified,
            created_by = command.UserId,
            created_at = DateTime.UtcNow
        };
        await _authRepo.CreateUserAsync(user);

        if (command.RoleIds != null && command.RoleIds.Any())
        {
            await _authRepo.AssignRolesToUserAsync(user.id, command.RoleIds);
        }
        
        if (command.ClaimIds != null && command.ClaimIds.Any())
        {
            await _authRepo.AssignClaimsToUserAsync(user.id, command.ClaimIds);
        }

        await _authService.SyncUserClaimsToRedisAsync(user.id);

        await _dispatcher.PublishAsync(new UserCreatedEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId,
            Message = "Người dùng đã được tạo thành công",
            Data = user
        });
    }

    public async Task HandleAsync(UpdateUserCommand command)
    {
        var user = await _authRepo.GetUserByIdAsync(command.Id);
        if (user == null) throw new InvalidOperationException("User not found");

        user.display_name = command.DisplayName;
        user.email = command.Email;
        user.is_email_verified = command.IsEmailVerified;
        user.updated_by = command.UserId;
        user.updated_at = DateTime.UtcNow;
        await _authRepo.UpdateUserAsync(user);

        // Sync Roles
        var currentRoles = await _authRepo.GetUserRolesAsync(command.Id);
        foreach (var r in currentRoles)
        {
            await _authRepo.RemoveRoleFromUserAsync(command.Id, r.id);
        }
        if (command.RoleIds != null && command.RoleIds.Any())
        {
            await _authRepo.AssignRolesToUserAsync(command.Id, command.RoleIds);
        }

        // Sync Claims
        var currentClaims = await _authRepo.GetUserDirectClaimsAsync(command.Id);
        foreach (var c in currentClaims)
        {
            await _authRepo.RemoveClaimFromUserAsync(command.Id, c.id);
        }
        if (command.ClaimIds != null && command.ClaimIds.Any())
        {
            await _authRepo.AssignClaimsToUserAsync(command.Id, command.ClaimIds);
        }

        await _authService.SyncUserClaimsToRedisAsync(command.Id);

        await _dispatcher.PublishAsync(new UserUpdatedEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId,
            Message = "Người dùng đã được cập nhật thành công",
            Data = user
        });
    }

    public async Task HandleAsync(DeleteUserCommand command)
    {
        await _authRepo.DeleteUserAsync(command.Id);
        await _authService.RemoveUserClaimsFromRedisAsync(command.Id);

        await _dispatcher.PublishAsync(new UserDeletedEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId,
            Message = "Người dùng đã được xóa thành công"
        });
    }

    public async Task HandleAsync(CreateRoleCommand command)
    {
        var role = new roles_entity
        {
            name = command.Name,
            description = command.Description,
            created_by = command.UserId,
            created_at = DateTime.UtcNow
        };
        await _authRepo.CreateRoleAsync(role);

        if (command.ClaimIds != null && command.ClaimIds.Any())
        {
            await _authRepo.AssignClaimsToRoleAsync(role.id, command.ClaimIds);
        }

        await _dispatcher.PublishAsync(new RoleCreatedEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId,
            Message = "Vai trò đã được thêm thành công",
            Data = role
        });
    }

    public async Task HandleAsync(UpdateRoleCommand command)
    {
        var role = await _authRepo.GetRoleByIdAsync(command.Id);
        if (role == null) throw new InvalidOperationException("Role not found");

        role.description = command.Description;
        role.updated_by = command.UserId;
        role.updated_at = DateTime.UtcNow;
        await _authRepo.UpdateRoleAsync(role);

        // Sync Claims
        var currentClaims = await _authRepo.GetRoleClaimsAsync(role.id);
        foreach (var c in currentClaims)
        {
            await _authRepo.RemoveClaimFromRoleAsync(role.id, c.id);
        }
        if (command.ClaimIds != null && command.ClaimIds.Any())
        {
            await _authRepo.AssignClaimsToRoleAsync(role.id, command.ClaimIds);
        }

        var users = await _authRepo.GetUsersInRoleAsync(role.id);
        foreach (var u in users)
        {
            await _authService.SyncUserClaimsToRedisAsync(u.id);
        }

        await _dispatcher.PublishAsync(new RoleUpdatedEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId,
            Message = "Vai trò đã được cập nhật thành công",
            Data = role
        });
    }

    public async Task HandleAsync(DeleteRoleCommand command)
    {
        await _authRepo.DeleteRoleAsync(command.Id);

        await _dispatcher.PublishAsync(new RoleDeletedEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId,
            Message = "Vai trò đã được xóa thành công"
        });
    }

    public async Task HandleAsync(CreateClaimCommand command)
    {
        command.Claim.created_by = command.UserId;
        command.Claim.created_at = DateTime.UtcNow;
        await _authRepo.CreateClaimAsync(command.Claim);

        await _dispatcher.PublishAsync(new ClaimCreatedEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId,
            Message = "Quyền đã được thêm thành công",
            Data = command.Claim
        });
    }

    public async Task HandleAsync(UpdateClaimCommand command)
    {
        var claim = await _authRepo.GetClaimByIdAsync(command.Id);
        if (claim == null) throw new InvalidOperationException("Claim not found");

        claim.name = command.Claim.name;
        claim.description = command.Claim.description;
        claim.updated_by = command.UserId;
        claim.updated_at = DateTime.UtcNow;
        await _authRepo.UpdateClaimAsync(claim);

        await _dispatcher.PublishAsync(new ClaimUpdatedEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId,
            Message = "Quyền đã được cập nhật thành công",
            Data = claim
        });
    }

    public async Task HandleAsync(DeleteClaimCommand command)
    {
        await _authRepo.DeleteClaimAsync(command.Id);

        await _dispatcher.PublishAsync(new ClaimDeletedEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId,
            Message = "Quyền đã được xóa thành công"
        });
    }

    public async Task HandleAsync(UploadAvatarCommand command)
    {
        var user = await _authRepo.GetUserByIdAsync(command.UserId);
        if (user == null) throw new InvalidOperationException("User not found");

        using var stream = new MemoryStream(command.Content);
        var publicUrl = await _firebaseService.UploadFileAsync(command.FileName, stream, command.ContentType, isPublic: true);

        user.avatar_url = publicUrl;
        await _authRepo.UpdateUserAsync(user);

        await _dispatcher.PublishAsync(new AvatarUploadedEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId.ToString(),
            Message = "Ảnh đại diện đã được cập nhật thành công",
            Data = publicUrl
        });
    }

    public async Task HandleAsync(AssignRoleCommand command)
    {
        await _authRepo.AssignRoleToUserAsync(command.UserId, command.RoleId);
        await _authService.SyncUserClaimsToRedisAsync(command.UserId);

        await _dispatcher.PublishAsync(new RoleAssignedEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId.ToString(),
            Message = "Gán vai trò thành công"
        });
    }

    public async Task HandleAsync(AssignRolesCommand command)
    {
        await _authRepo.AssignRolesToUserAsync(command.UserId, command.RoleIds);
        await _authService.SyncUserClaimsToRedisAsync(command.UserId);

        await _dispatcher.PublishAsync(new RolesAssignedEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId.ToString(),
            Message = "Gán vai trò thành công"
        });
    }

    public async Task HandleAsync(RemoveRoleCommand command)
    {
        await _authRepo.RemoveRoleFromUserAsync(command.UserId, command.RoleId);
        await _authService.SyncUserClaimsToRedisAsync(command.UserId);

        await _dispatcher.PublishAsync(new RoleRemovedEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId.ToString(),
            Message = "Xóa vai trò thành công"
        });
    }

    public async Task HandleAsync(AssignClaimToRoleCommand command)
    {
        await _authRepo.AssignClaimToRoleAsync(command.RoleId, command.ClaimId);
        var users = await _authRepo.GetUsersInRoleAsync(command.RoleId);
        foreach (var u in users)
        {
            await _authService.SyncUserClaimsToRedisAsync(u.id);
        }

        await _dispatcher.PublishAsync(new ClaimAssignedToRoleEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId,
            Message = "Gán quyền thành công"
        });
    }

    public async Task HandleAsync(AssignClaimsToRoleCommand command)
    {
        await _authRepo.AssignClaimsToRoleAsync(command.RoleId, command.ClaimIds);
        var users = await _authRepo.GetUsersInRoleAsync(command.RoleId);
        foreach (var u in users)
        {
            await _authService.SyncUserClaimsToRedisAsync(u.id);
        }

        await _dispatcher.PublishAsync(new ClaimsAssignedToRoleEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId,
            Message = "Gán quyền thành công"
        });
    }

    public async Task HandleAsync(AssignDirectClaimCommand command)
    {
        await _authRepo.AssignClaimToUserAsync(command.UserId, command.ClaimId);
        await _authService.SyncUserClaimsToRedisAsync(command.UserId);

        await _dispatcher.PublishAsync(new DirectClaimAssignedEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId.ToString(),
            Message = "Gán quyền thành công"
        });
    }

    public async Task HandleAsync(AssignDirectClaimsCommand command)
    {
        await _authRepo.AssignClaimsToUserAsync(command.UserId, command.ClaimIds);
        await _authService.SyncUserClaimsToRedisAsync(command.UserId);

        await _dispatcher.PublishAsync(new DirectClaimsAssignedEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId.ToString(),
            Message = "Gán quyền thành công"
        });
    }

    public async Task HandleAsync(RemoveDirectClaimCommand command)
    {
        await _authRepo.RemoveClaimFromUserAsync(command.UserId, command.ClaimId);
        await _authService.SyncUserClaimsToRedisAsync(command.UserId);

        await _dispatcher.PublishAsync(new DirectClaimRemovedEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId.ToString(),
            Message = "Xóa quyền thành công"
        });
    }

    public async Task HandleAsync(RemoveClaimFromRoleCommand command)
    {
        await _authRepo.RemoveClaimFromRoleAsync(command.RoleId, command.ClaimId);
        var users = await _authRepo.GetUsersInRoleAsync(command.RoleId);
        foreach (var u in users)
        {
            await _authService.SyncUserClaimsToRedisAsync(u.id);
        }

        await _dispatcher.PublishAsync(new ClaimRemovedFromRoleEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId,
            Message = "Xóa quyền thành công"
        });
    }

    public async Task HandleAsync(AddAclCommand command)
    {
        await _authRepo.AddAclAsync(command.Entry);
        if (command.Entry.user_id.HasValue)
        {
            await _authService.SyncUserAclToRedisAsync(command.Entry.user_id.Value);
        }

        await _dispatcher.PublishAsync(new AclAddedEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId,
            Message = "Thêm ACL thành công",
            Data = command.Entry
        });
    }

    public async Task HandleAsync(RemoveAclCommand command)
    {
        var entry = await _authRepo.GetAclEntryByIdAsync(command.Id);
        if (entry != null)
        {
            await _authRepo.RemoveAclAsync(command.Id);
            if (entry.user_id.HasValue)
            {
                await _authService.SyncUserAclToRedisAsync(entry.user_id.Value);
            }
        }

        await _dispatcher.PublishAsync(new AclRemovedEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId,
            Message = "Xóa ACL thành công"
        });
    }

    public async Task HandleAsync(AddUserEmailCommand command)
    {
        command.Email.user_id = command.UserId;
        await _authRepo.AddUserEmailAsync(command.Email);

        await _dispatcher.PublishAsync(new UserEmailAddedEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId.ToString(),
            Message = "Thêm Email thành công",
            Data = command.Email
        });
    }

    public async Task HandleAsync(SendNotificationCommand command)
    {
        string messageId = await _firebaseService.SendNotificationAsync(command.Request.FcmToken, command.Request.Title, command.Request.Body);

        await _dispatcher.PublishAsync(new NotificationSentEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId,
            Message = "Gửi thông báo thành công",
            Data = messageId
        });
    }
}
