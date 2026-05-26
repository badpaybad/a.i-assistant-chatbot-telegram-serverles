import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { TranslocoService } from '@jsverse/transloco';
import { AppNotificationService } from '../services/app-notification.service';
import { NotificationTemplateService } from '../services/notification-template.service';
import { API_URL } from '../tokens/api-url.token';
import { FirebaseService } from '../firebase/firebase.service';

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
  private firebaseService = inject(FirebaseService);

  private trackingCallbacks = new Map<string, (data: any) => void>();
  private receivedData = new Map<string, any>();
  private activeSubscriptions = new Map<string, () => void>();

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

  private subscribeToTracking(trackingId: string) {
    const unsubscribe = this.firebaseService.subscribeToRequestId(trackingId, (data) => {
      const callback = this.trackingCallbacks.get(trackingId);
      if (callback) {
        callback(data);
        this.trackingCallbacks.delete(trackingId);
      } else {
        this.receivedData.set(trackingId, data);
        setTimeout(() => {
          this.receivedData.delete(trackingId);
        }, 30000);
      }
      this.activeSubscriptions.delete(trackingId);
    });

    this.activeSubscriptions.set(trackingId, unsubscribe);

    // Auto cleanup subscription if BE fails to reply in 5 minutes
    setTimeout(() => {
      const activeUnsub = this.activeSubscriptions.get(trackingId);
      if (activeUnsub) {
        activeUnsub();
        this.activeSubscriptions.delete(trackingId);
        this.trackingCallbacks.delete(trackingId);
      }
    }, 300000);
  }

  private handleRequestTracking(
    trackingId: string,
    result: any,
    callback: ((data: any) => void) | undefined
  ): string {
    const finalTrackingId = (result && typeof result === 'object' && (result as any).trackingId) || trackingId;
    if (result && typeof result === 'object') {
      (result as any).trackingId = finalTrackingId;
    }

    if (finalTrackingId !== trackingId && callback) {
      const registered = this.trackingCallbacks.get(trackingId);
      if (registered) {
        this.trackingCallbacks.set(finalTrackingId, registered);
        this.trackingCallbacks.delete(trackingId);
      }
      const received = this.receivedData.get(trackingId);
      if (received) {
        this.receivedData.set(finalTrackingId, received);
        this.receivedData.delete(trackingId);
      }
      const activeUnsub = this.activeSubscriptions.get(trackingId);
      if (activeUnsub) {
        activeUnsub();
        this.activeSubscriptions.delete(trackingId);
      }
    }

    this.subscribeToTracking(finalTrackingId);
    return finalTrackingId;
  }

  registerCallback(trackingId: string, callback: (data: any) => void) {
    if (this.receivedData.has(trackingId)) {
      const data = this.receivedData.get(trackingId);
      callback(data);
      this.receivedData.delete(trackingId);
    } else {
      this.trackingCallbacks.set(trackingId, callback);
    }
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

  async post<T = any>(url: string, data?: any, callbackOrOptions?: ((data: any) => void) | any, options?: any): Promise<T> {
    try {
      const isCallback = typeof callbackOrOptions === 'function';
      const callback = isCallback ? callbackOrOptions as (data: any) => void : undefined;
      const finalOptions = isCallback ? options : callbackOrOptions;

      const trackingId = finalOptions?.trackingId || this.generateTrackingId();
      
      if (callback) {
        this.registerCallback(trackingId, callback);
      }

      const fullUrl = url.startsWith('http') ? url : `${this.API_BASE_URL}${url}`;
      const result = await firstValueFrom(this.http.post<T>(fullUrl, data, {
        headers: this.getHeaders(data, trackingId),
        withCredentials: true,
        ...finalOptions
      }) as any);
      
      this.handleRequestTracking(trackingId, result, callback);
      return result as T;
    } catch (error) {
      this.handleError(error as HttpErrorResponse);
    }
  }

  async put<T = any>(url: string, data?: any, callbackOrOptions?: ((data: any) => void) | any, options?: any): Promise<T> {
    try {
      const isCallback = typeof callbackOrOptions === 'function';
      const callback = isCallback ? callbackOrOptions as (data: any) => void : undefined;
      const finalOptions = isCallback ? options : callbackOrOptions;

      const trackingId = finalOptions?.trackingId || this.generateTrackingId();

      if (callback) {
        this.registerCallback(trackingId, callback);
      }

      const fullUrl = url.startsWith('http') ? url : `${this.API_BASE_URL}${url}`;
      const result = await firstValueFrom(this.http.put<T>(fullUrl, data, {
        headers: this.getHeaders(data, trackingId),
        withCredentials: true,
        ...finalOptions
      }) as any);

      this.handleRequestTracking(trackingId, result, callback);
      return result as T;
    } catch (error) {
      this.handleError(error as HttpErrorResponse);
    }
  }

  async delete<T = any>(url: string, callbackOrOptions?: ((data: any) => void) | any, options?: any): Promise<T> {
    try {
      const isCallback = typeof callbackOrOptions === 'function';
      const callback = isCallback ? callbackOrOptions as (data: any) => void : undefined;
      const finalOptions = isCallback ? options : callbackOrOptions;

      const trackingId = finalOptions?.trackingId || this.generateTrackingId();

      if (callback) {
        this.registerCallback(trackingId, callback);
      }

      const fullUrl = url.startsWith('http') ? url : `${this.API_BASE_URL}${url}`;
      const result = await firstValueFrom(this.http.delete<T>(fullUrl, {
        headers: this.getHeaders(undefined, trackingId),
        withCredentials: true,
        ...finalOptions
      }) as any);

      this.handleRequestTracking(trackingId, result, callback);
      return result as T;
    } catch (error) {
      this.handleError(error as HttpErrorResponse);
    }
  }

  async patch<T = any>(url: string, data?: any, callbackOrOptions?: ((data: any) => void) | any, options?: any): Promise<T> {
    try {
      const isCallback = typeof callbackOrOptions === 'function';
      const callback = isCallback ? callbackOrOptions as (data: any) => void : undefined;
      const finalOptions = isCallback ? options : callbackOrOptions;

      const trackingId = finalOptions?.trackingId || this.generateTrackingId();

      if (callback) {
        this.registerCallback(trackingId, callback);
      }

      const fullUrl = url.startsWith('http') ? url : `${this.API_BASE_URL}${url}`;
      const result = await firstValueFrom(this.http.patch<T>(fullUrl, data, {
        headers: this.getHeaders(data, trackingId),
        withCredentials: true,
        ...finalOptions
      }) as any);

      this.handleRequestTracking(trackingId, result, callback);
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
