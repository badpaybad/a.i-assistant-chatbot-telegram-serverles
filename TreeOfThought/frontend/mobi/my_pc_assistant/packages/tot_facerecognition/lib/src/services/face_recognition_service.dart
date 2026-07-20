import 'dart:io';
import 'dart:math' as math;
import 'dart:typed_data';

import 'package:flutter/services.dart';
import 'package:image/image.dart' as img;
import 'package:onnxruntime/onnxruntime.dart';

import '../models/face_detection_result.dart';
import 'model_loader_service.dart';

/// Service chính xử lý toàn bộ pipeline face recognition:
/// Detection (det_10g) → AlignFace → Embed (resnet100) → Compare
class FaceRecognitionService {
  static final FaceRecognitionService _instance = FaceRecognitionService._();
  static FaceRecognitionService get instance => _instance;
  FaceRecognitionService._();

  OrtSession? _detSession;
  OrtSession? _recSession;

  bool _isInitialized = false;
  bool get isInitialized => _isInitialized;

  /// Embedding của người dùng đang đăng nhập (từ ảnh cccd.jpg)
  Float32List? _userEmbedding;

  // Tham số det model (RetinaFace det_10g)
  static const int _detInputSize = 640;
  static const List<int> _featStrides = [8, 16, 32];
  static const int _numAnchors = 2;
  static const double _detThresh = 0.20;
  static const double _nmsThresh = 0.4;

  // Tham số rec model (ArcFace resnet100)
  static const int _recInputSize = 112;

  /// Điểm tham chiếu 5 kps để align face (từ InsightFaceHelper.cs)
  static const List<List<double>> _refPoints = [
    [38.2946, 51.6963], // Left Eye
    [73.5318, 51.5014], // Right Eye
    [56.0252, 71.7366], // Nose
    [41.5493, 92.3655], // Left Mouth Corner
    [70.7299, 92.2041], // Right Mouth Corner
  ];

  /// Khởi tạo sessions và tính embedding người dùng
  Future<void> initialize(ModelLoaderService loader) async {
    OrtEnv.instance.init();
    final sessionOptions = OrtSessionOptions();

    _detSession = OrtSession.fromFile(File(loader.detModelPath), sessionOptions);
    _recSession = OrtSession.fromFile(File(loader.recModelPath), sessionOptions);

    // Tính embedding cho ảnh gốc của user (cccd.jpg)
    await _initUserEmbedding();

    _isInitialized = true;
  }

  Future<void> _initUserEmbedding() async {
    try {
      final bytes = await rootBundle
          .load('packages/tot_facerecognition/assets/faces/user_cccd.jpg');
      final imageBytes = bytes.buffer.asUint8List();
      final image = img.decodeImage(imageBytes);
      if (image == null) {
        print('[FaceRecognition] Cannot decode user_cccd.jpg image');
        return;
      }

      final faces = await detectFaces(image);
      print('[FaceRecognition] User CCCD image detected ${faces.length} faces');
      if (faces.isEmpty) return;

      _userEmbedding = await _extractEmbedding(image, faces.first);
      print('[FaceRecognition] User CCCD embedding extracted successfully');
    } catch (e, st) {
      print('[FaceRecognition] Error initializing user embedding: $e\n$st');
    }
  }

  /// Xử lý một frame: detect → embed → compare → trả về danh sách FaceDetectionResult
  Future<List<FaceDetectionResult>> processFrame(img.Image frame) async {
    if (!_isInitialized) return [];

    final rawFaces = await detectFaces(frame);
    final results = <FaceDetectionResult>[];

    for (final face in rawFaces) {
      final embedding = await _extractEmbedding(frame, face);
      double? score;
      if (_userEmbedding != null && embedding != null) {
        score = _cosineSimilarity(_userEmbedding!, embedding);
      }
      results.add(face.copyWith(embedding: embedding, similarityScore: score));
    }
    return results;
  }

  // ─────────────────────────────────────────────────────────
  // 1. DETECTION (det_10g.onnx)
  // ─────────────────────────────────────────────────────────

