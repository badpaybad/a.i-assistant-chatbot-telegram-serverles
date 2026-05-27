import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslocoModule } from '@jsverse/transloco';
import { FormsModule } from '@angular/forms';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { MessageListComponent } from '../message-list/message-list.component';
import { QueueInfo } from '../services/dashboard.service';

@Component({
  selector: 'app-topic-detail',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzTagModule,
    NzButtonModule,
    NzIconModule,
    FormsModule,
    TranslocoModule,
    MessageListComponent
  ],
  template: `
    <div class="topic-detail-container">
      <div *ngIf="topic.subscribers && topic.subscribers.length > 0; else noSubs">
        <nz-table #subTable [nzData]="topic.subscribers" nzSize="middle" [nzFrontPagination]="false" [nzShowPagination]="false">
          <thead>
            <tr>
              <th>Subscriber</th>
              <th>Queue Name</th>
              <th nzAlign="center">Send Success</th>
              <th nzAlign="center">Send Error</th>
              <th nzAlign="center">Done Success</th>
              <th nzAlign="center">Done Error</th>
              <th nzAlign="center" nzWidth="150px">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <ng-container *ngFor="let sub of subTable.data">
              <tr>
                <td><strong>{{ sub.name }}</strong></td>
                <td><code>{{ sub.queueName }}</code></td>
                <td nzAlign="center"><nz-tag nzColor="success">{{ sub.sendSuccessCount || 0 }}</nz-tag></td>
                <td nzAlign="center"><nz-tag nzColor="error">{{ sub.sendErrorCount || 0 }}</nz-tag></td>
                <td nzAlign="center"><nz-tag nzColor="success">{{ sub.doneSuccessCount || 0 }}</nz-tag></td>
                <td nzAlign="center"><nz-tag nzColor="error">{{ sub.doneErrorCount || 0 }}</nz-tag></td>
                <td nzAlign="center">
                  <button nz-button nzType="primary" nzGhost nzSize="small" (click)="sub.expand = !sub.expand">
                    <i nz-icon [nzType]="sub.expand ? 'up' : 'down'"></i>
                    {{ (sub.expand ? 'Thu gọn' : 'Xem chi tiết') | transloco }}
                  </button>
                </td>
              </tr>
              <tr [nzExpand]="sub.expand">
                <div *ngIf="sub.expand" style="padding: 16px; background: #fafafa; border-radius: 4px;">
                  <app-message-list [inputQueueName]="showInProgress ? sub.queueName.replace('sub_queue:', 'sub_proc:') : sub.queueName"></app-message-list>
                </div>
              </tr>
            </ng-container>
          </tbody>
        </nz-table>
      </div>
      <ng-template #noSubs>
        <div style="text-align: center; padding: 48px 0; color: #999;">
          <i nz-icon nzType="info-circle" style="font-size: 32px; margin-bottom: 12px; color: #1890ff;"></i>
          <p>{{ 'Không có subscriber nào cho topic này' | transloco }}</p>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .topic-detail-container {
      min-height: 400px;
    }
  `]
})
export class TopicDetailComponent implements OnInit {
  private modalData = inject(NZ_MODAL_DATA) as any;
  
  topic: QueueInfo = this.modalData.topic;
  showInProgress: boolean = this.modalData.showInProgress || false;

  ngOnInit(): void {
    if (this.topic.subscribers) {
      this.topic.subscribers.forEach((sub: any) => {
        sub.expand = false;
      });
    }
  }
}
