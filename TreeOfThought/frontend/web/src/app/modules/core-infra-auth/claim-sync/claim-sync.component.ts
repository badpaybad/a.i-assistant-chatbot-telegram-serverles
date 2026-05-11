import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AuthManagementService } from '../services/auth-management.service';
import { ALL_CLAIMS, CLAIMS_VERSION } from '../../../core/auth/claims.config';

@Component({
  selector: 'app-claim-sync',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzIconModule,
    NzCardModule,
    NzTableModule,
    NzModalModule,
    NzFormModule,
    NzInputModule
  ],
  template: `
    <div class="page-header">
      <h2>Claim Management</h2>
      <button nz-button nzType="primary" (click)="showCreateModal()">
        <span nz-icon nzType="plus"></span> Add Claim
      </button>
    </div>

    <nz-card nzTitle="Predefined Frontend Claims" style="margin-bottom: 16px;">
      <p>Version: <strong>{{ version }}</strong> | Count: <strong>{{ claimsCount }}</strong></p>
      <div class="sync-actions">
        <button nz-button nzType="primary" (click)="sync()" [nzLoading]="loading">
          <span nz-icon nzType="sync"></span> Sync Predefined with Backend
        </button>
      </div>
    </nz-card>

    <nz-table #basicTable [nzData]="existingClaims" [nzLoading]="loading">
      <thead>
        <tr>
          <th>Claim Name</th>
          <th>Description</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of basicTable.data">
          <td>{{ data.name }}</td>
          <td>{{ data.description }}</td>
          <td>{{ data.createdAt | date:'short' }}</td>
        </tr>
      </tbody>
    </nz-table>

    <nz-modal [(nzVisible)]="isCreateModalVisible" nzTitle="Add Manual Claim" (nzOnCancel)="isCreateModalVisible = false" (nzOnOk)="createClaim()">
      <ng-container *nzModalContent>
        <form nz-form nzLayout="vertical">
          <nz-form-item>
            <nz-form-label [nzSpan]="null">Claim Name</nz-form-label>
            <nz-form-control>
              <input nz-input [(ngModel)]="newClaim.name" name="name" placeholder="e.g. report:export" />
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label [nzSpan]="null">Description</nz-form-label>
            <nz-form-control>
              <input nz-input [(ngModel)]="newClaim.description" name="description" placeholder="Claim description" />
            </nz-form-control>
          </nz-form-item>
        </form>
      </ng-container>
    </nz-modal>
  `,
  styles: [`
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    .sync-actions {
      margin-top: 8px;
    }
  `]
})
export class ClaimSyncComponent implements OnInit {
  private authMgmt = inject(AuthManagementService);
  private notification = inject(NzNotificationService);
  
  version = CLAIMS_VERSION;
  claims = ALL_CLAIMS;
  claimsCount = ALL_CLAIMS.length;
  
  existingClaims: any[] = [];
  loading = false;
  
  isCreateModalVisible = false;
  newClaim = { name: '', description: '' };

  ngOnInit(): void {
    this.loadClaims();
  }

  async loadClaims() {
    this.loading = true;
    try {
      this.existingClaims = await this.authMgmt.getClaims();
    } catch (e) {
      this.notification.error('Error', 'Failed to load existing claims');
    } finally {
      this.loading = false;
    }
  }

  async sync() {
    this.loading = true;
    try {
      await this.authMgmt.syncClaims(this.version, this.claims);
      this.notification.success('Success', 'Claims synchronized successfully');
      this.loadClaims();
    } catch (e) {
      this.notification.error('Error', 'Failed to synchronize claims');
    } finally {
      this.loading = false;
    }
  }

  showCreateModal() {
    this.newClaim = { name: '', description: '' };
    this.isCreateModalVisible = true;
  }

  async createClaim() {
    if (!this.newClaim.name) return;
    try {
      await this.authMgmt.createClaim(this.newClaim);
      this.notification.success('Success', 'Claim added successfully');
      this.isCreateModalVisible = false;
      this.loadClaims();
    } catch (e) {
      this.notification.error('Error', 'Failed to add claim');
    }
  }
}
