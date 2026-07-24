using Core.Infra.FilesFolders.Contexts;
using Core.Infra.FilesFolders.Models;
using Core.Infra.Firebase.Services;
using Core.Infra.Firebase.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Core.Infra.FilesFolders.Services;

public class FilesFoldersService
{
    private readonly FilesFoldersDbContext _db;
    private readonly FirebaseService _firebaseService;
    private readonly FirebaseOptions _firebaseOptions;

    public FilesFoldersService(FilesFoldersDbContext db, FirebaseService firebaseService, IOptions<FirebaseOptions> firebaseOptions)
    {
        _db = db;
        _firebaseService = firebaseService;
        _firebaseOptions = firebaseOptions.Value;
    }

    public async Task<List<FolderDto>> GetFolderTreeAsync(Guid userId)
    {
        var folders = await _db.folders
            .Where(f => f.user_id == userId)
            .OrderBy(f => f.path)
            .ToListAsync();

        var dtos = folders.Select(f => new FolderDto
        {
            Id = f.id,
            ParentId = f.parent_id,
            Name = f.name,
            Path = f.path
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
        var folders = await _db.folders
            .Where(f => f.user_id == userId && f.parent_id == folderId)
            .OrderBy(f => f.name)
            .Select(f => new FolderDto
            {
                Id = f.id,
                ParentId = f.parent_id,
                Name = f.name,
                Path = f.path
            })
            .ToListAsync();

        var query = _db.files
            .Where(f => f.user_id == userId && f.folder_id == folderId);

        var totalFiles = await query.CountAsync();

        var files = await query
            .OrderBy(f => f.name)
            .Skip((pageIndex - 1) * pageSize)
            .Take(pageSize)
            .Select(f => new FileDto
            {
                Id = f.id,
                FolderId = f.folder_id,
                Name = f.name,
                Url = f.url,
                Size = f.size,
                MimeType = f.mime_type,
                Permission = f.permission,
                CreatedAt = f.created_at
            })
            .ToListAsync();

        var breadcrumbs = new List<FolderDto>();
        if (folderId.HasValue)
        {
            var currentId = folderId;
            while (currentId.HasValue && currentId.Value != Guid.Empty)
            {
                var folder = await _db.folders.FindAsync(currentId.Value);
                if (folder == null || folder.user_id != userId) break;

                breadcrumbs.Insert(0, new FolderDto
                {
                    Id = folder.id,
                    ParentId = folder.parent_id,
                    Name = folder.name,
                    Path = folder.path
                });
                currentId = folder.parent_id;
            }
        }

        return new FolderContentDto
        {
            Folders = folders,
            Files = files,
            TotalFiles = totalFiles,
            Breadcrumbs = breadcrumbs
        };
    }

    public async Task<FileDto?> GetFileByIdAsync(Guid userId, Guid fileId)
    {
        var f = await _db.files.FirstOrDefaultAsync(f => f.id == fileId && f.user_id == userId);
        if (f == null) return null;

        return new FileDto
        {
            Id = f.id,
            FolderId = f.folder_id,
            Name = f.name,
            Url = f.url,
            Size = f.size,
            MimeType = f.mime_type,
            Permission = f.permission,
            CreatedAt = f.created_at
        };
    }

    public async Task<FileDto> UploadFileAsync(Guid userId, Guid? folderId, string fileName, string contentType, byte[] content, PermissionType permission = PermissionType.Private)
    {
        var path = "";
        if (folderId.HasValue && folderId.Value != Guid.Empty)
        {
            var folder = await _db.folders.FindAsync(folderId.Value);
            if (folder != null) path = folder.path;
        }

        var objectName = $"{path}{Guid.NewGuid()}_{fileName}";
        using var stream = new MemoryStream(content);
        var url = await _firebaseService.UploadFileAsync(_firebaseOptions.AppName, _firebaseOptions.BucketName, objectName, stream, contentType, permission == PermissionType.Public);

        var file = new files_entity
        {
            folder_id = (folderId == Guid.Empty) ? null : folderId,
            name = fileName,
            url = url,
            size = content.Length,
            mime_type = contentType,
            user_id = userId,
            permission = permission,
            created_by = userId.ToString(),
            created_at = DateTime.UtcNow
        };

        _db.files.Add(file);
        await _db.SaveChangesAsync();

        return new FileDto
        {
            Id = file.id,
            FolderId = file.folder_id,
            Name = file.name,
            Url = file.url,
            Size = file.size,
            MimeType = file.mime_type,
            Permission = file.permission,
            CreatedAt = file.created_at
        };
    }

    public async Task<List<FileDto>> SearchFilesAsync(Guid userId, string query)
    {
        var files = await _db.files
            .Where(f => f.user_id == userId && f.name.ToLower().Contains(query.ToLower()))
            .OrderByDescending(f => f.created_at)
            .Take(50)
            .ToListAsync();

        var result = new List<FileDto>();
        foreach (var file in files)
        {
            var folderPath = "/";
            if (file.folder_id.HasValue)
            {
                var folder = await _db.folders.FindAsync(file.folder_id.Value);
                if (folder != null) folderPath = folder.path;
            }

            result.Add(new FileDto
            {
                Id = file.id,
                FolderId = file.folder_id,
                Name = file.name,
                Url = file.url,
                Size = file.size,
                MimeType = file.mime_type,
                Permission = file.permission,
                CreatedAt = file.created_at,
                FolderPath = folderPath
            });
        }
        return result;
    }

    public async Task<editor_files_entity> UploadEditorFileAsync(Guid userId, string fileName, string contentType, byte[] content)
    {
        var objectName = $"editor/{Guid.NewGuid()}_{fileName}";
        using var stream = new MemoryStream(content);
        var url = await _firebaseService.UploadFileAsync(_firebaseOptions.AppName, _firebaseOptions.BucketName, objectName, stream, contentType, true);

        var file = new editor_files_entity
        {
            name = fileName,
            url = url,
            size = content.Length,
            mime_type = contentType,
            user_id = userId,
            created_by = userId.ToString(),
            created_at = DateTime.UtcNow
        };

        _db.editor_files.Add(file);
        await _db.SaveChangesAsync();

        return file;
    }
}
