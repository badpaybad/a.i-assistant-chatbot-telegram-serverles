import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { AppNotificationService, FirebaseService } from '@tot/core';
import { NhanDienKhuonMatService } from '../../services/nhan-dien-khuon-mat.service';
import { Unsubscribe } from 'firebase/firestore';

interface DetectedFace {
  id: string;
  boundingBox: string; // JSON {"x": 10, "y": 20, "w": 100, "h": 100}
  croppedUrl: string;
  blob: Blob;
  selected: boolean;
}

interface ProcessedPhoto {
  id: string;
  fileName: string;
  file: File;
  faces: DetectedFace[];
  canvasDrawn: boolean;
}

@Component({
  selector: 'tot-nhan-dien-khuon-mat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzProgressModule,
    NzSwitchModule,
    NzGridModule,
    NzIconModule,
    NzSpinModule
  ],
  templateUrl: './nhan-dien-khuon-mat.html',
  styleUrl: './nhan-dien-khuon-mat.css',
})
export class NhanDienKhuonMatComponent implements OnInit, OnDestroy, AfterViewChecked {
  private service = inject(NhanDienKhuonMatService);
  private firebase = inject(FirebaseService);
  private notification = inject(AppNotificationService);
  private cdr = inject(ChangeDetectorRef);

  // MediaPipe Face Detection state variables
  private faceDetection: any = null;
  mediaPipeLoaded = false;
  private unsubscribes: Unsubscribe[] = [];

  // Dropzone State
  isDragActive = false;

  // Processing States
  isProcessing = false;
  totalFilesToProcess = 0;
  scannedCount = 0;
  scanPercent = 0;
  totalDetectedFacesCount = 0;
  currentScanImgUrl: string | null = null;

  // Data Store
  processedPhotos: ProcessedPhoto[] = [];

  // Upload States
  isUploading = false;
  uploadPercent = 0;
  currentUploadIndex = 0;
  totalUploadCount = 0;
  uploadSuccess = false;

  ngOnInit() {
    this.loadMediaPipeScripts()
      .then(() => this.initializeMediaPipe())
      .catch((err) => {
        this.notification.error('Lỗi tải MediaPipe', 'Không thể tải thư viện MediaPipe Face Detection từ CDN.');
        console.error(err);
      });
  }

  ngOnDestroy() {
    this.cleanupUnsubscribes();
    // Clean up created URLs
    if (this.currentScanImgUrl) {
      URL.revokeObjectURL(this.currentScanImgUrl);
    }
    this.processedPhotos.forEach(photo => {
      photo.faces.forEach(face => URL.revokeObjectURL(face.croppedUrl));
    });
  }

  ngAfterViewChecked() {
    // Dynamically draw the original image and bounding boxes onto canvases for processed images
    this.drawOriginalCanvases();
  }

  private cleanupUnsubscribes() {
    this.unsubscribes.forEach(unsub => unsub());
    this.unsubscribes = [];
  }

