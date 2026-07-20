import 'dart:async';
import 'dart:io';
import 'dart:isolate';
import 'dart:math' as math;
import 'dart:typed_data';

import 'package:flutter/services.dart';
import 'package:image/image.dart' as img;
import 'package:onnxruntime/onnxruntime.dart';

import '../models/face_detection_result.dart';
import 'model_loader_service.dart';

// ─────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────

const int _detInputSize = 640;
const List<int> _featStrides = [8, 16, 32];
const int _numAnchors = 2;
const double _detThresh = 0.15;
const double _nmsThresh = 0.4;
const int _recInputSize = 112;

const List<List<double>> _refPoints = [
  [38.2946, 51.6963], // Left Eye
  [73.5318, 51.5014], // Right Eye
  [56.0252, 71.7366], // Nose
  [41.5493, 92.3655], // Left Mouth Corner
  [70.7299, 92.2041], // Right Mouth Corner
];

// ─────────────────────────────────────────────────────────
// ISOLATE MESSAGES
// ─────────────────────────────────────────────────────────

class _InitDetMessage {
  final String modelPath;
  final SendPort replyPort;
  _InitDetMessage(this.modelPath, this.replyPort);
}

class _ProcessDetMessage {
  final img.Image image;
  final SendPort replyPort;
  _ProcessDetMessage(this.image, this.replyPort);
}

class _InitRecMessage {
  final String recModelPath;
  final String detModelPath;
  final Uint8List userFaceBytes;
  final SendPort replyPort;
  _InitRecMessage(
      this.recModelPath, this.detModelPath, this.userFaceBytes, this.replyPort);
}

class _ProcessRecMessage {
  final img.Image image;
  final List<FaceDetectionResult> detectedFaces;
  final SendPort replyPort;
  _ProcessRecMessage(this.image, this.detectedFaces, this.replyPort);
}

// ─────────────────────────────────────────────────────────
// MAIN SERVICE CLASS (UI THREAD MANAGER)
// ─────────────────────────────────────────────────────────

/// Service quản lý hai luồng Isolate riêng biệt:
/// - Luồng 1 (_detIsolate): Chạy mô hình RetinaFace (det_10g.onnx) để phát hiện mặt.
/// - Luồng 2 (_recIsolate): Chạy mô hình ArcFace (resnet100.onnx) để trích xuất vector & so sánh.
/// Giúp UI Thread hoàn toàn rảnh rỗi 100%, không bị lag.
class FaceRecognitionService {
  static final FaceRecognitionService _instance = FaceRecognitionService._();
  static FaceRecognitionService get instance => _instance;
  FaceRecognitionService._();

  Isolate? _detIsolate;
  SendPort? _detSendPort;

  Isolate? _recIsolate;
  SendPort? _recSendPort;

  bool _isInitialized = false;
  bool get isInitialized => _isInitialized;

  /// Khởi tạo 2 luồng Isolate riêng biệt và load ONNX sessions trong từng Isolate
  Future<void> initialize(ModelLoaderService loader) async {
    if (_isInitialized) return;

    try {
      // Đọc byte ảnh user cccd.jpg từ assets
      final bytes = await rootBundle
          .load('packages/tot_facerecognition/assets/faces/user_cccd.jpg');
      final userFaceBytes = bytes.buffer.asUint8List();

      // 1. Spawn Luồng 1 (Detection Isolate)
      final detHandshakePort = ReceivePort();
      _detIsolate = await Isolate.spawn(
          _detectionIsolateEntryPoint, detHandshakePort.sendPort);
      _detSendPort = await detHandshakePort.first as SendPort;

      final detInitPort = ReceivePort();
      _detSendPort!
          .send(_InitDetMessage(loader.detModelPath, detInitPort.sendPort));
      final detReady = await detInitPort.first as bool;
      print('[FaceRecognitionService] Luồng 1 (Detection Isolate) khởi tạo: $detReady');

      // 2. Spawn Luồng 2 (Recognition & Comparison Isolate)
      final recHandshakePort = ReceivePort();
      _recIsolate = await Isolate.spawn(
          _recognitionIsolateEntryPoint, recHandshakePort.sendPort);
      _recSendPort = await recHandshakePort.first as SendPort;

      final recInitPort = ReceivePort();
      _recSendPort!.send(_InitRecMessage(
        loader.recModelPath,
        loader.detModelPath,
        userFaceBytes,
        recInitPort.sendPort,
      ));
      final recReady = await recInitPort.first as bool;
      print('[FaceRecognitionService] Luồng 2 (Recognition Isolate) khởi tạo: $recReady');

      _isInitialized = detReady && recReady;
    } catch (e, st) {
      print('[FaceRecognitionService] Khởi tạo Isolate thất bại: $e\n$st');
      _isInitialized = false;
    }
  }

