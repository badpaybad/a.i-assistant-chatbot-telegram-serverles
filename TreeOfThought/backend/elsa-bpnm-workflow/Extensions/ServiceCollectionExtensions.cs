using Core.Infra.ElsaBpnmWorkflow.Controllers;
using Core.Infra.ElsaBpnmWorkflow.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Core.Infra.ElsaBpnmWorkflow.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddElsaBpnmWorkflowServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddSingleton<IElsaWorkflowEngine, ElsaWorkflowEngine>();
        return services;
    }

    public static IMvcBuilder AddElsaBpnmWorkflowControllers(this IMvcBuilder mvcBuilder)
    {
        return mvcBuilder.AddApplicationPart(typeof(ElsaBpnmWorkflowController).Assembly);
    }
}