  Future<List<FaceDetectionResult>> detectFaces(img.Image src) async {
    final int srcW = src.width;
    final int srcH = src.height;

    // Scale to fit 640x640 giống InsightFaceHelper.cs
    final double imRatio = srcH / srcW;
    const double modelRatio = 1.0; // 640/640
    int newW, newH;
    if (imRatio > modelRatio) {
      newH = _detInputSize;
      newW = (newH / imRatio).round();
    } else {
      newW = _detInputSize;
      newH = (newW * imRatio).round();
    }
    final double detScale = newH / srcH;

    // Resize image
    final resized = img.copyResize(src, width: newW, height: newH,
        interpolation: img.Interpolation.linear);

    // Prepare 640x640 float tensor input (NCHW format, RGB order, (pixel-127.5)/128.0)
    final inputData = Float32List(1 * 3 * _detInputSize * _detInputSize);
    const double bgVal = -127.5 / 128.0;
    inputData.fillRange(0, inputData.length, bgVal);

    final int planeSize = _detInputSize * _detInputSize;
    for (int y = 0; y < newH; y++) {
      for (int x = 0; x < newW; x++) {
        final pixel = resized.getPixel(x, y);
        final int offset = y * _detInputSize + x;
        inputData[offset] = (pixel.r.toDouble() - 127.5) / 128.0;
        inputData[planeSize + offset] = (pixel.g.toDouble() - 127.5) / 128.0;
        inputData[2 * planeSize + offset] = (pixel.b.toDouble() - 127.5) / 128.0;
      }
    }

    final inputName = _detSession!.inputNames.first;
    final inputTensor = OrtValueTensor.createTensorWithDataList(
      inputData,
      [1, 3, _detInputSize, _detInputSize],
    );

    final runOptions = OrtRunOptions();
    final outputs = _detSession!.run(runOptions, {inputName: inputTensor});
    inputTensor.release();
    runOptions.release();

    // Map outputs theo shape (anchors, content_size) giống C#
    // strideIdx: 12800→0, 3200→1, 800→2
    // typeIdx: 1→score, 4→bbox, 10→kps
    final Map<int, Map<int, List<dynamic>>> mappedOutputs = {};

    for (final ortValue in outputs) {
      if (ortValue == null) continue;
      final tensor = ortValue as OrtValueTensor;
      final rawValue = tensor.value;
      if (rawValue == null) { tensor.release(); continue; }

      // ONNX Runtime returns 3D shape [1, N, C] -> unwrap batch dimension to [N, C]
      List data = rawValue as List;
      if (data.length == 1 && data.first is List) {
        data = data.first as List;
      }

      final anchorNum = data.length;
      final contentSize = (data.isNotEmpty && data[0] is List)
          ? (data[0] as List).length
          : 1;

      int strideIdx = -1;
      if (anchorNum == 12800) strideIdx = 0;
      else if (anchorNum == 3200) strideIdx = 1;
      else if (anchorNum == 800) strideIdx = 2;

      int typeIdx = -1;
      if (contentSize == 1) typeIdx = 0;       // score
      else if (contentSize == 4) typeIdx = 1;  // bbox
      else if (contentSize == 10) typeIdx = 2; // kps

      if (strideIdx != -1 && typeIdx != -1) {
        mappedOutputs.putIfAbsent(strideIdx, () => {})[typeIdx] = data;
      }
      tensor.release();
    }

    final candidates = <FaceDetectionResult>[];

    double maxScore = 0.0;
    for (int s = 0; s < _featStrides.length; s++) {
      final strideMap = mappedOutputs[s];
      if (strideMap == null) continue;
      final scoreData = strideMap[0];
      final bboxData = strideMap[1];
      final kpsData = strideMap[2];
      if (scoreData == null || bboxData == null || kpsData == null) continue;

      final stride = _featStrides[s];
      final gridH = _detInputSize ~/ stride;
      final gridW = _detInputSize ~/ stride;
      final anchorCenters = _getAnchorCenters(gridH, gridW, stride);

      for (int i = 0; i < anchorCenters.length; i++) {
        final scoreRow = scoreData[i];
        final double score = (scoreRow is List ? (scoreRow[0] as num).toDouble() : (scoreRow as num).toDouble());
        if (score > maxScore) maxScore = score;
        if (score < _detThresh) continue;

        final pt = anchorCenters[i];
        final bbox = bboxData[i] as List;

        final dLeft   = (bbox[0] as num).toDouble() * stride;
        final dTop    = (bbox[1] as num).toDouble() * stride;
        final dRight  = (bbox[2] as num).toDouble() * stride;
        final dBottom = (bbox[3] as num).toDouble() * stride;

        double x1 = (pt[0] - dLeft) / detScale;
        double y1 = (pt[1] - dTop) / detScale;
        double x2 = (pt[0] + dRight) / detScale;
        double y2 = (pt[1] + dBottom) / detScale;

        x1 = x1.clamp(0, srcW.toDouble());
        y1 = y1.clamp(0, srcH.toDouble());
        x2 = x2.clamp(0, srcW.toDouble());
        y2 = y2.clamp(0, srcH.toDouble());

        final kpsRow = kpsData[i] as List;
        final kps = <List<double>>[];
        for (int k = 0; k < 5; k++) {
          final dx = (kpsRow[k * 2] as num).toDouble() * stride;
          final dy = (kpsRow[k * 2 + 1] as num).toDouble() * stride;
          final kx = ((pt[0] + dx) / detScale).clamp(0, srcW.toDouble());
          final ky = ((pt[1] + dy) / detScale).clamp(0, srcH.toDouble());
          kps.add([kx.toDouble(), ky.toDouble()]);
        }

        candidates.add(FaceDetectionResult(
          bbox: [x1, y1, x2 - x1, y2 - y1],
          keypoints: kps,
          detectionScore: score,
        ));
      }
    }

    print('[FaceRecognition] Max anchor score: $maxScore, candidates above threshold: ${candidates.length}');
    final finalFaces = _nms(candidates, _nmsThresh);
    if (finalFaces.isNotEmpty) {
      print('[FaceRecognition] DETECTED ${finalFaces.length} faces! (candidates: ${candidates.length})');
    }
    return finalFaces;
  }

