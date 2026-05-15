using Core.Infra.Auth.Attributes;
using Core.Infra.Base.Interfaces;
using Core.Infra.FilesFolders.Models;
using Core.Infra.FilesFolders.Services;
using Core.Infra.Firebase.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Core.Web.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[AppAuthorize]
public class FilesController : ControllerBase
{
    private readonly FilesFoldersService _filesFoldersService;
    private readonly FirebaseService _firebaseService;
    private readonly IDispatcher _dispatcher;
    private const string AppName = "Default";
    private const string BucketName = "dunp-test-gcs";

    public FilesController(FilesFoldersService filesFoldersService, FirebaseService firebaseService, IDispatcher dispatcher)
    {
        _filesFoldersService = filesFoldersService;
        _firebaseService = firebaseService;
        _dispatcher = dispatcher;
    }

    [HttpPost("upload")]
    public async Task<IActionResult> Upload([FromForm] Guid? folderId, IFormFile file)
    {
        if (file == null || file.Length == 0) return BadRequest("File không hợp lệ");

        using var ms = new MemoryStream();
        await file.CopyToAsync(ms);

        var command = new UploadFileCommand
        {
            FolderId = folderId,
            FileName = file.FileName,
            ContentType = file.ContentType,
            Content = ms.ToArray(),
            UserId = GetUserId().ToString()
        };

        await _dispatcher.SendAsync(command, useMemoryMode: true);
        return Ok(new { message = "File đã được upload" });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var command = new DeleteFileCommand { FileId = id, UserId = GetUserId().ToString() };
        await _dispatcher.SendAsync(command, useMemoryMode: true);
        return Ok(new { message = "File đã được xóa" });
    }

    [HttpPost("move")]
    public async Task<IActionResult> Move([FromBody] MoveFileCommand command)
    {
        command.UserId = GetUserId().ToString();
        await _dispatcher.SendAsync(command, useMemoryMode: true);
        return Ok(new { message = "File đã được di chuyển" });
    }

    [HttpPost("permission")]
    public async Task<IActionResult> SetPermission([FromBody] SetFilePermissionCommand command)
    {
        command.UserId = GetUserId().ToString();
        await _dispatcher.SendAsync(command, useMemoryMode: true);
        return Ok(new { message = "Quyền đã được cập nhật" });
    }

    [HttpGet("{id}/share-url")]
    public async Task<IActionResult> GetShareUrl(Guid id, [FromQuery] int durationHours = 24)
    {
        var userId = GetUserId();
        var file = await _filesFoldersService.GetFileByIdAsync(userId, id);
        if (file == null) return NotFound();

        // Extract object name from URL
        var uri = new Uri(file.Url);
        var parts = uri.AbsolutePath.Split('/', 3);
        var objectName = parts.Length > 2 ? parts[2] : file.Name;

        var signedUrl = _firebaseService.GetSignedUrl(AppName, BucketName, objectName, TimeSpan.FromHours(durationHours));
        return Ok(new { url = signedUrl });
    }

    [HttpPost("editor-upload")]
    public async Task<IActionResult> EditorUpload(IFormFile upload)
    {
        if (upload == null || upload.Length == 0) return BadRequest("File không hợp lệ");

        using var ms = new MemoryStream();
        await upload.CopyToAsync(ms);

        var userId = GetUserId();
        
        var file = await _filesFoldersService.UploadEditorFileAsync(userId, upload.FileName, upload.ContentType, ms.ToArray());

        return Ok(new { url = file.Url });
    }

    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery] string query)
    {
        var userId = GetUserId();
        var files = await _filesFoldersService.SearchFilesAsync(userId, query ?? "");
        return Ok(files);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetDetail(Guid id)
    {
        var userId = GetUserId();
        var file = await _filesFoldersService.GetFileByIdAsync(userId, id);
        if (file == null) return NotFound();
        return Ok(file);
    }

    private Guid GetUserId()
    {
        var userIdStr = User.FindFirst("userId")?.Value;
        if (string.IsNullOrEmpty(userIdStr) || !Guid.TryParse(userIdStr, out var userId))
            throw new UnauthorizedAccessException();
        return userId;
    }
}
