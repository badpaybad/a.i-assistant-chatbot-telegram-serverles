import { Component, OnInit, OnDestroy, ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { TotButtonComponent } from '@tot/shared';
import { NhanDienKhuonMatService } from '../services/nhan-dien-khuon-mat.service';

@Component({
  selector: 'tot-nhan-dien-camera',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzCardModule,
    NzTagModule,
    NzSpinModule,
    NzSliderModule,
    NzInputNumberModule,
    NzIconModule,
    NzDividerModule,
    NzAlertModule,
    NzBadgeModule,
    TotButtonComponent,
    DatePipe
  ],
  templateUrl: './camera.component.html',
  styleUrl: './camera.component.css'
})
export class CameraComponent implements OnInit, OnDestroy {
  private api = inject(NhanDienKhuonMatService);
  private message = inject(NzMessageService);

  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasOverlay') canvasOverlay!: ElementRef<HTMLCanvasElement>;
  @ViewChild('alignedCanvas') alignedCanvas!: ElementRef<HTMLCanvasElement>;

  // Webcam Stream
  stream: MediaStream | null = null;
  cameraActive: boolean = false;
  cameraError: string | null = null;

  // MediaPipe BlazeFace Detector
  loadingDetector: boolean = false;
  detectorReady: boolean = false;
  faceDetector: any = null;

  // Real-Time Scanning Loop
  private scanTimer: any = null;
  isScanning: boolean = false;
  scanRateMs: number = 800; // Throttled rate

  // Cosine Similarity Threshold
  compareThreshold: number = 0.5;

  // Face Size Threshold (minimum face bounding box width in pixels of source video)
  minFaceWidthPx: number = 80;

  // Matching State & Results
  isComparing: boolean = false;
  reloadingCache: boolean = false;
  compareResults: any = null;
  bestMatchUser: any = null;
  noFaceDetected: boolean = false;
  belowThreshold: boolean = false;
  faceTooSmall: boolean = false;
  private streamSub: any = null;

  // Mini Aligned Preview Blob URL
  alignedPreviewUrl: string | null = null;

  // Lịch sử 5 kết quả nhận diện gần nhất
  recognitionHistory: Array<{
    timestamp: Date;
    previewUrl: string | null;
    matched: boolean;
    displayName: string;
    email: string;
    avatarUrl: string;
    cosineSimilarity: number;
    l2Distance: number;
  }> = [];

  ngOnInit(): void {
    this.initMediaPipe();
  }

  ngOnDestroy(): void {
    this.stopCamera();
    this.stopScanning();
    if (this.streamSub) {
      this.streamSub.unsubscribe();
      this.streamSub = null;
    }
    if (this.alignedPreviewUrl) {
      URL.revokeObjectURL(this.alignedPreviewUrl);
    }
  }

