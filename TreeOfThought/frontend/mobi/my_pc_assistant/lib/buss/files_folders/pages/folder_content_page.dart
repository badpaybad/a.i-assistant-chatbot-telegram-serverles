import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:path/path.dart' as p;
import '../models/file_folder_models.dart';
import '../services/files_folders_api.dart';
import '../widgets/file_list_item.dart';
import '../widgets/folder_tree_selector.dart';
import 'file_detail_page.dart';
import 'file_share_page.dart';

class FolderContentPage extends StatefulWidget {
  final String? folderId;
  const FolderContentPage({super.key, this.folderId});

  @override
  State<FolderContentPage> createState() => _FolderContentPageState();
}

class _FolderContentPageState extends State<FolderContentPage> {
  final List<FolderItem> _folders = [];
  final List<FileItem> _files = [];
  final ScrollController _scrollController = ScrollController();
  final TextEditingController _searchController = TextEditingController();
  
  String? _currentFolderId;
  int _pageIndex = 1;
  static const int _pageSize = 10;
  bool _isLoading = false;
  bool _hasMore = true;
  List<BreadcrumbItem> _breadcrumbs = [];
  
  // Search state
  bool _isSearching = false;
  List<FileItem> _searchResults = [];

  @override
  void initState() {
    super.initState();
    _currentFolderId = widget.folderId;
    _scrollController.addListener(_scrollListener);
    _loadContent();
  }

  @override
  void dispose() {
    _scrollController.dispose();
    _searchController.dispose();
    super.dispose();
  }

