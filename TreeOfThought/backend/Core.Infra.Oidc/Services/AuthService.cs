using Core.Infra.Session.Interfaces;
using Core.Infra.Auth.Interfaces;
using Core.Infra.Session.Models;
using Core.Infra.Oidc.Models;
using Core.Infra.Oidc.Repositories;
using Core.Infra.Firebase.Services;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Infra.Oidc.Services;

public class AuthService
{
    private readonly IConfiguration _config;
    private readonly IAuthRepository _userRepo;
    private readonly FirebaseService _firebaseService;
    private readonly IUserSessionService _sessionService;
    private readonly IJwtService _jwtService;
    private readonly IEnumerable<IMfaProvider> _mfaProviders;

    private static bool _isBeClaimsSynced = false;
    private static bool _isFeClaimsSynced = false;
    private static readonly System.Threading.SemaphoreSlim _syncLock = new System.Threading.SemaphoreSlim(1, 1);

    public AuthService(
        IConfiguration config, 
        IAuthRepository userRepo, 
        FirebaseService firebaseService, 
        IUserSessionService sessionService,
        IJwtService jwtService,
        IEnumerable<IMfaProvider> mfaProviders)
    {
        _config = config;
        _userRepo = userRepo;
        _firebaseService = firebaseService;
        _sessionService = sessionService;
        _jwtService = jwtService;
        _mfaProviders = mfaProviders;
    }

    public async Task InitializeAsync()
    {
        await _userRepo.EnsureTablesCreatedAsync();
        
        var adminUser = _config["Oidc:Admin:Username"] ?? "admin";
        var adminPass = _config["Oidc:Admin:Password"] ?? "admin123";
        var adminEmail = _config["Oidc:Admin:Email"] ?? "admin@example.com";
        
        await _userRepo.EnsureAdminExistsAsync(adminUser, adminPass, adminEmail);
    }

    public async Task<string> GenerateJwtToken(users_entity user, string? audience = null, string? nonce = null)
    {
        var roles = (await _userRepo.GetUserRolesAsync(user.id)).Select(r => r.name).ToList();
        var claims = (await _userRepo.GetUserEffectiveClaimsAsync(user.id)).Select(c => c.name).ToList();

        // 1. Sync session state to Redis
        if (claims.Count > 30)
        {
            await _sessionService.SetUserClaimsAsync(user.id, claims);
        }

        // 2. Sync ACL to Redis
        await SyncUserAclToRedisAsync(user.id);

        // 3. Generate token
        return await _jwtService.GenerateTokenAsync(user.id, user.username, user.email, user.display_name, roles, claims, user.avatar_url, audience, nonce);
    }

    public async Task<string> GenerateFirebaseToken(users_entity user)
    {
        return await _firebaseService.CreateCustomTokenAsync("Default", user.id.ToString());
    }

    public async Task<string> GenerateFirebaseAccessTokenAsync()
    {
        return await _firebaseService.GetGoogleAccessTokenAsync("Default");
    }

    public async Task<users_entity?> AuthenticateAsync(string username, string password)
    {
        var user = await _userRepo.GetUserByUsernameAsync(username);
        if (user == null)
        {
            Console.WriteLine($"[AUTH] Login failed: User '{username}' not found");
            return null;
        }

        if (BCrypt.Net.BCrypt.Verify(password, user.password_hash))
        {
            if (!user.is_email_verified) throw new Exception("Email not verified");
            return user;
        }
        
        Console.WriteLine($"[AUTH] Login failed: Invalid password for user '{username}'");
        return null;
    }

