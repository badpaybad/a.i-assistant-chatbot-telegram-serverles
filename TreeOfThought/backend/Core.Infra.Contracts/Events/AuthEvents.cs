using Core.Infra.Base.Interfaces;
using Core.Infra.Base.Models;

namespace Core.Infra.Contracts.Events;

public class LoginSuccessEvent : BaseMessage, IBaseEvent
{
    public string TopicName => nameof(LoginSuccessEvent);
    public string Username { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
}

public class LogoutSuccessEvent : BaseMessage, IBaseEvent
{
    public string TopicName => nameof(LogoutSuccessEvent);
    public string Username { get; set; } = string.Empty;
}
