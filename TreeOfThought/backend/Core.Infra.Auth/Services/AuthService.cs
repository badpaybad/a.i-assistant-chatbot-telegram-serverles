using Core.Infra.Auth.Models;
using Core.Infra.Auth.Repositories;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Core.Infra.Firebase.Services;
using Microsoft.Extensions.Configuration;

namespace Core.Infra.Auth.Services;

public class AuthService
{
    private readonly IConfiguration _config;
    private readonly IAuthRepository _userRepo;
    private readonly FirebaseService _firebaseService;
    private readonly Core.Infra.Base.Interfaces.ICacheService _cacheService;

    public AuthService(IConfiguration config, IAuthRepository userRepo, FirebaseService firebaseService, Core.Infra.Base.Interfaces.ICacheService cacheService)
    {
        _config = config;
        _userRepo = userRepo;
        _firebaseService = firebaseService;
        _cacheService = cacheService;
    }

    public async Task InitializeAsync()
    {
        await _userRepo.EnsureTablesCreatedAsync();
        
        var adminUser = _config["Admin:Username"] ?? "admin";
        var adminPass = _config["Admin:Password"] ?? "Admin123!";
        var adminEmail = _config["Admin:Email"] ?? "admin@example.com";
        
        await _userRepo.EnsureAdminExistsAsync(adminUser, adminPass, adminEmail);
    }

    public async Task<string> GenerateJwtToken(User user)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Secret"]!));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()), 
            new Claim("preferred_username", user.Username),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.Name, user.DisplayName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64),
            new Claim("userId", user.Id.ToString())
        };

        // Add Effective Claims with Hybrid Strategy
        var claimsList = await _userRepo.GetUserEffectiveClaimsAsync(user.Id);
        
        if (claimsList.Count > 30)
        {
            // Hybrid Mode: Add Roles to JWT, move granular claims to Redis
            var roles = await _userRepo.GetUserRolesAsync(user.Id);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role.Name));
            }
            
            // Sync claims to Redis to ensure they are available
            await SyncUserClaimsToRedisAsync(user.Id);
        }
        else
        {
            // Stateless Mode: Add all granular claims to JWT
            foreach (var p in claimsList)
            {
                claims.Add(new Claim("claims", p.Name));
            }
        }

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddMinutes(double.Parse(_config["Jwt:ExpiryMinutes"] ?? "60")),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public async Task<string> GenerateFirebaseToken(User user)
    {
        return await _firebaseService.CreateCustomTokenAsync("Default", user.Id.ToString());
    }

    public async Task<User?> AuthenticateAsync(string username, string password)
    {
        var user = await _userRepo.GetUserByUsernameAsync(username);
        if (user != null && BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
        {
            if (!user.IsEmailVerified) throw new Exception("Email not verified");
            return user;
        }
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
        foreach (var name in claimNames)
        {
            var p = await _userRepo.GetClaimByNameAsync(name);
            if (p == null)
            {
                await _userRepo.CreateClaimAsync(new AppClaim { Name = name, CreatedAt = DateTime.UtcNow });
            }
        }
    }

    public async Task SyncUserClaimsToRedisAsync(Guid userId)
    {
        var claims = await _userRepo.GetUserEffectiveClaimsAsync(userId);
        var claimNames = claims.Select(c => c.Name).ToList();
        
        // Key format: claims:{userId}
        var cacheKey = $"claims:{userId}";
        await _cacheService.SetAsync(cacheKey, claimNames, TimeSpan.FromHours(24));
        
        Console.WriteLine($"[CLAIMS SYNC] User: {userId}, Synced {claimNames.Count} granular claims to Redis.");
    }

    public async Task SyncUserAclToRedisAsync(Guid userId)
    {
        var aclEntries = await _userRepo.GetUserAclEntriesAsync(userId);
        
        // Group by ResourceType and ResourceId to calculate ORed bitmask
        var groupedAcl = aclEntries
            .GroupBy(a => new { a.ResourceType, a.ResourceId })
            .Select(g => new { 
                Key = $"acl:{userId}:{g.Key.ResourceType}:{g.Key.ResourceId}", 
                Mask = g.Aggregate(0, (current, entry) => current | entry.PermissionMask)
            });

        foreach (var entry in groupedAcl)
        {
            // Set ACL in Redis with 24h expiry
            await _cacheService.SetAsync(entry.Key, entry.Mask, TimeSpan.FromHours(24));
        }
        
        Console.WriteLine($"[ACL SYNC] User: {userId}, Synced {groupedAcl.Count()} bitmasked resource keys to Redis.");
    }
}


