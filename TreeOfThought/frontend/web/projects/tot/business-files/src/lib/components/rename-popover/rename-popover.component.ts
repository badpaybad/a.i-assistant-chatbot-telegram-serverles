import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { AppButtonComponent } from '@tot/shared';
import { FilesFoldersService } from '../../services/files-folders.service';
import { FirebaseService } from '@tot/core';

@Component({
  selector: 'app-rename-popover',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    AppButtonComponent
  ],
  template: `
    <div class="popover-content">
      <div class="popover-header">
        <span nz-icon [nzType]="type === 'file' ? 'file-text' : 'folder'" class="mr-2"></span>
        <strong>Đổi tên {{ type === 'file' ? 'tệp tin' : 'thư mục' }}</strong>
      </div>
      
      <div class="mt-3">
        <label class="d-block mb-1 text-secondary" style="font-size: 12px;">Tên hiện tại: {{ currentName }}</label>
        <input 
          nz-input 
          placeholder="Nhập tên mới..." 
          [(ngModel)]="newName" 
          (keyup.enter)="submit()"
          (keyup.esc)="cancel()"
          #inputElement
          class="rename-input"
        />
      </div>

      <div class="popover-footer">
        <app-button nzType="text" nzSize="small" (click)="cancel()">Hủy</app-button>
        <app-button nzType="primary" nzSize="small" (click)="submit()" [loading]="loading">Lưu thay đổi</app-button>
      </div>
    </div>

    <style>
      .popover-content {
        min-width: 260px;
        padding: 4px;
      }
      .popover-header {
        font-size: 14px;
        border-bottom: 1px solid #f0f0f0;
        padding-bottom: 8px;
        display: flex;
        align-items: center;
      }
      .rename-input {
        width: 100%;
        margin-top: 4px;
      }
      .popover-footer {
        margin-top: 16px;
        display: flex;
        justify-content: flex-end;
        gap: 8px;
      }
      .mr-2 { margin-right: 8px; }
      .mt-3 { margin-top: 12px; }
      .mb-1 { margin-bottom: 4px; }
      .text-secondary { color: #8c8c8c; }
      .d-block { display: block; }
    </style>
  `
})
export class RenamePopoverComponent implements OnInit {
  @Input() itemId: string = '';
  @Input() currentName: string = '';
  @Input() type: 'file' | 'folder' = 'folder';
  @Output() renamed = new EventEmitter<string>(); // Emits trackingId
  @Output() cancelled = new EventEmitter<void>();

  newName = '';
  loading = false;

  private modalData = inject(NZ_MODAL_DATA, { optional: true });
  private modalRef = inject(NzModalRef, { optional: true });
  private filesFoldersService = inject(FilesFoldersService);
  private message = inject(NzMessageService);

  ngOnInit(): void {
    if (this.modalData) {
      this.itemId = this.modalData.id;
      this.currentName = this.modalData.name;
      this.type = this.modalData.type;
    }
    this.newName = this.currentName;
  }

  cancel() {
    if (this.modalRef) {
      this.modalRef.close();
    }
    this.cancelled.emit();
  }

  async submit() {
    if (!this.newName || !this.newName.trim()) {
      this.message.error('Tên không được để trống');
      return;
    }

    if (this.newName === this.currentName) {
      this.cancel();
      return;
    }

    const invalidChars = /[\\/:*?"<>|]/;
    if (invalidChars.test(this.newName)) {
      this.message.error('Tên không được chứa các ký tự đặc biệt: \\ / : * ? " < > |');
      return;
    }

    this.loading = true;
    try {
      let result: any;
      if (this.type === 'file') {
        result = await this.filesFoldersService.renameFile(this.itemId, this.newName);
      } else {
        result = await this.filesFoldersService.renameFolder(this.itemId, this.newName);
      }
      
      this.message.loading('Đang gửi yêu cầu đổi tên...');
      
      if (this.modalRef) {
        this.modalRef.close({ trackingId: result.trackingId });
      }
      
      this.renamed.emit(result.trackingId);
      
    } catch (error) {
      this.message.error('Lỗi khi đổi tên');
    } finally {
      this.loading = false;
    }
  }
}
