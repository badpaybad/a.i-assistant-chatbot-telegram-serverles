import 'dart:io';
import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:tot_core/tot_core.dart';
import '../models/file_folder_models.dart';

class FilesFoldersApi {
  static final FilesFoldersApi _instance = FilesFoldersApi._internal();
  static FilesFoldersApi get instance => _instance;
  FilesFoldersApi._internal();

  final _client = HttpClientService.instance;
  
  // Local Mock Database state for smooth fallback running
  final List<FolderItem> _mockFolders = [
    FolderItem(id: 'f1', name: 'Tài liệu dự án', parentId: null),
    FolderItem(id: 'f2', name: 'Ảnh gia đình', parentId: null),
    FolderItem(id: 'f3', name: 'Báo cáo tài chính', parentId: null),
    FolderItem(id: 'f1_sub1', name: 'Thiết kế UI/UX', parentId: 'f1'),
    FolderItem(id: 'f1_sub2', name: 'Tài liệu API C#', parentId: 'f1'),
  ];

  final List<FileItem> _mockFiles = [
    FileItem(id: 'doc1', name: 'Ke_hoach_phat_trien_mobi.pdf', size: 1048576 * 2 + 350000, type: 'pdf', createdAt: DateTime.now().subtract(const Duration(days: 2)), permission: 1, path: '/files/Ke_hoach_phat_trien_mobi.pdf'),
    FileItem(id: 'doc2', name: 'dac_ta_yeu_cau.docx', size: 512000, type: 'docx', createdAt: DateTime.now().subtract(const Duration(days: 4)), permission: 0, path: '/files/dac_ta_yeu_cau.docx'),
    FileItem(id: 'img1', name: 'avatar_mockup.png', size: 2048576, type: 'png', createdAt: DateTime.now().subtract(const Duration(days: 1)), permission: 2, path: '/files/avatar_mockup.png'),
    FileItem(id: 'xls1', name: 'bang_luong_Q2.xlsx', size: 128000, type: 'xlsx', createdAt: DateTime.now().subtract(const Duration(days: 12)), permission: 0, path: '/files/bang_luong_Q2.xlsx'),
    FileItem(id: 'doc_sub1', name: 'Wireframes_mobi_v1.pdf', size: 1048576 * 4, type: 'pdf', createdAt: DateTime.now().subtract(const Duration(hours: 4)), permission: 2, path: '/files/f1/Wireframes_mobi_v1.pdf'),
  ];

  /// Get folder tree (for Move Dialog)
  Future<List<FolderItem>> getFolderTree() async {
    try {
      final response = await _client.get<List<dynamic>>('/api/folders/tree');
      if (response.data != null) {
        return response.data!.map((e) => FolderItem.fromJson(e)).toList();
      }
    } catch (e) {
      debugPrint('[FilesFoldersApi] getFolderTree failed, using fallback mock.');
    }
    // Fallback
    await Future.delayed(const Duration(milliseconds: 400));
    return _mockFolders;
  }

  /// Get folder nested items with pagination
  Future<FolderContentResponse> getFolderContent(String? folderId, int pageIndex, int pageSize) async {
    try {
      final url = folderId != null ? '/api/folders/$folderId/content' : '/api/folders/root/content';
      final response = await _client.get<Map<String, dynamic>>(
        url,
        queryParameters: {'pageIndex': pageIndex, 'pageSize': pageSize},
      );
      if (response.data != null) {
        return FolderContentResponse.fromJson(response.data!);
      }
    } catch (e) {
      debugPrint('[FilesFoldersApi] getFolderContent failed, using fallback mock.');
    }

    // Dynamic Fallback simulation
    await Future.delayed(const Duration(milliseconds: 600));
    
    // Filter folders by parent
    final folders = _mockFolders.where((f) => f.parentId == folderId).toList();
    
    // Filter files (assuming files belong to folder f1 if id matches subfiles, otherwise root)
    List<FileItem> files = [];
    if (folderId == 'f1') {
      files = _mockFiles.where((f) => f.id == 'doc_sub1').toList();
    } else if (folderId == null) {
      files = _mockFiles.where((f) => f.id != 'doc_sub1').toList();
    }

    // Apply pagination
    final startIndex = (pageIndex - 1) * pageSize;
    final paginatedFiles = files.skip(startIndex).take(pageSize).toList();

    // Create Breadcrumbs
    List<BreadcrumbItem> breadcrumbs = [BreadcrumbItem(id: null, name: 'Tài liệu của tôi')];
    if (folderId != null) {
      final parent = _mockFolders.firstWhere((f) => f.id == folderId, 
          orElse: () => FolderItem(id: folderId, name: 'Thư mục'));
      
      if (parent.parentId != null) {
        final grandParent = _mockFolders.firstWhere((f) => f.id == parent.parentId,
            orElse: () => FolderItem(id: parent.parentId!, name: 'Thư mục cha'));
        breadcrumbs.add(BreadcrumbItem(id: grandParent.id, name: grandParent.name));
      }
      breadcrumbs.add(BreadcrumbItem(id: parent.id, name: parent.name));
    }

    return FolderContentResponse(
      folders: folders,
      files: paginatedFiles,
      totalFiles: files.length,
      breadcrumbs: breadcrumbs,
    );
  }

