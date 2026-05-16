namespace Core.Infra.Firebase.Models;

public class FirebaseOptions
{
    public const string Firebase = "Firebase";

    public string AppName { get; set; } = "Default";
    public string StorageBucket { get; set; } = string.Empty;
    public string ProjectId { get; set; } = string.Empty;
    public string JsonFilePath { get; set; } = string.Empty;
    public string DatabaseId { get; set; } = "(default)";

    // Aliases for backward compatibility if needed, or just use these
    public string BucketName => StorageBucket;
    public string CredentialsPath => JsonFilePath;
}
