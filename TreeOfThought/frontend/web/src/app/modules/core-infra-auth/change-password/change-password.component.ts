import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzCardModule } from 'ng-zorro-antd/card';
import { AuthManagementService } from '../services/auth-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule
  ],
  templateUrl: './change-password.component.html',
  styles: [`
    .change-password-card {
      max-width: 500px;
      margin: 50px auto;
    }
  `]
})
export class ChangePasswordComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthManagementService);
  private message = inject(NzMessageService);
  private router = inject(Router);

  confirmationValidator = (group: FormGroup): { [key: string]: boolean } | null => {
    if (group.get('newPassword')?.value !== group.get('confirmPassword')?.value) {
      return { confirm: true };
    }
    return null;
  };

  validateForm: FormGroup = this.fb.group({
    currentPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, {
    validators: this.confirmationValidator
  });

  async submitForm(): Promise<void> {
    if (this.validateForm.valid) {
      const { currentPassword, newPassword } = this.validateForm.value;
      try {
        await this.authService.changePassword({ currentPassword, newPassword });
        this.message.success('Password changed successfully');
        this.router.navigate(['/']);
      } catch (err: any) {
        this.message.error(err.error?.message || 'Failed to change password');
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