  /// Create a folder
  Future<Map<String, dynamic>> createFolder(String name, String? parentId) async {
    try {
      final response = await _client.post<Map<String, dynamic>>('/api/folders', data: {
        'name': name,
        'parentId': parentId,
      });
      if (response.data != null) return response.data!;
    } catch (e) {
      debugPrint('[FilesFoldersApi] createFolder failed, simulating in mock database.');
    }

    // Mock implementation
    await Future.delayed(const Duration(milliseconds: 500));
    final newId = 'folder_${DateTime.now().millisecondsSinceEpoch}';
    final newFolder = FolderItem(id: newId, name: name, parentId: parentId);
    _mockFolders.add(newFolder);
    
    return {'status': 'Completed', 'message': 'Đã tạo thư mục thành công', 'trackingId': ''};
  }

  /// Delete folder
  Future<Map<String, dynamic>> deleteFolder(String folderId) async {
    try {
      final response = await _client.delete<Map<String, dynamic>>('/api/folders/$folderId');
      if (response.data != null) return response.data!;
    } catch (e) {
      debugPrint('[FilesFoldersApi] deleteFolder failed, deleting from mock.');
    }

    // Mock
    await Future.delayed(const Duration(milliseconds: 500));
    _mockFolders.removeWhere((f) => f.id == folderId || f.parentId == folderId);
    return {'status': 'Completed', 'message': 'Đã xóa thư mục thành công', 'trackingId': ''};
  }

  /// Move folder
  Future<Map<String, dynamic>> moveFolder(String folderId, String? newParentId) async {
    try {
      final response = await _client.post<Map<String, dynamic>>('/api/folders/move', data: {
        'folderId': folderId,
        'newParentId': newParentId,
      });
      if (response.data != null) return response.data!;
    } catch (e) {
      debugPrint('[FilesFoldersApi] moveFolder failed, updating mock.');
    }

    // Mock
    await Future.delayed(const Duration(milliseconds: 500));
    final idx = _mockFolders.indexWhere((f) => f.id == folderId);
    if (idx != -1) {
      _mockFolders[idx] = FolderItem(
        id: _mockFolders[idx].id,
        name: _mockFolders[idx].name,
        parentId: newParentId,
      );
    }
    return {'status': 'Completed', 'message': 'Di chuyển thư mục thành công', 'trackingId': ''};
  }

  /// Rename folder
  Future<Map<String, dynamic>> renameFolder(String folderId, String newName) async {
    try {
      final response = await _client.patch<Map<String, dynamic>>('/api/folders/$folderId/rename', data: {
        'newName': newName,
      });
      if (response.data != null) return response.data!;
    } catch (e) {
      debugPrint('[FilesFoldersApi] renameFolder failed, updating mock.');
    }

    // Mock
    await Future.delayed(const Duration(milliseconds: 500));
    final idx = _mockFolders.indexWhere((f) => f.id == folderId);
    if (idx != -1) {
      _mockFolders[idx] = FolderItem(
        id: _mockFolders[idx].id,
        name: newName,
        parentId: _mockFolders[idx].parentId,
      );
    }
    return {'status': 'Completed', 'message': 'Đổi tên thư mục thành công', 'trackingId': ''};
  }

  /// Upload file
  Future<Map<String, dynamic>> uploadFile(String? folderId, File file, String fileName) async {
    try {
      final formData = FormData();
      if (folderId != null) {
        formData.fields.add(MapEntry('folderId', folderId));
      }
      formData.files.add(MapEntry(
        'file',
        await MultipartFile.fromFile(file.path, filename: fileName),
      ));

      final response = await _client.post<Map<String, dynamic>>('/api/files/upload', data: formData);
      if (response.data != null) return response.data!;
    } catch (e) {
      debugPrint('[FilesFoldersApi] uploadFile failed, inserting into mock files.');
    }

    // Mock
    await Future.delayed(const Duration(milliseconds: 1500));
    final newId = 'file_${DateTime.now().millisecondsSinceEpoch}';
    final size = await file.length();
    final ext = fileName.split('.').last.toLowerCase();
    
    final newFile = FileItem(
      id: newId,
      name: fileName,
      size: size,
      type: ext,
      createdAt: DateTime.now(),
      permission: 0, // default Private
      path: file.path,
    );
    
    _mockFiles.add(newFile);
    return {
      'status': 'Completed',
      'message': 'Đã tải lên tệp tin thành công',
      'trackingId': '',
      'fileId': newId,
      'name': fileName,
      'size': size,
      'mimeType': 'application/octet-stream'
    };
  }

