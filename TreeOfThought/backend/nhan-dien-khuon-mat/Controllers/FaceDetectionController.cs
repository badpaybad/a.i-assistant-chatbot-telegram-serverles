using Core.Infra.Auth.Attributes;
using Core.Infra.Base.Interfaces;
using Core.Infra.Base.Controllers;
using Core.Infra.NhanDienKhuonMat.Models;
using Core.Infra.NhanDienKhuonMat.Contexts;
using Core.Infra.Firebase.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.ML.OnnxRuntime;
using Microsoft.ML.OnnxRuntime.Tensors;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Concurrent;

namespace Core.Infra.NhanDienKhuonMat.Controllers;

[ApiController]
[Route("api/face-detection")]
[AppAuthorize]
public class FaceDetectionController : BaseController
{
    private readonly IDispatcher _dispatcher;
    private readonly NhanDienKhuonMatDbContext _db;
    private readonly FaceUserDbContext _faceUserDb;
    private readonly FaceDefinitionDbContext _faceDefinitionDb;
    private readonly FirebaseService _firebaseService;
    private readonly ILogger<FaceDetectionController> _logger;

    public FaceDetectionController(
        IDispatcher dispatcher,
        NhanDienKhuonMatDbContext db,
        FaceUserDbContext faceUserDb,
        FaceDefinitionDbContext faceDefinitionDb,
        FirebaseService firebaseService,
        ILogger<FaceDetectionController> logger)
    {
        _dispatcher = dispatcher;
        _db = db;
        _faceUserDb = faceUserDb;
        _faceDefinitionDb = faceDefinitionDb;
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
        await _dispatcher.SendAsync(command);

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
                ImageCount = s.OriginalImages.Count,
                FaceCount = s.OriginalImages.SelectMany(i => i.CroppedFaces).Count()
            })
            .ToListAsync();

        return Ok(new
        {
            items = sessions,
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

    [HttpGet("users")]
    public async Task<IActionResult> SearchUsers([FromQuery] string? keyword)
    {
        var userQuery = _faceUserDb.Users.AsQueryable();
        if (!string.IsNullOrEmpty(keyword))
        {
            var q = keyword.ToLower();
            userQuery = userQuery.Where(u => u.Username.ToLower().Contains(q) || u.DisplayName.ToLower().Contains(q) || u.Email.ToLower().Contains(q));
        }

        var users = await userQuery.Take(20).Select(u => new
        {
            u.Id,
            u.Username,
            u.DisplayName,
            u.Email,
            u.AvatarUrl
        }).ToListAsync();

        return Ok(users);
    }

    [HttpPost("definitions")]
    public async Task<IActionResult> CreateDefinition([FromBody] CreateFaceDefinitionRequest request)
    {
        if (request.UserId == Guid.Empty || request.OriginalImageId == Guid.Empty)
            return BadRequest("Thông tin không hợp lệ.");

        // Check if this image exists in NhanDienKhuonMat
        var imageExists = await _db.OriginalImages.AnyAsync(i => i.Id == request.OriginalImageId);
        if (!imageExists)
            return NotFound("Không tìm thấy ảnh gốc trong hệ thống.");

        // Check if this user exists in OIDC
        var userExists = await _faceUserDb.Users.AnyAsync(u => u.Id == request.UserId);
        if (!userExists)
            return NotFound("Không tìm thấy người dùng.");

        // Check if this image has already been defined for a DIFFERENT user
        var existingDef = await _faceDefinitionDb.UserFaceDefinitions
            .FirstOrDefaultAsync(d => d.OriginalImageId == request.OriginalImageId);

        if (existingDef != null && existingDef.UserId != request.UserId)
        {
            if (!request.Force)
            {
                // Get existing user display name
                var existingUser = await _faceUserDb.Users.FirstOrDefaultAsync(u => u.Id == existingDef.UserId);
                var existingName = existingUser?.DisplayName ?? existingUser?.Username ?? "người dùng khác";
                return StatusCode(StatusCodes.Status409Conflict, new
                {
                    error = "DuplicateUser",
                    message = $"Ảnh này đã được định nghĩa cho user '{existingName}'. Bạn có chắc chắn muốn tiếp tục gán cho user hiện tại?",
                    existingUserId = existingDef.UserId,
                    existingUserName = existingName
                });
            }
            else
            {
                // If force = true, delete the old definition first
                _faceDefinitionDb.UserFaceDefinitions.Remove(existingDef);
                await _faceDefinitionDb.SaveChangesAsync();
            }
        }

        // Check if already defined for the SAME user
        var isSameDef = await _faceDefinitionDb.UserFaceDefinitions
            .AnyAsync(d => d.OriginalImageId == request.OriginalImageId && d.UserId == request.UserId);

        if (!isSameDef)
        {
            var newDef = new UserFaceDefinition
            {
                Id = Guid.NewGuid(),
                UserId = request.UserId,
                OriginalImageId = request.OriginalImageId,
                CreatedAt = DateTime.UtcNow
            };
            _faceDefinitionDb.UserFaceDefinitions.Add(newDef);
            await _faceDefinitionDb.SaveChangesAsync();
        }

        return Ok(new { message = "Định nghĩa khuôn mặt thành công." });
    }

    [HttpGet("users/{userId}/definitions")]
    public async Task<IActionResult> GetUserDefinitions(Guid userId)
    {
        var user = await _faceUserDb.Users.FirstOrDefaultAsync(u => u.Id == userId);
        if (user == null)
            return NotFound("Không tìm thấy người dùng.");

        // Get all definitions for this user
        var definitions = await _faceDefinitionDb.UserFaceDefinitions
            .Where(d => d.UserId == userId)
            .ToListAsync();

        var imageIds = definitions.Select(d => d.OriginalImageId).ToList();

        // Get all original images matching these IDs
        var images = await _db.OriginalImages
            .Where(i => imageIds.Contains(i.Id))
            .Select(i => new
            {
                i.Id,
                i.FileName,
                i.Url,
                i.Size,
                i.CreatedAt,
                CroppedFaces = i.CroppedFaces.Select(c => new
                {
                    c.Id,
                    c.Url,
                    c.BoundingBox
                }).ToList()
            })
            .ToListAsync();

        // Map them together
        var result = definitions.Select(d =>
        {
            var img = images.FirstOrDefault(i => i.Id == d.OriginalImageId);
            return new
            {
                d.Id, // Definition mapping Id
                d.OriginalImageId,
                d.CreatedAt,
                Image = img
            };
        }).Where(r => r.Image != null).ToList();

        return Ok(new
        {
            User = new
            {
                user.Id,
                user.Username,
                user.DisplayName,
                user.Email,
                user.AvatarUrl
            },
            Definitions = result
        });
    }

    [HttpDelete("definitions/{definitionId}")]
    public async Task<IActionResult> DeleteDefinition(Guid definitionId)
    {
        var def = await _faceDefinitionDb.UserFaceDefinitions.FindAsync(definitionId);
        if (def == null)
            return NotFound("Không tìm thấy định nghĩa khuôn mặt.");

        _faceDefinitionDb.UserFaceDefinitions.Remove(def);
        await _faceDefinitionDb.SaveChangesAsync();

        return Ok(new { message = "Đã xóa định nghĩa khuôn mặt thành công khỏi người dùng." });
    }

    // =========================================================
    // === NEW TRAINING ENDPOINTS (Added 2026-05-28 16:59:32) ===
    // =========================================================

    /// <summary>
    /// Lấy danh sách các user đã có khuôn mặt được định nghĩa, kèm số ảnh định nghĩa.
    /// </summary>
    [HttpGet("users-with-definitions")]
    public async Task<IActionResult> GetUsersWithDefinitions()
    {
        var definitions = await _faceDefinitionDb.UserFaceDefinitions.ToListAsync();
        if (!definitions.Any())
            return Ok(new List<object>());

        var userIds = definitions.Select(d => d.UserId).Distinct().ToList();
        var imageIds = definitions.Select(d => d.OriginalImageId).Distinct().ToList();

        // Get all original images matching these IDs, along with their cropped faces
        var images = await _db.OriginalImages
            .Where(i => imageIds.Contains(i.Id))
            .Select(i => new
            {
                i.Id,
                CroppedFaces = i.CroppedFaces.Select(c => new
                {
                    c.Id,
                    c.Url
                }).ToList()
            })
            .ToListAsync();

        var users = await _faceUserDb.Users
            .Where(u => userIds.Contains(u.Id))
            .Select(u => new { u.Id, u.Username, u.DisplayName, u.Email, u.AvatarUrl })
            .ToListAsync();

        var result = users.Select(u =>
        {
            var userDefs = definitions.Where(d => d.UserId == u.Id).ToList();
            var userImageIds = userDefs.Select(d => d.OriginalImageId).ToList();
            var userImages = images.Where(i => userImageIds.Contains(i.Id)).ToList();
            var faceUrls = userImages.SelectMany(i => i.CroppedFaces.Select(c => c.Url)).Distinct().ToList();

            return new
            {
                u.Id,
                u.Username,
                u.DisplayName,
                u.Email,
                u.AvatarUrl,
                DefinitionCount = userDefs.Count,
                FaceUrls = faceUrls
            };
        }).OrderBy(u => u.DisplayName).ToList();

        return Ok(result);
    }

    /// <summary>
    /// Server-Sent Events endpoint: tải ảnh gốc từ GCS, tạo cấu trúc thư mục và chạy python finetune,
    /// stream stdout thời gian thực về trình duyệt.
    /// </summary>
    [HttpGet("train/stream")]
    public async Task TrainStream([FromQuery] string userIds, CancellationToken cancellationToken)
    {
        Response.Headers["Content-Type"] = "text/event-stream";
        Response.Headers["Cache-Control"] = "no-cache";
        Response.Headers["X-Accel-Buffering"] = "no";

        async Task SendSseAsync(string message)
        {
            var data = $"data: {message.Replace("\n", "\\n")}\n\n";
            await Response.WriteAsync(data, cancellationToken);
            await Response.Body.FlushAsync(cancellationToken);
        }

        try
        {
            if (string.IsNullOrEmpty(userIds))
            {
                await SendSseAsync("[ERROR] Không có userId nào được chọn.");
                return;
            }

            var userIdList = userIds.Split(',', StringSplitOptions.RemoveEmptyEntries)
                .Select(id => Guid.TryParse(id.Trim(), out var g) ? g : Guid.Empty)
                .Where(g => g != Guid.Empty)
                .ToList();

            if (!userIdList.Any())
            {
                await SendSseAsync("[ERROR] UserIds không hợp lệ.");
                return;
            }

            // 1. Tạo thư mục theo ngày
            var dateStr = DateTime.Now.ToString("yyyy-MM-dd");
            var rootFaceIds = GetRootFaceIdsPath();
            var dateDirPath = Path.Combine(rootFaceIds, dateStr);
            var rawDirPath = Path.Combine(dateDirPath, "dataraw");
            var dataDirPath = Path.Combine(dateDirPath, "data");

            Directory.CreateDirectory(rawDirPath);
            await SendSseAsync($"[INFO] Đã tạo thư mục đào tạo: {dateDirPath}");

            // 2. Tải ảnh gốc từ GCS cho từng user
            using var httpClient = new HttpClient();
            httpClient.Timeout = TimeSpan.FromMinutes(5);

            foreach (var userId in userIdList)
            {
                if (cancellationToken.IsCancellationRequested) break;

                var user = await _faceUserDb.Users.FirstOrDefaultAsync(u => u.Id == userId, cancellationToken);
                if (user == null)
                {
                    await SendSseAsync($"[WARN] Không tìm thấy user: {userId}");
                    continue;
                }

                var userFolderName = $"{userId}_{user.Username}";
                var userRawPath = Path.Combine(rawDirPath, userFolderName);
                Directory.CreateDirectory(userRawPath);

                // Lấy tất cả ảnh gốc của user thông qua bảng UserFaceDefinitions
                var definitions = await _faceDefinitionDb.UserFaceDefinitions
                    .Where(d => d.UserId == userId)
                    .ToListAsync(cancellationToken);

                var imageIds = definitions.Select(d => d.OriginalImageId).ToList();
                var images = await _db.OriginalImages
                    .Where(i => imageIds.Contains(i.Id))
                    .ToListAsync(cancellationToken);

                await SendSseAsync($"[INFO] User '{user.DisplayName}': Đang tải {images.Count} ảnh gốc...");

                int downloadedCount = 0;
                foreach (var image in images)
                {
                    if (cancellationToken.IsCancellationRequested) break;
                    try
                    {
                        var extension = Path.GetExtension(image.FileName).ToLowerInvariant();
                        if (string.IsNullOrEmpty(extension)) extension = ".jpg";
                        var localImagePath = Path.Combine(userRawPath, $"{image.Id}{extension}");

                        var imageBytes = await httpClient.GetByteArrayAsync(image.Url, cancellationToken);
                        await System.IO.File.WriteAllBytesAsync(localImagePath, imageBytes, cancellationToken);
                        downloadedCount++;
                    }
                    catch (Exception ex)
                    {
                        await SendSseAsync($"[WARN] Lỗi tải ảnh {image.FileName}: {ex.Message}");
                    }
                }

                await SendSseAsync($"[INFO] User '{user.DisplayName}': Đã tải xong {downloadedCount}/{images.Count} ảnh.");
            }

            if (cancellationToken.IsCancellationRequested)
            {
                await SendSseAsync("[INFO] Đào tạo đã bị hủy bởi người dùng.");
                return;
            }

            // 3. Xác định đường dẫn file main.py
            var arcfaceDir = GetArcFaceDir();
            var mainPyPath = Path.Combine(arcfaceDir, "main.py");

            if (!System.IO.File.Exists(mainPyPath))
            {
                await SendSseAsync($"[ERROR] Không tìm thấy main.py tại: {mainPyPath}");
                return;
            }

            var pythonExe = Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, "../../../../../../venv/bin/python3")); // Workspace root venv
            if (!System.IO.File.Exists(pythonExe))
            {
                pythonExe = Path.GetFullPath(Path.Combine(arcfaceDir, "venv", "bin", "python3")); // Local venv
            }
            if (!System.IO.File.Exists(pythonExe))
            {
                pythonExe = "python3"; // Fallback to global python3
                await SendSseAsync("[WARN] Không tìm thấy venv, sử dụng python3 toàn cục.");
            }

            // 4. Xác định đường dẫn các file model output
            var modelFinalPath = Path.Combine(dateDirPath, "arcface_model_final.onnx");
            var modelFinalMobilePath = Path.Combine(dateDirPath, "arcface_model_final_mobile.onnx");
            var modelBestPath = Path.Combine(dateDirPath, "arcface_model_best.onnx");
            var modelBestMobilePath = Path.Combine(dateDirPath, "arcface_model_best_mobile.onnx");

            var arguments = $"\"{mainPyPath}\" " +
                            $"--epochs 10 " +
                            $"--batch_size 16 " +
                            $"--learning_rate 0.00005 " +
                            $"--align_mode advanced " +
                            $"--raw_dir \"{rawDirPath}\" " +
                            $"--data_dir \"{dataDirPath}\" " +
                            $"--model_output_path \"{modelFinalPath}\" " +
                            $"--mobile_model_output_path \"{modelFinalMobilePath}\" " +
                            $"--best_model_output_path \"{modelBestPath}\" " +
                            $"--best_mobile_model_output_path \"{modelBestMobilePath}\" " +
                            $"--device cpu";

            await SendSseAsync($"[INFO] Bắt đầu tiến trình đào tạo ArcFace...");
            await SendSseAsync($"[CMD] {pythonExe} {arguments}");

            // 5. Chạy python process và stream stdout
            var psi = new ProcessStartInfo
            {
                FileName = pythonExe,
                Arguments = arguments,
                WorkingDirectory = arcfaceDir,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            using var process = new Process { StartInfo = psi };
            process.Start();

            // Stream stdout
            var stdoutTask = Task.Run(async () =>
            {
                string? line;
                while ((line = await process.StandardOutput.ReadLineAsync()) != null)
                {
                    if (cancellationToken.IsCancellationRequested) break;
                    try
                    {
                        await SendSseAsync(line);
                    }
                    catch { break; }
                }
            });

            // Stream stderr (as warnings)
            var stderrTask = Task.Run(async () =>
            {
                string? line;
                while ((line = await process.StandardError.ReadLineAsync()) != null)
                {
                    if (cancellationToken.IsCancellationRequested) break;
                    try
                    {
                        await SendSseAsync($"[STDERR] {line}");
                    }
                    catch { break; }
                }
            });

            await Task.WhenAll(stdoutTask, stderrTask);
            await process.WaitForExitAsync(cancellationToken);

            if (process.ExitCode == 0)
            {
                await SendSseAsync($"[SUCCESS] Đào tạo hoàn tất! Mô hình tốt nhất lưu tại: {modelBestPath}");
                await SendSseAsync($"[DONE] {dateStr}");
            }
            else
            {
                await SendSseAsync($"[ERROR] Tiến trình thất bại với mã lỗi: {process.ExitCode}");
            }
        }
        catch (OperationCanceledException)
        {
            _logger.LogInformation("[Train/Stream] SSE connection cancelled by client.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "[Train/Stream] Unexpected error during training stream.");
            try
            {
                var errMsg = $"data: [ERROR] Lỗi hệ thống: {ex.Message.Replace("\n", " ")}\n\n";
                await Response.WriteAsync(errMsg);
                await Response.Body.FlushAsync();
            }
            catch { /* Client đã ngắt kết nối */ }
        }
    }

    /// <summary>
    /// Lấy danh sách các thư mục huấn luyện đã tạo (theo ngày) trong facesid/.
    /// </summary>
    [HttpGet("training-folders")]
    public IActionResult GetTrainingFolders()
    {
        var rootFaceIds = GetRootFaceIdsPath();

        if (!Directory.Exists(rootFaceIds))
            return Ok(new List<object>());

        var folders = Directory.GetDirectories(rootFaceIds)
            .Select(d =>
            {
                var folderName = Path.GetFileName(d);
                var bestModelPath = Path.Combine(d, "arcface_model_best.onnx");
                var hasBestModel = System.IO.File.Exists(bestModelPath);
                return new
                {
                    FolderName = folderName,
                    Path = d,
                    HasBestModel = hasBestModel,
                    CreatedAt = Directory.GetCreationTime(d)
                };
            })
            .OrderByDescending(f => f.FolderName)
            .ToList();

        return Ok(folders);
    }

    /// <summary>
    /// Trích xuất embedding 512 chiều từ mô hình ONNX tốt nhất và lưu vào database.
    /// </summary>
    [HttpPost("training-folders/{folderName}/extract-embeddings")]
    public async Task<IActionResult> ExtractEmbeddings(string folderName)
    {
        var rootFaceIds = GetRootFaceIdsPath();
        var dateDirPath = Path.Combine(rootFaceIds, folderName);
        var bestModelPath = Path.Combine(dateDirPath, "arcface_model_best.onnx");
        var dataDirPath = Path.Combine(dateDirPath, "data");

        if (!System.IO.File.Exists(bestModelPath))
            return NotFound($"Không tìm thấy mô hình tốt nhất tại: {bestModelPath}");

        if (!Directory.Exists(dataDirPath))
            return NotFound($"Không tìm thấy thư mục data tại: {dataDirPath}");

        var processedCount = 0;
        var errorCount = 0;

        try
        {
            var session = GetOrCreateSession(bestModelPath);

            // Quét từng subfolder theo dạng {userid_username}
            var userFolders = Directory.GetDirectories(dataDirPath);
            foreach (var userFolder in userFolders)
            {
                var folderBaseName = Path.GetFileName(userFolder);
                var parts = folderBaseName.Split('_', 2);
                if (parts.Length < 1 || !Guid.TryParse(parts[0], out var userId))
                {
                    _logger.LogWarning("[ExtractEmbeddings] Bỏ qua folder không hợp lệ: {FolderName}", folderBaseName);
                    continue;
                }

                // Lấy danh sách ảnh đã align trong folder user này
                var imageFiles = Directory.GetFiles(userFolder, "*.png", SearchOption.TopDirectoryOnly)
                    .Concat(Directory.GetFiles(userFolder, "*.jpg", SearchOption.TopDirectoryOnly))
                    .Concat(Directory.GetFiles(userFolder, "*.jpeg", SearchOption.TopDirectoryOnly))
                    .ToList();

                // Lấy OriginalImageId tương ứng từ database
                var definitions = await _faceDefinitionDb.UserFaceDefinitions
                    .Where(d => d.UserId == userId)
                    .ToListAsync();

                var imageIds = definitions.Select(d => d.OriginalImageId).ToList();
                var originalImages = await _db.OriginalImages
                    .Where(i => imageIds.Contains(i.Id))
                    .ToListAsync();

                // Với mỗi file ảnh đã align, trích xuất embedding và lưu vào DB
                for (int imgIdx = 0; imgIdx < imageFiles.Count && imgIdx < originalImages.Count; imgIdx++)
                {
                    var imgFile = imageFiles[imgIdx];
                    var originalImage = originalImages[imgIdx];

                    try
                    {
                        var embedding = ExtractEmbeddingFromFile(session, imgFile);

                        // Lưu hoặc cập nhật embedding vào DB (upsert theo OriginalImageId + UserId)
                        var existing = await _faceDefinitionDb.UserFaceEmbeddings
                            .FirstOrDefaultAsync(e => e.OriginalImageId == originalImage.Id && e.UserId == userId);

                        if (existing != null)
                        {
                            existing.Embedding = new Pgvector.Vector(embedding);
                            existing.BestModelPath = bestModelPath;
                            existing.InputImagePath = imgFile;
                            existing.CreatedAt = DateTime.UtcNow;
                        }
                        else
                        {
                            _faceDefinitionDb.UserFaceEmbeddings.Add(new UserFaceEmbedding
                            {
                                Id = Guid.NewGuid(),
                                UserId = userId,
                                OriginalImageId = originalImage.Id,
                                Embedding = new Pgvector.Vector(embedding),
                                BestModelPath = bestModelPath,
                                InputImagePath = imgFile,
                                CreatedAt = DateTime.UtcNow
                            });
                        }

                        processedCount++;
                    }
                    catch (Exception ex)
                    {
                        _logger.LogWarning(ex, "[ExtractEmbeddings] Lỗi khi trích xuất embedding từ ảnh: {File}", imgFile);
                        errorCount++;
                    }
                }
            }

            await _faceDefinitionDb.SaveChangesAsync();

            return Ok(new
            {
                message = $"Trích xuất embedding hoàn tất.",
                processedCount,
                errorCount
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "[ExtractEmbeddings] Lỗi hệ thống khi trích xuất embedding.");
            return StatusCode(500, new { message = $"Lỗi hệ thống: {ex.Message}" });
        }
    }

    // ============================================================
    // === PRIVATE HELPERS ===
    // ============================================================

    /// <summary>
    /// Đọc file ảnh, chuẩn hóa về tensor NCHW 112x112 và chạy suy luận ONNX.
    /// Trả về vector embedding 512 chiều đã được L2 Normalize.
    /// </summary>
    private static float[] ExtractEmbeddingFromFile(InferenceSession session, string imagePath)
    {
        using var image = Image.Load<Rgb24>(imagePath);
        image.Mutate(x => x.Resize(112, 112));

        // Chuyển thành tensor NCHW [1, 3, 112, 112] và chuẩn hóa về [-1, 1]
        var tensor = new DenseTensor<float>(new[] { 1, 3, 112, 112 });
        image.ProcessPixelRows(accessor =>
        {
            for (int y = 0; y < 112; y++)
            {
                var row = accessor.GetRowSpan(y);
                for (int x = 0; x < 112; x++)
                {
                    var pixel = row[x];
                    tensor[0, 0, y, x] = (pixel.R - 127.5f) / 127.5f; // R channel
                    tensor[0, 1, y, x] = (pixel.G - 127.5f) / 127.5f; // G channel
                    tensor[0, 2, y, x] = (pixel.B - 127.5f) / 127.5f; // B channel
                }
            }
        });

        var inputs = new List<NamedOnnxValue>
        {
            NamedOnnxValue.CreateFromTensor("input", tensor)
        };

        using var results = session.Run(inputs);
        var outputTensor = results.First().AsEnumerable<float>().ToArray();

        // L2 Normalize (bắt buộc trước khi lưu hoặc so sánh)
        return L2Normalize(outputTensor);
    }

    /// <summary>
    /// Chuẩn hóa L2 vector embedding về độ dài đơn vị (unit vector).
    /// </summary>
    private static float[] L2Normalize(float[] vector)
    {
        var norm = (float)Math.Sqrt(vector.Sum(x => x * x));
        if (norm < 1e-10f) return vector;
        return vector.Select(x => x / norm).ToArray();
    }

    private string GetArcFaceDir()
    {
        var baseDomain = AppContext.BaseDirectory;
        var arcfaceDir = Path.GetFullPath(Path.Combine(baseDomain, "../../../ArcFaceFinetune")); // For Core.Web.Api/ArcFaceFinetune
        if (!System.IO.File.Exists(Path.Combine(arcfaceDir, "main.py")))
        {
            // Fallback to docs directory inside monorepo structure
            arcfaceDir = Path.GetFullPath(Path.Combine(baseDomain, "../../../../../docs/nhan-dien-khuon-mat/ArcFaceFinetune"));
        }
        return arcfaceDir;
    }

    private string GetRootFaceIdsPath()
    {
        return Path.Combine(GetArcFaceDir(), "facesid");
    }

    /// <summary>
    /// Trích xuất tên đối tượng GCS từ URL công khai.
    /// </summary>
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

    private string AlignFaceCSharp(string inputPath, float eyeLeftX, float eyeLeftY, float eyeRightX, float eyeRightY, float padX, float padY, float clientScale)
    {
        return AlignAndCropFaceCSharp(inputPath, eyeLeftX, eyeLeftY, eyeRightX, eyeRightY, padX, padY, clientScale);
        var outputPath = Path.Combine(Path.GetDirectoryName(inputPath)!, $"{Guid.NewGuid()}_aligned.png");

        using (var source = Image.Load<Rgb24>(inputPath))
        using (var target = new Image<Rgb24>(112, 112))
        {
            float cx = (eyeLeftX + eyeRightX) / 2.0f;
            float cy = (eyeLeftY + eyeRightY) / 2.0f;
            float dx = eyeRightX - eyeLeftX;
            float dy = eyeRightY - eyeLeftY;

            float currentDist = (float)Math.Sqrt(dx * dx + dy * dy);
            if (currentDist < 1e-5f) currentDist = 1e-5f;
            float angleRad = (float)Math.Atan2(dy, dx);

            // Target ArcFace coordinates
            float targetDist = 35.2372f;
            float tx = 55.9132f;
            float ty = 51.59885f;
            float scale = targetDist / currentDist;

            float cosVal = (float)Math.Cos(angleRad);
            float sinVal = (float)Math.Sin(angleRad);

            target.ProcessPixelRows(accessor =>
            {
                for (int y = 0; y < 112; y++)
                {
                    var row = accessor.GetRowSpan(y);
                    float y3 = y - ty;
                    for (int x = 0; x < 112; x++)
                    {
                        float x3 = x - tx;
                        float x2 = x3 / scale;
                        float y2 = y3 / scale;

                        // Rotate back by +angleRad
                        float x1 = x2 * cosVal - y2 * sinVal;
                        float y1 = x2 * sinVal + y2 * cosVal;

                        float xSrc = x1 + cx;
                        float ySrc = y1 + cy;

                        row[x] = SampleBilinear(source, xSrc, ySrc);
                    }
                }
            });

            target.Save(outputPath);
        }
        return outputPath;
    }

    private string AlignAndCropFaceCSharp(
        string inputPath,
        float eyeLeftX,
        float eyeLeftY,
        float eyeRightX,
        float eyeRightY,
        float padX,
        float padY,
        float clientScale) // Đổi tên để tránh trùng với scale của ArcFace
    {
        var outputPath = Path.Combine(Path.GetDirectoryName(inputPath)!, $"{Guid.NewGuid()}_aligned.png");

        using (var source = Image.Load<Rgb24>(inputPath))
        using (var target = new Image<Rgb24>(112, 112))
        {
            // 1. Tính toán khoảng cách và góc dựa trên tọa độ mắt nhận được từ Client
            float dx = eyeRightX - eyeLeftX;
            float dy = eyeRightY - eyeLeftY;

            float currentDist = (float)Math.Sqrt(dx * dx + dy * dy);
            if (currentDist < 1e-5f) currentDist = 1e-5f;
            float angleRad = (float)Math.Atan2(dy, dx);

            float angleDeg = angleRad * (180.0f / (float)Math.PI);
            _logger.LogInformation($"[Debug] Khoảng cách mắt nhận được: {currentDist}px, Góc nghiêng tính được: {angleDeg} độ");

            // 2. TÂM MẮT THỰC TẾ TRÊN ẢNH SOURCE
            // CHÚ Ý: Vì eyeLeftX, eyeLeftY... truyền từ client lên ĐÃ LÀ tọa độ nằm trên tấm ảnh paddedBlob rồi,
            // nên tâm mắt trên tấm ảnh source này đơn giản là trung bình cộng của chúng. 
            // BẠN KHÔNG ĐƯỢC CỘNG THÊM padX, padY vào đây nữa vì sẽ gây lệch tâm.
            float cxSrc = (eyeLeftX + eyeRightX) / 2.0f;
            float cySrc = (eyeLeftY + eyeRightY) / 2.0f;

            // 3. Cấu hình các tham số mục tiêu theo chuẩn ArcFace
            float targetDist = 35.2372f;  // Khoảng cách 2 mắt chuẩn ArcFace trong ảnh 112x112
            float tx = 55.9132f;          // Tâm X mắt mong muốn trên ảnh 112x112
            float ty = 51.59885f;         // Tâm Y mắt mong muốn trên ảnh 112x112

            // Tỉ lệ scale để đưa khoảng cách mắt hiện tại về chuẩn 35.2372px của ArcFace
            float arcfaceScale = targetDist / currentDist;

            float cosVal = (float)Math.Cos(angleRad);
            float sinVal = (float)Math.Sin(angleRad);

            // 4. Biến đổi Affine ngược để lấy từng pixel cho ảnh 112x112 thẳng góc
            target.ProcessPixelRows(accessor =>
            {
                for (int y = 0; y < 112; y++)
                {
                    var row = accessor.GetRowSpan(y);
                    float y3 = y - ty;
                    for (int x = 0; x < 112; x++)
                    {
                        float x3 = x - tx;

                        // Khôi phục tỉ lệ ArcFace
                        float x2 = x3 / arcfaceScale;
                        float y2 = y3 / arcfaceScale;

                        // Xoay ngược góc angleRad để làm thẳng khuôn mặt
                        float x1 = x2 * cosVal - y2 * sinVal;
                        float y1 = x2 * sinVal + y2 * cosVal;

                        // Tịnh tiến về đúng tâm mắt thực tế trên ảnh source (đã có sẵn lề padding từ client)
                        float xSrc = x1 + cxSrc;
                        float ySrc = y1 + cySrc;

                        // Lấy mẫu nội suy Bilinear từ ảnh nguồn paddedBlob
                        row[x] = SampleBilinear(source, xSrc, ySrc);
                    }
                }
            });
            

            target.Save(outputPath);
        }
        _logger.LogInformation($"[AlignFaceCSharp] Server-side face alignment thành công (Chuẩn ArcFace 112x112). Output path: {outputPath}");
        return outputPath;
    }
    private static Rgb24 SampleBilinear(Image<Rgb24> source, float x, float y)
    {
        int width = source.Width;
        int height = source.Height;

        // Clamp coordinates to image boundaries
        x = Math.Clamp(x, 0f, width - 1f);
        y = Math.Clamp(y, 0f, height - 1f);

        int xFloor = (int)Math.Floor(x);
        int yFloor = (int)Math.Floor(y);
        int xCeil = Math.Min(xFloor + 1, width - 1);
        int yCeil = Math.Min(yFloor + 1, height - 1);

        float dx = x - xFloor;
        float dy = y - yFloor;

        Rgb24 p00 = source[xFloor, yFloor];
        Rgb24 p10 = source[xCeil, yFloor];
        Rgb24 p01 = source[xFloor, yCeil];
        Rgb24 p11 = source[xCeil, yCeil];

        float r = (1f - dx) * (1f - dy) * p00.R + dx * (1f - dy) * p10.R + (1f - dx) * dy * p01.R + dx * dy * p11.R;
        float g = (1f - dx) * (1f - dy) * p00.G + dx * (1f - dy) * p10.G + (1f - dx) * dy * p01.G + dx * dy * p11.G;
        float b = (1f - dx) * (1f - dy) * p00.B + dx * (1f - dy) * p10.B + (1f - dx) * dy * p01.B + dx * dy * p11.B;

        return new Rgb24((byte)Math.Clamp(r, 0f, 255f), (byte)Math.Clamp(g, 0f, 255f), (byte)Math.Clamp(b, 0f, 255f));
    }

    // ============================================================
    // === EMBEDDINGS MANAGEMENT AND COMPARISON ENDPOINTS (Added 2026-05-29) ===
    // ============================================================

    [HttpGet("embeddings")]
    public async Task<IActionResult> GetEmbeddings()
    {
        var embeddings = await _faceDefinitionDb.UserFaceEmbeddings.ToListAsync();
        var userIds = embeddings.Select(e => e.UserId).Distinct().ToList();
        var imageIds = embeddings.Select(e => e.OriginalImageId).Distinct().ToList();

        var users = await _faceUserDb.Users
            .Where(u => userIds.Contains(u.Id))
            .ToListAsync();

        var images = await _db.OriginalImages
            .Where(i => imageIds.Contains(i.Id))
            .Select(i => new { i.Id, i.Url, i.FileName })
            .ToListAsync();

        var result = users.Select(u => new
        {
            User = new
            {
                u.Id,
                u.Username,
                u.DisplayName,
                u.Email,
                u.AvatarUrl
            },
            Embeddings = embeddings.Where(e => e.UserId == u.Id).Select(e =>
            {
                var img = images.FirstOrDefault(i => i.Id == e.OriginalImageId);
                return new
                {
                    e.Id,
                    e.OriginalImageId,
                    ImageUrl = img?.Url,
                    ImageName = img?.FileName,
                    e.BestModelPath,
                    e.InputImagePath,
                    Embedding = e.Embedding != null ? e.Embedding.ToArray() : Array.Empty<float>(),
                    e.CreatedAt
                };
            }).ToList()
        }).OrderBy(u => u.User.DisplayName).ToList();

        return Ok(result);
    }

    [HttpGet("embeddings/{id}/image")]
    [AllowAnonymous]
    public async Task<IActionResult> GetEmbeddingImage(Guid id)
    {
        var embedding = await _faceDefinitionDb.UserFaceEmbeddings.FindAsync(id);
        if (embedding == null)
            return NotFound("Không tìm thấy embedding.");

        var imagePath = embedding.InputImagePath;
        if (string.IsNullOrEmpty(imagePath) || !System.IO.File.Exists(imagePath))
        {
            // Fallback: If the path is relative or not found, try to resolve it relative to ArcFaceDir
            if (!string.IsNullOrEmpty(imagePath))
            {
                var resolvedPath = Path.GetFullPath(imagePath);
                if (!System.IO.File.Exists(resolvedPath))
                {
                    var arcfaceDir = GetArcFaceDir();
                    resolvedPath = Path.Combine(arcfaceDir, imagePath);
                }
                if (System.IO.File.Exists(resolvedPath))
                {
                    imagePath = resolvedPath;
                }
            }
        }

        if (string.IsNullOrEmpty(imagePath) || !System.IO.File.Exists(imagePath))
            return NotFound("Không tìm thấy ảnh nguồn của embedding.");

        var contentType = "image/png";
        if (imagePath.EndsWith(".jpg") || imagePath.EndsWith(".jpeg"))
            contentType = "image/jpeg";

        var fileBytes = await System.IO.File.ReadAllBytesAsync(imagePath);
        return File(fileBytes, contentType);
    }

    [HttpDelete("embeddings/{id}")]
    public async Task<IActionResult> DeleteEmbedding(Guid id)
    {
        var item = await _faceDefinitionDb.UserFaceEmbeddings.FindAsync(id);
        if (item == null)
            return NotFound("Không tìm thấy embedding.");

        _faceDefinitionDb.UserFaceEmbeddings.Remove(item);
        await _faceDefinitionDb.SaveChangesAsync();
        return Ok(new { message = "Đã xóa embedding thành công." });
    }

    [HttpDelete("embeddings/user/{userId}")]
    public async Task<IActionResult> DeleteUserEmbeddings(Guid userId)
    {
        var list = await _faceDefinitionDb.UserFaceEmbeddings.Where(e => e.UserId == userId).ToListAsync();
        if (list.Any())
        {
            _faceDefinitionDb.UserFaceEmbeddings.RemoveRange(list);
            await _faceDefinitionDb.SaveChangesAsync();
        }
        return Ok(new { message = "Đã xóa toàn bộ embedding của user thành công." });
    }

    [HttpPost("embeddings/{id}/compare")]
    public async Task<IActionResult> CompareEmbedding(Guid id, IFormFile image, [FromQuery] float? threshold)
    {
        if (image == null || image.Length == 0)
            return BadRequest("Tệp ảnh không hợp lệ.");

        var targetEmbedding = await _faceDefinitionDb.UserFaceEmbeddings.FindAsync(id);
        if (targetEmbedding == null)
            return NotFound("Không tìm thấy embedding đích.");

        var bestModelPath = targetEmbedding.BestModelPath;
        if (string.IsNullOrEmpty(bestModelPath) || !System.IO.File.Exists(bestModelPath))
        {
            // Fallback to resolve path
            if (!string.IsNullOrEmpty(bestModelPath))
            {
                var resolvedPath = Path.GetFullPath(bestModelPath);
                if (!System.IO.File.Exists(resolvedPath))
                {
                    var arcfaceDir = GetArcFaceDir();
                    resolvedPath = Path.Combine(arcfaceDir, bestModelPath);
                }
                if (System.IO.File.Exists(resolvedPath))
                {
                    bestModelPath = resolvedPath;
                }
            }

            if (string.IsNullOrEmpty(bestModelPath) || !System.IO.File.Exists(bestModelPath))
            {
                // Fallback to the latest best model
                var rootFaceIds = GetRootFaceIdsPath();
                if (Directory.Exists(rootFaceIds))
                {
                    var latestModel = Directory.GetDirectories(rootFaceIds)
                        .Select(d => Path.Combine(d, "arcface_model_best.onnx"))
                        .Where(System.IO.File.Exists)
                        .OrderByDescending(System.IO.File.GetCreationTime)
                        .FirstOrDefault();
                    if (latestModel != null)
                    {
                        bestModelPath = latestModel;
                    }
                }
            }
        }

        if (string.IsNullOrEmpty(bestModelPath) || !System.IO.File.Exists(bestModelPath))
            return BadRequest("Không tìm thấy mô hình ONNX để thực hiện so sánh.");

        // Extract embedding from the uploaded aligned image
        float[] testEmbedding;
        try
        {
            var tempDir = Path.Combine(GetArcFaceDir(), "temp");
            Directory.CreateDirectory(tempDir);
            var tempPath = Path.Combine(tempDir, $"{Guid.NewGuid()}.png");

            using (var fs = new FileStream(tempPath, FileMode.Create))
            {
                await image.CopyToAsync(fs);
            }

            try
            {
                var inferenceSession = GetOrCreateSession(bestModelPath);
                testEmbedding = ExtractEmbeddingFromFile(inferenceSession, tempPath);
            }
            finally
            {
                if (System.IO.File.Exists(tempPath))
                {
                    System.IO.File.Delete(tempPath);
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Lỗi khi trích xuất embedding từ ảnh so sánh.");
            return StatusCode(500, new { message = $"Lỗi trích xuất đặc trưng: {ex.Message}" });
        }

        // Perform fast vector neighbor comparison using HNSW + Inner Product via raw SQL <#> operator
        var vectorStr = "[" + string.Join(",", testEmbedding.Select(v => v.ToString(System.Globalization.CultureInfo.InvariantCulture))) + "]";
        List<UserFaceEmbedding> closestEmbeddings;
        try
        {
            closestEmbeddings = await _faceDefinitionDb.UserFaceEmbeddings
                .FromSqlRaw("SELECT * FROM \"UserFaceEmbeddings\" ORDER BY \"Embedding\" <#> {0}::vector LIMIT 20", vectorStr)
                .ToListAsync();
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Truy vấn HNSW thất bại, sử dụng fallback đối sánh chéo bộ nhớ.");
            closestEmbeddings = await _faceDefinitionDb.UserFaceEmbeddings.ToListAsync();
        }

        // Fetch User and Image Info
        var userIds = closestEmbeddings.Select(e => e.UserId).Distinct().ToList();
        var imageIds = closestEmbeddings.Select(e => e.OriginalImageId).Distinct().ToList();

        var users = await _faceUserDb.Users
            .Where(u => userIds.Contains(u.Id))
            .ToListAsync();

        var images = await _db.OriginalImages
            .Where(i => imageIds.Contains(i.Id))
            .Select(i => new { i.Id, i.Url, i.FileName })
            .ToListAsync();

        // Map results and calculate exact metrics
        var compareResults = closestEmbeddings.Select(e =>
        {
            var user = users.FirstOrDefault(u => u.Id == e.UserId);
            var img = images.FirstOrDefault(i => i.Id == e.OriginalImageId);

            // Cosine Similarity = Inner Product for L2 normalized vectors
            float cosineSimilarity = 0f;
            var embArray = e.Embedding?.ToArray();
            if (embArray != null && embArray.Length == testEmbedding.Length)
            {
                for (int i = 0; i < testEmbedding.Length; i++)
                {
                    cosineSimilarity += embArray[i] * testEmbedding[i];
                }
            }

            // L2 Distance
            float l2Distance = (float)Math.Sqrt(Math.Max(0f, 2f - 2f * cosineSimilarity));

            return new
            {
                EmbeddingId = e.Id,
                UserId = e.UserId,
                Username = user?.Username ?? "Unknown",
                DisplayName = user?.DisplayName ?? "Unknown",
                Email = user?.Email ?? "",
                AvatarUrl = user?.AvatarUrl ?? "",
                OriginalImageId = e.OriginalImageId,
                ImageUrl = img?.Url,
                ImageName = img?.FileName,
                CosineSimilarity = cosineSimilarity,
                L2Distance = l2Distance,
                IsTarget = e.UserId == targetEmbedding.UserId
            };
        }).ToList();

        var sortedResults = compareResults
            .OrderByDescending(r => r.CosineSimilarity)
            .ToList();

        if (threshold.HasValue)
        {
            sortedResults = sortedResults.Where(r => r.CosineSimilarity >= threshold.Value).ToList();
        }

        var targetUser = users.FirstOrDefault(u => u.Id == targetEmbedding.UserId);
        var targetUserResult = compareResults.Where(r => r.UserId == targetEmbedding.UserId)
            .OrderByDescending(r => r.CosineSimilarity)
            .FirstOrDefault();

        return Ok(new
        {
            TargetUser = new
            {
                Id = targetEmbedding.UserId,
                Username = targetUser?.Username ?? "Unknown",
                DisplayName = targetUser?.DisplayName ?? "Unknown",
                Email = targetUser?.Email ?? "",
                AvatarUrl = targetUser?.AvatarUrl ?? ""
            },
            TargetUserBestMatch = targetUserResult,
            AllMatches = sortedResults
        });
    }
    private static readonly ConcurrentDictionary<string, Lazy<InferenceSession>> _sessions = new();
    private static void RemoveModel(string modelPath)
    {
        if (_sessions.TryRemove(modelPath, out var lazySession))
        {
            // Nếu session đó đã từng được khởi tạo, phải Dispose để giải phóng RAM/GPU
            if (lazySession.IsValueCreated)
            {
                lazySession.Value.Dispose();
            }
        }
    }
    public InferenceSession GetOrCreateSession(string modelPath)
    {
        if (string.IsNullOrWhiteSpace(modelPath))
        {
            throw new ArgumentException("Model path cannot be null or empty.", nameof(modelPath));
        }

        // GetOrAdd đảm bảo việc lấy hoặc tạo Lazy là thread-safe
        var lazySession = _sessions.GetOrAdd(modelPath, path =>
        {
            return new Lazy<InferenceSession>(() =>
            {
                // Cấu hình Option nếu cần (ví dụ: Sử dụng GPU/CUDA)
                var options = new SessionOptions();
                options.AppendExecutionProvider_CPU(0);

                Console.WriteLine($"[Log] Đang khởi tạo InferenceSession mới cho: {path}");
                return new InferenceSession(path, options);
            }, LazyThreadSafetyMode.ExecutionAndPublication); // Đảm bảo thread-safe tuyệt đối khi khởi tạo giá trị bên trong
        });

        // Trả về InferenceSession thực tế (chỉ khởi tạo khi .Value được gọi lần đầu tiên)
        return lazySession.Value;
    }


    [HttpPost("compare-global")]
    [AllowAnonymous]
    public async Task<IActionResult> CompareGlobal(
        IFormFile image,
        [FromQuery] float? threshold,
        [FromForm] float? eyeLeftX,
        [FromForm] float? eyeLeftY,
        [FromForm] float? eyeRightX,
        [FromForm] float? eyeRightY,
        [FromForm] float? padX,
        [FromForm] float? padY,
        [FromForm] float? clientScale)
    {
        if (image == null || image.Length == 0)
            return BadRequest("Tệp ảnh không hợp lệ.");

        // Find the latest best model in the facesid folders
        string? bestModelPath = null;
        var rootFaceIds = GetRootFaceIdsPath();
        if (Directory.Exists(rootFaceIds))
        {
            var latestModel = Directory.GetDirectories(rootFaceIds)
                .Select(d => Path.Combine(d, "arcface_model_best.onnx"))
                .Where(System.IO.File.Exists)
                .OrderByDescending(System.IO.File.GetCreationTime)
                .FirstOrDefault();
            if (latestModel != null)
            {
                bestModelPath = latestModel;
            }
        }

        // Fallback to query existing embeddings for model path
        if (string.IsNullOrEmpty(bestModelPath) || !System.IO.File.Exists(bestModelPath))
        {
            var anyEmbedding = await _faceDefinitionDb.UserFaceEmbeddings
                .Where(e => !string.IsNullOrEmpty(e.BestModelPath))
                .FirstOrDefaultAsync();
            if (anyEmbedding != null && !string.IsNullOrEmpty(anyEmbedding.BestModelPath))
            {
                bestModelPath = anyEmbedding.BestModelPath;
            }
        }

        if (string.IsNullOrEmpty(bestModelPath) || !System.IO.File.Exists(bestModelPath))
            return BadRequest("Hệ thống chưa có mô hình đào tạo (ONNX) nào. Vui lòng thực hiện đào tạo trước.");

        // Extract embedding from the uploaded image (with server-side re-alignment)
        float[] testEmbedding;
        try
        {
            var tempDir = Path.Combine(GetArcFaceDir(), "temp");
            Directory.CreateDirectory(tempDir);
            var rawTempPath = Path.Combine(tempDir, $"{Guid.NewGuid()}_raw.jpg");
            var alignedTempPath = Path.Combine(tempDir, $"{Guid.NewGuid()}_aligned.png");

            using (var fs = new FileStream(rawTempPath, FileMode.Create))
            {
                await image.CopyToAsync(fs);
            }

            string alignedImagePath = rawTempPath; // fallback nếu alignment thất bại

            if (eyeLeftX.HasValue && eyeLeftY.HasValue && eyeRightX.HasValue && eyeRightY.HasValue)
            {
                try
                {
                    alignedImagePath = AlignFaceCSharp(rawTempPath, eyeLeftX.Value, eyeLeftY.Value, eyeRightX.Value, eyeRightY.Value, padX.Value, padY.Value, clientScale.Value);
                    _logger.LogInformation("[CompareGlobal] Server-side face alignment thành công bằng C#.");
                }
                catch (Exception alignEx)
                {
                    _logger.LogError(alignEx, "[CompareGlobal] Lỗi căn chỉnh khuôn mặt bằng C#.");
                }
            }

            try
            {
                var inferenceSession = GetOrCreateSession(bestModelPath);
                testEmbedding = ExtractEmbeddingFromFile(inferenceSession, alignedImagePath);
            }
            finally
            {
                if (System.IO.File.Exists(rawTempPath)) System.IO.File.Delete(rawTempPath);
                if (System.IO.File.Exists(alignedTempPath)) System.IO.File.Delete(alignedTempPath);
                if (alignedImagePath != rawTempPath && System.IO.File.Exists(alignedImagePath))
                {
                    System.IO.File.Delete(alignedImagePath);
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Lỗi khi trích xuất embedding từ ảnh so sánh toàn cục.");
            return StatusCode(500, new { message = $"Lỗi trích xuất đặc trưng: {ex.Message}" });
        }

        // Perform fast vector neighbor comparison using HNSW + Inner Product via raw SQL <#> operator
        var vectorStr = "[" + string.Join(",", testEmbedding.Select(v => v.ToString(System.Globalization.CultureInfo.InvariantCulture))) + "]";
        List<UserFaceEmbedding> closestEmbeddings;
        try
        {
            closestEmbeddings = await _faceDefinitionDb.UserFaceEmbeddings
                .FromSqlRaw("SELECT * FROM \"UserFaceEmbeddings\" ORDER BY \"Embedding\" <#> {0}::vector LIMIT 20", vectorStr)
                .ToListAsync();
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Truy vấn HNSW thất bại, sử dụng fallback đối sánh chéo bộ nhớ.");
            closestEmbeddings = await _faceDefinitionDb.UserFaceEmbeddings.ToListAsync();
        }

        // Fetch User and Image Info
        var userIds = closestEmbeddings.Select(e => e.UserId).Distinct().ToList();
        var imageIds = closestEmbeddings.Select(e => e.OriginalImageId).Distinct().ToList();

        var users = await _faceUserDb.Users
            .Where(u => userIds.Contains(u.Id))
            .ToListAsync();

        var images = await _db.OriginalImages
            .Where(i => imageIds.Contains(i.Id))
            .Select(i => new { i.Id, i.Url, i.FileName })
            .ToListAsync();

        // Map results and calculate exact metrics
        var compareResults = closestEmbeddings.Select(e =>
        {
            var user = users.FirstOrDefault(u => u.Id == e.UserId);
            var img = images.FirstOrDefault(i => i.Id == e.OriginalImageId);

            // Cosine Similarity = Inner Product for L2 normalized vectors
            float cosineSimilarity = 0f;
            var embArray = e.Embedding?.ToArray();
            if (embArray != null && embArray.Length == testEmbedding.Length)
            {
                for (int i = 0; i < testEmbedding.Length; i++)
                {
                    cosineSimilarity += embArray[i] * testEmbedding[i];
                }
            }

            // L2 Distance
            float l2Distance = (float)Math.Sqrt(Math.Max(0f, 2f - 2f * cosineSimilarity));

            return new
            {
                EmbeddingId = e.Id,
                UserId = e.UserId,
                Username = user?.Username ?? "Unknown",
                DisplayName = user?.DisplayName ?? "Unknown",
                Email = user?.Email ?? "",
                AvatarUrl = user?.AvatarUrl ?? "",
                OriginalImageId = e.OriginalImageId,
                ImageUrl = img?.Url,
                ImageName = img?.FileName,
                CosineSimilarity = cosineSimilarity,
                L2Distance = l2Distance
            };
        }).ToList();

        var sortedResults = compareResults
            .OrderByDescending(r => r.CosineSimilarity)
            .ToList();

        if (threshold.HasValue)
        {
            sortedResults = sortedResults.Where(r => r.CosineSimilarity >= threshold.Value).ToList();
        }

        var bestMatch = sortedResults.FirstOrDefault();

        return Ok(new
        {
            BestMatch = bestMatch,
            AllMatches = sortedResults
        });
    }

    [HttpPost("compare-global-stream")]
    [AllowAnonymous]
    public async Task CompareGlobalStream(
        IFormFile image,
        [FromQuery] float? threshold,
        [FromForm] float? eyeLeftX,
        [FromForm] float? eyeLeftY,
        [FromForm] float? eyeRightX,
        [FromForm] float? eyeRightY,
        [FromForm] float? padX,
        [FromForm] float? padY,
        [FromForm] float? clientScale)
    {
        Response.Headers["Content-Type"] = "text/event-stream";
        Response.Headers["Cache-Control"] = "no-cache";
        Response.Headers["X-Accel-Buffering"] = "no";

        async Task SendSseAsync(object data)
        {
            var json = System.Text.Json.JsonSerializer.Serialize(data);
            await Response.WriteAsync($"data: {json}\n\n");
            await Response.Body.FlushAsync();
        }

        try
        {
            await SendSseAsync(new { status = "received" });

            if (image == null || image.Length == 0)
            {
                await SendSseAsync(new { status = "error", message = "Tệp ảnh không hợp lệ." });
                return;
            }

            // Find the latest best model in the facesid folders
            string? bestModelPath = null;
            var rootFaceIds = GetRootFaceIdsPath();
            if (Directory.Exists(rootFaceIds))
            {
                var latestModel = Directory.GetDirectories(rootFaceIds)
                    .Select(d => Path.Combine(d, "arcface_model_best.onnx"))
                    .Where(System.IO.File.Exists)
                    .OrderByDescending(System.IO.File.GetCreationTime)
                    .FirstOrDefault();
                if (latestModel != null)
                {
                    bestModelPath = latestModel;
                }
            }

            // Fallback to query existing embeddings for model path
            if (string.IsNullOrEmpty(bestModelPath) || !System.IO.File.Exists(bestModelPath))
            {
                var anyEmbedding = await _faceDefinitionDb.UserFaceEmbeddings
                    .Where(e => !string.IsNullOrEmpty(e.BestModelPath))
                    .FirstOrDefaultAsync();
                if (anyEmbedding != null && !string.IsNullOrEmpty(anyEmbedding.BestModelPath))
                {
                    bestModelPath = anyEmbedding.BestModelPath;
                }
            }

            if (string.IsNullOrEmpty(bestModelPath) || !System.IO.File.Exists(bestModelPath))
            {
                await SendSseAsync(new { status = "error", message = "Hệ thống chưa có mô hình đào tạo (ONNX) nào. Vui lòng thực hiện đào tạo trước." });
                return;
            }

            await SendSseAsync(new { status = "aligning" });

            var tempDir = Path.Combine(GetArcFaceDir(), "temp");
            Directory.CreateDirectory(tempDir);
            var rawTempPath = Path.Combine(tempDir, $"{Guid.NewGuid()}_raw.jpg");
            var alignedTempPath = Path.Combine(tempDir, $"{Guid.NewGuid()}_aligned.png");

            using (var fs = new FileStream(rawTempPath, FileMode.Create))
            {
                await image.CopyToAsync(fs);
            }

            string alignedImagePath = rawTempPath; // fallback nếu alignment thất bại

            if (eyeLeftX.HasValue && eyeLeftY.HasValue && eyeRightX.HasValue && eyeRightY.HasValue)
            {
                try
                {
                    alignedImagePath = AlignFaceCSharp(rawTempPath, eyeLeftX.Value, eyeLeftY.Value, eyeRightX.Value, eyeRightY.Value, padX.Value, padY.Value, clientScale.Value);
                    _logger.LogInformation($"[CompareGlobalStream] Server-side face alignment thành công bằng C#. {alignedImagePath}");
                }
                catch (Exception alignEx)
                {
                    _logger.LogError(alignEx, "[CompareGlobalStream] Lỗi căn chỉnh khuôn mặt bằng C#.");
                }
            }

            await SendSseAsync(new { status = "extracting" });

            float[] testEmbedding;
            try
            {
                var inferenceSession = GetOrCreateSession(bestModelPath);
                testEmbedding = ExtractEmbeddingFromFile(inferenceSession, alignedImagePath);
            }
            finally
            {
                if (System.IO.File.Exists(rawTempPath)) System.IO.File.Delete(rawTempPath);
                if (System.IO.File.Exists(alignedTempPath)) System.IO.File.Delete(alignedTempPath);
                if (alignedImagePath != rawTempPath && System.IO.File.Exists(alignedImagePath))
                {
                    System.IO.File.Delete(alignedImagePath);
                }
            }

            await SendSseAsync(new { status = "searching" });

            var vectorStr = "[" + string.Join(",", testEmbedding.Select(v => v.ToString(System.Globalization.CultureInfo.InvariantCulture))) + "]";
            List<UserFaceEmbedding> closestEmbeddings;
            try
            {
                closestEmbeddings = await _faceDefinitionDb.UserFaceEmbeddings
                    .FromSqlRaw("SELECT * FROM \"UserFaceEmbeddings\" ORDER BY \"Embedding\" <#> {0}::vector LIMIT 20", vectorStr)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Truy vấn HNSW thất bại, sử dụng fallback đối sánh chéo bộ nhớ.");
                closestEmbeddings = await _faceDefinitionDb.UserFaceEmbeddings.ToListAsync();
            }

            var userIds = closestEmbeddings.Select(e => e.UserId).Distinct().ToList();
            var imageIds = closestEmbeddings.Select(e => e.OriginalImageId).Distinct().ToList();

            var users = await _faceUserDb.Users
                .Where(u => userIds.Contains(u.Id))
                .ToListAsync();

            var images = await _db.OriginalImages
                .Where(i => imageIds.Contains(i.Id))
                .Select(i => new { i.Id, i.Url, i.FileName })
                .ToListAsync();

            var compareResults = closestEmbeddings.Select(e =>
            {
                var user = users.FirstOrDefault(u => u.Id == e.UserId);
                var img = images.FirstOrDefault(i => i.Id == e.OriginalImageId);

                // Cosine Similarity = Inner Product for L2 normalized vectors
                float cosineSimilarity = 0f;
                var embArray = e.Embedding?.ToArray();
                if (embArray != null && embArray.Length == testEmbedding.Length)
                {
                    for (int i = 0; i < testEmbedding.Length; i++)
                    {
                        cosineSimilarity += embArray[i] * testEmbedding[i];
                    }
                }

                // L2 Distance
                float l2Distance = (float)Math.Sqrt(Math.Max(0f, 2f - 2f * cosineSimilarity));

                return new
                {
                    EmbeddingId = e.Id,
                    UserId = e.UserId,
                    Username = user?.Username ?? "Unknown",
                    DisplayName = user?.DisplayName ?? "Unknown",
                    Email = user?.Email ?? "",
                    AvatarUrl = user?.AvatarUrl ?? "",
                    OriginalImageId = e.OriginalImageId,
                    ImageUrl = img?.Url,
                    ImageName = img?.FileName,
                    CosineSimilarity = cosineSimilarity,
                    L2Distance = l2Distance
                };
            }).ToList();

            var sortedResults = compareResults
                .OrderByDescending(r => r.CosineSimilarity)
                .ToList();

            var reqThreshold = threshold ?? 0.5f;
            var bestMatch = sortedResults.FirstOrDefault();
            if (bestMatch != null && bestMatch.CosineSimilarity < reqThreshold)
            {
                bestMatch = null;
            }

            await SendSseAsync(new
            {
                status = "success",
                bestMatch = bestMatch,
                allMatches = sortedResults
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Lỗi khi xử lý so khớp camera qua SSE.");
            await SendSseAsync(new { status = "error", message = ex.Message });
        }
    }
}

public class RenameRequest
{
    public string NewName { get; set; } = string.Empty;
}

public class CreateFaceDefinitionRequest
{
    public Guid UserId { get; set; }
    public Guid OriginalImageId { get; set; }
    public bool Force { get; set; } = false;
}


