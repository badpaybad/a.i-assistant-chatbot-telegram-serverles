import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AppNotificationService, AuthService } from '@tot/core';

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
export class SignupComponent implements OnInit {
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
  ssoClientName: string | null = null;

  ngOnInit(): void {
    // If user is already logged in (e.g. returning from social redirect)
    this.authService.ssoComplete$.subscribe(complete => {
      if (complete) {
        this.router.navigate(['/']);
      }
    });

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

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
      const completed = await this.authService.ssoLogin('google');
      if (completed) {
        this.router.navigate(['/']);
      }
    } catch (e) {
      console.error(e);
      this.loading = false;
    }
  }

  async signupWithMS() {
    this.loading = true;
    try {
      const completed = await this.authService.ssoLogin('ms');
      if (completed) {
        this.router.navigate(['/']);
      }
    } catch (e) {
      console.error(e);
      this.loading = false;
    }
  }

  async signupWithFacebook() {
    this.loading = true;
    try {
      const completed = await this.authService.ssoLogin('facebook');
      if (completed) {
        this.router.navigate(['/']);
      }
    } catch (e) {
      console.error(e);
      this.loading = false;
    }
  }
}
