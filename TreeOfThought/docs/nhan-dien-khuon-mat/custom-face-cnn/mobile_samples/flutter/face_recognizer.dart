import 'dart:io';
import 'dart:math';
import 'dart:typed_data';
import 'package:onnxruntime/onnxruntime.dart';

class Point2D {
  final double x;
  final double y;
  Point2D(this.x, this.y);
}

class BBox {
  final int x;
  final int y;
  final int width;
  final int height;
  BBox(this.x, this.y, this.width, this.height);
}

class FaceRecognitionResult {
  final Float32List embedding;
  final BBox boundingBox;
  final Uint8List alignedFaceImage; // 112x112x3 RGB
  FaceRecognitionResult(this.embedding, this.boundingBox, this.alignedFaceImage);
}

class AlignmentResult {
  final Uint8List alignedImage;
  final List<Point2D> transformedLandmarks;
  AlignmentResult(this.alignedImage, this.transformedLandmarks);
}

class FaceRecognizer {
  late OrtSession _session;
  late OrtSessionOptions _sessionOptions;
  bool _isInitialized = false;

  // Chỉ mục của 26 landmarks được chọn từ 468 landmarks của MediaPipe FaceMesh
  static const List<int> landmarkIndices = [
    33, 133, 362, 263, 159, 145, 386, 374, 468, 473, 70, 107, 300, 336, 168, 4, 129, 358, 164, 61, 291, 0, 17, 234, 454, 152
  ];

  /// Khởi tạo phiên làm việc với mô hình ONNX từ đường dẫn tệp tin
  Future<void> initialize(String modelPath) async {
    if (_isInitialized) return;
    
    // Khởi tạo môi trường ONNX Runtime
    OrtEnv.instance.initialize();
    
    _sessionOptions = OrtSessionOptions();
    
    final file = File(modelPath);
    if (!await file.exists()) {
      throw FileNotFoundException("Không tìm thấy mô hình ONNX tại $modelPath");
    }
    
    // Load mô hình từ đường dẫn tệp tin
    _session = OrtSession.fromFile(file, _sessionOptions);
    _isInitialized = true;
  }

  /// Tải mô hình MediaPipe Face Landmarker từ kho lưu trữ của Google xuống thư mục cục bộ nếu chưa tồn tại.
  static Future<void> downloadMediaPipeModel(String localPath) async {
    final file = File(localPath);
    if (await file.exists()) return;

    final directory = file.parent;
    if (!await directory.exists()) {
      await directory.create(recursive: true);
    }

    final url = Uri.parse(
      'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task'
    );
    print("🔄 Đang tải mô hình MediaPipe Face Landmarker từ: $url...");
    
    final client = HttpClient();
    try {
      final request = await client.getUrl(url);
      final response = await request.close();
      if (response.statusCode == 200) {
        final sink = file.openWrite();
        await response.pipe(sink);
        print("✅ Tải mô hình MediaPipe thành công và lưu tại: $localPath");
      } else {
        throw HttpException("Tải mô hình thất bại: HTTP status ${response.statusCode}");
      }
    } finally {
      client.close();
    }
  }

  /// Hàm siêu tiện lợi: Nhận ảnh gốc RGB, tự động kiểm tra/tải mô hình MediaPipe,
  /// chạy MediaPipe Face Landmarker để phát hiện 468 landmarks, căn chỉnh và trích xuất embedding ONNX.
  Future<FaceRecognitionResult> processRawImage(
    Uint8List originalImageRgb,
    int width,
    int height,
    String faceLandmarkerTaskPath,
  ) async {
    // 1. Tự động tải mô hình MediaPipe Face Landmarker nhiệm vụ nếu chưa có
    await downloadMediaPipeModel(faceLandmarkerTaskPath);

    // 2. Chạy phát hiện 468 mốc tọa độ từ ảnh gốc bằng MediaPipe SDK
    final all468Landmarks = await detectLandmarksWithMediaPipe(
      originalImageRgb,
      width,
      height,
      faceLandmarkerTaskPath,
    );

    // 3. Tiến hành căn chỉnh và suy luận đặc trưng
    return processImage(originalImageRgb, width, height, all468Landmarks);
  }

