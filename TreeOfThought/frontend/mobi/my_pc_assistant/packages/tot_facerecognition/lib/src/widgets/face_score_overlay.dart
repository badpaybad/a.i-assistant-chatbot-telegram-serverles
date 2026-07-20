import 'package:flutter/material.dart';
import '../models/face_detection_result.dart';

/// Widget hiển thị thông tin tổng hợp score nhận diện phía dưới màn hình
class FaceScoreOverlay extends StatelessWidget {
  final List<FaceDetectionResult> faces;
  final bool isProcessing;

  const FaceScoreOverlay({
    super.key,
    required this.faces,
    this.isProcessing = false,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        color: Colors.black.withOpacity(0.75),
        borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Drag handle
          Container(
            width: 40, height: 4,
            decoration: BoxDecoration(
              color: Colors.white24,
              borderRadius: BorderRadius.circular(2),
            ),
          ),
          const SizedBox(height: 10),

          if (isProcessing)
            const _ProcessingIndicator()
          else if (faces.isEmpty)
            const _NoFaceDetected()
          else
            _FaceResults(faces: faces),
        ],
      ),
    );
  }
}

class _ProcessingIndicator extends StatelessWidget {
  const _ProcessingIndicator();
  @override
  Widget build(BuildContext context) {
    return const Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        SizedBox(width: 16, height: 16, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white54)),
        SizedBox(width: 10),
        Text('Đang phân tích...', style: TextStyle(color: Colors.white54, fontSize: 13)),
      ],
    );
  }
}

class _NoFaceDetected extends StatelessWidget {
  const _NoFaceDetected();
  @override
  Widget build(BuildContext context) {
    return const Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Icon(Icons.face_retouching_off, color: Colors.white38, size: 18),
        SizedBox(width: 8),
        Text('Không phát hiện khuôn mặt', style: TextStyle(color: Colors.white38, fontSize: 13)),
      ],
    );
  }
}

class _FaceResults extends StatelessWidget {
  final List<FaceDetectionResult> faces;
  const _FaceResults({required this.faces});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Text(
          'Phát hiện ${faces.length} khuôn mặt',
          style: const TextStyle(color: Colors.white70, fontSize: 12),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 8),
        ...faces.asMap().entries.map((entry) {
          final i = entry.key;
          final face = entry.value;
          final score = face.similarityScore;
          final pct = score != null ? (score * 100).clamp(0.0, 100.0) : 0.0;

          return Padding(
            padding: const EdgeInsets.symmetric(vertical: 4),
            child: Row(
              children: [
                // Icon
                Container(
                  width: 32, height: 32,
                  decoration: BoxDecoration(
                    color: face.isMatched
                        ? const Color(0xFF00E676).withOpacity(0.2)
                        : const Color(0xFFFF1744).withOpacity(0.2),
                    shape: BoxShape.circle,
                  ),
                  child: Icon(
                    face.isMatched ? Icons.check_circle : Icons.cancel,
                    color: face.isMatched ? const Color(0xFF00E676) : const Color(0xFFFF1744),
                    size: 18,
                  ),
                ),
                const SizedBox(width: 10),

                // Label
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Khuôn mặt ${i + 1} — ${face.isMatched ? "KHỚP" : "KHÔNG KHỚP"}',
                        style: TextStyle(
                          color: face.isMatched ? const Color(0xFF00E676) : const Color(0xFFFF1744),
                          fontWeight: FontWeight.bold,
                          fontSize: 13,
                        ),
                      ),
                      if (score != null) ...[
                        const SizedBox(height: 3),
                        // Progress bar
                        ClipRRect(
                          borderRadius: BorderRadius.circular(3),
                          child: LinearProgressIndicator(
                            value: pct / 100,
                            minHeight: 6,
                            backgroundColor: Colors.white12,
                            valueColor: AlwaysStoppedAnimation<Color>(
                              face.isMatched ? const Color(0xFF00E676) : const Color(0xFFFF1744),
                            ),
                          ),
                        ),
                      ],
                    ],
                  ),
                ),
                const SizedBox(width: 10),

                // Score %
                if (score != null)
                  Text(
                    '${pct.toStringAsFixed(1)}%',
                    style: TextStyle(
                      color: face.isMatched ? const Color(0xFF00E676) : Colors.white70,
                      fontWeight: FontWeight.bold,
                      fontSize: 15,
                    ),
                  ),
              ],
            ),
          );
        }),
      ],
    );
  }
}
