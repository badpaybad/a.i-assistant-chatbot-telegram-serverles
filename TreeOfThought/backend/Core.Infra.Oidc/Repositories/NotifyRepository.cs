using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Infra.Oidc.Contexts;
using Core.Infra.Oidc.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using Npgsql;

namespace Core.Infra.Oidc.Repositories;

public class NotifyRepository : INotifyRepository
{
    private readonly NotifyDbContext _context;

    public NotifyRepository(NotifyDbContext context)
    {
        _context = context;
    }

    public async Task EnsureTablesCreatedAsync()
    {
        var databaseCreator = _context.Database.GetService<IDatabaseCreator>() as IRelationalDatabaseCreator;
        if (databaseCreator != null)
        {
            if (!await databaseCreator.ExistsAsync())
            {
                await databaseCreator.CreateAsync();
            }

            try
            {
                await databaseCreator.CreateTablesAsync();
            }
            catch (PostgresException ex) when (ex.SqlState == "42P07") // duplicate_table
            {
                // Tables already exist, ignore
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[NotifyRepository] Table creation info: {ex.Message}");
            }
        }
    }

    public async Task SaveTokenAsync(Guid userId, string fcmToken, string? deviceId, string? appType)
    {
        if (string.IsNullOrWhiteSpace(fcmToken)) return;

        deviceId = deviceId?.Trim() ?? string.Empty;
        appType = appType?.Trim() ?? string.Empty;
        fcmToken = fcmToken.Trim();

        // 1. Clean up conflict mappings:
        // Any existing token registrations with the same FCM token or Device ID for OTHER users are deleted.
        var conflictTokens = await _context.UserFcmTokens
            .Where(t => t.UserId != userId && (t.FcmToken == fcmToken || (!string.IsNullOrEmpty(deviceId) && t.DeviceId == deviceId)))
            .ToListAsync();

        if (conflictTokens.Any())
        {
            _context.UserFcmTokens.RemoveRange(conflictTokens);
        }

        // 2. Upsert logic:
        UserFcmToken? existing = null;
        if (!string.IsNullOrEmpty(deviceId))
        {
            // If device ID is provided, look up by UserId + DeviceId
            existing = await _context.UserFcmTokens
                .FirstOrDefaultAsync(t => t.UserId == userId && t.DeviceId == deviceId);
        }
        else
        {
            // If device ID is absent, look up by UserId + FcmToken
            existing = await _context.UserFcmTokens
                .FirstOrDefaultAsync(t => t.UserId == userId && t.FcmToken == fcmToken);
        }

        if (existing != null)
        {
            existing.FcmToken = fcmToken;
            existing.AppType = appType;
            existing.UpdatedAt = DateTime.UtcNow;
            _context.UserFcmTokens.Update(existing);
        }
        else
        {
            var newToken = new UserFcmToken
            {
                UserId = userId,
                FcmToken = fcmToken,
                DeviceId = deviceId,
                AppType = appType,
                CreatedAt = DateTime.UtcNow
            };
            await _context.UserFcmTokens.AddAsync(newToken);
        }

        await _context.SaveChangesAsync();
    }

    public async Task<List<UserFcmToken>> GetTokensByUserIdAsync(Guid userId)
    {
        return await _context.UserFcmTokens
            .Where(t => t.UserId == userId)
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();
    }

    public async Task DeleteTokenAsync(Guid id)
    {
        var token = await _context.UserFcmTokens.FindAsync(id);
        if (token != null)
        {
            _context.UserFcmTokens.Remove(token);
            await _context.SaveChangesAsync();
        }
    }
}
