using System;
using System.Collections.Generic;

namespace Core.Infra.Auth.Models;

public class IdNameDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
}

public class UserDto
{
    public Guid Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? AvatarUrl { get; set; }
    public bool IsEmailVerified { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public List<IdNameDto> Roles { get; set; } = new();
    public List<IdNameDto> DirectClaims { get; set; } = new();
}
