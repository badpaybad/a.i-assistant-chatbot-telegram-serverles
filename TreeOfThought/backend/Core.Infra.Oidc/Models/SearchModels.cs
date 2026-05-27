using System;
using System.Collections.Generic;

namespace Core.Infra.Oidc.Models;

public class UserSearchQuery
{
    public string? Keyword { get; set; }

    public bool? IsEmailVerified { get; set; }

    public List<Guid>? RoleIds { get; set; }

    public List<Guid>? ClaimIds { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public string? SsoProvider { get; set; }

    public string? SsoId { get; set; }

    public int? PageIndex { get; set; }

    public int? PageSize { get; set; }
}

public class RoleSearchQuery
{
    public string? Keyword { get; set; }

    public List<Guid>? ClaimIds { get; set; }

    public int? PageIndex { get; set; }

    public int? PageSize { get; set; }
}

public class ClaimSearchQuery
{
    public string? Keyword { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public int? PageIndex { get; set; }

    public int? PageSize { get; set; }
}

