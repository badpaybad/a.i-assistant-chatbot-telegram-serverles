import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalModule, NzModalRef, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AppButtonComponent } from '@tot/shared';
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
    NzRadioModule,
    NzDatePickerModule,
    NzButtonModule,
    NzSelectModule,
    NzIconModule,
    NzDividerModule,
    AppButtonComponent
  ],
  template: `
    <div class="share-container" *ngIf="file">
      <div class="header-info">
        <div class="file-icon">
          <span nz-icon nzType="file" nzTheme="twotone"></span>
        </div>
        <div class="file-details">
          <div class="file-name text-truncate">{{ file?.name }}</div>
          <div class="file-meta">{{ formatSize(file?.size || 0) }} • {{ file?.mimeType }}</div>
        </div>
      </div>

      <nz-divider></nz-divider>

      <div class="mode-selector">
        <div class="section-title">Chế độ chia sẻ</div>
        <nz-radio-group [(ngModel)]="shareMode" (ngModelChange)="onModeChange($event)" nzButtonStyle="solid" class="full-width-group">
          <label nz-radio-button [nzValue]="'private'">
            <span nz-icon nzType="lock"></span> Riêng tư
          </label>
          <label nz-radio-button [nzValue]="'public'">
            <span nz-icon nzType="global"></span> Công khai
          </label>
          <label nz-radio-button [nzValue]="'signed'">
            <span nz-icon nzType="clock-circle"></span> Tạm thời
          </label>
          <label nz-radio-button [nzValue]="'secure'">
            <span nz-icon nzType="safety"></span> Bảo mật
          </label>
        </nz-radio-group>
      </div>

      <div class="mode-content mt-4">
        <!-- Private Mode -->
        <div *ngIf="shareMode === 'private'" class="mode-card animate-in">
          <div class="mode-icon private"><span nz-icon nzType="lock" nzTheme="outline"></span></div>
          <div class="mode-text">
            <h3>Truy cập riêng tư</h3>
            <p>Chỉ bạn mới có quyền xem và quản lý tệp này. Đây là chế độ an toàn nhất.</p>
          </div>
        </div>

        <!-- Public Mode -->
        <div *ngIf="shareMode === 'public'" class="mode-card animate-in">
          <div class="mode-icon public"><span nz-icon nzType="global" nzTheme="outline"></span></div>
          <div class="mode-text">
            <h3>Truy cập công khai</h3>
            <p>Bất kỳ ai có đường dẫn trực tiếp từ GCS đều có thể xem tệp này.</p>
            <div class="url-copy-box mt-3">
              <nz-input-group [nzAddOnAfter]="copyButton">
                <input nz-input [ngModel]="file?.url" readonly />
              </nz-input-group>
              <ng-template #copyButton>
                <app-button (click)="copyLink(file?.url || '')" nzType="primary">
                  <span nz-icon nzType="copy"></span> Sao chép
                </app-button>
              </ng-template>
            </div>
          </div>
        </div>

        <!-- Signed URL Mode -->
        <div *ngIf="shareMode === 'signed'" class="mode-card animate-in">
          <div class="mode-icon signed"><span nz-icon nzType="link" nzTheme="outline"></span></div>
          <div class="mode-text">
            <h3>Đường dẫn tạm thời</h3>
            <p>Tạo một liên kết có thời hạn truy cập ngắn (Signed URL).</p>
            
            <div class="duration-selector mt-3">
              <span class="label">Hiệu lực trong:</span>
              <nz-select [(ngModel)]="durationHours" style="width: 140px">
                <nz-option [nzValue]="1" nzLabel="1 giờ"></nz-option>
                <nz-option [nzValue]="24" nzLabel="24 giờ"></nz-option>
                <nz-option [nzValue]="168" nzLabel="7 ngày"></nz-option>
              </nz-select>
              <app-button nzType="primary" (click)="generateSignedUrl()" [loading]="generating" class="ml-2">
                Tạo Link
              </app-button>
            </div>

            <div *ngIf="signedUrl" class="url-copy-box mt-3">
              <nz-input-group [nzAddOnAfter]="copySignedButton">
                <input nz-input [ngModel]="signedUrl" readonly />
              </nz-input-group>
              <ng-template #copySignedButton>
                <app-button (click)="copyLink(signedUrl)" nzType="primary">
                  <span nz-icon nzType="copy"></span> Sao chép
                </app-button>
              </ng-template>
            </div>
          </div>
        </div>

        <!-- Secure Mode -->
        <div *ngIf="shareMode === 'secure'" class="mode-card animate-in">
          <div class="mode-icon secure"><span nz-icon nzType="safety" nzTheme="outline"></span></div>
          <div class="mode-text">
            <h3>Truy cập bảo mật</h3>
            <p>Yêu cầu người dùng nhập mã xác thực và giới hạn thời gian truy cập.</p>
            
            <form nz-form [formGroup]="secureForm" nzLayout="vertical" class="mt-3">
              <div class="row">
                <div class="col-6">
                  <nz-form-item>
                    <nz-form-label nzRequired>Mã bí mật</nz-form-label>
                    <nz-form-control nzErrorTip="Vui lòng nhập mã">
                      <nz-input-group nzPrefixIcon="key">
                        <input nz-input formControlName="shareCode" placeholder="vd: 123456" />
                      </nz-input-group>
                    </nz-form-control>
                  </nz-form-item>
                </div>
                <div class="col-6">
                  <nz-form-item>
                    <nz-form-label>Ngày hết hạn</nz-form-label>
                    <nz-form-control>
                      <nz-date-picker formControlName="expiredAt" nzShowTime style="width: 100%"></nz-date-picker>
                    </nz-form-control>
                  </nz-form-item>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="modal-footer mt-4">
        <app-button nzType="default" (click)="handleCancel($event)">Bỏ qua</app-button>
        <app-button nzType="primary" (click)="submitForm()" [loading]="submitting" class="ml-2 save-btn">
          <span nz-icon nzType="check"></span> Áp dụng thay đổi
        </app-button>
      </div>
    </div>
  `,
  styles: [`
    .share-container { padding: 4px; font-family: 'Inter', -apple-system, sans-serif; }
    
    .header-info { display: flex; align-items: center; gap: 16px; margin-bottom: 8px; }
    .file-icon { font-size: 32px; background: #f0f7ff; padding: 12px; border-radius: 12px; display: flex; }
    .file-name { font-weight: 600; font-size: 16px; color: #1a1a1a; max-width: 300px; }
    .file-meta { font-size: 13px; color: #8c8c8c; margin-top: 2px; }

    .section-title { font-weight: 500; font-size: 14px; margin-bottom: 12px; color: #595959; }
    
    .full-width-group { width: 100%; display: flex; }
    .full-width-group label { flex: 1; text-align: center; }

    .mode-card { 
      display: flex; gap: 16px; padding: 20px; 
      background: #fdfdfd; border: 1px solid #f0f0f0; 
      border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.02);
      min-height: 160px;
    }
    
    .mode-icon { 
      font-size: 24px; width: 48px; height: 48px; 
      display: flex; align-items: center; justify-content: center; 
      border-radius: 50%; flex-shrink: 0;
    }
    .mode-icon.private { background: #fff1f0; color: #ff4d4f; }
    .mode-icon.public { background: #f6ffed; color: #52c41a; }
    .mode-icon.signed { background: #e6f7ff; color: #1890ff; }
    .mode-icon.secure { background: #f9f0ff; color: #722ed1; }

    .mode-text h3 { margin: 0 0 4px; font-size: 16px; font-weight: 600; color: #262626; }
    .mode-text p { margin: 0; font-size: 14px; color: #8c8c8c; line-height: 1.5; }

    .url-copy-box { background: #f5f5f5; padding: 4px; border-radius: 8px; }
    
    .duration-selector { display: flex; align-items: center; gap: 8px; }
    .duration-selector .label { font-size: 13px; color: #595959; }

    .modal-footer { display: flex; justify-content: flex-end; padding-top: 16px; border-top: 1px solid #f0f0f0; }
    .save-btn { min-width: 140px; }

    .row { display: flex; margin: 0 -8px; }
    .col-6 { flex: 0 0 50%; padding: 0 8px; }
    .mt-3 { margin-top: 12px; }
    .mt-4 { margin-top: 16px; }
    .ml-2 { margin-left: 8px; }
    .text-truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

    .animate-in {
      animation: slide-up 0.3s ease-out;
    }

    @keyframes slide-up {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class FileShareModalComponent implements OnInit {
  readonly modalData = inject(NZ_MODAL_DATA);
  file = this.modalData.file;

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
    this.fetchFileDetails();
  }

  async fetchFileDetails(): Promise<void> {
    if (!this.file?.id) return;
    try {
      const latestFile: any = await this.filesFoldersService.getFileDetail(this.file.id);
      this.file = latestFile;
      this.updateModeFromPermission();
    } catch (error) {
      this.message.error('Lỗi khi tải thông tin chi tiết file');
      // Fallback to initial data
      this.updateModeFromPermission();
    }
  }

  private updateModeFromPermission(): void {
    if (this.file) {
      const p = String(this.file.permission);
      if (p === '1' || p === 'Public') {
        this.shareMode = 'public';
      } else if (p === '2' || p === 'Shared') {
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

      const result: any = await this.filesFoldersService.setFilePermission(
        this.file.id,
        permission,
        shareCode,
        expiredAt ? expiredAt.toISOString() : undefined
      );
      this.message.loading('Đang xử lý cập nhật quyền...');
      this.modal.close({ trackingId: result.trackingId });
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

  formatSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