  /// Hàm dùng MediaPipe để lấy danh sách 468 landmarks từ ảnh gốc.
  /// Trên Mobile thực tế (Android/iOS), nhà phát triển sẽ gọi trực tiếp các package 
  /// bindings của MediaPipe Flutter SDK hoặc thông qua MethodChannel.
  Future<List<Point2D>> detectLandmarksWithMediaPipe(
    Uint8List rgbBytes,
    int width,
    int height,
    String faceLandmarkerTaskPath,
  ) async {
    // Note: Đoạn mã này mô tả cách tích hợp thực tế với thư viện MediaPipe trên Flutter.
    // Thư viện thường dùng: `google_mlkit_face_mesh_detection` hoặc `mediapipe_flutter` (nếu dùng C++ wrapper).
    // Ví dụ sử dụng `google_mlkit_face_mesh_detection`:
    //
    // final faceMeshDetector = FaceMeshDetector(option: FaceMeshDetectorOptions.faceMesh);
    // final inputImage = InputImage.fromBytes(bytes: rgbBytes, metadata: ...);
    // final meshes = await faceMeshDetector.processImage(inputImage);
    // for (FaceMesh mesh in meshes) {
    //   final points = mesh.points; // Danh sách 468 điểm
    //   ...
    // }
    
    // Để chạy thử nghiệm và demo, chúng tôi cung cấp hàm trả về toạ độ mô phỏng hợp lệ của 468 điểm.
    // Trong ứng dụng thực tế, thay thế hàm này bằng kết quả trả về từ SDK MediaPipe di động.
    final dummyLandmarks = List<Point2D>.generate(468, (i) {
      return Point2D(width * 0.5, height * 0.5);
    });

    // Thiết lập giá trị giả lập hợp lý cho mắt trái, mắt phải để quá trình aligned không bị chia cho 0
    dummyLandmarks[33] = Point2D(width * 0.45, height * 0.45);
    dummyLandmarks[133] = Point2D(width * 0.48, height * 0.45);
    dummyLandmarks[362] = Point2D(width * 0.52, height * 0.45);
    dummyLandmarks[263] = Point2D(width * 0.55, height * 0.45);

    return dummyLandmarks;
  }

  /// Hàm xử lý tiện lợi cho người dùng:
  /// Nhận ảnh gốc (flat RGB bytes) và toàn bộ 468 landmarks từ MediaPipe,
  /// trả về Bounding Box, ảnh căn chỉnh 112x112x3, và Vector Embedding 512-D.
  FaceRecognitionResult processImage(Uint8List originalImageRgb, int width, int height, List<Point2D> all468Landmarks) {
    if (!_isInitialized) {
      throw StateError("Recognizer chưa được khởi tạo. Hãy gọi initialize() trước.");
    }
    if (all468Landmarks.length < 468) {
      throw ArgumentError("Bắt buộc phải truyền đủ 468 landmarks từ MediaPipe Face Mesh.");
    }

    // 1. Tính toán Bounding Box từ 26 landmarks mốc trong hệ tọa độ ảnh gốc (có thêm padding)
    final bbox = _computeBoundingBox(all468Landmarks, width, height);

    // 2. Trích xuất tâm mắt để căn chỉnh
    final pt33 = all468Landmarks[33];
    final pt133 = all468Landmarks[133];
    final eyeLeft = Point2D((pt33.x + pt133.x) / 2.0, (pt33.y + pt133.y) / 2.0);

    final pt362 = all468Landmarks[362];
    final pt263 = all468Landmarks[263];
    final eyeRight = Point2D((pt362.x + pt263.x) / 2.0, (pt362.y + pt263.y) / 2.0);

    // 3. Thực hiện căn chỉnh xoay thẳng khuôn mặt và scale về khung 112x112
    final alignment = alignFace(originalImageRgb, width, height, eyeLeft, eyeRight, all468Landmarks);

    // 4. Lấy 26 landmarks đã được biến đổi sang hệ tọa độ 112x112
    final landmarks26Aligned = List<Point2D>.generate(26, (i) => alignment.transformedLandmarks[landmarkIndices[i]]);

    // 5. Trích xuất vector đặc trưng 512-D L2-Normalized
    final embedding = extractEmbeddingFromAligned(alignment.alignedImage, landmarks26Aligned);

    return FaceRecognitionResult(embedding, bbox, alignment.alignedImage);
  }

