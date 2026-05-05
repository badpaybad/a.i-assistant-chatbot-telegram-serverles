using FirebaseAdmin;
using FirebaseAdmin.Auth;
using FirebaseAdmin.Messaging;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Firestore;
using Google.Cloud.Storage.V1;
using Microsoft.Extensions.Logging;

namespace Core.Infra.Firebase.Services;

public class FirebaseService
{
    private readonly Dictionary<string, FirebaseApp> _apps = new();
    private readonly Dictionary<string, FirestoreDb> _firestoreDbs = new();
    private readonly Dictionary<string, StorageClient> _storageClients = new();
    private readonly ILogger<FirebaseService> _logger;

    public FirebaseService(ILogger<FirebaseService> logger)
    {
        _logger = logger;
    }

    public void InitializeApp(string name, string jsonFilePath, string? projectId = null)
    {
        var credential = GoogleCredential.FromFile(jsonFilePath);
        var app = FirebaseApp.Create(new AppOptions
        {
            Credential = credential
        }, name);
        _apps[name] = app;

        if (!string.IsNullOrEmpty(projectId))
        {
            _firestoreDbs[name] = new FirestoreDbBuilder
            {
                ProjectId = projectId,
                Credential = credential
            }.Build();

            _storageClients[name] = StorageClient.Create(credential);
        }
    }

    // Auth
    public async Task<string> CreateCustomTokenAsync(string appName, string uid)
    {
        var auth = FirebaseAuth.GetAuth(_apps[appName]);
        return await auth.CreateCustomTokenAsync(uid);
    }

    // FCM
    public async Task SendNotificationAsync(string appName, string token, string title, string body)
    {
        var messaging = FirebaseMessaging.GetMessaging(_apps[appName]);
        var message = new Message
        {
            Token = token,
            Notification = new Notification
            {
                Title = title,
                Body = body
            }
        };
        await messaging.SendAsync(message);
    }

    // Firestore
    public FirestoreDb GetFirestore(string appName) => _firestoreDbs[appName];

    // Storage
    public async Task<string> UploadFileAsync(string appName, string bucketName, string objectName, Stream content, string contentType)
    {
        var client = _storageClients[appName];
        var obj = await client.UploadObjectAsync(bucketName, objectName, contentType, content);
        return obj.MediaLink;
    }

    public string GetSignedUrl(string appName, string bucketName, string objectName, TimeSpan duration)
    {
        // Note: Signed URLs usually require a service account key with specific permissions
        var urlSigner = UrlSigner.FromServiceAccountPath(_apps[appName].Options.Credential.ToString()); // This is a simplification
        return "https://storage.googleapis.com/" + bucketName + "/" + objectName; // Placeholder for actual signer logic
    }

    public async Task<byte[]> ReadFileAsync(string appName, string bucketName, string objectName)
    {
        var client = _storageClients[appName];
        using var stream = new MemoryStream();
        await client.DownloadObjectAsync(bucketName, objectName, stream);
        return stream.ToArray();
    }

    public async Task DeleteFileAsync(string appName, string bucketName, string objectName)
    {
        var client = _storageClients[appName];
        await client.DeleteObjectAsync(bucketName, objectName);
    }

    public async Task<List<string>> ListFilesAsync(string appName, string bucketName, string prefix)
    {
        var client = _storageClients[appName];
        var objects = client.ListObjectsAsync(bucketName, prefix);
        var result = new List<string>();
        await foreach (var obj in objects)
        {
            result.Add(obj.Name);
        }
        return result;
    }
}
