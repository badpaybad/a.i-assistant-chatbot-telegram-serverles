import 'dart:typed_data';

/// Kết quả detect một khuôn mặt từ frame camera
class FaceDetectionResult {
  /// Tọa độ bbox: [x, y, width, height] trong không gian ảnh gốc
  final List<double> bbox;

  /// 5 keypoints (left eye, right eye, nose, left mouth, right mouth)
  final List<List<double>> keypoints;

  /// Score confidence từ detector (0.0 - 1.0)
  final double detectionScore;

  /// Face embedding vector 512 chiều (ArcFace)
  final Float32List? embedding;

  /// Cosine similarity với face gốc của user (null nếu chưa so sánh)
  final double? similarityScore;

  const FaceDetectionResult({
    required this.bbox,
    required this.keypoints,
    required this.detectionScore,
    this.embedding,
    this.similarityScore,
  });

  /// x, y, width, height
  double get x => bbox[0];
  double get y => bbox[1];
  double get width => bbox[2];
  double get height => bbox[3];

  /// true nếu score >= ngưỡng nhận diện (0.4)
  bool get isMatched => (similarityScore ?? 0.0) >= 0.4;

  FaceDetectionResult copyWith({
    List<double>? bbox,
    List<List<double>>? keypoints,
    double? detectionScore,
    Float32List? embedding,
    double? similarityScore,
  }) {
    return FaceDetectionResult(
      bbox: bbox ?? this.bbox,
      keypoints: keypoints ?? this.keypoints,
      detectionScore: detectionScore ?? this.detectionScore,
      embedding: embedding ?? this.embedding,
      similarityScore: similarityScore ?? this.similarityScore,
    );
  }
}
