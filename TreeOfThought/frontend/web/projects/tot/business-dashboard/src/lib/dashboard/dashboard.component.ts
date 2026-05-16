import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FormsModule } from '@angular/forms';
import { interval, Subject, takeUntil } from 'rxjs';
import { AppNotificationService } from '@tot/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DashboardService, QueueInfo, DashboardStats, TrackingSummary, WorkerDetail, LastActivity } from '../services/dashboard.service';
import { MessageListComponent } from '../message-list/message-list.component';
import { TopicDetailComponent } from '../topic-detail/topic-detail.component';
import { CqrsTestComponent } from '../cqrs-test/cqrs-test.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NzPageHeaderModule,
    NzButtonModule,
    NzCardModule,
    NzStatisticModule,
    NzTableModule,
    NzTagModule,
    NzDividerModule,
    NzGridModule,
    NzIconModule,
    NzListModule,
    NzInputModule,
    NzProgressModule,
    NzModalModule,
    NzSelectModule,
    NzDatePickerModule,
    NzTooltipModule,
    NzRadioModule,
    FormsModule,
    TranslateModule,
    CqrsTestComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  private notification = inject(AppNotificationService);
  private translate = inject(TranslateService);
  private modal = inject(NzModalService);

  stats: DashboardStats = { stats: {}, workerStatus: [] };
  queues: QueueInfo[] = [];
  recentTracking: TrackingSummary[] = [];
  totalTracking = 0;
  workerList: WorkerDetail[] = [];
  errorStats: { name: string, count: number }[] = [];
  lastActivityList: LastActivity[] = [];
  loading = false;

  activeTab: 'queues' | 'tracking' | 'workers' | 'test' | 'activity' = 'queues';

  refreshInterval = 0;
  refreshIntervals = [
    { label: '0s (Manual)', value: 0 },
    { label: '1s', value: 1000 },
    { label: '5s', value: 5000 },
    { label: '10s', value: 10000 },
    { label: '30s', value: 30000 },
    { label: '1m', value: 60000 },
    { label: '5m', value: 300000 },
    { label: '10m', value: 600000 },
    { label: '30m', value: 1800000 },
    { label: '1h', value: 3600000 }
  ];

  pageIndex = 1;
  pageSize = 10;
  
  filters = {
    trackingId: '',
    content: '',
    status: '',
    fromDate: null as Date | null,
    toDate: null as Date | null,
    queueOrTopic: '',
    handler: '',
    worker: ''
  };

  private destroy$ = new Subject<void>();
  private refreshSubscription?: any;

  ngOnInit(): void {
    this.refresh();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onRefreshIntervalChange(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }

    if (this.refreshInterval > 0) {
      this.refreshSubscription = interval(this.refreshInterval)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.refresh(true));
    }
  }

  refresh(isAuto = false): void {
    if (!isAuto) this.loading = true;
    
    this.dashboardService.getStats().subscribe(res => {
      this.stats = res;
      this.updateComputedStats();
    });

    this.dashboardService.getQueues().subscribe(res => {
      this.queues = res;
      if (!isAuto) this.loading = false;
    });

    this.dashboardService.getLastActivity().subscribe(res => {
      this.lastActivityList = res;
    });

    this.loadTracking();
  }

  loadTracking(): void {
    const params: any = {
      page: this.pageIndex,
      pageSize: this.pageSize,
      ...this.filters
    };
    if (params.fromDate) params.fromDate = params.fromDate.toISOString();
    if (params.toDate) params.toDate = params.toDate.toISOString();

    this.dashboardService.getRecentTracking(params).subscribe(res => {
      this.recentTracking = res.items;
      this.totalTracking = res.total;
    });
  }

  onFilterChange(): void {
    this.pageIndex = 1;
    this.loadTracking();
  }

  resetFilters(): void {
    this.filters = {
      trackingId: '',
      content: '',
      status: '',
      fromDate: null,
      toDate: null,
      queueOrTopic: '',
      handler: '',
      worker: ''
    };
    this.onFilterChange();
  }

  onPageIndexChange(index: number): void {
    this.pageIndex = index;
    this.loadTracking();
  }

  updateComputedStats(): void {
    this.workerList = this.stats.workerStatus;
    this.errorStats = Object.entries(this.stats.stats)
      .filter(([key]) => key.startsWith('error:'))
      .map(([key, value]) => ({ 
        name: key.replace('error:', ''), 
        count: value 
      }))
      .sort((a, b) => b.count - a.count);
  }

  toggleWorker(workerId: string, currentStatus: string): void {
    const action = currentStatus === 'Running' ? this.dashboardService.stopWorker(workerId) : this.dashboardService.startWorker(workerId);
    action.subscribe(() => {
      const key = currentStatus === 'Running' ? 'Worker {{id}} đã dừng' : 'Worker {{id}} đã bắt đầu';
      this.notification.success(
        this.translate.instant('Thành công'), 
        this.translate.instant(key, { id: workerId })
      );
      this.refresh();
    });
  }

  viewDetails(queue: QueueInfo): void {
    if (queue.type === 'Topic') {
      this.modal.create({
        nzTitle: `${this.translate.instant('Chi tiết Topic')}: ${queue.name}`,
        nzContent: TopicDetailComponent,
        nzData: { topic: queue },
        nzWidth: '80%',
        nzFooter: null
      });
    } else {
      this.modal.create({
        nzTitle: `${this.translate.instant('Chi tiết Hàng đợi')}: ${queue.name}`,
        nzContent: MessageListComponent,
        nzData: { inputQueueName: queue.name },
        nzWidth: '80%',
        nzFooter: null
      });
    }
  }

  viewInProgress(queue: QueueInfo): void {
    if (queue.type === 'Topic') {
      this.modal.create({
        nzTitle: `${this.translate.instant('Đang xử lý Topic')}: ${queue.name}`,
        nzContent: TopicDetailComponent,
        nzData: { topic: queue, showInProgress: true },
        nzWidth: '80%',
        nzFooter: null
      });
    } else {
      this.modal.create({
        nzTitle: `${this.translate.instant('Đang xử lý Hàng đợi')}: ${queue.name}`,
        nzContent: MessageListComponent,
        nzData: { inputQueueName: `${queue.name}:processing` },
        nzWidth: '80%',
        nzFooter: null
      });
    }
  }

  formatJson(json: string): string {
    if (!json) return '';
    try {
      const obj = typeof json === 'string' ? JSON.parse(json) : json;
      return JSON.stringify(obj, null, 2);
    } catch {
      return json;
    }
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.notification.success(this.translate.instant('Thành công'), this.translate.instant('Đã sao chép vào bộ nhớ tạm'));
    });
  }

  retryTracking(item: TrackingSummary): void {
    this.modal.confirm({
      nzTitle: this.translate.instant('Xác nhận gửi lại'),
      nzContent: this.translate.instant('Bạn có chắc chắn muốn gửi lại tin nhắn này?'),
      nzOnOk: () => {
        this.dashboardService.resendTracking(item.id).subscribe({
          next: () => {
            this.notification.success(this.translate.instant('Thành công'), this.translate.instant('Tin nhắn đã được gửi lại'));
            this.refresh();
          },
          error: (err) => {
            this.notification.error(this.translate.instant('Thất bại'), err.error?.message || 'Lỗi khi gửi lại tin nhắn');
          }
        });
      }
    });
  }

  deleteTracking(item: TrackingSummary): void {
    this.modal.confirm({
      nzTitle: this.translate.instant('Xác nhận xóa'),
      nzContent: this.translate.instant('Bạn có chắc chắn muốn xóa message này? (Dữ liệu log tracking sẽ bị xóa)'),
      nzOnOk: () => {
        this.dashboardService.deleteTracking(item.id).subscribe(() => {
          this.notification.success(this.translate.instant('Thành công'), this.translate.instant('Đã xóa log message'));
          this.loadTracking();
        });
      }
    });
  }

  calculateLoad(length: number): number {
    if (length <= 0) return 0;
    const max = 100; // Threshold for 100% load
    const percent = (length / max) * 100;
    return Math.min(percent, 100);
  }
}
