using Core.Infra.Session.Interfaces;
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

namespace Core.Infra.Session.Services;

public class JwtService : IJwtService
{
    private readonly IConfiguration _config;

    public JwtService(IConfiguration config)
    {
        _config = config;
    }

    public async Task<string> GenerateTokenAsync(Guid userId, string username, string email, string displayName, List<string> roles, List<string> claims)
    {
        var rsa = RSA.Create();
        var pem = GetRsaPrivateKey();
        rsa.ImportFromPem(pem);
        var securityKey = new RsaSecurityKey(rsa) { KeyId = _config["Jwt:Kid"] ?? "tot-v1" };
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
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: jwtClaims,
            notBefore: DateTime.UtcNow,
            expires: DateTime.UtcNow.AddMinutes(double.Parse(_config["Jwt:ExpiryMinutes"] ?? "60")),
            signingCredentials: credentials);

        return await Task.FromResult(new JwtSecurityTokenHandler().WriteToken(token));
    }

    private string GetRsaPrivateKey()
    {
        var pem = _config["Jwt:RsaPrivateKey"] ?? "";
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
