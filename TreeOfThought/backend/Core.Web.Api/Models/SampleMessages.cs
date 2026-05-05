using Core.Infra.Base.Interfaces;
using Core.Infra.Base.Models;

namespace Core.Web.Api.Models;

public class SampleCommand : BaseMessage, IBaseCommand
{
    public string CommandName => "sample.command";
    public string Payload { get; set; } = string.Empty;
}

public class SampleEvent : BaseMessage, IBaseEvent
{
    public string EventName => "sample.event";
    public string Data { get; set; } = string.Empty;
}
