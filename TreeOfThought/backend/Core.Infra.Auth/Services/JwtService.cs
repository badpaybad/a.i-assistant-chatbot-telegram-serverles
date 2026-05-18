using Core.Infra.Auth.Interfaces;
using Core.Infra.Session.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Core.Infra.Auth.Services;

public class JwtService : IJwtService
{
    private readonly IConfiguration _config;

    IConfiguration authConfig;

    public JwtService(IConfiguration config)
    {
        _config = config;

        authConfig = _config.GetSection("Auth");
    }

    public async Task<string> GenerateTokenAsync(Guid userId, string username, string email, string displayName, List<string> roles, List<string> claims, string? avatarUrl = null, string? audience = null, string? nonce = null)
    {
        var rsa = RSA.Create();
        var pem = GetRsaPrivateKey();
        rsa.ImportFromPem(pem);
        var securityKey = new RsaSecurityKey(rsa) { KeyId = authConfig["Jwt:Kid"]! };
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.RsaSha256);

        var jwtClaims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, userId.ToString()),
            new Claim("preferred_username", username),
            new Claim(JwtRegisteredClaimNames.Email, email),
            new Claim(JwtRegisteredClaimNames.Name, displayName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64),
            new Claim(AuthConstants.UserIdClaim, userId.ToString())
        };

        if (!string.IsNullOrEmpty(avatarUrl))
        {
            jwtClaims.Add(new Claim("picture", avatarUrl));
        }

        if (!string.IsNullOrEmpty(nonce))
        {
            jwtClaims.Add(new Claim("nonce", nonce));
        }

        // 1. Add Roles
        foreach (var role in roles)
        {
            jwtClaims.Add(new Claim(AuthConstants.RoleClaim, role));
        }

        // 2. Hybrid Logic: Only add claims if count is small (<= 30)
        // If > 30, they should be in Redis session only.
        if (claims != null && claims.Count <= 30)
        {
            foreach (var claim in claims)
            {
                jwtClaims.Add(new Claim(AuthConstants.PermissionClaim, claim));
            }
        }

        var token = new JwtSecurityToken(
            issuer: authConfig["Jwt:Issuer"],
            audience: !string.IsNullOrEmpty(audience) ? audience : authConfig["Jwt:Audience"],
            claims: jwtClaims,
            notBefore: DateTime.UtcNow,
            expires: DateTime.UtcNow.AddMinutes(double.Parse(authConfig["Jwt:ExpiryMinutes"] ?? "60")),
            signingCredentials: credentials);

        return await Task.FromResult(new JwtSecurityTokenHandler().WriteToken(token));
    }
    public JsonWebKey GetJwks()
    {
        return GetJwks(authConfig["Jwt:RsaPrivateKey"]!, authConfig["Jwt:Kid"]!);
    }
    public static JsonWebKey GetJwks(string privateKeyPem, string kid)
    {
        if (string.IsNullOrWhiteSpace(privateKeyPem))
        {
            throw new ArgumentException("Private key PEM is empty or null.", nameof(privateKeyPem));
        }

        using var rsa = RSA.Create();
        var cleanPem = JwtService.NormalizePem(privateKeyPem);
        var lines = cleanPem.Split('\n').ToList();

        try
        {
            // Try standard way first
            rsa.ImportFromPem(cleanPem);
        }
        catch
        {
            try
            {
                // Fallback: Manually extract base64 data
                var base64Builder = new StringBuilder();
                foreach (var line in lines)
                {
                    if (line.StartsWith("-----")) continue;
                    base64Builder.Append(line);
                }

                var rawBase64 = base64Builder.ToString();
                // Filter to ONLY base64 alphabet characters, ignoring padding for now
                var base64NoPadding = new string(rawBase64.Where(c =>
                    (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9') ||
                    c == '+' || c == '/').ToArray());

                // Re-add padding correctly
                var finalBase64 = base64NoPadding;
                switch (finalBase64.Length % 4)
                {
                    case 2: finalBase64 += "=="; break;
                    case 3: finalBase64 += "="; break;
                }

                var bytes = Convert.FromBase64String(finalBase64);

                if (cleanPem.Contains("RSA PRIVATE KEY"))
                {
                    rsa.ImportRSAPrivateKey(bytes, out _);
                }
                else
                {
                    rsa.ImportPkcs8PrivateKey(bytes, out _);
                }
            }
            catch (Exception innerEx)
            {
                throw new ArgumentException($"Failed to import RSA key. Length: {cleanPem.Length}. " +
                    $"Error: {innerEx.Message}. PEM snippet: {(cleanPem.Length > 50 ? cleanPem.Substring(0, 50) : cleanPem)}", innerEx);
            }
        }

        var parameters = rsa.ExportParameters(false);
        var jwk = new JsonWebKey
        {
            Kty = "RSA",
            Use = "sig",
            Alg = "RS256",
            Kid = kid,
            N = Convert.ToBase64String(parameters.Modulus!).Replace('+', '-').Replace('/', '_').TrimEnd('='),
            E = Convert.ToBase64String(parameters.Exponent!).Replace('+', '-').Replace('/', '_').TrimEnd('=')
        };
        return jwk;
    }

    public string GetRsaPrivateKey()
    {
        var pem = authConfig["Jwt:RsaPrivateKey"] ?? "";
        return NormalizePem(pem);
    }

    private static string NormalizePem(string pem)
    {
        if (string.IsNullOrWhiteSpace(pem)) return string.Empty;

        var cleaned = pem
            .Replace("\\n", "\n")
            .Replace("\\r", "\r")
            .Trim();

        var sb = new StringBuilder();
        foreach (var c in cleaned)
        {
            if (c == '\n' || c == '\r' || (c >= 32 && c <= 126))
            {
                sb.Append(c);
            }
        }
        cleaned = sb.ToString().Replace("\r", "");

        var lines = cleaned.Split('\n', StringSplitOptions.RemoveEmptyEntries)
            .Select(l => l.Trim())
            .Where(l => !string.IsNullOrEmpty(l))
            .ToList();

        return string.Join("\n", lines);
    }
}
