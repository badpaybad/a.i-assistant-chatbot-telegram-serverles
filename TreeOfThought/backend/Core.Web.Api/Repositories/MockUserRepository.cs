using Core.Web.Api.Models;
using System.Collections.Concurrent;

namespace Core.Web.Api.Repositories;

public class MockUserRepository
{
    private readonly ConcurrentDictionary<Guid, User> _users = new();

    public MockUserRepository()
    {
        // Add some sample data
        var admin = new User
        {
            Username = "admin",
            PasswordHash = "admin123", // Simplified for mock
            DisplayName = "System Admin",
            Email = "badpaybad@gmail.com",
            IsEmailVerified = true,
            Claims = new List<string> { "admin", "user.manage", "cqrs-test" }
        };
        _users[admin.Id] = admin;
    }

    public List<User> GetAll() => _users.Values.ToList();

    public User? GetByUsername(string username) =>
        _users.Values.FirstOrDefault(u => u.Username.Equals(username, StringComparison.OrdinalIgnoreCase));

    public User? GetByEmail(string email) =>
        _users.Values.FirstOrDefault(u => u.Email.Equals(email, StringComparison.OrdinalIgnoreCase));

    public User? GetById(Guid id) => _users.TryGetValue(id, out var user) ? user : null;

    public void Add(User user) => _users[user.Id] = user;

    public void Update(User user) => _users[user.Id] = user;
}
