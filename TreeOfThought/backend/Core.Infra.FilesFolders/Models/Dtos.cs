namespace Core.Infra.FilesFolders.Models;

public class FolderDto
{
    public Guid Id { get; set; }
    public Guid? ParentId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Path { get; set; } = string.Empty;
    public List<FolderDto> Children { get; set; } = new();
}

public class FileDto
{
    public Guid Id { get; set; }
    public Guid? FolderId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public long Size { get; set; }
    public string MimeType { get; set; } = string.Empty;
    public PermissionType Permission { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class FolderContentDto
{
    public List<FolderDto> Folders { get; set; } = new();
    public List<FileDto> Files { get; set; } = new();
    public int TotalFiles { get; set; }
    public List<FolderDto> Breadcrumbs { get; set; } = new();
}
