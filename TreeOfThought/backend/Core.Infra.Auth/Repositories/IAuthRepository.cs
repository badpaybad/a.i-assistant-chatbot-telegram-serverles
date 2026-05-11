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

    // Role operations
    Task<Role?> GetRoleByNameAsync(string name);
    Task CreateRoleAsync(Role role);
    Task<List<Role>> GetAllRolesAsync();

    // Permission operations
    Task<Permission?> GetPermissionByNameAsync(string name);
    Task CreatePermissionAsync(Permission permission);
    Task<List<Permission>> GetAllPermissionsAsync();

    // Mapping operations
    Task AssignRoleToUserAsync(Guid userId, Guid roleId);
    Task RemoveRoleFromUserAsync(Guid userId, Guid roleId);
    Task AssignPermissionToRoleAsync(Guid roleId, Guid permissionId);
    Task RemovePermissionFromRoleAsync(Guid roleId, Guid permissionId);
    Task AssignPermissionToUserAsync(Guid userId, Guid permissionId);
    Task RemovePermissionFromUserAsync(Guid userId, Guid permissionId);

    // Fetching related data
    Task<List<Role>> GetUserRolesAsync(Guid userId);
    Task<List<Permission>> GetRolePermissionsAsync(Guid roleId);
    Task<List<Permission>> GetUserDirectPermissionsAsync(Guid userId);
    Task<List<Permission>> GetUserEffectivePermissionsAsync(Guid userId);

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
