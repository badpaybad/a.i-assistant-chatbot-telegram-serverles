using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using WebMvcTestOidc.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using WebMvcTestOidc.Data;
using Core.Infra.Auth.Attributes;

namespace WebMvcTestOidc.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly TestDbContext _db;
    private readonly IConfiguration _config;

    public HomeController(ILogger<HomeController> logger, TestDbContext db, IConfiguration config)
    {
        _logger = logger;
        _db = db;
        _config = config;
    }

    public async Task<IActionResult> Index()
    {
        var logs = await _db.AuditLogs
            .OrderByDescending(x => x.Timestamp)
            .Take(5)
            .ToListAsync();
        return View(logs);
    }

    [AppAuthorize]
    public async Task<IActionResult> Secure()
    {
        var idToken = await HttpContext.GetTokenAsync("id_token");
        var accessToken = await HttpContext.GetTokenAsync("access_token");
        
        ViewData["IdToken"] = idToken;
        ViewData["AccessToken"] = accessToken;
        
        return View();
    }

    [AppAuthorize]
    public IActionResult Claims()
    {
        return View();
    }

    public IActionResult Login()
    {
        return Challenge(new AuthenticationProperties { RedirectUri = "/" }, "OpenIdConnect");
    }

    public async Task<IActionResult> Logout()
    {
        // 1. Sign out of local cookie authentication
        await HttpContext.SignOutAsync("Cookies");

        // 2. Build the redirect URI back to our success page
        var request = HttpContext.Request;
        var postLogoutRedirectUri = $"{request.Scheme}://{request.Host}/Home/LogoutSuccess";

        // 3. Redirect to OIDC logout endpoint
        var authority = _config["OIDC:Authority"] ?? "http://localhost:5000";
        var oidcLogoutUrl = $"{authority}/api/auth/logout?post_logout_redirect_uri={Uri.EscapeDataString(postLogoutRedirectUri)}";

        return Redirect(oidcLogoutUrl);
    }

    public IActionResult LogoutSuccess()
    {
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error(string? message)
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
