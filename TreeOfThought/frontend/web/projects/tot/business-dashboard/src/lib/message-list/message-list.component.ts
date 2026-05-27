import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { AppNotificationService } from '@tot/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { DashboardService } from '../services/dashboard.service';
import { TotButtonComponent, TotTableComponent, TotTableColumn, TotCellDirective } from '@tot/shared';
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
    NzTimelineModule,
    NzTooltipModule,
    NzGridModule,
    TranslocoModule,
    TotButtonComponent,
    TotTableComponent,
    TotCellDirective
  ],
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  private notification = inject(AppNotificationService);
  private modal = inject(NzModalService);
  private translate = inject(TranslocoService);
  private modalData = inject(NZ_MODAL_DATA, { optional: true });

  @Input() inputQueueName?: string;
  
  queueName: string = '';
  messages: any[] = [];
  loading = false;
  
  pageIndex = 1;
  pageSize = 10;
  total = 0;

  msgColumns: TotTableColumn[] = [];

  ngOnInit(): void {
    this.msgColumns = [
      { title: 'Thời gian', key: 'time', width: '180px', left: '0px' },
      { title: 'Nội dung tin nhắn', key: 'content' },
      { title: 'Trạng thái', key: 'status', width: '120px' },
      { title: 'Hành động', key: 'action', width: '200px', right: '0px' }
    ];
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
        this.notification.error(this.translate.translate('Lỗi'), this.translate.translate('Không thể tải danh sách tin nhắn'));
      }
    });
  }

  onQueryParamsChange(params: any): void {
    const { pageIndex, pageSize } = params;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.loadMessages();
  }

  formatJson(json: any): string {
    return JSON.stringify(json, null, 2);
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.notification.success(this.translate.translate('Thành công'), this.translate.translate('Đã sao chép vào bộ nhớ tạm'));
    });
  }

  resend(item: any): void {
    this.modal.confirm({
      nzTitle: this.translate.translate('Xác nhận gửi lại'),
      nzContent: this.translate.translate('Bạn có chắc chắn muốn gửi lại tin nhắn này vào hàng đợi gốc?'),
      nzOnOk: () => {
        this.dashboardService.retryCommand(this.queueName, item.raw).subscribe(() => {
          this.notification.success(this.translate.translate('Thành công'), this.translate.translate('Tin nhắn đã được gửi lại'));
          this.loadMessages();
        });
      }
    });
  }

  delete(item: any): void {
    this.modal.confirm({
      nzTitle: this.translate.translate('Xác nhận xóa'),
      nzContent: this.translate.translate('Bạn có chắc chắn muốn xóa tin nhắn này khỏi hàng đợi?'),
      nzOnOk: () => {
        this.dashboardService.removeFromDeadLetter(this.queueName, item.raw).subscribe(() => {
          this.notification.success(this.translate.translate('Thành công'), this.translate.translate('Đã xóa tin nhắn'));
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

  onRowExpand(event: { item: any; expanded: boolean }): void {
    if (event.expanded && event.item.parsed?._trackingId && (!event.item.history || event.item.history.length === 0)) {
      this.dashboardService.getTracking(event.item.parsed._trackingId).subscribe({
        next: (history) => {
          event.item.history = history;
        },
        error: () => {
          this.notification.error(
            this.translate.translate('Lỗi'),
            this.translate.translate('Không thể tải lịch sử chi tiết cho ID này')
          );
        }
      });
    }
  }

  toggleExpand(item: any): void {
    item.expand = !item.expand;
    this.onRowExpand({ item, expanded: item.expand });
  }

  shortenNamespace(name: string): string {
    if (!name) return '-';
    const parts = name.split('.');
    return parts[parts.length - 1];
  }
}
