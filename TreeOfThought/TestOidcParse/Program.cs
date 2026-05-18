using System;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;

class Program
{
    static async Task Main()
    {
        var json = "{\"access_token\":\"eyJhbG\",\"token_type\":\"Bearer\",\"expires_in\":3600,\"id_token\":\"eyJhbG\"}";
        var msg = new OpenIdConnectMessage(json);
        Console.WriteLine($"IdToken: '{msg.IdToken}'");
        Console.WriteLine($"AccessToken: '{msg.AccessToken}'");
        Console.WriteLine($"TokenType: '{msg.TokenType}'");
        Console.WriteLine($"Keys: {string.Join(", ", msg.Parameters.Keys)}");
    }
}
