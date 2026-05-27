import { Component, OnInit, OnDestroy, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { NzGridModule } from 'ng-zorro-antd/grid';


import { NhanDienKhuonMatService } from './services/nhan-dien-khuon-mat.service';
import { TotButtonComponent, TotTableComponent, TotTableColumn, TotCellDirective } from '@tot/shared';

interface QueueItem {
  id: string;
  file: File;
  name: string;
  size: number;
  thumbnailUrl: string;
  status: 'Waiting' | 'Scanning' | 'Success' | 'NoFace' | 'Error';
  progress: number;
  detectedFaces: {
    id: string;
    boundingBox: any; // MediaPipe Bounding Box
    croppedBlob: Blob;
    croppedUrl: string;
    selected: boolean;
  }[];
  selected: boolean;
}

@Component({
  selector: 'tot-nhan-dien-khuon-mat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzInputModule,
    NzTableModule,
    NzModalModule,
    NzIconModule,
    NzCardModule,
    NzTagModule,
    NzSpinModule,
    NzSwitchModule,
    NzTooltipModule,
    NzGridModule,
    TotButtonComponent,
    TotTableComponent,
    TotCellDirective
  ],
  templateUrl: './nhan-dien-khuon-mat.component.html',
  styleUrl: './nhan-dien-khuon-mat.component.css'
})
export class NhanDienKhuonMatComponent implements OnInit, OnDestroy {
  private api = inject(NhanDienKhuonMatService);
  private message = inject(NzMessageService);
  private modal = inject(NzModalService);

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('folderInput') folderInput!: ElementRef<HTMLInputElement>;

  // Session Workspace State
  sessionId: string = crypto.randomUUID();
  sessionName: string = '';
  queue: QueueItem[] = [];
  loadingDetector: boolean = false;
  detectorReady: boolean = false;
  faceDetector: any = null;
  savingSession: boolean = false;
  uploadTrackingId: string | null = null;
  uploadProgressText: string = '';

  // Local Pagination for Active Session Table
  activePageIndex: number = 1;
  activePageSize: number = 5;

  get paginatedQueue(): QueueItem[] {
    const start = (this.activePageIndex - 1) * this.activePageSize;
    return this.queue.slice(start, start + this.activePageSize);
  }

  // Historical sessions
  activeColumns: TotTableColumn[] = [];
  sessionsList: any[] = [];
  loadingSessions: boolean = false;
  historyColumns: TotTableColumn[] = [];
  
  // Pagination state for history
  totalSessions: number = 0;
  pageIndex: number = 1;
  pageSize: number = 10;

  // Detail Modal data
  selectedSessionDetails: any = null;
  loadingDetails: boolean = false;
  showDetailsModal: boolean = false;

  ngOnInit(): void {
    this.setDefaultSessionName();
    this.initColumns();
    this.loadSessionsHistory();
    this.initMediaPipe();
  }

  private initColumns(): void {
    this.activeColumns = [
      { title: 'Tên file', key: 'name', width: '30%' },
      { title: 'Khuôn mặt trong ảnh', key: 'detectedFaces', width: '40%' },
      { title: 'Đường dẫn file', key: 'simulatedPath', width: '20%' },
      { title: 'Hành động', key: 'action', width: '10%', align: 'center' }
    ];

    this.historyColumns = [
      { title: 'Tên phiên', key: 'name' },
      { title: 'Số lượng ảnh', key: 'imageCount', width: '150px' },
      { title: 'Số lượng khuôn mặt', key: 'faceCount', width: '200px' },
      { title: 'Hành động', key: 'action', width: '200px', right: true }
    ];
  }

  ngOnDestroy(): void {
    this.queue.forEach(item => URL.revokeObjectURL(item.thumbnailUrl));
  }

