using Npgsql;

var connectionString = "Host=localhost;Database=tot_db;Username=root;Password=Test123456";
using var conn = new NpgsqlConnection(connectionString);
await conn.OpenAsync();

try
{
    using var cmd = new NpgsqlCommand("ALTER TABLE \"Users\" ADD COLUMN IF NOT EXISTS \"AvatarUrl\" text;", conn);
    await cmd.ExecuteNonQueryAsync();
    Console.WriteLine("Column 'AvatarUrl' added successfully or already exists.");
}
catch (Exception ex)
{
    Console.WriteLine("Error: " + ex.Message);
}
