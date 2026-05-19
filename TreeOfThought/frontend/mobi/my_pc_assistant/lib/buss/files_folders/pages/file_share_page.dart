import 'package:flutter/material.dart';
import '../../../shared/tot_button.dart';
import '../models/file_folder_models.dart';
import '../services/files_folders_api.dart';

class FileSharePage extends StatefulWidget {
  final FileItem file;
  const FileSharePage({super.key, required this.file});

  @override
  State<FileSharePage> createState() => _FileSharePageState();
}

class _FileSharePageState extends State<FileSharePage> {
  late int _selectedPermission;
  final TextEditingController _codeController = TextEditingController();
  final TextEditingController _expireHoursController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _selectedPermission = widget.file.permission;
  }

  @override
  void dispose() {
    _codeController.dispose();
    _expireHoursController.dispose();
    super.dispose();
  }

  Future<void> _savePermissions() async {
    final hoursText = _expireHoursController.text.trim();
    String? expiredAt;
    if (hoursText.isNotEmpty) {
      final hours = int.tryParse(hoursText) ?? 0;
      if (hours > 0) {
        expiredAt = DateTime.now().add(Duration(hours: hours)).toIso8601String();
      }
    }

    final codeText = _codeController.text.trim();
    final result = await FilesFoldersApi.instance.setFilePermission(
      widget.file.id,
      _selectedPermission,
      shareCode: codeText.isNotEmpty ? codeText : null,
      expiredAt: expiredAt,
    );

    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(result['message'] ?? 'Đã lưu cấu hình phân quyền'),
          behavior: SnackBarBehavior.floating,
        ),
      );
      Navigator.pop(context);
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Thiết lập chia sẻ'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // File info header card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.grey.shade50,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: Colors.grey.shade100),
              ),
              child: Row(
                children: [
                  Icon(Icons.insert_drive_file, color: theme.colorScheme.primary, size: 36),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          widget.file.name,
                          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                        const SizedBox(height: 4),
                        Text(
                          'Loại: ${widget.file.type.toUpperCase()}',
                          style: TextStyle(color: Colors.grey.shade600, fontSize: 13),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            const Text(
              'Quyền truy cập',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
            ),
            const SizedBox(height: 12),

            // Radio options
            _buildPermissionRadio(0, 'Riêng tư (Private)', 'Chỉ bạn mới có quyền truy cập tệp tin này.', Icons.lock_outline),
            _buildPermissionRadio(1, 'Công khai (Public)', 'Bất kỳ ai có đường dẫn đều có thể xem tệp tin này.', Icons.public_outlined),
            _buildPermissionRadio(2, 'Được chia sẻ (Shared)', 'Chia sẻ cụ thể kèm mã bảo mật và thời hạn.', Icons.people_outline),

            if (_selectedPermission == 2) ...[
              const SizedBox(height: 24),
              const Text(
                'Cấu hình mã bảo vệ & Thời hạn (Tùy chọn)',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: _codeController,
                decoration: InputDecoration(
                  labelText: 'Mã bảo vệ (Share Code)',
                  hintText: 'Nhập mật khẩu truy cập tệp tin...',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                  prefixIcon: const Icon(Icons.password),
                ),
              ),
              const SizedBox(height: 16),
              TextField(
                controller: _expireHoursController,
                keyboardType: TextInputType.number,
                decoration: InputDecoration(
                  labelText: 'Thời hạn truy cập (giờ)',
                  hintText: 'Tự động khóa sau (ví dụ: 24)...',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                  prefixIcon: const Icon(Icons.timer_outlined),
                ),
              ),
            ],

            const SizedBox(height: 40),

            // Save actions utilizing TotButton!
            TotButton(
              width: double.infinity,
              onPressed: _savePermissions,
              child: const Text('Lưu cấu hình', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPermissionRadio(int val, String title, String desc, IconData icon) {
    final theme = Theme.of(context);
    final isSelected = _selectedPermission == val;

    return Container(
      margin: const EdgeInsets.symmetric(vertical: 6),
      decoration: BoxDecoration(
        color: isSelected ? theme.colorScheme.primary.withOpacity(0.04) : Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: isSelected ? theme.colorScheme.primary : Colors.grey.shade200,
          width: isSelected ? 2 : 1,
        ),
      ),
      child: RadioListTile<int>(
        value: val,
        groupValue: _selectedPermission,
        onChanged: (newVal) {
          if (newVal != null) {
            setState(() {
              _selectedPermission = newVal;
            });
          }
        },
        title: Row(
          children: [
            Icon(icon, color: isSelected ? theme.colorScheme.primary : Colors.grey),
            const SizedBox(width: 12),
            Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
          ],
        ),
        subtitle: Padding(
          padding: const EdgeInsets.only(top: 4, left: 36),
          child: Text(desc, style: TextStyle(color: Colors.grey.shade600, fontSize: 12)),
        ),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      ),
    );
  }
}
