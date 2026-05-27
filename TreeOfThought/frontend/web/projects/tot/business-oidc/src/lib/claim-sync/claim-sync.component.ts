import { Component, OnInit, inject, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ADMIN_CLAIM, ALL_CLAIMS, AppNotificationService, CLAIMS_VERSION } from '@tot/core';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { AuthManagementService } from '../services/auth-management.service';

import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { TotButtonComponent, TotTableComponent, TotTableColumn, TotCellDirective } from '@tot/shared';

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
    NzDatePickerModule,
    NzGridModule,
    TranslocoModule,
    TotButtonComponent,
    TotTableComponent,
    TotCellDirective
  ],
  template: `
    <div class="page-header">
      <h2>{{ 'Quyền' | transloco }}</h2>
      <tot-button nzType="primary" (click)="showCreateModal()">
        <span nz-icon nzType="plus"></span> {{ 'Thêm mới' | transloco }}
      </tot-button>
    </div>

    <nz-card [nzTitle]="'Tìm kiếm' | transloco" class="search-card">
      <div nz-row [nzGutter]="[16, 16]">
        <div nz-col [nzSpan]="10">
          <input nz-input [(ngModel)]="searchQuery.keyword" [placeholder]="'Tên quyền, mô tả' | transloco" (keyup.enter)="search()" />
        </div>
        <div nz-col [nzSpan]="8">
          <nz-range-picker [(ngModel)]="searchQuery.dateRange" style="width: 100%"></nz-range-picker>
        </div>
        <div nz-col [nzSpan]="6" class="search-actions">
          <nz-space>
            <tot-button *nzSpaceItem  nzType="primary" (click)="search()">{{ 'Tìm kiếm' | transloco }}</tot-button>
            <tot-button *nzSpaceItem  (click)="resetSearch()">{{ 'Đặt lại' | transloco }}</tot-button>
          </nz-space>
        </div>
      </div>
    </nz-card>

    <nz-card [nzTitle]="'Đồng bộ quyền' | transloco" style="margin-bottom: 16px;">
      <p>Version: <strong>{{ version }}</strong> | Count: <strong>{{ claimsCount }}</strong></p>
      <div class="sync-actions">
        <tot-button nzType="primary" (click)="sync()" [loading]="loading">
          <span nz-icon nzType="sync"></span> {{ 'Đồng bộ' | transloco }}
        </tot-button>
      </div>
    </nz-card>

    <tot-table 
      [data]="existingClaims" 
      [columns]="claimColumns" 
      [loading]="loading" 
      [title]="'Danh sách quyền' | transloco" 
      [frontPagination]="false"
      [pageIndex]="pageIndex"
      [pageSize]="pageSize"
      [total]="totalClaims"
      [scroll]="{ x: '1000px' }"
      (queryParamsChange)="onQueryParamsChange($event)"
    >
      <ng-template totCell="createdAt" let-data>
        {{ data.createdAt | date:'short' }}
      </ng-template>

      <ng-template totCell="action" let-data>
        <div style="display: flex; gap: 4px; flex-direction: column;">
          <tot-button nzType="primary" [nzDanger]="true" nzSize="small" 
                  [disabled]="data.name?.toLowerCase() === ADMIN_CLAIM"
                  (click)="deleteClaim(data)">{{ 'Xóa' | transloco }}</tot-button>
        </div>
      </ng-template>
    </tot-table>

    <nz-modal [(nzVisible)]="isCreateModalVisible" [nzTitle]="'Thêm mới' | transloco" (nzOnCancel)="isCreateModalVisible = false" (nzOnOk)="createClaim()">
      <ng-container *nzModalContent>
        <form nz-form nzLayout="vertical">
          <nz-form-item>
            <nz-form-label [nzSpan]="null">{{ 'Quyền' | transloco }}</nz-form-label>
            <nz-form-control>
              <input nz-input [(ngModel)]="newClaim.name" name="name" [placeholder]="'Quyền' | transloco" />
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label [nzSpan]="null">{{ 'Mô tả' | transloco }}</nz-form-label>
            <nz-form-control>
              <input nz-input [(ngModel)]="newClaim.description" name="description" [placeholder]="'Mô tả' | transloco" />
            </nz-form-control>
          </nz-form-item>
        </form>
      </ng-container>
    </nz-modal>
  `,
  styles: [`
    .search-card {
      margin-bottom: 16px;
    }
    .search-actions {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .sync-actions {
      margin-top: 8px;
    }
  `]
})
export class ClaimSyncComponent implements OnInit {
  private authMgmt = inject(AuthManagementService);
  private notification = inject(AppNotificationService);
  private modal = inject(NzModalService);
  private translate = inject(TranslocoService);
  
