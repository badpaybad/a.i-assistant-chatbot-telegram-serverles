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

    private static bool _isBeClaimsSynced = false;
    private static bool _isFeClaimsSynced = false;
    private static readonly System.Threading.SemaphoreSlim _syncLock = new System.Threading.SemaphoreSlim(1, 1);

    public AuthService(
        IConfiguration config, 
        IAuthRepository userRepo, 
        FirebaseService firebaseService, 
        IUserSessionService sessionService,
        IJwtService jwtService)
    {
        _config = config;
        _userRepo = userRepo;
        _firebaseService = firebaseService;
        _sessionService = sessionService;
        _jwtService = jwtService;
    }

    public async Task InitializeAsync()
    {
        await _userRepo.EnsureTablesCreatedAsync();
        
        var adminUser = _config["Oidc:Admin:Username"] ?? "admin";
        var adminPass = _config["Oidc:Admin:Password"] ?? "admin123";
        var adminEmail = _config["Oidc:Admin:Email"] ?? "admin@example.com";
        
        await _userRepo.EnsureAdminExistsAsync(adminUser, adminPass, adminEmail);
    }

    public async Task<string> GenerateJwtToken(User user)
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
        return await _jwtService.GenerateTokenAsync(user.Id, user.Username, user.Email, user.DisplayName, roles, claims, user.AvatarUrl);
    }


    public async Task<string> GenerateFirebaseToken(User user)
    {
        return await _firebaseService.CreateCustomTokenAsync("Default", user.Id.ToString());
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
            var existingClaims = await _userRepo.GetAllClaimsAsync();
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

    public async Task<string> GenerateAuthorizationCodeAsync(Guid userId, string clientId, string redirectUri)
    {
        var code = Guid.NewGuid().ToString("N");
        var data = new AuthCodeData
        {
            UserId = userId,
            ClientId = clientId,
            RedirectUri = redirectUri
        };

        await _sessionService.SaveAuthCodeAsync(code, data);
        return code;
    }

    public async Task<User?> ExchangeCodeForTokenAsync(string code, string clientId)
    {
        var data = await _sessionService.GetAuthCodeAsync<AuthCodeData>(code);

        if (data == null || data.ClientId != clientId)
        {
            return null;
        }

        // Remove code after use (One-time use)
        await _sessionService.RemoveAuthCodeAsync(code);

        return await _userRepo.GetUserByIdAsync(data.UserId);
    }
}


