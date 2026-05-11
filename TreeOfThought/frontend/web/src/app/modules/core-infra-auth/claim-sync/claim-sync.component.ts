import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { AuthManagementService } from '../services/auth-management.service';
import { ALL_CLAIMS, CLAIMS_VERSION } from '../../../core/auth/claims.config';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

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
    NzInputModule,
    NzSpaceModule,
    TranslateModule
  ],
  template: `
    <div class="page-header">
      <h2>{{ 'Quyền' | translate }}</h2>
      <button nz-button nzType="primary" (click)="showCreateModal()">
        <span nz-icon nzType="plus"></span> {{ 'Thêm mới' | translate }}
      </button>
    </div>

    <nz-card [nzTitle]="'Quyền' | translate" style="margin-bottom: 16px;">
      <p>Version: <strong>{{ version }}</strong> | Count: <strong>{{ claimsCount }}</strong></p>
      <div class="sync-actions">
        <button nz-button nzType="primary" (click)="sync()" [nzLoading]="loading">
          <span nz-icon nzType="sync"></span> {{ 'Đồng bộ' | translate }}
        </button>
      </div>
    </nz-card>

    <nz-table #basicTable [nzData]="existingClaims" [nzLoading]="loading">
      <thead>
        <tr>
          <th>{{ 'Quyền' | translate }}</th>
          <th>{{ 'Mô tả' | translate }}</th>
          <th>{{ 'Ngày tạo' | translate }}</th>
          <th nzWidth="120px">{{ 'Hành động' | translate }}</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of basicTable.data">
          <td>{{ data.name }}</td>
          <td>{{ data.description }}</td>
          <td>{{ data.createdAt | date:'short' }}</td>
          <td>
            <nz-space>
              <button *nzSpaceItem nz-button nzType="primary" nzDanger nzSize="small" 
                      [disabled]="data.name?.toLowerCase() === 'admin'"
                      (click)="deleteClaim(data)">{{ 'Xóa' | translate }}</button>
            </nz-space>
          </td>
        </tr>
      </tbody>
    </nz-table>

    <nz-modal [(nzVisible)]="isCreateModalVisible" [nzTitle]="'Thêm mới' | translate" (nzOnCancel)="isCreateModalVisible = false" (nzOnOk)="createClaim()">
      <ng-container *nzModalContent>
        <form nz-form nzLayout="vertical">
          <nz-form-item>
            <nz-form-label [nzSpan]="null">{{ 'Quyền' | translate }}</nz-form-label>
            <nz-form-control>
              <input nz-input [(ngModel)]="newClaim.name" name="name" [placeholder]="'Quyền' | translate" />
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label [nzSpan]="null">{{ 'Mô tả' | translate }}</nz-form-label>
            <nz-form-control>
              <input nz-input [(ngModel)]="newClaim.description" name="description" [placeholder]="'Mô tả' | translate" />
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
  private modal = inject(NzModalService);
  private translate = inject(TranslateService);
  
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
      this.notification.error(this.translate.instant('Thất bại'), this.translate.instant('Không thể tải danh sách quyền'));
    } finally {
      this.loading = false;
    }
  }

  async sync() {
    this.loading = true;
    try {
      await this.authMgmt.syncClaims(this.version, this.claims);
      this.notification.success(this.translate.instant('Thành công'), this.translate.instant('Đồng bộ quyền thành công'));
      this.loadClaims();
    } catch (e) {
      this.notification.error(this.translate.instant('Thất bại'), this.translate.instant('Đồng bộ quyền thất bại'));
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
      this.notification.success(this.translate.instant('Thành công'), this.translate.instant('Thêm quyền thành công'));
      this.isCreateModalVisible = false;
      this.loadClaims();
    } catch (e) {
      this.notification.error(this.translate.instant('Thất bại'), this.translate.instant('Thêm quyền thất bại'));
    }
  }

  async deleteClaim(claim: any) {
    if (claim.name?.toLowerCase() === 'admin') {
      this.notification.warning(this.translate.instant('Cảnh báo'), this.translate.instant('Không thể xóa quyền admin'));
      return;
    }

    this.modal.confirm({
      nzTitle: `${this.translate.instant('Xác nhận xóa quyền')} ${claim.name}?`,
      nzContent: this.translate.instant('Hành động này không thể hoàn tác'),
      nzOkDanger: true,
      nzOnOk: async () => {
        try {
          await this.authMgmt.deleteClaim(claim.id);
          this.notification.success(this.translate.instant('Thành công'), this.translate.instant('Xóa quyền thành công'));
          this.loadClaims();
        } catch (e: any) {
          this.notification.error(this.translate.instant('Thất bại'), e.error?.message || this.translate.instant('Xóa quyền thất bại'));
        }
      }
    });
  }
}
