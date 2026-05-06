import httpClient from '../../../utils/httpClient';

export interface QueueInfo {
  name: string;
  length: number;
  type: 'Queue' | 'Subscription' | 'Internal';
}

export interface CqrsStats {
  stats: Record<string, number>;
  workerStatus: Record<string, string>;
}

export const dashboardService = {
  getStats: async (): Promise<CqrsStats> => {
    const response = await httpClient.get('/cqrs/dashboard/stats');
    return response.data;
  },

  getQueues: async (): Promise<QueueInfo[]> => {
    const response = await httpClient.get('/cqrs/dashboard/queues');
    return response.data;
  },

  getMessages: async (queueName: string, count = 50): Promise<string[]> => {
    const response = await httpClient.get(`/cqrs/dashboard/messages/${queueName}`, { params: { count } });
    return response.data;
  },

  retryCommand: async (queueName: string, messageJson: string): Promise<void> => {
    await httpClient.post('/cqrs/dashboard/retry', { queueName, messageJson });
  },

  removeFromDeadLetter: async (queueName: string, messageJson: string): Promise<void> => {
    await httpClient.delete(`/cqrs/dashboard/dead-letter/${queueName}`, { params: { messageJson } });
  },

  getTracking: async (trackingId: string): Promise<string[]> => {
    const response = await httpClient.get(`/cqrs/dashboard/tracking/${trackingId}`);
    return response.data;
  },
};