  // ─────────────────────────────────────────────────────────
  // 2. EMBEDDING (resnet100.onnx)
  // ─────────────────────────────────────────────────────────

  Future<Float32List?> _extractEmbedding(
      img.Image src, FaceDetectionResult face) async {
    final aligned = _alignFace(src, face.keypoints);
    if (aligned == null) return null;
    return await _vectorFace(aligned);
  }

  /// Affine warp khuôn mặt về chuẩn 112x112 theo 5 keypoints
  img.Image? _alignFace(img.Image src, List<List<double>> kps) {
    if (kps.length < 5) return null;
    final transform = _estimateAffinePartial2D(kps, _refPoints);
    if (transform == null) return null;
    return _warpAffine(src, transform, _recInputSize, _recInputSize);
  }

  /// Tính embedding 512-dim và normalize L2
  Future<Float32List?> _vectorFace(img.Image aligned) async {
    // resnet100: raw pixel 0-255, BGR order (theo code C# gốc)
    final inputData = Float32List(1 * 3 * _recInputSize * _recInputSize);
    for (int y = 0; y < _recInputSize; y++) {
      for (int x = 0; x < _recInputSize; x++) {
        final pixel = aligned.getPixel(x, y);
        inputData[0 * _recInputSize * _recInputSize + y * _recInputSize + x] =
            pixel.b.toDouble(); // channel 0 = Blue
        inputData[1 * _recInputSize * _recInputSize + y * _recInputSize + x] =
            pixel.g.toDouble(); // channel 1 = Green
        inputData[2 * _recInputSize * _recInputSize + y * _recInputSize + x] =
            pixel.r.toDouble(); // channel 2 = Red
      }
    }

    final inputName = _recSession!.inputNames.first;
    final inputTensor = OrtValueTensor.createTensorWithDataList(
      inputData,
      [1, 3, _recInputSize, _recInputSize],
    );

    final runOptions = OrtRunOptions();
    final outputs = _recSession!.run(runOptions, {inputName: inputTensor});
    inputTensor.release();
    runOptions.release();

    final outValue = outputs.firstOrNull;
    if (outValue == null) return null;

    final rawData = (outValue as OrtValueTensor).value;
    outValue.release();
    if (rawData == null) return null;

    final flatList = (rawData is List && rawData.isNotEmpty && rawData.first is List)
        ? (rawData.first as List)
        : rawData as List;
    final embedding = Float32List(flatList.length);
    double norm = 0.0;
    for (int i = 0; i < flatList.length; i++) {
      final v = (flatList[i] as num).toDouble();
      embedding[i] = v;
      norm += v * v;
    }
    norm = math.sqrt(norm);
    if (norm > 0) {
      for (int i = 0; i < embedding.length; i++) {
        embedding[i] = embedding[i] / norm;
      }
    }
    return embedding;
  }

  // ─────────────────────────────────────────────────────────
  // COMPARE
  // ─────────────────────────────────────────────────────────

  double _cosineSimilarity(Float32List v1, Float32List v2) {
    if (v1.length != v2.length) return 0.0;
    double dot = 0.0;
    for (int i = 0; i < v1.length; i++) {
      dot += v1[i] * v2[i];
    }
    return dot.clamp(-1.0, 1.0);
  }

