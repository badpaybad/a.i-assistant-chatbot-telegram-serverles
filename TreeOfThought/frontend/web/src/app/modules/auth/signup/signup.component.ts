import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AuthService } from '../../../core/auth/auth.service';
import { AppNotificationService } from '../../../core/services/app-notification.service';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzDividerModule,
    TranslateModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  private fb = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private notification = inject(AppNotificationService);
  private translate = inject(TranslateService);

  validateForm: FormGroup<{
    username: FormControl<string>;
    email: FormControl<string>;
    displayName: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
  }> = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    displayName: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  });

  loading = false;

  async submitForm(): Promise<void> {
    if (this.validateForm.valid) {
      if (this.validateForm.value.password !== this.validateForm.value.confirmPassword) {
        this.notification.error(this.translate.instant('Thất bại'), this.translate.instant('Mật khẩu không khớp'));
        return;
      }

      this.loading = true;
      try {
        await this.authService.signup(this.validateForm.value);
        this.notification.success(this.translate.instant('Thành công'), this.translate.instant('Đăng ký thành công. Vui lòng kiểm tra email để xác nhận và sau đó đăng nhập.'));
        this.router.navigate(['/auth/login']);
      } catch (e) {
        console.error(e);
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

  async signupWithGoogle() {
    this.loading = true;
    try {
      await this.authService.ssoLogin('google');
      this.router.navigate(['/']);
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }

  async signupWithMS() {
    this.loading = true;
    try {
      await this.authService.ssoLogin('ms');
      this.router.navigate(['/']);
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }

  async signupWithFacebook() {
    this.loading = true;
    try {
      await this.authService.ssoLogin('facebook');
      this.router.navigate(['/']);
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }
}
