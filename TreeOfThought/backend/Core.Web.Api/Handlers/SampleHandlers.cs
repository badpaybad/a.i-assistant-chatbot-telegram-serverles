using Core.Infra.Base.Interfaces;
using Core.Web.Api.Models;

namespace Core.Web.Api.Handlers;

public class SampleCommandHandler : ICommandHandler<SampleCommand>
{
    private int _counter = 0;
    private readonly ILogger<SampleCommandHandler> _logger;

    public SampleCommandHandler(ILogger<SampleCommandHandler> logger)
    {
        _logger = logger;
    }

    public async Task HandleAsync(SampleCommand command)
    {
        _counter++;
        _logger.LogInformation("SampleCommandHandler handled command: {Payload}. Count: {Count}", command.Payload, _counter);
        await Task.CompletedTask;
    }
}

public class SampleEventHandler : IEventHandler<SampleEvent>
{
    private int _counter = 0;
    private readonly ILogger<SampleEventHandler> _logger;

    public SampleEventHandler(ILogger<SampleEventHandler> logger)
    {
        _logger = logger;
    }

    public async Task HandleAsync(SampleEvent @event)
    {
        _counter++;
        _logger.LogInformation("SampleEventHandler handled event: {Data}. Count: {Count}", @event.Data, _counter);
        await Task.CompletedTask;
    }
}