  /// Xử lý 1 frame theo pipeline 2 luồng riêng biệt:
  /// UI Thread → Luồng 1 (Detect) → Luồng 2 (Vector & Compare) → UI Thread
  Future<List<FaceDetectionResult>> processFrame(img.Image frame) async {
    if (!_isInitialized || _detSendPort == null || _recSendPort == null) {
      return [];
    }

    // BƯỚC 1: Gửi frame tới Luồng 1 (Detection Isolate)
    final detReplyPort = ReceivePort();
    _detSendPort!.send(_ProcessDetMessage(frame, detReplyPort.sendPort));
    final detectedFaces =
        await detReplyPort.first as List<FaceDetectionResult>;

    if (detectedFaces.isEmpty) {
      return [];
    }

    // BƯỚC 2: Gửi frame & detectedFaces tới Luồng 2 (Recognition Isolate)
    final recReplyPort = ReceivePort();
    _recSendPort!
        .send(_ProcessRecMessage(frame, detectedFaces, recReplyPort.sendPort));
    final finalResults = await recReplyPort.first as List<FaceDetectionResult>;

    return finalResults;
  }

  void dispose() {
    _detIsolate?.kill(priority: Isolate.immediate);
    _recIsolate?.kill(priority: Isolate.immediate);
    _detIsolate = null;
    _recIsolate = null;
    _detSendPort = null;
    _recSendPort = null;
    _isInitialized = false;
  }
}

// ─────────────────────────────────────────────────────────
// LUỒNG 1: DETECTION ISOLATE ENTRY POINT
// ─────────────────────────────────────────────────────────

void _detectionIsolateEntryPoint(SendPort mainToDetPort) {
  final receivePort = ReceivePort();
  mainToDetPort.send(receivePort.sendPort);

  OrtSession? detSession;

  receivePort.listen((message) {
    if (message is _InitDetMessage) {
      try {
        OrtEnv.instance.init();
        final options = OrtSessionOptions();
        detSession = OrtSession.fromFile(File(message.modelPath), options);
        message.replyPort.send(true);
      } catch (e) {
        print('[DetIsolate] Lỗi khởi tạo ONNX detSession: $e');
        message.replyPort.send(false);
      }
    } else if (message is _ProcessDetMessage) {
      if (detSession == null) {
        message.replyPort.send(<FaceDetectionResult>[]);
        return;
      }
      final faces = _detectFacesInIsolate(detSession!, message.image);
      message.replyPort.send(faces);
    }
  });
}

// ─────────────────────────────────────────────────────────
// LUỒNG 2: RECOGNITION & COMPARE ISOLATE ENTRY POINT
// ─────────────────────────────────────────────────────────

