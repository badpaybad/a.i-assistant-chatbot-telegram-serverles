namespace Core.Infra.Auth.Models;

public enum AppAuthMode
{
    JwtBearer, // Standard API Mode (using JWT Bearer)
    Cookie,    // Standard MVC Cookie Mode
    None       // Custom Mode (only registers dynamic authorization requirements/handlers, no Authentication registration)
}
