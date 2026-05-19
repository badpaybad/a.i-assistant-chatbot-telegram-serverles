import '../../../core/event_bus.dart';

class FileItem {
  final String id;
  final String name;
  final int size;
  final String type;
  final DateTime createdAt;
  final int permission; // 0 = Private, 1 = Public, 2 = Shared
  final String? path;

  FileItem({
    required this.id,
    required this.name,
    required this.size,
    required this.type,
    required this.createdAt,
    required this.permission,
    this.path,
  });

  factory FileItem.fromJson(Map<String, dynamic> json) {
    return FileItem(
      id: json['id']?.toString() ?? '',
      name: json['name']?.toString() ?? '',
      size: json['size'] is int ? json['size'] : int.tryParse(json['size']?.toString() ?? '0') ?? 0,
      type: json['type']?.toString() ?? '',
      createdAt: json['createdAt'] != null ? DateTime.parse(json['createdAt']) : DateTime.now(),
      permission: json['permission'] is int ? json['permission'] : int.tryParse(json['permission']?.toString() ?? '0') ?? 0,
      path: json['path']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'size': size,
      'type': type,
      'createdAt': createdAt.toIso8601String(),
      'permission': permission,
      'path': path,
    };
  }
}

class FolderItem {
  final String id;
  final String name;
  final String? parentId;

  FolderItem({
    required this.id,
    required this.name,
    this.parentId,
  });

  factory FolderItem.fromJson(Map<String, dynamic> json) {
    return FolderItem(
      id: json['id']?.toString() ?? '',
      name: json['name']?.toString() ?? '',
      parentId: json['parentId']?.toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'parentId': parentId,
    };
  }
}

class BreadcrumbItem {
  final String? id;
  final String name;

  BreadcrumbItem({
    required this.id,
    required this.name,
  });

  factory BreadcrumbItem.fromJson(Map<String, dynamic> json) {
    return BreadcrumbItem(
      id: json['id']?.toString(),
      name: json['name']?.toString() ?? '',
    );
  }
}

class FolderContentResponse {
  final List<FolderItem> folders;
  final List<FileItem> files;
  final int totalFiles;
  final List<BreadcrumbItem> breadcrumbs;

  FolderContentResponse({
    required this.folders,
    required this.files,
    required this.totalFiles,
    required this.breadcrumbs,
  });

  factory FolderContentResponse.fromJson(Map<String, dynamic> json) {
    var foldersList = <FolderItem>[];
    if (json['folders'] != null) {
      foldersList = (json['folders'] as List).map((i) => FolderItem.fromJson(i)).toList();
    }

    var filesList = <FileItem>[];
    if (json['files'] != null) {
      filesList = (json['files'] as List).map((i) => FileItem.fromJson(i)).toList();
    }

    var breadcrumbsList = <BreadcrumbItem>[];
    if (json['breadcrumbs'] != null) {
      breadcrumbsList = (json['breadcrumbs'] as List).map((i) => BreadcrumbItem.fromJson(i)).toList();
    }

    return FolderContentResponse(
      folders: foldersList,
      files: filesList,
      totalFiles: json['totalFiles'] is int ? json['totalFiles'] : int.tryParse(json['totalFiles']?.toString() ?? '0') ?? 0,
      breadcrumbs: breadcrumbsList,
    );
  }
}

// CQRS Events & Commands for files_folders

class FileSelectedEvent extends BaseEvent {
  final String fileId;
  final String fileName;
  final String filePath;

  FileSelectedEvent({
    required this.fileId,
    required this.fileName,
    required this.filePath,
    super.trackingId,
  }) : super(topicName: 'file_selection');
}

class CreateFolderCommand extends BaseCommand {
  final String name;
  final String? parentId;

  CreateFolderCommand({
    required this.name,
    this.parentId,
    super.trackingId,
  }) : super(queueName: 'folder_commands');
}
