using System.Threading.Tasks;
using Core.Infra.Oidc.Models;

namespace Core.Infra.Oidc.Services;

public class MfaSetupResult
{
    public bool Success { get; set; }
    public string? SecretKey { get; set; }
    public string? QrCodeUri { get; set; }
    public string? Destination { get; set; }
}

public interface IMfaProvider
{
    string ProviderName { get; }
    Task<MfaSetupResult> SetupAsync(users_entity user);
    Task<bool> SendCodeAsync(users_entity user);
    Task<bool> VerifyCodeAsync(users_entity user, string code);
}
