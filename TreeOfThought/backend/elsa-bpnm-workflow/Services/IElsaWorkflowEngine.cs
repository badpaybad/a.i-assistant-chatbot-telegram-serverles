using Core.Infra.ElsaBpnmWorkflow.Models;

namespace Core.Infra.ElsaBpnmWorkflow.Services;

public interface IElsaWorkflowEngine
{
    Task<List<WorkflowDefinitionDto>> GetDefinitionsAsync();
    Task<WorkflowDefinitionDto?> GetDefinitionByIdAsync(string id);
    Task<WorkflowDefinitionDto> SaveDefinitionAsync(WorkflowDefinitionDto definition);
    Task<bool> DeleteDefinitionAsync(string id);

    Task<WorkflowInstanceDto> ExecuteWorkflowAsync(ExecuteWorkflowRequest request);
    Task<List<WorkflowInstanceDto>> GetInstancesAsync();
    Task<WorkflowInstanceDto?> GetInstanceByIdAsync(string id);

    Task<List<UserTaskDto>> GetUserTasksAsync();
    Task<UserTaskDto> ApproveUserTaskAsync(string taskId, bool approved, string? reason);
    Task<DashboardStatsDto> GetDashboardStatsAsync();

    List<ActivityMetadataDto> GetAvailableActivities();
    List<ActivityMetadataDto> GetAvailableTriggers();
}