  /**
   * Loads the MediaPipe Face Detection scripts from jsdelivr CDN dynamically
   */
  private loadMediaPipeScripts(): Promise<void> {
    if ((window as any).FaceDetection) {
      this.mediaPipeLoaded = true;
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/face_detection.js';
      script.crossOrigin = 'anonymous';
      script.onload = () => {
        this.mediaPipeLoaded = true;
        resolve();
      };
      script.onerror = (e) => reject(new Error('Không thể tải thư viện MediaPipe Face Detection.'));
      document.head.appendChild(script);
    });
  }

  /**
   * Initializes the MediaPipe FaceDetection class with its configurations
   */
  private initializeMediaPipe() {
    try {
      const FaceDetectionClass = (window as any).FaceDetection;
      if (!FaceDetectionClass) {
        throw new Error('FaceDetection class not found on window object.');
      }

      this.faceDetection = new FaceDetectionClass({
        locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`
      });

      this.faceDetection.setOptions({
        model: 'short',
        minDetectionConfidence: 0.55
      });
    } catch (e) {
      this.notification.error('Khởi tạo thất bại', 'Không thể khởi tạo mô hình MediaPipe.');
      console.error(e);
    }
  }

  /**
   * Dropzone Drag / Drop Events
   */
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragActive = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragActive = false;
  }

  async onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragActive = false;

    if (!event.dataTransfer || event.dataTransfer.items.length === 0) return;

    const files: File[] = [];
    const items = event.dataTransfer.items;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.kind === 'file') {
        const entry = item.webkitGetAsEntry();
        if (entry) {
          const entryFiles = await this.getFilesFromDroppedEntry(entry);
          files.push(...entryFiles);
        }
      }
    }

    if (files.length > 0) {
      this.startFaceDetectionQueue(files);
    } else {
      this.notification.warning('Không tìm thấy tệp ảnh', 'Vui lòng kéo thả thư mục chứa tệp tin hình ảnh.');
    }
  }

  /**
   * Folder Selection Event via browser input directory pick
   */
  onFolderSelected(event: any) {
    const fileList: FileList = event.target.files;
    if (!fileList || fileList.length === 0) return;

    const files: File[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (file.type.startsWith('image/')) {
        files.push(file);
      }
    }

    if (files.length > 0) {
      this.startFaceDetectionQueue(files);
    } else {
      this.notification.warning('Không tìm thấy tệp ảnh', 'Thư mục được chọn không chứa tệp tin hình ảnh hợp lệ.');
    }
  }

  /**
   * Recursively traverses dropped directories under FileSystem Entry API
   */
  private async getFilesFromDroppedEntry(entry: any): Promise<File[]> {
    const files: File[] = [];
    const traverse = async (ent: any) => {
      if (ent.isFile) {
        const file = await new Promise<File>((resolve, reject) => ent.file(resolve, reject));
        if (file.type.startsWith('image/')) {
          files.push(file);
        }
      } else if (ent.isDirectory) {
        const reader = ent.createReader();
        // Read all entries in directory
        const entries = await new Promise<any[]>((resolve) => {
          reader.readEntries(resolve);
        });
        for (const child of entries) {
          await traverse(child);
        }
      }
    };
    await traverse(entry);
    return files;
  }

  /**
   * Triggers sequential processing queue for local face detection
   */
  private async startFaceDetectionQueue(files: File[]) {
    if (!this.faceDetection) {
      this.notification.warning('Đang tải mô hình', 'Vui lòng đợi giây lát trong khi mô hình MediaPipe đang khởi động.');
      return;
    }

    this.isProcessing = true;
    this.totalFilesToProcess = files.length;
    this.scannedCount = 0;
    this.scanPercent = 0;
    this.totalDetectedFacesCount = 0;
    this.processedPhotos = [];

    this.cdr.detectChanges();

    for (const file of files) {
      await this.processSingleImage(file);
      this.scannedCount++;
      this.scanPercent = Math.round((this.scannedCount / this.totalFilesToProcess) * 100);
      this.cdr.detectChanges();
    }

    this.isProcessing = false;
    this.currentScanImgUrl = null;
    this.cdr.detectChanges();

    if (this.totalDetectedFacesCount > 0) {
      this.notification.success('Hoàn thành quét', `Quá trình quét hoàn tất! Tìm thấy tổng cộng ${this.totalDetectedFacesCount} khuôn mặt từ ${this.getPhotosWithFacesCount()} ảnh.`);
    } else {
      this.notification.info('Không có khuôn mặt', 'Đã quét xong nhưng không tìm thấy khuôn mặt nào trong thư mục.');
    }
  }

  /**
   * Promisify MediaPipe's callback-based face detection
   */
  private detectFacesMediaPipe(image: HTMLImageElement | HTMLCanvasElement): Promise<any[]> {
    return new Promise((resolve) => {
      this.faceDetection.onResults((results: any) => {
        resolve(results.detections || []);
      });
      this.faceDetection.send({ image });
    });
  }

  /**
   * Uses HTML5 Canvas offscreen pipeline to scale and crop face regions using MediaPipe Face Detection
   */
  private async processSingleImage(file: File): Promise<void> {
    const objectUrl = URL.createObjectURL(file);
    this.currentScanImgUrl = objectUrl;
    this.cdr.detectChanges();

    try {
      // 1. Load image offscreen
      const img = new Image();
      img.src = objectUrl;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      // 2. Run MediaPipe Face Detection
      const detections = await this.detectFacesMediaPipe(img);
      const faces: DetectedFace[] = [];

      if (detections.length > 0) {
        // 3. Setup Canvas for cropping
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0);

        // 4. Crop and save detected faces
        for (let i = 0; i < detections.length; ++i) {
          const det = detections[i];
          const bbox = det.boundingBox;

          // MediaPipe returns normalized coordinates (0.0 to 1.0)
          const w = bbox.width * img.width;
          const h = bbox.height * img.height;
          const x = (bbox.xCenter - bbox.width / 2) * img.width;
          const y = (bbox.yCenter - bbox.height / 2) * img.height;

          // Crop slightly padded square to make it look professional
          const pad = w * 0.15;
          const cropX = Math.max(0, x - pad);
          const cropY = Math.max(0, y - pad);
          const cropSize = Math.min(img.width - cropX, img.height - cropY, w + pad * 2);

          const faceCanvas = document.createElement('canvas');
          faceCanvas.width = 150;
          faceCanvas.height = 150;
          const faceCtx = faceCanvas.getContext('2d')!;
          
          // Draw cropped section resized to 150x150
          faceCtx.drawImage(canvas, cropX, cropY, cropSize, cropSize, 0, 0, 150, 150);

          const faceBlob = await new Promise<Blob>((resolve, reject) => {
            faceCanvas.toBlob((blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('Không thể trích xuất ảnh khuôn mặt.'));
              }
            }, 'image/jpeg', 0.95);
          });
          const croppedUrl = URL.createObjectURL(faceBlob);

          const bboxJson = JSON.stringify({
            x: Math.round(cropX),
            y: Math.round(cropY),
            w: Math.round(cropSize),
            h: Math.round(cropSize)
          });

          faces.push({
            id: 'face_' + Math.random().toString(36).substr(2, 9),
            boundingBox: bboxJson,
            croppedUrl,
            blob: faceBlob,
            selected: true // Default is selected to keep
          });

          this.totalDetectedFacesCount++;
        }
      }

      if (faces.length > 0) {
        this.processedPhotos.push({
          id: 'photo_' + Math.random().toString(36).substr(2, 9),
          fileName: file.name,
          file,
          faces,
          canvasDrawn: false
        });
      }
    } catch (e) {
      console.error('Error processing image tệp tin: ' + file.name, e);
    }
  }

  /**
   * Renders original image on UI card preview canvas with green bounding boxes
   */
  private drawOriginalCanvases() {
    this.processedPhotos.forEach(photo => {
      if (photo.canvasDrawn) return;

      const canvas = document.getElementById('canvas_' + photo.id) as HTMLCanvasElement;
      if (!canvas) return;

      photo.canvasDrawn = true;
      const ctx = canvas.getContext('2d')!;
      
      const img = new Image();
      img.src = URL.createObjectURL(photo.file);
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Draw bounding boxes on canvas
        photo.faces.forEach(face => {
          const box = JSON.parse(face.boundingBox);
          ctx.strokeStyle = '#00ffcc';
          ctx.lineWidth = Math.max(3, Math.round(img.width * 0.005));
          ctx.strokeRect(box.x, box.y, box.w, box.h);
        });

        URL.revokeObjectURL(img.src);
      };
    });
  }

  /**
   * Helper Stats Calculations
   */
  getPhotosWithFacesCount(): number {
    return this.processedPhotos.filter(p => p.faces.length > 0).length;
  }

  getSelectedFacesCount(): number {
    let count = 0;
    this.processedPhotos.forEach(p => {
      count += p.faces.filter(f => f.selected).length;
    });
    return count;
  }

  getSelectedOriginalPhotosCount(): number {
    return this.processedPhotos.filter(p => p.faces.some(f => f.selected)).length;
  }

  resetAll() {
    // Cleanup URLs
    this.processedPhotos.forEach(photo => {
      photo.faces.forEach(face => URL.revokeObjectURL(face.croppedUrl));
    });
    this.processedPhotos = [];
    this.totalDetectedFacesCount = 0;
    this.cdr.detectChanges();
  }

  closeSuccessView() {
    this.uploadSuccess = false;
    this.isUploading = false;
    this.resetAll();
  }

  /**
   * Formats uploading progress percentage inside nz-progress circle
   */
  uploadProgressFormat = (percent: number) => {
    return percent === 100 ? 'Xong' : `${percent}%`;
  };

  /**
   * Iterates through selected face sessions and uploads multipart data asynchronously.
   * Tracks completion through Firestore Realtime event subscription via subscribeToRequestId
   */
  async uploadAndSave() {
    const photosToUpload = this.processedPhotos.filter(p => p.faces.some(f => f.selected));
    if (photosToUpload.length === 0) return;

    this.isUploading = true;
    this.uploadSuccess = false;
    this.totalUploadCount = photosToUpload.length;
    this.currentUploadIndex = 0;
    this.uploadPercent = 0;
    this.cdr.detectChanges();

    this.cleanupUnsubscribes();

    try {
      for (let i = 0; i < photosToUpload.length; i++) {
        const photo = photosToUpload[i];
        const selectedFaces = photo.faces.filter(f => f.selected);
        
        this.currentUploadIndex = i + 1;
        this.uploadPercent = Math.round((i / this.totalUploadCount) * 100);
        this.cdr.detectChanges();

        // 1. Generate unique Tracking ID for realtime notification
        const trackingId = this.generateUuid();

        // 2. Subscribe to Firestore for realtime event before POSTing
        await new Promise<void>((resolve, reject) => {
          const unsub = this.firebase.subscribeToRequestId(trackingId, (eventData) => {
            if (eventData.status === 'Completed') {
              resolve();
            } else {
              reject(new Error(eventData.message || 'Lỗi lưu trữ ảnh gốc hoặc khuôn mặt.'));
            }
          });
          this.unsubscribes.push(unsub);

          // 3. POST data with the tracking id inside headers
          this.service.saveSession(photo.file, selectedFaces, trackingId).catch((err) => {
            reject(err);
          });
        });
      }

      this.uploadPercent = 100;
      this.uploadSuccess = true;
      this.cdr.detectChanges();
      this.notification.success('Thành công', 'Đã lưu trữ thành công phiên nhận diện khuôn mặt!');
    } catch (err: any) {
      this.isUploading = false;
      this.notification.error('Lỗi tải lên', err.message || 'Đã xảy ra sự cố trong quá trình lưu trữ.');
      console.error(err);
    }
  }

  private generateUuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