void _recognitionIsolateEntryPoint(SendPort mainToRecPort) {
  final receivePort = ReceivePort();
  mainToRecPort.send(receivePort.sendPort);

  OrtSession? recSession;
  Float32List? userEmbedding;

  receivePort.listen((message) {
    if (message is _InitRecMessage) {
      try {
        OrtEnv.instance.init();
        final options = OrtSessionOptions();
        recSession = OrtSession.fromFile(File(message.recModelPath), options);

        final detSessionForUserCCCD =
            OrtSession.fromFile(File(message.detModelPath), options);

        final userImage = img.decodeImage(message.userFaceBytes);
        if (userImage != null) {
          final userFaces =
              _detectFacesInIsolate(detSessionForUserCCCD, userImage);
          if (userFaces.isNotEmpty) {
            userEmbedding =
                _extractEmbeddingInIsolate(recSession!, userImage, userFaces.first);
            print('[RecIsolate] Trích xuất vector CCCD người dùng thành công trong Luồng 2');
          }
        }
        detSessionForUserCCCD.release();

        message.replyPort.send(recSession != null && userEmbedding != null);
      } catch (e) {
        print('[RecIsolate] Lỗi khởi tạo ONNX recSession: $e');
        message.replyPort.send(false);
      }
    } else if (message is _ProcessRecMessage) {
      if (recSession == null) {
        message.replyPort.send(message.detectedFaces);
        return;
      }

      final results = <FaceDetectionResult>[];
      for (final face in message.detectedFaces) {
        final embedding =
            _extractEmbeddingInIsolate(recSession!, message.image, face);
        double? score;
        if (userEmbedding != null && embedding != null) {
          score = _cosineSimilarityHelper(userEmbedding!, embedding);
        }
        results.add(face.copyWith(embedding: embedding, similarityScore: score));
      }
      message.replyPort.send(results);
    }
  });
}

// ─────────────────────────────────────────────────────────
// HELPER PIPELINE IN ISOLATES
// ─────────────────────────────────────────────────────────

List<FaceDetectionResult> _detectFacesInIsolate(
    OrtSession detSession, img.Image src) {
  final int srcW = src.width;
  final int srcH = src.height;

  final double imRatio = srcH / srcW;
  const double modelRatio = 1.0;
  int newW, newH;
  if (imRatio > modelRatio) {
    newH = _detInputSize;
    newW = (newH / imRatio).round();
  } else {
    newW = _detInputSize;
    newH = (newW * imRatio).round();
  }
  final double detScaleX = newW / srcW;
  final double detScaleY = newH / srcH;

  final inputData = Float32List(1 * 3 * _detInputSize * _detInputSize);
  const double bgVal = -127.5 / 128.0;
  inputData.fillRange(0, inputData.length, bgVal);

  final int planeSize = _detInputSize * _detInputSize;
  for (int y = 0; y < newH; y++) {
    final int srcY = (y * srcH) ~/ newH;
    final int offsetRow = y * _detInputSize;

    for (int x = 0; x < newW; x++) {
      final int srcX = (x * srcW) ~/ newW;
      final pixel = src.getPixel(srcX, srcY);
      final int offset = offsetRow + x;
      inputData[offset] = (pixel.r - 127.5) / 128.0;
      inputData[planeSize + offset] = (pixel.g - 127.5) / 128.0;
      inputData[2 * planeSize + offset] = (pixel.b - 127.5) / 128.0;
    }
  }

  final inputName = detSession.inputNames.first;
  final inputTensor = OrtValueTensor.createTensorWithDataList(
    inputData,
    [1, 3, _detInputSize, _detInputSize],
  );

  final runOptions = OrtRunOptions();
  final outputs = detSession.run(runOptions, {inputName: inputTensor});
  inputTensor.release();
  runOptions.release();

  final Map<int, Map<int, List<dynamic>>> mappedOutputs = {};

  for (final ortValue in outputs) {
    if (ortValue == null) continue;
    final tensor = ortValue as OrtValueTensor;
    final rawValue = tensor.value;
    if (rawValue == null) {
      tensor.release();
      continue;
    }

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
    if (contentSize == 1) typeIdx = 0;
    else if (contentSize == 4) typeIdx = 1;
    else if (contentSize == 10) typeIdx = 2;

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
    final anchorCenters = _getAnchorCentersHelper(gridH, gridW, stride);

    for (int i = 0; i < anchorCenters.length; i++) {
      final scoreRow = scoreData[i];
      final double score = (scoreRow is List
          ? (scoreRow[0] as num).toDouble()
          : (scoreRow as num).toDouble());
      if (score > maxScore) maxScore = score;
      if (score < _detThresh) continue;

      final pt = anchorCenters[i];
      final bbox = bboxData[i] as List;

      final dLeft = (bbox[0] as num).toDouble() * stride;
      final dTop = (bbox[1] as num).toDouble() * stride;
      final dRight = (bbox[2] as num).toDouble() * stride;
      final dBottom = (bbox[3] as num).toDouble() * stride;

      double x1 = (pt[0] - dLeft) / detScaleX;
      double y1 = (pt[1] - dTop) / detScaleY;
      double x2 = (pt[0] + dRight) / detScaleX;
      double y2 = (pt[1] + dBottom) / detScaleY;

      x1 = x1.clamp(0, srcW.toDouble());
      y1 = y1.clamp(0, srcH.toDouble());
      x2 = x2.clamp(0, srcW.toDouble());
      y2 = y2.clamp(0, srcH.toDouble());

      final kpsRow = kpsData[i] as List;
      final kps = <List<double>>[];
      for (int k = 0; k < 5; k++) {
        final dx = (kpsRow[k * 2] as num).toDouble() * stride;
        final dy = (kpsRow[k * 2 + 1] as num).toDouble() * stride;
        final kx = ((pt[0] + dx) / detScaleX).clamp(0, srcW.toDouble());
        final ky = ((pt[1] + dy) / detScaleY).clamp(0, srcH.toDouble());
        kps.add([kx.toDouble(), ky.toDouble()]);
      }

      candidates.add(FaceDetectionResult(
        bbox: [x1, y1, x2 - x1, y2 - y1],
        keypoints: kps,
        detectionScore: score,
      ));
    }
  }

  if (candidates.isNotEmpty || maxScore > 0.1) {
    print('[DetIsolate] Frame ${srcW}x${srcH}: maxScore=${maxScore.toStringAsFixed(3)}, candidates=${candidates.length}');
  }
  return _nmsHelper(candidates, _nmsThresh);
}

