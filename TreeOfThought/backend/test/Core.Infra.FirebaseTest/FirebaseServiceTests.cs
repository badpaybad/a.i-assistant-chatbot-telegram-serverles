using Core.Infra.Base.Utils;
using Core.Infra.Firebase.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Xunit;

namespace Core.Infra.FirebaseTest;

public class FirebaseServiceTests
{
    private readonly FirebaseService _firebaseService;
    private readonly string _testBucket;
    private readonly string _appName = "TestApp";

    public FirebaseServiceTests()
    {
        var config = ConfigurationHelper.LoadConfiguration();
        var jsonPath = config["Firebase:JsonFilePath"] ?? "../../realtimedbtest-d8c6b-firebase-adminsdk-luofp-e7b3882eb3.json";
        var projectId = config["Firebase:ProjectId"] ?? "realtimedbtest-d8c6b";
        _testBucket = config["Firebase:TestBucket"] ?? "realtimedbtest-d8c6b.appspot.com";

        using var loggerFactory = LoggerFactory.Create(builder => builder.AddConsole());
        var logger = loggerFactory.CreateLogger<FirebaseService>();
        _firebaseService = new FirebaseService(logger);
        
        _firebaseService.InitializeApp(_appName, jsonPath, projectId);
    }

    [Fact]
    public async Task Auth_CreateCustomToken_Test()
    {
        var token = await _firebaseService.CreateCustomTokenAsync(_appName, "test-user-123");
        Assert.False(string.IsNullOrEmpty(token));
    }

    [Fact]
    public async Task Firestore_Notification_Test()
    {
        var path = "notifications/test-request-id";
        var data = new { status = "success", message = "Data processed", timestamp = DateTime.UtcNow };

        // Publish
        await _firebaseService.PublishToAddressPathAsync(_appName, path, data);

        // Verify (optional, could read it back)
        var db = _firebaseService.GetFirestore(_appName);
        var doc = await db.Document(path).GetSnapshotAsync();
        Assert.True(doc.Exists);

        // Delete
        await _firebaseService.DeleteAddressPathAsync(_appName, path);
        doc = await db.Document(path).GetSnapshotAsync();
        Assert.False(doc.Exists);
    }

    [Fact]
    public async Task Storage_FullCycle_Test()
    {
        var objectName = "tests/test-file.txt";
        var content = "Hello Firebase Storage " + Guid.NewGuid();
        var contentType = "text/plain";

        // 1. Upload
        using var stream = new MemoryStream(System.Text.Encoding.UTF8.GetBytes(content));
        string mediaLink;
        try {
            mediaLink = await _firebaseService.UploadFileAsync(_appName, _testBucket, objectName, stream, contentType);
        } catch (Google.GoogleApiException ex) when (ex.HttpStatusCode == System.Net.HttpStatusCode.NotFound) {
            // Fallback to project id as bucket
            var fallbackBucket = _testBucket.Split('.')[0];
            mediaLink = await _firebaseService.UploadFileAsync(_appName, fallbackBucket, objectName, stream, contentType);
        }
        Assert.Contains(objectName, mediaLink);

        // 2. Get Signed URL
        var signedUrl = _firebaseService.GetSignedUrl(_appName, _testBucket, objectName, TimeSpan.FromMinutes(5));
        Assert.Contains("GoogleAccessId", signedUrl);

        // 3. Read back
        var bytes = await _firebaseService.ReadFileAsync(_appName, _testBucket, objectName);
        var readContent = System.Text.Encoding.UTF8.GetString(bytes);
        Assert.Equal(content, readContent);

        // 4. List
        var files = await _firebaseService.ListFilesAsync(_appName, _testBucket, "tests/");
        Assert.Contains(objectName, files);

        // 5. Delete
        await _firebaseService.DeleteFileAsync(_appName, _testBucket, objectName);
        files = await _firebaseService.ListFilesAsync(_appName, _testBucket, "tests/");
        Assert.DoesNotContain(objectName, files);
    }
}