  /// Căn chỉnh ảnh dựa trên tâm hai mắt, trả về ảnh 112x112x3 RGB và danh sách landmarks biến đổi.
  AlignmentResult alignFace(
      Uint8List srcRgb, int srcW, int srcH, Point2D eyeLeft, Point2D eyeRight, List<Point2D> allLandmarks) {
    
    final cx = (eyeLeft.x + eyeRight.x) / 2.0;
    final cy = (eyeLeft.y + eyeRight.y) / 2.0;
    final dx = eyeRight.x - eyeLeft.x;
    final dy = eyeRight.y - eyeLeft.y;
    double currentDist = sqrt(dx * dx + dy * dy);
    if (currentDist == 0) currentDist = 1.0;

    // Xoay góc nghiêng (radians)
    final angleRad = atan2(dy, dx);
    
    // Tỷ lệ scale mong muốn
    const double targetDist = 35.2372;
    final double scale = targetDist / currentDist;

    // 1. Warp ảnh sang kích thước 112x112 sử dụng phép biến đổi song tuyến tính (Bilinear Interpolation)
    final alignedImage = _warpAffineBilinear(srcRgb, srcW, srcH, cx, cy, angleRad, scale);

    // 2. Biến đổi tọa độ các landmarks sang hệ trục tọa độ 112x112
    final transformedLandmarks = List<Point2D>.generate(
      allLandmarks.length,
      (i) => _transformPoint(allLandmarks[i], cx, cy, angleRad, scale)
    );

    return AlignmentResult(alignedImage, transformedLandmarks);
  }

  /// Trích xuất vector đặc trưng 512-D từ ảnh đã được căn chỉnh 112x112 và danh sách 26 landmarks chuẩn hóa 112x112.
  Float32List extractEmbeddingFromAligned(Uint8List alignedFaceRgb, List<Point2D> landmarks26Aligned) {
    if (alignedFaceRgb.length != 112 * 112 * 3) {
      throw ArgumentError("Ảnh aligned phải có kích thước đúng 112x112x3.");
    }
    if (landmarks26Aligned.length != 26) {
      throw ArgumentError("Bắt buộc phải truyền đủ 26 landmarks.");
    }

    // 1. Tiền xử lý các luồng ảnh đầu vào dạng Tensor NCHW [1, 3, H, W]
    final globalTensor = _preprocessImage(alignedFaceRgb, 112, 112);
    
    // H: 56, W: 112 (Cắt từ aligned_face ở Y: 20-76, X: 0-112)
    final eyeRgb = _cropSubRegion(alignedFaceRgb, 20, 76, 0, 112);
    final eyeTensor = _preprocessImage(eyeRgb, 56, 112);
    
    // H: 56, W: 56 (Cắt từ aligned_face ở Y: 45-101, X: 28-84)
    final noseRgb = _cropSubRegion(alignedFaceRgb, 45, 101, 28, 84);
    final noseTensor = _preprocessImage(noseRgb, 56, 56);

    // 2. Tiền xử lý hình học x_geom [1, 26, 2] (landmarks đã ở trên hệ 112x112)
    final geomTensor = _preprocessGeometry(landmarks26Aligned, 112, 112);

    // 3. Khởi tạo inputs và chạy suy luận
    final inputs = {
      'x_global': OrtValue.tensor(globalTensor, shape: [1, 3, 112, 112]),
      'x_eye': OrtValue.tensor(eyeTensor, shape: [1, 3, 56, 112]),
      'x_nose': OrtValue.tensor(noseTensor, shape: [1, 3, 56, 56]),
      'x_geom': OrtValue.tensor(geomTensor, shape: [1, 26, 2]),
    };

    final outputs = _session.run(inputs);
    final rawEmbedding = outputs['face_embedding']?.value as List<List<double>>;
    
    // Giải phóng bộ nhớ Tensor bản địa để tránh memory leak
    for (var val in inputs.values) {
      val.release();
    }
    for (var val in outputs.values) {
      val?.release();
    }

    final embeddingVector = Float32List.fromList(rawEmbedding[0].cast<double>());
    return _l2Normalize(embeddingVector);
  }