  void _scrollListener() {
    if (_scrollController.position.pixels >= _scrollController.position.maxScrollExtent * 0.9) {
      if (!_isLoading && _hasMore && !_isSearching) {
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
      _showToast('Lỗi khi tải dữ liệu');
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
      _showToast('Lỗi khi tải trang tiếp theo');
    } finally {
      setState(() => _isLoading = false);
    }
  }

  void _navigateToFolder(String? folderId) {
    setState(() {
      _currentFolderId = folderId;
      _isSearching = false;
      _searchController.clear();
    });
    _loadContent();
  }

  Future<void> _onSearch(String query) async {
    if (query.trim().isEmpty) {
      setState(() {
        _isSearching = false;
        _searchResults.clear();
      });
      return;
    }

    setState(() {
      _isSearching = true;
      _isLoading = true;
    });

    try {
      final results = await FilesFoldersApi.instance.searchFiles(query);
      setState(() {
        _searchResults = results;
      });
    } catch (e) {
      _showToast('Lỗi khi tìm kiếm');
    } finally {
      setState(() => _isLoading = false);
    }
  }

  void _showToast(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      ),
    );
  }

  // Trigger Action menu choices from ListItem
  void _handleItemAction(dynamic item, bool isFolder, String action) async {
    final id = item.id;
    final name = item.name;

    if (action == 'details') {
      if (isFolder) {
        _showToast('Xem thông tin thư mục: $name');
      } else {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => FileDetailPage(file: item)),
        );
      }
    } else if (action == 'rename') {
      _showRenameDialog(id, name, isFolder);
    } else if (action == 'move') {
      _showMoveDialog(item, isFolder);
    } else if (action == 'share') {
      if (!isFolder) {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => FileSharePage(file: item)),
        ).then((_) => _loadContent());
      }
    } else if (action == 'delete') {
      _showDeleteConfirmation(id, name, isFolder);
    }
  }

  void _showRenameDialog(String id, String currentName, bool isFolder) {
    final controller = TextEditingController(text: currentName);
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(isFolder ? 'Đổi tên thư mục' : 'Đổi tên tệp tin'),
        content: TextField(
          controller: controller,
          decoration: const InputDecoration(hintText: 'Nhập tên mới...'),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Hủy')),
          TextButton(
            onPressed: () async {
              Navigator.pop(context);
              if (controller.text.trim().isEmpty) return;
              
              _showToast('Đang đổi tên...');
              final result = isFolder
                  ? await FilesFoldersApi.instance.renameFolder(id, controller.text)
                  : await FilesFoldersApi.instance.renameFile(id, controller.text);
              
              _showToast(result['message'] ?? 'Thành công');
              _loadContent();
            },
            child: const Text('Lưu'),
          ),
        ],
      ),
    );
  }

  void _showMoveDialog(dynamic item, bool isFolder) {
    showModalBottomSheet<String?>(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => FolderTreeSelector(
        currentFolderId: isFolder ? item.id : null,
        itemName: item.name,
        isFolder: isFolder,
      ),
    ).then((destFolderId) async {
      // User cancelled or confirmed same folder
      if (destFolderId == _currentFolderId) return;

      _showToast('Đang di chuyển...');
      final result = isFolder
          ? await FilesFoldersApi.instance.moveFolder(item.id, destFolderId)
          : await FilesFoldersApi.instance.moveFile(item.id, destFolderId);

      _showToast(result['message'] ?? 'Đã di chuyển thành công');
      _loadContent();
    });
  }

  void _showDeleteConfirmation(String id, String name, bool isFolder) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Xác nhận xóa'),
        content: Text('Bạn có chắc chắn muốn xóa ${isFolder ? 'thư mục' : 'tệp tin'} "$name"? Hành động này không thể hoàn tác.'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Hủy')),
          TextButton(
            onPressed: () async {
              Navigator.pop(context);
              _showToast('Đang xử lý xóa...');
              final result = isFolder
                  ? await FilesFoldersApi.instance.deleteFolder(id)
                  : await FilesFoldersApi.instance.deleteFile(id);

              _showToast(result['message'] ?? 'Đã xóa thành công');
              _loadContent();
            },
            child: const Text('Xóa', style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );
  }

  // Floating Action Button operations trigger
  void _openAddMenu() {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(24),
          topRight: Radius.circular(24),
        ),
      ),
      builder: (context) => Padding(
        padding: const EdgeInsets.symmetric(vertical: 24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Center(
              child: Container(
                width: 36,
                height: 4,
                decoration: BoxDecoration(color: Colors.grey.shade300, borderRadius: BorderRadius.circular(2)),
              ),
            ),
            const SizedBox(height: 16),
            const Text(
              'Thêm mới',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
            ),
            const Divider(height: 24),
            ListTile(
              leading: const Icon(Icons.create_new_folder_outlined, color: Colors.blue),
              title: const Text('Tạo thư mục mới', style: TextStyle(fontWeight: FontWeight.w500)),
              onTap: () {
                Navigator.pop(context);
                _showCreateFolderDialog();
              },
            ),
            ListTile(
              leading: const Icon(Icons.cloud_upload_outlined, color: Colors.green),
              title: const Text('Tải tệp tin lên', style: TextStyle(fontWeight: FontWeight.w500)),
              onTap: () {
                Navigator.pop(context);
                _handleFileUpload();
              },
            ),
          ],
        ),
      ),
    );
  }

  void _showCreateFolderDialog() {
    final controller = TextEditingController();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Tạo thư mục mới'),
        content: TextField(
          controller: controller,
          decoration: const InputDecoration(hintText: 'Nhập tên thư mục...'),
          autofocus: true,
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Hủy')),
          TextButton(
            onPressed: () async {
              Navigator.pop(context);
              if (controller.text.trim().isEmpty) return;
              
              _showToast('Đang tạo thư mục...');
              final result = await FilesFoldersApi.instance.createFolder(controller.text, _currentFolderId);
              _showToast(result['message'] ?? 'Tạo thư mục thành công');
              _loadContent();
            },
            child: const Text('Tạo'),
          ),
        ],
      ),
    );
  }

  Future<void> _handleFileUpload() async {
    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(source: ImageSource.gallery);
    
    if (pickedFile == null) return;
    
    final file = File(pickedFile.path);
    final fileName = p.basename(pickedFile.path);
    
    _showToast('Đang tải lên tệp: $fileName...');
    final result = await FilesFoldersApi.instance.uploadFile(_currentFolderId, file, fileName);
    
    _showToast(result['message'] ?? 'Tải tệp thành công');
    _loadContent();

    // Premium upload-completed hook: open permission configuration page automatically!
    if (result.containsKey('fileId')) {
      final fileId = result['fileId'].toString();
      final uploadedFileItem = FileItem(
        id: fileId,
        name: fileName,
        size: result['size'] ?? 0,
        type: fileName.split('.').last,
        createdAt: DateTime.now(),
        permission: 0, // default Private
      );
      
      // Auto open share permissions page!
      Future.delayed(const Duration(milliseconds: 400), () {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => FileSharePage(file: uploadedFileItem)),
        ).then((_) => _loadContent());
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Tài liệu của tôi'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _loadContent,
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _openAddMenu,
        backgroundColor: theme.colorScheme.primary,
        child: const Icon(Icons.add, color: Colors.white, size: 28),
      ),
      body: Column(
        children: [
          // Search box
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: TextField(
              controller: _searchController,
              decoration: InputDecoration(
                hintText: 'Tìm kiếm tệp tin...',
                prefixIcon: const Icon(Icons.search),
                suffixIcon: _searchController.text.isNotEmpty
                    ? IconButton(
                        icon: const Icon(Icons.clear),
                        onPressed: () {
                          _searchController.clear();
                          _onSearch('');
                        },
                      )
                    : null,
                filled: true,
                fillColor: Colors.grey.shade100,
                contentPadding: const EdgeInsets.symmetric(vertical: 0, horizontal: 16),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(16),
                  borderSide: BorderSide.none,
                ),
              ),
              onChanged: _onSearch,
            ),
          ),
          
          // Breadcrumbshorizontal track bar
          if (!_isSearching && _breadcrumbs.isNotEmpty)
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

          // Items listing (Folders + Files or Search Results)
          Expanded(
            child: _isLoading && _folders.isEmpty && _files.isEmpty && _searchResults.isEmpty
                ? const Center(child: CircularProgressIndicator())
                : _isSearching
                    ? _searchResults.isEmpty
                        ? const Center(child: Text('Không tìm thấy tệp tin nào'))
                        : ListView.builder(
                            itemCount: _searchResults.length,
                            itemBuilder: (context, index) {
                              final file = _searchResults[index];
                              return FileListItem(
                                file: file,
                                onTap: () => _handleItemAction(file, false, 'details'),
                                onAction: (action) => _handleItemAction(file, false, action),
                              );
                            },
                          )
                    : _folders.isEmpty && _files.isEmpty
                        ? const Center(child: Text('Thư mục trống'))
                        : RefreshIndicator(
                            onRefresh: _loadContent,
                            child: ListView.builder(
                              controller: _scrollController,
                              physics: const AlwaysScrollableScrollPhysics(),
                              itemCount: _folders.length + _files.length + (_isLoading ? 1 : 0),
                              itemBuilder: (context, index) {
                                // Loading spinner at bottom
                                if (index == _folders.length + _files.length) {
                                  return const Padding(
                                    padding: EdgeInsets.symmetric(vertical: 16),
                                    child: Center(child: CircularProgressIndicator()),
                                  );
                                }

                                // Show folders first
                                if (index < _folders.length) {
                                  final folder = _folders[index];
                                  return FileListItem(
                                    folder: folder,
                                    onTap: () => _navigateToFolder(folder.id),
                                    onAction: (action) => _handleItemAction(folder, true, action),
                                  );
                                }

                                // Show files next
                                final fileIndex = index - _folders.length;
                                final file = _files[fileIndex];
                                return FileListItem(
                                  file: file,
                                  onTap: () => _handleItemAction(file, false, 'details'),
                                  onAction: (action) => _handleItemAction(file, false, action),
                                );
                              },
                            ),
                          ),
          ),
        ],
      ),
    );
  }
}
