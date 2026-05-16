import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { TranslocoService } from '@jsverse/transloco';
import { AppNotificationService } from '../services/app-notification.service';
import { NotificationTemplateService } from '../services/notification-template.service';
import { API_URL } from '../tokens/api-url.token';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private http = inject(HttpClient);
  private notification = inject(AppNotificationService);
  private router = inject(Router);
  private templateService = inject(NotificationTemplateService);
  private translate = inject(TranslocoService);
  private apiBaseUrlToken = inject(API_URL);

  private get API_BASE_URL(): string {
    return (window as any).env?.API_BASE_URL ?? this.apiBaseUrlToken ?? '';
  }

  private getHeaders(data?: any, trackingId?: string): HttpHeaders {
    let headers = new HttpHeaders();
    
    if (!(data instanceof FormData)) {
      headers = headers.set('Content-Type', 'application/json');
    }

    const token = localStorage.getItem('jwt_token');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    if (trackingId) {
      headers = headers.set('X-Tracking-Id', trackingId);
    }

    return headers;
  }

  private generateTrackingId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  private handleError(error: HttpErrorResponse): never {
    const status = error.status;
    const message = error.error?.message || error.message || 'Unknown error';
    
    if (status >= 400 || status === 0) {
      const translatedMessage = this.translate.translate(message);
      const displayMessage = status === 0 ? this.translate.translate('Lỗi kết nối hoặc server đang bảo trì') : translatedMessage;
      const linkText = this.translate.translate('Click vào đây để đăng nhập');
      const htmlContent = `${displayMessage}. <a href="/auth/login" style="color: #1890ff; text-decoration: underline;">${linkText}.</a>`;
      
      const template = this.templateService.getTemplate('html');
      const errorTitle = this.translate.translate('Thông báo');
      
      if (template) {
        this.notification.create('error', errorTitle, template, { nzData: { content: htmlContent }, nzDuration: 0 });
      } else {
        const ref = this.notification.error(errorTitle, `${displayMessage}. ${linkText}.`, { nzDuration: 0 });
        ref.onClick.subscribe(() => {
          this.router.navigate(['/auth/login']);
          this.notification.remove(ref.messageId);
        });
      }
    } else {
      this.notification.error(this.translate.translate('Thông báo'), message, { nzDuration: 0 });
    }
    
    throw error;
  }

  async get<T = any>(url: string, options?: any): Promise<T> {
    try {
      const fullUrl = url.startsWith('http') ? url : `${this.API_BASE_URL}${url}`;
      return await firstValueFrom(this.http.get<T>(fullUrl, {
        headers: this.getHeaders(),
        withCredentials: true,
        ...options
      }) as any);
    } catch (error) {
      this.handleError(error as HttpErrorResponse);
    }
  }

  async post<T = any>(url: string, data?: any, options?: any): Promise<T> {
    try {
      const trackingId = options?.trackingId || this.generateTrackingId();
      const fullUrl = url.startsWith('http') ? url : `${this.API_BASE_URL}${url}`;
      const result = await firstValueFrom(this.http.post<T>(fullUrl, data, {
        headers: this.getHeaders(data, trackingId),
        withCredentials: true,
        ...options
      }) as any);
      
      if (result && typeof result === 'object') {
        (result as any).trackingId = trackingId;
      }
      return result as T;
    } catch (error) {
      this.handleError(error as HttpErrorResponse);
    }
  }

  async put<T = any>(url: string, data?: any, options?: any): Promise<T> {
    try {
      const trackingId = options?.trackingId || this.generateTrackingId();
      const fullUrl = url.startsWith('http') ? url : `${this.API_BASE_URL}${url}`;
      const result = await firstValueFrom(this.http.put<T>(fullUrl, data, {
        headers: this.getHeaders(data, trackingId),
        withCredentials: true,
        ...options
      }) as any);

      if (result && typeof result === 'object') {
        (result as any).trackingId = trackingId;
      }
      return result as T;
    } catch (error) {
      this.handleError(error as HttpErrorResponse);
    }
  }

  async delete<T = any>(url: string, options?: any): Promise<T> {
    try {
      const trackingId = options?.trackingId || this.generateTrackingId();
      const fullUrl = url.startsWith('http') ? url : `${this.API_BASE_URL}${url}`;
      const result = await firstValueFrom(this.http.delete<T>(fullUrl, {
        headers: this.getHeaders(undefined, trackingId),
        withCredentials: true,
        ...options
      }) as any);

      if (result && typeof result === 'object') {
        (result as any).trackingId = trackingId;
      }
      return result as T;
    } catch (error) {
      this.handleError(error as HttpErrorResponse);
    }
  }

  async patch<T = any>(url: string, data?: any, options?: any): Promise<T> {
    try {
      const trackingId = options?.trackingId || this.generateTrackingId();
      const fullUrl = url.startsWith('http') ? url : `${this.API_BASE_URL}${url}`;
      const result = await firstValueFrom(this.http.patch<T>(fullUrl, data, {
        headers: this.getHeaders(data, trackingId),
        withCredentials: true,
        ...options
      }) as any);

      if (result && typeof result === 'object') {
        (result as any).trackingId = trackingId;
      }
      return result as T;
    } catch (error) {
      this.handleError(error as HttpErrorResponse);
    }
  }

  postObservable<T = any>(url: string, data?: any, options?: any) {
    const trackingId = options?.trackingId || this.generateTrackingId();
    const fullUrl = url.startsWith('http') ? url : `${this.API_BASE_URL}${url}`;
    return this.http.post<T>(fullUrl, data, {
      headers: this.getHeaders(data, trackingId),
      withCredentials: true,
      ...options
    });
  }
}
