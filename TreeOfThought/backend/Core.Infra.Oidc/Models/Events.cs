using Core.Infra.Base.Interfaces;
using Core.Infra.Base.Models;
using Core.Infra.Base.Constants;

namespace Core.Infra.Oidc.Models;

public abstract class OidcEvent : BaseMessage, INotifyUiEvent
{
    public string TopicName => GetType().Name;
    public string NotifyPath => FirestoreConstants.GetNotificationPath(TrackingId);
    public string Status { get; set; } = "Completed";
    public string? Message { get; set; }
    public object? Data { get; set; }
}

public class UserCreatedEvent : OidcEvent {}
public class UserUpdatedEvent : OidcEvent {}
public class UserDeletedEvent : OidcEvent {}

public class RoleCreatedEvent : OidcEvent {}
public class RoleUpdatedEvent : OidcEvent {}
public class RoleDeletedEvent : OidcEvent {}

public class ClaimCreatedEvent : OidcEvent {}
public class ClaimUpdatedEvent : OidcEvent {}
public class ClaimDeletedEvent : OidcEvent {}

public class AvatarUploadedEvent : OidcEvent {}

public class RoleAssignedEvent : OidcEvent {}
public class RolesAssignedEvent : OidcEvent {}
public class RoleRemovedEvent : OidcEvent {}

public class ClaimAssignedToRoleEvent : OidcEvent {}
public class ClaimsAssignedToRoleEvent : OidcEvent {}

public class DirectClaimAssignedEvent : OidcEvent {}
public class DirectClaimsAssignedEvent : OidcEvent {}
public class DirectClaimRemovedEvent : OidcEvent {}

public class ClaimRemovedFromRoleEvent : OidcEvent {}

public class AclAddedEvent : OidcEvent {}
public class AclRemovedEvent : OidcEvent {}

public class UserEmailAddedEvent : OidcEvent {}

public class NotificationSentEvent : OidcEvent {}
