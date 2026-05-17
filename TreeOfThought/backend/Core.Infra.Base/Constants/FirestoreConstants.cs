using System;

namespace Core.Infra.Base.Constants;

public static class FirestoreConstants
{
    /// <summary>
    /// Đường dẫn tiền tố hằng số duy nhất cho việc notify UI trong toàn bộ solution.
    /// Tránh việc tạo bừa bãi các collection/path khác nhau gây lãng phí tài nguyên.
    /// </summary>
    public const string NotificationPathPrefix = "commandresults";

    public static string GetNotificationPath(string trackingId) => $"{NotificationPathPrefix}/{trackingId}";
    public static string GetNotificationPath(Guid trackingId) => $"{NotificationPathPrefix}/{trackingId}";
}