    public async Task<users_entity> SignupAsync(string username, string password, string displayName, string email)
    {
        if (await _userRepo.GetUserByUsernameAsync(username) != null) throw new Exception("Username already exists");
        if (await _userRepo.GetUserByEmailAsync(email) != null) throw new Exception("Email already exists");

        var user = new users_entity
        {
            username = username,
            password_hash = BCrypt.Net.BCrypt.HashPassword(password),
            display_name = displayName,
            email = email,
            is_email_verified = false,
            verification_code = Guid.NewGuid().ToString("N").Substring(0, 8),
            created_at = DateTime.UtcNow
        };

        await _userRepo.CreateUserAsync(user);
        
        // Assign default "User" role if exists
        var userRole = await _userRepo.GetRoleByNameAsync("User");
        if (userRole != null)
        {
            await _userRepo.AssignRoleToUserAsync(user.id, userRole.id);
        }
        
        Console.WriteLine($"[EMAIL SIMULATION] To: {email}, Code: {user.verification_code}, Link: http://localhost:5000/api/auth/verify?email={email}&code={user.verification_code}");
        
        return user;
    }

    public async Task<bool> VerifyEmailAsync(string email, string code)
    {
        var user = await _userRepo.GetUserByEmailAsync(email);
        if (user != null && user.verification_code == code)
        {
            user.is_email_verified = true;
            user.verification_code = null;
            await _userRepo.UpdateUserAsync(user);
            return true;
        }
        return false;
    }

    public async Task<users_entity> SsoLoginAsync(string provider, string ssoId, string email, string displayName, string? idToken = null)
    {
        if (!string.IsNullOrEmpty(idToken))
        {
            try
            {
                var decodedToken = await _firebaseService.VerifyIdTokenAsync("Default", idToken);
                ssoId = decodedToken.Uid;
                email = decodedToken.Claims.ContainsKey("email") ? decodedToken.Claims["email"].ToString()! : email;
                displayName = decodedToken.Claims.ContainsKey("name") ? decodedToken.Claims["name"].ToString()! : displayName;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Token verification failed: {ex.Message}");
            }
        }

        if (string.IsNullOrEmpty(email)) throw new Exception("Email is required for SSO login");

        var user = await _userRepo.GetUserByEmailAsync(email);
        
        if (user == null)
        {
            var userEmail = await _userRepo.GetUserEmailByValueAsync(email);
            if (userEmail != null && userEmail.is_verified)
            {
                user = await _userRepo.GetUserByIdAsync(userEmail.user_id);
            }
        }

        if (user == null)
        {
            user = new users_entity
            {
                username = $"{provider}_{ssoId}",
                display_name = displayName,
                email = email,
                is_email_verified = true, // SSO provider already verified it
                sso_provider = provider,
                sso_id = ssoId,
                created_at = DateTime.UtcNow
            };
            await _userRepo.CreateUserAsync(user);

            var userRole = await _userRepo.GetRoleByNameAsync("User");
            if (userRole != null)
            {
                await _userRepo.AssignRoleToUserAsync(user.id, userRole.id);
            }
        }
        else
        {
            if (user.email == email && !user.is_email_verified)
            {
                throw new Exception("Primary email not verified. SSO login blocked.");
            }
            
            user.sso_provider = provider;
            user.sso_id = ssoId;
            await _userRepo.UpdateUserAsync(user);
        }
        return user;
    }

    public async Task<bool> CheckAclAsync(Guid? userId, List<string> roleNames, string resourceType, string resourceId, int actionMask)
    {
        return await _userRepo.CheckAclAsync(userId, roleNames, resourceType, resourceId, actionMask);
    }

    public async Task<users_entity?> GetUserByIdAsync(Guid id)
    {
        return await _userRepo.GetUserByIdAsync(id);
    }

    public async Task SyncClaimsAsync(string version, List<string> claimNames)
    {
        Console.WriteLine($"[CLAIM SYNC] Version: {version}, Count: {claimNames.Count}");
        await UpsertClaimsAsync(claimNames, "Frontend Sync", isBeSource: false);
    }

