import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { AppNotificationService, FirebaseService, HttpClientService } from '@tot/core';


import { v4 as uuidv4 } from 'uuid';
import { Unsubscribe } from 'firebase/firestore';
import { TranslateModule } from '@ngx-translate/core';

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
    TranslateModule
  ],
  templateUrl: './firestore-test.component.html',
  styleUrls: ['./firestore-test.component.css']
})
export class FirestoreTestComponent implements OnDestroy, OnInit {
  private firebase = inject(FirebaseService);
  private http = inject(HttpClientService);
  private notification = inject(AppNotificationService);

  commandName = 'sample.command';
  payload = '{"message": "Hello from Firestore Test"}';
  loading = false;
  results: any[] = [];
  private unsubscribes: Unsubscribe[] = [];

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

    // Subscribe to Firestore for the result
    const unsub = this.firebase.subscribeToRequestId(requestId, (data) => {
      this.notification.success('Command Result (Firestore)', `Result for ${requestId}: ${JSON.stringify(data)}`, { nzDuration: 0 });
      this.results.unshift({ requestId, data, time: new Date() });
    });
    this.unsubscribes.push(unsub);

    try {
      // Send command to BE
      await this.http.post('/api/test/command', {
        requestId,
        commandName: this.commandName,
        payload: JSON.parse(this.payload)
      });
      this.notification.info('Success', `Command sent. Waiting for Firestore notification... ID: ${requestId}`);
    } catch (e) {
      console.error(e);
      unsub();
    } finally {
      this.loading = false;
    }
  }

  ngOnDestroy() {
    this.unsubscribes.forEach(unsub => unsub());
  }
}
