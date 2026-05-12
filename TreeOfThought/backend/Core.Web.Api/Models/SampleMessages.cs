using Core.Infra.Base.Interfaces;
using Core.Infra.Base.Models;

namespace Core.Web.Api.Models;

public class SampleCommand : BaseMessage, IBaseCommand
{
    public string QueueName => "sample.command";
    public string Payload { get; set; } = string.Empty;
}

public class SampleEvent : BaseMessage, IBaseEvent
{
    public string TopicName => "sample.event";
    public string Payload { get; set; } = string.Empty;
}
