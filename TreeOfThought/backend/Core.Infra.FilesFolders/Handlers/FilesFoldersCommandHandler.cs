using Core.Infra.Base.Interfaces;
using Core.Infra.FilesFolders.Contexts;
using Core.Infra.FilesFolders.Models;
using Core.Infra.FilesFolders.Services;
using Core.Infra.Firebase.Services;
using Core.Infra.Firebase.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

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
            var parent = await _db.folders.FindAsync(command.ParentId.Value);
            if (parent != null) parentPath = parent.path;
        }

        var folder = new folders_entity
        {
            parent_id = (command.ParentId == Guid.Empty) ? null : command.ParentId,
            name = command.Name,
            user_id = Guid.Parse(command.UserId!),
            path = $"{parentPath}{command.Name}/",
            created_by = command.UserId
        };

        _db.folders.Add(folder);
        await _db.SaveChangesAsync();

        await _dispatcher.PublishAsync(new FolderCreatedEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId,
            FolderId = folder.id,
            Name = folder.name,
            Message = $"Thư mục '{folder.name}' đã được tạo"
        });
    }

    public async Task HandleAsync(DeleteFolderCommand command)
    {
        var folder = await _db.folders.FindAsync(command.FolderId);
        if (folder == null) return;

        var folderPath = folder.path;
        var folderName = folder.name;

        // 1. Recursive DB search: find all descendant folders and their files
        var subfolders = await _db.folders.Where(f => f.path.StartsWith(folderPath)).ToListAsync();
        var folderIds = subfolders.Select(f => (Guid?)f.id).ToList();

        var filesInDb = await _db.files.Where(f => folderIds.Contains(f.folder_id)).ToListAsync();

        _logger.LogInformation("Starting thorough deletion for folder '{FolderName}' (ID: {FolderId}, Path: {Path}). Found {SubfolderCount} subfolders and {FileCount} files in DB.", 
            folderName, command.FolderId, folderPath, subfolders.Count, filesInDb.Count);

        // 2. Individual GCS Deletion (from DB URLs)
        foreach (var file in filesInDb)
        {
            try 
            {
                var objectName = GetGcsObjectName(file);
                await _firebaseService.DeleteFileAsync(objectName);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Could not delete file {FileId} from GCS (URL={Url}). It might have been already deleted.", file.id, file.url);
            }
        }

        // 3. Prefix-based GCS Cleanup (Thorough cleanup of orphans)
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
        _db.files.RemoveRange(filesInDb);
        _db.folders.RemoveRange(subfolders);
        
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
        var folder = await _db.folders.FindAsync(command.FolderId);
        if (folder == null) return;

        var oldPath = folder.path;
        var parentPath = "";
        if (command.NewParentId.HasValue && command.NewParentId.Value != Guid.Empty)
        {
            var parent = await _db.folders.FindAsync(command.NewParentId.Value);
            if (parent != null) parentPath = parent.path;
        }

        var newPath = $"{parentPath}{folder.name}/";
        folder.parent_id = (command.NewParentId == Guid.Empty) ? null : command.NewParentId;
        folder.path = newPath;
        folder.updated_by = command.UserId;

        // Update all subfolders paths
        var subfolders = await _db.folders.Where(f => f.path.StartsWith(oldPath) && f.id != folder.id).ToListAsync();
        foreach (var sub in subfolders)
        {
            sub.path = sub.path.Replace(oldPath, newPath);
        }

        await _db.SaveChangesAsync();

        await _dispatcher.PublishAsync(new FolderMovedEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId,
            FolderId = command.FolderId,
            NewParentId = command.NewParentId,
            Message = $"Thư mục '{folder.name}' đã được di chuyển"
        });
    }

    public async Task HandleAsync(UploadFileCommand command)
    {
        var userId = Guid.Parse(command.UserId!);
        var path = "";
        if (command.FolderId.HasValue && command.FolderId.Value != Guid.Empty)
        {
            var folder = await _db.folders.FindAsync(command.FolderId.Value);
            if (folder != null) path = folder.path;
        }

        var objectName = $"{path}{Guid.NewGuid()}_{command.FileName}";
        using var stream = new MemoryStream(command.Content);
        var url = await _firebaseService.UploadFileAsync(objectName, stream, command.ContentType, false);

        var file = new files_entity
        {
            folder_id = (command.FolderId == Guid.Empty) ? null : command.FolderId,
            name = command.FileName,
            url = url,
            size = command.Content.Length,
            mime_type = command.ContentType,
            user_id = userId,
            permission = PermissionType.Private,
            created_by = command.UserId,
            created_at = DateTime.UtcNow
        };

        _db.files.Add(file);
        await _db.SaveChangesAsync();

        await _dispatcher.PublishAsync(new FileUploadedEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId,
            FileId = file.id,
            Name = file.name,
            Url = file.url,
            Message = $"File '{file.name}' đã được upload thành công"
        });
    }

    public async Task HandleAsync(DeleteFileCommand command)
    {
        var file = await _db.files.FindAsync(command.FileId);
        if (file == null) return;

        try
        {
            var objectName = GetGcsObjectName(file);
            await _firebaseService.DeleteFileAsync(objectName);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting file {FileId} from GCS", file.id);
        }

        _db.files.Remove(file);
        await _db.SaveChangesAsync();

        await _dispatcher.PublishAsync(new FileDeletedEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId,
            FileId = command.FileId,
            Message = $"File '{file.name}' đã được xóa"
        });
    }

    public async Task HandleAsync(MoveFileCommand command)
    {
        var file = await _db.files.FindAsync(command.FileId);
        if (file == null) return;

        file.folder_id = (command.NewFolderId == Guid.Empty) ? null : command.NewFolderId;
        file.updated_by = command.UserId;
        await _db.SaveChangesAsync();

        await _dispatcher.PublishAsync(new FileMovedEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId,
            FileId = command.FileId,
            NewFolderId = command.NewFolderId,
            Message = $"File '{file.name}' đã được di chuyển"
        });
    }

    public async Task HandleAsync(SetFilePermissionCommand command)
    {
        var file = await _db.files.FindAsync(command.FileId);
        if (file == null) return;

        var oldPermission = file.permission;
        file.permission = command.Permission;
        file.share_code = command.ShareCode;
        file.expired_at = command.ExpiredAt;
        file.updated_by = command.UserId;

        // Ensure GCS ACL matches the permission
        try
        {
            var objectName = GetGcsObjectName(file);
            bool isPublic = file.permission == PermissionType.Public;
            _logger.LogInformation("Updating GCS ACL for {FileId}: ObjectName={ObjectName}, isPublic={IsPublic}", file.id, objectName, isPublic);
            await _firebaseService.UpdateObjectAclAsync(objectName, isPublic);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating GCS ACL for file {FileId}", file.id);
        }

        await _db.SaveChangesAsync();

        await _dispatcher.PublishAsync(new FilePermissionSetEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId,
            FileId = command.FileId,
            Permission = command.Permission,
            Message = $"Quyền của file '{file.name}' đã được cập nhật thành {command.Permission}"
        });
    }

    public async Task HandleAsync(RenameFolderCommand command)
    {
        var folder = await _db.folders.FindAsync(command.FolderId);
        if (folder == null) return;

        var oldName = folder.name;
        var oldPath = folder.path;
        
        // Calculate new path based on parent path + new name
        var parentPath = "";
        if (folder.parent_id.HasValue)
        {
            var parent = await _db.folders.FindAsync(folder.parent_id.Value);
            if (parent != null) parentPath = parent.path;
        }
        var newPath = $"{parentPath}{command.NewName}/";

        folder.name = command.NewName;
        folder.path = newPath;
        folder.updated_by = command.UserId;

        // Update all subfolders paths recursively
        var subfolders = await _db.folders.Where(f => f.path.StartsWith(oldPath) && f.id != folder.id).ToListAsync();
        foreach (var sub in subfolders)
        {
            sub.path = sub.path.Replace(oldPath, newPath);
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
        var file = await _db.files.FindAsync(command.FileId);
        if (file == null) return;

        var oldName = file.name;
        file.name = command.NewName;
        file.updated_by = command.UserId;

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

    private string GetGcsObjectName(files_entity file)
    {
        // Extract object name from URL: https://storage.googleapis.com/{bucket}/{objectName}
        var uri = new Uri(file.url);
        var path = uri.AbsolutePath; // /bucket/objectName
        var parts = path.Split('/', 3);
        return Uri.UnescapeDataString(parts.Length > 2 ? parts[2] : file.name);
    }
}
