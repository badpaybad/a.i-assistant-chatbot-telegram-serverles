using Core.Infra.Base.Interfaces;
using Core.Infra.FilesFolders.Contexts;
using Core.Infra.FilesFolders.Models;
using Core.Infra.Firebase.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Core.Infra.FilesFolders.Handlers;

public class FilesFoldersCommandHandler : 
    ICommandHandler<CreateFolderCommand>,
    ICommandHandler<DeleteFolderCommand>,
    ICommandHandler<MoveFolderCommand>,
    ICommandHandler<UploadFileCommand>,
    ICommandHandler<DeleteFileCommand>,
    ICommandHandler<MoveFileCommand>,
    ICommandHandler<SetFilePermissionCommand>
{
    private readonly FilesFoldersDbContext _db;
    private readonly FirebaseService _firebaseService;
    private readonly ILogger<FilesFoldersCommandHandler> _logger;
    private const string AppName = "default"; // Assuming default app name
    private const string BucketName = "tree-of-thought-files"; // Should be configured

    public FilesFoldersCommandHandler(
        FilesFoldersDbContext db, 
        FirebaseService firebaseService,
        ILogger<FilesFoldersCommandHandler> logger)
    {
        _db = db;
        _firebaseService = firebaseService;
        _logger = logger;
    }

    public async Task HandleAsync(CreateFolderCommand command)
    {
        var parentPath = "";
        if (command.ParentId.HasValue)
        {
            var parent = await _db.Folders.FindAsync(command.ParentId.Value);
            if (parent != null) parentPath = parent.Path;
        }

        var folder = new Folder
        {
            ParentId = command.ParentId,
            Name = command.Name,
            UserId = Guid.Parse(command.UserId!),
            Path = $"{parentPath}{command.Name}/",
            CreatedBy = command.UserId
        };

        _db.Folders.Add(folder);
        await _db.SaveChangesAsync();
    }

    public async Task HandleAsync(DeleteFolderCommand command)
    {
        var folder = await _db.Folders.FindAsync(command.FolderId);
        if (folder == null) return;

        // Recursive delete: find all subfolders and files
        var subfolders = await _db.Folders.Where(f => f.Path.StartsWith(folder.Path)).ToListAsync();
        var folderIds = subfolders.Select(f => (Guid?)f.Id).ToList();
        folderIds.Add(folder.Id);

        var files = await _db.Files.Where(f => folderIds.Contains(f.FolderId)).ToListAsync();

        // Delete files from GCS
        foreach (var file in files)
        {
            try 
            {
                var objectName = GetGcsObjectName(file);
                await _firebaseService.DeleteFileAsync(AppName, BucketName, objectName);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting file {FileId} from GCS", file.Id);
            }
        }

        _db.Files.RemoveRange(files);
        _db.Folders.RemoveRange(subfolders);
        _db.Folders.Remove(folder);
        await _db.SaveChangesAsync();
    }

    public async Task HandleAsync(MoveFolderCommand command)
    {
        var folder = await _db.Folders.FindAsync(command.FolderId);
        if (folder == null) return;

        var oldPath = folder.Path;
        var parentPath = "";
        if (command.NewParentId.HasValue)
        {
            var parent = await _db.Folders.FindAsync(command.NewParentId.Value);
            if (parent != null) parentPath = parent.Path;
        }

        var newPath = $"{parentPath}{folder.Name}/";
        folder.ParentId = command.NewParentId;
        folder.Path = newPath;
        folder.UpdatedBy = command.UserId;

        // Update all subfolders paths
        var subfolders = await _db.Folders.Where(f => f.Path.StartsWith(oldPath) && f.Id != folder.Id).ToListAsync();
        foreach (var sub in subfolders)
        {
            sub.Path = sub.Path.Replace(oldPath, newPath);
        }

        await _db.SaveChangesAsync();
    }

    public async Task HandleAsync(UploadFileCommand command)
    {
        var path = "";
        if (command.FolderId != Guid.Empty)
        {
            var folder = await _db.Folders.FindAsync(command.FolderId);
            if (folder != null) path = folder.Path;
        }

        var objectName = $"{path}{Guid.NewGuid()}_{command.FileName}";
        using var stream = new MemoryStream(command.Content);
        var url = await _firebaseService.UploadFileAsync(AppName, BucketName, objectName, stream, command.ContentType);

        var file = new FileItem
        {
            FolderId = command.FolderId == Guid.Empty ? null : command.FolderId,
            Name = command.FileName,
            Url = url,
            Size = command.Content.Length,
            MimeType = command.ContentType,
            UserId = Guid.Parse(command.UserId!),
            CreatedBy = command.UserId
        };

        _db.Files.Add(file);
        await _db.SaveChangesAsync();
    }

    public async Task HandleAsync(DeleteFileCommand command)
    {
        var file = await _db.Files.FindAsync(command.FileId);
        if (file == null) return;

        try
        {
            var objectName = GetGcsObjectName(file);
            await _firebaseService.DeleteFileAsync(AppName, BucketName, objectName);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting file {FileId} from GCS", file.Id);
        }

        _db.Files.Remove(file);
        await _db.SaveChangesAsync();
    }

    public async Task HandleAsync(MoveFileCommand command)
    {
        var file = await _db.Files.FindAsync(command.FileId);
        if (file == null) return;

        file.FolderId = command.NewFolderId;
        file.UpdatedBy = command.UserId;
        await _db.SaveChangesAsync();
    }

    public async Task HandleAsync(SetFilePermissionCommand command)
    {
        var file = await _db.Files.FindAsync(command.FileId);
        if (file == null) return;

        file.Permission = command.Permission;
        file.ShareCode = command.ShareCode;
        file.ExpiredAt = command.ExpiredAt;
        file.UpdatedBy = command.UserId;
        await _db.SaveChangesAsync();
    }

    private string GetGcsObjectName(FileItem file)
    {
        // Extract object name from URL or store it in DB. 
        // For now, parsing from URL: https://storage.googleapis.com/{bucket}/{objectName}
        var uri = new Uri(file.Url);
        var parts = uri.AbsolutePath.Split('/', 3);
        return parts.Length > 2 ? parts[2] : file.Name;
    }
}
