import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [
    CommonModule,
    NzPageHeaderModule,
    NzTableModule,
    NzButtonModule,
    NzTagModule,
    NzIconModule,
    NzModalModule,
    FormsModule,
    NzInputModule,
    NzAlertModule,
    NzDividerModule,
    NzTooltipModule
  ],
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private dashboardService = inject(DashboardService);
  private modal = inject(NzModalService);
  private notification = inject(NzNotificationService);

  queueName = '';
  messages: any[] = [];
  loading = false;

  // Edit Modal State
  isModalVisible = false;
  editingJson = '';
  originalJson = '';
  
  // Error metadata if wrapped
  errorMetadata: any = null;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.queueName = params['queueName'];
      if (this.queueName) {
        this.fetchMessages();
      }
    });
  }

  fetchMessages(): void {
    this.loading = true;
    this.dashboardService.getMessages(this.queueName).subscribe(res => {
      this.messages = res.map(m => {
        try {
          const parsed = JSON.parse(m);
          if (parsed._original) {
            return {
              raw: m,
              data: parsed._original,
              isWrapped: true,
              error: parsed._error,
              failedAt: parsed._failedAt,
              topic: parsed._topic,
              subscriber: parsed._subscriber,
              queue: parsed._queue
            };
          }
          return { raw: m, data: parsed, isWrapped: false };
        } catch (e) {
          return { raw: m, data: m, isWrapped: false };
        }
      });
      this.loading = false;
    });
  }

  viewDetails(msgItem: any): void {
    this.originalJson = msgItem.raw;
    this.errorMetadata = msgItem.isWrapped ? {
      error: msgItem.error,
      failedAt: msgItem.failedAt,
      topic: msgItem.topic,
      subscriber: msgItem.subscriber,
      queue: msgItem.queue
    } : null;

    try {
      this.editingJson = JSON.stringify(msgItem.data, null, 2);
    } catch (e) {
      this.editingJson = typeof msgItem.data === 'string' ? msgItem.data : JSON.stringify(msgItem.data);
    }
    this.isModalVisible = true;
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }

  pushEdited(): void {
    this.dashboardService.pushMessage(this.queueName.replace(':dead', ''), this.editingJson).subscribe(() => {
      this.notification.success('Success', 'Message pushed to queue');
      this.isModalVisible = false;
      this.fetchMessages();
    });
  }

  retryEdited(): void {
    this.dashboardService.retryCommand(this.queueName, this.originalJson).subscribe(() => {
      this.notification.success('Success', 'Message retried');
      this.isModalVisible = false;
      this.fetchMessages();
    });
  }

  retry(msgItem: any): void {
    this.dashboardService.retryCommand(this.queueName, msgItem.raw).subscribe(() => {
      this.notification.success('Success', 'Retry command issued');
      this.fetchMessages();
    });
  }

  remove(msgItem: any): void {
    this.dashboardService.removeFromDeadLetter(this.queueName.replace(':dead', ''), msgItem.raw).subscribe(() => {
      this.notification.success('Success', 'Message removed from DLQ');
      this.fetchMessages();
    });
  }

  isDeadLetter(): boolean {
    return this.queueName.endsWith(':dead');
  }
}
