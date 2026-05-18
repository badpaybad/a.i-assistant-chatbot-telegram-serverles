using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;

namespace Core.Infra.Auth.Interfaces;

public interface IJwtService
{
    Task<string> GenerateTokenAsync(Guid userId, string username, string email, string displayName, List<string> roles, List<string> claims, string? avatarUrl = null, string? nonce = null);
    JsonWebKey GetJwks();
    string GetRsaPrivateKey();
}
