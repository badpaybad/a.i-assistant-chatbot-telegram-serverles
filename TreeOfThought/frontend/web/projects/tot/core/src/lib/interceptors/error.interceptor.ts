import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppNotificationService } from '../services/app-notification.service';
import { TranslocoService } from '@jsverse/transloco';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const notification = inject(AppNotificationService);
  const router = inject(Router);
  const translate = inject(TranslocoService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Unauthorized - Redirect to login
        localStorage.removeItem('jwt_token');
        router.navigate(['/auth/login']);
      }
      
      const message = error.error?.message || error.message || 'Unknown error';
      notification.error(translate.translate('Thông báo'), translate.translate(message));
      
      return throwError(() => error);
    })
  );
};
