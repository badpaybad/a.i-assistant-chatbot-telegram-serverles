using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace Core.Infra.Oidc.Models;

public class UserSearchQuery
{
    [FromQuery(Name = "keyword")]
    public string? Keyword { get; set; }

    [FromQuery(Name = "isEmailVerified")]
    public bool? IsEmailVerified { get; set; }

    [FromQuery(Name = "roleIds")]
    public List<Guid>? RoleIds { get; set; }

    [FromQuery(Name = "claimIds")]
    public List<Guid>? ClaimIds { get; set; }

    [FromQuery(Name = "startDate")]
    public DateTime? StartDate { get; set; }

    [FromQuery(Name = "endDate")]
    public DateTime? EndDate { get; set; }

    [FromQuery(Name = "ssoProvider")]
    public string? SsoProvider { get; set; }

    [FromQuery(Name = "ssoId")]
    public string? SsoId { get; set; }

    [FromQuery(Name = "pageIndex")]
    public int? PageIndex { get; set; }

    [FromQuery(Name = "pageSize")]
    public int? PageSize { get; set; }
}

public class RoleSearchQuery
{
    [FromQuery(Name = "keyword")]
    public string? Keyword { get; set; }

    [FromQuery(Name = "claimIds")]
    public List<Guid>? ClaimIds { get; set; }

    [FromQuery(Name = "pageIndex")]
    public int? PageIndex { get; set; }

    [FromQuery(Name = "pageSize")]
    public int? PageSize { get; set; }
}

public class ClaimSearchQuery
{
    [FromQuery(Name = "keyword")]
    public string? Keyword { get; set; }

    [FromQuery(Name = "startDate")]
    public DateTime? StartDate { get; set; }

    [FromQuery(Name = "endDate")]
    public DateTime? EndDate { get; set; }

    [FromQuery(Name = "pageIndex")]
    public int? PageIndex { get; set; }

    [FromQuery(Name = "pageSize")]
    public int? PageSize { get; set; }
}