    public async Task UpsertClaimsAsync(IEnumerable<string> claimNames, string source, bool isBeSource)
    {
        if (claimNames == null || !claimNames.Any()) return;
        
        if (isBeSource && _isBeClaimsSynced) return;
        if (!isBeSource && _isFeClaimsSynced) return;

        await _syncLock.WaitAsync();
        try
        {
            if (isBeSource && _isBeClaimsSynced) return;
            if (!isBeSource && _isFeClaimsSynced) return;

            var (existingClaims, _) = await _userRepo.GetAllClaimsAsync();
            var existingNames = new HashSet<string>(existingClaims.Select(c => c.name), StringComparer.OrdinalIgnoreCase);

            var missingClaims = claimNames
                .Where(name => !string.IsNullOrEmpty(name) && !existingNames.Contains(name))
                .Distinct()
                .ToList();

            if (missingClaims.Any())
            {
                Console.WriteLine($"[{source}] Found {missingClaims.Count} new claims. Inserting...");
                foreach (var name in missingClaims)
                {
                    await _userRepo.CreateClaimAsync(new app_claims_entity 
                    { 
                        name = name, 
                        description = $"Automatically created from {source}",
                        created_at = DateTime.UtcNow 
                    });
                    Console.WriteLine($"[{source}] Created claim: {name}");
                }
            }

            if (isBeSource) _isBeClaimsSynced = true;
            else _isFeClaimsSynced = true;
        }
        finally
        {
            _syncLock.Release();
        }
    }

    public async Task SyncUserClaimsToRedisAsync(Guid userId)
    {
        var claims = await _userRepo.GetUserEffectiveClaimsAsync(userId);
        var claimNames = claims.Select(c => c.name).ToList();
        
        await _sessionService.SetUserClaimsAsync(userId, claimNames);
        
        Console.WriteLine($"[CLAIMS SYNC] User: {userId}, Synced {claimNames.Count} granular claims to Redis.");
    }

    public async Task RemoveUserClaimsFromRedisAsync(Guid userId)
    {
        await _sessionService.RemoveUserClaimsAsync(userId);
        Console.WriteLine($"[CLAIMS REMOVE] User: {userId}, Removed granular claims from Redis.");
    }

    public async Task SyncUserAclToRedisAsync(Guid userId)
    {
        var aclEntries = await _userRepo.GetUserAclEntriesAsync(userId);
        
        var groupedAcl = aclEntries
            .GroupBy(a => new { a.resource_type, a.resource_id })
            .Select(g => new { 
                g.Key.resource_type, 
                g.Key.resource_id, 
                Mask = g.Aggregate(0, (current, entry) => current | entry.permission_mask)
            });

        foreach (var entry in groupedAcl)
        {
            await _sessionService.SetUserAclAsync(userId, entry.resource_type, entry.resource_id, entry.Mask);
        }
        
        Console.WriteLine($"[ACL SYNC] User: {userId}, Synced {groupedAcl.Count()} bitmasked resource keys to Redis.");
    }

    public async Task<bool> ChangePasswordAsync(Guid userId, string currentPassword, string newPassword)
    {
        var user = await _userRepo.GetUserByIdAsync(userId);
        if (user == null) return false;

        if (!BCrypt.Net.BCrypt.Verify(currentPassword, user.password_hash))
        {
            return false;
        }

        user.password_hash = BCrypt.Net.BCrypt.HashPassword(newPassword);
        user.must_change_password = false;
        await _userRepo.UpdateUserAsync(user);
        return true;
    }

    public async Task<string> GenerateAuthorizationCodeAsync(Guid userId, string clientId, string redirectUri, string? nonce = null, string? codeChallenge = null, string? codeChallengeMethod = null, string? scopes = null)
    {
        var code = Guid.NewGuid().ToString("N");
        var data = new AuthCodeData
        {
            UserId = userId,
            ClientId = clientId,
            RedirectUri = redirectUri,
            Nonce = nonce,
            CodeChallenge = codeChallenge,
            CodeChallengeMethod = string.IsNullOrEmpty(codeChallengeMethod) && !string.IsNullOrEmpty(codeChallenge) ? "plain" : codeChallengeMethod,
            Scopes = scopes
        };

        await _sessionService.SaveAuthCodeAsync(code, data);
        return code;
    }

