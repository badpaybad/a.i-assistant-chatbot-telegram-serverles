using Core.Infra.ElsaBpnmWorkflow.Models;
using Core.Infra.ElsaBpnmWorkflow.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Core.Infra.ElsaBpnmWorkflow.Controllers;

[Authorize]
[ApiController]
[Route("api/workflow")]
public class ElsaBpnmWorkflowController : ControllerBase
{
    private readonly IElsaWorkflowEngine _workflowEngine;

    public ElsaBpnmWorkflowController(IElsaWorkflowEngine workflowEngine)
    {
        _workflowEngine = workflowEngine;
    }

    /// <summary>
    /// Lấy danh sách toàn bộ các Workflow Definition (Chuẩn Elsa Studio /api/workflow-definitions & /api/workflow/definitions)
    /// </summary>
    [HttpGet("definitions")]
    [HttpGet("/api/workflow-definitions")]
    [HttpGet("/api/workflow/workflow-definitions")]
    public async Task<IActionResult> GetDefinitions()
    {
        var result = await _workflowEngine.GetDefinitionsAsync();
        return Ok(result);
    }

    /// <summary>
    /// Lấy thông tin chi tiết một Workflow Definition theo ID
    /// </summary>
    [HttpGet("definitions/{id}")]
    [HttpGet("/api/workflow-definitions/{id}")]
    [HttpGet("/api/workflow/workflow-definitions/{id}")]
    public async Task<IActionResult> GetDefinitionById(string id)
    {
        var result = await _workflowEngine.GetDefinitionByIdAsync(id);
        if (result == null)
        {
            return NotFound(new { message = $"Workflow definition '{id}' not found." });
        }
        return Ok(result);
    }

    /// <summary>
    /// Lưu (Tạo mới hoặc Cập nhật) một Workflow Definition
    /// </summary>
    [HttpPost("definitions")]
    [HttpPost("/api/workflow-definitions")]
    [HttpPost("/api/workflow/workflow-definitions")]
    public async Task<IActionResult> SaveDefinition([FromBody] WorkflowDefinitionDto definition)
    {
        if (definition == null)
        {
            return BadRequest("Workflow definition cannot be null.");
        }
        var result = await _workflowEngine.SaveDefinitionAsync(definition);
        return Ok(result);
    }

    /// <summary>
    /// Xóa một Workflow Definition
    /// </summary>
    [HttpDelete("definitions/{id}")]
    [HttpDelete("/api/workflow-definitions/{id}")]
    [HttpDelete("/api/workflow/workflow-definitions/{id}")]
    public async Task<IActionResult> DeleteDefinition(string id)
    {
        var success = await _workflowEngine.DeleteDefinitionAsync(id);
        if (!success)
        {
            return NotFound(new { message = $"Workflow definition '{id}' not found." });
        }
        return Ok(new { success = true, id });
    }

    /// <summary>
    /// Thực thi một phiên quy trình Workflow (Execute Workflow Instance)
    /// </summary>
    [HttpPost("execute")]
    [HttpPost("/api/workflow-execution")]
    public async Task<IActionResult> ExecuteWorkflow([FromBody] ExecuteWorkflowRequest request)
    {
        if (request == null || string.IsNullOrWhiteSpace(request.DefinitionId))
        {
            return BadRequest("DefinitionId is required.");
        }

        try
        {
            var instance = await _workflowEngine.ExecuteWorkflowAsync(request);
            return Ok(instance);
        }
        catch (ArgumentException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Workflow execution error.", error = ex.Message });
        }
    }

    /// <summary>
    /// Lấy danh sách lịch sử thực thi (Workflow Instances)
    /// </summary>
    [HttpGet("instances")]
    [HttpGet("/api/workflow-instances")]
    [HttpGet("/api/workflow/workflow-instances")]
    public async Task<IActionResult> GetInstances()
    {
        var result = await _workflowEngine.GetInstancesAsync();
        return Ok(result);
    }

    /// <summary>
    /// Lấy chi tiết lịch sử thực thi một Workflow Instance theo ID
    /// </summary>
    [HttpGet("instances/{id}")]
    [HttpGet("/api/workflow-instances/{id}")]
    [HttpGet("/api/workflow/workflow-instances/{id}")]
    public async Task<IActionResult> GetInstanceById(string id)
    {
        var result = await _workflowEngine.GetInstanceByIdAsync(id);
        if (result == null)
        {
            return NotFound(new { message = $"Workflow instance '{id}' not found." });
        }
        return Ok(result);
    }

    /// <summary>
    /// Lấy danh sách User Tasks chờ xử lý / phê duyệt
    /// </summary>
    [HttpGet("user-tasks")]
    [HttpGet("/api/user-tasks")]
    public async Task<IActionResult> GetUserTasks()
    {
        var result = await _workflowEngine.GetUserTasksAsync();
        return Ok(result);
    }

    /// <summary>
    /// Phê duyệt một tác vụ User Task (Approve Task)
    /// </summary>
    [HttpPost("user-tasks/{id}/approve")]
    [HttpPost("/api/user-tasks/{id}/approve")]
    public async Task<IActionResult> ApproveUserTask(string id, [FromBody] ApproveTaskRequest? request)
    {
        try
        {
            var result = await _workflowEngine.ApproveUserTaskAsync(id, approved: true, reason: request?.Reason);
            return Ok(result);
        }
        catch (ArgumentException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }

    /// <summary>
    /// Từ chối một tác vụ User Task (Reject Task)
    /// </summary>
    [HttpPost("user-tasks/{id}/reject")]
    [HttpPost("/api/user-tasks/{id}/reject")]
    public async Task<IActionResult> RejectUserTask(string id, [FromBody] ApproveTaskRequest? request)
    {
        try
        {
            var result = await _workflowEngine.ApproveUserTaskAsync(id, approved: false, reason: request?.Reason);
            return Ok(result);
        }
        catch (ArgumentException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }

    /// <summary>
    /// Lấy số liệu thống kê tổng quan cho Dashboard
    /// </summary>
    [HttpGet("dashboard/stats")]
    [HttpGet("/api/dashboard/stats")]
    public async Task<IActionResult> GetDashboardStats()
    {
        var result = await _workflowEngine.GetDashboardStatsAsync();
        return Ok(result);
    }

    /// <summary>
    /// Danh sách các Activity (Descriptors) đầy đủ tương thích với Elsa Studio
    /// </summary>
    [HttpGet("activities")]
    [HttpGet("/api/activity-descriptors")]
    [HttpGet("/api/workflow/activity-descriptors")]
    public IActionResult GetActivities()
    {
        var result = _workflowEngine.GetAvailableActivities();
        return Ok(result);
    }

    /// <summary>
    /// Danh sách các Trigger đầy đủ được hỗ trợ
    /// </summary>
    [HttpGet("triggers")]
    [HttpGet("/api/trigger-descriptors")]
    public IActionResult GetTriggers()
    {
        var result = _workflowEngine.GetAvailableTriggers();
        return Ok(result);
    }
}
