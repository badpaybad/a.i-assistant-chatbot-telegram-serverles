using Core.Infra.CqrsDashboard.Controllers;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Core.Infra.CqrsDashboard.Extensions;

public static class ServiceCollectionExtensions
{
    public static IMvcBuilder AddCqrsDashboardControllers(this IMvcBuilder mvcBuilder)
    {
        return mvcBuilder.AddApplicationPart(typeof(CqrsDashboardController).Assembly);
    }
}
