import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzNotificationService } from 'ng-zorro-antd/notification';
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
    NzIconModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private fb = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private notification = inject(NzNotificationService);

  validateForm: FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true]
  });

  loading = false;

  async submitForm(): Promise<void> {
    if (this.validateForm.valid) {
      this.loading = true;
      try {
        await this.authService.login(this.validateForm.value);
        this.router.navigate(['/']);
      } catch (e: any) {
        console.error(e);
        this.notification.error('Login Failed', e.error?.message || 'Invalid username or password');
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

  fillAdmin() {
    this.validateForm.patchValue({
      username: 'admin',
      password: 'admin123'
    });
  }

  async loginWithGoogle() {
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

  async loginWithMS() {
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

  async loginWithFacebook() {
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
