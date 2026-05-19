using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;

class Program
{
    static void Main()
    {
        var options = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

        var dict = new Dictionary<string, object>
        {
            { "access_token", "A" },
            { "token_type", "Bearer" },
            { "expires_in", 3600 },
            { "id_token", "C" }
        };

        Console.WriteLine(JsonSerializer.Serialize(dict, options));
    }
}
