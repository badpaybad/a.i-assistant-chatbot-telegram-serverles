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
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { FormsModule } from '@angular/forms';
import { interval, Subject, takeUntil } from 'rxjs';
import { AppNotificationService, HttpClientService } from '@tot/core';
import { DashboardService, QueueInfo, DashboardStats, TrackingSummary, WorkerDetail, LastActivity } from '../services/dashboard.service';
import { TotButtonComponent, TotTableComponent, TotTableColumn, TotCellDirective } from '@tot/shared';
import { MessageListComponent } from '../message-list/message-list.component';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { ViewChild, TemplateRef } from '@angular/core';
import { TopicDetailComponent } from '../topic-detail/topic-detail.component';
 
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
    NzSpaceModule,
    NzSelectModule,
    NzDatePickerModule,
    NzTooltipModule,
    NzRadioModule,
    NzTimelineModule,
    FormsModule,
    TranslocoModule,
    TotButtonComponent,
    TotTableComponent,
    TotCellDirective
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  private notification = inject(AppNotificationService);
  private translate = inject(TranslocoService);
  private modal = inject(NzModalService);

  stats: DashboardStats = { stats: {}, workerStatus: [] };
  queues: QueueInfo[] = [];
  allQueues: QueueInfo[] = [];
  allTopics: QueueInfo[] = [];
  recentTracking: TrackingSummary[] = [];
  totalTracking = 0;
  workerList: WorkerDetail[] = [];
  errorStats: { name: string, count: number }[] = [];
  lastActivityList: LastActivity[] = [];
  loading = false;

  activeTab: 'queues' | 'topics' | 'tracking' | 'workers' | 'activity' = 'queues';

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

  queuePageIndex = 1;
  queuePageSize = 10;

  topicPageIndex = 1;
  topicPageSize = 10;

  workerPageIndex = 1;
  workerPageSize = 10;

  activityPageIndex = 1;
  activityPageSize = 10;
  
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

  trackingColumns: TotTableColumn[] = [];
  queueColumns: TotTableColumn[] = [];
  topicColumns: TotTableColumn[] = [];
  workerColumns: TotTableColumn[] = [];
  activityColumns: TotTableColumn[] = [];

  private destroy$ = new Subject<void>();
  private refreshSubscription?: any;

  ngOnInit(): void {
    this.initColumns();
    this.refresh();
  }

  private initColumns(): void {
    this.trackingColumns = [
      { title: 'Tracking ID', key: 'id', width: '280px' },
      { title: 'Trạng thái', key: 'status', width: '120px', align: 'center' },
      { title: 'Bước', key: 'step', width: '120px', align: 'center' },
      { title: 'Nguồn phát (Source)', key: 'sourceComponent', width: '180px' },
      { title: 'Kênh nhận (Queue/Topic)', key: 'queueOrTopic', width: '180px' },
      { title: 'Handler', key: 'handler', width: '180px' },
      { title: 'Thời gian', key: 'time', width: '160px' },
      { title: 'Hành động', key: 'action', width: '120px', right: true }
    ];

    this.queueColumns = [
      { title: 'Tên hàng đợi (Queue)', key: 'name', width: '220px', left: true },
      { title: 'Đang xử lý', key: 'activeCount', width: '100px', align: 'center' },
      { title: 'Gửi TC (Send OK)', key: 'sendSuccessCount', width: '120px', align: 'center' },
      { title: 'Gửi lỗi (Send Err)', key: 'sendErrorCount', width: '120px', align: 'center' },
      { title: 'Xử lý TC (Done OK)', key: 'doneSuccessCount', width: '120px', align: 'center' },
      { title: 'Xử lý lỗi (Done Err)', key: 'doneErrorCount', width: '120px', align: 'center' },
      { title: 'Workers', key: 'workers', width: '150px' },
      { title: 'Handlers', key: 'handlers', width: '200px' },
      { title: 'Hành động', key: 'action', width: '150px', right: true }
    ];

    this.topicColumns = [
      { title: 'Tên chủ đề (Topic)', key: 'name', width: '220px', left: true },
      { title: 'Đang xử lý', key: 'activeCount', width: '100px', align: 'center' },
      { title: 'Gửi TC (Send OK)', key: 'sendSuccessCount', width: '120px', align: 'center' },
      { title: 'Gửi lỗi (Send Err)', key: 'sendErrorCount', width: '120px', align: 'center' },
      { title: 'Xử lý TC (Done OK)', key: 'doneSuccessCount', width: '120px', align: 'center' },
      { title: 'Xử lý lỗi (Done Err)', key: 'doneErrorCount', width: '120px', align: 'center' },
      { title: 'Workers', key: 'workers', width: '150px' },
      { title: 'Handlers', key: 'handlers', width: '200px' },
      { title: 'Hành động', key: 'action', width: '150px', right: true }
    ];

    this.workerColumns = [
      { title: 'Tên Worker', key: 'id', width: '200px', left: true },
      { title: 'Trạng thái', key: 'status', width: '120px', align: 'center' },
      { title: 'Loại', key: 'type', width: '100px', align: 'center' },
      { title: 'Chi tiết đích', key: 'queueOrTopicName', width: '380px' },
      { title: 'Hành động', key: 'action', width: '150px', right: true }
    ];

    this.activityColumns = [
      { title: 'Loại', key: 'type', width: '120px' },
      { title: 'Tên queue / topic', key: 'mainName' },
      { title: 'Subscriber', key: 'subscriberName' },
      { title: 'Hoạt động cuối', key: 'lastActive', width: '250px' }
    ];
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
      this.allQueues = res.filter(q => q.type === 'Queue');
      this.allTopics = res.filter(q => q.type === 'Topic');
      if (!isAuto) this.loading = false;
    });

    this.dashboardService.getLastActivity().subscribe(res => {
      this.lastActivityList = res;
    });

    this.loadTracking();
  }

  loadTracking(): void {
    const params: any = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      ...this.filters
    };
    if (params.fromDate) params.fromDate = params.fromDate.toISOString();
    if (params.toDate) params.toDate = params.toDate.toISOString();

    console.log('[DEBUG Frontend loadTracking] Request Params:', params);

    this.dashboardService.getRecentTracking(params).subscribe(res => {
      console.log('[DEBUG Frontend loadTracking] Response Received:', res);
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

  onQueryParamsChange(params: any): void {
    const { pageIndex, pageSize } = params;
    console.log('[DEBUG Frontend onQueryParamsChange] Fired with params:', params);
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.loadTracking();
  }

  get runningWorkersCount(): number {
    return this.workerList.filter(w => w.status === 'Running').length;
  }

  get stoppedWorkersCount(): number {
    return this.workerList.filter(w => w.status !== 'Running').length;
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
      const key = currentStatus === 'Running' ? 'NOTIFICATIONS.WORKER_STOPPED' : 'NOTIFICATIONS.WORKER_STARTED';
      this.notification.success(
        this.translate.translate('Thành công'), 
        this.translate.translate(key, { id: workerId })
      );
      this.refresh();
    });
  }

  viewDetails(queue: QueueInfo): void {
    if (queue.type === 'Topic') {
      this.modal.create({
        nzTitle: `${this.translate.translate('Chi tiết Topic')}: ${queue.name}`,
        nzContent: TopicDetailComponent,
        nzData: { topic: queue },
        nzWidth: '80%',
        nzFooter: null
      });
    } else {
      this.modal.create({
        nzTitle: `${this.translate.translate('Chi tiết Hàng đợi')}: ${queue.name}`,
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
        nzTitle: `${this.translate.translate('Đang xử lý Topic')}: ${queue.name}`,
        nzContent: TopicDetailComponent,
        nzData: { topic: queue, showInProgress: true },
        nzWidth: '80%',
        nzFooter: null
      });
    } else {
      this.modal.create({
        nzTitle: `${this.translate.translate('Đang xử lý Hàng đợi')}: ${queue.name}`,
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
      this.notification.success(this.translate.translate('Thành công'), this.translate.translate('Đã sao chép vào bộ nhớ tạm'));
    });
  }

  retryTracking(item: TrackingSummary): void {
    this.modal.confirm({
      nzTitle: this.translate.translate('Xác nhận gửi lại'),
      nzContent: this.translate.translate('Bạn có chắc chắn muốn gửi lại tin nhắn này?'),
      nzOnOk: () => {
        this.dashboardService.resendTracking(item.id).subscribe({
          next: () => {
            this.notification.success(this.translate.translate('Thành công'), this.translate.translate('Tin nhắn đã được gửi lại'));
            this.refresh();
          },
          error: (err) => {
            this.notification.error(this.translate.translate('Thất bại'), err.error?.message || 'Lỗi khi gửi lại tin nhắn');
          }
        });
      }
    });
  }

  deleteTracking(item: TrackingSummary): void {
    this.modal.confirm({
      nzTitle: this.translate.translate('Xác nhận xóa'),
      nzContent: this.translate.translate('Bạn có chắc chắn muốn xóa message này? (Dữ liệu log tracking sẽ bị xóa)'),
      nzOnOk: () => {
        this.dashboardService.deleteTracking(item.id).subscribe(() => {
          this.notification.success(this.translate.translate('Thành công'), this.translate.translate('Đã xóa log message'));
          this.loadTracking();
        });
      }
    });
  }

  onRowExpand(event: { item: any; expanded: boolean }): void {
    if (event.expanded && (!event.item.history || event.item.history.length === 0)) {
      this.dashboardService.getTracking(event.item.id).subscribe({
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

  get pagedQueues(): QueueInfo[] {
    const start = (this.queuePageIndex - 1) * this.queuePageSize;
    const end = start + this.queuePageSize;
    return this.allQueues.slice(start, end);
  }

  get pagedTopics(): QueueInfo[] {
    const start = (this.topicPageIndex - 1) * this.topicPageSize;
    const end = start + this.topicPageSize;
    return this.allTopics.slice(start, end);
  }

  get pagedWorkers(): WorkerDetail[] {
    const start = (this.workerPageIndex - 1) * this.workerPageSize;
    const end = start + this.workerPageSize;
    return this.workerList.slice(start, end);
  }

  get pagedActivities(): LastActivity[] {
    const start = (this.activityPageIndex - 1) * this.activityPageSize;
    const end = start + this.activityPageSize;
    return this.lastActivityList.slice(start, end);
  }

  onQueuePageChange(index: number): void {
    this.queuePageIndex = index;
  }
  onQueuePageSizeChange(size: number): void {
    this.queuePageSize = size;
    this.queuePageIndex = 1;
  }

  onTopicPageChange(index: number): void {
    this.topicPageIndex = index;
  }
  onTopicPageSizeChange(size: number): void {
    this.topicPageSize = size;
    this.topicPageIndex = 1;
  }

  onWorkerPageChange(index: number): void {
    this.workerPageIndex = index;
  }
  onWorkerPageSizeChange(size: number): void {
    this.workerPageSize = size;
    this.workerPageIndex = 1;
  }

  onActivityPageChange(index: number): void {
    this.activityPageIndex = index;
  }
  onActivityPageSizeChange(size: number): void {
    this.activityPageSize = size;
    this.activityPageIndex = 1;
  }

  calculateLoad(length: number): number {
    if (length <= 0) return 0;
    const max = 100; // Threshold for 100% load
    const percent = (length / max) * 100;
    return Math.min(percent, 100);
  }
}
