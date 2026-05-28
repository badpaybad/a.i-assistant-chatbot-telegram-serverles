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
import { TotButtonComponent } from '@tot/shared';
import { NhanDienKhuonMatService } from '../services/nhan-dien-khuon-mat.service';

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
    TotButtonComponent,
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

  ngOnInit(): void {
    this.loadUsersWithDefinitions();
    this.loadTrainingFolders();
  }

  ngOnDestroy(): void {
    this.closeEventSource();
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

  toggleUserSelection(userId: string): void {
    if (this.selectedUserIds.has(userId)) {
      this.selectedUserIds.delete(userId);
    } else {
      this.selectedUserIds.add(userId);
    }
    // Trigger change detection
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

      // Tự động scroll xuống cuối
      setTimeout(() => {
        const logEl = document.getElementById('training-log-panel');
        if (logEl) logEl.scrollTop = logEl.scrollHeight;
      }, 50);

      // Phát hiện tín hiệu DONE
      if (line.startsWith('[DONE]')) {
        const parts = line.split(' ');
        if (parts.length >= 2) {
          this.trainingDoneFolder = parts[1].trim();
        }
        this.finishTraining();
      }

      // Phát hiện lỗi nghiêm trọng
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
    } catch (error: any) {
      this.message.error(error?.error?.message || 'Lỗi khi trích xuất embedding.');
    } finally {
      this.extractingFolder = null;
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
