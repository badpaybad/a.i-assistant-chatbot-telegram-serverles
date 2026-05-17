using Core.Infra.Auth.Attributes;
using Core.Infra.Base.Interfaces;
using Core.Infra.Base.Controllers;
using Core.Infra.NhanDienKhuonMat.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Core.Infra.NhanDienKhuonMat.Controllers;

[ApiController]
[Route("api/face-detection")]
[AppAuthorize]
public class FaceDetectionController : BaseController
{
    private readonly IDispatcher _dispatcher;

    public FaceDetectionController(IDispatcher dispatcher)
    {
        _dispatcher = dispatcher;
    }

    [HttpPost("save")]
    public async Task<IActionResult> Save(
        [FromForm] IFormFile originalFile,
        [FromForm] List<IFormFile> croppedFiles,
        [FromForm] List<string> boundingBoxes)
    {
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
}
