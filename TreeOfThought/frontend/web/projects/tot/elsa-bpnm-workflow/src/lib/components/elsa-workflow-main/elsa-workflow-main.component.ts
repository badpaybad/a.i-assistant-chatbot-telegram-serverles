import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BpnmWorkflowDesignerComponent } from '../bpnm-workflow-designer/bpnm-workflow-designer.component';
import { BpnmWorkflowDashboardComponent } from '../bpnm-workflow-dashboard/bpnm-workflow-dashboard.component';
import { BpnmUserTasksComponent } from '../bpnm-user-tasks/bpnm-user-tasks.component';
import { BpnmWorkflowAdminComponent } from '../bpnm-workflow-admin/bpnm-workflow-admin.component';
import { ElsaStudioWrapperComponent } from '../elsa-studio-wrapper/elsa-studio-wrapper.component';

export type WorkflowTab = 'designer' | 'studio' | 'dashboard' | 'tasks' | 'admin';

@Component({
  selector: 'tot-elsa-workflow-main',
  standalone: true,
  imports: [
    CommonModule,
    BpnmWorkflowDesignerComponent,
    BpnmWorkflowDashboardComponent,
    BpnmUserTasksComponent,
    BpnmWorkflowAdminComponent,
    ElsaStudioWrapperComponent
  ],
  template: `
    <div class="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans">
      <!-- Main Navigation Header -->
      <header class="bg-slate-900/95 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md px-6 py-3 flex items-center justify-between shadow-xl">
        <!-- Logo & Title -->
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/20">
            ⚡
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-base font-bold text-white tracking-wide">Elsa BPMN Workflow Suite</h1>
              <span class="px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-[10px] font-semibold">.NET 10 Engine</span>
            </div>
            <p class="text-[11px] text-slate-400">Hệ thống Thiết kế, Phê duyệt & Quản trị Quy trình Phân tán (Redis, MongoDB, Kafka, Postgres, RabbitMQ, HTTP, CQRS, Telegram)</p>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <nav class="flex items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800 shadow-inner">
          <button 
            (click)="selectTab('designer')"
            type="button"
            class="px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 outline-none focus:ring-2 focus:ring-blue-500/40"
            [ngClass]="activeTab === 'designer' 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105 font-bold' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a2 2 0 01-2 2H3a2 2 0 01-2-2V4a2 2 0 012-2h8zM15 13a2 2 0 114 0v1a2 2 0 01-2 2H7a2 2 0 01-2-2v-1a2 2 0 012-2h8z"/></svg>
            Trình Thiết Kế (Designer)
          </button>

          <button 
            (click)="selectTab('studio')"
            type="button"
            class="px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 outline-none focus:ring-2 focus:ring-cyan-500/40"
            [ngClass]="activeTab === 'studio' 
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 scale-105 font-bold' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
            Official Elsa Studio
          </button>

          <button 
            (click)="selectTab('dashboard')"
            type="button"
            class="px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 outline-none focus:ring-2 focus:ring-indigo-500/40"
            [ngClass]="activeTab === 'dashboard' 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105 font-bold' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
            Dashboard Thống Kê
          </button>

          <button 
            (click)="selectTab('tasks')"
            type="button"
            class="px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 outline-none focus:ring-2 focus:ring-emerald-500/40"
            [ngClass]="activeTab === 'tasks' 
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-105 font-bold' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Công Việc & Phê Duyệt
          </button>

          <button 
            (click)="selectTab('admin')"
            type="button"
            class="px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 outline-none focus:ring-2 focus:ring-purple-500/40"
            [ngClass]="activeTab === 'admin' 
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 scale-105 font-bold' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/></svg>
            Quản Trị Admin
          </button>
        </nav>
      </header>

      <!-- Main Dynamic Content Container -->
      <main class="flex-1 w-full relative">
        <ng-container [ngSwitch]="activeTab">
          <tot-bpnm-workflow-designer *ngSwitchCase="'designer'"></tot-bpnm-workflow-designer>
          <tot-elsa-studio-wrapper *ngSwitchCase="'studio'"></tot-elsa-studio-wrapper>
          <tot-bpnm-workflow-dashboard *ngSwitchCase="'dashboard'"></tot-bpnm-workflow-dashboard>
          <tot-bpnm-user-tasks *ngSwitchCase="'tasks'"></tot-bpnm-user-tasks>
          <tot-bpnm-workflow-admin *ngSwitchCase="'admin'"></tot-bpnm-workflow-admin>
        </ng-container>
      </main>
    </div>
  `
})
export class ElsaWorkflowMainComponent {
  activeTab: WorkflowTab = 'designer';

  selectTab(tab: WorkflowTab): void {
    this.activeTab = tab;
  }
}
