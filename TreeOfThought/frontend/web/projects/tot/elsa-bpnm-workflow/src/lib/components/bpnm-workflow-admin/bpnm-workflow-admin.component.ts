import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElsaWorkflowService, WorkflowDefinition, WorkflowInstance } from '../../services/elsa-workflow.service';

@Component({
  selector: 'tot-bpnm-workflow-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 space-y-6 bg-slate-900 text-white min-h-screen">
      <!-- Title Bar -->
      <div class="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
            ⚙️ Quản Trị Hệ Thống Workflow (Elsa Admin UI)
          </h2>
          <p class="text-sm text-slate-400 mt-1">
            Quản lý các bản định nghĩa quy trình (Definitions), quản lý phiên bản (Versioning), kích hoạt quy trình và kiểm tra Execution Logs.
          </p>
        </div>
        <button 
          (click)="loadAdminData()"
          class="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-lg shadow transition flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          Nạp lại dữ liệu
        </button>
      </div>

      <!-- Definitions Table -->
      <div class="bg-slate-800/80 border border-slate-700 rounded-xl p-6 shadow-xl">
        <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          Danh Sách Workflow Definitions
        </h3>

        <div class="overflow-x-auto" *ngIf="definitions.length; else noDefinitions">
          <table class="w-full text-left text-sm text-slate-300">
            <thead class="bg-slate-900/80 text-xs uppercase text-slate-400 border-b border-slate-700">
              <tr>
                <th class="px-4 py-3">ID / Definition</th>
                <th class="px-4 py-3">Tên Quy Trình</th>
                <th class="px-4 py-3">Phiên Bản (Version)</th>
                <th class="px-4 py-3">Số Lượng Nodes</th>
                <th class="px-4 py-3">Trạng Thái Kích Hoạt</th>
                <th class="px-4 py-3 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800">
              <tr *ngFor="let def of definitions" class="hover:bg-slate-700/40 transition">
                <td class="px-4 py-3 font-mono text-xs text-purple-300">{{ def.definitionId || def.id }}</td>
                <td class="px-4 py-3 font-semibold text-white">
                  {{ def.name }}
                  <div class="text-xs font-normal text-slate-400 mt-0.5" *ngIf="def.description">{{ def.description }}</div>
                </td>
                <td class="px-4 py-3 text-xs">
                  <span class="px-2 py-0.5 bg-slate-700 text-slate-300 rounded font-mono">v{{ def.version }}</span>
                </td>
                <td class="px-4 py-3 text-xs text-slate-300">{{ def.nodes?.length || 0 }} nodes</td>
                <td class="px-4 py-3">
                  <span 
                    class="px-2.5 py-0.5 rounded-full text-xs font-bold"
                    [ngClass]="def.isPublished ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-700 text-slate-400'"
                  >
                    {{ def.isPublished ? 'Published' : 'Draft' }}
                  </span>
                </td>
                <td class="px-4 py-3 text-right">
                  <button 
                    (click)="onDeleteDefinition(def.id)"
                    class="px-3 py-1 bg-rose-600/80 hover:bg-rose-500 text-white text-xs font-medium rounded transition"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <ng-template #noDefinitions>
          <div class="text-center py-8 text-slate-400 text-sm">Chưa có Workflow Definition nào.</div>
        </ng-template>
      </div>

      <!-- Execution Instances Audit Log -->
      <div class="bg-slate-800/80 border border-slate-700 rounded-xl p-6 shadow-xl">
        <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          Quản Lý Phiên Chạy & Execution Logs Audit Trail
        </h3>

        <div class="overflow-x-auto" *ngIf="instances.length; else noInstances">
          <table class="w-full text-left text-sm text-slate-300">
            <thead class="bg-slate-900/80 text-xs uppercase text-slate-400 border-b border-slate-700">
              <tr>
                <th class="px-4 py-3">Instance ID</th>
                <th class="px-4 py-3">Tên Quy Trình</th>
                <th class="px-4 py-3">Bắt Đầu</th>
                <th class="px-4 py-3">Hoàn Tất</th>
                <th class="px-4 py-3">Trạng Thái</th>
                <th class="px-4 py-3 text-right">Chi Tiết Log</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800">
              <ng-container *ngFor="let inst of instances">
                <tr class="hover:bg-slate-700/40 transition">
                  <td class="px-4 py-3 font-mono text-xs text-blue-400">{{ inst.id }}</td>
                  <td class="px-4 py-3 font-semibold text-white">{{ inst.workflowName }}</td>
                  <td class="px-4 py-3 text-xs text-slate-400">{{ inst.startedAt | date:'medium' }}</td>
                  <td class="px-4 py-3 text-xs text-slate-400">{{ (inst.finishedAt | date:'medium') || '-' }}</td>
                  <td class="px-4 py-3">
                    <span 
                      class="px-2.5 py-0.5 rounded-full text-xs font-bold"
                      [ngClass]="{
                        'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30': inst.status === 'Completed',
                        'bg-blue-500/20 text-blue-300 border border-blue-500/30': inst.status === 'Running',
                        'bg-rose-500/20 text-rose-300 border border-rose-500/30': inst.status === 'Failed'
                      }"
                    >
                      {{ inst.status }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-right">
                    <button 
                      (click)="toggleLog(inst.id)"
                      class="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-medium rounded transition"
                    >
                      {{ selectedInstanceId === inst.id ? 'Ẩn Logs' : 'Xem Logs' }}
                    </button>
                  </td>
                </tr>

                <!-- Expanded Logs Row -->
                <tr *ngIf="selectedInstanceId === inst.id" class="bg-slate-950/70 border-b border-slate-800">
                  <td colspan="6" class="p-4">
                    <div class="space-y-2">
                      <div class="font-bold text-xs text-purple-300 uppercase tracking-wider">Chi tiết Execution Logs (Audit Trail):</div>
                      <div class="space-y-1 font-mono text-xs">
                        <div *ngFor="let log of inst.executionLogs" class="p-2 bg-slate-900 rounded border border-slate-800 flex justify-between">
                          <span class="text-slate-400">[{{ log.timestamp | date:'HH:mm:ss' }}]</span>
                          <span class="text-blue-300 font-semibold">{{ log.nodeName }} ({{ log.activityType }}):</span>
                          <span class="text-slate-200 flex-1 ml-3">{{ log.message }}</span>
                          <span class="text-emerald-400 font-bold ml-2">{{ log.status }}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </ng-container>
            </tbody>
          </table>
        </div>

        <ng-template #noInstances>
          <div class="text-center py-8 text-slate-400 text-sm">Chưa có lịch sử phiên chạy quy trình.</div>
        </ng-template>
      </div>
    </div>
  `
})
export class BpnmWorkflowAdminComponent implements OnInit {
  private workflowService = inject(ElsaWorkflowService);
  definitions: WorkflowDefinition[] = [];
  instances: WorkflowInstance[] = [];
  selectedInstanceId: string | null = null;

  ngOnInit(): void {
    this.loadAdminData();
  }

  loadAdminData(): void {
    this.workflowService.getDefinitions().subscribe({
      next: (res) => (this.definitions = res),
      error: (err) => console.error('Failed to load definitions:', err)
    });

    this.workflowService.getInstances().subscribe({
      next: (res) => (this.instances = res),
      error: (err) => console.error('Failed to load instances:', err)
    });
  }

  onDeleteDefinition(id: string): void {
    if (confirm('Bạn có chắc chắn muốn xóa bản định nghĩa workflow này không?')) {
      this.workflowService.deleteDefinition(id).subscribe({
        next: () => this.loadAdminData(),
        error: (err) => console.error('Failed to delete definition:', err)
      });
    }
  }

  toggleLog(instanceId: string): void {
    this.selectedInstanceId = this.selectedInstanceId === instanceId ? null : instanceId;
  }
}
