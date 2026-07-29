import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElsaWorkflowService, UserTask } from '../../services/elsa-workflow.service';

@Component({
  selector: 'tot-bpnm-user-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 space-y-6 bg-slate-900 text-white min-h-screen">
      <!-- Title Bar -->
      <div class="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
            ✅ Công Việc & Form Phê Duyệt Tác Vụ (User Tasks & Approval UI)
          </h2>
          <p class="text-sm text-slate-400 mt-1">
            Danh sách tác vụ cần người dùng duyệt (Approve / Reject) trong các quy trình Elsa BPMN Workflow đang chờ.
          </p>
        </div>
        <button 
          (click)="loadUserTasks()"
          class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg shadow transition flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          Làm mới danh sách
        </button>
      </div>

      <!-- Task Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6" *ngIf="tasks.length; else emptyTasks">
        <div 
          *ngFor="let task of tasks"
          class="bg-slate-800/90 border border-slate-700 rounded-xl p-5 shadow-lg flex flex-col justify-between transition hover:border-slate-600"
        >
          <div>
            <!-- Header -->
            <div class="flex items-center justify-between border-b border-slate-700/60 pb-3 mb-3">
              <span class="text-xs font-semibold text-teal-400 uppercase tracking-wide">{{ task.workflowName }}</span>
              <span 
                class="px-2.5 py-0.5 rounded-full text-xs font-bold"
                [ngClass]="{
                  'bg-amber-500/20 text-amber-300 border border-amber-500/30': task.status === 'Pending',
                  'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30': task.status === 'Approved',
                  'bg-rose-500/20 text-rose-300 border border-rose-500/30': task.status === 'Rejected'
                }"
              >
                {{ task.status }}
              </span>
            </div>

            <h3 class="text-base font-bold text-white mb-2">{{ task.taskName }}</h3>
            <p class="text-xs text-slate-300 mb-4 leading-relaxed bg-slate-900/50 p-3 rounded-lg border border-slate-800">
              {{ task.description }}
            </p>

            <!-- Payload Details -->
            <div *ngIf="task.taskPayload" class="mb-4 text-xs space-y-1 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
              <div class="font-semibold text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Dữ Liệu Chi Tiết (Task Payload):</div>
              <div *ngFor="let key of getKeys(task.taskPayload)" class="flex justify-between py-0.5 border-b border-slate-800/40 last:border-none">
                <span class="text-slate-400 font-mono">{{ key }}:</span>
                <span class="text-slate-200 font-medium">{{ task.taskPayload[key] }}</span>
              </div>
            </div>

            <!-- Decision Reason if completed -->
            <div *ngIf="task.status !== 'Pending'" class="mb-4 text-xs p-3 rounded-lg border" [ngClass]="task.status === 'Approved' ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-200' : 'bg-rose-950/30 border-rose-800/40 text-rose-200'">
              <span class="font-semibold">Lý do quyết định:</span> {{ task.decisionReason || 'Không có ghi chú' }}
              <div class="text-[10px] text-slate-400 mt-1" *ngIf="task.completedAt">Xử lý lúc: {{ task.completedAt | date:'medium' }}</div>
            </div>
          </div>

          <!-- Actions Form (for Pending tasks) -->
          <div *ngIf="task.status === 'Pending'" class="mt-4 pt-3 border-t border-slate-700/60 space-y-3">
            <input 
              type="text" 
              [(ngModel)]="taskReasons[task.id]" 
              placeholder="Nhập ghi chú / lý do phê duyệt hoặc từ chối..."
              class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <div class="flex items-center gap-3">
              <button 
                (click)="onApprove(task.id)"
                class="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg shadow transition flex items-center justify-center gap-1.5"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                Phê Duyệt (Approve)
              </button>
              <button 
                (click)="onReject(task.id)"
                class="flex-1 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs rounded-lg shadow transition flex items-center justify-center gap-1.5"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                Từ Chối (Reject)
              </button>
            </div>
          </div>
        </div>
      </div>

      <ng-template #emptyTasks>
        <div class="text-center py-16 bg-slate-800/40 rounded-xl border border-slate-800">
          <svg class="w-12 h-12 text-slate-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <p class="text-slate-400 font-medium text-sm">Hiện tại không có tác vụ công việc nào chờ phê duyệt.</p>
        </div>
      </ng-template>
    </div>
  `
})
export class BpnmUserTasksComponent implements OnInit {
  private workflowService = inject(ElsaWorkflowService);
  tasks: UserTask[] = [];
  taskReasons: Record<string, string> = {};

  ngOnInit(): void {
    this.loadUserTasks();
  }

  loadUserTasks(): void {
    this.workflowService.getUserTasks().subscribe({
      next: (res) => (this.tasks = res),
      error: (err) => console.error('Failed to load user tasks:', err)
    });
  }

  getKeys(obj: Record<string, any>): string[] {
    return obj ? Object.keys(obj) : [];
  }

  onApprove(taskId: string): void {
    const reason = this.taskReasons[taskId] || 'Đã phê duyệt thông qua Form UI';
    this.workflowService.approveUserTask(taskId, reason).subscribe({
      next: () => {
        this.loadUserTasks();
      },
      error: (err) => console.error('Approve failed:', err)
    });
  }

  onReject(taskId: string): void {
    const reason = this.taskReasons[taskId] || 'Đã từ chối thông qua Form UI';
    this.workflowService.rejectUserTask(taskId, reason).subscribe({
      next: () => {
        this.loadUserTasks();
      },
      error: (err) => console.error('Reject failed:', err)
    });
  }
}
