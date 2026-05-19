import 'package:flutter/material.dart';
import '../models/file_folder_models.dart';
import '../services/files_folders_api.dart';

class FolderTreeSelector extends StatefulWidget {
  final String? currentFolderId;
  final String itemName;
  final bool isFolder;

  const FolderTreeSelector({
    super.key,
    this.currentFolderId,
    required this.itemName,
    required this.isFolder,
  });

  @override
  State<FolderTreeSelector> createState() => _FolderTreeSelectorState();
}

class _FolderTreeSelectorState extends State<FolderTreeSelector> {
  List<FolderItem> _allFolders = [];
  bool _isLoading = true;
  String? _selectedFolderId;
  String _selectedFolderName = 'Tài liệu của tôi (Thư mục gốc)';

  @override
  void initState() {
    super.initState();
    _loadTree();
  }

  Future<void> _loadTree() async {
    setState(() => _isLoading = true);
    try {
      final tree = await FilesFoldersApi.instance.getFolderTree();
      setState(() {
        _allFolders = tree;
      });
    } catch (e) {
      debugPrint('[FolderTreeSelector] Error: $e');
    } finally {
      setState(() => _isLoading = false);
    }
  }

  List<FolderItem> _getChildren(String? parentId) {
    return _allFolders.where((f) => f.parentId == parentId).toList();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Chọn thư mục đích'),
        leading: IconButton(
          icon: const Icon(Icons.close),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : Column(
              children: [
                // Info block
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(16),
                  color: Colors.grey.shade50,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Di chuyển: ${widget.itemName}',
                        style: const TextStyle(fontWeight: FontWeight.w600, color: Colors.black87),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'Đích đến: $_selectedFolderName',
                        style: TextStyle(color: theme.colorScheme.primary, fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                ),
                const Divider(height: 1),
                
                // Root node tile
                ListTile(
                  leading: const Icon(Icons.home, color: Colors.blue),
                  title: const Text('Thư mục gốc (Root)'),
                  trailing: _selectedFolderId == null
                      ? Icon(Icons.check_circle, color: theme.colorScheme.primary)
                      : null,
                  onTap: () {
                    setState(() {
                      _selectedFolderId = null;
                      _selectedFolderName = 'Tài liệu của tôi (Thư mục gốc)';
                    });
                  },
                ),
                const Divider(height: 1),
                
                // Recursive Folder Nodes list
                Expanded(
                  child: ListView(
                    children: _getChildren(null).map((folder) => _buildFolderNode(folder, 1)).toList(),
                  ),
                ),
                
                // Actions block
                SafeArea(
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: SizedBox(
                      width: double.infinity,
                      height: 48,
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        ),
                        onPressed: () {
                          // Return selected folder id
                          Navigator.pop(context, _selectedFolderId);
                        },
                        child: const Text('Xác nhận di chuyển đến đây'),
                      ),
                    ),
                  ),
                ),
              ],
            ),
    );
  }

  Widget _buildFolderNode(FolderItem folder, int level) {
    final theme = Theme.of(context);
    final children = _getChildren(folder.id);
    final hasChildren = children.isNotEmpty;
    final isSelected = _selectedFolderId == folder.id;

    // Prevent moving a folder into itself
    final isSelf = widget.isFolder && folder.id == widget.currentFolderId;

    return Column(
      children: [
        ListTile(
          contentPadding: EdgeInsets.only(left: 16.0 * level, right: 16.0),
          leading: Icon(
            Icons.folder,
            color: isSelf ? Colors.grey.shade400 : Colors.amber.shade700,
          ),
          title: Text(
            folder.name,
            style: TextStyle(
              color: isSelf ? Colors.grey : Colors.black87,
              fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
            ),
          ),
          trailing: isSelected
              ? Icon(Icons.check_circle, color: theme.colorScheme.primary)
              : null,
          enabled: !isSelf,
          onTap: () {
            setState(() {
              _selectedFolderId = folder.id;
              _selectedFolderName = folder.name;
            });
          },
        ),
        if (hasChildren)
          ...children.map((child) => _buildFolderNode(child, level + 1)),
      ],
    );
  }
}
