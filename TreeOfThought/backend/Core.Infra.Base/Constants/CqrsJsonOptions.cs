using System.Text.Json;

namespace Core.Infra.Base.Constants;

public static class CqrsJsonOptions
{
    public static readonly JsonSerializerOptions Default = new JsonSerializerOptions
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        WriteIndented = false,
        DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull
    };
}
