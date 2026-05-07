using Core.Web.Api.Models;
using Core.Web.Api.Repositories;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Core.Infra.Firebase.Services;

namespace Core.Web.Api.Services;

public class AuthService
{
    private readonly IConfiguration _config;
    private readonly MockUserRepository _userRepo;
    private readonly FirebaseService _firebaseService;

    public AuthService(IConfiguration config, MockUserRepository userRepo, FirebaseService firebaseService)
    {
        _config = config;
        _userRepo = userRepo;
        _firebaseService = firebaseService;
    }

    public string GenerateJwtToken(User user)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Secret"]!));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Username),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim("userId", user.Id.ToString())
        };

        foreach (var claim in user.Claims)
        {
            claims.Add(new Claim("permissions", claim));
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
        // Use the app initialized in Program.cs
        return await _firebaseService.CreateCustomTokenAsync("Default", user.Id.ToString());
    }

    public User? Authenticate(string username, string password)
    {
        var user = _userRepo.GetByUsername(username);
        if (user != null && user.PasswordHash == password) // In real app, use BCrypt or similar
        {
            if (!user.IsEmailVerified) throw new Exception("Email not verified");
            return user;
        }
        return null;
    }

    public User Signup(string username, string password, string displayName, string email)
    {
        if (_userRepo.GetByUsername(username) != null) throw new Exception("Username already exists");
        if (_userRepo.GetByEmail(email) != null) throw new Exception("Email already exists");

        var user = new User
        {
            Username = username,
            PasswordHash = password,
            DisplayName = displayName,
            Email = email,
            IsEmailVerified = false,
            VerificationCode = Guid.NewGuid().ToString("N").Substring(0, 8),
            Claims = new List<string> { "user" }
        };

        _userRepo.Add(user);
        
        // In real app, send email here
        Console.WriteLine($"[EMAIL SIMULATION] To: {email}, Code: {user.VerificationCode}, Link: http://localhost:5000/api/auth/verify?email={email}&code={user.VerificationCode}");
        
        return user;
    }

    public bool VerifyEmail(string email, string code)
    {
        var user = _userRepo.GetByEmail(email);
        if (user != null && user.VerificationCode == code)
        {
            user.IsEmailVerified = true;
            user.VerificationCode = null;
            _userRepo.Update(user);
            return true;
        }
        return false;
    }

    public async Task<User> SsoLogin(string provider, string ssoId, string email, string displayName, string? idToken = null)
    {
        // Verify token if provided
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
                // In real app, you might want to reject the login if token verification fails
                Console.WriteLine($"Token verification failed: {ex.Message}");
            }
        }

        if (string.IsNullOrEmpty(email)) throw new Exception("Email is required for SSO login");

        var user = _userRepo.GetByEmail(email);
        if (user == null)
        {
            user = new User
            {
                Username = $"{provider}_{ssoId}",
                DisplayName = displayName,
                Email = email,
                IsEmailVerified = true, // SSO emails are assumed verified
                SsoProvider = provider,
                SsoId = ssoId,
                Claims = new List<string> { "user" }
            };
            _userRepo.Add(user);
        }
        else
        {
            // Update SSO info if already exists
            user.SsoProvider = provider;
            user.SsoId = ssoId;
            _userRepo.Update(user);
        }
        return user;
    }

    public User? GetUserById(Guid id)
    {
        return _userRepo.GetById(id);
    }

    public void SyncPermissions(string version, List<string> permissions)
    {
        // In a real app, you would store these definitions in a database 
        // or a cache to be used for UI-based role/permission management.
        Console.WriteLine($"[PERMISSION SYNC] Version: {version}, Count: {permissions.Count}");
        foreach (var p in permissions)
        {
            Console.WriteLine($"  - {p}");
        }
    }
}
