import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '@tot/core';
import { Observable, from } from 'rxjs';

export interface DashboardStats {
  stats: Record<string, number>;
  workerStatus: WorkerDetail[];
}

export interface WorkerDetail {
  id: string;
  type: string;
  status: string;
  messageName?: string;
  handlerName?: string;
  queueOrTopicName?: string;
}

export interface QueueInfo {
  name: string;
  pendingCount: number;
  activeCount: number;
  processingCount: number;
  processedCount: number;
  errorCount: number;
  totalCount: number;
  type: string;
  workers: string[];
  handlers: { handlerName: string; messageName: string }[];
  subscribers?: {
    name: string;
    queueName: string;
    pending: number;
    active: number;
    processed: number;
    error: number;
  }[];
}

export interface TrackingSummary {
  id: string;
  lastStep: string;
  time: string;
  content: string;
  status: string;
  queueOrTopic?: string;
  handler?: string;
  worker?: string;
  history: TrackingStep[];
  expand?: boolean;
}

export interface TrackingResponse {
  items: TrackingSummary[];
  total: number;
}

export interface TrackingStep {
  time: string;
  step: string;
  details: string;
  status?: string;
  messageContent?: string;
}

export interface LastActivity {
  type: string;
  mainName: string;
  subscriberName?: string;
  lastActive?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClientService);

  getStats(): Observable<DashboardStats> {
    return from(this.http.get<DashboardStats>('/api/cqrs/dashboard/stats'));
  }

  getQueues(): Observable<QueueInfo[]> {
    return from(this.http.get<QueueInfo[]>('/api/cqrs/dashboard/queues'));
  }

  getMessages(queueName: string, page: number = 1, pageSize: number = 10): Observable<{ items: string[], total: number }> {
    return from(this.http.get<{ items: string[], total: number }>(`/api/cqrs/dashboard/messages/${queueName}?page=${page}&pageSize=${pageSize}`));
  }

  retryCommand(queueName: string, messageJson: string): Observable<any> {
    return from(this.http.post('/api/cqrs/dashboard/retry', { queueName, messageJson }));
  }

  pushMessage(queueName: string, messageJson: string): Observable<any> {
    return from(this.http.post('/api/cqrs/dashboard/push', { queueName, messageJson }));
  }

  removeFromDeadLetter(queueName: string, messageJson: string): Observable<any> {
    return from(this.http.delete(`/api/cqrs/dashboard/dead-letter/${queueName}?messageJson=${encodeURIComponent(messageJson)}`));
  }

  getTracking(trackingId: string): Observable<TrackingStep[]> {
    return from(this.http.get<TrackingStep[]>(`/api/cqrs/dashboard/tracking/${trackingId}`));
  }

  getRecentTracking(params: any): Observable<TrackingResponse> {
    const query = Object.keys(params)
      .filter(k => params[k] !== null && params[k] !== undefined && params[k] !== '')
      .map(k => `${k}=${encodeURIComponent(params[k])}`)
      .join('&');
    return from(this.http.get<TrackingResponse>(`/api/cqrs/dashboard/tracking/recent?${query}`));
  }

  resendTracking(trackingId: string): Observable<any> {
    return from(this.http.post(`/api/cqrs/dashboard/tracking/${trackingId}/resend`, {}));
  }

  deleteTracking(trackingId: string): Observable<any> {
    return from(this.http.delete(`/api/cqrs/dashboard/tracking/${trackingId}`));
  }

  stopWorker(workerId: string): Observable<any> {
    return from(this.http.post(`/api/cqrs/dashboard/workers/${workerId}/stop`, {}));
  }

  startWorker(workerId: string): Observable<any> {
    return from(this.http.post(`/api/cqrs/dashboard/workers/${workerId}/start`, {}));
  }

  sendTestCommand(data: any): Observable<any> {
    return from(this.http.post('/api/Test/cqrs/sample-command', { data }));
  }

  sendTestEvent(data: any): Observable<any> {
    return from(this.http.post('/api/Test/cqrs/sample-event', { data }));
  }

  getLastActivity(): Observable<LastActivity[]> {
    return from(this.http.get<LastActivity[]>('/api/cqrs/dashboard/last-activity'));
  }
}
