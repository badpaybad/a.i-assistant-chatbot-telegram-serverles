using Core.Infra.FilesFolders.Contexts;
using Core.Infra.FilesFolders.Models;
using Core.Infra.Firebase.Services;
using Microsoft.EntityFrameworkCore;

namespace Core.Infra.FilesFolders.Services;

public class FilesFoldersService
{
    private readonly FilesFoldersDbContext _db;
    private readonly FirebaseService _firebaseService;
    private const string AppName = "Default";
    private const string BucketName = "dunp-test-gcs";

    public FilesFoldersService(FilesFoldersDbContext db, FirebaseService firebaseService)
    {
        _db = db;
        _firebaseService = firebaseService;
    }

    public async Task<List<FolderDto>> GetFolderTreeAsync(Guid userId)
    {
        var folders = await _db.Folders
            .Where(f => f.UserId == userId)
            .OrderBy(f => f.Path)
            .ToListAsync();

        var dtos = folders.Select(f => new FolderDto
        {
            Id = f.Id,
            ParentId = f.ParentId,
            Name = f.Name,
            Path = f.Path
        }).ToList();

        // Build tree
        var dict = dtos.ToDictionary(d => d.Id);
        var root = new List<FolderDto>();

        foreach (var dto in dtos)
        {
            if (dto.ParentId.HasValue && dict.TryGetValue(dto.ParentId.Value, out var parent))
            {
                parent.Children.Add(dto);
            }
            else
            {
                root.Add(dto);
            }
        }

        return root;
    }

    public async Task<FolderContentDto> GetFolderContentAsync(Guid userId, Guid? folderId, int pageIndex = 1, int pageSize = 10)
    {
        var folders = await _db.Folders
            .Where(f => f.UserId == userId && f.ParentId == folderId)
            .OrderBy(f => f.Name)
            .Select(f => new FolderDto
            {
                Id = f.Id,
                ParentId = f.ParentId,
                Name = f.Name,
                Path = f.Path
            })
            .ToListAsync();

        var query = _db.Files
            .Where(f => f.UserId == userId && f.FolderId == folderId);

        var totalFiles = await query.CountAsync();

        var files = await query
            .OrderBy(f => f.Name)
            .Skip((pageIndex - 1) * pageSize)
            .Take(pageSize)
            .Select(f => new FileDto
            {
                Id = f.Id,
                FolderId = f.FolderId,
                Name = f.Name,
                Url = f.Url,
                Size = f.Size,
                MimeType = f.MimeType,
                Permission = f.Permission,
                CreatedAt = f.CreatedAt
            })
            .ToListAsync();

        return new FolderContentDto
        {
            Folders = folders,
            Files = files,
            TotalFiles = totalFiles
        };
    }

    public async Task<FileDto?> GetFileByIdAsync(Guid userId, Guid fileId)
    {
        var f = await _db.Files.FirstOrDefaultAsync(f => f.Id == fileId && f.UserId == userId);
        if (f == null) return null;

        return new FileDto
        {
            Id = f.Id,
            FolderId = f.FolderId,
            Name = f.Name,
            Url = f.Url,
            Size = f.Size,
            MimeType = f.MimeType,
            Permission = f.Permission,
            CreatedAt = f.CreatedAt
        };
    }

    public async Task<FileDto> UploadFileAsync(Guid userId, Guid? folderId, string fileName, string contentType, byte[] content, PermissionType permission = PermissionType.Private)
    {
        var path = "";
        if (folderId.HasValue && folderId.Value != Guid.Empty)
        {
            var folder = await _db.Folders.FindAsync(folderId.Value);
            if (folder != null) path = folder.Path;
        }

        var objectName = $"{path}{Guid.NewGuid()}_{fileName}";
        using var stream = new MemoryStream(content);
        var url = await _firebaseService.UploadFileAsync(AppName, BucketName, objectName, stream, contentType);

        var file = new FileItem
        {
            FolderId = (folderId == Guid.Empty) ? null : folderId,
            Name = fileName,
            Url = url,
            Size = content.Length,
            MimeType = contentType,
            UserId = userId,
            Permission = permission,
            CreatedBy = userId.ToString(),
            CreatedAt = DateTime.UtcNow
        };

        _db.Files.Add(file);
        await _db.SaveChangesAsync();

        return new FileDto
        {
            Id = file.Id,
            FolderId = file.FolderId,
            Name = file.Name,
            Url = file.Url,
            Size = file.Size,
            MimeType = file.MimeType,
            Permission = file.Permission,
            CreatedAt = file.CreatedAt
        };
    }

    public async Task<List<FileDto>> SearchFilesAsync(Guid userId, string query)
    {
        return await _db.Files
            .Where(f => f.UserId == userId && f.Name.ToLower().Contains(query.ToLower()))
            .OrderByDescending(f => f.CreatedAt)
            .Take(50)
            .Select(f => new FileDto
            {
                Id = f.Id,
                FolderId = f.FolderId,
                Name = f.Name,
                Url = f.Url,
                Size = f.Size,
                MimeType = f.MimeType,
                Permission = f.Permission,
                CreatedAt = f.CreatedAt
            })
            .ToListAsync();
    }

    public async Task<EditorFileItem> UploadEditorFileAsync(Guid userId, string fileName, string contentType, byte[] content)
    {
        var objectName = $"editor/{Guid.NewGuid()}_{fileName}";
        using var stream = new MemoryStream(content);
        var url = await _firebaseService.UploadFileAsync(AppName, BucketName, objectName, stream, contentType);

        var file = new EditorFileItem
        {
            Name = fileName,
            Url = url,
            Size = content.Length,
            MimeType = contentType,
            UserId = userId,
            CreatedBy = userId.ToString(),
            CreatedAt = DateTime.UtcNow
        };

        _db.EditorFiles.Add(file);
        await _db.SaveChangesAsync();

        return file;
    }
}
