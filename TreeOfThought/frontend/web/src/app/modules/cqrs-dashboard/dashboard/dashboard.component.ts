import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DashboardService, QueueInfo, DashboardStats, TrackingSummary, WorkerDetail } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NzPageHeaderModule,
    NzButtonModule,
    NzCardModule,
    NzStatisticModule,
    NzTableModule,
    NzTagModule,
    NzDividerModule,
    NzGridModule,
    NzIconModule,
    NzTabsModule,
    NzListModule,
    NzInputModule,
    NzProgressModule,
    TranslateModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  private notification = inject(NzNotificationService);
  private translate = inject(TranslateService);

  stats: DashboardStats = { stats: {}, workerStatus: [] };
  queues: QueueInfo[] = [];
  recentTracking: TrackingSummary[] = [];
  workerList: WorkerDetail[] = [];
  errorStats: { name: string, count: number }[] = [];
  loading = false;

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.loading = true;
    this.dashboardService.getStats().subscribe(res => {
      this.stats = res;
      this.updateComputedStats();
      this.loading = false;
    });
    this.dashboardService.getQueues().subscribe(res => {
      this.queues = res;
    });
    this.dashboardService.getRecentTracking().subscribe(res => {
      this.recentTracking = res;
    });
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
      const key = currentStatus === 'Running' ? 'Worker {id} đã dừng' : 'Worker {id} đã bắt đầu';
      this.notification.success(
        this.translate.instant('Thành công'), 
        this.translate.instant(key, { id: workerId })
      );
      this.refresh();
    });
  }

  getStatValue(key: string): number {
    return this.stats.stats[key] || 0;
  }

  calculateLoad(length: number): number {
    const max = 100;
    return Math.min((length / max) * 100, 100);
  }
}
