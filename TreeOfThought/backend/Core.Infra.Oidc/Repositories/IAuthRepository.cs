using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Infra.Oidc.Models;

namespace Core.Infra.Oidc.Repositories;



public interface IAuthRepository
{
    // User operations
    Task<users_entity?> GetUserByIdAsync(Guid id);
    Task<users_entity?> GetUserByUsernameAsync(string username);
    Task<users_entity?> GetUserByEmailAsync(string email);
    Task CreateUserAsync(users_entity user);
    Task UpdateUserAsync(users_entity user);
    Task DeleteUserAsync(Guid id);
    Task<(List<users_entity> Items, int TotalCount)> GetAllUsersAsync(UserSearchQuery? query = null);

    // Role operations
    Task<roles_entity?> GetRoleByIdAsync(Guid id);
    Task<roles_entity?> GetRoleByNameAsync(string name);
    Task CreateRoleAsync(roles_entity role);
    Task UpdateRoleAsync(roles_entity role);
    Task DeleteRoleAsync(Guid id);
    Task<(List<roles_entity> Items, int TotalCount)> GetAllRolesAsync(RoleSearchQuery? query = null);

    // Claim operations
    Task<app_claims_entity?> GetClaimByIdAsync(Guid id);
    Task<app_claims_entity?> GetClaimByNameAsync(string name);
    Task CreateClaimAsync(app_claims_entity claim);
    Task UpdateClaimAsync(app_claims_entity claim);
    Task DeleteClaimAsync(Guid id);
    Task<(List<app_claims_entity> Items, int TotalCount)> GetAllClaimsAsync(ClaimSearchQuery? query = null);

    // Mapping operations
    Task AssignRoleToUserAsync(Guid userId, Guid roleId);
    Task AssignRolesToUserAsync(Guid userId, List<Guid> roleIds);
    Task RemoveRoleFromUserAsync(Guid userId, Guid roleId);
    Task AssignClaimToRoleAsync(Guid roleId, Guid claimId);
    Task AssignClaimsToRoleAsync(Guid roleId, List<Guid> claimIds);
    Task RemoveClaimFromRoleAsync(Guid roleId, Guid claimId);
    Task AssignClaimToUserAsync(Guid userId, Guid claimId);
    Task AssignClaimsToUserAsync(Guid userId, List<Guid> claimIds);
    Task RemoveClaimFromUserAsync(Guid userId, Guid claimId);

    // Fetching related data
    Task<List<roles_entity>> GetUserRolesAsync(Guid userId);
    Task<List<app_claims_entity>> GetRoleClaimsAsync(Guid roleId);
    Task<List<app_claims_entity>> GetUserDirectClaimsAsync(Guid userId);
    Task<List<app_claims_entity>> GetUserEffectiveClaimsAsync(Guid userId);
    Task<List<users_entity>> GetUsersInRoleAsync(Guid roleId);

    // ACL operations
    Task<acl_entries_entity?> GetAclEntryByIdAsync(Guid id);
    Task AddAclAsync(acl_entries_entity entry);
    Task RemoveAclAsync(Guid id);
    Task<bool> CheckAclAsync(Guid? userId, List<string> roleNames, string resourceType, string resourceId, int actionMask);
    Task<(List<acl_entries_entity> Items, int TotalCount)> GetAclEntriesAsync(string resourceType, string resourceId, int? pageIndex = null, int? pageSize = null);
    Task<List<acl_entries_entity>> GetUserAclEntriesAsync(Guid userId);

    // UserEmail operations
    Task<List<user_emails_entity>> GetUserEmailsAsync(Guid userId);
    Task AddUserEmailAsync(user_emails_entity email);
    Task<user_emails_entity?> GetUserEmailByValueAsync(string email);
    Task UpdateUserEmailAsync(user_emails_entity email);

    // Initialization
    Task EnsureAdminExistsAsync(string adminUsername, string adminPassword, string adminEmail);
    Task EnsureTablesCreatedAsync();
}
