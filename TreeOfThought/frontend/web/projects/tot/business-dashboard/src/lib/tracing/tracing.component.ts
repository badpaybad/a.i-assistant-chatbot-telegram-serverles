import { TotButtonComponent } from '@tot/shared';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { AppNotificationService } from '@tot/core';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { DashboardService, TrackingStep } from '../services/dashboard.service';

@Component({
  selector: 'app-tracing',
  standalone: true,
  imports: [
    TotButtonComponent,
    CommonModule,
    RouterLink,
    NzPageHeaderModule,
    NzStepsModule,
    NzCardModule,
    NzDescriptionsModule,
    NzTimelineModule,
    NzTagModule,
    NzIconModule,
    NzDividerModule,
    NzEmptyModule,
    TranslocoModule
  ],
  templateUrl: './tracing.component.html',
  styleUrls: ['./tracing.component.css']
})
export class TracingComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private dashboardService = inject(DashboardService);
  private notification = inject(AppNotificationService);
  private translate = inject(TranslocoService);

  trackingId = '';
  history: TrackingStep[] = [];
  loading = false;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.trackingId = params['id'];
      if (this.trackingId) {
        this.fetchTracking();
      }
    });
  }

  fetchTracking(): void {
    this.loading = true;
    this.dashboardService.getTracking(this.trackingId).subscribe({
      next: res => {
        this.history = res;
        this.loading = false;
      },
      error: () => {
        this.notification.error(this.translate.translate('Thất bại'), this.translate.translate('Lỗi khi tải dữ liệu theo dõi'));
        this.loading = false;
      }
    });
  }

  getStepStatus(step: string, status?: string): string {
    if (!step) return 'wait';
    const s = (status || '').toLowerCase();
    if (s === 'error' || s === 'fail') return 'error';
    if (s === 'success' || s === 'finish') return 'finish';
    
    const stepLower = step.toLowerCase();
    if (stepLower === 'send') return 'finish';
    if (stepLower === 'dequeue') return 'process';
    if (stepLower === 'done') return 'finish';
    
    return 'wait';
  }

  getStepIcon(step: string, status?: string): string {
    if (!step) return 'info-circle';
    const s = (status || '').toLowerCase();
    if (s === 'error' || s === 'fail') return 'close-circle';
    
    const stepLower = step.toLowerCase();
    if (stepLower === 'send') return 'export';
    if (stepLower === 'dequeue') return 'import';
    if (stepLower === 'done') return 'check-circle';
    return 'info-circle';
  }
}
