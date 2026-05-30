using Core.Infra.Base.Interfaces;
using Core.Infra.Base.Models;
using System;
using System.Collections.Generic;

namespace Core.Infra.NhanDienKhuonMat.Models;

public abstract class NhanDienKhuonMatCommand : BaseMessage, IBaseCommand
{
    public virtual string QueueName => GetType().Name;
}

public class SaveFaceDetectionSessionCommand : NhanDienKhuonMatCommand
{
    public Guid SessionId { get; set; }
    public string SessionName { get; set; } = string.Empty;
    public string OriginalFileName { get; set; } = string.Empty;
    public byte[] OriginalContent { get; set; } = Array.Empty<byte>();
    public string OriginalContentType { get; set; } = "image/jpeg";
    public List<CroppedFaceUploadDto> CroppedFaces { get; set; } = new();
}

public class CroppedFaceUploadDto
{
    public byte[] Content { get; set; } = Array.Empty<byte>();
    public string ContentType { get; set; } = "image/jpeg";
    public string BoundingBox { get; set; } = string.Empty; // JSON of bounding box coordinates: {"x":10,"y":20,"w":100,"h":100}
}

public class RenameFaceDetectionSessionCommand : NhanDienKhuonMatCommand
{
    public Guid SessionId { get; set; }
    public string NewName { get; set; } = string.Empty;
}

public class DeleteFaceDetectionSessionCommand : NhanDienKhuonMatCommand
{
    public Guid SessionId { get; set; }
}

public class DeleteOriginalImageCommand : NhanDienKhuonMatCommand
{
    public Guid ImageId { get; set; }
}

public class DeleteCroppedFaceCommand : NhanDienKhuonMatCommand
{
    public Guid FaceId { get; set; }
}

public class CreateFaceDefinitionCommand : NhanDienKhuonMatCommand
{
    public Guid TargetUserId { get; set; }
    public Guid OriginalImageId { get; set; }
    public bool Force { get; set; }

    // Output parameters populated by handler
    public Guid ExistingUserId { get; set; }
    public string ExistingUserName { get; set; } = string.Empty;
}

public class DeleteFaceDefinitionCommand : NhanDienKhuonMatCommand
{
    public Guid DefinitionId { get; set; }
}

public class TrainArcFaceModelCommand : NhanDienKhuonMatCommand
{
    public string UserIds { get; set; } = string.Empty;
    public int Epochs { get; set; } = 100;
    public int BatchSize { get; set; } = 16;
    public double LearningRate { get; set; } = 0.00005;
    public string AlignMode { get; set; } = "advanced";
    public string Device { get; set; } = "cpu";

    [System.Text.Json.Serialization.JsonIgnore]
    public Func<string, Task>? LogCallback { get; set; }

    [System.Text.Json.Serialization.JsonIgnore]
    public System.Threading.CancellationToken CancellationToken { get; set; }
}

public class ExtractFaceEmbeddingsCommand : NhanDienKhuonMatCommand
{
    public string FolderName { get; set; } = string.Empty;

    // Output parameters populated by handler
    public int ProcessedCount { get; set; }
    public int ErrorCount { get; set; }
}

public class DeleteEmbeddingCommand : NhanDienKhuonMatCommand
{
    public Guid EmbeddingId { get; set; }
}

public class DeleteUserEmbeddingsCommand : NhanDienKhuonMatCommand
{
    public Guid TargetUserId { get; set; }
}

public class ReloadCacheCommand : NhanDienKhuonMatCommand
{
}

public class DuplicateDefinitionException : Exception
{
    public Guid ExistingUserId { get; }
    public string ExistingUserName { get; }

    public DuplicateDefinitionException(string message, Guid existingUserId, string existingUserName) : base(message)
    {
        ExistingUserId = existingUserId;
        ExistingUserName = existingUserName;
    }
}

