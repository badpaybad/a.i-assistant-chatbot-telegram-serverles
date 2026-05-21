import { Component, TemplateRef, ViewChild, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { NotificationTemplateService, FirebaseService, AppNotificationService } from '@tot/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('htmlNotification') htmlNotificationTemplate!: TemplateRef<any>;
  private templateService = inject(NotificationTemplateService);
  private translate = inject(TranslocoService);
  private firebase = inject(FirebaseService);
  private notification = inject(AppNotificationService);

  constructor() {
    const savedLang = localStorage.getItem('lang') || 'vi';
    this.translate.setActiveLang(savedLang);
  }

  ngAfterViewInit() {
    this.templateService.registerTemplate('html', this.htmlNotificationTemplate);

    // Global FCM listener for foreground messages
    this.firebase.onMessageReceived((payload: any) => {
      const title = payload.notification?.title || 'Thông báo mới';
      const body = payload.notification?.body || '';
      
      const template = this.templateService.getTemplate('html');
      if (template) {
        this.notification.create('success', title, template, {
          nzData: { content: body },
          nzDuration: 0
        });
      } else {
        this.notification.success(title, body, { nzDuration: 0 });
      }
    });
  }
}
