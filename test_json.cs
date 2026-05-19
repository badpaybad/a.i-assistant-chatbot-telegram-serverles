using System;

class Program
{
    static void Main()
    {
        var tokenResponse = new
        {
            access_token = "access",
            token_type = "Bearer",
            expires_in = 3600,
            id_token = "id"
        };
        var json = System.Text.Json.JsonSerializer.Serialize(tokenResponse);
        Console.WriteLine(json);
    }
}
