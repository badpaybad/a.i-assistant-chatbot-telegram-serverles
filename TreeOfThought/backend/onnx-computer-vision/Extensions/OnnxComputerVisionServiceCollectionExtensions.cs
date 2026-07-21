using Microsoft.Extensions.DependencyInjection;
using Core.Infra.OnnxComputerVision.Services;
using Core.Infra.OnnxComputerVision.Controllers;

namespace Core.Infra.OnnxComputerVision.Extensions;

public static class OnnxComputerVisionServiceCollectionExtensions
{
    public static IServiceCollection AddOnnxComputerVision(this IServiceCollection services, string? detModelPath = null, string? lmkModelPath = null, string? recModelPath = null)
    {
        services.AddSingleton<IInsightFaceSkiaService>(sp => new InsightFaceSkiaService(detModelPath, lmkModelPath, recModelPath));
        return services;
    }

    public static IMvcBuilder AddOnnxComputerVisionControllers(this IMvcBuilder mvcBuilder)
    {
        return mvcBuilder.AddApplicationPart(typeof(OnnxComputerVisionController).Assembly);
    }
}
