using Core.Infra.Base.Interfaces;
using Core.Infra.NhanDienKhuonMat.Contexts;
using Core.Infra.NhanDienKhuonMat.Models;
using Core.Infra.Firebase.Services;
using Core.Infra.Firebase.Models;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Core.Infra.NhanDienKhuonMat.Handlers;

public class FaceDetectionCommandHandler : ICommandHandler<SaveFaceDetectionSessionCommand>
{
    private readonly NhanDienKhuonMatDbContext _db;
    private readonly FirebaseService _firebaseService;
    private readonly IDispatcher _dispatcher;
    private readonly ILogger<FaceDetectionCommandHandler> _logger;
    public FaceDetectionCommandHandler(
        NhanDienKhuonMatDbContext db,
        FirebaseService firebaseService,
        IDispatcher dispatcher,
        ILogger<FaceDetectionCommandHandler> logger)
    {
        _db = db;
        _firebaseService = firebaseService;
        _dispatcher = dispatcher;
        _logger = logger;
    }

    public async Task HandleAsync(SaveFaceDetectionSessionCommand command)
    {
        _logger.LogInformation("Processing SaveFaceDetectionSessionCommand for User: {UserId}, TrackingId: {TrackingId}", 
            command.UserId, command.TrackingId);

        var userId = Guid.Parse(command.UserId ?? Guid.Empty.ToString());
        var timestamp = DateTime.UtcNow;

        // Check if UploadSession exists, if not, create it in a thread-safe manner
        var session = await _db.UploadSessions.FindAsync(command.SessionId);
        if (session == null)
        {
            try
            {
                session = new UploadSession
                {
                    Id = command.SessionId,
                    Name = string.IsNullOrEmpty(command.SessionName) ? "Phiên tải lên" : command.SessionName,
                    UserId = userId,
                    CreatedAt = timestamp,
                    CreatedBy = command.UserId ?? "System"
                };
                _db.UploadSessions.Add(session);
                await _db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                if (session != null)
                {
                    _db.Entry(session).State = Microsoft.EntityFrameworkCore.EntityState.Detached;
                }
                _logger.LogWarning("Session duplicate or concurrent creation: {Message}", ex.Message);
                session = await _db.UploadSessions.FindAsync(command.SessionId);
            }
        }

        // 1. Upload original image to GCS
        var originalImageId = Guid.NewGuid();
        var originalPath = $"face-detection/{userId}/{originalImageId}/original_{command.OriginalFileName}";
        
        string originalUrl;
        using (var originalStream = new MemoryStream(command.OriginalContent))
        {
            originalUrl = await _firebaseService.UploadFileAsync(
                originalPath, 
                originalStream, 
                command.OriginalContentType, 
                true // Public URL
            );
        }

        var originalImage = new OriginalImage
        {
            Id = originalImageId,
            UploadSessionId = command.SessionId,
            FileName = command.OriginalFileName,
            Url = originalUrl,
            Size = command.OriginalContent.Length,
            UserId = userId,
            CreatedAt = timestamp,
            CreatedBy = command.UserId ?? "System"
        };

        _db.OriginalImages.Add(originalImage);

        // 2. Upload each selected cropped face and save details
        int index = 0;
        foreach (var croppedFaceDto in command.CroppedFaces)
        {
            var faceId = Guid.NewGuid();
            var facePath = $"face-detection/{userId}/{originalImageId}/cropped_face_{index}_{faceId}.jpg";

            string faceUrl;
            using (var faceStream = new MemoryStream(croppedFaceDto.Content))
            {
                faceUrl = await _firebaseService.UploadFileAsync(
                    facePath, 
                    faceStream, 
                    croppedFaceDto.ContentType, 
                    true // Public URL
                );
            }

            var croppedFace = new CroppedFace
            {
                Id = faceId,
                OriginalImageId = originalImageId,
                Url = faceUrl,
                BoundingBox = croppedFaceDto.BoundingBox,
                CreatedAt = timestamp,
                CreatedBy = command.UserId ?? "System"
            };

            _db.CroppedFaces.Add(croppedFace);
            index++;
        }

        // 3. Save DB Changes
        await _db.SaveChangesAsync();

        _logger.LogInformation("Successfully saved Face Detection Session in Database. Saved original image {OriginalId} and {Count} cropped faces.", 
            originalImageId, command.CroppedFaces.Count);

        // 4. Publish Realtime UI Event Notification
        await _dispatcher.PublishAsync(new FaceDetectionSessionSavedEvent
        {
            TrackingId = command.TrackingId,
            UserId = command.UserId,
            OriginalImageId = originalImageId,
            OriginalImageUrl = originalUrl,
            CroppedFacesCount = command.CroppedFaces.Count,
            Message = $"Tải lên thành công ảnh gốc và {command.CroppedFaces.Count} khuôn mặt được chọn!",
            Status = "Completed"
        });
    }
}
