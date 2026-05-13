using Core.Infra.FilesFolders.Contexts;
using Core.Infra.FilesFolders.Models;
using Microsoft.EntityFrameworkCore;

namespace Core.Infra.FilesFolders.Services;

public class FilesFoldersService
{
    private readonly FilesFoldersDbContext _db;

    public FilesFoldersService(FilesFoldersDbContext db)
    {
        _db = db;
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

    public async Task<FolderContentDto> GetFolderContentAsync(Guid userId, Guid? folderId)
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

        var files = await _db.Files
            .Where(f => f.UserId == userId && f.FolderId == folderId)
            .OrderBy(f => f.Name)
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
            Files = files
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
}