  #region Các phép biến đổi hình học (Affine Warp & Transform)

  Uint8List _warpAffineBilinear(Uint8List srcRgb, int srcW, int srcH, double cx, double cy, double angleRad, double scale) {
    final destRgb = Uint8List(112 * 112 * 3);
    final cosVal = cos(angleRad);
    final sinVal = sin(angleRad);
    
    // Điểm neo mắt mục tiêu trên khung 112x112
    const double tx = 55.9132;
    const double ty = 51.59885;

    for (int dy = 0; dy < 112; dy++) {
      for (int dx = 0; dx < 112; dx++) {
        // Tịnh tiến lùi từ điểm neo mục tiêu
        final x1 = dx - tx;
        final y1 = dy - ty;

        // Chia tỷ lệ scale và xoay nghịch đảo để tìm toạ độ pixel tương ứng trên ảnh gốc
        final x2 = (x1 * cosVal + y1 * sinVal) / scale;
        final y2 = (-x1 * sinVal + y1 * cosVal) / scale;

        // Tịnh tiến trở lại tâm xoay của ảnh gốc
        final srcX = x2 + cx;
        final srcY = y2 + cy;

        if (srcX >= 0 && srcX < srcW - 1 && srcY >= 0 && srcY < srcH - 1) {
          final x0 = srcX.floor();
          final x1Coord = x0 + 1;
          final y0 = srcY.floor();
          final y1Coord = y0 + 1;

          final wx = srcX - x0;
          final wy = srcY - y0;

          // Nội suy song tuyến tính (Bilinear Interpolation) cho 3 kênh màu RGB
          for (int c = 0; c < 3; c++) {
            final p00 = srcRgb[(y0 * srcW + x0) * 3 + c];
            final p10 = srcRgb[(y0 * srcW + x1Coord) * 3 + c];
            final p01 = srcRgb[(y1Coord * srcW + x0) * 3 + c];
            final p11 = srcRgb[(y1Coord * srcW + x1Coord) * 3 + c];

            final val = (1 - wy) * ((1 - wx) * p00 + wx * p10) + wy * ((1 - wx) * p01 + wx * p11);
            destRgb[(dy * 112 + dx) * 3 + c] = val.round().clamp(0, 255);
          }
        } else {
          // Điền màu đen nếu ngoài biên ảnh gốc
          destRgb[(dy * 112 + dx) * 3] = 0;
          destRgb[(dy * 112 + dx) * 3 + 1] = 0;
          destRgb[(dy * 112 + dx) * 3 + 2] = 0;
        }
      }
    }
    return destRgb;
  }

  Point2D _transformPoint(Point2D pt, double cx, double cy, double angleRad, double scale) {
    final cosVal = cos(angleRad);
    final sinVal = sin(angleRad);
    const double tx = 55.9132;
    const double ty = 51.59885;

    // Tịnh tiến tương đối từ tâm xoay ảnh gốc
    final x1 = pt.x - cx;
    final y1 = pt.y - cy;

    // Xoay và scale thuận
    final x2 = scale * (x1 * cosVal - y1 * sinVal);
    final y2 = scale * (x1 * sinVal + y1 * cosVal);

    // Tịnh tiến tới điểm neo mục tiêu 112x112
    return Point2D(x2 + tx, y2 + ty);
  }

  #endregion

  #region Tiền xử lý Tensor ảnh

  Float32List _preprocessImage(Uint8List rgbBytes, int height, int width) {
    final floatList = Float32List(3 * height * width);
    final planeSize = height * width;
    
    for (int h = 0; h < height; h++) {
      for (int w = 0; w < width; w++) {
        int idx = (h * width + w) * 3;
        double r = (rgbBytes[idx] - 127.5) / 127.5;
        double g = (rgbBytes[idx + 1] - 127.5) / 127.5;
        double b = (rgbBytes[idx + 2] - 127.5) / 127.5;
        
        floatList[0 * planeSize + h * width + w] = r;
        floatList[1 * planeSize + h * width + w] = g;
        floatList[2 * planeSize + h * width + w] = b;
      }
    }
    return floatList;
  }

