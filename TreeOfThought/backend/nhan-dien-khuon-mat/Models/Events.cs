using Core.Infra.Base.Interfaces;
using Core.Infra.Base.Models;
using System;

namespace Core.Infra.NhanDienKhuonMat.Models;

public abstract class NhanDienKhuonMatEvent : BaseMessage, INotifyUiEvent
{
    public string TopicName => GetType().Name;
    public string NotifyPath => $"commandresults/{TrackingId}";
    public string Status { get; set; } = "Completed";
    public string? Message { get; set; }
    public object? Data { get; set; }
}

public class FaceDetectionSessionSavedEvent : NhanDienKhuonMatEvent
{
    public Guid OriginalImageId { get; set; }
    public string OriginalImageUrl { get; set; } = string.Empty;
    public int CroppedFacesCount { get; set; }
}
