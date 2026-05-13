import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NotificationTemplateService } from '../services/notification-template.service';
import { TranslateService } from '@ngx-translate/core';

export const claimGuard = (claim: string): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const notification = inject(NzNotificationService);
    const templateService = inject(NotificationTemplateService);
    const translate = inject(TranslateService);

    if (authService.hasClaim(claim)) {
      return true;
    }

    const isLoggedIn = authService.isLoggedIn();
    const title = isLoggedIn 
      ? translate.instant('Truy cập bị từ chối') 
      : translate.instant('Yêu cầu đăng nhập');
    
    const message = isLoggedIn 
      ? translate.instant('Bạn không có quyền: {{claim}}', { claim })
      : translate.instant('Vui lòng đăng nhập để truy cập tài nguyên này');
    
    const loginLinkText = translate.instant('Click vào đây để đăng nhập');
    const loginLink = `<a href="/auth/login" style="color: #1890ff; text-decoration: underline;">${loginLinkText}.</a>`;
    const htmlContent = `${message}. ${loginLink}`;

    const template = templateService.getTemplate('html');
    if (template) {
      notification.create('error', title, template, { nzData: { content: htmlContent }, nzDuration: 0 });
    } else {
      const ref = notification.error(title, `${message}. ${loginLinkText}.`, {
        nzDuration: 0,
      });
      ref.onClick.subscribe(() => {
        router.navigate(['/auth/login']);
        notification.remove(ref.messageId);
      });
    }

    if (!isLoggedIn) {
      router.navigate(['/auth/login']);
    }

    return false;
  };
};