  // ─────────────────────────────────────────────────────────
  // HELPERS
  // ─────────────────────────────────────────────────────────

  List<List<double>> _getAnchorCenters(int gridH, int gridW, int stride) {
    final centers = <List<double>>[];
    for (int y = 0; y < gridH; y++) {
      for (int x = 0; x < gridW; x++) {
        final px = (x * stride).toDouble();
        final py = (y * stride).toDouble();
        for (int a = 0; a < _numAnchors; a++) {
          centers.add([px, py]);
        }
      }
    }
    return centers;
  }

  List<FaceDetectionResult> _nms(
      List<FaceDetectionResult> candidates, double threshold) {
    final sorted = List.of(candidates)
      ..sort((a, b) => b.detectionScore.compareTo(a.detectionScore));
    final suppressed = List.filled(sorted.length, false);
    final keep = <FaceDetectionResult>[];

    for (int i = 0; i < sorted.length; i++) {
      if (suppressed[i]) continue;
      keep.add(sorted[i]);
      for (int j = i + 1; j < sorted.length; j++) {
        if (!suppressed[j] &&
            _iou(sorted[i].bbox, sorted[j].bbox) > threshold) {
          suppressed[j] = true;
        }
      }
    }
    return keep;
  }

  double _iou(List<double> a, List<double> b) {
    final ax1 = a[0], ay1 = a[1], ax2 = a[0] + a[2], ay2 = a[1] + a[3];
    final bx1 = b[0], by1 = b[1], bx2 = b[0] + b[2], by2 = b[1] + b[3];

    final ix1 = math.max(ax1, bx1);
    final iy1 = math.max(ay1, by1);
    final ix2 = math.min(ax2, bx2);
    final iy2 = math.min(ay2, by2);

    final interW = math.max(0.0, ix2 - ix1);
    final interH = math.max(0.0, iy2 - iy1);
    final inter = interW * interH;

    final areaA = a[2] * a[3];
    final areaB = b[2] * b[3];
    final union = areaA + areaB - inter;
    if (union <= 0) return 0.0;
    return inter / union;
  }

  /// Estimate affine partial 2D (least-squares fit of similarity transform)
  List<List<double>>? _estimateAffinePartial2D(
      List<List<double>> src, List<List<double>> dst) {
    final n = src.length;
    if (n < 2) return null;

    double sXX = 0, sX = 0, sY = 0;
    double sdXX = 0, sdXY = 0, sdX = 0, sdY = 0;

    for (int i = 0; i < n; i++) {
      final x = src[i][0], y = src[i][1];
      final dx = dst[i][0], dy = dst[i][1];
      sXX += x * x + y * y;
      sX += x;
      sY += y;
      sdXX += dx * x + dy * y;
      sdXY += dx * y - dy * x;
      sdX += dx;
      sdY += dy;
    }

    final det = sXX * n - sX * sX - sY * sY;
    if (det.abs() < 1e-10) return null;

    final a = (sdXX * n - sdX * sX - sdY * sY) / det;
    final b = (sdXY * n + sdY * sX - sdX * sY) / det;
    final tx = (sdX - a * sX + b * sY) / n;
    final ty = (sdY - b * sX - a * sY) / n;

    return [
      [a, -b, tx],
      [b, a, ty],
    ];
  }

  /// Inverse warp affine: dst(dx,dy) = M * src(sx,sy)  →  src = M^-1 * dst
  img.Image _warpAffine(
      img.Image src, List<List<double>> M, int dstW, int dstH) {
    final dst = img.Image(width: dstW, height: dstH);
    final a = M[0][0], b_ = M[0][1], tx = M[0][2];
    final c = M[1][0], d = M[1][1], ty = M[1][2];
    final det = a * d - b_ * c;
    if (det.abs() < 1e-10) return dst;
    final ia = d / det, ib = -b_ / det;
    final ic = -c / det, id_ = a / det;

    for (int dy = 0; dy < dstH; dy++) {
      for (int dx = 0; dx < dstW; dx++) {
        final nx = dx - tx;
        final ny = dy - ty;
        final sx = (ia * nx + ib * ny).round();
        final sy = (ic * nx + id_ * ny).round();
        if (sx >= 0 && sx < src.width && sy >= 0 && sy < src.height) {
          dst.setPixel(dx, dy, src.getPixel(sx, sy));
        }
      }
    }
    return dst;
  }

  void dispose() {
    _detSession?.release();
    _recSession?.release();
    _detSession = null;
    _recSession = null;
    _isInitialized = false;
  }
}
