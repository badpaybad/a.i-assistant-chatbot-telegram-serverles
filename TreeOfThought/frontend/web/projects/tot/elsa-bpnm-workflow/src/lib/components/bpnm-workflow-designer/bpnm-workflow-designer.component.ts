import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ElsaWorkflowService,
  WorkflowDefinition,
  WorkflowNode,
  WorkflowConnection,
  ActivityMetadata,
  WorkflowInstance
} from '../../services/elsa-workflow.service';

@Component({
  selector: 'tot-bpnm-workflow-designer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="elsa-container">
      <!-- Top Bar -->
      <div class="top-bar">
        <div class="title-area">
          <div class="badge">BPMN Workflow</div>
          <h2>{{ currentDefinition.name || 'Trình thiết kế quy trình Elsa' }}</h2>
          <span class="version-tag">v{{ currentDefinition.version || 1 }}</span>
        </div>

        <div class="action-buttons">
          <button class="btn btn-secondary" (click)="loadSampleWorkflow()">
            <i class="fa fa-folder-open"></i> Tải quy trình mẫu
          </button>
          <button class="btn btn-primary" (click)="saveWorkflow()" [disabled]="isSaving">
            <i class="fa fa-save"></i> {{ isSaving ? 'Đang lưu...' : 'Lưu quy trình' }}
          </button>
          <button class="btn btn-success" (click)="runWorkflow()" [disabled]="isRunning">
            <i class="fa fa-play"></i> {{ isRunning ? 'Đang thực thi...' : 'Chạy thử (Run)' }}
          </button>
        </div>
      </div>

      <!-- Main Layout -->
      <div class="main-layout">
        <!-- Sidebar Palette: Nodes & Activities -->
        <div class="sidebar-palette">
          <div class="palette-header">
            <h3>Thư viện Activities & Triggers</h3>
            <p>Bấm chọn để thêm Node vào quy trình</p>
          </div>

          <div class="palette-search">
            <input type="text" [(ngModel)]="searchTerm" placeholder="Tìm kiếm Activity, Redis, Kafka..." />
          </div>

          <div class="palette-categories">
            <!-- Triggers -->
            <div class="category-group">
              <div class="category-title">
                <span class="dot trigger-dot"></span> Triggers / Webhooks
              </div>
              <div class="activity-card" *ngFor="let item of filteredTriggers" (click)="addNode(item)">
                <div class="card-icon trigger-icon">⚡</div>
                <div class="card-info">
                  <div class="card-title">{{ item.displayName }}</div>
                  <div class="card-desc">{{ item.description }}</div>
                </div>
              </div>
            </div>

            <!-- Activities -->
            <div class="category-group">
              <div class="category-title">
                <span class="dot activity-dot"></span> Activities & Connectors
              </div>
              <div class="activity-card" *ngFor="let item of filteredActivities" (click)="addNode(item)">
                <div class="card-icon activity-icon">⚙️</div>
                <div class="card-info">
                  <div class="card-title">{{ item.displayName }}</div>
                  <div class="card-desc">{{ item.description }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Canvas Workspace -->
        <div class="canvas-area">
          <div class="canvas-toolbar">
            <span class="canvas-stat">Tổng số Node: <strong>{{ currentDefinition.nodes.length }}</strong></span>
            <span class="canvas-stat">Kết nối: <strong>{{ currentDefinition.connections.length }}</strong></span>
            <button class="btn-text" (click)="clearCanvas()"><i class="fa fa-trash"></i> Xóa Canvas</button>
          </div>

          <div class="canvas-grid" id="designer-canvas">
            <!-- SVG Connections line -->
            <svg class="svg-connections-layer">
              <g *ngFor="let conn of currentDefinition.connections">
                <line
                  [attr.x1]="getNodePosition(conn.sourceNodeId).x + 140"
                  [attr.y1]="getNodePosition(conn.sourceNodeId).y + 40"
                  [attr.x2]="getNodePosition(conn.targetNodeId).x + 10"
                  [attr.y2]="getNodePosition(conn.targetNodeId).y + 40"
                  stroke="#3b82f6"
                  stroke-width="3"
                  stroke-dasharray="6,4"
                  marker-end="url(#arrow)"
                />
              </g>
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6"/>
                </marker>
              </defs>
            </svg>

            <!-- Workflow Nodes -->
            <div
              *ngFor="let node of currentDefinition.nodes; let i = index"
              class="designer-node"
              [ngClass]="{ 'selected': selectedNode?.id === node.id, 'trigger-node': node.category === 'Triggers' }"
              [style.left.px]="node.positionX"
              [style.top.px]="node.positionY"
              (click)="selectNode(node)"
            >
              <div class="node-header">
                <span class="node-type-badge">{{ node.category }}</span>
                <button class="btn-close" (click)="removeNode(node.id); $event.stopPropagation()">×</button>
              </div>
              <div class="node-body">
                <div class="node-title">{{ node.name }}</div>
                <div class="node-sub">{{ node.activityType }}</div>
              </div>
              <div class="node-footer">
                <button class="btn-connect" (click)="startConnect(node); $event.stopPropagation()">
                  {{ connectingSourceId === node.id ? 'Hủy nối' : 'Nối tiếp →' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Panel: Node Property Editor & Execution Result -->
        <div class="right-panel">
          <!-- Tabs -->
          <div class="panel-tabs">
            <button [class.active]="activeTab === 'properties'" (click)="activeTab = 'properties'">Cấu hình Node</button>
            <button [class.active]="activeTab === 'execution'" (click)="activeTab = 'execution'">Kết quả Chạy</button>
          </div>

          <!-- Properties Editor Tab -->
          <div class="panel-content" *ngIf="activeTab === 'properties'">
            <div *ngIf="selectedNode; else noNodeSelected">
              <h3>Chỉnh sửa Node</h3>
              <div class="form-group">
                <label>Tên Node</label>
                <input type="text" [(ngModel)]="selectedNode.name" class="form-control" />
              </div>

              <div class="form-group">
                <label>Loại Activity</label>
                <input type="text" [value]="selectedNode.activityType" class="form-control" disabled />
              </div>

              <h4>Thuộc tính Cấu hình (Properties)</h4>
              <div class="form-group" *ngFor="let propKey of getObjectKeys(selectedNode.properties)">
                <label>{{ propKey }}</label>
                <textarea
                  rows="2"
                  [ngModel]="selectedNode.properties[propKey]"
                  (ngModelChange)="selectedNode.properties[propKey] = $event"
                  class="form-control"
                ></textarea>
              </div>
            </div>

            <ng-template #noNodeSelected>
              <div class="empty-state">
                <p>Bấm chọn một Node trên Canvas để chỉnh sửa thông số cấu hình.</p>
              </div>
            </ng-template>
          </div>

          <!-- Execution Logs Tab -->
          <div class="panel-content" *ngIf="activeTab === 'execution'">
            <div *ngIf="lastExecution; else noExecution">
              <div class="execution-header">
                <span class="status-badge" [ngClass]="lastExecution.status.toLowerCase()">
                  {{ lastExecution.status }}
                </span>
                <div>ID: {{ lastExecution.id }}</div>
              </div>

              <h4>Nhật ký Thực thi (Execution Logs)</h4>
              <div class="log-item" *ngFor="let log of lastExecution.executionLogs">
                <div class="log-time">{{ log.timestamp | date:'HH:mm:ss.SSS' }}</div>
                <div class="log-name">{{ log.nodeName }} ({{ log.activityType }})</div>
                <div class="log-msg">{{ log.message }}</div>
              </div>
            </div>

            <ng-template #noExecution>
              <div class="empty-state">
                <p>Chưa có lượt chạy thử nào. Bấm nút <strong>"Chạy thử (Run)"</strong> ở trên để thực thi quy trình.</p>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .elsa-container {
      display: flex;
      flex-direction: column;
      height: calc(100vh - 80px);
      background-color: #0f172a;
      color: #f8fafc;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
    }
    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 24px;
      background: #1e293b;
      border-bottom: 1px solid #334155;
    }
    .title-area {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .badge {
      background: #3b82f6;
      color: white;
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
    }
    .version-tag {
      color: #94a3b8;
      font-size: 13px;
    }
    .action-buttons {
      display: flex;
      gap: 10px;
    }
    .btn {
      padding: 8px 16px;
      border-radius: 6px;
      border: none;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
    }
    .btn-primary { background: #3b82f6; color: white; }
    .btn-secondary { background: #475569; color: white; }
    .btn-success { background: #10b981; color: white; }
    .btn:hover { opacity: 0.9; transform: translateY(-1px); }

    .main-layout {
      display: flex;
      flex: 1;
      overflow: hidden;
    }
    .sidebar-palette {
      width: 320px;
      background: #1e293b;
      border-right: 1px solid #334155;
      display: flex;
      flex-direction: column;
    }
    .palette-header {
      padding: 16px;
      border-bottom: 1px solid #334155;
    }
    .palette-header h3 { margin: 0; font-size: 16px; }
    .palette-header p { margin: 4px 0 0 0; color: #94a3b8; font-size: 12px; }
    .palette-search { padding: 12px; }
    .palette-search input {
      width: 100%;
      padding: 8px 12px;
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 6px;
      color: white;
      box-sizing: border-box;
    }
    .palette-categories {
      flex: 1;
      overflow-y: auto;
      padding: 12px;
    }
    .category-group { margin-bottom: 16px; }
    .category-title {
      font-size: 13px;
      font-weight: 600;
      color: #cbd5e1;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
    .trigger-dot { background: #f59e0b; }
    .activity-dot { background: #3b82f6; }
    .activity-card {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px;
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 8px;
      margin-bottom: 8px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .activity-card:hover {
      border-color: #3b82f6;
      background: #1e293b;
      transform: translateX(2px);
    }
    .card-icon {
      font-size: 18px;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      background: #334155;
    }

    .canvas-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: #090d16;
      position: relative;
    }
    .canvas-toolbar {
      padding: 10px 16px;
      background: #0f172a;
      border-bottom: 1px solid #334155;
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .canvas-stat { font-size: 13px; color: #94a3b8; }
    .btn-text { background: none; border: none; color: #ef4444; cursor: pointer; font-size: 13px; margin-left: auto; }

    .canvas-grid {
      flex: 1;
      position: relative;
      overflow: auto;
      background-image: radial-gradient(#334155 1px, transparent 1px);
      background-size: 20px 20px;
    }
    .svg-connections-layer {
      position: absolute;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .designer-node {
      position: absolute;
      width: 180px;
      background: #1e293b;
      border: 2px solid #334155;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      cursor: pointer;
      transition: border-color 0.2s;
    }
    .designer-node.selected { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3); }
    .designer-node.trigger-node { border-left: 4px solid #f59e0b; }
    .node-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 8px;
      background: #0f172a;
      border-bottom: 1px solid #334155;
    }
    .node-type-badge { font-size: 10px; text-transform: uppercase; color: #94a3b8; }
    .btn-close { background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 14px; }
    .node-body { padding: 10px; }
    .node-title { font-size: 13px; font-weight: 600; color: #f8fafc; }
    .node-sub { font-size: 11px; color: #64748b; margin-top: 2px; }
    .node-footer { padding: 6px; border-top: 1px solid #334155; text-align: center; }
    .btn-connect { background: #334155; border: none; color: #93c5fd; font-size: 11px; padding: 4px 8px; border-radius: 4px; cursor: pointer; }

    .right-panel {
      width: 340px;
      background: #1e293b;
      border-left: 1px solid #334155;
      display: flex;
      flex-direction: column;
    }
    .panel-tabs { display: flex; border-bottom: 1px solid #334155; }
    .panel-tabs button {
      flex: 1;
      padding: 12px;
      background: #0f172a;
      border: none;
      color: #94a3b8;
      cursor: pointer;
      font-weight: 600;
    }
    .panel-tabs button.active { background: #1e293b; color: #3b82f6; border-bottom: 2px solid #3b82f6; }
    .panel-content { padding: 16px; overflow-y: auto; flex: 1; }
    .form-group { margin-bottom: 14px; }
    .form-group label { display: block; font-size: 12px; color: #cbd5e1; margin-bottom: 4px; }
    .form-control {
      width: 100%;
      padding: 8px;
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 6px;
      color: white;
      box-sizing: border-box;
    }
    .empty-state { text-align: center; color: #64748b; margin-top: 40px; font-size: 13px; }
    .status-badge { padding: 4px 8px; border-radius: 4px; font-weight: 600; font-size: 12px; }
    .status-badge.completed { background: #10b981; color: white; }
    .log-item { background: #0f172a; padding: 10px; border-radius: 6px; margin-bottom: 8px; font-size: 12px; border-left: 3px solid #3b82f6; }
    .log-time { color: #64748b; font-size: 11px; }
    .log-name { font-weight: 600; color: #e2e8f0; margin: 2px 0; }
    .log-msg { color: #94a3b8; }
  `]
})
export class BpnmWorkflowDesignerComponent implements OnInit {
  private workflowService = inject(ElsaWorkflowService);

  currentDefinition: WorkflowDefinition = {
    id: 'wf-order-fulfillment-sample',
    definitionId: 'order-fulfillment',
    name: 'Order Fulfillment Workflow',
    version: 1,
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    nodes: [],
    connections: []
  };

  activities: ActivityMetadata[] = [];
  triggers: ActivityMetadata[] = [];

  searchTerm = '';
  selectedNode: WorkflowNode | null = null;
  connectingSourceId: string | null = null;
  activeTab: 'properties' | 'execution' = 'properties';

  isSaving = false;
  isRunning = false;
  lastExecution: WorkflowInstance | null = null;

  ngOnInit(): void {
    this.loadSampleWorkflow();
    this.loadCatalog();
  }

  loadCatalog(): void {
    this.workflowService.getActivities().subscribe(acts => this.activities = acts);
    this.workflowService.getTriggers().subscribe(trigs => this.triggers = trigs);
  }

  loadSampleWorkflow(): void {
    this.workflowService.getDefinitionById('wf-order-fulfillment-sample').subscribe({
      next: (def) => {
        if (def) {
          this.currentDefinition = def;
          if (def.nodes.length > 0) {
            this.selectedNode = def.nodes[0];
          }
        }
      },
      error: () => {
        // Fallback default node
        this.currentDefinition.nodes = [
          {
            id: 'node-1',
            name: 'HTTP Trigger Listener',
            activityType: 'HttpTrigger',
            category: 'Triggers',
            positionX: 100,
            positionY: 150,
            properties: { path: '/api/orders/webhook', method: 'POST' }
          }
        ];
      }
    });
  }

  get filteredTriggers(): ActivityMetadata[] {
    if (!this.searchTerm) return this.triggers;
    return this.triggers.filter(t => t.displayName.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  get filteredActivities(): ActivityMetadata[] {
    if (!this.searchTerm) return this.activities;
    return this.activities.filter(a => a.displayName.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  addNode(meta: ActivityMetadata): void {
    const newNode: WorkflowNode = {
      id: 'node-' + (this.currentDefinition.nodes.length + 1),
      name: meta.displayName,
      activityType: meta.activityType,
      category: meta.category,
      positionX: 100 + (this.currentDefinition.nodes.length * 50) % 600,
      positionY: 150 + Math.floor(this.currentDefinition.nodes.length / 3) * 100,
      properties: {}
    };

    meta.properties.forEach(p => {
      newNode.properties[p.name] = p.defaultValue || '';
    });

    this.currentDefinition.nodes.push(newNode);
    this.selectNode(newNode);
  }

  removeNode(nodeId: string): void {
    this.currentDefinition.nodes = this.currentDefinition.nodes.filter(n => n.id !== nodeId);
    this.currentDefinition.connections = this.currentDefinition.connections.filter(c => c.sourceNodeId !== nodeId && c.targetNodeId !== nodeId);
    if (this.selectedNode?.id === nodeId) {
      this.selectedNode = null;
    }
  }

  selectNode(node: WorkflowNode): void {
    this.selectedNode = node;
    this.activeTab = 'properties';
  }

  startConnect(node: WorkflowNode): void {
    if (!this.connectingSourceId) {
      this.connectingSourceId = node.id;
    } else if (this.connectingSourceId === node.id) {
      this.connectingSourceId = null;
    } else {
      // Create connection
      const newConn: WorkflowConnection = {
        id: 'conn-' + (this.currentDefinition.connections.length + 1),
        sourceNodeId: this.connectingSourceId,
        targetNodeId: node.id,
        outcome: 'Done'
      };
      this.currentDefinition.connections.push(newConn);
      this.connectingSourceId = null;
    }
  }

  getNodePosition(nodeId: string): { x: number; y: number } {
    const node = this.currentDefinition.nodes.find(n => n.id === nodeId);
    return node ? { x: node.positionX, y: node.positionY } : { x: 0, y: 0 };
  }

  clearCanvas(): void {
    this.currentDefinition.nodes = [];
    this.currentDefinition.connections = [];
    this.selectedNode = null;
  }

  saveWorkflow(): void {
    this.isSaving = true;
    this.workflowService.saveDefinition(this.currentDefinition).subscribe({
      next: (saved) => {
        this.isSaving = false;
        this.currentDefinition = saved;
        alert('Đã lưu quy trình Workflow thành công!');
      },
      error: (err) => {
        this.isSaving = false;
        alert('Lỗi khi lưu quy trình: ' + (err.message || 'Error'));
      }
    });
  }

  runWorkflow(): void {
    this.isRunning = true;
    this.activeTab = 'execution';
    this.workflowService.executeWorkflow(this.currentDefinition.id).subscribe({
      next: (instance) => {
        this.isRunning = false;
        this.lastExecution = instance;
      },
      error: (err) => {
        this.isRunning = false;
        alert('Lỗi khi chạy thực thi quy trình: ' + (err.message || 'Error'));
      }
    });
  }

  getObjectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }
}
