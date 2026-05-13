import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AppNotificationService } from '../services/app-notification.service';
import { NotificationTemplateService } from '../services/notification-template.service';
import { TranslateService } from '@ngx-translate/core';

export const claimGuard = (claimOrClaims: string | string[], mode: 'OR' | 'AND' = 'OR'): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const notification = inject(AppNotificationService);
    const templateService = inject(NotificationTemplateService);
    const translate = inject(TranslateService);

    if (authService.hasClaim(claimOrClaims, mode)) {
      return true;
    }

    const isLoggedIn = authService.isLoggedIn();
    const claimsArray = Array.isArray(claimOrClaims) ? claimOrClaims : [claimOrClaims];
    const claimListStr = claimsArray.join(', ');

    const title = isLoggedIn 
      ? translate.instant('Truy cập bị từ chối') 
      : translate.instant('Yêu cầu đăng nhập');
    
    let message = '';
    if (isLoggedIn) {
      message = translate.instant('Bạn không có quyền truy cập tính năng. Bạn cần các quyền sau: {{claims}} để có thể truy cập tính năng. Vui lòng liên hệ với quản trị viên để yêu cầu cấp quyền.', { claims: claimListStr });
    } else {
      message = translate.instant('Vui lòng đăng nhập để truy cập tài nguyên này');
    }
    
    const loginLinkText = translate.instant('Click vào đây để đăng nhập');
    const loginLink = `<a href="/auth/login" style="color: #1890ff; text-decoration: underline;">${loginLinkText}.</a>`;
    const htmlContent = `${message} ${loginLink}`;

    const template = templateService.getTemplate('html');
    if (template) {
      notification.create('error', title, template, { nzData: { content: htmlContent }, nzDuration: 0 });
    } else {
      const ref = notification.error(title, `${message} ${loginLinkText}.`, {
        nzDuration: 0,
      });
      ref.onClick.subscribe(() => {
        router.navigate(['/auth/login']);
        notification.remove(ref.messageId);
      });
    }

    // if (!isLoggedIn) {
    //   router.navigate(['/auth/login']);
    // }

    return false;
  };
};

