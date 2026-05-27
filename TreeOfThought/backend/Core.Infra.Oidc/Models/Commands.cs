using Core.Infra.Base.Interfaces;
using Core.Infra.Base.Models;

namespace Core.Infra.Oidc.Models;

public abstract class OidcCommand : BaseMessage, IBaseCommand
{
    public virtual string QueueName => GetType().Name;
}

public class CreateUserCommand : OidcCommand 
{ 
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public bool IsEmailVerified { get; set; }
    public List<Guid> RoleIds { get; set; } = new();
    public List<Guid> ClaimIds { get; set; } = new();
}

public class UpdateUserCommand : OidcCommand 
{ 
    public Guid Id { get; set; }
    public string DisplayName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public bool IsEmailVerified { get; set; }
    public List<Guid> RoleIds { get; set; } = new();
    public List<Guid> ClaimIds { get; set; } = new();
}

public class DeleteUserCommand : OidcCommand { public Guid Id { get; set; } }

public class CreateRoleCommand : OidcCommand 
{ 
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public List<Guid> ClaimIds { get; set; } = new();
}

public class UpdateRoleCommand : OidcCommand 
{ 
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public List<Guid> ClaimIds { get; set; } = new();
}

public class DeleteRoleCommand : OidcCommand { public Guid Id { get; set; } }

public class CreateClaimCommand : OidcCommand { public AppClaim Claim { get; set; } = null!; }
public class UpdateClaimCommand : OidcCommand { public Guid Id { get; set; } public AppClaim Claim { get; set; } = null!; }
public class DeleteClaimCommand : OidcCommand { public Guid Id { get; set; } }

public class UploadAvatarCommand : OidcCommand 
{ 
    new public Guid UserId { get; set; } 
    public string FileName { get; set; } = string.Empty;
    public string ContentType { get; set; } = string.Empty;
    public byte[] Content { get; set; } = Array.Empty<byte>();
}

public class AssignRoleCommand : OidcCommand { new public Guid UserId { get; set; } public Guid RoleId { get; set; } }
public class AssignRolesCommand : OidcCommand { new public Guid UserId { get; set; } public List<Guid> RoleIds { get; set; } = new(); }
public class RemoveRoleCommand : OidcCommand { new public Guid UserId { get; set; } public Guid RoleId { get; set; } }

public class AssignClaimToRoleCommand : OidcCommand { public Guid RoleId { get; set; } public Guid ClaimId { get; set; } }
public class AssignClaimsToRoleCommand : OidcCommand { public Guid RoleId { get; set; } public List<Guid> ClaimIds { get; set; } = new(); }

public class AssignDirectClaimCommand : OidcCommand { new public Guid UserId { get; set; } public Guid ClaimId { get; set; } }
public class AssignDirectClaimsCommand : OidcCommand { new public Guid UserId { get; set; } public List<Guid> ClaimIds { get; set; } = new(); }
public class RemoveDirectClaimCommand : OidcCommand { new public Guid UserId { get; set; } public Guid ClaimId { get; set; } }

public class RemoveClaimFromRoleCommand : OidcCommand { public Guid RoleId { get; set; } public Guid ClaimId { get; set; } }

public class AddAclCommand : OidcCommand { public AclEntry Entry { get; set; } = null!; }
public class RemoveAclCommand : OidcCommand { public Guid Id { get; set; } }

public class AddUserEmailCommand : OidcCommand { new public Guid UserId { get; set; } public UserEmail Email { get; set; } = null!; }

public class SendNotificationCommand : OidcCommand { public SendNotificationRequest Request { get; set; } = null!; }
