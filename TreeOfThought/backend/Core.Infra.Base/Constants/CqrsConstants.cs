namespace Core.Infra.Base.Constants;

public static class CqrsConstants
{
    // Redis Key Prefixes
    public const string TopicSubsPrefix = "topic_subs:";
    public const string SubQueuePrefix = "sub_queue:";
    public const string SubProcPrefix = "sub_proc:";
    public const string TrackingPrefix = "infra:tracks:";
    public const string TrackingHistoryPrefix = "infra:tracks:history:";
    public const string StatsPrefix = "infra:stats:";
    
    // Statuses
    public const string StatusPending = "pending";
    public const string StatusProcessing = "processing";
    public const string StatusSuccess = "success";
    public const string StatusError = "error";
    public const string StatusDead = "dead";
    
    // Methods for generating keys
    public static string GetTopicSubsKey(string topic) => $"{TopicSubsPrefix}{topic}";
    public static string GetSubQueueKey(string topic, string subscriber) => $"{SubQueuePrefix}{topic}:{subscriber}";
    public static string GetSubProcKey(string topic, string subscriber) => $"{SubProcPrefix}{topic}:{subscriber}";
    public static string GetTrackingKey(string status, string queueOrTopic) => $"{TrackingPrefix}{status}:{queueOrTopic}";
    public static string GetTrackingHistoryKey(Guid trackingId) => $"{TrackingHistoryPrefix}{trackingId}";
    public static string GetStatsKey(string metric) => $"{StatsPrefix}{metric}";
}