  version = CLAIMS_VERSION;
  claims = ALL_CLAIMS;
  claimsCount = ALL_CLAIMS.length;
  ADMIN_CLAIM = ADMIN_CLAIM;
  
  existingClaims: any[] = [];
  loading = false;
  
  pageIndex = 1;
  pageSize = 10;
  totalClaims = 0;
  
  isCreateModalVisible = false;
  newClaim = { name: '', description: '' };

  searchQuery: any = {
    keyword: '',
    dateRange: []
  };

  claimColumns: TotTableColumn[] = [];

  ngOnInit(): void {
    this.claimColumns = [
      { title: 'Quyền', key: 'name' },
      { title: 'Mô tả', key: 'description' },
      { title: 'Ngày tạo', key: 'createdAt' },
      { title: 'Hành động', key: 'action', width: '120px', right: true }
    ];
    this.loadClaims();
  }

  async loadClaims() {
    this.loading = true;
    try {
      const params: any = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      if (this.searchQuery.keyword) params.keyword = this.searchQuery.keyword;
      if (this.searchQuery.dateRange && this.searchQuery.dateRange.length === 2) {
        params.startDate = this.searchQuery.dateRange[0]?.toISOString();
        params.endDate = this.searchQuery.dateRange[1]?.toISOString();
      }
      const res: any = await this.authMgmt.getClaims(params);
      this.existingClaims = res.items || [];
      this.totalClaims = res.total || 0;
    } catch (e) {
      this.notification.error(this.translate.translate('Thất bại'), this.translate.translate('Không thể tải danh sách quyền'));
    } finally {
      this.loading = false;
    }
  }

  search() {
    this.pageIndex = 1;
    this.loadClaims();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageIndex, pageSize } = params;
    if (this.pageIndex === pageIndex && this.pageSize === pageSize) {
      return;
    }
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.loadClaims();
  }

  resetSearch() {
    this.pageIndex = 1;
    this.searchQuery = {
      keyword: '',
      dateRange: []
    };
    this.loadClaims();
  }

  async sync() {
    this.loading = true;
    try {
      await this.authMgmt.syncClaims(this.version, this.claims);
      this.notification.success(this.translate.translate('Thành công'), this.translate.translate('Đồng bộ quyền thành công'));
      await this.loadClaims();
    } catch (e: any) {
      this.notification.error(this.translate.translate('Thất bại'), e?.message || this.translate.translate('Đồng bộ quyền thất bại'));
    } finally {
      this.loading = false;
    }
  }

  showCreateModal() {
    this.newClaim = { name: '', description: '' };
    this.isCreateModalVisible = true;
  }

  createClaim() {
    if (!this.newClaim.name) return;
    try {
      this.authMgmt.createClaim(this.newClaim, (data: any) => {
        if (data.status === 'Completed') {
          this.notification.success(this.translate.translate('Thành công'), this.translate.translate('Thêm quyền thành công'));
          this.isCreateModalVisible = false;
          this.loadClaims();
        } else if (data.status === 'Error') {
          this.notification.error(this.translate.translate('Thất bại'), this.translate.translate('Thêm quyền thất bại'));
        }
      });
    } catch (e) {
      this.notification.error(this.translate.translate('Thất bại'), this.translate.translate('Thêm quyền thất bại'));
    }
  }

  async deleteClaim(claim: any) {
    if (claim.name?.toLowerCase() === ADMIN_CLAIM) {
      this.notification.warning(this.translate.translate('Cảnh báo'), `${this.translate.translate('Không thể xóa quyền')} ${ADMIN_CLAIM}`);
      return;
    }

    this.modal.confirm({
      nzTitle: `${this.translate.translate('Xác nhận xóa quyền')} ${claim.name}?`,
      nzContent: this.translate.translate('Hành động này không thể hoàn tác'),
      nzOkDanger: true,
      nzOnOk: () => {
        this.authMgmt.deleteClaim(claim.id, (data: any) => {
          if (data.status === 'Completed') {
            this.notification.success(this.translate.translate('Thành công'), this.translate.translate('Xóa quyền thành công'));
            this.loadClaims();
          } else if (data.status === 'Error') {
            this.notification.error(this.translate.translate('Thất bại'), this.translate.translate('Xóa quyền thất bại'));
          }
        });
      }
    });
  }
}
