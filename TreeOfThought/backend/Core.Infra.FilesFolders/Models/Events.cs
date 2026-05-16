using Core.Infra.Base.Interfaces;
using Core.Infra.Base.Models;

namespace Core.Infra.FilesFolders.Models;

public abstract class FilesFoldersEvent : BaseMessage, INotifyUiEvent
{
    public string TopicName => GetType().Name;
    public string NotifyPath => $"commandresults/{TrackingId}";
    public string Status { get; set; } = "Completed";
    public string? Message { get; set; }
    public object? Data { get; set; }
}

public class FolderCreatedEvent : FilesFoldersEvent
{
    public Guid FolderId { get; set; }
    public string Name { get; set; } = string.Empty;
}

public class FolderDeletedEvent : FilesFoldersEvent
{
    public Guid FolderId { get; set; }
}

public class FolderMovedEvent : FilesFoldersEvent
{
    public Guid FolderId { get; set; }
    public Guid? NewParentId { get; set; }
}

public class FileUploadedEvent : FilesFoldersEvent
{
    public Guid FileId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
}

public class FileDeletedEvent : FilesFoldersEvent
{
    public Guid FileId { get; set; }
}

public class FileMovedEvent : FilesFoldersEvent
{
    public Guid FileId { get; set; }
    public Guid? NewFolderId { get; set; }
}

public class FilePermissionSetEvent : FilesFoldersEvent
{
    public Guid FileId { get; set; }
    public PermissionType Permission { get; set; }
}
