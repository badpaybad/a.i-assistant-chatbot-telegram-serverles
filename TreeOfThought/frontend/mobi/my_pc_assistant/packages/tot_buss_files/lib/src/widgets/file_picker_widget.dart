import 'package:flutter/material.dart';
import 'package:tot_core/tot_core.dart';
import '../models/file_folder_models.dart';
import '../services/files_folders_api.dart';
import 'file_list_item.dart';

class FilePickerWidget extends StatefulWidget {
  const FilePickerWidget({super.key});

  @override
  State<FilePickerWidget> createState() => _FilePickerWidgetState();
}

class _FilePickerWidgetState extends State<FilePickerWidget> {
  final List<FolderItem> _folders = [];
  final List<FileItem> _files = [];
  final ScrollController _scrollController = ScrollController();
  
  String? _currentFolderId;
  int _pageIndex = 1;
  static const int _pageSize = 10;
  bool _isLoading = false;
  bool _hasMore = true;
  List<BreadcrumbItem> _breadcrumbs = [];

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(_scrollListener);
    _loadContent();
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  void _scrollListener() {
    if (_scrollController.position.pixels >= _scrollController.position.maxScrollExtent * 0.9) {
      if (!_isLoading && _hasMore) {
        _loadNextPage();
      }
    }
  }

  Future<void> _loadContent() async {
    if (_isLoading) return;
    setState(() {
      _isLoading = true;
      _pageIndex = 1;
      _folders.clear();
      _files.clear();
    });

    try {
      final response = await FilesFoldersApi.instance.getFolderContent(_currentFolderId, _pageIndex, _pageSize);
      setState(() {
        _folders.addAll(response.folders);
        _files.addAll(response.files);
        _breadcrumbs = response.breadcrumbs;
        _hasMore = response.files.length >= _pageSize;
        _pageIndex = 2;
      });
    } catch (e) {
      debugPrint('[FilePickerWidget] Error loading content: $e');
    } finally {
      setState(() => _isLoading = false);
    }
  }

  Future<void> _loadNextPage() async {
    setState(() => _isLoading = true);
    try {
      final response = await FilesFoldersApi.instance.getFolderContent(_currentFolderId, _pageIndex, _pageSize);
      setState(() {
        _files.addAll(response.files);
        _hasMore = response.files.length >= _pageSize;
        _pageIndex++;
      });
    } catch (e) {
      debugPrint('[FilePickerWidget] Error loading next page: $e');
    } finally {
      setState(() => _isLoading = false);
    }
  }

  void _navigateToFolder(String? folderId) {
    setState(() {
      _currentFolderId = folderId;
    });
    _loadContent();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Chọn tài liệu đính kèm'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: Column(
        children: [
          // Breadcrumbs horizontal track bar
          if (_breadcrumbs.isNotEmpty)
            Container(
              height: 48,
              width: double.infinity,
              color: Colors.grey.shade50,
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                itemCount: _breadcrumbs.length,
                separatorBuilder: (context, index) => const Icon(Icons.chevron_right, size: 16, color: Colors.grey),
                itemBuilder: (context, index) {
                  final crumb = _breadcrumbs[index];
                  final isLast = index == _breadcrumbs.length - 1;

                  return GestureDetector(
                    onTap: isLast ? null : () => _navigateToFolder(crumb.id),
                    child: Center(
                      child: Text(
                        crumb.name,
                        style: TextStyle(
                          fontWeight: isLast ? FontWeight.bold : FontWeight.normal,
                          color: isLast ? Colors.black87 : theme.colorScheme.primary,
                          fontSize: 13,
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
          const Divider(height: 1),
          
          // Folder/File items list
          Expanded(
            child: _folders.isEmpty && _files.isEmpty && !_isLoading
                ? const Center(child: Text('Thư mục trống'))
                : ListView.builder(
                    controller: _scrollController,
                    itemCount: _folders.length + _files.length + (_isLoading ? 1 : 0),
                    itemBuilder: (context, index) {
                      // Show loading indicator at bottom
                      if (index == _folders.length + _files.length) {
                        return const Padding(
                          padding: EdgeInsets.symmetric(vertical: 16),
                          child: Center(child: CircularProgressIndicator()),
                        );
                      }

                      // Render folders first
                      if (index < _folders.length) {
                        final folder = _folders[index];
                        return FileListItem(
                          folder: folder,
                          onTap: () => _navigateToFolder(folder.id),
                          onAction: (_) {}, // Disable actions menu in picker mode
                        );
                      }

                      // Render files next
                      final fileIndex = index - _folders.length;
                      final file = _files[fileIndex];
                      return FileListItem(
                        file: file,
                        onTap: () {
                          // Dynamic state sharing: Publish the FileSelectedEvent on the CQRS event bus!
                          CqrsDispatcher.instance.publishAsync(
                            FileSelectedEvent(
                              fileId: file.id,
                              fileName: file.name,
                              filePath: file.path ?? '/files/${file.name}',
                            ),
                            topicName: 'file_selection',
                          );
                        },
                        onAction: (_) {},
                      );
                    },
                  ),
          ),
        ],
      ),
    );
  }
}
