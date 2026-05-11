import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../../../core/http/http-client.service';
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
  length: number;
  type: string;
  sentCount: number;
  errorCount: number;
  messageName?: string;
  handlerName?: string;
}

export interface TrackingSummary {
  id: string;
  lastStep: string;
  time: string;
}

export interface TrackingStep {
  time: string;
  step: string;
  details: string;
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

  getMessages(queueName: string, count: number = 50): Observable<string[]> {
    return from(this.http.get<string[]>(`/api/cqrs/dashboard/messages/${queueName}?count=${count}`));
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

  getRecentTracking(count: number = 50): Observable<TrackingSummary[]> {
    return from(this.http.get<TrackingSummary[]>(`/api/cqrs/dashboard/tracking/recent?count=${count}`));
  }

  stopWorker(workerId: string): Observable<any> {
    return from(this.http.post(`/api/cqrs/dashboard/workers/${workerId}/stop`, {}));
  }

  startWorker(workerId: string): Observable<any> {
    return from(this.http.post(`/api/cqrs/dashboard/workers/${workerId}/start`, {}));
  }
}
