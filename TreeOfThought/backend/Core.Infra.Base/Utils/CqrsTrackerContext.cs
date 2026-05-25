using System;
using System.Threading;

namespace Core.Infra.Base.Utils;

public static class CqrsTrackerContext
{
    private static readonly AsyncLocal<Guid> _currentTrackingId = new();

    /// <summary>
    /// TrackingId đang hoạt động trên luồng xử lý bất đồng bộ hiện tại.
    /// </summary>
    public static Guid CurrentTrackingId
    {
        get => _currentTrackingId.Value;
        set => _currentTrackingId.Value = value;
    }
}
