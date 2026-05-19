import 'dart:convert';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';

class I18nService extends ChangeNotifier {
  static final I18nService _instance = I18nService._internal();
  static I18nService get instance => _instance;
  I18nService._internal();

  String _currentLocale = 'vi';
  Map<String, dynamic> _translations = {};
  bool _isLoading = false;

  String get currentLocale => _currentLocale;
  bool get isLoading => _isLoading;

  // Fallback default translations in case JSON files are not loaded yet
  static final Map<String, Map<String, String>> _fallbackTranslations = {
    'vi': {
      'common.save': 'Lưu',
      'common.cancel': 'Hủy',
      'common.delete': 'Xóa',
      'common.upload': 'Tải lên',
      'common.create': 'Tạo',
      'common.rename': 'Đổi tên',
      'common.move': 'Di chuyển',
      'common.share': 'Chia sẻ',
      'common.details': 'Chi tiết',
      'common.search': 'Tìm kiếm...',
      'common.loading': 'Đang tải...',
      'common.success': 'Thao tác thành công',
      'common.error': 'Có lỗi xảy ra',
      'files.title': 'Tài liệu của tôi',
      'files.root': 'Gốc',
      'files.upload_success': 'Tệp đã được tải lên thành công',
      'files.create_folder': 'Tạo thư mục mới',
      'files.folder_name': 'Tên thư mục',
      'files.empty': 'Thư mục trống',
      'files.private': 'Riêng tư',
      'files.public': 'Công khai',
      'files.shared': 'Được chia sẻ',
    },
    'en': {
      'common.save': 'Save',
      'common.cancel': 'Cancel',
      'common.delete': 'Delete',
      'common.upload': 'Upload',
      'common.create': 'Create',
      'common.rename': 'Rename',
      'common.move': 'Move',
      'common.share': 'Share',
      'common.details': 'Details',
      'common.search': 'Search...',
      'common.loading': 'Loading...',
      'common.success': 'Operation successful',
      'common.error': 'An error occurred',
      'files.title': 'My Documents',
      'files.root': 'Root',
      'files.upload_success': 'File uploaded successfully',
      'files.create_folder': 'Create New Folder',
      'files.folder_name': 'Folder Name',
      'files.empty': 'Folder is empty',
      'files.private': 'Private',
      'files.public': 'Public',
      'files.shared': 'Shared',
    }
  };

  /// Initialize translations
  Future<void> init({String defaultLocale = 'vi'}) async {
    _currentLocale = defaultLocale;
    await loadLocale(defaultLocale);
  }

  /// Switch the active locale
  Future<void> changeLocale(String locale) async {
    if (_currentLocale == locale) return;
    _currentLocale = locale;
    await loadLocale(locale);
    notifyListeners();
  }

  /// Load translations for a specific locale from assets or fallback
  Future<void> loadLocale(String locale) async {
    _isLoading = true;
    notifyListeners();

    try {
      // Try to load dynamic JSON file from assets
      final jsonString = await rootBundle.loadString('assets/i18n/$locale.json');
      _translations = jsonDecode(jsonString) as Map<String, dynamic>;
      debugPrint('[i18n] Loaded locale asset: $locale');
    } catch (e) {
      debugPrint('[i18n] Note: Asset "assets/i18n/$locale.json" not found. Using memory fallback.');
      _translations = Map<String, dynamic>.from(_fallbackTranslations[locale] ?? _fallbackTranslations['vi']!);
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  /// Translate a key with optional dynamic arguments
  String translate(String key, {Map<String, String>? args}) {
    // Traverse nested json path e.g. "common.save"
    dynamic value = _translations;
    final keys = key.split('.');
    
    for (final k in keys) {
      if (value is Map && value.containsKey(k)) {
        value = value[k];
      } else {
        // Fallback value from memory if not in loaded JSON
        final fallbackMap = _fallbackTranslations[_currentLocale] ?? _fallbackTranslations['vi']!;
        value = fallbackMap[key] ?? key;
        break;
      }
    }

    if (value is! String) {
      value = key;
    }

    String result = value;
    if (args != null) {
      args.forEach((k, v) {
        result = result.replaceAll('{$k}', v);
      });
    }

    return result;
  }
}

/// Extension helper to allow `'key'.tr()` syntax in widgets
extension I18nStringExtension on String {
  String tr({Map<String, String>? args}) {
    return I18nService.instance.translate(this, args: args);
  }
}
