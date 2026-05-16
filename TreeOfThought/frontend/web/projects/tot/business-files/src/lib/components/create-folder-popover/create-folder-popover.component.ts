import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AppButtonComponent } from '@tot/shared';
import { FilesFoldersService } from '../../services/files-folders.service';
import { FirebaseService } from '@tot/core';

@Component({
  selector: 'app-create-folder-popover',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzPopoverModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    AppButtonComponent
  ],
  template: `
    <button 
      nz-button 
      [nzType]="buttonType" 
      nz-popover
      [(nzPopoverVisible)]="visible"
      nzPopoverTrigger="click"
      [nzPopoverTitle]="'Tạo mới folder, trong folder hiện tại: ' + currentFolderName"
      [nzPopoverContent]="contentTemplate"
      [nzPopoverPlacement]="placement"
      [class]="buttonClass"
    >
      <span nz-icon [nzType]="buttonIcon"></span>
      <span *ngIf="buttonText">{{ buttonText }}</span>
    </button>

    <ng-template #contentTemplate>
      <div class="popover-content">
        <input 
          nz-input 
          placeholder="Tên thư mục" 
          [(ngModel)]="name" 
          (keyup.enter)="submit()"
          #folderInput
        />
        <div class="popover-footer">
          <app-button nzType="default" nzSize="small" (click)="visible = false">Hủy</app-button>
          <app-button nzType="primary" nzSize="small" (click)="submit()" [loading]="loading">Tạo</app-button>
        </div>
      </div>
    </ng-template>

    <style>
      .popover-content {
        width: 200px;
      }
      .popover-footer {
        margin-top: 8px;
        display: flex;
        justify-content: flex-end;
        gap: 8px;
      }
    </style>
  `
})
export class CreateFolderPopoverComponent {
  @Input() parentId: string | null = null;
  @Input() currentFolderName: string = 'Tài liệu của tôi';
  @Input() buttonType: 'primary' | 'default' | 'text' = 'primary';
  @Input() buttonIcon: string = 'folder-add';
  @Input() buttonText: string = '';
  @Input() buttonClass: string = '';
  @Input() placement: any = 'bottomRight';
  
  @Output() created = new EventEmitter<void>();

  visible = false;
  name = '';
  loading = false;

  open() {
    this.visible = true;
  }

  private filesFoldersService = inject(FilesFoldersService);
  private firebaseService = inject(FirebaseService);
  private message = inject(NzMessageService);

  async submit() {
    if (!this.name || !this.name.trim()) {
      this.message.error('Tên thư mục không được để trống');
      return;
    }

    const invalidChars = /[\\/:*?"<>|]/;
    if (invalidChars.test(this.name)) {
      this.message.error('Tên thư mục không được chứa các ký tự đặc biệt: \\ / : * ? " < > |');
      return;
    }

    this.loading = true;
    try {
      const result: any = await this.filesFoldersService.createFolder(this.name, this.parentId);
      this.message.loading('Đang xử lý tạo thư mục...');
      this.visible = false;
      this.name = '';

      if (result.trackingId) {
        const sub = this.firebaseService.subscribeToRequestId(result.trackingId, (data) => {
          if (data.status === 'Completed') {
            this.message.success(data.message || 'Thư mục đã được tạo');
            this.created.emit();
            this.filesFoldersService.notifyRefresh();
            sub();
          } else if (data.status === 'Error') {
            this.message.error(data.message || 'Lỗi khi tạo thư mục');
            sub();
          }
        });
      } else {
        this.message.success('Thư mục đã được tạo');
        this.created.emit();
        this.filesFoldersService.notifyRefresh();
      }
    } catch (error) {
      this.message.error('Lỗi khi tạo thư mục');
    } finally {
      this.loading = false;
    }
  }
}
