using System;
using System.IO;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;

class Program
{
    static void Main()
    {
        var message = new OpenIdConnectMessage("{\"access_token\":\"A\", \"token_type\":\"B\", \"id_token\":\"C\"}");
        Console.WriteLine($"AccessToken: {message.AccessToken}");
        Console.WriteLine($"IdToken: {message.IdToken}");
        Console.WriteLine($"TokenType: {message.TokenType}");
    }
}
