using Core.Infra.Auth.Attributes;
using Core.Infra.Base.Interfaces;
using Core.Infra.Base.Controllers;
using Core.Infra.FilesFolders.Models;
using Core.Infra.FilesFolders.Services;
using Microsoft.AspNetCore.Mvc;

namespace Core.Infra.FilesFolders.Controllers;

[ApiController]
[Route("api/[controller]")]
[AppAuthorize]
public class FoldersController : BaseController
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
        command.TrackingId = GetTrackingId();
        command.UserId = GetUserId().ToString();
        await _dispatcher.SendAsync(command, useMemoryMode: true);
        return Ok(new { message = "Thư mục đã được tạo", trackingId = command.TrackingId });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var trackingId = GetTrackingId();
        var command = new DeleteFolderCommand 
        { 
            TrackingId = trackingId,
            FolderId = id, 
            UserId = GetUserId().ToString() 
        };
        await _dispatcher.SendAsync(command, useMemoryMode: true);
        return Ok(new { message = "Thư mục đã được xóa", trackingId });
    }

    [HttpPost("move")]
    public async Task<IActionResult> Move([FromBody] MoveFolderCommand command)
    {
        command.TrackingId = GetTrackingId();
        command.UserId = GetUserId().ToString();
        await _dispatcher.SendAsync(command, useMemoryMode: true);
        return Ok(new { message = "Thư mục đã được di chuyển", trackingId = command.TrackingId });
    }

    [HttpPatch("{id}/rename")]
    public async Task<IActionResult> Rename(Guid id, [FromBody] RenameRequest request)
    {
        var command = new RenameFolderCommand
        {
            TrackingId = GetTrackingId(),
            UserId = GetUserId().ToString(),
            FolderId = id,
            NewName = request.NewName
        };
        await _dispatcher.SendAsync(command, useMemoryMode: true);
        return Ok(new { message = "Yêu cầu đổi tên thư mục đã được gửi", trackingId = command.TrackingId });
    }
}
