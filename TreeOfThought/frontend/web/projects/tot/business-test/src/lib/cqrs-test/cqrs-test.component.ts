import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AppNotificationService } from '@tot/core';
import { TotButtonComponent } from '@tot/shared';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { DashboardService } from '@tot/business-dashboard';

@Component({
  selector: 'app-cqrs-test',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzCardModule,
    NzButtonModule,
    NzInputModule,
    NzGridModule,
    NzIconModule,
    TranslocoModule,
    TotButtonComponent
  ],
  template: `
    <div style="padding: 24px;">
      <h2 style="margin-bottom: 24px;">{{ 'Kiểm thử CQRS' | transloco }}</h2>
      
      <div nz-row [nzGutter]="24">
        <div nz-col [nzSpan]="12">
          <nz-card [nzTitle]="'Gửi SampleCommand' | transloco">
            <p>{{ 'Command này sẽ được Enqueue vào queue sample.command' | transloco }}</p>
            <div style="margin-bottom: 16px;">
              <label>{{ 'Payload dữ liệu' | transloco }}</label>
              <textarea nz-input [(ngModel)]="commandPayload" [nzAutosize]="{ minRows: 3, maxRows: 6 }"></textarea>
            </div>
            <tot-button nzType="primary" [loading]="loadingCommand" (click)="sendTestCommand()" [nzBlock]="true">
              <span nz-icon nzType="rocket"></span> {{ 'Gửi Command' | transloco }}
            </tot-button>
          </nz-card>
        </div>
        
        <div nz-col [nzSpan]="12">
          <nz-card [nzTitle]="'Gửi SampleEvent' | transloco">
            <p>{{ 'Sự kiện này sẽ được Publish vào topic sample.event' | transloco }}</p>
            <div style="margin-bottom: 16px;">
              <label>{{ 'Nội dung sự kiện' | transloco }}</label>
              <textarea nz-input [(ngModel)]="eventData" [nzAutosize]="{ minRows: 3, maxRows: 6 }"></textarea>
            </div>
            <tot-button nzType="primary" [loading]="loadingEvent" (click)="sendTestEvent()" [nzBlock]="true">
              <span nz-icon nzType="notification"></span> {{ 'Gửi Event' | transloco }}
            </tot-button>
          </nz-card>
        </div>
      </div>

      <div *ngIf="lastTrackingId" style="margin-top: 24px;">
        <nz-card [nzTitle]="'Kết quả gần nhất' | transloco">
          <p><strong>Tracking ID:</strong> <code>{{ lastTrackingId }}</code></p>
          <p>{{ 'Bạn có thể quay lại Dashboard và tìm kiếm theo ID này để theo dõi luồng xử lý.' | transloco }}</p>
          <div *ngIf="lastResult" style="margin-top: 16px; padding: 16px; background: #fafafa; border: 1px solid #f0f0f0; border-radius: 8px;">
            <h4 style="margin-bottom: 8px; color: #52c41a; display: flex; align-items: center; gap: 8px;">
              <span nz-icon nzType="check-circle" nzTheme="fill"></span>
               {{ 'Kết quả xử lý từ Firestore:' | transloco }}
            </h4>
            <pre style="margin: 0; font-size: 13px; background: #2d3748; color: #f7fafc; padding: 12px; border-radius: 6px; overflow: auto; max-height: 200px;">{{ formatJson(lastResult) }}</pre>
          </div>
        </nz-card>
      </div>
    </div>
  `,
  styles: [`
    nz-card {
      margin-bottom: 24px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
    }
  `]
})
export class CqrsTestComponent {
  private dashboardService = inject(DashboardService);
  private notification = inject(AppNotificationService);
  private translate = inject(TranslocoService);

  commandPayload = '{"message": "Hello from UI Test Command", "timestamp": "' + new Date().toISOString() + '"}';
  eventData = '{"message": "Hello from UI Test Event", "timestamp": "' + new Date().toISOString() + '"}';
  
  loadingCommand = false;
  loadingEvent = false;
  lastTrackingId = '';
  lastResult: any = null;

  sendTestCommand(): void {
    this.loadingCommand = true;
    this.lastResult = null;
    this.dashboardService.sendTestCommand(this.commandPayload, (data) => {
      this.lastResult = data;
      this.notification.success('Command Result (Firestore)', `Result for ${this.lastTrackingId}: ${JSON.stringify(data)}`, { nzDuration: 0 });
    }).subscribe({
      next: (res) => {
        this.lastTrackingId = res.trackingId;
        this.notification.success(this.translate.translate('Thành công'), this.translate.translate('NOTIFICATIONS.SAMPLE_COMMAND_SENT', { id: res.trackingId }));
        this.loadingCommand = false;
      },
      error: () => {
        this.notification.error(this.translate.translate('Thất bại'), this.translate.translate('Lỗi khi gửi command'));
        this.loadingCommand = false;
      }
    });
  }

  sendTestEvent(): void {
    this.loadingEvent = true;
    this.lastResult = null;
    this.dashboardService.sendTestEvent(this.eventData).subscribe({
      next: (res) => {
        this.lastTrackingId = res.trackingId;
        this.notification.success(this.translate.translate('Thành công'), this.translate.translate('NOTIFICATIONS.SAMPLE_EVENT_PUBLISHED', { id: res.trackingId }));
        this.loadingEvent = false;
      },
      error: () => {
        this.notification.error(this.translate.translate('Thất bại'), this.translate.translate('Lỗi khi gửi event'));
        this.loadingEvent = false;
      }
    });
  }

  formatJson(obj: any): string {
    if (!obj) return '';
    return JSON.stringify(obj, null, 2);
  }
}
