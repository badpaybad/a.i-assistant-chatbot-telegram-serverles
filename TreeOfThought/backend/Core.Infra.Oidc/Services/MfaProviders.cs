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

    public Task<MfaSetupResult> SetupAsync(users_entity user)
    {
        var secretKeyBytes = KeyGeneration.GenerateRandomKey(20);
        var base32Secret = Base32Encoding.ToString(secretKeyBytes);
        var issuer = _config["Mfa:Providers:Totp:IssuerName"] ?? "TreeOfThought";
        var qrCodeUri = $"otpauth://totp/{issuer}:{user.email}?secret={base32Secret}&issuer={issuer}";

        return Task.FromResult(new MfaSetupResult
        {
            Success = true,
            SecretKey = base32Secret,
            QrCodeUri = qrCodeUri
        });
    }

    public Task<bool> SendCodeAsync(users_entity user)
    {
        // TOTP is offline; no need to send code
        return Task.FromResult(true);
    }

    public Task<bool> VerifyCodeAsync(users_entity user, string code)
    {
        if (string.IsNullOrEmpty(user.mfa_secret))
        {
            return Task.FromResult(false);
        }

        try
        {
            // The secret key is passed in decrypted base32 format
            var bytes = Base32Encoding.ToBytes(user.mfa_secret);
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

    public Task<MfaSetupResult> SetupAsync(users_entity user)
    {
        var phone = "09******" + (user.username.Length > 2 ? user.username.Substring(user.username.Length - 2) : "99");
        return Task.FromResult(new MfaSetupResult
        {
            Success = true,
            Destination = phone
        });
    }

    public async Task<bool> SendCodeAsync(users_entity user)
    {
        var code = new Random().Next(100000, 999999).ToString();
        await _sessionService.SaveAuthCodeAsync($"mfa_code:sms:{user.id}", code, TimeSpan.FromMinutes(5));
        
        Console.WriteLine($"[SMS MFA SIMULATION] Send to user '{user.username}' - Code: {code}");
        return true;
    }

    public async Task<bool> VerifyCodeAsync(users_entity user, string code)
    {
        var cached = await _sessionService.GetAuthCodeAsync<string>($"mfa_code:sms:{user.id}");
        if (cached == code)
        {
            await _sessionService.RemoveAuthCodeAsync($"mfa_code:sms:{user.id}");
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

    public Task<MfaSetupResult> SetupAsync(users_entity user)
    {
        var email = user.email;
        var obfuscated = string.IsNullOrEmpty(email) ? "user@example.com" : 
            email.Substring(0, Math.Min(3, email.Length)) + "***" + email.Substring(email.IndexOf('@'));
            
        return Task.FromResult(new MfaSetupResult
        {
            Success = true,
            Destination = obfuscated
        });
    }

    public async Task<bool> SendCodeAsync(users_entity user)
    {
        var code = new Random().Next(100000, 999999).ToString();
        await _sessionService.SaveAuthCodeAsync($"mfa_code:email:{user.id}", code, TimeSpan.FromMinutes(5));
        
        Console.WriteLine($"[EMAIL MFA SIMULATION] Send to {user.email} - Code: {code}");
        return true;
    }

    public async Task<bool> VerifyCodeAsync(users_entity user, string code)
    {
        var cached = await _sessionService.GetAuthCodeAsync<string>($"mfa_code:email:{user.id}");
        if (cached == code)
        {
            await _sessionService.RemoveAuthCodeAsync($"mfa_code:email:{user.id}");
            return true;
        }
        return false;
    }
}
