import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { TotButtonComponent } from '@tot/shared';
import { NhanDienKhuonMatService } from '../services/nhan-dien-khuon-mat.service';
import { NhanDienKhuonMatComponent } from '../nhan-dien-khuon-mat.component';

@Component({
  selector: 'tot-nhan-dien-training',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzCardModule,
    NzTagModule,
    NzSpinModule,
    NzTableModule,
    NzCheckboxModule,
    NzModalModule,
    NzIconModule,
    NzDividerModule,
    NzBadgeModule,
    NzAlertModule,
    NzSliderModule,
    NzInputNumberModule,
    NzTooltipModule,
    TotButtonComponent
  ],
  templateUrl: './training.component.html',
  styleUrl: './training.component.css'
})
export class TrainingComponent implements OnInit, OnDestroy {
  private api = inject(NhanDienKhuonMatService);
  private message = inject(NzMessageService);
  private modal = inject(NzModalService);

  // Danh sách user có định nghĩa khuôn mặt
  usersWithDefs: any[] = [];
  loadingUsers: boolean = false;

  // Trạng thái chọn user để train
  selectedUserIds: Set<string> = new Set();

  // SSE streaming state
  isTraining: boolean = false;
  trainingLogs: string[] = [];
  private eventSource: EventSource | null = null;
  trainingDoneFolder: string | null = null;

  // Danh sách thư mục đã huấn luyện
  trainingFolders: any[] = [];
  loadingFolders: boolean = false;

  // Trạng thái trích xuất embedding
  extractingFolder: string | null = null;

  // === EMBEDDINGS MANAGEMENT STATE ===
  embeddingsList: any[] = [];
  loadingEmbeddings: boolean = false;

  // === COMPARE MODAL STATE ===
  showCompareModal: boolean = false;
  targetEmbeddingId: string | null = null;
  targetEmbeddingUser: any = null;
  compareThreshold: number = 0.6;
  selectedCompareFile: File | null = null;
  compareFilePreview: string | null = null;
  isComparing: boolean = false;
  compareResults: any = null;

  // === MEDIAPIPE FACE DETECTOR (CLIENT-SIDE ALIGNMENT) ===
  loadingDetector: boolean = false;
  detectorReady: boolean = false;
  faceDetector: any = null;

  ngOnInit(): void {
    this.loadUsersWithDefinitions();
    this.loadTrainingFolders();
    this.loadEmbeddings();
    this.initMediaPipe();
  }

  ngOnDestroy(): void {
    this.closeEventSource();
    if (this.compareFilePreview) {
      URL.revokeObjectURL(this.compareFilePreview);
    }
  }

