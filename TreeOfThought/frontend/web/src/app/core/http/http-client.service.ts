import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { firstValueFrom } from 'rxjs';
import { NotificationTemplateService } from '../services/notification-template.service';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private http = inject(HttpClient);
  private notification = inject(NzNotificationService);
  private router = inject(Router);
  private templateService = inject(NotificationTemplateService);

  // Default base URL - can be overridden by environment
  private readonly API_BASE_URL = (window as any).env?.API_BASE_URL || 'http://localhost:5000';

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const token = localStorage.getItem('jwt_token');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  private handleError(error: HttpErrorResponse): never {
    const status = error.status;
    const message = error.error?.message || error.message || 'Unknown error';
    
    if (status >= 400 || status === 0) {
      const displayMessage = status === 0 ? 'Network error or Server is down' : message;
      const htmlContent = `${displayMessage}. <a href="/auth/login" style="color: #1890ff; text-decoration: underline;">Click here to login.</a>`;
      
      const template = this.templateService.getTemplate('html');
      if (template) {
        const ref = this.notification.create('error', 'Error', template, { nzData: { content: htmlContent }, nzDuration: 0 });
        ref.onClick.subscribe(() => {
          this.router.navigate(['/auth/login']);
          this.notification.remove(ref.messageId);
        });
      } else {
        const ref = this.notification.error('Error', `${displayMessage}. Click here to login.`, { nzDuration: 0 });
        ref.onClick.subscribe(() => {
          this.router.navigate(['/auth/login']);
          this.notification.remove(ref.messageId);
        });
      }
    } else {
      this.notification.error('Error', message, { nzDuration: 0 });
    }
    
    throw error;
  }

  async get<T = any>(url: string, options?: any): Promise<T> {
    try {
      const fullUrl = url.startsWith('http') ? url : `${this.API_BASE_URL}${url}`;
      return await firstValueFrom(this.http.get<T>(fullUrl, {
        headers: this.getHeaders(),
        ...options
      }) as any);
    } catch (error) {
      this.handleError(error as HttpErrorResponse);
    }
  }

  async post<T = any>(url: string, data?: any, options?: any): Promise<T> {
    try {
      const fullUrl = url.startsWith('http') ? url : `${this.API_BASE_URL}${url}`;
      return await firstValueFrom(this.http.post<T>(fullUrl, data, {
        headers: this.getHeaders(),
        ...options
      }) as any);
    } catch (error) {
      this.handleError(error as HttpErrorResponse);
    }
  }

  async put<T = any>(url: string, data?: any, options?: any): Promise<T> {
    try {
      const fullUrl = url.startsWith('http') ? url : `${this.API_BASE_URL}${url}`;
      return await firstValueFrom(this.http.put<T>(fullUrl, data, {
        headers: this.getHeaders(),
        ...options
      }) as any);
    } catch (error) {
      this.handleError(error as HttpErrorResponse);
    }
  }

  async delete<T = any>(url: string, options?: any): Promise<T> {
    try {
      const fullUrl = url.startsWith('http') ? url : `${this.API_BASE_URL}${url}`;
      return await firstValueFrom(this.http.delete<T>(fullUrl, {
        headers: this.getHeaders(),
        ...options
      }) as any);
    } catch (error) {
      this.handleError(error as HttpErrorResponse);
    }
  }
}
