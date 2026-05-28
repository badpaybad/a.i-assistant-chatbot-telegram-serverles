import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { AppNotificationService, HttpClientService } from '@tot/core';


import { v4 as uuidv4 } from 'uuid';
import { TranslocoModule } from '@jsverse/transloco';

import { TotButtonComponent, TotTableComponent, TotTableColumn } from '@tot/shared';
import { ViewChild, TemplateRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-firestore-test',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzPageHeaderModule,
    NzCardModule,
    NzButtonModule,
    NzInputModule,
    NzFormModule,
    TotButtonComponent,
    TotTableComponent,
    TranslocoModule
  ],
  templateUrl: './firestore-test.component.html',
  styleUrls: ['./firestore-test.component.css']
})
export class FirestoreTestComponent implements OnInit {
  private http = inject(HttpClientService);
  private notification = inject(AppNotificationService);

  commandName = 'sample.command';
  payload = '{"message": "Hello from Firestore Test"}';
  loading = false;
  results: any[] = [];

  pageIndex = 1;
  pageSize = 10;

  get pagedResults(): any[] {
    const start = (this.pageIndex - 1) * this.pageSize;
    return this.results.slice(start, start + this.pageSize);
  }

  @ViewChild('payloadTpl', { static: true }) payloadTpl!: TemplateRef<any>;
  @ViewChild('dateTpl', { static: true }) dateTpl!: TemplateRef<any>;

  resultsColumns: TotTableColumn[] = [];

  ngOnInit() {
    this.resultsColumns = [
      { title: 'Request ID', key: 'requestId', width: '200px' },
      { title: 'Time', key: 'time', width: '180px', template: this.dateTpl, right: true },
      { title: 'Payload (Result)', template: this.payloadTpl }
    ];
  }

  async sendCommand() {
    const requestId = uuidv4();
    this.loading = true;

    try {
      this.notification.info('Success', `Command sent. Waiting for Firestore notification... ID: ${requestId}`);
      
      // Send command to BE, forwarding the manually generated requestId in options and the callback directly
      await this.http.post(
        '/api/test/command', 
        {
          requestId,
          commandName: this.commandName,
          payload: JSON.parse(this.payload)
        }, 
        (data: any) => {
          this.notification.success('Command Result (Firestore)', `Result for ${requestId}: ${JSON.stringify(data)}`, { nzDuration: 0 });
          this.results.unshift({ requestId, data, time: new Date() });
        },
        { trackingId: requestId }
      );
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }
}
