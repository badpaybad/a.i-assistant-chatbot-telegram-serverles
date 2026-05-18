using Core.Infra.Auth.Attributes;
using Core.Infra.Base.Interfaces;
using Core.Infra.Base.Controllers;
using Core.Infra.NhanDienKhuonMat.Models;
using Core.Infra.NhanDienKhuonMat.Contexts;
using Core.Infra.Firebase.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Infra.NhanDienKhuonMat.Controllers;

[ApiController]
[Route("api/face-detection")]
[AppAuthorize]
public class FaceDetectionController : BaseController
{
    private readonly IDispatcher _dispatcher;
    private readonly NhanDienKhuonMatDbContext _db;
    private readonly FirebaseService _firebaseService;
    private readonly ILogger<FaceDetectionController> _logger;

    public FaceDetectionController(
        IDispatcher dispatcher, 
        NhanDienKhuonMatDbContext db,
        FirebaseService firebaseService,
        ILogger<FaceDetectionController> logger)
    {
        _dispatcher = dispatcher;
        _db = db;
        _firebaseService = firebaseService;
        _logger = logger;
    }

    [HttpPost("save")]
    public async Task<IActionResult> Save(
        [FromForm] Guid sessionId,
        [FromForm] string sessionName,
        [FromForm] IFormFile originalFile,
        [FromForm] List<IFormFile> croppedFiles,
        [FromForm] List<string> boundingBoxes)
    {
        if (sessionId == Guid.Empty)
            return BadRequest("SessionId không hợp lệ.");

        if (string.IsNullOrEmpty(sessionName))
            return BadRequest("Tên phiên không được để trống.");

        if (originalFile == null || originalFile.Length == 0)
            return BadRequest("File ảnh gốc không hợp lệ.");

        if (croppedFiles == null || croppedFiles.Count == 0)
            return BadRequest("Danh sách khuôn mặt không được trống.");

        if (boundingBoxes == null || boundingBoxes.Count != croppedFiles.Count)
            return BadRequest("Danh sách tọa độ (bounding box) không khớp với danh sách khuôn mặt.");

        // Read original file content
        using var originalMs = new MemoryStream();
        await originalFile.CopyToAsync(originalMs);

        var command = new SaveFaceDetectionSessionCommand
        {
            TrackingId = GetTrackingId(),
            UserId = GetUserId().ToString(),
            SessionId = sessionId,
            SessionName = sessionName,
            OriginalFileName = originalFile.FileName,
            OriginalContentType = originalFile.ContentType,
            OriginalContent = originalMs.ToArray()
        };

        // Read cropped files content
        for (int i = 0; i < croppedFiles.Count; i++)
        {
            var cropFile = croppedFiles[i];
            var bbox = boundingBoxes[i];

            using var cropMs = new MemoryStream();
            await cropFile.CopyToAsync(cropMs);

            command.CroppedFaces.Add(new CroppedFaceUploadDto
            {
                Content = cropMs.ToArray(),
                ContentType = cropFile.ContentType,
                BoundingBox = bbox
            });
        }

        // Dispatch command asynchronously
        await _dispatcher.SendAsync(command, useMemoryMode: true);
        
        return Ok(new { message = "Quá trình lưu trữ đang được xử lý.", trackingId = command.TrackingId });
    }

    [HttpGet("sessions")]
    public async Task<IActionResult> GetSessions([FromQuery] int pageIndex = 1, [FromQuery] int pageSize = 10)
    {
        var userId = GetUserId();
        
        var query = _db.UploadSessions
            .Where(s => s.UserId == userId);

        var totalCount = await query.CountAsync();
        
        var sessions = await query
            .OrderByDescending(s => s.CreatedAt)
            .Skip((pageIndex - 1) * pageSize)
            .Take(pageSize)
            .Select(s => new
            {
                s.Id,
                s.Name,
                s.CreatedAt,
                s.CreatedBy,
                ImageCount = s.OriginalImages.Count
            })
            .ToListAsync();

        return Ok(new
        {
            data = sessions,
            total = totalCount,
            pageIndex,
            pageSize
        });
    }

    [HttpGet("sessions/{sessionId}")]
    public async Task<IActionResult> GetSessionDetails(Guid sessionId)
    {
        var userId = GetUserId();

        var session = await _db.UploadSessions
            .FirstOrDefaultAsync(s => s.Id == sessionId && s.UserId == userId);

        if (session == null)
            return NotFound("Không tìm thấy phiên upload.");

        var images = await _db.OriginalImages
            .Where(i => i.UploadSessionId == sessionId)
            .Select(i => new
            {
                i.Id,
                i.FileName,
                i.Url,
                i.Size,
                i.CreatedAt,
                CroppedFaces = i.CroppedFaces.Select(f => new
                {
                    f.Id,
                    f.Url,
                    f.BoundingBox,
                    f.CreatedAt
                }).ToList()
            })
            .ToListAsync();

        return Ok(new
        {
            session.Id,
            session.Name,
            session.CreatedAt,
            Images = images
        });
    }

