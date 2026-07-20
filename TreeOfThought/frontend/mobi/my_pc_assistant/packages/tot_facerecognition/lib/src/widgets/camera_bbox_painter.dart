import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../models/face_detection_result.dart';

/// CustomPainter vẽ bounding box và score lên camera preview.
/// Tọa độ bbox được scale từ không gian ảnh gốc sang không gian widget.
class CameraBboxPainter extends CustomPainter {
  final List<FaceDetectionResult> faces;

  /// Kích thước ảnh gốc (camera frame)
  final Size imageSize;

  /// Kích thước widget preview trên màn hình
  final Size previewSize;

  /// Camera đang dùng camera trước (front) hay sau (back)
  final bool isFrontCamera;

  CameraBboxPainter({
    required this.faces,
    required this.imageSize,
    required this.previewSize,
    this.isFrontCamera = false,
  });

  @override
  void paint(Canvas canvas, Size size) {
    if (faces.isEmpty || imageSize.width == 0 || imageSize.height == 0) return;

    // Tính toán scale và offset theo BoxFit.cover
    final scaleX = size.width / imageSize.width;
    final scaleY = size.height / imageSize.height;
    final fittedScale = math.max(scaleX, scaleY);

    final offsetX = (size.width - imageSize.width * fittedScale) / 2;
    final offsetY = (size.height - imageSize.height * fittedScale) / 2;

    for (final face in faces) {
      final color = face.isMatched
          ? const Color(0xFF00E676) // xanh lá nếu khớp
          : const Color(0xFFFF1744); // đỏ nếu không khớp

      final boxPaint = Paint()
        ..color = color
        ..style = PaintingStyle.stroke
        ..strokeWidth = 3.0;

      final cornerPaint = Paint()
        ..color = color
        ..style = PaintingStyle.stroke
        ..strokeWidth = 5.0
        ..strokeCap = StrokeCap.round;

      double bx = face.x * scaleX;
      double by = face.y * scaleY;
      double bw = face.width * scaleX;
      double bh = face.height * scaleY;

      final rect = Rect.fromLTWH(bx, by, bw, bh);

      // Vẽ box mờ
      canvas.drawRRect(
        RRect.fromRectAndRadius(rect, const Radius.circular(8)),
        Paint()
          ..color = color.withOpacity(0.20)
          ..style = PaintingStyle.fill,
      );
      canvas.drawRRect(
        RRect.fromRectAndRadius(rect, const Radius.circular(8)),
        boxPaint,
      );

      // Vẽ 4 góc nổi bật
      _drawCorners(canvas, rect, cornerPaint);

      // Vẽ keypoints (5 điểm)
      final kpsPaint = Paint()
        ..color = Colors.yellowAccent
        ..style = PaintingStyle.fill;
      for (final kp in face.keypoints) {
        double kpX = kp[0] * scaleX;
        double kpY = kp[1] * scaleY;
        canvas.drawCircle(Offset(kpX, kpY), 4, kpsPaint);
      }

      // Score text
      final score = face.similarityScore;
      if (score != null) {
        final scoreText = '${(score * 100).clamp(0, 100).toStringAsFixed(1)}%';
        final label = face.isMatched ? '✓ MATCH $scoreText' : '✗ UNKNOWN $scoreText';
        _drawLabel(canvas, label, Offset(bx, math.max(20.0, by - 26)), color);
      } else {
        _drawLabel(canvas, 'DETECTED', Offset(bx, math.max(20.0, by - 26)), color);
      }
    }
  }

  void _drawCorners(Canvas canvas, Rect rect, Paint paint) {
    const double cLen = 16.0;
    // Top-left
    canvas.drawLine(rect.topLeft, rect.topLeft.translate(cLen, 0), paint);
    canvas.drawLine(rect.topLeft, rect.topLeft.translate(0, cLen), paint);
    // Top-right
    canvas.drawLine(rect.topRight, rect.topRight.translate(-cLen, 0), paint);
    canvas.drawLine(rect.topRight, rect.topRight.translate(0, cLen), paint);
    // Bottom-left
    canvas.drawLine(rect.bottomLeft, rect.bottomLeft.translate(cLen, 0), paint);
    canvas.drawLine(rect.bottomLeft, rect.bottomLeft.translate(0, -cLen), paint);
    // Bottom-right
    canvas.drawLine(rect.bottomRight, rect.bottomRight.translate(-cLen, 0), paint);
    canvas.drawLine(rect.bottomRight, rect.bottomRight.translate(0, -cLen), paint);
  }

  void _drawLabel(Canvas canvas, String text, Offset position, Color color) {
    final textPainter = TextPainter(
      text: TextSpan(
        text: text,
        style: TextStyle(
          color: color,
          fontSize: 12,
          fontWeight: FontWeight.bold,
          shadows: const [Shadow(color: Colors.black, blurRadius: 4)],
        ),
      ),
      textDirection: TextDirection.ltr,
    )..layout();

    // Nền mờ cho text
    final bgRect = Rect.fromLTWH(
      position.dx - 2,
      position.dy - 2,
      textPainter.width + 4,
      textPainter.height + 4,
    );
    canvas.drawRRect(
      RRect.fromRectAndRadius(bgRect, const Radius.circular(4)),
      Paint()..color = Colors.black54,
    );
    textPainter.paint(canvas, position);
  }

  @override
  bool shouldRepaint(CameraBboxPainter oldDelegate) =>
      oldDelegate.faces != faces ||
      oldDelegate.imageSize != imageSize ||
      oldDelegate.isFrontCamera != isFrontCamera;
}
