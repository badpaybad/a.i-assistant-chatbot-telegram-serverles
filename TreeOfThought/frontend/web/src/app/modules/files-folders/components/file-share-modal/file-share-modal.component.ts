import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule, NzInputGroupModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FilesFoldersService } from '../../services/files-folders.service';

@Component({
  selector: 'app-file-share-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzInputGroupModule,
    NzRadioModule,
    NzDatePickerModule,
    NzButtonModule,
    NzSelectModule,
    NzIconModule,
    NzDividerModule
  ],
  template: `
    <div class="share-container">
      <nz-form-item>
        <nz-form-label [nzSpan]="24">Chế độ chia sẻ</nz-form-label>
        <nz-form-control [nzSpan]="24">
          <nz-radio-group [(ngModel)]="shareMode" (ngModelChange)="onModeChange($event)" nzButtonStyle="solid">
            <label nz-radio-button [nzValue]="'private'">Riêng tư</label>
            <label nz-radio-button [nzValue]="'public'">Công khai (GCS)</label>
            <label nz-radio-button [nzValue]="'signed'">Link tạm thời</label>
            <label nz-radio-button [nzValue]="'secure'">Bảo mật (Mã)</label>
          </nz-radio-group>
        </nz-form-control>
      </nz-form-item>

      <nz-divider></nz-divider>

      <!-- Private Mode -->
      <div *ngIf="shareMode === 'private'" class="mode-info">
        <p><span nz-icon nzType="lock" nzTheme="outline"></span> Chỉ bạn mới có quyền truy cập file này.</p>
      </div>

      <!-- Public Mode -->
      <div *ngIf="shareMode === 'public'" class="mode-info">
        <p><span nz-icon nzType="global" nzTheme="outline"></span> Bất kỳ ai có đường dẫn đều có thể xem file.</p>
        <nz-input-group [nzAddOnAfter]="copyButton">
          <input nz-input [ngModel]="file.url" readonly />
        </nz-input-group>
        <ng-template #copyButton>
          <button nz-button (click)="copyLink(file.url)"><span nz-icon nzType="copy"></span> Copy</button>
        </ng-template>
      </div>

      <!-- Signed URL Mode -->
      <div *ngIf="shareMode === 'signed'" class="mode-info">
        <p><span nz-icon nzType="clock-circle" nzTheme="outline"></span> Tạo đường dẫn truy cập có thời hạn.</p>
        <div style="display: flex; gap: 8px; margin-bottom: 16px;">
          <nz-select [(ngModel)]="durationHours" style="flex: 1">
            <nz-option [nzValue]="1" nzLabel="1 giờ"></nz-option>
            <nz-option [nzValue]="24" nzLabel="24 giờ"></nz-option>
            <nz-option [nzValue]="168" nzLabel="7 ngày"></nz-option>
          </nz-select>
          <button nz-button nzType="primary" (click)="generateSignedUrl()" [nzLoading]="generating">Tạo Link</button>
        </div>
        <nz-input-group *ngIf="signedUrl" [nzAddOnAfter]="copySignedButton">
          <input nz-input [ngModel]="signedUrl" readonly />
        </nz-input-group>
        <ng-template #copySignedButton>
          <button nz-button (click)="copyLink(signedUrl)"><span nz-icon nzType="copy"></span> Copy</button>
        </ng-template>
      </div>

      <!-- Secure Mode (Mã xác thực) -->
      <div *ngIf="shareMode === 'secure'" class="mode-info">
        <p><span nz-icon nzType="safety" nzTheme="outline"></span> Yêu cầu người nhận nhập mã xác thực thông qua ứng dụng.</p>
        <form nz-form [formGroup]="secureForm">
          <nz-form-item>
            <nz-form-label [nzSpan]="24">Mã xác thực</nz-form-label>
            <nz-form-control>
              <input nz-input formControlName="shareCode" placeholder="Nhập mã bí mật" />
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label [nzSpan]="24">Hết hạn sau</nz-form-label>
            <nz-form-control>
              <nz-date-picker formControlName="expiredAt" nzShowTime style="width: 100%"></nz-date-picker>
            </nz-form-control>
          </nz-form-item>
        </form>
      </div>

      <div class="footer" style="text-align: right; margin-top: 24px;">
        <button nz-button nzType="default" (click)="handleCancel($event)">Hủy</button>
        <button nz-button nzType="primary" (click)="submitForm()" [nzLoading]="submitting" style="margin-left: 8px;">Lưu thay đổi</button>
      </div>
    </div>
  `,
  styles: [`
    .share-container { padding: 8px; }
    .mode-info { padding: 12px; background: #fafafa; border-radius: 4px; min-height: 120px; }
    .mode-info p { color: #666; margin-bottom: 12px; }
  `]
})
export class FileShareModalComponent implements OnInit {
  @Input() file: any;

