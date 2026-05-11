using Core.Infra.Base.Models;

namespace Core.Infra.DataTest.Models;

public class SampleEntity : BaseEntity<Guid>
{
    public string Name { get; set; } = string.Empty;
    public string NameUnaccented { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int Stock { get; set; }
}
