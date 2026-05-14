import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AppNotificationService } from '../../../core/services/app-notification.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzDividerModule,
    NzIconModule,
    TranslateModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private fb = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private notification = inject(AppNotificationService);
  private translate = inject(TranslateService);

  validateForm: FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true],
  });

  loading = false;

  private handleRedirect(): boolean {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'];
    if (returnUrl) {
      window.location.href = returnUrl;
      return true;
    }
    return false;
  }

  async submitForm(): Promise<void> {
    if (this.validateForm.valid) {
      this.loading = true;
      try {
        const response = await this.authService.login(this.validateForm.value);

        if (this.handleRedirect()) return;

        if (response.mustChangePassword) {
          this.notification.warning(
            this.translate.instant('Yêu cầu đổi mật khẩu'),
            this.translate.instant('Bạn cần đổi mật khẩu mặc định trước khi tiếp tục'),
          );
          this.router.navigate(['/modules/core-infra-auth/change-password']);
        } else {
          this.router.navigate(['/']);
        }
      } catch (e: any) {
        console.error(e);
        this.notification.error(
          this.translate.instant('Đăng nhập thất bại'),
          e.error?.message || this.translate.instant('Tên đăng nhập hoặc mật khẩu không đúng'),
        );
      } finally {
        this.loading = false;
      }
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  async loginWithGoogle() {
    this.loading = true;
    try {
      await this.authService.ssoLogin('google');
      if (this.handleRedirect()) return;
      this.router.navigate(['/']);
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }

  async loginWithMS() {
    this.loading = true;
    try {
      await this.authService.ssoLogin('ms');
      if (this.handleRedirect()) return;
      this.router.navigate(['/']);
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }

  async loginWithFacebook() {
    this.loading = true;
    try {
      await this.authService.ssoLogin('facebook');
      if (this.handleRedirect()) return;
      this.router.navigate(['/']);
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }
}