    public async Task<(users_entity? User, string? Nonce)> ExchangeCodeForTokenAsync(string code, string clientId, string? codeVerifier = null)
    {
        var data = await _sessionService.GetAuthCodeAsync<AuthCodeData>(code);

        if (data == null || data.ClientId != clientId)
        {
            Console.WriteLine($"[OIDC PKCE] Token exchange failed: Code not found or ClientId mismatch.");
            return (null, null);
        }

        if (!string.IsNullOrEmpty(data.CodeChallenge))
        {
            if (string.IsNullOrEmpty(codeVerifier))
            {
                Console.WriteLine($"[OIDC PKCE] Token exchange failed: CodeVerifier is missing but CodeChallenge was provided during authorization.");
                return (null, null);
            }

            if (data.CodeChallengeMethod == "S256")
            {
                using var sha256 = System.Security.Cryptography.SHA256.Create();
                var hash = sha256.ComputeHash(System.Text.Encoding.ASCII.GetBytes(codeVerifier));
                var base64url = Microsoft.IdentityModel.Tokens.Base64UrlEncoder.Encode(hash);
                if (base64url != data.CodeChallenge)
                {
                    Console.WriteLine($"[OIDC PKCE] Token exchange failed: S256 CodeVerifier hash does not match CodeChallenge.");
                    return (null, null);
                }
            }
            else // "plain"
            {
                if (codeVerifier != data.CodeChallenge)
                {
                    Console.WriteLine($"[OIDC PKCE] Token exchange failed: plain CodeVerifier does not match CodeChallenge.");
                    return (null, null);
                }
            }
        }

        await _sessionService.RemoveAuthCodeAsync(code);

        var user = await _userRepo.GetUserByIdAsync(data.UserId);
        return (user, data.Nonce);
    }

    public IMfaProvider GetMfaProvider(string providerName)
    {
        return _mfaProviders.FirstOrDefault(p => p.ProviderName.Equals(providerName, StringComparison.OrdinalIgnoreCase))
            ?? throw new NotSupportedException($"MFA Provider '{providerName}' is not supported.");
    }

    private string EncryptSecret(string plainText)
    {
        var encryptionKey = _config["Mfa:EncryptionKey"] ?? "TreeOfThoughtSecretKeyForMfaAES256";
        if (Core.Infra.Base.StringCipher.AesEncript(plainText, encryptionKey, out string encrypted))
        {
            return encrypted;
        }
        throw new Exception("MFA secret encryption failed");
    }

    private string DecryptSecret(string cipherText)
    {
        var encryptionKey = _config["Mfa:EncryptionKey"] ?? "TreeOfThoughtSecretKeyForMfaAES256";
        if (Core.Infra.Base.StringCipher.AesDecript(cipherText, encryptionKey, out string decrypted))
        {
            return decrypted;
        }
        throw new Exception("MFA secret decryption failed");
    }

    public async Task<MfaSetupResult> SetupMfaAsync(Guid userId, string providerName)
    {
        var user = await _userRepo.GetUserByIdAsync(userId);
        if (user == null) throw new Exception("User not found");

        var provider = GetMfaProvider(providerName);
        var result = await provider.SetupAsync(user);
        
        if (result.Success)
        {
            if (!string.IsNullOrEmpty(result.SecretKey))
            {
                var cacheKey = $"pending_mfa_secret:{user.id}";
                await _sessionService.SaveAuthCodeAsync(cacheKey, result.SecretKey, TimeSpan.FromMinutes(10));
            }

            if (!providerName.Equals("Totp", StringComparison.OrdinalIgnoreCase))
            {
                await provider.SendCodeAsync(user);
            }
        }

        return result;
    }

