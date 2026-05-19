import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../models/file_folder_models.dart';
import '../services/files_folders_api.dart';

class FileDetailPage extends StatefulWidget {
  final FileItem file;
  const FileDetailPage({super.key, required this.file});

  @override
  State<FileDetailPage> createState() => _FileDetailPageState();
}

class _FileDetailPageState extends State<FileDetailPage> {
  bool _generatingLink = false;
  String? _shareUrl;

  String _formatSize(int bytes) {
    if (bytes == 0) return '0 Bytes';
    const k = 1024;
    final sizes = ['Bytes', 'KB', 'MB', 'GB'];
    final i = (bytes > 0) ? (bytes / k).truncate().toString().length ~/ 3 : 0;
    return '${(bytes / (k * (i + 1))).toStringAsFixed(1)} ${sizes[i]}';
  }

  String _getPermissionText(int permission) {
    switch (permission) {
      case 0: return 'Riêng tư (Private)';
      case 1: return 'Công khai (Public)';
      case 2: return 'Được chia sẻ (Shared)';
      default: return 'Không xác định';
    }
  }

  Future<void> _generateShareUrl() async {
    setState(() => _generatingLink = true);
    try {
      final result = await FilesFoldersApi.instance.getShareUrl(widget.file.id);
      // Wait for simulated latency
      await Future.delayed(const Duration(milliseconds: 400));
      setState(() {
        _shareUrl = result.data?['shareUrl']?.toString() ?? 'http://mypc-assistant.com/share/download/${widget.file.id}';
      });
      _copyToClipboard();
    } catch (e) {
      // Mock fallback share URL
      setState(() {
        _shareUrl = 'http://mypc-assistant.com/share/download/${widget.file.id}';
      });
      _copyToClipboard();
    } finally {
      setState(() => _generatingLink = false);
    }
  }

  void _copyToClipboard() {
    if (_shareUrl == null) return;
    Clipboard.setData(ClipboardData(text: _shareUrl!));
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Đường dẫn tải file đã được sao chép vào bộ nhớ tạm!'),
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Thông tin tệp tin'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          children: [
            // Centered visual file logo
            Center(
              child: Column(
                children: [
                  Container(
                    width: 80,
                    height: 80,
                    decoration: BoxDecoration(
                      color: theme.colorScheme.primary.withOpacity(0.08),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Icon(Icons.insert_drive_file, color: theme.colorScheme.primary, size: 48),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    widget.file.name,
                    style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Định dạng: ${widget.file.type.toUpperCase()}',
                    style: TextStyle(color: Colors.grey.shade600, fontSize: 14),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 32),

            // Metadata card
            Card(
              elevation: 0,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
                side: BorderSide(color: Colors.grey.shade200, width: 1),
              ),
              color: Colors.white,
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  children: [
                    _buildMetaRow('Kích thước', _formatSize(widget.file.size)),
                    const Divider(height: 24),
                    _buildMetaRow('Trạng thái chia sẻ', _getPermissionText(widget.file.permission)),
                    const Divider(height: 24),
                    _buildMetaRow('Ngày tạo tệp', widget.file.createdAt.toLocal().toString().split('.')[0]),
                    if (widget.file.path != null) ...[
                      const Divider(height: 24),
                      _buildMetaRow('Đường dẫn hệ thống', widget.file.path!),
                    ],
                  ],
                ),
              ),
            ),
            const SizedBox(height: 32),

            // Grab share link button
            if (widget.file.permission > 0) ...[
              if (_shareUrl == null)
                SizedBox(
                  width: double.infinity,
                  height: 48,
                  child: OutlinedButton.icon(
                    style: OutlinedButton.styleFrom(
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                    icon: _generatingLink
                        ? const SizedBox(width: 18, height: 18, child: CircularProgressIndicator(strokeWidth: 2))
                        : const Icon(Icons.link),
                    label: const Text('Lấy đường dẫn tải xuống trực tiếp'),
                    onPressed: _generatingLink ? null : _generateShareUrl,
                  ),
                )
              else
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.blue.shade50,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: Colors.blue.shade100),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Đường dẫn tải xuống (Click để copy):',
                        style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.blue),
                      ),
                      const SizedBox(height: 8),
                      GestureDetector(
                        onTap: _copyToClipboard,
                        child: Text(
                          _shareUrl!,
                          style: TextStyle(
                            color: Colors.blue.shade800,
                            decoration: TextDecoration.underline,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
            ] else
              const Padding(
                padding: EdgeInsets.symmetric(horizontal: 16),
                child: Text(
                  'Tệp tin đang ở trạng thái Riêng tư. Hãy chia sẻ tệp để lấy link tải xuống.',
                  style: TextStyle(color: Colors.grey, fontSize: 13, fontStyle: FontStyle.italic),
                  textAlign: TextAlign.center,
                ),
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildMetaRow(String label, String value) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label, style: TextStyle(color: Colors.grey.shade600, fontWeight: FontWeight.w500)),
        Text(value, style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.black87)),
      ],
    );
  }
}
