import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
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
    NzRadioModule,
    NzDatePickerModule,
    NzButtonModule
  ],
  template: `
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-label [nzSpan]="6" nzRequired>Quyền truy cập</nz-form-label>
        <nz-form-control [nzSpan]="14">
          <nz-radio-group formControlName="permissionType">
            <label nz-radio [nzValue]="0">Riêng tư</label>
            <label nz-radio [nzValue]="1">Công khai</label>
            <label nz-radio [nzValue]="2">Chia sẻ có mã</label>
          </nz-radio-group>
        </nz-form-control>
      </nz-form-item>

      <ng-container *ngIf="validateForm.get('permissionType')?.value === 2">
        <nz-form-item>
          <nz-form-label [nzSpan]="6" nzRequired>Mã xác thực</nz-form-label>
          <nz-form-control [nzSpan]="14">
            <input nz-input formControlName="shareCode" placeholder="Nhập mã bí mật" />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label [nzSpan]="6">Hết hạn sau</nz-form-label>
          <nz-form-control [nzSpan]="14">
            <nz-date-picker formControlName="expiredAt" nzShowTime></nz-date-picker>
          </nz-form-control>
        </nz-form-item>
      </ng-container>

      <div *ngIf="file.url && validateForm.get('permissionType')?.value !== 0" style="margin-top: 16px; padding: 8px; background: #f5f5f5; border-radius: 4px;">
        <p><strong>Link chia sẻ:</strong></p>
        <code style="word-break: break-all;">{{ file.url }}</code>
      </div>

      <div class="footer" style="text-align: right; margin-top: 24px;">
        <button nz-button nzType="default" (click)="handleCancel($event)">Hủy</button>
        <button nz-button nzType="primary" [nzLoading]="submitting" style="margin-left: 8px;">Cập nhật</button>
      </div>
    </form>
  `
})
export class FileShareModalComponent {
  @Input() file: any;

  private fb = inject(FormBuilder);
  private modal = inject(NzModalRef);
  private filesFoldersService = inject(FilesFoldersService);
  private message = inject(NzMessageService);

  validateForm: FormGroup;
  submitting = false;

  constructor() {
    this.validateForm = this.fb.group({
      permissionType: [0, [Validators.required]],
      shareCode: [''],
      expiredAt: [null]
    });
  }

  ngOnInit(): void {
    if (this.file) {
      this.validateForm.patchValue({
        permissionType: this.file.permissionType || 0,
        shareCode: this.file.shareCode || '',
        expiredAt: this.file.expiredAt ? new Date(this.file.expiredAt) : null
      });
    }
  }

  async submitForm(): Promise<void> {
    if (this.validateForm.valid) {
      this.submitting = true;
      const { permissionType, shareCode, expiredAt } = this.validateForm.value;
      try {
        await this.filesFoldersService.setFilePermission(
          this.file.id,
          permissionType,
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
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  handleCancel(event: MouseEvent): void {
    event.preventDefault();
    this.modal.close();
  }
}
