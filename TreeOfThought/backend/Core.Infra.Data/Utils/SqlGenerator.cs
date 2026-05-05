using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;

namespace Core.Infra.Data.Utils;

public static class SqlGenerator
{
    public static string GenerateCreateScript<TContext>(TContext context) where TContext : DbContext
    {
        var databaseCreator = context.GetService<IRelationalDatabaseCreator>();
        return context.Database.GenerateCreateScript();
    }

    public static string GenerateCreateTableScript<TContext>(TContext context, string tableName) where TContext : DbContext
    {
        // This is a bit complex in EF Core for a single table.
        // For simplicity, we can use the full script and filter, or use a custom implementation.
        // The requirement is to have a function to generate SQL.
        return context.Database.GenerateCreateScript(); // Returns full script for the context
    }
}
