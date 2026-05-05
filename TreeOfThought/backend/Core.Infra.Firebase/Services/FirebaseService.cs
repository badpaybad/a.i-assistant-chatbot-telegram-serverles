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
    private static readonly Dictionary<string, FirebaseApp> _apps = new();
    private static readonly Dictionary<string, FirestoreDb> _firestoreDbs = new();
    private static readonly Dictionary<string, StorageClient> _storageClients = new();
    private static readonly Dictionary<string, string> _jsonFilePaths = new();
    private readonly ILogger<FirebaseService> _logger;

    public FirebaseService(ILogger<FirebaseService> logger)
    {
        _logger = logger;
    }

    private static readonly object _lock = new();

    public void InitializeApp(string name, string jsonFilePath, string? projectId = null)
    {
        lock (_lock)
        {
            if (_apps.ContainsKey(name)) return;

            try
            {
                var credential = GoogleCredential.FromFile(jsonFilePath);
                FirebaseApp app;
                try
                {
                    app = FirebaseApp.Create(new AppOptions { Credential = credential }, name);
                }
                catch (ArgumentException)
                {
                    app = FirebaseApp.GetInstance(name);
                }

                _apps[name] = app;
                _jsonFilePaths[name] = jsonFilePath;

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
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error initializing Firebase app {Name}", name);
                throw;
            }
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

    public async Task PublishToAddressPathAsync(string appName, string path, object data)
    {
        var db = GetFirestore(appName);
        // Path format: collection/docId or collection/docId/subcollection/docId
        var docRef = db.Document(path);
        await docRef.SetAsync(data, SetOptions.MergeAll);
    }

    public async Task DeleteAddressPathAsync(string appName, string path)
    {
        var db = GetFirestore(appName);
        var docRef = db.Document(path);
        await docRef.DeleteAsync();
    }

    // Storage
    public async Task<string> UploadFileAsync(string appName, string bucketName, string objectName, Stream content, string contentType)
    {
        var client = _storageClients[appName];
        var obj = await client.UploadObjectAsync(bucketName, objectName, contentType, content);
        return $"https://storage.googleapis.com/{bucketName}/{objectName}";
    }

    public string GetSignedUrl(string appName, string bucketName, string objectName, TimeSpan duration)
    {
        var jsonPath = _jsonFilePaths[appName];
        var urlSigner = UrlSigner.FromServiceAccountPath(jsonPath);
        return urlSigner.Sign(bucketName, objectName, duration, HttpMethod.Get);
    }

    public string GetPublicUrl(string bucketName, string objectName)
    {
        return $"https://storage.googleapis.com/{bucketName}/{objectName}";
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
