using System;
using System.Text.Json;

class Program
{
    static void Main()
    {
        var tokenResponse = new
        {
            access_token = "abcd",
            token_type = "Bearer",
            expires_in = 3600,
            id_token = "efgh"
        };
        var json = JsonSerializer.Serialize(tokenResponse);
        Console.WriteLine(json);
    }
}
