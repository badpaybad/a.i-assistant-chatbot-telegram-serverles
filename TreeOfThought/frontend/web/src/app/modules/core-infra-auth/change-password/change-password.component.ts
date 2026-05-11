import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClientService } from '../../../core/http/http-client.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
    TranslateModule
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  private fb = inject(NonNullableFormBuilder);
  private http = inject(HttpClientService);
  private notification = inject(NzNotificationService);
  private translate = inject(TranslateService);

  loading = false;

  confirmationValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm?.controls.newPassword.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  validateForm: FormGroup<{
    oldPassword: FormControl<string>;
    newPassword: FormControl<string>;
    confirmPassword: FormControl<string>;
  }> = this.fb.group({
    oldPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, (c: AbstractControl) => this.confirmationValidator(c)]]
  });

  async submitForm(): Promise<void> {
    if (this.validateForm.valid) {
      this.loading = true;
      try {
        await this.http.post('/api/auth/change-password', this.validateForm.value);
        this.notification.success(
          this.translate.instant('Thành công'),
          this.translate.instant('Đổi mật khẩu thành công')
        );
        this.validateForm.reset();
      } catch (e: any) {
        console.error(e);
        this.notification.error(
          this.translate.instant('Thất bại'),
          e.error?.message || this.translate.instant('Đổi mật khẩu thất bại')
        );
      } finally {
        this.loading = false;
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
}
