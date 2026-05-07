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
import { DashboardService, TrackingStep } from '../services/dashboard.service';

@Component({
  selector: 'app-tracing',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NzPageHeaderModule,
    NzStepsModule,
    NzCardModule,
    NzDescriptionsModule,
    NzTimelineModule,
    NzTagModule,
    NzIconModule,
    NzDividerModule
  ],
  templateUrl: './tracing.component.html',
  styleUrls: ['./tracing.component.css']
})
export class TracingComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private dashboardService = inject(DashboardService);

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
    this.dashboardService.getTracking(this.trackingId).subscribe(res => {
      this.history = res;
      this.loading = false;
    });
  }

  getStepStatus(step: string): string {
    const s = step.toLowerCase();
    if (s.includes('fail') || s.includes('error')) return 'error';
    if (s.includes('success') || s.includes('finish') || s.includes('end')) return 'finish';
    if (s.includes('start') || s.includes('publish') || s.includes('enqueue')) return 'process';
    return 'wait';
  }
}
