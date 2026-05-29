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

        var users = await userQuery.Take(20).Select(u => new {
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
            .Select(i => new {
                i.Id,
                i.FileName,
                i.Url,
                i.Size,
                i.CreatedAt,
                CroppedFaces = i.CroppedFaces.Select(c => new {
                    c.Id,
                    c.Url,
                    c.BoundingBox
                }).ToList()
            })
            .ToListAsync();

        // Map them together
        var result = definitions.Select(d => {
            var img = images.FirstOrDefault(i => i.Id == d.OriginalImageId);
            return new {
                d.Id, // Definition mapping Id
                d.OriginalImageId,
                d.CreatedAt,
                Image = img
            };
        }).Where(r => r.Image != null).ToList();

        return Ok(new {
            User = new {
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
            .Select(i => new {
                i.Id,
                CroppedFaces = i.CroppedFaces.Select(c => new {
                    c.Id,
                    c.Url
                }).ToList()
            })
            .ToListAsync();

        var users = await _faceUserDb.Users
            .Where(u => userIds.Contains(u.Id))
            .Select(u => new { u.Id, u.Username, u.DisplayName, u.Email, u.AvatarUrl })
            .ToListAsync();

        var result = users.Select(u => {
            var userDefs = definitions.Where(d => d.UserId == u.Id).ToList();
            var userImageIds = userDefs.Select(d => d.OriginalImageId).ToList();
            var userImages = images.Where(i => userImageIds.Contains(i.Id)).ToList();
            var faceUrls = userImages.SelectMany(i => i.CroppedFaces.Select(c => c.Url)).Distinct().ToList();

            return new {
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
            .Select(d => {
                var folderName = Path.GetFileName(d);
                var bestModelPath = Path.Combine(d, "arcface_model_best.onnx");
                var hasBestModel = System.IO.File.Exists(bestModelPath);
                return new {
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
            using var session = new InferenceSession(bestModelPath);

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

    private string AlignImageOnServer(string inputPath)
    {
        var arcfaceDir = GetArcFaceDir();
        var helperPyPath = Path.Combine(arcfaceDir, "align_face_helper.py");
        var outputPath = Path.Combine(Path.GetDirectoryName(inputPath)!, $"{Guid.NewGuid()}_aligned.png");
        
        var pythonExe = Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, "../../../../../../venv/bin/python3")); // Workspace root venv
        if (!System.IO.File.Exists(pythonExe))
        {
            pythonExe = Path.GetFullPath(Path.Combine(arcfaceDir, "venv", "bin", "python3")); // Local venv
        }
        if (!System.IO.File.Exists(pythonExe))
        {
            pythonExe = "python3"; // Fallback to global python3
        }

        var arguments = $"\"{helperPyPath}\" \"{inputPath}\" \"{outputPath}\"";
        
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

        try
        {
            using var process = Process.Start(psi);
            if (process != null)
            {
                process.WaitForExit(5000); // 5 seconds max timeout
                var output = process.StandardOutput.ReadToEnd().Trim();
                if (output.Contains("SUCCESS") && System.IO.File.Exists(outputPath))
                {
                    return outputPath;
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Lỗi thực thi script align_face_helper.py trên server.");
        }

        return inputPath; // Fallback to original if alignment fails
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
                using var inferenceSession = new InferenceSession(bestModelPath);
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

    [HttpPost("compare-global")]
    [AllowAnonymous]
    public async Task<IActionResult> CompareGlobal(IFormFile image, [FromQuery] float? threshold)
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

            // Thử căn chỉnh khuôn mặt phía server bằng align_face_helper.py (MediaPipe/OpenCV fallback)
            // Điều này cho phép frontend gửi ảnh cắt có padding lớn thay vì phải căn chỉnh chính xác 112x112 trên FE
            var arcFaceDir = GetArcFaceDir();
            var alignHelperPath = Path.Combine(arcFaceDir, "align_face_helper.py");
            var alignedImagePath = rawTempPath; // fallback nếu alignment thất bại

            if (System.IO.File.Exists(alignHelperPath))
            {
                try
                {
                    using var proc = new System.Diagnostics.Process();
                    proc.StartInfo.FileName = "python3";
                    proc.StartInfo.Arguments = $"\"{alignHelperPath}\" \"{rawTempPath}\" \"{alignedTempPath}\"";
                    proc.StartInfo.UseShellExecute = false;
                    proc.StartInfo.RedirectStandardOutput = true;
                    proc.StartInfo.RedirectStandardError = true;
                    proc.StartInfo.CreateNoWindow = true;
                    proc.Start();
                    var output = await proc.StandardOutput.ReadToEndAsync();
                    await proc.WaitForExitAsync();
                    if (proc.ExitCode == 0 && output.Trim().Contains("SUCCESS") && System.IO.File.Exists(alignedTempPath))
                    {
                        alignedImagePath = alignedTempPath;
                        _logger.LogInformation("[CompareGlobal] Server-side face alignment thành công.");
                    }
                    else
                    {
                        _logger.LogWarning("[CompareGlobal] align_face_helper.py không thành công (ExitCode={ExitCode}), dùng resize fallback.", proc.ExitCode);
                    }
                }
                catch (Exception alignEx)
                {
                    _logger.LogWarning(alignEx, "[CompareGlobal] Không thể gọi align_face_helper.py, dùng resize fallback.");
                }
            }

            try
            {
                using var inferenceSession = new InferenceSession(bestModelPath);
                testEmbedding = ExtractEmbeddingFromFile(inferenceSession, alignedImagePath);
            }
            finally
            {
                if (System.IO.File.Exists(rawTempPath)) System.IO.File.Delete(rawTempPath);
                if (System.IO.File.Exists(alignedTempPath)) System.IO.File.Delete(alignedTempPath);
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


