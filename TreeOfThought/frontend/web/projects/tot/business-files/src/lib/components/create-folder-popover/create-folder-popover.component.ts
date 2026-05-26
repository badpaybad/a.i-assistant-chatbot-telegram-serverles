import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TotButtonComponent } from '@tot/shared';
import { FilesFoldersService } from '../../services/files-folders.service';


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
    TotButtonComponent
  ],
  template: `
    <tot-button 
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
    </tot-button>

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
          <tot-button nzType="default" nzSize="small" (click)="visible = false">Hủy</tot-button>
          <tot-button nzType="primary" nzSize="small" (click)="submit()" [loading]="loading">Tạo</tot-button>
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
      this.message.loading('Đang xử lý tạo thư mục...');
      this.visible = false;
      const folderName = this.name;
      this.name = '';

      await this.filesFoldersService.createFolder(folderName, this.parentId, (data: any) => {
        if (data.status === 'Completed') {
          this.message.success(data.message || 'Thư mục đã được tạo');
          this.created.emit();
          this.filesFoldersService.notifyRefresh();
        } else if (data.status === 'Error') {
          this.message.error(data.message || 'Lỗi khi tạo thư mục');
        }
      });
    } catch (error) {
      this.message.error('Lỗi khi tạo thư mục');
    } finally {
      this.loading = false;
    }
  }
}
