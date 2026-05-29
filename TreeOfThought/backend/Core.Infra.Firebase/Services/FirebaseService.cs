using FirebaseAdmin;
using FirebaseAdmin.Auth;
using FirebaseAdmin.Messaging;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Firestore;
using Google.Cloud.Storage.V1;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Hosting;
using Core.Infra.Firebase.Models;
using System.Text.Json;
using Core.Infra.Base.Constants;

namespace Core.Infra.Firebase.Services;

public class FirebaseService
{
    private static readonly Dictionary<string, FirebaseApp> _apps = new();
    private static readonly Dictionary<string, FirestoreDb> _firestoreDbs = new();
    private static readonly Dictionary<string, StorageClient> _storageClients = new();
    private static readonly Dictionary<string, GoogleCredential> _credentials = new();
    private readonly IOptions<FirebaseOptions> _options;
    private readonly ILogger<FirebaseService> _logger;

    public FirebaseService(ILogger<FirebaseService> logger, IOptions<FirebaseOptions> options, IHostEnvironment env)
    {
        _logger = logger;
        _options = options;

        if (!string.IsNullOrEmpty(_options.Value.CredentialsPath))
        {
            var jsonPath = _options.Value.CredentialsPath;
            if (!Path.IsPathRooted(jsonPath))
            {
                jsonPath = Path.Combine(env.ContentRootPath, jsonPath);
            }
            
            if (File.Exists(jsonPath))
            {
                InitializeApp(_options.Value.AppName, jsonPath, _options.Value.ProjectId, _options.Value.DatabaseId);
            }
            else
            {
                _logger.LogWarning("Firebase credentials file not found at: {Path}", jsonPath);
            }
        }
    }

    private static readonly object _lock = new();

