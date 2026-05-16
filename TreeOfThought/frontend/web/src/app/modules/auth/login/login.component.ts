import { Component, inject, OnInit } from '@angular/core';
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
import { AppNotificationService, AuthService } from '@tot/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


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
export class LoginComponent implements OnInit {
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
  ssoClientName: string | null = null;
  ssoRedirectUri: string | null = null;

  constructor() {
    this.detectSsoContext();
  }

  ngOnInit(): void {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'];

    // Subscribe to SSO completion
    this.authService.ssoComplete$.subscribe(complete => {
      if (complete) {
        console.log('[Login] SSO process complete, handling redirect...');
        this.handleRedirect();
      }
    });

    // Only auto-redirect to home if NOT in an OIDC flow (no returnUrl)
    // If there is a returnUrl, we should NOT auto-redirect based on existing JWT
    // because that can cause an infinite loop if the backend session cookie is missing.
    // The user will see the login page and can click a provider or log in again.
    if (this.authService.isLoggedIn() && !returnUrl) {
      console.log('[Login] User already logged in, redirecting to home');
      this.router.navigate(['/']);
    }
  }

  private detectSsoContext(): void {
    try {
      const returnUrl = this.route.snapshot.queryParams['returnUrl'];
      console.log('[SSO] returnUrl from queryParams:', returnUrl);
      
      if (!returnUrl) return;

      // Handle relative URLs safely
      let fullUrl = returnUrl;
      if (!returnUrl.startsWith('http')) {
        fullUrl = window.location.origin + (returnUrl.startsWith('/') ? '' : '/') + returnUrl;
      }
      
      console.log('[SSO] Parsing full URL:', fullUrl);
      const url = new URL(fullUrl);
      const params = new URLSearchParams(url.search);
      
      this.ssoClientName = params.get('client_id');
      this.ssoRedirectUri = params.get('redirect_uri');
      
      console.log('[SSO] Detected Client ID:', this.ssoClientName);
      
      // Pretty name mapping
      if (this.ssoClientName === 'my_pc_assistant') {
        this.ssoClientName = 'My PC Assistant App';
      }
    } catch (e) {
      console.error('[SSO] Error detecting context:', e);
    }
  }

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
          this.translate.instant('Lỗi'),
          this.translate.instant(e.error?.message || 'Đăng nhập thất bại'),
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
      const completed = await this.authService.ssoLogin('google');
      if (completed) {
        this.handleRedirect();
      }
    } catch (e) {
      console.error(e);
      this.loading = false;
    }
  }

  async loginWithMS() {
    this.loading = true;
    try {
      const completed = await this.authService.ssoLogin('ms');
      if (completed) {
        this.handleRedirect();
      }
    } catch (e) {
      console.error(e);
      this.loading = false;
    }
  }

  async loginWithFacebook() {
    this.loading = true;
    try {
      const completed = await this.authService.ssoLogin('facebook');
      if (completed) {
        this.handleRedirect();
      }
    } catch (e) {
      console.error(e);
      this.loading = false;
    }
  }
}
