import 'dart:io';
import 'package:flutter/services.dart';
import 'package:path/path.dart' as p;
import 'package:path_provider/path_provider.dart';

/// Service chịu trách nhiệm copy ONNX model từ Flutter assets ra file system
/// để OnnxRuntime có thể đọc từ đường dẫn tuyệt đối.
class ModelLoaderService {
  static const String _modelsDir = 'tot_facerecognition_models';

  static const String _detModelAsset =
      'packages/tot_facerecognition/assets/models/det_10g.onnx';
  static const String _lmkModelAsset =
      'packages/tot_facerecognition/assets/models/2d106det.onnx';
  static const String _recModelAsset =
      'packages/tot_facerecognition/assets/models/resnet100.onnx';
  static const String _userFaceAsset =
      'packages/tot_facerecognition/assets/faces/user_cccd.jpg';

  String? _detModelPath;
  String? _lmkModelPath;
  String? _recModelPath;
  String? _userFacePath;

  bool _isLoaded = false;

  bool get isLoaded => _isLoaded;
  String get detModelPath => _detModelPath!;
  String get lmkModelPath => _lmkModelPath!;
  String get recModelPath => _recModelPath!;
  String get userFacePath => _userFacePath!;

  /// Copy tất cả assets ra file system nếu chưa tồn tại.
  /// Trả về true khi thành công.
  Future<bool> loadModels({void Function(String)? onProgress}) async {
    try {
      final appDir = await getApplicationDocumentsDirectory();
      final modelsDir = Directory(p.join(appDir.path, _modelsDir));
      if (!await modelsDir.exists()) {
        await modelsDir.create(recursive: true);
      }

      _detModelPath = await _copyAssetIfNeeded(
        _detModelAsset, modelsDir.path, 'det_10g.onnx', onProgress);
      _lmkModelPath = await _copyAssetIfNeeded(
        _lmkModelAsset, modelsDir.path, '2d106det.onnx', onProgress);
      _recModelPath = await _copyAssetIfNeeded(
        _recModelAsset, modelsDir.path, 'resnet100.onnx', onProgress);
      _userFacePath = await _copyAssetIfNeeded(
        _userFaceAsset, modelsDir.path, 'user_cccd.jpg', onProgress);

      _isLoaded = true;
      return true;
    } catch (e) {
      _isLoaded = false;
      return false;
    }
  }

  /// Copy asset ra file system. Nếu file đã tồn tại và không rỗng thì bỏ qua.
  Future<String> _copyAssetIfNeeded(
    String assetPath,
    String destDir,
    String filename,
    void Function(String)? onProgress,
  ) async {
    final destFile = File(p.join(destDir, filename));
    if (await destFile.exists() && await destFile.length() > 0) {
      onProgress?.call('$filename đã sẵn sàng');
      return destFile.path;
    }

    onProgress?.call('Đang copy $filename...');
    final data = await rootBundle.load(assetPath);
    final bytes = data.buffer.asUint8List();
    await destFile.writeAsBytes(bytes, flush: true);
    onProgress?.call('$filename đã copy xong (${(bytes.length / 1024 / 1024).toStringAsFixed(1)} MB)');
    return destFile.path;
  }
}