Float32List? _extractEmbeddingInIsolate(
    OrtSession recSession, img.Image src, FaceDetectionResult face) {
  final aligned = _alignFaceHelper(src, face.keypoints);
  if (aligned == null) return null;
  return _vectorFaceInIsolate(recSession, aligned);
}

img.Image? _alignFaceHelper(img.Image src, List<List<double>> kps) {
  if (kps.length < 5) return null;
  final transform = _estimateAffinePartial2DHelper(kps, _refPoints);
  if (transform == null) return null;
  return _warpAffineHelper(src, transform, _recInputSize, _recInputSize);
}

Float32List? _vectorFaceInIsolate(OrtSession recSession, img.Image aligned) {
  final inputData = Float32List(1 * 3 * _recInputSize * _recInputSize);
  for (int y = 0; y < _recInputSize; y++) {
    for (int x = 0; x < _recInputSize; x++) {
      final pixel = aligned.getPixel(x, y);
      inputData[0 * _recInputSize * _recInputSize + y * _recInputSize + x] =
          pixel.b.toDouble();
      inputData[1 * _recInputSize * _recInputSize + y * _recInputSize + x] =
          pixel.g.toDouble();
      inputData[2 * _recInputSize * _recInputSize + y * _recInputSize + x] =
          pixel.r.toDouble();
    }
  }

  final inputName = recSession.inputNames.first;
  final inputTensor = OrtValueTensor.createTensorWithDataList(
    inputData,
    [1, 3, _recInputSize, _recInputSize],
  );

  final runOptions = OrtRunOptions();
  final outputs = recSession.run(runOptions, {inputName: inputTensor});
  inputTensor.release();
  runOptions.release();

  final outValue = outputs.firstOrNull;
  if (outValue == null) return null;

  final rawData = (outValue as OrtValueTensor).value;
  outValue.release();
  if (rawData == null) return null;

  final flatList =
      (rawData is List && rawData.isNotEmpty && rawData.first is List)
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

double _cosineSimilarityHelper(Float32List v1, Float32List v2) {
  if (v1.length != v2.length) return 0.0;
  double dot = 0.0;
  for (int i = 0; i < v1.length; i++) {
    dot += v1[i] * v2[i];
  }
  return dot.clamp(-1.0, 1.0);
}

List<List<double>> _getAnchorCentersHelper(int gridH, int gridW, int stride) {
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

List<FaceDetectionResult> _nmsHelper(
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
          _iouHelper(sorted[i].bbox, sorted[j].bbox) > threshold) {
        suppressed[j] = true;
      }
    }
  }
  return keep;
}

double _iouHelper(List<double> a, List<double> b) {
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

List<List<double>>? _estimateAffinePartial2DHelper(
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

img.Image _warpAffineHelper(
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
