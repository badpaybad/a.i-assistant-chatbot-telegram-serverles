using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;

namespace Core.Infra.Base.Utils;

public static class StringHelper
{
    public static string RemoveAccents(this string text)
    {
        if (string.IsNullOrWhiteSpace(text))
            return text;

        text = text.Normalize(NormalizationForm.FormD);
        var chars = text.Where(c => CharUnicodeInfo.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark).ToArray();
        var result = new string(chars).Normalize(NormalizationForm.FormC);
        
        // Handle 'đ' specifically
        result = result.Replace('đ', 'd').Replace('Đ', 'D');
        
        return result;
    }

    public static string ToSearchFriendly(this string text)
    {
        if (string.IsNullOrWhiteSpace(text))
            return string.Empty;

        return text.Trim().ToLower().RemoveAccents();
    }
}
