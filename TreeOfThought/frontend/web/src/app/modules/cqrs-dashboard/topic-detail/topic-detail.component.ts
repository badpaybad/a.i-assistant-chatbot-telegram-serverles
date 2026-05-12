import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { MessageListComponent } from '../message-list/message-list.component';
import { QueueInfo } from '../services/dashboard.service';

@Component({
  selector: 'app-topic-detail',
  standalone: true,
  imports: [
    CommonModule,
    NzRadioModule,
    FormsModule,
    TranslateModule,
    MessageListComponent
  ],
  template: `
    <div class="topic-detail-container">
      <div *ngIf="topic.subscribers && topic.subscribers.length > 0; else noSubs">
        <div style="margin-bottom: 16px; border-bottom: 1px solid #333; padding-bottom: 8px;">
          <nz-radio-group [(ngModel)]="activeSubIndex" nzButtonStyle="solid">
            <label *ngFor="let sub of topic.subscribers; let i = index" nz-radio-button [nzValue]="i">
              {{ sub.name }}
            </label>
          </nz-radio-group>
        </div>
        
        <div *ngFor="let sub of topic.subscribers; let i = index">
          <div *ngIf="activeSubIndex === i">
            <app-message-list [inputQueueName]="showInProgress ? sub.queueName + ':processing' : sub.queueName"></app-message-list>
          </div>
        </div>
      </div>
      <ng-template #noSubs>
        <div style="text-align: center; padding: 24px; color: #999;">
          {{ 'Không có subscriber nào' | translate }}
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
  activeSubIndex = 0;

  ngOnInit(): void {
  }
}
