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
        // Get all defined user IDs with count
        var userDefinitionGroups = await _faceDefinitionDb.UserFaceDefinitions
            .GroupBy(d => d.UserId)
            .Select(g => new { UserId = g.Key, Count = g.Count() })
            .ToListAsync();

        if (!userDefinitionGroups.Any())
            return Ok(new List<object>());

        var userIds = userDefinitionGroups.Select(g => g.UserId).ToList();

        var users = await _faceUserDb.Users
            .Where(u => userIds.Contains(u.Id))
            .Select(u => new { u.Id, u.Username, u.DisplayName, u.Email, u.AvatarUrl })
            .ToListAsync();

        var result = users.Select(u => {
            var group = userDefinitionGroups.FirstOrDefault(g => g.UserId == u.Id);
            return new {
                u.Id,
                u.Username,
                u.DisplayName,
                u.Email,
                u.AvatarUrl,
                DefinitionCount = group?.Count ?? 0
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
            var baseDomain = AppContext.BaseDirectory;
            var dateStr = DateTime.Now.ToString("yyyy-MM-dd");
            var rootFaceIds = Path.Combine(baseDomain, "facesid");
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
            var arcfaceDir = Path.GetFullPath(Path.Combine(baseDomain, "../../../../TreeOfThought/docs/nhan-dien-khuon-mat/ArcFaceFinetune"));
            var mainPyPath = Path.Combine(arcfaceDir, "main.py");
            var pythonExe = Path.Combine(arcfaceDir, "venv", "bin", "python3");

            if (!System.IO.File.Exists(mainPyPath))
            {
                await SendSseAsync($"[ERROR] Không tìm thấy main.py tại: {mainPyPath}");
                return;
            }

            if (!System.IO.File.Exists(pythonExe))
            {
                pythonExe = "python3"; // Fallback về python3 global
                await SendSseAsync($"[WARN] Không tìm thấy venv, sử dụng python3 toàn cục.");
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
        var baseDomain = AppContext.BaseDirectory;
        var rootFaceIds = Path.Combine(baseDomain, "facesid");

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
        var baseDomain = AppContext.BaseDirectory;
        var dateDirPath = Path.Combine(baseDomain, "facesid", folderName);
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
                            existing.Embedding = embedding;
                            existing.CreatedAt = DateTime.UtcNow;
                        }
                        else
                        {
                            _faceDefinitionDb.UserFaceEmbeddings.Add(new UserFaceEmbedding
                            {
                                Id = Guid.NewGuid(),
                                UserId = userId,
                                OriginalImageId = originalImage.Id,
                                Embedding = embedding,
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


