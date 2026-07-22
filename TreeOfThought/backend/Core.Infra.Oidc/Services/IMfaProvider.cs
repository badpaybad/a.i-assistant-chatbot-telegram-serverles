using System.Threading.Tasks;
using Core.Infra.Oidc.Models;

namespace Core.Infra.Oidc.Services;

public interface IMfaProvider
{
    string ProviderName { get; }

    Task<MfaSetupResult> SetupAsync(User user);
    
    Task<bool> SendCodeAsync(User user);
    
    Task<bool> VerifyCodeAsync(User user, string code);
}

public class MfaSetupResult
{
    public bool Success { get; set; }
    public string? SecretKey { get; set; }
    public string? QrCodeUri { get; set; }
    public string? Destination { get; set; }
}
