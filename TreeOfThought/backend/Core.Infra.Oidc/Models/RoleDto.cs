using System;
using System.Collections.Generic;

namespace Core.Infra.Oidc.Models;

public class RoleDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public List<IdNameDto> Claims { get; set; } = new();
}
