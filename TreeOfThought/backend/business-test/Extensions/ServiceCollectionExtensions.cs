using Core.Infra.BusinessTest.Controllers;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Core.Infra.BusinessTest.Extensions;

public static class ServiceCollectionExtensions
{
    public static IMvcBuilder AddBusinessTestControllers(this IMvcBuilder mvcBuilder)
    {
        return mvcBuilder.AddApplicationPart(typeof(TestController).Assembly);
    }
}
