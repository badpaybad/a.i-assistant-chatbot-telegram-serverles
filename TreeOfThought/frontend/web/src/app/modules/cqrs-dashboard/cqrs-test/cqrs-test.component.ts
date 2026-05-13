import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AppNotificationService } from '../../../core/services/app-notification.service';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DashboardService } from '../services/dashboard.service';

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
    TranslateModule
  ],
  template: `
    <div style="padding: 24px;">
      <h2 style="margin-bottom: 24px;">{{ 'Kiểm thử CQRS' | translate }}</h2>
      
      <div nz-row [nzGutter]="24">
        <div nz-col [nzSpan]="12">
          <nz-card [nzTitle]="'Gửi SampleCommand' | translate">
            <p>{{ 'Command này sẽ được Enqueue vào queue sample.command' | translate }}</p>
            <div style="margin-bottom: 16px;">
              <label>{{ 'Payload dữ liệu' | translate }}</label>
              <textarea nz-input [(ngModel)]="commandPayload" [nzAutosize]="{ minRows: 3, maxRows: 6 }"></textarea>
            </div>
            <button nz-button nzType="primary" [nzLoading]="loadingCommand" (click)="sendTestCommand()" nzBlock>
              <span nz-icon nzType="rocket"></span> {{ 'Gửi Command' | translate }}
            </button>
          </nz-card>
        </div>
        
        <div nz-col [nzSpan]="12">
          <nz-card [nzTitle]="'Gửi SampleEvent' | translate">
            <p>{{ 'Sự kiện này sẽ được Publish vào topic sample.event' | translate }}</p>
            <div style="margin-bottom: 16px;">
              <label>{{ 'Nội dung sự kiện' | translate }}</label>
              <textarea nz-input [(ngModel)]="eventData" [nzAutosize]="{ minRows: 3, maxRows: 6 }"></textarea>
            </div>
            <button nz-button nzType="primary" [nzLoading]="loadingEvent" (click)="sendTestEvent()" nzBlock>
              <span nz-icon nzType="notification"></span> {{ 'Gửi Event' | translate }}
            </button>
          </nz-card>
        </div>
      </div>

      <div *ngIf="lastTrackingId" style="margin-top: 24px;">
        <nz-card [nzTitle]="'Kết quả gần nhất' | translate">
          <p><strong>Tracking ID:</strong> <code>{{ lastTrackingId }}</code></p>
          <p>{{ 'Bạn có thể quay lại Dashboard và tìm kiếm theo ID này để theo dõi luồng xử lý.' | translate }}</p>
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
  private translate = inject(TranslateService);

  commandPayload = '{"message": "Hello from UI Test Command", "timestamp": "' + new Date().toISOString() + '"}';
  eventData = '{"message": "Hello from UI Test Event", "timestamp": "' + new Date().toISOString() + '"}';
  
  loadingCommand = false;
  loadingEvent = false;
  lastTrackingId = '';

  sendTestCommand(): void {
    this.loadingCommand = true;
    this.dashboardService.sendTestCommand(this.commandPayload).subscribe({
      next: (res) => {
        this.lastTrackingId = res.trackingId;
        this.notification.success(this.translate.instant('Thành công'), this.translate.instant('Đã gửi SampleCommand. Tracking ID: {{id}}', { id: res.trackingId }));
        this.loadingCommand = false;
      },
      error: () => {
        this.notification.error(this.translate.instant('Thất bại'), this.translate.instant('Lỗi khi gửi command'));
        this.loadingCommand = false;
      }
    });
  }

  sendTestEvent(): void {
    this.loadingEvent = true;
    this.dashboardService.sendTestEvent(this.eventData).subscribe({
      next: (res) => {
        this.lastTrackingId = res.trackingId;
        this.notification.success(this.translate.instant('Thành công'), this.translate.instant('Đã gửi SampleEvent. Tracking ID: {{id}}', { id: res.trackingId }));
        this.loadingEvent = false;
      },
      error: () => {
        this.notification.error(this.translate.instant('Thất bại'), this.translate.instant('Lỗi khi gửi event'));
        this.loadingEvent = false;
      }
    });
  }
}
