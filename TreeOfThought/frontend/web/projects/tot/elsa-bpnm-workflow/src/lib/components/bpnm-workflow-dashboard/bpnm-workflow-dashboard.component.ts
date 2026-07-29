import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElsaWorkflowService, DashboardStats } from '../../services/elsa-workflow.service';

@Component({
  selector: 'tot-bpnm-workflow-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 space-y-6 bg-slate-900 text-white min-h-screen">
      <!-- Top Title -->
      <div class="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
            📊 Workflow Dashboard & System Telemetry
          </h2>
          <p class="text-sm text-slate-400 mt-1">
            Tổng quan hiệu năng thực thi quy trình Elsa BPMN, thống kê phiên chạy và công việc chờ phê duyệt.
          </p>
        </div>
        <button 
          (click)="loadStats()"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg shadow flex items-center gap-2 transition"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Làm mới số liệu
        </button>
      </div>

      <!-- Key Stat Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5" *ngIf="stats">
        <div class="bg-slate-800/80 border border-slate-700/60 rounded-xl p-5 shadow-lg">
          <div class="flex items-center justify-between">
            <span class="text-xs uppercase font-semibold text-slate-400 tracking-wider">Tổng Quy trình</span>
            <div class="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
            </div>
          </div>
          <div class="mt-3 text-3xl font-extrabold text-white">{{ stats.totalDefinitions }}</div>
          <p class="text-xs text-slate-400 mt-1">Definitions khả dụng trong hệ thống</p>
        </div>

        <div class="bg-slate-800/80 border border-slate-700/60 rounded-xl p-5 shadow-lg">
          <div class="flex items-center justify-between">
            <span class="text-xs uppercase font-semibold text-slate-400 tracking-wider">Phiên Đang Chạy</span>
            <div class="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
          </div>
          <div class="mt-3 text-3xl font-extrabold text-emerald-400">{{ stats.runningInstances }}</div>
          <p class="text-xs text-slate-400 mt-1">Tiến trình Active đang thực thi</p>
        </div>

        <div class="bg-slate-800/80 border border-slate-700/60 rounded-xl p-5 shadow-lg">
          <div class="flex items-center justify-between">
            <span class="text-xs uppercase font-semibold text-slate-400 tracking-wider">Chờ Phê Duyệt</span>
            <div class="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
          </div>
          <div class="mt-3 text-3xl font-extrabold text-amber-400">{{ stats.pendingUserTasks }}</div>
          <p class="text-xs text-slate-400 mt-1">User Tasks cần phê duyệt</p>
        </div>

        <div class="bg-slate-800/80 border border-slate-700/60 rounded-xl p-5 shadow-lg">
          <div class="flex items-center justify-between">
            <span class="text-xs uppercase font-semibold text-slate-400 tracking-wider">Tỉ Lệ Thành Công</span>
            <div class="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
          </div>
          <div class="mt-3 text-3xl font-extrabold text-indigo-300">{{ stats.successRate }}%</div>
          <p class="text-xs text-slate-400 mt-1">Hoàn thành: {{ stats.completedInstances }} / Lỗi: {{ stats.failedInstances }}</p>
        </div>
      </div>

      <!-- Recent Executions Section -->
      <div class="bg-slate-800/70 border border-slate-700/60 rounded-xl p-6 shadow-xl">
        <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          Lịch Sử Phiên Chạy Gần Đây (Recent Executions Audit)
        </h3>

        <div class="overflow-x-auto" *ngIf="stats?.recentExecutions?.length; else noExecutions">
          <table class="w-full text-left text-sm text-slate-300">
            <thead class="bg-slate-900/80 text-xs uppercase text-slate-400 border-b border-slate-700">
              <tr>
                <th class="px-4 py-3">Instance ID</th>
                <th class="px-4 py-3">Tên Quy Trình</th>
                <th class="px-4 py-3">Thời Gian Bắt Đầu</th>
                <th class="px-4 py-3">Trạng Thái</th>
                <th class="px-4 py-3">Số Node Thực Thi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800">
              <tr *ngFor="let item of stats?.recentExecutions" class="hover:bg-slate-700/40 transition">
                <td class="px-4 py-3 font-mono text-xs text-blue-400">{{ item.id }}</td>
                <td class="px-4 py-3 font-medium text-white">{{ item.workflowName }}</td>
                <td class="px-4 py-3 text-slate-400 text-xs">{{ item.startedAt | date:'medium' }}</td>
                <td class="px-4 py-3">
                  <span 
                    class="px-2.5 py-1 rounded-full text-xs font-semibold"
                    [ngClass]="{
                      'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30': item.status === 'Completed',
                      'bg-blue-500/20 text-blue-400 border border-blue-500/30': item.status === 'Running',
                      'bg-rose-500/20 text-rose-400 border border-rose-500/30': item.status === 'Failed'
                    }"
                  >
                    {{ item.status }}
                  </span>
                </td>
                <td class="px-4 py-3 text-xs text-slate-300">
                  {{ item.executionLogs?.length || 0 }} steps
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <ng-template #noExecutions>
          <div class="text-center py-8 text-slate-400 text-sm">
            Chưa có lịch sử phiên chạy quy trình nào gần đây. Hãy khởi tạo quy trình tại mục Trình Thiết Kế.
          </div>
        </ng-template>
      </div>
    </div>
  `
})
export class BpnmWorkflowDashboardComponent implements OnInit {
  private workflowService = inject(ElsaWorkflowService);
  stats: DashboardStats | null = null;

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.workflowService.getDashboardStats().subscribe({
      next: (res) => (this.stats = res),
      error: (err) => console.error('Failed to load dashboard stats:', err)
    });
  }
}
