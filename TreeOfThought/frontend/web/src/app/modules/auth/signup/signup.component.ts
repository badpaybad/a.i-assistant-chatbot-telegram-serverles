import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AuthService } from '../../../core/auth/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzDividerModule } from 'ng-zorro-antd/divider';

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
    NzDividerModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  private fb = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private notification = inject(NzNotificationService);

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
        this.notification.error('Error', 'Passwords do not match');
        return;
      }

      this.loading = true;
      try {
        await this.authService.signup(this.validateForm.value);
        this.notification.success('Success', 'Signup successful. Please check your email for confirmation and then login.');
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