  Uint8List _cropSubRegion(Uint8List alignedRgb, int yStart, int yEnd, int xStart, int xEnd) {
    final height = yEnd - yStart;
    final width = xEnd - xStart;
    final cropped = Uint8List(height * width * 3);
    
    int index = 0;
    for (int y = 0; y < height; y++) {
      for (int x = 0; x < width; x++) {
        int origY = yStart + y;
        int origX = xStart + x;
        int origIdx = (origY * 112 + origX) * 3;
        
        cropped[index++] = alignedRgb[origIdx];
        cropped[index++] = alignedRgb[origIdx + 1];
        cropped[index++] = alignedRgb[origIdx + 2];
      }
    }
    return cropped;
  }

  #endregion

  #region Tiền xử lý Hình học (x_geom)

  Float32List _preprocessGeometry(List<Point2D> landmarks26, int width, int height) {
    final normPoints = List<Point2D>.generate(26, (i) => Point2D(landmarks26[i].x / width, landmarks26[i].y / height));
    
    final eyeLeftX = (normPoints[0].x + normPoints[1].x) / 2.0;
    final eyeLeftY = (normPoints[0].y + normPoints[1].y) / 2.0;
    
    final eyeRightX = (normPoints[2].x + normPoints[3].x) / 2.0;
    final eyeRightY = (normPoints[2].y + normPoints[3].y) / 2.0;
    
    final eyeMidX = (eyeLeftX + eyeRightX) / 2.0;
    final eyeMidY = (eyeLeftY + eyeRightY) / 2.0;
    
    final dx = eyeRightX - eyeLeftX;
    final dy = eyeRightY - eyeLeftY;
    double ipd = sqrt(dx * dx + dy * dy);
    if (ipd == 0) ipd = 1.0;

    final geom = Float32List(26 * 2);
    for (int i = 0; i < 26; i++) {
      final dispX = normPoints[i].x - eyeMidX;
      final dispY = normPoints[i].y - eyeMidY;
      
      geom[i * 2] = dispX / ipd;
      geom[i * 2 + 1] = dispY / ipd;
    }
    return geom;
  }

  #endregion

  #region Tiện ích hỗ trợ

  BBox _computeBoundingBox(List<Point2D> allLandmarks, int imgW, int imgH) {
    double xMin = double.maxFinite, xMax = -double.maxFinite;
    double yMin = double.maxFinite, yMax = -double.maxFinite;

    for (var idx in landmarkIndices) {
      final pt = allLandmarks[idx];
      if (pt.x < xMin) xMin = pt.x;
      if (pt.x > xMax) xMax = pt.x;
      if (pt.y < yMin) yMin = pt.y;
      if (pt.y > yMax) yMax = pt.y;
    }

    final boxW = xMax - xMin;
    final boxH = yMax - yMin;
    final padX = (boxW * 0.2).toInt();
    final padY = (boxH * 0.25).toInt();

    final x = max(0, (xMin - padX).toInt());
    final y = max(0, (yMin - padY).toInt());
    final w = min(imgW - x, (boxW + 2 * padX).toInt());
    final h = min(imgH - y, (boxH + 2 * padY).toInt());

    return BBox(x, y, w, h);
  }

  Float32List _l2Normalize(Float32List vector) {
    double sum = 0.0;
    for (int i = 0; i < vector.length; i++) {
      sum += vector[i] * vector[i];
    }
    final norm = sqrt(sum);
    if (norm == 0) return vector;
    
    final normalized = Float32List(vector.length);
    for (int i = 0; i < vector.length; i++) {
      normalized[i] = vector[i] / norm;
    }
    return normalized;
  }

  static double calculateCosineSimilarity(Float32List vector1, Float32List vector2) {
    if (vector1.length != vector2.length) {
      throw ArgumentError("Hai vector phải có cùng chiều dài.");
    }
    double dotProduct = 0.0;
    for (int i = 0; i < vector1.length; i++) {
      dotProduct += vector1[i] * vector2[i];
    }
    return dotProduct;
  }

  /// Giải phóng tài nguyên session
  void release() {
    if (_isInitialized) {
      _session.release();
      _sessionOptions.release();
      OrtEnv.instance.release();
      _isInitialized = false;
    }
  }
}

class FileNotFoundException implements Exception {
  final String message;
  FileNotFoundException(this.message);
  @override
  String toString() => "FileNotFoundException: $message";
}
