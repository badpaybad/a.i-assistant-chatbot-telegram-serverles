using System;
using System.Threading;

namespace Core.Infra.Base.Utils;

public static class CqrsTrackerContext
{
    private static readonly AsyncLocal<Guid> _currentTrackingId = new();
    private static readonly AsyncLocal<string?> _currentHandlerName = new();

    /// <summary>
    /// TrackingId đang hoạt động trên luồng xử lý bất đồng bộ hiện tại.
    /// </summary>
    public static Guid CurrentTrackingId
    {
        get => _currentTrackingId.Value;
        set => _currentTrackingId.Value = value;
    }

    /// <summary>
    /// Tên đầy đủ kèm namespace của Handler đang thực thi trên luồng bất đồng bộ hiện tại.
    /// </summary>
    public static string? CurrentHandlerName
    {
        get => _currentHandlerName.Value;
        set => _currentHandlerName.Value = value;
    }
}
