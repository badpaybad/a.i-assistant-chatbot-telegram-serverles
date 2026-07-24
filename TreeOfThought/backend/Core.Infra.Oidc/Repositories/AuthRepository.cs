using Core.Infra.Oidc.Contexts;
using Core.Infra.Oidc.Models;
using Core.Infra.Session.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Infra.Oidc.Repositories;

public class AuthRepository : IAuthRepository
{
    private readonly AuthDbContext _context;

    public AuthRepository(AuthDbContext context)
    {
        _context = context;
    }

    public async Task<users_entity?> GetUserByIdAsync(Guid id) => await _context.users.FindAsync(id);

    public async Task<users_entity?> GetUserByUsernameAsync(string username) => 
        await _context.users.FirstOrDefaultAsync(u => u.username.ToLower() == username.ToLower());

    public async Task<users_entity?> GetUserByEmailAsync(string email) => 
        await _context.users.FirstOrDefaultAsync(u => u.email == email);

    public async Task CreateUserAsync(users_entity user)
    {
        await _context.users.AddAsync(user);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateUserAsync(users_entity user)
    {
        var existing = await _context.users.AsNoTracking().FirstOrDefaultAsync(u => u.id == user.id);
        if (existing != null)
        {
            if (existing.username.Equals("admin", StringComparison.OrdinalIgnoreCase) && 
                !user.username.Equals("admin", StringComparison.OrdinalIgnoreCase))
            {
                throw new InvalidOperationException("Cannot rename the system admin account.");
            }
        }
        _context.users.Update(user);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteUserAsync(Guid id)
    {
        var user = await GetUserByIdAsync(id);
        if (user != null)
        {
            if (user.username.Equals("admin", StringComparison.OrdinalIgnoreCase))
            {
                throw new InvalidOperationException("Cannot delete the system admin account.");
            }
            _context.users.Remove(user);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<(List<users_entity> Items, int TotalCount)> GetAllUsersAsync(UserSearchQuery? query = null)
    {
        var usersQuery = _context.users.OrderBy(u => u.username).AsQueryable();

        if (query != null)
        {
            if (!string.IsNullOrWhiteSpace(query.Keyword))
            {
                var keyword = query.Keyword.ToLower();
                usersQuery = usersQuery.Where(u => u.username.ToLower().Contains(keyword) || 
                                                   u.display_name.ToLower().Contains(keyword) || 
                                                   u.email.ToLower().Contains(keyword));
            }

            if (query.IsEmailVerified.HasValue)
            {
                usersQuery = usersQuery.Where(u => u.is_email_verified == query.IsEmailVerified.Value);
            }

            if (query.RoleIds != null && query.RoleIds.Any())
            {
                usersQuery = usersQuery.Where(u => _context.user_roles.Any(ur => ur.user_id == u.id && query.RoleIds.Contains(ur.role_id)));
            }

            if (query.ClaimIds != null && query.ClaimIds.Any())
            {
                usersQuery = usersQuery.Where(u => _context.user_claims.Any(uc => uc.user_id == u.id && query.ClaimIds.Contains(uc.claim_id)));
            }

            if (query.StartDate.HasValue)
            {
                usersQuery = usersQuery.Where(u => u.created_at >= query.StartDate.Value);
            }

            if (query.EndDate.HasValue)
            {
                usersQuery = usersQuery.Where(u => u.created_at <= query.EndDate.Value);
            }

            if (!string.IsNullOrWhiteSpace(query.SsoProvider))
            {
                usersQuery = usersQuery.Where(u => u.sso_provider == query.SsoProvider);
            }

            if (!string.IsNullOrWhiteSpace(query.SsoId))
            {
                usersQuery = usersQuery.Where(u => u.sso_id == query.SsoId);
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

    public async Task<roles_entity?> GetRoleByIdAsync(Guid id) => await _context.roles.FindAsync(id);

    public async Task<roles_entity?> GetRoleByNameAsync(string name) => 
        await _context.roles.FirstOrDefaultAsync(r => r.name.ToLower() == name.ToLower());

    public async Task CreateRoleAsync(roles_entity role)
    {
        await _context.roles.AddAsync(role);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateRoleAsync(roles_entity role)
    {
        _context.roles.Update(role);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteRoleAsync(Guid id)
    {
        var role = await _context.roles.FindAsync(id);
        if (role != null)
        {
            if (role.name.Equals(AuthConstants.AdminRole, StringComparison.OrdinalIgnoreCase))
            {
                throw new InvalidOperationException("Cannot delete the system Admin role.");
            }
            _context.roles.Remove(role);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<(List<roles_entity> Items, int TotalCount)> GetAllRolesAsync(RoleSearchQuery? query = null)
    {
        var rolesQuery = _context.roles.OrderBy(r => r.name).AsQueryable();

        if (query != null)
        {
            if (!string.IsNullOrWhiteSpace(query.Keyword))
            {
                var keyword = query.Keyword.ToLower();
                rolesQuery = rolesQuery.Where(r => r.name.ToLower().Contains(keyword) || 
                                                   (r.description != null && r.description.ToLower().Contains(keyword)));
            }

            if (query.ClaimIds != null && query.ClaimIds.Any())
            {
                rolesQuery = rolesQuery.Where(r => _context.role_claims.Any(rc => rc.role_id == r.id && query.ClaimIds.Contains(rc.claim_id)));
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

    public async Task<app_claims_entity?> GetClaimByIdAsync(Guid id) => await _context.app_claims.FindAsync(id);

    public async Task<app_claims_entity?> GetClaimByNameAsync(string name) => 
        await _context.app_claims.FirstOrDefaultAsync(p => p.name.ToLower() == name.ToLower());

    public async Task CreateClaimAsync(app_claims_entity claim)
    {
        await _context.app_claims.AddAsync(claim);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateClaimAsync(app_claims_entity claim)
    {
        _context.app_claims.Update(claim);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteClaimAsync(Guid id)
    {
        var claim = await _context.app_claims.FindAsync(id);
        if (claim != null)
        {
            if (claim.name.Equals(AuthConstants.AdminClaim, StringComparison.OrdinalIgnoreCase))
            {
                throw new InvalidOperationException("Cannot delete the system admin claim.");
            }
            _context.app_claims.Remove(claim);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<(List<app_claims_entity> Items, int TotalCount)> GetAllClaimsAsync(ClaimSearchQuery? query = null)
    {
        var claimsQuery = _context.app_claims.OrderBy(c => c.name).AsQueryable();

        if (query != null)
        {
            if (!string.IsNullOrWhiteSpace(query.Keyword))
            {
                var keyword = query.Keyword.ToLower();
                claimsQuery = claimsQuery.Where(c => c.name.ToLower().Contains(keyword) || 
                                                   (c.description != null && c.description.ToLower().Contains(keyword)));
            }

            if (query.StartDate.HasValue)
            {
                claimsQuery = claimsQuery.Where(c => c.created_at >= query.StartDate.Value);
            }

            if (query.EndDate.HasValue)
            {
                claimsQuery = claimsQuery.Where(c => c.created_at <= query.EndDate.Value);
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
        if (!await _context.user_roles.AnyAsync(ur => ur.user_id == userId && ur.role_id == roleId))
        {
            await _context.user_roles.AddAsync(new user_roles_entity { user_id = userId, role_id = roleId });
            await _context.SaveChangesAsync();
        }
    }

    public async Task AssignRolesToUserAsync(Guid userId, List<Guid> roleIds)
    {
        var existingRoleIds = await _context.user_roles
            .Where(ur => ur.user_id == userId && roleIds.Contains(ur.role_id))
            .Select(ur => ur.role_id)
            .ToListAsync();

        var newRoleIds = roleIds.Except(existingRoleIds).ToList();
        if (newRoleIds.Any())
        {
            foreach (var roleId in newRoleIds)
            {
                await _context.user_roles.AddAsync(new user_roles_entity { user_id = userId, role_id = roleId });
            }
            await _context.SaveChangesAsync();
        }
    }

    public async Task RemoveRoleFromUserAsync(Guid userId, Guid roleId)
    {
        var mapping = await _context.user_roles.FirstOrDefaultAsync(ur => ur.user_id == userId && ur.role_id == roleId);
        if (mapping != null)
        {
            _context.user_roles.Remove(mapping);
            await _context.SaveChangesAsync();
        }
    }

    public async Task AssignClaimToRoleAsync(Guid roleId, Guid claimId)
    {
        if (!await _context.role_claims.AnyAsync(rp => rp.role_id == roleId && rp.claim_id == claimId))
        {
            await _context.role_claims.AddAsync(new role_claims_entity { role_id = roleId, claim_id = claimId });
            await _context.SaveChangesAsync();
        }
    }

    public async Task AssignClaimsToRoleAsync(Guid roleId, List<Guid> claimIds)
    {
        var existingClaimIds = await _context.role_claims
            .Where(rc => rc.role_id == roleId && claimIds.Contains(rc.claim_id))
            .Select(rc => rc.claim_id)
            .ToListAsync();

        var newClaimIds = claimIds.Except(existingClaimIds).ToList();
        if (newClaimIds.Any())
        {
            foreach (var claimId in newClaimIds)
            {
                await _context.role_claims.AddAsync(new role_claims_entity { role_id = roleId, claim_id = claimId });
            }
            await _context.SaveChangesAsync();
        }
    }

    public async Task RemoveClaimFromRoleAsync(Guid roleId, Guid claimId)
    {
        var mapping = await _context.role_claims.FirstOrDefaultAsync(rp => rp.role_id == roleId && rp.claim_id == claimId);
        if (mapping != null)
        {
            _context.role_claims.Remove(mapping);
            await _context.SaveChangesAsync();
        }
    }

    public async Task AssignClaimToUserAsync(Guid userId, Guid claimId)
    {
        if (!await _context.user_claims.AnyAsync(up => up.user_id == userId && up.claim_id == claimId))
        {
            await _context.user_claims.AddAsync(new user_claims_entity { user_id = userId, claim_id = claimId });
            await _context.SaveChangesAsync();
        }
    }

    public async Task AssignClaimsToUserAsync(Guid userId, List<Guid> claimIds)
    {
        var existingClaimIds = await _context.user_claims
            .Where(uc => uc.user_id == userId && claimIds.Contains(uc.claim_id))
            .Select(uc => uc.claim_id)
            .ToListAsync();

        var newClaimIds = claimIds.Except(existingClaimIds).ToList();
        if (newClaimIds.Any())
        {
            foreach (var claimId in newClaimIds)
            {
                await _context.user_claims.AddAsync(new user_claims_entity { user_id = userId, claim_id = claimId });
            }
            await _context.SaveChangesAsync();
        }
    }

    public async Task RemoveClaimFromUserAsync(Guid userId, Guid claimId)
    {
        var mapping = await _context.user_claims.FirstOrDefaultAsync(up => up.user_id == userId && up.claim_id == claimId);
        if (mapping != null)
        {
            _context.user_claims.Remove(mapping);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<List<roles_entity>> GetUserRolesAsync(Guid userId)
    {
        return await (from ur in _context.user_roles
                      join r in _context.roles on ur.role_id equals r.id
                      where ur.user_id == userId
                      select r).ToListAsync();
    }

    public async Task<List<app_claims_entity>> GetRoleClaimsAsync(Guid roleId)
    {
        return await (from rp in _context.role_claims
                      join p in _context.app_claims on rp.claim_id equals p.id
                      where rp.role_id == roleId
                      select p).ToListAsync();
    }

    public async Task<List<app_claims_entity>> GetUserDirectClaimsAsync(Guid userId)
    {
        return await (from up in _context.user_claims
                      join p in _context.app_claims on up.claim_id equals p.id
                      where up.user_id == userId
                      select p).ToListAsync();
    }

    public async Task<List<app_claims_entity>> GetUserEffectiveClaimsAsync(Guid userId)
    {
        var roleClaims = await (from ur in _context.user_roles
                                     join rp in _context.role_claims on ur.role_id equals rp.role_id
                                     join p in _context.app_claims on rp.claim_id equals p.id
                                     where ur.user_id == userId
                                     select p).ToListAsync();

        var directClaims = await GetUserDirectClaimsAsync(userId);

        return roleClaims.Concat(directClaims).DistinctBy(p => p.id).ToList();
    }

    public async Task<List<users_entity>> GetUsersInRoleAsync(Guid roleId)
    {
        return await (from ur in _context.user_roles
                      join u in _context.users on ur.user_id equals u.id
                      where ur.role_id == roleId
                      select u).ToListAsync();
    }

    public async Task<acl_entries_entity?> GetAclEntryByIdAsync(Guid id) => await _context.acl_entries.FindAsync(id);

    public async Task AddAclAsync(acl_entries_entity entry)
    {
        await _context.acl_entries.AddAsync(entry);
        await _context.SaveChangesAsync();
    }

    public async Task RemoveAclAsync(Guid id)
    {
        var entry = await _context.acl_entries.FindAsync(id);
        if (entry != null)
        {
            _context.acl_entries.Remove(entry);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<bool> CheckAclAsync(Guid? userId, List<string> roleNames, string resourceType, string resourceId, int actionMask)
    {
        if (userId.HasValue)
        {
            var userAccess = await _context.acl_entries.FirstOrDefaultAsync(a => 
                a.user_id == userId.Value && 
                a.resource_type == resourceType && 
                a.resource_id == resourceId);
            
            if (userAccess != null && (userAccess.permission_mask & actionMask) == actionMask) return true;
        }

        if (roleNames != null && roleNames.Any())
        {
            var roles = await _context.roles
                .Where(r => roleNames.Select(rn => rn.ToLower()).Contains(r.name.ToLower()))
                .Select(r => r.id)
                .ToListAsync();
            var roleAccessEntries = await _context.acl_entries.Where(a => 
                a.role_id.HasValue && roles.Contains(a.role_id.Value) && 
                a.resource_type == resourceType && 
                a.resource_id == resourceId).ToListAsync();

            var combinedMask = roleAccessEntries.Aggregate(0, (current, entry) => current | entry.permission_mask);
            if ((combinedMask & actionMask) == actionMask) return true;
        }

        return false;
    }

    public async Task<(List<acl_entries_entity> Items, int TotalCount)> GetAclEntriesAsync(string resourceType, string resourceId, int? pageIndex = null, int? pageSize = null)
    {
        var baseQuery = _context.acl_entries
            .Where(a => a.resource_type == resourceType && a.resource_id == resourceId);

        var totalCount = await baseQuery.CountAsync();

        IQueryable<acl_entries_entity> query = baseQuery.OrderBy(a => a.created_at);

        if (pageIndex.HasValue && pageSize.HasValue)
        {
            query = query
                .Skip((pageIndex.Value - 1) * pageSize.Value)
                .Take(pageSize.Value);
        }

        var items = await query.ToListAsync();
        return (items, totalCount);
    }

    public async Task<List<acl_entries_entity>> GetUserAclEntriesAsync(Guid userId)
    {
        var userRoleIds = await _context.user_roles.Where(ur => ur.user_id == userId).Select(ur => ur.role_id).ToListAsync();
        
        return await _context.acl_entries
            .Where(a => a.user_id == userId || (a.role_id.HasValue && userRoleIds.Contains(a.role_id.Value)))
            .ToListAsync();
    }

    public async Task<List<user_emails_entity>> GetUserEmailsAsync(Guid userId)
    {
        return await _context.user_emails.Where(ue => ue.user_id == userId).ToListAsync();
    }

    public async Task AddUserEmailAsync(user_emails_entity email)
    {
        await _context.user_emails.AddAsync(email);
        await _context.SaveChangesAsync();
    }

    public async Task<user_emails_entity?> GetUserEmailByValueAsync(string email)
    {
        return await _context.user_emails.FirstOrDefaultAsync(ue => ue.email == email);
    }

    public async Task UpdateUserEmailAsync(user_emails_entity email)
    {
        _context.user_emails.Update(email);
        await _context.SaveChangesAsync();
    }

    public async Task EnsureAdminExistsAsync(string adminUsername, string adminPassword, string adminEmail)
    {
        var admin = await GetUserByUsernameAsync(adminUsername);
        if (admin == null)
        {
            Console.WriteLine($"[SEEDING] Creating admin user: {adminUsername}");
            admin = new users_entity
            {
                username = adminUsername,
                password_hash = BCrypt.Net.BCrypt.HashPassword(adminPassword),
                email = adminEmail,
                display_name = "Administrator",
                is_email_verified = true,
                must_change_password = true,
                created_at = DateTime.UtcNow
            };
            await CreateUserAsync(admin);
        }
        else
        {
            Console.WriteLine($"[SEEDING] Admin user exists: '{adminUsername}'");
        }

        var adminRole = await GetRoleByNameAsync(AuthConstants.AdminRole);
        if (adminRole == null)
        {
            Console.WriteLine($"[SEEDING] Creating {AuthConstants.AdminRole} role");
            adminRole = new roles_entity { name = AuthConstants.AdminRole, description = "Full system access" };
            await CreateRoleAsync(adminRole);
        }

        await AssignRoleToUserAsync(admin.id, adminRole.id);

        var adminClaim = await GetClaimByNameAsync(AuthConstants.AdminClaim);
        if (adminClaim == null)
        {
            Console.WriteLine($"[SEEDING] Creating '{AuthConstants.AdminClaim}' claim");
            adminClaim = new app_claims_entity { name = AuthConstants.AdminClaim, description = "God-mode claim", created_at = DateTime.UtcNow };
            await CreateClaimAsync(adminClaim);
        }
        await AssignClaimToRoleAsync(adminRole.id, adminClaim.id);
    }

    public async Task EnsureTablesCreatedAsync()
    {
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
                Console.WriteLine($"Table creation info: {ex.Message}");
            }

            try
            {
                await _context.Database.ExecuteSqlRawAsync("ALTER TABLE \"users\" ADD COLUMN IF NOT EXISTS \"is_mfa_enabled\" boolean NOT NULL DEFAULT false;");
                await _context.Database.ExecuteSqlRawAsync("ALTER TABLE \"users\" ADD COLUMN IF NOT EXISTS \"mfa_secret\" text NULL;");
                await _context.Database.ExecuteSqlRawAsync("ALTER TABLE \"users\" ADD COLUMN IF NOT EXISTS \"mfa_backup_codes\" text NULL;");
                await _context.Database.ExecuteSqlRawAsync("ALTER TABLE \"users\" ADD COLUMN IF NOT EXISTS \"preferred_mfa_provider\" text NULL;");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"MFA column migration info: {ex.Message}");
            }
        }
    }
}