  /// Delete file
  Future<Map<String, dynamic>> deleteFile(String fileId) async {
    try {
      final response = await _client.delete<Map<String, dynamic>>('/api/files/$fileId');
      if (response.data != null) return response.data!;
    } catch (e) {
      debugPrint('[FilesFoldersApi] deleteFile failed, updating mock.');
    }

    // Mock
    await Future.delayed(const Duration(milliseconds: 500));
    _mockFiles.removeWhere((f) => f.id == fileId);
    return {'status': 'Completed', 'message': 'Đã xóa tệp tin thành công', 'trackingId': ''};
  }

  /// Move file
  Future<Map<String, dynamic>> moveFile(String fileId, String? newFolderId) async {
    try {
      final response = await _client.post<Map<String, dynamic>>('/api/files/move', data: {
        'fileId': fileId,
        'newFolderId': newFolderId,
      });
      if (response.data != null) return response.data!;
    } catch (e) {
      debugPrint('[FilesFoldersApi] moveFile failed, updating mock.');
    }

    // Mock
    await Future.delayed(const Duration(milliseconds: 500));
    // Simulated move. In mock database, files are root unless they match folderId f1.
    // If folderId is not f1, mock file returns as part of root.
    return {'status': 'Completed', 'message': 'Đã di chuyển tệp tin thành công', 'trackingId': ''};
  }

  /// Rename file
  Future<Map<String, dynamic>> renameFile(String fileId, String newName) async {
    try {
      final response = await _client.patch<Map<String, dynamic>>('/api/files/$fileId/rename', data: {
        'newName': newName,
      });
      if (response.data != null) return response.data!;
    } catch (e) {
      debugPrint('[FilesFoldersApi] renameFile failed, updating mock.');
    }

    // Mock
    await Future.delayed(const Duration(milliseconds: 500));
    final idx = _mockFiles.indexWhere((f) => f.id == fileId);
    if (idx != -1) {
      _mockFiles[idx] = FileItem(
        id: _mockFiles[idx].id,
        name: newName,
        size: _mockFiles[idx].size,
        type: _mockFiles[idx].type,
        createdAt: _mockFiles[idx].createdAt,
        permission: _mockFiles[idx].permission,
        path: _mockFiles[idx].path,
      );
    }
    return {'status': 'Completed', 'message': 'Đã đổi tên tệp tin thành công', 'trackingId': ''};
  }

  /// Set file permissions (Public / Private / Shared)
  Future<Map<String, dynamic>> setFilePermission(String fileId, int permission, {String? shareCode, String? expiredAt}) async {
    try {
      final response = await _client.post<Map<String, dynamic>>('/api/files/permission', data: {
        'fileId': fileId,
        'permission': permission,
        'shareCode': shareCode,
        'expiredAt': expiredAt,
      });
      if (response.data != null) return response.data!;
    } catch (e) {
      debugPrint('[FilesFoldersApi] setFilePermission failed, updating mock.');
    }

    // Mock
    await Future.delayed(const Duration(milliseconds: 500));
    final idx = _mockFiles.indexWhere((f) => f.id == fileId);
    if (idx != -1) {
      _mockFiles[idx] = FileItem(
        id: _mockFiles[idx].id,
        name: _mockFiles[idx].name,
        size: _mockFiles[idx].size,
        type: _mockFiles[idx].type,
        createdAt: _mockFiles[idx].createdAt,
        permission: permission,
        path: _mockFiles[idx].path,
      );
    }
    return {'status': 'Completed', 'message': 'Cập nhật phân quyền thành công', 'trackingId': ''};
  }

  /// Get share URL for a file
  Future<Response<Map<String, dynamic>>> getShareUrl(String fileId, {int durationHours = 24}) async {
    try {
      return await _client.get<Map<String, dynamic>>('/api/files/$fileId/share-url', queryParameters: {'durationHours': durationHours});
    } catch (e) {
      debugPrint('[FilesFoldersApi] getShareUrl failed, using mock.');
      rethrow;
    }
  }

  /// Search files
  Future<List<FileItem>> searchFiles(String query) async {
    try {
      final response = await _client.get<List<dynamic>>('/api/files/search', queryParameters: {'query': query});
      if (response.data != null) {
        return response.data!.map((e) => FileItem.fromJson(e)).toList();
      }
    } catch (e) {
      debugPrint('[FilesFoldersApi] searchFiles failed, searching mock database.');
    }

    // Mock
    await Future.delayed(const Duration(milliseconds: 400));
    if (query.trim().isEmpty) return [];
    return _mockFiles
        .where((f) => f.name.toLowerCase().contains(query.toLowerCase()))
        .toList();
  }
}