    [HttpPut("sessions/{sessionId}/rename")]
    public async Task<IActionResult> RenameSession(Guid sessionId, [FromBody] RenameRequest request)
    {
        var userId = GetUserId();
        var session = await _db.UploadSessions
            .FirstOrDefaultAsync(s => s.Id == sessionId && s.UserId == userId);

        if (session == null)
            return NotFound("Không tìm thấy phiên upload.");

        if (string.IsNullOrEmpty(request.NewName))
            return BadRequest("Tên phiên không được để trống.");

        session.Name = request.NewName.Trim();
        await _db.SaveChangesAsync();

        return Ok(new { message = "Đã cập nhật tên phiên thành công." });
    }

    [HttpDelete("sessions/{sessionId}")]
    public async Task<IActionResult> DeleteSession(Guid sessionId)
    {
        var userId = GetUserId();
        var session = await _db.UploadSessions
            .FirstOrDefaultAsync(s => s.Id == sessionId && s.UserId == userId);

        if (session == null)
            return NotFound("Không tìm thấy phiên upload.");

        // 1. Find all associated original images and their cropped faces to delete from GCS
        var images = await _db.OriginalImages
            .Include(i => i.CroppedFaces)
            .Where(i => i.UploadSessionId == sessionId && i.UserId == userId)
            .ToListAsync();

        foreach (var image in images)
        {
            // Delete original image from GCS
            var originalObjectName = GetGcsObjectName(image.Url);
            if (originalObjectName != null)
            {
                try
                {
                    await _firebaseService.DeleteFileAsync(originalObjectName);
                }
                catch (Exception ex)
                {
                    _logger.LogWarning("Failed to delete original image {ImageId} from GCS: {Message}", image.Id, ex.Message);
                }
            }

            // Delete each cropped face from GCS
            foreach (var face in image.CroppedFaces)
            {
                var faceObjectName = GetGcsObjectName(face.Url);
                if (faceObjectName != null)
                {
                    try
                    {
                        await _firebaseService.DeleteFileAsync(faceObjectName);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogWarning("Failed to delete cropped face {FaceId} from GCS: {Message}", face.Id, ex.Message);
                    }
                }
            }
        }

        // 2. Remove session from DB (this cascade deletes database rows for OriginalImages and CroppedFaces)
        _db.UploadSessions.Remove(session);
        await _db.SaveChangesAsync();

        return Ok(new { message = "Đã xóa phiên upload thành công." });
    }

    [HttpDelete("images/{imageId}")]
    public async Task<IActionResult> DeleteOriginalImage(Guid imageId)
    {
        var userId = GetUserId();
        var image = await _db.OriginalImages
            .Include(i => i.CroppedFaces)
            .FirstOrDefaultAsync(i => i.Id == imageId && i.UserId == userId);

        if (image == null)
            return NotFound("Không tìm thấy ảnh gốc.");

        // 1. Delete original image from GCS
        var originalObjectName = GetGcsObjectName(image.Url);
        if (originalObjectName != null)
        {
            try
            {
                await _firebaseService.DeleteFileAsync(originalObjectName);
            }
            catch (Exception ex)
            {
                _logger.LogWarning("Failed to delete original image {ImageId} from GCS: {Message}", image.Id, ex.Message);
            }
        }

        // 2. Delete all associated cropped faces from GCS
        foreach (var face in image.CroppedFaces)
        {
            var faceObjectName = GetGcsObjectName(face.Url);
            if (faceObjectName != null)
            {
                try
                {
                    await _firebaseService.DeleteFileAsync(faceObjectName);
                }
                catch (Exception ex)
                {
                    _logger.LogWarning("Failed to delete cropped face {FaceId} from GCS: {Message}", face.Id, ex.Message);
                }
            }
        }

        // 3. Remove image from DB (this cascade deletes CroppedFaces records in database)
        _db.OriginalImages.Remove(image);
        await _db.SaveChangesAsync();

        return Ok(new { message = "Đã xóa ảnh gốc thành công." });
    }

    [HttpDelete("faces/{faceId}")]
    public async Task<IActionResult> DeleteCroppedFace(Guid faceId)
    {
        var userId = GetUserId();
        var face = await _db.CroppedFaces
            .Include(f => f.OriginalImage)
            .FirstOrDefaultAsync(f => f.Id == faceId && f.OriginalImage!.UserId == userId);

        if (face == null)
            return NotFound("Không tìm thấy ảnh khuôn mặt crop.");

        // 1. Delete cropped face from GCS
        var faceObjectName = GetGcsObjectName(face.Url);
        if (faceObjectName != null)
        {
            try
            {
                await _firebaseService.DeleteFileAsync(faceObjectName);
            }
            catch (Exception ex)
            {
                _logger.LogWarning("Failed to delete cropped face {FaceId} from GCS: {Message}", face.Id, ex.Message);
            }
        }

        // 2. Remove cropped face from DB
        _db.CroppedFaces.Remove(face);
        await _db.SaveChangesAsync();

        return Ok(new { message = "Đã xóa ảnh khuôn mặt crop thành công." });
    }

    private string? GetGcsObjectName(string url)
    {
        if (string.IsNullOrEmpty(url)) return null;

        const string prefix = "https://storage.googleapis.com/";
        if (url.StartsWith(prefix))
        {
            var remaining = url.Substring(prefix.Length);
            var slashIndex = remaining.IndexOf('/');
            if (slashIndex != -1)
            {
                return remaining.Substring(slashIndex + 1);
            }
        }
        return null;
    }
}

public class RenameRequest
{
    public string NewName { get; set; } = string.Empty;
}