    public async Task<List<string>?> VerifyAndEnableMfaAsync(Guid userId, string providerName, string code)
    {
        var user = await _userRepo.GetUserByIdAsync(userId);
        if (user == null) throw new Exception("User not found");

        var provider = GetMfaProvider(providerName);
        
        string secret;
        if (providerName.Equals("Totp", StringComparison.OrdinalIgnoreCase))
        {
            var cacheKey = $"pending_mfa_secret:{user.id}";
            var cachedSecret = await _sessionService.GetAuthCodeAsync<string>(cacheKey);
            if (string.IsNullOrEmpty(cachedSecret)) return null;
            secret = cachedSecret;
        }
        else
        {
            secret = providerName;
        }

        var tempUser = new users_entity { email = user.email, username = user.username, mfa_secret = secret, id = user.id };
        bool isValid = await provider.VerifyCodeAsync(tempUser, code);
        
        if (isValid)
        {
            user.is_mfa_enabled = true;
            user.preferred_mfa_provider = providerName;
            
            if (providerName.Equals("Totp", StringComparison.OrdinalIgnoreCase))
            {
                user.mfa_secret = EncryptSecret(secret);
                await _sessionService.RemoveAuthCodeAsync($"pending_mfa_secret:{user.id}");
            }
            
            var recoveryCodes = new List<string>();
            var rawRecoveryCodes = new List<string>();
            for (int i = 0; i < 5; i++)
            {
                var rc = new Random().Next(10000000, 99999999).ToString();
                rawRecoveryCodes.Add(rc);
                recoveryCodes.Add(BCrypt.Net.BCrypt.HashPassword(rc));
            }
            user.mfa_backup_codes = string.Join(",", recoveryCodes);
            
            await _userRepo.UpdateUserAsync(user);
            
            Console.WriteLine($"[MFA] MFA enabled for user {user.username}. Backup codes: {string.Join(", ", rawRecoveryCodes)}");
            return rawRecoveryCodes;
        }

        return null;
    }

    public async Task<bool> DisableMfaAsync(Guid userId, string code)
    {
        var user = await _userRepo.GetUserByIdAsync(userId);
        if (user == null || !user.is_mfa_enabled) return false;

        var providerName = user.preferred_mfa_provider ?? "Totp";
        var provider = GetMfaProvider(providerName);

        var decryptedUser = new users_entity
        {
            id = user.id,
            username = user.username,
            email = user.email,
            mfa_secret = providerName.Equals("Totp", StringComparison.OrdinalIgnoreCase) && !string.IsNullOrEmpty(user.mfa_secret) 
                ? DecryptSecret(user.mfa_secret) 
                : null
        };

        bool isValid = await provider.VerifyCodeAsync(decryptedUser, code);
        if (!isValid)
        {
            if (!string.IsNullOrEmpty(user.mfa_backup_codes))
            {
                var codes = user.mfa_backup_codes.Split(',');
                foreach (var hashedCode in codes)
                {
                    if (BCrypt.Net.BCrypt.Verify(code, hashedCode))
                    {
                        isValid = true;
                        user.mfa_backup_codes = string.Join(",", codes.Where(c => c != hashedCode));
                        break;
                    }
                }
            }
        }

        if (isValid)
        {
            user.is_mfa_enabled = false;
            user.mfa_secret = null;
            user.mfa_backup_codes = null;
            user.preferred_mfa_provider = null;
            await _userRepo.UpdateUserAsync(user);
            return true;
        }

        return false;
    }

    public async Task<bool> VerifyMfaCodeAsync(users_entity user, string code)
    {
        if (!user.is_mfa_enabled) return true;

        var providerName = user.preferred_mfa_provider ?? "Totp";
        var provider = GetMfaProvider(providerName);

        var decryptedUser = new users_entity
        {
            id = user.id,
            username = user.username,
            email = user.email,
            mfa_secret = providerName.Equals("Totp", StringComparison.OrdinalIgnoreCase) && !string.IsNullOrEmpty(user.mfa_secret) 
                ? DecryptSecret(user.mfa_secret) 
                : null
        };

        bool isValid = await provider.VerifyCodeAsync(decryptedUser, code);
        if (!isValid && !string.IsNullOrEmpty(user.mfa_backup_codes))
        {
            var codes = user.mfa_backup_codes.Split(',');
            foreach (var hashedCode in codes)
            {
                if (BCrypt.Net.BCrypt.Verify(code, hashedCode))
                {
                    isValid = true;
                    user.mfa_backup_codes = string.Join(",", codes.Where(c => c != hashedCode));
                    await _userRepo.UpdateUserAsync(user);
                    break;
                }
            }
        }

        return isValid;
    }
}
