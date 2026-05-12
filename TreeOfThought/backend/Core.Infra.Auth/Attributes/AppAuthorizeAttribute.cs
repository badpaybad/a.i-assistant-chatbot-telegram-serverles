using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Security.Claims;
using Core.Infra.Auth.Models;

namespace Core.Infra.Auth.Attributes;

public enum AuthMode { OR, AND }


[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true, Inherited = true)]
public class AppAuthorizeAttribute : AuthorizeAttribute
{
    private AuthMode _mode = AuthMode.OR;
    public AuthMode Mode 
    { 
        get => _mode; 
        set { _mode = value; UpdatePolicyFromProperties(); } 
    }

    private string? _resourceType;
    public string? ResourceType 
    { 
        get => _resourceType; 
        set { _resourceType = value; UpdatePolicyFromProperties(); } 
    }

    private ResourceActions _action;
    public ResourceActions Action 
    { 
        get => _action; 
        set { _action = value; UpdatePolicyFromProperties(); } 
    }

    private string? _roles;
    public new string? Roles 
    { 
        get => _roles; 
        set { _roles = value; UpdatePolicyFromProperties(); } 
    }

    private string? _basePolicy;
    public new string? Policy 
    { 
        get => _basePolicy; 
        set { _basePolicy = value; UpdatePolicyFromProperties(); } 
    }

    public AppAuthorizeAttribute(params string[] claims)
    {
        var claimsStr = claims.Length > 0 ? string.Join(",", claims) : "null";
        UpdatePolicy(claimsStr);
    }

    private void UpdatePolicy(string claimsStr)
    {
        // Format: AppAuthorize:Mode:Action:ResourceType:Roles:Policy:Claims
        // Gán vào thuộc tính thực sự của lớp cha để Framework nhận diện
        base.Policy = $"AppAuthorize:{Mode}:{Action}:{(ResourceType ?? "null")}:{(Roles ?? "null")}:{(Policy ?? "null")}:{claimsStr}";
    }

    private void UpdatePolicyFromProperties()
    {
        var claimsStr = "null";
        if (!string.IsNullOrEmpty(base.Policy) && base.Policy.StartsWith("AppAuthorize"))
        {
            var parts = base.Policy.Split(':');
            if (parts.Length >= 7) claimsStr = parts[6];
        }
        UpdatePolicy(claimsStr);
    }
}




