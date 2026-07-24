using Core.Infra.Base.Interfaces;
using Core.Infra.NhanDienKhuonMat.Contexts;
using Core.Infra.NhanDienKhuonMat.Models;
using Core.Infra.NhanDienKhuonMat.Controllers;
using Core.Infra.Firebase.Services;
using Core.Infra.Firebase.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Diagnostics;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.Infra.NhanDienKhuonMat.Handlers;

public class FaceDetectionCommandHandler :
    ICommandHandler<SaveFaceDetectionSessionCommand>,
    ICommandHandler<RenameFaceDetectionSessionCommand>,
    ICommandHandler<DeleteFaceDetectionSessionCommand>,
    ICommandHandler<DeleteOriginalImageCommand>,
    ICommandHandler<DeleteCroppedFaceCommand>,
    ICommandHandler<CreateFaceDefinitionCommand>,
    ICommandHandler<DeleteFaceDefinitionCommand>,
    ICommandHandler<TrainArcFaceModelCommand>,
    ICommandHandler<ExtractFaceEmbeddingsCommand>,
    ICommandHandler<DeleteEmbeddingCommand>,
    ICommandHandler<DeleteUserEmbeddingsCommand>,
    ICommandHandler<ReloadCacheCommand>
{
    private readonly NhanDienKhuonMatDbContext _db;
    private readonly FaceUserDbContext _faceUserDb;
    private readonly FaceDefinitionDbContext _faceDefinitionDb;
    private readonly FirebaseService _firebaseService;
    private readonly IDispatcher _dispatcher;
    private readonly ILogger<FaceDetectionCommandHandler> _logger;

    public FaceDetectionCommandHandler(
        NhanDienKhuonMatDbContext db,
        FaceUserDbContext faceUserDb,
        FaceDefinitionDbContext faceDefinitionDb,
        FirebaseService firebaseService,
        IDispatcher dispatcher,
        ILogger<FaceDetectionCommandHandler> logger)
    {
        _db = db;
        _faceUserDb = faceUserDb;
        _faceDefinitionDb = faceDefinitionDb;
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

        // Check if upload_sessions exists, if not, create it in a thread-safe manner
        var session = await _db.upload_sessions.FindAsync(command.SessionId);
        if (session == null)
        {
            try
            {
                session = new upload_sessions_entity
                {
                    id = command.SessionId,
                    name = string.IsNullOrEmpty(command.SessionName) ? "Phiên tải lên" : command.SessionName,
                    user_id = userId,
                    created_at = timestamp,
                    created_by = command.UserId ?? "System"
                };
                _db.upload_sessions.Add(session);
                await _db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                if (session != null)
                {
                    _db.Entry(session).State = Microsoft.EntityFrameworkCore.EntityState.Detached;
                }
                _logger.LogWarning("Session duplicate or concurrent creation: {Message}", ex.Message);
                session = await _db.upload_sessions.FindAsync(command.SessionId);
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

        var originalImage = new original_images_entity
        {
            id = originalImageId,
            upload_session_id = command.SessionId,
            file_name = command.OriginalFileName,
            url = originalUrl,
            size = command.OriginalContent.Length,
            user_id = userId,
            created_at = timestamp,
            created_by = command.UserId ?? "System"
        };

        _db.original_images.Add(originalImage);

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

            var croppedFace = new cropped_faces_entity
            {
                id = faceId,
                original_image_id = originalImageId,
                url = faceUrl,
                bounding_box = croppedFaceDto.BoundingBox,
                created_at = timestamp,
                created_by = command.UserId ?? "System"
            };

            _db.cropped_faces.Add(croppedFace);
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

    public async Task HandleAsync(RenameFaceDetectionSessionCommand command)
    {
        var userId = Guid.Parse(command.UserId ?? Guid.Empty.ToString());
        var session = await _db.upload_sessions
            .FirstOrDefaultAsync(s => s.id == command.SessionId && s.user_id == userId);

        if (session == null)
            throw new KeyNotFoundException("Không tìm thấy phiên upload.");

        if (string.IsNullOrEmpty(command.NewName))
            throw new ArgumentException("Tên phiên không được để trống.");

        session.name = command.NewName.Trim();
        await _db.SaveChangesAsync();
    }

    public async Task HandleAsync(DeleteFaceDetectionSessionCommand command)
    {
        var userId = Guid.Parse(command.UserId ?? Guid.Empty.ToString());
        var session = await _db.upload_sessions
            .FirstOrDefaultAsync(s => s.id == command.SessionId && s.user_id == userId);

        if (session == null)
            throw new KeyNotFoundException("Không tìm thấy phiên upload.");

        // 1. Find all associated original images and their cropped faces to delete from GCS
        var images = await _db.original_images
            .Include(i => i.cropped_faces)
            .Where(i => i.upload_session_id == command.SessionId && i.user_id == userId)
            .ToListAsync();

        foreach (var image in images)
        {
            // Delete original image from GCS
            var originalObjectName = FaceDetectionController.GetGcsObjectName(image.url);
            if (originalObjectName != null)
            {
                try
                {
                    await _firebaseService.DeleteFileAsync(originalObjectName);
                }
                catch (Exception ex)
                {
                    _logger.LogWarning("Failed to delete original image {ImageId} from GCS: {Message}", image.id, ex.Message);
                }
            }

            // Delete each cropped face from GCS
            foreach (var face in image.cropped_faces)
            {
                var faceObjectName = FaceDetectionController.GetGcsObjectName(face.url);
                if (faceObjectName != null)
                {
                    try
                    {
                        await _firebaseService.DeleteFileAsync(faceObjectName);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogWarning("Failed to delete cropped face {FaceId} from GCS: {Message}", face.id, ex.Message);
                    }
                }
            }
        }

        // 2. Remove session from DB (this cascade deletes database rows for OriginalImages and CroppedFaces)
        _db.upload_sessions.Remove(session);
        await _db.SaveChangesAsync();
    }

    public async Task HandleAsync(DeleteOriginalImageCommand command)
    {
        var userId = Guid.Parse(command.UserId ?? Guid.Empty.ToString());
        var image = await _db.original_images
            .Include(i => i.cropped_faces)
            .FirstOrDefaultAsync(i => i.id == command.ImageId && i.user_id == userId);

        if (image == null)
            throw new KeyNotFoundException("Không tìm thấy ảnh gốc.");

        // 1. Delete original image from GCS
        var originalObjectName = FaceDetectionController.GetGcsObjectName(image.url);
        if (originalObjectName != null)
        {
            try
            {
                await _firebaseService.DeleteFileAsync(originalObjectName);
            }
            catch (Exception ex)
            {
                _logger.LogWarning("Failed to delete original image {ImageId} from GCS: {Message}", image.id, ex.Message);
            }
        }

        // 2. Delete all associated cropped faces from GCS
        foreach (var face in image.cropped_faces)
        {
            var faceObjectName = FaceDetectionController.GetGcsObjectName(face.url);
            if (faceObjectName != null)
            {
                try
                {
                    await _firebaseService.DeleteFileAsync(faceObjectName);
                }
                catch (Exception ex)
                {
                    _logger.LogWarning("Failed to delete cropped face {FaceId} from GCS: {Message}", face.id, ex.Message);
                }
            }
        }

        // 3. Remove image from DB (this cascade deletes CroppedFaces records in database)
        _db.original_images.Remove(image);
        await _db.SaveChangesAsync();
    }

    public async Task HandleAsync(DeleteCroppedFaceCommand command)
    {
        var userId = Guid.Parse(command.UserId ?? Guid.Empty.ToString());
        var face = await _db.cropped_faces
            .Include(f => f.original_image)
            .FirstOrDefaultAsync(f => f.id == command.FaceId && f.original_image!.user_id == userId);

        if (face == null)
            throw new KeyNotFoundException("Không tìm thấy ảnh khuôn mặt crop.");

        // 1. Delete cropped face from GCS
        var faceObjectName = FaceDetectionController.GetGcsObjectName(face.url);
        if (faceObjectName != null)
        {
            try
            {
                await _firebaseService.DeleteFileAsync(faceObjectName);
            }
            catch (Exception ex)
            {
                _logger.LogWarning("Failed to delete cropped face {FaceId} from GCS: {Message}", face.id, ex.Message);
            }
        }

        // 2. Remove cropped face from DB
        _db.cropped_faces.Remove(face);
        await _db.SaveChangesAsync();
    }

    public async Task HandleAsync(CreateFaceDefinitionCommand command)
    {
        if (command.TargetUserId == Guid.Empty || command.OriginalImageId == Guid.Empty)
            throw new ArgumentException("Thông tin không hợp lệ.");

        // Check if this image exists in NhanDienKhuonMat
        var imageExists = await _db.original_images.AnyAsync(i => i.id == command.OriginalImageId);
        if (!imageExists)
            throw new KeyNotFoundException("Không tìm thấy ảnh gốc trong hệ thống.");

        // Check if this user exists in OIDC
        var userExists = await _faceUserDb.users.AnyAsync(u => u.id == command.TargetUserId);
        if (!userExists)
            throw new KeyNotFoundException("Không tìm thấy người dùng.");

        // Check if this image has already been defined for a DIFFERENT user
        var existingDef = await _faceDefinitionDb.user_face_definitions
            .FirstOrDefaultAsync(d => d.original_image_id == command.OriginalImageId);

        if (existingDef != null && existingDef.user_id != command.TargetUserId)
        {
            if (!command.Force)
            {
                // Get existing user display name
                var existingUser = await _faceUserDb.users.FirstOrDefaultAsync(u => u.id == existingDef.user_id);
                var existingName = existingUser?.display_name ?? existingUser?.username ?? "người dùng khác";

                command.ExistingUserId = existingDef.user_id;
                command.ExistingUserName = existingName;

                throw new DuplicateDefinitionException(
                    $"Ảnh này đã được định nghĩa cho user '{existingName}'. Bạn có chắc chắn muốn tiếp tục gán cho user hiện tại?",
                    existingDef.user_id,
                    existingName
                );
            }
            else
            {
                // If force = true, delete the old definition first
                _faceDefinitionDb.user_face_definitions.Remove(existingDef);
                await _faceDefinitionDb.SaveChangesAsync();
            }
        }

        // Check if already defined for the SAME user
        var isSameDef = await _faceDefinitionDb.user_face_definitions
            .AnyAsync(d => d.original_image_id == command.OriginalImageId && d.user_id == command.TargetUserId);

        if (!isSameDef)
        {
            var newDef = new user_face_definitions_entity
            {
                id = Guid.NewGuid(),
                user_id = command.TargetUserId,
                original_image_id = command.OriginalImageId,
                created_at = DateTime.UtcNow
            };
            _faceDefinitionDb.user_face_definitions.Add(newDef);
            await _faceDefinitionDb.SaveChangesAsync();
        }
    }

    public async Task HandleAsync(DeleteFaceDefinitionCommand command)
    {
        var def = await _faceDefinitionDb.user_face_definitions.FindAsync(command.DefinitionId);
        if (def == null)
            throw new KeyNotFoundException("Không tìm thấy định nghĩa khuôn mặt.");

        _faceDefinitionDb.user_face_definitions.Remove(def);
        await _faceDefinitionDb.SaveChangesAsync();
    }

    // Hàm bổ trợ để copy toàn bộ thư mục (Deep Copy)
    static void CopyDirectory(string sourceDir, string destDir)
    {
        // Tạo thư mục đích nếu chưa có
        Directory.CreateDirectory(destDir);

        // Copy tất cả các files
        foreach (string file in Directory.GetFiles(sourceDir))
        {
            string destFile = Path.Combine(destDir, Path.GetFileName(file));
            File.Copy(file, destFile, true); // true: cho phép ghi đè nếu file đã tồn tại
        }

        // Đệ quy để copy các thư mục con bên trong (nếu có)
        foreach (string subDir in Directory.GetDirectories(sourceDir))
        {
            string destSubDir = Path.Combine(destDir, Path.GetFileName(subDir));
            CopyDirectory(subDir, destSubDir);
        }
    }

    public async Task HandleAsync(TrainArcFaceModelCommand command)
    {
        async Task SendSseAsync(string log)
        {
            if (command.LogCallback != null)
            {
                await command.LogCallback(log);
            }
        }

        if (string.IsNullOrEmpty(command.UserIds))
        {
            await SendSseAsync("[ERROR] Không có userId nào được chọn.");
            return;
        }

        var userIdList = command.UserIds.Split(',', StringSplitOptions.RemoveEmptyEntries)
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
        var rootFaceIds = FaceDetectionController.GetRootFaceIdsPath();
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
            if (command.CancellationToken.IsCancellationRequested) break;

            var user = await _faceUserDb.users.FirstOrDefaultAsync(u => u.id == userId, command.CancellationToken);
            if (user == null)
            {
                await SendSseAsync($"[WARN] Không tìm thấy user: {userId}");
                continue;
            }

            var userFolderName = $"{userId}_{user.username}";
            var userRawPath = Path.Combine(rawDirPath, userFolderName);
            Directory.CreateDirectory(userRawPath);

            // Lấy tất cả ảnh gốc của user thông qua bảng user_face_definitions
            var definitions = await _faceDefinitionDb.user_face_definitions
                .Where(d => d.user_id == userId)
                .ToListAsync(command.CancellationToken);

            var imageIds = definitions.Select(d => d.original_image_id).ToList();
            var images = await _db.original_images
                .Where(i => imageIds.Contains(i.id))
                .ToListAsync(command.CancellationToken);

            await SendSseAsync($"[INFO] User '{user.display_name}': Đang tải {images.Count} ảnh gốc...");

            int downloadedCount = 0;
            foreach (var image in images)
            {
                if (command.CancellationToken.IsCancellationRequested) break;
                try
                {
                    var extension = Path.GetExtension(image.file_name).ToLowerInvariant();
                    if (string.IsNullOrEmpty(extension)) extension = ".jpg";
                    var localImagePath = Path.Combine(userRawPath, $"{image.id}{extension}");

                    if (!System.IO.File.Exists(localImagePath))
                    {
                        var imageBytes = await httpClient.GetByteArrayAsync(image.url, command.CancellationToken);
                        await System.IO.File.WriteAllBytesAsync(localImagePath, imageBytes, command.CancellationToken);
                    }

                    downloadedCount++;
                }
                catch (Exception ex)
                {
                    await SendSseAsync($"[WARN] Lỗi tải ảnh {image.file_name}: {ex.Message}");
                }
            }

            await SendSseAsync($"[INFO] User '{user.display_name}': Đã tải xong {downloadedCount}/{images.Count} ảnh.");
        }

        if (command.CancellationToken.IsCancellationRequested)
        {
            await SendSseAsync("[INFO] Đào tạo đã bị hủy bởi người dùng.");
            return;
        }

        // 2.1 Lấy thêm tạo subfolder dataraw để  tăng số lượng data 
        var moreFaceFolder = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "ArcFaceFinetune", "dataraw");
        _logger.LogInformation($"2.1 :{moreFaceFolder}");
        if (Directory.Exists(moreFaceFolder))
        {
            await SendSseAsync($"[INFO] Lấy thêm tạo subfolder dataraw để  tăng số lượng từ thư mục: {moreFaceFolder}");
            var moreSubFolders = Directory.GetDirectories(moreFaceFolder);

            foreach (var subSourcePath in moreSubFolders)
            {
                // Lấy tên tên thư mục con (ví dụ: "folder_1" thay vì toàn bộ đường dẫn)
                string folderName = Path.GetFileName(subSourcePath);

                // Kiểm tra nếu tên thư mục có chứa chữ "dump" (không phân biệt chữ hoa/thường)
                if (folderName.Contains("dump", StringComparison.OrdinalIgnoreCase))
                {
                    continue; // Bỏ qua thư mục này
                }

                // Tạo đường dẫn đích cho thư mục con này trong rawDirPath
                string subDestPath = Path.Combine(rawDirPath, folderName);

                // Tiến hành copy toàn bộ thư mục con (bao gồm cả file và thư mục con bên trong nó)
                CopyDirectory(subSourcePath, subDestPath);

                await SendSseAsync($"[INFO] Đã thêm dữ liệu: {subDestPath}");
            }
        }

        // 3. Xác định đường dẫn file main.py
        var arcfaceDir = FaceDetectionController.GetArcFaceDir();
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
                        $"--epochs {command.Epochs} " +
                        $"--batch_size {command.BatchSize} " +
                        $"--learning_rate {command.LearningRate.ToString(System.Globalization.CultureInfo.InvariantCulture)} " +
                        $"--align_mode {command.AlignMode} " +
                        $"--raw_dir \"{rawDirPath}\" " +
                        $"--data_dir \"{dataDirPath}\" " +
                        $"--model_output_path \"{modelFinalPath}\" " +
                        $"--mobile_model_output_path \"{modelFinalMobilePath}\" " +
                        $"--best_model_output_path \"{modelBestPath}\" " +
                        $"--best_mobile_model_output_path \"{modelBestMobilePath}\" " +
                        $"--device {command.Device} " +
                        $"--margin {command.Margin.ToString(System.Globalization.CultureInfo.InvariantCulture)}";

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
                if (command.CancellationToken.IsCancellationRequested) break;
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
                if (command.CancellationToken.IsCancellationRequested) break;
                try
                {
                    await SendSseAsync($"[STDERR] {line}");
                }
                catch { break; }
            }
        });

        await Task.WhenAll(stdoutTask, stderrTask);
        await process.WaitForExitAsync(command.CancellationToken);

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

    public async Task HandleAsync(ExtractFaceEmbeddingsCommand command)
    {
        var rootFaceIds = FaceDetectionController.GetRootFaceIdsPath();
        var dateDirPath = Path.Combine(rootFaceIds, command.FolderName);
        var bestModelPath = Path.Combine(dateDirPath, "arcface_model_best.onnx");
        var dataDirPath = Path.Combine(dateDirPath, "data");

        if (!System.IO.File.Exists(bestModelPath))
            throw new FileNotFoundException($"Không tìm thấy mô hình tốt nhất tại: {bestModelPath}");

        if (!Directory.Exists(dataDirPath))
            throw new DirectoryNotFoundException($"Không tìm thấy thư mục data tại: {dataDirPath}");

        var processedCount = 0;
        var errorCount = 0;

        var session = FaceDetectionController.GetOrCreateSession(bestModelPath);

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

            // Lấy original_image_id tương ứng từ database
            var definitions = await _faceDefinitionDb.user_face_definitions
                .Where(d => d.user_id == userId)
                .ToListAsync();

            var imageIds = definitions.Select(d => d.original_image_id).ToList();
            var originalImages = await _db.original_images
                .Where(i => imageIds.Contains(i.id))
                .ToListAsync();

            // Với mỗi file ảnh đã align, trích xuất embedding và lưu vào DB
            for (int imgIdx = 0; imgIdx < imageFiles.Count && imgIdx < originalImages.Count; imgIdx++)
            {
                var imgFile = imageFiles[imgIdx];
                var originalImage = originalImages[imgIdx];

                try
                {
                    var embedding = FaceDetectionController.ExtractEmbeddingFromFile(session, imgFile);

                    // Lưu hoặc cập nhật embedding vào DB (upsert theo original_image_id + user_id)
                    var existing = await _faceDefinitionDb.user_face_embeddings
                        .FirstOrDefaultAsync(e => e.original_image_id == originalImage.id && e.user_id == userId);

                    if (existing != null)
                    {
                        existing.embedding = new Pgvector.Vector(embedding);
                        existing.best_model_path = bestModelPath;
                        existing.input_image_path = imgFile;
                        existing.created_at = DateTime.UtcNow;
                    }
                    else
                    {
                        _faceDefinitionDb.user_face_embeddings.Add(new user_face_embeddings_entity
                        {
                            id = Guid.NewGuid(),
                            user_id = userId,
                            original_image_id = originalImage.id,
                            embedding = new Pgvector.Vector(embedding),
                            best_model_path = bestModelPath,
                            input_image_path = imgFile,
                            created_at = DateTime.UtcNow
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

        command.ProcessedCount = processedCount;
        command.ErrorCount = errorCount;
    }

    public async Task HandleAsync(DeleteEmbeddingCommand command)
    {
        var embedding = await _faceDefinitionDb.user_face_embeddings.FindAsync(command.EmbeddingId);
        if (embedding == null)
            throw new KeyNotFoundException("Không tìm thấy vector embedding.");

        _faceDefinitionDb.user_face_embeddings.Remove(embedding);
        await _faceDefinitionDb.SaveChangesAsync();
    }

    public async Task HandleAsync(DeleteUserEmbeddingsCommand command)
    {
        var embeddings = await _faceDefinitionDb.user_face_embeddings
            .Where(e => e.user_id == command.TargetUserId)
            .ToListAsync();

        if (embeddings.Any())
        {
            _faceDefinitionDb.user_face_embeddings.RemoveRange(embeddings);
            await _faceDefinitionDb.SaveChangesAsync();
        }
    }

    public async Task HandleAsync(ReloadCacheCommand command)
    {
        // 1. Clear ONNX sessions
        var paths = FaceDetectionController._sessions.Keys.ToList();
        foreach (var path in paths)
        {
            FaceDetectionController.RemoveModel(path);
        }
        lock (FaceDetectionController._modelPathLock)
        {
            FaceDetectionController._cachedBestModelPath = null;
        }

        // 2. Clear cached embeddings
        lock (FaceDetectionController._cacheLock)
        {
            FaceDetectionController._cachedEmbeddings = null;
        }

        // 3. Pre-load embeddings back to memory to warm up cache
        var embeddings = await _faceDefinitionDb.user_face_embeddings.ToListAsync();
        lock (FaceDetectionController._cacheLock)
        {
            if (FaceDetectionController._cachedEmbeddings == null)
            {
                FaceDetectionController._cachedEmbeddings = embeddings;
            }
        }
    }
}
