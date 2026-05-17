using Core.Infra.Base.Interfaces;
using Core.Infra.FilesFolders.Contexts;
using Core.Infra.FilesFolders.Models;
using Core.Infra.FilesFolders.Services;
using Core.Infra.Firebase.Services;
using Core.Infra.Firebase.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Core.Infra.FilesFolders.Handlers;

public class FilesFoldersCommandHandler : 
    ICommandHandler<CreateFolderCommand>,
    ICommandHandler<DeleteFolderCommand>,
    ICommandHandler<MoveFolderCommand>,
    ICommandHandler<UploadFileCommand>,
    ICommandHandler<DeleteFileCommand>,
    ICommandHandler<MoveFileCommand>,
    ICommandHandler<SetFilePermissionCommand>,
    ICommandHandler<RenameFolderCommand>,
    ICommandHandler<RenameFileCommand>
{
    private readonly FilesFoldersDbContext _db;
    private readonly FirebaseService _firebaseService;
    private readonly IDispatcher _dispatcher;
    private readonly ILogger<FilesFoldersCommandHandler> _logger;

    public FilesFoldersCommandHandler(
        FilesFoldersDbContext db, 
        FirebaseService firebaseService,
        IDispatcher dispatcher,
        ILogger<FilesFoldersCommandHandler> logger)
    {
        _db = db;
        _firebaseService = firebaseService;
        _dispatcher = dispatcher;
        _logger = logger;
    }

    public async Task HandleAsync(CreateFolderCommand command)
    {
        var parentPath = "";
        if (command.ParentId.HasValue && command.ParentId.Value != Guid.Empty)
        {
            var parent = await _db.Folders.FindAsync(command.ParentId.Value);
            if (parent != null) parentPath = parent.Path;
        }

        var folder = new Folder
        {
            ParentId = (command.ParentId == Guid.Empty) ? null : command.ParentId,
            Name = command.Name,
            UserId = Guid.Parse(command.UserId!),
            Path = $"{parentPath}{command.Name}/",
            CreatedBy = command.UserId
        };

        _db.Folders.Add(folder);
        await _db.SaveChangesAsync();

        await _dispatcher.PublishAsync(new FolderCreatedEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId,
            FolderId = folder.Id,
            Name = folder.Name,
            Message = $"Thư mục '{folder.Name}' đã được tạo"
        });
    }

    public async Task HandleAsync(DeleteFolderCommand command)
    {
        var folder = await _db.Folders.FindAsync(command.FolderId);
        if (folder == null) return;

        var folderPath = folder.Path;
        var folderName = folder.Name;

        // 1. Recursive DB search: find all descendant folders and their files
        // Path.StartsWith ensures we get the folder itself and all nested subfolders
        var subfolders = await _db.Folders.Where(f => f.Path.StartsWith(folderPath)).ToListAsync();
        var folderIds = subfolders.Select(f => (Guid?)f.Id).ToList();

        var filesInDb = await _db.Files.Where(f => folderIds.Contains(f.FolderId)).ToListAsync();

        _logger.LogInformation("Starting thorough deletion for folder '{FolderName}' (ID: {FolderId}, Path: {Path}). Found {SubfolderCount} subfolders and {FileCount} files in DB.", 
            folderName, command.FolderId, folderPath, subfolders.Count, filesInDb.Count);

        // 2. Individual GCS Deletion (from DB URLs)
        // Ensures files with diverged paths (due to past moves/renames) are deleted.
        foreach (var file in filesInDb)
        {
            try 
            {
                var objectName = GetGcsObjectName(file);
                await _firebaseService.DeleteFileAsync(objectName);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Could not delete file {FileId} from GCS (URL={Url}). It might have been already deleted.", file.Id, file.Url);
            }
        }

        // 3. Prefix-based GCS Cleanup (Thorough cleanup of orphans)
        // Ensures any files matching the prefix that are NOT in the DB are also removed to avoid storage costs.
        try
        {
            var gcsObjects = await _firebaseService.ListFilesAsync(folderPath);
            foreach (var objectName in gcsObjects)
            {
                try
                {
                    await _firebaseService.DeleteFileAsync(objectName);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error deleting GCS object during prefix cleanup: {ObjectName}", objectName);
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during thorough GCS prefix cleanup for path: {Path}", folderPath);
        }

        // 4. Final DB Wipe
        _db.Files.RemoveRange(filesInDb);
        _db.Folders.RemoveRange(subfolders);
        
        await _db.SaveChangesAsync();

        await _dispatcher.PublishAsync(new FolderDeletedEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId,
            FolderId = command.FolderId,
            Message = $"Thư mục '{folderName}' và toàn bộ nội dung đã được xóa triệt để"
        });
    }

    public async Task HandleAsync(MoveFolderCommand command)
    {
        var folder = await _db.Folders.FindAsync(command.FolderId);
        if (folder == null) return;

        var oldPath = folder.Path;
        var parentPath = "";
        if (command.NewParentId.HasValue && command.NewParentId.Value != Guid.Empty)
        {
            var parent = await _db.Folders.FindAsync(command.NewParentId.Value);
            if (parent != null) parentPath = parent.Path;
        }

        var newPath = $"{parentPath}{folder.Name}/";
        folder.ParentId = (command.NewParentId == Guid.Empty) ? null : command.NewParentId;
        folder.Path = newPath;
        folder.UpdatedBy = command.UserId;

        // Update all subfolders paths
        var subfolders = await _db.Folders.Where(f => f.Path.StartsWith(oldPath) && f.Id != folder.Id).ToListAsync();
        foreach (var sub in subfolders)
        {
            sub.Path = sub.Path.Replace(oldPath, newPath);
        }

        await _db.SaveChangesAsync();

        await _dispatcher.PublishAsync(new FolderMovedEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId,
            FolderId = command.FolderId,
            NewParentId = command.NewParentId,
            Message = $"Thư mục '{folder.Name}' đã được di chuyển"
        });
    }

    public async Task HandleAsync(UploadFileCommand command)
    {
        var userId = Guid.Parse(command.UserId!);
        var path = "";
        if (command.FolderId.HasValue && command.FolderId.Value != Guid.Empty)
        {
            var folder = await _db.Folders.FindAsync(command.FolderId.Value);
            if (folder != null) path = folder.Path;
        }

        var objectName = $"{path}{Guid.NewGuid()}_{command.FileName}";
        using var stream = new MemoryStream(command.Content);
        var url = await _firebaseService.UploadFileAsync(objectName, stream, command.ContentType, false);

        var file = new FileItem
        {
            FolderId = (command.FolderId == Guid.Empty) ? null : command.FolderId,
            Name = command.FileName,
            Url = url,
            Size = command.Content.Length,
            MimeType = command.ContentType,
            UserId = userId,
            Permission = PermissionType.Private,
            CreatedBy = command.UserId,
            CreatedAt = DateTime.UtcNow
        };

        _db.Files.Add(file);
        await _db.SaveChangesAsync();

        await _dispatcher.PublishAsync(new FileUploadedEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId,
            FileId = file.Id,
            Name = file.Name,
            Url = file.Url,
            Message = $"File '{file.Name}' đã được upload thành công"
        });
    }

    public async Task HandleAsync(DeleteFileCommand command)
    {
        var file = await _db.Files.FindAsync(command.FileId);
        if (file == null) return;

        try
        {
            var objectName = GetGcsObjectName(file);
            await _firebaseService.DeleteFileAsync(objectName);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting file {FileId} from GCS", file.Id);
        }

        _db.Files.Remove(file);
        await _db.SaveChangesAsync();

        await _dispatcher.PublishAsync(new FileDeletedEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId,
            FileId = command.FileId,
            Message = $"File '{file.Name}' đã được xóa"
        });
    }

    public async Task HandleAsync(MoveFileCommand command)
    {
        var file = await _db.Files.FindAsync(command.FileId);
        if (file == null) return;

        file.FolderId = (command.NewFolderId == Guid.Empty) ? null : command.NewFolderId;
        file.UpdatedBy = command.UserId;
        await _db.SaveChangesAsync();

        await _dispatcher.PublishAsync(new FileMovedEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId,
            FileId = command.FileId,
            NewFolderId = command.NewFolderId,
            Message = $"File '{file.Name}' đã được di chuyển"
        });
    }

    public async Task HandleAsync(SetFilePermissionCommand command)
    {
        var file = await _db.Files.FindAsync(command.FileId);
        if (file == null) return;

        var oldPermission = file.Permission;
        file.Permission = command.Permission;
        file.ShareCode = command.ShareCode;
        file.ExpiredAt = command.ExpiredAt;
        file.UpdatedBy = command.UserId;

        // Ensure GCS ACL matches the permission
        // Public (1) -> GCS Public
        // Private (0) or Shared (2) -> GCS Private
        try
        {
            var objectName = GetGcsObjectName(file);
            bool isPublic = file.Permission == PermissionType.Public;
            _logger.LogInformation("Updating GCS ACL for {FileId}: ObjectName={ObjectName}, isPublic={IsPublic}", file.Id, objectName, isPublic);
            await _firebaseService.UpdateObjectAclAsync(objectName, isPublic);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating GCS ACL for file {FileId}", file.Id);
        }

        await _db.SaveChangesAsync();

        await _dispatcher.PublishAsync(new FilePermissionSetEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId,
            FileId = command.FileId,
            Permission = command.Permission,
            Message = $"Quyền của file '{file.Name}' đã được cập nhật thành {command.Permission}"
        });
    }

    public async Task HandleAsync(RenameFolderCommand command)
    {
        var folder = await _db.Folders.FindAsync(command.FolderId);
        if (folder == null) return;

        var oldName = folder.Name;
        var oldPath = folder.Path;
        
        // Calculate new path based on parent path + new name
        var parentPath = "";
        if (folder.ParentId.HasValue)
        {
            var parent = await _db.Folders.FindAsync(folder.ParentId.Value);
            if (parent != null) parentPath = parent.Path;
        }
        var newPath = $"{parentPath}{command.NewName}/";

        folder.Name = command.NewName;
        folder.Path = newPath;
        folder.UpdatedBy = command.UserId;

        // Update all subfolders paths recursively
        var subfolders = await _db.Folders.Where(f => f.Path.StartsWith(oldPath) && f.Id != folder.Id).ToListAsync();
        foreach (var sub in subfolders)
        {
            sub.Path = sub.Path.Replace(oldPath, newPath);
        }

        await _db.SaveChangesAsync();

        await _dispatcher.PublishAsync(new FolderRenamedEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId,
            FolderId = command.FolderId,
            NewName = command.NewName,
            Message = $"Thư mục đã được đổi tên từ '{oldName}' thành '{command.NewName}'"
        });
    }

    public async Task HandleAsync(RenameFileCommand command)
    {
        var file = await _db.Files.FindAsync(command.FileId);
        if (file == null) return;

        var oldName = file.Name;
        file.Name = command.NewName;
        file.UpdatedBy = command.UserId;

        await _db.SaveChangesAsync();

        await _dispatcher.PublishAsync(new FileRenamedEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId,
            FileId = command.FileId,
            NewName = command.NewName,
            Message = $"File đã được đổi tên từ '{oldName}' thành '{command.NewName}'"
        });
    }

    private string GetGcsObjectName(FileItem file)
    {
        // Extract object name from URL: https://storage.googleapis.com/{bucket}/{objectName}
        var uri = new Uri(file.Url);
        var path = uri.AbsolutePath; // /bucket/objectName
        var parts = path.Split('/', 3);
        return Uri.UnescapeDataString(parts.Length > 2 ? parts[2] : file.Name);
    }
}