  private setDefaultSessionName(): void {
    const now = new Date();
    const dateStr = now.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    this.sessionName = `Phiên ngày ${dateStr} lúc ${timeStr}`;
  }

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
      console.error("[MediaPipe] Init Failed: ", error);
      this.message.error("Không thể khởi tạo mô hình phát hiện khuôn mặt MediaPipe.");
    } finally {
      this.loadingDetector = false;
    }
  }

  // --- File Drag & Drop, Folder and File selectors ---
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  triggerFolderInput(): void {
    this.folderInput.nativeElement.click();
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.addFilesToQueue(Array.from(input.files));
      input.value = ''; // Reset input
    }
  }

  onFolderSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.addFilesToQueue(Array.from(input.files));
      input.value = ''; // Reset input
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.items) {
      const files: File[] = [];
      const items = Array.from(event.dataTransfer.items);
      
      const promises = items.map(item => {
        const entry = item.webkitGetAsEntry();
        if (entry && entry.isFile) {
          return new Promise<void>((resolve) => {
            (entry as any).file((f: File) => {
              if (f.type.startsWith('image/')) {
                files.push(f);
              }
              resolve();
            }, () => resolve());
          });
        }
        return Promise.resolve();
      });
      
      Promise.all(promises).then(() => {
        if (files.length > 0) {
          this.addFilesToQueue(files);
        } else {
          this.message.warning("Không tìm thấy tệp ảnh nào hợp lệ.");
        }
      });
    } else if (event.dataTransfer?.files) {
      this.addFilesToQueue(Array.from(event.dataTransfer.files));
    }
  }

  onFolderDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.items) {
      const files: File[] = [];
      const items = Array.from(event.dataTransfer.items);
      
      const traversePromises = items.map(item => {
        const entry = item.webkitGetAsEntry();
        if (entry) {
          return this.traverseEntryRecursive(entry, files);
        }
        return Promise.resolve();
      });
      
      Promise.all(traversePromises).then(() => {
        if (files.length > 0) {
          this.addFilesToQueue(files);
        } else {
          this.message.warning("Không tìm thấy tệp ảnh nào trong thư mục được kéo thả.");
        }
      });
    }
  }

  private async traverseEntryRecursive(entry: any, fileList: File[]): Promise<void> {
    if (entry.isFile) {
      const file = await new Promise<File>((resolve, reject) => {
        entry.file(resolve, reject);
      });
      if (file.type.startsWith('image/')) {
        fileList.push(file);
      }
    } else if (entry.isDirectory) {
      const reader = entry.createReader();
      const entries = await new Promise<any[]>((resolve, reject) => {
        reader.readEntries(resolve, reject);
      });
      
      for (const childEntry of entries) {
        await this.traverseEntryRecursive(childEntry, fileList);
      }
    }
  }

  private addFilesToQueue(files: File[]): void {
    const imageFiles = files.filter(f => f.type.startsWith('image/'));
    if (imageFiles.length === 0) {
      this.message.warning("Vui lòng chỉ chọn các tệp tin hình ảnh.");
      return;
    }

    const items: QueueItem[] = imageFiles.map(file => ({
      id: crypto.randomUUID(),
      file,
      name: file.name,
      size: file.size,
      thumbnailUrl: URL.createObjectURL(file),
      status: 'Waiting',
      progress: 0,
      detectedFaces: [],
      selected: true
    }));

    this.queue = [...this.queue, ...items];
    this.message.success(`Đã thêm ${items.length} tệp vào hàng đợi.`);
    
    // Auto-trigger scanning process
    this.processScanningQueue();
  }

  // --- Processing Scanning Queue with MediaPipe ---
  private async processScanningQueue(): Promise<void> {
    if (!this.detectorReady || !this.faceDetector) return;

    // Find first item waiting
    const item = this.queue.find(i => i.status === 'Waiting');
    if (!item) return;

    item.status = 'Scanning';
    item.progress = 20;

    try {
      const img = new Image();
      img.onload = async () => {
        item.progress = 50;
        try {
          const result = this.faceDetector.detect(img);
          const detections = result.detections || [];
          item.progress = 80;

          if (detections.length === 0) {
            item.status = 'NoFace';
            item.progress = 100;
            this.processScanningQueue(); // Process next
          } else {
            const detectedFaces: any[] = [];
            for (let idx = 0; idx < detections.length; idx++) {
              const det = detections[idx];
              const bbox = det.boundingBox;
              
              // Crop face onto a 150x150 canvas
              const cropCanvas = document.createElement('canvas');
              cropCanvas.width = 150;
              cropCanvas.height = 150;
              const ctx = cropCanvas.getContext('2d');
              
              if (ctx) {
                // Ensure bounding box values are within image boundaries
                const x = Math.max(0, bbox.originX);
                const y = Math.max(0, bbox.originY);
                const w = Math.min(bbox.width, img.width - x);
                const h = Math.min(bbox.height, img.height - y);

                ctx.drawImage(img, x, y, w, h, 0, 0, 150, 150);
                
                const blob = await new Promise<Blob | null>((resolve) => {
                  cropCanvas.toBlob((b) => resolve(b), 'image/jpeg', 0.95);
                });

                if (blob) {
                  detectedFaces.push({
                    id: crypto.randomUUID(),
                    boundingBox: {
                      x: Math.round(bbox.originX),
                      y: Math.round(bbox.originY),
                      w: Math.round(bbox.width),
                      h: Math.round(bbox.height)
                    },
                    croppedBlob: blob,
                    croppedUrl: URL.createObjectURL(blob),
                    selected: true
                  });
                }
              }
            }

            item.detectedFaces = detectedFaces;
            item.status = 'Success';
            item.progress = 100;

            this.processScanningQueue(); // Process next
          }
        } catch (err) {
          console.error("MediaPipe detection error: ", err);
          item.status = 'Error';
          item.progress = 100;
          this.processScanningQueue();
        }
      };

      img.onerror = () => {
        item.status = 'Error';
        item.progress = 100;
        this.processScanningQueue();
      };

      img.src = item.thumbnailUrl;
    } catch (err) {
      item.status = 'Error';
      item.progress = 100;
      this.processScanningQueue();
    }
  }

  toggleFaceSelection(item: QueueItem, face: any): void {
    face.selected = !face.selected;
  }

  toggleOriginalSelection(item: QueueItem): void {
    item.selected = !item.selected;
  }

  removeQueueItem(item: QueueItem, event: Event): void {
    event.stopPropagation();
    URL.revokeObjectURL(item.thumbnailUrl);
    item.detectedFaces.forEach(f => URL.revokeObjectURL(f.croppedUrl));
    this.queue = this.queue.filter(i => i.id !== item.id);
  }

  // --- Realtime saving session via REST API & Firestore notification bus ---
  async saveFaceDetectionSession(): Promise<void> {
    if (!this.sessionName.trim()) {
      this.message.warning("Vui lòng nhập tên phiên làm việc.");
      return;
    }

    const itemsToSave = this.queue.filter(item => item.status === 'Success' && item.selected);
    if (itemsToSave.length === 0) {
      this.message.warning("Không có hình ảnh hợp lệ hoặc được chọn nào để lưu trữ.");
      return;
    }

    this.savingSession = true;
    this.uploadProgressText = "Đang chuẩn bị tệp tin nhị phân...";

    try {
      // Loop through selected items and upload one by one to keep backend processes lightweight (KISS principle)
      for (let i = 0; i < itemsToSave.length; i++) {
        const item = itemsToSave[i];
        const selectedCrops = item.detectedFaces.filter(f => f.selected);

        this.uploadProgressText = `Đang tải lên ảnh gốc và ${selectedCrops.length} khuôn mặt (${i + 1}/${itemsToSave.length})...`;

        const croppedFiles: File[] = selectedCrops.map((crop, idx) => {
          return new File([crop.croppedBlob], `crop_${idx}.jpg`, { type: 'image/jpeg' });
        });

        const bboxes: string[] = selectedCrops.map(crop => JSON.stringify(crop.boundingBox));

        await new Promise<void>(async (resolve, reject) => {
          try {
            const result: any = await this.api.saveSession(
              this.sessionId,
              this.sessionName,
              item.file,
              croppedFiles,
              bboxes,
              (data: any) => {
                if (data.status === 'Completed') {
                  resolve();
                } else if (data.status === 'Error') {
                  reject(new Error(data.message || "Xử lý lưu trữ thất bại."));
                }
              }
            );

            if (result && result.trackingId) {
              this.uploadTrackingId = result.trackingId;
            }
          } catch (err) {
            reject(err);
          }
        });
      }

      this.message.success("Tải lên toàn bộ tệp thành công!");
      this.completeSessionSave();
    } catch (error: any) {
      console.error("[Save Session] API Failed: ", error);
      this.message.error(error.message || error.error?.message || "Lỗi kết nối hoặc xử lý phía máy chủ.");
      this.savingSession = false;
      this.uploadTrackingId = null;
      this.loadSessionsHistory();
    }
  }

  private completeSessionSave(): void {
    this.savingSession = false;
    this.uploadTrackingId = null;
    this.resetWorkspace();
    this.loadSessionsHistory();
  }

  resetWorkspace(): void {
    this.queue.forEach(item => URL.revokeObjectURL(item.thumbnailUrl));
    this.queue = [];
    this.sessionId = crypto.randomUUID();
    this.activePageIndex = 1;
    this.setDefaultSessionName();
    this.message.info("Không gian làm việc đã được reset.");
  }

  // --- Historical Sessions & Actions ---
  async loadSessionsHistory(): Promise<void> {
    try {
      this.loadingSessions = true;
      const result: any = await this.api.getSessions(this.pageIndex, this.pageSize);
      this.sessionsList = result?.data || [];
      this.totalSessions = result?.total || 0;
    } catch (error) {
      console.error("Lỗi khi tải lịch sử phiên: ", error);
    } finally {
      this.loadingSessions = false;
    }
  }

  onQueryParamsChange(params: any): void {
    this.pageIndex = params.pageIndex;
    this.pageSize = params.pageSize;
    this.loadSessionsHistory();
  }

  inlineRenameSession(session: any): void {
    session.isEditing = true;
    session.tempName = session.name;
  }

  async saveInlineRename(session: any): Promise<void> {
    if (!session.tempName.trim()) {
      this.message.warning("Tên phiên không được bỏ trống.");
      return;
    }

    try {
      await this.api.renameSession(session.id, session.tempName);
      session.name = session.tempName;
      session.isEditing = false;
      this.message.success("Đổi tên phiên thành công.");
    } catch (error) {
      this.message.error("Không thể đổi tên phiên upload.");
    }
  }

  cancelInlineRename(session: any): void {
    session.isEditing = false;
  }

  deleteSession(session: any, event: Event): void {
    event.stopPropagation();
    this.modal.confirm({
      nzTitle: 'Xác nhận xóa phiên?',
      nzContent: `Hành động này sẽ xóa phiên "${session.name}" cùng tất cả ảnh gốc và ảnh khuôn mặt crop tương ứng cả trên máy chủ và dịch vụ Google Cloud Storage. Thao tác này không thể hoàn tác!`,
      nzOkDanger: true,
      nzOnOk: async () => {
        try {
          await this.api.deleteSession(session.id);
          this.message.success("Đã xóa phiên làm việc thành công.");
          this.loadSessionsHistory();
        } catch (error) {
          this.message.error("Lỗi khi xóa phiên upload.");
        }
      }
    });
  }

  // --- Details Modal Display & Sub-actions ---
  async openSessionDetails(session: any): Promise<void> {
    this.selectedSessionDetails = session;
    this.loadingDetails = true;
    this.showDetailsModal = true;

    try {
      const details: any = await this.api.getSessionDetails(session.id);
      this.selectedSessionDetails = details;
    } catch (error) {
      this.message.error("Lỗi khi tải chi tiết phiên upload.");
      this.showDetailsModal = false;
      this.selectedSessionDetails = null;
    } finally {
      this.loadingDetails = false;
    }
  }

  closeDetailsModal(): void {
    this.showDetailsModal = false;
    this.selectedSessionDetails = null;
    this.loadSessionsHistory(); // Sync session table counts
  }

  async deleteDetailOriginalImage(image: any): Promise<void> {
    this.modal.confirm({
      nzTitle: 'Xác nhận xóa ảnh gốc?',
      nzContent: 'Xóa ảnh gốc này sẽ xóa cả các ảnh khuôn mặt crop tương ứng trên cả GCS và database.',
      nzOkDanger: true,
      nzOnOk: async () => {
        try {
          await this.api.deleteOriginalImage(image.id);
          this.message.success("Xóa ảnh gốc thành công.");
          
          // Refresh details data
          if (this.selectedSessionDetails) {
            this.selectedSessionDetails.images = this.selectedSessionDetails.images.filter((img: any) => img.id !== image.id);
            if (this.selectedSessionDetails.images.length === 0) {
              this.closeDetailsModal();
            }
          }
        } catch (error) {
          this.message.error("Lỗi khi xóa ảnh gốc.");
        }
      }
    });
  }

  async deleteDetailCroppedFace(face: any, image: any): Promise<void> {
    this.modal.confirm({
      nzTitle: 'Xác nhận xóa ảnh khuôn mặt crop?',
      nzContent: 'Xóa ảnh crop này khỏi hệ thống database và GCS.',
      nzOkDanger: true,
      nzOnOk: async () => {
        try {
          await this.api.deleteCroppedFace(face.id);
          this.message.success("Xóa ảnh khuôn mặt crop thành công.");
          
          // Remove from local details view array
          image.croppedFaces = image.croppedFaces.filter((f: any) => f.id !== face.id);
        } catch (error) {
          this.message.error("Lỗi khi xóa ảnh khuôn mặt crop.");
        }
      }
    });
  }

  formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
