using Core.Infra.Auth.Contexts;
using Core.Infra.Auth.Models;
using Microsoft.EntityFrameworkCore;

namespace Core.Infra.Auth.Repositories;

public class AuthRepository : IAuthRepository
{
    private readonly AuthDbContext _context;

    public AuthRepository(AuthDbContext context)
    {
        _context = context;
    }

    public async Task<User?> GetUserByIdAsync(Guid id) => await _context.Users.FindAsync(id);

    public async Task<User?> GetUserByUsernameAsync(string username) => 
        await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

    public async Task<User?> GetUserByEmailAsync(string email) => 
        await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

    public async Task CreateUserAsync(User user)
    {
        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateUserAsync(User user)
    {
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteUserAsync(Guid id)
    {
        var user = await GetUserByIdAsync(id);
        if (user != null)
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<Role?> GetRoleByNameAsync(string name) => 
        await _context.Roles.FirstOrDefaultAsync(r => r.Name == name);

    public async Task CreateRoleAsync(Role role)
    {
        await _context.Roles.AddAsync(role);
        await _context.SaveChangesAsync();
    }

    public async Task<List<Role>> GetAllRolesAsync() => await _context.Roles.ToListAsync();

    public async Task<Permission?> GetPermissionByNameAsync(string name) => 
        await _context.Permissions.FirstOrDefaultAsync(p => p.Name == name);

    public async Task CreatePermissionAsync(Permission permission)
    {
        await _context.Permissions.AddAsync(permission);
        await _context.SaveChangesAsync();
    }

    public async Task<List<Permission>> GetAllPermissionsAsync() => await _context.Permissions.ToListAsync();

    public async Task AssignRoleToUserAsync(Guid userId, Guid roleId)
    {
        if (!await _context.UserRoles.AnyAsync(ur => ur.UserId == userId && ur.RoleId == roleId))
        {
            await _context.UserRoles.AddAsync(new UserRole { UserId = userId, RoleId = roleId });
            await _context.SaveChangesAsync();
        }
    }

    public async Task RemoveRoleFromUserAsync(Guid userId, Guid roleId)
    {
        var mapping = await _context.UserRoles.FirstOrDefaultAsync(ur => ur.UserId == userId && ur.RoleId == roleId);
        if (mapping != null)
        {
            _context.UserRoles.Remove(mapping);
            await _context.SaveChangesAsync();
        }
    }

    public async Task AssignPermissionToRoleAsync(Guid roleId, Guid permissionId)
    {
        if (!await _context.RolePermissions.AnyAsync(rp => rp.RoleId == roleId && rp.PermissionId == permissionId))
        {
            await _context.RolePermissions.AddAsync(new RolePermission { RoleId = roleId, PermissionId = permissionId });
            await _context.SaveChangesAsync();
        }
    }

    public async Task RemovePermissionFromRoleAsync(Guid roleId, Guid permissionId)
    {
        var mapping = await _context.RolePermissions.FirstOrDefaultAsync(rp => rp.RoleId == roleId && rp.PermissionId == permissionId);
        if (mapping != null)
        {
            _context.RolePermissions.Remove(mapping);
            await _context.SaveChangesAsync();
        }
    }

    public async Task AssignPermissionToUserAsync(Guid userId, Guid permissionId)
    {
        if (!await _context.UserPermissions.AnyAsync(up => up.UserId == userId && up.PermissionId == permissionId))
        {
            await _context.UserPermissions.AddAsync(new UserPermission { UserId = userId, PermissionId = permissionId });
            await _context.SaveChangesAsync();
        }
    }

    public async Task RemovePermissionFromUserAsync(Guid userId, Guid permissionId)
    {
        var mapping = await _context.UserPermissions.FirstOrDefaultAsync(up => up.UserId == userId && up.PermissionId == permissionId);
        if (mapping != null)
        {
            _context.UserPermissions.Remove(mapping);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<List<Role>> GetUserRolesAsync(Guid userId)
    {
        return await (from ur in _context.UserRoles
                      join r in _context.Roles on ur.RoleId equals r.Id
                      where ur.UserId == userId
                      select r).ToListAsync();
    }

    public async Task<List<Permission>> GetRolePermissionsAsync(Guid roleId)
    {
        return await (from rp in _context.RolePermissions
                      join p in _context.Permissions on rp.PermissionId equals p.Id
                      where rp.RoleId == roleId
                      select p).ToListAsync();
    }

    public async Task<List<Permission>> GetUserDirectPermissionsAsync(Guid userId)
    {
        return await (from up in _context.UserPermissions
                      join p in _context.Permissions on up.PermissionId equals p.Id
                      where up.UserId == userId
                      select p).ToListAsync();
    }

    public async Task<List<Permission>> GetUserEffectivePermissionsAsync(Guid userId)
    {
        var rolePermissions = await (from ur in _context.UserRoles
                                     join rp in _context.RolePermissions on ur.RoleId equals rp.RoleId
                                     join p in _context.Permissions on rp.PermissionId equals p.Id
                                     where ur.UserId == userId
                                     select p).ToListAsync();

        var directPermissions = await GetUserDirectPermissionsAsync(userId);

        return rolePermissions.Concat(directPermissions).DistinctBy(p => p.Id).ToList();
    }

    public async Task AddAclAsync(AclEntry entry)
    {
        await _context.AclEntries.AddAsync(entry);
        await _context.SaveChangesAsync();
    }

    public async Task RemoveAclAsync(Guid id)
    {
        var entry = await _context.AclEntries.FindAsync(id);
        if (entry != null)
        {
            _context.AclEntries.Remove(entry);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<bool> CheckAclAsync(Guid? userId, List<string> roleNames, string resourceType, string resourceId, string action)
    {
        if (userId.HasValue)
        {
            var userAccess = await _context.AclEntries.AnyAsync(a => 
                a.UserId == userId.Value && 
                a.ResourceType == resourceType && 
                a.ResourceId == resourceId && 
                a.Action == action);
            if (userAccess) return true;
        }

        if (roleNames != null && roleNames.Any())
        {
            var roles = await _context.Roles.Where(r => roleNames.Contains(r.Name)).Select(r => r.Id).ToListAsync();
            var roleAccess = await _context.AclEntries.AnyAsync(a => 
                a.RoleId.HasValue && roles.Contains(a.RoleId.Value) && 
                a.ResourceType == resourceType && 
                a.ResourceId == resourceId && 
                a.Action == action);
            if (roleAccess) return true;
        }

        return false;
    }

    public async Task<List<AclEntry>> GetAclEntriesAsync(string resourceType, string resourceId)
    {
        return await _context.AclEntries
            .Where(a => a.ResourceType == resourceType && a.ResourceId == resourceId)
            .ToListAsync();
    }

    public async Task<List<UserEmail>> GetUserEmailsAsync(Guid userId)
    {
        return await _context.UserEmails.Where(ue => ue.UserId == userId).ToListAsync();
    }

    public async Task AddUserEmailAsync(UserEmail email)
    {
        await _context.UserEmails.AddAsync(email);
        await _context.SaveChangesAsync();
    }

    public async Task<UserEmail?> GetUserEmailByValueAsync(string email)
    {
        return await _context.UserEmails.FirstOrDefaultAsync(ue => ue.Email == email);
    }

    public async Task UpdateUserEmailAsync(UserEmail email)
    {
        _context.UserEmails.Update(email);
        await _context.SaveChangesAsync();
    }

    public async Task EnsureAdminExistsAsync(string adminUsername, string adminPassword, string adminEmail)
    {
        var admin = await GetUserByUsernameAsync(adminUsername);
        if (admin == null)
        {
            admin = new User
            {
                Username = adminUsername,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(adminPassword),
                Email = adminEmail,
                DisplayName = "Administrator",
                IsEmailVerified = true,
                CreatedAt = DateTime.UtcNow
            };
            await CreateUserAsync(admin);

            // Create Admin Role
            var adminRole = await GetRoleByNameAsync("Admin");
            if (adminRole == null)
            {
                adminRole = new Role { Name = "Admin", Description = "Full system access" };
                await CreateRoleAsync(adminRole);
            }

            await AssignRoleToUserAsync(admin.Id, adminRole.Id);
        }
    }

    public async Task EnsureTablesCreatedAsync()
    {
        // Simple way to ensure tables exist without migrations for now, 
        // as per yeucau.md instruction "Không dùng migration của entity framework".
        // BaseDbContext has logic for this if needed, or we can use context.Database.EnsureCreated()
        await _context.Database.EnsureCreatedAsync();
    }
}
