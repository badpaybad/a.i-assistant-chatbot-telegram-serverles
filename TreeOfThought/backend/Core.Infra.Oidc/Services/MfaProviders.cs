using System;
using System.Threading.Tasks;
using Core.Infra.Oidc.Models;
using Core.Infra.Session.Interfaces;
using Microsoft.Extensions.Configuration;
using OtpNet;

namespace Core.Infra.Oidc.Services;

public class TotpMfaProvider : IMfaProvider
{
    private readonly IConfiguration _config;

    public TotpMfaProvider(IConfiguration config)
    {
        _config = config;
    }

    public string ProviderName => "Totp";

    public Task<MfaSetupResult> SetupAsync(User user)
    {
        var secretKeyBytes = KeyGeneration.GenerateRandomKey(20);
        var base32Secret = Base32Encoding.ToString(secretKeyBytes);
        var issuer = _config["Mfa:Providers:Totp:IssuerName"] ?? "TreeOfThought";
        var qrCodeUri = $"otpauth://totp/{issuer}:{user.Email}?secret={base32Secret}&issuer={issuer}";

        return Task.FromResult(new MfaSetupResult
        {
            Success = true,
            SecretKey = base32Secret,
            QrCodeUri = qrCodeUri
        });
    }

    public Task<bool> SendCodeAsync(User user)
    {
        // TOTP is offline; no need to send code
        return Task.FromResult(true);
    }

    public Task<bool> VerifyCodeAsync(User user, string code)
    {
        if (string.IsNullOrEmpty(user.MfaSecret))
        {
            return Task.FromResult(false);
        }

        try
        {
            // The secret key is passed in decrypted base32 format
            var bytes = Base32Encoding.ToBytes(user.MfaSecret);
            var totp = new Totp(bytes);
            bool isValid = totp.VerifyTotp(code, out _, new VerificationWindow(1, 1));
            return Task.FromResult(isValid);
        }
        catch
        {
            return Task.FromResult(false);
        }
    }
}

public class SmsMfaProvider : IMfaProvider
{
    private readonly IUserSessionService _sessionService;

    public SmsMfaProvider(IUserSessionService sessionService)
    {
        _sessionService = sessionService;
    }

    public string ProviderName => "Sms";

    public Task<MfaSetupResult> SetupAsync(User user)
    {
        var phone = "09******" + (user.Username.Length > 2 ? user.Username.Substring(user.Username.Length - 2) : "99");
        return Task.FromResult(new MfaSetupResult
        {
            Success = true,
            Destination = phone
        });
    }

    public async Task<bool> SendCodeAsync(User user)
    {
        var code = new Random().Next(100000, 999999).ToString();
        await _sessionService.SaveAuthCodeAsync($"mfa_code:sms:{user.Id}", code, TimeSpan.FromMinutes(5));
        
        Console.WriteLine($"[SMS MFA SIMULATION] Send to user '{user.Username}' - Code: {code}");
        return true;
    }

    public async Task<bool> VerifyCodeAsync(User user, string code)
    {
        var cached = await _sessionService.GetAuthCodeAsync<string>($"mfa_code:sms:{user.Id}");
        if (cached == code)
        {
            await _sessionService.RemoveAuthCodeAsync($"mfa_code:sms:{user.Id}");
            return true;
        }
        return false;
    }
}

public class EmailMfaProvider : IMfaProvider
{
    private readonly IUserSessionService _sessionService;

    public EmailMfaProvider(IUserSessionService sessionService)
    {
        _sessionService = sessionService;
    }

    public string ProviderName => "Email";

    public Task<MfaSetupResult> SetupAsync(User user)
    {
        var email = user.Email;
        var obfuscated = string.IsNullOrEmpty(email) ? "user@example.com" : 
            email.Substring(0, Math.Min(3, email.Length)) + "***" + email.Substring(email.IndexOf('@'));
            
        return Task.FromResult(new MfaSetupResult
        {
            Success = true,
            Destination = obfuscated
        });
    }

    public async Task<bool> SendCodeAsync(User user)
    {
        var code = new Random().Next(100000, 999999).ToString();
        await _sessionService.SaveAuthCodeAsync($"mfa_code:email:{user.Id}", code, TimeSpan.FromMinutes(5));
        
        Console.WriteLine($"[EMAIL MFA SIMULATION] Send to {user.Email} - Code: {code}");
        return true;
    }

    public async Task<bool> VerifyCodeAsync(User user, string code)
    {
        var cached = await _sessionService.GetAuthCodeAsync<string>($"mfa_code:email:{user.Id}");
        if (cached == code)
        {
            await _sessionService.RemoveAuthCodeAsync($"mfa_code:email:{user.Id}");
            return true;
        }
        return false;
    }
}
