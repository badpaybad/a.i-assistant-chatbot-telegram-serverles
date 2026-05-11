import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NotificationTemplateService } from '../services/notification-template.service';

export const claimGuard = (claim: string): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const notification = inject(NzNotificationService);
    const templateService = inject(NotificationTemplateService);

    if (authService.hasClaim(claim)) {
      return true;
    }

    const isLoggedIn = authService.isLoggedIn();
    const title = isLoggedIn ? 'Access Denied' : 'Authentication Required';
    const message = isLoggedIn 
      ? `You do not have the required claim: ${claim}.`
      : 'Please login to access this resource.';
    
    const loginLink = '<a href="/auth/login" style="color: #1890ff; text-decoration: underline;">Click here to login.</a>';
    const htmlContent = `${message} ${loginLink}`;

    const template = templateService.getTemplate('html');
    if (template) {
      const ref = notification.create('error', title, template, { nzData: { content: htmlContent }, nzDuration: 0 });
      ref.onClick.subscribe(() => {
        router.navigate(['/auth/login']);
        notification.remove(ref.messageId);
      });
    } else {
      const ref = notification.error(title, `${message} Click here to login.`, {
        nzDuration: 0,
      });
      ref.onClick.subscribe(() => {
        router.navigate(['/auth/login']);
        notification.remove(ref.messageId);
      });
    }

    return false;
  };
};
