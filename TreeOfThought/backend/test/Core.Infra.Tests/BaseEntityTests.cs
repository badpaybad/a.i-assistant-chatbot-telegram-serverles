using Core.Infra.Base.Models;
using Xunit;

namespace Core.Infra.Tests;

public class BaseEntityTests
{
    private class TestEntity : BaseEntity<Guid> 
    { 
        public TestEntity() { Id = Guid.NewGuid(); }
    }

    [Fact]
    public void BaseEntity_Should_Initialize_With_Default_Values()
    {
        // Arrange & Act
        var entity = new TestEntity();

        // Assert
        Assert.NotEqual(Guid.Empty, entity.Id);
        Assert.True(entity.CreatedAt <= DateTime.UtcNow);
    }
}
