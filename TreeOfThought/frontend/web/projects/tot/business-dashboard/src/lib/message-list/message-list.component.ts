import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { AppNotificationService } from '@tot/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { DashboardService } from '../services/dashboard.service';
import { TotButtonComponent, TotTableComponent, TotTableColumn } from '@tot/shared';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzTagModule,
    TranslocoModule,
    TotButtonComponent,
    TotTableComponent
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

  @ViewChild('timeTpl', { static: true }) timeTpl!: TemplateRef<any>;
  @ViewChild('contentTpl', { static: true }) contentTpl!: TemplateRef<any>;
  @ViewChild('statusTpl', { static: true }) statusTpl!: TemplateRef<any>;
  @ViewChild('actionsTpl', { static: true }) actionsTpl!: TemplateRef<any>;

  msgColumns: TotTableColumn[] = [];

  ngOnInit(): void {
    this.msgColumns = [
      { title: 'Thời gian', width: '180px', left: '0px', template: this.timeTpl },
      { title: 'Nội dung tin nhắn', template: this.contentTpl },
      { title: 'Trạng thái', width: '120px', template: this.statusTpl },
      { title: 'Hành động', width: '200px', right: '0px', template: this.actionsTpl }
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
}
