using System;
using System.IO;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;

class Program
{
    static void Main()
    {
        string json = File.ReadAllText("/tmp/oidc_debug.txt");
        var message = new OpenIdConnectMessage(json);
        Console.WriteLine($"AccessToken: {message.AccessToken?.Length}");
        Console.WriteLine($"IdToken: {message.IdToken?.Length}");
        Console.WriteLine($"TokenType: {message.TokenType}");
    }
}
