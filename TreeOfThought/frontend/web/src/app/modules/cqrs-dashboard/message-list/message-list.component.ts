import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { AppNotificationService } from '../../../core/services/app-notification.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DashboardService } from '../services/dashboard.service';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzTagModule,
    TranslateModule
  ],
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  private notification = inject(AppNotificationService);
  private modal = inject(NzModalService);
  private translate = inject(TranslateService);
  private modalData = inject(NZ_MODAL_DATA, { optional: true });

  @Input() inputQueueName?: string;
  
  queueName: string = '';
  messages: any[] = [];
  loading = false;
  
  pageIndex = 1;
  pageSize = 10;
  total = 0;

  ngOnInit(): void {
    this.queueName = this.inputQueueName || this.modalData?.inputQueueName || '';
    if (this.queueName) {
      this.loadMessages();
    }
  }

  loadMessages(): void {
    this.loading = true;
    this.dashboardService.getMessages(this.queueName, this.pageIndex, this.pageSize).subscribe({
      next: (res) => {
        this.messages = res.items.map(m => {
          try {
            return { 
              raw: m, 
              parsed: JSON.parse(m),
              expand: false
            };
          } catch {
            return { 
              raw: m, 
              parsed: m,
              expand: false
            };
          }
        });
        this.total = res.total;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.notification.error(this.translate.instant('Lỗi'), this.translate.instant('Không thể tải danh sách tin nhắn'));
      }
    });
  }

  onPageIndexChange(index: number): void {
    this.pageIndex = index;
    this.loadMessages();
  }

  formatJson(json: any): string {
    return JSON.stringify(json, null, 2);
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.notification.success(this.translate.instant('Thành công'), this.translate.instant('Đã sao chép vào bộ nhớ tạm'));
    });
  }

  resend(item: any): void {
    this.modal.confirm({
      nzTitle: this.translate.instant('Xác nhận gửi lại'),
      nzContent: this.translate.instant('Bạn có chắc chắn muốn gửi lại tin nhắn này vào hàng đợi gốc?'),
      nzOnOk: () => {
        this.dashboardService.retryCommand(this.queueName, item.raw).subscribe(() => {
          this.notification.success(this.translate.instant('Thành công'), this.translate.instant('Tin nhắn đã được gửi lại'));
          this.loadMessages();
        });
      }
    });
  }

  delete(item: any): void {
    this.modal.confirm({
      nzTitle: this.translate.instant('Xác nhận xóa'),
      nzContent: this.translate.instant('Bạn có chắc chắn muốn xóa tin nhắn này khỏi hàng đợi?'),
      nzOnOk: () => {
        this.dashboardService.removeFromDeadLetter(this.queueName, item.raw).subscribe(() => {
          this.notification.success(this.translate.instant('Thành công'), this.translate.instant('Đã xóa tin nhắn'));
          this.loadMessages();
        });
      }
    });
  }

  getStatus(item: any): string {
    if (item.parsed?._status) return item.parsed._status;
    if (this.queueName.endsWith(':dead')) return 'error';
    if (this.queueName.endsWith(':processing')) return 'processing';
    return 'pending';
  }

  getTime(item: any): string {
    if (item.parsed?._failedAt) return item.parsed._failedAt;
    if (item.parsed?.Timestamp) return item.parsed.Timestamp;
    if (item.parsed?._timestamp) return item.parsed._timestamp;
    return '';
  }
}
