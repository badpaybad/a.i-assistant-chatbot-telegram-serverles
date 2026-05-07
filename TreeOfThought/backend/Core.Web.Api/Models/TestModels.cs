namespace Core.Web.Api.Models;

public class TestCommandRequest
{
    public Guid RequestId { get; set; }
    public string CommandName { get; set; } = string.Empty;
    public object? Payload { get; set; }
}

public class FcmSampleRequest
{
    public string Token { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;
}
