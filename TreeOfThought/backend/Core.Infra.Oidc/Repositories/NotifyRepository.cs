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
        var conflictTokens = await _context.user_fcm_tokens
            .Where(t => t.user_id != userId && (t.fcm_token == fcmToken || (!string.IsNullOrEmpty(deviceId) && t.device_id == deviceId)))
            .ToListAsync();

        if (conflictTokens.Any())
        {
            _context.user_fcm_tokens.RemoveRange(conflictTokens);
        }

        // 2. Upsert logic:
        user_fcm_tokens_entity? existing = null;
        if (!string.IsNullOrEmpty(deviceId))
        {
            existing = await _context.user_fcm_tokens
                .FirstOrDefaultAsync(t => t.user_id == userId && t.device_id == deviceId);
        }
        else
        {
            existing = await _context.user_fcm_tokens
                .FirstOrDefaultAsync(t => t.user_id == userId && t.fcm_token == fcmToken);
        }

        if (existing != null)
        {
            existing.fcm_token = fcmToken;
            existing.app_type = appType;
            existing.updated_at = DateTime.UtcNow;
            _context.user_fcm_tokens.Update(existing);
        }
        else
        {
            var newToken = new user_fcm_tokens_entity
            {
                user_id = userId,
                fcm_token = fcmToken,
                device_id = deviceId,
                app_type = appType,
                created_at = DateTime.UtcNow
            };
            await _context.user_fcm_tokens.AddAsync(newToken);
        }

        await _context.SaveChangesAsync();
    }

    public async Task<List<user_fcm_tokens_entity>> GetTokensByUserIdAsync(Guid userId)
    {
        return await _context.user_fcm_tokens
            .Where(t => t.user_id == userId)
            .OrderByDescending(t => t.created_at)
            .ToListAsync();
    }

    public async Task DeleteTokenAsync(Guid id)
    {
        var token = await _context.user_fcm_tokens.FindAsync(id);
        if (token != null)
        {
            _context.user_fcm_tokens.Remove(token);
            await _context.SaveChangesAsync();
        }
    }
}
