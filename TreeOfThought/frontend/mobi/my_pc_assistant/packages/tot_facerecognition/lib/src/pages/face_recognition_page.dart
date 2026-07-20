import 'dart:async';
import 'dart:io';
import 'dart:typed_data';

import 'package:camera/camera.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:image/image.dart' as img;
import 'package:permission_handler/permission_handler.dart';

import '../models/face_detection_result.dart';
import '../services/face_recognition_service.dart';
import '../services/model_loader_service.dart';
import '../widgets/camera_bbox_painter.dart';
import '../widgets/face_score_overlay.dart';

/// Màn hình nhận diện khuôn mặt thời gian thực.
/// Hiển thị camera stream + bbox overlay + score so sánh với ảnh CCCD.
class FaceRecognitionPage extends StatefulWidget {
  const FaceRecognitionPage({super.key});

  @override
  State<FaceRecognitionPage> createState() => _FaceRecognitionPageState();
}

class _FaceRecognitionPageState extends State<FaceRecognitionPage>
    with WidgetsBindingObserver {
  // ─── State ───
  List<CameraDescription> _cameras = [];
  CameraController? _cameraController;
  bool _isFrontCamera = true;
  int _cameraIndex = 0;

  // Model loading
  final ModelLoaderService _modelLoader = ModelLoaderService();
  final FaceRecognitionService _faceService = FaceRecognitionService.instance;

  _PageStatus _status = _PageStatus.loading;
  String _statusMessage = 'Đang khởi động...';
  String? _errorMessage;

  // Detection results
  List<FaceDetectionResult> _detectedFaces = [];
  Size _imageSize = const Size(640, 480);
  bool _isProcessing = false;

  // Throttle: chỉ process 1 frame mỗi 200ms
  DateTime _lastFrameTime = DateTime.fromMillisecondsSinceEpoch(0);
  static const Duration _frameInterval = Duration(milliseconds: 50);

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    _initAll();
  }

  // ─── Init ───

  Future<void> _initAll() async {
    await _requestCameraPermission();
    await _loadModels();
  }

  Future<void> _requestCameraPermission() async {
    final status = await Permission.camera.request();
    if (!status.isGranted && mounted) {
      setState(() {
        _status = _PageStatus.error;
        _errorMessage = 'Cần cấp quyền camera để sử dụng tính năng này.';
      });
    }
  }

  Future<void> _loadModels() async {
    if (!mounted) return;
    setState(() {
      _status = _PageStatus.loading;
      _statusMessage = 'Đang chuẩn bị mô hình AI...';
    });

    final success = await _modelLoader.loadModels(
      onProgress: (msg) {
        if (mounted) setState(() => _statusMessage = msg);
      },
    );

    if (!success || !mounted) {
      setState(() {
        _status = _PageStatus.error;
        _errorMessage = 'Không thể tải mô hình. Vui lòng thử lại.';
      });
      return;
    }

    setState(() => _statusMessage = 'Đang khởi tạo ONNX sessions...');

    try {
      await _faceService.initialize(_modelLoader);
    } catch (e) {
      if (mounted) {
        setState(() {
          _status = _PageStatus.error;
          _errorMessage = 'Lỗi khởi tạo AI: $e';
        });
      }
      return;
    }

    await _initCamera();
  }

  Future<void> _initCamera() async {
    try {
      _cameras = await availableCameras();
      if (_cameras.isEmpty) {
        setState(() {
          _status = _PageStatus.error;
          _errorMessage = 'Không tìm thấy camera.';
        });
        return;
      }

      // Tìm camera trước
      _cameraIndex = _cameras.indexWhere(
        (c) => c.lensDirection == CameraLensDirection.front,
      );
      if (_cameraIndex == -1) _cameraIndex = 0;
      _isFrontCamera = _cameras[_cameraIndex].lensDirection == CameraLensDirection.front;

      await _startCamera(_cameras[_cameraIndex]);
    } catch (e) {
      if (mounted) {
        setState(() {
          _status = _PageStatus.error;
          _errorMessage = 'Lỗi khởi động camera: $e';
        });
      }
    }
  }

  Future<void> _startCamera(CameraDescription camera) async {
    final prev = _cameraController;
    if (prev != null) {
      await prev.stopImageStream();
      await prev.dispose();
    }

    final controller = CameraController(
      camera,
      ResolutionPreset.medium, // Native 720p/480p hardware supported stream
      enableAudio: false,
      imageFormatGroup: Platform.isAndroid
          ? ImageFormatGroup.yuv420
          : ImageFormatGroup.bgra8888,
    );

    await controller.initialize();
    if (!mounted) return;

    _cameraController = controller;
    _imageSize = Size(
      controller.value.previewSize!.height, // landscape swap (portrait)
      controller.value.previewSize!.width,
    );

    setState(() => _status = _PageStatus.ready);

    controller.startImageStream(_onCameraFrame);
  }

  // ─── Frame processing ───

  void _onCameraFrame(CameraImage cameraImage) {
    final now = DateTime.now();
    if (now.difference(_lastFrameTime) < _frameInterval) return;
    if (_isProcessing) return;
    _lastFrameTime = now;
    _isProcessing = true;

    _processFrameAsync(cameraImage);
  }

  Future<void> _processFrameAsync(CameraImage cameraImage) async {
    try {
      final image = _convertCameraImageSync(cameraImage);
      if (image == null) return;

      final faces = await _faceService.processFrame(image);
      if (mounted) {
        setState(() => _detectedFaces = faces);
      }
    } catch (e, st) {
      print('[FaceRecognitionPage] Frame processing error: $e\n$st');
    } finally {
      _isProcessing = false;
    }
  }

  img.Image? _convertCameraImageSync(CameraImage cameraImage) {
    if (Platform.isAndroid) {
      return _convertYuv420Sync(cameraImage);
    } else {
      return img.Image.fromBytes(
        width: cameraImage.width,
        height: cameraImage.height,
        bytes: cameraImage.planes[0].bytes.buffer,
        format: img.Format.uint8,
        numChannels: 4,
        order: img.ChannelOrder.bgra,
      );
    }
  }

  img.Image _convertYuv420Sync(CameraImage image) {
    final int srcW = image.width;
    final int srcH = image.height;

    final yPlane = image.planes[0].bytes;
    final uPlane = image.planes[1].bytes;
    final vPlane = image.planes[2].bytes;

    final int yRowStride = image.planes[0].bytesPerRow;
    final int uRowStride = image.planes[1].bytesPerRow;
    final int uPixelStride = image.planes[1].bytesPerPixel ?? 1;
    final int vRowStride = image.planes[2].bytesPerRow;
    final int vPixelStride = image.planes[2].bytesPerPixel ?? 1;

    final int outW = srcH;
    final int outH = srcW;
    final out = img.Image(width: outW, height: outH);

    for (int y = 0; y < srcH; y++) {
      final int yRowOffset = y * yRowStride;
      final int uvY = y ~/ 2;
      final int uRowOffset = uvY * uRowStride;
      final int vRowOffset = uvY * vRowStride;

      for (int x = 0; x < srcW; x++) {
        final int uvX = x ~/ 2;
        final int Y = yPlane[yRowOffset + x];
        final int uIdx = uRowOffset + uvX * uPixelStride;
        final int vIdx = vRowOffset + uvX * vPixelStride;

        final int U = uIdx < uPlane.length ? uPlane[uIdx] : 128;
        final int V = vIdx < vPlane.length ? vPlane[vIdx] : 128;

        int r = (Y + 1.402 * (V - 128)).clamp(0, 255).toInt();
        int g = (Y - 0.344 * (U - 128) - 0.714 * (V - 128)).clamp(0, 255).toInt();
        int b = (Y + 1.772 * (U - 128)).clamp(0, 255).toInt();

        int dstX, dstY;
        if (_isFrontCamera) {
          // Front camera (selfie mirror view alignment)
          dstX = y;
          dstY = srcW - 1 - x;
        } else {
          // Back camera (90° CW portrait alignment)
          dstX = srcH - 1 - y;
          dstY = x;
        }
        out.setPixelRgb(dstX, dstY, r, g, b);
      }
    }
    return out;
  }

  // ─── Camera flip ───

  Future<void> _flipCamera() async {
    if (_cameras.length < 2) return;
    _cameraIndex = (_cameraIndex + 1) % _cameras.length;
    _isFrontCamera = _cameras[_cameraIndex].lensDirection == CameraLensDirection.front;
    setState(() {
      _detectedFaces = [];
      _status = _PageStatus.loading;
      _statusMessage = 'Đang chuyển camera...';
    });
    await _startCamera(_cameras[_cameraIndex]);
  }

  // ─── Build ───

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Stack(
        fit: StackFit.expand,
        children: [
          // 1. Camera Preview hoặc loading/error
          _buildCameraLayer(),

          // 2. Top bar (safe area)
          Positioned(
            top: 0, left: 0, right: 0,
            child: SafeArea(child: _buildTopBar(context)),
          ),

          // 3. Bottom info panel
          Positioned(
            bottom: 0, left: 0, right: 0,
            child: SafeArea(
              top: false,
              child: FaceScoreOverlay(
                faces: _detectedFaces,
                isProcessing: _isProcessing,
              ),
            ),
          ),
        ],
      ),

      // FAB chuyển camera
      floatingActionButton: _status == _PageStatus.ready
          ? FloatingActionButton(
              heroTag: 'camera_flip',
              onPressed: _flipCamera,
              backgroundColor: Colors.white.withOpacity(0.15),
              foregroundColor: Colors.white,
              elevation: 0,
              child: Icon(
                _isFrontCamera ? Icons.camera_rear : Icons.camera_front,
                size: 28,
              ),
            )
          : null,
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
    );
  }

  Widget _buildCameraLayer() {
    if (_status == _PageStatus.error) {
      return _ErrorView(message: _errorMessage ?? 'Lỗi không xác định');
    }
    if (_status == _PageStatus.loading || _cameraController == null) {
      return _LoadingView(message: _statusMessage);
    }

    return LayoutBuilder(
      builder: (context, constraints) {
        final screenWidth = constraints.maxWidth;
        final screenHeight = constraints.maxHeight;
        final isPortrait = screenHeight >= screenWidth;

        // Tỷ lệ camera ở dạng Portrait: height / width (ví dụ 720 / 480 = 1.5)
        final cameraAspectRatio = _cameraController!.value.previewSize!.width /
            _cameraController!.value.previewSize!.height;

        double previewW, previewH;
        if (isPortrait) {
          // Khi để đứng: fit theo độ rộng màn hình
          previewW = screenWidth;
          previewH = previewW * cameraAspectRatio;
        } else {
          // Khi để ngang: fit theo độ cao màn hình
          previewH = screenHeight;
          previewW = previewH * cameraAspectRatio;
        }

        final previewSize = Size(previewW, previewH);

        return Center(
          child: SizedBox(
            width: previewW,
            height: previewH,
            child: Stack(
              fit: StackFit.expand,
              children: [
                // 1. Camera preview chính xác tỷ lệ, không bị co giãn
                ClipRect(
                  child: Transform(
                    alignment: Alignment.center,
                    transform: _isFrontCamera
                        ? (Matrix4.identity()..scale(-1.0, 1.0))
                        : Matrix4.identity(),
                    child: CameraPreview(_cameraController!),
                  ),
                ),

                // 2. Bbox overlay vẽ đè trực tiếp lên camera view (tỷ lệ 1:1)
                CustomPaint(
                  painter: CameraBboxPainter(
                    faces: _detectedFaces,
                    imageSize: _imageSize,
                    previewSize: previewSize,
                    isFrontCamera: _isFrontCamera,
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildTopBar(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [Colors.black87, Colors.transparent],
        ),
      ),
      child: Row(
        children: [
          IconButton(
            icon: const Icon(Icons.arrow_back_ios_new, color: Colors.white),
            onPressed: () => Navigator.of(context).pop(),
          ),
          const Expanded(
            child: Text(
              'Face Recognition',
              style: TextStyle(
                color: Colors.white,
                fontSize: 18,
                fontWeight: FontWeight.bold,
                letterSpacing: 0.5,
              ),
              textAlign: TextAlign.center,
            ),
          ),
          // Indicator: camera trước/sau
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            decoration: BoxDecoration(
              color: Colors.white12,
              borderRadius: BorderRadius.circular(12),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(
                  _isFrontCamera ? Icons.camera_front : Icons.camera_rear,
                  color: Colors.white70,
                  size: 16,
                ),
                const SizedBox(width: 4),
                Text(
                  _isFrontCamera ? 'Front' : 'Back',
                  style: const TextStyle(color: Colors.white70, fontSize: 12),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // ─── Lifecycle ───

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (_cameraController == null) return;
    if (state == AppLifecycleState.inactive) {
      _cameraController?.stopImageStream();
    } else if (state == AppLifecycleState.resumed &&
        _status == _PageStatus.ready) {
      _cameraController?.startImageStream(_onCameraFrame);
    }
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    _cameraController?.stopImageStream();
    _cameraController?.dispose();
    _faceService.dispose();
    super.dispose();
  }
}

class _YuvArgs {
  final Uint8List yBytes;
  final Uint8List uBytes;
  final Uint8List vBytes;
  final int width;
  final int height;
  final int uvRowStride;
  final int uvPixelStride;
  final bool isFrontCamera;

  _YuvArgs({
    required this.yBytes,
    required this.uBytes,
    required this.vBytes,
    required this.width,
    required this.height,
    required this.uvRowStride,
    required this.uvPixelStride,
    required this.isFrontCamera,
  });
}

/// Convert YUV420 sang img.Image theo chiều xoay Portrait ở Isolate riêng (compute)
img.Image _convertYuv420Background(_YuvArgs args) {
  final int srcW = args.width;
  final int srcH = args.height;
  final int uvRowStride = args.uvRowStride;
  final int uvPixelStride = args.uvPixelStride;
  final yPlane = args.yBytes;
  final uPlane = args.uBytes;
  final vPlane = args.vBytes;

  final int outW = srcH;
  final int outH = srcW;
  final out = img.Image(width: outW, height: outH);
  final bool rotate270 = args.isFrontCamera;

  for (int y = 0; y < srcH; y++) {
    final int yRowOffset = y * srcW;
    final int uvRowOffset = (y ~/ 2) * uvRowStride;

    for (int x = 0; x < srcW; x++) {
      final Y = yPlane[yRowOffset + x];
      final uvIdx = uvRowOffset + (x ~/ 2) * uvPixelStride;
      final U = uPlane[uvIdx];
      final V = vPlane[uvIdx];

      int r = (Y + 1.402 * (V - 128)).clamp(0, 255).toInt();
      int g = (Y - 0.344 * (U - 128) - 0.714 * (V - 128)).clamp(0, 255).toInt();
      int b = (Y + 1.772 * (U - 128)).clamp(0, 255).toInt();

      int dstX, dstY;
      if (rotate270) {
        dstX = y;
        dstY = srcW - 1 - x;
      } else {
        dstX = srcH - 1 - y;
        dstY = x;
      }
      out.setPixelRgb(dstX, dstY, r, g, b);
    }
  }
  return out;
}

// ─── Enums & helper widgets ───

enum _PageStatus { loading, ready, error }

class _LoadingView extends StatelessWidget {
  final String message;
  const _LoadingView({required this.message});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const CircularProgressIndicator(color: Colors.white54),
          const SizedBox(height: 16),
          Text(
            message,
            style: const TextStyle(color: Colors.white70, fontSize: 14),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}

class _ErrorView extends StatelessWidget {
  final String message;
  const _ErrorView({required this.message});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.error_outline, color: Colors.redAccent, size: 48),
            const SizedBox(height: 16),
            Text(
              message,
              style: const TextStyle(color: Colors.white70, fontSize: 14),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 24),
            TextButton.icon(
              onPressed: () => Navigator.of(context).pop(),
              icon: const Icon(Icons.arrow_back, color: Colors.white54),
              label: const Text('Quay lại', style: TextStyle(color: Colors.white54)),
            ),
          ],
        ),
      ),
    );
  }
}
