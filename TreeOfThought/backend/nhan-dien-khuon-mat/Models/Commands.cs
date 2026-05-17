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
