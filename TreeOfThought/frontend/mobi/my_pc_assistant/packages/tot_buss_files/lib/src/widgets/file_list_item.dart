import 'package:flutter/material.dart';
import '../models/file_folder_models.dart';

class FileListItem extends StatelessWidget {
  final FileItem? file;
  final FolderItem? folder;
  final VoidCallback onTap;
  final void Function(String action) onAction; // 'rename', 'move', 'delete', 'share'

  const FileListItem({
    super.key,
    this.file,
    this.folder,
    required this.onTap,
    required this.onAction,
  }) : assert(file != null || folder != null, 'Either file or folder must be provided');

  String _formatSize(int bytes) {
    if (bytes == 0) return '0 Bytes';
    const k = 1024;
    final sizes = ['Bytes', 'KB', 'MB', 'GB'];
    final i = (bytes > 0) ? (bytes / k).truncate().toString().length ~/ 3 : 0;
    return '${(bytes / (k * (i + 1))).toStringAsFixed(1)} ${sizes[i]}';
  }

  Color _getPermissionColor(int permission) {
    switch (permission) {
      case 0: return Colors.grey.shade600; // Private
      case 1: return Colors.green.shade600; // Public
      case 2: return Colors.blue.shade600; // Shared
      default: return Colors.grey;
    }
  }

  String _getPermissionText(int permission) {
    switch (permission) {
      case 0: return 'Riêng tư';
      case 1: return 'Công khai';
      case 2: return 'Được chia sẻ';
      default: return 'Không xác định';
    }
  }

  IconData _getFileIcon(String ext) {
    final e = ext.toLowerCase();
    if (e == 'pdf') return Icons.picture_as_pdf;
    if (e == 'doc' || e == 'docx') return Icons.description;
    if (e == 'xls' || e == 'xlsx') return Icons.table_chart;
    if (e == 'png' || e == 'jpg' || e == 'jpeg') return Icons.image;
    if (e == 'zip' || e == 'rar') return Icons.archive;
    return Icons.insert_drive_file;
  }

  Color _getFileColor(String ext) {
    final e = ext.toLowerCase();
    if (e == 'pdf') return Colors.red.shade600;
    if (e == 'doc' || e == 'docx') return Colors.blue.shade600;
    if (e == 'xls' || e == 'xlsx') return Colors.green.shade600;
    if (e == 'png' || e == 'jpg' || e == 'jpeg') return Colors.orange.shade600;
    if (e == 'zip' || e == 'rar') return Colors.purple.shade600;
    return Colors.grey.shade600;
  }

  @override
  Widget build(BuildContext context) {
    final isFolder = folder != null;
    final name = isFolder ? folder!.name : file!.name;
    final subtitle = isFolder 
        ? 'Thư mục' 
        : '${_formatSize(file!.size)} • ${_getPermissionText(file!.permission)}';
    
    final iconData = isFolder ? Icons.folder : _getFileIcon(file!.type);
    final iconColor = isFolder ? Colors.amber.shade700 : _getFileColor(file!.type);

    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: BorderSide(color: Colors.grey.shade100, width: 1),
      ),
      color: Colors.white,
      child: InkWell(
        borderRadius: BorderRadius.circular(16),
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          child: Row(
            children: [
              // Visual Icon Container
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  color: iconColor.withOpacity(0.08),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(iconData, color: iconColor, size: 28),
              ),
              const SizedBox(width: 16),
              // Name and Metadata
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      name,
                      style: const TextStyle(
                        fontWeight: FontWeight.w600,
                        fontSize: 15,
                        color: Colors.black87,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: 4),
                    Row(
                      children: [
                        if (!isFolder) ...[
                          Container(
                            width: 6,
                            height: 6,
                            decoration: BoxDecoration(
                              color: _getPermissionColor(file!.permission),
                              shape: BoxShape.circle,
                            ),
                          ),
                          const SizedBox(width: 6),
                        ],
                        Text(
                          subtitle,
                          style: TextStyle(
                            fontSize: 12,
                            color: Colors.grey.shade600,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              // Trailing action menu button
              IconButton(
                icon: const Icon(Icons.more_vert, color: Colors.grey),
                onPressed: () {
                  _showActionsBottomSheet(context);
                },
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _showActionsBottomSheet(BuildContext context) {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(24),
          topRight: Radius.circular(24),
        ),
      ),
      builder: (context) {
        final isFolder = folder != null;
        final name = isFolder ? folder!.name : file!.name;

        return Padding(
          padding: const EdgeInsets.symmetric(vertical: 20),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              // Bottom Sheet Title Indicator
              Center(
                child: Container(
                  width: 36,
                  height: 4,
                  decoration: BoxDecoration(
                    color: Colors.grey.shade300,
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 24),
                child: Row(
                  children: [
                    Icon(
                      isFolder ? Icons.folder : _getFileIcon(file!.type),
                      color: isFolder ? Colors.amber.shade700 : _getFileColor(file!.type),
                      size: 24,
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Text(
                        name,
                        style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                  ],
                ),
              ),
              const Divider(height: 24),
              
              // Action triggers
              _buildActionTile(context, Icons.info_outline, 'Xem chi tiết', () {
                Navigator.pop(context);
                onAction('details');
              }),
              _buildActionTile(context, Icons.edit_outlined, 'Đổi tên', () {
                Navigator.pop(context);
                onAction('rename');
              }),
              _buildActionTile(context, Icons.drive_file_move_outlined, 'Di chuyển', () {
                Navigator.pop(context);
                onAction('move');
              }),
              if (!isFolder)
                _buildActionTile(context, Icons.share_outlined, 'Chia sẻ / Phân quyền', () {
                  Navigator.pop(context);
                  onAction('share');
                }),
              const Divider(height: 12),
              _buildActionTile(
                context,
                Icons.delete_outline,
                'Xóa',
                () {
                  Navigator.pop(context);
                  onAction('delete');
                },
                isDanger: true,
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildActionTile(BuildContext context, IconData icon, String label, VoidCallback onTap, {bool isDanger = false}) {
    final color = isDanger ? Colors.red.shade600 : Colors.black87;
    
    return ListTile(
      leading: Icon(icon, color: color),
      title: Text(
        label,
        style: TextStyle(color: color, fontWeight: FontWeight.w500, fontSize: 15),
      ),
      onTap: onTap,
      contentPadding: const EdgeInsets.symmetric(horizontal: 24),
    );
  }
}
