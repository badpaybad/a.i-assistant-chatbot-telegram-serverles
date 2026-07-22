using Core.Infra.Session.Interfaces;
using Core.Infra.Auth.Interfaces;
using Core.Infra.Session.Models;
using Core.Infra.Oidc.Models;
using Core.Infra.Oidc.Repositories;
using Core.Infra.Firebase.Services;
using Microsoft.Extensions.Configuration;

namespace Core.Infra.Oidc.Services;

public class AuthService
{
    private readonly IConfiguration _config;
    private readonly IAuthRepository _userRepo;
    private readonly FirebaseService _firebaseService;
    private readonly IUserSessionService _sessionService;
    private readonly IJwtService _jwtService;
    private readonly System.Collections.Generic.IEnumerable<IMfaProvider> _mfaProviders;

    private static bool _isBeClaimsSynced = false;
    private static bool _isFeClaimsSynced = false;
    private static readonly System.Threading.SemaphoreSlim _syncLock = new System.Threading.SemaphoreSlim(1, 1);

    public AuthService(
        IConfiguration config, 
        IAuthRepository userRepo, 
        FirebaseService firebaseService, 
        IUserSessionService sessionService,
        IJwtService jwtService,
        System.Collections.Generic.IEnumerable<IMfaProvider> mfaProviders)
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

    public async Task<string> GenerateJwtToken(User user, string? audience = null, string? nonce = null)
    {
        var roles = (await _userRepo.GetUserRolesAsync(user.Id)).Select(r => r.Name).ToList();
        var claims = (await _userRepo.GetUserEffectiveClaimsAsync(user.Id)).Select(c => c.Name).ToList();

        // 1. Sync session state to Redis (Hybrid strategy: roles in JWT, granular claims in Redis if too many)
        if (claims.Count > 30)
        {
            await _sessionService.SetUserClaimsAsync(user.Id, claims);
        }

        // 2. Sync ACL to Redis
        await SyncUserAclToRedisAsync(user.Id);

        // 3. Generate token
        return await _jwtService.GenerateTokenAsync(user.Id, user.Username, user.Email, user.DisplayName, roles, claims, user.AvatarUrl, audience, nonce);
    }


    public async Task<string> GenerateFirebaseToken(User user)
    {
        return await _firebaseService.CreateCustomTokenAsync("Default", user.Id.ToString());
    }

    public async Task<string> GenerateFirebaseAccessTokenAsync()
    {
        return await _firebaseService.GetGoogleAccessTokenAsync("Default");
    }

    public async Task<User?> AuthenticateAsync(string username, string password)
    {
        var user = await _userRepo.GetUserByUsernameAsync(username);
        if (user == null)
        {
            Console.WriteLine($"[AUTH] Login failed: User '{username}' not found");
            return null;
        }

        if (BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
        {
            if (!user.IsEmailVerified) throw new Exception("Email not verified");
            return user;
        }
        
        Console.WriteLine($"[AUTH] Login failed: Invalid password for user '{username}'");
        return null;
    }

    public async Task<User> SignupAsync(string username, string password, string displayName, string email)
    {
        if (await _userRepo.GetUserByUsernameAsync(username) != null) throw new Exception("Username already exists");
        if (await _userRepo.GetUserByEmailAsync(email) != null) throw new Exception("Email already exists");

        var user = new User
        {
            Username = username,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
            DisplayName = displayName,
            Email = email,
            IsEmailVerified = false,
            VerificationCode = Guid.NewGuid().ToString("N").Substring(0, 8),
            CreatedAt = DateTime.UtcNow
        };

        await _userRepo.CreateUserAsync(user);
        
        // Assign default "User" role if exists
        var userRole = await _userRepo.GetRoleByNameAsync("User");
        if (userRole != null)
        {
            await _userRepo.AssignRoleToUserAsync(user.Id, userRole.Id);
        }
        
        Console.WriteLine($"[EMAIL SIMULATION] To: {email}, Code: {user.VerificationCode}, Link: http://localhost:5000/api/auth/verify?email={email}&code={user.VerificationCode}");
        
        return user;
    }

    public async Task<bool> VerifyEmailAsync(string email, string code)
    {
        var user = await _userRepo.GetUserByEmailAsync(email);
        if (user != null && user.VerificationCode == code)
        {
            user.IsEmailVerified = true;
            user.VerificationCode = null;
            await _userRepo.UpdateUserAsync(user);
            return true;
        }
        return false;
    }

    public async Task<User> SsoLoginAsync(string provider, string ssoId, string email, string displayName, string? idToken = null)
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

        // Requirement: User can have many emails, but only 1 active verified email allowed for SSO
        var user = await _userRepo.GetUserByEmailAsync(email);
        
        if (user == null)
        {
            // Check if this email exists in UserEmails as a secondary but verified email
            var userEmail = await _userRepo.GetUserEmailByValueAsync(email);
            if (userEmail != null && userEmail.IsVerified)
            {
                user = await _userRepo.GetUserByIdAsync(userEmail.UserId);
            }
        }

        if (user == null)
        {
            // Create new user if not exists
            user = new User
            {
                Username = $"{provider}_{ssoId}",
                DisplayName = displayName,
                Email = email,
                IsEmailVerified = true, // SSO provider already verified it
                SsoProvider = provider,
                SsoId = ssoId,
                CreatedAt = DateTime.UtcNow
            };
            await _userRepo.CreateUserAsync(user);

            var userRole = await _userRepo.GetRoleByNameAsync("User");
            if (userRole != null)
            {
                await _userRepo.AssignRoleToUserAsync(user.Id, userRole.Id);
            }
        }
        else
        {
            // If user exists, ensure the email used for SSO is verified
            if (user.Email == email && !user.IsEmailVerified)
            {
                throw new Exception("Primary email not verified. SSO login blocked.");
            }
            
            user.SsoProvider = provider;
            user.SsoId = ssoId;
            await _userRepo.UpdateUserAsync(user);
        }
        return user;
    }

