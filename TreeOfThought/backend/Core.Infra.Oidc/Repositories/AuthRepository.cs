using Core.Infra.Oidc.Contexts;
using Core.Infra.Oidc.Models;
using Core.Infra.Session.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using Npgsql;

namespace Core.Infra.Oidc.Repositories;

public class AuthRepository : IAuthRepository
{
    private readonly AuthDbContext _context;

    public AuthRepository(AuthDbContext context)
    {
        _context = context;
    }

    public async Task<User?> GetUserByIdAsync(Guid id) => await _context.Users.FindAsync(id);

    public async Task<User?> GetUserByUsernameAsync(string username) => 
        await _context.Users.FirstOrDefaultAsync(u => u.Username.ToLower() == username.ToLower());

    public async Task<User?> GetUserByEmailAsync(string email) => 
        await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

    public async Task CreateUserAsync(User user)
    {
        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateUserAsync(User user)
    {
        var existing = await _context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == user.Id);
        if (existing != null)
        {
            if (existing.Username.Equals("admin", StringComparison.OrdinalIgnoreCase) && 
                !user.Username.Equals("admin", StringComparison.OrdinalIgnoreCase))
            {
                throw new InvalidOperationException("Cannot rename the system admin account.");
            }
        }
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteUserAsync(Guid id)
    {
        var user = await GetUserByIdAsync(id);
        if (user != null)
        {
            if (user.Username.Equals("admin", StringComparison.OrdinalIgnoreCase))
            {
                throw new InvalidOperationException("Cannot delete the system admin account.");
            }
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<(List<User> Items, int TotalCount)> GetAllUsersAsync(UserSearchQuery? query = null)
    {
        var usersQuery = _context.Users.AsQueryable();

        if (query != null)
        {
            if (!string.IsNullOrWhiteSpace(query.Keyword))
            {
                var keyword = query.Keyword.ToLower();
                usersQuery = usersQuery.Where(u => u.Username.ToLower().Contains(keyword) || 
                                                   u.DisplayName.ToLower().Contains(keyword) || 
                                                   u.Email.ToLower().Contains(keyword));
            }

            if (query.IsEmailVerified.HasValue)
            {
                usersQuery = usersQuery.Where(u => u.IsEmailVerified == query.IsEmailVerified.Value);
            }

            if (query.RoleIds != null && query.RoleIds.Any())
            {
                usersQuery = usersQuery.Where(u => _context.UserRoles.Any(ur => ur.UserId == u.Id && query.RoleIds.Contains(ur.RoleId)));
            }

            if (query.ClaimIds != null && query.ClaimIds.Any())
            {
                usersQuery = usersQuery.Where(u => _context.UserClaims.Any(uc => uc.UserId == u.Id && query.ClaimIds.Contains(uc.ClaimId)));
            }

            if (query.StartDate.HasValue)
            {
                usersQuery = usersQuery.Where(u => u.CreatedAt >= query.StartDate.Value);
            }

            if (query.EndDate.HasValue)
            {
                usersQuery = usersQuery.Where(u => u.CreatedAt <= query.EndDate.Value);
            }

            if (!string.IsNullOrWhiteSpace(query.SsoProvider))
            {
                usersQuery = usersQuery.Where(u => u.SsoProvider == query.SsoProvider);
            }

            if (!string.IsNullOrWhiteSpace(query.SsoId))
            {
                usersQuery = usersQuery.Where(u => u.SsoId == query.SsoId);
            }
        }

        var totalCount = await usersQuery.CountAsync();

        if (query != null && query.PageIndex.HasValue && query.PageSize.HasValue)
        {
            usersQuery = usersQuery
                .Skip((query.PageIndex.Value - 1) * query.PageSize.Value)
                .Take(query.PageSize.Value);
        }

        var items = await usersQuery.ToListAsync();
        return (items, totalCount);
    }

    public async Task<Role?> GetRoleByIdAsync(Guid id) => await _context.Roles.FindAsync(id);

    public async Task<Role?> GetRoleByNameAsync(string name) => 
        await _context.Roles.FirstOrDefaultAsync(r => r.Name.ToLower() == name.ToLower());

    public async Task CreateRoleAsync(Role role)
    {
        await _context.Roles.AddAsync(role);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateRoleAsync(Role role)
    {
        _context.Roles.Update(role);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteRoleAsync(Guid id)
    {
        var role = await _context.Roles.FindAsync(id);
        if (role != null)
        {
            if (role.Name.Equals(AuthConstants.AdminRole, StringComparison.OrdinalIgnoreCase))
            {
                throw new InvalidOperationException("Cannot delete the system Admin role.");
            }
            _context.Roles.Remove(role);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<(List<Role> Items, int TotalCount)> GetAllRolesAsync(RoleSearchQuery? query = null)
    {
        var rolesQuery = _context.Roles.AsQueryable();

        if (query != null)
        {
            if (!string.IsNullOrWhiteSpace(query.Keyword))
            {
                var keyword = query.Keyword.ToLower();
                rolesQuery = rolesQuery.Where(r => r.Name.ToLower().Contains(keyword) || 
                                                   (r.Description != null && r.Description.ToLower().Contains(keyword)));
            }

            if (query.ClaimIds != null && query.ClaimIds.Any())
            {
                rolesQuery = rolesQuery.Where(r => _context.RoleClaims.Any(rc => rc.RoleId == r.Id && query.ClaimIds.Contains(rc.ClaimId)));
            }
        }

        var totalCount = await rolesQuery.CountAsync();

        if (query != null && query.PageIndex.HasValue && query.PageSize.HasValue)
        {
            rolesQuery = rolesQuery
                .Skip((query.PageIndex.Value - 1) * query.PageSize.Value)
                .Take(query.PageSize.Value);
        }

        var items = await rolesQuery.ToListAsync();
        return (items, totalCount);
    }

    public async Task<AppClaim?> GetClaimByIdAsync(Guid id) => await _context.Claims.FindAsync(id);

    public async Task<AppClaim?> GetClaimByNameAsync(string name) => 
        await _context.Claims.FirstOrDefaultAsync(p => p.Name.ToLower() == name.ToLower());

    public async Task CreateClaimAsync(AppClaim claim)
    {
        await _context.Claims.AddAsync(claim);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateClaimAsync(AppClaim claim)
    {
        _context.Claims.Update(claim);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteClaimAsync(Guid id)
    {
        var claim = await _context.Claims.FindAsync(id);
        if (claim != null)
        {
            if (claim.Name.Equals(AuthConstants.AdminClaim, StringComparison.OrdinalIgnoreCase))
            {
                throw new InvalidOperationException("Cannot delete the system admin claim.");
            }
            _context.Claims.Remove(claim);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<(List<AppClaim> Items, int TotalCount)> GetAllClaimsAsync(ClaimSearchQuery? query = null)
    {
        var claimsQuery = _context.Claims.AsQueryable();

        if (query != null)
        {
            if (!string.IsNullOrWhiteSpace(query.Keyword))
            {
                var keyword = query.Keyword.ToLower();
                claimsQuery = claimsQuery.Where(c => c.Name.ToLower().Contains(keyword) || 
                                                   (c.Description != null && c.Description.ToLower().Contains(keyword)));
            }

            if (query.StartDate.HasValue)
            {
                claimsQuery = claimsQuery.Where(c => c.CreatedAt >= query.StartDate.Value);
            }

            if (query.EndDate.HasValue)
            {
                claimsQuery = claimsQuery.Where(c => c.CreatedAt <= query.EndDate.Value);
            }
        }

        var totalCount = await claimsQuery.CountAsync();

        if (query != null && query.PageIndex.HasValue && query.PageSize.HasValue)
        {
            claimsQuery = claimsQuery
                .Skip((query.PageIndex.Value - 1) * query.PageSize.Value)
                .Take(query.PageSize.Value);
        }

        var items = await claimsQuery.ToListAsync();
        return (items, totalCount);
    }

    public async Task AssignRoleToUserAsync(Guid userId, Guid roleId)
    {
        if (!await _context.UserRoles.AnyAsync(ur => ur.UserId == userId && ur.RoleId == roleId))
        {
            await _context.UserRoles.AddAsync(new UserRole { UserId = userId, RoleId = roleId });
            await _context.SaveChangesAsync();
        }
    }

    public async Task AssignRolesToUserAsync(Guid userId, List<Guid> roleIds)
    {
        var existingRoleIds = await _context.UserRoles
            .Where(ur => ur.UserId == userId && roleIds.Contains(ur.RoleId))
            .Select(ur => ur.RoleId)
            .ToListAsync();

        var newRoleIds = roleIds.Except(existingRoleIds).ToList();
        if (newRoleIds.Any())
        {
            foreach (var roleId in newRoleIds)
            {
                await _context.UserRoles.AddAsync(new UserRole { UserId = userId, RoleId = roleId });
            }
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

    public async Task AssignClaimToRoleAsync(Guid roleId, Guid claimId)
    {
        if (!await _context.RoleClaims.AnyAsync(rp => rp.RoleId == roleId && rp.ClaimId == claimId))
        {
            await _context.RoleClaims.AddAsync(new RoleClaim { RoleId = roleId, ClaimId = claimId });
            await _context.SaveChangesAsync();
        }
    }

    public async Task AssignClaimsToRoleAsync(Guid roleId, List<Guid> claimIds)
    {
        var existingClaimIds = await _context.RoleClaims
            .Where(rc => rc.RoleId == roleId && claimIds.Contains(rc.ClaimId))
            .Select(rc => rc.ClaimId)
            .ToListAsync();

        var newClaimIds = claimIds.Except(existingClaimIds).ToList();
        if (newClaimIds.Any())
        {
            foreach (var claimId in newClaimIds)
            {
                await _context.RoleClaims.AddAsync(new RoleClaim { RoleId = roleId, ClaimId = claimId });
            }
            await _context.SaveChangesAsync();
        }
    }

    public async Task RemoveClaimFromRoleAsync(Guid roleId, Guid claimId)
    {
        var mapping = await _context.RoleClaims.FirstOrDefaultAsync(rp => rp.RoleId == roleId && rp.ClaimId == claimId);
        if (mapping != null)
        {
            _context.RoleClaims.Remove(mapping);
            await _context.SaveChangesAsync();
        }
    }

    public async Task AssignClaimToUserAsync(Guid userId, Guid claimId)
    {
        if (!await _context.UserClaims.AnyAsync(up => up.UserId == userId && up.ClaimId == claimId))
        {
            await _context.UserClaims.AddAsync(new UserClaim { UserId = userId, ClaimId = claimId });
            await _context.SaveChangesAsync();
        }
    }

    public async Task AssignClaimsToUserAsync(Guid userId, List<Guid> claimIds)
    {
        var existingClaimIds = await _context.UserClaims
            .Where(uc => uc.UserId == userId && claimIds.Contains(uc.ClaimId))
            .Select(uc => uc.ClaimId)
            .ToListAsync();

        var newClaimIds = claimIds.Except(existingClaimIds).ToList();
        if (newClaimIds.Any())
        {
            foreach (var claimId in newClaimIds)
            {
                await _context.UserClaims.AddAsync(new UserClaim { UserId = userId, ClaimId = claimId });
            }
            await _context.SaveChangesAsync();
        }
    }

    public async Task RemoveClaimFromUserAsync(Guid userId, Guid claimId)
    {
        var mapping = await _context.UserClaims.FirstOrDefaultAsync(up => up.UserId == userId && up.ClaimId == claimId);
        if (mapping != null)
        {
            _context.UserClaims.Remove(mapping);
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

    public async Task<List<AppClaim>> GetRoleClaimsAsync(Guid roleId)
    {
        return await (from rp in _context.RoleClaims
                      join p in _context.Claims on rp.ClaimId equals p.Id
                      where rp.RoleId == roleId
                      select p).ToListAsync();
    }

    public async Task<List<AppClaim>> GetUserDirectClaimsAsync(Guid userId)
    {
        return await (from up in _context.UserClaims
                      join p in _context.Claims on up.ClaimId equals p.Id
                      where up.UserId == userId
                      select p).ToListAsync();
    }

    public async Task<List<AppClaim>> GetUserEffectiveClaimsAsync(Guid userId)
    {
        var roleClaims = await (from ur in _context.UserRoles
                                     join rp in _context.RoleClaims on ur.RoleId equals rp.RoleId
                                     join p in _context.Claims on rp.ClaimId equals p.Id
                                     where ur.UserId == userId
                                     select p).ToListAsync();

        var directClaims = await GetUserDirectClaimsAsync(userId);

        return roleClaims.Concat(directClaims).DistinctBy(p => p.Id).ToList();
    }

    public async Task<List<User>> GetUsersInRoleAsync(Guid roleId)
    {
        return await (from ur in _context.UserRoles
                      join u in _context.Users on ur.UserId equals u.Id
                      where ur.RoleId == roleId
                      select u).ToListAsync();
    }

    public async Task<AclEntry?> GetAclEntryByIdAsync(Guid id) => await _context.AclEntries.FindAsync(id);

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

    public async Task<bool> CheckAclAsync(Guid? userId, List<string> roleNames, string resourceType, string resourceId, int actionMask)
    {
        if (userId.HasValue)
        {
            var userAccess = await _context.AclEntries.FirstOrDefaultAsync(a => 
                a.UserId == userId.Value && 
                a.ResourceType == resourceType && 
                a.ResourceId == resourceId);
            
            if (userAccess != null && (userAccess.PermissionMask & actionMask) == actionMask) return true;
        }

        if (roleNames != null && roleNames.Any())
        {
            var roles = await _context.Roles
                .Where(r => roleNames.Select(rn => rn.ToLower()).Contains(r.Name.ToLower()))
                .Select(r => r.Id)
                .ToListAsync();
            var roleAccessEntries = await _context.AclEntries.Where(a => 
                a.RoleId.HasValue && roles.Contains(a.RoleId.Value) && 
                a.ResourceType == resourceType && 
                a.ResourceId == resourceId).ToListAsync();

            var combinedMask = roleAccessEntries.Aggregate(0, (current, entry) => current | entry.PermissionMask);
            if ((combinedMask & actionMask) == actionMask) return true;
        }

        return false;
    }


    public async Task<(List<AclEntry> Items, int TotalCount)> GetAclEntriesAsync(string resourceType, string resourceId, int? pageIndex = null, int? pageSize = null)
    {
        var query = _context.AclEntries
            .Where(a => a.ResourceType == resourceType && a.ResourceId == resourceId);

        var totalCount = await query.CountAsync();

        if (pageIndex.HasValue && pageSize.HasValue)
        {
            query = query
                .Skip((pageIndex.Value - 1) * pageSize.Value)
                .Take(pageSize.Value);
        }

        var items = await query.ToListAsync();
        return (items, totalCount);
    }

    public async Task<List<AclEntry>> GetUserAclEntriesAsync(Guid userId)
    {
        // Get directly assigned ACLs + ACLs assigned to user's roles
        var userRoleIds = await _context.UserRoles.Where(ur => ur.UserId == userId).Select(ur => ur.RoleId).ToListAsync();
        
        return await _context.AclEntries
            .Where(a => a.UserId == userId || (a.RoleId.HasValue && userRoleIds.Contains(a.RoleId.Value)))
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
            Console.WriteLine($"[SEEDING] Creating admin user: {adminUsername}");
            admin = new User
            {
                Username = adminUsername,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(adminPassword),
                Email = adminEmail,
                DisplayName = "Administrator",
                IsEmailVerified = true,
                MustChangePassword = true,
                CreatedAt = DateTime.UtcNow
            };
            await CreateUserAsync(admin);
        }
        else
        {
            // Do not overwrite password if user already exists
            // Requirement: Allow UI to change password and persist it
            Console.WriteLine($"[SEEDING] Admin user exists: '{adminUsername}'");
        }

        // Create Admin Role
        var adminRole = await GetRoleByNameAsync(AuthConstants.AdminRole);
        if (adminRole == null)
        {
            Console.WriteLine($"[SEEDING] Creating {AuthConstants.AdminRole} role");
            adminRole = new Role { Name = AuthConstants.AdminRole, Description = "Full system access" };
            await CreateRoleAsync(adminRole);
        }

        await AssignRoleToUserAsync(admin.Id, adminRole.Id);

        // Ensure Admin claim exists and is assigned to Admin role
        var adminClaim = await GetClaimByNameAsync(AuthConstants.AdminClaim);
        if (adminClaim == null)
        {
            Console.WriteLine($"[SEEDING] Creating '{AuthConstants.AdminClaim}' claim");
            adminClaim = new AppClaim { Name = AuthConstants.AdminClaim, Description = "God-mode claim", CreatedAt = DateTime.UtcNow };
            await CreateClaimAsync(adminClaim);
        }
        await AssignClaimToRoleAsync(adminRole.Id, adminClaim.Id);
    }

    public async Task EnsureTablesCreatedAsync()
    {
        // EnsureCreatedAsync only creates tables if the database is empty.
        // If the database exists but some tables are missing, we use IRelationalDatabaseCreator.
        var databaseCreator = _context.Database.GetService<IDatabaseCreator>() as IRelationalDatabaseCreator;
        if (databaseCreator != null)
        {
            if (!await databaseCreator.ExistsAsync())
            {
                await databaseCreator.CreateAsync();
            }

            try
            {
                await databaseCreator.CreateTablesAsync();
            }
            catch (PostgresException ex) when (ex.SqlState == "42P07") // duplicate_table
            {
                // Tables already exist, ignore
            }
            catch (Exception ex)
            {
                // Log or handle other creation errors
                Console.WriteLine($"Table creation info: {ex.Message}");
            }
        }
    }
}
