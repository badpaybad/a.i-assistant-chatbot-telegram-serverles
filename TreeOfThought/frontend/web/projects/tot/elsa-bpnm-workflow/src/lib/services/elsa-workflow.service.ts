import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WorkflowNode {
  id: string;
  name: string;
  activityType: string;
  category: string;
  positionX: number;
  positionY: number;
  properties: Record<string, any>;
}

export interface WorkflowConnection {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  outcome: string;
}

export interface WorkflowDefinition {
  id: string;
  definitionId: string;
  name: string;
  description?: string;
  version: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
  variables?: Record<string, any>;
}

export interface WorkflowExecutionLog {
  id: string;
  nodeId: string;
  nodeName: string;
  activityType: string;
  timestamp: string;
  status: string;
  message?: string;
  eventData?: Record<string, any>;
}

export interface WorkflowInstance {
  id: string;
  definitionId: string;
  workflowName: string;
  version: number;
  status: 'Running' | 'Completed' | 'Failed' | 'Cancelled' | 'Suspended';
  startedAt: string;
  finishedAt?: string;
  inputData?: Record<string, any>;
  outputData?: Record<string, any>;
  errorMessage?: string;
  executionLogs: WorkflowExecutionLog[];
}

export interface UserTask {
  id: string;
  workflowInstanceId: string;
  workflowName: string;
  taskName: string;
  description: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  assignee: string;
  createdAt: string;
  completedAt?: string;
  decisionReason?: string;
  taskPayload?: Record<string, any>;
}

export interface DashboardStats {
  totalDefinitions: number;
  totalInstances: number;
  runningInstances: number;
  completedInstances: number;
  failedInstances: number;
  pendingUserTasks: number;
  successRate: number;
  recentExecutions: WorkflowInstance[];
}

export interface ActivityMetadata {
  activityType: string;
  displayName: string;
  category: string;
  description: string;
  properties: Array<{
    name: string;
    label: string;
    type: 'string' | 'number' | 'boolean' | 'json' | 'select';
    defaultValue?: string;
    options?: string[];
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class ElsaWorkflowService {
  private http = inject(HttpClient);
  private baseUrl = '/api/workflow';

  getDefinitions(): Observable<WorkflowDefinition[]> {
    return this.http.get<WorkflowDefinition[]>(`${this.baseUrl}/definitions`);
  }

  getDefinitionById(id: string): Observable<WorkflowDefinition> {
    return this.http.get<WorkflowDefinition>(`${this.baseUrl}/definitions/${id}`);
  }

  saveDefinition(definition: WorkflowDefinition): Observable<WorkflowDefinition> {
    return this.http.post<WorkflowDefinition>(`${this.baseUrl}/definitions`, definition);
  }

  deleteDefinition(id: string): Observable<{ success: boolean; id: string }> {
    return this.http.delete<{ success: boolean; id: string }>(`${this.baseUrl}/definitions/${id}`);
  }

  executeWorkflow(definitionId: string, input: Record<string, any> = {}): Observable<WorkflowInstance> {
    return this.http.post<WorkflowInstance>(`${this.baseUrl}/execute`, { definitionId, input });
  }

  getInstances(): Observable<WorkflowInstance[]> {
    return this.http.get<WorkflowInstance[]>(`${this.baseUrl}/instances`);
  }

  getInstanceById(id: string): Observable<WorkflowInstance> {
    return this.http.get<WorkflowInstance>(`${this.baseUrl}/instances/${id}`);
  }

  getUserTasks(): Observable<UserTask[]> {
    return this.http.get<UserTask[]>(`${this.baseUrl}/user-tasks`);
  }

  approveUserTask(taskId: string, reason: string = ''): Observable<UserTask> {
    return this.http.post<UserTask>(`${this.baseUrl}/user-tasks/${taskId}/approve`, { taskId, approved: true, reason });
  }

  rejectUserTask(taskId: string, reason: string = ''): Observable<UserTask> {
    return this.http.post<UserTask>(`${this.baseUrl}/user-tasks/${taskId}/reject`, { taskId, approved: false, reason });
  }

  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.baseUrl}/dashboard/stats`);
  }

  getActivities(): Observable<ActivityMetadata[]> {
    return this.http.get<ActivityMetadata[]>(`${this.baseUrl}/activities`);
  }

  getTriggers(): Observable<ActivityMetadata[]> {
    return this.http.get<ActivityMetadata[]>(`${this.baseUrl}/triggers`);
  }
}