    public async Task<bool> CheckAclAsync(Guid? userId, List<string> roleNames, string resourceType, string resourceId, int actionMask)
    {
        return await _userRepo.CheckAclAsync(userId, roleNames, resourceType, resourceId, actionMask);
    }

    public async Task<User?> GetUserByIdAsync(Guid id)
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

            // 1. Get all existing claims from DB to memory for fast checking
            var (existingClaims, _) = await _userRepo.GetAllClaimsAsync();
            var existingNames = new HashSet<string>(existingClaims.Select(c => c.Name), StringComparer.OrdinalIgnoreCase);

            // 2. Identify missing claims
            var missingClaims = claimNames
                .Where(name => !string.IsNullOrEmpty(name) && !existingNames.Contains(name))
                .Distinct()
                .ToList();

            if (missingClaims.Any())
            {
                Console.WriteLine($"[{source}] Found {missingClaims.Count} new claims. Inserting...");
                foreach (var name in missingClaims)
                {
                    await _userRepo.CreateClaimAsync(new AppClaim 
                    { 
                        Name = name, 
                        Description = $"Automatically created from {source}",
                        CreatedAt = DateTime.UtcNow 
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
        var claimNames = claims.Select(c => c.Name).ToList();
        
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
        
        // Group by ResourceType and ResourceId to calculate ORed bitmask
        var groupedAcl = aclEntries
            .GroupBy(a => new { a.ResourceType, a.ResourceId })
            .Select(g => new { 
                g.Key.ResourceType, 
                g.Key.ResourceId, 
                Mask = g.Aggregate(0, (current, entry) => current | entry.PermissionMask)
            });

        foreach (var entry in groupedAcl)
        {
            await _sessionService.SetUserAclAsync(userId, entry.ResourceType, entry.ResourceId, entry.Mask);
        }
        
        Console.WriteLine($"[ACL SYNC] User: {userId}, Synced {groupedAcl.Count()} bitmasked resource keys to Redis.");
    }

    public async Task<bool> ChangePasswordAsync(Guid userId, string currentPassword, string newPassword)
    {
        var user = await _userRepo.GetUserByIdAsync(userId);
        if (user == null) return false;

        if (!BCrypt.Net.BCrypt.Verify(currentPassword, user.PasswordHash))
        {
            return false;
        }

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(newPassword);
        user.MustChangePassword = false;
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

    public async Task<(User? User, string? Nonce)> ExchangeCodeForTokenAsync(string code, string clientId, string? codeVerifier = null)
    {
        var data = await _sessionService.GetAuthCodeAsync<AuthCodeData>(code);

        if (data == null || data.ClientId != clientId)
        {
            Console.WriteLine($"[OIDC PKCE] Token exchange failed: Code not found or ClientId mismatch.");
            return (null, null);
        }

        // PKCE Validation
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

        // Remove code after use (One-time use)
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
        
        if (result.Success && !string.IsNullOrEmpty(result.SecretKey))
        {
            // Store the pending secret temporarily in Redis for verification before enabling
            var cacheKey = $"pending_mfa_secret:{user.Id}";
            await _sessionService.SaveAuthCodeAsync(cacheKey, result.SecretKey, TimeSpan.FromMinutes(10));
        }

        return result;
    }

    public async Task<bool> VerifyAndEnableMfaAsync(Guid userId, string providerName, string code)
    {
        var user = await _userRepo.GetUserByIdAsync(userId);
        if (user == null) throw new Exception("User not found");

        var provider = GetMfaProvider(providerName);
        
        string secret;
        if (providerName.Equals("Totp", StringComparison.OrdinalIgnoreCase))
        {
            var cacheKey = $"pending_mfa_secret:{user.Id}";
            var cachedSecret = await _sessionService.GetAuthCodeAsync<string>(cacheKey);
            if (string.IsNullOrEmpty(cachedSecret)) return false;
            secret = cachedSecret;
        }
        else
        {
            // For out-of-band MFA (SMS/Email), we verify using the provider's logic
            // (e.g. verifying the OTP sent to their device/email)
            secret = providerName;
        }

        // We create a temporary user object with the raw secret to verify
        var tempUser = new User { Email = user.Email, Username = user.Username, MfaSecret = secret, Id = user.Id };
        bool isValid = await provider.VerifyCodeAsync(tempUser, code);
        
        if (isValid)
        {
            user.IsMfaEnabled = true;
            user.PreferredMfaProvider = providerName;
            
            if (providerName.Equals("Totp", StringComparison.OrdinalIgnoreCase))
            {
                user.MfaSecret = EncryptSecret(secret);
                // Clean up cache
                await _sessionService.RemoveAuthCodeAsync($"pending_mfa_secret:{user.Id}");
            }
            
            // Generate recovery codes (simulated, e.g. 5 random codes)
            var recoveryCodes = new System.Collections.Generic.List<string>();
            var rawRecoveryCodes = new System.Collections.Generic.List<string>();
            for (int i = 0; i < 5; i++)
            {
                var rc = new Random().Next(10000000, 99999999).ToString();
                rawRecoveryCodes.Add(rc);
                recoveryCodes.Add(BCrypt.Net.BCrypt.HashPassword(rc));
            }
            user.MfaBackupCodes = string.Join(",", recoveryCodes);
            
            await _userRepo.UpdateUserAsync(user);
            
            Console.WriteLine($"[MFA] MFA enabled for user {user.Username}. Backup codes: {string.Join(", ", rawRecoveryCodes)}");
            return true;
        }

        return false;
    }

    public async Task<bool> DisableMfaAsync(Guid userId, string code)
    {
        var user = await _userRepo.GetUserByIdAsync(userId);
        if (user == null || !user.IsMfaEnabled) return false;

        var providerName = user.PreferredMfaProvider ?? "Totp";
        var provider = GetMfaProvider(providerName);

        var decryptedUser = new User
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            MfaSecret = providerName.Equals("Totp", StringComparison.OrdinalIgnoreCase) && !string.IsNullOrEmpty(user.MfaSecret) 
                ? DecryptSecret(user.MfaSecret) 
                : null
        };

        bool isValid = await provider.VerifyCodeAsync(decryptedUser, code);
        if (!isValid)
        {
            // Check if backup codes match
            if (!string.IsNullOrEmpty(user.MfaBackupCodes))
            {
                var codes = user.MfaBackupCodes.Split(',');
                foreach (var hashedCode in codes)
                {
                    if (BCrypt.Net.BCrypt.Verify(code, hashedCode))
                    {
                        isValid = true;
                        // Remove this code
                        user.MfaBackupCodes = string.Join(",", codes.Where(c => c != hashedCode));
                        break;
                    }
                }
            }
        }

        if (isValid)
        {
            user.IsMfaEnabled = false;
            user.MfaSecret = null;
            user.MfaBackupCodes = null;
            user.PreferredMfaProvider = null;
            await _userRepo.UpdateUserAsync(user);
            return true;
        }

        return false;
    }

    public async Task<bool> VerifyMfaCodeAsync(User user, string code)
    {
        if (!user.IsMfaEnabled) return true;

        var providerName = user.PreferredMfaProvider ?? "Totp";
        var provider = GetMfaProvider(providerName);

        var decryptedUser = new User
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            MfaSecret = providerName.Equals("Totp", StringComparison.OrdinalIgnoreCase) && !string.IsNullOrEmpty(user.MfaSecret) 
                ? DecryptSecret(user.MfaSecret) 
                : null
        };

        bool isValid = await provider.VerifyCodeAsync(decryptedUser, code);
        if (!isValid && !string.IsNullOrEmpty(user.MfaBackupCodes))
        {
            // Fallback to backup recovery codes
            var codes = user.MfaBackupCodes.Split(',');
            foreach (var hashedCode in codes)
            {
                if (BCrypt.Net.BCrypt.Verify(code, hashedCode))
                {
                    isValid = true;
                    // Remove used backup code
                    user.MfaBackupCodes = string.Join(",", codes.Where(c => c != hashedCode));
                    await _userRepo.UpdateUserAsync(user);
                    break;
                }
            }
        }

        return isValid;
    }
}


