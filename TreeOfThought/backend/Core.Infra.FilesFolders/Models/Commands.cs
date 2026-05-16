using Core.Infra.Base.Interfaces;
using Core.Infra.Base.Models;

namespace Core.Infra.FilesFolders.Models;

public abstract class FilesFoldersCommand : BaseMessage, IBaseCommand
{
    public virtual string QueueName => GetType().Name;
}

public class CreateFolderCommand : FilesFoldersCommand
{
    public Guid? ParentId { get; set; }
    public string Name { get; set; } = string.Empty;
}

public class DeleteFolderCommand : FilesFoldersCommand
{
    public Guid FolderId { get; set; }
}

public class MoveFolderCommand : FilesFoldersCommand
{
    public Guid FolderId { get; set; }
    public Guid? NewParentId { get; set; }
}

public class UploadFileCommand : FilesFoldersCommand
{
    public Guid? FolderId { get; set; }
    public string FileName { get; set; } = string.Empty;
    public string ContentType { get; set; } = string.Empty;
    public byte[] Content { get; set; } = Array.Empty<byte>();
}

public class DeleteFileCommand : FilesFoldersCommand
{
    public Guid FileId { get; set; }
}

public class MoveFileCommand : FilesFoldersCommand
{
    public Guid FileId { get; set; }
    public Guid? NewFolderId { get; set; }
}

public class SetFilePermissionCommand : FilesFoldersCommand
{
    public Guid FileId { get; set; }
    public PermissionType Permission { get; set; }
    public string? ShareCode { get; set; }
    public DateTime? ExpiredAt { get; set; }
}

public class RenameFolderCommand : FilesFoldersCommand
{
    public Guid FolderId { get; set; }
    public string NewName { get; set; } = string.Empty;
}

public class RenameFileCommand : FilesFoldersCommand
{
    public Guid FileId { get; set; }
    public string NewName { get; set; } = string.Empty;
}

public class RenameRequest
{
    public string NewName { get; set; } = string.Empty;
}