    public void InitializeApp(string name, string jsonFilePath, string? projectId = null, string? databaseId = null)
    {
        lock (_lock)
        {
            try
            {
                var credential = _credentials.ContainsKey(name) ? _credentials[name] : GoogleCredential.FromFile(jsonFilePath);
                FirebaseApp app;
                if (!_apps.ContainsKey(name))
                {
                    try
                    {
                        app = FirebaseApp.Create(new AppOptions { Credential = credential }, name);
                    }
                    catch (ArgumentException)
                    {
                        app = FirebaseApp.GetInstance(name);
                    }
                    _apps[name] = app;
                    _credentials[name] = credential;
                }
                else
                {
                    app = _apps[name];
                }

                if (!string.IsNullOrEmpty(projectId))
                {
                    if (!_firestoreDbs.ContainsKey(name))
                    {
                        _firestoreDbs[name] = new FirestoreDbBuilder
                        {
                            ProjectId = projectId,
                            Credential = credential,
                            DatabaseId = databaseId ?? "(default)"
                        }.Build();
                    }

                    if (!_storageClients.ContainsKey(name))
                    {
                        _storageClients[name] = StorageClient.Create(credential);
                    }
                }
                else
                {
                    _logger.LogWarning("ProjectId is empty for {Name}. Firestore and Storage clients will not be initialized.", name);
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
    public async Task<string> CreateCustomTokenAsync(string appName, string uid, IDictionary<string, object>? claims = null)
    {
        var auth = FirebaseAuth.GetAuth(_apps[appName]);
        return await auth.CreateCustomTokenAsync(uid, claims);
    }

    public async Task<FirebaseToken> VerifyIdTokenAsync(string appName, string idToken)
    {
        var auth = FirebaseAuth.GetAuth(_apps[appName]);
        return await auth.VerifyIdTokenAsync(idToken);
    }

    // FCM
    public async Task<string> SendNotificationAsync(string appName, string token, string title, string body)
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
        return await messaging.SendAsync(message);
    }

    // Firestore
    public FirestoreDb GetFirestore(string appName) => _firestoreDbs[appName];

    public async Task PublishToAddressPathAsync(string appName, string path, object data)
    {
        var db = GetFirestore(appName);
        
        // Convert to Firestore-compatible format
        if (data is JsonElement element)
        {
            data = ConvertToFirestoreData(element) ?? new Dictionary<string, object?>();
        }
        else if (data != null && !(data is IDictionary<string, object>) && !data.GetType().IsPrimitive && !(data is string))
        {
            // For complex objects, serialize to JSON first to ensure camelCase and Firestore compatibility
            var json = JsonSerializer.Serialize(data,CqrsJsonOptions.Default);
            using var jsonDoc = JsonDocument.Parse(json);
            data = ConvertToFirestoreData(jsonDoc.RootElement) ?? new Dictionary<string, object?>();
        }

        // Path format: collection/docId or collection/docId/subcollection/docId
        var docRef = db.Document(path);
        await docRef.SetAsync(data, SetOptions.MergeAll);
    }

    private object? ConvertToFirestoreData(JsonElement element)
    {
        switch (element.ValueKind)
        {
            case JsonValueKind.Object:
                var dict = new Dictionary<string, object?>();
                foreach (var prop in element.EnumerateObject())
                {
                    dict[prop.Name] = ConvertToFirestoreData(prop.Value);
                }
                return dict;
            case JsonValueKind.Array:
                var list = new List<object?>();
                foreach (var item in element.EnumerateArray())
                {
                    list.Add(ConvertToFirestoreData(item));
                }
                return list;
            case JsonValueKind.String:
                return element.GetString();
            case JsonValueKind.Number:
                if (element.TryGetInt64(out long l)) return l;
                return element.GetDouble();
            case JsonValueKind.True:
                return true;
            case JsonValueKind.False:
                return false;
            case JsonValueKind.Null:
                return null;
            default:
                return element.GetRawText();
        }
    }

    public async Task DeleteAddressPathAsync(string appName, string path)
    {
        var db = GetFirestore(appName);
        var docRef = db.Document(path);
        await docRef.DeleteAsync();
    }

    // Storage
    public async Task<string> UploadFileAsync(string appName, string bucketName, string objectName, Stream content, string contentType, bool isPublic = false)
    {
        var client = _storageClients[appName];
        var obj = await client.UploadObjectAsync(bucketName, objectName, contentType, content, new UploadObjectOptions
        {
            PredefinedAcl = isPublic ? PredefinedObjectAcl.PublicRead : PredefinedObjectAcl.Private
        });
        return $"https://storage.googleapis.com/{bucketName}/{objectName}";
    }

    public async Task UpdateObjectAclAsync(string appName, string bucketName, string objectName, bool isPublic)
    {
        var client = _storageClients[appName];
        
        _logger.LogInformation("Patching ACL for {ObjectName} in {BucketName} to {Acl}", objectName, bucketName, isPublic ? "PublicRead" : "Private");
        
        await client.PatchObjectAsync(new Google.Apis.Storage.v1.Data.Object
        {
            Bucket = bucketName,
            Name = objectName
        }, new PatchObjectOptions
        {
            PredefinedAcl = isPublic ? PredefinedObjectAcl.PublicRead : PredefinedObjectAcl.Private
        });
    }

    public string GetSignedUrl(string appName, string bucketName, string objectName, TimeSpan duration)
    {
        var credential = _credentials[appName];
        var urlSigner = UrlSigner.FromCredential(credential);
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

    // --- Centralized Configuration Overloads ---

    public async Task<string> CreateCustomTokenAsync(string uid, IDictionary<string, object>? claims = null)
        => await CreateCustomTokenAsync(_options.Value.AppName, uid, claims);

    public async Task<FirebaseToken> VerifyIdTokenAsync(string idToken)
        => await VerifyIdTokenAsync(_options.Value.AppName, idToken);

    public async Task<string> SendNotificationAsync(string token, string title, string body)
        => await SendNotificationAsync(_options.Value.AppName, token, title, body);

    public FirestoreDb GetFirestore() 
        => GetFirestore(_options.Value.AppName);

    public async Task PublishToAddressPathAsync(string path, object data)
        => await PublishToAddressPathAsync(_options.Value.AppName, path, data);

    public async Task DeleteAddressPathAsync(string path)
        => await DeleteAddressPathAsync(_options.Value.AppName, path);

    public async Task<string> UploadFileAsync(string objectName, Stream content, string contentType, bool isPublic = false)
        => await UploadFileAsync(_options.Value.AppName, _options.Value.StorageBucket, objectName, content, contentType, isPublic);

    public async Task UpdateObjectAclAsync(string objectName, bool isPublic)
        => await UpdateObjectAclAsync(_options.Value.AppName, _options.Value.StorageBucket, objectName, isPublic);

    public string GetSignedUrl(string objectName, TimeSpan duration)
        => GetSignedUrl(_options.Value.AppName, _options.Value.StorageBucket, objectName, duration);

    public string GetPublicUrl(string objectName)
        => GetPublicUrl(_options.Value.StorageBucket, objectName);

    public async Task<byte[]> ReadFileAsync(string objectName)
        => await ReadFileAsync(_options.Value.AppName, _options.Value.StorageBucket, objectName);

    public async Task DeleteFileAsync(string objectName)
        => await DeleteFileAsync(_options.Value.AppName, _options.Value.StorageBucket, objectName);

    public async Task<List<string>> ListFilesAsync(string prefix)
        => await ListFilesAsync(_options.Value.AppName, _options.Value.StorageBucket, prefix);
}
