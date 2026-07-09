using Google.Cloud.Storage.V1;
using Google.Apis.Auth.OAuth2;
using System;

var jsonPath = "/work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/backend/Core.Web.Api/firebase-adminsdk.json";
var credential = GoogleCredential.FromFile(jsonPath);
var client = StorageClient.Create(credential);

Console.WriteLine("Available buckets:");
try {
    foreach (var bucket in client.ListBuckets("realtimedbtest-d8c6b"))
    {
        Console.WriteLine($"- {bucket.Name}");
    }
} catch (Exception ex) {
    Console.WriteLine($"Error: {ex.Message}");
}


