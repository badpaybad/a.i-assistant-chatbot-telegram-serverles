import { TotButtonComponent } from '@tot/shared';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AppNotificationService, FirebaseService, HttpClientService } from '@tot/core';



@Component({
  selector: 'app-fcm-test',
  standalone: true,
  imports: [
    TotButtonComponent,
    CommonModule,
    FormsModule,
    NzPageHeaderModule,
    NzCardModule,
    NzButtonModule,
    NzInputModule
  ],
  templateUrl: './fcm-test.component.html',
  styleUrls: ['./fcm-test.component.css']
})
export class FcmTestComponent implements OnInit {
  private firebase = inject(FirebaseService);
  private http = inject(HttpClientService);
  private notification = inject(AppNotificationService);

  token: string | null = null;
  loadingToken = false;
  sendingSample = false;

  ngOnInit() {
    this.firebase.onMessageReceived((payload: any) => {
      this.notification.success(
        payload.notification?.title || 'FCM Notification',
        payload.notification?.body || 'New message received',
        { nzDuration: 0 }
      );
    });
  }

  async getDeviceToken() {
    this.loadingToken = true;
    try {
      this.token = await this.firebase.getFCMToken();
      if (this.token) {
        this.notification.success('Success', 'FCM Token retrieved');
      } else {
        this.notification.warning('Warning', 'Could not get FCM token. Make sure you allow notifications.');
      }
    } catch (e) {
      console.error(e);
    } finally {
      this.loadingToken = false;
    }
  }

  async sendSampleNotification() {
    if (!this.token) return;
    this.sendingSample = true;
    try {
      await this.http.post('/api/test/fcm-sample', {
        token: this.token,
        title: 'Sample Notification',
        body: 'This is a test notification from Tree of Thought backend!'
      });
      this.notification.info('Info', 'Sample notification request sent to backend');
    } catch (e) {
      console.error(e);
    } finally {
      this.sendingSample = false;
    }
  }
}
