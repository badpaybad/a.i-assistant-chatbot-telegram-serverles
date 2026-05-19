using System;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;

class Program
{
    static void Main()
    {
        var json = "{\"access_token\":\"A\", \"token_type\":\"Bearer\", \"expires_in\":3600, \"id_token\":\"B\"}";
        var msg = new OpenIdConnectMessage(json);
        Console.WriteLine($"Token Length: {msg.IdToken}");
    }
}
