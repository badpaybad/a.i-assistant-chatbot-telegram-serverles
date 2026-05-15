using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using WebTestOidc.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using WebTestOidc.Data;

namespace WebTestOidc.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly TestDbContext _db;

    public HomeController(ILogger<HomeController> logger, TestDbContext db)
    {
        _logger = logger;
        _db = db;
    }

    public async Task<IActionResult> Index()
    {
        var logs = await _db.AuditLogs
            .OrderByDescending(x => x.Timestamp)
            .Take(5)
            .ToListAsync();
        return View(logs);
    }

    [Authorize]
    public async Task<IActionResult> Secure()
    {
        var idToken = await HttpContext.GetTokenAsync("id_token");
        var accessToken = await HttpContext.GetTokenAsync("access_token");
        
        ViewData["IdToken"] = idToken;
        ViewData["AccessToken"] = accessToken;
        
        return View();
    }

    [Authorize]
    public IActionResult Claims()
    {
        return View();
    }

    public IActionResult Login()
    {
        return Challenge(new AuthenticationProperties { RedirectUri = "/" }, "OpenIdConnect");
    }

    public IActionResult Logout()
    {
        return SignOut(new AuthenticationProperties { RedirectUri = "/" }, "Cookies", "OpenIdConnect");
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
