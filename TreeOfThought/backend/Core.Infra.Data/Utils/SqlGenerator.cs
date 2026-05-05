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
        // To get a single table script, we generate the full script and filter it.
        // A more robust way would be to use the Mapping Strategy, but this is a quick and effective way for a modular infra.
        var fullScript = context.Database.GenerateCreateScript();
        var lines = fullScript.Split(new[] { "\r\n", "\r", "\n" }, StringSplitOptions.None);
        
        var tableScript = new System.Text.StringBuilder();
        bool inTable = false;
        foreach (var line in lines)
        {
            if (line.Contains($"CREATE TABLE [{tableName}]") || line.Contains($"CREATE TABLE \"{tableName}\"") || line.Contains($"CREATE TABLE {tableName}"))
            {
                inTable = true;
            }
            
            if (inTable)
            {
                tableScript.AppendLine(line);
                if (line.Trim().EndsWith(";") || line.Trim().ToUpper() == "GO")
                {
                    // Check if it's the end of the CREATE TABLE statement
                    // This is a heuristic, might need refinement for complex schemas with constraints
                    if (line.Contains(")")) inTable = false;
                }
            }
        }
        return tableScript.ToString();
    }
}
