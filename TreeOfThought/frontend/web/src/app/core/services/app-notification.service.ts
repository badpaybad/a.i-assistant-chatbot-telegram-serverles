import { Injectable, TemplateRef, inject } from '@angular/core';
import { NzNotificationDataOptions, NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class AppNotificationService {
  private nzNotification = inject(NzNotificationService);

  private formatTime(): string {
    return new Date().toLocaleTimeString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false 
    });
  }

  private augmentContent(content: string | TemplateRef<void>): string | TemplateRef<void> {
    const timeStr = this.formatTime();
    if (typeof content === 'string') {
      return content ? `${content} | ${timeStr}` : timeStr;
    }
    return content;
  }

  private augmentOptions(options?: NzNotificationDataOptions): NzNotificationDataOptions {
    const timeStr = this.formatTime();
    const newOptions: NzNotificationDataOptions = { ...options, nzDuration: 0 };
    
    if (newOptions.nzData && typeof newOptions.nzData === 'object') {
      const data = newOptions.nzData as any;
      if (typeof data.content === 'string') {
        newOptions.nzData = {
          ...data,
          content: data.content ? `${data.content} | ${timeStr}` : timeStr
        };
      }
    }
    
    return newOptions;
  }

  success(title: string | TemplateRef<void>, content: string | TemplateRef<void>, options?: NzNotificationDataOptions) {
    return this.nzNotification.success(title, this.augmentContent(content), this.augmentOptions(options));
  }

  error(title: string | TemplateRef<void>, content: string | TemplateRef<void>, options?: NzNotificationDataOptions) {
    return this.nzNotification.error(title, this.augmentContent(content), this.augmentOptions(options));
  }

  info(title: string | TemplateRef<void>, content: string | TemplateRef<void>, options?: NzNotificationDataOptions) {
    return this.nzNotification.info(title, this.augmentContent(content), this.augmentOptions(options));
  }

  warning(title: string | TemplateRef<void>, content: string | TemplateRef<void>, options?: NzNotificationDataOptions) {
    return this.nzNotification.warning(title, this.augmentContent(content), this.augmentOptions(options));
  }

  blank(title: string | TemplateRef<void>, content: string | TemplateRef<void>, options?: NzNotificationDataOptions) {
    return this.nzNotification.blank(title, this.augmentContent(content), this.augmentOptions(options));
  }

  create(type: 'success' | 'info' | 'warning' | 'error' | 'blank' | string, title: string | TemplateRef<void>, content: string | TemplateRef<void>, options?: NzNotificationDataOptions) {
    return this.nzNotification.create(type, title, this.augmentContent(content), this.augmentOptions(options));
  }

  remove(id?: string) {
    return this.nzNotification.remove(id);
  }
}