  private fb = inject(FormBuilder);
  private modal = inject(NzModalRef);
  private filesFoldersService = inject(FilesFoldersService);
  private message = inject(NzMessageService);

  shareMode: 'private' | 'public' | 'signed' | 'secure' = 'private';
  signedUrl: string = '';
  durationHours: number = 24;
  generating = false;
  submitting = false;
  secureForm: FormGroup;

  constructor() {
    this.secureForm = this.fb.group({
      shareCode: ['', [Validators.required]],
      expiredAt: [null]
    });
  }

  ngOnInit(): void {
    if (this.file) {
      if (this.file.permission === 1) this.shareMode = 'public';
      else if (this.file.permission === 2) {
        this.shareMode = 'secure';
        this.secureForm.patchValue({
          shareCode: this.file.shareCode || '',
          expiredAt: this.file.expiredAt ? new Date(this.file.expiredAt) : null
        });
      } else {
        this.shareMode = 'private';
      }
    }
  }

  onModeChange(mode: string): void {
    this.signedUrl = '';
  }

  async generateSignedUrl(): Promise<void> {
    this.generating = true;
    try {
      const res: any = await this.filesFoldersService.getShareUrl(this.file.id, this.durationHours);
      this.signedUrl = res.url;
      this.message.success('Đã tạo link tạm thời');
    } catch (error) {
      this.message.error('Lỗi khi tạo link tạm thời');
    } finally {
      this.generating = false;
    }
  }

  copyLink(url: string): void {
    if (!url) return;
    navigator.clipboard.writeText(url).then(() => {
      this.message.success('Đã copy link vào bộ nhớ tạm');
    });
  }

  async submitForm(): Promise<void> {
    this.submitting = true;
    try {
      let permission = 0;
      let shareCode = '';
      let expiredAt = null;

      if (this.shareMode === 'public') {
        permission = 1;
      } else if (this.shareMode === 'secure') {
        if (this.secureForm.invalid) {
          this.message.error('Vui lòng nhập đầy đủ thông tin bảo mật');
          this.submitting = false;
          return;
        }
        permission = 2;
        shareCode = this.secureForm.value.shareCode;
        expiredAt = this.secureForm.value.expiredAt;
      } else if (this.shareMode === 'signed') {
        // Signed mode doesn't change file permission, it just provides a link
        // But maybe we want to keep it private or something.
        // For now, let's just close or set to private.
        permission = 0;
      }

      await this.filesFoldersService.setFilePermission(
        this.file.id,
        permission,
        shareCode,
        expiredAt ? expiredAt.toISOString() : undefined
      );
      this.message.success('Cập nhật quyền truy cập thành công');
      this.modal.close(true);
    } catch (error) {
      this.message.error('Lỗi khi cập nhật quyền truy cập');
    } finally {
      this.submitting = false;
    }
  }

  handleCancel(event: MouseEvent): void {
    event.preventDefault();
    this.modal.close();
  }
}