  // --- Khởi tạo MediaPipe trên Client-side ---
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
    } catch (error) {
      console.error("[MediaPipe] Init Failed in Training Component: ", error);
      this.message.error("Không thể khởi tạo mô hình phát hiện khuôn mặt MediaPipe ở Client.");
    } finally {
      this.loadingDetector = false;
    }
  }

  async loadUsersWithDefinitions(): Promise<void> {
    this.loadingUsers = true;
    try {
      const result: any = await this.api.getUsersWithDefinitions();
      this.usersWithDefs = result || [];
    } catch (error) {
      this.message.error('Lỗi khi tải danh sách user có định nghĩa khuôn mặt.');
    } finally {
      this.loadingUsers = false;
    }
  }

  async loadTrainingFolders(): Promise<void> {
    this.loadingFolders = true;
    try {
      const result: any = await this.api.getTrainingFolders();
      this.trainingFolders = result || [];
    } catch (error) {
      this.message.error('Lỗi khi tải danh sách phiên đào tạo.');
    } finally {
      this.loadingFolders = false;
    }
  }

  async loadEmbeddings(): Promise<void> {
    this.loadingEmbeddings = true;
    try {
      const result: any = await this.api.getEmbeddings();
      this.embeddingsList = result || [];
    } catch (error) {
      this.message.error('Lỗi khi tải danh sách vector embedding đã lưu.');
    } finally {
      this.loadingEmbeddings = false;
    }
  }

  toggleUserSelection(userId: string): void {
    if (this.selectedUserIds.has(userId)) {
      this.selectedUserIds.delete(userId);
    } else {
      this.selectedUserIds.add(userId);
    }
    this.selectedUserIds = new Set(this.selectedUserIds);
  }

  isUserSelected(userId: string): boolean {
    return this.selectedUserIds.has(userId);
  }

  selectAll(): void {
    this.selectedUserIds = new Set(this.usersWithDefs.map(u => u.id));
  }

  deselectAll(): void {
    this.selectedUserIds = new Set();
  }

  startTraining(): void {
    if (this.selectedUserIds.size === 0) {
      this.message.warning('Vui lòng chọn ít nhất một user để đào tạo.');
      return;
    }

    if (this.isTraining) {
      this.message.warning('Tiến trình đào tạo đang chạy. Vui lòng chờ hoặc hủy.');
      return;
    }

    this.trainingLogs = [];
    this.trainingDoneFolder = null;
    this.isTraining = true;

    const userIds = Array.from(this.selectedUserIds);
    this.eventSource = this.api.streamTraining(userIds);

    this.eventSource.onmessage = (event) => {
      const line: string = event.data || '';
      this.trainingLogs = [...this.trainingLogs, line];

      setTimeout(() => {
        const logEl = document.getElementById('training-log-panel');
        if (logEl) logEl.scrollTop = logEl.scrollHeight;
      }, 50);

      if (line.startsWith('[DONE]')) {
        const parts = line.split(' ');
        if (parts.length >= 2) {
          this.trainingDoneFolder = parts[1].trim();
        }
        this.finishTraining();
      }

      if (line.startsWith('[ERROR]') && !this.trainingDoneFolder) {
        this.isTraining = false;
        this.closeEventSource();
      }
    };

    this.eventSource.onerror = () => {
      if (this.isTraining) {
        this.trainingLogs = [...this.trainingLogs, '[SYSTEM] Kết nối SSE bị gián đoạn hoặc đào tạo hoàn tất.'];
        this.finishTraining();
      }
    };
  }

  cancelTraining(): void {
    this.modal.confirm({
      nzTitle: 'Xác nhận hủy đào tạo?',
      nzContent: 'Hành động này sẽ ngắt kết nối SSE và dừng tiến trình đào tạo.',
      nzOkDanger: true,
      nzOnOk: () => {
        this.closeEventSource();
        this.isTraining = false;
        this.trainingLogs = [...this.trainingLogs, '[SYSTEM] Đào tạo đã bị hủy bởi người dùng.'];
      }
    });
  }

  private finishTraining(): void {
    this.isTraining = false;
    this.closeEventSource();
    if (this.trainingDoneFolder) {
      this.message.success(`Đào tạo hoàn tất! Thư mục: ${this.trainingDoneFolder}`);
      this.loadTrainingFolders();
    }
  }

  private closeEventSource(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }

  async extractEmbeddings(folder: any): Promise<void> {
    if (!folder.hasBestModel) {
      this.message.warning('Thư mục này không có mô hình tốt nhất (arcface_model_best.onnx) để trích xuất.');
      return;
    }

    this.extractingFolder = folder.folderName;
    try {
      const result: any = await this.api.extractEmbeddings(folder.folderName);
      this.message.success(`Trích xuất hoàn tất: ${result.processedCount} embedding, ${result.errorCount} lỗi.`);
      this.loadEmbeddings();
    } catch (error: any) {
      this.message.error(error?.error?.message || 'Lỗi khi trích xuất embedding.');
    } finally {
      this.extractingFolder = null;
    }
  }

  // --- Thêm ảnh định nghĩa khuôn mặt qua Modal chứa NhanDienKhuonMatComponent ---
  openFaceDefModal(user: any): void {
    const modalRef = this.modal.create({
      nzTitle: `Định nghĩa khuôn mặt cho: ${user.displayName || user.username}`,
      nzContent: NhanDienKhuonMatComponent,
      nzWidth: 1100,
      nzFooter: null,
      nzBodyStyle: { padding: '12px' }
    });

    modalRef.afterClose.subscribe(() => {
      this.loadUsersWithDefinitions();
    });
  }

  // --- Quản lý Xóa Vector Embedding ---
  async deleteUserEmbeddings(userId: string): Promise<void> {
    this.modal.confirm({
      nzTitle: 'Xác nhận xóa tất cả embedding của user?',
      nzContent: 'Hành động này sẽ xóa toàn bộ vector đặc trưng của user này trong database. Thao tác này không thể hoàn tác!',
      nzOkDanger: true,
      nzOnOk: async () => {
        try {
          await this.api.deleteUserEmbeddings(userId);
          this.message.success('Đã xóa toàn bộ embedding của user thành công.');
          this.loadEmbeddings();
          this.loadUsersWithDefinitions();
        } catch (error) {
          this.message.error('Lỗi khi xóa embedding của user.');
        }
      }
    });
  }

  async deleteEmbedding(id: string): Promise<void> {
    this.modal.confirm({
      nzTitle: 'Xác nhận xóa embedding này?',
      nzContent: 'Xóa vector đặc trưng này khỏi database.',
      nzOkDanger: true,
      nzOnOk: async () => {
        try {
          await this.api.deleteEmbedding(id);
          this.message.success('Đã xóa embedding thành công.');
          this.loadEmbeddings();
          this.loadUsersWithDefinitions();
        } catch (error) {
          this.message.error('Lỗi khi xóa embedding.');
        }
      }
    });
  }

  copyEmbedding(emb: number[]): void {
    const str = JSON.stringify(emb);
    navigator.clipboard.writeText(str).then(() => {
      this.message.success('Đã copy vector embedding vào clipboard.');
    }, () => {
      this.message.error('Không thể copy vector.');
    });
  }

  // --- Kiểm tra Đối sánh khuôn mặt & Face Alignment ở Client ---
  openCompareModal(embedding: any, user: any): void {
    this.targetEmbeddingId = embedding.id;
    this.targetEmbeddingUser = user;
    this.compareThreshold = 0.6;
    this.selectedCompareFile = null;
    this.compareFilePreview = null;
    this.compareResults = null;
    this.showCompareModal = true;
  }

  closeCompareModal(): void {
    this.showCompareModal = false;
    this.targetEmbeddingId = null;
    this.targetEmbeddingUser = null;
    this.selectedCompareFile = null;
    if (this.compareFilePreview) {
      URL.revokeObjectURL(this.compareFilePreview);
      this.compareFilePreview = null;
    }
    this.compareResults = null;
  }

  async onCompareFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      await this.processAndAlignTestFile(file);
      input.value = ''; // Reset input to allow choosing the same file again
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  async onCompareFileDrop(event: DragEvent): Promise<void> {
    event.preventDefault();
    if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        await this.processAndAlignTestFile(file);
      } else {
        this.message.warning("Vui lòng chỉ kéo thả tệp hình ảnh.");
      }
    }
  }

  async processAndAlignTestFile(file: File): Promise<void> {
    if (!this.detectorReady || !this.faceDetector) {
      this.message.warning('MediaPipe đang tải. Vui lòng chờ vài giây.');
      await this.initMediaPipe();
      if (!this.detectorReady) return;
    }

    this.isComparing = true;
    const tempUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = async () => {
      try {
        const result = this.faceDetector.detect(img);
        const detections = result.detections || [];
        if (detections.length === 0) {
          this.message.error('Không tìm thấy khuôn mặt trong ảnh kiểm tra. Vui lòng chọn ảnh rõ khuôn mặt.');
          URL.revokeObjectURL(tempUrl);
          this.isComparing = false;
          return;
        }

        const det = detections[0];
        const keypoints = det.keypoints || [];
        if (keypoints.length < 2) {
          this.message.error('Không phát hiện đủ mốc mắt để tự động căn chỉnh (Face Alignment).');
          URL.revokeObjectURL(tempUrl);
          this.isComparing = false;
          return;
        }

        // Căn chỉnh khuôn mặt 112x112 dùng toạ độ mắt theo howtodo.md
        const eyeLeft = { x: keypoints[0].x * img.width, y: keypoints[0].y * img.height };
        const eyeRight = { x: keypoints[1].x * img.width, y: keypoints[1].y * img.height };

        const alignedCanvas = this.alignFaceBrowser(img, eyeLeft, eyeRight);
        alignedCanvas.toBlob((blob) => {
          if (blob) {
            this.selectedCompareFile = new File([blob], 'aligned_face.jpg', { type: 'image/jpeg' });
            if (this.compareFilePreview) {
              URL.revokeObjectURL(this.compareFilePreview);
            }
            this.compareFilePreview = URL.createObjectURL(blob);
            this.message.success('Đã nhận diện khuôn mặt và tự động căn chỉnh Affine 112x112 thành công!');
          } else {
            this.message.error('Căn chỉnh thất bại khi tạo Blob canvas.');
          }
          URL.revokeObjectURL(tempUrl);
          this.isComparing = false;
        }, 'image/jpeg', 0.95);

      } catch (err) {
        console.error('Lỗi khi căn chỉnh bằng MediaPipe: ', err);
        this.message.error('Gặp lỗi trong tiến trình phân tích MediaPipe.');
        URL.revokeObjectURL(tempUrl);
        this.isComparing = false;
      }
    };

    img.onerror = () => {
      this.message.error('Không thể nạp tệp tin hình ảnh.');
      URL.revokeObjectURL(tempUrl);
      this.isComparing = false;
    };

    img.src = tempUrl;
  }

  private alignFaceBrowser(imageEl: HTMLImageElement, eyeLeft: {x: number, y: number}, eyeRight: {x: number, y: number}): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
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
    ctx.drawImage(imageEl, 0, 0);
    ctx.restore();

    return canvas;
  }

  async executeComparison(): Promise<void> {
    if (!this.targetEmbeddingId || !this.selectedCompareFile) {
      this.message.warning('Vui lòng chọn hoặc kéo thả tệp hình ảnh hợp lệ để kiểm tra.');
      return;
    }

    this.isComparing = true;
    this.compareResults = null;

    try {
      const result: any = await this.api.compareEmbedding(
        this.targetEmbeddingId,
        this.selectedCompareFile,
        this.compareThreshold
      );
      this.compareResults = result;
      this.message.success('Đã hoàn tất đối sánh so khớp HNSW Inner Product.');
    } catch (error: any) {
      this.message.error(error?.error?.message || 'Lỗi đối sánh máy chủ.');
    } finally {
      this.isComparing = false;
    }
  }

  getLogLineClass(line: string): string {
    if (line.startsWith('[ERROR]')) return 'log-error';
    if (line.startsWith('[WARN]') || line.startsWith('[STDERR]')) return 'log-warn';
    if (line.startsWith('[SUCCESS]') || line.startsWith('[DONE]')) return 'log-success';
    if (line.startsWith('[CMD]')) return 'log-cmd';
    if (line.startsWith('[SYSTEM]')) return 'log-system';
    return 'log-info';
  }
}
