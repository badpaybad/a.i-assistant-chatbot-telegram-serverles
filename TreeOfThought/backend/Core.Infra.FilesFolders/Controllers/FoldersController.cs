using Core.Infra.Auth.Attributes;
using Core.Infra.Base.Interfaces;
using Core.Infra.FilesFolders.Models;
using Core.Infra.FilesFolders.Services;
using Microsoft.AspNetCore.Mvc;

namespace Core.Infra.FilesFolders.Controllers;

[ApiController]
[Route("api/[controller]")]
[AppAuthorize]
public class FoldersController : ControllerBase
{
    private readonly FilesFoldersService _filesFoldersService;
    private readonly IDispatcher _dispatcher;

    public FoldersController(FilesFoldersService filesFoldersService, IDispatcher dispatcher)
    {
        _filesFoldersService = filesFoldersService;
        _dispatcher = dispatcher;
    }

    [HttpGet("tree")]
    public async Task<IActionResult> GetTree()
    {
        var userId = GetUserId();
        var tree = await _filesFoldersService.GetFolderTreeAsync(userId);
        return Ok(tree);
    }

    [HttpGet("{id}/content")]
    public async Task<IActionResult> GetContent(Guid id, [FromQuery] int pageIndex = 1, [FromQuery] int pageSize = 10)
    {
        var userId = GetUserId();
        var content = await _filesFoldersService.GetFolderContentAsync(userId, id, pageIndex, pageSize);
        return Ok(content);
    }

    [HttpGet("root/content")]
    public async Task<IActionResult> GetRootContent([FromQuery] int pageIndex = 1, [FromQuery] int pageSize = 10)
    {
        var userId = GetUserId();
        var content = await _filesFoldersService.GetFolderContentAsync(userId, null, pageIndex, pageSize);
        return Ok(content);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateFolderCommand command)
    {
        command.UserId = GetUserId().ToString();
        await _dispatcher.SendAsync(command);
        return Ok(new { message = "Yêu cầu tạo thư mục đã được gửi" });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var command = new DeleteFolderCommand { FolderId = id, UserId = GetUserId().ToString() };
        await _dispatcher.SendAsync(command);
        return Ok(new { message = "Yêu cầu xóa thư mục đã được gửi" });
    }

    [HttpPost("move")]
    public async Task<IActionResult> Move([FromBody] MoveFolderCommand command)
    {
        command.UserId = GetUserId().ToString();
        await _dispatcher.SendAsync(command);
        return Ok(new { message = "Yêu cầu di chuyển thư mục đã được gửi" });
    }

    private Guid GetUserId()
    {
        var userIdStr = User.FindFirst("userId")?.Value;
        if (string.IsNullOrEmpty(userIdStr) || !Guid.TryParse(userIdStr, out var userId))
            throw new UnauthorizedAccessException();
        return userId;
    }
}
