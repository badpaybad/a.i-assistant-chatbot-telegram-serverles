/// Package tot_facerecognition — Nhận diện khuôn mặt thời gian thực
/// Sử dụng InsightFace ONNX models (det_10g, 2d106det, resnet100 ArcFace)
library tot_facerecognition;

export 'src/models/face_detection_result.dart';
export 'src/services/face_recognition_service.dart';
export 'src/services/model_loader_service.dart';
export 'src/widgets/camera_bbox_painter.dart';
export 'src/widgets/face_score_overlay.dart';
export 'src/pages/face_recognition_page.dart';
