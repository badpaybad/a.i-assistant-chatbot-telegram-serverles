using Core.Infra.Auth.Models;

namespace Core.Infra.Auth.Repositories;

public interface IAuthRepository
{
    // User operations
    Task<User?> GetUserByIdAsync(Guid id);
    Task<User?> GetUserByUsernameAsync(string username);
    Task<User?> GetUserByEmailAsync(string email);
    Task CreateUserAsync(User user);
    Task UpdateUserAsync(User user);
    Task DeleteUserAsync(Guid id);
    Task<List<User>> GetAllUsersAsync();

    // Role operations
    Task<Role?> GetRoleByNameAsync(string name);
    Task CreateRoleAsync(Role role);
    Task<List<Role>> GetAllRolesAsync();

    // Claim operations
    Task<AppClaim?> GetClaimByNameAsync(string name);
    Task CreateClaimAsync(AppClaim claim);
    Task<List<AppClaim>> GetAllClaimsAsync();

    // Mapping operations
    Task AssignRoleToUserAsync(Guid userId, Guid roleId);
    Task RemoveRoleFromUserAsync(Guid userId, Guid roleId);
    Task AssignClaimToRoleAsync(Guid roleId, Guid claimId);
    Task RemoveClaimFromRoleAsync(Guid roleId, Guid claimId);
    Task AssignClaimToUserAsync(Guid userId, Guid claimId);
    Task RemoveClaimFromUserAsync(Guid userId, Guid claimId);

    // Fetching related data
    Task<List<Role>> GetUserRolesAsync(Guid userId);
    Task<List<AppClaim>> GetRoleClaimsAsync(Guid roleId);
    Task<List<AppClaim>> GetUserDirectClaimsAsync(Guid userId);
    Task<List<AppClaim>> GetUserEffectiveClaimsAsync(Guid userId);

    // ACL operations
    Task AddAclAsync(AclEntry entry);
    Task RemoveAclAsync(Guid id);
    Task<bool> CheckAclAsync(Guid? userId, List<string> roleNames, string resourceType, string resourceId, int actionMask);
    Task<List<AclEntry>> GetAclEntriesAsync(string resourceType, string resourceId);
    Task<List<AclEntry>> GetUserAclEntriesAsync(Guid userId);

    // UserEmail operations
    Task<List<UserEmail>> GetUserEmailsAsync(Guid userId);
    Task AddUserEmailAsync(UserEmail email);
    Task<UserEmail?> GetUserEmailByValueAsync(string email);
    Task UpdateUserEmailAsync(UserEmail email);

    // Initialization
    Task EnsureAdminExistsAsync(string adminUsername, string adminPassword, string adminEmail);
    Task EnsureTablesCreatedAsync();
}