  // --- Khởi tạo MediaPipe BlazeFace Detector ---
  private async initMediaPipe(): Promise<void> {
    try {
      this.loadingDetector = true;
      const visionUrl = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.8";
      const vision = await Function(`return import("${visionUrl}")`)();
      const filesetResolver = await vision.FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.8/wasm"
      );
      this.faceDetector = await vision.FaceDetector.createFromOptions(filesetResolver, {
        baseOptions: {
          modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite",
          delegate: "GPU"
        },
        runningMode: "IMAGE"
      });
      this.detectorReady = true;
      this.startCamera();
    } catch (error) {
      console.error("[MediaPipe Camera] Init Failed: ", error);
      this.message.error("Không thể khởi tạo mô hình phát hiện khuôn mặt BlazeFace ở Client.");
    } finally {
      this.loadingDetector = false;
    }
  }

  // --- Kích hoạt Webcam ---
  async startCamera(): Promise<void> {
    this.cameraError = null;
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' },
        audio: false
      });
      if (this.videoElement && this.videoElement.nativeElement) {
        this.videoElement.nativeElement.srcObject = this.stream;
        this.videoElement.nativeElement.onloadedmetadata = () => {
          this.videoElement.nativeElement.play();
          this.cameraActive = true;
          this.startScanning();
        };
      }
    } catch (err: any) {
      console.error("[Webcam] Access Failed: ", err);
      this.cameraError = "Không thể truy cập camera. Vui lòng cấp quyền camera trong trình duyệt hoặc sử dụng giao thức HTTPS/Localhost.";
      this.message.error("Lỗi kích hoạt Webcam.");
    }
  }

  // --- Tắt Webcam ---
  stopCamera(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    this.cameraActive = false;
    this.stopScanning();
    this.clearOverlay();
  }

  // --- Quản lý chu trình tự động quét ---
  startScanning(): void {
    if (!this.detectorReady || !this.cameraActive) return;
    this.isScanning = true;
    this.scanTimer = setInterval(() => {
      this.processVideoFrame();
    }, this.scanRateMs);
  }

  stopScanning(): void {
    this.isScanning = false;
    if (this.scanTimer) {
      clearInterval(this.scanTimer);
      this.scanTimer = null;
    }
  }

  toggleScanning(): void {
    if (this.isScanning) {
      this.stopScanning();
    } else {
      this.startScanning();
    }
  }

  // --- Vẽ khung quét nhấp nháy trên canvas đè lên video ---
  private drawTargetOutline(bbox: any): void {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasOverlay.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Thiết lập kích thước canvas đồng bộ với video
    if (canvas.width !== video.clientWidth || canvas.height !== video.clientHeight) {
      canvas.width = video.clientWidth;
      canvas.height = video.clientHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Tỉ lệ scale thực tế giữa thẻ video hiển thị và độ phân giải nguồn video 640x480
    const scaleX = canvas.width / video.videoWidth;
    const scaleY = canvas.height / video.videoHeight;

    const x = bbox.originX * scaleX;
    const y = bbox.originY * scaleY;
    const w = bbox.width * scaleX;
    const h = bbox.height * scaleY;

    // Vẽ góc vuông của khung nhắm mục tiêu (Target Brackets) tạo hiệu ứng quân sự/AI
    ctx.strokeStyle = this.bestMatchUser ? '#52c41a' : '#1890ff';
    ctx.lineWidth = 3;
    const cornerLength = Math.min(w, h) * 0.25;

    // Góc trên bên trái
    ctx.beginPath();
    ctx.moveTo(x + cornerLength, y);
    ctx.lineTo(x, y);
    ctx.lineTo(x, y + cornerLength);
    ctx.stroke();

    // Góc trên bên phải
    ctx.beginPath();
    ctx.moveTo(x + w - cornerLength, y);
    ctx.lineTo(x + w, y);
    ctx.lineTo(x + w, y + cornerLength);
    ctx.stroke();

    // Góc dưới bên trái
    ctx.beginPath();
    ctx.moveTo(x, y + h - cornerLength);
    ctx.lineTo(x, y + h);
    ctx.lineTo(x + cornerLength, y + h);
    ctx.stroke();

    // Góc dưới bên phải
    ctx.beginPath();
    ctx.moveTo(x + w - cornerLength, y + h);
    ctx.lineTo(x + w, y + h);
    ctx.lineTo(x + w, y + h - cornerLength);
    ctx.stroke();

    // Vẽ tâm nhắm
    ctx.fillStyle = this.bestMatchUser ? 'rgba(82, 196, 26, 0.15)' : 'rgba(24, 144, 255, 0.1)';
    ctx.fillRect(x, y, w, h);
  }

  private clearOverlay(): void {
    if (this.canvasOverlay && this.canvasOverlay.nativeElement) {
      const canvas = this.canvasOverlay.nativeElement;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  // --- Trích xuất ảnh và so khớp từ luồng video ---
  private async processVideoFrame(): Promise<void> {
    if (!this.detectorReady || !this.faceDetector || this.isComparing || !this.cameraActive) return;

    const video = this.videoElement.nativeElement;
    if (video.paused || video.ended) return;

    try {
      const detections = this.faceDetector.detect(video).detections || [];
      if (detections.length === 0) {
        this.noFaceDetected = true;
        this.faceTooSmall = false;
        this.clearOverlay();
        return;
      }

      this.noFaceDetected = false;

      // Lọc khuôn mặt đủ rộng
      const largeEnoughDetections = detections.filter((d: any) =>
        d.boundingBox.width >= this.minFaceWidthPx
      );

      if (largeEnoughDetections.length === 0) {
        this.faceTooSmall = true;
        this.clearOverlay();
        return;
      }

      this.faceTooSmall = false;

      // Chọn khuôn mặt lớn nhất
      const det = largeEnoughDetections.reduce((best: any, cur: any) =>
        cur.boundingBox.width > best.boundingBox.width ? cur : best
      );

      this.drawTargetOutline(det.boundingBox);

      const keypoints = det.keypoints || [];
      if (keypoints.length < 2) return;

      this.isComparing = true;

      // Chuẩn hóa tọa độ mắt về độ phân giải nguồn video
      const eyeLeft = {
        x: keypoints[0].x * video.videoWidth,
        y: keypoints[0].y * video.videoHeight
      };
      const eyeRight = {
        x: keypoints[1].x * video.videoWidth,
        y: keypoints[1].y * video.videoHeight
      };

      // Map eye coordinates from video space to cropped padded image space
      const padX = det.boundingBox.width * 0.6;
      const padY = det.boundingBox.height * 0.6;
      const cropX = Math.max(0, det.boundingBox.originX - padX);
      const cropY = Math.max(0, det.boundingBox.originY - padY);
      const cropW = Math.min(video.videoWidth - cropX, det.boundingBox.width + padX * 2);
      const cropH = Math.min(video.videoHeight - cropY, det.boundingBox.height + padY * 2);

      const maxDim = 256;
      const clientScale = Math.min(maxDim / cropW, maxDim / cropH, 1.0); // <-- BIẾN SCALE CẦN GỬI

      const eyeLeftX = (eyeLeft.x - cropX) * clientScale;
      const eyeLeftY = (eyeLeft.y - cropY) * clientScale;
      const eyeRightX = (eyeRight.x - cropX) * clientScale;
      const eyeRightY = (eyeRight.y - cropY) * clientScale;

      // Crop khuôn mặt với padding lớn từ video thô
      const paddedBlob = this.cropFaceWithPadding(video, det.boundingBox, 0.6);

      // Đồng thời render preview Affine 112x112 cho người dùng theo dõi cục bộ
      const alignedCanvasEl = this.alignedCanvas.nativeElement;
      this.alignFaceBrowser(video, eyeLeft, eyeRight, alignedCanvasEl);

      alignedCanvasEl.toBlob((previewBlob) => {
        if (previewBlob) {
          if (this.alignedPreviewUrl) URL.revokeObjectURL(this.alignedPreviewUrl);
          this.alignedPreviewUrl = URL.createObjectURL(previewBlob);
        }
      }, 'image/jpeg', 0.9);

      if (!paddedBlob) {
        this.isComparing = false;
        return;
      }

      const file = new File([paddedBlob], 'face_padded.jpg', { type: 'image/jpeg' });

      if (this.streamSub) {
        this.streamSub.unsubscribe();
        this.streamSub = null;
      }

      // BỔ SUNG: Truyền thêm `scale` vào hàm gọi API của bạn
      this.streamSub = this.api.compareGlobalStream(
        file,
        this.compareThreshold,
        eyeLeftX,
        eyeLeftY,
        eyeRightX,
        eyeRightY,
        padX,
        padY,
        clientScale // <-- Thêm tham số này vào Service API
      ).subscribe({
        next: (event: any) => {
          if (event.status === 'success') {
            const result = event;
            this.compareResults = result;
            const snapshotUrl = this.alignedPreviewUrl;
            if (result && result.bestMatch) {
              this.bestMatchUser = result.bestMatch;
              this.belowThreshold = false;
              this.addToHistory(result.bestMatch, snapshotUrl, true);
            } else {
              this.bestMatchUser = null;
              this.belowThreshold = true;
              this.addToHistory(null, snapshotUrl, false);
            }
            this.isComparing = false;
          } else if (event.status === 'error') {
            console.error("Lỗi so khớp máy chủ: ", event.message);
            this.bestMatchUser = null;
            this.isComparing = false;
          } else {
            console.log(`[SSE Stream Status] ${event.status}`);
          }
        },
        error: (err: any) => {
          console.error("Lỗi stream máy chủ: ", err);
          this.bestMatchUser = null;
          this.isComparing = false;
        }
      });

    } catch (err) {
      console.error("[Scanner Frame] Error: ", err);
      this.isComparing = false;
    }
  }

  /**
   * Crop khuôn mặt với padding lớn từ video stream.
   * Padding = 0.6 nghĩa là mỗi cạnh được mở rộng thêm 60% chiều rộng bbox.
   * Điều này giúp server có đủ vùng để detect + align chính xác.
   */
  private cropFaceWithPadding(video: HTMLVideoElement, bbox: any, paddingFactor: number): Blob | null {
    const padX = bbox.width * paddingFactor;
    const padY = bbox.height * paddingFactor;
    const x = Math.max(0, bbox.originX - padX);
    const y = Math.max(0, bbox.originY - padY);
    const w = Math.min(video.videoWidth - x, bbox.width + padX * 2);
    const h = Math.min(video.videoHeight - y, bbox.height + padY * 2);

    // Tính kích thước output tối đa 256px để tiết kiệm băng thông
    const maxDim = 256;
    const clientScale = Math.min(maxDim / w, maxDim / h, 1.0);
    const outW = Math.round(w * clientScale);
    const outH = Math.round(h * clientScale);

    const cropCanvas = document.createElement('canvas');
    cropCanvas.width = outW;
    cropCanvas.height = outH;
    const ctx = cropCanvas.getContext('2d');
    if (!ctx) return null;

    ctx.drawImage(video, x, y, w, h, 0, 0, outW, outH);

    let resultBlob: Blob | null = null;
    // synchronous toBlob via toDataURL fallback for immediate return
    const dataUrl = cropCanvas.toDataURL('image/jpeg', 0.9);
    const byteString = atob(dataUrl.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    resultBlob = new Blob([ab], { type: 'image/jpeg' });
    return resultBlob;
  }

  // --- Thuật toán căn chỉnh mắt Affine ---
  private alignFaceBrowser(
    videoEl: HTMLVideoElement,
    eyeLeft: { x: number, y: number },
    eyeRight: { x: number, y: number },
    canvas: HTMLCanvasElement
  ): void {
    canvas.width = 112;
    canvas.height = 112;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Không thể khởi tạo Canvas 2D Context");

    const cx = (eyeLeft.x + eyeRight.x) / 2;
    const cy = (eyeLeft.y + eyeRight.y) / 2;
    const dx = eyeRight.x - eyeLeft.x;
    const dy = eyeRight.y - eyeLeft.y;

    const currentDist = Math.sqrt(dx * dx + dy * dy);
    const angleRad = Math.atan2(dy, dx);

    const targetDist = 35.2372;
    const tx = 55.9132;
    const ty = 51.59885;
    const scale = targetDist / currentDist;

    ctx.save();
    ctx.translate(tx, ty);
    ctx.scale(scale, scale);
    ctx.rotate(-angleRad);
    ctx.translate(-cx, -cy);
    ctx.drawImage(videoEl, 0, 0);
    ctx.restore();
  }
  // --- Thêm kết quả vào lịch sử nhận diện ---
  private addToHistory(bestMatch: any, previewUrl: string | null, matched: boolean): void {
    const entry = {
      timestamp: new Date(),
      previewUrl: previewUrl ? previewUrl : null,
      matched,
      displayName: bestMatch?.displayName || bestMatch?.username || '---',
      email: bestMatch?.email || '',
      avatarUrl: bestMatch?.avatarUrl || '',
      cosineSimilarity: bestMatch?.cosineSimilarity ?? 0,
      l2Distance: bestMatch?.l2Distance ?? 0,
    };
    this.recognitionHistory = [entry, ...this.recognitionHistory].slice(0, 5);
  }

  clearHistory(): void {
    this.recognitionHistory = [];
  }

  async reloadCache(): Promise<void> {
    if (this.reloadingCache) return;
    this.reloadingCache = true;
    try {
      const res: any = await this.api.reloadCache();
      this.message.success(res?.message || "Tải lại cache thành công.");
    } catch (err: any) {
      console.error("[Reload Cache] Failed: ", err);
      this.message.error(err.error?.message || err.message || "Lỗi khi tải lại cache.");
    } finally {
      this.reloadingCache = false;
    }
  }
}
